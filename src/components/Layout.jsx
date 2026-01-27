import React from 'react';
import StaggeredMenu from './StaggeredMenu';

export default function Layout({ children }) {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Products', ariaLabel: 'View our products', link: '/products' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
    { label: 'Cart', ariaLabel: 'View shopping cart', link: '/cart' },
    { label: 'Account', ariaLabel: 'Create an account', link: '/account' }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
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
