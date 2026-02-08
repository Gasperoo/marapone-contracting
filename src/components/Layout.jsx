import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TubelightNavbar } from './TubelightNavbar';
import { useAuth } from '../context/AuthContext';
import { StackedCircularFooter } from './StackedCircularFooter';
import { Home, Zap, CreditCard, Info, Mail, User, LogOut, HelpCircle, Factory } from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Features', url: '/features', icon: Zap },
    { name: 'How it Works', url: '/how-it-works', icon: HelpCircle },
    { name: 'Industries', url: '/industries', icon: Factory },
    { name: 'Pricing', url: '/pricing', icon: CreditCard },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Contact', url: '/contact', icon: Mail },
    { name: 'Launch App', url: '/gasper', icon: Zap },
    isAuthenticated
      ? { name: 'Logout', url: '/login', icon: LogOut, onClick: handleLogout }
      : { name: 'Account', url: '/account', icon: User }
  ];

  const isGasperPage = location.pathname.startsWith('/gasper');

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
