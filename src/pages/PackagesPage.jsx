import React, { useState } from 'react';
import LiquidEther from '../components/LiquidEther';
import SpotlightCard from '../components/SpotlightCard';
import Toast from '../components/Toast';
import { getOptimizedSettings } from '../utils/detectWindows';
import '../styles/page.css';
import '../styles/packages.css';

export default function PackagesPage() {
  const isMobile = typeof window !== 'undefined' && (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );

  const settings = getOptimizedSettings(isMobile);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Package tiers for each service category
  const packageTiers = {
    'AI Solutions': {
      bronze: {
        name: 'AI Starter',
        priceMonthly: 50,
        priceOneTime: 500,
        pricingLabel: '$50/month or $500 one-time (1 year)',
        description: 'Perfect for businesses beginning their AI journey',
        features: [
          'Basic ML model implementation',
          'Data preprocessing & cleaning',
          'Model training & testing',
          'Performance metrics dashboard',
          '2 months support',
          'Documentation & training materials',
          'Up to 3 iterations',
          'Basic integration assistance'
        ]
      },
      silver: {
        name: 'AI Professional',
        priceMonthly: 125,
        priceOneTime: 1350,
        pricingLabel: '$125/month or $1,350 one-time (1 year)',
        description: 'Comprehensive AI solutions for growing enterprises',
        features: [
          'Advanced ML/DL implementation',
          'Custom NLP or Computer Vision',
          'API integration & deployment',
          'Real-time monitoring system',
          '6 months premium support',
          'Ongoing optimization',
          'Unlimited iterations',
          'Full technical documentation',
          'Team training sessions',
          'Cloud deployment setup'
        ]
      },
      gold: {
        name: 'AI Enterprise',
        priceMonthly: 299,
        priceOneTime: 2990,
        pricingLabel: '$299/month or $2,990 one-time (1 year)',
        description: 'End-to-end AI transformation for industry leaders',
        features: [
          'Everything in AI Professional',
          'Multi-model ensemble & orchestration (combining ML/DL/NLP/CV/LLMs/agents)',
          'Enterprise-grade security, compliance & governance (GDPR, HIPAA, SOC 2 support, audit trails, data sovereignty options)',
          'Scalable production infrastructure (auto-scaling, high-availability setup, multi-region/cloud hybrid deployment)',
          'Advanced MLOps pipeline (CI/CD for models, automated retraining, drift detection, A/B testing frameworks)',
          'Custom AI agents or autonomous workflows',
          'Priority dedicated account manager & senior AI architect access',
          '12 months premium support with SLA (e.g., <4-hour response for critical issues)',
          'Quarterly business reviews, ROI/performance audits & strategic AI roadmap consulting',
          'Unlimited iterations + proactive feature development',
          'White-label options & co-branded deliverables (if applicable)',
          'Integration with enterprise systems (ERP, CRM, legacy databases, real-time data streams)'
        ]
      }
    },
    'Consulting': {
      bronze: {
        name: 'Strategy Essentials',
        priceMonthly: null,
        priceOneTime: null,
        pricingLabel: 'Contact for pricing',
        description: 'Foundational consulting for immediate needs',
        features: [
          'Initial business assessment',
          'Strategy roadmap development',
          'Market analysis report',
          'Competitive landscape review',
          '4 consulting sessions',
          'Implementation guidelines',
          '30 days email support',
          'Final recommendations report'
        ]
      },
      silver: {
        name: 'Growth Accelerator',
        priceMonthly: null,
        priceOneTime: null,
        pricingLabel: 'Contact for pricing',
        description: 'Comprehensive consulting for sustainable growth',
        features: [
          'In-depth strategic analysis',
          'Custom growth strategy',
          'Operational optimization plan',
          'Change management framework',
          '12 consulting sessions',
          'Quarterly business reviews',
          '3 months support',
          'Executive presentations',
          'Risk mitigation strategies',
          'Performance tracking system'
        ]
      },
      gold: {
        name: 'Enterprise Transformation',
        priceMonthly: null,
        priceOneTime: null,
        pricingLabel: 'Contact for pricing',
        description: 'Complete business transformation partnership',
        features: [
          'Full enterprise assessment',
          'Multi-year strategic plan',
          'Digital transformation roadmap',
          'Organization restructuring plan',
          'Unlimited consulting sessions',
          'Dedicated senior consultant',
          '12 months partnership',
          'C-suite advisory services',
          'Implementation oversight',
          'Monthly board presentations',
          'Crisis management support',
          'Merger & acquisition guidance'
        ]
      }
    },
    'Import/Export & Logistics': {
      bronze: {
        name: 'Trade Starter',
        priceMonthly: 100,
        priceOneTime: 1000,
        pricingLabel: '$100/month or $1,000 one-time (1 year)',
        description: 'Essential services for new international traders',
        features: [
          'Customs documentation assistance',
          'Basic freight forwarding',
          'Import/export compliance check',
          'Shipping coordination (up to 5 shipments)',
          'Tariff classification help',
          'Basic tracking & reporting',
          '60 days support',
          'Standard delivery timeframes'
        ]
      },
      silver: {
        name: 'Logistics Pro',
        priceMonthly: 250,
        priceOneTime: 2500,
        pricingLabel: '$250/month or $2,500 one-time (1 year)',
        description: 'Advanced logistics management for regular traders',
        features: [
          'Full customs clearance services',
          'Multi-modal freight solutions',
          'Supply chain optimization',
          'Unlimited shipment coordination',
          'Warehouse management',
          'Route optimization',
          'Real-time tracking portal',
          '6 months support',
          'Priority customer service',
          'Quarterly logistics review'
        ]
      },
      gold: {
        name: 'Global Trade Elite',
        priceMonthly: 600,
        priceOneTime: 6500,
        pricingLabel: '$600/month or $6,500 one-time (1 year)',
        description: 'Premium end-to-end logistics solutions',
        features: [
          'Dedicated logistics manager',
          'Full supply chain integration',
          'Advanced analytics & forecasting',
          'White-glove customs handling',
          'Premium freight rates',
          'Last-mile delivery solutions',
          '24/7 support & monitoring',
          '12 months service',
          'Risk management & insurance',
          'Multi-country coordination',
          'Reverse logistics support',
          'Sustainability reporting'
        ]
      }
    },
    'Marketing Solutions': {
      bronze: {
        name: 'Digital Presence',
        priceMonthly: 50,
        priceOneTime: 120,
        pricingLabel: '$50/month or $120 for 3 months',
        description: 'Build your online presence and reach',
        features: [
          'Social media setup & strategy',
          'Content calendar (3 months)',
          '12 custom posts per month',
          'Basic SEO optimization',
          'Monthly performance reports',
          'Email marketing setup',
          'Brand guidelines document',
          '90 days support'
        ]
      },
      silver: {
        name: 'Growth Marketing',
        priceMonthly: 200,
        priceOneTime: 500,
        pricingLabel: '$200/month or $500 for 3 months',
        description: 'Comprehensive digital marketing for growth',
        features: [
          'Multi-channel marketing strategy',
          'Social media management (4 platforms)',
          '20 custom posts per month',
          'Advanced SEO & SEM',
          'Email marketing campaigns',
          'Content creation & copywriting',
          'Conversion rate optimization',
          'Bi-weekly strategy calls',
          '6 months engagement',
          'A/B testing & optimization',
          'Influencer outreach program'
        ]
      },
      gold: {
        name: 'Brand Domination',
        priceMonthly: 1000,
        priceOneTime: 1750,
        pricingLabel: '$1,000 for 3 months or $1,750 for 6 months',
        description: 'Full-scale marketing transformation',
        features: [
          'Comprehensive brand strategy',
          'Full-service marketing team',
          'All-channel campaign management',
          'Premium content production',
          'Video & multimedia marketing',
          'Marketing automation setup',
          'Advanced analytics & attribution',
          'Weekly strategy sessions',
          '12 months partnership',
          'Dedicated account manager',
          'PR & media relations',
          'Event marketing support',
          'Crisis communication plan'
        ]
      }
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('packages-tier-overlay')) {
      setSelectedCategory(null);
    }
  };

  const handleAddToCart = (packageData, tier, category, duration, price) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const cartItem = {
      name: `${packageData.name} - ${category}`,
      price: price,
      duration: duration,
      quantity: 1,
      category: 'Package',
      tier: tier,
      features: packageData.features
    };

    const existingItemIndex = existingCart.findIndex(
      item => item.name === cartItem.name && item.duration === duration
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));

    setToastMessage(`"${cartItem.name} (${duration})" added to cart`);
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'bronze': return 'rgba(205, 127, 50, 0.3)';
      case 'silver': return 'rgba(192, 192, 192, 0.3)';
      case 'gold': return 'rgba(255, 215, 0, 0.3)';
      default: return 'rgba(82, 39, 255, 0.3)';
    }
  };

  const getTierGradient = (tier) => {
    switch (tier) {
      case 'bronze': return 'linear-gradient(135deg, rgba(205, 127, 50, 0.2), rgba(139, 69, 19, 0.2))';
      case 'silver': return 'linear-gradient(135deg, rgba(192, 192, 192, 0.2), rgba(128, 128, 128, 0.2))';
      case 'gold': return 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(218, 165, 32, 0.2))';
      default: return 'linear-gradient(135deg, rgba(82, 39, 255, 0.2), rgba(177, 158, 239, 0.2))';
    }
  };

  const renderDurationButtons = (packageData, tier, category) => {
    const isMarketing = category === 'Marketing Solutions';
    const isConsulting = category === 'Consulting';
    const tierClass = tier.toLowerCase();

    // For consulting packages with no pricing
    if (isConsulting) {
      return (
        <button
          className={`add-to-cart-btn ${tierClass}-btn`}
          onClick={() => handleAddToCart(packageData, tier, category, 'Contact for pricing', 0)}
        >
          Contact for Pricing
        </button>
      );
    }

    // For marketing packages (3-month options)
    if (isMarketing) {
      return (
        <div className="duration-buttons">
          <button
            className={`duration-btn ${tierClass}-btn`}
            onClick={() => handleAddToCart(
              packageData,
              tier,
              category,
              packageData.priceMonthly ? 'Monthly' : '3 Months',
              packageData.priceMonthly || packageData.priceOneTime
            )}
          >
            {packageData.priceMonthly ? `Monthly - $${packageData.priceMonthly}` : `3 Months - $${packageData.priceOneTime}`}
          </button>
          {packageData.priceOneTime && packageData.priceMonthly && (
            <button
              className={`duration-btn ${tierClass}-btn`}
              onClick={() => handleAddToCart(packageData, tier, category, '3 Months', packageData.priceOneTime)}
            >
              3 Months - ${packageData.priceOneTime}
            </button>
          )}
        </div>
      );
    }

    // For AI Solutions and Logistics (monthly and 1-year options)
    return (
      <div className="duration-buttons">
        {packageData.priceMonthly && (
          <button
            className={`duration-btn ${tierClass}-btn`}
            onClick={() => handleAddToCart(packageData, tier, category, 'Monthly', packageData.priceMonthly)}
          >
            Monthly - ${packageData.priceMonthly}
          </button>
        )}
        {packageData.priceOneTime && (
          <button
            className={`duration-btn ${tierClass}-btn`}
            onClick={() => handleAddToCart(packageData, tier, category, '1 Year', packageData.priceOneTime)}
          >
            1 Year - ${packageData.priceOneTime}
          </button>
        )}
      </div>
    );
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

      <div className="page-content packages-content">
        <h1 className="page-title">Service Packages</h1>

        {!selectedCategory ? (
          <div className="products-grid">
            <div onClick={() => handleCategoryClick('AI Solutions')}>
              <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.3)">
                <span className="spotlight-card-icon">🤖</span>
                <h2>AI Solutions</h2>
                <p>
                  Choose from our tiered AI packages designed to fit your business needs and budget.
                  From starter implementations to enterprise-grade solutions with full support.
                </p>
              </SpotlightCard>
            </div>

            <div onClick={() => handleCategoryClick('Consulting')}>
              <SpotlightCard spotlightColor="rgba(255, 159, 252, 0.3)">
                <span className="spotlight-card-icon">💡</span>
                <h2>Consulting</h2>
                <p>
                  Strategic consulting packages tailored to your organization's size and objectives.
                  From essential guidance to full transformation partnerships.
                </p>
              </SpotlightCard>
            </div>

            <div onClick={() => handleCategoryClick('Import/Export & Logistics')}>
              <SpotlightCard spotlightColor="rgba(177, 158, 239, 0.3)">
                <span className="spotlight-card-icon">🌍</span>
                <h2>Import/Export & Logistics</h2>
                <p>
                  International trade and logistics packages for businesses of all sizes.
                  From starter documentation to premium global trade management.
                </p>
              </SpotlightCard>
            </div>

            <div onClick={() => handleCategoryClick('Marketing Solutions')}>
              <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.3)">
                <span className="spotlight-card-icon">📈</span>
                <h2>Marketing Solutions</h2>
                <p>
                  Comprehensive marketing packages to build and amplify your brand.
                  From digital presence to full-scale brand domination strategies.
                </p>
              </SpotlightCard>
            </div>
          </div>
        ) : (
          <div className="packages-tier-overlay" onClick={handleBackgroundClick}>
            <div className="packages-tier-content" onClick={(e) => e.stopPropagation()}>
              <button className="back-button" onClick={() => setSelectedCategory(null)}>
                ← Back to Packages
              </button>
              <h2 className="detail-title">{selectedCategory} Packages</h2>

              <div className="tier-grid">
                {/* Bronze Tier */}
                <div className="tier-card-wrapper">
                  <SpotlightCard spotlightColor={getTierColor('bronze')}>
                    <div className="tier-card bronze-tier" style={{ background: getTierGradient('bronze') }}>
                      <div className="tier-badge bronze">Tier 1</div>
                      <h3 className="tier-name">{packageTiers[selectedCategory].bronze.name}</h3>
                      <div className="tier-price">
                        {packageTiers[selectedCategory].bronze.pricingLabel}
                      </div>
                      <p className="tier-description">
                        {packageTiers[selectedCategory].bronze.description}
                      </p>
                      <div className="tier-features">
                        <h4>Includes:</h4>
                        <ul>
                          {packageTiers[selectedCategory].bronze.features.map((feature, idx) => (
                            <li key={idx}>✓ {feature}</li>
                          ))}
                        </ul>
                      </div>
                      {renderDurationButtons(
                        packageTiers[selectedCategory].bronze,
                        'Bronze',
                        selectedCategory
                      )}
                    </div>
                  </SpotlightCard>
                </div>

                {/* Silver Tier */}
                <div className="tier-card-wrapper">
                  <SpotlightCard spotlightColor={getTierColor('silver')}>
                    <div className="tier-card silver-tier" style={{ background: getTierGradient('silver') }}>
                      <div className="tier-badge silver">Tier 2</div>
                      <div className="popular-badge">Most Popular</div>
                      <h3 className="tier-name">{packageTiers[selectedCategory].silver.name}</h3>
                      <div className="tier-price">
                        {packageTiers[selectedCategory].silver.pricingLabel}
                      </div>
                      <p className="tier-description">
                        {packageTiers[selectedCategory].silver.description}
                      </p>
                      <div className="tier-features">
                        <h4>Includes:</h4>
                        <ul>
                          {packageTiers[selectedCategory].silver.features.map((feature, idx) => (
                            <li key={idx}>✓ {feature}</li>
                          ))}
                        </ul>
                      </div>
                      {renderDurationButtons(
                        packageTiers[selectedCategory].silver,
                        'Silver',
                        selectedCategory
                      )}
                    </div>
                  </SpotlightCard>
                </div>

                {/* Gold Tier */}
                <div className="tier-card-wrapper">
                  <SpotlightCard spotlightColor={getTierColor('gold')}>
                    <div className="tier-card gold-tier" style={{ background: getTierGradient('gold') }}>
                      <div className="tier-badge gold">Tier 3</div>
                      <h3 className="tier-name">{packageTiers[selectedCategory].gold.name}</h3>
                      <div className="tier-price">
                        {packageTiers[selectedCategory].gold.pricingLabel}
                      </div>
                      <p className="tier-description">
                        {packageTiers[selectedCategory].gold.description}
                      </p>
                      <div className="tier-features">
                        <h4>Includes:</h4>
                        <ul>
                          {packageTiers[selectedCategory].gold.features.map((feature, idx) => (
                            <li key={idx}>✓ {feature}</li>
                          ))}
                        </ul>
                      </div>
                      {renderDurationButtons(
                        packageTiers[selectedCategory].gold,
                        'Gold',
                        selectedCategory
                      )}
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
