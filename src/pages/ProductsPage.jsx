import React from 'react';
import LiquidEther from '../components/LiquidEther';

import { getOptimizedSettings } from '../utils/detectWindows';
export default function ProductsPage() {
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

      <div className="page-content products-content" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '80px', // Adjust based on header height
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        <div className="impex-tool-container" style={{
          width: '100%',
          maxWidth: '1200px',
          height: '85vh',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden', // Ensure iframe doesn't bleed out
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
          <iframe
            src="https://impex-tool-software.vercel.app/"
            title="Impex Tool"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
}
