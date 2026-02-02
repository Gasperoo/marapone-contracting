import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    console.error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
});

/**
 * Create a Stripe checkout session for subscription or one-time payment
 */
export async function createCheckoutSession({
    customerId,
    customerEmail,
    lineItems,
    mode = 'subscription', // 'subscription' or 'payment'
    successUrl,
    cancelUrl,
    metadata = {}
}) {
    const sessionParams = {
        mode,
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
        allow_promotion_codes: true,
    };

    if (customerId) {
        sessionParams.customer = customerId;
    } else if (customerEmail) {
        sessionParams.customer_email = customerEmail;
    }

    // For subscriptions, add additional params
    if (mode === 'subscription') {
        sessionParams.subscription_data = {
            metadata
        };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return session;
}

/**
 * Create a customer portal session
 */
export async function createCustomerPortalSession(customerId, returnUrl) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
    return session;
}

/**
 * Get or create a Stripe customer
 */
export async function getOrCreateCustomer(email, userId) {
    // Search for existing customer
    const customers = await stripe.customers.list({
        email,
        limit: 1
    });

    if (customers.data.length > 0) {
        return customers.data[0];
    }

    // Create new customer
    const customer = await stripe.customers.create({
        email,
        metadata: {
            userId
        }
    });

    return customer;
}

/**
 * Get subscription by ID
 */
export async function getSubscription(subscriptionId) {
    return await stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * Cancel subscription
 */
export async function cancelStripeSubscription(subscriptionId) {
    return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Create a product in Stripe (for initial setup)
 */
export async function createProduct(name, description) {
    return await stripe.products.create({
        name,
        description,
    });
}

/**
 * Create a price for a product (for initial setup)
 */
export async function createPrice(productId, unitAmount, currency = 'usd', recurring = null) {
    const priceData = {
        product: productId,
        unit_amount: unitAmount,
        currency,
    };

    if (recurring) {
        priceData.recurring = recurring;
    }

    return await stripe.prices.create(priceData);
}

/**
 * Verify webhook signature
 */
export function constructWebhookEvent(payload, signature) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    }

    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

/**
 * Helper to map package data to Stripe line items
 */
export function createLineItemsFromCart(cartItems) {
    return cartItems.map(item => {
        // If item has a stripe_price_id, use it
        if (item.stripe_price_id) {
            return {
                price: item.stripe_price_id,
                quantity: item.quantity || 1
            };
        }

        // Otherwise, create a price on the fly (for one-time payments)
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: item.features?.slice(0, 3).join(', ') || '',
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents
                ...(item.duration === 'Monthly' && {
                    recurring: {
                        interval: 'month'
                    }
                })
            },
            quantity: item.quantity || 1
        };
    });
}
