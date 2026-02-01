/** In-memory store for Account data. Replace with a real DB for production. */

const users = new Map();
const byUsername = new Map();
const byEmail = new Map();
const sessions = new Map();

let nextUserId = 1;

function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

function normalizeUsername(username) {
  return (username || '').trim();
}

export function createUser({ username, email, password }) {
  const u = username && normalizeUsername(username);
  const e = email && normalizeEmail(email);
  if (!u || !e || !password) return null;
  if (byUsername.has(u)) return { conflict: 'username' };
  if (byEmail.has(e)) return { conflict: 'email' };
  const id = String(nextUserId++);
  const user = {
    id,
    username: u,
    email: e,
    password,
    createdAt: new Date().toISOString(),
  };
  users.set(id, user);
  byUsername.set(u, user);
  byEmail.set(e, user);
  return { user: { id: user.id, username: user.username, email: user.email } };
}

export function findUserByLogin(usernameOrEmail, password) {
  const key = usernameOrEmail.includes('@')
    ? normalizeEmail(usernameOrEmail)
    : normalizeUsername(usernameOrEmail);
  const byMap = usernameOrEmail.includes('@') ? byEmail : byUsername;
  const user = byMap.get(key);
  if (!user || user.password !== password) return null;
  return { id: user.id, username: user.username, email: user.email };
}

const tokenSecret = Math.random().toString(36).slice(2);
export function createSession(userId) {
  const token = `${userId}:${tokenSecret}:${Date.now()}`;
  sessions.set(token, { userId, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  return token;
}

export function getSession(token) {
  const s = sessions.get(token);
  if (!s || s.expiresAt < Date.now()) return null;
  return s.userId;
}

export function destroySession(token) {
  sessions.delete(token);
}

export function getUserById(userId) {
  const user = users.get(userId);
  if (!user) return null;
  return { id: user.id, username: user.username, email: user.email };
}

export function updateUserProfile(userId, updates) {
  const user = users.get(userId);
  if (!user) return { error: 'user_not_found' };

  // Check for conflicts
  if (updates.username) {
    const normalizedUsername = normalizeUsername(updates.username);
    const existing = byUsername.get(normalizedUsername);
    if (existing && existing.id !== userId) {
      return { conflict: 'username' };
    }
  }

  if (updates.email) {
    const normalizedEmail = normalizeEmail(updates.email);
    const existing = byEmail.get(normalizedEmail);
    if (existing && existing.id !== userId) {
      return { conflict: 'email' };
    }
  }

  // Remove old mappings
  if (updates.username && user.username !== normalizeUsername(updates.username)) {
    byUsername.delete(user.username);
  }
  if (updates.email && user.email !== normalizeEmail(updates.email)) {
    byEmail.delete(user.email);
  }

  // Update user
  if (updates.username) user.username = normalizeUsername(updates.username);
  if (updates.email) user.email = normalizeEmail(updates.email);

  // Add new mappings
  if (updates.username) byUsername.set(user.username, user);
  if (updates.email) byEmail.set(user.email, user);

  return { user: { id: user.id, username: user.username, email: user.email } };
}

export function updateUserPassword(userId, currentPassword, newPassword) {
  const user = users.get(userId);
  if (!user) return { error: 'user_not_found' };

  if (user.password !== currentPassword) {
    return { error: 'invalid_password' };
  }

  user.password = newPassword;
  return { success: true };
}

// Address management
const userAddresses = new Map(); // userId -> { billing, shipping }

export function getUserAddresses(userId) {
  return userAddresses.get(userId) || { billing: null, shipping: null };
}

export function updateUserAddresses(userId, addresses) {
  const user = users.get(userId);
  if (!user) return { error: 'user_not_found' };

  userAddresses.set(userId, {
    billing: addresses.billing || null,
    shipping: addresses.shipping || null,
    updatedAt: new Date().toISOString()
  });

  return { success: true, addresses: userAddresses.get(userId) };
}

// Subscription management
const userSubscriptions = new Map(); // userId -> array of subscriptions
let nextSubscriptionId = 1;

export function createSubscription(userId, subscriptionData) {
  const user = users.get(userId);
  if (!user) return { error: 'user_not_found' };

  const subscription = {
    id: String(nextSubscriptionId++),
    userId,
    packageName: subscriptionData.packageName,
    tier: subscriptionData.tier,
    category: subscriptionData.category,
    duration: subscriptionData.duration,
    price: subscriptionData.price,
    features: subscriptionData.features || [],
    status: 'active',
    startDate: new Date().toISOString(),
    nextBillingDate: calculateNextBillingDate(subscriptionData.duration),
    createdAt: new Date().toISOString()
  };

  const userSubs = userSubscriptions.get(userId) || [];
  userSubs.push(subscription);
  userSubscriptions.set(userId, userSubs);

  return { success: true, subscription };
}

export function getUserSubscriptions(userId, status = 'active') {
  const allSubs = userSubscriptions.get(userId) || [];
  if (status === 'all') return allSubs;
  return allSubs.filter(sub => sub.status === status);
}

export function cancelSubscription(userId, subscriptionId) {
  const userSubs = userSubscriptions.get(userId) || [];
  const sub = userSubs.find(s => s.id === subscriptionId);

  if (!sub) return { error: 'subscription_not_found' };

  sub.status = 'cancelled';
  sub.cancelledAt = new Date().toISOString();

  return { success: true, subscription: sub };
}

function calculateNextBillingDate(duration) {
  const now = new Date();
  if (duration === 'Monthly') {
    now.setMonth(now.getMonth() + 1);
  } else if (duration === '3 Months') {
    now.setMonth(now.getMonth() + 3);
  } else if (duration === '1 Year') {
    now.setFullYear(now.getFullYear() + 1);
  }
  return now.toISOString();
}
