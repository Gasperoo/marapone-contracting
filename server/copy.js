/** User-facing copy for Account API — matches site tone. */

export const auth = {
  signUp: {
    success: 'Account created successfully!',
    usernameTaken: 'Username already taken.',
    emailRegistered: 'Email already registered.',
    termsRequired: 'Please agree to the terms and conditions.',
  },
  login: {
    success: 'Welcome back.',
    invalidCredentials: 'Invalid username/email or password.',
  },
  logout: { success: 'You have been logged out.' },
};

export const validation = {
  required: (field) => `${field} is required.`,
  invalidEmail: 'Please enter a valid email address.',
  passwordTooShort: 'Password must be at least 8 characters.',
  passwordsDoNotMatch: 'Passwords do not match!',
};

export const generic = {
  error: 'Something went wrong. Please try again.',
  unauthorized: 'Please log in to continue.',
};
