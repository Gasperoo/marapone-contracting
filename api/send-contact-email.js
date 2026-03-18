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

  const name = req.body.name?.trim();
  const email = req.body.email?.trim();
  const role = req.body.role?.trim();
  const company = req.body.company?.trim();
  const message = req.body.message?.trim();

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields (name and email are required)' });
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
      message: 'Please contact us directly at general@marapone.com'
    });
  }

  try {
    const data = await resend.emails.send({
      from: 'Marapone Contact Form <gasper@marapone.com>', // The verified sender domain usually has to match the from email
      to: ['general@marapone.com'],
      reply_to: email, // use reply_to instead of replyTo to strictly match Resend schema
      subject: `New Enterprise Inquiry from ${name} at ${company || 'Unknown Company'}`,
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
            .message-box { margin-top: 20px; padding: 15px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; white-space: pre-wrap; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🏢 New Enterprise Inquiry</h2>
            </div>
            <div class="content">
              <p>A new contact form submission was received on marapone.com:</p>
              
              <div class="info-row">
                <span class="label">Name:</span> ${name}
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span> ${email}
              </div>
              
              <div class="info-row">
                <span class="label">Company:</span> ${company || 'Not provided'}
              </div>
              
              <div class="info-row">
                <span class="label">Role:</span> ${role || 'Not provided'}
              </div>
              
              <h3 style="margin-top: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Message Content</h3>
              <div class="message-box">
${message}
              </div>
              
              <div class="footer">
                <p>Submitted: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}</p>
                <p>Reply to this email to respond directly to ${name} (${email}).</p>
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
      message: error.message === 'The string did not match the expected pattern.' 
        ? 'Invalid input format detected. Please ensure your email is correct and contains no unknown characters.' 
        : error.message
    });
  }
}
