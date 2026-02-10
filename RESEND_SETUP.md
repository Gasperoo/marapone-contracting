# Resend Setup Guide for Gasper Waitlist Form

This guide will help you configure Resend to send emails **from** gasper@marapone.com **to** gasper@marapone.com.

## Why Resend?

- ✅ Send from your own domain (@marapone.com)
- ✅ Free tier: 3,000 emails/month
- ✅ Professional email delivery
- ✅ Simple API, no OAuth required
- ✅ Works with serverless functions

---

## Step 1: Create Resend Account

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up with your email
3. Verify your email address
4. Complete the onboarding

---

## Step 2: Get API Key

1. In the Resend dashboard, click **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Give it a name: `Gasper Waitlist Production`
4. Select permission: **"Sending access"**
5. Click **"Create"**
6. **Copy the API key** (starts with `re_`) - you won't be able to see it again!

### Update Environment Variables

**Local Development (.env):**
```env
RESEND_API_KEY=re_your_actual_api_key_here
```

**Production (Vercel/Netlify):**
Add this environment variable to your deployment platform:
- Variable name: `RESEND_API_KEY`
- Value: `re_your_actual_api_key_here`

---

## Step 3: Verify Your Domain

To send emails **from** gasper@marapone.com, you need to verify ownership of marapone.com.

### Add Domain to Resend

1. In Resend dashboard, click **"Domains"** in the left sidebar
2. Click **"Add Domain"**
3. Enter: `marapone.com`
4. Click **"Add"**

### Add DNS Records

Resend will provide you with DNS records to add to your domain. You'll need to add these to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

**Example DNS Records (your actual values will be different):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | @ | `resend-verification=abc123xyz...` | 3600 |
| MX | @ | `feedback-smtp.us-east-1.amazonses.com` | 3600 |
| TXT | resend._domainkey | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...` | 3600 |

### How to Add DNS Records

#### If using Cloudflare:
1. Log in to Cloudflare
2. Select your domain: `marapone.com`
3. Go to **DNS** → **Records**
4. Click **"Add record"** for each record above
5. Wait 5-10 minutes for propagation

#### If using GoDaddy/Namecheap:
1. Log in to your domain registrar
2. Find DNS Management / DNS Settings
3. Add each record as shown above
4. Save changes
5. Wait 5-10 minutes for propagation

### Verify Domain

1. Back in Resend dashboard, click **"Verify"** next to your domain
2. If verification fails, wait a few more minutes and try again
3. Once verified, you'll see a green checkmark ✅

---

## Step 4: Test Email Sending

### Option A: Test via Browser (Recommended)

1. Make sure your dev server is running: `bun run dev`
2. Navigate to http://localhost:5173/
3. Scroll to the "Secure Your Access" form
4. Fill in:
   - Email: your-test-email@example.com
   - Role: Logistics Manager
   - Company Size: 51-200 employees
5. Click "Request Access"
6. Check gasper@marapone.com inbox for the email

### Option B: Test via API Directly

```bash
curl -X POST http://localhost:5173/api/send-waitlist-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "role": "Logistics Manager",
    "companySize": "51-200 employees"
  }'
```

Expected response:
```json
{
  "success": true,
  "id": "abc123-def456-ghi789"
}
```

---

## Step 5: Deploy to Production

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production, Preview, Development (select all)
4. Click **"Save"**
5. Redeploy your application

### Netlify Deployment

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Build & deploy** → **Environment**
3. Click **"Add variable"**
4. Add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
5. Click **"Save"**
6. Trigger a new deploy

---

## Email Template

The serverless function sends a professional HTML email with:

**From:** Gasper Waitlist <gasper@marapone.com>  
**To:** gasper@marapone.com  
**Reply-To:** [user's email]  
**Subject:** New Waitlist Request - Gasper Access

**Content includes:**
- User's email address
- Selected role
- Company size
- Submission timestamp
- Professional HTML formatting with your brand colors

---

## Troubleshooting

### "Failed to send email" error

**Check 1: API Key**
- Verify `RESEND_API_KEY` is set in `.env`
- Ensure it starts with `re_`
- Make sure there are no extra spaces

**Check 2: Domain Verification**
- Go to Resend dashboard → Domains
- Ensure marapone.com shows as "Verified" ✅
- If not verified, check DNS records

**Check 3: Browser Console**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API call details

### Emails not arriving

**Check 1: Spam Folder**
- Check spam/junk folder in gasper@marapone.com

**Check 2: Resend Logs**
- Go to Resend dashboard → Logs
- Check if email was sent successfully
- Look for any delivery errors

**Check 3: Email Address**
- Verify the "to" address in `/api/send-waitlist-email.js` is correct
- Should be: `to: ['gasper@marapone.com']`

### Domain verification failing

**Wait longer**
- DNS changes can take up to 24 hours (usually 5-10 minutes)

**Check DNS propagation**
- Use https://dnschecker.org/
- Enter your domain and check TXT records

**Verify records are correct**
- Double-check you copied the exact values from Resend
- Ensure no extra spaces or characters

### Rate limits

**Free tier limits:**
- 3,000 emails/month
- 100 emails/day

**If you exceed:**
- Upgrade to paid plan ($20/month for 50,000 emails)
- Or implement rate limiting on the form

---

## Security Notes

- ✅ API key is stored server-side only (never exposed to client)
- ✅ CORS is configured to accept requests from your domain
- ✅ Input validation prevents malicious data
- ✅ Email addresses are validated before sending

---

## Support

**Resend Documentation:**
- Getting Started: https://resend.com/docs/introduction
- Send Email API: https://resend.com/docs/api-reference/emails/send-email
- Domain Verification: https://resend.com/docs/dashboard/domains/introduction

**Resend Support:**
- Email: support@resend.com
- Discord: https://resend.com/discord

---

## Next Steps After Setup

Once everything is working:

1. ✅ Test the form on production
2. ✅ Verify emails arrive at gasper@marapone.com
3. ✅ Check that "From" address shows as gasper@marapone.com
4. ✅ Confirm "Reply-To" is set to user's email
5. ✅ Monitor Resend dashboard for delivery stats

---

## Email Customization

To customize the email template, edit `/api/send-waitlist-email.js`:

**Change subject:**
```javascript
subject: 'Your Custom Subject Here',
```

**Modify HTML template:**
```javascript
html: `
  <!-- Your custom HTML here -->
`
```

**Add more fields:**
```javascript
const { email, role, companySize, customField } = req.body;
```

---

## Pricing

**Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for waitlist

**Paid Plans:**
- $20/month: 50,000 emails
- $80/month: 100,000 emails
- Custom: Contact sales

Your waitlist form should stay well within the free tier! 🎉
