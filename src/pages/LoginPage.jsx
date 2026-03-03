import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import '../components/LandingPage/LandingPage.css';
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
    <div className="landing-container pt-24 pb-20 flex items-center justify-center min-h-screen relative overflow-hidden bg-[#F5F5F5] text-[#1a1a1a]">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF6B00]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F59E0B]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="page-content w-full max-w-md relative z-50 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Welcome Back</h1>
          <p className="text-[#4b5563]">Sign in to access your dashboard</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uiverse-depth-card bg-white border border-black/5 rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="usernameOrEmail" className="text-sm font-medium text-[#4b5563]">Username or Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                className="uiverse-input w-full bg-[#F5F5F5] border border-black/10 rounded-lg px-4 py-3 text-[#1a1a1a] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all placeholder:text-[#9ca3af]"
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#4b5563]">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="uiverse-input w-full bg-[#F5F5F5] border border-black/10 rounded-lg px-4 py-3 text-[#1a1a1a] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all placeholder:text-[#9ca3af]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B00] hover:bg-[#F59E0B] text-white font-bold py-3 rounded-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF6B00]/20"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-center text-[#4b5563] text-sm">
              Don't have an account? <Link to="/account" className="text-[#FF6B00] hover:text-[#ea580c] transition-colors font-medium">Create one</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
