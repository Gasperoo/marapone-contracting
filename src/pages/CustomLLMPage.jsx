import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Database, ShieldCheck, Zap, Lock, Layers, ArrowRight, Server, Search, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles/Particles';
import '../components/LandingPage/LandingPage.css';

export default function CustomLLMPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 relative overflow-hidden text-[#1a1a1a]" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Dynamic Particles Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={['#8B5CF6', '#C084FC', '#1a1a1a']}
                    particleCount={250}
                    particleSpread={15}
                    speed={0.1}
                    particleBaseSize={60}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    sizeRandomness={1.5}
                    cameraDistance={25}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 backdrop-blur-md mb-8 text-sm font-bold tracking-widest text-[#8B5CF6] uppercase shadow-sm"
                    >
                        <Brain size={16} /> Autonomous Enterprise Intelligence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1a1a1a] mb-8 leading-[1.05]"
                    >
                        Your Data. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#C084FC]">Your Brain.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] leading-relaxed max-w-3xl mx-auto font-medium"
                    >
                        We architect entirely isolated, custom Large Language Models trained exclusively on your corporate knowledge base. The result is a hyper-specialized AI employee that knows your business instantly.
                    </motion.p>
                </div>

                {/* Core Value Proposition Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    {[
                        { icon: <Lock size={28} />, title: "Total Data Sovereignty", desc: "Your data never leaves your environment. No shared weights. No public model fine-tuning. 100% air-gapped security." },
                        { icon: <Database size={28} />, title: "Proprietary Knowledge", desc: "Trained directly on your standard operating procedures, historical contracts, blueprints, and internal communication logs." },
                        { icon: <Zap size={28} />, title: "Instant Deployment", desc: "Integrates seamlessly via API into your secure corporate intranet, Slack, Teams, or custom software stack." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#8B5CF6]/10 text-[#8B5CF6] mb-6 relative z-10 shadow-inner">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 relative z-10">{feature.title}</h3>
                            <p className="text-[#6b7280] leading-relaxed relative z-10">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Abstract Data Visualization */}
                <div className="bg-white border border-black/5 rounded-[3rem] p-8 md:p-16 mb-32 shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute inset-0 bg-[#8B5CF6]/[0.02]" />
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px]" />
                    <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#C084FC]/10 rounded-full blur-[100px]" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6 tracking-tight leading-tight">
                                From Chaos to <br /><span className="text-[#8B5CF6]">Cognition.</span>
                            </h2>
                            <p className="text-lg text-[#4b5563] mb-8 leading-relaxed">
                                Our pipeline cleanses and vectorizes decades of fragmented corporate data. We construct a semantic architecture that allows your custom AI to answer highly complex, multi-variable questions spanning different departments instantaneously.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {["ERP & Oracle NetSuite Sync", "SharePoint & Intranet Ingestion", "Historical PDF & Blueprint OCR", "Real-time Slack / Teams Integration"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                                            <ShieldCheck size={14} />
                                        </div>
                                        <span className="font-semibold text-[#1a1a1a]">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg hover:-translate-y-0.5">
                                Book Architecture Sync <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* Interactive Server Visual */}
                        <div className="relative h-[450px] w-full bg-[#1a1a1a] rounded-3xl border border-gray-800 shadow-2xl p-6 flex flex-col overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

                            {/* Server Header */}
                            <div className="flex justify-between items-center pb-4 border-b border-white/10 relative z-10">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-mono text-gray-500">Node: Marapone-Core-LLM</div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                </div>
                            </div>

                            {/* Terminal Input */}
                            <div className="mt-6 flex flex-col gap-4 relative z-10 flex-1">

                                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3">
                                    <Terminal size={16} className="text-[#8B5CF6] mt-0.5" />
                                    <div>
                                        <div className="text-xs text-gray-400 font-mono mb-1">USER QUERY:</div>
                                        <div className="text-sm font-semibold text-white">"What was the structural failure rate on the Berlin Project in 2021, and how does it compare to our current metrics?"</div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="flex flex-col gap-2 pl-8">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                        <Search size={12} className="text-blue-400" />
                                        Scanning vector DB: /projects/berlin_2021...
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                        <Server size={12} className="text-purple-400" />
                                        Cross-referencing live Q3 KPI dashboard...
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }} className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl p-4 flex gap-3 shadow-[0_0_30px_rgba(139,92,246,0.1)] relative overflow-hidden mt-auto">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#8B5CF6]" />
                                    <Brain size={16} className="text-[#8B5CF6] mt-0.5" />
                                    <div>
                                        <div className="text-xs text-[#8B5CF6] font-mono mb-1 font-bold">MARAPONE AI:</div>
                                        <div className="text-sm text-gray-200 leading-relaxed font-medium">
                                            The structural failure rate for the 2021 Berlin Project was <span className="text-red-400 font-mono bg-red-400/10 px-1 rounded">2.4%</span> (Source: Berlin_PostMortem.pdf).
                                            <br /><br />
                                            Our current Q3 metric across all EU projects is <span className="text-green-400 font-mono bg-green-400/10 px-1 rounded">0.3%</span>. This represents an 87.5% improvement, primarily driven by the new pre-tensioning protocols implemented in 2022 (Source: SOP_V4.docx).
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Stop leasing generic intelligence.</h2>
                    <p className="text-xl text-[#4b5563] mb-10 leading-relaxed">
                        It's time to build a permanent intellectual asset that grows smarter with every project you complete.
                    </p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-xl hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all">
                        Schedule an Evaluation <ArrowRight size={20} className="ml-2" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
