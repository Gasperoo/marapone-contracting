import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';

export default function HomePage() {
  const liquidEtherContainerRef = useRef(null);

  return (
    <>
      {/* Logo Section */}
      <div className="logo-section">
        <div ref={liquidEtherContainerRef} id="liquid-ether-container" className="liquid-ether-background"></div>
        <LiquidEther containerRef={liquidEtherContainerRef} />
        <div className="logo-container">
          <img src="/logo.png" alt="Marapone Contracting Inc. Logo" className="logo" />
        </div>
      </div>

      {/* About Us Section */}
      <section className="content-section about-section">
        <div className="section-divider"></div>
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <p className="section-text">
            Marapone Contracting Inc. is a trusted leader in the contracting industry, 
            delivering exceptional results with precision and professionalism. With years 
            of experience and a commitment to excellence, we bring your vision to life 
            through quality craftsmanship and reliable service.
          </p>
          <p className="section-text">
            Our team combines expertise with innovation, ensuring every project meets 
            the highest standards. We take pride in building lasting relationships 
            with our clients and delivering solutions that exceed expectations.
          </p>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="content-section services-section">
        <div className="section-divider"></div>
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <Link to="/service/consulting" className="service-card">
            <div className="service-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <h3 className="service-title">Consulting</h3>
            <p className="service-description">
              Expert business consulting services to help you make informed decisions and achieve your goals.
            </p>
          </Link>
          <Link to="/service/logistics" className="service-card">
            <div className="service-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3 className="service-title">Logistics</h3>
            <p className="service-description">
              Comprehensive logistics solutions for efficient supply chain management and distribution.
            </p>
          </Link>
          <Link to="/service/import-export" className="service-card">
            <div className="service-icon">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h3 className="service-title">Import/Export</h3>
            <p className="service-description">
              Streamlined import and export services to facilitate your international trade operations.
            </p>
          </Link>
          <Link to="/service/ecommerce" className="service-card">
            <div className="service-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h3 className="service-title">Ecommerce</h3>
            <p className="service-description">
              Complete ecommerce solutions to establish and grow your online business presence.
            </p>
          </Link>
          <Link to="/service/project-management" className="service-card">
            <div className="service-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3 className="service-title">Project Management</h3>
            <p className="service-description">
              Professional project management services to ensure timely and successful project delivery.
            </p>
          </Link>
          <Link to="/service/project-development" className="service-card">
            <div className="service-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h3 className="service-title">Project Development</h3>
            <p className="service-description">
              End-to-end project development services from concept to completion and beyond.
            </p>
          </Link>
          <Link to="/service/marketing" className="service-card">
            <div className="service-icon">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3 className="service-title">Marketing</h3>
            <p className="service-description">
              Strategic marketing solutions to enhance your brand visibility and drive business growth.
            </p>
          </Link>
          <Link to="/service/ai-solutions" className="service-card">
            <div className="service-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="service-title">AI Solutions</h3>
            <p className="service-description">
              Cutting-edge artificial intelligence solutions to automate processes and enhance efficiency.
            </p>
          </Link>
          <Link to="/service/business-development" className="service-card">
            <div className="service-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="service-title">Business Development</h3>
            <p className="service-description">
              Strategic business development services to expand your market reach and drive growth.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
