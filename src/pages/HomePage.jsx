import React from 'react';
import LiquidEther from '../components/LiquidEther';
import FeatureShaderCards from '../components/FeatureShaderCards';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/homepage.css';

/**
 * Home Page Component
 * Features:
 * - Full-screen Three.js-based LiquidEther background
 * - Responsive design
 * - Optimized performance for Windows Chrome
 */
export default function HomePage() {
  // Detect mobile devices
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  // Get optimized settings for platform
  const settings = getOptimizedSettings(isMobile);

  return (
    <div className="homepage-container">
      {/* Full-screen Three.js LiquidEther Background */}
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={isMobile ? 18 : 24}
        cursorSize={isMobile ? 80 : 100}
        isViscous
        viscous={30}
        iterationsViscous={settings.iterationsViscous}
        iterationsPoisson={settings.iterationsPoisson}
        resolution={settings.resolution}
        isBounce={false}
        autoDemo
        autoSpeed={settings.autoSpeed}
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
            Marapone
          </h1>
          <p className="welcome-text">
            Transforming vision into exceptional results - delivered with precision and professionalism.
          </p>
          <p className="welcome-subtext">
            Your strategic partner of choice in AI-powered solutions, international trade, logistics optimization, business development, marketing, consulting, and project excellence.
          </p>
        </div>

        {/* Feature Shader Cards */}
        <FeatureShaderCards />
      </div>
    </div>
  );
}
