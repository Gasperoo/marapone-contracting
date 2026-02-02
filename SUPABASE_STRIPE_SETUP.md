# Supabase & Stripe Setup Guide

This guide will help you set up Supabase and Stripe for the Marapone Contracting website.

## Prerequisites

- A Supabase account (https://supabase.com)
- A Stripe account (https://stripe.com)
- Node.js and npm installed

## Part 1: Supabase Setup

### 1. Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the project details:
   - Name: `marapone-contracting` (or your preferred name)
   - Database Password: Choose a strong password (save this!)
   - Region: Choose closest to your users
4. Click "Create new project" and wait for it to initialize

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

### 3. Run the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `server/supabase-schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- `profiles` table (user data)
- `addresses` table (billing/shipping)
- `subscriptions` table (with Stripe integration)
- `orders` table (one-time purchases)
- `cart_items` table (persistent cart)
- Row Level Security (RLS) policies
- Triggers and indexes

### 4. Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize confirmation and reset password emails

### 5. Disable Email Confirmation (Optional, for Development)

1. Go to **Authentication** → **Settings**
2. Under "Email Auth", toggle **OFF** "Enable email confirmations"
3. This allows users to sign up without email verification (re-enable for production!)

## Part 2: Stripe Setup

### 1. Create a Stripe Account

1. Go to https://stripe.com and sign up
2. Complete your account setup
3. **Enable Test Mode** (toggle in the top right)

### 2. Get Your Stripe API Keys

1. Go to **Developers** → **API keys**
2. Copy the following:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) - **Keep this secret!**

### 3. Set Up Webhook Endpoint

1. Go to **Developers** → **Webhooks**
2. Click "Add endpoint"
3. Enter your webhook URL:
   - Local development: `http://localhost:3001/api/stripe/webhook`
   - Production: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_...`)

### 4. Configure Customer Portal

1. Go to **Settings** → **Billing** → **Customer portal**
2. Click "Activate test link"
3. Configure portal settings:
   - ✅ Allow customers to update payment methods
   - ✅ Allow customers to update billing information
   - ✅ Allow customers to cancel subscriptions
   - ✅ Allow customers to view invoices
4. Save settings

### 5. Create Products and Prices (Optional)

You can create products in Stripe dashboard or let the code create them dynamically:

**Option A: Create in Dashboard**
1. Go to **Products** → **Add product**
2. Create products for each package tier
3. Add prices (monthly, yearly, etc.)
4. Copy the Price IDs and update `PackagesPage.jsx`

**Option B: Dynamic Creation (Recommended)**
The code will create prices on-the-fly during checkout using `price_data`.

## Part 3: Environment Variables

### 1. Create `.env` File

In the project root, create a `.env` file:

```bash
cp .env.example .env
```

### 2. Fill in Your Credentials

Edit `.env` and add your credentials:

```bash
# Base path for deployment
VITE_BASE_PATH=/

# Supabase Configuration (Frontend)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe Configuration (Frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Backend Environment Variables (Server only)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Frontend URL for redirects
FRONTEND_URL=http://localhost:5173
```

### 3. Important Notes

- **Never commit `.env` to git!** (it's in `.gitignore`)
- Frontend variables must start with `VITE_`
- Backend variables should NOT start with `VITE_`
- Use test keys during development
- Switch to live keys for production

## Part 4: Testing

### 1. Start the Development Server

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
npm run server
```

### 2. Test Authentication

1. Go to http://localhost:5173/account
2. Create a new account
3. Check Supabase dashboard → **Authentication** → **Users** to see the new user
4. Check **Table Editor** → **profiles** to see the profile data

### 3. Test Stripe Checkout

1. Add a package to cart
2. Click "Proceed to Checkout"
3. You'll be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. Complete payment
6. Check Stripe dashboard → **Payments** to see the test payment
7. Check Supabase → **subscriptions** table to see the saved subscription

### 4. Test Customer Portal

1. Go to http://localhost:5173/settings
2. Click "Manage Billing"
3. You'll be redirected to Stripe Customer Portal
4. Try updating payment method or canceling subscription

## Part 5: Production Deployment

### 1. Update Environment Variables

1. Switch to **live mode** in Stripe dashboard
2. Get live API keys (start with `pk_live_` and `sk_live_`)
3. Update webhook endpoint to production URL
4. Update `.env` with live credentials

### 2. Enable Email Confirmation

1. In Supabase → **Authentication** → **Settings**
2. Enable "Email confirmations"
3. Configure email templates

### 3. Test in Production

1. Create a test account
2. Make a small real purchase
3. Verify everything works
4. Refund the test purchase in Stripe dashboard

## Troubleshooting

### "Missing Supabase environment variables"
- Check that `.env` file exists
- Verify variable names start with `VITE_` for frontend
- Restart dev server after changing `.env`

### "Authentication required" errors
- Check that Supabase RLS policies are set up correctly
- Verify user is logged in
- Check browser console for auth errors

### "Failed to create checkout session"
- Verify Stripe secret key is correct
- Check backend server is running
- Look at backend console for errors

### Webhook not receiving events
- Verify webhook URL is correct
- Check webhook signing secret matches `.env`
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3001/api/stripe/webhook`

### Database errors
- Verify schema was run successfully
- Check RLS policies are enabled
- Look at Supabase logs for errors

## Next Steps

- Customize email templates in Supabase
- Set up Stripe tax collection
- Configure Stripe invoicing
- Add more products/prices
- Set up monitoring and alerts
- Enable Stripe Radar for fraud prevention

## Support

- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs
- Stripe Testing: https://stripe.com/docs/testing
