import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  try {
    // Notify Marapone of the signup
    await resend.emails.send({
      from: 'Marapone Signups <info@marapone.com>',
      to: ['general@marapone.com'],
      reply_to: email,
      subject: `Newsletter signup (${s}${v ? ' / ' + v : ''}): ${e}`,
      html: `<p><strong>${e}</strong> just subscribed to the Marapone newsletter.</p><p>Source: ${s}<br/>Vertical: ${v || '—'}<br/>IP: ${escapeHtml(ip)}<br/>Submitted: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}</p>`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter signup error:', err);
    return res.status(500).json({ error: 'Failed to subscribe. Please email general@marapone.com.' });
  }
}
