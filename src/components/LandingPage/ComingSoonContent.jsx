import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'motion/react';
import {
    Activity, TrendingUp, ShieldCheck, Grid, Zap, Globe, Lock,
    Database, Cpu, Server, BarChart3,
    Anchor, Truck, ShoppingBag, Factory, Wheat, Fuel, HardHat, Stethoscope, Plane,
    CheckCircle2, ArrowRight, Mail, Layers, AlertTriangle, MonitorPlay
} from 'lucide-react';
import TiltCard from '../TiltCard';

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

// --- Main Content Component ---

export default function ComingSoonContent() {
    return (
        <div className="mt-20 space-y-32 relative">

            {/* Background Ambient Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#5227FF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
                <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] bg-[#22d3ee] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-purple-900 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
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

            {/* --- NEW DEEP DIVE SECTIONS --- */}
            <DigitalTwinSection />
            <RiskMonitorSection />

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

            {/* --- WAITLIST SECTION --- */}
            <section className="px-6 max-w-3xl mx-auto pb-32 text-center">
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#5227FF]/20 to-purple-900/20 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                    <div className="relative z-10">
                        <Zap size={40} className="mx-auto text-[#5227FF] mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Secure Your Access</h2>
                        <p className="text-slate-300 mb-8">
                            Gasper is currently in private beta. Join the waitlist to be notificated when we open to the public.
                        </p>

                        <form className="max-w-md mx-auto relative flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#5227FF] focus:ring-1 focus:ring-[#5227FF] transition-all placeholder:text-slate-500"
                                />
                            </div>
                            <button
                                type="button"
                                className="bg-[#5227FF] hover:bg-[#4316db] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-[#5227FF]/25 flex items-center justify-center whitespace-nowrap"
                            >
                                Request Access <ArrowRight size={18} className="ml-2" />
                            </button>
                        </form>
                        <p className="mt-4 text-xs text-slate-500">
                            By joining, you agree to our Terms of Service. No spam, ever.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}
