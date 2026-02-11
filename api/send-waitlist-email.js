import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, role, companySize } = req.body;

  // Validate input
  if (!email || !role || !companySize) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({
      error: 'Email service not configured',
      message: 'Please contact us directly at gasper@marapone.com'
    });
  }

  try {
    const data = await resend.emails.send({
      from: 'Gasper Waitlist <gasper@marapone.com>',
      to: ['gasper@marapone.com'],
      replyTo: email,
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
              <h2 style="margin: 0;">⚡ New Waitlist Request</h2>
            </div>
            <div class="content">
              <p>A new user has requested access to Gasper:</p>
              
              <div class="info-row">
                <span class="label">Email:</span> ${email}
              </div>
              
              <div class="info-row">
                <span class="label">Role:</span> ${role}
              </div>
              
              <div class="info-row">
                <span class="label">Company Size:</span> ${companySize}
              </div>
              
              <div class="info-row">
                <span class="label">Submitted:</span> ${new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
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
      message: error.message
    });
  }
}
