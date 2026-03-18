import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Server, Box, CheckCircle2, ShieldAlert } from 'lucide-react';
import '../components/LandingPage/LandingPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
        const response = await fetch('/api/send-contact-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || 'Failed to send message');
        }

        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', role: '', message: '' });
    } catch (err) {
        console.error('Submission error:', err);
        setError(err.message || 'Something went wrong. Please email us directly at general@marapone.com');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-container pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#0a0e1a]">

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FF6B00]/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side: Copy & Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-sm">
            <span className="text-xs font-bold tracking-widest text-white uppercase">Engineering Review</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            Request Architecture Evaluation
          </h1>

          <p className="text-gray-300 text-lg mb-12 leading-relaxed font-medium">
            Connect with our core engineering team. We do not offer standard demos. We conduct rigorous evaluations of your data infrastructure to determine readiness for a sovereign custom LLM deployment.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-[#1a1a1a] shrink-0">
                <Server size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Infrastructure Assessment</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">Evaluation of your current VPCs, on-prem hardware, and data lakes for localized inference readiness.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-[#8B5CF6] shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Security & Sovereignty Review</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">Mapping your compliance requirements (ITAR, HIPAA, GDPR) to our air-gapped system isolation protocols.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-[#FF6B00] shrink-0">
                <Box size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Proof of Concept Scoping</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">Identifying high-impact vertical use cases to test the deterministic accuracy of a locally fine-tuned model.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden"
        >
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B5CF6] via-[#1a1a1a] to-[#FF6B00]" />

          <h2 className="text-2xl font-bold text-white mb-8">Initiate Conversation</h2>

          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 border border-[#10B981]/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={40} className="text-[#10B981]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Transmission Successful</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
                    Your inquiry has been securely routed. Our engineering team will review your requirements and respond shortly.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-3 bg-white hover:bg-gray-100 text-black rounded-xl font-bold transition-colors shadow-sm"
                >
                    Send Another Message
                </button>
            </div>
          ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-sm font-medium flex items-start gap-3">
                    <ShieldAlert size={20} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold tracking-wider uppercase text-gray-500">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-wider uppercase text-gray-500">Corporate Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="john@enterprise.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="role" className="text-xs font-bold tracking-wider uppercase text-gray-500">Job Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="Director of Operations"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-bold tracking-wider uppercase text-gray-500">Organization</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="Company GmbH"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold tracking-wider uppercase text-gray-500">Evaluation Goals (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                placeholder="Briefly describe your use case or data environment..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-gray-100 text-black font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Transmitting...' : 'Submit Request'} 
              {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>

            <p className="text-xs text-center text-[#9ca3af] mt-4">
              By submitting, you agree to our strict enterprise non-disclosure policy.
            </p>
          </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}
