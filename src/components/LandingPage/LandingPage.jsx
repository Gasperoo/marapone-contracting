import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid, Layers, Box, Truck, Anchor, HardHat, Ruler, Brain, FileText, Navigation, Hexagon, ChevronDown } from 'lucide-react';
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
        initial={{ opacity: 0, y: 50, rotateX: 40, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
        transition={{
            delay,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformStyle: 'preserve-3d' }}
    >
        {children}
    </motion.span>
);

// --- Hexagonal Wireframe Icon Container ---
const HexIcon = ({ Icon, color, active }) => (
    <div className="relative mb-8">
        {/* Outer spinning hex wireframe */}
        <motion.div
            className="absolute inset-[-20px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ opacity: active ? 0.5 : 0.15 }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                <polygon
                    points="50,2 93,25 93,75 50,98 7,75 7,25"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.8"
                    strokeDasharray="4 3"
                />
            </svg>
        </motion.div>

        {/* Inner counter-spinning hex */}
        <motion.div
            className="absolute inset-[-10px]"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ opacity: active ? 0.3 : 0.08 }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                    points="50,8 87,28 87,72 50,92 13,72 13,28"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                />
            </svg>
        </motion.div>

        {/* Pulse ring */}
        <motion.div
            className="absolute inset-[-8px] rounded-2xl"
            style={{ border: `1px solid ${color}`, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        />

        {/* Icon body */}
        <div
            className={`relative w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-700 ${active ? 'shadow-2xl' : ''}`}
            style={{
                backgroundColor: `${color}12`,
                color,
                border: `1px solid ${active ? `${color}50` : `${color}18`}`,
                boxShadow: active ? `0 0 50px ${color}40, inset 0 0 30px ${color}10` : `0 0 20px ${color}10`,
            }}
        >
            <Icon size={44} strokeWidth={1.5} />
        </div>
    </div>
);

// --- Holographic 3D Domain Card ---
const DomainCard = ({ title, description, icon: Icon, themeColor, secondaryColor, onClick, active, delay: enterDelay }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: enterDelay, ease: [0.16, 1, 0.3, 1] }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative w-full aspect-[4/5] max-w-md mx-auto rounded-3xl ${active ? 'scale-105' : 'hover:scale-[1.02]'} transition-all duration-500 cursor-pointer overflow-hidden group`}
        >
            {/* Iridescent animated border */}
            <div className="absolute -inset-[2px] rounded-3xl z-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: active
                            ? `conic-gradient(from 0deg, ${themeColor}, ${sc}, rgba(236,72,153,0.5), rgba(34,211,238,0.5), ${themeColor})`
                            : `conic-gradient(from 0deg, ${themeColor}40, ${sc}30, rgba(255,255,255,0.05), ${themeColor}40)`,
                        opacity: active ? 1 : 0.3,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: active ? 4 : 8, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Card inner — glass surface */}
            <div
                className="absolute inset-[2px] rounded-3xl z-[1]"
                style={{
                    background: active
                        ? `radial-gradient(ellipse at center, ${themeColor}08 0%, rgba(4,2,16,0.95) 70%)`
                        : 'rgba(4, 2, 16, 0.92)',
                    backdropFilter: 'blur(24px) saturate(1.2)',
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-[2px] rounded-3xl z-[1] opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Mouse-follow prismatic refraction */}
            <div
                className="absolute inset-0 rounded-3xl z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, 
                        ${themeColor}18 0%, 
                        ${sc}10 25%, 
                        rgba(236,72,153,0.05) 45%,
                        transparent 65%)`,
                }}
            />

            {/* Scan-line sweep */}
            <motion.div
                className="absolute inset-0 rounded-3xl z-[2] pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <motion.div
                    className="absolute w-full h-[1px] left-0"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${themeColor}50, ${sc}60, rgba(236,72,153,0.3), transparent)`,
                    }}
                    animate={{ top: ['-5%', '110%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>

            {/* Content */}
            <div
                className="relative z-10 flex flex-col items-center justify-center p-10 h-full text-center"
                style={{ transform: "translateZ(50px)" }}
            >
                <HexIcon Icon={Icon} color={themeColor} active={active} />

                {/* Gradient title */}
                <h3
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{
                        transform: "translateZ(30px)",
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
                <motion.div
                    className={`mt-8 px-8 py-4 rounded-full border transform uppercase tracking-widest text-xs font-bold transition-all duration-500 relative overflow-hidden
                        ${active
                            ? 'text-white border-transparent'
                            : 'border-white/10 text-white/70 group-hover:text-white group-hover:border-white/20'
                        }`}
                    style={active ? {
                        background: `linear-gradient(135deg, ${themeColor}, ${sc})`,
                        boxShadow: `0 0 30px ${themeColor}50`,
                    } : {
                        background: 'rgba(255,255,255,0.03)',
                    }}
                    whileHover={!active ? { scale: 1.05 } : {}}
                >
                    {/* Active CTA pulse wave */}
                    {active && (
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)` }}
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                    )}
                    <span className="relative z-10">
                        {active ? '✦ Engine Active' : 'Select Engine →'}
                    </span>
                </motion.div>
            </div>

            {/* Active highlight bar */}
            {active && (
                <motion.div
                    layoutId="active-domain-underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] z-20"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${themeColor}, ${sc}, transparent)`,
                        boxShadow: `0 -8px 30px ${themeColor}80`,
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

export default function LandingPage({ comingSoonMode = false }) {
    // In comingSoon mode, start with no engine selected so the user must pick.
    const [selectedProduct, setSelectedProduct] = useState(comingSoonMode ? null : 'logistics');
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
    const themeColor = selectedProduct === 'construction' ? '#FF6B00' : selectedProduct === 'logistics' ? '#5227FF' : '#5227FF';

    // Kinetic title words
    const heroWords = comingSoonMode
        ? ['Gasper']
        : ['Select', 'Your', 'Domain'];

    return (
        <div className="landing-container pt-12 relative transition-colors duration-1000">
            {/* Grand Entrance Hero Section */}
            <section className="hero-section text-center items-center relative min-h-screen flex flex-col justify-center pt-20 pb-32">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <ComingSoonHeroBackground />
                </div>

                {/* Dynamic ambient glow for selected domain */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none z-0"
                    animate={{
                        backgroundColor: themeColor,
                        opacity: selectedProduct ? 0.06 : 0.02,
                    }}
                    transition={{ duration: 1.5 }}
                    style={{ filter: 'blur(200px)' }}
                />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                    {/* Gasper G Logo — comingSoon only */}
                    {comingSoonMode && (
                        <motion.div
                            className="relative w-28 h-28 mx-auto mb-10"
                            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Outer ring */}
                            <motion.div
                                className="absolute -inset-5 rounded-full"
                                style={{
                                    border: `1px solid ${themeColor}25`,
                                    boxShadow: `0 0 50px ${themeColor}15`,
                                }}
                                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.08, 0.4] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            {/* Second ring */}
                            <motion.div
                                className="absolute -inset-10 rounded-full"
                                style={{ border: `1px solid ${themeColor}10` }}
                                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0, 0.2] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            />
                            {/* Inner glow */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{ background: `radial-gradient(circle, ${themeColor}25 0%, transparent 70%)` }}
                            />
                            {/* Logo image */}
                            <img
                                src="/images/gasper-logo-g.png"
                                alt="Gasper"
                                className="relative z-10 w-full h-full object-contain"
                                style={{ filter: `drop-shadow(0 0 30px ${themeColor}60)` }}
                            />
                        </motion.div>
                    )}

                    {/* Badge pill with scan light */}
                    <motion.div
                        className="hero-label inline-flex items-center gap-2 mx-auto mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Zap size={13} />
                        {comingSoonMode ? "Coming Soon to Public Beta" : "AI-Powered Operations Intelligence"}
                    </motion.div>

                    {/* Kinetic Title */}
                    <div
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-2 mx-auto text-center max-w-5xl overflow-hidden"
                        style={{ perspective: '600px' }}
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

                    {/* Sub heading */}
                    {comingSoonMode && (
                        <motion.p
                            className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Select Your Engine
                        </motion.p>
                    )}

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl text-slate-400 text-center mx-auto max-w-3xl mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        {comingSoonMode
                            ? 'One platform. Two AI engines. Choose your domain to explore how Gasper transforms operations into intelligence.'
                            : 'One unified intelligence platform. Two specialized engines. Choose your operational domain to see how Marapone transforms chaos into clarity.'
                        }
                    </motion.p>

                    {/* Holographic 3D Domain Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12 perspective-1000">
                        <DomainCard
                            title="Gasper Logistics"
                            description="Global Digital Twin, Predictive Routing & Automated Compliance."
                            icon={Globe}
                            themeColor="#5227FF"
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
                                    <ComingSoonContent selectedProduct={selectedProduct} />
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
