import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid, Layers, Box, Truck, Anchor } from 'lucide-react';
import './LandingPage.css';

import { LogoMarquee } from './LogoMarquee';
import { BentoGrid } from './BentoGrid';
import { LandingPageFAQ } from './LandingPageFAQ';

import LiveImpact from './LiveImpact';
import InteractiveGlobe from './InteractiveGlobe';
import ComingSoonContent from './ComingSoonContent';

export default function LandingPage({ comingSoonMode = false }) {
    return (
        <div className="landing-container pt-12">

            {/* Hero Section - Full Width */}
            <section className="hero-section text-center items-center relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
                {/* 3D Globe Background */}
                <div className="absolute inset-0 z-0">
                    <InteractiveGlobe />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <motion.div
                        className="hero-label inline-flex items-center gap-2 mx-auto"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Zap size={14} />
                        {comingSoonMode ? "Coming Soon to Public Beta" : "Next Gen Supply Chain Intelligence"}
                    </motion.div>

                    <motion.h1
                        className="hero-title mx-auto text-center max-w-5xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Command Your Logistics with <span className="whitespace-nowrap">Gasper</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle text-center mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        The all-in-one AI platform for real-time tracking, compliance analysis, and digital twin simulation. Transform chaos into clarity.
                    </motion.p>

                    {!comingSoonMode && (
                        <motion.div
                            className="cta-group justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link to="/gasper" className="btn-primary">
                                Launch Console <ArrowRight size={20} className="inline ml-2" />
                            </Link>
                            <Link to="/contact" className="btn-secondary">
                                Book Demo
                            </Link>
                        </motion.div>
                    )}

                    {comingSoonMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm max-w-md mx-auto"
                        >
                            <p className="text-slate-300 text-sm">
                                We are currently in private beta. <br />
                                Full public launch coming soon.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            <div className="landing-content">

                {/* Logo Marquee */}
                <LogoMarquee />

                {/* Bento Grid Features - Only if NOT coming soon */}
                {!comingSoonMode && <BentoGrid />}

                {/* Live Impact Console - Only if NOT coming soon */}
                {!comingSoonMode && <LiveImpact />}

                {/* How It Works Section */}
                {!comingSoonMode && (
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
                )}

                {/* Industries Section - Only if NOT coming soon */}
                {!comingSoonMode && (
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
                )}

                {/* Enhanced Coming Soon Content */}
                {comingSoonMode && <ComingSoonContent />}

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
