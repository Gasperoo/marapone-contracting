import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Public base URL the sample files are hosted at (used for email attachments).
const SITE_URL = 'https://marapone.com';

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
  const attachments = samplesFor(vertical);
  const fileList = attachments.map((a) => `<li>${escapeHtml(a.filename)}</li>`).join('');

  try {
    // 1) Send the sample pack to the visitor (the critical email).
    await resend.emails.send({
      from: 'Marapone <info@marapone.com>',
      to: [email],
      reply_to: 'general@marapone.com',
      subject: 'Your Marapone sample pack',
      attachments,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.55">
          <p>Hi,</p>
          <p>Thanks for your interest in Marapone — here are the sample files you asked for, attached to this email:</p>
          <ul>${fileList}</ul>
          <p>These show exactly what a finished build hands over: real, owned artifacts you keep, with no subscription.</p>
          <p>Questions? Just reply to this email and a human will get back to you.</p>
          <p>— The Marapone team<br/><a href="${SITE_URL}">marapone.com</a></p>
        </div>`,
    });
  } catch (err) {
    console.error('Sample email error:', err);
    return res.status(500).json({ error: 'Failed to send the sample. Please email general@marapone.com.' });
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
      subject: `Sample request (${s}${v ? ' / ' + v : ''}): ${e}`,
      html: `<p><strong>${e}</strong> requested the sample pack and was added to the mailing list.</p><p>Source: ${s}<br/>Vertical: ${v || '—'}<br/>IP: ${escapeHtml(ip)}<br/>Submitted: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}</p>`,
    });
  } catch (err) {
    console.error('Signup notification error:', err);
  }

  return res.status(200).json({ success: true });
}
