import React from 'react';
import { motion } from 'motion/react';
import {
    CalendarClock, Users, CloudRain, Car, Zap, Clock,
    AlertTriangle, CheckCircle, MapPin, ArrowRight, Activity, RefreshCw
} from 'lucide-react';
import { getOptimizedSchedule } from './constructionServices';
import '../../styles/ConstructionTool.css';

export function MicroProjectOptimizer() {
    const data = getOptimizedSchedule();

    const statusConfig = {
        'in-progress': { color: '#22c55e', label: 'IN PROGRESS' },
        'next': { color: '#3b82f6', label: 'NEXT' },
        'scheduled': { color: 'rgba(255,255,255,0.3)', label: 'SCHEDULED' },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <CalendarClock className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Micro-Project Optimizer™
                    </h2>
                    <p className="ct-page-subtitle">AI-powered daily scheduling for multi-job crews</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="ct-badge" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                        {data.date}
                    </div>
                    <div className="ct-badge ct-badge-orange ct-badge-live">
                        AI-Optimized
                    </div>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Total Jobs', value: data.metrics.totalJobs, color: 'white' },
                    { label: 'Completed', value: data.metrics.completedToday, color: '#22c55e' },
                    { label: 'On-Time Rate', value: data.metrics.onTime, color: '#FF6B00' },
                    { label: 'Avg Travel', value: data.metrics.avgTravelTime, color: '#3b82f6' },
                    { label: 'Utilization', value: data.metrics.utilizationRate, color: '#a855f7' },
                    { label: 'Fuel Saved', value: data.metrics.fuelSaved, color: '#22c55e' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Disruptions */}
            {data.disruptions.length > 0 && (
                <div className="space-y-2">
                    {data.disruptions.map((d, idx) => (
                        <motion.div
                            key={idx}
                            className={`ct-alert ct-alert-${d.type === 'weather' ? 'low' : 'medium'}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            style={{ display: 'flex', alignItems: 'center', padding: 14 }}
                        >
                            {d.type === 'weather' ? <CloudRain size={16} style={{ color: '#3b82f6', flexShrink: 0 }} /> :
                                <Car size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />}
                            <span style={{ flex: 1, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginLeft: 10 }}>{d.message}</span>
                            <span className="ct-badge ct-badge-orange" style={{ fontSize: '0.55rem' }}>
                                <RefreshCw size={8} /> {d.suggestion}
                            </span>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Crew Schedule Cards */}
            <div className="space-y-4">
                {data.crews.map((crew, crewIdx) => (
                    <motion.div
                        key={crew.id}
                        className="ct-card"
                        style={{ padding: 20 }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + crewIdx * 0.08 }}
                    >
                        {/* Crew Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div className="ct-icon-box">
                                    <Users size={16} style={{ color: '#FF6B00' }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{crew.name}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>Lead: {crew.lead} · {crew.members} members</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span className={`ct-badge ${crew.fatigue === 'low' ? 'ct-badge-green' : crew.fatigue === 'medium' ? 'ct-badge-amber' : 'ct-badge-red'}`}
                                    style={{ fontSize: '0.55rem' }}>
                                    Fatigue: {crew.fatigue}
                                </span>
                                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{crew.jobs.length} jobs</span>
                            </div>
                        </div>

                        {/* Jobs Timeline */}
                        <div className="space-y-2">
                            {crew.jobs.map((job, jobIdx) => {
                                const sc = statusConfig[job.status] || statusConfig.scheduled;
                                return (
                                    <div key={jobIdx} style={{
                                        display: 'flex', alignItems: 'center', gap: 14, padding: 12,
                                        borderRadius: 10,
                                        background: job.status === 'in-progress' ? 'rgba(34,197,94,0.04)' :
                                            job.status === 'next' ? 'rgba(59,130,246,0.04)' : 'rgba(255,255,255,0.015)',
                                        border: `1px solid ${job.status === 'in-progress' ? 'rgba(34,197,94,0.12)' :
                                            job.status === 'next' ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.04)'}`,
                                        transition: 'background 0.2s',
                                    }}>
                                        {/* Time */}
                                        <div style={{ width: 56, flexShrink: 0 }}>
                                            <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 700, color: sc.color }}>{job.time}</div>
                                        </div>

                                        {/* Status dot */}
                                        <div style={{
                                            width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                                            background: sc.color,
                                            boxShadow: job.status === 'in-progress' ? `0 0 8px ${sc.color}` : 'none',
                                            animation: job.status === 'in-progress' ? 'ct-dot-pulse 2s ease-in-out infinite' : 'none',
                                        }} />

                                        {/* Job Info */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.job}</div>
                                            <div style={{ display: 'flex', gap: 10, fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={8} />{job.address}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={8} />{job.duration}</span>
                                            </div>
                                        </div>

                                        {/* Status label */}
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <span className={`ct-badge ${job.status === 'in-progress' ? 'ct-badge-green' : job.status === 'next' ? 'ct-badge-blue' : ''}`}
                                                style={{
                                                    fontSize: '0.5rem', padding: '2px 6px',
                                                    ...(job.status === 'scheduled' ? { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)' } : {}),
                                                }}>
                                                {sc.label}
                                            </span>
                                            <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
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
                    <button key={i} className="ct-action-btn" style={{ height: 48, justifyContent: 'center' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                        {action}
                        <ArrowRight size={12} style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }} />
                    </button>
                ))}
            </div>
        </div>
    );
}
