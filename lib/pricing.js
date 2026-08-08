/**
 * Marapone pricing catalog + checkout math — the single source of truth shared
 * by the checkout API and the front-end widget.
 *
 * What can be bought online (Stripe):
 *   - Builds: Starter, Pilot   → pay a DEPOSIT now (25% / 35%), balance invoiced
 *                                 later. Full Build / Plus stay manual.
 *   - Marketing: Starter, Growth, Pro → one-time, full payment.
 *   - Support: Flex, Annual    → recurring subscription.
 *   - Data packs: the reference libraries on their own, as files → one-time,
 *                                 full payment, 14-day refund instead of 30.
 *
 * Tax: NOT decided here. Every amount below is a pre-tax price, and Stripe Tax
 * computes what is actually owed from the buyer's address at checkout — 13% HST
 * for an Ontario buyer, GST+PST for a BC one, the right state rate for a US one,
 * the right VAT rate for an EU one, and nothing at all in a jurisdiction we are
 * not registered in. The site used to add a flat 13% HST to everyone, which
 * quietly charged Ontario tax to buyers in Texas and Germany and collected no EU
 * VAT at all on pages that actively market to the EU.
 *
 * The one number that has to stay in step with this file is HST_DISPLAY, used
 * only to show a worked example to Ontario readers. It is never charged from
 * here.
 *
 * All amounts are CAD. Money is handled in dollars here; the API converts to
 * cents for Stripe.
 */

/**
 * Ontario's rate, for illustration in copy only. Tax actually charged is
 * whatever Stripe Tax computes for the buyer — never this constant.
 */
export const HST_DISPLAY = 0.13;
export const CURRENCY = 'cad';

// One-time AI builds. Only starter/pilot are self-serve; full/plus are manual.
export const BUILDS = {
  starter: { label: 'Starter', price: 1500, depositRate: 0.25, online: true },
  pilot:   { label: 'Pilot',   price: 4900, depositRate: 0.35, online: true },
  full:    { label: 'Full Build', price: 9500,  online: false },
  plus:    { label: 'Plus',       price: 15000, online: false },
};

// Optional hardware add-on for starter/pilot: full price, no discount. It is a
// physical machine, so it is taxable like everything else — Stripe Tax works out
// the rate. (It was previously sold as "no tax", which was never right for a
// tangible good and is not something automatic tax can be asked to pretend.)
export const ADDON = {
  localMachine: { label: 'Dedicated local machine', price: 1000 },
};

// Finished software, bought off the shelf. Nothing to scope, so these are paid
// in full at checkout rather than by deposit like the custom builds.
export const PRODUCTS = {
  'blueprint-auditor': {
    label: 'Blueprint Auditor',
    price: 990,
    description: 'Takeoff, scope-gap detection and tender risk, read straight off the drawing set. One-time purchase, full source code, no subscription.',
  },
  'ai-estimator': {
    label: 'AI Estimator',
    price: 990,
    description: 'Turns measured quantities into a priced, risk-adjusted bid — assemblies, contingency, Toronto soft costs and bid strategy. One-time purchase, full source code, no subscription.',
  },
  scopeguard: {
    label: 'ScopeGuard',
    price: 990,
    description: 'Reads your tender package and every subcontractor proposal, then reports what nobody priced, what two trades are both carrying and which wording will not survive a dispute. One-time purchase, full source code, no subscription.',
  },
  specchecker: {
    label: 'SpecChecker',
    price: 990,
    description: 'Reads the project manual against the drawing set and reports every place the two contract documents disagree about a measurable property, with both statements, both references and a drafted RFI. One-time purchase, full source code, no subscription.',
  },
  bidleveler: {
    label: 'Bid Leveler',
    price: 990,
    description: 'Reads a dozen subcontractor quotes in a dozen formats, normalises them to the same scope and reports what each bid would actually cost — with the basis printed on every adjustment. One-time purchase, full source code, no subscription.',
  },
  // The bundle is defined as *every* finished product, not a fixed pair or
  // trio: the whole argument for it is that one job carries through without
  // being retyped, so a bundle missing a stage would not make that argument.
  // `pair` is kept as an alias so a checkout link posted before ScopeGuard
  // shipped still resolves — it quotes the suite.
  suite: {
    label: 'Blueprint Auditor + SpecChecker + AI Estimator + Bid Leveler + ScopeGuard',
    price: 3950,
    description: 'All five products, wired together so one job runs from the drawing set to the awarded subcontract with nothing retyped. Includes a setup call on a real job of yours. One-time purchase, full source code, no subscription.',
  },
};
PRODUCTS.pair = PRODUCTS.suite;

/**
 * Data packs — the reference libraries the apps read, sold on their own as
 * files. They live in PRODUCTS so checkout, the webhook and the quote helper
 * need no new code path, but they are marked `pack: true` because almost
 * everything downstream of the payment differs from a $990 application:
 *
 *   - no installer, no licence key, no source-code handover on day 31
 *   - a 14-day refund window, not 30 (a file cannot be "tried on live work"
 *     for a month the way an application can, and it cannot be un-copied)
 *   - the buyer lands on /construction/data-pack-complete, not the software
 *     success page, which is all installer steps that would not apply
 *
 * Prices are CAD like everything else on the site. Anything downstream that
 * needs to tell a pack from an application should read this flag rather than
 * matching on the key prefix.
 */
const PACK_TAIL = 'One-time purchase, no subscription. Tax calculated for your region at checkout.';

export const DATA_PACKS = {
  'pack-code-library': {
    label: 'Building Code Compliance Library',
    price: 89,
    description: `The code-check ruleset behind Blueprint Auditor, as PDF + CSV — 101 checks across Ontario (Building Code, Fire Code, AODA) and the City of Toronto (Zoning By-law 569-2013, Green Standard), each with its clause, severity and correction. ${PACK_TAIL}`,
  },
  'pack-assembly-schema': {
    label: 'Assembly Property Schema',
    price: 89,
    description: `The structured assembly data behind SpecChecker, as JSON + CSV — 27 measurable properties across 39 assemblies, mapped to CSI MasterFormat divisions and sections. ${PACK_TAIL}`,
  },
  'pack-rate-2026': {
    label: 'Estimating Rate Pack — 2026 Edition',
    price: 99,
    description: `Ontario statutory rates (HST, WSIB, Construction Act holdback and prompt payment) and City of Toronto permits and development charges, plus the 26-rule contingency framework behind the AI Estimator. Dated edition — next year's rates ship as a new edition, not a silent update. ${PACK_TAIL}`,
  },
  'pack-bid-leveling': {
    label: 'Bid-Leveling Template',
    price: 59,
    description: `The 155-element scope checklist and a blank comparison matrix behind the Bid Leveler, with live gap and spread formulas for three bidders and an Ontario region-notes tab. ${PACK_TAIL}`,
  },
  'pack-scope-checklist': {
    label: 'Master Scope Requirement Checklist',
    price: 59,
    description: `The master scope-requirement library behind ScopeGuard — 215 requirements across 20 trade packages, each carrying its CSI code — plus an Ontario/Toronto region-notes layer. ${PACK_TAIL}`,
  },
  'pack-bundle': {
    label: 'The Full Data Pack Bundle — all five libraries',
    price: 349,
    description: `All five reference libraries — code compliance, assembly schema, estimating rates, bid levelling and scope requirements — sharing one CSI spine, in one download. Saves $46 against buying them separately. ${PACK_TAIL}`,
  },
};

for (const [key, pack] of Object.entries(DATA_PACKS)) {
  PRODUCTS[key] = { ...pack, pack: true };
}

/** True for the file-based reference libraries, false for the applications. */
export const isDataPack = (product) => !!PRODUCTS[product]?.pack;

/** What the five packs cost bought one at a time — the bundle's saving is derived, never typed twice. */
export const PACKS_SEPARATELY = Object.entries(DATA_PACKS)
  .filter(([key]) => key !== 'pack-bundle')
  .reduce((sum, [, pack]) => sum + pack.price, 0);

export const PACK_BUNDLE_SAVING = PACKS_SEPARATELY - DATA_PACKS['pack-bundle'].price;

/** Days a data-pack purchase can be refunded. The applications get 30. */
export const PACK_REFUND_DAYS = 14;

/** Days after a pack purchase that its matching app credit stays open. */
export const PACK_UPGRADE_DAYS = 60;

/** Which application each pack was carved out of — drives the upgrade credit. */
export const PACK_PARENT = {
  'pack-code-library': 'blueprint-auditor',
  'pack-assembly-schema': 'specchecker',
  'pack-rate-2026': 'ai-estimator',
  'pack-bid-leveling': 'bidleveler',
  'pack-scope-checklist': 'scopeguard',
  'pack-bundle': 'suite',
};

// Marketing packages — one-time, taxable, no deposit.
export const MARKETING = {
  starter: { label: 'Marketing Starter', price: 1500 },
  growth:  { label: 'Marketing Growth',  price: 2500 },
  pro:     { label: 'Marketing Pro',     price: 5000 },
};

// Support plans — recurring subscriptions, taxable. These must match the prices
// advertised on /construction/pricing: the page is the offer, and a subscriber
// who sees $249 and is charged anything else has been mischarged, not upsold.
export const SUPPORT = {
  flex:   { label: 'Support Flex',   price: 249,  interval: 'month' },
  annual: { label: 'Support Annual', price: 1750, interval: 'year' },
};

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Quote a Starter/Pilot build deposit checkout.
 *
 * Every figure returned is PRE-TAX. The deposit used to be a percentage of an
 * already-taxed total, which meant the tax was baked into one opaque line item
 * and could only ever be Ontario's rate. Taking the percentage pre-tax lets
 * Stripe add the buyer's own rate as its own visible line, and leaves the
 * Ontario buyer paying the same money as before.
 *
 * @param {object} o
 * @param {'starter'|'pilot'} o.tier
 * @param {boolean} [o.addOn]        include the dedicated local machine
 * @param {number}  [o.discountPct]  0–100, the welcome code's percent_off (build only)
 * @returns full pre-tax breakdown in dollars
 */
export function quoteBuild({ tier, addOn = false, discountPct = 0 }) {
  const b = BUILDS[tier];
  if (!b || !b.online) throw new Error(`Tier "${tier}" is not available for online checkout.`);
  const d = Math.max(0, Math.min(100, discountPct)) / 100;

  const buildSubtotal = b.price;                            // list price, pre-tax
  const buildDiscount = round2(buildSubtotal * d);          // welcome code, build only
  const buildTotal = round2(buildSubtotal - buildDiscount); // project total, pre-tax

  const depositRate = b.depositRate;
  const depositBuild = round2(buildTotal * depositRate);    // due now, pre-tax
  const balanceLater = round2(buildTotal - depositBuild);   // invoiced on completion, pre-tax

  const addonPrice = addOn ? ADDON.localMachine.price : 0;  // full price, no discount
  const dueNow = round2(depositBuild + addonPrice);         // pre-tax total at checkout

  return {
    tier, label: b.label, addOn: !!addOn,
    buildSubtotal, discountPct: d * 100, buildDiscount, buildTotal,
    depositRate, depositBuild,
    addonPrice, dueNow, balanceLater,
  };
}

/** Quote a finished software product. Pre-tax; Stripe adds the buyer's rate. */
export function quoteProduct({ product }) {
  const p = PRODUCTS[product];
  if (!p) throw new Error(`Unknown product "${product}".`);
  return { product, label: p.label, description: p.description, subtotal: p.price };
}

/** Quote a one-time marketing package. Pre-tax. */
export function quoteMarketing({ tier }) {
  const m = MARKETING[tier];
  if (!m) throw new Error(`Unknown marketing tier "${tier}".`);
  return { tier, label: m.label, subtotal: m.price };
}

/** Quote a recurring support plan. Pre-tax, per period. */
export function quoteSupport({ plan }) {
  const s = SUPPORT[plan];
  if (!s) throw new Error(`Unknown support plan "${plan}".`);
  return { plan, label: s.label, interval: s.interval, subtotal: s.price };
}
