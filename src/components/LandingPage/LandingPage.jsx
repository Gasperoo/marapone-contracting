import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid, Layers, Box, Truck, Anchor } from 'lucide-react';
import './LandingPage.css';

import { LogoMarquee } from './LogoMarquee';
import { BentoGrid } from './BentoGrid';
import { LandingPageTestimonials } from './LandingPageTestimonials';
import { LandingPageFAQ } from './LandingPageFAQ';

export default function LandingPage() {
    return (
        <div className="landing-container pt-12">
            {/* Header / Nav Overlay removed - using global TubelightNavbar */}

            <div className="landing-content">

                {/* Hero Section */}
                <section className="hero-section text-center items-center">
                    <div className="hero-label">
                        <Zap size={14} className="inline mr-2" />
                        Next Gen Supply Chain Intelligence
                    </div>

                    <h1 className="hero-title mx-auto text-center">
                        Command You Logistics with <span>Gasper Tool</span>
                    </h1>

                    <p className="hero-subtitle text-center mx-auto">
                        The all-in-one AI platform for real-time tracking, compliance analysis, and digital twin simulation. Transform chaos into clarity.
                    </p>

                    <div className="cta-group justify-center">
                        <Link to="/gasper" className="btn-primary">
                            Launch Console <ArrowRight size={20} className="inline ml-2" />
                        </Link>
                        <Link to="/about" className="btn-secondary">
                            Learn More
                        </Link>
                    </div>

                    {/* Dashboard Preview moved to Bento Grid area effectively */}
                </section>

                {/* Logo Marquee */}
                <LogoMarquee />

                {/* Bento Grid Features */}
                <BentoGrid />

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

                {/* Testimonials */}
                <LandingPageTestimonials />

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

                {/* FAQ Section */}
                <LandingPageFAQ />

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
