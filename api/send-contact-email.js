import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Increase Vercel body size limit to handle base64-encoded file attachments
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16mb',
    },
  },
};

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

// --- File validation ---
const ALLOWED_EXTENSIONS = new Set(['pdf', 'docx', 'png', 'jpg', 'jpeg']);
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const MIME_TYPES = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

function sanitizeFilename(raw) {
  const base = String(raw).split(/[/\\]/).pop();
  return base.replace(/[^a-zA-Z0-9 ._-]/g, '_').slice(0, 200);
}

function checkMagicBytes(buf, ext) {
  if (ext === 'pdf')  return buf[0]===0x25 && buf[1]===0x50 && buf[2]===0x44 && buf[3]===0x46;
  if (ext === 'png')  return buf[0]===0x89 && buf[1]===0x50 && buf[2]===0x4E && buf[3]===0x47;
  if (ext === 'jpg' || ext === 'jpeg') return buf[0]===0xFF && buf[1]===0xD8 && buf[2]===0xFF;
  if (ext === 'docx') return buf[0]===0x50 && buf[1]===0x4B && buf[2]===0x03 && buf[3]===0x04;
  return false;
}

// --- Input length limits ---
const LIMITS = {
  name: 100, email: 254, company: 150, phone: 30,
  industry: 50, doc_type: 50, message: 2000,
  budget: 50, timeline: 50, source: 80,
};

// --- Step 1: Supabase Storage quarantine ---
async function quarantineFile(fileBuffer, safeFilename, ext) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const uid = crypto.randomBytes(8).toString('hex');
  const storagePath = `submissions/${Date.now()}-${uid}/${safeFilename}`;

  const { error: uploadError } = await supabase.storage
    .from('contact-quarantine')
    .upload(storagePath, fileBuffer, {
      contentType: MIME_TYPES[ext] || 'application/octet-stream',
      upsert: false,
    });

  if (uploadError) throw new Error(`Supabase upload failed: ${uploadError.message}`);

  const { data: signedUrlData, error: urlError } = await supabase.storage
    .from('contact-quarantine')
    .createSignedUrl(storagePath, 60 * 60 * 24 * 7); // 7-day expiry

  if (urlError) throw new Error(`Signed URL generation failed: ${urlError.message}`);

  return signedUrlData.signedUrl;
}

// --- Step 2: VirusTotal scanning ---
async function scanWithVirusTotal(fileBuffer, safeFilename) {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) return { status: 'skipped' };

  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

  // Check if this file hash is already known to VirusTotal (instant)
  try {
    const hashRes = await fetch(`https://www.virustotal.com/api/v3/files/${hash}`, {
      headers: { 'x-apikey': apiKey },
    });
    if (hashRes.ok) {
      const data = await hashRes.json();
      const stats = data.data?.attributes?.last_analysis_stats;
      if (stats) {
        if (stats.malicious > 0 || stats.suspicious > 0) return { status: 'malicious', stats };
        return { status: 'clean', stats };
      }
    }
  } catch {
    // Hash lookup failed — fall through to upload
  }

  // File not in VT database — submit for a fresh scan
  let analysisId;
  try {
    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), safeFilename);

    const uploadRes = await fetch('https://www.virustotal.com/api/v3/files', {
      method: 'POST',
      headers: { 'x-apikey': apiKey },
      body: formData,
    });

    if (!uploadRes.ok) return { status: 'pending' };
    const uploadData = await uploadRes.json();
    analysisId = uploadData.data?.id;
  } catch {
    return { status: 'pending' };
  }

  if (!analysisId) return { status: 'pending' };

  // Poll for results — max 5 attempts × 3s = 15s
  for (let i = 0; i < 5; i++) {
    await new Promise(r => setTimeout(r, 3000));
    try {
      const analysisRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
        headers: { 'x-apikey': apiKey },
      });
      if (!analysisRes.ok) continue;
      const analysisData = await analysisRes.json();
      const attrs = analysisData.data?.attributes;
      if (attrs?.status === 'completed') {
        const stats = attrs.stats;
        if (stats.malicious > 0 || stats.suspicious > 0) return { status: 'malicious', stats };
        return { status: 'clean', stats };
      }
    } catch {
      // Continue polling
    }
  }

  return { status: 'pending' }; // Scan did not complete in time
}

// --- Step 3: Akismet spam detection ---
async function checkAkismet(ip, name, email, message) {
  const apiKey = process.env.AKISMET_API_KEY;
  if (!apiKey) return false; // Not configured — do not block

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
    return result.trim() === 'true'; // 'true' = spam, 'false' = ham
  } catch {
    return false; // If Akismet is unreachable, do not block
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
    console.warn(`Honeypot triggered from IP: ${ip}`);
    return res.status(200).json({ success: true });
  }

  // Extract and enforce length limits
  const rawName     = req.body.name?.trim();
  const rawEmail    = req.body.email?.trim();
  const rawCompany  = req.body.company?.trim();
  const rawPhone    = req.body.phone?.trim();
  const rawIndustry = req.body.industry?.trim();
  const rawDocType  = req.body.doc_type?.trim();
  const rawMessage  = req.body.message?.trim();
  const rawBudget   = req.body.budget?.trim();
  const rawTimeline = req.body.timeline?.trim();
  const rawSource   = req.body.source?.trim();

  if (!rawName || !rawEmail) {
    return res.status(400).json({ error: 'Missing required fields (name and email are required)' });
  }

  if (rawName.length > LIMITS.name)            return res.status(400).json({ error: 'Name is too long.' });
  if (rawEmail.length > LIMITS.email)          return res.status(400).json({ error: 'Email is too long.' });
  if (rawCompany?.length > LIMITS.company)     return res.status(400).json({ error: 'Company name is too long.' });
  if (rawPhone?.length > LIMITS.phone)         return res.status(400).json({ error: 'Phone number is too long.' });
  if (rawMessage?.length > LIMITS.message)     return res.status(400).json({ error: 'Message is too long (max 2000 characters).' });
  if (rawBudget?.length > LIMITS.budget)       return res.status(400).json({ error: 'Budget value too long.' });
  if (rawTimeline?.length > LIMITS.timeline)   return res.status(400).json({ error: 'Timeline value too long.' });
  if (rawSource?.length > LIMITS.source)       return res.status(400).json({ error: 'Source value too long.' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'Email service not configured',
      message: 'Please contact us directly at general@marapone.com',
    });
  }

  // Escape all user input before inserting into HTML email
  const name     = escapeHtml(rawName);
  const email    = escapeHtml(rawEmail);
  const company  = escapeHtml(rawCompany);
  const phone    = escapeHtml(rawPhone);
  const message  = escapeHtml(rawMessage);

  const budgetLabel = escapeHtml({
    under_5k:  'Under $5,000 CAD',
    '5_10k':   '$5,000 – $10,000 CAD',
    '10_20k':  '$10,000 – $20,000 CAD',
    '20k_plus':'$20,000+ CAD',
    not_sure:  'Not sure yet',
  }[rawBudget] || rawBudget || 'Not provided');

  const timelineLabel = escapeHtml({
    asap:      'ASAP / Already a problem',
    '30d':     'Next 30 days',
    '60_90d':  '30–90 days',
    'q':       'This quarter',
    exploring: 'Just exploring',
  }[rawTimeline] || rawTimeline || 'Not provided');

  const sourceLabel = escapeHtml({
    google:    'Google search',
    linkedin:  'LinkedIn',
    referral:  'Referral from someone',
    industry:  'Industry event / publication',
    podcast:   'Podcast / YouTube',
    other:     'Other',
  }[rawSource] || rawSource || 'Not provided');

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

  // --- Step 3: Akismet spam check (no attachment dependency — run early) ---
  const isSpam = await checkAkismet(ip, rawName, rawEmail, rawMessage);
  if (isSpam) {
    console.warn(`Spam submission silently discarded from IP: ${ip}`);
    return res.status(200).json({ success: true });
  }

  // --- Steps 1 & 2: Quarantine attachment + VirusTotal scan ---
  let attachmentSignedUrl = null;
  let vtResult = null;

  const rawAttachment = req.body.attachment;
  if (rawAttachment) {
    const attachName = rawAttachment.name;
    const rawBase64  = rawAttachment.base64;

    if (typeof attachName !== 'string' || typeof rawBase64 !== 'string') {
      return res.status(400).json({ error: 'Invalid attachment format.' });
    }

    const safeFilename = sanitizeFilename(attachName);
    const ext = safeFilename.split('.').pop().toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return res.status(400).json({ error: 'Attachment type not allowed. Use PDF, DOCX, PNG, JPG, or JPEG.' });
    }

    let fileBuffer;
    try {
      fileBuffer = Buffer.from(rawBase64, 'base64');
    } catch {
      return res.status(400).json({ error: 'Attachment could not be decoded.' });
    }

    if (fileBuffer.length > MAX_ATTACHMENT_BYTES) {
      return res.status(400).json({ error: 'Attachment exceeds 10 MB limit.' });
    }

    if (!checkMagicBytes(fileBuffer, ext)) {
      return res.status(400).json({ error: 'Attachment content does not match its file type.' });
    }

    // Step 1 — quarantine in Supabase Storage (file never attached to email)
    try {
      attachmentSignedUrl = await quarantineFile(fileBuffer, safeFilename, ext);
    } catch (err) {
      console.error('Supabase quarantine error:', err.message);
      return res.status(500).json({ error: 'Could not process attachment. Please try again.' });
    }

    // Step 2 — VirusTotal scan
    vtResult = await scanWithVirusTotal(fileBuffer, safeFilename);

    if (vtResult.status === 'malicious') {
      console.warn(`Malicious attachment blocked and discarded from IP ${ip}: ${safeFilename}`);
      return res.status(200).json({ success: true }); // Silent discard
    }
  }

  // --- Step 4: Build and send email (clean submissions only) ---

  // Attachment section: signed URL with scan badge (never a direct attachment)
  let attachmentSection = '';
  if (attachmentSignedUrl) {
    const badge = vtResult?.status === 'clean'
      ? `<span style="display:inline-block;background:#16a34a;color:white;padding:2px 10px;border-radius:4px;font-size:11px;font-family:monospace;letter-spacing:0.05em;">✓ VIRUSTOTAL CLEAN</span>`
      : `<span style="display:inline-block;background:#d97706;color:white;padding:2px 10px;border-radius:4px;font-size:11px;font-family:monospace;letter-spacing:0.05em;">⚠ SCAN PENDING — verify before opening</span>`;

    attachmentSection = `
      <div style="margin-top:20px;padding:16px 20px;background:#1c1c1c;border:1px solid #f97316;border-radius:6px;">
        <p style="margin:0 0 10px;font-weight:bold;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#f97316;">Attachment</p>
        <p style="margin:0 0 10px;">${badge}</p>
        <p style="margin:0;font-size:14px;">
          <a href="${attachmentSignedUrl}" style="color:#f97316;font-weight:bold;" target="_blank">View secure attachment ↗</a>
          &nbsp;&nbsp;<span style="color:#6b7280;font-size:12px;">Expires in 7 days · stored in quarantine</span>
        </p>
      </div>`;
  }

  try {
    await resend.emails.send({
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
              <div class="info-row">
                <span class="label">Budget</span>
                <span class="value">${budgetLabel}</span>
              </div>
              <div class="info-row">
                <span class="label">Timeline</span>
                <span class="value">${timelineLabel}</span>
              </div>
              <div class="info-row">
                <span class="label">How they heard about us</span>
                <span class="value">${sourceLabel}</span>
              </div>
              ${message ? `
              <div>
                <p style="font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #1a1a1a; margin-top: 20px; margin-bottom: 8px;">Additional Notes</p>
                <div class="message-box">${message}</div>
              </div>` : ''}
              ${attachmentSection}
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
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please contact us directly at general@marapone.com',
    });
  }
}
