import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Zap, Activity, Grid, Layers, Box, Truck, Anchor, HardHat, Ruler, Brain, FileText, Navigation } from 'lucide-react';
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

// --- Floating Particle Dot for Domain Cards ---
const FloatingDot = ({ color, size, top, left, delay, duration }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: size, height: size, top, left, backgroundColor: color, filter: `blur(1px)` }}
        animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
);

// High-end 3D Tracking Card Component — Enhanced
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
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
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
            transition={{ duration: 0.8, delay: enterDelay }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative w-full aspect-[4/5] max-w-md mx-auto rounded-3xl ${active ? 'scale-105' : 'hover:scale-[1.02]'} transition-all duration-300 cursor-pointer overflow-hidden group`}
        >
            {/* Animated gradient border */}
            <div className="absolute -inset-[2px] rounded-3xl z-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `conic-gradient(from 0deg at 50% 50%, ${themeColor}, ${sc}, transparent, ${themeColor})`,
                        opacity: active ? 0.8 : 0.25,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Card inner */}
            <div className="absolute inset-[2px] rounded-3xl bg-[#0a0a0a]/90 backdrop-blur-xl z-[1]"></div>

            {/* Ambient inner glow */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 ${active ? 'opacity-100' : 'group-hover:opacity-60'} transition-opacity duration-700 z-[1]`} style={{ background: `radial-gradient(circle at center, ${themeColor}20, transparent 70%)` }}></div>

            {/* Mouse-follow spotlight */}
            <div className="absolute inset-0 rounded-3xl z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${themeColor}15, transparent 60%)` }}></div>

            {/* Shimmer scan-line */}
            <motion.div
                className="absolute inset-0 rounded-3xl z-[2] pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <motion.div
                    className="absolute w-full h-[2px] left-0"
                    style={{ background: `linear-gradient(90deg, transparent, ${themeColor}60, ${sc}60, transparent)` }}
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>

            {/* Floating particles */}
            <div className="absolute inset-0 z-[2] pointer-events-none">
                <FloatingDot color={themeColor} size={4} top="15%" left="20%" delay={0} duration={3} />
                <FloatingDot color={sc} size={3} top="70%" left="75%" delay={0.5} duration={4} />
                <FloatingDot color={themeColor} size={5} top="40%" left="85%" delay={1} duration={3.5} />
                <FloatingDot color={sc} size={3} top="85%" left="30%" delay={1.5} duration={4.5} />
                <FloatingDot color={themeColor} size={4} top="25%" left="60%" delay={2} duration={3.2} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center p-10 h-full text-center" style={{ transform: "translateZ(50px)" }}>
                {/* Pulsing icon container */}
                <div className="relative mb-8">
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{ backgroundColor: `${themeColor}30` }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className={`relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 ${active ? 'border-white/30 shadow-2xl' : 'border-white/10'}`} style={{ backgroundColor: `${themeColor}15`, color: themeColor, boxShadow: active ? `0 0 40px ${themeColor}60` : `0 0 15px ${themeColor}20` }}>
                        <Icon size={48} />
                    </div>
                </div>

                {/* Gradient title */}
                <h3 className="text-3xl lg:text-4xl font-bold mb-4" style={{ transform: "translateZ(30px)", background: `linear-gradient(135deg, #fff 40%, ${sc})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-auto" style={{ transform: "translateZ(15px)" }}>{description}</p>

                {/* CTA button */}
                <motion.div
                    className={`mt-8 px-8 py-4 rounded-full border transform uppercase tracking-widest text-xs font-bold transition-all duration-300 ${active ? 'text-black border-white scale-110' : 'border-white/20 text-white group-hover:bg-white/10'}`}
                    style={active ? { background: `linear-gradient(135deg, ${themeColor}, ${sc})`, borderColor: 'transparent' } : {}}
                    whileHover={!active ? { scale: 1.05 } : {}}
                >
                    {active ? '✦ Engine Active' : 'Select Engine →'}
                </motion.div>
            </div>

            {/* Highlight Line */}
            {active && (
                <motion.div
                    layoutId="active-domain-underline"
                    className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
                    style={{ background: `linear-gradient(90deg, ${themeColor}, ${sc})`, boxShadow: `0 -5px 25px ${themeColor}` }}
                />
            )}
        </motion.div>
    );
};

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

    return (
        <div className="landing-container pt-12 relative transition-colors duration-1000">
            {/* Grand Entrance Hero Section */}
            <section className="hero-section text-center items-center relative min-h-screen flex flex-col justify-center pt-20 pb-32">
                {/* Background: Global Particle Background */}
                <div className="absolute inset-0 z-0">
                    <ComingSoonHeroBackground />
                </div>

                {/* Massive Ambient Glow based on selected domain */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10 pointer-events-none transition-all duration-1000 z-0" style={{ backgroundColor: themeColor }} />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6">

                    {/* Gasper G Logo with effects — comingSoon only */}
                    {comingSoonMode && (
                        <motion.div
                            className="relative w-28 h-28 mx-auto mb-8"
                            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Outer pulsing ring */}
                            <motion.div
                                className="absolute -inset-4 rounded-full"
                                style={{ border: `2px solid ${themeColor}30`, boxShadow: `0 0 40px ${themeColor}20` }}
                                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            {/* Inner glow */}
                            <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${themeColor}30 0%, transparent 70%)` }} />
                            {/* Logo image */}
                            <img
                                src="/images/gasper-logo-g.png"
                                alt="Gasper"
                                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_25px_rgba(82,39,255,0.5)]"
                            />
                        </motion.div>
                    )}

                    <motion.div
                        className="hero-label inline-flex items-center gap-2 mx-auto mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Zap size={14} />
                        {comingSoonMode ? "Coming Soon to Public Beta" : "AI-Powered Operations Intelligence"}
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-2 mx-auto text-center max-w-5xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        {comingSoonMode ? (
                            <>Gasper<span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, ${selectedProduct === 'construction' ? '#F59E0B' : '#22d3ee'})` }}>.</span></>
                        ) : (
                            <>Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, ${selectedProduct === 'construction' ? '#F59E0B' : '#22d3ee'})` }}>Domain</span></>
                        )}
                    </motion.h1>

                    {comingSoonMode && (
                        <motion.p
                            className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                        >
                            Select Your Engine
                        </motion.p>
                    )}

                    <motion.p
                        className="text-xl text-slate-400 text-center mx-auto max-w-3xl mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {comingSoonMode
                            ? 'One platform. Two AI engines. Choose your domain to explore how Gasper transforms operations into intelligence.'
                            : 'One unified intelligence platform. Two specialized engines. Choose your operational domain to see how Marapone transforms chaos into clarity.'
                        }
                    </motion.p>

                    {/* High-end 3D feeling cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12 perspective-1000">
                        <DomainCard
                            title="Gasper Logistics"
                            description="Global Digital Twin, Predictive Routing & Automated Compliance."
                            icon={Globe}
                            themeColor="#5227FF"
                            secondaryColor="#22d3ee"
                            active={selectedProduct === 'logistics'}
                            onClick={() => handleDomainSelect('logistics')}
                            delay={0.3}
                        />
                        <DomainCard
                            title="Gasper Construction"
                            description="Generative Blueprint AI, Critical Path & Site Security."
                            icon={HardHat}
                            themeColor="#FF6B00"
                            secondaryColor="#F59E0B"
                            active={selectedProduct === 'construction'}
                            onClick={() => handleDomainSelect('construction')}
                            delay={0.4}
                        />
                    </div>
                </div>
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
                        <p className="text-xl text-slate-500 font-medium">↑ Select an engine above to explore ↑</p>
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
                                            {/* Pulling from the dedicated ConstructionShowcase components */}
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
