import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    Activity, TrendingUp, ShieldCheck, Grid, Zap, Globe, Lock,
    Database, Cpu, Server, BarChart3,
    Anchor, Truck, ShoppingBag, Factory, Wheat, Fuel, HardHat, Stethoscope, Plane,
    CheckCircle2, ArrowRight, Mail, Layers, AlertTriangle, MonitorPlay,
    Leaf, Wind, DollarSign, Star, Clock, ArrowRightLeft, Ship, Users, Building2, X, Check, Sparkles, Award, TrendingDown,
    Bot, MessageSquare, Brain, FileText, Send, MapPin
} from 'lucide-react';
import TiltCard from '../TiltCard';
import Particles from '../Particles/Particles';

// --- Animated Counter Component ---
function Counter({ value, label, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const springValue = useSpring(0, { stiffness: 50, damping: 20 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2 font-mono">
                {displayValue.toLocaleString()}{suffix}
            </div>
            <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold">{label}</div>
        </div>
    );
}

// --- Spotlight Feature Card ---
function FeatureCard({ icon, title, description, details }) {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };
    const opacity = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        position.x.set(e.clientX - rect.left);
        position.y.set(e.clientY - rect.top);
    };

    const handleFocus = () => {
        setIsFocused(true);
        opacity.set(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        opacity.set(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-full rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden group"
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [position.x, position.y],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(82, 39, 255, 0.15), transparent 40%)`
                    ),
                }}
            />

            {/* Spotlight Border */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [position.x, position.y],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(82, 39, 255, 0.4), transparent 40%)`
                    ),
                    maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                }}
            />

            <div className="relative p-8 h-full flex flex-col z-10">
                <div className="w-14 h-14 rounded-xl bg-[#5227FF]/10 flex items-center justify-center text-[#5227FF] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(82,39,255,0.2)]">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#5227FF] transition-colors">{title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed flex-grow">{description}</p>

                <div className="pt-6 border-t border-white/5">
                    <ul className="grid grid-cols-1 gap-3">
                        {details.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-300">
                                <CheckCircle2 size={16} className="text-[#5227FF] mr-3 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

function ProcessStep({ number, title, description, icon, align, details }) {
    const isLeft = align === 'left';
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`flex flex-col md:flex-row items-center gap-8 mb-24 relative z-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`md:w-1/2 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} w-full`}
            >
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 w-full max-w-lg cursor-pointer hover:border-[#5227FF]/50 transition-all duration-300 group
                        ${isOpen ? 'border-[#5227FF] bg-black/60 shadow-[0_0_30px_rgba(82,39,255,0.15)]' : ''}
                    `}
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5227FF] to-[#22d3ee] rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-sm"></div>

                    <div className="relative z-10">
                        <div className="text-[#5227FF] text-xs font-bold tracking-widest mb-4 flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-[#5227FF]/10 border border-[#5227FF]/20">STEP {number}</span>
                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                className="text-white/50"
                            >
                                ▼
                            </motion.span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#22d3ee] transition-colors">{title}</h3>
                        <p className="text-slate-400 mb-4 leading-relaxed">{description}</p>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 mt-4 border-t border-white/10">
                                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                            <Cpu size={14} className="text-[#22d3ee]" /> Technical Specs
                                        </h4>
                                        <ul className="space-y-2">
                                            {details && details.map((detail, idx) => (
                                                <li key={idx} className="text-xs text-slate-300 flex items-center bg-white/5 p-2 rounded-lg">
                                                    <div className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full mr-3" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Center Icon */}
            <div className="relative z-10 flex-shrink-0">
                <div className={`w-20 h-20 rounded-full bg-[#0f172a] border-2 flex items-center justify-center text-white shadow-[0_0_30px_rgba(82,39,255,0.3)] transition-all duration-500 z-20 relative ${isOpen ? 'border-[#22d3ee] text-[#22d3ee] scale-110' : 'border-[#5227FF] text-white'}`}>
                    {icon}
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-[#5227FF] animate-ping opacity-20"></div>
            </div>

            <div className="md:w-1/2" /> {/* Spacer */}
        </div>
    );
}

function IndustryCard({ icon, title, description, color, useCase }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative p-1 rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent hover:from-[#5227FF]/50 transition-all duration-500"
        >
            <div className="absolute inset-0 bg-slate-950 rounded-2xl m-[1px] z-0"></div>
            <div className="relative z-10 p-7 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 ${color} group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

                <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-[#5227FF]/20 transition-colors">
                    <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Use Case</div>
                    <div className="text-sm text-slate-200">{useCase}</div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Digital Twin Deep Dive Section ---
function DigitalTwinSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 text-[#22d3ee] text-xs font-bold tracking-wider mb-6">
                        <Layers size={12} className="mr-2" /> SIMULATION ENGINE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Predict the Unpredictable with Digital Twins</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Stop reacting to supply chain disruptions. Gasper creates a living, breathing virtual replica of your entire logistics network, allowing you to stress-test your operations against thousands of variables.
                    </p>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#22d3ee]/10 flex-shrink-0 flex items-center justify-center text-[#22d3ee]">
                                <MonitorPlay size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Scenario Modeling</h4>
                                <p className="text-slate-400 text-sm">Simulate port strikes, weather events, or supplier failures to see their downstream impact instantly.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#5227FF]/10 flex-shrink-0 flex items-center justify-center text-[#5227FF]">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Cost Impact Analysis</h4>
                                <p className="text-slate-400 text-sm">Quantify the financial risk of every decision before you make it. Optimize inventory holding costs vs. service levels.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Abstract Visual Representation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="aspect-square rounded-full border border-white/10 relative flex items-center justify-center">
                        <div className="absolute inset-0 border border-[#22d3ee]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-8 border border-[#5227FF]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Central Node */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#5227FF] opacity-20 blur-xl absolute"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-4xl font-bold text-white mb-2">99.4%</div>
                            <div className="text-xs text-[#22d3ee] uppercase tracking-widest">Model Accuracy</div>
                        </div>

                        {/* Floating Nodes */}
                        <div className="absolute top-10 left-10 w-3 h-3 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#5227FF] rounded-full shadow-[0_0_10px_#5227FF]"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Risk Monitor Deep Dive Section ---
function RiskMonitorSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden text-right">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Visual Side (Left) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative order-2 md:order-1"
                >
                    <div className="relative rounded-2xl bg-black/40 border border-white/10 aspect-video overflow-hidden">
                        {/* Radar Scan Effect */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,0,0,0)_50%,rgba(239,68,68,0.1)_100%)] animate-[spin_4s_linear_infinite]"></div>
                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="border border-red-500/20"></div>
                            ))}
                        </div>

                        {/* Alert Blips */}
                        <div className="absolute top-1/4 left-1/3 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span className="text-xs text-red-400 font-mono bg-black/80 px-1 rounded">Congestion Alert</span>
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                            </span>
                            <span className="text-xs text-orange-400 font-mono bg-black/80 px-1 rounded">Port Strike Risk</span>
                        </div>
                    </div>
                </motion.div>

                {/* Content Side (Right) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 md:order-2 flex flex-col items-end"
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold tracking-wider mb-6">
                        <AlertTriangle size={12} className="mr-2" /> GLOBAL WATCHTOWER
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Advanced Risk Detection</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        The world is volatile. Gasper acts as your always-on watchtower, scanning thousands of data sources for geopolitical events, weather disruptions, and infrastructure failures.
                    </p>

                    <div className="space-y-6 text-right w-full">
                        <div className="flex gap-4 justify-end">
                            <div className="text-right">
                                <h4 className="text-white font-bold text-lg mb-1">Geopolitical Intelligence</h4>
                                <p className="text-slate-400 text-sm">Real-time alerts on sanctions, trade wars, and regional instability that could affect your routes.</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex-shrink-0 flex items-center justify-center text-red-500">
                                <Globe size={24} />
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div className="text-right">
                                <h4 className="text-white font-bold text-lg mb-1">Infrastructure Monitoring</h4>
                                <p className="text-slate-400 text-sm">Detect crane failures, canal blockages, and terminal congestion before your cargo gets stuck.</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex-shrink-0 flex items-center justify-center text-orange-500">
                                <Anchor size={24} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Sustainability Deep Dive Section ---
function SustainabilitySection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider mb-6">
                        <Leaf size={12} className="mr-2" /> GREEN LOGISTICS
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Decarbonize Your Supply Chain</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Sustainability isn't just a buzzword—it's a competitive advantage. Gasper automatically calculates the carbon footprint of every shipment and suggests eco-friendly alternatives.
                    </p>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex-shrink-0 flex items-center justify-center text-emerald-500">
                                <Wind size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Carbon Footprint Analysis</h4>
                                <p className="text-slate-400 text-sm">Granular CO2e reporting for every route, carrier, and mode of transport compliant with GLEC framework.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex-shrink-0 flex items-center justify-center text-teal-500">
                                <Ship size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Modal Shift Opportunities</h4>
                                <p className="text-slate-400 text-sm">Identify opportunities to switch from Air to Ocean or Rail to save costs and reduce emissions by up to 90%.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Representation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative rounded-2xl bg-black/40 border border-white/10 p-6 overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Leaf size={100} className="text-emerald-500" />
                        </div>

                        <h4 className="text-slate-400 text-sm mb-6 uppercase tracking-wider font-semibold">Emissions Comparison</h4>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2 text-white">
                                    <span>Air Freight (Shanghai - Toronto)</span>
                                    <span className="font-mono text-red-400">4,250 kg CO2e</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '90%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-red-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2 text-white">
                                    <span>Ocean Freight (Shanghai - Toronto)</span>
                                    <span className="font-mono text-emerald-400">180 kg CO2e</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '15%' }}
                                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                        className="h-full bg-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase">Potential Savings</p>
                                    <p className="text-2xl font-bold text-emerald-400">-4,070 kg</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 uppercase">Offset Cost</p>
                                    <p className="text-2xl font-bold text-white">$12.50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Testimonials Section ---
function GasperAIBotSection() {
    const features = [
        {
            icon: <MessageSquare size={24} />,
            title: "Natural Language Queries",
            description: "Ask questions in plain English and get instant, accurate answers about your shipments, routes, and logistics."
        },
        {
            icon: <Zap size={24} />,
            title: "Real-Time Insights",
            description: "Get live updates on vessel positions, delays, weather impacts, and route optimizations without searching through dashboards."
        },
        {
            icon: <Brain size={24} />,
            title: "Predictive Intelligence",
            description: "Our AI proactively alerts you to potential disruptions and suggests optimal alternatives before issues arise."
        },
        {
            icon: <FileText size={24} />,
            title: "Automated Documentation",
            description: "Generate shipping documents, compliance reports, and customs paperwork with simple conversational commands."
        }
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 text-[#22d3ee] text-sm font-medium mb-4"
                >
                    <Bot size={14} className="inline mr-2" />
                    AI-Powered Assistant
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Your Gasper AI Bot</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Your intelligent logistics assistant that understands your supply chain and speaks your language.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Left: Chat Demo */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#5227FF] flex items-center justify-center">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <div className="text-white font-semibold">Gasper AI</div>
                            <div className="text-xs text-green-400 flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                Online
                            </div>
                        </div>
                    </div>

                    {/* Sample Chat Messages */}
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <div className="bg-[#5227FF]/20 border border-[#5227FF]/30 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                                <p className="text-white text-sm">Where is shipment #SH-2847?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                <p className="text-slate-300 text-sm mb-2">Shipment #SH-2847 is currently:</p>
                                <div className="space-y-1 text-xs text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Ship size={12} className="text-[#22d3ee]" />
                                        <span>Vessel: MAERSK ESSEX</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={12} className="text-[#22d3ee]" />
                                        <span>Location: 35.2°N, 139.7°E (Tokyo Bay)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={12} className="text-green-400" />
                                        <span>ETA: Feb 12, 2026 - On Time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-[#5227FF]/20 border border-[#5227FF]/30 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                                <p className="text-white text-sm">Any weather risks?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                <p className="text-slate-300 text-sm">✅ No significant weather risks detected along the current route. Smooth sailing ahead!</p>
                            </div>
                        </div>
                    </div>

                    {/* Input Box */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2">
                            <input
                                type="text"
                                placeholder="Ask Gasper AI anything..."
                                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500"
                                disabled
                            />
                            <Send size={16} className="text-slate-500" />
                        </div>
                    </div>
                </motion.div>

                {/* Right: Features Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-4"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xl hover:border-[#22d3ee]/30 transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#22d3ee]/20 to-[#5227FF]/20 flex items-center justify-center text-[#22d3ee] flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gradient-to-r from-[#22d3ee]/10 to-[#5227FF]/10 border border-white/10"
            >
                <p className="text-slate-300 text-sm">
                    <Sparkles size={16} className="inline text-[#22d3ee] mr-2" />
                    Gasper AI learns from your operations and gets smarter over time, providing increasingly personalized insights.
                </p>
            </motion.div>
        </section>
    );
}


// --- Technology Stack Section ---
function TechnologyStackSection() {
    const techCategories = [
        {
            category: "Data Sources",
            icon: <Database size={20} />,
            technologies: ["AIS Streams", "Port APIs", "Weather Data", "IoT Sensors"]
        },
        {
            category: "AI & Machine Learning",
            icon: <Cpu size={20} />,
            technologies: ["TensorFlow", "PyTorch", "Time-Series Forecasting", "NLP Models"]
        },
        {
            category: "Infrastructure",
            icon: <Server size={20} />,
            technologies: ["AWS", "Kubernetes", "Redis", "PostgreSQL"]
        },
        {
            category: "Security",
            icon: <Lock size={20} />,
            technologies: ["SOC 2 Type II", "End-to-End Encryption", "GDPR Compliant", "ISO 27001"]
        }
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built on Enterprise-Grade Technology</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Powered by the most advanced tools in the industry.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {techCategories.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl hover:border-[#22d3ee]/30 transition-all"
                    >
                        <div className="w-12 h-12 rounded-lg bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee] mb-4">
                            {cat.icon}
                        </div>
                        <h3 className="text-white font-bold mb-4">{cat.category}</h3>
                        <ul className="space-y-2">
                            {cat.technologies.map((tech, i) => (
                                <li key={i} className="text-sm text-slate-400 flex items-center">
                                    <div className="w-1 h-1 bg-[#22d3ee] rounded-full mr-2" />
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// --- Comparison Table Section ---
function ComparisonTableSection() {
    const comparisons = [
        { feature: "Real-Time Tracking", traditional: false, gasper: true },
        { feature: "AI-Powered Predictions", traditional: false, gasper: true },
        { feature: "Digital Twin Simulation", traditional: false, gasper: true },
        { feature: "Automated Compliance", traditional: false, gasper: true },
        { feature: "Multi-Modal Integration", traditional: true, gasper: true },
        { feature: "Setup Time", traditional: "Weeks", gasper: "Minutes" },
        { feature: "Cost Structure", traditional: "Per Shipment", gasper: "Flat Rate" }
    ];

    return (
        <section className="px-6 max-w-6xl mx-auto py-20 relative overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#5227FF]/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-[#5227FF]/30 bg-[#5227FF]/10 text-[#5227FF] text-sm font-medium mb-6"
                >
                    <TrendingUp size={14} className="inline mr-2" />
                    Competitive Advantage
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4">
                    Why Choose Gasper?
                </h2>
                <p className="text-slate-400 text-lg">See how we stack up against traditional logistics tools.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
            >
                {/* Outer Glow Container */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5227FF]/20 via-[#22d3ee]/20 to-[#5227FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Main Table Container */}
                <div className="relative rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-2xl overflow-hidden shadow-2xl">
                    {/* Header Row */}
                    <div className="grid grid-cols-3 bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-b border-white/20">
                        <div className="p-6"></div>
                        <div className="p-6 text-center">
                            <div className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-1">Traditional Tools</div>
                            <div className="text-xs text-slate-500">Legacy Systems</div>
                        </div>
                        <div className="p-6 text-center bg-gradient-to-br from-[#5227FF]/10 to-transparent border-l border-white/10">
                            <div className="flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee] text-sm font-bold uppercase tracking-wider mb-1">
                                <Sparkles size={16} className="text-[#5227FF]" />
                                Gasper
                            </div>
                            <div className="text-xs text-[#22d3ee]/80">Next-Gen Platform</div>
                        </div>
                    </div>

                    {/* Comparison Rows */}
                    {comparisons.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-gradient-to-r hover:from-[#5227FF]/5 hover:to-transparent transition-all duration-300 group/row"
                        >
                            {/* Feature Name */}
                            <div className="p-5 flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#5227FF] to-[#22d3ee] mr-3 opacity-0 group-hover/row:opacity-100 transition-opacity"></div>
                                <span className="text-white font-semibold text-base group-hover/row:text-[#22d3ee] transition-colors">
                                    {item.feature}
                                </span>
                            </div>

                            {/* Traditional Column */}
                            <div className="p-5 flex items-center justify-center">
                                {typeof item.traditional === 'boolean' ? (
                                    item.traditional ? (
                                        <div className="relative">
                                            <Check size={24} className="text-slate-500" />
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <X size={24} className="text-red-500/40" />
                                            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-md"></div>
                                        </div>
                                    )
                                ) : (
                                    <span className="text-slate-400 text-sm font-medium px-3 py-1 rounded-lg bg-white/5">
                                        {item.traditional}
                                    </span>
                                )}
                            </div>

                            {/* Gasper Column */}
                            <div className="p-5 flex items-center justify-center bg-gradient-to-r from-transparent to-[#5227FF]/5 border-l border-white/5">
                                {typeof item.gasper === 'boolean' ? (
                                    item.gasper ? (
                                        <div className="relative">
                                            <Check size={24} className="text-[#5227FF] drop-shadow-[0_0_8px_rgba(82,39,255,0.6)]" />
                                            <div className="absolute inset-0 bg-[#5227FF]/20 rounded-full blur-md animate-pulse"></div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <X size={24} className="text-red-500/40" />
                                        </div>
                                    )
                                ) : (
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee] text-sm font-bold px-4 py-1.5 rounded-lg bg-[#5227FF]/10 border border-[#5227FF]/20 shadow-[0_0_15px_rgba(82,39,255,0.2)]">
                                        {item.gasper}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Bottom CTA Banner */}
                    <div className="bg-gradient-to-r from-[#5227FF]/20 via-[#22d3ee]/10 to-[#5227FF]/20 border-t border-white/10 p-6">
                        <div className="flex items-center justify-center gap-3 text-center">
                            <Award size={20} className="text-[#22d3ee]" />
                            <p className="text-slate-300 text-sm">
                                Join <span className="text-[#5227FF] font-bold">2,500+</span> companies already on the waitlist
                            </p>
                            <TrendingUp size={20} className="text-[#5227FF]" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// --- Waitlist Section with Email Functionality ---
function WaitlistSection() {
    const [formData, setFormData] = useState({
        email: '',
        role: '',
        companySize: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.email) {
            setErrorMessage('Please enter your email address');
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Please enter a valid email address');
            return false;
        }

        if (!formData.role) {
            setErrorMessage('Please select your role');
            return false;
        }

        if (!formData.companySize) {
            setErrorMessage('Please select your company size');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Validate form
        if (!validateForm()) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            // Send email via API endpoint
            const response = await fetch('/api/send-waitlist-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    role: formData.role,
                    companySize: formData.companySize
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send email');
            }

            setStatus('success');
            // Reset form
            setFormData({
                email: '',
                role: '',
                companySize: ''
            });
        } catch (error) {
            console.error('Email send error:', error);
            setStatus('error');
            setErrorMessage('Failed to send request. Please try again or contact us directly at gasper@marapone.com');
        }
    };

    return (
        <section className="px-6 max-w-3xl mx-auto pb-32 text-center">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#5227FF]/20 to-purple-900/20 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="relative z-10">
                    <Zap size={40} className="mx-auto text-[#5227FF] mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Secure Your Access</h2>
                    <p className="text-slate-300 mb-2">
                        Gasper is currently in private beta. Join the waitlist to be notified when we open to the public.
                    </p>
                    <p className="text-[#22d3ee] text-sm font-semibold mb-8">
                        <Users size={14} className="inline mr-1" />
                        2,547 supply chain leaders joined this week
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all placeholder:text-slate-500"
                                disabled={status === 'loading'}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all appearance-none cursor-pointer"
                                    disabled={status === 'loading'}
                                >
                                    <option value="">Your Role</option>
                                    <option value="Logistics Manager">Logistics Manager</option>
                                    <option value="Operations Director">Operations Director</option>
                                    <option value="Supply Chain VP">Supply Chain VP</option>
                                    <option value="C-Level Executive">C-Level Executive</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    name="companySize"
                                    value={formData.companySize}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all appearance-none cursor-pointer"
                                    disabled={status === 'loading'}
                                >
                                    <option value="">Company Size</option>
                                    <option value="1-50 employees">1-50 employees</option>
                                    <option value="51-200 employees">51-200 employees</option>
                                    <option value="201-1,000 employees">201-1,000 employees</option>
                                    <option value="1,000+ employees">1,000+ employees</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#5227FF]/25 flex items-center justify-center ${status === 'loading'
                                ? 'bg-[#5227FF]/50 cursor-not-allowed'
                                : 'bg-[#5227FF] hover:bg-[#4316db]'
                                } text-white`}
                        >
                            {status === 'loading' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Request Access <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </button>

                        {/* Success Message */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2"
                            >
                                <Check size={20} />
                                <span>Success! We'll be in touch soon.</span>
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {status === 'error' && errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2"
                            >
                                <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{errorMessage}</span>
                            </motion.div>
                        )}
                    </form>

                    <p className="mt-4 text-xs text-slate-500">
                        By joining, you agree to our{' '}
                        <Link to="/terms" className="text-[#22d3ee] hover:text-[#5227FF] transition-colors underline">
                            Terms of Service
                        </Link>
                        {', '}
                        <Link to="/privacy" className="text-[#22d3ee] hover:text-[#5227FF] transition-colors underline">
                            Privacy Policy
                        </Link>
                        {', and '}
                        <Link to="/cookies" className="text-[#22d3ee] hover:text-[#5227FF] transition-colors underline">
                            Cookie Policy
                        </Link>
                        . No spam, ever.
                    </p>
                </div>
            </div>
        </section>
    );
}

// --- What You'll Get Section ---
function WhatYouGetSection() {
    const benefits = [
        { icon: <Zap size={24} />, title: "Early Access", description: "Be among the first to experience Gasper when we launch" },
        { icon: <DollarSign size={24} />, title: "Founding Member Pricing", description: "Lock in 40% off for life as a beta waitlist member" },
        { icon: <Award size={24} />, title: "Priority Support", description: "Direct line to our engineering team for the first 6 months" },
        { icon: <Users size={24} />, title: "Exclusive Community", description: "Join our private Slack with other supply chain innovators" }
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You'll Get</h2>
                <p className="text-slate-400">Join the waitlist today and unlock exclusive benefits.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-[#5227FF]/10 to-transparent border border-[#5227FF]/20 backdrop-blur-xl hover:border-[#5227FF]/40 transition-all group"
                    >
                        <div className="w-14 h-14 rounded-xl bg-[#5227FF]/20 flex items-center justify-center text-[#5227FF] mb-4 group-hover:scale-110 transition-transform">
                            {benefit.icon}
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// --- Rate Check Deep Dive Section ---
function RateCheckSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden text-right">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Visual Side (Left) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative order-2 md:order-1"
                >
                    <div className="relative">
                        {/* Background Card (Stack Effect) */}
                        <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] bg-white/5 border border-white/5 rounded-2xl z-0 transform rotate-2"></div>

                        {/* Main Card */}
                        <div className="relative z-10 bg-[#0f1014] border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-semibold">Rate Comparison</h3>
                                <div className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">Last Updated: 2m ago</div>
                            </div>

                            <div className="space-y-3">
                                {/* Option 1: AI Recommended */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/30 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">AI RECOMMENDED</div>
                                    <div className="flex justify-between items-center relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                                                <img src="/freightos-logo.png" alt="C1" className="w-8 opacity-80" onError={(e) => e.target.style.display = 'none'} />
                                                <Ship size={20} className="text-black absolute" style={{ opacity: 0.2 }} />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-white font-bold text-sm">Maersk Line</div>
                                                <div className="text-blue-300 text-xs flex items-center gap-1"><Star size={10} fill="currentColor" /> 98% Reliability</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-bold text-lg">$2,450</div>
                                            <div className="text-slate-400 text-xs">24 Days</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Option 2 */}
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                                                <Ship size={20} className="text-black/50" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-white font-bold text-sm">MSC</div>
                                                <div className="text-slate-400 text-xs">94% Reliability</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-bold text-lg">$2,380</div>
                                            <div className="text-slate-400 text-xs">28 Days</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Option 3 */}
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                                                <Plane size={20} className="text-black/50" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-white font-bold text-sm">DHL Express</div>
                                                <div className="text-slate-400 text-xs">99% Reliability</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-bold text-lg">$8,450</div>
                                            <div className="text-slate-400 text-xs">3 Days</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content Side (Right) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 md:order-2 flex flex-col items-end"
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider mb-6">
                        <DollarSign size={12} className="mr-2" /> COST OPTIMIZATION
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Smart Rate Comparison</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Stop overpaying for freight. Gasper aggregates real-time rates from hundreds of carriers, highlighting the best balance of speed, cost, and reliability for every shipment.
                    </p>

                    <div className="space-y-6 text-right w-full">
                        <div className="flex gap-4 justify-end">
                            <div className="text-right">
                                <h4 className="text-white font-bold text-lg mb-1">Instant Quotes</h4>
                                <p className="text-slate-400 text-sm">Get bookable spot rates in seconds, not days. Compare across air, ocean, and rail instantly.</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-500">
                                <Clock size={24} />
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div className="text-right">
                                <h4 className="text-white font-bold text-lg mb-1">Hidden Fee Detection</h4>
                                <p className="text-slate-400 text-sm">Our AI scans for surcharges and hidden fees, ensuring the price you see is the price you pay.</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex-shrink-0 flex items-center justify-center text-indigo-500">
                                <ShieldCheck size={24} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}



export default function ComingSoonContent() {
    return (
        <div className="mt-20 space-y-32 relative">

            {/* Particles Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <Particles
                    particleColors={["#5227FF", "#22d3ee", "#8b5cf6"]}
                    particleCount={400}
                    particleSpread={15}
                    speed={0.08}
                    particleBaseSize={80}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                    sizeRandomness={1.5}
                    cameraDistance={25}
                    pixelRatio={Math.min(window.devicePixelRatio, 2)}
                />
            </div>

            {/* --- STATS SECTION --- */}
            <section className="px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-3xl">
                    <Counter value={5000} label="Connected Vessels" suffix="+" />
                    <Counter value={98} label="Accuracy Rating" suffix="%" />
                    <Counter value={120} label="Countries Covered" suffix="+" />
                    <Counter value={2} label="Data Points (B)" suffix="B+" />
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[#5227FF]/30 bg-[#5227FF]/10 text-[#5227FF] text-sm font-medium mb-4"
                    >
                        Core Capabilities
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee]">Beyond Boundaries</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">A comprehensive suite of AI-powered tools designed to give you total visibility and control over your global operations.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FeatureCard
                        icon={<Activity size={32} />}
                        title="Real-Time Tracking"
                        description="Monitor vessels, flights, and rail freight in real-time. Our global tracking network integrates data from thousands of carriers."
                        details={['Vessel AIS Data', 'Live Flight Paths', 'Rail Freight Corridors', 'Delay Predictions']}
                    />
                    <FeatureCard
                        icon={<TrendingUp size={32} />}
                        title="Digital Twin Simulation"
                        description="Create a virtual replica of your supply chain. Test 'what-if' scenarios to understand the impact of port strikes or disasters."
                        details={['Scenario Modeling', 'Cost Impact Analysis', 'Route Alternates', 'Inventory Optimization']}
                    />
                    <FeatureCard
                        icon={<ShieldCheck size={32} />}
                        title="Compliance & Risk AI"
                        description="Automate your compliance workflows. Our AI classifies HS codes with 99% accuracy and screens all partners."
                        details={['Automated HS Classification', 'Sanctions Screening', 'Document Generation', 'Regulatory Alerts']}
                    />
                    <FeatureCard
                        icon={<Grid size={32} />}
                        title="Market Intelligence"
                        description="Stay ahead of market shifts. Access live commodity prices, currency exchange rates, and spot rates."
                        details={['Live User Indices', 'Currency Exchange', 'Commodity Tickers', 'Global Holidays']}
                    />
                </div>
            </section>

            {/* --- COMPARISON TABLE --- */}
            <ComparisonTableSection />

            {/* --- NEW DEEP DIVE SECTIONS --- */}
            <DigitalTwinSection />
            <RiskMonitorSection />
            <SustainabilitySection />
            <RateCheckSection />

            {/* --- TECHNOLOGY STACK --- */}
            <TechnologyStackSection />

            {/* --- HOW IT WORKS SECTION --- */}
            <section className="px-6 max-w-7xl mx-auto relative py-20">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Gasper Works</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">From unstructured chaos to actionable intelligence in three steps.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 transform -translate-x-1/2 h-full z-0">
                        <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-[#5227FF] via-[#22d3ee] to-[#5227FF] opacity-50 shadow-[0_0_15px_#5227FF]" />
                    </div>

                    <ProcessStep
                        number="01"
                        title="Data Ingestion"
                        description="We aggregate structured and unstructured data from over 500 sources, including AIS feeds, port APIs, and weather stations."
                        icon={<Database size={32} />}
                        align="left"
                        details={[
                            "REST API & Webhooks",
                            "EDI (X12, EDIFACT) Parsers",
                            "IoT Sensor Stream Integration"
                        ]}
                    />
                    <ProcessStep
                        number="02"
                        title="AI Processing"
                        description="Our proprietary ML models clean, normalize, and analyze the data to extract risks and forecast delays."
                        icon={<Cpu size={32} />}
                        align="right"
                        details={[
                            "Entity Recognition (NER)",
                            "Time-Series Forecasting",
                            "Anomaly Detection Models"
                        ]}
                    />
                    <ProcessStep
                        number="03"
                        title="Actionable Insights"
                        description="Insights are delivered via dashboard or API. You get alerts, updated ETAs, and cost-saving recommendations instantly."
                        icon={<BarChart3 size={32} />}
                        align="left"
                        details={[
                            "Real-time Push Notifications",
                            "Customizable Dashboards",
                            "Automated Reporting"
                        ]}
                    />
                </div>
            </section>

            {/* --- INDUSTRIES SECTION --- */}
            <section className="px-6 max-w-7xl mx-auto pb-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Engineered for Every Sector</h2>
                    <p className="text-slate-400">Tailored solutions for the unique challenges of your industry.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <IndustryCard
                        icon={<Anchor size={28} />}
                        title="Maritime Logistics"
                        description="Optimize port calls, track container vessels in real-time, and predict congestion at major hubs."
                        color="text-blue-400"
                        useCase="Vessel Tracking & Fuel Optimization"
                    />
                    <IndustryCard
                        icon={<Truck size={28} />}
                        title="Freight Forwarding"
                        description="Manage multi-modal shipments with ease. Automate documentation and tracking."
                        color="text-green-400"
                        useCase="Automated Documentation & Client Portal"
                    />
                    <IndustryCard
                        icon={<ShoppingBag size={28} />}
                        title="Retail & E-commerce"
                        description="Ensure stock availability by tracking inventory from factory to warehouse."
                        color="text-purple-400"
                        useCase="Inventory Visibility & Demand Sensing"
                    />
                    <IndustryCard
                        icon={<Factory size={28} />}
                        title="Manufacturing"
                        description="Secure your supply chain against disruptions and monitor raw material shipments."
                        color="text-orange-400"
                        useCase="Supplier Risk Monitoring"
                    />
                    <IndustryCard
                        icon={<Fuel size={28} />}
                        title="Energy & Commodities"
                        description="Monitor oil and gas shipments and react instantly to geopolitical events."
                        color="text-red-400"
                        useCase="Geopolitical Route Optimization"
                    />
                    <IndustryCard
                        icon={<Plane size={28} />}
                        title="Aerospace"
                        description="Track critical AOG parts globally to minimize downtime."
                        color="text-sky-400"
                        useCase="AOG Parts Tracking"
                    />
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <GasperAIBotSection />

            {/* --- WHAT YOU'LL GET --- */}
            <WhatYouGetSection />

            {/* --- WAITLIST SECTION --- */}
            <WaitlistSection />


        </div>
    );
}
