# Production Deployment Checklist

## ✅ Completed Setup

### Supabase Configuration
- [x] Supabase project created
- [x] Database schema deployed (`supabase-schema.sql`)
- [x] Tables created: `profiles`, `addresses`, `subscriptions`, `orders`, `cart_items`
- [x] Row Level Security (RLS) policies enabled
- [x] Triggers and functions configured
- [x] Supabase credentials added to GitHub Secrets

### Stripe Configuration
- [x] Stripe account set up
- [x] Live API keys obtained
- [x] Test mode webhook configured (local development)
- [x] Production webhook created at `https://marapone.com/api/stripe/webhook`
- [x] Webhook events configured:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`
- [x] Stripe credentials added to GitHub Secrets

### GitHub Actions
- [x] Deployment workflow configured (`.github/workflows/deploy.yml`)
- [x] Environment variables configured in workflow
- [x] All secrets added to repository

### Application Code
- [x] Frontend authentication migrated to Supabase
- [x] Backend API endpoints updated
- [x] Stripe Checkout integration implemented
- [x] Stripe Customer Portal integrated
- [x] Success/cancel pages created
- [x] Profile and address management functional

## 🚀 Ready for Deployment

### GitHub Secrets Verified
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` (live mode)
- `STRIPE_WEBHOOK_SECRET` (production)

### Deployment Process

Your application is configured to deploy automatically via GitHub Actions. To deploy:

1. **Trigger Deployment**
   ```bash
   git push origin main
   ```
   
   The GitHub Actions workflow will automatically:
   - Install dependencies
   - Build the frontend
   - Deploy to your hosting platform
   - Use the production environment variables from GitHub Secrets

2. **Monitor Deployment**
   - Go to: https://github.com/Gasperoo/marapone-contracting/actions
   - Watch the deployment progress
   - Check for any errors in the workflow logs

3. **Post-Deployment Verification**
   After deployment completes, test the following:
   
   - [ ] Visit `https://marapone.com` - site loads correctly
   - [ ] User registration works
   - [ ] User login works
   - [ ] Profile updates work
   - [ ] Address management works
   - [ ] Add package to cart
   - [ ] Checkout redirects to Stripe
   - [ ] Complete payment with test card
   - [ ] Verify subscription appears in Settings
   - [ ] Test Stripe Customer Portal access
   - [ ] Check webhook events in Stripe dashboard

## 📊 Monitoring

### Supabase Dashboard
- Monitor database activity: https://supabase.com/dashboard/project/caibyqdwzyhzatrdlqso
- Check authentication logs
- Review table data

### Stripe Dashboard
- Monitor payments: https://dashboard.stripe.com/payments
- Check webhook deliveries: https://dashboard.stripe.com/webhooks
- Review customer subscriptions: https://dashboard.stripe.com/subscriptions

## 🔧 Troubleshooting

### If Webhooks Fail
1. Check webhook endpoint is accessible: `https://marapone.com/api/stripe/webhook`
2. Verify webhook secret matches in GitHub Secrets
3. Check Stripe dashboard for webhook delivery attempts and errors

### If Authentication Fails
1. Verify Supabase URL and keys are correct
2. Check Supabase Auth settings
3. Review browser console for errors

### If Payments Fail
1. Verify Stripe live API keys are correct
2. Check Stripe dashboard for error messages
3. Review server logs for webhook processing errors

## 📝 Next Steps

1. **Test in Production**: Run through the complete user flow
2. **Monitor Logs**: Watch for any errors in the first few hours
3. **Email Configuration**: Customize Supabase email templates for production
4. **SSL Certificate**: Ensure HTTPS is properly configured
5. **Domain Configuration**: Verify DNS settings for `marapone.com`

## 🎉 You're Ready!

All configuration is complete. Your application is ready for production deployment with full Supabase and Stripe integration.
