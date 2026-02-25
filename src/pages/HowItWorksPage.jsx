import React from 'react';
import { motion } from 'motion/react';
import { Database, Cpu, BarChart3, ArrowRight, Server, Globe2, Share2, HardHat, FileSearch, BrainCircuit, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';
import ProcessStep from '../components/ProcessStep';
import Counter from '../components/Counter';
import Particles from '../components/Particles/Particles';

export default function HowItWorksPage() {
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

                {/* Hero Text Only */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title mb-6 mx-auto"
                    >
                        The Engine of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#22d3ee]">Global Trade</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle mb-8"
                    >
                        How Gasper ingests millions of data points, processes them with advanced AI, and delivers actionable insights across logistics and construction.
                    </motion.p>
                </div>

                {/* Stats Counter Section */}
                <section className="mb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        <Counter value={5000} label="Connected Vessels" suffix="+" />
                        <Counter value={98} label="Accuracy Rating" suffix="%" />
                        <Counter value={120} label="Countries Covered" suffix="+" />
                        <Counter value={2} label="Data Points" suffix="B+" />
                    </div>
                </section>

                {/* Process Steps */}
                <div className="relative mb-24">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 transform -translate-x-1/2">
                        <motion.div
                            className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-[#5227FF] via-[#22d3ee] to-[#5227FF]"
                            animate={{
                                backgroundPosition: ["0% 0%", "0% 200%"]
                            }}
                            transition={{
                                duration: 8,
                                ease: "linear",
                                repeat: Infinity
                            }}
                            style={{ backgroundSize: "100% 50%" }}
                        />
                    </div>

                    <ProcessStep
                        number="01"
                        title="Data Ingestion Ecosystem"
                        description="We aggregate structured and unstructured data from over 500 sources. This includes live AIS/ADS-B feeds for tracking, port authority APIs for congestion data, local weather stations, and even geopolitical news feeds processed for risk analysis."
                        icon={<Database size={32} />}
                        align="left"
                        details={[
                            "REST API & Webhooks",
                            "EDI (X12, EDIFACT) Parsers",
                            "Satellite Feeds (Inmarsat/Iridium)",
                            "IoT Sensor Stream Integration"
                        ]}
                    />
                    <ProcessStep
                        number="02"
                        title="AI Processing & Normalization"
                        description="Our proprietary ML models clean, normalize, and analyze the data. Natural Language Processing (NLP) extracts risks from news, while Predictive Models forecast delays. We turn chaos into structured, queryable intelligence."
                        icon={<Cpu size={32} />}
                        align="right"
                        details={[
                            "Entity Recognition (NER)",
                            "Time-Series Forecasting",
                            "Anomaly Detection Models",
                            "Automated Data Cleansing"
                        ]}
                    />
                    <ProcessStep
                        number="03"
                        title="Digital Twin Modeling"
                        description="The refined data feeds into a live simulation of your supply chain. This 'Digital Twin' allows us to run thousands of scenarios to find the optimal path, predicting bottlenecks before they occur."
                        icon={<Server size={32} />}
                        align="left"
                        details={[
                            "Monte Carlo Simulations",
                            "Network Graph Optimization",
                            "Inventory Flow Modeling",
                            "Cost-Benefit Analysis Engine"
                        ]}
                    />
                    <ProcessStep
                        number="04"
                        title="Actionable Insights"
                        description="Finally, insights are delivered via our dashboard or API. You get alerts, updated ETAs, and cost-saving recommendations instantly. We don't just show you data; we tell you what to do with it."
                        icon={<BarChart3 size={32} />}
                        align="right"
                        details={[
                            "Real-time Push Notifications",
                            "Customizable Dashboards",
                            "Automated Reporting",
                            "ERP Write-back Capability"
                        ]}
                    />
                </div>

                {/* New Integration Section */}
                <div className="mb-24">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Seamless Integration</h2>
                        <p className="text-slate-400">Gasper isn't another silo. It connects directly with your existing ERP, TMS, and WMS systems.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-3">Rest API</h3>
                            <p className="text-slate-400">Full access to all Gasper data endpoints for custom dashboard building.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-3">Webhooks</h3>
                            <p className="text-slate-400">Real-time push notifications for critical events like delays or risks.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-3">EDI Support</h3>
                            <p className="text-slate-400">Legacy support for traditional EDI formats to ensure compatibility.</p>
                        </div>
                    </div>
                </div>

                {/* New Security Section */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24 bg-gradient-to-br from-[#5227FF]/10 to-transparent p-8 md:p-12 rounded-3xl border border-[#5227FF]/20">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">Enterprise-Grade Security</h2>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Your supply chain data is sensitive. We treat it that way. Gasper is built with a security-first architecture, ensuring your data is encrypted, isolated, and compliant with global standards.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="w-2 h-2 bg-green-400 rounded-full" /> SOC2 Type II Compliant
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="w-2 h-2 bg-green-400 rounded-full" /> AES-256 Encryption at Rest
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="w-2 h-2 bg-green-400 rounded-full" /> GDPR & CCPA Ready
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#5227FF] blur-[60px] opacity-20" />
                            <Server size={120} className="text-white relative z-10" strokeWidth={1} />
                        </div>
                    </div>
                </div>

                {/* Tech Stack / Architecture */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center mb-20">
                    <h2 className="text-3xl font-bold text-white mb-8">Built on Modern Infrastructure</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StackItem label="Real-Time WebSockets" icon={<Globe2 />} />
                        <StackItem label="Distributed Cloud" icon={<Share2 />} />
                        <StackItem label="End-to-End Encryption" icon={<Server />} />
                        <StackItem label="99.99% Uptime SLA" icon={<ActivityIcon />} />
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center"
                >
                    <Link to="/contact" className="btn-secondary inline-flex items-center">
                        Request Technical Whitepaper <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

                {/* Construction Workflow Section */}
                <div className="mt-24 mb-24">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                            <HardHat size={12} className="mr-2" /> CONSTRUCTION MODE
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">Construction Intelligence Pipeline</h2>
                        <p className="text-slate-400">The same AI backbone, purpose-built for the construction industry.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.07] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mx-auto mb-4">
                                <FileSearch size={24} className="text-[#FF6B00]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">01. Blueprint Ingestion</h3>
                            <p className="text-slate-400 text-sm">Upload CAD, PDF, or image plans. AI detects elements, dimensions, and generates material lists.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.07] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mx-auto mb-4">
                                <BrainCircuit size={24} className="text-[#FF6B00]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">02. AI Planning</h3>
                            <p className="text-slate-400 text-sm">Generate optimized schedules with critical path analysis and risk-aware resource allocation.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.07] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mx-auto mb-4">
                                <Cpu size={24} className="text-[#FF6B00]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">03. Generative Design</h3>
                            <p className="text-slate-400 text-sm">Set constraints and let AI produce scored design variants optimized for space, cost, and structure.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.07] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mx-auto mb-4">
                                <Wrench size={24} className="text-[#FF6B00]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">04. Predict & Maintain</h3>
                            <p className="text-slate-400 text-sm">IoT sensor data feeds AI models that predict equipment failures before they halt your project.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StackItem({ label, icon }) {
    return (
        <div className="flex flex-col items-center gap-3 text-slate-300">
            <div className="p-4 rounded-full bg-white/5 text-[#22d3ee] mb-2">{icon}</div>
            <span className="font-semibold">{label}</span>
        </div>
    );
}

function ActivityIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    )
}
