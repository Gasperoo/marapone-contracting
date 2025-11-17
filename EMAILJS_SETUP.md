# EmailJS Setup Instructions

To enable email sending from the contact form, you need to set up EmailJS (free service).

## Steps:

1. **Sign up for EmailJS**
   - Go to https://www.emailjs.com/
   - Create a free account (200 emails/month free)

2. **Create an Email Service**
   - Go to "Email Services" in the dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account (general@marapone.com)
   - Note the Service ID (e.g., `service_xxxxx`)

3. **Create an Email Template**
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Use this template:
     ```
     Subject: Contact Form Submission from {{from_name}}
     
     From: {{from_name}} ({{from_email}})
     Reply-To: {{reply_to}}
     
     Message:
     {{message}}
     ```
   - Set "To Email" to: `general@marapone.com`
   - Note the Template ID (e.g., `template_xxxxx`)

4. **Get Your Public Key**
   - Go to "Account" → "General"
   - Copy your "Public Key"

5. **Update contact.js**
   - Open `contact.js`
   - Replace `YOUR_PUBLIC_KEY` with your actual public key (line 17 and 64)
   - Replace `service_marapone` with your Service ID (line 62)
   - Replace `template_marapone_contact` with your Template ID (line 63)

6. **Test the Form**
   - Submit a test message from the contact form
   - Check general@marapone.com for the email

## Fallback

If EmailJS is not configured, the form will fall back to opening the user's email client with a pre-filled mailto link to general@marapone.com.

