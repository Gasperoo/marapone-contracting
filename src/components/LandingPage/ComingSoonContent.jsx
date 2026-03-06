import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    Activity, TrendingUp, ShieldCheck, Zap, Lock,
    Database, Cpu, Server, BarChart3,
    HardHat, Fuel, Search, Store, Globe,
    CheckCircle2, Mail, Layers, AlertTriangle, ArrowDown,
    DollarSign, Star, Clock, Users, Building2, Check, Sparkles, Award, TrendingDown,
    Bot, MessageSquare, Brain, FileText, Send, MapPin, Ruler, Eye, Wrench, Hammer,
    CalendarDays, Shield, Target, Gauge, Timer, ClipboardCheck, Truck, Package,
    PhoneCall, Code, Plug, Key
} from 'lucide-react';
import Particles from '../Particles/Particles';
import { PlatformPillarsSection, ConstructionFeaturesSection, BlueprintAISection, CashFlowSection, SiteSecuritySection } from './ConstructionShowcase';
import { ProjectCommandCenter } from './ConstructionAdvanced';

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

// Smooth scroll-triggered animation defaults
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Metric Counter Card ──────────────────────────────────────────────────────
function Counter({ value, label, suffix = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const springValue = useSpring(0, { stiffness: 50, damping: 20 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView) springValue.set(value);
    }, [isInView, value, springValue]);

    useEffect(() => springValue.on('change', (v) => setDisplay(Math.floor(v))), [springValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden group"
        >
            <div className="absolute -inset-[1px] rounded-2xl z-0" style={{ background: `linear-gradient(135deg, ${C.primary}20, ${C.secondary}15, ${C.primary}20)` }} />
            <div className="absolute inset-[1px] rounded-2xl z-[1]" style={{ background: C.surface }} />
            <div className="relative z-10 p-8 text-center">
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ background: `linear-gradient(135deg, #1a1a1a 30%, ${C.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {display.toLocaleString()}{suffix}
                </div>
                <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: C.textMuted }}>{label}</div>
            </div>
        </motion.div>
    );
}

// ─── Executive Feature Card ───────────────────────────────────────────────────
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="uiverse-glow-card h-full flex flex-col"
        >
            <div className="relative h-full flex flex-col z-10">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-110" style={{ background: `${C.primary}15`, color: C.primary, boxShadow: `0 0 25px ${C.primaryGlow}` }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 transition-colors duration-300 hover:text-[#F59E0B]">{title}</h3>
                <p className="mb-6 leading-relaxed flex-grow" style={{ color: C.textMuted }}>{description}</p>
                <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                    <ul className="grid grid-cols-1 gap-3">
                        {details.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-[#374151]">
                                <CheckCircle2 size={14} className="mr-3 flex-shrink-0" style={{ color: C.secondary }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Industry Card ────────────────────────────────────────────────────────────
function IndustryCard({ icon, title, description, color, useCase }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uiverse-neo-card p-8 h-full flex flex-col group relative overflow-hidden"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 ${color} shadow-sm transition-transform duration-500 group-hover:scale-105`} style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 transition-colors duration-300 group-hover:text-[#F59E0B]">{title}</h3>
                <p className="text-[15px] leading-relaxed mb-8 flex-grow" style={{ color: C.textMuted }}>{description}</p>
                <div className="mt-auto pt-6 border-t transition-colors" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                    <div className="text-xs uppercase font-semibold mb-2 tracking-widest" style={{ color: '#4b5563' }}>Use Case</div>
                    <div className="text-sm text-gray-700 font-medium">{useCase}</div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Gasper Engine Info Section (Below Hero) ──────────────────────────────────
function GasperEngineInfoSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative bg-white border-y border-black/5 z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.03)] rounded-3xl mt-12 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                {/* Visual Side */}
                <div className="md:w-5/12 w-full flex justify-center py-6">
                    <div className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-3xl border border-black/5 shadow-xl p-6 md:p-8 flex flex-col overflow-hidden">
                        {/* Abstract Background Grid */}
                        <div className="absolute inset-0 bg-gray-50 opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        {/* Top Section */}
                        <div className="relative z-10 flex items-center justify-between border-b border-black/5 pb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#F59E0B] p-2.5 flex items-center justify-center shadow-md">
                                    <img src="/images/gasper-logo-g.png" alt="Gasper" className="w-full h-full object-contain brightness-0 invert" />
                                </div>
                                <div>
                                    <div className="text-[#1a1a1a] font-black text-base">Gasper Core</div>
                                    <div className="text-[10px] text-[#10B981] font-mono tracking-widest flex items-center gap-1.5 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> SYNCHRONIZED
                                    </div>
                                </div>
                            </div>
                            <div className="px-2.5 py-1 rounded bg-black/5 text-[10px] font-mono text-[#6b7280] font-bold">v4.2.0</div>
                        </div>

                        {/* Middle Section: Architecture Flow */}
                        <div className="relative z-10 my-auto flex flex-col justify-center gap-y-4 pt-4 pb-2">
                            <div className="p-4 rounded-xl border border-black/5 bg-gray-50/80 backdrop-blur-sm flex items-center gap-4 shadow-sm transition-transform hover:-translate-y-0.5">
                                <Database size={18} className="text-[#3B82F6]" />
                                <div>
                                    <div className="text-sm font-bold text-[#1a1a1a]">Enterprise ERP Sync</div>
                                    <div className="text-[10px] text-gray-500 font-mono">1.2TB Processed / Hr</div>
                                </div>
                            </div>

                            <div className="flex justify-center -my-3 text-gray-300 relative z-0">
                                <div className="h-6 w-px bg-gradient-to-b from-gray-200 to-[#FF6B00]/30" />
                            </div>

                            <div className="p-4 rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 flex items-center gap-4 shadow-md relative group transition-transform hover:-translate-y-0.5">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/0 via-[#FF6B00]/5 to-[#FF6B00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative z-10 flex items-center gap-4">
                                    <Brain size={18} className="text-[#FF6B00]" />
                                    <div>
                                        <div className="text-sm font-bold text-[#FF6B00]">Neural Processing Core</div>
                                        <div className="text-[10px] text-gray-500 font-mono">Inferencing Engine Active</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center -my-3 text-gray-300 relative z-0">
                                <div className="h-6 w-px bg-gradient-to-b from-[#FF6B00]/30 to-gray-200" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl border border-black/5 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center gap-2 shadow-sm transition-transform hover:-translate-y-0.5">
                                    <Zap size={14} className="text-[#10B981]" />
                                    <div className="text-xs font-bold text-[#1a1a1a]">Automate</div>
                                </div>
                                <div className="p-3 rounded-xl border border-black/5 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center gap-2 shadow-sm transition-transform hover:-translate-y-0.5">
                                    <BarChart3 size={14} className="text-[#8B5CF6]" />
                                    <div className="text-xs font-bold text-[#1a1a1a]">Predict</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Metric */}
                        <div className="relative z-10 pt-5 mt-auto border-t border-black/5 flex items-center justify-between">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Compute Loads</div>
                            <div className="text-xs font-mono font-bold text-[#1a1a1a] bg-gray-100 px-2.5 py-1 rounded">8.4T FLOPS</div>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="md:w-7/12 w-full text-center md:text-left">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                        <Zap size={14} className="mr-2" /> CORE ENGINE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                        Built on the Foundation of<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Gasper AI</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
                        Marapone leverages the proprietary, battle-tested architecture of the Gasper Engine. Originally developed to power massive-scale SaaS AI agents, it is now exclusively available as the private intelligence core for our B2B integration clients.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-black/5 rounded-xl p-4 bg-white shadow-sm">
                            <div className="font-mono text-xl font-bold text-[#1a1a1a] mb-1">99.9%</div>
                            <div className="text-xs text-[#6b7280] uppercase tracking-wide font-semibold">Uptime Reliability</div>
                        </div>
                        <div className="border border-black/5 rounded-xl p-4 bg-white shadow-sm">
                            <div className="font-mono text-xl font-bold text-[#1a1a1a] mb-1">SOC-2</div>
                            <div className="text-xs text-[#6b7280] uppercase tracking-wide font-semibold">Security Compliant</div>
                        </div>
                        <div className="border border-black/5 rounded-xl p-4 bg-white shadow-sm">
                            <div className="font-mono text-xl font-bold text-[#1a1a1a] mb-1">0ms</div>
                            <div className="text-xs text-[#6b7280] uppercase tracking-wide font-semibold">Data Latency</div>
                        </div>
                        <div className="border border-black/5 rounded-xl p-4 bg-white shadow-sm">
                            <div className="font-mono text-xl font-bold text-[#1a1a1a] mb-1">On-Prem</div>
                            <div className="text-xs text-[#6b7280] uppercase tracking-wide font-semibold">Deployment Option</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

// ─── B2B Enterprise Section ───────────────────────────────────────────────────
function B2BEnterpriseSection() {
    const features = [
        { icon: <Database size={24} />, title: "Proprietary Data Ingestion", desc: "We build secure data pipelines that connect organically to your ERPs, CRMs, and internal archives, transforming unstructured data into structured intelligence.", color: "#FF6B00" },
        { icon: <Lock size={24} />, title: "Sovereign AI Infrastructure", desc: "Enterprise-grade security architecture with options for fully air-gapped or on-premise deployments. Your models, your data, your ownership.", color: "#10B981" },
        { icon: <Cpu size={24} />, title: "Bespoke Model Fine-Tuning", desc: "Moving beyond generic APIs. We architect and train isolated Large Language Models exclusively on your company's operational history and logic.", color: "#8B5CF6" },
        { icon: <Activity size={24} />, title: "Autonomous Workflow Agents", desc: "Deploy specialized AI agents that act sequentially across multiple softwares, turning complex multi-day workflows into instant background processes.", color: "#0EA5E9" },
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-16 items-center">
                {/* Left Side: Text and Stacking */}
                <div className="lg:w-1/2">
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/10 bg-white text-[#1a1a1a] text-xs font-bold tracking-wider mb-6 shadow-sm">
                        <Shield size={12} className="mr-2 text-[#FF6B00]" /> ENTERPRISE CAPABILITIES
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                        Architecting <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }}>Competitive Moats</span> with AI
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-gray-400 mb-8 leading-relaxed">
                        We don't sell software. We partner with industry leaders to engineer tailored AI solutions that operate as an extension of your existing workforce—fully integrated, secure, and permanently owned by you.
                    </motion.p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="relative group">
                                <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: f.color }} />
                                <div className="relative p-5 rounded-2xl bg-white border border-black/5 shadow-xl h-full">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 border border-black/5" style={{ background: `${f.color}10`, color: f.color }}>
                                        {f.icon}
                                    </div>
                                    <h3 className="text-[#1a1a1a] font-bold mb-2">{f.title}</h3>
                                    <p className="text-xs text-[#6b7280] leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Abstract Visual */}
                <div className="lg:w-1/2 w-full mt-10 lg:mt-0 relative">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-square md:aspect-video lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50 border border-black/5 p-8 flex items-center justify-center">

                        {/* Sovereign Infrastructure Diagram */}
                        <div className="w-full flex flex-col gap-4 relative z-10">
                            {/* Top row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white border border-black/5 rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
                                    <Database size={20} className="text-[#0EA5E9] mb-2" />
                                    <div className="text-sm font-bold text-[#1a1a1a]">Proprietary Data</div>
                                    <div className="text-[10px] text-gray-500 mt-0.5 font-mono">Air-gapped ingestion</div>
                                </div>
                                <div className="p-4 bg-white border border-black/5 rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
                                    <Lock size={20} className="text-[#10B981] mb-2" />
                                    <div className="text-sm font-bold text-[#1a1a1a]">Zero-Trust Core</div>
                                    <div className="text-[10px] text-gray-500 mt-0.5 font-mono">SOC-2 Type II secure</div>
                                </div>
                            </div>

                            {/* Center Engine block */}
                            <div className="relative p-6 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl shadow-lg border border-white/10 overflow-hidden transform transition-all hover:scale-[1.02]">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Brain size={18} className="text-[#FF6B00]" />
                                            <span className="text-xs font-bold text-white tracking-wider">CUSTOM LLM ENGINE</span>
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-mono">Dedicated sovereign inference</div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-1.5 h-8 bg-white/10 rounded-full overflow-hidden flex flex-col justify-end">
                                                <div className="w-full bg-gradient-to-t from-[#FF6B00] to-[#F59E0B] animate-pulse" style={{ height: `${40 + i * 20}%` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom row */}
                            <div className="p-4 bg-white border border-black/5 rounded-2xl shadow-sm flex items-center justify-between transition-transform hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                                        <Server size={16} className="text-[#8B5CF6]" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-[#1a1a1a]">On-Premise Ready</div>
                                        <div className="text-[10px] text-gray-500 font-mono">Self-hosted deployment</div>
                                    </div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Enterprise Workflow Orchestration ──────────────────────────────────────────
function AgentOrchestrationSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <div className="text-center mb-16">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                    <Layers size={14} className="mr-2" /> WORKFLOW ORCHESTRATION
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                    End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Process Automation</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#6b7280] max-w-3xl mx-auto text-lg leading-relaxed">
                    Deploy networks of specialized, deterministic AI agents that execute complex business logic autonomously. From supply chain reconciliation to compliance auditing, transform multi-day manual workflows into instant background processes.
                </motion.p>
            </div>

            {/* Architecture Dashboard */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative max-w-5xl mx-auto bg-white rounded-3xl p-2 shadow-xl border border-black/5 overflow-hidden">
                <div className="bg-gray-50 rounded-2xl p-6 md:p-10 border border-black/5 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="grid md:grid-cols-3 gap-6 relative z-10">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent z-0" />

                        {[
                            { title: 'Ingestion Protocol', icon: <Database />, color: '#0EA5E9', desc: 'Securely extracts and normalizes unstructured data from legacy systems.' },
                            { title: 'Routing & Analysis', icon: <Brain />, color: '#8B5CF6', desc: 'Evaluates context against strict company policies with zero hallucinations.' },
                            { title: 'Execution Engine', icon: <Send />, color: '#10B981', desc: 'Fires validated API payloads to update ERPs and trigger notifications.' },
                        ].map((node, i) => (
                            <div key={i} className="relative bg-white rounded-xl p-6 border border-black/5 shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md z-10">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-5 border border-black/5 shadow-inner" style={{ color: node.color }}>
                                        {node.icon}
                                    </div>
                                    <div className="text-sm font-bold text-[#1a1a1a] mb-2">{node.title}</div>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">{node.desc}</p>
                                </div>

                                {/* Terminal/Log output snippet */}
                                <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 font-mono text-[10px] text-gray-400 h-20 flex flex-col justify-end overflow-hidden relative group">
                                    <motion.div animate={{ y: [0, -20] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="space-y-1">
                                        <div className="text-gray-600">[sys] await state_change</div>
                                        <div style={{ color: node.color }}>[exe] processing_batch</div>
                                        <div className="text-gray-500">[net] payload_verified</div>
                                    </motion.div>
                                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-900 to-transparent z-10" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// ─── Custom Enterprise Copilots Section ──────────────────────────────────────
function GasperAIBotSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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
        <section ref={sectionRef} className="px-4 sm:px-6 max-w-7xl mx-auto py-16 sm:py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                    <Bot size={12} className="mr-2" /> ENTERPRISE AI INTERFACES
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Enterprise Copilots</span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg leading-relaxed">
                    We deploy proprietary AI models directly into your existing infrastructure. Custom-trained on your internal documentation and data warehouses, your copilot understands your unique business logic and assists employees securely.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-white border border-black/10 overflow-hidden shadow-2xl">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-gray-500 font-medium">internal_copilot_v4.2</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-gray-500 font-bold bg-white px-2 py-0.5 rounded border border-black/5 uppercase">Private Instance</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Online
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="px-5 py-6 space-y-6">
                            {/* User message */}
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="flex justify-end">
                                <div className="rounded-2xl rounded-tr-sm px-5 py-3 max-w-[85%] bg-[#1a1a1a] text-white shadow-sm border border-black/10">
                                    <p className="text-sm tracking-wide">Analyze Q3 supply chain variance against current active vendor contracts.</p>
                                </div>
                            </motion.div>

                            {/* AI response */}
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                                className="flex justify-start">
                                <div className="rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%] bg-gray-50 border border-black/10 shadow-sm relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#F59E0B] flex items-center justify-center shadow-inner">
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
                                        <span className="text-xs text-[#1a1a1a] leading-relaxed">Action recommended: Draft renegotiation terms for Top 3 underperforming vendors and update procurement policies?</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Input bar */}
                        <div className="px-5 py-4 border-t border-black/10 bg-white">
                            <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 bg-gray-50 border-2 border-transparent transition-colors hover:border-black/5 focus-within:border-[#FF6B00]/30 focus-within:bg-white shadow-inner">
                                <input type="text" placeholder="Query enterprise data securely..." className="flex-1 bg-transparent text-[#1a1a1a] text-sm outline-none placeholder:text-gray-400 font-medium" disabled />
                                <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white shadow-md cursor-not-allowed">
                                    <Send size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Pipeline */}
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

                {/* Right Panel */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
                        {stats.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-white border border-black/10 p-5 text-center shadow-lg transition-transform hover:-translate-y-1">
                                <div className="text-3xl font-black mb-1" style={{ color: s.color }}>
                                    {s.value}
                                </div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-white border border-black/10 p-6 shadow-lg space-y-5">
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

                    {/* Example queries */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                        className="rounded-2xl bg-white border border-black/10 p-5 shadow-lg">
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

// ─── Technology Stack ─────────────────────────────────────────────────────────
function TechnologyStackSection() {
    const techCategories = [
        { category: 'Data Sources', icon: <Database size={18} />, technologies: ['BIM / IFC APIs', 'IoT Job Site Sensors', 'Weather & Soil Data', 'ERP Integrations'] },
        { category: 'AI & ML', icon: <Cpu size={18} />, technologies: ['Computer Vision', 'Time-Series Forecasting', 'NLP Document AI', 'Generative Models'] },
        { category: 'Infrastructure', icon: <Server size={18} />, technologies: ['AWS GovCloud', 'Kubernetes', 'Redis', 'PostgreSQL'] },
        { category: 'Security', icon: <Lock size={18} />, technologies: ['SOC 2 Type II', 'E2E Encryption', 'GDPR Compliant', 'ISO 27001'] },
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">Enterprise-Grade Stack</h2>
                <p className="text-sm max-w-lg mx-auto" style={{ color: '#6b7280' }}>Built on the most secure, scalable infrastructure in the industry.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techCategories.map((cat, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.6 }}
                        className="p-5 rounded-xl transition-all bg-white border border-black/5 shadow-sm"
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${C.primary}45`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.15)'}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span style={{ color: C.secondary }}>{cat.icon}</span>
                            <h3 className="text-[#1a1a1a] font-semibold text-sm">{cat.category}</h3>
                        </div>
                        <ul className="space-y-1.5">
                            {cat.technologies.map((tech, i) => (
                                <li key={i} className="text-xs flex items-center text-[#6b7280]">
                                    <div className="w-1 h-1 rounded-full mr-2" style={{ background: '#cbd5e1' }} />{tech}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ─── Comparison / Advantages ──────────────────────────────────────────────────
function ComparisonTableSection() {
    const metrics = [
        { value: 'Custom', label: 'One-Time Payment', desc: 'No subscriptions, no per-seat licenses. You own the integration.', icon: <DollarSign size={22} /> },
        { value: '100%', label: 'Data Ownership', desc: 'Deploy on your own servers or private cloud. Your data never leaves.', icon: <Lock size={22} /> },
        { value: 'Zero', label: 'Vendor Lock-in', desc: 'Full source code and model weights handed over at completion.', icon: <Zap size={22} /> },
    ];

    const transformations = [
        { before: 'Manually scraping competitor pricing daily', after: 'Dynamic pricing agents automatically adjust to market', icon: <TrendingUp size={18} /> },
        { before: 'Spreadsheet-based supply chain forecasting', after: 'Global digital twin predicting transit delays in real-time', icon: <Activity size={18} /> },
        { before: 'Generic ad copy and broad audience targeting', after: 'Generative campaigns tailored to micro-segments securely', icon: <Target size={18} /> },
        { before: 'Teams waiting weeks for custom dashboards', after: 'Chat with your database securely in natural language', icon: <MessageSquare size={18} /> },
        { before: 'SaaS tools charging $50/user for basic features', after: 'Fully owned internal tools with zero recurring license fees', icon: <Server size={18} /> },
    ];

    const differentiators = ['No Subscription Fees', 'On-Premise Ready', 'Full Source Code', 'Agency-Level Support'];

    return (
        <section className="px-4 sm:px-6 max-w-6xl mx-auto py-16 sm:py-24 relative">
            <div className="text-center mb-20 relative z-10">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
                    style={{ borderColor: `${C.primary}35`, background: `${C.primary}10`, color: C.primary }}>
                    <Award size={14} className="inline mr-2" />The Marapone Advantage
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-5"
                    style={{ background: 'linear-gradient(to bottom, #1a1a1a, rgba(26,26,26,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Why Enterprises Partner With Us
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-lg max-w-2xl mx-auto" style={{ color: C.textMuted }}>
                    We don't sell software subscriptions. We build tailored competitive advantages that you own forever.
                </motion.p>
            </div>

            {/* Metric Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="uiverse-depth-card text-center group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${C.primary}12`, color: C.primary }}>{m.icon}</div>
                            <div className="text-5xl font-black mb-2" style={{ background: `linear-gradient(135deg, #1a1a1a 30%, ${C.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.value}</div>
                            <div className="text-[#1a1a1a] font-bold text-lg mb-2">{m.label}</div>
                            <p className="text-sm" style={{ color: C.textMuted }}>{m.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Before / After */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-3xl p-4 sm:p-6 md:p-12 mb-10 overflow-x-auto" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a1a1a] text-center mb-6 sm:mb-10">SaaS Vendors vs. Marapone Integration</h3>
                <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,107,0,0.15)' }}>
                    {transformations.map((t, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4 py-4 sm:py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-500" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.2)' }}>{t.icon}</div>
                                <span className="text-sm text-gray-500 line-through">{t.before}</span>
                            </div>
                            <div className="flex w-8 h-8 rounded-full items-center justify-center text-xs font-bold flex-shrink-0 mx-auto" style={{ background: `${C.primary}15`, color: C.primary }}>→</div>
                            <div className="flex items-center gap-3 md:justify-end">
                                <span className="text-sm text-[#374151] font-medium">{t.after}</span>
                                <Check size={16} className="flex-shrink-0" style={{ color: C.secondary }} />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Trust Pills */}
            <div className="flex flex-wrap justify-center gap-3">
                {differentiators.map((d, i) => (
                    <span key={i} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: `${C.primary}10`, border: `1px solid ${C.primary}25`, color: C.secondary }}>
                        <CheckCircle2 size={13} className="inline mr-1.5" />{d}
                    </span>
                ))}
            </div>
        </section>
    );
}

// ─── What You'll Get ──────────────────────────────────────────────────────────
function WhatYouGetSection() {
    const benefits = [
        { icon: <Search size={24} />, title: '1. Discovery', description: 'Deep dive into your workflows to pinpoint high-ROI AI opportunities' },
        { icon: <Cpu size={24} />, title: '2. Custom Build', description: 'We architect and train isolated models securely on your proprietary data' },
        { icon: <Zap size={24} />, title: '3. Integration', description: 'Seamless deployment into your existing tech stack and ERP systems' },
        { icon: <Award size={24} />, title: '4. Handover & Training', description: 'You own the final product with zero subscriptions, plus team onboarding' },
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto relative overflow-hidden" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Our Engagement Process</h2>
                <p className="max-w-xl mx-auto" style={{ color: C.textMuted }}>From initial audit to final deployment, we build tailored AI engines as an extension of your technical team.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((b, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }}
                        className="uiverse-neo-card p-8 transition-all duration-300 text-center group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" style={{ background: `${C.primary}10`, border: `1px solid ${C.primary}25`, color: C.primary }}>
                                {b.icon}
                            </div>
                            <h3 className="text-[#1a1a1a] font-bold text-lg mb-2">{b.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{b.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ─── Custom LLM Builder ───────────────────────────────────────────────────────
function CustomLLMBuilderSection() {
    const [activeSource, setActiveSource] = useState(null);
    const [trainStep, setTrainStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setTrainStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, [isInView]);

    const dataSources = [
        { id: 'contracts', name: 'Vendor Contracts', count: '4,230', type: 'PDF/DOCX', size: '18.2 GB', color: '#FF6B00', icon: <FileText size={14} /> },
        { id: 'crm', name: 'Sales & CRM Data', count: '12,891', type: 'Structured', size: '5.6 GB', color: '#3B82F6', icon: <MessageSquare size={14} /> },
        { id: 'erp', name: 'ERP Financials', count: '1,847', type: 'Database', size: '22.1 GB', color: '#10B981', icon: <ClipboardCheck size={14} /> },
        { id: 'compliance', name: 'Compliance Frameworks', count: '3,456', type: 'Mixed', size: '8.3 GB', color: '#F59E0B', icon: <Shield size={14} /> },
        { id: 'sops', name: 'Process SOPs', count: '89,102', type: 'Internal Wiki', size: '2.1 GB', color: '#8B5CF6', icon: <Database size={14} /> },
    ];

    const pipelineSteps = [
        { label: 'Ingest', icon: <Database size={14} /> },
        { label: 'Clean', icon: <Search size={14} /> },
        { label: 'Train', icon: <Cpu size={14} /> },
        { label: 'Deploy', icon: <Zap size={14} /> },
    ];

    const stats = [
        { value: '50B+', label: 'Parameters', color: '#FF6B00' },
        { value: '99.2%', label: 'Accuracy', color: '#10B981' },
        { value: '<500ms', label: 'Inference', color: '#3B82F6' },
        { value: 'SOC 2', label: 'Compliant', color: '#8B5CF6' },
    ];

    return (
        <section ref={sectionRef} className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-500 text-xs font-bold tracking-wider mb-6">
                    <Brain size={12} className="mr-2" /> CUSTOM TRAINED MODELS
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    Bespoke <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#FF6B00]">AI Development</span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg leading-relaxed">
                    We build powerful <strong className="text-[#1a1a1a]">custom Large Language Models</strong> designed specifically for your business. Trained securely on your legacy archives, protocols, financial data, and workflows.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-white border border-black/5 overflow-hidden shadow-xl">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-[#6b7280] font-medium">llm_training_pipeline.run</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-gray-600 bg-white px-2 py-0.5 rounded border border-black/5 font-bold">Secure Enclave</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-purple-600 font-bold uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                    Training Phase
                                </div>
                            </div>
                        </div>

                        {/* Training Progress */}
                        <div className="px-5 pt-5 pb-3 bg-gray-50/50">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Model Convergence</span>
                                <span className="text-sm font-black text-purple-600">78% Complete</span>
                            </div>
                            <div className="h-2.5 bg-gray-200/60 rounded-full overflow-hidden shadow-inner">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '78%' }} transition={{ duration: 1.5, ease: 'easeOut' }}
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#FF6B00] relative overflow-hidden" >
                                    <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }} />
                                </motion.div>
                            </div>
                            <div className="flex justify-between mt-2 text-[9px] font-mono text-gray-400">
                                <span>Epoch 14/20</span>
                                <span>Loss: 0.0421</span>
                            </div>
                        </div>

                        {/* Data Sources */}
                        <div className="px-5 py-4 space-y-2.5 border-t border-black/5">
                            {dataSources.map((src, i) => {
                                const isActive = activeSource === src.id;
                                return (
                                    <motion.div
                                        key={src.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.08, type: 'spring', bounce: 0.2 }}
                                        viewport={{ once: true }}
                                        className="p-3.5 rounded-xl cursor-pointer transition-all duration-300 shadow-sm"
                                        style={{
                                            border: isActive ? `1px solid ${src.color}40` : '1px solid rgba(0,0,0,0.06)',
                                            background: isActive ? `${src.color}06` : 'rgba(255,255,255,1)',
                                        }}
                                        onMouseEnter={() => setActiveSource(src.id)}
                                        onMouseLeave={() => setActiveSource(null)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-inner" style={{ background: `${src.color}15`, color: src.color }}>
                                                    {src.icon}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#1a1a1a]">{src.name}</div>
                                                    <div className="text-[10px] text-gray-500 font-medium">{src.count} records parsed</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] px-2.5 py-1 rounded-full font-bold bg-black/5 text-[#6b7280] uppercase tracking-wider">{src.type}</span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-black/5">
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="text-center bg-white p-2 rounded-lg border border-black/5">
                                                        <div className="text-[9px] text-[#6b7280] uppercase font-bold tracking-widest mb-1">Items</div>
                                                        <div className="text-[11px] font-bold text-[#1a1a1a] font-mono">{src.count}</div>
                                                    </div>
                                                    <div className="text-center bg-white p-2 rounded-lg border border-black/5">
                                                        <div className="text-[9px] text-[#6b7280] uppercase font-bold tracking-widest mb-1">Volume</div>
                                                        <div className="text-[11px] font-bold font-mono" style={{ color: src.color }}>{src.size}</div>
                                                    </div>
                                                    <div className="text-center bg-white p-2 rounded-lg border border-black/5">
                                                        <div className="text-[9px] text-[#6b7280] uppercase font-bold tracking-widest mb-1">Status</div>
                                                        <div className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">Indexed</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pipeline */}
                        <div className="px-5 py-3 border-t border-black/5 bg-gray-50 flex flex-wrap items-center justify-between md:justify-start gap-4">
                            <div className="flex items-center gap-2">
                                <Cpu size={14} className="text-purple-600" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">LLM Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {pipelineSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-500 ${i === trainStep ? 'bg-purple-500/10 text-purple-600 shadow-sm border border-purple-500/20' : i < trainStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
                                            }`}>
                                            {i < trainStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < pipelineSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < trainStep ? 'bg-[#10B981]' : 'bg-black/8'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
                        {stats.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-white border border-black/10 p-5 text-center shadow-lg transition-transform hover:-translate-y-1">
                                <div className="text-3xl font-black mb-1" style={{ color: s.color }}>
                                    {s.value}
                                </div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-white border border-black/10 p-6 shadow-lg space-y-5">
                        {[
                            { icon: <Cpu size={20} />, title: 'Custom Fine-Tuning', desc: 'We train foundation models exclusively on your proprietary operational workflows and legacy data.', color: '#8B5CF6' },
                            { icon: <Zap size={20} />, title: 'Infrastructure Agnostic', desc: 'Deploy seamlessly into existing ERPs, custom portals, or internal networks. Available fully air-gapped.', color: '#FF6B00' },
                            { icon: <Lock size={20} />, title: 'Enterprise Security Barrier', desc: 'Your intelligence never leaves your control. Guaranteed zero-training-retention by external vendors.', color: '#10B981' },
                        ].map((f, i) => (
                            <div key={i} className="flex items-start gap-4 pb-5 border-b border-black/5 last:pb-0 last:border-b-0">
                                <div className="mt-0.5 flex-shrink-0" style={{ color: f.color }}>{f.icon}</div>
                                <div><h4 className="text-[#1a1a1a] font-black text-sm mb-1">{f.title}</h4><p className="text-[13px] text-gray-500 leading-relaxed font-medium">{f.desc}</p></div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 justify-center">
                        {['Architecture Optimization', 'RAG Integration', 'Private Vector DBs', 'On-Premise Ready', 'High-Trust Inference'].map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white border border-black/10 text-[#6b7280] shadow-sm hover:border-purple-500/50 hover:text-purple-600 transition-colors duration-300 cursor-default">{tag}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


// ─── Waitlist Section ─────────────────────────────────────────────────────────
function WaitlistSection() {
    const [form, setForm] = useState({ name: '', email: '', company: '', role: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email';
        if (!form.company.trim()) newErrors.company = 'Company is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setStatus('loading');
        try {
            const response = await fetch('https://formspree.io/f/mkgononq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ ...form, source: 'coming-soon-construction', timestamp: new Date().toISOString() }),
            });
            if (response.ok) {
                setStatus('success');
                setMessage("You're on the list. We'll be in touch soon.");
                setForm({ name: '', email: '', company: '', role: '' });
            } else {
                throw new Error('Submission failed');
            }
        } catch {
            setStatus('error');
            setMessage('Something went wrong. Please try again or email us directly.');
        }
    };

    return (
        <div id="waitlist-section" className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                <div className="w-[400px] h-[300px] rounded-full opacity-10 blur-3xl" style={{ background: `radial-gradient(ellipse, ${C.primary}, ${C.secondary})` }} />
            </div>

            <div className="mb-8">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-semibold mb-4"
                    style={{ borderColor: `${C.primary}30`, background: `${C.primary}08`, color: C.primary }}>
                    <Sparkles size={14} className="mr-2" /> Book a Discovery Call
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-3xl font-bold text-[#1a1a1a] mb-3" style={{ letterSpacing: '-0.02em' }}>
                    Request an Evaluation
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-base leading-relaxed" style={{ color: C.textMuted }}>
                    We're onboarding a select group of construction companies and strategic investors in Q2 2025. Secure your spot.
                </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden">
                <div className="absolute -inset-[1px] rounded-3xl z-0" style={{ background: `linear-gradient(135deg, ${C.primary}30, ${C.secondary}15, ${C.primary}10)` }} />
                <div className="absolute inset-[1px] rounded-3xl z-[1]" style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)' }} />

                <div className="relative z-10 p-6 md:p-8">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `${C.primary}15`, border: `2px solid ${C.primary}40` }}>
                                <Check size={36} style={{ color: C.secondary }} />
                            </div>
                            <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4">You're In</h3>
                            <p className="text-lg" style={{ color: C.textMuted }}>{message}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { name: 'name', label: 'Full Name', placeholder: 'John Marapone', type: 'text' },
                                    { name: 'email', label: 'Work Email', placeholder: 'john@company.com', type: 'email' },
                                    { name: 'company', label: 'Company / Organization', placeholder: 'Marapone Contracting', type: 'text' },
                                    { name: 'role', label: 'Your Role (Optional)', placeholder: 'COO, Project Director, Investor...', type: 'text' },
                                ].map(field => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-semibold mb-2 text-gray-300">{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleInputChange}
                                            placeholder={field.placeholder}
                                            className={`uiverse-input ${errors[field.name] ? 'error' : ''}`}
                                        />
                                        {errors[field.name] && <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>}
                                    </div>
                                ))}
                            </div>

                            {status === 'error' && <p className="text-red-400 text-sm text-center py-2">{message}</p>}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="uiverse-glass-btn w-full py-4 text-lg transition-all duration-300 flex items-center justify-center gap-2"
                                style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                            >
                                {status === 'loading' ? 'Submitting...' : <><Send size={16} /> Request Early Access</>}
                            </button>
                            <p className="text-center text-xs" style={{ color: '#4b5563' }}>
                                No spam, ever. By submitting, you agree to receive product updates from Gasper.
                            </p>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// ─── Material Price Aggregator — Advanced Interactive Showcase ─────────────
function MaterialPriceAggregatorSection() {
    const [activeRow, setActiveRow] = useState(null);
    const [crawlStep, setCrawlStep] = useState(0);
    const [supplierCount, setSupplierCount] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const crawlInterval = setInterval(() => {
            setCrawlStep(s => (s + 1) % 4);
        }, 2500);
        // Animate supplier count up
        let count = 0;
        const countInterval = setInterval(() => {
            count += 1;
            if (count > 47) { clearInterval(countInterval); return; }
            setSupplierCount(count);
        }, 40);
        return () => { clearInterval(crawlInterval); clearInterval(countInterval); };
    }, [isInView]);

    const stores = [
        { name: 'Home Depot', color: '#F97316', initial: 'HD' },
        { name: 'Lowes', color: '#0EA5E9', initial: 'LW' },
        { name: 'BuildPro Supply', color: '#10B981', initial: 'BP' },
        { name: 'Local Wholesale', color: '#8B5CF6', initial: 'LW' },
    ];

    const materials = [
        { item: '2×4 SPF Stud 8ft', category: 'Lumber', prices: [4.28, 4.15, 4.49, 3.97], unit: 'ea', best: 3 },
        { item: 'Portland Cement 40kg', category: 'Concrete', prices: [12.98, 13.47, 11.99, 12.50], unit: 'bag', best: 2 },
        { item: '½" Plywood 4×8 Sheet', category: 'Sheathing', prices: [42.97, 39.88, 44.50, 41.25], unit: 'sht', best: 1 },
        { item: 'R-20 Batt Insulation', category: 'Insulation', prices: [68.99, 71.48, 65.99, 69.97], unit: 'roll', best: 2 },
        { item: '#10 × 3" Deck Screws (1lb)', category: 'Fasteners', prices: [9.97, 8.48, 9.29, 8.97], unit: 'box', best: 1 },
        { item: 'PVC Conduit ¾" × 10ft', category: 'Electrical', prices: [3.88, 4.12, 3.65, 3.99], unit: 'ea', best: 2 },
    ];

    const crawlSteps = [
        { label: 'Crawling', desc: 'Scanning retailer websites', icon: <Globe size={14} /> },
        { label: 'Comparing', desc: 'Matching product SKUs', icon: <Search size={14} /> },
        { label: 'Optimizing', desc: 'Finding lowest prices', icon: <TrendingDown size={14} /> },
        { label: 'Complete', desc: 'Results ready', icon: <CheckCircle2 size={14} /> },
    ];

    const savings = [
        { label: 'Avg. Savings', value: '$12,400+', color: '#10B981' },
        { label: 'Suppliers', value: supplierCount.toString(), color: '#FF6B00' },
        { label: 'Updated', value: '2 min ago', color: '#6b7280' },
        { label: 'Accuracy', value: '99.8%', color: '#3B82F6' },
    ];

    return (
        <section ref={sectionRef} className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                    <Search size={12} className="mr-2" /> AI PRICE INTELLIGENCE ENGINE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Finds the Best Prices</span> Instantly
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                    The industry's first AI price engine that crawls every retailer, wholesaler, and supplier in real-time — surfacing the lowest prices based on your exact location.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* ─── Price Comparison Canvas ─── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="lg:col-span-3 relative"
                >
                    <div className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-xl">
                        {/* ── Toolbar ── */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-gradient-to-r from-[#111111] to-[#0a0a0a]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-gray-500">material_price_scan.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
                                    <MapPin size={10} /> <span className="text-[#FF6B00] font-semibold">Your Location</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Live
                                </div>
                            </div>
                        </div>

                        {/* ── Supplier Header Row ── */}
                        <div className="px-5 pt-4 pb-2 border-b border-white/5">
                            <div className="grid grid-cols-[1.8fr_repeat(4,1fr)] gap-2 items-center">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Material</div>
                                {stores.map((s, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white" style={{ background: s.color }}>
                                            {s.initial}
                                        </div>
                                        <span className="text-[9px] font-semibold text-gray-500 hidden sm:block">{s.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Price Rows ── */}
                        <div className="px-5 py-2">
                            {materials.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.08, type: 'spring', bounce: 0.2 }}
                                    viewport={{ once: true }}
                                    className="grid grid-cols-[1.8fr_repeat(4,1fr)] gap-2 items-center py-2.5 px-2 rounded-xl cursor-pointer transition-all duration-300"
                                    style={{
                                        background: activeRow === idx ? 'rgba(255,107,0,0.04)' : idx % 2 === 0 ? 'rgba(0,0,0,0.015)' : 'transparent',
                                        border: activeRow === idx ? '1px solid rgba(255,107,0,0.15)' : '1px solid transparent',
                                    }}
                                    onMouseEnter={() => setActiveRow(idx)}
                                    onMouseLeave={() => setActiveRow(null)}
                                >
                                    <div>
                                        <div className="text-sm font-semibold text-white leading-tight">{m.item}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] text-gray-400">{m.category}</span>
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400 font-mono">/{m.unit}</span>
                                        </div>
                                    </div>
                                    {m.prices.map((p, pi) => {
                                        const isBest = pi === m.best;
                                        const maxPrice = Math.max(...m.prices);
                                        const barWidth = (p / maxPrice) * 100;
                                        return (
                                            <div key={pi} className="text-center relative">
                                                {/* Price bar background */}
                                                {activeRow === idx && (
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${barWidth}%` }}
                                                        transition={{ duration: 0.5, delay: pi * 0.05 }}
                                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full"
                                                        style={{ background: isBest ? '#10B981' : `${stores[pi].color}30` }}
                                                    />
                                                )}
                                                <span className={`text-sm font-bold transition-all ${isBest ? 'text-emerald-500' : 'text-gray-500'}`}>
                                                    ${p.toFixed(2)}
                                                </span>
                                                {isBest && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.6 + idx * 0.1 }}
                                                        className="text-[8px] font-black text-emerald-500 uppercase tracking-wider mt-0.5"
                                                    >
                                                        Best ✓
                                                    </motion.div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            ))}
                        </div>

                        {/* ── AI Crawl Pipeline ── */}
                        <div className="px-5 py-3 border-t border-white/5 bg-gradient-to-r from-[#0a0a0a] to-[#111111]">
                            <div className="flex items-center gap-1 mb-2">
                                <Globe size={12} className="text-[#FF6B00]" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Web Crawler Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {crawlSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === crawlStep
                                            ? 'bg-[#FF6B00]/10 text-[#FF6B00] shadow-sm'
                                            : i < crawlStep
                                                ? 'text-[#10B981]'
                                                : 'text-[#9ca3af]'
                                            }`}>
                                            {i < crawlStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < crawlSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < crawlStep ? 'bg-[#10B981]' : 'bg-black/8'
                                                }`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ─── Right Panel: Metrics + Features ─── */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Savings Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {savings.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                                    className="text-2xl font-black"
                                    style={{ color: s.color }}
                                >
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-sm space-y-4"
                    >
                        {[
                            { icon: <Globe size={18} />, title: 'Real-Time Web Crawling', desc: 'AI scans every retailer, wholesaler, and outlet — matching exact SKUs and product specs.', color: '#FF6B00' },
                            { icon: <MapPin size={18} />, title: 'Location-Aware Pricing', desc: 'Prices auto-adjusted for your exact zip code, including local taxes, delivery, and availability.', color: '#3B82F6' },
                            { icon: <TrendingDown size={18} />, title: 'Budget Optimization', desc: 'AI recommends substitutions and bulk buys that can cut material costs by up to 23%.', color: '#10B981' },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-default"
                            >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}12`, color: f.color }}>
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Category Tags */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-2 justify-center"
                    >
                        {['Lumber & Framing', 'Concrete', 'Electrical', 'Plumbing', 'Roofing', 'Insulation', 'Tools', 'Bulk Wholesale'].map((cat, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#111111] border border-white/10 text-gray-400 hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all cursor-default">
                                {cat}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Project Timeline Section (replaces ROI) ─────────────────────────────────
function ProjectTimelineSection() {
    const [activePhase, setActivePhase] = useState(1);
    const [progressStep, setProgressStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setProgressStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, [isInView]);

    const phases = [
        { phase: 'Pre-Construction', duration: '2–4 weeks', items: ['Site assessment & permits', 'Blueprint AI analysis', 'Material cost aggregation'], icon: <ClipboardCheck size={16} />, status: 'complete', progress: 100, color: '#10B981' },
        { phase: 'Foundation & Structural', duration: '6–12 weeks', items: ['Automated scheduling', 'Daily progress tracking', 'Cash flow milestone gates'], icon: <Hammer size={16} />, status: 'active', progress: 64, color: '#FF6B00' },
        { phase: 'MEP & Finishing', duration: '8–16 weeks', items: ['Sub coordination AI', 'Change order management', 'Quality inspection logs'], icon: <Wrench size={16} />, status: 'upcoming', progress: 0, color: '#3B82F6' },
        { phase: 'Closeout & Handover', duration: '2–4 weeks', items: ['Punch list automation', 'As-built documentation', 'Warranty tracking'], icon: <CheckCircle2 size={16} />, status: 'upcoming', progress: 0, color: '#8B5CF6' },
    ];

    const pipelineSteps = [
        { label: 'Planning', icon: <ClipboardCheck size={14} /> },
        { label: 'Scheduling', icon: <CalendarDays size={14} /> },
        { label: 'Tracking', icon: <Activity size={14} /> },
        { label: 'Reporting', icon: <BarChart3 size={14} /> },
    ];

    const stats = [
        { value: '64%', label: 'Project Progress', color: '#FF6B00' },
        { value: '3 Days', label: 'Ahead of Schedule', color: '#10B981' },
        { value: '12', label: 'Milestones Hit', color: '#3B82F6' },
        { value: '98%', label: 'On-Time Delivery', color: '#8B5CF6' },
    ];

    return (
        <section ref={sectionRef} className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                    <CalendarDays size={12} className="mr-2" /> PROJECT LIFECYCLE ENGINE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    From Groundbreak to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Certificate of Occupancy</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                    Gasper AI manages every phase — automated scheduling, real-time cost tracking, and AI-powered coordination from start to finish.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-xl">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-gradient-to-r from-[#111111] to-[#0a0a0a]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-gray-500">harbor_view_project.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">4 Phases</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-[#FF6B00]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                                    Phase 2
                                </div>
                            </div>
                        </div>

                        {/* Overall Progress Bar */}
                        <div className="px-5 pt-4 pb-2">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Overall Progress</span>
                                <span className="text-sm font-black text-[#FF6B00]">64%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '64%' }} transition={{ duration: 1.5, ease: 'easeOut' }}
                                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]" />
                            </div>
                        </div>

                        {/* Phase Cards */}
                        <div className="px-5 py-3 space-y-2">
                            {phases.map((p, i) => {
                                const isActive = activePhase === i;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.08, type: 'spring', bounce: 0.2 }}
                                        viewport={{ once: true }}
                                        className="p-3 rounded-xl cursor-pointer transition-all duration-300"
                                        style={{
                                            border: isActive ? `1px solid ${p.color}40` : '1px solid rgba(0,0,0,0.04)',
                                            background: isActive ? `${p.color}04` : 'rgba(0,0,0,0.01)',
                                        }}
                                        onClick={() => setActivePhase(i)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}15`, color: p.color }}>
                                                    {p.icon}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white">{p.phase}</div>
                                                    <div className="text-[10px] text-gray-400">{p.duration}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                                                    style={p.status === 'complete' ? { background: '#10B98115', color: '#10B981' }
                                                        : p.status === 'active' ? { background: '#FF6B0015', color: '#FF6B00' }
                                                            : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}>
                                                    {p.status === 'complete' ? '✓ Done' : p.status === 'active' ? '● Active' : 'Upcoming'}
                                                </span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-white/5">
                                                <div className="flex flex-wrap gap-2">
                                                    {p.items.map((item, j) => (
                                                        <span key={j} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#111111] border border-white/5 text-gray-400 font-medium">
                                                            <CheckCircle2 size={10} className="inline mr-1" style={{ color: p.color }} />{item}
                                                        </span>
                                                    ))}
                                                </div>
                                                {p.progress > 0 && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.color }} />
                                                        </div>
                                                        <span className="text-[9px] font-bold" style={{ color: p.color }}>{p.progress}%</span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pipeline */}
                        <div className="px-5 py-3 border-t border-white/5 bg-gradient-to-r from-[#0a0a0a] to-[#111111]">
                            <div className="flex items-center gap-1 mb-2">
                                <CalendarDays size={12} className="text-[#FF6B00]" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Project Management Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {pipelineSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === progressStep ? 'bg-[#FF6B00]/10 text-[#FF6B00] shadow-sm' : i < progressStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
                                            }`}>
                                            {i < progressStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < pipelineSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < progressStep ? 'bg-[#10B981]' : 'bg-black/8'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-3">
                        {stats.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: 'spring' }} className="text-2xl font-black" style={{ color: s.color }}>
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-sm space-y-4">
                        {[
                            { icon: <CalendarDays size={18} />, title: 'Auto Scheduling', desc: 'AI generates optimized construction schedules based on dependencies, crew availability, and weather forecasts.', color: '#FF6B00' },
                            { icon: <Activity size={18} />, title: 'Real-Time Tracking', desc: 'Daily progress photos and drone surveys analyzed by AI to track completion percentage against schedule.', color: '#3B82F6' },
                            { icon: <Target size={18} />, title: 'Milestone Gates', desc: 'Automatic cash flow releases tied to milestone completion — verified by AI, not paperwork.', color: '#10B981' },
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-default">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}10`, color: f.color }}>{f.icon}</div>
                                <div>
                                    <h4 className="text-[#1a1a1a] font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-[#6b7280] text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 justify-center">
                        {['Gantt Charts', 'CPM Analysis', 'Resource Leveling', 'Weather Delays', 'Change Orders', 'Punch Lists'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#111111] border border-white/10 text-gray-400 hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all cursor-default">{tag}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SafetyComplianceSection() {
    const [activeCheck, setActiveCheck] = useState(null);
    const [safetyStep, setSafetyStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setSafetyStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, [isInView]);

    const checks = [
        { id: 'ppe', item: 'PPE Compliance Scan', zone: 'All Zones', status: 'pass', workers: 24, violations: 0, lastScan: '3 min ago', color: '#10B981' },
        { id: 'scaffold', item: 'Scaffold Inspection', zone: 'Zone B — Tower', status: 'pass', workers: 8, violations: 0, lastScan: '12 min ago', color: '#10B981' },
        { id: 'crane', item: 'Crane Load Check', zone: 'Zone A — Main', status: 'warning', workers: 3, violations: 1, lastScan: '6 min ago', color: '#F59E0B' },
        { id: 'trench', item: 'Trench Shoring', zone: 'Zone C — East', status: 'pass', workers: 6, violations: 0, lastScan: '22 min ago', color: '#10B981' },
        { id: 'fire', item: 'Fire Extinguisher Audit', zone: 'All Zones', status: 'pass', workers: null, violations: 0, lastScan: '1 hr ago', color: '#10B981' },
    ];

    const pipelineSteps = [
        { label: 'Detect', icon: <Eye size={14} /> },
        { label: 'Classify', icon: <Target size={14} /> },
        { label: 'Report', icon: <FileText size={14} /> },
        { label: 'Resolve', icon: <CheckCircle2 size={14} /> },
    ];

    const stats = [
        { value: '247', label: 'Incident-Free Days', color: '#10B981' },
        { value: '98.7%', label: 'Safety Score', color: '#3B82F6' },
        { value: '156', label: 'Inspections Passed', color: '#FF6B00' },
        { value: '<90s', label: 'Response Time', color: '#8B5CF6' },
    ];

    return (
        <section ref={sectionRef} className="px-4 sm:px-6 max-w-7xl mx-auto py-16 sm:py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-bold tracking-wider mb-6">
                    <Shield size={12} className="mr-2" /> AI SAFETY COMMAND
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Zero-Incident <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#10B981]">Job Sites</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                    AI-powered safety monitoring that protects your crews, keeps projects compliant, and eliminates paperwork.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-xl">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-gradient-to-r from-[#111111] to-[#0a0a0a]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-gray-500">safety_compliance.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">OSHA Ready</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    A+ Score
                                </div>
                            </div>
                        </div>

                        {/* Compliance Checklist */}
                        <div className="px-5 py-3 space-y-2">
                            {checks.map((c, i) => {
                                const isActive = activeCheck === c.id;
                                return (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 + i * 0.08, type: 'spring', bounce: 0.2 }}
                                        viewport={{ once: true }}
                                        className="p-3 rounded-xl cursor-pointer transition-all duration-300"
                                        style={{
                                            border: isActive ? `1px solid ${c.color}40` : '1px solid rgba(0,0,0,0.04)',
                                            background: isActive ? `${c.color}04` : 'rgba(0,0,0,0.01)',
                                        }}
                                        onMouseEnter={() => setActiveCheck(c.id)}
                                        onMouseLeave={() => setActiveCheck(null)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}15`, color: c.color }}>
                                                    {c.status === 'pass' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#1a1a1a]">{c.item}</div>
                                                    <div className="text-[10px] text-gray-500">{c.zone}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono text-gray-500 hidden sm:block">{c.lastScan}</span>
                                                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                                                    style={c.status === 'pass' ? { background: '#10B98115', color: '#10B981' } : { background: '#F59E0B15', color: '#F59E0B' }}>
                                                    {c.status === 'pass' ? '✓ Pass' : '⚠ Warning'}
                                                </span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 pt-2 border-t border-white/5">
                                                <div className="grid grid-cols-3 gap-3">
                                                    {c.workers !== null && (
                                                        <div className="text-center">
                                                            <div className="text-[9px] text-[#9ca3af] uppercase">Workers</div>
                                                            <div className="text-[11px] font-bold text-white">{c.workers}</div>
                                                        </div>
                                                    )}
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">Violations</div>
                                                        <div className="text-[11px] font-bold" style={{ color: c.violations > 0 ? '#F59E0B' : '#10B981' }}>{c.violations}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">Status</div>
                                                        <div className="text-[11px] font-bold" style={{ color: c.color }}>{c.status === 'pass' ? 'Compliant' : 'Review'}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pipeline */}
                        <div className="px-5 py-3 border-t border-white/5 bg-gradient-to-r from-[#0a0a0a] to-[#111111]">
                            <div className="flex items-center gap-1 mb-2">
                                <Shield size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Safety Intelligence Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {pipelineSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === safetyStep ? 'bg-emerald-500/10 text-emerald-500 shadow-sm' : i < safetyStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
                                            }`}>
                                            {i < safetyStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < pipelineSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < safetyStep ? 'bg-[#10B981]' : 'bg-black/8'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-3">
                        {stats.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: 'spring' }} className="text-2xl font-black" style={{ color: s.color }}>
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-sm space-y-4">
                        {[
                            { icon: <Eye size={18} />, title: 'Computer Vision Monitoring', desc: 'AI cameras detect PPE violations, unauthorized access, and unsafe conditions in real-time across every job site.', color: '#10B981' },
                            { icon: <FileText size={18} />, title: 'Automated OSHA Reports', desc: 'When an event occurs, Gasper generates OSHA-compliant incident reports instantly — no paperwork, no delays.', color: '#FF6B00' },
                            { icon: <AlertTriangle size={18} />, title: 'Predictive Risk Analysis', desc: 'ML models analyze weather, crew fatigue patterns, and past incidents to predict and prevent safety events.', color: '#F59E0B' },
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-default">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}12`, color: f.color }}>{f.icon}</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 justify-center">
                        {['PPE Detection', 'Fall Protection', 'OSHA Logs', 'Toolbox Talks', 'Incident Reports', 'Training AI'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#111111] border border-white/10 text-gray-400 hover:border-emerald-500/30 hover:text-emerald-500 transition-all cursor-default">{tag}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Unique Industry Showcases (Premium Animated Cards) ────────────────────

// 1. Construction Showcase
function ConstructionShowcase() {
    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="py-8 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-5/12">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                        <HardHat size={14} className="mr-2" /> CONSTRUCTION INTELLIGENCE
                    </div>
                    <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">From Groundbreak to Handover</h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                        Automate blueprint takeoffs, monitor site security via computer vision, and forecast cash flow with pinpoint accuracy using custom-trained models that understand your specific building codes and historical project data.
                    </p>
                    <div className="space-y-5 border-t border-white/5 pt-6">
                        {[
                            { icon: <Ruler size={18} />, title: 'Automated Takeoffs', desc: 'Extract quantities directly from architectural PDFs.' },
                            { icon: <TrendingUp size={18} />, title: 'Cash Flow Forecasting', desc: 'Real-time budget analysis across all project phases.' },
                            { icon: <Eye size={18} />, title: 'Site Vision AI', desc: 'Detect compliance and monitor progress autonomously.' }
                        ].map((f, i) => (
                            <div key={i} className="flex gap-4 items-start group">
                                <div className="mt-1 rounded-lg flex items-center justify-center p-2.5 bg-[#FF6B00]/10 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors duration-300">
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">{f.title}</h4>
                                    <p className="text-gray-400 text-sm">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-7/12 w-full">
                    {/* Unique Animated Card for Construction */}
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white border border-black/5 aspect-[16/10] flex flex-col">
                        <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-[#111111]">
                            <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-white/20" /><div className="w-3 h-3 rounded-full bg-white/20" /><div className="w-3 h-3 rounded-full bg-white/20" /></div>
                            <div className="text-xs font-mono text-gray-500">marapone_blueprint_analyzer.ts</div>
                        </div>
                        <div className="flex-1 bg-gray-50 relative overflow-hidden p-6 flex items-center justify-center">
                            {/* Blueprint Grid Background */}
                            <div className="absolute inset-0 pattern-grid opacity-10" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, #0055FF 1px, transparent 1px), linear-gradient(to bottom, #0055FF 1px, transparent 1px)' }} />

                            {/* Scanning Animation */}
                            <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute left-0 right-0 h-1 bg-[#FF6B00] shadow-[0_0_20px_#FF6B00] z-20 opacity-50" />

                            {/* Wireframe Building Graphic */}
                            <div className="relative z-10 w-full max-w-xs aspect-square border-2 border-white/20 rounded-xl flex flex-col p-4 bg-black/50 backdrop-blur-sm">
                                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-1/2 h-1/2 border-r-2 border-b-2 border-[#FF6B00]" />
                                <div className="absolute bottom-4 right-4 text-[#FF6B00] font-mono text-xs">DATA: Extracted ✓</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 2. Logistics Showcase
function LogisticsShowcase() {
    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="py-8 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-5/12">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/5 text-[#0EA5E9] text-xs font-bold tracking-wider mb-6">
                        <Truck size={14} className="mr-2" /> GLOBAL SUPPLY CHAIN TWIN
                    </div>
                    <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">Predictive Routing Automation</h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                        Transform your logistics network into a real-time digital twin to predict transit delays and automate customs compliance, saving millions in demurrage and routing inefficiencies.
                    </p>
                    <div className="space-y-5 border-t border-white/5 pt-6">
                        {[
                            { icon: <MapPin size={18} />, title: 'Predictive Routing', desc: 'Dynamic rerouting based on global weather and port data.' },
                            { icon: <FileText size={18} />, title: 'Customs Automation', desc: 'Extract and validate codes from transit logistics docs.' },
                            { icon: <Activity size={18} />, title: 'Delay Forecasting', desc: 'ML models predict transit bottlenecks weeks early.' }
                        ].map((f, i) => (
                            <div key={i} className="flex gap-4 items-start group">
                                <div className="mt-1 rounded-lg flex items-center justify-center p-2.5 bg-[#0EA5E9]/10 text-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-white transition-colors duration-300">
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">{f.title}</h4>
                                    <p className="text-gray-400 text-sm">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-7/12 w-full">
                    {/* Unique Animated Card for Logistics */}
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white border border-black/5 aspect-[16/10] flex flex-col">
                        <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-[#111111] text-white">
                            <div className="text-xs font-mono text-[#0EA5E9]">NODE MAP: GLOBAL</div>
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Tracking Active</span></div>
                        </div>
                        <div className="flex-1 bg-gray-50 relative overflow-hidden flex items-center justify-center p-8">
                            {/* Map-like dark background */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0EA5E9 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                            {/* Animated routing line */}
                            <div className="relative w-full h-full max-w-md max-h-48 border border-black/5 rounded-3xl bg-white/50 p-6 backdrop-blur-md">
                                <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    <motion.path
                                        d="M 50 150 Q 150 50, 250 150 T 350 50"
                                        fill="transparent"
                                        stroke="#0EA5E9"
                                        strokeWidth="3"
                                        strokeDasharray="10 10"
                                        animate={{ strokeDashoffset: [0, -40] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.svg>

                                {/* Nodes */}
                                <div className="absolute top-[40px] left-[340px] w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#0EA5E9]" />
                                <div className="absolute top-[140px] left-[40px] w-4 h-4 rounded-full bg-[#0EA5E9]" />

                                <div className="absolute bottom-4 left-4 right-4 bg-white/80 border border-black/5 p-3 rounded-xl flex justify-between items-center text-xs font-mono text-[#1a1a1a]">
                                    <span>Route optimized: Weather incident bypassed.</span>
                                    <span className="text-green-400">ETA: -12hrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 3. Marketing Showcase
function MarketingShowcase() {
    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="py-8 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-5/12">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5 text-[#F59E0B] text-xs font-bold tracking-wider mb-6">
                        <Target size={14} className="mr-2" /> GROWTH ENGINE AI
                    </div>
                    <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">Hyper-Personalization at Scale</h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                        Deploy generative campaigns that automatically optimize based on proprietary predictive lead scoring. Identify high-value enterprise accounts proactively before competitors do.
                    </p>
                    <div className="space-y-5 border-t border-white/5 pt-6">
                        {[
                            { icon: <Target size={18} />, title: 'Predictive Lead Scoring', desc: 'Identify high-value enterprise accounts proactively.' },
                            { icon: <MessageSquare size={18} />, title: 'Generative Campaigns', desc: 'Create millions of ad variations instantly.' },
                            { icon: <BarChart3 size={18} />, title: 'Sentiment Analysis', desc: 'Ingest CRM data to measure brand health instantly.' }
                        ].map((f, i) => (
                            <div key={i} className="flex gap-4 items-start group">
                                <div className="mt-1 rounded-lg flex items-center justify-center p-2.5 bg-[#F59E0B]/10 text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-white transition-colors duration-300">
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">{f.title}</h4>
                                    <p className="text-gray-400 text-sm">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-7/12 w-full">
                    {/* Unique Animated Card for Marketing */}
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white border border-black/5 aspect-[16/10] flex flex-col">
                        <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-[#111111] text-white">
                            <div className="font-bold text-sm">Campaign Dashboard</div>
                            <div className="text-xs bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full font-bold">LIVE</div>
                        </div>
                        <div className="flex-1 bg-gray-50 relative overflow-hidden flex items-end p-6">
                            {/* Bar Chart Animation */}
                            <div className="w-full h-full flex items-end justify-between gap-2">
                                {[30, 50, 40, 70, 60, 90, 80, 100].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-full bg-gradient-to-t from-[#F59E0B] to-[#FFCF70] rounded-t-sm"
                                        initial={{ height: "0%" }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                                    />
                                ))}
                            </div>

                            {/* Overlay Card */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-black/5 w-48">
                                <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Conversion Rate</div>
                                <div className="text-3xl font-black text-[#1a1a1a] mb-2">+42%</div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: "0%" }} animate={{ width: "85%" }} transition={{ delay: 1.5, duration: 1 }} className="h-full bg-green-500" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// 4. E-Commerce Showcase
function EcommerceShowcase() {
    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="py-8 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-5/12">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-[#8B5CF6] text-xs font-bold tracking-wider mb-6">
                        <Package size={14} className="mr-2" /> REVENUE OPTIMIZATION
                    </div>
                    <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">Dynamic Pricing & Support</h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                        Maximize margins with intelligent dynamic pricing while deploying fully autonomous support agents that understand your catalog and integrate directly into your CMS.
                    </p>
                    <div className="space-y-5 border-t border-white/5 pt-6">
                        {[
                            { icon: <DollarSign size={18} />, title: 'Dynamic Pricing', desc: 'Algorithmic repricing based on competitor stock and demand.' },
                            { icon: <Package size={18} />, title: 'Demand Forecasting', desc: 'Predict stock depletion down to the exact SKU.' },
                            { icon: <Bot size={18} />, title: 'Autonomous Agents', desc: 'Resolve 80% of L1 support tickets without human intervention.' }
                        ].map((f, i) => (
                            <div key={i} className="flex gap-4 items-start group">
                                <div className="mt-1 rounded-lg flex items-center justify-center p-2.5 bg-[#8B5CF6]/10 text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">{f.title}</h4>
                                    <p className="text-gray-400 text-sm">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-7/12 w-full">
                    {/* Unique Animated Card for E-Commerce */}
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white border border-black/5 aspect-[16/10] flex flex-col">
                        <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-[#111111] text-white">
                            <div className="flex items-center gap-3">
                                <Bot size={20} className="text-[#8B5CF6]" />
                                <span className="font-bold text-sm tracking-wide">Automated Customer Resolution</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex flex-col p-6 gap-4">

                            {/* Chat Bubbles Animation */}
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="self-start bg-white border border-black/5 p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]">
                                <p className="text-sm text-[#374151]">"Where is my order #19284 for the ergonomic chair? It's been 3 days."</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }} className="self-end bg-[#8B5CF6] p-4 rounded-2xl rounded-tr-sm shadow-md max-w-[80%] text-white relative">
                                <p className="text-sm">"I've located your order. It left the Memphis hub 2 hours ago. It is scheduled for delivery tomorrow between 2-4 PM.<br /><br />Would you like text updates?"</p>
                                <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex gap-1">
                                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                Ticket Resolved Automatically
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


// ─── Feature Tabs ─────────────────────────────────────────────────────────────
function FeatureTabsSection() {
    const tabs = [
        { id: 'construction', label: 'Construction', icon: <HardHat size={16} /> },
        { id: 'logistics', label: 'Logistics', icon: <Truck size={16} /> },
        { id: 'marketing', label: 'Marketing', icon: <TrendingUp size={16} /> },
        { id: 'ecommerce', label: 'E-Commerce', icon: <Package size={16} /> },
        { id: 'ai', label: 'Gasper AI Engine', icon: <Bot size={16} /> },
        { id: 'llm', label: 'Custom LLMs', icon: <Brain size={16} /> },
    ];

    const [active, setActive] = useState('construction');

    const renderContent = () => {
        switch (active) {
            case 'construction': return <ConstructionShowcase />;
            case 'logistics': return <LogisticsShowcase />;
            case 'marketing': return <MarketingShowcase />;
            case 'ecommerce': return <EcommerceShowcase />;
            case 'ai': return <GasperAIBotSection />;
            case 'llm': return <CustomLLMBuilderSection />;
            default: return <ConstructionShowcase />;
        }
    };

    return (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
            <div className="text-center mb-10">
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-sm uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: C.primary }}>
                    Platform Modules
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4" style={{ letterSpacing: '-0.03em' }}>
                    Explore the <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }}>Gasper Platform</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-2xl mx-auto" style={{ color: C.textMuted }}>
                    Click any module below to explore its capabilities.
                </motion.p>
            </div>

            {/* Tab bar */}
            <div className="flex overflow-x-auto hide-scrollbar pb-4 mb-4 sm:mb-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 gap-2 px-1 sm:px-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
                        style={active === tab.id
                            ? { background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, color: '#fff', boxShadow: `0 4px 16px ${C.primaryGlow}` }
                            : { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', color: '#6b7280' }
                        }
                    >
                        {tab.icon}
                        <span className="inline-block whitespace-nowrap">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ComingSoonContent() {
    return (
        <div className="relative z-10">

            {/* ══ GASPER ENGINE INFO ══ */}
            <GasperEngineInfoSection />

            {/* ══ ENTERPRISE ARCHITECTURE ══ */}
            <B2BEnterpriseSection />

            <div className="section-divider" />

            {/* ══ ADVANTAGES ══ */}
            <ComparisonTableSection />

            <div className="section-divider" />

            {/* ══ MULTI-AGENT ORCHESTRATION (New High-End Feature) ══ */}
            <AgentOrchestrationSection />

            <div className="section-divider" />

            {/* ══ PLATFORM MODULES (Tabbed) ══ */}
            <FeatureTabsSection />

            <div className="section-divider" />

            {/* ══ INDUSTRIES ══ */}
            <section className="px-4 sm:px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                <div className="text-center mb-12">
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-sm uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: C.primary }}>
                        Built for your sector
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4" style={{ letterSpacing: '-0.03em' }}>
                        Engineered for Every Sector
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-lg" style={{ color: C.textMuted }}>
                        Tailored integrations using the GasperAI engine, designed to solve the unique challenges of your industry.
                    </motion.p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <IndustryCard icon={<HardHat size={28} />} title="Construction" description="Blueprint takeoffs, site security vision, schedule optimization, and predictive cash flow modeling." color="text-[#FF6B00]" useCase="Full Project Intelligence" />
                    <IndustryCard icon={<Truck size={28} />} title="Logistics" description="Predictive automated routing, real-time supply chain tracking, and customs document extraction." color="text-[#0EA5E9]" useCase="Global Digital Twin" />
                    <IndustryCard icon={<TrendingUp size={28} />} title="Marketing" description="Automated ad campaign optimization, predictive lead scoring, and customer sentiment analysis." color="text-[#F59E0B]" useCase="AI-Driven Growth" />
                    <IndustryCard icon={<Package size={28} />} title="E-Commerce" description="Dynamic pricing algorithms, smart inventory forecasting, and autonomous support agents." color="text-[#8B5CF6]" useCase="Revenue Optimization" />
                </div>
            </section>

            <div className="section-divider" />

            {/* ══ TECHNOLOGY STACK ══ */}
            <TechnologyStackSection />

            <div className="section-divider" />

            {/* ══ WHAT YOU'LL GET + WAITLIST (side-by-side) ══ */}
            <section className="px-4 sm:px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Left: What You'll Get */}
                    <div>
                        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">The Engagement Process</h2>
                        <p className="mb-8 text-lg" style={{ color: C.textMuted }}>We don't do self-serve SaaS. We engineer bespoke integrations that become permanent competitive advantages.</p>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {[
                                { icon: <PhoneCall size={22} />, title: 'Discovery Phase', description: 'Deep-dive audit of your current workflows and data silos to identify high-ROI automation targets.' },
                                { icon: <Code size={22} />, title: 'Custom Architecture', description: 'We architect and train isolated LLMs exclusively on your operational history and guidelines.' },
                                { icon: <Plug size={22} />, title: 'Seamless Integration', description: 'Deployment of autonomous agents that connect organically to your existing ERPs and CRMs.' },
                                { icon: <Key size={22} />, title: 'Complete Handover', description: 'Zero vendor lock-in. You own the models, the data pipelines, and the infrastructure forever.' },
                            ].map((b, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.6 }}
                                    className="rounded-2xl p-6 group transition-all duration-300 relative overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.03] to-transparent rounded-bl-full -z-0" />
                                    <div className="relative z-10 w-12 h-12 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform bg-black/5 text-[#1a1a1a]">
                                        {b.icon}
                                    </div>
                                    <h3 className="text-[#1a1a1a] font-bold mb-2 text-lg relative z-10">{b.title}</h3>
                                    <p className="text-sm leading-relaxed relative z-10" style={{ color: C.textMuted }}>{b.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Waitlist Form */}
                    <WaitlistSection />
                </div>
            </section>
        </div>
    );
}
