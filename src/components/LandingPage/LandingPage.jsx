import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid, Layers, Box, Truck, Anchor } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="landing-container pt-12">
            {/* Header / Nav Overlay removed - using global TubelightNavbar */}

            <div className="landing-content">

                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-label">
                        <Zap size={14} className="inline mr-2" />
                        Next Gen Supply Chain Intelligence
                    </div>

                    <h1 className="hero-title">
                        Command Your Logistics with <span>Gasper Tool</span>
                    </h1>

                    <p className="hero-subtitle">
                        The all-in-one AI platform for real-time tracking, compliance analysis, and digital twin simulation. Transform chaos into clarity.
                    </p>

                    <div className="cta-group">
                        <Link to="/gasper" className="btn-primary">
                            Launch Console <ArrowRight size={20} className="inline ml-2" />
                        </Link>
                        <Link to="/about" className="btn-secondary">
                            Learn More
                        </Link>
                    </div>

                    {/* Hero Visual Removed as requested */}
                </section>

                {/* Trusted By Section */}
                <section className="trusted-by-section">
                    <p className="trusted-label">Trusted by industry leaders worldwide</p>
                    <div className="logos-grid opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Company Names/Logos */}
                        <span className="text-xl font-bold font-mono">MAERSK</span>
                        <span className="text-xl font-bold font-mono">MSC</span>
                        <span className="text-xl font-bold font-mono">CMA CGM</span>
                        <span className="text-xl font-bold font-mono">HAPAG-LLOYD</span>
                        <span className="text-xl font-bold font-mono">EVERGREEN</span>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="how-it-works-section">
                    <div className="section-header">
                        <h2 className="section-title">From Chaos to Control</h2>
                        <p className="section-subtitle">A simple, powerful workflow designed for modern logistics.</p>
                    </div>

                    <div className="workflow-steps">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3 className="step-title">Connect</h3>
                            <p className="step-desc">Integrate your existing ERP and carrier data streams in minutes.</p>
                        </div>
                        <div className="step-line"></div>
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3 className="step-title">Analyze</h3>
                            <p className="step-desc">AI models process millions of data points to identify risks and opportunities.</p>
                        </div>
                        <div className="step-line"></div>
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3 className="step-title">Optimize</h3>
                            <p className="step-desc">Execute automated strategies to reduce costs and improve delivery times.</p>
                        </div>
                    </div>
                </section>

                {/* Features Highlights */}
                <motion.section
                    id="features"
                    className="features-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">Enterprise-Grade Capabilities</h2>
                        <p className="section-subtitle">Built for modern logistics teams who demand speed, accuracy, and depth.</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Activity size={32} />
                            </div>
                            <h3 className="feature-title">Real-Time Tracking</h3>
                            <p className="feature-desc">
                                Live monitoring of vessels, flights, and rail freight. Visualize your entire supply chain on an interactive 3D globe.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="feature-title">Digital Twin Simulation</h3>
                            <p className="feature-desc">
                                Simulate port strikes, tariff changes, and route disruptions to predict impacts on cost and delivery timelines.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="feature-title">Compliance & Risk</h3>
                            <p className="feature-desc">
                                Automated HS code classification, sanctions screening, and document generation powered by advanced AI models.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Grid size={32} />
                            </div>
                            <h3 className="feature-title">Market Intelligence</h3>
                            <p className="feature-desc">
                                Instant access to commodity prices, currency rates, and public holidays across key global markets.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Industries Section */}
                <motion.section
                    id="industries"
                    className="industries-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">Engineered for Every Sector</h2>
                    </div>
                    <div className="industries-grid">
                        <div className="industry-card">
                            <Anchor className="industry-icon" />
                            <span>Maritime Logistics</span>
                        </div>
                        <div className="industry-card">
                            <Truck className="industry-icon" />
                            <span>Freight Forwarding</span>
                        </div>
                        <div className="industry-card">
                            <Box className="industry-icon" />
                            <span>Retail & E-commerce</span>
                        </div>
                        <div className="industry-card">
                            <Layers className="industry-icon" />
                            <span>Manufacturing</span>
                        </div>
                    </div>
                </motion.section>

                {/* Trust/Stats */}
                <motion.section
                    className="stats-section"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="stat-item">
                        <div className="stat-value">200+</div>
                        <div className="stat-label">Countries Monitored</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">99.9%</div>
                        <div className="stat-label">Uptime Reliability</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">&lt;2s</div>
                        <div className="stat-label">Data Latency</div>
                    </div>
                </motion.section>

                {/* Final CTA */}
                <section className="final-cta-section">
                    <div className="final-cta-content">
                        <h2>Ready to Modernize Your Supply Chain?</h2>
                        <p>Join thousands of forward-thinking logistics leaders today.</p>
                        <Link to="/gasper" className="btn-primary mt-8 inline-block">
                            Get Started Now
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}
