import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid, Layers, Box, Truck, Anchor, HardHat, Ruler, Brain, FileText, Navigation, Hexagon, ChevronDown, DollarSign, Users, Clock, Ship, Database, Eye, Route, Package, BarChart3, Sparkles, CheckCircle2 } from 'lucide-react';
import './LandingPage.css';

import { LogoMarquee } from './LogoMarquee';
import { BentoGrid } from './BentoGrid';
import { LandingPageFAQ } from './LandingPageFAQ';

import LiveImpact from './LiveImpact';
import { PlatformPillarsSection, ConstructionFeaturesSection, BlueprintAISection, CashFlowSection, SiteSecuritySection } from './ConstructionShowcase';

import ComingSoonContent from './ComingSoonContent';
import { AuroraBackground } from '../ui/aurora-background';
import ComingSoonFooter from './ComingSoonFooter';
import ContactModal from '../ContactModal';

// ─────────────────────────────────────────────
//  COMING-SOON-ONLY COMPONENTS (unchanged)
// ─────────────────────────────────────────────

const KineticWord = ({ children, delay }) => (
    <motion.span
        className="inline-block mr-[0.3em]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.span>
);

const ScrollBeacon = () => (
    <div className="scroll-beacon">
        <div className="scroll-beacon__track">
            <div className="scroll-beacon__dot" />
        </div>
        <span className="scroll-beacon__label">Scroll</span>
    </div>
);

const BusinessIntegrationPanel = () => {
    const industries = [
        { icon: <HardHat size={22} />, label: 'Construction', color: '#FF6B00' },
        { icon: <Truck size={22} />, label: 'Logistics', color: '#0EA5E9' },
        { icon: <TrendingUp size={22} />, label: 'Marketing', color: '#F59E0B' },
        { icon: <Package size={22} />, label: 'E-Commerce', color: '#8B5CF6' },
    ];
    return (
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute -inset-[1px] rounded-3xl z-0" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.3) 0%, rgba(245,158,11,0.2) 50%, rgba(255,107,0,0.08) 100%)' }} />
                <div className="absolute inset-[1px] rounded-3xl z-[1]" style={{ background: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} />
                <div className="relative z-10 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#1a1a1a', border: '1px solid rgba(255,107,0,0.35)', color: '#FF6B00' }}><Layers size={20} /></div>
                            <div><div className="text-[#1a1a1a] font-bold text-base leading-tight">AI & Automation Integrations</div><div className="text-xs" style={{ color: '#6b7280' }}>Bespoke Solutions for Enterprise</div></div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.20)' }}>
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
                            <span className="text-xs font-semibold" style={{ color: '#10b981' }}>Systems Online</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {industries.map((ind, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08, duration: 0.6 }} className="group rounded-2xl p-4 transition-all duration-300 flex flex-col items-center text-center" style={{ background: `linear-gradient(180deg, ${ind.color}08 0%, rgba(0,0,0,0) 100%)`, border: `1px solid ${ind.color}25` }} onMouseEnter={e => e.currentTarget.style.borderColor = `${ind.color}60`} onMouseLeave={e => e.currentTarget.style.borderColor = `${ind.color}25`}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm" style={{ background: `${ind.color}15`, color: ind.color }}>{ind.icon}</div>
                                <div className="text-[#1a1a1a] font-bold text-sm tracking-wide">{ind.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────
//  ANIMATED COUNTER (for stats)
// ─────────────────────────────────────────────
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const startTime = performance.now();
                    const animate = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * numericValue));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [numericValue]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
};


// ─────────────────────────────────────────────
//  MAIN LANDING PAGE COMPONENT
// ─────────────────────────────────────────────
export default function LandingPage({ comingSoonMode = false }) {
    const [selectedProduct, setSelectedProduct] = useState(comingSoonMode ? 'construction' : null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const scrollToContent = () => {
        setTimeout(() => {
            const contentElement = document.getElementById('domain-content');
            if (contentElement) {
                const yOffset = -50;
                const y = contentElement.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 300);
    };

    const handleDomainSelect = (domain) => {
        setSelectedProduct(domain);
        if (!comingSoonMode) scrollToContent();
    };

    const themeColor = selectedProduct === 'construction' ? '#FF6B00' : '#0EA5E9';

    // ═══════════════════════════════════════════
    //  NON-COMING-SOON: FULL BALANCED HOMEPAGE
    // ═══════════════════════════════════════════
    if (!comingSoonMode) {
        const capabilities = [
            { icon: FileText, title: 'Blueprint AI', desc: 'Auto-extract quantities and materials from construction plans with generative AI.', color: '#FF6B00', domain: 'Construction' },
            { icon: Globe, title: 'Global Digital Twin', desc: 'Real-time visualization of your entire supply chain across every ocean and continent.', color: '#0EA5E9', domain: 'Logistics' },
            { icon: DollarSign, title: 'Cash Flow Guardian', desc: 'Predictive budget tracking, retention management, and cost-to-complete forecasting.', color: '#F59E0B', domain: 'Construction' },
            { icon: Route, title: 'Predictive Routing', desc: 'AI-optimized shipping routes factoring weather, geopolitics, and port congestion.', color: '#0EA5E9', domain: 'Logistics' },
            { icon: Eye, title: 'Site Security AI', desc: 'Computer vision surveillance with instant incident detection and alerts.', color: '#FF6B00', domain: 'Construction' },
            { icon: Brain, title: 'Custom LLM Engine', desc: 'Fine-tuned language models trained on construction and logistics corpora.', color: '#8B5CF6', domain: 'Both' },
        ];

        const constructionFeatures = [
            'Blueprint takeoff & quantity extraction',
            'Project scheduling & critical path AI',
            'Subcontractor matching & scoring',
            'Cash flow & retention tracking',
            'Site security computer vision',
        ];

        const logisticsFeatures = [
            'Real-time vessel & cargo tracking',
            'Automated customs compliance',
            'Predictive routing & ETA',
            'Geopolitical risk overlays',
            'Carrier performance analytics',
        ];

        return (
            <div className="landing-container pt-12 relative transition-colors duration-1000" style={{ backgroundColor: '#F5F5F5', color: '#1a1a1a' }}>

                {/* ── HERO ── */}
                <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center pt-24 pb-16 px-4 md:px-6 overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(14,165,233,0.04) 50%, transparent 70%)', filter: 'blur(80px)' }} />

                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium tracking-wide mb-10" style={{ border: '1px solid rgba(0,0,0,0.10)', background: 'rgba(0,0,0,0.04)', color: '#4b5563' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        AI-Powered Operations Intelligence
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 max-w-6xl" style={{ lineHeight: 0.95, color: '#1a1a1a' }}>
                        Intelligence{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FF6B00, #0EA5E9)' }}>
                            Engineered.
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: '#6b7280' }}>
                        One unified platform powering the world's most complex supply chains and extreme engineering projects with purpose-built AI.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center gap-4">
                        <Link to="/features" className="cta-primary">
                            Explore Platform <ArrowRight size={16} />
                        </Link>
                        <Link to="/contact" className="cta-outline">
                            Request Enterprise Demo
                        </Link>
                    </motion.div>
                </section>

                {/* ── DUAL DOMAIN SHOWCASE ── */}
                <section className="py-20 md:py-28 px-4 md:px-6 max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: '#FF6B00' }}>Two Specialized Engines</p>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-4">One Platform. Dual Power.</h2>
                        <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">Purpose-built AI for the industries that build and move the world.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Construction Card */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                            {/* Top gradient bar */}
                            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #FF6B00, #F59E0B)' }} />
                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.10)', border: '1px solid rgba(255,107,0,0.20)' }}>
                                        <HardHat className="w-7 h-7" style={{ color: '#FF6B00' }} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-[#1a1a1a]">Construction <span style={{ color: '#FF6B00' }}>AI</span></h3>
                                        <p className="text-sm" style={{ color: '#6b7280' }}>Build Smarter, Faster, Safer</p>
                                    </div>
                                </div>
                                <p className="text-[#4b5563] leading-relaxed mb-6">
                                    Generative structural design, AI-powered blueprint takeoffs, and predictive project management for the built environment.
                                </p>
                                <ul className="space-y-2.5 mb-8">
                                    {constructionFeatures.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-sm text-[#374151]">
                                            <CheckCircle2 size={16} style={{ color: '#FF6B00', flexShrink: 0 }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/gasper/construction" className="inline-flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all duration-300" style={{ color: '#FF6B00' }}>
                                    Launch Construction Engine <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Logistics Card */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)' }} />
                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.10)', border: '1px solid rgba(14,165,233,0.20)' }}>
                                        <Ship className="w-7 h-7" style={{ color: '#0EA5E9' }} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-[#1a1a1a]">Logistics <span style={{ color: '#0EA5E9' }}>OS</span></h3>
                                        <p className="text-sm" style={{ color: '#6b7280' }}>Ship Smarter, Move Faster</p>
                                    </div>
                                </div>
                                <p className="text-[#4b5563] leading-relaxed mb-6">
                                    The digital nervous system for global trade. Predictive tracking, geopolitical risk overlays, and automated customs compliance.
                                </p>
                                <ul className="space-y-2.5 mb-8">
                                    {logisticsFeatures.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-sm text-[#374151]">
                                            <CheckCircle2 size={16} style={{ color: '#0EA5E9', flexShrink: 0 }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/gasper" className="inline-flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all duration-300" style={{ color: '#0EA5E9' }}>
                                    Launch Logistics Engine <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── PLATFORM CAPABILITIES ── */}
                <section className="py-20 md:py-28 px-4 md:px-6 relative" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <div className="max-w-7xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: '#0EA5E9' }}>Core Infrastructure</p>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-4">Built for Enterprise Scale</h2>
                            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">Six core modules powering construction intelligence and supply chain optimization.</p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {capabilities.map((cap, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${cap.color}12`, border: `1px solid ${cap.color}25` }}>
                                        <cap.icon size={24} style={{ color: cap.color }} />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-[#1a1a1a]">{cap.title}</h3>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: cap.domain === 'Construction' ? 'rgba(255,107,0,0.08)' : cap.domain === 'Logistics' ? 'rgba(14,165,233,0.08)' : 'rgba(139,92,246,0.08)', color: cap.domain === 'Construction' ? '#FF6B00' : cap.domain === 'Logistics' ? '#0EA5E9' : '#8B5CF6' }}>
                                            {cap.domain}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#6b7280] leading-relaxed">{cap.desc}</p>
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `0 8px 30px ${cap.color}15` }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── STATS STRIP ── */}
                <section className="py-20 md:py-24 px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { value: '850', suffix: '+', label: 'Active Job Sites', desc: 'Managed globally' },
                                { value: '5', prefix: '$', suffix: 'B+', label: 'Portfolio Value', desc: 'Under management' },
                                { value: '10', suffix: '×', label: 'Faster Estimates', desc: 'vs. manual process' },
                                { value: '99', suffix: '%', label: 'Forecast Accuracy', desc: 'Cash flow predictions' },
                            ].map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="metric-card">
                                    <div className="metric-card__value">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                                    </div>
                                    <div className="metric-card__label">{stat.label}</div>
                                    <div className="metric-card__desc">{stat.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── LOGO MARQUEE ── */}
                <LogoMarquee />

                {/* ── HOW IT WORKS ── */}
                <section className="how-it-works-section relative py-20 md:py-28 z-10 px-4 md:px-6">
                    <div className="section-header">
                        <h2 className="section-title text-[#1a1a1a]">From Chaos to Control</h2>
                        <p className="section-subtitle text-lg text-[#6b7280]">A simple, powerful workflow designed for modern operations.</p>
                    </div>
                    <div className="workflow-steps">
                        <div className="step-line border-[#1a1a1a]/10" />
                        <div className="step-card group bg-white border border-[#1a1a1a]/10 shadow-sm">
                            <div className="step-number bg-[#FF6B00]/10 text-[#FF6B00]">01</div>
                            <h3 className="step-title text-[#1a1a1a]">Connect</h3>
                            <p className="step-desc text-[#6b7280]">Integrate your existing ERP, IoT, and carrier data streams in minutes.</p>
                        </div>
                        <div className="step-card group bg-white border border-[#1a1a1a]/10 shadow-sm">
                            <div className="step-number bg-[#F59E0B]/10 text-[#F59E0B]">02</div>
                            <h3 className="step-title text-[#1a1a1a]">Analyze</h3>
                            <p className="step-desc text-[#6b7280]">AI models process millions of data points to surface risks and opportunities.</p>
                        </div>
                        <div className="step-card group bg-white border border-[#1a1a1a]/10 shadow-sm">
                            <div className="step-number bg-[#0EA5E9]/10 text-[#0EA5E9]">03</div>
                            <h3 className="step-title text-[#1a1a1a]">Optimize</h3>
                            <p className="step-desc text-[#6b7280]">Execute automated strategies to reduce costs and improve delivery times.</p>
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <LandingPageFAQ />

                {/* ── CTA FOOTER ── */}
                <section className="relative py-28 md:py-36 px-4 md:px-6 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[#1a1a1a] -skew-y-2 origin-top-left -z-10" />
                    <div className="max-w-4xl mx-auto relative z-10 py-8 md:py-12">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Operations?</h2>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Join industry leaders leveraging Gasper AI to build faster, ship smarter, and operate with unprecedented intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/pricing" className="px-8 py-4 bg-[#FF6B00] hover:bg-[#F59E0B] text-white rounded-xl font-bold text-lg transition-colors shadow-lg" style={{ boxShadow: '0 10px 30px rgba(255,107,0,0.3)' }}>
                                View Pricing
                            </Link>
                            <button onClick={() => setIsContactModalOpen(true)} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-colors backdrop-blur-md">
                                Request Custom Demo
                            </button>
                        </div>
                    </div>
                </section>

                <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            </div>
        );
    }

    // ═══════════════════════════════════════════
    //  COMING-SOON MODE (Corporate B2B Redesign)
    // ═══════════════════════════════════════════
    return (
        <div className="landing-container relative transition-colors duration-1000 bg-[#FAFAFA] text-[#1a1a1a] font-sans">
            <section className="hero-section relative min-h-screen flex flex-col justify-center pt-24 pb-20 w-full overflow-hidden">
                {/* Refined Corporate Background */}
                <div className="absolute inset-0 z-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center]" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-[#FAFAFA] to-[#F5F5F5]" />

                {/* Subtle Glows */}
                <motion.div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none z-0" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">

                    {/* Marapone Logo & Badge */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center mb-8">
                        <div className="relative h-20 md:h-28 mb-10 group flex justify-center">
                            <motion.img
                                src="/logo.png"
                                alt="Marapone Logo"
                                className="w-auto h-full object-contain drop-shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Powered by</span>
                            <img src="/images/gasper-logo-g.png" alt="Gasper" className="w-5 h-5 object-contain" />
                            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">GasperAI</span>
                        </div>
                    </motion.div>

                    {/* Main Corporate Headline */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1a1a1a] leading-[1.05]">
                            Engineering the Future of <span className="relative inline-block"><span className="relative z-10">Enterprise AI</span><div className="absolute bottom-2 left-0 w-full h-3 bg-[#FF6B00]/20 -z-0 rounded-full" /></span>
                        </motion.h1>
                    </div>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        Marapone builds bespoke, fully sovereign AI integrations for structural industries. Zero subscriptions. Complete ownership.
                    </motion.p>

                    {/* Unified CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-8 py-4 bg-[#1a1a1a] hover:bg-black text-white rounded-xl font-bold text-base transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group" onClick={() => { const el = document.getElementById('waitlist-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                            Schedule an Evaluation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>

                    {/* Refined Integration Panel */}
                    <div className="w-full max-w-5xl mx-auto opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                        <BusinessIntegrationPanel />
                    </div>
                </div>

                {selectedProduct && <ScrollBeacon />}
            </section>

            <div id="domain-content" className="landing-content relative z-10" style={{ maxWidth: '100%', padding: 0 }}>
                {selectedProduct !== null && (
                    <AnimatePresence mode="wait">
                        <motion.div key={selectedProduct} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5 }}>
                            <div id="coming-soon-content">
                                <ComingSoonContent />
                                <ComingSoonFooter />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
    );
}
