import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
    console.warn('Missing Stripe publishable key. Payment features will not work.');
}

let stripePromise;

export const getStripe = () => {
    if (!stripePromise && stripePublishableKey) {
        stripePromise = loadStripe(stripePublishableKey);
    }
    return stripePromise;
};

/**
 * Redirect to Stripe Checkout
 * @param {string} sessionId - Stripe checkout session ID
 */
export const redirectToCheckout = async (sessionId) => {
    const stripe = await getStripe();
    if (!stripe) {
        throw new Error('Stripe is not initialized');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
        throw error;
    }
};

/**
 * Redirect to Stripe Customer Portal
 * @param {string} sessionUrl - Customer portal session URL
 */
export const redirectToCustomerPortal = (sessionUrl) => {
    window.location.href = sessionUrl;
};
