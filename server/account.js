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

export default router;
