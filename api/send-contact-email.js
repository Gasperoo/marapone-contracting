import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate limiting (in-memory, resets on cold start) ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per IP per window
const ipRequestMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipRequestMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

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
  company: 150,
  phone: 30,
  industry: 50,
  doc_type: 50,
  message: 2000,
};

export default async function handler(req, res) {
  const allowedOrigin = 'https://marapone.com';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
  }

  // Server-side honeypot check
  const honeypot = req.body.website;
  if (honeypot && String(honeypot).trim() !== '') {
    console.warn(`Honeypot triggered from IP: ${ip}`);
    return res.status(200).json({ success: true }); // Silent fake success
  }

  // Extract and enforce length limits
  const rawName     = req.body.name?.trim();
  const rawEmail    = req.body.email?.trim();
  const rawCompany  = req.body.company?.trim();
  const rawPhone    = req.body.phone?.trim();
  const rawIndustry = req.body.industry?.trim();
  const rawDocType  = req.body.doc_type?.trim();
  const rawMessage  = req.body.message?.trim();

  if (!rawName || !rawEmail) {
    return res.status(400).json({ error: 'Missing required fields (name and email are required)' });
  }

  if (rawName.length > LIMITS.name)       return res.status(400).json({ error: 'Name is too long.' });
  if (rawEmail.length > LIMITS.email)     return res.status(400).json({ error: 'Email is too long.' });
  if (rawCompany?.length > LIMITS.company) return res.status(400).json({ error: 'Company name is too long.' });
  if (rawPhone?.length > LIMITS.phone)    return res.status(400).json({ error: 'Phone number is too long.' });
  if (rawMessage?.length > LIMITS.message) return res.status(400).json({ error: 'Message is too long (max 2000 characters).' });

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

  // Escape all user input before inserting into HTML email
  const name     = escapeHtml(rawName);
  const email    = escapeHtml(rawEmail);
  const company  = escapeHtml(rawCompany);
  const phone    = escapeHtml(rawPhone);
  const message  = escapeHtml(rawMessage);

  const industryLabel = escapeHtml({
    residential: 'Residential construction',
    ici: 'ICI (Industrial / Commercial / Institutional)',
    mixed: 'Mixed use development',
    construction_other: 'Other construction',
    import_export: 'Import / Export',
    freight_broker: 'Freight brokerage',
    '3pl': 'Third-party logistics (3PL)',
    customs: 'Customs brokerage',
    supply_chain: 'Supply chain / procurement',
    logistics_other: 'Other logistics / trade',
  }[rawIndustry] || rawIndustry || 'Not provided');

  const docTypeLabel = escapeHtml({
    blueprints: 'Blueprints / drawings',
    rfis: 'RFI log or package',
    daily_logs: 'Site daily logs',
    specs: 'Spec package / tender docs',
    trade_docs: 'Bills of lading / commercial invoices',
    freight_invoices: 'Freight carrier invoices',
    customs_docs: 'Customs declarations / entry summaries',
    supplier_comms: 'Supplier communications / shipment packages',
    mix: 'Mix of the above',
  }[rawDocType] || rawDocType || 'Not provided');

  try {
    const data = await resend.emails.send({
      from: 'Marapone Contact Form <info@marapone.com>',
      to: ['general@marapone.com'],
      reply_to: rawEmail,
      subject: `New Assessment Request from ${name}${company ? ' at ' + company : ''}`,
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Assessment Request</h2>
              <p>Submitted via marapone.com/contact</p>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Name</span>
                <span class="value">${name}</span>
              </div>
              <div class="info-row">
                <span class="label">Email</span>
                <span class="value">${email}</span>
              </div>
              <div class="info-row">
                <span class="label">Company</span>
                <span class="value">${company || 'Not provided'}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone</span>
                <span class="value">${phone || 'Not provided'}</span>
              </div>
              <div class="info-row">
                <span class="label">Industry</span>
                <span class="value">${industryLabel}</span>
              </div>
              <div class="info-row">
                <span class="label">Document Type</span>
                <span class="value">${docTypeLabel}</span>
              </div>
              ${message ? `
              <div>
                <p style="font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1a1a; margin-top: 20px; margin-bottom: 8px;">Additional Notes</p>
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
      `
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      message: error.message
    });
  }
}
