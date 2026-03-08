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
    const primaryColor = activeTab === 'logistics' ? '#0EA5E9' : '#FF6B00';
    const secondaryColor = activeTab === 'logistics' ? '#38BDF8' : '#F59E0B';
    const bgGlow = activeTab === 'logistics' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 107, 0, 0.15)';

    return (
        <div className="landing-container pt-24 pb-20 relative min-h-screen">
            {/* Dynamic Particles Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 transition-colors duration-1000" style={{ backgroundColor: '#F5F5F5' }}>
                <Particles
                    key={activeTab} // Force re-render to change colors smoothly
                    particleColors={[primaryColor, secondaryColor, '#1a1a1a']}
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
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-md mb-6 text-sm font-medium text-[#4b5563] shadow-md"
                    >
                        <Zap size={14} className="text-[#FF6B00]" />
                        Master Command Center
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-6xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight"
                    >
                        Intelligence <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>Beyond Boundaries</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] max-w-2xl mx-auto leading-relaxed"
                    >
                        Select your operational domain below to explore the advanced capabilities of the Gasper AI ecosystem.
                    </motion.p>
                </div>

                {/* Domain Toggle Tabs */}
                <div className="flex justify-center mb-20">
                    <div className="inline-flex p-1.5 bg-white border border-black/5 rounded-2xl shadow-lg relative">
                        {/* Tab Background Highlight */}
                        <motion.div
                            className="absolute inset-y-1.5 rounded-xl bg-black/5 shadow-sm"
                            initial={false}
                            animate={{
                                x: activeTab === 'logistics' ? 0 : '100%',
                                width: '50%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <button
                            onClick={() => setActiveTab('logistics')}
                            className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 w-48 justify-center ${activeTab === 'logistics' ? 'text-[#1a1a1a]' : 'text-[#4b5563] hover:text-[#1a1a1a]'}`}
                        >
                            <Ship size={20} className={activeTab === 'logistics' ? 'text-[#0EA5E9]' : ''} />
                            Logistics
                        </button>

                        <button
                            onClick={() => setActiveTab('construction')}
                            className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 w-48 justify-center ${activeTab === 'construction' ? 'text-[#1a1a1a]' : 'text-[#4b5563] hover:text-[#1a1a1a]'}`}
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
                        {activeTab === 'logistics' ? (
                            <motion.div
                                key="logistics"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Glowing Diagram Section */}
                                <div className="mb-24 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-[#38BDF8]/10 blur-3xl -z-10 rounded-[3rem]" />
                                    <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl">
                                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                                            <div>
                                                <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">The Global <span className="text-[#0EA5E9]">Digital Twin</span></h2>
                                                <p className="text-[#4b5563] text-lg mb-8 leading-relaxed">
                                                    Gasper Logistics constructs a real-time, living model of your entire supply chain. We ingest massive streams of AIS satellite data, customs records, and weather patterns to predict delays before they happen.
                                                </p>
                                                <ul className="space-y-4 mb-8">
                                                    {[
                                                        { icon: <Globe className="text-[#0EA5E9]" />, text: "Live AIS Vessel Tracking" },
                                                        { icon: <ShieldCheck className="text-[#38BDF8]" />, text: "Geopolitical Risk Overlays" },
                                                        { icon: <TrendingUp className="text-[#0EA5E9]" />, text: "Predictive ETA Modeling" }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center gap-4 bg-black/5 p-4 rounded-xl border border-black/5 hover:bg-black/10 transition-colors">
                                                            <div className="p-2 bg-white rounded-lg shadow-sm">{item.icon}</div>
                                                            <span className="text-[#1a1a1a] font-medium">{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Link to="/gasper" className="inline-flex items-center text-[#0EA5E9] font-bold hover:text-[#38BDF8] transition-colors group">
                                                    Launch Logistics OS <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>

                                            {/* Abstract Diagram Visualization */}
                                            <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-[#0EA5E9]/10 to-[#F5F5F5] border border-[#0EA5E9]/20 flex items-center justify-center group overflow-hidden">
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                                {/* Core Node */}
                                                <motion.div
                                                    animate={{ boxShadow: ['0 0 20px #0EA5E9', '0 0 60px #38BDF8', '0 0 20px #0EA5E9'] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                    className="w-24 h-24 rounded-full bg-white border-2 border-[#0EA5E9] z-10 flex items-center justify-center relative shadow-lg"
                                                >
                                                    <Activity className="text-[#0EA5E9] w-10 h-10" />
                                                    {/* Pulsing rings */}
                                                    <div className="absolute inset-0 rounded-full border border-[#0EA5E9]/50 animate-ping" style={{ animationDuration: '3s' }} />
                                                </motion.div>

                                                {/* Connected Nodes */}
                                                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center shadow-sm"><Ship size={20} className="text-[#0EA5E9]" /></div>
                                                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center shadow-sm"><Database size={20} className="text-[#38BDF8]" /></div>
                                                <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center shadow-sm"><Globe size={20} className="text-[#0EA5E9]" /></div>

                                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                                    <path d="M 50 50 L 25 25" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                                                    <path d="M 50 50 L 75 75" stroke="#38BDF8" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                                                    <path d="M 50 50 L 75 33" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
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
                                        color="text-[#0EA5E9]"
                                    />
                                    <FeatureCard
                                        icon={<BarChart3 size={28} />}
                                        title="Freight Rate Analytics"
                                        description="AI-driven benchmarking compares your negotiated rates against live spot market data to ensure you never overpay."
                                        details={['Live Spot Rates', 'Historical Benchmarking', 'Cost Anomaly Detection']}
                                        color="text-[#38BDF8]"
                                    />
                                    <FeatureCard
                                        icon={<Brain size={28} />}
                                        title="Automated HS Classifier"
                                        description="Upload commercial invoices and our NLP engine instantly assigns the correct 6-digit HS codes with 99.8% accuracy."
                                        details={['NLP Invoice Parsing', 'Global Tariff DB Sync', 'Compliance Audit Trail']}
                                        color="text-[#0EA5E9]"
                                    />
                                    <FeatureCard
                                        icon={<Layers size={28} />}
                                        title="Multi-Modal Visibility"
                                        description="Track ocean freight, air cargo, and final-mile trucking on a single, unified map interface."
                                        details={['Ocean AIS Tracking', 'Air Cargo API Sync', 'Truck Telematics']}
                                        color="text-[#38BDF8]"
                                    />
                                    <FeatureCard
                                        icon={<FileText size={28} />}
                                        title="Smart Doc Digitization"
                                        description="Convert chaotic PDF Bills of Lading and Packing Lists into structured, searchable digital assets."
                                        details={['Multi-language OCR', 'Bill of Lading Extraction', 'Packing List Parsing']}
                                        color="text-[#0EA5E9]"
                                    />
                                    <FeatureCard
                                        icon={<Server size={28} />}
                                        title="Enterprise ERP Sync"
                                        description="Native integrations with SAP, Oracle, and Microsoft Dynamics for bi-directional data flow."
                                        details={['SAP Native Connectors', 'Oracle NetSuite Sync', 'RESTful API Limits']}
                                        color="text-[#38BDF8]"
                                    />
                                </div>
                            </motion.div>
                        ) : activeTab === 'construction' ? (
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
                                    <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl">
                                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                                            <div className="order-2 lg:order-1">
                                                <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">Generative <span className="text-[#F59E0B]">Blueprint AI</span></h2>
                                                <p className="text-[#4b5563] text-lg mb-8 leading-relaxed">
                                                    Gasper Construction transforms static 2D PDFs and CAD files into interactive, actionable intelligence. Automate takeoffs, detect structural clashes, and generate optimized build schedules instantly.
                                                </p>
                                                <ul className="space-y-4 mb-8">
                                                    {[
                                                        { icon: <Ruler className="text-[#FF6B00]" />, text: "Automated Material Takeoffs" },
                                                        { icon: <FileSearch className="text-[#F59E0B]" />, text: "AI-Powered Clash Detection" },
                                                        { icon: <MonitorPlay className="text-[#fb923c]" />, text: "4D Schedule Simulation" }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center gap-4 bg-black/5 p-4 rounded-xl border border-black/5 hover:bg-black/10 transition-colors">
                                                            <div className="p-2 bg-white rounded-lg shadow-sm">{item.icon}</div>
                                                            <span className="text-[#1a1a1a] font-medium">{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Link to="/gasper/construction" className="inline-flex items-center text-[#F59E0B] font-bold hover:text-[#FF6B00] transition-colors group">
                                                    Launch Construction AI <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>

                                            {/* Abstract Diagram Visualization */}
                                            <div className="order-1 lg:order-2 relative h-[400px] rounded-2xl bg-gradient-to-bl from-[#F59E0B]/10 to-[#F5F5F5] border border-[#F59E0B]/20 flex items-center justify-center group overflow-hidden">
                                                {/* Blueprint grid background */}
                                                <div className="absolute inset-0" style={{
                                                    backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px'
                                                }} />

                                                {/* Core Node */}
                                                <motion.div
                                                    animate={{ boxShadow: ['0 0 20px #FF6B00', '0 0 60px #F59E0B', '0 0 20px #FF6B00'] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                    className="w-24 h-24 rounded-full bg-white border-2 border-[#FF6B00] z-10 flex items-center justify-center relative shadow-xl"
                                                >
                                                    <Brain className="text-[#F59E0B] w-10 h-10" />
                                                    {/* Scanning line effect */}
                                                    <motion.div
                                                        className="absolute inset-x-0 h-1 bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]"
                                                        animate={{ top: ['0%', '100%', '0%'] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    />
                                                </motion.div>

                                                {/* Connected Nodes */}
                                                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-lg bg-orange-100 border border-orange-300 flex items-center justify-center transform rotate-12 shadow-sm"><FileText size={20} className="text-[#FF6B00]" /></div>
                                                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center transform -rotate-6 shadow-sm"><HardHat size={20} className="text-[#F59E0B]" /></div>
                                                <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center transform rotate-45 shadow-sm"><Wrench size={20} className="text-[#FF6B00]" /></div>

                                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                                    <path d="M 50 50 L 25 25" stroke="#FF6B00" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                                                    <path d="M 50 50 L 75 75" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                                                    <path d="M 50 50 L 75 33" stroke="#fb923c" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
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
                        ) : null}
                    </AnimatePresence>
                </div>

                {/* Global Bottom CTA */}
                <motion.div
                    className="mt-20 border-t border-black/5 pt-16 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">Power Your Operations with Custom Intelligence.</h2>
                    <p className="text-[#4b5563] mb-8">Marapone builds fully isolated, sovereign AI systems trained on your data. Stop leasing intelligence and start owning it.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1" style={{ background: primaryColor, boxShadow: `0 10px 25px ${bgGlow}` }}>
                            Schedule Architecture Evaluation
                        </Link>
                        <Link to="/custom-llm" className="px-8 py-4 rounded-xl font-bold text-[#1a1a1a] border border-black/10 bg-white hover:bg-black/5 transition-all">
                            Learn about Custom LLMs
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );

    // Removed the unreachable return statement containing Decarbonize section
    // since it was after the first `return` in FeaturesPage standard.
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
