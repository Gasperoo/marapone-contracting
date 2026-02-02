# Add Missing GitHub Secrets

You need to add 3 more secrets to GitHub. Copy the values from your `.env` file.

## 🔐 Secrets to Add

Go to: https://github.com/Gasperoo/marapone-contracting/settings/secrets/actions

Click "New repository secret" for each of these:

### 1. SUPABASE_URL
**Name:** `SUPABASE_URL`  
**Value:** Copy the value of `SUPABASE_URL` from your `.env` file

### 2. SUPABASE_SERVICE_ROLE_KEY
**Name:** `SUPABASE_SERVICE_ROLE_KEY`  
**Value:** Copy the value of `SUPABASE_SERVICE_ROLE_KEY` from your `.env` file

### 3. STRIPE_SECRET_KEY
**Name:** `STRIPE_SECRET_KEY`  
**Value:** Copy your **LIVE** Stripe secret key (starts with `sk_live_...`) from https://dashboard.stripe.com/apikeys

## ⚠️ Important Notes

- **STRIPE_SECRET_KEY**: This is currently your **TEST** key (starts with `sk_test_`). 
  - For production deployment, you'll need to replace this with your **LIVE** key (starts with `sk_live_`)
  - You can get your live key from: https://dashboard.stripe.com/apikeys (make sure you're in live mode)

- **STRIPE_WEBHOOK_SECRET**: Already added ✅

## ✅ Verification

After adding all 3 secrets, you should have these 4 secrets total:
1. ✅ STRIPE_WEBHOOK_SECRET (already added)
2. ⬜ SUPABASE_URL
3. ⬜ SUPABASE_SERVICE_ROLE_KEY
4. ⬜ STRIPE_SECRET_KEY

Once all 4 are added, your deployment workflow will be ready to run!

## 🚀 Next Steps

After adding these secrets:
1. Update `STRIPE_SECRET_KEY` with your **live** key (not test key)
2. Push to GitHub to trigger deployment
3. Monitor the deployment in GitHub Actions
