import React, { useState } from 'react';
import LiquidEther from '../components/LiquidEther';
import LogoLoop from '../components/LogoLoop';
import { getOptimizedSettings } from '../utils/detectWindows';
import { FaInstagram, FaXTwitter, FaFacebookF, FaWhatsapp, FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import '../styles/page.css';
import '../styles/contact.css';

export default function ContactPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  const settings = getOptimizedSettings(isMobile);

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

  const socialLogos = [
    { 
      node: <FaInstagram />, 
      title: "Instagram", 
      href: "https://instagram.com",
      ariaLabel: "Follow us on Instagram"
    },
    { 
      node: <FaXTwitter />, 
      title: "X (Twitter)", 
      href: "https://twitter.com",
      ariaLabel: "Follow us on X"
    },
    { 
      node: <FaFacebookF />, 
      title: "Facebook", 
      href: "https://facebook.com",
      ariaLabel: "Follow us on Facebook"
    },
    { 
      node: <FaWhatsapp />, 
      title: "WhatsApp", 
      href: "https://wa.me/",
      ariaLabel: "Message us on WhatsApp"
    },
    { 
      node: <FaLinkedinIn />, 
      title: "LinkedIn", 
      href: "https://linkedin.com",
      ariaLabel: "Connect on LinkedIn"
    },
    { 
      node: <FaGithub />, 
      title: "GitHub", 
      href: "https://github.com",
      ariaLabel: "View our GitHub"
    }
  ];

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
        <h1 className="page-title">Contact Us</h1>
        
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell us about your project or inquiry..."
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        <div className="social-logos-section">
          <h2 className="social-title">Connect With Us</h2>
          <div className="logoloop-container">
            <LogoLoop
              logos={socialLogos}
              speed={50}
              direction="left"
              logoHeight={48}
              gap={60}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="rgba(0, 0, 0, 0)"
              ariaLabel="Social media links"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
