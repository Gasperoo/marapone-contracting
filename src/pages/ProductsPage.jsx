import React from 'react';
import LiquidEther from '../components/LiquidEther';
import '../styles/page.css';

export default function ProductsPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  return (
    <div className="page-container">
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
      
      <div className="page-content">
        <h1 className="page-title">Products</h1>
        <div className="page-section">
          <p>
            Explore our range of professional contracting services and solutions.
          </p>
          <p>
            From residential to commercial projects, we offer comprehensive services
            tailored to meet your specific needs.
          </p>
        </div>
      </div>
    </div>
  );
}
