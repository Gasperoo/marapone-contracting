import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    Activity, TrendingUp, ShieldCheck, Grid, Zap, Globe, Lock,
    Database, Cpu, Server, BarChart3,
    Anchor, Truck, ShoppingBag, Factory, Wheat, Fuel, HardHat, Stethoscope, Plane,
    CheckCircle2, ArrowRight, Mail, Layers, AlertTriangle, MonitorPlay,
    Leaf, Wind, DollarSign, Star, Clock, ArrowRightLeft, Ship, Users, Building2, X, Check, Sparkles, Award, TrendingDown,
    Bot, MessageSquare, Brain, FileText, Send, MapPin, Ruler, Eye, Wrench, Hammer
} from 'lucide-react';
import TiltCard from '../TiltCard';
import Particles from '../Particles/Particles';
import { PlatformPillarsSection, ConstructionFeaturesSection, BlueprintAISection, CashFlowSection, SiteSecuritySection } from './ConstructionShowcase';
import { SubcontractorMatchSection, ProjectCommandCenter, ROIImpactSection, ScheduleOptimizerSection } from './ConstructionAdvanced';

// --- Floating Metric Card (OpenSpace-style) ---
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
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="metric-card group"
        >
            <div className="metric-card__value">
                {displayValue.toLocaleString()}{suffix}
            </div>
            <div className="metric-card__label">{label}</div>
        </motion.div>
    );
}

// --- Executive Feature Card ---
function FeatureCard({ icon, title, description, details }) {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        position.x.set(e.clientX - rect.left);
        position.y.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full rounded-2xl overflow-hidden group"
        >
            {/* Static gradient border */}
            <div
                className="absolute -inset-[1px] rounded-2xl z-0 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(34,211,238,0.2), rgba(14,165,233,0.3))',
                    opacity: isFocused ? 0.8 : 0.15,
                }}
            />

            {/* Glass body */}
            <div className="absolute inset-[1px] rounded-2xl bg-[#06001a]/90 backdrop-blur-xl z-[1]" />

            {/* Mouse-follow refraction */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]"
                style={{
                    background: useTransform(
                        [position.x, position.y],
                        ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(14,165,233,0.12), rgba(34,211,238,0.06) 30%, transparent 55%)`
                    ),
                }}
            />

            <div className="relative p-8 h-full flex flex-col z-10">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#0EA5E9] mb-6 group-hover:scale-110 transition-transform duration-500" style={{ background: 'rgba(14,165,233,0.1)', boxShadow: '0 0 25px rgba(14,165,233,0.15)' }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#0EA5E9] transition-colors duration-300">{title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed flex-grow">{description}</p>

                <div className="pt-6 border-t border-white/[0.04]">
                    <ul className="grid grid-cols-1 gap-3">
                        {details.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-300">
                                <CheckCircle2 size={14} className="text-[#22d3ee] mr-3 flex-shrink-0" />
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
                        relative p-8 rounded-2xl bg-[#06001a]/80 backdrop-blur-xl border w-full max-w-lg cursor-pointer transition-all duration-500 group
                        ${isOpen ? 'border-[#0EA5E9]/60 shadow-[0_0_40px_rgba(14,165,233,0.15)]' : 'border-white/[0.06] hover:border-[#0EA5E9]/40'}
                    `}
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#22d3ee] rounded-2xl opacity-0 group-hover:opacity-15 transition duration-700 blur-md"></div>

                    <div className="relative z-10">
                        <div className="text-[#0EA5E9] text-xs font-bold tracking-widest mb-4 flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20">STEP {number}</span>
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
                <div className={`w-20 h-20 rounded-full bg-[#06001a] border-2 flex items-center justify-center text-white transition-all duration-500 z-20 relative ${isOpen ? 'border-[#22d3ee] text-[#22d3ee] scale-110 shadow-[0_0_40px_rgba(34,211,238,0.3)]' : 'border-[#0EA5E9] text-white shadow-[0_0_30px_rgba(14,165,233,0.25)]'}`}>
                    {icon}
                </div>
                {/* Pulse Effect — static glow */}
                <div className="absolute inset-[-4px] rounded-full opacity-20" style={{ boxShadow: '0 0 20px #0EA5E9' }}></div>
            </div>

            <div className="md:w-1/2" /> {/* Spacer */}
        </div>
    );
}

function IndustryCard({ icon, title, description, color, useCase }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-[1.5rem] overflow-hidden"
        >
            {/* Border */}
            <div
                className="absolute -inset-[1px] rounded-[1.5rem] z-0 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(34,211,238,0.1), rgba(14,165,233,0.15))',
                    opacity: 0.4,
                }}
            />
            <div className="absolute inset-[1px] bg-[#06001a]/90 rounded-[1.5rem] z-0 group-hover:bg-[#06001a]/80 transition-colors duration-500" />
            <div className="relative z-10 p-10 h-full flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-8 ${color} group-hover:scale-105 transition-transform duration-500`} style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#22d3ee] transition-colors duration-300">{title}</h3>
                <p className="text-slate-400 text-[15px] leading-relaxed mb-8 flex-grow">{description}</p>

                <div className="mt-auto pt-6 border-t border-white/[0.04] group-hover:border-[#0EA5E9]/20 transition-colors">
                    <div className="text-xs text-slate-500 uppercase font-semibold mb-2 tracking-widest">Use Case</div>
                    <div className="text-sm text-slate-200 font-medium">{useCase}</div>
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
                    initial={{ opacity: 0, x: -24 }}
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
                            <div className="w-12 h-12 rounded-lg bg-[#0EA5E9]/10 flex-shrink-0 flex items-center justify-center text-[#0EA5E9]">
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
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="aspect-square rounded-full border border-white/10 relative flex items-center justify-center">
                        <div className="absolute inset-0 border border-[#22d3ee]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-8 border border-[#0EA5E9]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Central Node */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#0EA5E9] opacity-20 blur-xl absolute"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-4xl font-bold text-white mb-2">99.4%</div>
                            <div className="text-xs text-[#22d3ee] uppercase tracking-widest">Model Accuracy</div>
                        </div>

                        {/* Floating Nodes */}
                        <div className="absolute top-10 left-10 w-3 h-3 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#0EA5E9] rounded-full shadow-[0_0_10px_#0EA5E9]"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Risk Monitor Deep Dive Section ---
function RiskMonitorSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Visual Side (Left) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
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
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 md:order-2 flex flex-col items-start"
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold tracking-wider mb-6">
                        <AlertTriangle size={12} className="mr-2" /> GLOBAL WATCHTOWER
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Advanced Risk Detection</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        The world is volatile. Gasper acts as your always-on watchtower, scanning thousands of data sources for geopolitical events, weather disruptions, and infrastructure failures.
                    </p>

                    <div className="space-y-6 w-full">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex-shrink-0 flex items-center justify-center text-red-500">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Geopolitical Intelligence</h4>
                                <p className="text-slate-400 text-sm">Real-time alerts on sanctions, trade wars, and regional instability that could affect your routes.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex-shrink-0 flex items-center justify-center text-orange-500">
                                <Anchor size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Infrastructure Monitoring</h4>
                                <p className="text-slate-400 text-sm">Detect crane failures, canal blockages, and terminal congestion before your cargo gets stuck.</p>
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
                    initial={{ opacity: 0, x: -24 }}
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
                    initial={{ opacity: 0, scale: 0.96 }}
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
            description: "Ask complex logistics questions in plain English. Track shipments, compare routes, analyze costs, and get instant answers without navigating complex dashboards."
        },
        {
            icon: <Zap size={24} />,
            title: "Multi-Carrier Analysis",
            description: "Instantly compare rates, transit times, and reliability scores across hundreds of carriers. Get AI-powered recommendations optimized for your specific needs."
        },
        {
            icon: <Brain size={24} />,
            title: "Proactive Intelligence",
            description: "Our AI continuously monitors your supply chain and proactively alerts you to risks like port congestion, weather disruptions, or compliance issues before they impact your operations."
        },
        {
            icon: <FileText size={24} />,
            title: "Intelligent Automation",
            description: "Generate shipping documents, classify HS codes, screen sanctions lists, and create compliance reports through simple conversational commands."
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Your Gasper AI Assistant</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Your intelligent logistics copilot that analyzes your entire supply chain, answers complex questions instantly, and proactively identifies opportunities to save time and money.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Left: Chat Demo */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#0EA5E9] flex items-center justify-center p-1.5">
                            <img
                                src="/images/gasper-logo-g.png"
                                alt="Gasper AI"
                                className="w-full h-full object-contain"
                            />
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
                        {/* User Query 1 */}
                        <div className="flex justify-end">
                            <div className="bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                                <p className="text-white text-sm">Where is shipment #SH-2847?</p>
                            </div>
                        </div>

                        {/* AI Response 1 */}
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

                        {/* User Query 2 */}
                        <div className="flex justify-end">
                            <div className="bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                                <p className="text-white text-sm">Any weather risks?</p>
                            </div>
                        </div>

                        {/* AI Response 2 */}
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                <p className="text-slate-300 text-sm mb-2">✅ No significant weather risks detected along the current route. Smooth sailing ahead!</p>
                            </div>
                        </div>

                        {/* User Query 3 - More Complex */}
                        <div className="flex justify-end">
                            <div className="bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                                <p className="text-white text-sm">What's the cheapest way to ship 500kg from Shanghai to LA next week?</p>
                            </div>
                        </div>

                        {/* AI Response 3 - Detailed Analysis */}
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                <p className="text-slate-300 text-sm mb-3">I've analyzed 47 carrier options for you:</p>

                                {/* Recommended Option */}
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 mb-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-blue-300 text-xs font-semibold flex items-center gap-1">
                                            <Star size={10} fill="currentColor" /> RECOMMENDED
                                        </span>
                                        <span className="text-white font-bold text-sm">$2,180</span>
                                    </div>
                                    <div className="text-xs text-slate-400 space-y-0.5">
                                        <div>Ocean Freight - CMA CGM</div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={10} className="text-green-400" />
                                            <span>14 days • 96% on-time rate</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Alternative Options */}
                                <div className="text-xs text-slate-400 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Air Express (DHL): 3 days</span>
                                        <span className="text-slate-300">$8,450</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Ocean Standard: 18 days</span>
                                        <span className="text-slate-300">$1,890</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Proactive AI Alert */}
                        <div className="flex justify-start">
                            <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-orange-300 text-xs font-semibold mb-1">Proactive Alert</p>
                                        <p className="text-slate-300 text-sm">I noticed your shipment #SH-3012 may be affected by upcoming port congestion in Long Beach. Would you like me to explore alternative routing through Oakland?</p>
                                    </div>
                                </div>
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
                    initial={{ opacity: 0, x: 16 }}
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
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#22d3ee]/20 to-[#0EA5E9]/20 flex items-center justify-center text-[#22d3ee] flex-shrink-0 group-hover:scale-110 transition-transform">
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
                className="text-center p-6 rounded-2xl bg-gradient-to-r from-[#22d3ee]/10 to-[#0EA5E9]/10 border border-white/10"
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
function TechnologyStackSection({ selectedProduct }) {
    const allCategories = [
        {
            category: "Data Sources",
            icon: <Database size={20} />,
            technologies: ["AIS Streams", "Port & BIM APIs", "Drone & IoT Sensors", "Weather Data"],
            product: 'both'
        },
        {
            category: "AI & Machine Learning",
            icon: <Cpu size={20} />,
            technologies: ["TensorFlow", "Computer Vision", "Time-Series Forecasting", "NLP Models"],
            product: 'both'
        },
        {
            category: "Infrastructure",
            icon: <Server size={20} />,
            technologies: ["AWS", "Kubernetes", "Redis", "PostgreSQL"],
            product: 'both'
        },
        {
            category: "Construction Tech",
            icon: <HardHat size={20} />,
            technologies: ["BIM Integration", "GPS Fleet Tracking", "Blueprint OCR", "Permit APIs"],
            product: 'construction'
        },
        {
            category: "Logistics Tech",
            icon: <Truck size={20} />,
            technologies: ["Route Optimization Engine", "Global Carrier Integrations", "Customs API", "Freight Indexers"],
            product: 'logistics'
        },
        {
            category: "Security",
            icon: <Lock size={20} />,
            technologies: ["SOC 2 Type II", "End-to-End Encryption", "GDPR Compliant", "ISO 27001"],
            product: 'both'
        }
    ];

    const techCategories = allCategories.filter(cat => cat.product === 'both' || cat.product === selectedProduct);

    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built on Enterprise-Grade Technology</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Powered by the most advanced tools in the industry.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
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
function ComparisonTableSection({ selectedProduct }) {
    const isConstruction = selectedProduct === 'construction';

    const metrics = isConstruction
        ? [
            { value: '10×', label: 'Faster Estimates', desc: 'Blueprint AI analyzes plans in minutes, not days', icon: <Zap size={22} /> },
            { value: '99.2%', label: 'Budget Accuracy', desc: 'AI-powered cash flow forecasting across all phases', icon: <TrendingUp size={22} /> },
            { value: '< 5min', label: 'Setup Time', desc: 'Onboard your first job site in under five minutes', icon: <Clock size={22} /> },
        ]
        : [
            { value: '10×', label: 'Faster Processing', desc: 'Automate customs, routing & compliance end-to-end', icon: <Zap size={22} /> },
            { value: '99.7%', label: 'Prediction Accuracy', desc: 'AI models trained on billions of logistics data points', icon: <TrendingUp size={22} /> },
            { value: '< 5min', label: 'Setup Time', desc: 'Connect your first shipment in under five minutes', icon: <Clock size={22} /> },
        ];

    const transformations = isConstruction
        ? [
            { before: 'Manual takeoffs from paper blueprints', after: 'AI extracts quantities & generates BOMs automatically', icon: <Ruler size={18} /> },
            { before: 'Spreadsheet-based budget guesswork', after: 'Real-time cash flow projections per project phase', icon: <DollarSign size={18} /> },
            { before: 'Reactive theft & loss reporting', after: 'Computer vision monitoring with instant alerts', icon: <Eye size={18} /> },
            { before: 'Word-of-mouth subcontractor sourcing', after: 'AI-scored matching by trade, capacity & track record', icon: <Users size={18} /> },
            { before: 'Disconnected project spreadsheets', after: 'Unified command center across every job site', icon: <Layers size={18} /> },
        ]
        : [
            { before: 'Manual rate comparison across carriers', after: 'AI benchmarks 50+ carriers in real-time', icon: <ArrowRightLeft size={18} /> },
            { before: 'Static tracking with day-old data', after: 'Global digital twin with live vessel positions', icon: <Globe size={18} /> },
            { before: 'Reactive compliance firefighting', after: 'Automated HS classification & duty calculation', icon: <ShieldCheck size={18} /> },
            { before: 'Siloed air, sea & ground systems', after: 'Unified multi-modal visibility in one platform', icon: <Ship size={18} /> },
            { before: 'Manual customs documentation', after: 'AI-generated paperwork with 1-click filing', icon: <FileText size={18} /> },
        ];

    const differentiators = isConstruction
        ? ['No per-seat fees', 'SOC 2 Certified', 'Unlimited job sites', '24/7 AI support']
        : ['No per-shipment fees', 'SOC 2 Certified', 'Unlimited tracking', '24/7 AI support'];

    return (
        <section className="px-6 max-w-6xl mx-auto py-24 relative">
            {/* Section header */}
            <div className="text-center mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-medium mb-6"
                >
                    <Award size={14} className="inline mr-2" />
                    The Gasper Advantage
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-5"
                    style={{ background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    Why Industry Leaders Choose Gasper
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    Purpose-built AI that transforms how {isConstruction ? 'construction teams build' : 'supply chains move'} — from first touch to final delivery.
                </motion.p>
            </div>

            {/* ── Tier 1: Hero Metric Pillars ────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="relative group rounded-2xl overflow-hidden"
                    >
                        {/* Border */}
                        <div className="absolute -inset-[1px] rounded-2xl transition-opacity duration-500 opacity-20 group-hover:opacity-50" style={{ background: 'linear-gradient(135deg, #0EA5E9, #22d3ee)' }} />
                        <div className="absolute inset-[1px] rounded-2xl bg-[#06001a]/95 z-[1]" />

                        <div className="relative z-10 p-8 text-center">
                            <div className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center text-[#22d3ee]" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)' }}>
                                {m.icon}
                            </div>
                            <div className="text-5xl font-black mb-2" style={{ background: 'linear-gradient(135deg, #0EA5E9, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {m.value}
                            </div>
                            <div className="text-white font-semibold text-lg mb-2">{m.label}</div>
                            <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Tier 2: Before / After Transformation Cards ────────── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden mb-8"
            >
                {/* Border */}
                <div className="absolute -inset-[1px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(34,211,238,0.15), rgba(14,165,233,0.2))' }} />
                <div className="absolute inset-[1px] rounded-2xl bg-[#06001a]/90 backdrop-blur-xl z-[1]" />

                <div className="relative z-10">
                    {/* Table header */}
                    <div className="grid grid-cols-[1fr_1fr] border-b border-white/[0.06]">
                        <div className="px-8 py-5 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500/60" />
                            <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Before Gasper</span>
                        </div>
                        <div className="px-8 py-5 flex items-center gap-3 border-l border-white/[0.06]" style={{ background: 'linear-gradient(90deg, rgba(14,165,233,0.04), transparent)' }}>
                            <div className="w-2 h-2 rounded-full bg-[#22d3ee]" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.6)' }} />
                            <span className="text-sm font-semibold uppercase tracking-widest" style={{ background: 'linear-gradient(90deg, #0EA5E9, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>With Gasper</span>
                        </div>
                    </div>

                    {/* Transformation rows */}
                    {transformations.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className="grid grid-cols-[1fr_1fr] border-b border-white/[0.03] last:border-0 group/row hover:bg-white/[0.01] transition-colors duration-300"
                        >
                            {/* Before */}
                            <div className="px-8 py-5 flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-slate-600 flex-shrink-0 mt-0.5">
                                    {t.icon}
                                </div>
                                <span className="text-slate-500 text-[15px] leading-relaxed">{t.before}</span>
                            </div>
                            {/* After */}
                            <div className="px-8 py-5 flex items-start gap-4 border-l border-white/[0.06]" style={{ background: 'linear-gradient(90deg, rgba(14,165,233,0.02), transparent)' }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#22d3ee] flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.1)' }}>
                                    {t.icon}
                                </div>
                                <span className="text-slate-200 text-[15px] leading-relaxed group-hover/row:text-white transition-colors">{t.after}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── Tier 3: Differentiator Strip ────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6"
            >
                {differentiators.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-[#22d3ee]" />
                        <span className="text-slate-400 font-medium">{d}</span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}

// --- Waitlist Section with Email Functionality ---
function WaitlistSection({ selectedProduct }) {
    const defaultRole = selectedProduct === 'construction' ? 'General Contractor' : 'Logistics Manager';

    const [formData, setFormData] = useState({
        email: '',
        role: defaultRole,
        companySize: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setFormData(prev => ({ ...prev, role: defaultRole }));
    }, [defaultRole]);

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
        <section className="px-6 max-w-4xl mx-auto text-center" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y-lg)' }}>
            <div className="relative p-10 md:p-16 rounded-[2rem] overflow-hidden">
                {/* Gradient border */}
                <div
                    className="absolute -inset-[1px] rounded-[2rem] z-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(14,165,233,0.35), rgba(34,211,238,0.25), rgba(16,185,129,0.15), rgba(14,165,233,0.35))',
                        opacity: 0.5,
                    }}
                />
                {/* Glass body */}
                <div className="absolute inset-[1px] rounded-[2rem] bg-[#06001a]/92 backdrop-blur-2xl z-[1]" />
                <div className="relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        Ready to see what's possible?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-400 mb-3 text-lg leading-relaxed max-w-xl mx-auto"
                    >
                        Gasper is currently in private beta. Join the waitlist to be notified when we open to the public.
                    </motion.p>
                    <p className="text-[#22d3ee] text-sm font-semibold mb-10 flex items-center justify-center gap-1.5">
                        <Users size={14} />
                        Limited spots available for the private beta
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
                                className="w-full bg-[#06001a]/80 border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#0EA5E9]/60 focus:ring-1 focus:ring-[#0EA5E9]/40 transition-all placeholder:text-slate-600"
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
                                    className="w-full bg-[#06001a]/80 border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#0EA5E9]/60 focus:ring-1 focus:ring-[#0EA5E9]/40 transition-all appearance-none cursor-pointer"
                                    disabled={status === 'loading'}
                                >
                                    <option value="">Your Role</option>
                                    <option value="Logistics Manager">Logistics Manager</option>
                                    <option value="Operations Director">Operations Director</option>
                                    <option value="Supply Chain VP">Supply Chain VP</option>
                                    <option value="General Contractor">General Contractor</option>
                                    <option value="Project Manager">Project Manager (Construction)</option>
                                    <option value="Site Engineer">Site Engineer</option>
                                    <option value="Construction VP">Construction VP / Owner</option>
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
                                    className="w-full bg-[#06001a]/80 border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#0EA5E9]/60 focus:ring-1 focus:ring-[#0EA5E9]/40 transition-all appearance-none cursor-pointer"
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
                            className={`w-full font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center relative overflow-hidden ${status === 'loading'
                                ? 'bg-[#0EA5E9]/50 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#0EA5E9] to-[#0EA5E9] hover:from-[#0284C7] hover:to-[#0369A1] shadow-lg shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/50'
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
                        <Link to="/terms" className="text-[#22d3ee] hover:text-[#0EA5E9] transition-colors underline">
                            Terms of Service
                        </Link>
                        {', '}
                        <Link to="/privacy" className="text-[#22d3ee] hover:text-[#0EA5E9] transition-colors underline">
                            Privacy Policy
                        </Link>
                        {', and '}
                        <Link to="/cookies" className="text-[#22d3ee] hover:text-[#0EA5E9] transition-colors underline">
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
                        className="p-6 rounded-2xl bg-[#06001a]/60 border border-[#0EA5E9]/15 backdrop-blur-xl hover:border-[#0EA5E9]/40 transition-all group"
                    >
                        <div className="w-14 h-14 rounded-xl bg-[#0EA5E9]/20 flex items-center justify-center text-[#0EA5E9] mb-4 group-hover:scale-110 transition-transform">
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
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Visual Side (Left) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
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
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 md:order-2 flex flex-col items-start"
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider mb-6">
                        <DollarSign size={12} className="mr-2" /> COST OPTIMIZATION
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Smart Rate Comparison</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Stop overpaying for freight. Gasper aggregates real-time rates from hundreds of carriers, highlighting the best balance of speed, cost, and reliability for every shipment.
                    </p>

                    <div className="space-y-6 w-full">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-500">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Instant Quotes</h4>
                                <p className="text-slate-400 text-sm">Get bookable spot rates in seconds, not days. Compare across air, ocean, and rail instantly.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex-shrink-0 flex items-center justify-center text-indigo-500">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Hidden Fee Detection</h4>
                                <p className="text-slate-400 text-sm">Our AI scans for surcharges and hidden fees, ensuring the price you see is the price you pay.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}



export default function ComingSoonContent({ selectedProduct }) {
    return (
        <div className="relative">

            {/* Particles Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <Particles
                    particleColors={["#0EA5E9", "#22d3ee", "#14B8A6"]}
                    particleCount={60}
                    particleSpread={10}
                    speed={0.02}
                    particleBaseSize={30}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                    sizeRandomness={1.2}
                    cameraDistance={30}
                    pixelRatio={Math.min(window.devicePixelRatio, 1.5)}
                />
            </div>

            {/* ══════════════ STATS SECTION ══════════════ */}
            <section className="px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-sm uppercase tracking-[0.2em] font-semibold mb-4"
                    >
                        {selectedProduct === 'construction' ? 'Construction Intelligence' : 'Global Logistics Intelligence'}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white"
                    >
                        By the Numbers
                    </motion.h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {selectedProduct === 'logistics' ? (
                        <>
                            <Counter value={5000} label="Connected Vessels" suffix="+" />
                            <Counter value={98} label="Accuracy Rating" suffix="%" />
                            <Counter value={120} label="Countries Covered" suffix="+" />
                            <Counter value={50} label="Routes Analyzed (M)" suffix="M+" />
                        </>
                    ) : (
                        <>
                            <Counter value={850} label="Active Job Sites" suffix="+" />
                            <Counter value={99} label="Safety Score" suffix="%" />
                            <Counter value={5} label="Managed Value ($B)" suffix="B+" />
                            <Counter value={20} label="Blueprints Analyzed (M)" suffix="M+" />
                        </>
                    )}
                </div>
            </section>

            <div className="section-divider" />

            {/* ══════════════ FEATURES SECTION ══════════════ */}
            {selectedProduct === 'logistics' && (
                <section className="px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-medium mb-6"
                        >
                            Core Capabilities
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                            style={{ letterSpacing: '-0.03em' }}
                        >
                            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#22d3ee]">Beyond Boundaries</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
                        >
                            A comprehensive suite of AI-powered tools designed to give you total visibility and control over your global operations.
                        </motion.p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
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
            )}

            {/* --- CONSTRUCTION FEATURES --- */}
            {selectedProduct === 'construction' && <ConstructionFeaturesSection />}

            <div className="section-divider" />

            {/* ══════════════ COMPARISON / ADVANTAGES ══════════════ */}
            <ComparisonTableSection selectedProduct={selectedProduct} />

            <div className="section-divider" />

            {/* --- LOGISTICS DEEP DIVES --- */}
            {selectedProduct === 'logistics' && (
                <>
                    <DigitalTwinSection />
                    <RiskMonitorSection />
                    <SustainabilitySection />
                    <RateCheckSection />
                </>
            )}

            {/* --- CONSTRUCTION DEEP DIVES --- */}
            {selectedProduct === 'construction' && (
                <>
                    <BlueprintAISection />
                    <CashFlowSection />
                    <SiteSecuritySection />
                </>
            )}

            {/* --- CONSTRUCTION ADVANCED SECTIONS --- */}
            {selectedProduct === 'construction' && (
                <>
                    <SubcontractorMatchSection />
                    <ProjectCommandCenter />
                    <ROIImpactSection />
                    <ScheduleOptimizerSection />
                </>
            )}

            <div className="section-divider" />

            {/* ══════════════ TECHNOLOGY STACK ══════════════ */}
            <TechnologyStackSection selectedProduct={selectedProduct} />

            <div className="section-divider" />

            {/* ══════════════ HOW IT WORKS ══════════════ */}
            {selectedProduct === 'logistics' && (
                <section className="px-6 max-w-7xl mx-auto relative" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                    <div className="text-center mb-24">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-slate-500 text-sm uppercase tracking-[0.2em] font-semibold mb-4"
                        >
                            From chaos to clarity
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                            style={{ letterSpacing: '-0.03em' }}
                        >
                            How Gasper Works
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-slate-400 max-w-2xl mx-auto text-lg"
                        >
                            From unstructured chaos to actionable intelligence in three steps.
                        </motion.p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 transform -translate-x-1/2 h-full z-0">
                            <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-[#0EA5E9] via-[#22d3ee] to-[#0EA5E9] opacity-50 shadow-[0_0_15px_#0EA5E9]" />
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
            )}

            <div className="section-divider" />

            {/* ══════════════ INDUSTRIES ══════════════ */}
            <section className="px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-sm uppercase tracking-[0.2em] font-semibold mb-4"
                    >
                        Built for your sector
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        Engineered for Every Sector
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Tailored solutions for the unique challenges of your industry.
                    </motion.p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selectedProduct === 'logistics' && (
                        <>
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
                                icon={<Factory size={28} />}
                                title="Manufacturing"
                                description="Secure your supply chain against disruptions and monitor raw material shipments."
                                color="text-purple-400"
                                useCase="Supplier Risk Monitoring"
                            />
                        </>
                    )}
                    {selectedProduct === 'construction' && (
                        <>
                            <IndustryCard
                                icon={<HardHat size={28} />}
                                title="General Contracting"
                                description="AI-powered project management, cash flow forecasting, and compliance automation for GCs."
                                color="text-[#FF6B00]"
                                useCase="Full Project Lifecycle Intelligence"
                            />
                            <IndustryCard
                                icon={<Building2 size={28} />}
                                title="Commercial Construction"
                                description="Manage multi-million dollar builds with blueprint AI, sub matching, and real-time cost tracking."
                                color="text-amber-400"
                                useCase="Blueprint Analysis & Cost Optimization"
                            />
                            <IndustryCard
                                icon={<Fuel size={28} />}
                                title="Energy & Infrastructure"
                                description="Monitor energy projects and react instantly to safety and compliance events."
                                color="text-red-400"
                                useCase="Safety Compliance & Asset Protection"
                            />
                        </>
                    )}
                </div>
            </section>

            <div className="section-divider" />

            {/* ══════════════ AI BOT ══════════════ */}
            <GasperAIBotSection />

            {/* ══════════════ WHAT YOU'LL GET ══════════════ */}
            <WhatYouGetSection />

            <div className="section-divider" />

            {/* ══════════════ WAITLIST ══════════════ */}
            <div id="waitlist-section">
                <WaitlistSection selectedProduct={selectedProduct} />
            </div>

        </div>
    );
}

