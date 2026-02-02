# How to Get Stripe API Keys from Desktop App

## Step 1: Get API Keys

1. In your Stripe desktop app, make sure you're in **Test Mode** (toggle in top right)
2. Navigate to **Developers** → **API keys** (in the left sidebar)
3. You'll see two keys:

### Publishable Key
- Starts with `pk_test_`
- This is visible by default
- **Copy this entire key**

### Secret Key
- Starts with `sk_test_`
- Click **"Reveal test key"** or **"Reveal live key"** button
- **Copy this entire key**
- ⚠️ **Keep this secret!** Never commit to git

## Step 2: Set Up Webhook

1. In Stripe app, go to **Developers** → **Webhooks**
2. Click **"Add endpoint"** or **"+ Add endpoint"**
3. Enter the endpoint URL:
   ```
   http://localhost:3001/api/stripe/webhook
   ```
4. Under "Events to send", select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click **"Add endpoint"**
6. After creating, click on the webhook endpoint
7. Click **"Reveal"** next to "Signing secret"
8. **Copy the signing secret** (starts with `whsec_`)

## Step 3: Provide the Keys

Once you have all three values, provide them to me:
1. Publishable Key (pk_test_...)
2. Secret Key (sk_test_...)
3. Webhook Secret (whsec_...)

I'll update your `.env` file with these credentials!

---

**Note:** If you can't find these sections in the desktop app, you can also:
- Try accessing https://dashboard.stripe.com in a different browser
- Or just copy the keys from the desktop app and paste them here
