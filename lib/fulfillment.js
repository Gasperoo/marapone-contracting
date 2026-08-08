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
 */

/** Direct link to the installable package. Empty until one exists. */
export const DOWNLOAD_URL = '';

/** A short install/first-run walkthrough (Loom, YouTube, or a self-hosted mp4). */
export const SETUP_VIDEO_URL = '';

/** How long a hand-delivered package takes, when there is no DOWNLOAD_URL. */
export const FULFILMENT_HOURS = 24;

/** Days after purchase for the check-in and the ecosystem email. */
export const CHECK_IN_DAYS = 2;
export const ASCENSION_DAYS = 7;

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
