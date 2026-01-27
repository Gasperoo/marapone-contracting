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
      logo: 'https://www.anthropic.com/images/icons/claude-logo.svg'
    },
    {
      name: 'Searates',
      url: 'https://www.searates.com',
      logo: 'https://www.searates.com/design/images/logo.svg'
    },
    {
      name: 'Airrates',
      url: 'https://www.airrates.com',
      logo: 'https://www.airrates.com/images/logo.svg'
    },
    {
      name: 'Freightos',
      url: 'https://www.freightos.com',
      logo: 'https://www.freightos.com/wp-content/themes/freightos/images/freightos-logo.svg'
    }
  ];

  const companyData = [
    {
      color: '#060010',
      title: 'Global Expertise',
      description: 'Operating across multiple continents with a proven track record in AI, consulting, logistics, and business development.',
      label: 'Our Reach'
    },
    {
      color: '#060010',
      title: 'Innovation First',
      description: 'Leveraging cutting-edge technology and forward-thinking strategies to deliver transformative solutions.',
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
      description: 'Building lasting partnerships through transparent communication, tailored solutions, and unwavering commitment to your success.',
      label: 'Our Promise'
    },
    {
      color: '#060010',
      title: 'Industry Leaders',
      description: 'Team of certified professionals with expertise spanning AI, logistics, marketing, and strategic management.',
      label: 'Our Team'
    },
    {
      color: '#060010',
      title: 'End-to-End Solutions',
      description: 'Comprehensive services from initial consultation to implementation, ensuring seamless execution and sustainable growth.',
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
