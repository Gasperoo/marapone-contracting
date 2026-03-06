import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    Activity, TrendingUp, ShieldCheck, Zap, Lock,
    Database, Cpu, Server, BarChart3,
    HardHat, Fuel, Search, Store, Globe,
    CheckCircle2, Mail, Layers, AlertTriangle,
    DollarSign, Star, Clock, Users, Building2, Check, Sparkles, Award, TrendingDown,
    Bot, MessageSquare, Brain, FileText, Send, MapPin, Ruler, Eye, Wrench, Hammer,
    CalendarDays, Shield, Target, Gauge, Timer, ClipboardCheck, Truck, Package
} from 'lucide-react';
import Particles from '../Particles/Particles';
import { PlatformPillarsSection, ConstructionFeaturesSection, BlueprintAISection, CashFlowSection, SiteSecuritySection } from './ConstructionShowcase';
import { ProjectCommandCenter } from './ConstructionAdvanced';

// ─── Theme constants ─────────────────────────────────────────────────────────
const C = {
    primary: '#FF6B00',
    secondary: '#F59E0B',
    primaryGlow: 'rgba(255,107,0,0.12)',
    secondaryGlow: 'rgba(245,158,11,0.08)',
    bg: '#F5F5F5',
    surface: '#FFFFFF',
    border: 'rgba(0,0,0,0.08)',
    borderHover: 'rgba(255,107,0,0.25)',
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
            className="uiverse-neo-card h-full flex flex-col group"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mb-8 ${color} transition-transform duration-500 group-hover:scale-105`} style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 transition-colors duration-300 group-hover:text-[#F59E0B]">{title}</h3>
                <p className="text-[15px] leading-relaxed mb-8 flex-grow" style={{ color: C.textMuted }}>{description}</p>
                <div className="mt-auto pt-6 border-t transition-colors" style={{ borderColor: 'rgba(255,107,0,0.08)' }}>
                    <div className="text-xs uppercase font-semibold mb-2 tracking-widest" style={{ color: '#6b7280' }}>Use Case</div>
                    <div className="text-sm text-[#4b5563] font-medium">{useCase}</div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Gasper AI Bot Section (Revamped — Split Panel) ──────────────────────────
function GasperAIBotSection() {
    const [aiStep, setAiStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setAiStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, [isInView]);

    const pipelineSteps = [
        { label: 'Parse', icon: <MessageSquare size={14} /> },
        { label: 'Reason', icon: <Brain size={14} /> },
        { label: 'Query', icon: <Database size={14} /> },
        { label: 'Respond', icon: <Sparkles size={14} /> },
    ];

    const stats = [
        { value: '<2s', label: 'Response Time', color: '#FF6B00' },
        { value: '14', label: 'Data Sources', color: '#3B82F6' },
        { value: '99.4%', label: 'Accuracy', color: '#10B981' },
        { value: '24/7', label: 'Availability', color: '#8B5CF6' },
    ];

    return (
        <section ref={sectionRef} className="px-4 sm:px-6 max-w-7xl mx-auto py-16 sm:py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                    <Bot size={12} className="mr-2" /> AI CONSTRUCTION COPILOT
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Gasper AI</span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    Ask anything about your projects in plain English. Gasper AI understands construction — budgets, schedules, safety, subcontractors — and delivers answers in seconds.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-white border border-black/8 overflow-hidden shadow-lg">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/6 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">gasper_ai_copilot.chat</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">GPT-4 Turbo</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Online
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="px-5 py-4 space-y-4">
                            {/* User message */}
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="flex justify-end">
                                <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] bg-[#FF6B00]/10 border border-[#FF6B00]/20">
                                    <p className="text-[#1a1a1a] text-sm">Show me projected cash flow for Phase 2 of Westside Commercial</p>
                                </div>
                            </motion.div>

                            {/* AI response */}
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                                className="flex justify-start">
                                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] bg-gray-50 border border-black/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] flex items-center justify-center">
                                            <img src="/images/gasper-logo-g.png" alt="G" className="w-3.5 h-3.5 object-contain" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[#1a1a1a]">Gasper AI</span>
                                        <span className="text-[9px] text-[#9ca3af]">just now</span>
                                    </div>
                                    <p className="text-[#374151] text-sm mb-3">Analyzed 14 billing cycles across 3 cost codes:</p>
                                    <div className="space-y-2 pl-2 border-l-2 border-[#FF6B00]/20">
                                        <div className="flex justify-between text-xs"><span className="text-[#6b7280]">Forecasted shortfall</span><span className="font-bold text-amber-500">$142,000</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-[#6b7280]">Material variance</span><span className="font-bold text-red-500">+$38k over</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-[#6b7280]">Owner retention held</span><span className="font-bold text-[#1a1a1a]">$104k</span></div>
                                    </div>
                                    <div className="mt-3 pt-2 border-t border-black/5 flex items-center gap-2">
                                        <AlertTriangle size={11} className="text-[#F59E0B]" />
                                        <span className="text-[11px] text-[#F59E0B]">Electrical sub has 3 unpaid invoices — flag for review?</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Typing indicator */}
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                                className="flex justify-start">
                                <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-gray-50/50 border border-black/4">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Input bar */}
                        <div className="px-5 py-3 border-t border-black/6">
                            <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gray-50 border border-black/5">
                                <input type="text" placeholder="Ask about any project..." className="flex-1 bg-transparent text-[#1a1a1a] text-sm outline-none placeholder:text-[#9ca3af]" disabled />
                                <Send size={15} className="text-[#FF6B00]" />
                            </div>
                        </div>

                        {/* Pipeline */}
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <Brain size={12} className="text-[#FF6B00]" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">AI Reasoning Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {pipelineSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === aiStep ? 'bg-[#FF6B00]/10 text-[#FF6B00] shadow-sm' : i < aiStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
                                            }`}>
                                            {i < aiStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < pipelineSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < aiStep ? 'bg-[#10B981]' : 'bg-black/8'}`} />
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
                            <div key={i} className="rounded-2xl bg-white border border-black/6 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: 'spring' }} className="text-2xl font-black" style={{ color: s.color }}>
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-white border border-black/6 p-5 shadow-sm space-y-4">
                        {[
                            { icon: <MessageSquare size={18} />, title: 'Natural Language Queries', desc: 'Ask about budgets, schedules, change orders, or safety in plain English — no training needed.', color: '#FF6B00' },
                            { icon: <Zap size={18} />, title: 'Proactive Alerts', desc: 'Gasper AI monitors your projects 24/7, alerting you to risks before they become costly problems.', color: '#F59E0B' },
                            { icon: <FileText size={18} />, title: 'Auto-Generated Reports', desc: 'Daily, weekly, or custom reports built automatically from live project data — share with one click.', color: '#3B82F6' },
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-all group cursor-default">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}12`, color: f.color }}>{f.icon}</div>
                                <div>
                                    <h4 className="text-[#1a1a1a] font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-[#6b7280] text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Example queries */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                        className="rounded-2xl bg-white border border-black/6 p-4 shadow-sm">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-3">Try Asking</div>
                        <div className="space-y-2">
                            {['What materials are over budget?', 'Show pending RFIs for Phase 2', 'Which subs have open change orders?', 'Generate a safety briefing'].map((q, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-black/4 text-[11px] text-[#6b7280]">
                                    <MessageSquare size={10} className="text-[#FF6B00] flex-shrink-0" /> {q}
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
                <p className="text-sm max-w-lg mx-auto" style={{ color: '#64748b' }}>Built on the most secure, scalable infrastructure in the industry.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techCategories.map((cat, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.6 }}
                        className="p-5 rounded-xl transition-all" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(255,107,0,0.08)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${C.primary}25`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.08)'}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span style={{ color: C.secondary }}>{cat.icon}</span>
                            <h3 className="text-[#1a1a1a] font-semibold text-sm">{cat.category}</h3>
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
        <section className="px-4 sm:px-6 max-w-6xl mx-auto py-16 sm:py-24 relative">
            <div className="text-center mb-20 relative z-10">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
                    style={{ borderColor: `${C.primary}35`, background: `${C.primary}10`, color: C.primary }}>
                    <Award size={14} className="inline mr-2" />The Gasper Advantage
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-5"
                    style={{ background: 'linear-gradient(to bottom, #1a1a1a, rgba(26,26,26,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a1a1a] text-center mb-6 sm:mb-10">The Old Way vs. The Gasper Way</h3>
                <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,107,0,0.06)' }}>
                    {transformations.map((t, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4 py-4 sm:py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-500" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.12)' }}>{t.icon}</div>
                                <span className="text-sm text-slate-500 line-through">{t.before}</span>
                            </div>
                            <div className="flex w-8 h-8 rounded-full items-center justify-center text-xs font-bold flex-shrink-0 mx-auto" style={{ background: `${C.primary}15`, color: C.primary }}>→</div>
                            <div className="flex items-center gap-3 md:justify-end">
                                <span className="text-sm text-[#4b5563] font-medium">{t.after}</span>
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
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">What You'll Get</h2>
                <p className="max-w-xl mx-auto" style={{ color: C.textMuted }}>Founding members and early partners get exclusive access to shape the future of construction AI.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((b, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }}
                        className="uiverse-neo-card text-center group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" style={{ background: `${C.primary}08`, border: `1px solid ${C.primary}15`, color: C.primary }}>
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
        { id: 'contracts', name: 'Contract Documents', count: '4,230', type: 'PDF/DOCX', size: '18.2 GB', color: '#FF6B00', icon: <FileText size={14} /> },
        { id: 'rfis', name: 'RFI Archives', count: '12,891', type: 'Structured', size: '5.6 GB', color: '#3B82F6', icon: <MessageSquare size={14} /> },
        { id: 'specs', name: 'Project Specifications', count: '1,847', type: 'PDF', size: '22.1 GB', color: '#10B981', icon: <ClipboardCheck size={14} /> },
        { id: 'safety', name: 'Safety Protocols', count: '3,456', type: 'Mixed', size: '8.3 GB', color: '#F59E0B', icon: <Shield size={14} /> },
        { id: 'cost', name: 'Cost Databases', count: '89,102', type: 'CSV/SQL', size: '2.1 GB', color: '#8B5CF6', icon: <Database size={14} /> },
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
                    <Brain size={12} className="mr-2" /> CUSTOM LLM BUILDER
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    Gasper <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#FF6B00]">Custom LLM Builder</span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    We build powerful <strong className="text-[#1a1a1a]">custom Large Language Models</strong> designed specifically for construction. Trained on your project histories, specs, contracts, and workflows.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-white border border-black/8 overflow-hidden shadow-lg">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/6 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">llm_training_pipeline.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">5 Sources</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-purple-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                    Training
                                </div>
                            </div>
                        </div>

                        {/* Training Progress */}
                        <div className="px-5 pt-4 pb-2">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">Model Training Progress</span>
                                <span className="text-sm font-black text-purple-500">78%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '78%' }} transition={{ duration: 1.5, ease: 'easeOut' }}
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#FF6B00]" />
                            </div>
                        </div>

                        {/* Data Sources */}
                        <div className="px-5 py-3 space-y-2">
                            {dataSources.map((src, i) => {
                                const isActive = activeSource === src.id;
                                return (
                                    <motion.div
                                        key={src.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.08, type: 'spring', bounce: 0.2 }}
                                        viewport={{ once: true }}
                                        className="p-3 rounded-xl cursor-pointer transition-all duration-300"
                                        style={{
                                            border: isActive ? `1px solid ${src.color}40` : '1px solid rgba(0,0,0,0.04)',
                                            background: isActive ? `${src.color}04` : 'rgba(0,0,0,0.01)',
                                        }}
                                        onMouseEnter={() => setActiveSource(src.id)}
                                        onMouseLeave={() => setActiveSource(null)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${src.color}15`, color: src.color }}>
                                                    {src.icon}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#1a1a1a]">{src.name}</div>
                                                    <div className="text-[10px] text-[#9ca3af]">{src.count} documents</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-gray-50 border border-black/5 text-[#9ca3af]">{src.type}</span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 pt-2 border-t border-black/5">
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">Documents</div>
                                                        <div className="text-[11px] font-bold text-[#1a1a1a] font-mono">{src.count}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">Size</div>
                                                        <div className="text-[11px] font-bold" style={{ color: src.color }}>{src.size}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">Status</div>
                                                        <div className="text-[11px] font-bold text-[#10B981]">Ingested</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pipeline */}
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <Cpu size={12} className="text-purple-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">LLM Training Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {pipelineSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === trainStep ? 'bg-purple-500/10 text-purple-500 shadow-sm' : i < trainStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
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
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-3">
                        {stats.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-white border border-black/6 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: 'spring' }} className="text-2xl font-black" style={{ color: s.color }}>
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-white border border-black/6 p-5 shadow-sm space-y-4">
                        {[
                            { icon: <Cpu size={18} />, title: 'Custom Fine-Tuning', desc: 'We fine-tune models on your internal documents, project archives, safety protocols, and operational data.', color: '#8B5CF6' },
                            { icon: <Zap size={18} />, title: 'Seamless Integration', desc: 'Embed into Procore, Autodesk, ERP systems, or custom dashboards via secure APIs. On-premise or cloud.', color: '#FF6B00' },
                            { icon: <Lock size={18} />, title: 'Enterprise Security', desc: 'Your data never leaves your control. SOC 2 compliant, on-premise deployment options, and encrypted at rest.', color: '#10B981' },
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-all group cursor-default">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}12`, color: f.color }}>{f.icon}</div>
                                <div>
                                    <h4 className="text-[#1a1a1a] font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-[#6b7280] text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 justify-center">
                        {['Fine-Tuning', 'RAG Pipeline', 'Vector DB', 'On-Premise', 'API Access', 'Multi-Tenant'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-purple-500/30 hover:text-purple-500 transition-all cursor-default">{tag}</span>
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
                <div className="w-[400px] h-[300px] rounded-full opacity-10 blur-[120px]" style={{ background: `radial-gradient(ellipse, ${C.primary}, ${C.secondary})` }} />
            </div>

            <div className="mb-8">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-semibold mb-4"
                    style={{ borderColor: `${C.primary}30`, background: `${C.primary}08`, color: C.primary }}>
                    <Sparkles size={14} className="mr-2" /> Limited Early Access
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-3xl font-bold text-[#1a1a1a] mb-3" style={{ letterSpacing: '-0.02em' }}>
                    Request Early Access
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-base leading-relaxed" style={{ color: C.textMuted }}>
                    We're onboarding a select group of construction companies and strategic investors in Q2 2025. Secure your spot.
                </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden">
                <div className="absolute -inset-[1px] rounded-3xl z-0" style={{ background: `linear-gradient(135deg, ${C.primary}40, ${C.secondary}25, ${C.primary}20)` }} />
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
                                        <label className="block text-sm font-semibold mb-2 text-[#374151]">{field.label}</label>
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
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Finds the Best Prices</span> Instantly
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
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
                    <div className="relative rounded-3xl bg-white border border-black/8 overflow-hidden shadow-lg">
                        {/* ── Toolbar ── */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/6 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">material_price_scan.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[10px] font-mono text-[#6b7280]">
                                    <MapPin size={10} /> <span className="text-[#FF6B00] font-semibold">Your Location</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Live
                                </div>
                            </div>
                        </div>

                        {/* ── Supplier Header Row ── */}
                        <div className="px-5 pt-4 pb-2 border-b border-black/4">
                            <div className="grid grid-cols-[1.8fr_repeat(4,1fr)] gap-2 items-center">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">Material</div>
                                {stores.map((s, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white" style={{ background: s.color }}>
                                            {s.initial}
                                        </div>
                                        <span className="text-[9px] font-semibold text-[#6b7280] hidden sm:block">{s.name}</span>
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
                                        <div className="text-sm font-semibold text-[#1a1a1a] leading-tight">{m.item}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] text-[#9ca3af]">{m.category}</span>
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-[#9ca3af] font-mono">/{m.unit}</span>
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
                                                <span className={`text-sm font-bold transition-all ${isBest ? 'text-emerald-500' : 'text-[#6b7280]'}`}>
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
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <Globe size={12} className="text-[#FF6B00]" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Web Crawler Pipeline</span>
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
                            <div key={i} className="rounded-2xl bg-white border border-black/6 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                                    className="text-2xl font-black"
                                    style={{ color: s.color }}
                                >
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-white border border-black/6 p-5 shadow-sm space-y-4"
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
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-all group cursor-default"
                            >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}12`, color: f.color }}>
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="text-[#1a1a1a] font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-[#6b7280] text-xs leading-relaxed">{f.desc}</p>
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
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all cursor-default">
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
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    From Groundbreak to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Certificate of Occupancy</span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    Gasper AI manages every phase — automated scheduling, real-time cost tracking, and AI-powered coordination from start to finish.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-white border border-black/8 overflow-hidden shadow-lg">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/6 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">harbor_view_project.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">4 Phases</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-[#FF6B00]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                                    Phase 2
                                </div>
                            </div>
                        </div>

                        {/* Overall Progress Bar */}
                        <div className="px-5 pt-4 pb-2">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">Overall Progress</span>
                                <span className="text-sm font-black text-[#FF6B00]">64%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
                                                    <div className="text-sm font-bold text-[#1a1a1a]">{p.phase}</div>
                                                    <div className="text-[10px] text-[#9ca3af]">{p.duration}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                                                    style={p.status === 'complete' ? { background: '#10B98115', color: '#10B981' }
                                                        : p.status === 'active' ? { background: '#FF6B0015', color: '#FF6B00' }
                                                            : { background: 'rgba(0,0,0,0.04)', color: '#9ca3af' }}>
                                                    {p.status === 'complete' ? '✓ Done' : p.status === 'active' ? '● Active' : 'Upcoming'}
                                                </span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-black/5">
                                                <div className="flex flex-wrap gap-2">
                                                    {p.items.map((item, j) => (
                                                        <span key={j} className="text-[10px] px-2.5 py-1 rounded-lg bg-gray-50 border border-black/5 text-[#6b7280] font-medium">
                                                            <CheckCircle2 size={10} className="inline mr-1" style={{ color: p.color }} />{item}
                                                        </span>
                                                    ))}
                                                </div>
                                                {p.progress > 0 && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <CalendarDays size={12} className="text-[#FF6B00]" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Project Management Pipeline</span>
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
                            <div key={i} className="rounded-2xl bg-white border border-black/6 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: 'spring' }} className="text-2xl font-black" style={{ color: s.color }}>
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-white border border-black/6 p-5 shadow-sm space-y-4">
                        {[
                            { icon: <CalendarDays size={18} />, title: 'Auto Scheduling', desc: 'AI generates optimized construction schedules based on dependencies, crew availability, and weather forecasts.', color: '#FF6B00' },
                            { icon: <Activity size={18} />, title: 'Real-Time Tracking', desc: 'Daily progress photos and drone surveys analyzed by AI to track completion percentage against schedule.', color: '#3B82F6' },
                            { icon: <Target size={18} />, title: 'Milestone Gates', desc: 'Automatic cash flow releases tied to milestone completion — verified by AI, not paperwork.', color: '#10B981' },
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-all group cursor-default">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}12`, color: f.color }}>{f.icon}</div>
                                <div>
                                    <h4 className="text-[#1a1a1a] font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-[#6b7280] text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 justify-center">
                        {['Gantt Charts', 'CPM Analysis', 'Resource Leveling', 'Weather Delays', 'Change Orders', 'Punch Lists'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all cursor-default">{tag}</span>
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
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    Zero-Incident <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#10B981]">Job Sites</span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    AI-powered safety monitoring that protects your crews, keeps projects compliant, and eliminates paperwork.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 relative">
                    <div className="relative rounded-3xl bg-white border border-black/8 overflow-hidden shadow-lg">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/6 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">safety_compliance.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">OSHA Ready</div>
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
                                                    <div className="text-[10px] text-[#9ca3af]">{c.zone}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono text-[#9ca3af] hidden sm:block">{c.lastScan}</span>
                                                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                                                    style={c.status === 'pass' ? { background: '#10B98115', color: '#10B981' } : { background: '#F59E0B15', color: '#F59E0B' }}>
                                                    {c.status === 'pass' ? '✓ Pass' : '⚠ Warning'}
                                                </span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 pt-2 border-t border-black/5">
                                                <div className="grid grid-cols-3 gap-3">
                                                    {c.workers !== null && (
                                                        <div className="text-center">
                                                            <div className="text-[9px] text-[#9ca3af] uppercase">Workers</div>
                                                            <div className="text-[11px] font-bold text-[#1a1a1a]">{c.workers}</div>
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
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <Shield size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Safety Intelligence Pipeline</span>
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
                            <div key={i} className="rounded-2xl bg-white border border-black/6 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: 'spring' }} className="text-2xl font-black" style={{ color: s.color }}>
                                    {s.value}
                                </motion.div>
                                <div className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-white border border-black/6 p-5 shadow-sm space-y-4">
                        {[
                            { icon: <Eye size={18} />, title: 'Computer Vision Monitoring', desc: 'AI cameras detect PPE violations, unauthorized access, and unsafe conditions in real-time across every job site.', color: '#10B981' },
                            { icon: <FileText size={18} />, title: 'Automated OSHA Reports', desc: 'When an event occurs, Gasper generates OSHA-compliant incident reports instantly — no paperwork, no delays.', color: '#FF6B00' },
                            { icon: <AlertTriangle size={18} />, title: 'Predictive Risk Analysis', desc: 'ML models analyze weather, crew fatigue patterns, and past incidents to predict and prevent safety events.', color: '#F59E0B' },
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-all group cursor-default">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${f.color}12`, color: f.color }}>{f.icon}</div>
                                <div>
                                    <h4 className="text-[#1a1a1a] font-bold text-sm mb-0.5">{f.title}</h4>
                                    <p className="text-[#6b7280] text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 justify-center">
                        {['PPE Detection', 'Fall Protection', 'OSHA Logs', 'Toolbox Talks', 'Incident Reports', 'Training AI'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-emerald-500/30 hover:text-emerald-500 transition-all cursor-default">{tag}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
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
            case 'construction': return <BlueprintAISection />; // Repurposing existing components for now
            case 'logistics': return <MaterialPriceAggregatorSection />;
            case 'marketing': return <ProjectCommandCenter />;
            case 'ecommerce': return <CashFlowSection />;
            case 'ai': return <GasperAIBotSection />;
            case 'llm': return <CustomLLMBuilderSection />;
            default: return <BlueprintAISection />;
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
        <div className="relative" style={{ background: C.bg }}>

            {/* ══ CONSTRUCTION FEATURES ══ */}
            <ConstructionFeaturesSection />

            <div className="section-divider" />

            {/* ══ ADVANTAGES ══ */}
            <ComparisonTableSection />

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
                        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">What You'll Get</h2>
                        <p className="mb-8" style={{ color: C.textMuted }}>Founding members and early partners get exclusive access to shape the future of construction AI.</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: <Zap size={22} />, title: 'Early Access', description: 'Join our private beta and shape the platform before public launch' },
                                { icon: <DollarSign size={22} />, title: 'Founding Rate', description: 'Lock in 40% off enterprise pricing for life as a founding member' },
                                { icon: <Award size={22} />, title: 'White-Glove Onboarding', description: 'Dedicated implementation support from our construction AI experts' },
                                { icon: <Users size={22} />, title: 'Investor Updates', description: 'Quarterly product roadmap calls direct with founders and leadership' },
                            ].map((b, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.6 }}
                                    className="rounded-2xl p-5 group transition-all duration-300" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                                    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: `${C.primary}08`, border: `1px solid ${C.primary}15`, color: C.primary }}>
                                        {b.icon}
                                    </div>
                                    <h3 className="text-[#1a1a1a] font-bold mb-1">{b.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{b.description}</p>
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
