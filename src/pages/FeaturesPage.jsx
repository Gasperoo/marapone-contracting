import React from 'react';
import { motion } from 'motion/react';
import {
    Activity, TrendingUp, ShieldCheck, Grid, Zap, Globe, Lock, Layers,
    AlertTriangle, MonitorPlay, BarChart3, Leaf, Wind, Ship, DollarSign,
    Clock, Bot, MessageSquare, Brain, FileText, Send, MapPin, Database,
    Cpu, Server, Sparkles, Check, X, Award, TrendingDown, Star, Plane,
    HardHat, Ruler, Boxes, Wrench, FileSearch
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';
import FeatureCard from '../components/FeatureCard';
import Particles from '../components/Particles/Particles';

export default function FeaturesPage() {
    return (
        <div className="landing-container pt-24 pb-20 relative">
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

            <div className="max-w-7xl mx-auto px-6">

                {/* Hero */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title mb-6 mx-auto"
                    >
                        Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee]">Beyond Boundaries</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        A comprehensive suite of AI-powered tools for logistics intelligence and construction management — total visibility and control.
                    </motion.p>
                </div>

                {/* Logistics Feature Grid */}
                <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#5227FF]/30 bg-[#5227FF]/10 text-[#5227FF] text-xs font-bold tracking-wider mb-6">
                        <Ship size={12} className="mr-2" /> LOGISTICS INTELLIGENCE
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-32">
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

                {/* Construction Feature Grid */}
                <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                        <HardHat size={12} className="mr-2" /> CONSTRUCTION INTELLIGENCE
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    <FeatureCard
                        icon={<FileSearch size={32} />}
                        title="Blueprint AI"
                        description="Upload any blueprint or plan — our AI detects walls, doors, MEP systems, and dimensions with 99% accuracy."
                        details={['Element Detection', 'Dimension Extraction', 'Code Compliance', 'Material Quantification']}
                    />
                    <FeatureCard
                        icon={<Brain size={32} />}
                        title="AI Construction Planner"
                        description="Generate optimized construction schedules with critical path analysis, risk prediction, and resource planning."
                        details={['Gantt Generation', 'Critical Path AI', 'Weather Impact', 'Resource Optimizer']}
                    />
                    <FeatureCard
                        icon={<Boxes size={32} />}
                        title="Generative Design"
                        description="Input your constraints and let AI generate optimized design variants scored by space utilization, cost, and structural integrity."
                        details={['3D Visualization', 'Multi-variant Scoring', 'Structural Analysis', 'Space Optimization']}
                    />
                    <FeatureCard
                        icon={<Wrench size={32} />}
                        title="Predictive Maintenance"
                        description="IoT-connected equipment monitoring with AI-powered failure prediction and automated maintenance scheduling."
                        details={['Sensor Monitoring', 'Failure Prediction', 'Cost-of-Failure', 'Smart Scheduling']}
                    />
                </div>

                {/* Digital Twin Deep Dive */}
                <DigitalTwinSection />

                {/* Risk Monitor Deep Dive */}
                <RiskMonitorSection />

                {/* Sustainability Deep Dive */}
                <SustainabilitySection />

                {/* Rate Check Deep Dive */}
                <RateCheckSection />

                {/* Gasper AI Bot Section */}
                <GasperAIBotSection />

                {/* Technology Stack */}
                <TechnologyStackSection />

                {/* Comparison Table */}
                <ComparisonTableSection />

                {/* Secondary Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <SmallFeatureCard
                        icon={<Zap size={24} />}
                        title="Instant API Access"
                        desc="Connect Gasper directly to your ERP or TMS with our robust REST API."
                    />
                    <SmallFeatureCard
                        icon={<Globe size={24} />}
                        title="Global Coverage"
                        desc="Data from 200+ countries and territories, localizing insights for your specific lanes."
                    />
                    <SmallFeatureCard
                        icon={<Lock size={24} />}
                        title="Enterprise Security"
                        desc="SOC 2 Type II compliant with end-to-end encryption for all sensitive data."
                    />
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to see it in action?</h2>
                    <Link to="/gasper" className="btn-primary inline-flex items-center">
                        Launch Console
                    </Link>
                </div>

            </div>
        </div>
    );
}

// Digital Twin Deep Dive Section
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

// Risk Monitor Deep Dive Section
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
                                <Ship size={24} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Sustainability Deep Dive Section
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

// Rate Check Deep Dive Section
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
                                                <Ship size={20} className="text-black/50" />
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

// Gasper AI Bot Section
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

// Technology Stack Section
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

// Comparison Table Section
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
                                Join <span className="text-[#5227FF] font-bold">2,500+</span> companies already using Gasper
                            </p>
                            <TrendingUp size={20} className="text-[#5227FF]" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function SmallFeatureCard({ icon, title, desc }) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/5">
            <div className="text-[#5227FF] mb-3">{icon}</div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-sm text-slate-400">{desc}</p>
        </div>
    );
}
