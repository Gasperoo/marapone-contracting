import React from 'react';
import LiquidEther from '../components/LiquidEther';
import MagicBento from '../components/MagicBento';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/page.css';

export default function AboutPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  const settings = getOptimizedSettings(isMobile);

  const partners = [
    {
      name: 'Claude AI',
      url: 'https://claude.ai',
      logo: 'https://www-cdn.anthropic.com/images/4zrzovbb/website/9ad98d612086fe52b3042f9183414669b4d2a3da-2560x1280.png'
    },
    {
      name: 'Searates',
      url: 'https://www.searates.com',
      logo: 'https://www.searates.com/design/images/logo-new.svg'
    },
    {
      name: 'Freightos',
      url: 'https://www.freightos.com',
      logo: 'https://www.freightos.com/wp-content/uploads/2023/01/freightos-logo-white.svg'
    },
    {
      name: 'Airrates',
      url: 'https://www.airrates.com',
      logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50"%3E%3Ctext x="10" y="35" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white"%3EAirrates%3C/text%3E%3C/svg%3E'
    }
  ];

  const companyData = [
    {
      color: '#060010',
      title: 'Global Expertise',
      description: 'Multi-continent operations with proven success in AI, consulting, and logistics.',
      label: 'Our Reach'
    },
    {
      color: '#060010',
      title: 'Innovation First',
      description: 'Cutting-edge technology and forward-thinking strategies for transformative results.',
      label: 'Our Approach'
    },
    {
      color: '#060010',
      title: 'Trusted Partners',
      description: 'Collaborating with industry leaders to deliver cutting-edge solutions.',
      label: 'Our Network',
      isPartners: true,
      partners: partners
    },
    {
      color: '#060010',
      title: 'Client-Centric',
      description: 'Building lasting partnerships through transparent communication and tailored solutions.',
      label: 'Our Promise'
    },
    {
      color: '#060010',
      title: 'Industry Leaders',
      description: 'Certified professionals with expertise in AI, logistics, marketing, and management.',
      label: 'Our Team'
    },
    {
      color: '#060010',
      title: 'End-to-End Solutions',
      description: 'Comprehensive services from consultation to implementation for sustainable growth.',
      label: 'Full Service'
    }
  ];

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
        <h1 className="page-title">Why Choose Marapone</h1>
        <p className="page-subtitle">
          Transforming businesses through innovation, expertise, and unwavering commitment to excellence.
        </p>
        
        <MagicBento
          cardData={companyData}
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="82, 39, 255"
          disableAnimations={false}
        />
      </div>
    </div>
  );
}
