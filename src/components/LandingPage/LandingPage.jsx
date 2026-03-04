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

const ConstructionHeroPanel = () => {
    const features = [
        { icon: <FileText size={22} />, label: 'Blueprint AI', desc: 'Auto-extract quantities from plans in minutes', stat: '10× faster', statLabel: 'than manual takeoffs' },
        { icon: <DollarSign size={22} />, label: 'Cash Flow Guardian', desc: 'Real-time budget & retention tracking per phase', stat: '99.2%', statLabel: 'forecast accuracy' },
        { icon: <ShieldCheck size={22} />, label: 'Site Security AI', desc: 'Computer vision monitoring, instant incident alerts', stat: '24/7', statLabel: 'live surveillance' },
        { icon: <Users size={22} />, label: 'Sub Matching', desc: 'AI-scored subcontractor sourcing by trade & capacity', stat: '3×', statLabel: 'faster procurement' },
    ];
    const projects = [
        { name: 'Westside Commercial', phase: 'Structural', budget: '$4.2M', progress: 68, status: 'On Track' },
        { name: 'Harbor View Tower', phase: 'Foundation', budget: '$8.7M', progress: 31, status: 'On Track' },
        { name: 'Midtown Renovation', phase: 'MEP Rough-In', budget: '$1.9M', progress: 82, status: 'At Risk' },
    ];
    return (
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute -inset-[1px] rounded-3xl z-0" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.3) 0%, rgba(245,158,11,0.2) 50%, rgba(255,107,0,0.08) 100%)' }} />
                <div className="absolute inset-[1px] rounded-3xl z-[1]" style={{ background: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} />
                <div className="relative z-10 p-7 md:p-9">
                    <div className="flex items-center justify-between mb-7">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.35)', color: '#FF6B00' }}><HardHat size={20} /></div>
                            <div><div className="text-[#1a1a1a] font-bold text-base leading-tight">Gasper Construction</div><div className="text-xs" style={{ color: '#6b7280' }}>AI Project Intelligence Platform</div></div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.20)' }}>
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF6B00' }} />
                            <span className="text-xs font-semibold" style={{ color: '#FF6B00' }}>Beta · Q2 2025</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid grid-cols-2 gap-3">
                            {features.map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08, duration: 0.6 }} className="group rounded-2xl p-4 transition-all duration-300" style={{ background: 'rgba(255,107,0,0.04)', border: '1px solid rgba(255,107,0,0.12)' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.30)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.12)'}>
                                    <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.12)', color: '#F59E0B' }}>{f.icon}</div>
                                    <div className="text-[#1a1a1a] font-semibold text-sm mb-0.5 leading-tight">{f.label}</div>
                                    <div className="text-xs leading-relaxed mb-3" style={{ color: '#6b7280' }}>{f.desc}</div>
                                    <div className="pt-2 border-t" style={{ borderColor: 'rgba(255,107,0,0.08)' }}><span className="text-sm font-black" style={{ color: '#F59E0B' }}>{f.stat}</span><span className="text-xs ml-1.5" style={{ color: '#6b7280' }}>{f.statLabel}</span></div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75, duration: 0.7 }} className="rounded-2xl p-5 flex flex-col" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                            <div className="flex items-center justify-between mb-4"><span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6b7280' }}>Live Projects</span><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>● 3 Active</span></div>
                            <div className="space-y-4 flex-1">
                                {projects.map((p, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}>
                                        <div className="flex items-start justify-between mb-1.5"><div><div className="text-[#1a1a1a] text-xs font-semibold">{p.name}</div><div className="text-xs" style={{ color: '#6b7280' }}>{p.phase} · {p.budget}</div></div><span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={p.status === 'At Risk' ? { background: 'rgba(239,68,68,0.12)', color: '#f87171' } : { background: 'rgba(16,185,129,0.10)', color: '#34d399' }}>{p.status}</span></div>
                                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}><motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ delay: 1.0 + i * 0.15, duration: 0.9, ease: 'easeOut' }} style={{ background: p.status === 'At Risk' ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #FF6B00, #F59E0B)' }} /></div>
                                        <div className="text-right text-[10px] mt-0.5" style={{ color: '#6b7280' }}>{p.progress}% complete</div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,107,0,0.08)' }}><span className="text-xs" style={{ color: '#4b5563' }}>Total managed</span><span className="text-sm font-black" style={{ color: '#F59E0B' }}>$14.8M</span></div>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                        {[{ value: '850+', label: 'Job Sites' }, { value: '10×', label: 'Faster Estimates' }, { value: '$5B+', label: 'Managed Value' }, { value: '99%', label: 'Safety Score' }].map((m, i) => (
                            <div key={i} className="text-center"><div className="text-xl font-black mb-0.5" style={{ background: 'linear-gradient(135deg, #1a1a1a 30%, #FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.value}</div><div className="text-[10px] uppercase tracking-wider" style={{ color: '#4b5563' }}>{m.label}</div></div>
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
    //  COMING-SOON MODE (unchanged)
    // ═══════════════════════════════════════════
    const heroWords = ['Gasper'];

    return (
        <div className="landing-container relative transition-colors duration-1000" style={{ backgroundColor: '#F5F5F5', color: '#1a1a1a' }}>
            <section className={`hero-section text-center items-center relative min-h-screen flex flex-col justify-center pt-20 pb-16 md:pb-40 w-full overflow-hidden coming-soon-hero`}>
                <div className="absolute inset-0 z-0" />
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0" animate={{ backgroundColor: themeColor, opacity: 0.04 }} transition={{ duration: 2 }} style={{ filter: 'blur(200px)', willChange: 'opacity' }} />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
                    <motion.div className="relative w-24 h-24 mx-auto mb-12" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                        <img src="/images/gasper-logo-g.png" alt="Gasper" className="relative z-10 w-full h-full object-contain" />
                    </motion.div>

                    <motion.div className="inline-flex items-center gap-2.5 mx-auto mb-10 px-5 py-2 rounded-full text-sm font-medium tracking-wide" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ border: '1px solid rgba(0,0,0,0.10)', background: 'rgba(0,0,0,0.04)', color: '#4b5563' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        Coming Soon — Public Beta
                    </motion.div>

                    <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 mx-auto text-center max-w-6xl overflow-hidden" style={{ letterSpacing: '-0.04em', lineHeight: 0.95, color: '#1a1a1a' }}>
                        {heroWords.map((word, i) => (
                            <KineticWord key={word} delay={0.3 + i * 0.12}>
                                {word}
                                <motion.span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #F59E0B)` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>.</motion.span>
                            </KineticWord>
                        ))}
                    </div>

                    <motion.p className="text-lg md:text-xl font-medium mb-6 tracking-wide" style={{ color: '#6b7280' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
                        AI-Powered Construction Management
                    </motion.p>

                    <motion.p className="text-lg md:text-xl text-center mx-auto max-w-2xl mb-10 leading-relaxed" style={{ color: '#6b7280' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
                        Blueprint Intelligence, Forecasting, Material Price Scanner, Site Security, and Custom LLM Integrations — one platform to command every job.
                    </motion.p>

                    <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-20 px-4 sm:px-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
                        <button className="cta-primary" onClick={() => { const el = document.getElementById('waitlist-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                            Join the Waitlist <ArrowRight size={16} />
                        </button>
                    </motion.div>

                    <ConstructionHeroPanel />
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
