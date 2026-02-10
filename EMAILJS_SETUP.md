# EmailJS Setup Guide for Gasper Waitlist Form

This guide will help you configure EmailJS to enable the waitlist form to send emails to gasper@marapone.com.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Select "Gmail" and click "Connect Account"
   - Follow the OAuth flow to authorize EmailJS
4. Give your service a name (e.g., "Gasper Waitlist")
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. In the EmailJS dashboard, click "Email Templates"
2. Click "Create New Template"
3. Configure the template:

### Template Settings:
- **Template Name**: `Gasper Waitlist Request`
- **Subject**: `New Waitlist Request - Gasper Access`

### Template Content:
```
New access request received from the Gasper waitlist:

Email: {{user_email}}
Role: {{user_role}}
Company Size: {{company_size}}
Submitted: {{timestamp}}

---
This is an automated message from the Gasper Coming Soon landing page.
```

### Template Variables:
The following variables are automatically sent by the form:
- `{{user_email}}` - The user's email address
- `{{user_role}}` - Selected role (e.g., "Logistics Manager")
- `{{company_size}}` - Selected company size (e.g., "51-200 employees")
- `{{timestamp}}` - Submission timestamp
- `{{to_email}}` - Recipient email (gasper@marapone.com)

### Settings Tab:
- **To Email**: `{{to_email}}` (or hardcode `gasper@marapone.com`)
- **From Name**: `Gasper Waitlist`
- **Reply To**: `{{user_email}}`

4. Click "Save"
5. Copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. In the EmailJS dashboard, click "Account" → "General"
2. Find your **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)
3. Copy this key

## Step 5: Update Environment Variables

Update the `.env` file in your project root with the credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

Replace the placeholder values with your actual EmailJS credentials.

## Step 6: Update Deployment Environment

If you're deploying to Vercel, Netlify, or another platform, add these environment variables to your deployment settings:

### Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the three variables above

### Netlify:
1. Go to Site settings → Build & deploy → Environment
2. Add the three variables above

## Step 7: Test the Form

1. Restart your development server: `bun run dev`
2. Navigate to the Coming Soon page
3. Fill out the waitlist form with test data
4. Click "Request Access"
5. Check gasper@marapone.com inbox for the email

## Troubleshooting

### "Failed to send request" error
- Verify all three environment variables are set correctly
- Check that the Service ID, Template ID, and Public Key match your EmailJS dashboard
- Ensure your email service is connected and active in EmailJS
- Check the browser console for detailed error messages

### Emails not arriving
- Check your spam folder
- Verify the "To Email" field in the EmailJS template is set to `{{to_email}}` or `gasper@marapone.com`
- Check EmailJS dashboard for delivery logs

### Rate Limits
- Free tier: 200 emails/month
- If you exceed this, upgrade to a paid plan or consider alternative email services

## Email Template Customization

You can customize the email template in the EmailJS dashboard to include:
- Company branding
- HTML formatting
- Additional fields
- Auto-reply to the user

## Security Notes

- The Public Key is safe to expose in client-side code
- Never expose your Private Key or Service Role Key
- EmailJS automatically prevents spam and abuse
- Consider adding reCAPTCHA for additional protection

## Support

For EmailJS-specific issues, visit:
- Documentation: https://www.emailjs.com/docs/
- Support: https://www.emailjs.com/support/
