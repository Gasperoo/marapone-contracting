/**
 * Marapone branded email system.
 * ---------------------------------------------------------------------------
 * One shared, email-client-safe "shell" that recreates the Marapone invoice /
 * website aesthetic — black canvas, the MARAPONE wordmark, the orange hairline
 * rule, the mono uppercase meta-strip, and the orange "amount due" box (reused
 * here as the discount box).
 *
 * FONTS: Hotmail / Gmail / Outlook strip web-font <link>s, so the distinctive
 * Bebas Neue display type is rendered as hosted PNG images (see HEADINGS +
 * tools/render-headings.js). Body copy stays DM Sans (web-safe fallbacks),
 * exactly like the website. If a heading image is missing or blocked, we fall
 * back to live text so nothing ever disappears.
 *
 * Used by:
 *   - api/newsletter-signup.js  (transactional welcome email)
 *   - tools/preview-emails.js   (local HTML previews)
 *   - tools/send-campaign.js    (Resend broadcasts to the audience)
 *   - tools/render-headings.js  (reads HEADINGS to render the PNGs)
 */

import MANIFEST from './heading-manifest.js';

export const SITE_URL = 'https://marapone.com';
const IMG_BASE = `${SITE_URL}/email/h`;

// Brand tokens — mirror tailwind.config.js, tuned for dark email rendering.
export const C = {
  page: '#0a0a0a',     // canvas behind the card
  card: '#141414',     // card surface
  header: '#0d0d0d',   // header band (matches invoice top block)
  panel: '#1a1a1a',    // inset panels / meta strip
  steel: '#2e2e2e',    // hairlines / borders
  plate: '#6e6e6e',    // muted mono labels
  fog: '#a0a0a0',      // secondary body text
  chalk: '#e8e8e8',    // primary text
  white: '#ffffff',
  hiviz: '#f97316',    // primary orange
  hiviz2: '#fb923c',   // lighter orange
  couponBg: '#251406', // dark orange-brown fill (the invoice "amount due" box)
  couponBd: '#7a3d10', // coupon border
};

const FONT_DISPLAY = "'Bebas Neue','Arial Narrow','Helvetica Neue',Arial,sans-serif";
const FONT_BODY = "'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const FONT_MONO = "'DM Mono','SFMono-Regular',Menlo,Consolas,'Courier New',monospace";

export function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

/* ---------------------------------------------------------------------------
 * Display headings — rendered as Bebas Neue PNGs (see tools/render-headings.js).
 * This registry is the single source of truth for both the email markup and
 * the image renderer. `text` is what gets rasterised (Bebas is caps-only);
 * `alt` is the human-readable fallback. `html` (with <i>…</i> = orange) is used
 * for the two-tone wordmark.
 * ------------------------------------------------------------------------- */
export const HEADINGS = {
  wordmark:      { html: 'MARA<i>PONE</i>', alt: 'MARAPONE', size: 34, tracking: 4, color: C.white, align: 'left' },

  // Header eyebrows (the big right-aligned word).
  'eb-welcome':  { text: 'WELCOME',  size: 40, tracking: 2, color: C.white, align: 'right' },
  'eb-briefing': { text: 'BRIEFING', size: 40, tracking: 2, color: C.white, align: 'right' },
  'eb-process':  { text: 'PROCESS',  size: 40, tracking: 2, color: C.white, align: 'right' },
  'eb-security': { text: 'SECURITY', size: 40, tracking: 2, color: C.white, align: 'right' },
  'eb-pricing':  { text: 'PRICING',  size: 40, tracking: 2, color: C.white, align: 'right' },

  // In-body hero headings (chalk).
  'h-welcome':   { text: "YOU'RE ON THE LIST.",                alt: "You're on the list.",                size: 34, tracking: 1, color: C.chalk, align: 'left' },
  'h-wwd':       { text: 'PRIVATE AI YOU ACTUALLY OWN.',       alt: 'Private AI you actually own.',       size: 32, tracking: 1, color: C.chalk, align: 'left' },
  'h-hiw':       { text: 'FROM FIRST CALL TO HANDOVER.',       alt: 'From first call to handover.',       size: 32, tracking: 1, color: C.chalk, align: 'left' },
  'h-dnl':       { text: 'YOUR DATA NEVER LEAVES YOUR NETWORK.', alt: 'Your data never leaves your network.', size: 27, tracking: 1, color: C.chalk, align: 'left' },
  'h-pricing':   { text: 'PRICED ONCE. OWNED FOREVER.',        alt: 'Priced once. Owned forever.',        size: 32, tracking: 1, color: C.chalk, align: 'left' },
};

// Live-text fallback (used when no rendered image exists yet, e.g. previews
// before the renderer has run, or in clients that block images via alt).
function liveHeading(h) {
  const txt = h.alt || h.text || '';
  return `<div style="font-family:${FONT_DISPLAY};font-weight:400;font-size:${h.size}px;line-height:1.05;letter-spacing:${h.tracking || 1}px;color:${h.color || C.chalk};text-transform:uppercase">${escapeHtml(txt)}</div>`;
}

// Emit a heading as an <img> (with live-text fallback if not yet rendered).
export function imgHeading(slug, { block = true } = {}) {
  const h = HEADINGS[slug];
  if (!h) return '';
  const m = MANIFEST[slug];
  if (!m) return liveHeading(h);
  const display = block ? 'block' : 'inline-block';
  return `<img src="${IMG_BASE}/${slug}.png" width="${m.w}" height="${m.h}" alt="${escapeHtml(h.alt || h.text || '')}" style="display:${display};border:0;outline:none;text-decoration:none;max-width:100%;height:auto" />`;
}

// Spacing wrapper for an in-body hero heading.
export function heading(slug, { mb = 16 } = {}) {
  return `<div style="margin:0 0 ${mb}px">${imgHeading(slug)}</div>`;
}

/* ---------------------------------------------------------------------------
 * Component helpers — compose these inside an email body.
 * ------------------------------------------------------------------------- */

export function label(text) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px">
    <tr>
      <td style="font-family:${FONT_MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.plate};white-space:nowrap;padding-right:12px">${escapeHtml(text)}</td>
      <td style="width:100%;border-top:1px solid ${C.steel};font-size:0;line-height:0">&nbsp;</td>
    </tr>
  </table>`;
}

export function p(text, { html = false, color = C.fog, size = 15 } = {}) {
  const content = html ? text : escapeHtml(text);
  return `<p style="font-family:${FONT_BODY};font-size:${size}px;line-height:1.62;color:${color};margin:0 0 18px">${content}</p>`;
}

export function lead(text) {
  return p(text, { color: C.chalk, size: 17 });
}

export function strong(text) {
  return `<strong style="color:${C.chalk};font-weight:600">${escapeHtml(text)}</strong>`;
}

export function accent(text) {
  return `<span style="color:${C.hiviz2}">${escapeHtml(text)}</span>`;
}

export function button(textLabel, url) {
  const safeUrl = escapeHtml(url);
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 24px">
    <tr>
      <td bgcolor="${C.hiviz}" style="border-radius:4px">
        <!--[if mso]>&nbsp;<![endif]-->
        <a href="${safeUrl}" target="_blank" style="display:inline-block;font-family:${FONT_BODY};font-size:14px;font-weight:600;letter-spacing:.3px;color:#0a0a0a;text-decoration:none;padding:14px 30px;border-radius:4px">${escapeHtml(textLabel)} &rarr;</a>
        <!--[if mso]>&nbsp;<![endif]-->
      </td>
    </tr>
  </table>`;
}

// The orange "AMOUNT DUE" box from the invoice — reused as the discount box.
export function couponBox({ tag = 'Your code', code, line }) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 26px">
    <tr>
      <td style="background:${C.couponBg};border:1px solid ${C.couponBd};border-radius:6px;padding:22px 24px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="font-family:${FONT_MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.hiviz};padding-bottom:6px">${escapeHtml(tag)}</td></tr>
          <tr><td style="font-family:${FONT_MONO};font-weight:500;font-size:26px;letter-spacing:3px;color:${C.hiviz2}">${escapeHtml(code)}</td></tr>
          ${line ? `<tr><td style="font-family:${FONT_BODY};font-size:13px;color:${C.fog};padding-top:8px">${escapeHtml(line)}</td></tr>` : ''}
        </table>
      </td>
    </tr>
  </table>`;
}

export function priceTable(rows) {
  const trs = rows.map((r) => `
    <tr>
      <td style="padding:14px 0;border-top:1px solid ${C.steel}">
        <div style="font-family:${FONT_BODY};font-size:15px;font-weight:600;color:${C.chalk}">${escapeHtml(r.name)}</div>
        ${r.note ? `<div style="font-family:${FONT_BODY};font-size:13px;color:${C.fog};padding-top:3px">${escapeHtml(r.note)}</div>` : ''}
      </td>
      <td align="right" valign="top" style="padding:14px 0;border-top:1px solid ${C.steel};white-space:nowrap">
        <span style="font-family:${FONT_MONO};font-weight:500;font-size:16px;color:${r.accent ? C.hiviz2 : C.chalk}">${escapeHtml(r.price)}</span>
      </td>
    </tr>`).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px">${trs}
    <tr><td colspan="2" style="border-top:1px solid ${C.steel};font-size:0;line-height:0">&nbsp;</td></tr></table>`;
}

export function divider() {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 24px"><tr><td style="border-top:1px solid ${C.steel};font-size:0;line-height:0">&nbsp;</td></tr></table>`;
}

export function steps(items) {
  const rows = items.map((it, i) => `
    <tr>
      <td valign="top" width="46" style="font-family:${FONT_MONO};font-size:13px;color:${C.hiviz};padding:0 0 ${i === items.length - 1 ? 0 : 22}px">${String(i + 1).padStart(2, '0')}</td>
      <td valign="top" style="padding:0 0 ${i === items.length - 1 ? 0 : 22}px">
        <div style="font-family:${FONT_BODY};font-size:15px;font-weight:600;color:${C.chalk};margin:0 0 4px">${escapeHtml(it.title)}</div>
        <div style="font-family:${FONT_BODY};font-size:14px;line-height:1.55;color:${C.fog}">${escapeHtml(it.body)}</div>
      </td>
    </tr>`).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px">${rows}</table>`;
}

export function checklist(items) {
  const rows = items.map((it, i) => `
    <tr>
      <td valign="top" width="26" style="font-family:${FONT_BODY};font-size:15px;color:${C.hiviz};padding:0 0 ${i === items.length - 1 ? 0 : 12}px">&#10003;</td>
      <td valign="top" style="font-family:${FONT_BODY};font-size:15px;line-height:1.5;color:${C.chalk};padding:0 0 ${i === items.length - 1 ? 0 : 12}px">${escapeHtml(it)}</td>
    </tr>`).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px">${rows}</table>`;
}

/* ---------------------------------------------------------------------------
 * The shell. Wraps any body in the full branded frame.
 * ------------------------------------------------------------------------- */

/**
 * @param {object} o
 * @param {string} o.eyebrowSlug  HEADINGS slug for the header word (e.g. 'eb-welcome').
 * @param {string} o.ref          Small mono ref under eyebrow (e.g. "# NEW MEMBER").
 * @param {string} o.preheader    Hidden inbox-preview text.
 * @param {Array<{label,value,accent?}>} [o.meta]  Invoice-style meta strip cells.
 * @param {string} o.body         Composed body HTML.
 * @param {string} [o.unsubscribeUrl]
 */
export function renderEmail({ eyebrowSlug, ref, preheader, meta = [], body, unsubscribeUrl = '{{{RESEND_UNSUBSCRIBE_URL}}}' }) {
  const eb = HEADINGS[eyebrowSlug];
  const title = (eb && (eb.alt || eb.text)) || 'Marapone';

  const metaCells = meta.map((m) => `
    <td valign="top" style="padding:0 22px;border-left:1px solid ${C.steel}">
      <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:${C.plate};padding-bottom:6px">${escapeHtml(m.label)}</div>
      <div style="font-family:${FONT_MONO};font-size:14px;letter-spacing:1px;color:${m.accent ? C.hiviz : C.chalk}">${escapeHtml(m.value)}</div>
    </td>`).join('');

  const metaStrip = meta.length ? `
    <tr>
      <td style="background:${C.panel};border-top:1px solid ${C.steel};border-bottom:1px solid ${C.steel};padding:20px 12px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>${metaCells}</tr></table>
      </td>
    </tr>` : '';

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${escapeHtml(title)} — Marapone</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    body{margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;}
    a{color:${C.hiviz2};}
    @media (max-width:620px){
      .mp-pad{padding-left:24px !important;padding-right:24px !important;}
      .mp-meta td{display:block !important;width:100% !important;border-left:0 !important;border-top:1px solid ${C.steel};padding:14px 0 0 !important;}
      .mp-meta td:first-child{border-top:0 !important;padding-top:0 !important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${C.page};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px">${escapeHtml(preheader || '')}</div>
  <div style="display:none;max-height:0;overflow:hidden">&#8204;&zwnj;&nbsp;&#847;&#160;&#847;&#160;&#847;&#160;&#847;&#160;</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
    <tr>
      <td align="center" style="padding:28px 14px 40px">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${C.card};border:1px solid ${C.steel};border-radius:10px;overflow:hidden">

          <!-- HEADER -->
          <tr>
            <td class="mp-pad" style="background:${C.header};padding:34px 40px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top">
                    ${imgHeading('wordmark')}
                    <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.hiviz};padding-top:8px">Contracting Inc. &nbsp;&middot;&nbsp; Private AI Solutions</div>
                  </td>
                  <td valign="top" align="right">
                    ${imgHeading(eyebrowSlug, { block: false })}
                    ${ref ? `<div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:2px;color:${C.hiviz};padding-top:8px">${escapeHtml(ref)}</div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- ORANGE HAIRLINE -->
          <tr><td style="padding:24px 0 0;background:${C.header}"><div style="height:2px;background:linear-gradient(90deg,${C.hiviz},${C.hiviz2} 55%,rgba(249,115,22,0));font-size:0;line-height:0">&nbsp;</div></td></tr>
          <tr><td style="background:${C.header};font-size:0;line-height:0">&nbsp;</td></tr>

          ${metaStrip ? `<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="mp-meta">${metaStrip}</table></td></tr>` : ''}

          <!-- BODY -->
          <tr>
            <td class="mp-pad" style="padding:38px 40px 8px;background:${C.card}">
              ${body}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td class="mp-pad" style="background:${C.header};border-top:1px solid ${C.steel};padding:26px 40px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top">
                    <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:${C.plate};line-height:1.9">
                      Marapone Contracting Inc. &nbsp;&middot;&nbsp; Canada &amp; Italy — Global Remote<br/>
                      Your data never leaves your network &nbsp;&middot;&nbsp; <a href="${SITE_URL}" style="color:${C.plate};text-decoration:none">marapone.com</a>
                    </div>
                  </td>
                  <td valign="top" align="right">
                    <div style="font-family:${FONT_DISPLAY};font-size:16px;letter-spacing:2px;color:${C.steel}">MARAPONE</div>
                  </td>
                </tr>
              </table>
              <div style="font-family:${FONT_BODY};font-size:11px;color:${C.plate};padding-top:16px;line-height:1.6">
                You're receiving this because you joined the Marapone list.
                <a href="${unsubscribeUrl}" style="color:${C.fog};text-decoration:underline">Unsubscribe</a> any time — no hard feelings.
              </div>
            </td>
          </tr>

        </table>
        <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:1px;color:#444;padding-top:18px">PRIVATE AI · OWNED OUTRIGHT · NO SUBSCRIPTIONS</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ===========================================================================
 * CAMPAIGNS — real, ready-to-send content. Each returns { subject, html }.
 * ========================================================================= */

function fmtDate(d = new Date()) {
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

/**
 * First-touch welcome email — a real briefing, not just a coupon. Sent the
 * moment someone joins the list.
 */
export function welcomeEmail({ code, expires, vertical = '' } = {}) {
  const expiresStr = expires || fmtDate(new Date(Date.now() + 30 * 864e5));
  const pricingUrl = vertical === 'logistics'
    ? `${SITE_URL}/logistics/pricing`
    : vertical === 'construction'
      ? `${SITE_URL}/construction/pricing`
      : `${SITE_URL}/pricing`;

  const body = [
    label('// Welcome aboard'),
    heading('h-welcome'),
    lead('Thanks for joining — glad you\'re here. Below is the short version of who we are, how a build works, and a welcome gift to get you started. Two minutes, then you\'re caught up.'),

    label('// What we build'),
    p('Marapone builds private AI systems for construction and logistics teams — and hands them over outright. Not a subscription to someone else\'s chatbot: a custom system trained on your documents, your terminology, your workflow.', { color: C.chalk }),
    p('Construction teams use it to scan tenders for risk, catch scope gaps, and triage RFIs. Logistics teams read freight invoices and bills of lading in seconds. Same engine, your domain.'),

    label('// What you actually get'),
    checklist([
      'A system trained on your real material — not a generic, off-the-shelf model.',
      'Full source code + the fine-tuned model weights, delivered to you.',
      'It runs on your hardware or private cloud. Your data never leaves your network.',
      'One-time price. No seats, no per-message fees, no renewal that creeps up.',
    ]),

    label('// How a build works'),
    steps([
      { title: 'Discovery call', body: 'A short call to see your workflow and the documents you wrestle with. We scope something that earns its keep — or tell you it won\'t.' },
      { title: 'Build & fine-tune', body: 'We train a model on your material and wire it into a tool your team can actually use. You see progress, not a black box.' },
      { title: 'Install on your turf', body: 'It deploys on your hardware or private cloud. There\'s nothing to leak, because we never hold your data.' },
      { title: 'Handover & ownership', body: 'You receive the source code, model weights, and an install guide. It\'s yours. We\'re a reply away if you want more.' },
    ]),

    divider(),

    label('// Your welcome gift'),
    p('Because you\'re new here, your first project is on a discount. Here\'s your code:'),
    couponBox({
      tag: 'First-time offer',
      code,
      line: `10% off your first project · applied to your total before deposit · expires ${expiresStr}`,
    }),
    p('Just mention this code when you book. We take 10% off your full project total, and your deposit is calculated on the discounted amount. One-time use, tied to your email.', { size: 14 }),
    button('Browse the packages', pricingUrl),

    divider(),

    label('// What to expect from the list'),
    p('One short email a month: a real case study and a single trend worth your time. No noise, no drip funnel, no spam.'),
    p('And you can always just reply to any of our emails — a human reads every one.', { color: C.chalk, size: 14 }),
  ].join('\n');

  return {
    subject: 'Welcome to Marapone — what we do + 10% off your first build',
    html: renderEmail({
      eyebrowSlug: 'eb-welcome',
      ref: '# NEW MEMBER',
      preheader: `Who we are, how a build works, and your 10% code (${code}) — good through ${expiresStr}.`,
      meta: [
        { label: 'Joined', value: fmtDate() },
        { label: 'Offer', value: '10% OFF', accent: true },
        { label: 'Code', value: code },
        { label: 'Expires', value: expiresStr },
      ],
      body,
    }),
  };
}

/** "What we do" — the explainer. */
export function whatWeDoEmail() {
  const body = [
    label('// Briefing 01'),
    heading('h-wwd'),
    lead('Most "AI tools" rent you access to a model on someone else\'s servers, bill you forever, and feed your data into the training set. Marapone does the opposite.'),
    p('We build a custom AI system around your real workflow — then hand it over. The source code, the fine-tuned model, the runbook: all yours. One fee, no subscription, nothing leaves your network.'),
    label('// What that means for you'),
    checklist([
      'A system trained on your documents, your terminology, your process — not a generic chatbot.',
      'Full source code + model weights delivered to you. No vendor lock-in, ever.',
      'Runs on your hardware or private cloud. Client data stays on the client side.',
      'One-time price. No seats, no per-message fees, no surprise renewal.',
    ]),
    p('Construction teams use it to scan tenders for risk, catch scope gaps, and triage RFIs. Logistics teams use it to read freight invoices and bills of lading in seconds. Same idea, your domain.'),
    button('See how it works', `${SITE_URL}/how-it-works`),
  ].join('\n');

  return {
    subject: 'What Marapone actually does (in 60 seconds)',
    html: renderEmail({
      eyebrowSlug: 'eb-briefing',
      ref: '# WHAT WE DO',
      preheader: 'Private AI, built around your workflow and handed over outright. No subscription.',
      meta: [
        { label: 'Topic', value: 'WHAT WE DO' },
        { label: 'Model', value: 'YOURS', accent: true },
        { label: 'Read', value: '60 SEC' },
      ],
      body,
    }),
  };
}

/** "How it works" — the process. */
export function howItWorksEmail() {
  const body = [
    label('// Briefing 02'),
    heading('h-hiw'),
    lead('No long discovery decks, no six-month roadmaps. Here\'s the whole process, start to finish.'),
    steps([
      { title: 'Discovery call', body: 'A short call to see your workflow and the documents you wrestle with. We scope a system that earns its keep — or we tell you it won\'t.' },
      { title: 'Build & fine-tune', body: 'We train a model on your real material and wire it into a tool your team can actually use. You see progress, not a black box.' },
      { title: 'Install on your turf', body: 'It deploys on your hardware or private cloud. Your data never touches our servers — there\'s nothing to leak.' },
      { title: 'Handover & ownership', body: 'You receive the full source code, model weights, and an install guide. It\'s yours. We\'re a reply away if you want more.' },
    ]),
    p('Starter builds ship fast. Bigger engagements take a few weeks — never months.'),
    button('Start with a discovery call', `${SITE_URL}/discovery`),
  ].join('\n');

  return {
    subject: 'How a Marapone build works — start to handover',
    html: renderEmail({
      eyebrowSlug: 'eb-process',
      ref: '# HOW IT WORKS',
      preheader: 'Discovery, build, install on your hardware, full handover. Weeks, not months.',
      meta: [
        { label: 'Topic', value: 'HOW IT WORKS' },
        { label: 'Steps', value: '04' },
        { label: 'Timeline', value: 'WEEKS', accent: true },
      ],
      body,
    }),
  };
}

/** "Your data never leaves your network" — the trust / security piece. */
export function dataNeverLeavesEmail() {
  const body = [
    label('// Briefing 03'),
    heading('h-dnl'),
    lead('It\'s not a marketing line — it\'s the architecture. Here\'s why that matters and how we guarantee it.'),
    p('Cloud AI tools send your tenders, invoices, and contracts to a third party to be processed — and often kept. For regulated, competitive, or simply private work, that\'s a non-starter.'),
    label('// How we keep it private'),
    checklist([
      'The model runs where you put it — your machine, your server, your private cloud.',
      'No phone-home, no telemetry, no usage piped back to us.',
      'You hold the weights and the code, so there\'s no vendor who can change the terms later.',
      'Nothing to subpoena from us, because we never receive your documents.',
    ]),
    p('Own the system, own the data, own the outcome. That\'s the whole point.'),
    button('Read our security approach', `${SITE_URL}/security`),
  ].join('\n');

  return {
    subject: 'Why your data never leaves your network',
    html: renderEmail({
      eyebrowSlug: 'eb-security',
      ref: '# YOUR DATA',
      preheader: 'On-your-hardware AI with no phone-home. You hold the weights and the code.',
      meta: [
        { label: 'Topic', value: 'DATA & TRUST' },
        { label: 'Telemetry', value: 'NONE', accent: true },
        { label: 'Hosting', value: 'YOURS' },
      ],
      body,
    }),
  };
}

/** "Honest pricing" — one-time fee, no subscription. */
export function pricingEmail() {
  const body = [
    label('// Briefing 04'),
    heading('h-pricing'),
    lead('No seats, no monthly bill, no usage meter ticking in the background. You pay once, you own the system. Here\'s the whole menu — published, not "contact sales".'),
    label('// The packages'),
    priceTable([
      { name: 'Starter', price: '$1,500', note: 'A focused, single-workflow build to prove it out.' },
      { name: 'Pilot', price: '$4,900', note: 'A production system for one team, trained on your docs.' },
      { name: 'Full Build', price: '$9,500', note: 'A complete tool wired into your day-to-day workflow.', accent: true },
      { name: 'Plus', price: '$15,000', note: 'Multi-workflow build with deeper integration and handover.' },
    ]),
    p('Every tier ends the same way: full source code, the fine-tuned model weights, and an install guide — delivered to you. One-time, in CAD, plus HST.'),
    label('// What\'s never on the bill'),
    checklist([
      'No monthly subscription. Ever.',
      'No per-seat or per-message fees.',
      'No "renewal" that quietly doubles next year.',
      'No data leaving your network to a vendor.',
    ]),
    couponBox({
      tag: 'Still have your welcome code?',
      code: '10% OFF',
      line: 'New subscribers get 10% off their first Starter package or higher.',
    }),
    button('See full pricing', `${SITE_URL}/pricing`),
  ].join('\n');

  return {
    subject: 'Marapone pricing — published, one-time, no subscription',
    html: renderEmail({
      eyebrowSlug: 'eb-pricing',
      ref: '# ONE-TIME',
      preheader: 'Starter $1,500 · Pilot $4,900 · Full Build $9,500 · Plus $15,000. Own it outright.',
      meta: [
        { label: 'Topic', value: 'PRICING' },
        { label: 'Billing', value: 'ONE-TIME', accent: true },
        { label: 'From', value: '$1,500' },
      ],
      body,
    }),
  };
}

// Registry for the preview + send tooling.
export const CAMPAIGNS = {
  'what-we-do': whatWeDoEmail,
  'how-it-works': howItWorksEmail,
  'data-never-leaves': dataNeverLeavesEmail,
  'pricing': pricingEmail,
};
