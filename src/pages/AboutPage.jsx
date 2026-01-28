import React from 'react';
import LiquidEther from '../components/LiquidEther';
import CardSwap, { Card } from '../components/CardSwap';
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
        
        <div className="card-swap-wrapper">
          <CardSwap
            width={isMobile ? 320 : 600}
            height={isMobile ? 450 : 500}
            cardDistance={isMobile ? 50 : 70}
            verticalDistance={isMobile ? 60 : 70}
            delay={4000}
            pauseOnHover
            skewAmount={6}
            easing="elastic"
          >
            {/* Card 1: About Us */}
            <Card>
              <h2>About Us</h2>
              <p>
                Marapone Contracting is a global leader in delivering transformative solutions across AI, consulting, and international trade. With a presence spanning multiple continents, we combine cutting-edge technology with deep industry expertise to help businesses thrive in an ever-evolving marketplace.
              </p>
              <p>
                Our team of certified professionals brings decades of combined experience in artificial intelligence, logistics optimization, strategic consulting, and business development. We don't just provide services—we build lasting partnerships that drive sustainable growth and innovation.
              </p>
              <p>
                From small startups to Fortune 500 companies, we've helped organizations across industries unlock their full potential through data-driven strategies and innovative solutions.
              </p>
            </Card>

            {/* Card 2: Why Choose Us */}
            <Card>
              <h2>Why Choose Us</h2>
              <ul>
                <li>Global Expertise: Multi-continent operations with proven success in AI, consulting, and logistics</li>
                <li>Innovation First: Cutting-edge technology and forward-thinking strategies for transformative results</li>
                <li>Client-Centric: Building lasting partnerships through transparent communication and tailored solutions</li>
                <li>Industry Leaders: Certified professionals with expertise across all our service areas</li>
                <li>End-to-End Solutions: Comprehensive services from consultation to implementation</li>
                <li>Proven Track Record: Trusted by businesses worldwide to deliver measurable results</li>
              </ul>
            </Card>

            {/* Card 3: Partners */}
            <Card>
              <h2>Our Partners</h2>
              <p>
                We collaborate with industry-leading platforms and technologies to deliver cutting-edge solutions for our clients.
              </p>
              <div className="partners-grid">
                {partners.map((partner, index) => (
                  <a
                    key={index}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={partner.logo} alt={partner.name} />
                  </a>
                ))}
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', opacity: 0.8 }}>
                Through these strategic partnerships, we ensure our clients have access to the most advanced tools and platforms available in the industry.
              </p>
            </Card>
          </CardSwap>
        </div>
      </div>
    </div>
  );
}
