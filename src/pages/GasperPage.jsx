import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring } from 'motion/react';
import { 
    Brain, Database, Zap, Bot, MessageSquare, ShieldCheck, 
    Lock, Server, Cpu, BarChart3, Send, CheckCircle2, ArrowRight, Activity, Shield
} from 'lucide-react';
import Particles from '../components/Particles/Particles';
import '../components/LandingPage/LandingPage.css';

// ─── Theme constants ─────────────────────────────────────────────────────────
const C = {
    primary: '#FF6B00',
    secondary: '#F59E0B',
    primaryGlow: 'rgba(255,107,0,0.15)',
    secondaryGlow: 'rgba(245,158,11,0.10)',
    bg: '#F5F5F5',
    surface: '#FFFFFF',
    border: 'rgba(0,0,0,0.06)',
    borderHover: 'rgba(255,107,0,0.40)',
    textPrimary: '#1a1a1a',
    textMuted: '#6b7280',
};

// ─── Gasper Engine Info Section ──────────────────────────────────────────────
function GasperEngineInfoSection() {
    return (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto py-16 sm:py-20 relative bg-white/95 border-y border-black/[0.03] z-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl sm:rounded-3xl mt-8 mb-8 sm:mt-12 sm:mb-12 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="md:w-5/12 w-full flex justify-center py-6">
                    <div className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-3xl border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-8 flex flex-col overflow-hidden">
                        <div className="absolute inset-0 bg-gray-50 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        <div className="relative z-10 flex items-center justify-between border-b border-black/5 pb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#F59E0B] p-3 flex items-center justify-center shadow-[0_4px_15px_rgba(255,107,0,0.2)]">
                                    <img src="/images/gasper-logo-g.png" alt="Gasper" className="w-full h-full object-contain brightness-0 invert" />
                                </div>
                                <div>
                                    <div className="text-[#1a1a1a] font-extrabold text-[1.05rem] tracking-tight">Gasper Core</div>
                                    <div className="text-[10px] text-[#10B981] font-mono tracking-[0.15em] font-semibold flex items-center gap-1.5 mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" /> SYNCHRONIZED
                                    </div>
                                </div>
                            </div>
                            <div className="px-2.5 py-1 rounded bg-black/[0.03] text-[10px] font-mono text-gray-500 font-bold border border-black/[0.04]">v4.2.0</div>
                        </div>
                        <div className="relative z-10 my-auto flex flex-col justify-center gap-y-4 pt-4 pb-2">
                            <div className="p-4 rounded-xl border border-black/[0.04] bg-white/60 backdrop-blur-md flex items-center gap-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)]">
                                <Database size={18} className="text-[#3B82F6]" />
                                <div>
                                    <div className="text-[13px] font-bold text-[#1a1a1a] tracking-tight">Enterprise ERP Sync</div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">1.2TB Processed / Hr</div>
                                </div>
                            </div>
                            <div className="flex justify-center -my-3 text-gray-300 relative z-0">
                                <div className="h-6 w-px bg-gradient-to-b from-gray-200 to-[#FF6B00]/30" />
                            </div>
                            <div className="p-4 rounded-xl border border-[#FF6B00]/10 bg-gradient-to-r from-[#FF6B00]/[0.02] to-transparent flex items-center gap-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,107,0,0.06)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/0 via-[#FF6B00]/[0.04] to-[#FF6B00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative z-10 flex items-center gap-4">
                                    <Brain size={18} className="text-[#FF6B00]" />
                                    <div>
                                        <div className="text-[13px] font-bold text-[#FF6B00] tracking-tight">Neural Processing Core</div>
                                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">Inferencing Engine Active</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center -my-3 text-gray-300 relative z-0">
                                <div className="h-6 w-px bg-gradient-to-b from-[#FF6B00]/30 to-gray-200" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl border border-black/[0.04] bg-white/60 backdrop-blur-md flex items-center justify-center gap-2 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgb(0,0,0,0.04)]">
                                    <Zap size={14} className="text-[#10B981]" />
                                    <div className="text-[13px] font-bold text-[#1a1a1a] tracking-tight">Automate</div>
                                </div>
                                <div className="p-3 rounded-xl border border-black/[0.04] bg-white/60 backdrop-blur-md flex items-center justify-center gap-2 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgb(0,0,0,0.04)]">
                                    <BarChart3 size={14} className="text-[#8B5CF6]" />
                                    <div className="text-[13px] font-bold text-[#1a1a1a] tracking-tight">Predict</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 pt-5 mt-auto border-t border-black/[0.04] flex items-center justify-between">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Compute Loads</div>
                            <div className="text-xs font-mono font-bold text-[#1a1a1a] bg-black/[0.02] border border-black/[0.03] px-2.5 py-1 rounded">8.4T FLOPS</div>
                        </div>
                    </div>
                </div>
                <div className="md:w-7/12 w-full text-center md:text-left">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/10 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-semibold tracking-[0.15em] mb-6">
                        <Zap size={14} className="mr-2" /> CORE ENGINE
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a] mb-6 leading-[1.15]">
                        Built on the Foundation of<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Gasper AI</span>
                    </h2>
                    <p className="text-gray-500 text-[1.1rem] leading-[1.7] mb-8 max-w-xl mx-auto md:mx-0 font-medium">
                        Marapone leverages the proprietary, battle-tested architecture of the Gasper Engine. Originally developed to power massive-scale SaaS AI agents, it is now exclusively available as the private intelligence core for our B2B integration clients.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: '99.9%', label: 'Uptime Reliability' },
                            { value: 'SOC-2', label: 'Security Compliant' },
                            { value: '0ms', label: 'Data Latency' },
                            { value: 'On-Prem', label: 'Deployment Option' }
                        ].map((stat, i) => (
                            <div key={i} className="border border-black/[0.04] rounded-2xl p-5 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)]">
                                <div className="font-mono text-2xl font-black text-[#1a1a1a] mb-1.5 tracking-tight">{stat.value}</div>
                                <div className="text-[11px] text-[#6b7280] uppercase tracking-wider font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── GasperAIBotSection ──────────────────────────────────────────────────────
function GasperAIBotSection() {
    const sectionRef = useRef(null);
    const pipelineSteps = [
        { label: 'Parse Intent', icon: <MessageSquare size={14} /> },
        { label: 'Query Data Lake', icon: <Database size={14} /> },
        { label: 'Apply Logic', icon: <Brain size={14} /> },
        { label: 'Generate Action', icon: <Zap size={14} /> },
    ];
    const stats = [
        { value: '<800ms', label: 'Inference Latency', color: '#FF6B00' },
        { value: 'Zero', label: 'Data Retention', color: '#10B981' },
        { value: '100%', label: 'Private Tenant', color: '#3B82F6' },
        { value: 'SOC-2', label: 'Compliance', color: '#8B5CF6' },
    ];

    return (
        <section ref={sectionRef} className="perf-section px-4 sm:px-6 max-w-7xl mx-auto py-16 sm:py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/10 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-semibold tracking-[0.15em] mb-6">
                    <Bot size={12} className="mr-2" /> ENTERPRISE AI INTERFACES
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a] mb-6 leading-[1.15]">
                    Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Enterprise Copilots</span>
                </h2>
                <p className="text-[1.1rem] text-gray-500 max-w-3xl mx-auto leading-[1.7] font-medium">
                    We deploy proprietary AI models directly into your existing infrastructure. Custom-trained on your internal documentation and data warehouses, your copilot understands your unique business logic and assists employees securely.
                </p>
            </motion.div>
            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-[2rem] bg-white/95 border border-black/[0.04] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.06)] transform transition-all duration-500 hover:shadow-[0_25px_60px_rgb(0,0,0,0.1)]">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.04] bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-gray-500 font-bold">internal_copilot_v4.2</span>
                            </div>
                            <div className="flex items-center flex-wrap gap-2 sm:gap-4 justify-end">
                                <div className="text-[10px] font-mono text-gray-500 font-bold bg-white px-2.5 py-1 rounded border border-black/[0.06] shadow-sm uppercase tracking-wide">Private Instance</div>
                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#10B981] font-bold uppercase tracking-widest bg-[#10B981]/10 px-2.5 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                                    Online
                                </div>
                            </div>
                        </div>
                        <div className="px-5 py-6 space-y-6">
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-end">
                                <div className="rounded-2xl rounded-tr-sm px-5 py-3 max-w-[85%] bg-[#1a1a1a] text-white shadow-sm border border-black/10">
                                    <p className="text-sm tracking-wide">Analyze Q3 supply chain variance against current active vendor contracts.</p>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex justify-start">
                                <div className="rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%] bg-gray-50 border border-black/10 shadow-sm relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#F59E0B] flex items-center justify-center">
                                            <Brain size={14} className="text-white" />
                                        </div>
                                        <span className="text-[11px] font-black text-[#1a1a1a] uppercase tracking-wider">System Copilot</span>
                                        <span className="text-[10px] text-gray-400 font-mono ml-auto">0.82s execution</span>
                                    </div>
                                    <p className="text-[#374151] text-sm mb-4 leading-relaxed font-medium">Analyzed 14,204 vendor records across 3 ERP databases. Found major variance drivers:</p>
                                    <div className="space-y-2 pl-3 border-l-2 border-[#FF6B00] bg-white p-3 rounded-r-lg shadow-sm">
                                        <div className="flex justify-between text-xs border-b border-black/5 pb-1"><span className="text-gray-600">Contract Compliance Deficit</span><span className="font-bold text-red-600">-$1.24M</span></div>
                                        <div className="flex justify-between text-xs border-b border-black/5 pb-1"><span className="text-gray-600">Logistics SLAs Missed</span><span className="font-bold text-amber-600">14% increase</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-gray-600">Data Confidence</span><span className="font-bold text-[#10B981]">99.8%</span></div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-black/5 flex items-start gap-3 bg-[#FF6B00]/5 p-3 rounded-lg border-l-2 border-l-[#FF6B00]">
                                        <Zap size={14} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                                        <span className="text-xs text-[#1a1a1a] leading-relaxed">Action recommended: Draft renegotiation terms for Top 3 underperforming vendors?</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="px-5 py-4 border-t border-black/10 bg-white">
                            <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 bg-gray-50 border-2 border-transparent transition-colors hover:border-black/5 focus-within:border-[#FF6B00]/30 focus-within:bg-white shadow-inner">
                                <input type="text" placeholder="Query enterprise data securely..." className="flex-1 bg-transparent text-[#1a1a1a] text-sm outline-none placeholder:text-gray-400 font-medium" disabled />
                                <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white shadow-md cursor-not-allowed">
                                    <Send size={14} />
                                </div>
                            </div>
                        </div>
                        <div className="px-5 py-3 border-t border-black/5 bg-gray-50 flex flex-wrap items-center justify-between md:justify-start gap-4">
                            <div className="flex items-center gap-2">
                                <Brain size={14} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Telemetry</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {pipelineSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                                        <span className="text-gray-400">{step.icon}</span>
                                        <span className="hidden sm:inline">{step.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
                        {stats.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-white border border-black/10 p-5 text-center shadow-lg transition-transform hover:-translate-y-1">
                                <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="rounded-2xl bg-white border border-black/10 p-6 shadow-lg space-y-5">
                        {[
                            { icon: <ShieldCheck size={20} />, title: 'Absolute Data Privacy', desc: 'No vendor lock-in. No data sharing. Your intellectual property never leaves your private cloud.', color: '#10B981' },
                            { icon: <Database size={20} />, title: 'ERP Deep Integration', desc: 'Natively queries your databases—SQL, Snowflake, Salesforce—to ground responses in reality.', color: '#0EA5E9' },
                            { icon: <Lock size={20} />, title: 'Role-Based Access', desc: 'Enforces your existing permission structures so employees only access what they are cleared for.', color: '#8B5CF6' },
                        ].map((f, i) => (
                            <div key={i} className="flex items-start gap-4 pb-5 border-b border-black/5 last:pb-0 last:border-b-0">
                                <div className="mt-0.5 flex-shrink-0" style={{ color: f.color }}>{f.icon}</div>
                                <div><h4 className="text-[#1a1a1a] font-black text-sm mb-1">{f.title}</h4><p className="text-[13px] text-gray-500 leading-relaxed font-medium">{f.desc}</p></div>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="rounded-2xl bg-white border border-black/10 p-5 shadow-lg">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-4">Common Executive Queries</div>
                        <div className="space-y-2.5">
                            {['Cross-reference Q2 employee churn against departmental budgets', 'Identify compliance gaps in recent vendor SLAs', 'Generate an automated audit trail for invoice #8922A'].map((q, i) => (
                                <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-gray-50 border border-black/5 text-xs text-[#1a1a1a] font-medium hover:bg-white transition-colors cursor-pointer group">
                                    <MessageSquare size={12} className="text-[#FF6B00] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" /> <span className="leading-snug">{q}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── TechnologyStackSection ──────────────────────────────────────────────────
function TechnologyStackSection() {
    const techCategories = [
        { category: 'Data Sources', icon: <Database size={18} />, technologies: ['BIM / IFC APIs', 'IoT Job Site Sensors', 'Weather & Soil Data', 'ERP Integrations'] },
        { category: 'AI & ML', icon: <Cpu size={18} />, technologies: ['Computer Vision', 'Time-Series Forecasting', 'NLP Document AI', 'Generative Models'] },
        { category: 'Infrastructure', icon: <Server size={18} />, technologies: ['AWS GovCloud', 'Kubernetes', 'Redis', 'PostgreSQL'] },
        { category: 'Security', icon: <Lock size={18} />, technologies: ['SOC 2 Type II', 'E2E Encryption', 'GDPR Compliant', 'ISO 27001'] },
    ];
    return (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto py-24">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">Enterprise-Grade Stack</h2>
                <p className="text-sm max-w-lg mx-auto font-medium" style={{ color: '#6b7280' }}>Built on the most secure, scalable infrastructure in the industry.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techCategories.map((cat, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.6 }}
                        className="p-5 rounded-xl transition-all bg-white border border-black/5 shadow-sm hover:border-[#FF6B00]/40"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span style={{ color: C.secondary }}>{cat.icon}</span>
                            <h3 className="text-[#1a1a1a] font-semibold text-sm">{cat.category}</h3>
                        </div>
                        <ul className="space-y-1.5">
                            {cat.technologies.map((tech, i) => (
                                <li key={i} className="text-xs flex items-center text-[#6b7280] font-medium">
                                    <div className="w-1 h-1 rounded-full mr-2" style={{ background: '#FF6B00' }} />{tech}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default function GasperPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 relative overflow-hidden text-[#1a1a1a] bg-[#F5F5F5]">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <Particles
                    particleColors={['#FF6B00', '#F59E0B', '#1a1a1a']}
                    particleCount={200}
                    particleSpread={20}
                    speed={0.06}
                    particleBaseSize={80}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    sizeRandomness={1.5}
                    cameraDistance={25}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero section specifically for GasperAI */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 backdrop-blur-md mb-8 text-sm font-bold tracking-widest text-[#FF6B00] uppercase shadow-sm"
                    >
                        <Zap size={16} /> The Intelligence Layer
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1a1a1a] mb-8 leading-[1.05]"
                    >
                        Powering the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Autonomous Enterprise.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#4b5563] leading-relaxed max-w-3xl mx-auto font-medium"
                    >
                        GasperAI is the secure, private backbone of your company's intelligence. We build custom-trained AI engines that integrate directly into your proprietary data, enabling autonomous decision-making with bank-level security.
                    </motion.p>
                </div>

                <GasperEngineInfoSection />
                <GasperAIBotSection />
                <TechnologyStackSection />

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mt-24"
                >
                    <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Ready to build your sovereign AI core?</h2>
                    <p className="text-xl text-[#4b5563] mb-10 leading-relaxed font-medium">
                        Stop relying on public, insecure AI tools. Partner with us to engineer a permanent, private asset that belongs entirely to your company.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] rounded-xl hover:shadow-[0_15px_40px_rgba(255,107,0,0.3)] hover:-translate-y-1 transition-all">
                        Get Started <ArrowRight size={20} className="ml-2" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
