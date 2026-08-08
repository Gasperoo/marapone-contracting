/**
 * Stripe Checkout session creator for Marapone.
 *
 *   POST /api/checkout
 *   { kind, tier|plan, vertical?, addOn?, email?, code? }
 *
 * kinds:
 *   - "product"   Blueprint Auditor / SpecChecker / AI Estimator / Bid Leveler /
 *                 ScopeGuard / the suite / the data packs → finished goods, paid
 *                 in FULL now. No deposit, because there is nothing to scope and
 *                 delivery is immediate.
 *   - "build"     Starter/Pilot → charges a DEPOSIT now (25% / 35%), balance
 *                 invoiced later. Optional $1,000 local-machine add-on (full
 *                 price, no discount). Optional welcome code (10% off the build
 *                 only), validated against the buyer's email and redeemed by the
 *                 webhook once the deposit is paid.
 *   - "marketing" Starter/Growth/Pro → one-time full payment.
 *   - "support"   Flex/Annual → recurring subscription.
 *
 * Every amount sent to Stripe here is PRE-TAX. Stripe Tax computes what is
 * actually owed from the buyer's billing address — see lib/stripe.js for the two
 * Dashboard settings that have to be in place, and why an unregistered
 * jurisdiction correctly yields zero tax rather than Ontario's 13%.
 *
 * Full Build / Plus are intentionally not purchasable here (manual only).
 * Returns { url } to redirect the browser to Stripe Checkout.
 */

import { getStripe, TAX_SPREAD, TAX_CODE, PHYSICAL_TAX_CODE, isLiveKey } from '../lib/stripe.js';
import { validateCode } from '../lib/stripe-promo.js';
import { BUILDS, MARKETING, SUPPORT, PRODUCTS, ADDON, CURRENCY, isDataPack, quoteBuild, quoteMarketing, quoteSupport, quoteProduct } from '../lib/pricing.js';

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

/**
 * True when the caller is a plain HTML form rather than the checkout widget.
 *
 * The buy buttons are real <form> posts wrapped by JS, so a visitor with
 * JavaScript blocked still reaches Stripe instead of a dead link. Those callers
 * cannot read a JSON body, so they get a 303 to the session URL and errors get
 * rendered as a page rather than returned as `{ error }`.
 */
const wantsRedirect = (req) =>
  /application\/x-www-form-urlencoded/i.test(req.headers['content-type'] || '')
  || (/text\/html/i.test(req.headers.accept || '') && !/application\/json/i.test(req.headers.accept || ''));

function htmlError(res, status, message) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(status).send(
    `<!doctype html><meta charset="utf-8"><title>Checkout</title>`
    + `<body style="font-family:system-ui,sans-serif;background:#1a1a1a;color:#e8e8e8;padding:3rem;line-height:1.6">`
    + `<h1 style="font-size:1.25rem">We could not start that checkout</h1>`
    + `<p>${message}</p>`
    + `<p>Email <a style="color:#f97316" href="mailto:general@marapone.com">general@marapone.com</a> and we will sort it out.</p>`
    + `<p><a style="color:#f97316" href="/data-packs">&larr; Back to the data packs</a></p>`
  );
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://marapone.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const asPage = wantsRedirect(req);
  // One exit for every failure, so the no-JS path never receives a JSON blob.
  const bad = (status, message) => asPage
    ? htmlError(res, status, message)
    : res.status(status).json({ error: message });

  // A form post cannot act on `{ url }`, so it is sent to Stripe with a 303 —
  // which also turns the POST into a GET, so a back-button press does not
  // re-submit the purchase.
  const done = (session) => asPage
    ? res.redirect(303, session.url)
    : res.status(200).json({ url: session.url });

  const ip = req.headers['x-real-ip'] || (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return bad(429, 'Too many requests.');

  const sk = getStripe();
  if (!sk) return bad(500, 'Payments are not configured.');

  const body = req.body || {};
  const kind = String(body.kind || '');
  const email = String(body.email || '').trim();
  const code = String(body.code || '').trim();
  const vertical = ['construction', 'logistics'].includes(body.vertical) ? body.vertical : '';
  const addOn = !!body.addOn;

  if (email && !isEmail(email)) return bad(400, 'Please enter a valid email.');

  // Abandoned-checkout recovery. A $990 impulse buy loses people to a phone
  // call halfway through Stripe's form; this lets Stripe email them a link back
  // to the same session after it expires (24h by default) rather than losing the
  // sale silently. allow_promotion_codes lets that second visit take an
  // incentive code if we choose to send one.
  //
  // Stripe will not send anything until recovery emails are also switched on in
  // the Dashboard (Settings → Checkout and Payment Links → "Manage recovery
  // emails"). This flag is the API half; the toggle is the account half.
  //
  // Not applied to subscriptions: `after_expiration` is invalid in mode:
  // 'subscription', so the support plans below intentionally skip it.
  const recovery = { after_expiration: { recovery: { enabled: true, allow_promotion_codes: true } } };

  const base = {
    currency: CURRENCY,
    success_url: `${SITE_URL}/pricing?checkout=success`,
    cancel_url: `${SITE_URL}/pricing?checkout=cancelled`,
    // Address collection is required (not 'auto') because automatic tax has
    // nothing to compute a rate from without it.
    ...TAX_SPREAD,
    ...(email ? { customer_email: email } : {}),
  };

  try {
    if (kind === 'product') {
      const product = String(body.product || '');
      if (!PRODUCTS[product]) return bad(400, 'Unknown product.');
      const q = quoteProduct({ product });
      const session = await sk.checkout.sessions.create({
        ...base,
        ...recovery,
        // A finished product is delivered, not scheduled, so the buyer lands on
        // a page that does the delivering — install steps, what to run first,
        // and the guarantee restated before they have to go looking for it.
        // A data pack has no install and a different refund window, so it gets
        // its own landing page rather than one describing somebody else's
        // purchase. Cancelling returns them to the page they came from.
        // The pack success page carries the session id so it can ask
        // /api/download for a verified link and hand the files over on the spot,
        // rather than telling the buyer to wait for someone to email them.
        success_url: isDataPack(product)
          ? `${SITE_URL}/construction/data-pack-complete?product=${product}&session_id={CHECKOUT_SESSION_ID}`
          : `${SITE_URL}/construction/purchase-complete?product=${product}`,
        cancel_url: isDataPack(product)
          ? `${SITE_URL}/data-packs?checkout=cancelled`
          : `${SITE_URL}/construction/pricing?checkout=cancelled`,
        mode: 'payment',
        line_items: [{
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: cents(q.subtotal),
            product_data: { name: q.label, description: q.description, tax_code: TAX_CODE },
          },
        }],
        payment_intent_data: { description: `${q.label} — one-time purchase` },
        // No `total` here any more: the taxed total is not knowable until Stripe
        // has the buyer's address, so the webhook reads it off the paid session
        // rather than trusting a figure guessed at session-creation time.
        metadata: {
          kind: 'product', product,
          subtotal: q.subtotal.toFixed(2),
        },
      });
      return done(session);
    }

    if (kind === 'build') {
      const tier = String(body.tier || '');
      if (!BUILDS[tier]?.online) return bad(400, 'That build is not available for online checkout.');

      // Validate the welcome code (if any) against the buyer's email.
      let discountPct = 0, appliedCode = null;
      if (code) {
        if (!email) return bad(400, 'Enter your email to use a welcome code.');
        const v = await validateCode(code, email);
        if (!v.valid) {
          const msg = {
            'not-found': 'That code doesn\'t exist.',
            'expired': 'That code has expired.',
            'used': 'That code has already been used.',
            'inactive': 'That code is no longer active.',
            'email-mismatch': 'That code was issued to a different email.',
          }[v.reason] || 'That code can\'t be used.';
          return asPage ? htmlError(res, 400, msg) : res.status(400).json({ error: msg, codeInvalid: true });
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
            description: `Project total ${money(q.buildTotal)} before tax${discountPct ? ` (${discountPct}% code applied)` : ''}. ${dRate}% deposit now; balance ${money(q.balanceLater)} invoiced on completion. Tax calculated below for your region.`,
            tax_code: TAX_CODE,
          },
        },
      }];
      if (addOn) {
        line_items.push({
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: cents(q.addonPrice),
            product_data: { name: `${ADDON.localMachine.label} (one-time)`, description: 'Dedicated local machine — yours to keep, no ongoing cost.', tax_code: PHYSICAL_TAX_CODE },
          },
        });
      }

      const session = await sk.checkout.sessions.create({
        ...base,
        ...recovery,
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
      return done(session);
    }

    if (kind === 'marketing') {
      const tier = String(body.tier || '');
      if (!MARKETING[tier]) return bad(400, 'Unknown marketing package.');
      const q = quoteMarketing({ tier });
      const session = await sk.checkout.sessions.create({
        ...base,
        ...recovery,
        mode: 'payment',
        line_items: [{
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: cents(q.subtotal),
            product_data: { name: q.label, description: 'One-time marketing package. Tax calculated for your region at checkout.', tax_code: TAX_CODE },
          },
        }],
        metadata: { kind: 'marketing', tier },
      });
      return done(session);
    }

    if (kind === 'support') {
      const plan = String(body.plan || '');
      if (!SUPPORT[plan]) return bad(400, 'Unknown support plan.');
      const q = quoteSupport({ plan });
      const session = await sk.checkout.sessions.create({
        ...base,
        mode: 'subscription',
        line_items: [{
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: cents(q.subtotal),
            recurring: { interval: q.interval },
            product_data: { name: q.label, description: `Recurring support plan, billed per ${q.interval}. Tax calculated for your region at checkout.`, tax_code: TAX_CODE },
          },
        }],
        metadata: { kind: 'support', plan },
        // Carried onto the subscription so every renewal invoice is taxed from
        // the customer's current address, not just the first one.
        subscription_data: { metadata: { kind: 'support', plan } },
      });
      return done(session);
    }

    return bad(400, 'Unknown checkout kind.');
  } catch (err) {
    console.error('Checkout error:', err?.message || err, '| live:', isLiveKey());
    return bad(500, 'Something went wrong starting your checkout.');
  }
}
