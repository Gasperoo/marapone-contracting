import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TubelightNavbar } from './TubelightNavbar';
import { StackedCircularFooter } from './StackedCircularFooter';
import { Home, Zap, HelpCircle, Factory, CreditCard, Info, Mail, Brain } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Features', url: '/features', icon: Zap },
    { name: 'Mechanics', url: '/how-it-works', icon: HelpCircle },
    { name: 'Industries', url: '/industries', icon: Factory },
    { name: 'Pricing', url: '/pricing', icon: CreditCard },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Contact', url: '/contact', icon: Mail },
    { name: 'GasperAI', url: '/custom-llm', icon: Brain },
  ];

  const isGasperPage = location.pathname === '/gasper' || location.pathname.startsWith('/gasper/');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TubelightNavbar - Fixed overlay, hidden on Gasper Tool */}
      {!isGasperPage && (
        <TubelightNavbar
          items={navItems}
        />
      )}

      {/* Page content */}
      <div style={{ flex: 1 }}>
        {children}
      </div>

      {/* Footer */}
      {!isGasperPage && <StackedCircularFooter />}
    </div>
  );
}
