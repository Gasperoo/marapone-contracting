/**
 * Emails the visitor their ROI calculation as a real PDF attachment.
 *
 * Used by /construction/roi-calculator and the ROI projection block on
 * /construction/pricing. Both previously posted to /api/newsletter-signup,
 * which sends the generic welcome email and attaches nothing — so the
 * "we'll email you the worksheet (PDF)" promise on the pricing page was not
 * actually kept. This endpoint keeps it.
 *
 * The figures in the PDF are recomputed here from the raw inputs rather than
 * trusted from the client. The report goes out under our name, so the
 * arithmetic on it has to be ours.
 */
import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import { renderEmail, heading, label, p, lead, strong, button, C } from '../lib/email-brand.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = 'https://marapone.com';

// Mirrors the <select> on the calculator. Unknown keys fall back to generic.
const TASKS = {
  rfi: 'Cross-referencing RFIs against drawings',
  logs: 'Reading & summarizing daily logs',
  tender: 'Reviewing tenders / scope for risk',
  scope: 'Scope-gap checks across sub quotes',
  co: 'Tracking change-order exposure',
  generic: 'Manual document review',
};

// In-memory rate limit (resets on cold start) — same shape as newsletter-signup.
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 6;
const ipMap = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const e = ipMap.get(ip);
  if (!e || now - e.t > RATE_LIMIT_WINDOW_MS) { ipMap.set(ip, { c: 1, t: now }); return false; }
  if (e.c >= RATE_LIMIT_MAX) return true;
  e.c++; return false;
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

const num = (v, max) => {
  const n = Number.parseFloat(v);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
};

const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const int = (n) => Math.round(n).toLocaleString('en-US');

function paybackLabel(price, moneyMonth) {
  if (moneyMonth <= 0) return null;
  const months = price / moneyMonth;
  if (months < 1) {
    const weeks = Math.max(1, Math.round(months * 4.345));
    return weeks + (weeks === 1 ? ' week' : ' weeks');
  }
  if (months < 12) return (Math.round(months * 10) / 10) + (months < 2 ? ' month' : ' months');
  return (Math.round((months / 12) * 10) / 10) + ' years';
}

/**
 * Normalises either calculator into one report shape.
 *
 * Two pages feed this endpoint and they model savings differently:
 *   'labour'   — /construction/roi-calculator: volume x minutes x rate, reduced
 *                by the share of the task the AI takes off. Time recovered.
 *   'incident' — the projection block on /construction/pricing: the cost of one
 *                missed clause or unpriced scope item, times how many a year get
 *                caught. Loss avoided.
 *
 * Both arithmetics are re-run here rather than trusted from the client, so the
 * attached PDF cannot disagree with the screen the visitor just read.
 */
function computeRoi(raw) {
  const mode = raw.mode === 'incident' ? 'incident' : 'labour';
  const price = num(raw.price, 1e8);

  let moneyYear, hoursYear = null, hoursMonth = null, rowsIn, headlineNote;

  if (mode === 'incident') {
    const avgCost = num(raw.avgCost, 1e8);
    const perYr = num(raw.perYr, 365);
    moneyYear = avgCost * perYr;
    rowsIn = [
      ['Average cost of one such incident', money(avgCost)],
      ['Incidents caught per year', int(perYr)],
      ['One-time build price', money(price), true],
    ];
    headlineNote = `${int(perYr)} incident${perYr === 1 ? '' : 's'} avoided`;
  } else {
    const volume = num(raw.volume, 1e6);
    const minutes = num(raw.minutes, 10000);
    const rate = num(raw.rate, 10000);
    const reduction = Math.min(Math.max(num(raw.reduction, 100), 0), 100) / 100;
    hoursMonth = (volume * minutes / 60) * reduction;
    hoursYear = hoursMonth * 12;
    moneyYear = hoursMonth * rate * 12;
    rowsIn = [
      ['Documents / items per month', int(volume)],
      ['Minutes each, done manually', int(minutes)],
      ['Loaded hourly cost', money(rate) + '/hr'],
      ['Time the AI takes off the task', Math.round(reduction * 100) + '%'],
      ['One-time build price', money(price), true],
    ];
    headlineNote = `${int(hoursYear)} hours back`;
  }

  const moneyMonth = moneyYear / 12;
  const net3 = (moneyYear * 3) - price;
  const roi3 = price > 0 ? ((moneyYear * 3 - price) / price) * 100 : null;

  const rowsOut = mode === 'incident'
    ? [
        ['Avoided / month, averaged', money(moneyMonth)],
        ['Avoided / year', money(moneyYear)],
        ['Avoided over 3 years', money(moneyYear * 3)],
        ['Net value over 3 years', money(net3), true],
      ]
    : [
        ['Hours back / month', int(hoursMonth)],
        ['Saved / month', money(moneyMonth)],
        ['Hours back / year', int(hoursYear)],
        ['Saved / year', money(moneyYear)],
        ['Net value over 3 years', money(net3), true],
      ];

  return {
    mode, price, moneyMonth, moneyYear, hoursMonth, hoursYear, net3, roi3,
    payback: paybackLabel(price, moneyMonth),
    rowsIn, rowsOut, headlineNote,
    savedLabel: mode === 'incident' ? 'Avoided / year' : 'Saved / year',
  };
}

/* ---------------------------------------------------------------------------
 * PDF. Light background rather than the site's dark theme: this is a document
 * meant to be printed and passed around a boardroom, not a web page.
 * Only the PDF base-14 fonts are used, so no font files ship with the bundle.
 * ------------------------------------------------------------------------- */
const INK = '#141414';
const MUTED = '#6e6e6e';
const RULE = '#d8d8d8';
const HIVIZ = '#c2540a';   // darkened for legibility on white / when printed

function buildPdf(r, taskLabel) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', margin: 54, info: {
      Title: 'Marapone — ROI projection',
      Author: 'Marapone',
      Subject: 'Private construction AI — return on a one-time build',
    } });

    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const L = doc.page.margins.left;
    const R = doc.page.width - doc.page.margins.right;
    const W = R - L;

    const rule = (y) => doc.moveTo(L, y).lineTo(R, y).lineWidth(0.75).strokeColor(RULE).stroke();

    // ---- header
    doc.font('Helvetica-Bold').fontSize(20).fillColor(INK).text('MARAPONE', L, L, { characterSpacing: 2 });
    doc.font('Helvetica').fontSize(8.5).fillColor(MUTED)
      .text('PRIVATE CONSTRUCTION AI  ·  TORONTO', L, doc.y + 2, { characterSpacing: 1.2 });
    // Grab the cursor before the right-aligned date, which is drawn back up at
    // the top of the band and would otherwise pull doc.y above the wordmark.
    const headerBottom = doc.y;
    doc.font('Helvetica').fontSize(8.5).fillColor(MUTED)
      .text(new Date().toLocaleDateString('en-CA', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
        L, L + 4, { width: W, align: 'right', characterSpacing: 1.2 });

    let y = headerBottom + 14;
    rule(y);
    y += 22;

    doc.font('Helvetica-Bold').fontSize(19).fillColor(INK).text('ROI projection', L, y);
    y = doc.y + 4;
    doc.font('Helvetica').fontSize(10.5).fillColor(MUTED)
      .text(`${r.mode === 'incident' ? 'Risk costed' : 'Task costed'}: ${taskLabel}`, L, y, { width: W });
    y = doc.y + 20;

    // ---- headline figures, three across
    const cardW = (W - 20) / 3;
    const cards = [
      [r.savedLabel, money(r.moneyYear), r.headlineNote],
      ['Payback period', r.payback || '—', 'on the one-time price'],
      ['Net value, 3 years', money(r.net3), r.roi3 == null ? 'enter a price' : `${int(r.roi3)}% return`],
    ];
    const cardH = 74;
    cards.forEach(([lab, val, note], i) => {
      const x = L + i * (cardW + 10);
      doc.roundedRect(x, y, cardW, cardH, 4).lineWidth(0.75).strokeColor(RULE).stroke();
      doc.font('Helvetica').fontSize(7.5).fillColor(MUTED)
        .text(lab.toUpperCase(), x + 12, y + 12, { width: cardW - 24, characterSpacing: 1 });
      doc.font('Helvetica-Bold').fontSize(19).fillColor(i === 0 ? HIVIZ : INK)
        .text(val, x + 12, y + 26, { width: cardW - 24, lineBreak: false, ellipsis: true });
      doc.font('Helvetica').fontSize(8.5).fillColor(MUTED)
        .text(note, x + 12, y + 52, { width: cardW - 24, lineBreak: false, ellipsis: true });
    });
    y += cardH + 26;

    // ---- two-column detail: inputs / results
    const row = (lab, val, yy, colX, colW, bold) => {
      doc.font('Helvetica').fontSize(9.5).fillColor(MUTED)
        .text(lab, colX, yy, { width: colW * 0.62 });
      doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(9.5).fillColor(INK)
        .text(val, colX + colW * 0.62, yy, { width: colW * 0.38, align: 'right' });
      return yy + 16;
    };

    const colW = (W - 28) / 2;
    const colRX = L + colW + 28;
    const secTop = y;

    doc.font('Helvetica-Bold').fontSize(8).fillColor(HIVIZ)
      .text('YOUR NUMBERS', L, y, { characterSpacing: 1.3 });
    let yl = y + 16;
    doc.moveTo(L, yl - 5).lineTo(L + colW, yl - 5).lineWidth(0.75).strokeColor(RULE).stroke();
    r.rowsIn.forEach(([lab, val, bold]) => { yl = row(lab, val, yl, L, colW, bold); });

    doc.font('Helvetica-Bold').fontSize(8).fillColor(HIVIZ)
      .text(r.mode === 'incident' ? 'WHAT YOU AVOID' : 'WHAT YOU RECOVER', colRX, secTop, { characterSpacing: 1.3 });
    let yr = secTop + 16;
    doc.moveTo(colRX, yr - 5).lineTo(colRX + colW, yr - 5).lineWidth(0.75).strokeColor(RULE).stroke();
    r.rowsOut.forEach(([lab, val, bold]) => { yr = row(lab, val, yr, colRX, colW, bold); });

    y = Math.max(yl, yr) + 18;

    // ---- what the price buys
    rule(y);
    y += 18;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(HIVIZ)
      .text('WHY THE PAYBACK STOPS THERE', L, y, { characterSpacing: 1.3 });
    y = doc.y + 8;
    doc.font('Helvetica').fontSize(10).fillColor(INK).text(
      'The price above is paid once. There is no subscription clock running behind these '
      + 'figures, so every month after the payback period is recovered margin rather than a '
      + 'renewal being earned back. The software installs on hardware you already own, runs '
      + 'with no internet connection, and the source code is handed over on day 31.',
      L, y, { width: W, lineGap: 2.5 });
    y = doc.y + 16;

    // ---- honest limits
    doc.roundedRect(L, y, W, 78, 4).fillColor('#f6f6f6').fill();
    doc.font('Helvetica-Bold').fontSize(8).fillColor(MUTED)
      .text('WHAT THIS IS NOT', L + 14, y + 12, { characterSpacing: 1.3 });
    doc.font('Helvetica').fontSize(9).fillColor(MUTED).text(
      'A planning estimate built from the inputs on this sheet — not a quote and not a '
      + 'guarantee. ' + (r.mode === 'incident'
        ? 'It assumes the software catches the incidents it is given, at the industry '
          + 'average cost shown, and counts nothing for the hours it also saves. Whether that '
          + 'many arise on your projects is the assumption to argue with.'
        : 'It counts only the labour on the one task named above, and excludes the '
          + 'cost of the errors a manual process misses, which is usually where the larger '
          + 'money actually sits.')
      + ' A free assessment runs the software on your own documents so the '
      + 'figures come from your files rather than from a slider.',
      L + 14, y + 28, { width: W - 28, lineGap: 1.5 });
    y += 78 + 22;

    // ---- footer
    rule(y);
    doc.font('Helvetica').fontSize(8.5).fillColor(MUTED)
      .text('marapone.com  ·  general@marapone.com', L, y + 10, { width: W });
    doc.font('Helvetica').fontSize(8.5).fillColor(MUTED)
      .text('Figures in CAD, before HST.', L, y + 10, { width: W, align: 'right' });

    doc.end();
  });
}

/* ------------------------------------------------------------------------- */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://marapone.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-real-ip'] || (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many requests.' });

  const email = (req.body?.email || '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Invalid email.' });
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured. Reach us at general@marapone.com.' });
  }

  const source = (req.body?.source || 'roi_report').toString().slice(0, 32);
  const vertical = (req.body?.vertical || 'construction').toString().slice(0, 32);
  const r = computeRoi(req.body || {});

  // In incident mode the subject of the sheet is the scenario the visitor
  // picked on the pricing page, not one of the calculator's task options.
  const taskKey = (req.body?.task || 'generic').toString().slice(0, 16);
  const taskLabel = r.mode === 'incident'
    ? (req.body?.scenario || 'A missed clause or unpriced scope item').toString().slice(0, 120)
    : (TASKS[taskKey] || TASKS.generic);

  let pdf;
  try {
    pdf = await buildPdf(r, taskLabel);
  } catch (err) {
    console.error('ROI PDF render failed:', err);
    return res.status(500).json({ error: 'Could not build your report. Email general@marapone.com.' });
  }

  const body = [
    heading('h-pricing', { mb: 18 }),
    lead('Your ROI projection is attached as a PDF — built from the numbers you entered, ready to forward to whoever signs off on the spend.'),
    label('The headline'),
    p(`On ${taskLabel.toLowerCase()}, the sheet puts ${strong(money(r.moneyYear) + ' a year')} on the table`
      + (r.mode === 'incident' ? '' : ` — ${strong(int(r.hoursYear) + ' hours')} of someone's time`)
      + `, against a one-time price of ${strong(money(r.price))}.`
      + (r.payback ? ` It pays for itself in ${strong(r.payback)}.` : ''),
      { html: true }),
    p('There is no subscription behind that figure. The software installs on hardware you already own, runs with the internet off, and the source code is yours on day 31 — so the payback period ends and nothing starts billing.'),
    label(r.mode === 'incident' ? 'The assumption worth arguing with' : 'Where the real number usually is'),
    p(r.mode === 'incident'
      ? 'The sheet assumes the software catches these before they land, at the industry average cost. Whether that many arise on your projects is the number to push on — and it is the number a free assessment answers, because it runs on your own documents and reports what it actually finds.'
      : 'The attached sheet deliberately counts only labour on one task. It ignores the cost of what a manual review misses — the clause nobody priced, the two trades both carrying the same scope — which is normally the larger figure. A free assessment runs the software on a real document of yours and reports what it actually finds.'),
    button('Get the free assessment', `${SITE_URL}/construction/contact`),
    p('Reply to this email if you want the assumptions changed and a second version run.'),
  ].join('');

  const html = renderEmail({
    eyebrowSlug: 'eb-pricing',
    ref: '# ROI PROJECTION',
    preheader: `Your ROI sheet: ${money(r.moneyYear)} a year on ${taskLabel.toLowerCase()}.`,
    meta: [
      { label: 'Saved / year', value: money(r.moneyYear), accent: true },
      { label: 'Payback', value: r.payback || '—' },
      { label: 'Net, 3 yrs', value: money(r.net3) },
    ],
    body,
  });

  // The SDK resolves with { data, error } on an API rejection rather than
  // throwing, so a try/catch alone would report success on an undelivered
  // report. This is the one email in the flow the visitor actually asked for.
  try {
    const sent = await resend.emails.send({
      from: 'Marapone <info@marapone.com>',
      to: [email],
      replyTo: 'general@marapone.com',
      subject: `Your ROI projection — ${money(r.moneyYear)} a year, ${r.payback || 'n/a'} payback`,
      html,
      attachments: [{ filename: 'Marapone-ROI-Projection.pdf', content: pdf.toString('base64') }],
    });
    if (sent?.error) throw new Error(sent.error.message || 'Resend rejected the send');
  } catch (err) {
    console.error('ROI report email error:', err);
    return res.status(500).json({ error: 'Failed to send your report. Please email general@marapone.com.' });
  }

  // Mailing list + internal notification are both best-effort: the visitor
  // already has the report they asked for, so neither should fail the request.
  if (process.env.RESEND_AUDIENCE_ID) {
    try {
      await resend.contacts.create({ email, unsubscribed: false, audienceId: process.env.RESEND_AUDIENCE_ID });
    } catch (err) { console.error('Audience add error:', err); }
  }

  try {
    await resend.emails.send({
      from: 'Marapone Signups <info@marapone.com>',
      to: ['general@marapone.com'],
      replyTo: email,
      subject: `ROI report sent (${escapeHtml(source)}): ${escapeHtml(email)}`,
      html: `<p><strong>${escapeHtml(email)}</strong> generated an ROI projection (${escapeHtml(r.mode)} model).</p>`
        + `<p>Subject: ${escapeHtml(taskLabel)}<br/>`
        + r.rowsIn.map(([lab, val]) => `${escapeHtml(lab)}: ${escapeHtml(val)}`).join('<br/>')
        + `</p><p>${escapeHtml(r.savedLabel)}: ${money(r.moneyYear)} &middot; Payback: ${escapeHtml(r.payback || '—')} &middot; Net 3yr: ${money(r.net3)}</p>`
        + `<p>Source: ${escapeHtml(source)}<br/>Vertical: ${escapeHtml(vertical)}<br/>IP: ${escapeHtml(ip)}</p>`,
    });
  } catch (err) { console.error('ROI notification error:', err); }

  return res.status(200).json({ success: true });
}
