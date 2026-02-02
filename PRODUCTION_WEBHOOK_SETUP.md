# Production Webhook Setup Guide

Since you're already signed into Stripe on Safari/Desktop app, follow these steps to create the production webhook:

## Steps to Create Production Webhook

1. **Open Stripe Dashboard** (in Safari or Desktop app where you're logged in)
   - Go to: https://dashboard.stripe.com/webhooks

2. **Switch to Live Mode**
   - Toggle the "Test mode" switch in the top right to OFF (you want live mode for production)

3. **Add New Endpoint**
   - Click the "+ Add endpoint" button

4. **Configure Endpoint**
   - **Endpoint URL**: `https://marapone.com/api/stripe/webhook`
   - **Description** (optional): "Production webhook for Marapone Contracting"

5. **Select Events to Listen For**
   Click "Select events" and choose these 4 events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

6. **Add Endpoint**
   - Click "Add endpoint" to save

7. **Get Webhook Signing Secret**
   - After creating, click on the webhook endpoint in the list
   - Find "Signing secret" section
   - Click "Reveal" to show the secret
   - Copy the secret (starts with `whsec_`)

8. **Add to GitHub Secrets**
   - Go to: https://github.com/Gasperoo/marapone-contracting/settings/secrets/actions
   - Click "New repository secret"
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: Paste the `whsec_...` secret you just copied
   - Click "Add secret"

## Verification

Once completed, you should have:
- ✅ Production webhook endpoint created at `https://marapone.com/api/stripe/webhook`
- ✅ Webhook listening for 4 events
- ✅ Webhook signing secret added to GitHub Secrets

## Next Steps

After adding the webhook secret to GitHub, the deployment workflow will have all the necessary credentials to deploy your application to production with full Stripe integration.
