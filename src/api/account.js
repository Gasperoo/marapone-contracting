/** Account API client — now using Supabase Auth tokens */

import { supabase } from '../lib/supabase';

const API = '/api/account';

async function getToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}

async function request(method, path, body) {
  const token = await getToken();

  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (token) opts.headers.Authorization = `Bearer ${token}`;
  if (body && method !== 'GET') opts.body = JSON.stringify(body);

  const res = await fetch(`${API}${path}`, opts);
  let data;
  const text = await res.text();

  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse response JSON:', text);
    data = {};
  }

  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong. Please try again.');
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const accountApi = {
  getToken,

  // Note: register and login are now handled by Supabase Auth in AuthContext
  // These are kept for compatibility but not used
  async register({ username, email, password, terms }) {
    throw new Error('Please use Supabase Auth for registration');
  },

  async login({ usernameOrEmail, password }) {
    throw new Error('Please use Supabase Auth for login');
  },

  async logout() {
    // Logout is handled by Supabase Auth in AuthContext
    return { success: true };
  },

  async getProfile() {
    const data = await request('GET', '/me', null);
    return data.data;
  },

  async updateProfile({ username, email }) {
    const data = await request('PUT', '/profile', { username, email });
    return data.data;
  },

  async updatePassword({ newPassword }) {
    const data = await request('PUT', '/password', { newPassword });
    return data;
  },

  // Address management
  async getAddresses() {
    const data = await request('GET', '/addresses', null);
    return data.data;
  },

  async updateAddresses({ billing, shipping }) {
    const data = await request('PUT', '/addresses', { billing, shipping });
    return data;
  },

  // Subscription management
  async getSubscriptions(status = 'active') {
    const data = await request('GET', `/subscriptions?status=${status}`, null);
    return data.data;
  },

  async cancelSubscription(subscriptionId) {
    const data = await request('POST', `/subscriptions/${subscriptionId}/cancel`, {});
    return data;
  },
};

// Stripe API client
const STRIPE_API = '/api/stripe';

export const stripeApi = {
  async createCheckoutSession({ cartItems, userId, userEmail, mode = 'subscription' }) {
    const token = await getToken();

    const res = await fetch(`${STRIPE_API}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ cartItems, userId, userEmail, mode })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to create checkout session');
    }

    return data;
  },

  async createPortalSession(customerId) {
    const token = await getToken();

    const res = await fetch(`${STRIPE_API}/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ customerId })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to create portal session');
    }

    return data;
  }
};

export default accountApi;
