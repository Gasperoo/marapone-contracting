import React from 'react';
import { motion } from 'motion/react';
import {
    ShieldCheck, Zap, Lock, Layers, Database,
    Server, Brain, FileText, ArrowRight, Activity,
    Network, SearchCode, Fingerprint, Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/LandingPage/LandingPage.css';
import Particles from '../components/Particles/Particles';

export default function FeaturesPage() {
    return (
        <div className="landing-container pt-32 pb-24 relative min-h-screen text-[#1a1a1a]" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={['#8B5CF6', '#1a1a1a', '#FF6B00']}
                    particleCount={200}
                    particleSpread={15}
                    speed={0.05}
                    sizeRandomness={1.5}
                    alphaParticles={true}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-md mb-8 text-sm font-bold tracking-widest uppercase shadow-sm"
                    >
                        <ShieldCheck size={16} className="text-[#8B5CF6]" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#1a1a1a]">The Sovereign Intelligence Platform</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1a1a1a] mb-8 tracking-tight leading-[1.05]"
                    >
                        Intelligence Built For<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#FF6B00]">The Real World.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        We build completely private, customized AI tools tailored for construction, complex project management, and heavy industry. Your proprietary data stays on your servers, fueling a system that actually understands your business.
                    </motion.p>
                </div>

                {/* Core Architectural Pillars */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#1a1a1a]">Core Architectural Pillars</h2>
                        <div className="w-24 h-1 bg-[#8B5CF6] mx-auto mt-6 rounded-full opacity-20" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* 1. Ingestion */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-10 lg:p-12 border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/5 rounded-bl-full -z-0 transition-transform duration-700 group-hover:scale-110" />
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#8B5CF6]/10 text-[#8B5CF6] mb-8 relative z-10 shadow-inner">
                                <Database size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 relative z-10">1. Autonomous Data Ingestion</h3>
                            <p className="text-[#6b7280] text-lg leading-relaxed mb-8 relative z-10">
                                Your corporate data is chaotic. Our ingestion pipelines connect to your ERPs, OCR decades of PDF contracts, and parse SharePoint drives—structuring the unstructured automatically.
                            </p>
                            <ul className="space-y-3 relative z-10">
                                {['Native SDKs for SAP/Oracle', 'Multi-modal OCR for Blueprints', 'Unstructured Email Parsing'].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#4b5563] font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* 2. Vectorization */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="bg-white rounded-[2rem] p-10 lg:p-12 border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/5 rounded-bl-full -z-0 transition-transform duration-700 group-hover:scale-110" />
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#FF6B00]/10 text-[#FF6B00] mb-8 relative z-10 shadow-inner">
                                <Network size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 relative z-10">2. Semantic Vector Space</h3>
                            <p className="text-[#6b7280] text-lg leading-relaxed mb-8 relative z-10">
                                Clean data is mathematically mapped into a multidimensional vector database. This allows the AI to understand contextual relationships between a supplier contract and a delayed shipping route instantly.
                            </p>
                            <ul className="space-y-3 relative z-10">
                                {['Dynamic Relationship Mapping', 'Real-time Vector Updating', 'Cross-Department Context Synthesis'].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#4b5563] font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* 3. The Brain */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="bg-[#1a1a1a] md:col-span-2 rounded-[2rem] p-10 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden group"
                            style={{ backgroundImage: 'linear-gradient(to right bottom, #1a1a1a, #050505)' }}
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gradient-to-r from-[#8B5CF6]/20 via-[#FF6B00]/20 to-[#8B5CF6]/20 blur-[100px] pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                <div className="flex-1">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 text-white mb-8 border border-white/20 backdrop-blur-md">
                                        <Brain size={32} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">3. The Sovereign LLM Engine</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-4">
                                        Your custom Gasper Engine is air-gapped from public networks. It is trained to answer complex questions, write reports, and analyze construction risks using <em className="text-white">only your approved corporate knowledge</em>. No guessing. No data leaks.
                                    </p>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        <strong>We partner with the best.</strong> Under the hood, Gasper utilizes world-class foundations including <strong>Claude (Anthropic)</strong>, <strong>Super Grok (xAI)</strong>, and <strong>Gemini (Google)</strong> to build the ultimate custom AI specialized for project management and operational efficiency.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-semibold flex items-center gap-2">
                                            <Lock size={16} className="text-[#8B5CF6]" /> 100% Private Data
                                        </div>
                                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-semibold flex items-center gap-2">
                                            <Fingerprint size={16} className="text-[#FF6B00]" /> Strict User Permissions
                                        </div>
                                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-semibold flex items-center gap-2">
                                            <Server size={16} className="text-[#10B981]" /> Runs On Any System
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 aspect-square relative flex items-center justify-center">
                                    {/* Abstract visual */}
                                    <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                                    <div className="absolute inset-4 border border-[#8B5CF6]/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                    <div className="absolute inset-8 bg-gradient-to-tr from-[#8B5CF6] to-[#FF6B00] rounded-full blur-[2px] opacity-80" />
                                    <Lock size={40} className="text-white relative z-10" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Capabilities Grid */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#1a1a1a]">Operational Outcomes</h2>
                        <div className="w-24 h-1 bg-[#1a1a1a] mx-auto mt-6 rounded-full opacity-10" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureBento
                            icon={<SearchCode size={24} />}
                            title="Instant Blueprint Analysis"
                            desc="Upload massive construction blueprint sets and RFPs. The AI instantly extracts material requirements, structural anomalies, and compliance checklists."
                            color="#8B5CF6"
                        />
                        <FeatureBento
                            icon={<Workflow size={24} />}
                            title="Automated Project Management"
                            desc="Gasper doesn't just read—it acts. Auto-generate daily site logs, draft supplier contracts based on historical data, and streamline procurement workflows."
                            color="#1a1a1a"
                        />
                        <FeatureBento
                            icon={<Activity size={24} />}
                            title="Predictive Risk Detection"
                            desc="Because the AI oversees the entirety of your project, it spots financial variances, schedule slip risks, and safety breaches before they impact the bottom line."
                            color="#FF6B00"
                        />
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="border-t border-black/5 pt-20 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Stop leasing intelligence.</h2>
                    <p className="text-xl text-[#4b5563] mb-10 leading-relaxed font-medium">Build a permanent, sovereign intellectual asset that compounds in value with every project your company executes.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="px-10 py-5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 bg-[#1a1a1a] hover:bg-black flex items-center justify-center gap-2 group">
                            Schedule Architecture Evaluation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link to="/about" className="px-10 py-5 rounded-xl font-bold text-[#1a1a1a] border border-black/10 bg-white hover:bg-black/5 transition-all">
                            Learn about Marapone
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

function FeatureBento({ icon, title, desc, color }) {
    return (
        <div className="bg-white p-8 rounded-[1.5rem] border border-black/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-2">
            <div className={`absolute top-0 left-0 w-1.5 h-full opacity-0 group-hover:opacity-100 transition-opacity`} style={{ backgroundColor: color || '#1a1a1a' }} />
            
            {/* Ambient Background Glow on Hover */}
            <div 
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                style={{ backgroundColor: color || '#1a1a1a' }} 
            />
            
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10" style={{ backgroundColor: `${color || '#1a1a1a'}15`, color: color || '#1a1a1a' }}>
                {icon}
            </div>
            <h4 className="text-xl font-bold text-[#1a1a1a] mb-3 relative z-10">{title}</h4>
            <p className="text-[#6b7280] leading-relaxed relative z-10 font-medium">{desc}</p>
        </div>
    );
}
