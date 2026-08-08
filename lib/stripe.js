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

/**
 * Tax is computed by Stripe Tax from the buyer's address, not by us.
 *
 * This replaced a hand-rolled flat 13% HST rate that was attached to every line
 * item on the site. That rate was correct for an Ontario buyer and wrong for
 * everybody else: it charged Ontario tax to buyers in Texas and Germany, and it
 * collected no EU VAT at all on pages that market to the EU.
 *
 * Two things have to be true in the Stripe Dashboard for this to do anything:
 *
 *   1. Tax → Settings: origin address and a default tax code are set, and Tax is
 *      switched on. (Both test and live mode — they are configured separately.)
 *   2. Tax → Registrations: a registration exists for every jurisdiction we are
 *      obliged to collect in. Stripe deliberately computes ZERO tax where there
 *      is no registration — that is the correct behaviour, not a failure. So
 *      until an EU/OSS or US state registration is added there, those sales are
 *      simply untaxed rather than wrongly taxed.
 *
 * `SPREAD` is applied to every session; `TAX_CODE` is applied per line item so
 * downloadable files and services are classified rather than falling through to
 * the account default.
 */

/**
 * Stripe tax code for electronically supplied services — the right bucket for
 * downloadable software and the data-pack files, and what drives EU VAT place-
 * of-supply rules. Services (builds, marketing) use the same code: they are
 * delivered electronically too.
 */
export const TAX_CODE = 'txcd_10000000';

/**
 * Stripe tax code for general tangible goods — the local-machine add-on. A
 * physical box shipped to a buyer is taxed on where it lands, under different
 * rules from a download, so it must not inherit TAX_CODE above.
 */
export const PHYSICAL_TAX_CODE = 'txcd_99999999';

/**
 * Session-level tax settings, spread into every Checkout session.
 *
 * `billing_address_collection: 'required'` is not optional here — automatic tax
 * cannot compute a rate without an address, and Stripe rejects the session if it
 * has no way to get one. `tax_id_collection` is what lets an EU or UK business
 * enter its VAT number and get the reverse charge applied instead of paying VAT
 * it would only have to reclaim.
 */
export const TAX_SPREAD = {
  automatic_tax: { enabled: true },
  tax_id_collection: { enabled: true },
  billing_address_collection: 'required',
};
