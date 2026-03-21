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
const LIMITS = { email: 254, role: 100, companySize: 100 };

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

  const rawEmail       = req.body.email?.trim();
  const rawRole        = req.body.role?.trim();
  const rawCompanySize = req.body.companySize?.trim();

  if (!rawEmail || !rawRole || !rawCompanySize) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (rawEmail.length       > LIMITS.email)       return res.status(400).json({ error: 'Email is too long.' });
  if (rawRole.length        > LIMITS.role)        return res.status(400).json({ error: 'Role value is too long.' });
  if (rawCompanySize.length > LIMITS.companySize) return res.status(400).json({ error: 'Company size value is too long.' });

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
  const email       = escapeHtml(rawEmail);
  const role        = escapeHtml(rawRole);
  const companySize = escapeHtml(rawCompanySize);
  const fromEmail = process.env.FROM_EMAIL;
  if (!fromEmail) {
    return res.status(500).json({ error: 'Email service misconfigured.' });
  }

  try {
    const data = await resend.emails.send({
      from: `Gasper Waitlist <${fromEmail}>`,
      to: [fromEmail],
      reply_to: rawEmail,
      subject: 'New Waitlist Request - Gasper Access',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #5227FF 0%, #22d3ee 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 15px 0; padding: 12px; background: white; border-left: 4px solid #5227FF; border-radius: 4px; }
            .label { font-weight: bold; color: #5227FF; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Waitlist Request</h2>
            </div>
            <div class="content">
              <p>A new user has requested access to Gasper:</p>
              <div class="info-row"><span class="label">Email:</span> ${email}</div>
              <div class="info-row"><span class="label">Role:</span> ${role}</div>
              <div class="info-row"><span class="label">Company Size:</span> ${companySize}</div>
              <div class="info-row">
                <span class="label">Submitted:</span> ${new Date().toLocaleString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
                })}
              </div>
              <div class="footer">
                <p>This is an automated message from the Gasper Coming Soon landing page.</p>
                <p>Reply to this email to respond directly to ${email}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      message: 'Please try again or contact us directly at general@marapone.com',
    });
  }
}
