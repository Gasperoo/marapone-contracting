import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    BrainCircuit, Calendar, AlertTriangle, CheckCircle, Clock,
    Users, CloudRain, TrendingUp, Zap, Target, Route, ArrowRight
} from 'lucide-react';

const ganttTasks = [
    { name: 'Site Preparation', start: 0, duration: 3, progress: 100, color: '#22c55e', phase: 'Phase 1' },
    { name: 'Foundation Works', start: 2, duration: 5, progress: 85, color: '#3b82f6', phase: 'Phase 1' },
    { name: 'Structural Steel', start: 6, duration: 8, progress: 40, color: '#a855f7', phase: 'Phase 2', critical: true },
    { name: 'MEP Rough-In', start: 10, duration: 6, progress: 15, color: '#06b6d4', phase: 'Phase 2' },
    { name: 'Exterior Envelope', start: 12, duration: 5, progress: 0, color: '#f59e0b', phase: 'Phase 3' },
    { name: 'Interior Fit-Out', start: 15, duration: 7, progress: 0, color: '#ef4444', phase: 'Phase 3', critical: true },
    { name: 'Final Inspections', start: 21, duration: 2, progress: 0, color: '#10b981', phase: 'Phase 4' },
    { name: 'Handover', start: 22, duration: 1, progress: 0, color: '#FF6B00', phase: 'Phase 4' },
];

const riskFactors = [
    { factor: 'Weather Delays', level: 'medium', probability: '35%', impact: '4-8 days', color: '#f59e0b' },
    { factor: 'Supply Chain Disruption', level: 'low', probability: '12%', impact: '2-5 days', color: '#22c55e' },
    { factor: 'Permit Approval', level: 'high', probability: '62%', impact: '10-14 days', color: '#ef4444' },
    { factor: 'Labor Shortage', level: 'medium', probability: '28%', impact: '3-7 days', color: '#f59e0b' },
];

const aiRecommendations = [
    { text: 'Move MEP rough-in start 2 days earlier to reduce critical path exposure', impact: 'Save 2 days', type: 'schedule' },
    { text: 'Order structural steel by March 5 to avoid Q2 price increases (↑8% forecast)', impact: 'Save $47K', type: 'cost' },
    { text: 'Schedule concrete pour for Week 12 — weather window detected (0% rain probability)', impact: 'De-risk', type: 'weather' },
    { text: 'Add 2 electricians in Phase 2 to prevent MEP from becoming bottleneck', impact: 'Save 5 days', type: 'resource' },
];

const totalWeeks = 24;

export function ConstructionAIPlanner() {
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <BrainCircuit className="text-[#FF6B00]" size={24} />
                        AI Construction Planner
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Intelligent scheduling, critical path analysis & risk prediction</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5">
                        <Zap size={12} />
                        AI-Optimized Schedule
                    </div>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-1"><Calendar size={12} />Project Duration</div>
                    <div className="text-2xl font-bold text-white">24 weeks</div>
                    <div className="text-xs text-green-400 mt-1">↓ 3 weeks vs. manual plan</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-1"><Target size={12} />Critical Path</div>
                    <div className="text-2xl font-bold text-red-400">2 tasks</div>
                    <div className="text-xs text-slate-500 mt-1">On critical path</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-1"><TrendingUp size={12} />Completion Prob.</div>
                    <div className="text-2xl font-bold text-green-400">87%</div>
                    <div className="text-xs text-slate-500 mt-1">On-time delivery</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-1"><Users size={12} />Peak Resources</div>
                    <div className="text-2xl font-bold text-white">48</div>
                    <div className="text-xs text-slate-500 mt-1">Workers (Week 14)</div>
                </div>
            </div>

            {/* Gantt Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-x-auto">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Route size={16} className="text-[#FF6B00]" />
                    AI-Generated Schedule
                </h3>

                {/* Week Headers */}
                <div className="min-w-[700px]">
                    <div className="flex items-center mb-2 pl-[180px]">
                        {Array.from({ length: totalWeeks }, (_, i) => (
                            <div key={i} className="flex-1 text-center text-[10px] text-slate-600 font-mono">
                                W{i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2">
                        {ganttTasks.map((task, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center gap-2 group cursor-pointer"
                                onClick={() => setSelectedTask(selectedTask === idx ? null : idx)}
                            >
                                <div className="w-[180px] flex-shrink-0 flex items-center gap-2 pr-4">
                                    <span className="text-sm text-slate-300 truncate">{task.name}</span>
                                    {task.critical && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold flex-shrink-0">CP</span>
                                    )}
                                </div>
                                <div className="flex-1 relative h-8">
                                    {/* Grid lines */}
                                    <div className="absolute inset-0 flex">
                                        {Array.from({ length: totalWeeks }, (_, i) => (
                                            <div key={i} className="flex-1 border-l border-white/5" />
                                        ))}
                                    </div>
                                    {/* Bar */}
                                    <div
                                        className="absolute top-1 h-6 rounded-md transition-all group-hover:brightness-125"
                                        style={{
                                            left: `${(task.start / totalWeeks) * 100}%`,
                                            width: `${(task.duration / totalWeeks) * 100}%`,
                                            background: `${task.color}40`,
                                            border: `1px solid ${task.color}60`,
                                        }}
                                    >
                                        {/* Progress fill */}
                                        <div
                                            className="h-full rounded-md"
                                            style={{
                                                width: `${task.progress}%`,
                                                background: task.color,
                                                opacity: 0.6,
                                            }}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/80">{task.progress}%</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Risk Heat Map */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-400" />
                        Risk Factor Analysis
                    </h3>
                    <div className="space-y-3">
                        {riskFactors.map((risk, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 rounded-full" style={{ background: risk.color }} />
                                    <div>
                                        <div className="text-sm text-white font-medium">{risk.factor}</div>
                                        <div className="text-xs text-slate-500">Impact: {risk.impact}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-mono" style={{ color: risk.color }}>{risk.probability}</div>
                                    <div className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${risk.level === 'high' ? 'bg-red-500/20 text-red-400' : risk.level === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {risk.level}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Zap size={16} className="text-[#FF6B00]" />
                        AI Recommendations
                    </h3>
                    <div className="space-y-3">
                        {aiRecommendations.map((rec, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.08 }}
                                className="p-3 rounded-xl bg-[#FF6B00]/5 border border-[#FF6B00]/10 hover:border-[#FF6B00]/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {rec.type === 'schedule' && <Calendar size={14} className="text-[#FF6B00]" />}
                                        {rec.type === 'cost' && <TrendingUp size={14} className="text-[#FF6B00]" />}
                                        {rec.type === 'weather' && <CloudRain size={14} className="text-[#FF6B00]" />}
                                        {rec.type === 'resource' && <Users size={14} className="text-[#FF6B00]" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-300 leading-snug">{rec.text}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-xs font-bold text-[#FF6B00]">{rec.impact}</span>
                                            <span className="text-xs text-slate-500 group-hover:text-[#FF6B00] flex items-center gap-1 transition-colors">
                                                Apply <ArrowRight size={10} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
