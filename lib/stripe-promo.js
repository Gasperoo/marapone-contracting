/**
 * Welcome discount: a real, unique, single-use 10%-off Stripe promotion code
 * per subscriber — backed by one shared coupon. Falls back to a static code if
 * Stripe isn't configured, so the welcome email always has a code to show.
 *
 * For the codes to work at checkout, your Stripe Payment Links / Checkout must
 * have "Allow promotion codes" enabled. See emails/README.md.
 */

import Stripe from 'stripe';

const COUPON_ID = 'mailing-welcome-10';        // stable id — created once, reused forever
const STATIC_FALLBACK = process.env.WELCOME_PROMO_CODE || 'MARAPONE10';
const VALID_DAYS = 30;

let stripe = null;
function client() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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
      name: 'Mailing list welcome — 10% off first build',
    });
  }
}

function randomCode() {
  const s = Math.random().toString(36).slice(2, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `WELCOME-${(s + 'X4K9TQ').slice(0, 6)}`;
}

/**
 * @returns {Promise<{code:string, expires:Date, unique:boolean}>}
 */
export async function createWelcomePromoCode() {
  const expires = new Date(Date.now() + VALID_DAYS * 864e5);
  const sk = client();
  if (!sk) return { code: STATIC_FALLBACK, expires, unique: false };

  try {
    const coupon = await ensureCoupon(sk);
    const promo = await sk.promotionCodes.create({
      coupon: coupon.id,
      code: randomCode(),
      max_redemptions: 1,
      expires_at: Math.floor(expires.getTime() / 1000),
    });
    return { code: promo.code, expires, unique: true };
  } catch (err) {
    console.error('Stripe promo code error:', err?.message || err);
    return { code: STATIC_FALLBACK, expires, unique: false };
  }
}
