import React, { useEffect, useRef } from 'react';

export default function LiquidEther({ containerRef, options = {} }) {
  const liquidEtherRef = useRef(null);

  useEffect(() => {
    if (!containerRef?.current) return;

    // Load LiquidEther script if not already loaded
    if (typeof window.LiquidEther === 'undefined') {
      const script = document.createElement('script');
      script.src = '/LiquidEther-cdn.js';
      script.async = true;
      script.onload = () => {
        initializeLiquidEther();
      };
      script.onerror = () => {
        console.error('Failed to load LiquidEther-cdn.js');
      };
      document.body.appendChild(script);
    } else {
      initializeLiquidEther();
    }

    function initializeLiquidEther() {
      if (!containerRef?.current || typeof window.LiquidEther === 'undefined') {
        return;
      }

      try {
        const defaultOptions = {
          colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
          mouseForce: 20,
          cursorSize: 100,
          isViscous: true,
          viscous: 30,
          iterationsViscous: 32,
          iterationsPoisson: 32,
          resolution: 0.5,
          isBounce: false,
          autoDemo: true,
          autoSpeed: 0.5,
          autoIntensity: 2.2,
          takeoverDuration: 0.25,
          autoResumeDelay: 3000,
          autoRampDuration: 0.6,
          color0: "#5227FF",
          color1: "#FF9FFC",
          color2: "#B19EEF"
        };

        const liquidEther = new window.LiquidEther(containerRef.current, {
          ...defaultOptions,
          ...options
        });

        liquidEtherRef.current = liquidEther;
        window.liquidEther = liquidEther; // For debugging
      } catch (error) {
        console.error('LiquidEther: Initialization failed:', error);
      }
    }

    return () => {
      // Cleanup
      if (liquidEtherRef.current && typeof liquidEtherRef.current.destroy === 'function') {
        liquidEtherRef.current.destroy();
      }
    };
  }, [containerRef, options]);

  return null; // This component doesn't render anything itself
}
