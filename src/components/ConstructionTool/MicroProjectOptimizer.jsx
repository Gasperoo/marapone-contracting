import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    CalendarClock, Users, CloudRain, Car, Zap, Clock,
    AlertTriangle, CheckCircle, MapPin, ArrowRight, Activity, RefreshCw
} from 'lucide-react';
import { getOptimizedSchedule } from './constructionServices';

export function MicroProjectOptimizer() {
    const data = getOptimizedSchedule();

    const statusColors = {
        'in-progress': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
        'next': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
        'scheduled': { bg: 'bg-white/5', text: 'text-slate-400', border: 'border-white/10' },
    };

    const fatigueColors = {
        'low': 'text-green-400',
        'medium': 'text-amber-400',
        'high': 'text-red-400',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <CalendarClock className="text-[#FF6B00]" size={24} />
                        Micro-Project Optimizer™
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">AI-powered daily scheduling for multi-job crews</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium">
                        {data.date}
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5">
                        <Zap size={12} />
                        AI-Optimized
                    </div>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Total Jobs', value: data.metrics.totalJobs, color: 'text-white' },
                    { label: 'Completed', value: data.metrics.completedToday, color: 'text-green-400' },
                    { label: 'On-Time Rate', value: data.metrics.onTime, color: 'text-[#FF6B00]' },
                    { label: 'Avg Travel', value: data.metrics.avgTravelTime, color: 'text-blue-400' },
                    { label: 'Utilization', value: data.metrics.utilizationRate, color: 'text-purple-400' },
                    { label: 'Fuel Saved', value: data.metrics.fuelSaved, color: 'text-green-400' },
                ].map((kpi, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                    >
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                        <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Disruptions Banner */}
            {data.disruptions.length > 0 && (
                <div className="space-y-2">
                    {data.disruptions.map((d, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className={`flex items-center gap-3 p-3 rounded-xl border ${d.type === 'weather' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-amber-500/5 border-amber-500/20'
                                }`}
                        >
                            {d.type === 'weather' ? <CloudRain size={16} className="text-blue-400 flex-shrink-0" /> : <Car size={16} className="text-amber-400 flex-shrink-0" />}
                            <div className="flex-1">
                                <span className="text-xs text-white/80">{d.message}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-[#FF6B00] font-bold flex-shrink-0">
                                <RefreshCw size={10} />
                                {d.suggestion}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Crew Schedule Cards */}
            <div className="space-y-4">
                {data.crews.map((crew, crewIdx) => (
                    <motion.div
                        key={crew.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + crewIdx * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-5"
                    >
                        {/* Crew Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center">
                                    <Users size={18} className="text-[#FF6B00]" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">{crew.name}</div>
                                    <div className="text-xs text-slate-500">Lead: {crew.lead} · {crew.members} members</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${crew.fatigue === 'low' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                        crew.fatigue === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}>
                                    Fatigue: {crew.fatigue}
                                </div>
                                <span className="text-xs text-slate-500">{crew.jobs.length} jobs</span>
                            </div>
                        </div>

                        {/* Jobs Timeline */}
                        <div className="space-y-2">
                            {crew.jobs.map((job, jobIdx) => {
                                const sc = statusColors[job.status] || statusColors.scheduled;
                                return (
                                    <div
                                        key={jobIdx}
                                        className={`flex items-center gap-4 p-3 rounded-xl border transition-all hover:bg-white/[0.03] ${sc.border} ${sc.bg}`}
                                    >
                                        {/* Time */}
                                        <div className="w-20 flex-shrink-0">
                                            <div className={`text-sm font-mono font-bold ${sc.text}`}>{job.time}</div>
                                        </div>

                                        {/* Status dot + connector */}
                                        <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                                            <div className={`w-3 h-3 rounded-full border-2 ${job.status === 'in-progress' ? 'bg-green-400 border-green-400 animate-pulse' :
                                                    job.status === 'next' ? 'bg-blue-400 border-blue-400' :
                                                        'bg-transparent border-white/20'
                                                }`} />
                                        </div>

                                        {/* Job Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm text-white font-medium truncate">{job.job}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                                <span className="flex items-center gap-0.5"><MapPin size={9} />{job.address}</span>
                                                <span className="flex items-center gap-0.5"><Clock size={9} />{job.duration}</span>
                                            </div>
                                        </div>

                                        {/* Travel + Status */}
                                        <div className="text-right flex-shrink-0">
                                            <span className={`text-[10px] font-bold uppercase ${sc.text}`}>{job.status.replace('-', ' ')}</span>
                                            <div className="text-[10px] text-slate-500 flex items-center gap-0.5 justify-end mt-0.5">
                                                <Car size={8} /> {job.travel}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Send Crew Briefs via SMS', 'Re-Optimize Schedule', 'View Performance Report'].map((action, i) => (
                    <button key={i} className="h-12 border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/5 hover:border-white/20 text-white text-sm flex items-center justify-center gap-2 transition-all group">
                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#FF6B00] transition-colors" />
                        {action}
                        <ArrowRight size={14} className="text-white/30 group-hover:text-[#FF6B00] transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    );
}
