import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', company: '', message: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Background Blobs inside modal */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#5227FF]/20 rounded-full blur-[80px]" />
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2">Book a Demo</h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Ready to transform your operations? Fill out the form below and we'll be in touch.
                        </p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1.5 text-left">
                                <label htmlFor="name" className="text-xs font-medium text-slate-300">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#5227FF] focus:bg-black/60 transition-all"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label htmlFor="email" className="text-xs font-medium text-slate-300">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#5227FF] focus:bg-black/60 transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label htmlFor="company" className="text-xs font-medium text-slate-300">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#5227FF] focus:bg-black/60 transition-all"
                                    placeholder="Your company name (optional)"
                                />
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label htmlFor="message" className="text-xs font-medium text-slate-300">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#5227FF] focus:bg-black/60 transition-all resize-none"
                                    placeholder="Tell us about your project or inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 bg-gradient-to-r from-[#5227FF] to-[#22d3ee] hover:from-[#4319cc] hover:to-[#1cb5d0] text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#5227FF]/20 text-sm"
                            >
                                Request Demo
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
