import React from 'react';
import LiquidEther from '../components/LiquidEther';
import CardStack from '../components/CardStack';
import RuixenAbout from '../components/RuixenAbout';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/page.css';
import '../styles/about.css';

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
      logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Ctext x="10" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="600" fill="%23E8DCC5"%3EClaude%3C/text%3E%3C/svg%3E'
    },
    {
      name: 'Searates',
      url: 'https://www.searates.com',
      logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Ctext x="10" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="600" fill="%2300A3E0"%3ESeaRates%3C/text%3E%3C/svg%3E'
    },
    {
      name: 'Freightos',
      url: 'https://www.freightos.com',
      logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Ctext x="10" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="600" fill="%2300D4AA"%3EFreightos%3C/text%3E%3C/svg%3E'
    },
    {
      name: 'Airrates',
      url: 'https://www.airrates.com',
      logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Ctext x="10" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="600" fill="%234A90E2"%3EAirrates%3C/text%3E%3C/svg%3E'
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
        <h1 className="page-title">About Marapone Contracting</h1>
        <p className="page-subtitle">
          Excellence in AI Solutions, Consulting, and Global Logistics
        </p>

        {/* CardStack Section */}
        <div className="card-swap-wrapper">
          <CardStack
            items={[
              {
                id: 1,
                title: '🚀 Who We Are',
                description: "We're your strategic partner for AI-powered solutions, international trade, and business growth. Operating across multiple continents, we blend cutting-edge tech with real-world expertise.",
                imageSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
              },
              {
                id: 2,
                title: '✨ Why Work With Us',
                description: 'Global reach with multi-continent operations. Innovation-first approach with cutting-edge tech. Partnership-focused for long-term success. Results-driven with measurable outcomes.',
                imageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
              },
              {
                id: 3,
                title: '🤝 Trusted Partners',
                description: 'We team up with the best in the business: Claude AI, Searates, Freightos, and Airrates to bring you world-class solutions.',
                imageSrc: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
                href: 'https://claude.ai',
              },
              {
                id: 4,
                title: '🎯 What We Offer',
                description: 'AI that actually works. Strategic consulting beyond PowerPoints. Global trade made easy. Marketing that converts. Everything integrates seamlessly.',
                imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
              },
            ]}
            cardWidth={isMobile ? 350 : 520}
            cardHeight={isMobile ? 400 : 320}
            maxVisible={7}
            overlap={0.48}
            spreadDeg={48}
            autoAdvance={true}
            intervalMs={4000}
            pauseOnHover={true}
            loop={true}
          />
        </div>

        {/* Ruixen About Section */}
        <RuixenAbout />
      </div>
    </div>
  );
}
