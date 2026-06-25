/**
 * Stripe webhook — redeems the welcome code once a build deposit is actually
 * paid, and notifies Marapone of new checkouts.
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
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const who = s.customer_details?.email || s.customer_email || 'unknown';
        const summary = m.kind === 'build'
          ? `${m.tier} build deposit${m.vertical ? ' (' + m.vertical + ')' : ''}${m.addOn === 'true' ? ' + local machine' : ''} · paid ${(s.amount_total / 100).toFixed(2)} ${(s.currency || 'cad').toUpperCase()}${m.code ? ` · code ${m.code}` : ''} · project total $${m.buildTotal} · balance $${m.balanceLater}`
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
