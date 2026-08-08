import { Resend } from 'resend';
import { put } from '@vercel/blob';
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

/**
 * How long the attachment scan is allowed to run, measured from the moment the
 * handler starts. vercel.json gives this route a 30s maxDuration; the balance is
 * reserved for the upload and the Resend call, so a slow scan can never be the
 * reason a lead fails to arrive.
 */
const SCAN_BUDGET_MS = 15000;

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

/**
 * Quarantine an attachment in Vercel Blob and return a link to it.
 *
 * The file is never attached to the notification email — the recipient gets a
 * URL they choose to open, after reading the scan verdict next to it.
 *
 * The pathname carries a random suffix, so the URL cannot be guessed or walked
 * even though the store is public. That is the same practical property the old
 * Supabase signed URL had; what it does not have is an expiry, so
 * `quarantine/` needs periodic sweeping (see the note in the caller).
 *
 * Throws on any failure. The caller must treat that as non-fatal — see the
 * comment at the call site. Losing the file is an inconvenience; losing the
 * lead attached to it is not.
 */
async function quarantineFile(fileBuffer, safeFilename, ext) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is not configured');

  const uid = crypto.randomBytes(8).toString('hex');
  const day = new Date().toISOString().slice(0, 10);

  const { url } = await put(
    `quarantine/${day}/${uid}/${safeFilename}`,
    fileBuffer,
    {
      access: 'public',
      addRandomSuffix: true,
      contentType: MIME_TYPES[ext] || 'application/octet-stream',
      cacheControlMaxAge: 0, // never let a CDN hold an untrusted upload
      token,
    }
  );

  return url;
}

// --- Step 2: VirusTotal scanning ---
/**
 * `deadline` is an epoch-ms budget for the whole scan. The function runs under
 * a 30s maxDuration and a cold start can eat a real slice of it, so scanning is
 * allowed to give up and report `pending` rather than run the invocation out of
 * time — a timeout here would take the whole submission down with it, which is
 * the one outcome worse than an unscanned file.
 */
async function scanWithVirusTotal(fileBuffer, safeFilename, deadline = Infinity) {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) return { status: 'skipped' };
  const timeLeft = () => deadline - Date.now();

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

  // File not in VT database — submit for a fresh scan, if there is time to.
  // An upload we cannot wait on tells us nothing, so skip straight to pending.
  if (timeLeft() < 6000) return { status: 'pending' };

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

  // Poll for results — up to 5 attempts × 3s, but never past the deadline
  for (let i = 0; i < 5; i++) {
    if (timeLeft() < 3500) break;
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
  const startedAt = Date.now();
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
  // A malformed or empty body must not throw: an unhandled TypeError here is a
  // 500 with no email, i.e. a silently lost enquiry.
  const body = req.body && typeof req.body === 'object' ? req.body : {};

  const honeypot = body.website;
  if (honeypot && String(honeypot).trim() !== '') {
    console.warn(`Honeypot triggered from IP: ${ip}`);
    return res.status(200).json({ success: true });
  }

  // Extract and enforce length limits
  const rawName     = body.name?.trim();
  const rawEmail    = body.email?.trim();
  const rawCompany  = body.company?.trim();
  const rawPhone    = body.phone?.trim();
  const rawIndustry = body.industry?.trim();
  const rawDocType  = body.doc_type?.trim();
  const rawMessage  = body.message?.trim();
  const rawBudget   = body.budget?.trim();
  const rawTimeline = body.timeline?.trim();
  const rawSource   = body.source?.trim();
  const rawRegion   = body.region?.trim();

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

  const regionLabel = escapeHtml({
    north_america: 'North America (US / Canada)',
    europe:        'Europe / Mediterranean',
    asia_pacific:  'Asia-Pacific',
    middle_east:   'Middle East / Africa',
    latin_america: 'Latin America',
    global:        'Global / multi-region',
  }[rawRegion] || rawRegion || '');

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

  // --- Steps 1 & 2: Scan attachment, then quarantine it ---
  //
  // Ordering note: the scan runs BEFORE the upload, so a file already known to
  // be malicious is never written to storage at all.
  //
  // Failure policy: nothing in this block may return early on the unhappy path
  // except a malicious verdict. An attachment is a supporting detail; the lead
  // is the thing that matters. This previously returned 500 when storage was
  // unavailable, which threw away the name, email, phone and message along with
  // the file — the sender saw "please try again", and we never learned they
  // existed.
  let attachmentSignedUrl = null;
  let vtResult = null;
  let attachmentMeta = null;   // filename/size/sha256, for when storage fails
  let attachmentError = null;

  const rawAttachment = body.attachment;
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

    attachmentMeta = {
      name: safeFilename,
      sizeKb: Math.max(1, Math.round(fileBuffer.length / 1024)),
      sha256: crypto.createHash('sha256').update(fileBuffer).digest('hex'),
    };

    // Step 2 — scan first. Leave a margin under maxDuration so that however
    // long this takes, there is still room to send the email afterwards.
    vtResult = await scanWithVirusTotal(fileBuffer, safeFilename, startedAt + SCAN_BUDGET_MS);

    if (vtResult.status === 'malicious') {
      console.warn(`Malicious attachment blocked and discarded from IP ${ip}: ${safeFilename}`);
      return res.status(200).json({ success: true }); // Silent discard
    }

    // Step 1 — quarantine (file never attached to email). Non-fatal by design:
    // if storage is down the email still goes out, carrying the file's name,
    // size and hash so the enquiry can be answered and the file re-requested.
    try {
      attachmentSignedUrl = await quarantineFile(fileBuffer, safeFilename, ext);
    } catch (err) {
      attachmentError = err.message;
      console.error(
        `Attachment quarantine failed (lead still delivered) for ${safeFilename} from IP ${ip}:`,
        err.message
      );
    }
  }

  // --- Step 4: Build and send email (clean submissions only) ---

  // Attachment section: a link with a scan badge (never a direct attachment).
  // If storage failed, say so loudly and print enough about the file that the
  // enquiry is still answerable — a silent omission would read as "they didn't
  // send one", which is how a real attachment turns into a missed reply.
  let attachmentSection = '';
  if (!attachmentSignedUrl && attachmentMeta) {
    attachmentSection = `
      <div style="margin-top:20px;padding:16px 20px;background:#fffbeb;border:1px solid #d97706;border-radius:6px;">
        <p style="margin:0 0 10px;font-weight:bold;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#b45309;">Attachment received but NOT stored</p>
        <p style="margin:0 0 8px;font-size:14px;color:#374151;">
          They attached <strong>${escapeHtml(attachmentMeta.name)}</strong> (${attachmentMeta.sizeKb} KB), but it could not be saved to storage, so there is no link to it. <strong>Reply and ask them to resend it directly</strong> — the enquiry itself is intact.
        </p>
        <p style="margin:0;font-size:11px;color:#6b7280;font-family:monospace;">
          SHA-256 ${attachmentMeta.sha256}<br/>
          Scan: ${escapeHtml(vtResult?.status || 'not run')} &middot; Reason: ${escapeHtml(attachmentError || 'unknown')}
        </p>
      </div>`;
  } else if (attachmentSignedUrl) {
    const badge = vtResult?.status === 'clean'
      ? `<span style="display:inline-block;background:#16a34a;color:white;padding:2px 10px;border-radius:4px;font-size:11px;font-family:monospace;letter-spacing:0.05em;">✓ VIRUSTOTAL CLEAN</span>`
      : `<span style="display:inline-block;background:#d97706;color:white;padding:2px 10px;border-radius:4px;font-size:11px;font-family:monospace;letter-spacing:0.05em;">⚠ SCAN PENDING — verify before opening</span>`;

    attachmentSection = `
      <div style="margin-top:20px;padding:16px 20px;background:#1c1c1c;border:1px solid #f97316;border-radius:6px;">
        <p style="margin:0 0 10px;font-weight:bold;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#f97316;">Attachment</p>
        <p style="margin:0 0 10px;">${badge}</p>
        <p style="margin:0 0 8px;font-size:14px;">
          <a href="${attachmentSignedUrl}" style="color:#f97316;font-weight:bold;" target="_blank">View secure attachment ↗</a>
          &nbsp;&nbsp;<span style="color:#6b7280;font-size:12px;">${escapeHtml(attachmentMeta?.name || '')} · ${attachmentMeta?.sizeKb || '?'} KB · held in quarantine</span>
        </p>
        <p style="margin:0;font-size:11px;color:#6b7280;font-family:monospace;">SHA-256 ${attachmentMeta?.sha256 || 'n/a'}</p>
      </div>`;
  }

  try {
    await resend.emails.send({
      from: 'Marapone Contact Form <info@marapone.com>',
      to: ['general@marapone.com'],
      replyTo: rawEmail,
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
              ${regionLabel ? `<div class="info-row"><span class="label">Operating region</span><span class="value">${regionLabel}</span></div>` : ''}
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
    // Last resort. If the mail provider is down there is nowhere left to put
    // this, so write the whole enquiry to the log as one line: a lead sitting
    // in Vercel's log drain is recoverable, a lead that only existed in a
    // failed HTTP request is not. Searchable by the LEAD_RECOVERY tag.
    console.error('Email send error:', error);
    console.error('LEAD_RECOVERY ' + JSON.stringify({
      at: new Date().toISOString(),
      name: rawName,
      email: rawEmail,
      company: rawCompany || null,
      phone: rawPhone || null,
      industry: rawIndustry || null,
      doc_type: rawDocType || null,
      message: rawMessage || null,
      budget: rawBudget || null,
      timeline: rawTimeline || null,
      source: rawSource || null,
      region: rawRegion || null,
      attachment: attachmentMeta ? { ...attachmentMeta, url: attachmentSignedUrl } : null,
      ip,
    }));
    return res.status(500).json({
      error: 'Failed to send email. Please contact us directly at general@marapone.com',
    });
  }
}
