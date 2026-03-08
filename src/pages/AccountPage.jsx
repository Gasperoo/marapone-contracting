import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/page.css';

export default function AccountPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.terms) {
      setError('You must accept the Enterprise Service Agreement.');
      return;
    }
    setLoading(true);
    try {
      await register(
        formData.username.trim(),
        formData.email.trim(),
        formData.password,
        formData.terms
      );
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || err.data?.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container pt-32 pb-24 flex items-center justify-center min-h-screen relative overflow-hidden bg-[#1a1a1a] text-white">

      {/* Corporate Dashboard Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Structural Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#8B5CF6]/20 via-transparent to-[#FF6B00]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Side: Brand & Security */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <Lock size={14} className="text-[#10B981]" />
            <span className="text-xs font-bold tracking-widest text-[#10B981] uppercase">SECURE TUNNEL ACTIVE</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Enterprise<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#FF6B00]">Portal Access</span>
          </h1>

          <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
            Log in to monitor live telemetry, query your fully isolated sovereign language model, and manage API access tokens.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm font-medium text-white/70 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="text-[#8B5CF6] shrink-0" size={20} /> SOC2 Type II Certified Architecture
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-white/70 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="text-[#FF6B00] shrink-0" size={20} /> End-to-End Encryption (E2EE)
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative"
        >
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B5CF6] to-[#FF6B00] opacity-50" />

          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Enterprise Portal</h1>
            <p className="text-gray-400 text-sm">Secure Sovereign AI Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium text-center backdrop-blur-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-bold tracking-widest text-gray-500 uppercase">Admin ID</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#8B5CF6] transition-all placeholder:text-gray-600 focus:bg-black/60"
                placeholder="Enterprise Username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold tracking-widest text-gray-500 uppercase">Corporate Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#8B5CF6] transition-all placeholder:text-gray-600 focus:bg-black/60"
                placeholder="admin@enterprise.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-bold tracking-widest text-gray-500 uppercase">Passphrase</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#8B5CF6] transition-all placeholder:text-gray-600 focus:bg-black/60"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-xs font-bold tracking-widest text-gray-500 uppercase">Verify</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#8B5CF6] transition-all placeholder:text-gray-600 focus:bg-black/60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-white/10 bg-black/40 accent-[#8B5CF6] cursor-pointer"
                id="terms"
              />
              <label htmlFor="terms" className="text-sm text-gray-400 select-none cursor-pointer leading-relaxed">
                I acknowledge the <span className="text-white hover:text-[#8B5CF6] transition-colors">Enterprise Service Agreement</span> and <span className="text-white hover:text-[#8B5CF6] transition-colors">Sovereignty Policy</span>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-[#f3f4f6] text-[#1a1a1a] font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2 group mt-6"
            >
              {loading ? 'Authenticating...' : 'Provision Account'} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Existing deployment? <Link to="/login" className="text-white font-bold hover:text-[#8B5CF6] transition-colors">Authenticate</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
