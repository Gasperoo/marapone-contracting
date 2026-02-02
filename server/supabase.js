import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase environment variables for server.');
    console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
}

// Create Supabase client with service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId) {
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, updates) {
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Get user addresses
 */
export async function getUserAddresses(userId) {
    const { data, error } = await supabaseAdmin
        .from('addresses')
        .select('*')
        .eq('user_id', userId);

    if (error) throw error;

    const billing = data.find(addr => addr.type === 'billing') || null;
    const shipping = data.find(addr => addr.type === 'shipping') || null;

    return { billing, shipping };
}

/**
 * Update user addresses
 */
export async function updateUserAddresses(userId, addresses) {
    const results = {};

    // Update billing address
    if (addresses.billing) {
        const { data, error } = await supabaseAdmin
            .from('addresses')
            .upsert({
                user_id: userId,
                type: 'billing',
                ...addresses.billing
            }, {
                onConflict: 'user_id,type'
            })
            .select()
            .single();

        if (error) throw error;
        results.billing = data;
    }

    // Update shipping address
    if (addresses.shipping) {
        const { data, error } = await supabaseAdmin
            .from('addresses')
            .upsert({
                user_id: userId,
                type: 'shipping',
                ...addresses.shipping
            }, {
                onConflict: 'user_id,type'
            })
            .select()
            .single();

        if (error) throw error;
        results.shipping = data;
    }

    return results;
}

/**
 * Get user subscriptions
 */
export async function getUserSubscriptions(userId, status = 'active') {
    let query = supabaseAdmin
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId);

    if (status !== 'all') {
        query = query.eq('status', status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

/**
 * Create subscription
 */
export async function createSubscription(userId, subscriptionData) {
    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .insert({
            user_id: userId,
            ...subscriptionData
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Update subscription
 */
export async function updateSubscription(subscriptionId, updates) {
    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .update(updates)
        .eq('id', subscriptionId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(userId, subscriptionId) {
    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString()
        })
        .eq('id', subscriptionId)
        .eq('user_id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Create order
 */
export async function createOrder(userId, orderData) {
    const { data, error } = await supabaseAdmin
        .from('orders')
        .insert({
            user_id: userId,
            ...orderData
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Update order
 */
export async function updateOrder(orderId, updates) {
    const { data, error } = await supabaseAdmin
        .from('orders')
        .update(updates)
        .eq('id', orderId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Get user orders
 */
export async function getUserOrders(userId) {
    const { data, error } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}
