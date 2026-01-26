import React, { useEffect, useRef, useState } from 'react';

/**
 * Full-screen LiquidEther background component
 * Optimized for performance with lazy loading and cleanup
 */
export default function LiquidEtherBackground({ options = {} }) {
  const containerRef = useRef(null);
  const liquidEtherRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Default options optimized for full-screen background
    const defaultOptions = {
      colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
      mouseForce: 20,
      cursorSize: 100,
      isViscous: true,
      viscous: 30,
      iterationsViscous: 32,
      iterationsPoisson: 32,
      resolution: 0.5, // Lower resolution for better performance on full screen
      isBounce: false,
      autoDemo: true,
      autoSpeed: 0.5,
      autoIntensity: 2.2,
      takeoverDuration: 0.25,
      autoResumeDelay: 3000,
      autoRampDuration: 0.6,
      color0: "#5227FF",
      color1: "#FF9FFC",
      color2: "#B19EEF",
      ...options
    };

    // Load LiquidEther script if not already loaded
    if (typeof window.LiquidEther === 'undefined') {
      const script = document.createElement('script');
      script.src = '/LiquidEther-cdn.js';
      script.async = true;
      script.onload = () => {
        initializeLiquidEther(defaultOptions);
      };
      script.onerror = () => {
        console.error('Failed to load LiquidEther-cdn.js');
        setError('Failed to load animation');
      };
      document.body.appendChild(script);
    } else {
      initializeLiquidEther(defaultOptions);
    }

    function initializeLiquidEther(opts) {
      if (!containerRef.current || typeof window.LiquidEther === 'undefined') {
        return;
      }

      try {
        const liquidEther = new window.LiquidEther(containerRef.current, opts);
        liquidEtherRef.current = liquidEther;
        setIsLoaded(true);
        window.liquidEther = liquidEther; // For debugging
      } catch (err) {
        console.error('LiquidEther: Initialization failed:', err);
        setError('Animation initialization failed');
      }
    }

    // Cleanup function
    return () => {
      if (liquidEtherRef.current && typeof liquidEtherRef.current.destroy === 'function') {
        try {
          liquidEtherRef.current.destroy();
        } catch (e) {
          console.error('Error destroying LiquidEther:', e);
        }
      }
      liquidEtherRef.current = null;
    };
  }, [options]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in',
        pointerEvents: 'none', // Allow clicks to pass through
      }}
      aria-hidden="true"
    />
  );
}
