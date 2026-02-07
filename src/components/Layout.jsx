import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';
import { useAuth } from '../context/AuthContext';
import { StackedCircularFooter } from './StackedCircularFooter';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Products', ariaLabel: 'View our products', link: '/products' },
    { label: 'Packages', ariaLabel: 'View service packages', link: '/packages' },
    { label: 'Cart', ariaLabel: 'View shopping cart', link: '/cart' },
    // Conditional Account/Logout menu item
    isAuthenticated
      ? { label: 'Logout', ariaLabel: 'Logout from account', link: '/login', onClick: handleLogout }
      : { label: 'Account', ariaLabel: 'Create an account', link: '/account' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* StaggeredMenu - Fixed overlay */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        displaySocials={false}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF', '#FF9FFC']}
        accentColor="#5227FF"
        isFixed={true}
        closeOnClickAway={true}
        isAuthenticated={isAuthenticated}
      />

      {/* Page content */}
      <div style={{ flex: 1 }}>
        {children}
      </div>

      {/* Footer */}
      {location.pathname !== '/products' && <StackedCircularFooter />}
    </div>
  );
}
