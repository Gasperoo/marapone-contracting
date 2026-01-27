import React from 'react';
import LiquidEther from '../components/LiquidEther';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/page.css';

export default function AboutPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  const settings = getOptimizedSettings(isMobile);

  return (
    <div className="page-container">
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
      
      <div className="page-content">
        <h1 className="page-title">About Us</h1>
        <div className="page-section">
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
      </div>
    </div>
  );
}
