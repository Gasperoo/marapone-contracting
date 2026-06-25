import { Resend } from 'resend';
import { welcomeEmail } from '../lib/email-brand.js';
import { createWelcomePromoCode } from '../lib/stripe-promo.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Public base URL the sample files are hosted at (used for email attachments).
const SITE_URL = 'https://marapone.com';

// Sources that explicitly asked for the sample files (vs. a plain subscribe).
function wantsSamples(source) {
  return source === 'exit_intent' || source.startsWith('sample');
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

// Sample files attached to the visitor's email, picked by vertical.
// Files live in /public/samples and are served at /samples/* on the site.
const SAMPLES = {
  construction: [
    { filename: 'drawing-set-index.pdf', file: 'drawing-set-index.pdf' },
  ],
  logistics: [
    { filename: 'bill-of-lading-COSU6118822540.pdf', file: 'bill-of-lading-COSU6118822540.pdf' },
    { filename: 'freight-invoice-MAR-2026-04417.pdf', file: 'freight-invoice-MAR-2026-04417.pdf' },
    { filename: 'freight-invoice-MAR-2026-04417.csv', file: 'freight-invoice-MAR-2026-04417.csv' },
  ],
};

function samplesFor(vertical) {
  const set = SAMPLES[vertical] || [...SAMPLES.construction, ...SAMPLES.logistics];
  return set.map((s) => ({ filename: s.filename, path: `${SITE_URL}/samples/${s.file}` }));
}

// In-memory rate limit (resets on cold start)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 8;
const ipMap = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const e = ipMap.get(ip);
  if (!e || now - e.t > RATE_LIMIT_WINDOW_MS) { ipMap.set(ip, { c: 1, t: now }); return false; }
  if (e.c >= RATE_LIMIT_MAX) return true;
  e.c++; return false;
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://marapone.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-real-ip'] || (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many requests.' });

  const email = (req.body?.email || '').trim();
  const source = (req.body?.source || 'unknown').toString().slice(0, 32);
  const vertical = (req.body?.vertical || '').toString().slice(0, 32);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Invalid email.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured. Reach us at general@marapone.com.' });
  }

  const e = escapeHtml(email);
  const s = escapeHtml(source);
  const v = escapeHtml(vertical);
  const includeSamples = wantsSamples(source);
  const attachments = includeSamples ? samplesFor(vertical) : [];

  // First-time welcome offer: a unique, single-use, per-customer 10%-off Stripe
  // promo code bound to this subscriber's email (best-effort).
  let promo;
  try {
    promo = await createWelcomePromoCode({ email });
  } catch (err) {
    console.error('Promo code generation failed, continuing without:', err);
    promo = { code: process.env.WELCOME_PROMO_CODE || 'MARAPONE10', expires: new Date(Date.now() + 30 * 864e5), unique: false, bound: false };
  }

  const welcome = welcomeEmail({
    code: promo.code,
    expires: fmtDate(promo.expires),
    vertical,
  });

  try {
    // 1) Send the branded welcome email + 10% offer (the critical email).
    //    Sample requesters also get the sample files attached.
    await resend.emails.send({
      from: 'Marapone <info@marapone.com>',
      to: [email],
      reply_to: 'general@marapone.com',
      subject: welcome.subject,
      html: welcome.html,
      ...(attachments.length ? { attachments } : {}),
    });
  } catch (err) {
    console.error('Welcome email error:', err);
    return res.status(500).json({ error: 'Failed to send your welcome email. Please email general@marapone.com.' });
  }

  // 2) Add the visitor to the Resend audience (mailing list). Best-effort.
  if (process.env.RESEND_AUDIENCE_ID) {
    try {
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });
    } catch (err) {
      console.error('Audience add error:', err);
    }
  }

  // 3) Notify Marapone of the signup. Best-effort.
  try {
    await resend.emails.send({
      from: 'Marapone Signups <info@marapone.com>',
      to: ['general@marapone.com'],
      reply_to: email,
      subject: `New subscriber (${s}${v ? ' / ' + v : ''}): ${e}`,
      html: `<p><strong>${e}</strong> joined the mailing list${includeSamples ? ' and was sent the sample files' : ''}.</p><p>Welcome code: <strong>${escapeHtml(promo.code)}</strong> (${promo.unique ? 'unique Stripe code' : 'static fallback'})<br/>Source: ${s}<br/>Vertical: ${v || '—'}<br/>IP: ${escapeHtml(ip)}<br/>Submitted: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}</p>`,
    });
  } catch (err) {
    console.error('Signup notification error:', err);
  }

  return res.status(200).json({ success: true });
}
