import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Icons } from './ui/Icons';
import './StackedCircularFooter.css';

function StackedCircularFooter() {
    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log('Newsletter subscription submitted');
    };

    return (
        <footer className="compact-footer">
            <div className="compact-footer-container">
                <div className="compact-footer-main">
                    <div className="compact-footer-brand">
                        <Icons.logo className="w-6 h-6" />
                        <span>Marapone Contracting Inc.</span>
                    </div>

                    <nav className="compact-footer-nav">
                        <Link to="/features" className="compact-footer-link">Sovereignty</Link>
                        <Link to="/pricing" className="compact-footer-link">Licensing</Link>
                        <Link to="/about" className="compact-footer-link">Architecture Team</Link>
                        <Link to="/contact" className="compact-footer-link">Inquiries</Link>
                        <Link to="/terms-of-service" className="compact-footer-link">MNDA</Link>
                        <Link to="/privacy-policy" className="compact-footer-link">Telemetry Policy</Link>
                        <Link to="/cookie-policy" className="compact-footer-link">Cookies</Link>
                    </nav>

                    <div className="compact-footer-copyright">
                        <p>© 2026 Marapone Contracting Inc. All Rights Reserved.</p>
                    </div>
                </div>

                <div className="compact-footer-newsletter">
                    <form onSubmit={handleSubscribe} className="compact-footer-form">
                        <Input
                            id="email"
                            placeholder="Engineering Newsletter"
                            type="email"
                            className="compact-footer-input"
                            required
                        />
                        <Button type="submit" className="compact-footer-submit">Join</Button>
                    </form>
                </div>
            </div>
        </footer>
    );
}

export { StackedCircularFooter };
