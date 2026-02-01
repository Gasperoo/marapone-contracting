/** Account API — register and login. Responses use server/copy.js */

import { Router } from 'express';
import * as store from './store.js';
import { auth, validation, generic } from './copy.js';

const router = Router();

router.post('/register', (req, res) => {
  const { username, email, password, terms } = req.body || {};
  if (!username?.trim()) {
    return res.status(400).json({
      success: false,
      message: validation.required('Username'),
      errors: { username: validation.required('Username') },
    });
  }
  if (!email?.trim()) {
    return res.status(400).json({
      success: false,
      message: validation.required('Email'),
      errors: { email: validation.required('Email') },
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: validation.invalidEmail,
      errors: { email: validation.invalidEmail },
    });
  }
  if (!password || String(password).length < 8) {
    return res.status(400).json({
      success: false,
      message: validation.passwordTooShort,
      errors: { password: validation.passwordTooShort },
    });
  }
  if (!terms) {
    return res.status(400).json({
      success: false,
      message: auth.signUp.termsRequired,
      errors: { terms: auth.signUp.termsRequired },
    });
  }

  const result = store.createUser({
    username: username.trim(),
    email: email.trim(),
    password: String(password),
  });
  if (result.conflict === 'username') {
    return res.status(409).json({ success: false, message: auth.signUp.usernameTaken });
  }
  if (result.conflict === 'email') {
    return res.status(409).json({ success: false, message: auth.signUp.emailRegistered });
  }
  if (!result.user) {
    return res.status(400).json({ success: false, message: generic.error });
  }

  const token = store.createSession(result.user.id);
  res.status(201).json({
    success: true,
    message: auth.signUp.success,
    data: { user: result.user, token },
  });
});

router.post('/login', (req, res) => {
  const { usernameOrEmail, password } = req.body || {};
  if (!usernameOrEmail?.trim() || !password) {
    return res.status(400).json({
      success: false,
      message: auth.login.invalidCredentials,
    });
  }
  const user = store.findUserByLogin(usernameOrEmail.trim(), password);
  if (!user) {
    return res.status(401).json({ success: false, message: auth.login.invalidCredentials });
  }
  const token = store.createSession(user.id);
  res.json({
    success: true,
    message: auth.login.success,
    data: { user, token },
  });
});

router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '') || req.body?.token;
  if (token) store.destroySession(token);
  res.json({ success: true, message: auth.logout.success });
});

// Authentication middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  const userId = store.getSession(token);
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
  req.userId = userId;
  next();
}

// Get current user profile
router.get('/me', requireAuth, (req, res) => {
  const user = store.getUserById(req.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({
    success: true,
    data: { id: user.id, username: user.username, email: user.email }
  });
});

// Update user profile (username and/or email)
router.put('/profile', requireAuth, (req, res) => {
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

  const result = store.updateUserProfile(req.userId, updates);
  if (result.conflict === 'username') {
    return res.status(409).json({ success: false, message: 'Username already taken' });
  }
  if (result.conflict === 'email') {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }
  if (!result.user) {
    return res.status(400).json({ success: false, message: generic.error });
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: { id: result.user.id, username: result.user.username, email: result.user.email }
  });
});

// Update password
router.put('/password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required'
    });
  }

  if (String(newPassword).length < 8) {
    return res.status(400).json({
      success: false,
      message: validation.passwordTooShort
    });
  }

  const result = store.updateUserPassword(req.userId, currentPassword, newPassword);
  if (result.error === 'invalid_password') {
    return res.status(401).json({ success: false, message: 'Current password is incorrect' });
  }
  if (!result.success) {
    return res.status(400).json({ success: false, message: generic.error });
  }

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
});

// Get user addresses
router.get('/addresses', requireAuth, (req, res) => {
  const addresses = store.getUserAddresses(req.userId);
  res.json({
    success: true,
    data: addresses
  });
});

// Update user addresses
router.put('/addresses', requireAuth, (req, res) => {
  const { billing, shipping } = req.body || {};

  const result = store.updateUserAddresses(req.userId, { billing, shipping });
  if (result.error) {
    return res.status(400).json({ success: false, message: generic.error });
  }

  res.json({
    success: true,
    message: 'Addresses updated successfully',
    data: result.addresses
  });
});

// Get user subscriptions
router.get('/subscriptions', requireAuth, (req, res) => {
  const status = req.query.status || 'active'; // 'active', 'cancelled', or 'all'
  const subscriptions = store.getUserSubscriptions(req.userId, status);
  res.json({
    success: true,
    data: subscriptions
  });
});

// Create subscription (from cart checkout)
router.post('/subscriptions', requireAuth, (req, res) => {
  const subscriptionData = req.body;

  if (!subscriptionData.packageName || !subscriptionData.tier || !subscriptionData.duration || !subscriptionData.price) {
    return res.status(400).json({
      success: false,
      message: 'Missing required subscription data'
    });
  }

  const result = store.createSubscription(req.userId, subscriptionData);
  if (result.error) {
    return res.status(400).json({ success: false, message: generic.error });
  }

  res.json({
    success: true,
    message: 'Subscription created successfully',
    data: result.subscription
  });
});

// Cancel subscription
router.post('/subscriptions/:id/cancel', requireAuth, (req, res) => {
  const subscriptionId = req.params.id;

  const result = store.cancelSubscription(req.userId, subscriptionId);
  if (result.error === 'subscription_not_found') {
    return res.status(404).json({ success: false, message: 'Subscription not found' });
  }
  if (result.error) {
    return res.status(400).json({ success: false, message: generic.error });
  }

  res.json({
    success: true,
    message: 'Subscription cancelled successfully',
    data: result.subscription
  });
});

export default router;
