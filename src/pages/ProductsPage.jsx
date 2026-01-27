import React from 'react';
import LiquidEther from '../components/LiquidEther';
import SpotlightCard from '../components/SpotlightCard';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/page.css';
import '../styles/products.css';

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
      
      <div className="page-content products-content">
        <h1 className="page-title">Our Solutions</h1>
        
        <div className="products-grid">
          <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.3)">
            <span className="spotlight-card-icon">🤖</span>
            <h2>AI Solutions</h2>
            <p>
              Harness the power of artificial intelligence to transform your business operations. 
              We deliver cutting-edge AI implementations including machine learning models, natural 
              language processing, computer vision, and intelligent automation systems tailored to 
              your unique challenges and opportunities.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(255, 159, 252, 0.3)">
            <span className="spotlight-card-icon">💡</span>
            <h2>Consulting</h2>
            <p>
              Strategic guidance from industry experts to navigate complex business challenges. 
              Our consulting services provide actionable insights, comprehensive analysis, and 
              proven strategies to optimize operations, drive growth, and achieve sustainable 
              competitive advantages in your market.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(177, 158, 239, 0.3)">
            <span className="spotlight-card-icon">🌍</span>
            <h2>Import/Export & Logistics</h2>
            <p>
              Seamless global trade solutions with end-to-end logistics management. We handle 
              international shipping, customs clearance, supply chain optimization, and freight 
              forwarding to ensure your goods move efficiently across borders with full compliance 
              and minimal risk.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.3)">
            <span className="spotlight-card-icon">📈</span>
            <h2>Marketing Solutions</h2>
            <p>
              Data-driven marketing strategies that amplify your brand and drive measurable results. 
              From digital campaigns and content creation to SEO, social media management, and 
              performance analytics, we build comprehensive marketing ecosystems that connect you 
              with your target audience.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(255, 159, 252, 0.3)">
            <span className="spotlight-card-icon">🏗️</span>
            <h2>Project Development & Management</h2>
            <p>
              Expert project leadership from conception to completion. We deliver comprehensive 
              project management services including planning, resource allocation, risk management, 
              timeline coordination, and stakeholder communication to ensure your projects are 
              delivered on time, within budget, and exceeding expectations.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(177, 158, 239, 0.3)">
            <span className="spotlight-card-icon">💼</span>
            <h2>Business Development & Management</h2>
            <p>
              Strategic partnership and growth initiatives to scale your enterprise. Our business 
              development services identify new market opportunities, forge strategic alliances, 
              optimize operational efficiency, and implement management systems that drive 
              sustainable growth and long-term success.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
