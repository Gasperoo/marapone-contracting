import React from 'react';
import LiquidEtherBackground from '../components/LiquidEtherBackground';
import '../styles/homepage.css';

/**
 * Home Page Component
 * Features:
 * - Full-screen LiquidEther background
 * - Responsive design
 * - Optimized performance
 */
export default function HomePage() {
  return (
    <div className="homepage-container">
      {/* Full-screen LiquidEther Background */}
      <LiquidEtherBackground />

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

        {/* About Section */}
        <section className="about-section">
          <h2 className="about-title">About Us</h2>
          <div className="about-content">
            <p>
              Marapone Contracting Inc. is a trusted leader in the contracting industry,
              delivering exceptional results with precision and professionalism. With years
              of experience and a commitment to excellence, we bring your vision to life
              through quality craftsmanship and reliable service.
            </p>
            <p>
              Our team combines expertise with innovation, ensuring every project meets
              the highest standards. We take pride in building lasting relationships
              with our clients and delivering solutions that exceed expectations.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
