import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './ui/Icons';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import './StackedCircularFooter.css';

function StackedCircularFooter() {
    const handleSubscribe = (e) => {
        e.preventDefault();
        // Newsletter subscription logic can be added here
        console.log('Newsletter subscription submitted');
    };

    return (
        <footer className="compact-footer">
            <div className="compact-footer-container">
                <div className="compact-footer-main">
                    <div className="compact-footer-brand">
                        <Icons.logo />
                        <span>Marapone</span>
                    </div>

                    <nav className="compact-footer-nav">
                        <Link to="/features" className="compact-footer-link">Features</Link>
                        <Link to="/pricing" className="compact-footer-link">Pricing</Link>
                        <Link to="/about" className="compact-footer-link">About</Link>
                        <Link to="/contact" className="compact-footer-link">Contact</Link>
                        <Link to="/terms-of-service" className="compact-footer-link">Terms of Service</Link>
                        <Link to="/privacy-policy" className="compact-footer-link">Privacy Policy</Link>
                        <Link to="/cookie-policy" className="compact-footer-link">Cookie Policy</Link>
                    </nav>

                    <div className="compact-footer-copyright">
                        <p>© 2026 Marapone Contracting Inc.</p>
                    </div>
                </div>

                <div className="compact-footer-newsletter">
                    <form onSubmit={handleSubscribe} className="compact-footer-form">
                        <Input
                            id="email"
                            placeholder="Newsletter"
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
