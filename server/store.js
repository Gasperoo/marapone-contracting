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
