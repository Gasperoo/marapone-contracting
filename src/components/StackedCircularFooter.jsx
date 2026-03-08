import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './ui/Icons';
import './StackedCircularFooter.css';

function StackedCircularFooter() {
    return (
        <footer className="compact-footer">
            <div className="compact-footer-container" style={{ justifyContent: 'center' }}>
                <div className="compact-footer-main" style={{ alignItems: 'center', textAlign: 'center' }}>

                    <nav className="compact-footer-nav" style={{ justifyContent: 'center', gap: '2.5rem', marginBottom: '1.5rem' }}>
                        <Link to="/terms-of-service" className="compact-footer-link" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Terms of Service</Link>
                        <Link to="/privacy-policy" className="compact-footer-link" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Privacy Policy</Link>
                        <Link to="/cookie-policy" className="compact-footer-link" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Cookie Policy</Link>
                    </nav>

                    <div className="compact-footer-copyright" style={{ marginTop: '0' }}>
                        <p>© 2026 Marapone Contracting Inc. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { StackedCircularFooter };
