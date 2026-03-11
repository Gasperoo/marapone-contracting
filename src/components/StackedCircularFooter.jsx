import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';
import './StackedCircularFooter.css';

export function StackedCircularFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="premium-footer">
      <div className="premium-footer-glow"></div>
      
      <div className="premium-footer-container">
        <div className="premium-footer-grid">
          
          {/* Column 1: Brand & Info */}
          <div className="footer-col-brand">
            <Link to="/" className="footer-brand-link">
              <img src="/logo.png" alt="Marapone" className="footer-logo" />
              <span className="footer-brand-name">Marapone</span>
            </Link>
            <p className="footer-description">
              Turning chaos into clarity. Enterprise AI solutions for construction, logistics, and heavy industry operations.
            </p>
            <div className="footer-location pb-4">
              <MapPin size={16} className="text-[#FF6B00]" />
              <span>Headquarters: Canada & Italy</span>
            </div>
            <div className="footer-security">
              <ShieldCheck size={16} className="text-[#10B981]" />
              <span>SOC2 Type II Certified Architecture</span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="footer-col-links">
            <h4 className="footer-nav-title">Platform</h4>
            <ul className="footer-nav-list">
              <li><Link to="/features" className="footer-link">Core Features</Link></li>
              <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
              <li><Link to="/custom-llm" className="footer-link">GasperAI Engine</Link></li>
              <li><Link to="/industries" className="footer-link">Industries</Link></li>
              <li><Link to="/pricing" className="footer-link">Enterprise Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-col-links">
            <h4 className="footer-nav-title">Company</h4>
            <ul className="footer-nav-list">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Sales</Link></li>
              <li><a href="mailto:general@marapone.com" className="footer-link">Support</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="footer-col-links">
            <h4 className="footer-nav-title">Legal & Privacy</h4>
            <ul className="footer-nav-list">
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="footer-link">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="premium-footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Marapone. All rights reserved.
          </div>
          
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="mailto:general@marapone.com" className="social-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
