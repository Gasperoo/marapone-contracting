import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
    Users, UserCheck, Star, Award, CheckCircle2, Clock, DollarSign,
    HardHat, TrendingUp, Zap, BarChart3, CalendarDays, Hammer,
    Shield, AlertTriangle, ArrowRight, Gauge, Timer, Target
} from 'lucide-react';

// ─── Animated Number ─────────────────────────────────────────────────────
function AnimatedNum({ value, prefix = '', suffix = '', color = 'text-[#1a1a1a]' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [display, setDisplay] = useState(0);

    React.useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const duration = 1500;
        const startTime = Date.now();
        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [isInView, value]);

    return (
        <span ref={ref} className={`font-black tabular-nums ${color}`}>
            {prefix}{display.toLocaleString()}{suffix}
        </span>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. SUBCONTRACTOR MATCHMAKER — AI Matching Dashboard
// ═══════════════════════════════════════════════════════════════════════════
export function SubcontractorMatchSection() {
    const [selectedSub, setSelectedSub] = useState(0);

    const subs = [
        {
            name: 'Apex Electric Co.',
            specialty: 'Commercial Electrical',
            match: 96,
            rating: 4.9,
            projects: 142,
            onTime: 98,
            budget: 95,
            safety: 100,
            available: true,
        },
        {
            name: 'Ironclad Framing',
            specialty: 'Steel & Concrete',
            match: 91,
            rating: 4.7,
            projects: 89,
            onTime: 94,
            budget: 92,
            safety: 97,
            available: true,
        },
        {
            name: 'Summit HVAC Solutions',
            specialty: 'Mechanical Systems',
            match: 87,
            rating: 4.6,
            projects: 67,
            onTime: 91,
            budget: 88,
            safety: 99,
            available: false,
        },
    ];

    const active = subs[selectedSub];

    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#FF6B00]/5 rounded-full blur-[150px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0EA5E9]/5 rounded-full blur-[120px]" />

            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-medium mb-4"
                >
                    <UserCheck size={14} className="inline mr-2" />
                    AI-Powered Matching
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Perfect Subcontractor</span> in Seconds
                </h2>
                <p className="text-[#6b7280] max-w-2xl mx-auto text-lg">Our AI analyzes 50+ data points — reliability, safety records, past performance, and availability — to match you with the ideal sub for every trade.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 relative z-10">
                {/* Sub List */}
                <div className="space-y-4">
                    {subs.map((sub, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedSub(i)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedSub === i
                                ? 'border-[#FF6B00]/50 bg-[#FF6B00]/10 shadow-[0_0_30px_rgba(255,107,0,0.1)]'
                                : 'border-black/8 bg-white hover:border-black/15 shadow-sm'
                                }`}
                        >
                            {selectedSub === i && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6B00] to-[#F59E0B]" />
                            )}
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <div className="text-[#1a1a1a] font-bold">{sub.name}</div>
                                    <div className="text-xs text-[#6b7280]">{sub.specialty}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-[#FF6B00]">{sub.match}%</div>
                                    <div className="text-[10px] text-[#6b7280] uppercase tracking-widest">Match</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-xs text-amber-400">
                                    <Star size={10} fill="currentColor" /> {sub.rating}
                                </div>
                                <span className="text-slate-600">•</span>
                                <div className="text-xs text-[#6b7280]">{sub.projects} projects</div>
                                <span className="text-slate-600">•</span>
                                <div className={`text-xs ${sub.available ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {sub.available ? '✓ Available' : '✗ Booked'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Score Breakdown */}
                <div className="lg:col-span-2 rounded-3xl bg-white border border-black/8 shadow-sm p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/5 rounded-full blur-[60px]" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-[#1a1a1a]">{active.name}</h3>
                                <p className="text-sm text-[#6b7280]">{active.specialty}</p>
                            </div>
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B00]/20 to-[#FF6B00]/5 border border-[#FF6B00]/30 flex flex-col items-center justify-center">
                                <div className="text-2xl font-black text-[#FF6B00]">{active.match}</div>
                                <div className="text-[9px] text-[#FF6B00]/70 uppercase tracking-widest">Score</div>
                            </div>
                        </div>

                        {/* Animated Score Bars */}
                        <div className="space-y-5">
                            {[
                                { label: 'On-Time Delivery', value: active.onTime, icon: <Clock size={16} /> },
                                { label: 'Budget Adherence', value: active.budget, icon: <DollarSign size={16} /> },
                                { label: 'Safety Record', value: active.safety, icon: <Shield size={16} /> },
                            ].map((metric, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-sm text-[#374151]">
                                            <span className="text-[#FF6B00]">{metric.icon}</span>
                                            {metric.label}
                                        </div>
                                        <span className="text-sm font-bold text-[#1a1a1a]">{metric.value}%</span>
                                    </div>
                                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            key={`${selectedSub}-${i}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${metric.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: metric.value >= 95
                                                    ? 'linear-gradient(90deg, #FF6B00, #F59E0B)'
                                                    : metric.value >= 90
                                                        ? 'linear-gradient(90deg, #FF6B00, #FF8C3A)'
                                                        : 'linear-gradient(90deg, #f59e0b, #f97316)'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Insights */}
                        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#FF6B00]/10 to-transparent border border-[#FF6B00]/20">
                            <div className="flex items-start gap-3">
                                <Zap size={18} className="text-[#FF6B00] mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-bold text-[#1a1a1a] mb-1">AI Recommendation</div>
                                    <div className="text-xs text-[#6b7280]">
                                        {active.name} has completed {active.projects} similar projects with a {active.onTime}% on-time rate.
                                        {active.safety === 100 ? ' Perfect safety record — zero incidents reported.' : ` Safety score: ${active.safety}%.`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. PROJECT COMMAND CENTER — Live Gantt Timeline
// ═══════════════════════════════════════════════════════════════════════════
export function ProjectCommandCenter() {
    const [activePhase, setActivePhase] = useState(null);
    const [pipeStep, setPipeStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    React.useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setPipeStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, [isInView]);

    const phases = [
        { name: 'Pre-Construction', start: 0, width: 15, progress: 100, color: '#22d3ee', months: 'Jan–Feb', tasks: 12, workers: 6 },
        { name: 'Foundation', start: 12, width: 18, progress: 100, color: '#10b981', months: 'Feb–Apr', tasks: 18, workers: 14 },
        { name: 'Framing & Structure', start: 25, width: 22, progress: 78, color: '#FF6B00', months: 'Mar–Jun', tasks: 24, workers: 22 },
        { name: 'MEP Rough-In', start: 40, width: 20, progress: 45, color: '#F59E0B', months: 'May–Jul', tasks: 31, workers: 18 },
        { name: 'Interior Finish', start: 55, width: 25, progress: 0, color: '#8b5cf6', months: 'Jul–Sep', tasks: 28, workers: 0 },
        { name: 'Final Inspections', start: 78, width: 12, progress: 0, color: '#ef4444', months: 'Sep–Oct', tasks: 9, workers: 0 },
    ];

    const pipelineSteps = [
        { label: 'Schedule', icon: <CalendarDays size={14} /> },
        { label: 'Track', icon: <BarChart3 size={14} /> },
        { label: 'Optimize', icon: <Zap size={14} /> },
        { label: 'Report', icon: <Target size={14} /> },
    ];

    const stats = [
        { value: '47%', label: 'Overall Progress', color: '#FF6B00' },
        { value: '94', label: 'Days Remaining', color: '#3B82F6' },
        { value: '38', label: 'Active Workers', color: '#10B981' },
        { value: '2', label: 'AI Alerts', color: '#F59E0B' },
    ];

    return (
        <section ref={sectionRef} className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                    <CalendarDays size={12} className="mr-2" /> LIVE PROJECT TIMELINE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    Your Entire Project — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">AI-Orchestrated</span>
                </h2>
                <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
                    See every phase, milestone, and dependency at a glance. Our AI auto-adjusts schedules when delays occur and alerts you to cascading impacts.
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
                                <span className="ml-3 text-xs font-mono text-[#6b7280]">riverside_commons_phase2.gasper</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-[10px] font-mono text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded">6 Phases</div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Live
                                </div>
                            </div>
                        </div>

                        {/* Month headers */}
                        <div className="px-5 pt-3 pb-1">
                            <div className="flex justify-between text-[9px] text-[#9ca3af] uppercase tracking-widest font-mono">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(m => (
                                    <span key={m}>{m}</span>
                                ))}
                            </div>
                        </div>

                        {/* Gantt Bars */}
                        <div className="px-5 py-2 space-y-2">
                            {phases.map((phase, i) => {
                                const isActive = activePhase === i;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 + i * 0.08, type: 'spring', bounce: 0.2 }}
                                        viewport={{ once: true }}
                                        className="cursor-pointer transition-all duration-300"
                                        onMouseEnter={() => setActivePhase(i)}
                                        onMouseLeave={() => setActivePhase(null)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-28 flex-shrink-0">
                                                <div className="text-[11px] font-bold text-[#1a1a1a] truncate">{phase.name}</div>
                                                <div className="text-[9px] text-[#9ca3af]">{phase.months}</div>
                                            </div>
                                            <div className="flex-1 h-7 bg-gray-50 rounded-lg relative overflow-hidden border border-black/4">
                                                <div className="absolute top-0 bottom-0 rounded-lg opacity-15" style={{ left: `${phase.start}%`, width: `${phase.width}%`, background: phase.color }} />
                                                {phase.progress > 0 && (
                                                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(phase.width * phase.progress) / 100}%` }}
                                                        transition={{ duration: 1.5, delay: i * 0.1 }}
                                                        className="absolute top-0 bottom-0 rounded-lg"
                                                        style={{ left: `${phase.start}%`, background: `linear-gradient(90deg, ${phase.color}, ${phase.color}99)`, boxShadow: `0 0 8px ${phase.color}30` }}
                                                    />
                                                )}
                                                {phase.progress > 0 && (
                                                    <div className="absolute top-1/2 -translate-y-1/2 text-[9px] font-bold text-white drop-shadow-sm"
                                                        style={{ left: `${phase.start + 1.5}%` }}>
                                                        {phase.progress}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="ml-[7.5rem] mt-1 mb-1 pl-3 border-l-2" style={{ borderColor: `${phase.color}40` }}>
                                                <div className="flex gap-4 text-[9px]">
                                                    <div><span className="text-[#9ca3af] uppercase">Tasks</span> <span className="font-bold text-[#1a1a1a]">{phase.tasks}</span></div>
                                                    <div><span className="text-[#9ca3af] uppercase">Workers</span> <span className="font-bold text-[#1a1a1a]">{phase.workers}</span></div>
                                                    <div><span className="text-[#9ca3af] uppercase">Progress</span> <span className="font-bold" style={{ color: phase.color }}>{phase.progress}%</span></div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Today marker */}
                        <div className="px-5 py-1">
                            <div className="relative" style={{ paddingLeft: '35%' }}>
                                <div className="flex flex-col items-center">
                                    <div className="w-0.5 h-3 bg-[#FF6B00]/30" />
                                    <div className="text-[8px] text-[#FF6B00] uppercase tracking-widest bg-[#FF6B00]/10 px-2 py-0.5 rounded font-bold">Today</div>
                                </div>
                            </div>
                        </div>

                        {/* Pipeline */}
                        <div className="px-5 py-3 border-t border-black/6 bg-gradient-to-r from-white to-gray-50">
                            <div className="flex items-center gap-1 mb-2">
                                <CalendarDays size={12} className="text-[#FF6B00]" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">Project Intelligence Pipeline</span>
                            </div>
                            <div className="flex items-center gap-0">
                                {pipelineSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-500 ${i === pipeStep ? 'bg-[#FF6B00]/10 text-[#FF6B00] shadow-sm' : i < pipeStep ? 'text-[#10B981]' : 'text-[#9ca3af]'
                                            }`}>
                                            {i < pipeStep ? <CheckCircle2 size={12} className="text-[#10B981]" /> : step.icon}
                                            <span className="hidden sm:inline">{step.label}</span>
                                        </div>
                                        {i < pipelineSteps.length - 1 && (
                                            <div className={`w-4 h-[2px] mx-0.5 rounded transition-colors duration-500 ${i < pipeStep ? 'bg-[#10B981]' : 'bg-black/8'}`} />
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
                            { icon: <Zap size={18} />, title: 'Auto Re-Sequencing', desc: 'AI detects delays and re-calculates your critical path in real-time, suggesting actionable schedule adjustments.', color: '#FF6B00' },
                            { icon: <AlertTriangle size={18} />, title: 'Cascade Impact Alerts', desc: 'See exactly how one delay ripples across all dependent phases — before it costs you money.', color: '#F59E0B' },
                            { icon: <Users size={18} />, title: 'Crew Coordination', desc: 'Resource allocation optimized by AI — right crew, right phase, right time. Zero idle workers.', color: '#3B82F6' },
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
                        {['Gantt Charts', 'Critical Path', 'Weather AI', 'Milestone Gates', 'Crew Tracking', 'Daily Logs'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white border border-black/8 text-[#6b7280] hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all cursor-default">{tag}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. ROI IMPACT — Before / After with Animated Counters
// ═══════════════════════════════════════════════════════════════════════════
export function ROIImpactSection() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B00]/3 to-transparent pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4"
                >
                    <TrendingUp size={14} className="inline mr-2" />
                    Proven Results
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#FF6B00]">ROI</span> Speaks for Itself
                </h2>
                <p className="text-[#6b7280] max-w-2xl mx-auto text-lg">Average results from construction firms in their first 6 months with Gasper.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {/* Before */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent backdrop-blur-xl p-8 relative"
                >
                    <div className="absolute top-6 right-6 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">BEFORE GASPER</div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-8">Traditional Approach</h3>

                    <div className="space-y-6">
                        {[
                            { label: 'Average Cost Overrun', value: 28, suffix: '%', icon: <TrendingUp size={20} />, color: 'text-red-400' },
                            { label: 'Schedule Delays', value: 45, suffix: ' days', icon: <Clock size={20} />, color: 'text-red-400' },
                            { label: 'Safety Incidents / Year', value: 12, suffix: '', icon: <AlertTriangle size={20} />, color: 'text-red-400' },
                            { label: 'Subcontractor Rework Rate', value: 18, suffix: '%', icon: <Hammer size={20} />, color: 'text-red-400' },
                        ].map((m, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0">{m.icon}</div>
                                <div className="flex-1">
                                    <div className="text-sm text-[#6b7280]">{m.label}</div>
                                    <div className={`text-2xl font-black ${m.color}`}>
                                        <AnimatedNum value={m.value} suffix={m.suffix} color={m.color} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* After */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-[#FF6B00]/30 bg-gradient-to-br from-[#FF6B00]/5 to-transparent backdrop-blur-xl p-8 relative shadow-[0_0_60px_rgba(255,107,0,0.05)]"
                >
                    <div className="absolute top-6 right-6 text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/20 flex items-center gap-1">
                        <Zap size={10} /> WITH GASPER
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-8">AI-Powered Results</h3>

                    <div className="space-y-6">
                        {[
                            { label: 'Average Cost Overrun', value: 4, suffix: '%', icon: <TrendingUp size={20} />, color: 'text-emerald-400', saved: '↓ 86%' },
                            { label: 'Schedule Delays', value: 8, suffix: ' days', icon: <Clock size={20} />, color: 'text-emerald-400', saved: '↓ 82%' },
                            { label: 'Safety Incidents / Year', value: 1, suffix: '', icon: <Shield size={20} />, color: 'text-emerald-400', saved: '↓ 92%' },
                            { label: 'Subcontractor Rework Rate', value: 3, suffix: '%', icon: <CheckCircle2 size={20} />, color: 'text-emerald-400', saved: '↓ 83%' },
                        ].map((m, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] flex-shrink-0">{m.icon}</div>
                                <div className="flex-1">
                                    <div className="text-sm text-[#6b7280] flex items-center gap-2">
                                        {m.label}
                                        <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">{m.saved}</span>
                                    </div>
                                    <div className={`text-2xl font-black ${m.color}`}>
                                        <AnimatedNum value={m.value} suffix={m.suffix} color={m.color} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom highlight */}
                    <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#FF6B00]/10 to-emerald-500/10 border border-[#FF6B00]/20">
                        <div className="text-center">
                            <div className="text-xs text-[#6b7280] uppercase tracking-widest mb-1">Average Annual Savings</div>
                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-emerald-400">
                                $2.4M
                            </div>
                            <div className="text-xs text-[#6b7280] mt-1">per $50M project value</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. AI SCHEDULE OPTIMIZER — Resource Utilization + Smart Suggestions
// ═══════════════════════════════════════════════════════════════════════════
export function ScheduleOptimizerSection() {
    const resources = [
        { name: 'Electricians', allocated: 8, needed: 12, utilization: 94 },
        { name: 'Plumbers', allocated: 5, needed: 5, utilization: 87 },
        { name: 'Concrete Crew', allocated: 6, needed: 4, utilization: 62 },
        { name: 'Crane Operators', allocated: 2, needed: 2, utilization: 100 },
        { name: 'Drywall Team', allocated: 0, needed: 8, utilization: 0 },
    ];

    const suggestions = [
        { type: 'critical', text: 'Add 4 electricians by March 3 to avoid 2-week delay on MEP rough-in', icon: <AlertTriangle size={14} /> },
        { type: 'optimize', text: 'Reallocate 2 concrete crew to drywall prep — concrete phase 95% complete', icon: <Target size={14} /> },
        { type: 'weather', text: 'Rain forecast Mar 7-9: move exterior framing tasks forward by 2 days', icon: <Gauge size={14} /> },
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#0EA5E9]/5 rounded-full blur-[150px]" />

            <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
                {/* Resource Board */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-white border border-black/8 shadow-sm p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] via-[#F59E0B] to-[#FF6B00]" />

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-[#1a1a1a]">Resource Allocation</h3>
                            <p className="text-xs text-[#6b7280] mt-1">Week of March 1-7 • AI Optimized</p>
                        </div>
                        <div className="text-xs font-bold bg-[#FF6B00]/10 text-[#FF6B00] px-3 py-1 rounded-full border border-[#FF6B00]/20">
                            <Zap size={10} className="inline mr-1" />
                            3 Suggestions
                        </div>
                    </div>

                    <div className="space-y-5">
                        {resources.map((r, i) => {
                            const isOver = r.allocated > r.needed;
                            const isUnder = r.allocated < r.needed;
                            const status = isOver ? 'Over-allocated' : isUnder ? 'Under-staffed' : 'Optimal';
                            const statusColor = isOver ? 'text-amber-400' : isUnder ? 'text-red-400' : 'text-emerald-400';

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-[#1a1a1a] font-semibold">{r.name}</span>
                                            <span className={`text-[10px] ${statusColor} bg-gray-50 px-1.5 py-0.5 rounded`}>{status}</span>
                                        </div>
                                        <div className="text-xs text-[#6b7280]">
                                            <span className="text-[#1a1a1a] font-bold">{r.allocated}</span>/{r.needed} workers
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${r.utilization}%` }}
                                            transition={{ duration: 1.2, delay: i * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: r.utilization === 0
                                                    ? 'rgba(255,255,255,0.1)'
                                                    : r.utilization >= 90
                                                        ? 'linear-gradient(90deg, #FF6B00, #F59E0B)'
                                                        : r.utilization >= 70
                                                            ? 'linear-gradient(90deg, #22d3ee, #3b82f6)'
                                                            : 'linear-gradient(90deg, #f59e0b, #f97316)'
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* AI Suggestions + Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold tracking-wider mb-6">
                        <Timer size={12} className="mr-2" /> SCHEDULE OPTIMIZATION
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                        AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Re-sequences</span> Your Schedule in Real Time
                    </h2>
                    <p className="text-[#6b7280] text-lg leading-relaxed mb-8">
                        Weather changes, material delays, labor shortages — Gasper's Optimizer AI re-calculates your critical path in real-time and suggests actionable re-sequencing to keep your project on track.
                    </p>

                    {/* AI Suggestion Cards */}
                    <div className="space-y-4">
                        {suggestions.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`p-4 rounded-xl border backdrop-blur-xl flex items-start gap-3 ${s.type === 'critical'
                                    ? 'border-red-500/30 bg-red-500/5'
                                    : s.type === 'optimize'
                                        ? 'border-[#FF6B00]/30 bg-[#FF6B00]/5'
                                        : 'border-amber-500/30 bg-amber-500/5'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${s.type === 'critical' ? 'bg-red-500/20 text-red-400'
                                    : s.type === 'optimize' ? 'bg-[#FF6B00]/20 text-[#FF6B00]'
                                        : 'bg-amber-500/20 text-amber-400'
                                    }`}>
                                    {s.icon}
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{
                                        color: s.type === 'critical' ? '#ef4444' : s.type === 'optimize' ? '#FF6B00' : '#f59e0b'
                                    }}>
                                        {s.type === 'critical' ? 'Critical' : s.type === 'optimize' ? 'Optimization' : 'Weather Alert'}
                                    </div>
                                    <div className="text-sm text-[#374151]">{s.text}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
