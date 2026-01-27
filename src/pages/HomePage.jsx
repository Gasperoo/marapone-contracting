import React from 'react';
import LiquidEther from '../components/LiquidEther';
import '../styles/homepage.css';

/**
 * Home Page Component
 * Features:
 * - Full-screen Three.js-based LiquidEther background
 * - Responsive design
 * - Optimized performance
 */
export default function HomePage() {
  // Detect mobile devices
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  return (
    <div className="homepage-container">
      {/* Full-screen Three.js LiquidEther Background */}
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={isMobile ? 18 : 24}
        cursorSize={isMobile ? 80 : 100}
        isViscous
        viscous={30}
        iterationsViscous={isMobile ? 24 : 32}
        iterationsPoisson={isMobile ? 24 : 32}
        resolution={isMobile ? 0.35 : 0.5}
        isBounce={false}
        autoDemo
        autoSpeed={isMobile ? 0.4 : 0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />

      {/* Main Content - Overlay on top of background */}
      <div className="homepage-content">
        {/* Logo Section */}
        <div className="logo-section">
          <img
            src="/logo.png"
            alt="Marapone Contracting Inc. Logo"
          />
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Marapone Contracting Inc.
          </h1>
          <p className="welcome-text">
            Delivering exceptional results with precision and professionalism.
            Your trusted partner in contracting excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
