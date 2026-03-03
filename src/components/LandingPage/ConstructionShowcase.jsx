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
                    className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-[#1a1a1a] text-sm font-medium mb-6"
                >
                    <Zap size={14} className="inline mr-2 text-amber-400" />
                    Two Platforms. One AI Engine.
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                    AI-Powered Intelligence for{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#FF6B00]">
                        Every Operation
                    </span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    Whether you're moving cargo across oceans or managing a $50M build site, Gasper's AI adapts to your vertical and delivers actionable intelligence in real-time.
                </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-16 relative z-10">
                <div className="inline-flex rounded-2xl bg-white border border-black/10 p-1.5 shadow-sm">
                    {[
                        { key: 'logistics', label: 'Logistics OS', icon: <Truck size={16} />, color: '#0EA5E9' },
                        { key: 'construction', label: 'Construction AI', icon: <HardHat size={16} />, color: '#FF6B00' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab.key ? 'text-[#1a1a1a]' : 'text-[#6b7280] hover:text-[#1a1a1a]'
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
                        <div className="lg:col-span-3 rounded-3xl bg-white border border-black/8 shadow-sm p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10" style={{ background: accentColor }} />

                            <div className="relative z-10">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-6" style={{ border: `1px solid ${accentColor}44`, background: `${accentColor}15`, color: accentColor }}>
                                    {activeTab === 'logistics' ? <Truck size={12} className="mr-2" /> : <HardHat size={12} className="mr-2" />}
                                    {active.label}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">{active.tagline}</h3>

                                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                    {active.features.map((f, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5 hover:border-black/15 transition-all group"
                                        >
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${accentColor}15`, color: accentColor }}>
                                                {f.icon}
                                            </div>
                                            <span className="text-sm text-[#374151] font-medium">{f.text}</span>
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
                                    <div className="text-sm text-[#6b7280] uppercase tracking-widest font-semibold">{active.stat.label}</div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white border border-black/8 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Lock size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[#1a1a1a] font-bold text-sm">Enterprise-Grade Security</div>
                                        <div className="text-[#6b7280] text-xs">SOC 2 • GDPR • ISO 27001</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Cpu size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[#1a1a1a] font-bold text-sm">AI-First Architecture</div>
                                        <div className="text-[#6b7280] text-xs">Proprietary ML • Real-time Processing</div>
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
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">Build Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">AI Precision</span></h2>
                <p className="text-[#6b7280] max-w-2xl mx-auto text-lg">Purpose-built AI tools that eliminate cost overruns, safety incidents, and project delays.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {features.map((f, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative h-full rounded-2xl bg-white border border-black/8 overflow-hidden group hover:border-[#FF6B00]/30 transition-all duration-500 shadow-sm"
                    >
                        <div className="relative p-8 h-full flex flex-col z-10">
                            <div className="w-14 h-14 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 group-hover:text-[#FF6B00] transition-colors">{f.title}</h3>
                            <p className="text-[#6b7280] mb-6 leading-relaxed flex-grow">{f.description}</p>
                            <div className="pt-6 border-t border-black/5">
                                <ul className="grid grid-cols-1 gap-3">
                                    {f.details.map((d, i) => (
                                        <li key={i} className="flex items-center text-sm text-[#374151]">
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

// ─── Blueprint AI Deep Dive — Advanced Interactive Showcase ──────────────
export function BlueprintAISection() {
    const [activeRoom, setActiveRoom] = useState(null);
    const [scanProgress, setScanProgress] = useState(0);
    const [pipelineStep, setPipelineStep] = useState(0);
    const [metricsVisible, setMetricsVisible] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const scanInterval = setInterval(() => {
            setScanProgress(p => (p >= 100 ? 0 : p + 0.5));
        }, 30);
        const pipelineInterval = setInterval(() => {
            setPipelineStep(s => (s + 1) % 5);
        }, 2000);
        const metricsTimer = setTimeout(() => setMetricsVisible(true), 800);
        return () => { clearInterval(scanInterval); clearInterval(pipelineInterval); clearTimeout(metricsTimer); };
    }, [isInView]);

    const rooms = [
        { id: 'living', name: 'Living Room', area: '320 sqft', dims: '20\' × 16\'', x: 0, y: 0, w: 2, h: 2, materials: 14, color: '#FF6B00' },
        { id: 'kitchen', name: 'Kitchen', area: '180 sqft', dims: '15\' × 12\'', x: 2, y: 0, w: 1, h: 1, materials: 22, color: '#F59E0B' },
        { id: 'master', name: 'Master Bedroom', area: '240 sqft', dims: '20\' × 12\'', x: 2, y: 1, w: 1, h: 1, materials: 8, color: '#10B981' },
        { id: 'bath', name: 'Bathroom', area: '85 sqft', dims: '10\' × 8.5\'', x: 0, y: 2, w: 1, h: 1, materials: 18, color: '#3B82F6' },
        { id: 'office', name: 'Home Office', area: '150 sqft', dims: '12\' × 12.5\'', x: 1, y: 2, w: 1, h: 1, materials: 6, color: '#8B5CF6' },
        { id: 'garage', name: 'Garage', area: '400 sqft', dims: '20\' × 20\'', x: 2, y: 2, w: 1, h: 1, materials: 4, color: '#6B7280' },
    ];

    const pipelineSteps = [
        { label: 'Parsing', icon: <FileText size={14} />, desc: 'Reading blueprint data' },
        { label: 'Detection', icon: <Eye size={14} />, desc: 'Finding walls & rooms' },
        { label: 'Measurement', icon: <Ruler size={14} />, desc: 'Extracting dimensions' },
        { label: 'Analysis', icon: <Brain size={14} />, desc: 'Code compliance check' },
        { label: 'Output', icon: <CheckCircle2 size={14} />, desc: 'Generating takeoff' },
    ];

    const stats = [
        { value: '12', label: 'Rooms', suffix: '', color: '#FF6B00' },
        { value: '2,450', label: 'Sq Ft', suffix: '', color: '#1a1a1a' },
        { value: '72', label: 'Materials', suffix: '', color: '#10B981' },
        { value: '2', label: 'Violations', suffix: '', color: '#F59E0B' },
        { value: '99.2', label: 'Accuracy', suffix: '%', color: '#3B82F6' },
    ];

    return (
        <section ref={sectionRef} className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                    <Ruler size={12} className="mr-2" /> BLUEPRINT INTELLIGENCE ENGINE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Reads Blueprints</span> Like an Expert
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    Upload any format — PDF, DWG, BIM, or even a photo — and watch our neural network extract every room, dimension, material, and code violation in real-time.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* ─── Interactive Blueprint Canvas ─── */}
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
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">residential_floorplan_v3.dwg</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">1:50 Scale</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-[#FF6B00]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                                    AI Active
                                </div>
                            </div>
                        </div>

                        {/* ── Blueprint Canvas ── */}
                        <div className="relative aspect-[4/3] bg-[#FAFAF8]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                            {/* Scan line */}
                            <motion.div
                                className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                                style={{
                                    top: `${scanProgress}%`,
                                    background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)',
                                    boxShadow: '0 0 20px rgba(255,107,0,0.4), 0 0 60px rgba(255,107,0,0.15)',
                                }}
                            />
                            {/* Scan glow area */}
                            <div
                                className="absolute left-0 right-0 pointer-events-none z-10 transition-all duration-100"
                                style={{
                                    top: `${Math.max(0, scanProgress - 8)}%`,
                                    height: '8%',
                                    background: 'linear-gradient(180deg, transparent, rgba(255,107,0,0.04), transparent)',
                                }}
                            />

                            {/* Room Grid */}
                            <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-[3px]">
                                {rooms.map((room, i) => (
                                    <motion.div
                                        key={room.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.12, type: 'spring', bounce: 0.3 }}
                                        viewport={{ once: true }}
                                        className="relative rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden"
                                        style={{
                                            gridColumn: `${room.x + 1} / span ${room.w}`,
                                            gridRow: `${room.y + 1} / span ${room.h}`,
                                            border: activeRoom === room.id ? `2px solid ${room.color}` : '1.5px dashed rgba(0,0,0,0.12)',
                                            background: activeRoom === room.id ? `${room.color}08` : 'rgba(255,255,255,0.7)',
                                        }}
                                        onMouseEnter={() => setActiveRoom(room.id)}
                                        onMouseLeave={() => setActiveRoom(null)}
                                    >
                                        {/* Corner markers */}
                                        {['-top-[1px] -left-[1px]', '-top-[1px] -right-[1px]', '-bottom-[1px] -left-[1px]', '-bottom-[1px] -right-[1px]'].map((pos, ci) => (
                                            <div key={ci} className={`absolute ${pos} w-2 h-2 border-[#FF6B00] transition-opacity ${activeRoom === room.id ? 'opacity-100' : 'opacity-0'}`}
                                                style={{ borderWidth: ci < 2 ? '2px 0 0 2px' : ci === 2 ? '0 0 2px 2px' : '0 2px 2px 0', borderColor: room.color, borderStyle: 'solid', borderTopWidth: ci < 2 ? '2px' : '0', borderLeftWidth: ci % 2 === 0 ? '2px' : '0', borderBottomWidth: ci >= 2 ? '2px' : '0', borderRightWidth: ci % 2 !== 0 ? '2px' : '0' }}
                                            />
                                        ))}

                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                                            <div className="text-xs font-bold mb-0.5 transition-colors" style={{ color: activeRoom === room.id ? room.color : '#374151' }}>
                                                {room.name}
                                            </div>
                                            <div className="text-[10px] text-[#9ca3af] font-mono">{room.area}</div>
                                            {activeRoom === room.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-1 text-[9px] font-mono px-2 py-0.5 rounded-full"
                                                    style={{ background: `${room.color}15`, color: room.color }}
                                                >
                                                    {room.dims} · {room.materials} items
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Detection highlight shimmer */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{ background: `linear-gradient(135deg, transparent 30%, ${room.color}08 50%, transparent 70%)` }}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Dimension annotations */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[9px] font-mono text-[#9ca3af]">
                                <div className="w-8 h-[1px] bg-[#9ca3af]" /> 52'-0" <div className="w-8 h-[1px] bg-[#9ca3af]" />
                            </div>
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 flex items-center gap-1 text-[9px] font-mono text-[#9ca3af]">
                                <div className="w-6 h-[1px] bg-[#9ca3af]" /> 36'-0" <div className="w-6 h-[1px] bg-[#9ca3af]" />
                            </div>
                        </div>

                        {/* ── AI Pipeline Status Bar ── */}
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <Brain size={12} className="text-[#FF6B00]" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Neural Analysis Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {pipelineSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === pipelineStep
                                            ? 'bg-[#FF6B00]/10 text-[#FF6B00] shadow-sm'
                                            : i < pipelineStep
                                                ? 'text-[#10B981]'
                                                : 'text-[#9ca3af]'
                                            }`}>
                                            {i < pipelineStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < pipelineSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < pipelineStep ? 'bg-[#10B981]' : 'bg-black/8'
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
                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-3 gap-3"
                    >
                        {stats.slice(0, 3).map((s, i) => (
                            <div key={i} className="rounded-2xl bg-white border border-black/6 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                                    className="text-2xl font-black"
                                    style={{ color: s.color }}
                                >
                                    {s.value}{s.suffix}
                                </motion.div>
                                <div className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {stats.slice(3).map((s, i) => (
                            <div key={i} className="rounded-2xl bg-white border border-black/6 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                                    className="text-2xl font-black"
                                    style={{ color: s.color }}
                                >
                                    {s.value}{s.suffix}
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
                            { icon: <Layers size={18} />, title: 'Automated Takeoffs', desc: 'Material quantities, dimensions, and structural elements — extracted in seconds from any format.', color: '#FF6B00' },
                            { icon: <AlertTriangle size={18} />, title: 'Code Violation Detection', desc: 'Cross-references against IBC, fire safety, ADA, and 230+ local building codes.', color: '#F59E0B' },
                            { icon: <Target size={18} />, title: 'Cost Estimation', desc: 'Instant material cost estimates with real-time pricing from 500+ suppliers.', color: '#10B981' },
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

                    {/* Format Support */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-2 justify-center"
                    >
                        {['PDF', 'DWG', 'DXF', 'BIM/IFC', 'JPEG', 'PNG', 'TIFF'].map((fmt, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all cursor-default">
                                {fmt}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Cash Flow Guardian — Advanced Interactive Showcase ───────────────────
export function CashFlowSection() {
    const [activeMonth, setActiveMonth] = useState(null);
    const [alertStep, setAlertStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const alertInterval = setInterval(() => {
            setAlertStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(alertInterval);
    }, [isInView]);

    const months = [
        { label: 'Jan', inflow: 185000, outflow: 142000, net: 43000, invoices: 12, overdue: 1 },
        { label: 'Feb', inflow: 156000, outflow: 168000, net: -12000, invoices: 15, overdue: 3 },
        { label: 'Mar', inflow: 210000, outflow: 138000, net: 72000, invoices: 9, overdue: 0 },
        { label: 'Apr', inflow: 245000, outflow: 155000, net: 90000, invoices: 11, overdue: 1 },
        { label: 'May', inflow: 198000, outflow: 189000, net: 9000, invoices: 14, overdue: 2 },
        { label: 'Jun', inflow: 267000, outflow: 148000, net: 119000, invoices: 8, overdue: 0 },
    ];

    const alertSteps = [
        { label: 'Monitoring', icon: <Eye size={14} />, desc: 'Tracking all invoices' },
        { label: 'Forecasting', icon: <TrendingUp size={14} />, desc: '90-day projections' },
        { label: 'Alerting', icon: <AlertTriangle size={14} />, desc: 'Flagging risks' },
        { label: 'Collecting', icon: <DollarSign size={14} />, desc: 'Auto-chasing payments' },
    ];

    const maxFlow = Math.max(...months.map(m => Math.max(m.inflow, m.outflow)));

    const stats = [
        { value: '+$124K', label: 'Net Position', color: '#10B981' },
        { value: '3', label: 'Overdue', color: '#F59E0B' },
        { value: '92%', label: 'Collection Rate', color: '#3B82F6' },
        { value: '90 Days', label: 'Forecast Window', color: '#FF6B00' },
    ];

    return (
        <section ref={sectionRef} className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-bold tracking-wider mb-6">
                    <DollarSign size={12} className="mr-2" /> FINANCIAL INTELLIGENCE ENGINE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#FF6B00]">Predicts Cash Crunches</span> 90 Days Ahead
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    68% of construction firms fail due to cash flow issues. Gasper monitors every invoice, change order, and receivable in real-time to keep your projects financially healthy.
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
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">cashflow_forecast_q2.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">FY 2025</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Healthy
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="px-5 pt-6 pb-4">
                            <div className="flex items-end gap-3 h-48">
                                {months.map((m, i) => {
                                    const inflowH = (m.inflow / maxFlow) * 100;
                                    const outflowH = (m.outflow / maxFlow) * 100;
                                    const isActive = activeMonth === i;
                                    return (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                                            onMouseEnter={() => setActiveMonth(i)}
                                            onMouseLeave={() => setActiveMonth(null)}
                                        >
                                            {/* Tooltip */}
                                            {isActive && (
                                                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                                                    className="text-[9px] font-mono px-2 py-1 rounded-lg bg-[#1a1a1a] text-white mb-1 whitespace-nowrap shadow-lg z-10">
                                                    Net: <span className={m.net >= 0 ? 'text-emerald-400' : 'text-red-400'}>${(m.net / 1000).toFixed(0)}k</span>
                                                </motion.div>
                                            )}
                                            <div className="flex gap-[2px] items-end w-full">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${inflowH}%` }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                    className="flex-1 rounded-t-md transition-all"
                                                    style={{ background: isActive ? '#FF6B00' : 'rgba(255,107,0,0.6)', minHeight: 4 }}
                                                />
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${outflowH}%` }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 + 0.05 }}
                                                    className="flex-1 rounded-t-md transition-all"
                                                    style={{ background: isActive ? '#1a1a1a' : 'rgba(0,0,0,0.12)', minHeight: 4 }}
                                                />
                                            </div>
                                            <span className={`text-[10px] font-mono transition-colors ${isActive ? 'text-[#FF6B00] font-bold' : 'text-[#9ca3af]'}`}>{m.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex gap-4 mt-3 text-[10px] text-[#9ca3af] justify-center">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FF6B00]" /> Inflow</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-black/15" /> Outflow</span>
                            </div>
                        </div>

                        {/* Invoice Aging */}
                        <div className="px-5 py-3 border-t border-black/4">
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: '0-30 Days', count: 18, amount: '$84K', color: '#10B981' },
                                    { label: '30-60 Days', count: 5, amount: '$32K', color: '#F59E0B' },
                                    { label: '60-90+ Days', count: 3, amount: '$18K', color: '#EF4444' },
                                ].map((bucket, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }} viewport={{ once: true }}
                                        className="text-center p-2 rounded-xl border border-black/4">
                                        <div className="text-lg font-black" style={{ color: bucket.color }}>{bucket.count}</div>
                                        <div className="text-[9px] text-[#6b7280] font-semibold">{bucket.label}</div>
                                        <div className="text-[10px] font-bold text-[#1a1a1a]">{bucket.amount}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Pipeline */}
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <DollarSign size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Cash Flow Intelligence Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {alertSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === alertStep ? 'bg-emerald-500/10 text-emerald-500 shadow-sm' : i < alertStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
                                            }`}>
                                            {i < alertStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < alertSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < alertStep ? 'bg-[#10B981]' : 'bg-black/8'}`} />
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
                            { icon: <BarChart3 size={18} />, title: 'Predictive Forecasting', desc: '90-day rolling cash flow projections updated in real-time as invoices and change orders come in.', color: '#10B981' },
                            { icon: <Zap size={18} />, title: 'Auto Invoice Chase', desc: 'Smart reminders automatically sent to clients at optimized intervals to maximize collection rates.', color: '#FF6B00' },
                            { icon: <AlertTriangle size={18} />, title: 'Draw Schedule Optimizer', desc: 'AI optimizes your payment draws to maximize cash on hand while meeting all contract obligations.', color: '#F59E0B' },
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
                        {['Invoices', 'Change Orders', 'Receivables', 'Draw Schedules', 'Retainage', 'Lien Waivers'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-emerald-500/30 hover:text-emerald-500 transition-all cursor-default">{tag}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Site Security — Advanced Interactive Showcase ────────────────────────
export function SiteSecuritySection() {
    const [activeAsset, setActiveAsset] = useState(null);
    const [securityStep, setSecurityStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setSecurityStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, [isInView]);

    const assets = [
        { id: 'exc', name: 'CAT 320 Excavator', status: 'On-Site', zone: 'Zone A — North Lot', gps: '40.7128°N', fuel: 82, hours: 1247, ok: true, color: '#10B981' },
        { id: 'crane', name: 'Liebherr Tower Crane', status: 'Active', zone: 'Zone B — Main Build', gps: '40.7131°N', fuel: 65, hours: 892, ok: true, color: '#3B82F6' },
        { id: 'skid', name: 'Bobcat S650 Skid', status: '⚠ Left Zone at 2:14 AM', zone: 'Last: Zone A', gps: 'Moving', fuel: 41, hours: 2103, ok: false, color: '#EF4444' },
        { id: 'lift', name: 'JLG Boom Lift', status: 'Idle — Parked', zone: 'Zone C — Storage', gps: '40.7125°N', fuel: 93, hours: 456, ok: true, color: '#10B981' },
        { id: 'dump', name: 'Volvo A30G Hauler', status: 'In Transit', zone: 'En Route → Zone B', gps: 'Moving', fuel: 58, hours: 1689, ok: true, color: '#F59E0B' },
    ];

    const securitySteps = [
        { label: 'GPS Track', icon: <MapPin size={14} />, desc: 'Real-time positioning' },
        { label: 'Geofence', icon: <Shield size={14} />, desc: 'Boundary monitoring' },
        { label: 'Anomaly', icon: <AlertTriangle size={14} />, desc: 'Pattern detection' },
        { label: 'Alert', icon: <Zap size={14} />, desc: 'Instant notification' },
    ];

    const stats = [
        { value: '24/7', label: 'Monitoring', color: '#EF4444' },
        { value: '14', label: 'Assets Tracked', color: '#FF6B00' },
        { value: '1', label: 'Active Alert', color: '#F59E0B' },
        { value: '99.9%', label: 'Uptime', color: '#10B981' },
    ];

    return (
        <section ref={sectionRef} className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold tracking-wider mb-6">
                    <Eye size={12} className="mr-2" /> AI SECURITY SENTINEL
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#FF6B00]">24/7 AI-Powered</span> Asset Protection
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    Construction theft costs the industry $1B+ annually. Gasper's Sentinel AI monitors every piece of equipment with GPS tracking, geofencing, and anomaly detection.
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
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">fleet_security_monitor.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">5 Assets</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-red-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    1 Alert
                                </div>
                            </div>
                        </div>

                        {/* Asset List */}
                        <div className="px-5 py-3 space-y-2">
                            {assets.map((asset, i) => {
                                const isActive = activeAsset === asset.id;
                                return (
                                    <motion.div
                                        key={asset.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 + i * 0.08, type: 'spring', bounce: 0.2 }}
                                        viewport={{ once: true }}
                                        className="p-3 rounded-xl cursor-pointer transition-all duration-300"
                                        style={{
                                            border: isActive ? `1px solid ${asset.color}40` : asset.ok ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(239,68,68,0.25)',
                                            background: isActive ? `${asset.color}06` : asset.ok ? 'rgba(0,0,0,0.01)' : 'rgba(239,68,68,0.04)',
                                        }}
                                        onMouseEnter={() => setActiveAsset(asset.id)}
                                        onMouseLeave={() => setActiveAsset(null)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${asset.color}15`, color: asset.color }}>
                                                    <Truck size={14} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-[#1a1a1a]">{asset.name}</div>
                                                    <div className={`text-[10px] ${asset.ok ? 'text-[#9ca3af]' : 'text-red-500 font-semibold'}`}>{asset.status}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono text-[#9ca3af] hidden sm:block">{asset.zone}</span>
                                                <div className={`w-2.5 h-2.5 rounded-full ${asset.ok ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'}`} />
                                            </div>
                                        </div>
                                        {/* Expanded details on hover */}
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 pt-2 border-t border-black/5">
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">GPS</div>
                                                        <div className="text-[11px] font-bold text-[#1a1a1a] font-mono">{asset.gps}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">Fuel</div>
                                                        <div className="text-[11px] font-bold" style={{ color: asset.fuel > 50 ? '#10B981' : '#F59E0B' }}>{asset.fuel}%</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-[#9ca3af] uppercase">Hours</div>
                                                        <div className="text-[11px] font-bold text-[#1a1a1a] font-mono">{asset.hours.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Security Pipeline */}
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <Shield size={12} className="text-red-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Security Intelligence Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {securitySteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === securityStep ? 'bg-red-500/10 text-red-500 shadow-sm' : i < securityStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
                                            }`}>
                                            {i < securityStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < securitySteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < securityStep ? 'bg-[#10B981]' : 'bg-black/8'}`} />
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
                            { icon: <MapPin size={18} />, title: 'Geofence Alerting', desc: 'Instant alerts when equipment leaves predefined job site boundaries. Track movement patterns across your fleet.', color: '#EF4444' },
                            { icon: <Clock size={18} />, title: 'After-Hours Detection', desc: 'AI identifies unauthorized equipment activation outside working hours and notifies site managers instantly.', color: '#F59E0B' },
                            { icon: <Camera size={18} />, title: 'Visual Surveillance AI', desc: 'Computer vision analyzes site camera feeds to detect unauthorized personnel, safety violations, and anomalies.', color: '#3B82F6' },
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
                        {['GPS Tracking', 'Geofencing', 'Night Vision', 'Motion Alerts', 'Fleet Reports', 'RFID Tags'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-red-500/30 hover:text-red-500 transition-all cursor-default">{tag}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
