import React from 'react';
import { useNavigate } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const navigate = useNavigate();
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
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Settings Gear Icon - Only show when logged in */}
      {isAuthenticated && (
        <button
          onClick={() => navigate('/settings')}
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '6rem',
            zIndex: 10000,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: 'white',
            fontSize: '1.25rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(82, 39, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Account Settings"
        >
          ⚙️
        </button>
      )}

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
      />

      {/* Page content */}
      {children}
    </div>
  );
}
