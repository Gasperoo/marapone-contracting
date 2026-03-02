import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    Activity, TrendingUp, ShieldCheck, Zap, Lock,
    Database, Cpu, Server, BarChart3,
    HardHat, Fuel,
    CheckCircle2, Mail, Layers, AlertTriangle,
    DollarSign, Star, Clock, Users, Building2, Check, Sparkles, Award, TrendingDown,
    Bot, MessageSquare, Brain, FileText, Send, MapPin, Ruler, Eye, Wrench, Hammer
} from 'lucide-react';
import Particles from '../Particles/Particles';
import { PlatformPillarsSection, ConstructionFeaturesSection, BlueprintAISection, CashFlowSection, SiteSecuritySection } from './ConstructionShowcase';
import { SubcontractorMatchSection, ProjectCommandCenter, ROIImpactSection, ScheduleOptimizerSection } from './ConstructionAdvanced';

// ─── Theme constants ─────────────────────────────────────────────────────────
const C = {
    primary: '#FF6B00',
    secondary: '#F59E0B',
    primaryGlow: 'rgba(255,107,0,0.15)',
    secondaryGlow: 'rgba(245,158,11,0.12)',
    bg: '#070C09',
    surface: '#0D1610',
    border: 'rgba(255,107,0,0.12)',
    borderHover: 'rgba(255,107,0,0.30)',
    textMuted: '#94a3b8',
};

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
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ background: `linear-gradient(135deg, #fff 30%, ${C.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full rounded-2xl overflow-hidden group"
        >
            <div className="absolute -inset-[1px] rounded-2xl z-0 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${C.primary}40, ${C.secondary}25, ${C.primary}40)`, opacity: isFocused ? 0.9 : 0.2 }} />
            <div className="absolute inset-[1px] rounded-2xl z-[1]" style={{ background: 'rgba(13,22,16,0.95)', backdropFilter: 'blur(20px)' }} />
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: useTransform([position.x, position.y], ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,107,0,0.10), rgba(245,158,11,0.05) 30%, transparent 55%)`) }}
            />
            <div className="relative p-8 h-full flex flex-col z-10">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500" style={{ background: `${C.primary}15`, color: C.primary, boxShadow: `0 0 25px ${C.primaryGlow}` }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 transition-colors duration-300" style={{ ...(isFocused ? { color: C.secondary } : {}) }}>{title}</h3>
                <p className="mb-6 leading-relaxed flex-grow" style={{ color: C.textMuted }}>{description}</p>
                <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                    <ul className="grid grid-cols-1 gap-3">
                        {details.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-300">
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
            className="group relative rounded-[1.5rem] overflow-hidden"
        >
            <div className="absolute -inset-[1px] rounded-[1.5rem] z-0 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${C.primary}20, ${C.secondary}12, ${C.primary}20)`, opacity: 0.4 }} />
            <div className="absolute inset-[1px] rounded-[1.5rem] z-0 transition-colors duration-500" style={{ background: 'rgba(13,22,16,0.92)' }} />
            <div className="relative z-10 p-10 h-full flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-8 ${color} group-hover:scale-105 transition-transform duration-500`} style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-[#F59E0B]">{title}</h3>
                <p className="text-[15px] leading-relaxed mb-8 flex-grow" style={{ color: C.textMuted }}>{description}</p>
                <div className="mt-auto pt-6 border-t transition-colors" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                    <div className="text-xs uppercase font-semibold mb-2 tracking-widest" style={{ color: '#6b7280' }}>Use Case</div>
                    <div className="text-sm text-slate-200 font-medium">{useCase}</div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Gasper AI Bot Section (Construction-focused) ────────────────────────────
function GasperAIBotSection() {
    const capabilities = [
        { icon: <MessageSquare size={28} />, title: 'Natural Language', description: 'Ask complex questions in plain English — query project budgets, analyze blueprints, and get instant field-ready answers.' },
        { icon: <Brain size={28} />, title: 'Proactive Alerts', description: 'Monitors job sites 24/7 and alerts your PM team to schedule delays, cost overruns, or safety incidents before they escalate.' },
        { icon: <Zap size={28} />, title: 'Instant Automation', description: 'Generate RFIs, classify subcontractor bids, and create progress reports through simple voice or text commands.' },
    ];

    return (
        <section className="px-6 max-w-6xl mx-auto relative overflow-hidden" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
            <div className="text-center mb-16">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
                    style={{ borderColor: `${C.primary}30`, background: `${C.primary}08`, color: C.primary }}>
                    <Bot size={14} /> AI-Powered Copilot
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-5" style={{ letterSpacing: '-0.03em' }}>
                    Meet <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }}>Gasper AI</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.textMuted }}>
                    Your intelligent construction project copilot. Ask anything, get instant site intelligence, and let AI handle the complexity.
                </motion.p>
            </div>

            {/* Chat Mockup */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="max-w-2xl mx-auto mb-20">
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute -inset-[1px] rounded-2xl z-0" style={{ background: `linear-gradient(135deg, ${C.primary}25, ${C.secondary}18, ${C.primary}12)`, opacity: 0.7 }} />
                    <div className="absolute inset-[1px] rounded-2xl z-[1]" style={{ background: 'rgba(7,12,9,0.97)', backdropFilter: 'blur(24px)' }} />
                    <div className="relative z-10 p-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center p-1" style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }}>
                                <img src="/images/gasper-logo-g.png" alt="Gasper AI" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">Gasper AI</div>
                                <div className="text-[10px] text-emerald-400 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Online — Construction Mode</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {/* User */}
                            <div className="flex justify-end">
                                <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]" style={{ background: `${C.primary}18`, border: `1px solid ${C.primary}25` }}>
                                    <p className="text-white text-sm">What's the projected cash flow shortfall for Phase 2 of the Westside Commercial project?</p>
                                </div>
                            </div>
                            {/* AI Response */}
                            <div className="flex justify-start">
                                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p className="text-slate-300 text-sm mb-3">Analyzed 14 billing cycles + subcontractor invoices:</p>
                                    <div className="rounded-lg p-3 mb-2" style={{ background: `${C.primary}10`, border: `1px solid ${C.primary}18` }}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: C.secondary }}><Star size={10} fill="currentColor" /> PROJECTED SHORTFALL</span>
                                            <span className="text-white font-bold text-sm">$142,000</span>
                                        </div>
                                        <div className="text-xs text-slate-400 flex items-center gap-3">
                                            <span>Weeks 18–22</span>
                                            <span className="flex items-center gap-1 text-amber-400"><Clock size={10} /> Retention issue</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-slate-500 space-y-1">
                                        <div className="flex justify-between"><span>MaterialCosts variance</span><span className="text-slate-400">+$38k over budget</span></div>
                                        <div className="flex justify-between"><span>Owner draws pending</span><span className="text-slate-400">$104k held</span></div>
                                    </div>
                                </div>
                            </div>
                            {/* Alert */}
                            <div className="flex justify-start">
                                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" style={{ color: C.secondary }} />
                                        <div>
                                            <p className="text-[11px] font-semibold mb-0.5 uppercase tracking-wide" style={{ color: C.secondary }}>Proactive Alert</p>
                                            <p className="text-slate-300 text-sm">Electrical sub has 3 pending invoices — shall I flag the GC for expedited approval?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 pt-4 border-t" style={{ borderColor: 'rgba(255,107,0,0.06)' }}>
                            <div className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <input type="text" placeholder="Ask Gasper AI anything about your projects..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-600" disabled />
                                <Send size={15} className="text-slate-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Capability Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {capabilities.map((cap, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }} className="relative rounded-2xl overflow-hidden group">
                        <div className="absolute -inset-[1px] rounded-2xl z-0 transition-opacity duration-500 opacity-10 group-hover:opacity-30" style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }} />
                        <div className="absolute inset-[1px] rounded-2xl z-[1]" style={{ background: 'rgba(13,22,16,0.97)' }} />
                        <div className="relative z-10 p-8 text-center">
                            <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" style={{ background: `${C.primary}08`, border: `1px solid ${C.primary}15`, color: C.secondary }}>
                                {cap.icon}
                            </div>
                            <h3 className="text-white font-bold text-lg mb-3">{cap.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{cap.description}</p>
                        </div>
                    </motion.div>
                ))}
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Enterprise-Grade Stack</h2>
                <p className="text-sm max-w-lg mx-auto" style={{ color: '#64748b' }}>Built on the most secure, scalable infrastructure in the industry.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techCategories.map((cat, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.6 }}
                        className="p-5 rounded-xl transition-all" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,0,0.08)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${C.primary}25`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.08)'}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span style={{ color: C.secondary }}>{cat.icon}</span>
                            <h3 className="text-white font-semibold text-sm">{cat.category}</h3>
                        </div>
                        <ul className="space-y-1.5">
                            {cat.technologies.map((tech, i) => (
                                <li key={i} className="text-xs flex items-center" style={{ color: '#64748b' }}>
                                    <div className="w-1 h-1 rounded-full mr-2" style={{ background: '#374151' }} />{tech}
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
        { value: '10×', label: 'Faster Estimates', desc: 'Blueprint AI analyzes plans in minutes, not days', icon: <Zap size={22} /> },
        { value: '99.2%', label: 'Budget Accuracy', desc: 'AI-powered cash flow forecasting across all phases', icon: <TrendingUp size={22} /> },
        { value: '<5min', label: 'Setup Time', desc: 'Onboard your first job site in under five minutes', icon: <Clock size={22} /> },
    ];

    const transformations = [
        { before: 'Manual takeoffs from paper blueprints', after: 'AI extracts quantities & generates BOMs automatically', icon: <Ruler size={18} /> },
        { before: 'Spreadsheet-based budget guesswork', after: 'Real-time cash flow projections per project phase', icon: <DollarSign size={18} /> },
        { before: 'Reactive theft & loss reporting', after: 'Computer vision monitoring with instant alerts', icon: <Eye size={18} /> },
        { before: 'Word-of-mouth subcontractor sourcing', after: 'AI-scored matching by trade, capacity & track record', icon: <Users size={18} /> },
        { before: 'Disconnected project spreadsheets', after: 'Unified command center across every job site', icon: <Layers size={18} /> },
    ];

    const differentiators = ['No per-seat fees', 'SOC 2 Certified', 'Unlimited job sites', '24/7 AI support'];

    return (
        <section className="px-6 max-w-6xl mx-auto py-24 relative">
            <div className="text-center mb-20 relative z-10">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
                    style={{ borderColor: `${C.primary}35`, background: `${C.primary}10`, color: C.primary }}>
                    <Award size={14} className="inline mr-2" />The Gasper Advantage
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-5"
                    style={{ background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Why Industry Leaders Choose Gasper
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-lg max-w-2xl mx-auto" style={{ color: C.textMuted }}>
                    Purpose-built AI that transforms how construction teams build — from groundbreak to certificate of occupancy.
                </motion.p>
            </div>

            {/* Metric Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="relative rounded-2xl p-8 text-center overflow-hidden group"
                        style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(ellipse at center, ${C.primaryGlow} 0%, transparent 70%)` }} />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${C.primary}12`, color: C.primary }}>{m.icon}</div>
                            <div className="text-5xl font-black mb-2" style={{ background: `linear-gradient(135deg, #fff 30%, ${C.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.value}</div>
                            <div className="text-white font-bold text-lg mb-2">{m.label}</div>
                            <p className="text-sm" style={{ color: C.textMuted }}>{m.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Before / After */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-3xl p-8 md:p-12 mb-10" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                <h3 className="text-2xl font-bold text-white text-center mb-10">The Old Way vs. The Gasper Way</h3>
                <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,107,0,0.06)' }}>
                    {transformations.map((t, i) => (
                        <div key={i} className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-500" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.12)' }}>{t.icon}</div>
                                <span className="text-sm text-slate-500 line-through">{t.before}</span>
                            </div>
                            <div className="hidden md:flex w-8 h-8 rounded-full items-center justify-center text-xs font-bold flex-shrink-0 mx-auto" style={{ background: `${C.primary}15`, color: C.primary }}>→</div>
                            <div className="flex items-center gap-3 md:justify-end">
                                <span className="text-sm text-slate-200 font-medium">{t.after}</span>
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
        { icon: <Zap size={24} />, title: 'Early Access', description: 'Join our private beta and shape the platform before public launch' },
        { icon: <DollarSign size={24} />, title: 'Founding Rate', description: 'Lock in 40% off enterprise pricing for life as a founding member' },
        { icon: <Award size={24} />, title: 'White-Glove Onboarding', description: 'Dedicated implementation support from our construction AI experts' },
        { icon: <Users size={24} />, title: 'Investor Updates', description: 'Quarterly product roadmap calls direct with founders and leadership' },
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto relative overflow-hidden" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You'll Get</h2>
                <p className="max-w-xl mx-auto" style={{ color: C.textMuted }}>Founding members and early partners get exclusive access to shape the future of construction AI.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((b, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }}
                        className="relative rounded-2xl overflow-hidden group">
                        <div className="absolute -inset-[1px] rounded-2xl z-0 transition-opacity duration-500 opacity-15 group-hover:opacity-35" style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }} />
                        <div className="absolute inset-[1px] rounded-2xl z-[1]" style={{ background: C.surface }} />
                        <div className="relative z-10 p-7 text-center">
                            <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" style={{ background: `${C.primary}08`, border: `1px solid ${C.primary}15`, color: C.primary }}>
                                {b.icon}
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
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
    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <div className="text-center mb-16 relative z-10">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
                    style={{ borderColor: `${C.primary}30`, background: `${C.primary}10`, color: C.primary }}>
                    <Brain size={14} className="mr-2" /> Bespoke Enterprise AI
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Gasper <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }}>Custom LLM Builder</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: C.textMuted }}>
                    We build powerful <strong className="text-white">custom Large Language Models</strong> designed specifically for construction. Trained on your project histories, specs, contracts, and workflows — an AI that truly speaks your business language.
                </motion.p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {[
                    { icon: <Cpu size={28} />, bg: <Database size={120} />, title: 'How We Build', body: 'Our experts fine-tune models using your internal documents, project archives, safety protocols, subcontractor records, and operational data — creating an AI that understands your construction business deeply.' },
                    { icon: <Zap size={28} />, bg: <Layers size={120} />, title: 'Seamless Integration', body: 'We embed your custom LLM into Procore, Autodesk, existing ERP systems, or custom dashboards via secure APIs. On-premise or cloud — your data never leaves your control.' },
                    { icon: <TrendingUp size={28} />, bg: <ShieldCheck size={120} />, title: 'Why You Need It', body: 'Off-the-shelf AI misses construction nuances and exposes sensitive data. With Gasper, you gain unmatched accuracy on estimates, RFI drafting, safety compliance, delay forecasting, and contract analysis — at a fraction of the engineering cost.' },
                ].map((card, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * (i + 1), duration: 0.6 }}
                        className="relative rounded-2xl p-8 border group hover:border-white/20 transition-all overflow-hidden"
                        style={{ background: 'rgba(13,22,16,0.85)', borderColor: C.border, backdropFilter: 'blur(20px)' }}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${C.primary}04, ${C.secondary}02)` }} />
                        <div className="absolute -right-4 -top-4 p-6 transition-opacity duration-500 opacity-[0.03] group-hover:opacity-[0.05]">{card.bg}</div>
                        <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center shadow-lg shadow-black/20" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.primary }}>
                            {card.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                        <p className="text-[15px] leading-relaxed relative z-10" style={{ color: C.textMuted }}>{card.body}</p>
                    </motion.div>
                ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.05] blur-[100px] rounded-[100%] pointer-events-none -z-10"
                style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})` }} />
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
        <section id="waitlist-section" className="px-6 max-w-4xl mx-auto relative" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                <div className="w-[600px] h-[400px] rounded-full opacity-10 blur-[120px]" style={{ background: `radial-gradient(ellipse, ${C.primary}, ${C.secondary})` }} />
            </div>

            <div className="text-center mb-16">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-semibold mb-6"
                    style={{ borderColor: `${C.primary}30`, background: `${C.primary}08`, color: C.primary }}>
                    <Sparkles size={14} className="mr-2" /> Limited Early Access
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
                    Request Early Access
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.textMuted }}>
                    We're onboarding a select group of construction companies and strategic investors in Q2 2025. Secure your spot and lock in founding-member pricing.
                </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden">
                <div className="absolute -inset-[1px] rounded-3xl z-0" style={{ background: `linear-gradient(135deg, ${C.primary}40, ${C.secondary}25, ${C.primary}20)` }} />
                <div className="absolute inset-[1px] rounded-3xl z-[1]" style={{ background: 'rgba(7,12,9,0.97)', backdropFilter: 'blur(24px)' }} />

                <div className="relative z-10 p-8 md:p-12">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `${C.primary}15`, border: `2px solid ${C.primary}40` }}>
                                <Check size={36} style={{ color: C.secondary }} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">You're In</h3>
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
                                        <label className="block text-sm font-semibold mb-2 text-slate-300">{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleInputChange}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                                            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors[field.name] ? 'rgba(239,68,68,0.5)' : 'rgba(255,107,0,0.12)'}`, color: 'white' }}
                                            onFocus={e => e.target.style.borderColor = `${C.primary}50`}
                                            onBlur={e => e.target.style.borderColor = errors[field.name] ? 'rgba(239,68,68,0.5)' : 'rgba(255,107,0,0.12)'}
                                        />
                                        {errors[field.name] && <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>}
                                    </div>
                                ))}
                            </div>

                            {status === 'error' && <p className="text-red-400 text-sm text-center py-2">{message}</p>}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, boxShadow: `0 8px 30px ${C.primaryGlow}`, opacity: status === 'loading' ? 0.7 : 1 }}
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
        </section>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ComingSoonContent() {
    return (
        <div className="relative" style={{ background: C.bg }}>
            {/* Particles Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <Particles
                    particleColors={[C.primary, C.secondary, '#F97316']}
                    particleCount={20}
                    particleSpread={12}
                    speed={0.015}
                    particleBaseSize={25}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                    sizeRandomness={1.2}
                    cameraDistance={30}
                    pixelRatio={Math.min(window.devicePixelRatio, 1.5)}
                />
            </div>

            {/* ══ STATS ══ */}
            <section className="px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                <div className="text-center mb-12">
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-sm uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: C.primary }}>
                        Construction Intelligence
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white">
                        By the Numbers
                    </motion.h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Counter value={850} label="Active Job Sites" suffix="+" />
                    <Counter value={99} label="Safety Score" suffix="%" />
                    <Counter value={5} label="Managed Value ($B)" suffix="B+" />
                    <Counter value={20} label="Blueprints Analyzed" suffix="M+" />
                </div>
            </section>

            <div className="section-divider" />

            {/* ══ CONSTRUCTION FEATURES ══ */}
            <ConstructionFeaturesSection />

            <div className="section-divider" />

            {/* ══ ADVANTAGES ══ */}
            <ComparisonTableSection />

            <div className="section-divider" />

            {/* ══ DEEP DIVES ══ */}
            <BlueprintAISection />
            <CashFlowSection />
            <SiteSecuritySection />

            {/* ══ ADVANCED SECTIONS ══ */}
            <SubcontractorMatchSection />
            <ProjectCommandCenter />
            <ROIImpactSection />
            <ScheduleOptimizerSection />

            <div className="section-divider" />

            {/* ══ INDUSTRIES ══ */}
            <section className="px-6 max-w-7xl mx-auto" style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'var(--section-pad-y)' }}>
                <div className="text-center mb-20">
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-sm uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: C.primary }}>
                        Built for your sector
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
                        Engineered for Every Sector
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-lg" style={{ color: C.textMuted }}>
                        Tailored solutions for the unique challenges of construction and infrastructure.
                    </motion.p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <IndustryCard icon={<HardHat size={28} />} title="General Contracting" description="AI-powered project management, cash flow forecasting, and compliance automation for GCs of all sizes." color="text-[#FF6B00]" useCase="Full Project Lifecycle Intelligence" />
                    <IndustryCard icon={<Building2 size={28} />} title="Commercial Construction" description="Manage multi-million dollar builds with blueprint AI, sub matching, and real-time cost tracking." color="text-amber-400" useCase="Blueprint Analysis & Cost Optimization" />
                    <IndustryCard icon={<Fuel size={28} />} title="Energy & Infrastructure" description="Monitor large-scale energy and infrastructure projects with real-time safety and compliance events." color="text-red-400" useCase="Safety Compliance & Asset Protection" />
                </div>
            </section>

            <div className="section-divider" />

            {/* ══ GASPER AI ══ */}
            <GasperAIBotSection />

            <div className="section-divider" />

            {/* ══ TECHNOLOGY STACK ══ */}
            <TechnologyStackSection />

            <div className="section-divider" />

            {/* ══ CUSTOM LLM ══ */}
            <CustomLLMBuilderSection />

            {/* ══ WHAT YOU'LL GET ══ */}
            <WhatYouGetSection />

            <div className="section-divider" />

            {/* ══ WAITLIST ══ */}
            <WaitlistSection />
        </div>
    );
}
