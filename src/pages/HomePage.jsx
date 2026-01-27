import React from 'react';
import LiquidEther from '../components/LiquidEther';
import DecryptedText from '../components/DecryptedText';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import '../styles/homepage.css';

/**
 * Home Page Component
 * Features:
 * - Full-screen Three.js-based LiquidEther background
 * - Responsive design
 * - Optimized performance
 */
export default function HomePage() {
  // Detect mobile devices
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  return (
    <div className="homepage-container">
      {/* Full-screen Three.js LiquidEther Background */}
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={isMobile ? 18 : 24}
        cursorSize={isMobile ? 80 : 100}
        isViscous
        viscous={30}
        iterationsViscous={isMobile ? 24 : 32}
        iterationsPoisson={isMobile ? 24 : 32}
        resolution={isMobile ? 0.35 : 0.5}
        isBounce={false}
        autoDemo
        autoSpeed={isMobile ? 0.4 : 0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />

      {/* Main Content - Overlay on top of background */}
      <div className="homepage-content">
        {/* Logo Section */}
        <div className="logo-section">
          <img
            src="/logo.png"
            alt="Marapone Contracting Inc. Logo"
          />
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Marapone Contracting Inc.
          </h1>
          <p className="welcome-text">
            <DecryptedText
              text="Transforming vision into exceptional results - delivered with precision and professionalism."
              animateOn="hover"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              speed={30}
              className="revealed"
              encryptedClassName="encrypted"
            />
          </p>
          <p className="welcome-subtext">
            <DecryptedText
              text="Your strategic partner of choice in AI-powered solutions, international trade, logistics optimization, business development, marketing, consulting, and project excellence."
              animateOn="hover"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              speed={25}
              className="revealed"
              encryptedClassName="encrypted"
            />
          </p>
        </div>

        {/* Services Scroll Stack */}
        <div className="services-scroll-section">
          <ScrollStack>
            <ScrollStackItem itemClassName="card-1">
              <div className="scroll-stack-card-icon">💼</div>
              <h2>Consulting</h2>
              <p>Strategic consulting services to optimize your business operations and drive sustainable growth.</p>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="card-2">
              <div className="scroll-stack-card-icon">🤖</div>
              <h2>AI Solutions</h2>
              <p>Cutting-edge AI-powered solutions to automate processes and unlock new opportunities.</p>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="card-3">
              <div className="scroll-stack-card-icon">🌐</div>
              <h2>Import/Export & Logistics</h2>
              <p>Comprehensive international trade and logistics optimization for seamless global operations.</p>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="card-4">
              <div className="scroll-stack-card-icon">📱</div>
              <h2>Marketing Solutions</h2>
              <p>Data-driven marketing strategies to amplify your brand and reach your target audience.</p>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="card-5">
              <div className="scroll-stack-card-icon">🚀</div>
              <h2>Project Development/Management</h2>
              <p>End-to-end project management ensuring on-time delivery and exceptional results.</p>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="card-6">
              <div className="scroll-stack-card-icon">📊</div>
              <h2>Business Development/Management</h2>
              <p>Strategic business development to identify opportunities and drive organizational excellence.</p>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="card-7">
              <div className="scroll-stack-card-content" onClick={() => window.location.href = '/contact'} style={{ cursor: 'pointer' }}>
                <div className="scroll-stack-card-icon">✉️</div>
                <h2>Contact Us</h2>
                <p>Get in touch with our team to discuss your project and discover how we can help.</p>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </div>
    </div>
  );
}
