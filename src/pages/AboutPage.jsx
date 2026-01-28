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
            width={isMobile ? 350 : 800}
            height={isMobile ? 500 : 600}
            cardDistance={isMobile ? 60 : 100}
            verticalDistance={isMobile ? 70 : 100}
            delay={4000}
            pauseOnHover
            skewAmount={6}
            easing="elastic"
          >
            {/* Card 1: About Us */}
            <Card>
              <h2>🚀 Who We Are</h2>
              <p>
                We're your strategic partner for AI-powered solutions, international trade, and business growth. Think of us as the Swiss Army knife of modern business—versatile, reliable, and always ready to tackle your biggest challenges.
              </p>
              <p>
                🌍 Operating across multiple continents, we blend cutting-edge tech with real-world expertise to help businesses not just survive, but thrive. Whether you're a startup with big dreams or an enterprise looking to innovate, we've got your back.
              </p>
              <p>
                💡 Our secret sauce? We don't just deliver services—we build partnerships that actually move the needle on your growth.
              </p>
            </Card>

            {/* Card 2: Why Choose Us */}
            <Card>
              <h2>✨ Why Work With Us</h2>
              <div className="why-choose-grid">
                <div className="why-item">
                  <span className="why-emoji">🌐</span>
                  <div>
                    <h3>Global Reach</h3>
                    <p>Multi-continent operations with proven success stories</p>
                  </div>
                </div>
                <div className="why-item">
                  <span className="why-emoji">⚡</span>
                  <div>
                    <h3>Innovation First</h3>
                    <p>Cutting-edge tech that actually works for your business</p>
                  </div>
                </div>
                <div className="why-item">
                  <span className="why-emoji">🤝</span>
                  <div>
                    <h3>Partnership Focused</h3>
                    <p>We're in it for the long haul, not just quick wins</p>
                  </div>
                </div>
                <div className="why-item">
                  <span className="why-emoji">🎯</span>
                  <div>
                    <h3>Results Driven</h3>
                    <p>Measurable outcomes that move your bottom line</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3: Partners */}
            <Card>
              <h2>🤝 Trusted Partners</h2>
              <p>
                We team up with the best in the business to bring you world-class solutions. Click any logo to learn more about our partners!
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
              <p style={{ marginTop: '1.5rem', fontSize: '1rem', opacity: 0.85 }}>
                🔗 These partnerships mean you get access to cutting-edge tools and platforms without the hassle.
              </p>
            </Card>
          </CardSwap>
        </div>
      </div>
    </div>
  );
}
