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
