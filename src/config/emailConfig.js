// EmailJS Configuration
// To set up EmailJS:
// 1. Create account at https://www.emailjs.com/
// 2. Add email service (Gmail, Outlook, etc.)
// 3. Create email template with variables: user_email, user_role, company_size, timestamp
// 4. Update .env file with your credentials

export const EMAIL_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
    recipientEmail: 'gasper@marapone.com'
};

// Email template variables that should be configured in EmailJS:
// {{user_email}} - The user's email address
// {{user_role}} - Selected role
// {{company_size}} - Selected company size
// {{timestamp}} - Submission timestamp
