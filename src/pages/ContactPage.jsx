import React, { useState } from 'react';
import { motion } from 'motion/react';
import '../components/LandingPage/LandingPage.css'; // Shared theme
import '../styles/page.css';
import '../styles/contact.css';

export default function ContactPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

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
    // Handle form submission - you can add your own logic here
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="landing-container pt-24 pb-20 min-h-screen relative overflow-hidden bg-[#F5F5F5]">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF6B00]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F59E0B]/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="page-content relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">Get in Touch</h1>
          <p className="text-[#4b5563] text-lg max-w-2xl mx-auto">
            Ready to transform your logistics? Our team is here to help you navigate the future of supply chain management.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border border-black/5 rounded-2xl p-8 md:p-10 shadow-xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-[#4b5563]">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="uiverse-input w-full bg-[#F5F5F5] border border-black/10 rounded-lg px-4 py-3 text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#4b5563]">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="uiverse-input w-full bg-[#F5F5F5] border border-black/10 rounded-lg px-4 py-3 text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-[#4b5563]">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="uiverse-input w-full bg-[#F5F5F5] border border-black/10 rounded-lg px-4 py-3 text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                placeholder="Your company name (optional)"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-[#4b5563]">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="uiverse-input w-full bg-[#F5F5F5] border border-black/10 rounded-lg px-4 py-3 text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all resize-none"
                placeholder="Tell us about your project or inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6B00] hover:bg-[#F59E0B] text-white font-bold py-4 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-[#FF6B00]/20"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
