import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Server, Box, CheckCircle2, ShieldAlert, PhoneCall, ClipboardCheck, Lock } from 'lucide-react';

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
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FF6B00]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side: Copy & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-sm">
            <span className="text-xs font-bold tracking-widest text-[#FF6B00] uppercase">Direct Consultation</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            Stop Guessing. <br />Fix Your Ops.
          </h1>

          <p className="text-gray-300 text-lg mb-12 leading-relaxed font-medium">
            Marapone doesn't do generic demos. Marapone conducts direct operational audits to see if your data structure is ready for a private AI engine. Book a 15-30 minute discovery call to get started.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                <ClipboardCheck size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Operational Audit</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed font-medium">We'll review your current data silos—accounting, site logs, or manifests—to pinpoint exactly where AI can cut your costs.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Privacy & Ownership</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed font-medium">Everything we build is private. Your sensitive operational data never leaves your control during or after the build.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                <PhoneCall size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">No-BS Discovery Call</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed font-medium">A quick, direct conversation to determine if your project is a fit for our fixed-price ownership model.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden"
        >
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]" />

          <h2 className="text-2xl font-bold text-white mb-8">Schedule a Consultation</h2>

          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 border border-[#10B981]/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={40} className="text-[#10B981]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Received</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm font-medium">
                    Marapone will review your details and reach out within 24 hours to schedule our discovery call.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-3 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold transition-all shadow-sm"
                >
                    Send Another Inquiry
                </button>
            </div>
          ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-bold flex items-start gap-3">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-wider uppercase text-gray-500">Business Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="john@company.ca"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="role" className="text-xs font-bold tracking-wider uppercase text-gray-500">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="Project Manager / Ops Lead"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-bold tracking-wider uppercase text-gray-500">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="Enterprise Logistics Inc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold tracking-wider uppercase text-gray-500">How can Marapone help?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all resize-none font-medium"
                placeholder="Briefly describe your operational friction..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF6B00] hover:bg-[#ea580c] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Transmitting...' : 'Send Inquiry'} 
              {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>

            <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest mt-4">
              Direct consultation. No Sales Fluff.
            </p>
          </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}
