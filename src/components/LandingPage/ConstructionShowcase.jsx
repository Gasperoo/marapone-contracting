import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
    HardHat, Ruler, DollarSign, ShieldCheck, Camera, Truck, Users,
    CheckCircle2, ArrowRight, Layers, AlertTriangle, BarChart3,
    Clock, Shield, Eye, MapPin, Wrench, FileText, TrendingUp,
    Building2, Zap, Star, Lock, Cpu, Brain, Target, Activity,
    Hammer, CalendarDays, UserCheck, Award, Percent, Timer, Gauge
} from 'lucide-react';

// ─── Platform Pillars — Dual Column Showcase ─────────────────────────────
export function PlatformPillarsSection() {
    const [activeTab, setActiveTab] = useState('logistics');

    const logistics = {
        label: 'Logistics OS',
        color: '#0EA5E9',
        glow: 'rgba(14,165,233,0.3)',
        tagline: 'Command global supply chains with AI precision',
        features: [
            { icon: <Activity size={20} />, text: 'Real-Time Vessel & Cargo Tracking' },
            { icon: <Brain size={20} />, text: 'Digital Twin Simulation Engine' },
            { icon: <ShieldCheck size={20} />, text: 'Automated Compliance & HS Classification' },
            { icon: <BarChart3 size={20} />, text: 'Smart Rate Comparison' },
            { icon: <Target size={20} />, text: 'Predictive Risk Analysis' },
            { icon: <TrendingUp size={20} />, text: 'Market Intelligence & Indices' },
        ],
        stat: { value: '98%', label: 'Prediction Accuracy' },
    };
    const construction = {
        label: 'Construction AI',
        color: '#FF6B00',
        glow: 'rgba(255,107,0,0.3)',
        tagline: 'Build smarter with AI-powered project intelligence',
        features: [
            { icon: <Ruler size={20} />, text: 'AI Blueprint & BIM Analysis' },
            { icon: <DollarSign size={20} />, text: 'Cash Flow Guardian & Forecasting' },
            { icon: <FileText size={20} />, text: 'Compliance Auto-Pilot & Permits' },
            { icon: <Eye size={20} />, text: 'Theft & Unauthorized Use Sentinel' },
            { icon: <Users size={20} />, text: 'Subcontractor Matchmaker AI' },
            { icon: <Clock size={20} />, text: 'Site Arrival & Utilization Optimizer' },
        ],
        stat: { value: '3.2x', label: 'Project ROI Increase' },
    };

    const active = activeTab === 'logistics' ? logistics : construction;
    const accentColor = active.color;

    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-colors duration-700" style={{ background: accentColor }} />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 transition-colors duration-700" style={{ background: accentColor }} />

            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-sm font-medium mb-6"
                >
                    <Zap size={14} className="inline mr-2 text-amber-400" />
                    Two Platforms. One AI Engine.
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    AI-Powered Intelligence for{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#FF6B00]">
                        Every Operation
                    </span>
                </h2>
                <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                    Whether you're moving cargo across oceans or managing a $50M build site, Gasper's AI adapts to your vertical and delivers actionable intelligence in real-time.
                </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-16 relative z-10">
                <div className="inline-flex rounded-2xl bg-black/40 border border-white/10 p-1.5 backdrop-blur-xl">
                    {[
                        { key: 'logistics', label: 'Logistics OS', icon: <Truck size={16} />, color: '#0EA5E9' },
                        { key: 'construction', label: 'Construction AI', icon: <HardHat size={16} />, color: '#FF6B00' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab.key ? 'text-white' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {activeTab === tab.key && (
                                <motion.div
                                    layoutId="pillar-tab"
                                    className="absolute inset-0 rounded-xl"
                                    style={{ background: `linear-gradient(135deg, ${tab.color}33, ${tab.color}11)`, border: `1px solid ${tab.color}44` }}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10">{tab.icon}</span>
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                >
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Feature List */}
                        <div className="lg:col-span-3 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10" style={{ background: accentColor }} />

                            <div className="relative z-10">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-6" style={{ border: `1px solid ${accentColor}44`, background: `${accentColor}15`, color: accentColor }}>
                                    {activeTab === 'logistics' ? <Truck size={12} className="mr-2" /> : <HardHat size={12} className="mr-2" />}
                                    {active.label}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{active.tagline}</h3>

                                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                    {active.features.map((f, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all group"
                                        >
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${accentColor}15`, color: accentColor }}>
                                                {f.icon}
                                            </div>
                                            <span className="text-sm text-slate-300 font-medium">{f.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stat Card */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            <div className="flex-1 rounded-3xl border border-white/10 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}03)` }}>
                                <div className="absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}15, transparent 70%)` }} />
                                <div className="relative z-10">
                                    <div className="text-6xl md:text-7xl font-black mb-3 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(180deg, white, ${accentColor})` }}>
                                        {active.stat.value}
                                    </div>
                                    <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold">{active.stat.label}</div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Lock size={20} />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Enterprise-Grade Security</div>
                                        <div className="text-slate-500 text-xs">SOC 2 • GDPR • ISO 27001</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Cpu size={20} />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">AI-First Architecture</div>
                                        <div className="text-slate-500 text-xs">Proprietary ML • Real-time Processing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

// ─── Construction Feature Cards ──────────────────────────────────────────
export function ConstructionFeaturesSection() {
    const features = [
        {
            icon: <Ruler size={32} />,
            title: 'AI Blueprint Analysis',
            description: 'Upload blueprints and let AI extract room dimensions, material lists, and cost estimates. Detect code violations before they become expensive change orders.',
            details: ['Automated Room Detection', 'Material Takeoff', 'Code Violation Alerts', 'BIM Integration'],
        },
        {
            icon: <DollarSign size={32} />,
            title: 'Cash Flow Guardian',
            description: 'Predict cash flow crunches before they happen. AI monitors invoices, change orders, and receivables to keep your projects financially healthy.',
            details: ['30-60-90 Forecasting', 'Invoice Aging Alerts', 'Material Cost Tracking', 'Budget Variance Analysis'],
        },
        {
            icon: <Shield size={32} />,
            title: 'Compliance Auto-Pilot',
            description: 'Stay ahead of inspections, permits, and regulatory changes. Our AI monitors 230+ jurisdictions and auto-generates compliance checklists.',
            details: ['Permit Status Tracking', 'Inspection Scheduling', 'OSHA Compliance', 'Auto-Generated Reports'],
        },
        {
            icon: <Eye size={32} />,
            title: 'Theft & Security Sentinel',
            description: 'Protect your assets 24/7. AI-powered geofencing detects unauthorized equipment use and alerts you to anomalous after-hours activity.',
            details: ['GPS Fleet Monitoring', 'Geofence Alerts', 'Anomaly Detection', 'After-Hours Surveillance'],
        },
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto py-20">
            <div className="text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-medium mb-4"
                >
                    <HardHat size={14} className="inline mr-2" />
                    Construction Intelligence
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Build Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">AI Precision</span></h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">Purpose-built AI tools that eliminate cost overruns, safety incidents, and project delays.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {features.map((f, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative h-full rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden group hover:border-[#FF6B00]/30 transition-all duration-500"
                    >
                        <div className="relative p-8 h-full flex flex-col z-10">
                            <div className="w-14 h-14 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FF6B00] transition-colors">{f.title}</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed flex-grow">{f.description}</p>
                            <div className="pt-6 border-t border-white/5">
                                <ul className="grid grid-cols-1 gap-3">
                                    {f.details.map((d, i) => (
                                        <li key={i} className="flex items-center text-sm text-slate-300">
                                            <CheckCircle2 size={16} className="text-[#FF6B00] mr-3 flex-shrink-0" />
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ─── Blueprint AI Deep Dive ──────────────────────────────────────────────
export function BlueprintAISection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                        <Ruler size={12} className="mr-2" /> BLUEPRINT INTELLIGENCE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Turn Blueprints into Actionable Data</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Upload any blueprint — PDF, DWG, or BIM — and watch our AI extract every room, dimension, and material specification in seconds. No more manual takeoffs.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex-shrink-0 flex items-center justify-center text-[#FF6B00]"><Layers size={24} /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Automated Takeoffs</h4>
                                <p className="text-slate-400 text-sm">Extract material quantities, room dimensions, and structural elements automatically from any blueprint format.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex-shrink-0 flex items-center justify-center text-amber-500"><AlertTriangle size={24} /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Code Violation Detection</h4>
                                <p className="text-slate-400 text-sm">AI cross-references designs against local building codes, fire safety regulations, and ADA requirements.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                    <div className="relative rounded-2xl bg-black/40 border border-white/10 p-6 overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-semibold">Blueprint Analysis</h3>
                            <div className="text-xs text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-1 rounded font-bold">AI PROCESSING</div>
                        </div>

                        {/* Mock Blueprint Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            {['Living Room', 'Kitchen', 'Master Bed', 'Bathroom', 'Office', 'Garage'].map((room, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`p-3 rounded-lg border text-center ${i === 0 ? 'border-[#FF6B00]/50 bg-[#FF6B00]/10 col-span-2 row-span-2' : 'border-white/10 bg-white/5'}`}
                                >
                                    <div className={`text-xs font-bold mb-1 ${i === 0 ? 'text-[#FF6B00]' : 'text-white'}`}>{room}</div>
                                    <div className="text-[10px] text-slate-500">{['320 sqft', '180 sqft', '240 sqft', '85 sqft', '150 sqft', '400 sqft'][i]}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-4 flex justify-between">
                            <div>
                                <div className="text-xs text-slate-400 uppercase">Rooms Detected</div>
                                <div className="text-xl font-bold text-[#FF6B00]">12</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase">Total Area</div>
                                <div className="text-xl font-bold text-white">2,450 sqft</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase">Violations</div>
                                <div className="text-xl font-bold text-amber-400">2</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Cash Flow Guardian Deep Dive ────────────────────────────────────────
export function CashFlowSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden text-right">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Visual Side */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative order-2 md:order-1">
                    <div className="relative rounded-2xl bg-black/40 border border-white/10 p-6 overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-semibold">Cash Flow Forecast</h3>
                            <div className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded font-bold">HEALTHY</div>
                        </div>

                        {/* Animated Bars */}
                        <div className="space-y-4">
                            {[
                                { label: 'Jan', inflow: 85, outflow: 60, color: '#FF6B00' },
                                { label: 'Feb', inflow: 70, outflow: 75, color: '#ef4444' },
                                { label: 'Mar', inflow: 90, outflow: 55, color: '#FF6B00' },
                                { label: 'Apr', inflow: 95, outflow: 50, color: '#FF6B00' },
                            ].map((m, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="text-xs text-slate-400 w-8 text-left">{m.label}</div>
                                    <div className="flex-1 flex gap-1 h-6">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${m.inflow}%` }}
                                            transition={{ duration: 1, delay: i * 0.15 }}
                                            className="h-full rounded-l-md"
                                            style={{ background: m.color }}
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${m.outflow}%` }}
                                            transition={{ duration: 1, delay: i * 0.15 + 0.1 }}
                                            className="h-full bg-white/10 rounded-r-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FF6B00]" /> Inflow</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white/20" /> Outflow</span>
                        </div>

                        <div className="border-t border-white/10 pt-4 mt-6">
                            <div className="flex justify-between">
                                <div className="text-left">
                                    <div className="text-xs text-slate-400 uppercase">Net Cash Position</div>
                                    <div className="text-2xl font-bold text-emerald-400">+$124K</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 uppercase">Overdue Invoices</div>
                                    <div className="text-2xl font-bold text-amber-400">3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content Side */}
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2 flex flex-col items-end">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider mb-6">
                        <DollarSign size={12} className="mr-2" /> FINANCIAL INTELLIGENCE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Never Get Blindsided by Cash Crunches</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        68% of construction firms fail due to cash flow issues. Gasper's AI predicts payment gaps 90 days ahead, auto-chases overdue invoices, and optimizes your draw schedules.
                    </p>
                    <div className="space-y-6 text-right w-full">
                        <div className="flex gap-4 justify-end">
                            <div className="text-right">
                                <h4 className="text-white font-bold text-lg mb-1">Predictive Forecasting</h4>
                                <p className="text-slate-400 text-sm">90-day rolling cash flow projections updated in real-time as invoices and change orders come in.</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex-shrink-0 flex items-center justify-center text-emerald-500"><BarChart3 size={24} /></div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div className="text-right">
                                <h4 className="text-white font-bold text-lg mb-1">Auto Invoice Chase</h4>
                                <p className="text-slate-400 text-sm">Smart reminders automatically sent to clients at optimized intervals to maximize collection rates.</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex-shrink-0 flex items-center justify-center text-[#FF6B00]"><Zap size={24} /></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Site Security Deep Dive ─────────────────────────────────────────────
export function SiteSecuritySection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold tracking-wider mb-6">
                        <Eye size={12} className="mr-2" /> AI SECURITY
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">24/7 AI-Powered Asset Protection</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Construction theft costs the industry $1B+ annually. Gasper's Sentinel AI monitors every piece of equipment with GPS tracking, geofencing, and anomaly detection.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex-shrink-0 flex items-center justify-center text-red-500"><MapPin size={24} /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Geofence Alerting</h4>
                                <p className="text-slate-400 text-sm">Instant alerts when equipment leaves predefined job site boundaries. Track movement patterns across your fleet.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex-shrink-0 flex items-center justify-center text-amber-500"><Clock size={24} /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">After-Hours Detection</h4>
                                <p className="text-slate-400 text-sm">AI identifies unauthorized equipment activation outside working hours and notifies site managers instantly.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Security Visual */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                    <div className="relative rounded-2xl bg-black/40 border border-white/10 p-6 overflow-hidden">
                        {/* Radar pulse */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,0,0,0)_50%,rgba(255,107,0,0.08)_100%)] animate-[spin_4s_linear_infinite]" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-semibold">Fleet Status Monitor</h3>
                                <div className="flex items-center gap-1 text-xs text-emerald-400"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> All Secure</div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { name: 'CAT 320 Excavator', status: 'On-Site', icon: '🚜', ok: true },
                                    { name: 'Liebherr Tower Crane', status: 'Active', icon: '🏗️', ok: true },
                                    { name: 'Bobcat S650 Skid', status: 'Alert: Left Zone', icon: '⚠️', ok: false },
                                    { name: 'JLG Boom Lift', status: 'Idle', icon: '🔧', ok: true },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`p-3 rounded-xl border ${item.ok ? 'border-white/10 bg-white/5' : 'border-red-500/30 bg-red-500/10'} flex items-center justify-between`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{item.icon}</span>
                                            <div>
                                                <div className="text-white text-sm font-bold">{item.name}</div>
                                                <div className={`text-xs ${item.ok ? 'text-slate-400' : 'text-red-400'}`}>{item.status}</div>
                                            </div>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${item.ok ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'}`} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
