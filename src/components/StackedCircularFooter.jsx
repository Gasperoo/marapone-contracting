import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, ShieldCheck } from 'lucide-react';
import './StackedCircularFooter.css';

const XIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Zm8.513-18.397A11.97 11.97 0 0 0 12.052 0C5.434 0 .046 5.385.045 12.003c0 2.115.551 4.182 1.599 6.007L0 24l6.15-1.611a11.96 11.96 0 0 0 5.901 1.551h.005c6.616 0 12.004-5.386 12.005-12.004a11.95 11.95 0 0 0-3.497-8.498Z"/>
  </svg>
);

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
            © {currentYear} Marapone Contracting Inc. All rights reserved.
            <br />
            © {currentYear} GasperAI. All rights reserved.
          </div>
          
          <div className="footer-socials">
            <a href="https://instagram.com/maraponehq" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://wa.me/message/SZZRHSTGUDJCL1" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
            <a href="#" className="social-link" aria-label="X">
              <XIcon size={18} />
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
