import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Ship, HardHat, Activity, ShieldCheck, Zap, Globe, Lock,
    Layers, TrendingUp, MonitorPlay, BarChart3, Database,
    Server, Brain, FileText, Send, MapPin, Wrench, Ruler,
    Boxes, FileSearch, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';
import Particles from '../components/Particles/Particles';
import FeatureCard from '../components/FeatureCard';

export default function FeaturesPage() {
    const [activeTab, setActiveTab] = useState('logistics');

    // Dynamic colors based on active tab
    const primaryColor = activeTab === 'logistics' ? '#5227FF' : '#FF6B00';
    const secondaryColor = activeTab === 'logistics' ? '#22d3ee' : '#F59E0B';
    const bgGlow = activeTab === 'logistics' ? 'rgba(82, 39, 255, 0.15)' : 'rgba(255, 107, 0, 0.15)';

    return (
        <div className="landing-container pt-24 pb-20 relative min-h-screen bg-[#050505]">
            {/* Dynamic Particles Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 transition-colors duration-1000" style={{ backgroundColor: '#050505' }}>
                <Particles
                    key={activeTab} // Force re-render to change colors smoothly
                    particleColors={[primaryColor, secondaryColor, '#ffffff']}
                    particleCount={300}
                    particleSpread={15}
                    speed={0.06}
                    particleBaseSize={60}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                    sizeRandomness={1.2}
                    cameraDistance={25}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero / Command Center Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 text-sm font-medium text-slate-300 shadow-xl"
                    >
                        <Zap size={14} className="text-yellow-400" />
                        Master Command Center
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
                    >
                        Intelligence <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>Beyond Boundaries</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Select your operational domain below to explore the advanced capabilities of the Gasper AI ecosystem.
                    </motion.p>
                </div>

                {/* Domain Toggle Tabs */}
                <div className="flex justify-center mb-20">
                    <div className="inline-flex p-1.5 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl relative">
                        {/* Tab Background Highlight */}
                        <motion.div
                            className="absolute inset-y-1.5 rounded-xl bg-white/10 shadow-lg"
                            initial={false}
                            animate={{
                                x: activeTab === 'logistics' ? 0 : '100%',
                                width: '50%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <button
                            onClick={() => setActiveTab('logistics')}
                            className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 w-48 justify-center ${activeTab === 'logistics' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Ship size={20} className={activeTab === 'logistics' ? 'text-[#22d3ee]' : ''} />
                            Logistics
                        </button>

                        <button
                            onClick={() => setActiveTab('construction')}
                            className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 w-48 justify-center ${activeTab === 'construction' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <HardHat size={20} className={activeTab === 'construction' ? 'text-[#F59E0B]' : ''} />
                            Construction
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[800px]">
                    <AnimatePresence mode="wait">
                        {/* LOGISTICS ECOSYSTEM */}
                        {activeTab === 'logistics' && (
                            <motion.div
                                key="logistics"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Glowing Diagram Section */}
                                <div className="mb-24 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#5227FF]/10 to-[#22d3ee]/10 blur-3xl -z-10 rounded-[3rem]" />
                                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
                                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                                            <div>
                                                <h2 className="text-3xl font-bold text-white mb-6">The Global <span className="text-[#22d3ee]">Digital Twin</span></h2>
                                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                                    Gasper Logistics constructs a real-time, living model of your entire supply chain. We ingest massive streams of AIS satellite data, customs records, and weather patterns to predict delays before they happen.
                                                </p>
                                                <ul className="space-y-4 mb-8">
                                                    {[
                                                        { icon: <Globe className="text-[#5227FF]" />, text: "Live AIS Vessel Tracking" },
                                                        { icon: <ShieldCheck className="text-[#22d3ee]" />, text: "Geopolitical Risk Overlays" },
                                                        { icon: <TrendingUp className="text-[#8b5cf6]" />, text: "Predictive ETA Modeling" }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                                            <div className="p-2 bg-white/5 rounded-lg">{item.icon}</div>
                                                            <span className="text-white font-medium">{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Link to="/gasper" className="inline-flex items-center text-[#22d3ee] font-semibold hover:text-white transition-colors">
                                                    Launch Logistics OS <ArrowRight size={18} className="ml-2" />
                                                </Link>
                                            </div>

                                            {/* Abstract Diagram Visualization */}
                                            <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-[#5227FF]/20 to-[#0a0a0a] border border-[#5227FF]/30 flex items-center justify-center group overflow-hidden">
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                                                {/* Core Node */}
                                                <motion.div
                                                    animate={{ boxShadow: ['0 0 20px #5227FF', '0 0 60px #22d3ee', '0 0 20px #5227FF'] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                    className="w-24 h-24 rounded-full bg-[#1e1b4b] border-2 border-[#5227FF] z-10 flex items-center justify-center relative"
                                                >
                                                    <Activity className="text-[#22d3ee] w-10 h-10" />
                                                    {/* Pulsing rings */}
                                                    <div className="absolute inset-0 rounded-full border border-[#22d3ee]/50 animate-ping" style={{ animationDuration: '3s' }} />
                                                </motion.div>

                                                {/* Connected Nodes */}
                                                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center"><Ship size={20} className="text-blue-300" /></div>
                                                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500 flex items-center justify-center"><Database size={20} className="text-purple-300" /></div>
                                                <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-cyan-900/50 border border-cyan-500 flex items-center justify-center"><Globe size={20} className="text-cyan-300" /></div>

                                                {/* Connecting Lines (Svg overlay) */}
                                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                                    <path d="M 50% 50% L 25% 25%" stroke="#5227FF" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                                                    <path d="M 50% 50% L 75% 75%" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                                                    <path d="M 50% 50% L 75% 33%" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <FeatureCard
                                        icon={<ShieldCheck size={28} />}
                                        title="Risk Intelligence Shield"
                                        description="Continuous screening of your supply chain against sanctions, adverse media, and regulatory changes globally."
                                        details={['Geopolitical Alerts', 'Sanctions Screening', 'Adverse Media Monitoring']}
                                        color="text-[#5227FF]"
                                    />
                                    <FeatureCard
                                        icon={<BarChart3 size={28} />}
                                        title="Freight Rate Analytics"
                                        description="AI-driven benchmarking compares your negotiated rates against live spot market data to ensure you never overpay."
                                        details={['Live Spot Rates', 'Historical Benchmarking', 'Cost Anomaly Detection']}
                                        color="text-[#22d3ee]"
                                    />
                                    <FeatureCard
                                        icon={<Brain size={28} />}
                                        title="Automated HS Classifier"
                                        description="Upload commercial invoices and our NLP engine instantly assigns the correct 6-digit HS codes with 99.8% accuracy."
                                        details={['NLP Invoice Parsing', 'Global Tariff DB Sync', 'Compliance Audit Trail']}
                                        color="text-[#8b5cf6]"
                                    />
                                    <FeatureCard
                                        icon={<Layers size={28} />}
                                        title="Multi-Modal Visibility"
                                        description="Track ocean freight, air cargo, and final-mile trucking on a single, unified map interface."
                                        details={['Ocean AIS Tracking', 'Air Cargo API Sync', 'Truck Telematics']}
                                        color="text-[#5227FF]"
                                    />
                                    <FeatureCard
                                        icon={<FileText size={28} />}
                                        title="Smart Doc Digitization"
                                        description="Convert chaotic PDF Bills of Lading and Packing Lists into structured, searchable digital assets."
                                        details={['Multi-language OCR', 'Bill of Lading Extraction', 'Packing List Parsing']}
                                        color="text-[#22d3ee]"
                                    />
                                    <FeatureCard
                                        icon={<Server size={28} />}
                                        title="Enterprise ERP Sync"
                                        description="Native integrations with SAP, Oracle, and Microsoft Dynamics for bi-directional data flow."
                                        details={['SAP Native Connectors', 'Oracle NetSuite Sync', 'RESTful API Limits']}
                                        color="text-[#8b5cf6]"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* CONSTRUCTION ECOSYSTEM */}
                        {activeTab === 'construction' && (
                            <motion.div
                                key="construction"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Glowing Diagram Section */}
                                <div className="mb-24 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/10 to-[#F59E0B]/10 blur-3xl -z-10 rounded-[3rem]" />
                                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
                                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                                            <div className="order-2 lg:order-1">
                                                <h2 className="text-3xl font-bold text-white mb-6">Generative <span className="text-[#FF6B00]">Blueprint AI</span></h2>
                                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                                    Gasper Construction transforms static 2D PDFs and CAD files into interactive, actionable intelligence. Automate takeoffs, detect structural clashes, and generate optimized build schedules instantly.
                                                </p>
                                                <ul className="space-y-4 mb-8">
                                                    {[
                                                        { icon: <Ruler className="text-[#FF6B00]" />, text: "Automated Material Takeoffs" },
                                                        { icon: <FileSearch className="text-[#F59E0B]" />, text: "AI-Powered Clash Detection" },
                                                        { icon: <MonitorPlay className="text-[#fb923c]" />, text: "4D Schedule Simulation" }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                                            <div className="p-2 bg-white/5 rounded-lg">{item.icon}</div>
                                                            <span className="text-white font-medium">{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Link to="/gasper/construction" className="inline-flex items-center text-[#FF6B00] font-semibold hover:text-white transition-colors">
                                                    Launch Construction AI <ArrowRight size={18} className="ml-2" />
                                                </Link>
                                            </div>

                                            {/* Abstract Diagram Visualization */}
                                            <div className="order-1 lg:order-2 relative h-[400px] rounded-2xl bg-gradient-to-bl from-[#FF6B00]/20 to-[#0a0a0a] border border-[#FF6B00]/30 flex items-center justify-center group overflow-hidden">
                                                {/* Blueprint grid background */}
                                                <div className="absolute inset-0" style={{
                                                    backgroundImage: 'linear-gradient(rgba(255, 107, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 0, 0.1) 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px'
                                                }} />

                                                {/* Core Node */}
                                                <motion.div
                                                    animate={{ boxShadow: ['0 0 20px #FF6B00', '0 0 60px #F59E0B', '0 0 20px #FF6B00'] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                    className="w-24 h-24 rounded-full bg-[#451a03] border-2 border-[#FF6B00] z-10 flex items-center justify-center relative shadow-2xl"
                                                >
                                                    <Brain className="text-[#F59E0B] w-10 h-10" />
                                                    {/* Scanning line effect */}
                                                    <motion.div
                                                        className="absolute inset-x-0 h-1 bg-[#FF6B00] shadow-[0_0_10px_#FF6B00]"
                                                        animate={{ top: ['0%', '100%', '0%'] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    />
                                                </motion.div>

                                                {/* Connected Nodes */}
                                                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-lg bg-orange-900/50 border border-orange-500 flex items-center justify-center transform rotate-12"><FileText size={20} className="text-orange-300" /></div>
                                                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-lg bg-amber-900/50 border border-amber-500 flex items-center justify-center transform -rotate-6"><HardHat size={20} className="text-amber-300" /></div>
                                                <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-lg bg-yellow-900/50 border border-yellow-500 flex items-center justify-center transform rotate-45"><Wrench size={20} className="text-yellow-300" /></div>

                                                {/* Connecting Lines (Svg overlay) */}
                                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                                    <path d="M 50% 50% L 25% 25%" stroke="#FF6B00" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                                                    <path d="M 50% 50% L 75% 75%" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                                                    <path d="M 50% 50% L 75% 33%" stroke="#fb923c" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <FeatureCard
                                        icon={<Activity size={28} />}
                                        title="Cash Flow Guardian"
                                        description="Predictive financial modeling that anticipates budget overruns based on historical project data and current market material costs."
                                        details={['Live Material Cost Index', 'Budget Variance Alerts', 'Pay Application Sync']}
                                        color="text-[#FF6B00]"
                                    />
                                    <FeatureCard
                                        icon={<ShieldCheck size={28} />}
                                        title="Predictive Site Safety"
                                        description="AI vision systems analyze site camera feeds to identify PPE violations and potential safety hazards in real-time."
                                        details={['PPE Detection', 'Fall Hazard Alerts', 'Automated Safety Logs']}
                                        color="text-[#F59E0B]"
                                    />
                                    <FeatureCard
                                        icon={<Wrench size={28} />}
                                        title="Equipment Maintenance"
                                        description="IoT sensors on heavy machinery feed data to our AI, predicting mechanical failures before they impact your schedule."
                                        details={['IoT Telematics', 'Failure Prediction', 'Automated Dispatch']}
                                        color="text-[#fb923c]"
                                    />
                                    <FeatureCard
                                        icon={<Boxes size={28} />}
                                        title="Just-in-Time Materials"
                                        description="Integrates with our Logistics OS to track material shipments, ensuring steel and concrete arrive exactly when needed."
                                        details={['Logistics OS Sync', 'Laydown Area Optimization', 'Delivery Sequencing']}
                                        color="text-[#FF6B00]"
                                    />
                                    <FeatureCard
                                        icon={<MapPin size={28} />}
                                        title="Drone Topology Map"
                                        description="Process drone imagery into 3D site models to calculate cut/fill volumes with extreme precision automatically."
                                        details={['3D Photogrammetry', 'Cut/Fill Calculation', 'As-Built vs Design']}
                                        color="text-[#F59E0B]"
                                    />
                                    <FeatureCard
                                        icon={<Server size={28} />}
                                        title="Procore / BIM Sync"
                                        description="Seamlessly push our AI insights directly into your existing Procore, Autodesk Construction Cloud, or BIM 360 instances."
                                        details={['Procore Bi-Directional', 'Autodesk Build API', 'IFC Model Support']}
                                        color="text-[#fb923c]"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Global Bottom CTA */}
                <motion.div
                    className="mt-20 border-t border-white/10 pt-16 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to upgrade your operations?</h2>
                    <p className="text-slate-400 mb-8">Whether you are moving freight across the ocean or building skyscrapers, Gasper provides the intelligence you need to succeed.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1" style={{ background: primaryColor, boxShadow: `0 10px 25px ${bgGlow}` }}>
                            Request Enterprise Demo
                        </Link>
                        <Link to="/pricing" className="px-8 py-4 rounded-xl font-bold text-white transition-all border border-white/20 bg-white/5 hover:bg-white/10">
                            View Pricing Options
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
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
