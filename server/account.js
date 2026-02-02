/** Account API — now using Supabase for authentication and data storage */

import { Router } from 'express';
import { supabaseAdmin, getUserProfile, updateUserProfile, getUserAddresses, updateUserAddresses, getUserSubscriptions, cancelSubscription } from './supabase.js';
import { auth, validation, generic } from './copy.js';

const router = Router();

// Authentication middleware - validates Supabase JWT token
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    req.userId = user.id;
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
}

// Note: Registration and login are now handled by Supabase Auth on the frontend
// These endpoints are kept for compatibility but redirect to Supabase

router.post('/register', async (req, res) => {
  // This is now handled by Supabase Auth on the frontend
  // Keeping this endpoint for API compatibility
  return res.status(400).json({
    success: false,
    message: 'Please use Supabase Auth for registration'
  });
});

router.post('/login', async (req, res) => {
  // This is now handled by Supabase Auth on the frontend
  // Keeping this endpoint for API compatibility
  return res.status(400).json({
    success: false,
    message: 'Please use Supabase Auth for login'
  });
});

router.post('/logout', async (req, res) => {
  // Logout is handled by Supabase Auth on the frontend
  res.json({ success: true, message: auth.logout.success });
});

// Get current user profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const profile = await getUserProfile(req.userId);
    res.json({
      success: true,
      data: { id: profile.id, username: profile.username, email: profile.email }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Update user profile (username and/or email)
router.put('/profile', requireAuth, async (req, res) => {
  const { username, email } = req.body || {};

  if (!username?.trim() && !email?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'At least one field (username or email) is required'
    });
  }

  const updates = {};
  if (username?.trim()) updates.username = username.trim();
  if (email?.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: validation.invalidEmail
      });
    }
    updates.email = email.trim();
  }

  try {
    const profile = await updateUserProfile(req.userId, updates);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { id: profile.id, username: profile.username, email: profile.email }
    });
  } catch (error) {
    console.error('Error updating profile:', error);

    // Check for unique constraint violations
    if (error.code === '23505') {
      if (error.message.includes('username')) {
        return res.status(409).json({ success: false, message: 'Username already taken' });
      }
      if (error.message.includes('email')) {
        return res.status(409).json({ success: false, message: 'Email already registered' });
      }
    }

    res.status(400).json({ success: false, message: generic.error });
  }
});

// Update password - now handled by Supabase Auth
router.put('/password', requireAuth, async (req, res) => {
  const { newPassword } = req.body || {};

  if (!newPassword || String(newPassword).length < 8) {
    return res.status(400).json({
      success: false,
      message: validation.passwordTooShort
    });
  }

  try {
    // Update password using Supabase Admin API
    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      req.userId,
      { password: newPassword }
    );

    if (error) throw error;

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(400).json({ success: false, message: generic.error });
  }
});

// Get user addresses
router.get('/addresses', requireAuth, async (req, res) => {
  try {
    const addresses = await getUserAddresses(req.userId);
    res.json({
      success: true,
      data: addresses
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(400).json({ success: false, message: generic.error });
  }
});

// Update user addresses
router.put('/addresses', requireAuth, async (req, res) => {
  const { billing, shipping } = req.body || {};

  try {
    const addresses = await updateUserAddresses(req.userId, { billing, shipping });
    res.json({
      success: true,
      message: 'Addresses updated successfully',
      data: addresses
    });
  } catch (error) {
    console.error('Error updating addresses:', error);
    res.status(400).json({ success: false, message: generic.error });
  }
});

// Get user subscriptions
router.get('/subscriptions', requireAuth, async (req, res) => {
  const status = req.query.status || 'active';

  try {
    const subscriptions = await getUserSubscriptions(req.userId, status);
    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(400).json({ success: false, message: generic.error });
  }
});

// Cancel subscription
router.post('/subscriptions/:id/cancel', requireAuth, async (req, res) => {
  const subscriptionId = req.params.id;

  try {
    const subscription = await cancelSubscription(req.userId, subscriptionId);
    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);

    if (error.message?.includes('not found')) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    res.status(400).json({ success: false, message: generic.error });
  }
});

export default router;
