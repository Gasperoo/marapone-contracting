/**
 * Post-purchase fulfilment: what the buyer gets, and what we tell them.
 *
 * A $990 card charge on a company card is followed immediately by "did I just
 * waste a grand on something I can't set up?". Everything here exists to answer
 * that inside five minutes.
 *
 * ── The one rule ──────────────────────────────────────────────────────────────
 * Never promise a link that does not resolve. There is no download package or
 * licence-key system yet, so DOWNLOAD_URL is empty and every surface that would
 * use it degrades to the truth: the package and key are sent by hand within
 * FULFILMENT_HOURS. Fill DOWNLOAD_URL in and the same pages and emails become
 * the instant-delivery version with no other change.
 *
 * ── Source code is day 31, not day 0 ─────────────────────────────────────────
 * The refund window is what makes the guarantee real, and handing over the
 * repository on day 0 would make it unenforceable. The day-0 package is the
 * application and its local database; the source repository follows once the
 * 30-day window closes. Every page on the site states it this way — do not
 * describe a "source" or "developer" folder in the first download.
 *
 * ── Data packs are files, not software ───────────────────────────────────────
 * The same one rule applies to the pack storage URLs below, per SKU. Everything
 * else about a pack purchase differs from an application purchase — no install,
 * no licence key, no day-31 handover, a 14-day window instead of 30 — so packs
 * get their own copy and their own email sequence rather than sharing one that
 * would be describing somebody else's purchase.
 */
import { PACK_PARENT, PACK_REFUND_DAYS, PACK_UPGRADE_DAYS } from './pricing.js';

/** Direct link to the installable package. Empty until one exists. */
export const DOWNLOAD_URL = '';

/**
 * Where each pack's ZIP actually lives, read from the environment rather than
 * committed here — these are paid files, so they must not sit in `public/`
 * where anyone can enumerate them, and their storage URLs must not sit in git.
 *
 * Set one env var per pack, e.g.
 *   PACK_URL_CODE_LIBRARY=https://<bucket>/…/code-library-2026.zip
 *
 * Same rule as DOWNLOAD_URL: a pack with no URL set degrades every surface to
 * "sent by hand within PACK_FULFILMENT_HOURS". Set the var and that one pack
 * delivers itself — email link, success-page button, no human — with no other
 * change anywhere. The five packs are independent, so they can go live one at a
 * time as each is finished.
 *
 * Buyers never receive these URLs. They receive /api/download?session_id=…,
 * which checks the session is genuinely paid before redirecting here, so the
 * storage link cannot be forwarded or guessed.
 */
const PACK_ENV_VAR = {
  'pack-code-library': 'PACK_URL_CODE_LIBRARY',
  'pack-assembly-schema': 'PACK_URL_ASSEMBLY_SCHEMA',
  'pack-rate-2026': 'PACK_URL_RATE_2026',
  'pack-bid-leveling': 'PACK_URL_BID_LEVELING',
  'pack-scope-checklist': 'PACK_URL_SCOPE_CHECKLIST',
  'pack-bundle': 'PACK_URL_BUNDLE',
};

/** The private storage URL for a pack, or '' if that pack isn't live yet. */
export const packStorageUrl = (product) => {
  const key = PACK_ENV_VAR[product];
  return (key && process.env[key]) ? String(process.env[key]) : '';
};

export const hasPackDownload = (product) => !!packStorageUrl(product);

/**
 * How long after purchase the download link keeps working. It is a convenience
 * window, not a licence term — the buyer owns the files once downloaded. Long
 * enough that a link found in an old inbox still works, short enough that a
 * session id posted somewhere public stops being useful.
 */
export const PACK_LINK_DAYS = 30;

/**
 * The buyer-facing download link: a checked redirect, not the file itself.
 * Returns '' when the pack has no storage URL yet, which is what makes every
 * surface fall back to the honest hand-delivery wording.
 */
export const packDownloadLink = (product, sessionId) =>
  (hasPackDownload(product) && sessionId)
    ? `https://marapone.com/api/download?session_id=${encodeURIComponent(sessionId)}`
    : '';

/** A pack is a file, not an install, so its hand-delivery window is shorter. */
export const PACK_FULFILMENT_HOURS = 12;

/** A short install/first-run walkthrough (Loom, YouTube, or a self-hosted mp4). */
export const SETUP_VIDEO_URL = '';

/** How long a hand-delivered package takes, when there is no DOWNLOAD_URL. */
export const FULFILMENT_HOURS = 24;

/** Days after purchase for the check-in and the ecosystem email. */
export const CHECK_IN_DAYS = 2;
export const ASCENSION_DAYS = 7;

/**
 * Day the pack buyer hears about their upgrade credit. Comfortably inside the
 * PACK_UPGRADE_DAYS window, and late enough that they have opened the files.
 */
export const PACK_UPGRADE_EMAIL_DAYS = 7;

export const hasDownload = () => !!DOWNLOAD_URL;
export const hasSetupVideo = () => !!SETUP_VIDEO_URL;

/**
 * Per-product first-run guidance. `aha` is the specific thing the buyer should
 * watch for on their first real document — the moment that retires the remorse.
 */
export const FULFILMENT = {
  'blueprint-auditor': {
    label: 'Blueprint Auditor',
    firstRun: 'Drag a drawing set onto the dashboard.',
    aha: 'a coordination conflict between the architectural and structural sheets — the kind that normally surfaces as a change order',
    advice: 'Start with a drawing set you already know well. That way you can check its takeoff against your own numbers straight away.',
    next: { product: 'ai-estimator', why: 'the takeoff is only half the job — the quantities still have to get priced without being retyped' },
  },
  specchecker: {
    label: 'SpecChecker',
    firstRun: 'Load a project manual and the matching drawing set.',
    aha: 'a place where the drawings and the spec book disagree about a measurable property — the sort that is only found after the wall is closed in',
    advice: 'Run a job where you already know one conflict exists. Watching it find that one tells you what to trust it on.',
    next: { product: 'blueprint-auditor', why: 'the conflicts it finds are worth much more once the drawing set has also been measured and audited' },
  },
  'ai-estimator': {
    label: 'AI Estimator',
    firstRun: 'Open a project and enter or import your quantities.',
    aha: 'the contingency arriving with a written reason attached to it, instead of a flat percentage nobody can defend',
    advice: 'Price a bid you have already submitted. Comparing its number against the one you actually sent is the fastest way to calibrate it.',
    next: { product: 'blueprint-auditor', why: 'the quantities it prices can come straight off the drawings instead of being typed in' },
  },
  bidleveler: {
    label: 'Bid Leveler',
    firstRun: 'Drop in the quotes from one trade package.',
    aha: 'the cheapest number turning out not to be the cheapest bid once the gaps are priced from the other quotes',
    advice: 'Use a package you have already awarded. If it flags something you argued about later, you know what it is worth.',
    next: { product: 'scopeguard', why: 'the levelled position is the budget the buyout then has to hold' },
  },
  scopeguard: {
    label: 'ScopeGuard',
    firstRun: 'Load your tender package, then the subcontractor proposals.',
    aha: 'scope that two trades are both carrying, or that nobody priced at all, with the number attached',
    advice: 'Run a job that is mid-buyout. The findings are actionable while the subcontracts are still being written.',
    next: { product: 'bidleveler', why: 'levelling the quotes before award is how that exposure gets smaller in the first place' },
  },
  suite: {
    label: 'the full suite',
    subjectLabel: 'full suite',
    firstRun: 'Start with Blueprint Auditor and a drawing set you know.',
    aha: 'one job carrying from the drawing set through to the awarded subcontract without a number being retyped',
    advice: 'Run one real project end to end rather than sampling each app. The handoffs between them are the part you paid for.',
    next: null,
  },
};

export const fulfilmentFor = (product) => FULFILMENT[product] || null;

/**
 * Per-pack first-use guidance. A pack buyer has no install to get through, so
 * the useful thing to tell them is where to open it and what it is for — and,
 * once, that the matching application does the matching for them. Said once,
 * in the day-7 email, not in the receipt.
 */
export const PACK_FULFILMENT = {
  'pack-code-library': {
    label: 'the Building Code Compliance Library',
    opens: 'Open the folder for the jurisdiction you are working in — each one holds the same PDF and CSV pair.',
    use: 'The CSV is the one to start with. It drops straight into a spreadsheet, and every check carries a plain-language note about what it is actually looking for.',
  },
  'pack-assembly-schema': {
    label: 'the Assembly Property Schema',
    opens: 'Open either the north-america or the europe folder — CSI MasterFormat in one, EN/Eurocode in the other.',
    use: 'They are deliberately not merged. Pick the standard your documents are written to rather than trying to reconcile the two.',
  },
  'pack-rate-2026': {
    label: 'the Estimating Rate Pack (2026 Edition)',
    opens: 'Open the rate table for your jurisdiction, then the contingency framework alongside it.',
    use: 'Every statutory number carries its citation in the row beside it. Check the ones that will move your bid before you rely on them — these are costing inputs, not legal advice.',
  },
  'pack-bid-leveling': {
    label: 'the Bid-Leveling Template',
    opens: 'Open the blank comparison matrix and the scope-element checklist behind it.',
    use: 'Read the region-notes tab first if you tender on both sides of the Atlantic — bonding and retainage conventions are where the two diverge.',
  },
  'pack-scope-checklist': {
    label: 'the Master Scope Requirement Checklist',
    opens: 'Open the checklist and filter it to the trade packages on your job.',
    use: 'Every requirement carries its CSI code, so it sorts into the same order as your tender package.',
  },
  'pack-bundle': {
    label: 'the full Data Pack Bundle',
    opens: 'Five folders, one per library. Start with whichever matches the job on your desk.',
    use: 'They share a spine: everything is indexed by CSI code in North America and by EN reference in Europe, so a requirement, its assembly and its rate line up across the packs.',
  },
};

export const packFulfilmentFor = (product) => PACK_FULFILMENT[product] || null;

/* ───────────────────────── email bodies ─────────────────────────────────────
 * Deliberately plain. A heavily designed HTML email reads as marketing and gets
 * filed as marketing; these should read like the founder wrote them, because
 * the reply-to is a person and replies are wanted.
 * ------------------------------------------------------------------------- */

const SITE = 'https://marapone.com';
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

// The text/plain alternative: line breaks have to survive, then tags go.
const toText = (lines) => lines
  .map((l) => (l.startsWith('__') ? l.slice(2) : l)   // '__' is the link marker used by plain()
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ''))
  .join('\n');

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

/** Wraps plain paragraphs in the lightest possible HTML shell. */
function plain(lines) {
  const body = lines.map((l) => {
    if (l === '') return '';
    if (l.startsWith('__')) return `<p style="margin:0 0 16px"><a href="${esc(l.slice(2))}" style="color:#c2540a;font-weight:600">${esc(l.slice(2))}</a></p>`;
    return `<p style="margin:0 0 16px">${l}</p>`;
  }).filter(Boolean).join('\n');
  return `<div style="font-family:${FONT};font-size:15px;line-height:1.6;color:#1a1a1a;max-width:560px">${body}</div>`;
}

const firstName = (name, email) => {
  const n = (name || '').trim().split(/\s+/)[0];
  if (n && /^[\p{L}'-]{2,}$/u.test(n)) return n;
  return (email || '').split('@')[0] || 'there';
};

/** How the package is referred to, given whether a download exists. */
function deliveryLines(f) {
  if (hasDownload()) {
    return [
      `<a href="${esc(DOWNLOAD_URL)}" style="color:#c2540a;font-weight:600">Download your package</a>`,
      '',
      '<strong>To get started right now:</strong>',
      '1. Download and extract the folder.<br/>'
      + '2. Run the installer — about 30 seconds, and nothing else to configure.<br/>'
      + `3. ${esc(f.firstRun)}`,
    ];
  }
  return [
    `Your package and licence key are sent by hand, and they will be with you within ${FULFILMENT_HOURS} hours — `
    + 'usually much sooner. Nothing is needed from you in the meantime.',
    '',
    '<strong>What arrives, and what to do with it:</strong>',
    '1. A download link and your licence key, in a reply to this email.<br/>'
    + '2. Run the installer — about 30 seconds, and nothing else to configure.<br/>'
    + `3. ${esc(f.firstRun)}`,
  ];
}

/** Email 1 — immediate. Confirms the purchase and sets the first action. */
export function handoffEmail({ name, email, product, amount }) {
  const f = fulfilmentFor(product) || FULFILMENT.suite;
  const lines = [
    `Hey ${esc(firstName(name, email))},`,
    '',
    `Your payment cleared and ${esc(f.label)} is yours.`,
    '',
    'This is software that runs on your own machine. No monthly fee, no seat count, '
    + 'and none of your drawings or pricing ever touch our servers — it works with the wifi off.',
    '',
    ...deliveryLines(f),
    '',
    esc(f.advice),
    '',
    'On the source code: it is handed over on day 31, once your 30-day refund window closes. '
    + 'That order is deliberate — it is what makes the guarantee real rather than decorative. '
    + 'The application itself is complete from the first run and needs nothing from a developer.',
    '',
    'If anything at all snags during setup, reply straight to this email. It comes to a person.',
    '',
    '— Marapone',
  ];
  return {
    subject: `Your ${f.subjectLabel || f.label}${hasDownload() ? '' : ' — what happens next'}`,
    html: plain(lines),
    text: toText(lines),
  };
}

/** Email 2 — day 2. Pushes a first real run, and de-risks before they ask. */
export function checkInEmail({ name, email, product, amount }) {
  const f = fulfilmentFor(product) || FULFILMENT.suite;
  const lines = [
    `Hey ${esc(firstName(name, email))},`,
    '',
    `Checking in — did you get ${esc(f.label)} running?`,
    '',
    `Have you put a real document through it yet? The moment it usually clicks is seeing it flag ${esc(f.aha)}.`,
    '',
    `A reminder you should not have to ask for: you have 30 days, no questions asked. `
    + `Run this on live work. If it does not save you hours this week, say so and the `
    + `${amount ? esc(amount) : 'purchase'} goes back — no case to make.`,
    '',
    'And if it is sitting unopened because the setup looked like a job, reply and I will walk you '
    + 'through it directly. That is a five-minute problem, not a refund.',
    '',
    'Tell me what the outputs look like on your own files.',
    '',
    '— Marapone',
  ];
  return {
    subject: `Did it catch anything?`,
    html: plain(lines),
    text: toText(lines),
  };
}

/**
 * Email 3 — day 7. The next step in the workflow, not a discount blast.
 * Suppressed for suite buyers, who already own the whole path.
 */
export function ascensionEmail({ name, email, product }) {
  const f = fulfilmentFor(product);
  if (!f || !f.next) return null;
  const nx = fulfilmentFor(f.next.product);
  if (!nx) return null;

  const lines = [
    `Hey ${esc(firstName(name, email))},`,
    '',
    `A week in, so you have probably got ${esc(f.label)} into a real job by now.`,
    '',
    `Most people hit the same wall next: ${esc(f.next.why)}.`,
    '',
    `That is what ${esc(nx.label)} does, and because the two were built to sit together, `
    + `the output of one loads into the other rather than being copied across by hand.`,
    '',
    `Either one is ${'$990'} on its own. All five together are $3,950 — which is where a job runs `
    + `from the drawing set to the awarded subcontract with nothing retyped:`,
    `__${SITE}/construction/pricing#products`,
    '',
    'If what you actually want is this wired into Procore, Sage or Bluebeam so nobody has to '
    + 'open a separate application at all, that is a custom build and it starts with a scoping '
    + 'call rather than a checkout:',
    `__${SITE}/construction/contact`,
    '',
    'Either way, no rush. What you bought keeps working on its own.',
    '',
    '— Marapone',
  ];
  return {
    subject: `The step after ${f.label.replace(/^the /, '')}`,
    html: plain(lines),
    text: toText(lines),
  };
}

/* ───────────────────────── data-pack emails ─────────────────────────────────
 * A pack buyer spent $59–$349 on files, not $990 on software. They do not need
 * install steps, a licence key or a day-31 source handover, and telling them
 * about any of it would read as a form letter written for somebody else.
 * ------------------------------------------------------------------------- */

/** Pack email 1 — immediate. Delivers it, or says honestly when it lands. */
export function packHandoffEmail({ name, email, product, sessionId }) {
  const f = packFulfilmentFor(product);
  if (!f) return null;
  const url = packDownloadLink(product, sessionId);

  const delivery = url
    ? [
      `<a href="${esc(url)}" style="color:#c2540a;font-weight:600">Download ${esc(f.label)}</a>`,
      '',
      `That link works for ${PACK_LINK_DAYS} days, and the files are yours to keep once downloaded.`,
      '',
      esc(f.opens),
    ]
    : [
      `Your download link is sent by hand and will be with you within ${PACK_FULFILMENT_HOURS} hours — `
      + 'usually a lot sooner. Nothing is needed from you in the meantime.',
      '',
      `When it lands: ${esc(f.opens)}`,
    ];

  const lines = [
    `Hey ${esc(firstName(name, email))},`,
    '',
    `Your payment cleared and ${esc(f.label)} is yours.`,
    '',
    ...delivery,
    '',
    esc(f.use),
    '',
    `This is a reference library, not software — there is nothing to install and nothing to keep `
    + `running. It is yours to use on client work, and to copy into your own spreadsheets and scripts. `
    + `What it is not is redistributable: please don't resell it or publish it as your own.`,
    '',
    `If it isn't what you expected, you have ${PACK_REFUND_DAYS} days — reply and the money goes back.`,
    '',
    'Reply to this email with anything at all. It comes to a person.',
    '',
    '— Marapone',
  ];
  return {
    subject: `Your ${f.label.replace(/^the /, '')}`,
    html: plain(lines),
    text: toText(lines),
  };
}

/**
 * Pack email 2 — day 7. The upgrade credit is a real, dated offer, so it is
 * worth one email. Sent once, and only while the window is genuinely open.
 */
export function packUpgradeEmail({ name, email, product }) {
  const f = packFulfilmentFor(product);
  const parentKey = PACK_PARENT[product];
  const parent = parentKey && (fulfilmentFor(parentKey) || FULFILMENT.suite);
  if (!f || !parent) return null;

  const lines = [
    `Hey ${esc(firstName(name, email))},`,
    '',
    `A week in — has ${esc(f.label)} been any use on a live job yet?`,
    '',
    `One thing worth knowing before it lapses: what you paid for the pack comes off the price of `
    + `${esc(parent.label)} if you upgrade within ${PACK_UPGRADE_DAYS} days of your purchase. `
    + `No code to enter — reply to this email and we will apply it.`,
    '',
    `The difference is who does the matching. The pack is the library; you read your own documents `
    + `against it. ${esc(parent.label)} reads them for you and reports ${esc(parent.aha)}.`,
    '',
    `__${SITE}/construction/pricing#products`,
    '',
    'And if the pack is doing the job on its own, that is a perfectly good outcome — it needs '
    + 'nothing further from you or from us.',
    '',
    '— Marapone',
  ];
  return {
    subject: `Your upgrade credit — ${PACK_UPGRADE_DAYS} days from purchase`,
    html: plain(lines),
    text: toText(lines),
  };
}

/**
 * The onboarding sequence for a purchase, as data the webhook can just walk.
 * Packs and applications get different sequences; anything unrecognised gets
 * none, which is how a build deposit stays out of the buyer sequence.
 *
 * `at` is a delay in days, or null for "send now".
 */
export function onboardingSequence(product) {
  if (packFulfilmentFor(product)) {
    return [
      { at: null, mk: packHandoffEmail, tag: 'pack-handoff' },
      { at: PACK_UPGRADE_EMAIL_DAYS, mk: packUpgradeEmail, tag: 'pack-upgrade' },
    ];
  }
  if (fulfilmentFor(product)) {
    return [
      { at: null, mk: handoffEmail, tag: 'handoff' },
      { at: CHECK_IN_DAYS, mk: checkInEmail, tag: 'check-in' },
      { at: ASCENSION_DAYS, mk: ascensionEmail, tag: 'next-step' },
    ];
  }
  return [];
}
