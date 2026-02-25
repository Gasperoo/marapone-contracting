import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
    Users, UserCheck, Star, Award, CheckCircle2, Clock, DollarSign,
    HardHat, TrendingUp, Zap, BarChart3, CalendarDays, Hammer,
    Shield, AlertTriangle, ArrowRight, Gauge, Timer, Target
} from 'lucide-react';

// ─── Animated Number ─────────────────────────────────────────────────────
function AnimatedNum({ value, prefix = '', suffix = '', color = 'text-white' }) {
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
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5227FF]/5 rounded-full blur-[120px]" />

            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-medium mb-4"
                >
                    <UserCheck size={14} className="inline mr-2" />
                    AI-Powered Matching
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Perfect Subcontractor</span> in Seconds
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">Our AI analyzes 50+ data points — reliability, safety records, past performance, and availability — to match you with the ideal sub for every trade.</p>
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
                                    : 'border-white/10 bg-black/30 hover:border-white/20'
                                }`}
                        >
                            {selectedSub === i && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6B00] to-[#F59E0B]" />
                            )}
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <div className="text-white font-bold">{sub.name}</div>
                                    <div className="text-xs text-slate-400">{sub.specialty}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-[#FF6B00]">{sub.match}%</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">Match</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-xs text-amber-400">
                                    <Star size={10} fill="currentColor" /> {sub.rating}
                                </div>
                                <span className="text-slate-600">•</span>
                                <div className="text-xs text-slate-400">{sub.projects} projects</div>
                                <span className="text-slate-600">•</span>
                                <div className={`text-xs ${sub.available ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {sub.available ? '✓ Available' : '✗ Booked'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Score Breakdown */}
                <div className="lg:col-span-2 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/5 rounded-full blur-[60px]" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white">{active.name}</h3>
                                <p className="text-sm text-slate-400">{active.specialty}</p>
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
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <span className="text-[#FF6B00]">{metric.icon}</span>
                                            {metric.label}
                                        </div>
                                        <span className="text-sm font-bold text-white">{metric.value}%</span>
                                    </div>
                                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
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
                                    <div className="text-sm font-bold text-white mb-1">AI Recommendation</div>
                                    <div className="text-xs text-slate-400">
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
    const phases = [
        { name: 'Pre-Construction', start: 0, width: 15, progress: 100, color: '#22d3ee', icon: '📋' },
        { name: 'Foundation', start: 12, width: 18, progress: 100, color: '#10b981', icon: '🏗️' },
        { name: 'Framing & Structure', start: 25, width: 22, progress: 78, color: '#FF6B00', icon: '🔨' },
        { name: 'MEP Rough-In', start: 40, width: 20, progress: 45, color: '#F59E0B', icon: '⚡' },
        { name: 'Interior Finish', start: 55, width: 25, progress: 0, color: '#8b5cf6', icon: '🎨' },
        { name: 'Final Inspections', start: 78, width: 12, progress: 0, color: '#ef4444', icon: '✅' },
    ];

    return (
        <section className="px-6 max-w-7xl mx-auto py-24 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-[150px]" />

            <div className="grid lg:grid-cols-5 gap-12 items-start relative z-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-2"
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-wider mb-6">
                        <CalendarDays size={12} className="mr-2" /> LIVE PROJECT TIMELINE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Your Entire Project Timeline —{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">AI-Orchestrated</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        See every phase, milestone, and dependency at a glance. Our AI auto-adjusts schedules when delays occur, re-sequences tasks, and alerts you to cascading impacts.
                    </p>

                    {/* Live Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Overall Progress', value: '47%', sub: 'On Track', color: 'text-emerald-400' },
                            { label: 'Days Remaining', value: '94', sub: 'Est. July 15', color: 'text-[#FF6B00]' },
                            { label: 'Active Workers', value: '38', sub: '+5 vs last week', color: 'text-[#22d3ee]' },
                            { label: 'AI Alerts', value: '2', sub: 'Weather + Delivery', color: 'text-amber-400' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 rounded-xl bg-white/5 border border-white/5"
                            >
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{s.label}</div>
                                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                                <div className="text-xs text-slate-400 mt-1">{s.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right — Gantt Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-3 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl p-6 relative overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold">Riverside Commons — Phase II</h3>
                        <div className="flex items-center gap-1 text-xs text-emerald-400">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            Live
                        </div>
                    </div>

                    {/* Timeline Header */}
                    <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest mb-3 px-1">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(m => (
                            <span key={m}>{m}</span>
                        ))}
                    </div>

                    {/* Gantt Bars */}
                    <div className="space-y-3">
                        {phases.map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-32 flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm">{phase.icon}</span>
                                    <span className="text-xs text-slate-300 truncate">{phase.name}</span>
                                </div>
                                <div className="flex-1 h-8 bg-white/5 rounded-lg relative overflow-hidden">
                                    {/* Full bar (planned) */}
                                    <div
                                        className="absolute top-0 bottom-0 rounded-lg opacity-20"
                                        style={{
                                            left: `${phase.start}%`,
                                            width: `${phase.width}%`,
                                            background: phase.color,
                                        }}
                                    />
                                    {/* Progress bar (actual) */}
                                    {phase.progress > 0 && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(phase.width * phase.progress) / 100}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.1 }}
                                            className="absolute top-0 bottom-0 rounded-lg shadow-lg"
                                            style={{
                                                left: `${phase.start}%`,
                                                background: `linear-gradient(90deg, ${phase.color}, ${phase.color}88)`,
                                                boxShadow: `0 0 12px ${phase.color}40`,
                                            }}
                                        />
                                    )}
                                    {/* Progress label */}
                                    {phase.progress > 0 && (
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold text-white"
                                            style={{ left: `${phase.start + 1}%` }}
                                        >
                                            {phase.progress}%
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Timeline Now Marker */}
                    <div className="relative mt-2" style={{ paddingLeft: '35%' }}>
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-white/40" />
                            <div className="text-[9px] text-white/60 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">Today</div>
                        </div>
                    </div>
                </motion.div>
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
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#FF6B00]">ROI</span> Speaks for Itself
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">Average results from construction firms in their first 6 months with Gasper.</p>
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
                    <h3 className="text-2xl font-bold text-white mb-8">Traditional Approach</h3>

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
                                    <div className="text-sm text-slate-400">{m.label}</div>
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
                    <h3 className="text-2xl font-bold text-white mb-8">AI-Powered Results</h3>

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
                                    <div className="text-sm text-slate-400 flex items-center gap-2">
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
                            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Average Annual Savings</div>
                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-emerald-400">
                                $2.4M
                            </div>
                            <div className="text-xs text-slate-500 mt-1">per $50M project value</div>
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
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#5227FF]/5 rounded-full blur-[150px]" />

            <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
                {/* Resource Board */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] via-[#F59E0B] to-[#FF6B00]" />

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white">Resource Allocation</h3>
                            <p className="text-xs text-slate-500 mt-1">Week of March 1-7 • AI Optimized</p>
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
                                            <span className="text-sm text-white font-semibold">{r.name}</span>
                                            <span className={`text-[10px] ${statusColor} bg-white/5 px-1.5 py-0.5 rounded`}>{status}</span>
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            <span className="text-white font-bold">{r.allocated}</span>/{r.needed} workers
                                        </div>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">Re-sequences</span> Your Schedule in Real Time
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
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
                                    <div className="text-sm text-slate-300">{s.text}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
