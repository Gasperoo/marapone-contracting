import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid, Layers, Box, Truck, Anchor, HardHat, Ruler, Brain, FileText, Navigation, Hexagon, ChevronDown, DollarSign, Users, Clock } from 'lucide-react';
import './LandingPage.css';

import { LogoMarquee } from './LogoMarquee';
import { BentoGrid } from './BentoGrid';
import { LandingPageFAQ } from './LandingPageFAQ';

import LiveImpact from './LiveImpact';
// Construction Components
import { PlatformPillarsSection, ConstructionFeaturesSection, BlueprintAISection, CashFlowSection, SiteSecuritySection } from './ConstructionShowcase';

import ComingSoonContent from './ComingSoonContent';
import ComingSoonHeroBackground from './ComingSoonHeroBackground';
import ComingSoonFooter from './ComingSoonFooter';
import ContactModal from '../ContactModal';

// --- Kinetic Word Component ---
const KineticWord = ({ children, delay }) => (
    <motion.span
        className="inline-block mr-[0.3em]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            delay,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        }}
    >
        {children}
    </motion.span>
);

// --- Clean Executive Icon Container ---
const HexIcon = ({ Icon, color, active }) => (
    <div className="relative mb-8">
        {/* Subtle outer glow ring */}
        <div
            className="absolute inset-[-12px] rounded-2xl transition-all duration-700"
            style={{
                border: `1px solid ${active ? `${color}30` : `${color}08`}`,
                boxShadow: active ? `0 0 40px ${color}15` : 'none',
            }}
        />

        {/* Icon body */}
        <div
            className={`relative w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-700 ${active ? 'shadow-2xl' : ''}`}
            style={{
                backgroundColor: `${color}10`,
                color,
                border: `1px solid ${active ? `${color}40` : `${color}15`}`,
                boxShadow: active ? `0 0 40px ${color}25, inset 0 0 20px ${color}08` : `0 0 15px ${color}08`,
            }}
        >
            <Icon size={44} strokeWidth={1.5} />
        </div>
    </div>
);

// --- Executive Domain Card ---
const DomainCard = ({ title, description, icon: Icon, themeColor, secondaryColor, onClick, active, delay: enterDelay }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
        setMousePos({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const sc = secondaryColor || themeColor;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: enterDelay, ease: [0.16, 1, 0.3, 1] }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative w-full aspect-[3/4] max-w-lg mx-auto rounded-[2rem] ${active ? 'scale-[1.02]' : 'hover:scale-[1.01]'} transition-all duration-500 cursor-pointer overflow-hidden group`}
        >
            {/* Static gradient border */}
            <div
                className="absolute -inset-[1px] rounded-3xl z-0 transition-opacity duration-500"
                style={{
                    background: active
                        ? `linear-gradient(135deg, ${themeColor}, ${sc}, ${themeColor})`
                        : `linear-gradient(135deg, ${themeColor}30, ${sc}20, ${themeColor}30)`,
                    opacity: active ? 1 : 0.5,
                }}
            />

            {/* Card inner — glass surface */}
            <div
                className="absolute inset-[1px] rounded-3xl z-[1] transition-all duration-500"
                style={{
                    background: active
                        ? `radial-gradient(ellipse at center, ${themeColor}06 0%, rgba(4,2,16,0.96) 70%)`
                        : 'rgba(4, 2, 16, 0.94)',
                    backdropFilter: 'blur(20px)',
                }}
            />

            {/* Mouse-follow light */}
            <div
                className="absolute inset-0 rounded-3xl z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, 
                        ${themeColor}12 0%, 
                        transparent 50%)`,
                }}
            />

            {/* Content */}
            <div
                className="relative z-10 flex flex-col items-center justify-center p-10 h-full text-center"
                style={{ transform: "translateZ(40px)" }}
            >
                <HexIcon Icon={Icon} color={themeColor} active={active} />

                {/* Gradient title */}
                <h3
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{
                        transform: "translateZ(25px)",
                        background: `linear-gradient(135deg, #fff 30%, ${sc})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {title}
                </h3>

                <p
                    className="text-slate-400 text-lg leading-relaxed mb-auto"
                    style={{ transform: "translateZ(15px)" }}
                >
                    {description}
                </p>

                {/* CTA button */}
                <div
                    className={`mt-8 px-8 py-4 rounded-full border uppercase tracking-widest text-xs font-bold transition-all duration-500
                        ${active
                            ? 'text-white border-transparent'
                            : 'border-white/10 text-white/70 group-hover:text-white group-hover:border-white/20'
                        }`}
                    style={active ? {
                        background: `linear-gradient(135deg, ${themeColor}, ${sc})`,
                        boxShadow: `0 0 25px ${themeColor}40`,
                    } : {
                        background: 'rgba(255,255,255,0.03)',
                    }}
                >
                    {active ? '✦ Engine Active' : 'Select Engine →'}
                </div>
            </div>

            {/* Active highlight bar */}
            {active && (
                <motion.div
                    layoutId="active-domain-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${themeColor}, ${sc}, transparent)`,
                        boxShadow: `0 -6px 20px ${themeColor}60`,
                    }}
                />
            )}
        </motion.div>
    );
};

// --- Scroll Beacon ---
const ScrollBeacon = () => (
    <div className="scroll-beacon">
        <div className="scroll-beacon__track">
            <div className="scroll-beacon__dot" />
        </div>
        <span className="scroll-beacon__label">Scroll</span>
    </div>
);

// --- Construction Hero Panel (replaces dual domain cards in coming-soon mode) ---
const ConstructionHeroPanel = () => {
    const features = [
        {
            icon: <FileText size={22} />,
            label: 'Blueprint AI',
            desc: 'Auto-extract quantities from plans in minutes',
            stat: '10× faster',
            statLabel: 'than manual takeoffs',
        },
        {
            icon: <DollarSign size={22} />,
            label: 'Cash Flow Guardian',
            desc: 'Real-time budget & retention tracking per phase',
            stat: '99.2%',
            statLabel: 'forecast accuracy',
        },
        {
            icon: <ShieldCheck size={22} />,
            label: 'Site Security AI',
            desc: 'Computer vision monitoring, instant incident alerts',
            stat: '24/7',
            statLabel: 'live surveillance',
        },
        {
            icon: <Users size={22} />,
            label: 'Sub Matching',
            desc: 'AI-scored subcontractor sourcing by trade & capacity',
            stat: '3×',
            statLabel: 'faster procurement',
        },
    ];

    const projects = [
        { name: 'Westside Commercial', phase: 'Structural', budget: '$4.2M', progress: 68, status: 'On Track' },
        { name: 'Harbor View Tower', phase: 'Foundation', budget: '$8.7M', progress: 31, status: 'On Track' },
        { name: 'Midtown Renovation', phase: 'MEP Rough-In', budget: '$1.9M', progress: 82, status: 'At Risk' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto"
        >
            {/* Outer glow border */}
            <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute -inset-[1px] rounded-3xl z-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.3) 0%, rgba(245,158,11,0.2) 50%, rgba(255,107,0,0.08) 100%)' }} />
                <div className="absolute inset-[1px] rounded-3xl z-[1]"
                    style={{ background: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} />

                <div className="relative z-10 p-7 md:p-9">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-7">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.35)', color: '#FF6B00' }}>
                                <HardHat size={20} />
                            </div>
                            <div>
                                <div className="text-[#1a1a1a] font-bold text-base leading-tight">Gasper Construction</div>
                                <div className="text-xs" style={{ color: '#6b7280' }}>AI Project Intelligence Platform</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.20)' }}>
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF6B00' }} />
                            <span className="text-xs font-semibold" style={{ color: '#FF6B00' }}>Beta · Q2 2025</span>
                        </div>
                    </div>

                    {/* Two-column layout: Features + Live Dashboard */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Left: Feature grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + i * 0.08, duration: 0.6 }}
                                    className="group rounded-2xl p-4 transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,107,0,0.04)',
                                        border: '1px solid rgba(255,107,0,0.12)',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.30)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.12)'}
                                >
                                    <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center"
                                        style={{ background: 'rgba(255,107,0,0.12)', color: '#F59E0B' }}>
                                        {f.icon}
                                    </div>
                                    <div className="text-[#1a1a1a] font-semibold text-sm mb-0.5 leading-tight">{f.label}</div>
                                    <div className="text-xs leading-relaxed mb-3" style={{ color: '#6b7280' }}>{f.desc}</div>
                                    <div className="pt-2 border-t" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                                        <span className="text-sm font-black" style={{ color: '#F59E0B' }}>{f.stat}</span>
                                        <span className="text-xs ml-1.5" style={{ color: '#6b7280' }}>{f.statLabel}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right: Live project dashboard mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.75, duration: 0.7 }}
                            className="rounded-2xl p-5 flex flex-col"
                            style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6b7280' }}>Live Projects</span>
                                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                                    ● 3 Active
                                </span>
                            </div>
                            <div className="space-y-4 flex-1">
                                {projects.map((p, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                                    >
                                        <div className="flex items-start justify-between mb-1.5">
                                            <div>
                                                <div className="text-[#1a1a1a] text-xs font-semibold">{p.name}</div>
                                                <div className="text-xs" style={{ color: '#6b7280' }}>{p.phase} · {p.budget}</div>
                                            </div>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                                                style={p.status === 'At Risk'
                                                    ? { background: 'rgba(239,68,68,0.12)', color: '#f87171' }
                                                    : { background: 'rgba(16,185,129,0.10)', color: '#34d399' }}>
                                                {p.status}
                                            </span>
                                        </div>
                                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                                            <motion.div
                                                className="h-full rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${p.progress}%` }}
                                                transition={{ delay: 1.0 + i * 0.15, duration: 0.9, ease: 'easeOut' }}
                                                style={{ background: p.status === 'At Risk' ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #FF6B00, #F59E0B)' }}
                                            />
                                        </div>
                                        <div className="text-right text-[10px] mt-0.5" style={{ color: '#6b7280' }}>{p.progress}% complete</div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                                <span className="text-xs" style={{ color: '#4b5563' }}>Total managed</span>
                                <span className="text-sm font-black" style={{ color: '#F59E0B' }}>$14.8M</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom metrics strip */}
                    <div className="grid grid-cols-4 gap-4 mt-6 pt-5 border-t" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                        {[
                            { value: '850+', label: 'Job Sites' },
                            { value: '10×', label: 'Faster Estimates' },
                            { value: '$5B+', label: 'Managed Value' },
                            { value: '99%', label: 'Safety Score' },
                        ].map((m, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xl font-black mb-0.5"
                                    style={{ background: 'linear-gradient(135deg, #1a1a1a 30%, #FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {m.value}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider" style={{ color: '#4b5563' }}>{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div >
    );
};


export default function LandingPage({ comingSoonMode = false }) {
    // In comingSoon mode, auto-select construction so content shows immediately.
    const [selectedProduct, setSelectedProduct] = useState(comingSoonMode ? 'construction' : 'logistics');
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
        if (!comingSoonMode) {
            scrollToContent();
        }
    };

    // Derived theme colors for the background
    const themeColor = selectedProduct === 'construction' ? '#FF6B00' : selectedProduct === 'logistics' ? '#0EA5E9' : '#0EA5E9';

    // Kinetic title words
    const heroWords = comingSoonMode
        ? ['Gasper']
        : ['Select', 'Your', 'Domain'];

    return (
        <div className={`landing-container pt-12 relative transition-colors duration-1000`} style={comingSoonMode ? { backgroundColor: '#F5F5F5', color: '#1a1a1a' } : {}}>
            {/* Grand Entrance Hero Section */}
            <section className={`hero-section text-center items-center relative min-h-screen flex flex-col justify-center pt-20 pb-40 ${comingSoonMode ? 'coming-soon-hero' : ''}`}>
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <ComingSoonHeroBackground />
                </div>

                {/* Dynamic ambient glow for selected domain */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0"
                    animate={{
                        backgroundColor: themeColor,
                        opacity: selectedProduct ? 0.04 : 0.01,
                    }}
                    transition={{ duration: 2 }}
                    style={{ filter: 'blur(200px)', willChange: 'opacity' }}
                />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                    {/* Gasper G Logo — comingSoon only */}
                    {comingSoonMode && (
                        <motion.div
                            className="relative w-24 h-24 mx-auto mb-12"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Logo image — clean, no borders */}
                            <img
                                src="/images/gasper-logo-g.png"
                                alt="Gasper"
                                className="relative z-10 w-full h-full object-contain"
                            />
                        </motion.div>
                    )}

                    {/* Minimal badge */}
                    <motion.div
                        className="inline-flex items-center gap-2.5 mx-auto mb-10 px-5 py-2 rounded-full text-sm font-medium tracking-wide"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={comingSoonMode
                            ? { border: '1px solid rgba(0,0,0,0.10)', background: 'rgba(0,0,0,0.04)', color: '#4b5563' }
                            : { border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', color: '#94a3b8' }
                        }
                    >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: comingSoonMode ? '#FF6B00' : '#22d3ee', boxShadow: comingSoonMode ? '0 0 8px rgba(255,107,0,0.5)' : '0 0 8px rgba(34,211,238,0.6)' }} />
                        {comingSoonMode ? "Coming Soon — Public Beta" : "AI-Powered Operations Intelligence"}
                    </motion.div>

                    {/* Giant hero title — OpenSpace-scale */}
                    <div
                        className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 mx-auto text-center max-w-6xl overflow-hidden"
                        style={{ letterSpacing: '-0.04em', lineHeight: 0.95, color: comingSoonMode ? '#1a1a1a' : '#ffffff' }}
                    >
                        {heroWords.map((word, i) => (
                            <KineticWord key={word} delay={0.3 + i * 0.12}>
                                {word === 'Gasper' ? (
                                    <>
                                        {word}
                                        <motion.span
                                            className="text-transparent bg-clip-text"
                                            style={{
                                                backgroundImage: `linear-gradient(to right, ${themeColor}, ${selectedProduct === 'construction' ? '#F59E0B' : '#22d3ee'})`,
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            .
                                        </motion.span>
                                    </>
                                ) : word === 'Domain' ? (
                                    <span
                                        className="text-transparent bg-clip-text"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${themeColor}, ${selectedProduct === 'construction' ? '#F59E0B' : '#22d3ee'})`,
                                        }}
                                    >
                                        {word}
                                    </span>
                                ) : (
                                    word
                                )}
                            </KineticWord>
                        ))}
                    </div>

                    {/* Sub heading — bigger, more authoritative */}
                    {comingSoonMode && (
                        <motion.p
                            className="text-lg md:text-xl font-medium mb-6 tracking-wide"
                            style={{ color: '#6b7280' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            AI-Powered Construction Management
                        </motion.p>
                    )}

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl text-center mx-auto max-w-2xl mb-10 leading-relaxed"
                        style={{ color: comingSoonMode ? '#6b7280' : '#94a3b8' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        {comingSoonMode
                            ? 'AI-powered construction management. Blueprint intelligence, cash flow forecasting, site security — one platform to command every job site.'
                            : 'One unified intelligence platform. Two specialized engines. Choose your operational domain to see how Marapone transforms chaos into clarity.'
                        }
                    </motion.p>

                    {/* Dual CTA buttons — OpenSpace-style */}
                    {comingSoonMode && (
                        <motion.div
                            className="flex items-center justify-center gap-4 mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <button
                                className="cta-primary"
                                onClick={() => {
                                    const el = document.getElementById('waitlist-section');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Join the Waitlist <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    )}

                    {/* Domain Engine Cards — hidden in comingSoon mode, replaced by Construction Panel */}
                    {!comingSoonMode && (
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto perspective-1000">
                            <DomainCard
                                title="Gasper Logistics"
                                description="Global Digital Twin, Predictive Routing & Automated Compliance."
                                icon={Globe}
                                themeColor="#0EA5E9"
                                secondaryColor="#22d3ee"
                                active={selectedProduct === 'logistics'}
                                onClick={() => handleDomainSelect('logistics')}
                                delay={0.5}
                            />
                            <DomainCard
                                title="Gasper Construction"
                                description="Generative Blueprint AI, Critical Path & Site Security."
                                icon={HardHat}
                                themeColor="#FF6B00"
                                secondaryColor="#F59E0B"
                                active={selectedProduct === 'construction'}
                                onClick={() => handleDomainSelect('construction')}
                                delay={0.65}
                            />
                        </div>
                    )}

                    {/* Coming Soon — Construction Platform Showcase Panel */}
                    {comingSoonMode && <ConstructionHeroPanel />}
                </div>

                {/* Scroll Beacon */}
                {comingSoonMode && selectedProduct && <ScrollBeacon />}
            </section>

            {/* Content Below Fold based on Selection */}
            <div id="domain-content" className="landing-content relative z-10" style={comingSoonMode ? { maxWidth: '100%', padding: 0 } : {}}>
                {/* Prompt to select engine when none chosen */}
                {selectedProduct === null && (
                    <motion.div
                        className="text-center py-32 px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ChevronDown size={32} className="mx-auto mb-4 text-slate-600" />
                        </motion.div>
                        <p className="text-lg text-slate-500 font-medium tracking-wide">Select an engine above to explore</p>
                    </motion.div>
                )}

                {selectedProduct !== null && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedProduct}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Logo Marquee — hidden in comingSoon mode */}
                            {!comingSoonMode && <LogoMarquee />}

                            {comingSoonMode ? (
                                <div id="coming-soon-content">
                                    <ComingSoonContent />
                                    <ComingSoonFooter />
                                </div>
                            ) : (
                                <>
                                    {/* Logistics Content */}
                                    {selectedProduct === 'logistics' && (
                                        <>
                                            <BentoGrid />
                                            <LiveImpact />

                                            <section id="how-it-works" className="how-it-works-section relative py-32 z-10">
                                                <div className="section-header">
                                                    <h2 className="section-title">From Chaos to Control</h2>
                                                    <p className="section-subtitle text-lg">A simple, powerful workflow designed for modern logistics.</p>
                                                </div>

                                                <div className="workflow-steps">
                                                    <div className="step-line"></div>
                                                    <div className="step-card group">
                                                        <div className="step-number">01</div>
                                                        <h3 className="step-title">Connect</h3>
                                                        <p className="step-desc">Integrate your existing ERP and carrier data streams in minutes.</p>
                                                    </div>
                                                    <div className="step-card group">
                                                        <div className="step-number">02</div>
                                                        <h3 className="step-title">Analyze</h3>
                                                        <p className="step-desc">AI models process millions of data points to identify risks and opportunities.</p>
                                                    </div>
                                                    <div className="step-card group">
                                                        <div className="step-number">03</div>
                                                        <h3 className="step-title">Optimize</h3>
                                                        <p className="step-desc">Execute automated strategies to reduce costs and improve delivery times.</p>
                                                    </div>
                                                </div>
                                            </section>

                                            <motion.section
                                                id="industries"
                                                className="industries-section"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                <div className="section-header">
                                                    <h2 className="section-title">Engineered for Every Sector</h2>
                                                </div>
                                                <div className="industries-grid">
                                                    <div className="industry-card"><Anchor className="industry-icon" /><span>Maritime Logistics</span></div>
                                                    <div className="industry-card"><Truck className="industry-icon" /><span>Freight Forwarding</span></div>
                                                    <div className="industry-card"><Box className="industry-icon" /><span>Retail & E-commerce</span></div>
                                                    <div className="industry-card"><Layers className="industry-icon" /><span>Manufacturing</span></div>
                                                    <div className="industry-card"><Activity className="industry-icon" /><span>Cold Chain</span></div>
                                                    <div className="industry-card"><Globe className="industry-icon" /><span>Global Trade</span></div>
                                                </div>
                                            </motion.section>
                                        </>
                                    )}

                                    {/* Construction Content */}
                                    {selectedProduct === 'construction' && (
                                        <div className="construction-content-wrapper">
                                            <PlatformPillarsSection />
                                            <ConstructionFeaturesSection />
                                            <BlueprintAISection />
                                            <CashFlowSection />
                                            <SiteSecuritySection />
                                        </div>
                                    )}

                                    {/* Shared Sections */}
                                    <LandingPageFAQ />

                                    {/* Final CTA */}
                                    <section className="final-cta-section relative mt-20">
                                        <div className="absolute inset-0 z-0">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-20" style={{ background: `radial-gradient(circle at top, ${themeColor}, transparent)` }} />
                                        </div>
                                        <div className="final-cta-content relative z-20">
                                            <h2>Ready to Modernize Your Operations?</h2>
                                            <p>Join thousands of forward-thinking leaders today.</p>
                                            <button onClick={() => setIsContactModalOpen(true)} className="btn-primary mt-8 inline-block" style={{ backgroundColor: themeColor, borderColor: themeColor, color: '#fff' }}>
                                                Book a demo
                                            </button>
                                        </div>
                                    </section>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* Contact Modal Popup */}
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
    );
}
