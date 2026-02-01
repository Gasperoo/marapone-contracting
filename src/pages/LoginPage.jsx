import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';
import { getOptimizedSettings } from '../utils/detectWindows';
import { useAuth } from '../context/AuthContext';
import '../styles/page.css';
import '../styles/account.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
  const settings = getOptimizedSettings(isMobile);

  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(
        formData.usernameOrEmail.trim(),
        formData.password
      );
      // Redirect to previous page or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid username/email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={isMobile ? 18 : 24}
        cursorSize={isMobile ? 80 : 100}
        isViscous
        viscous={30}
        iterationsViscous={settings.iterationsViscous}
        iterationsPoisson={settings.iterationsPoisson}
        resolution={settings.resolution}
        isBounce={false}
        autoDemo
        autoSpeed={settings.autoSpeed}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
      <div className="page-content">
        <h1 className="page-title">Sign in</h1>
        <div className="account-form-wrapper">
          <form onSubmit={handleSubmit} className="account-form">
            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                placeholder="Username or email"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Your password"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing in…' : 'Log In'}
            </button>
            <p className="form-footer">
              Don&apos;t have an account? <Link to="/account">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
