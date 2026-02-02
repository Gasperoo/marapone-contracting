/** Backend for Account and Payments - Supabase + Stripe Integration */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import accountRoutes from './account.js';
import {
  stripe,
  createCheckoutSession,
  createCustomerPortalSession,
  getOrCreateCustomer,
  constructWebhookEvent,
  createLineItemsFromCart
} from './stripe.js';
import {
  supabaseAdmin,
  createSubscription,
  updateSubscription,
  createOrder,
  updateOrder
} from './supabase.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));

// Stripe webhook endpoint needs raw body
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = constructWebhookEvent(req.body, sig);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);

        // Get customer and user info
        const customerId = session.customer;
        const userId = session.metadata?.userId;

        if (session.mode === 'subscription') {
          // Handle subscription creation
          const subscriptionId = session.subscription;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          // Save subscription to database
          await createSubscription(userId, {
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId,
            package_name: session.metadata?.packageName || 'Unknown',
            tier: session.metadata?.tier || 'Bronze',
            category: session.metadata?.category || 'Unknown',
            duration: session.metadata?.duration || 'Monthly',
            price: (session.amount_total / 100),
            features: JSON.parse(session.metadata?.features || '[]'),
            status: subscription.status,
            next_billing_date: new Date(subscription.current_period_end * 1000).toISOString()
          });
        } else if (session.mode === 'payment') {
          // Handle one-time payment
          const paymentIntentId = session.payment_intent;

          // Save order to database
          await createOrder(userId, {
            stripe_payment_intent_id: paymentIntentId,
            stripe_customer_id: customerId,
            items: JSON.parse(session.metadata?.items || '[]'),
            total_amount: (session.amount_total / 100),
            status: 'completed'
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        console.log('Subscription updated:', subscription.id);

        // Update subscription status in database
        const { data: existingSub } = await supabaseAdmin
          .from('subscriptions')
          .select('id')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (existingSub) {
          await updateSubscription(existingSub.id, {
            status: subscription.status,
            next_billing_date: new Date(subscription.current_period_end * 1000).toISOString()
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log('Subscription cancelled:', subscription.id);

        // Mark subscription as cancelled in database
        const { data: existingSub } = await supabaseAdmin
          .from('subscriptions')
          .select('id')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (existingSub) {
          await updateSubscription(existingSub.id, {
            status: 'cancelled',
            cancelled_at: new Date().toISOString()
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log('Payment failed for invoice:', invoice.id);

        // Update subscription status to past_due
        if (invoice.subscription) {
          const { data: existingSub } = await supabaseAdmin
            .from('subscriptions')
            .select('id')
            .eq('stripe_subscription_id', invoice.subscription)
            .single();

          if (existingSub) {
            await updateSubscription(existingSub.id, {
              status: 'past_due'
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Regular JSON parsing for other routes
app.use(express.json());

app.use('/api/account', accountRoutes);

// Create Stripe checkout session
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    const { cartItems, userId, userEmail, mode = 'subscription' } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Get or create Stripe customer
    const customer = await getOrCreateCustomer(userEmail, userId);

    // Create line items from cart
    const lineItems = createLineItemsFromCart(cartItems);

    // Prepare metadata
    const metadata = {
      userId,
      packageName: cartItems[0]?.name || 'Package',
      tier: cartItems[0]?.tier || 'Bronze',
      category: cartItems[0]?.category || 'Package',
      duration: cartItems[0]?.duration || 'Monthly',
      features: JSON.stringify(cartItems[0]?.features || []),
      items: JSON.stringify(cartItems)
    };

    // Create checkout session
    const session = await createCheckoutSession({
      customerId: customer.id,
      lineItems,
      mode,
      successUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
      metadata
    });

    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ success: false, message: 'Failed to create checkout session' });
  }
});

// Create customer portal session
app.post('/api/stripe/create-portal-session', async (req, res) => {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({ success: false, message: 'Customer ID required' });
    }

    const session = await createCustomerPortalSession(
      customerId,
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}/settings`
    );

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ success: false, message: 'Failed to create portal session' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, supabase: !!process.env.SUPABASE_URL, stripe: !!process.env.STRIPE_SECRET_KEY });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Supabase configured: ${!!process.env.SUPABASE_URL}`);
  console.log(`Stripe configured: ${!!process.env.STRIPE_SECRET_KEY}`);
});
