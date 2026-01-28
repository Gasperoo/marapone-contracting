import React, { useState } from 'react';
import LiquidEther from '../components/LiquidEther';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedList from '../components/AnimatedList';
import ScheduleMeeting from '../components/ScheduleMeeting';
import Toast from '../components/Toast';
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
  const [toastMessage, setToastMessage] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Product details with 10 items each including prices (in USD)
  const productDetails = {
    'AI Solutions': [
      { name: 'Machine Learning Model Development', price: 15000 },
      { name: 'Natural Language Processing (NLP)', price: 12500 },
      { name: 'Computer Vision Systems', price: 18000 },
      { name: 'Predictive Analytics', price: 10000 },
      { name: 'AI Strategy Consulting', price: 8500 },
      { name: 'Custom AI Integration', price: 14000 },
      { name: 'Automated Decision Systems', price: 16500 },
      { name: 'Deep Learning Solutions', price: 20000 },
      { name: 'AI Performance Optimization', price: 9500 },
      { name: 'Ongoing AI Support & Training', price: 7500 }
    ],
    'Consulting': [
      { name: 'Business Strategy Development', price: 8500 },
      { name: 'Operational Efficiency Analysis', price: 7000 },
      { name: 'Market Research & Insights', price: 6500 },
      { name: 'Process Optimization', price: 7500 },
      { name: 'Change Management', price: 9000 },
      { name: 'Risk Assessment & Mitigation', price: 8000 },
      { name: 'Financial Planning & Analysis', price: 9500 },
      { name: 'Technology Consulting', price: 10000 },
      { name: 'Executive Coaching', price: 12000 },
      { name: 'Long-term Strategic Planning', price: 11000 }
    ],
    'Import/Export & Logistics': [
      { name: 'International Shipping Coordination', price: 5500 },
      { name: 'Customs Clearance Services', price: 3500 },
      { name: 'Supply Chain Optimization', price: 8500 },
      { name: 'Freight Forwarding', price: 4500 },
      { name: 'Warehouse Management', price: 6000 },
      { name: 'Documentation & Compliance', price: 3000 },
      { name: 'Route Planning & Optimization', price: 5000 },
      { name: 'Inventory Management', price: 5500 },
      { name: 'Last-Mile Delivery Solutions', price: 4000 },
      { name: 'Logistics Analytics & Reporting', price: 6500 }
    ],
    'Marketing Solutions': [
      { name: 'Digital Marketing Strategy', price: 7500 },
      { name: 'Social Media Management', price: 4500 },
      { name: 'Content Creation & Marketing', price: 5500 },
      { name: 'SEO & SEM Optimization', price: 6000 },
      { name: 'Brand Development', price: 9500 },
      { name: 'Email Marketing Campaigns', price: 3500 },
      { name: 'Performance Analytics', price: 5000 },
      { name: 'Influencer Partnerships', price: 8000 },
      { name: 'Conversion Rate Optimization', price: 6500 },
      { name: 'Marketing Automation', price: 7000 }
    ],
    'Project Development & Management': [
      { name: 'Project Planning & Scoping', price: 5500 },
      { name: 'Resource Allocation', price: 4500 },
      { name: 'Timeline & Milestone Management', price: 5000 },
      { name: 'Risk Management', price: 6000 },
      { name: 'Stakeholder Communication', price: 4000 },
      { name: 'Budget Management', price: 5500 },
      { name: 'Quality Assurance', price: 6500 },
      { name: 'Team Coordination', price: 4500 },
      { name: 'Progress Tracking & Reporting', price: 4000 },
      { name: 'Project Closure & Review', price: 3500 }
    ],
    'Business Development & Management': [
      { name: 'Strategic Partnership Development', price: 10000 },
      { name: 'Market Opportunity Analysis', price: 7500 },
      { name: 'Sales Strategy & Execution', price: 8500 },
      { name: 'Client Relationship Management', price: 6500 },
      { name: 'Business Model Innovation', price: 11000 },
      { name: 'Competitive Analysis', price: 6000 },
      { name: 'Growth Strategy Planning', price: 9500 },
      { name: 'Operational Systems Implementation', price: 12000 },
      { name: 'Performance Metrics & KPIs', price: 5500 },
      { name: 'Scalability Planning', price: 8000 }
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

  const handleAddToCart = (item) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingItemIndex !== -1) {
      // Item exists, increment quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // New item, add to cart with quantity 1
      existingCart.push({
        name: item.name,
        price: item.price,
        quantity: 1,
        category: selectedProduct
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Trigger storage event for other components to detect cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show toast notification
    setToastMessage(`"${item.name}" added to cart`);
  };

  const handleMeetingAddToCart = (meetingDetails) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    existingCart.push(meetingDetails);
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    setToastMessage(`"${meetingDetails.name}" added to cart`);
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

            {/* Schedule a Meeting Card - Full Width */}
            <div className="schedule-meeting-card-wrapper" onClick={() => setShowScheduleModal(true)}>
              <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.3)">
                <div className="schedule-meeting-card-content">
                  <span className="spotlight-card-icon schedule-icon">📅</span>
                  <div className="schedule-text">
                    <h2>Schedule a Meeting</h2>
                    <p>
                      Book a one-on-one consultation with our experts. Choose between 30-minute 
                      or 1-hour sessions at your convenience. Available Monday to Friday, 8:30 AM - 4:30 PM.
                    </p>
                    <div className="schedule-pricing">
                      <span className="price-option">30 min - $150</span>
                      <span className="price-divider">|</span>
                      <span className="price-option">1 hour - $250</span>
                    </div>
                  </div>
                </div>
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
                onItemSelect={(item, index) => console.log(`Selected: ${item.name}`)}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        )}
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <ScheduleMeeting
          onClose={() => setShowScheduleModal(false)}
          onAddToCart={handleMeetingAddToCart}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)}
          duration={3000}
        />
      )}
    </div>
  );
}
