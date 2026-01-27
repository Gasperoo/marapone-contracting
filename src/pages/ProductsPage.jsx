import React, { useState } from 'react';
import LiquidEther from '../components/LiquidEther';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedList from '../components/AnimatedList';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/page.css';
import '../styles/products.css';

export default function ProductsPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  const settings = getOptimizedSettings(isMobile);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product details with 10 items each
  const productDetails = {
    'AI Solutions': [
      'Machine Learning Model Development',
      'Natural Language Processing (NLP)',
      'Computer Vision Systems',
      'Predictive Analytics',
      'AI Strategy Consulting',
      'Custom AI Integration',
      'Automated Decision Systems',
      'Deep Learning Solutions',
      'AI Performance Optimization',
      'Ongoing AI Support & Training'
    ],
    'Consulting': [
      'Business Strategy Development',
      'Operational Efficiency Analysis',
      'Market Research & Insights',
      'Process Optimization',
      'Change Management',
      'Risk Assessment & Mitigation',
      'Financial Planning & Analysis',
      'Technology Consulting',
      'Executive Coaching',
      'Long-term Strategic Planning'
    ],
    'Import/Export & Logistics': [
      'International Shipping Coordination',
      'Customs Clearance Services',
      'Supply Chain Optimization',
      'Freight Forwarding',
      'Warehouse Management',
      'Documentation & Compliance',
      'Route Planning & Optimization',
      'Inventory Management',
      'Last-Mile Delivery Solutions',
      'Logistics Analytics & Reporting'
    ],
    'Marketing Solutions': [
      'Digital Marketing Strategy',
      'Social Media Management',
      'Content Creation & Marketing',
      'SEO & SEM Optimization',
      'Brand Development',
      'Email Marketing Campaigns',
      'Performance Analytics',
      'Influencer Partnerships',
      'Conversion Rate Optimization',
      'Marketing Automation'
    ],
    'Project Development & Management': [
      'Project Planning & Scoping',
      'Resource Allocation',
      'Timeline & Milestone Management',
      'Risk Management',
      'Stakeholder Communication',
      'Budget Management',
      'Quality Assurance',
      'Team Coordination',
      'Progress Tracking & Reporting',
      'Project Closure & Review'
    ],
    'Business Development & Management': [
      'Strategic Partnership Development',
      'Market Opportunity Analysis',
      'Sales Strategy & Execution',
      'Client Relationship Management',
      'Business Model Innovation',
      'Competitive Analysis',
      'Growth Strategy Planning',
      'Operational Systems Implementation',
      'Performance Metrics & KPIs',
      'Scalability Planning'
    ]
  };

  const handleCardClick = (productName) => {
    setSelectedProduct(productName);
  };

  const handleBackgroundClick = (e) => {
    // Only close if clicking the background, not the list
    if (e.target.classList.contains('products-detail-overlay')) {
      setSelectedProduct(null);
    }
  };

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
        
        {!selectedProduct ? (
          <div className="products-grid">
            <div onClick={() => handleCardClick('AI Solutions')}>
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
            </div>

            <div onClick={() => handleCardClick('Consulting')}>
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
            </div>

            <div onClick={() => handleCardClick('Import/Export & Logistics')}>
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
            </div>

            <div onClick={() => handleCardClick('Marketing Solutions')}>
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
            </div>

            <div onClick={() => handleCardClick('Project Development & Management')}>
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
            </div>

            <div onClick={() => handleCardClick('Business Development & Management')}>
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
        ) : (
          <div className="products-detail-overlay" onClick={handleBackgroundClick}>
            <div className="products-detail-content" onClick={(e) => e.stopPropagation()}>
              <button className="back-button" onClick={() => setSelectedProduct(null)}>
                ← Back to Products
              </button>
              <h2 className="detail-title">{selectedProduct}</h2>
              <AnimatedList
                items={productDetails[selectedProduct]}
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={false}
                onItemSelect={(item, index) => console.log(`Selected: ${item}`)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
