import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate limiting ---
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

// --- HTML escaping ---
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
const LIMITS = { name: 100, email: 254, phone: 30, date: 20, time: 10 };

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
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
  }

  const rawName  = req.body.name?.trim();
  const rawEmail = req.body.email?.trim();
  const rawPhone = req.body.phone?.trim();
  const rawDate  = req.body.date?.trim();
  const rawTime  = req.body.time?.trim();

  if (!rawName || !rawEmail || !rawPhone || !rawDate || !rawTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (rawName.length  > LIMITS.name)  return res.status(400).json({ error: 'Name is too long.' });
  if (rawEmail.length > LIMITS.email) return res.status(400).json({ error: 'Email is too long.' });
  if (rawPhone.length > LIMITS.phone) return res.status(400).json({ error: 'Phone number is too long.' });
  if (rawDate.length  > LIMITS.date)  return res.status(400).json({ error: 'Date value is too long.' });
  if (rawTime.length  > LIMITS.time)  return res.status(400).json({ error: 'Time value is too long.' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({
      error: 'Email service not configured',
      message: 'Please contact us directly at general@marapone.com'
    });
  }

  // Escape all user input before inserting into HTML
  const name      = escapeHtml(rawName);
  const email     = escapeHtml(rawEmail);
  const phone     = escapeHtml(rawPhone);
  const date      = escapeHtml(rawDate);
  const time      = escapeHtml(rawTime);
  const firstName = escapeHtml(rawName.split(' ')[0]);
  const fromEmail = process.env.FROM_EMAIL;
  if (!fromEmail) {
    return res.status(500).json({ error: 'Email service misconfigured.' });
  }

  try {
    const maraponeEmail = resend.emails.send({
      from: `Marapone Bookings <${fromEmail}>`,
      to: ['general@marapone.com'],
      reply_to: rawEmail,
      subject: `New Discovery Call Booking: ${name} at ${time}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #FF6B00 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 15px 0; padding: 12px; background: white; border-left: 4px solid #FF6B00; border-radius: 4px; }
            .label { font-weight: bold; color: #1a1a1a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Discovery Call Booked</h2>
            </div>
            <div class="content">
              <p>A new discovery call has been booked on marapone.com:</p>
              <div class="info-row"><span class="label">Name:</span> ${name}</div>
              <div class="info-row"><span class="label">Email:</span> ${email}</div>
              <div class="info-row"><span class="label">Phone:</span> ${phone}</div>
              <div class="info-row"><span class="label">Date:</span> ${date}</div>
              <div class="info-row"><span class="label">Time:</span> ${time}</div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    const clientEmail = resend.emails.send({
      from: `Marapone Contracting <${fromEmail}>`,
      to: [rawEmail],
      subject: `Booking Confirmed: Discovery Call with Marapone`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0a0e1a; color: white; padding: 20px; border-radius: 8px 8px 0 0; border-bottom: 4px solid #FF6B00; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .detail-box { margin: 20px 0; padding: 20px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; }
            .time { font-size: 24px; font-weight: bold; color: #FF6B00; margin: 10px 0; }
            .footer { margin-top: 30px; text-align: center; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">Marapone Contracting</h2>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Thank you for booking a discovery call with Marapone. Your appointment is confirmed.</p>
              <div class="detail-box">
                <p style="margin: 0; color: #6b7280; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Appointment Details</p>
                <div class="time">${time}</div>
                <div style="font-weight: bold; font-size: 18px;">${date}</div>
              </div>
              <p>I will give you a call at <strong>${phone}</strong> at the scheduled time. If you need to reschedule or have any questions beforehand, please reply directly to this email.</p>
              <p>Best regards,<br/><strong>Gasper</strong><br/>Marapone Contracting Inc.</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation from <a href="https://marapone.com" style="color:#6b7280;">marapone.com</a>.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    await Promise.all([maraponeEmail, clientEmail]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send emails',
      message: error.message === 'The string did not match the expected pattern.'
        ? 'Invalid input format detected. Please ensure your email is correct and contains no unknown characters.'
        : error.message
    });
  }
}
