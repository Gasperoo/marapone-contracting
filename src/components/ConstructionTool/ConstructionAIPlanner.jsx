import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    BrainCircuit, Calendar, AlertTriangle, CheckCircle, Clock,
    Users, CloudRain, TrendingUp, Zap, Target, Route, ArrowRight, Lightbulb
} from 'lucide-react';
import '../../styles/ConstructionTool.css';

const tasks = [
    { name: 'Site Preparation', start: 0, duration: 3, progress: 100, color: '#FF6B00', phase: 'Phase 1' },
    { name: 'Foundation', start: 2, duration: 4, progress: 85, color: '#3b82f6', phase: 'Phase 1' },
    { name: 'Structural Framing', start: 5, duration: 6, progress: 60, color: '#22c55e', phase: 'Phase 2' },
    { name: 'MEP Rough-In', start: 8, duration: 5, progress: 30, color: '#a855f7', phase: 'Phase 2' },
    { name: 'Exterior Envelop', start: 10, duration: 4, progress: 10, color: '#06b6d4', phase: 'Phase 3' },
    { name: 'Interior Finishes', start: 14, duration: 6, progress: 0, color: '#ec4899', phase: 'Phase 3' },
    { name: 'Final Inspections', start: 21, duration: 2, progress: 0, color: '#10b981', phase: 'Phase 4' },
    { name: 'Handover', start: 22, duration: 1, progress: 0, color: '#FF6B00', phase: 'Phase 4' },
];

const riskFactors = [
    { factor: 'Weather Delays', level: 'medium', probability: '35%', impact: '4-8 days', color: '#f59e0b' },
    { factor: 'Supply Chain Disruption', level: 'low', probability: '12%', impact: '2-5 days', color: '#22c55e' },
    { factor: 'Labor Shortage', level: 'high', probability: '58%', impact: '10-15 days', color: '#ef4444' },
    { factor: 'Permit Delays', level: 'medium', probability: '25%', impact: '5-10 days', color: '#f59e0b' },
];

const aiSuggestions = [
    { text: 'Move exterior cladding start 2 days earlier to create buffer for weather', impact: 'Save 3 days', type: 'schedule' },
    { text: 'Order steel beams by Mar 1 — supplier lead time increasing to 8 weeks', impact: 'Prevent 12-day delay', type: 'procurement' },
    { text: 'Add 2 electricians in Phase 2 to prevent MEP from becoming bottleneck', impact: 'Save 5 days', type: 'resource' },
];

const totalWeeks = 24;

export function ConstructionAIPlanner() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <BrainCircuit className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        AI Planner
                    </h2>
                    <p className="ct-page-subtitle">Smart scheduling & critical path optimization</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="ct-badge ct-badge-orange ct-badge-live">
                        AI Optimizer Active
                    </div>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                    { label: 'Total Duration', value: '24 Weeks', color: 'white' },
                    { label: 'On Schedule', value: '87%', color: '#22c55e' },
                    { label: 'Critical Path', value: '18 Tasks', color: '#ef4444' },
                    { label: 'AI Optimized', value: '14 Days Saved', color: '#FF6B00' },
                    { label: 'Budget Utilization', value: '76%', color: '#3b82f6' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Gantt Chart */}
            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header">
                    <Calendar size={15} className="ct-section-icon" />
                    Project Timeline — Gantt View
                </h3>

                {/* Week Headers */}
                <div style={{ display: 'flex', marginBottom: 8, paddingLeft: 180 }}>
                    {Array.from({ length: totalWeeks }).map((_, i) => (
                        <div key={i} style={{
                            flex: 1, textAlign: 'center', fontSize: '0.5rem', fontWeight: 600,
                            color: 'rgba(255,255,255,0.2)', borderLeft: '1px solid rgba(255,255,255,0.03)',
                        }}>
                            W{i + 1}
                        </div>
                    ))}
                </div>

                {/* Task Rows */}
                <div className="space-y-2">
                    {tasks.map((task, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 0 }}
                        >
                            {/* Task Name */}
                            <div style={{
                                width: 180, flexShrink: 0,
                                display: 'flex', alignItems: 'center', gap: 8, paddingRight: 12,
                            }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: 3,
                                    background: task.color,
                                    boxShadow: `0 0 6px ${task.color}60`,
                                }} />
                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{task.name}</span>
                            </div>

                            {/* Bar Track */}
                            <div style={{
                                flex: 1, height: 28, position: 'relative',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: 6,
                            }}>
                                {/* Grid lines */}
                                {Array.from({ length: totalWeeks }).map((_, i) => (
                                    <div key={i} style={{
                                        position: 'absolute', left: `${(i / totalWeeks) * 100}%`,
                                        top: 0, bottom: 0, width: 1,
                                        background: 'rgba(255,255,255,0.02)',
                                    }} />
                                ))}

                                {/* Task Bar */}
                                <motion.div
                                    className="ct-timeline-bar"
                                    style={{
                                        position: 'absolute',
                                        left: `${(task.start / totalWeeks) * 100}%`,
                                        width: `${(task.duration / totalWeeks) * 100}%`,
                                        top: 2, bottom: 2,
                                        background: `linear-gradient(90deg, ${task.color}, ${task.color}80)`,
                                    }}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.3 + idx * 0.06, duration: 0.5 }}
                                >
                                    {/* Progress overlay */}
                                    {task.progress > 0 && task.progress < 100 && (
                                        <div style={{
                                            position: 'absolute', top: 0, left: 0, bottom: 0,
                                            width: `${task.progress}%`,
                                            background: 'rgba(255,255,255,0.15)',
                                            borderRadius: '6px 0 0 6px',
                                        }} />
                                    )}
                                    <span style={{
                                        position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                                        fontSize: '0.55rem', fontWeight: 700, color: 'white',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                    }}>
                                        {task.progress > 0 ? `${task.progress}%` : ''}
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Risk Factors */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <AlertTriangle size={15} className="ct-section-icon" />
                        Risk Assessment
                    </h3>
                    <div className="space-y-3">
                        {riskFactors.map((risk, idx) => (
                            <motion.div
                                key={idx}
                                className={`ct-alert ct-alert-${risk.level}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.06 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{risk.factor}</span>
                                    <span className={`ct-badge ct-badge-${risk.level === 'high' ? 'red' : risk.level === 'medium' ? 'amber' : 'green'}`}>
                                        {risk.level}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: 16, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
                                    <span>Probability: <strong style={{ color: risk.color }}>{risk.probability}</strong></span>
                                    <span>Impact: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{risk.impact}</strong></span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* AI Suggestions */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <Zap size={15} className="ct-section-icon" />
                        AI Optimization Suggestions
                    </h3>
                    <div className="space-y-3">
                        {aiSuggestions.map((sug, idx) => (
                            <motion.div
                                key={idx}
                                className="ct-ai-suggestion"
                                style={{ padding: 16, borderRadius: 12, cursor: 'pointer' }}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.08 }}
                                whileHover={{ scale: 1.01 }}
                            >
                                <Lightbulb size={16} className="ai-icon" style={{ marginTop: 2 }} />
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 6 }}>{sug.text}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{
                                            fontSize: '0.6rem', fontWeight: 700,
                                            padding: '2px 8px', borderRadius: 100,
                                            background: 'rgba(34,197,94,0.1)', color: '#22c55e',
                                            border: '1px solid rgba(34,197,94,0.2)',
                                        }}>
                                            {sug.impact}
                                        </span>
                                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
                                            {sug.type}
                                        </span>
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
