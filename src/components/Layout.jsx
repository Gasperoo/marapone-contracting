import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GooeyNav from './GooeyNav';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Cart', href: '/cart' }
  ];

  // Determine active index based on current route
  const getActiveIndex = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/about') return 1;
    if (path === '/products') return 2;
    if (path === '/cart') return 3;
    return 0;
  };

  // Handle navigation with React Router
  const handleNavClick = (e, item) => {
    e.preventDefault();
    navigate(item.href);
  };

  // Create items with click handlers
  const navItems = items.map(item => ({
    ...item,
    onClick: (e) => handleNavClick(e, item)
  }));

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed navigation in top right */}
      <div className="nav-wrapper" style={{ height: '600px', position: 'relative' }}>
        <GooeyNav
          items={navItems}
          particleCount={9}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={getActiveIndex()}
          animationTime={600}
          timeVariance={200}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
