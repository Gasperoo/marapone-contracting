/**
 * Welcome discount: a real, unique, single-use 10%-off Stripe promotion code
 * per subscriber, bound to that subscriber's own Stripe customer so it can't be
 * shared. Backed by one shared coupon. Falls back to a static code only if
 * Stripe isn't configured, so the welcome email always has something to show.
 *
 * Anti-abuse guarantees, per code:
 *   - unique           — a fresh random code string per subscriber
 *   - single-use        — max_redemptions: 1 (one redemption, ever)
 *   - time-limited      — expires_at = +30 days
 *   - per-customer      — restricted to the subscriber's Stripe customer, so a
 *                         forwarded code is rejected for anyone else's email
 *
 * For the codes to redeem, the discount has to be applied in a context tied to
 * that customer — Stripe Checkout / a Payment Link with "Allow promotion codes"
 * (email must match), or a Stripe Invoice raised against the same customer. See
 * emails/README.md.
 */

import Stripe from 'stripe';

const COUPON_ID = 'mailing-welcome-10';        // stable id — created once, reused forever
const STATIC_FALLBACK = process.env.WELCOME_PROMO_CODE || 'MARAPONE10';
const VALID_DAYS = 30;

// Pin a stable API version: the account default (a newer "clover" version)
// restructured promotion codes and no longer accepts `coupon` on create.
const STRIPE_API_VERSION = '2024-06-20';

let stripe = null;
function client() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: STRIPE_API_VERSION });
  return stripe;
}

// Find-or-create the shared 10%-off coupon.
async function ensureCoupon(sk) {
  try {
    return await sk.coupons.retrieve(COUPON_ID);
  } catch (_) {
    return await sk.coupons.create({
      id: COUPON_ID,
      percent_off: 10,
      duration: 'once',
      name: 'Mailing list welcome — 10% off',
    });
  }
}

// Find-or-create the Stripe customer for this email, so the code can be bound to
// them (and so Marapone invoices the same customer the code is attached to).
async function customerFor(sk, email) {
  const found = await sk.customers.list({ email, limit: 1 });
  if (found.data[0]) return found.data[0].id;
  const created = await sk.customers.create({ email, metadata: { source: 'mailing-list-welcome' } });
  return created.id;
}

function randomCode() {
  const s = Math.random().toString(36).slice(2, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `WELCOME-${(s + 'X4K9TQ').slice(0, 6)}`;
}

/**
 * Validate a welcome code for online checkout. Confirms it's active, unexpired,
 * unused, and — if it's customer-bound — that it belongs to the buyer's email
 * (this is what stops a forwarded code being used by someone else).
 *
 * @returns {Promise<{valid:boolean, reason?:string, percentOff?:number, code?:string, promotionCodeId?:string}>}
 */
export async function validateCode(code, email) {
  const sk = client();
  if (!sk) return { valid: false, reason: 'stripe-unconfigured' };
  const pc = (await sk.promotionCodes.list({ code, limit: 1 })).data[0];
  if (!pc) return { valid: false, reason: 'not-found' };
  const expired = pc.expires_at && pc.expires_at * 1000 < Date.now();
  const used = pc.max_redemptions != null && pc.times_redeemed >= pc.max_redemptions;
  if (!pc.active) return { valid: false, reason: 'inactive' };
  if (expired) return { valid: false, reason: 'expired' };
  if (used) return { valid: false, reason: 'used' };
  if (pc.customer) {
    const cust = await sk.customers.retrieve(pc.customer);
    if (email && cust?.email && cust.email.toLowerCase() !== String(email).toLowerCase()) {
      return { valid: false, reason: 'email-mismatch' };
    }
  }
  return { valid: true, percentOff: pc.coupon?.percent_off || 0, code: pc.code, promotionCodeId: pc.id };
}

// Deactivate a code so it can't be reused (single-use enforcement at booking).
export async function deactivateCode(code) {
  const sk = client();
  if (!sk) return false;
  const pc = (await sk.promotionCodes.list({ code, limit: 1 })).data[0];
  if (!pc || !pc.active) return false;
  await sk.promotionCodes.update(pc.id, { active: false });
  return true;
}

/**
 * @param {object} o
 * @param {string} [o.email]  Subscriber email — used to bind the code to a customer.
 * @returns {Promise<{code:string, expires:Date, unique:boolean, bound:boolean}>}
 */
export async function createWelcomePromoCode({ email } = {}) {
  const expires = new Date(Date.now() + VALID_DAYS * 864e5);
  const sk = client();
  if (!sk) return { code: STATIC_FALLBACK, expires, unique: false, bound: false };

  try {
    const coupon = await ensureCoupon(sk);
    const customer = email ? await customerFor(sk, email) : null;
    const promo = await sk.promotionCodes.create({
      coupon: coupon.id,
      code: randomCode(),
      max_redemptions: 1,
      expires_at: Math.floor(expires.getTime() / 1000),
      ...(customer ? { customer } : {}),
    });
    return { code: promo.code, expires, unique: true, bound: !!customer };
  } catch (err) {
    console.error('Stripe promo code error:', err?.message || err);
    return { code: STATIC_FALLBACK, expires, unique: false, bound: false };
  }
}
