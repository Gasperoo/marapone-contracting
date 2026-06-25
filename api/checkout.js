/**
 * Stripe Checkout session creator for Marapone.
 *
 *   POST /api/checkout
 *   { kind, tier|plan, vertical?, addOn?, email?, code? }
 *
 * kinds:
 *   - "build"     Starter/Pilot → charges a DEPOSIT now (25% / 35%), balance
 *                 invoiced later. Optional $1,000 local-machine add-on (full,
 *                 no tax). Optional welcome code (10% off the build only),
 *                 validated against the buyer's email and redeemed by the
 *                 webhook once the deposit is paid.
 *   - "marketing" Starter/Growth/Pro → one-time full payment + 13% HST.
 *   - "support"   Flex/Annual → recurring subscription + 13% HST.
 *
 * Full Build / Plus are intentionally not purchasable here (manual only).
 * Returns { url } to redirect the browser to Stripe Checkout.
 */

import { getStripe, ensureHstTaxRate, isLiveKey } from '../lib/stripe.js';
import { validateCode } from '../lib/stripe-promo.js';
import { BUILDS, MARKETING, SUPPORT, ADDON, CURRENCY, quoteBuild, quoteMarketing, quoteSupport } from '../lib/pricing.js';

const SITE_URL = 'https://marapone.com';
const cents = (dollars) => Math.round(dollars * 100);
const money = (n) => `$${n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// In-memory rate limit (resets on cold start).
const ipMap = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const e = ipMap.get(ip);
  if (!e || now - e.t > 60000) { ipMap.set(ip, { c: 1, t: now }); return false; }
  if (e.c >= 12) return true;
  e.c++; return false;
}

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://marapone.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-real-ip'] || (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many requests.' });

  const sk = getStripe();
  if (!sk) return res.status(500).json({ error: 'Payments are not configured. Email general@marapone.com.' });

  const body = req.body || {};
  const kind = String(body.kind || '');
  const email = String(body.email || '').trim();
  const code = String(body.code || '').trim();
  const vertical = ['construction', 'logistics'].includes(body.vertical) ? body.vertical : '';
  const addOn = !!body.addOn;

  if (email && !isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email.' });

  const base = {
    currency: CURRENCY,
    success_url: `${SITE_URL}/pricing?checkout=success`,
    cancel_url: `${SITE_URL}/pricing?checkout=cancelled`,
    billing_address_collection: 'auto',
    ...(email ? { customer_email: email } : {}),
  };

  try {
    if (kind === 'build') {
      const tier = String(body.tier || '');
      if (!BUILDS[tier]?.online) return res.status(400).json({ error: 'That build is not available for online checkout.' });

      // Validate the welcome code (if any) against the buyer's email.
      let discountPct = 0, appliedCode = null;
      if (code) {
        if (!email) return res.status(400).json({ error: 'Enter your email to use a welcome code.' });
        const v = await validateCode(code, email);
        if (!v.valid) {
          const msg = {
            'not-found': 'That code doesn\'t exist.',
            'expired': 'That code has expired.',
            'used': 'That code has already been used.',
            'inactive': 'That code is no longer active.',
            'email-mismatch': 'That code was issued to a different email.',
          }[v.reason] || 'That code can\'t be used.';
          return res.status(400).json({ error: msg, codeInvalid: true });
        }
        discountPct = v.percentOff;
        appliedCode = v.code;
      }

      const q = quoteBuild({ tier, addOn, discountPct });
      const dRate = Math.round(q.depositRate * 100);
      const line_items = [{
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: cents(q.depositBuild),
          product_data: {
            name: `${q.label} ${vertical ? vertical + ' ' : ''}build — ${dRate}% deposit`,
            description: `Project total ${money(q.buildTotal)} (incl. 13% HST${discountPct ? `, ${discountPct}% code applied` : ''}). ${dRate}% deposit now; balance ${money(q.balanceLater)} invoiced on completion.`,
          },
        },
      }];
      if (addOn) {
        line_items.push({
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: cents(q.addonPrice),
            product_data: { name: `${ADDON.localMachine.label} (one-time, no tax)`, description: 'Dedicated local machine — yours to keep, no ongoing cost.' },
          },
        });
      }

      const session = await sk.checkout.sessions.create({
        ...base,
        mode: 'payment',
        line_items,
        payment_intent_data: {
          description: `${q.label} build deposit${addOn ? ' + local machine' : ''}${vertical ? ' (' + vertical + ')' : ''}`,
        },
        metadata: {
          kind: 'build', tier, vertical, addOn: String(addOn),
          code: appliedCode || '', discountPct: String(discountPct),
          buildTotal: q.buildTotal.toFixed(2), dueNow: q.dueNow.toFixed(2), balanceLater: q.balanceLater.toFixed(2),
        },
      });
      return res.status(200).json({ url: session.url });
    }

    if (kind === 'marketing') {
      const tier = String(body.tier || '');
      if (!MARKETING[tier]) return res.status(400).json({ error: 'Unknown marketing package.' });
      const q = quoteMarketing({ tier });
      const hst = await ensureHstTaxRate(sk);
      const session = await sk.checkout.sessions.create({
        ...base,
        mode: 'payment',
        line_items: [{
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: cents(q.subtotal),
            product_data: { name: q.label, description: 'One-time marketing package. 13% HST added at checkout.' },
          },
          tax_rates: [hst],
        }],
        metadata: { kind: 'marketing', tier },
      });
      return res.status(200).json({ url: session.url });
    }

    if (kind === 'support') {
      const plan = String(body.plan || '');
      if (!SUPPORT[plan]) return res.status(400).json({ error: 'Unknown support plan.' });
      const q = quoteSupport({ plan });
      const hst = await ensureHstTaxRate(sk);
      const session = await sk.checkout.sessions.create({
        ...base,
        mode: 'subscription',
        line_items: [{
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: cents(q.subtotal),
            recurring: { interval: q.interval },
            product_data: { name: q.label, description: `Recurring support plan, billed per ${q.interval}. 13% HST added.` },
          },
          tax_rates: [hst],
        }],
        metadata: { kind: 'support', plan },
        subscription_data: { metadata: { kind: 'support', plan } },
      });
      return res.status(200).json({ url: session.url });
    }

    return res.status(400).json({ error: 'Unknown checkout kind.' });
  } catch (err) {
    console.error('Checkout error:', err?.message || err, '| live:', isLiveKey());
    return res.status(500).json({ error: 'Could not start checkout. Please email general@marapone.com.' });
  }
}
