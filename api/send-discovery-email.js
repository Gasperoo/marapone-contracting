import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate limiting (in-memory, resets on cold start) ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipRequestMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipRequestMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

// --- HTML escaping (prevents XSS in email body) ---
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// --- Input length limits ---
const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 1000,
  timezone: 64,
  slot: 80,
  region: 32,
};

// Validate ISO-ish date (YYYY-MM-DD) and time (HH:MM)
function isValidDate(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s); }
function isValidTime(s) { return /^\d{2}:\d{2}$/.test(s); }

// --- Akismet spam detection ---
async function checkAkismet(ip, name, email, message) {
  const apiKey = process.env.AKISMET_API_KEY;
  if (!apiKey) return false;

  try {
    const body = new URLSearchParams({
      blog: 'https://marapone.com',
      user_ip: ip,
      comment_type: 'contact-form',
      comment_author: name,
      comment_author_email: email,
      comment_content: message || '',
    });

    const res = await fetch(`https://${apiKey}.rest.akismet.com/1.1/comment-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const result = await res.text();
    return result.trim() === 'true';
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  const allowedOrigin = 'https://marapone.com';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
  }

  // Server-side honeypot check
  const honeypot = req.body.website;
  if (honeypot && String(honeypot).trim() !== '') {
    console.warn(`Discovery honeypot triggered from IP: ${ip}`);
    return res.status(200).json({ success: true });
  }

  // Extract fields
  const rawName     = req.body.name?.trim();
  const rawEmail    = req.body.email?.trim();
  const rawPhone    = req.body.phone?.trim();
  const rawMessage  = req.body.message?.trim();
  const rawTimezone = req.body.timezone?.trim();
  const rawRegion   = req.body.region?.trim();
  const rawVertical = req.body.vertical?.trim();
  // Up to 3 preferred slots, each {date: 'YYYY-MM-DD', time: 'HH:MM'}
  const rawSlots = Array.isArray(req.body.preferred_slots) ? req.body.preferred_slots.slice(0, 3) : [];

  // Required field check
  if (!rawName || !rawEmail) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // Length limits
  if (rawName.length > LIMITS.name)        return res.status(400).json({ error: 'Name is too long.' });
  if (rawEmail.length > LIMITS.email)      return res.status(400).json({ error: 'Email is too long.' });
  if (rawPhone?.length > LIMITS.phone)     return res.status(400).json({ error: 'Phone number is too long.' });
  if (rawMessage?.length > LIMITS.message) return res.status(400).json({ error: 'Message is too long (max 1000 characters).' });
  if (rawTimezone?.length > LIMITS.timezone) return res.status(400).json({ error: 'Invalid timezone.' });
  if (rawRegion?.length > LIMITS.region)   return res.status(400).json({ error: 'Invalid region.' });

  // Validate slot shape (silently drop malformed entries rather than rejecting whole request)
  const validSlots = rawSlots
    .filter(s => s && typeof s === 'object')
    .filter(s => isValidDate(String(s.date || '')) && isValidTime(String(s.time || '')))
    .slice(0, 3);

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawEmail)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Phone format: digits, spaces, +, -, (, ) only
  if (rawPhone && !/^[\d\s\+\-\(\)\.]{0,30}$/.test(rawPhone)) {
    return res.status(400).json({ error: 'Invalid phone number format.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'Email service not configured',
      message: 'Please contact us directly at general@marapone.com',
    });
  }

  // Akismet spam check
  const isSpam = await checkAkismet(ip, rawName, rawEmail, rawMessage);
  if (isSpam) {
    console.warn(`Discovery spam silently discarded from IP: ${ip}`);
    return res.status(200).json({ success: true });
  }

  // Escape all user input before inserting into HTML
  const name     = escapeHtml(rawName);
  const email    = escapeHtml(rawEmail);
  const phone    = escapeHtml(rawPhone);
  const message  = escapeHtml(rawMessage);
  const timezone = escapeHtml(rawTimezone);
  const region   = escapeHtml(rawRegion);
  const vertical = escapeHtml(rawVertical);

  // Format slots for display in email
  const slotsHtml = validSlots.length
    ? validSlots.map((s, i) => {
        const date = escapeHtml(s.date);
        const time = escapeHtml(s.time);
        return `<div class="info-row"><span class="label">Preferred slot ${i + 1}</span><span class="value">${date} at ${time}${timezone ? ` (${timezone})` : ''}</span></div>`;
      }).join('')
    : '';

  try {
    await resend.emails.send({
      from: 'Marapone Contact Form <info@marapone.com>',
      to: ['general@marapone.com'],
      reply_to: rawEmail,
      subject: `Discovery Call Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #f97316 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0; }
            .header h2 { margin: 0; font-size: 22px; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.8; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .info-row { margin: 10px 0; padding: 12px 16px; background: white; border-left: 4px solid #f97316; border-radius: 4px; }
            .label { font-weight: bold; color: #1a1a1a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px; }
            .value { color: #374151; font-size: 14px; }
            .message-box { margin-top: 20px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; white-space: pre-wrap; font-size: 14px; color: #374151; }
            .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
            .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 4px; font-size: 11px; font-family: monospace; letter-spacing: 0.08em; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Discovery Call Request</h2>
              <p>Submitted via marapone.com/discovery</p>
            </div>
            <div class="content">
              <span class="badge">15-MIN DISCOVERY CALL</span>
              <div class="info-row">
                <span class="label">Name</span>
                <span class="value">${name}</span>
              </div>
              <div class="info-row">
                <span class="label">Email</span>
                <span class="value">${email}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone</span>
                <span class="value">${phone || 'Not provided'}</span>
              </div>
              ${vertical ? `<div class="info-row"><span class="label">Vertical</span><span class="value">${vertical}</span></div>` : ''}
              ${region ? `<div class="info-row"><span class="label">Region</span><span class="value">${region}</span></div>` : ''}
              ${timezone ? `<div class="info-row"><span class="label">Timezone</span><span class="value">${timezone}</span></div>` : ''}
              ${slotsHtml}
              ${message ? `
              <div>
                <p style="font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1a1a; margin-top: 20px; margin-bottom: 8px;">Message</p>
                <div class="message-box">${message}</div>
              </div>` : ''}
              <div class="footer">
                <p>Submitted: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}</p>
                <p>Reply to this email to respond directly to ${name} at ${email}.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Discovery email send error:', error);
    return res.status(500).json({
      error: 'Failed to send. Please contact us directly at general@marapone.com',
    });
  }
}
