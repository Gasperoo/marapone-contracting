import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form will submit to FormSubmit.co
      // The form action is set in the form element
      e.target.submit();
    }
  };

  return (
    <div className="container contact-container">
      <div className="contact-wrapper">
        {/* Contact Header */}
        <div className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
        </div>

        <div className="contact-content">
          <p className="contact-intro">
            Have a question or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          {/* Contact Form */}
          <form 
            className="contact-form" 
            id="contact-form" 
            action="https://formsubmit.co/general@marapone.com" 
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* FormSubmit configuration */}
            <input type="hidden" name="_subject" value="Contact Form Submission from Marapone Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="" />
            <input type="hidden" name="_template" value="box" />
            
            <div className="form-group">
              <label htmlFor="contact-name">Name *</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="contact-email">Email *</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            
            <button type="submit" className="contact-submit-button">
              <i className="fas fa-paper-plane"></i>
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="copyright-footer">
        <p>&copy; 2025 Marapone Contracting Inc.</p>
      </footer>
    </div>
  );
}
