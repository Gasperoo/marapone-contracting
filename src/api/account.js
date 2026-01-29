/** Account API client — register, login, logout. Token in localStorage. */

const API = '/api/account';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('accountToken') : null;
}

function setToken(token) {
  if (typeof window !== 'undefined' && token) localStorage.setItem('accountToken', token);
  else if (typeof window !== 'undefined') localStorage.removeItem('accountToken');
}

async function request(method, path, body, { token = getToken() } = {}) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) opts.headers.Authorization = `Bearer ${token}`;
  if (body && method !== 'GET') opts.body = JSON.stringify(body);
  const res = await fetch(`${API}${path}`, opts);
  const data = await res.json().catch(() => ({}));
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
  setToken,

  async register({ username, email, password, terms }) {
    const data = await request('POST', '/register', { username, email, password, terms });
    if (data.data?.token) setToken(data.data.token);
    return data;
  },

  async login({ usernameOrEmail, password }) {
    const data = await request('POST', '/login', { usernameOrEmail, password });
    if (data.data?.token) setToken(data.data.token);
    return data;
  },

  async logout() {
    await request('POST', '/logout', {}, {}).catch(() => {});
    setToken(null);
  },
};

export default accountApi;
