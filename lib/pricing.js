/**
 * Marapone pricing catalog + checkout math — the single source of truth shared
 * by the checkout API and the front-end widget.
 *
 * What can be bought online (Stripe):
 *   - Builds: Starter, Pilot   → pay a DEPOSIT now (25% / 35%), balance invoiced
 *                                 later. Full Build / Plus stay manual.
 *   - Marketing: Starter, Growth, Pro → one-time, full payment.
 *   - Support: Flex, Annual    → recurring subscription.
 *
 * Tax: a flat 13% HST is added to taxable items. The local-machine add-on is
 * NOT taxed and is paid in full at checkout. The welcome code (10%) applies to
 * the build only — never to the hardware add-on.
 *
 * All amounts are CAD. Money is handled in dollars here; the API converts to
 * cents for Stripe.
 */

export const HST = 0.13;
export const CURRENCY = 'cad';

// One-time AI builds. Only starter/pilot are self-serve; full/plus are manual.
export const BUILDS = {
  starter: { label: 'Starter', price: 1500, depositRate: 0.25, online: true },
  pilot:   { label: 'Pilot',   price: 4900, depositRate: 0.35, online: true },
  full:    { label: 'Full Build', price: 9500,  online: false },
  plus:    { label: 'Plus',       price: 15000, online: false },
};

// Optional hardware add-on for starter/pilot: full price, no tax, no discount.
export const ADDON = {
  localMachine: { label: 'Dedicated local machine', price: 1000, taxable: false },
};

// Marketing packages — one-time, taxable, no deposit.
export const MARKETING = {
  starter: { label: 'Marketing Starter', price: 1500 },
  growth:  { label: 'Marketing Growth',  price: 2500 },
  pro:     { label: 'Marketing Pro',     price: 5000 },
};

// Support plans — recurring subscriptions, taxable.
export const SUPPORT = {
  flex:   { label: 'Support Flex',   price: 499,  interval: 'month' },
  annual: { label: 'Support Annual', price: 3500, interval: 'year' },
};

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Quote a Starter/Pilot build deposit checkout.
 * @param {object} o
 * @param {'starter'|'pilot'} o.tier
 * @param {boolean} [o.addOn]        include the dedicated local machine
 * @param {number}  [o.discountPct]  0–100, the welcome code's percent_off (build only)
 * @returns full breakdown in dollars
 */
export function quoteBuild({ tier, addOn = false, discountPct = 0 }) {
  const b = BUILDS[tier];
  if (!b || !b.online) throw new Error(`Tier "${tier}" is not available for online checkout.`);
  const d = Math.max(0, Math.min(100, discountPct)) / 100;

  const buildSubtotal = b.price;                       // pre-tax build price
  const buildTax = round2(buildSubtotal * HST);        // 13% HST
  const buildAfterTax = round2(buildSubtotal + buildTax);
  const buildDiscount = round2(buildAfterTax * d);     // 10% off the taxed total
  const buildTotal = round2(buildAfterTax - buildDiscount); // discounted project total (build)

  const depositRate = b.depositRate;
  const depositBuild = round2(buildTotal * depositRate);    // deposit on the build
  const balanceLater = round2(buildTotal - depositBuild);   // invoiced on completion

  const addonPrice = addOn ? ADDON.localMachine.price : 0;  // full, untaxed, undiscounted
  const dueNow = round2(depositBuild + addonPrice);         // charged at checkout

  return {
    tier, label: b.label, addOn: !!addOn,
    buildSubtotal, hstRate: HST, buildTax, buildAfterTax,
    discountPct: d * 100, buildDiscount, buildTotal,
    depositRate, depositBuild,
    addonPrice, dueNow, balanceLater,
  };
}

/** Quote a one-time marketing package (with HST shown separately). */
export function quoteMarketing({ tier }) {
  const m = MARKETING[tier];
  if (!m) throw new Error(`Unknown marketing tier "${tier}".`);
  const tax = round2(m.price * HST);
  return { tier, label: m.label, subtotal: m.price, hstRate: HST, tax, total: round2(m.price + tax) };
}

/** Quote a recurring support plan (HST added per period). */
export function quoteSupport({ plan }) {
  const s = SUPPORT[plan];
  if (!s) throw new Error(`Unknown support plan "${plan}".`);
  const tax = round2(s.price * HST);
  return { plan, label: s.label, interval: s.interval, subtotal: s.price, hstRate: HST, tax, total: round2(s.price + tax) };
}
