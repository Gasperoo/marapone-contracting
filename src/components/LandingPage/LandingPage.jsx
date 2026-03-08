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
import Particles from '../Particles/Particles';

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
        {
            icon: <HardHat size={28} />,
            label: 'Construction',
            desc: 'Automate blueprint analysis & supply chain logistics.',
            color: '#FF6B00',
            bgGlow: 'rgba(255,107,0,0.15)'
        },
        {
            icon: <Truck size={28} />,
            label: 'Logistics',
            desc: 'Predictive routing and dynamic inventory forecasting.',
            color: '#0EA5E9',
            bgGlow: 'rgba(14,165,233,0.15)'
        },
        {
            icon: <TrendingUp size={28} />,
            label: 'Marketing',
            desc: 'Generative campaigns with hyper-targeted segmentation.',
            color: '#F59E0B',
            bgGlow: 'rgba(245,158,11,0.15)'
        },
        {
            icon: <Package size={28} />,
            label: 'E-Commerce',
            desc: 'Autonomous pricing agents and customer experience.',
            color: '#8B5CF6',
            bgGlow: 'rgba(139,92,246,0.15)'
        },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-5xl mx-auto mt-16 relative">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-r from-[#FF6B00]/10 via-[#8B5CF6]/10 to-[#0EA5E9]/10 blur-[80px] -z-10 pointer-events-none rounded-full" />

            <div className="relative rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* Header section with gradient border base */}
                <div className="px-8 py-8 md:px-12 md:py-10 border-b border-black/[0.04] relative overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/90 to-gray-50/50" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                                <div className="absolute inset-0 rounded-2xl border border-white/20 p-[1px]">
                                    <div className="w-full h-full rounded-[15px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                                </div>
                                <Layers size={28} className="text-[#FF6B00] filter drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] tracking-tight mb-1">
                                    Enterprise AI Integrations
                                </h2>
                                <p className="text-[15px] text-gray-500 font-medium tracking-wide">
                                    Bespoke autonomous systems across 4 primary sectors
                                </p>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-black/5 shadow-sm backdrop-blur-md self-start md:self-auto">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
                            </span>
                            <span className="text-[13px] font-bold text-[#10b981] uppercase tracking-wider">Systems Online</span>
                        </div>
                    </div>
                </div>

                {/* Grid Content */}
                <div className="p-8 md:p-12 relative bg-white/50">
                    <div className="absolute inset-0 bg-grid-slate-100/[0.4] bg-[bottom_1px_center] z-0" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {industries.map((ind, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + i * 0.1, duration: 0.7 }}
                                className="group relative rounded-[2rem] p-6 lg:p-8 transition-all duration-500 cursor-pointer overflow-hidden z-20 flex flex-col h-full bg-white/95 border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                            >
                                {/* Hover background effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 100%, ${ind.bgGlow}, transparent 70%)` }} />

                                <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-12 -translate-y-12 rounded-full opacity-0 blur-[30px] transition-all duration-700 group-hover:opacity-20 group-hover:scale-150" style={{ background: ind.color }} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm border border-white" style={{ background: `${ind.color}15`, color: ind.color, boxShadow: `0 8px 20px ${ind.bgGlow}` }}>
                                            {ind.icon}
                                        </div>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 border border-black/[0.04] text-gray-400 group-hover:bg-[#1a1a1a] group-hover:text-white group-hover:-rotate-45 transition-all duration-300 shadow-sm">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>

                                    <h3 className="text-[#1a1a1a] font-extrabold text-xl mb-3 transition-colors duration-300" style={{ '--hover-color': ind.color }} onMouseEnter={e => e.currentTarget.style.color = ind.color} onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
                                        {ind.label}
                                    </h3>
                                    <p className="text-[15px] font-medium leading-[1.7] text-gray-500 group-hover:text-gray-700 transition-colors">
                                        {ind.desc}
                                    </p>
                                </div>
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
    const [selectedProduct, setSelectedProduct] = useState('construction');
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // ═══════════════════════════════════════════
    //  Corporate B2B Redesign (Default Mode now)
    // ═══════════════════════════════════════════
    return (
        <div className="landing-container relative transition-colors duration-1000 bg-[#F5F5F5] text-[#1a1a1a] font-sans">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={["#FF6B00", "#F59E0B", "#1a1a1a"]}
                    particleCount={250}
                    speed={0.15}
                    sizeRandomness={2}
                />
            </div>

            <section className="hero-section relative min-h-screen flex flex-col justify-center pt-24 pb-20 w-full overflow-hidden z-10">
                {/* Refined Corporate Background */}
                <div className="absolute inset-0 z-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center]" />

                {/* Premium Black-to-White Header Gradient */}
                <div className="absolute top-0 inset-x-0 h-[450px] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.9) 20%, rgba(245,245,245,0) 100%)' }} />

                {/* Subtle Glows */}
                <motion.div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none z-0" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

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
                            Turning CHAOS <br />
                            Into <span className="relative inline-block"><span className="relative z-10">CLARITY.</span><div className="absolute bottom-2 left-0 w-full h-3 bg-[#FF6B00]/20 -z-0 rounded-full" /></span>
                        </motion.h1>
                    </div>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        Marapone builds bespoke, fully sovereign AI integrations for intensive industries. <strong className="text-[#1a1a1a]">ZERO</strong> subscriptions. <strong className="text-[#1a1a1a]">COMPLETE</strong> ownership.
                    </motion.p>

                    {/* Unified CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
                        <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-[#1a1a1a] hover:bg-black text-white rounded-xl font-bold text-base transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                            Schedule an Evaluation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
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
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
    );
}
