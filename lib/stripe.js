/**
 * Shared Stripe client. Pins a stable API version because the account default
 * (a newer "clover" version) restructured promotion codes and rejects `coupon`
 * on create. Lazy-initialised; returns null when STRIPE_SECRET_KEY is unset.
 */
import Stripe from 'stripe';

export const STRIPE_API_VERSION = '2024-06-20';

let _stripe = null;
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: STRIPE_API_VERSION });
  return _stripe;
}

export function isLiveKey() {
  return (process.env.STRIPE_SECRET_KEY || '').startsWith('sk_live');
}

// Find-or-create a flat 13% HST tax rate (reused across checkouts).
let _hstRateId = null;
export async function ensureHstTaxRate(sk) {
  if (_hstRateId) return _hstRateId;
  const existing = await sk.taxRates.list({ active: true, limit: 100 });
  const found = existing.data.find((r) => r.percentage === 13 && /hst/i.test(r.display_name || ''));
  if (found) { _hstRateId = found.id; return _hstRateId; }
  const created = await sk.taxRates.create({
    display_name: 'HST',
    description: 'Harmonized Sales Tax (Ontario)',
    percentage: 13,
    inclusive: false,
    country: 'CA',
    state: 'ON',
    jurisdiction: 'CA-ON',
  });
  _hstRateId = created.id;
  return _hstRateId;
}
