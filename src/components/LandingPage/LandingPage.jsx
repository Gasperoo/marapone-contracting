import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="landing-container">
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

                    {/* Abstract Visual Background Element */}
                    <div className="hero-visual"></div>
                </section>

                {/* Features Highlights */}
                <section className="features-section">
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
                </section>

                {/* Trust/Stats */}
                <section className="stats-section">
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
                </section>

            </div>
        </div>
    );
}
