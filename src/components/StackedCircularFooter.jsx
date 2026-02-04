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
        <footer className="stacked-footer">
            <div className="stacked-footer-container">
                <div className="stacked-footer-content">
                    {/* Logo Circle */}
                    <div className="stacked-footer-logo-circle">
                        <Icons.logo />
                    </div>

                    {/* Navigation Links */}
                    <nav className="stacked-footer-nav">
                        <Link to="/" className="stacked-footer-link">Home</Link>
                        <Link to="/about" className="stacked-footer-link">About</Link>
                        <Link to="/services" className="stacked-footer-link">Packages</Link>
                        <Link to="/products" className="stacked-footer-link">Products</Link>
                        <Link to="/contact" className="stacked-footer-link">Contact</Link>
                    </nav>

                    {/* Social Icons */}
                    <div className="stacked-footer-social">
                        <Button
                            variant="outline"
                            size="icon"
                            className="stacked-footer-social-btn"
                            onClick={() => window.open('https://instagram.com', '_blank')}
                        >
                            <Icons.instagram className="stacked-footer-icon" />
                            <span className="sr-only">Instagram</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="stacked-footer-social-btn"
                            onClick={() => window.open('https://twitter.com', '_blank')}
                        >
                            <Icons.twitter className="stacked-footer-icon" />
                            <span className="sr-only">X (Twitter)</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="stacked-footer-social-btn"
                            onClick={() => window.open('https://facebook.com', '_blank')}
                        >
                            <Icons.facebook className="stacked-footer-icon" />
                            <span className="sr-only">Facebook</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="stacked-footer-social-btn"
                            onClick={() => window.open('https://github.com', '_blank')}
                        >
                            <Icons.github className="stacked-footer-icon" />
                            <span className="sr-only">GitHub</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="stacked-footer-social-btn"
                            onClick={() => window.open('https://wa.me', '_blank')}
                        >
                            <Icons.whatsapp className="stacked-footer-icon" />
                            <span className="sr-only">WhatsApp</span>
                        </Button>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="stacked-footer-newsletter">
                        <form onSubmit={handleSubscribe} className="stacked-footer-form">
                            <div className="stacked-footer-input-wrapper">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    className="stacked-footer-input"
                                    required
                                />
                            </div>
                            <Button type="submit" className="stacked-footer-submit">Subscribe</Button>
                        </form>
                    </div>

                    {/* Copyright */}
                    <div className="stacked-footer-copyright">
                        <p>© 2026 Marapone Contracting Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { StackedCircularFooter };
