/**
 * Stripe webhook — redeems the welcome code once a build deposit is actually
 * paid, starts the buyer's onboarding sequence, and notifies Marapone.
 *
 * Set up: Stripe Dashboard → Developers → Webhooks → add endpoint
 *   https://marapone.com/api/stripe-webhook   (event: checkout.session.completed)
 * Copy the signing secret into STRIPE_WEBHOOK_SECRET (Vercel + .env).
 *
 * Needs the raw request body for signature verification, so the default body
 * parser is disabled below.
 */

import { getStripe } from '../lib/stripe.js';
import { deactivateCode } from '../lib/stripe-promo.js';
import { Resend } from 'resend';
import {
  handoffEmail, checkInEmail, ascensionEmail, fulfilmentFor,
  CHECK_IN_DAYS, ASCENSION_DAYS, FULFILMENT_HOURS,
} from '../lib/fulfillment.js';

const inDays = (n) => new Date(Date.now() + n * 864e5).toISOString();

/**
 * Buyer onboarding for a finished-product purchase. The handoff goes out now;
 * the day-2 check-in and day-7 next-step are handed to Resend's scheduler so
 * there is no cron to own and nothing to keep running.
 *
 * Every send is individually guarded. The handoff is the one that matters, and a
 * scheduler rejection must not cost the buyer their first email.
 */
async function startOnboarding(resend, { email, name, product, amount }) {
  const seq = [
    { at: null, mk: handoffEmail, tag: 'handoff' },
    { at: inDays(CHECK_IN_DAYS), mk: checkInEmail, tag: 'check-in' },
    { at: inDays(ASCENSION_DAYS), mk: ascensionEmail, tag: 'next-step' },
  ];

  for (const step of seq) {
    let msg;
    try {
      msg = step.mk({ name, email, product, amount });
    } catch (err) {
      console.error(`Onboarding ${step.tag} render failed:`, err?.message || err);
      continue;
    }
    if (!msg) continue;                       // e.g. no next step for suite buyers
    try {
      const sent = await resend.emails.send({
        from: 'Marapone <info@marapone.com>',
        to: [email],
        reply_to: 'general@marapone.com',
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
        ...(step.at ? { scheduledAt: step.at } : {}),
      });
      // The SDK resolves with { data, error } rather than throwing on an API
      // rejection, so this has to be inspected or a silent drop looks like a send.
      if (sent?.error) throw new Error(sent.error.message || 'Resend rejected the send');
      console.log(`Onboarding ${step.tag} ${step.at ? 'scheduled for ' + step.at : 'sent'} → ${email}`);
    } catch (err) {
      console.error(`Onboarding ${step.tag} send failed:`, err?.message || err);
    }
  }
}

export const config = { api: { bodyParser: false } };

function readRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const sk = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sk || !secret) return res.status(500).json({ error: 'Webhook not configured.' });

  let event;
  try {
    const raw = await readRaw(req);
    event = sk.webhooks.constructEvent(raw, req.headers['stripe-signature'], secret);
  } catch (err) {
    console.error('Webhook signature failed:', err?.message || err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    const m = s.metadata || {};

    // Redeem (deactivate) the welcome code so it can't be reused — single-use
    // across the whole project (deposit + later balance).
    if (m.kind === 'build' && m.code) {
      try {
        const done = await deactivateCode(m.code);
        console.log(`Welcome code ${m.code} ${done ? 'redeemed' : 'already inactive'} after deposit.`);
      } catch (err) {
        console.error('Code redeem error:', err?.message || err);
      }
    }

    // Best-effort internal notification.
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const buyer = s.customer_details?.email || s.customer_email || '';

      // Buyer onboarding, products only. Build deposits are a scoping
      // conversation rather than a delivery, so they are not put on this track.
      if (buyer && m.kind === 'product' && fulfilmentFor(m.product)) {
        await startOnboarding(resend, {
          email: buyer,
          name: s.customer_details?.name || '',
          product: m.product,
          amount: `$${(s.amount_total / 100).toLocaleString('en-CA')}`,
        });
      }

      try {
        const who = buyer || 'unknown';
        const summary = m.kind === 'build'
          ? `${m.tier} build deposit${m.vertical ? ' (' + m.vertical + ')' : ''}${m.addOn === 'true' ? ' + local machine' : ''} · paid ${(s.amount_total / 100).toFixed(2)} ${(s.currency || 'cad').toUpperCase()}${m.code ? ` · code ${m.code}` : ''} · project total $${m.buildTotal} · balance $${m.balanceLater}`
          : m.kind === 'product' ? `Product ${m.product} · paid in full ${(s.amount_total / 100).toFixed(2)} ${(s.currency || 'cad').toUpperCase()} — SEND THE DOWNLOAD + LICENCE. The buyer has been told it arrives within ${FULFILMENT_HOURS}h, so that is a clock, not a queue.`
          : m.kind === 'marketing' ? `Marketing ${m.tier} · paid ${(s.amount_total / 100).toFixed(2)} ${(s.currency || 'cad').toUpperCase()}`
          : m.kind === 'support' ? `Support ${m.plan} subscription started`
          : `Checkout completed (${JSON.stringify(m)})`;
        await resend.emails.send({
          from: 'Marapone Checkout <info@marapone.com>',
          to: ['general@marapone.com'],
          reply_to: who !== 'unknown' ? who : undefined,
          subject: `💳 Paid: ${summary.slice(0, 80)}`,
          html: `<p><strong>${who}</strong> completed a Stripe checkout.</p><p>${summary}</p><p>Session: ${s.id}</p>`,
        });
      } catch (err) {
        console.error('Notify error:', err?.message || err);
      }
    }
  }

  return res.status(200).json({ received: true });
}
