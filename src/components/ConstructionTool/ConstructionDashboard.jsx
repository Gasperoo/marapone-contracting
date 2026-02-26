import React from 'react';
import { motion } from 'motion/react';
import {
    HardHat, FileSearch, Calculator, BrainCircuit, Boxes, Wrench,
    TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, ArrowRight,
    DollarSign, UserSearch, ShieldCheck, CalendarClock, MessageCircleHeart, Siren, MapPinCheck,
    Sparkles, Zap, Activity
} from 'lucide-react';
import '../../styles/ConstructionTool.css';

const stats = [
    { label: 'Active Projects', value: '12', change: '+3 this month', trend: 'up', color: '#FF6B00' },
    { label: 'Tasks Completed', value: '847', change: '94% on time', trend: 'up', color: '#22c55e' },
    { label: 'Blueprint Analyses', value: '2,341', change: '+127 this week', trend: 'up', color: '#3b82f6' },
    { label: 'Maint. Predictions', value: '98.2%', change: 'Accuracy rate', trend: 'up', color: '#a855f7' },
];

const modules = [
    { id: 'blueprint', label: 'Blueprint Analyzer', icon: FileSearch, desc: 'AI-powered plan reading & annotation', color: '#3b82f6' },
    { id: 'takeoff', label: 'Takeoff Tools', icon: Calculator, desc: 'Quantity extraction & BOQ generation', color: '#22c55e' },
    { id: 'planner', label: 'AI Planner', icon: BrainCircuit, desc: 'Smart scheduling & critical path', color: '#FF6B00' },
    { id: 'design', label: 'Generative Design', icon: Boxes, desc: '3D modeling & design optimization', color: '#a855f7' },
    { id: 'maintenance', label: 'Predictive Maintenance', icon: Wrench, desc: 'Equipment health & failure prediction', color: '#ef4444' },
    { id: 'cashflow', label: 'Cash Flow Guardian', icon: DollarSign, desc: 'Predictive cash defense for SMBs', color: '#f59e0b' },
    { id: 'subcontractor', label: 'Sub Matchmaker', icon: UserSearch, desc: 'AI sub matching & smart contracts', color: '#06b6d4' },
    { id: 'cap', label: 'Compliance Auto-Pilot', icon: ShieldCheck, desc: 'Real-time compliance & permit mgmt', color: '#10b981' },
    { id: 'optimizer', label: 'Job Optimizer', icon: CalendarClock, desc: 'Multi-job crew scheduling AI', color: '#8b5cf6' },
    { id: 'feedback', label: 'Client Feedback', icon: MessageCircleHeart, desc: 'Sentiment analysis & retention AI', color: '#ec4899' },
    { id: 'theft', label: 'Theft Sentinel', icon: Siren, desc: 'Predictive theft & anomaly detection', color: '#dc2626' },
    { id: 'utilization', label: 'Site Arrival', icon: MapPinCheck, desc: 'Fleet utilization & billable time', color: '#0ea5e9' },
];

const recentActivity = [
    { type: 'success', text: 'Blueprint analysis completed — Warehouse B (Phase 2)', time: '5m ago', color: '#22c55e' },
    { type: 'warning', text: 'Equipment alert: Crane #04 bearing vibration anomaly detected', time: '12m ago', color: '#f59e0b' },
    { type: 'info', text: 'AI Planner updated schedule for Commercial Tower – saved 6 days', time: '1h ago', color: '#3b82f6' },
    { type: 'success', text: 'Takeoff report exported for Riverside Apartments (42 items)', time: '2h ago', color: '#22c55e' },
    { type: 'info', text: 'Generative Design produced 8 new layout variants for Office Complex', time: '3h ago', color: '#3b82f6' },
];

export function ConstructionDashboard({ onNavigate }) {
    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="ct-page-header">
                <div>
                    <h1 className="ct-page-title">
                        <HardHat className="icon-glow" style={{ color: '#FF6B00' }} size={28} />
                        Construction Command Center
                    </h1>
                    <p className="ct-page-subtitle">AI-powered construction intelligence at your fingertips</p>
                </div>
                <div className="ct-badge ct-badge-green ct-badge-live">
                    All Systems Online
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="ct-stat-card"
                        style={{ '--accent-color': stat.color }}
                    >
                        <div className="ct-stat-label">{stat.label}</div>
                        <div className="ct-stat-value" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="ct-stat-change" style={{ color: stat.color }}>
                            <TrendingUp size={11} />
                            {stat.change}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Module Quick Access */}
            <div>
                <h3 className="ct-section-header">
                    <Sparkles size={15} className="ct-section-icon" />
                    Quick Launch
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {modules.map((mod, idx) => (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.04 }}
                            onClick={() => onNavigate?.(mod.id)}
                            className="ct-module-card group"
                            style={{ '--module-color': mod.color }}
                        >
                            <div className="ct-icon-box" style={{
                                background: `${mod.color}10`,
                                border: `1px solid ${mod.color}20`,
                                marginBottom: 12,
                            }}>
                                <mod.icon size={18} style={{ color: mod.color, transition: 'transform 0.3s' }} />
                            </div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', marginBottom: 4 }}>{mod.label}</div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{mod.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header">
                    <Activity size={15} className="ct-section-icon" />
                    Recent Activity
                </h3>
                <div className="space-y-1">
                    {recentActivity.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="ct-activity-item"
                        >
                            <div className="ct-activity-dot" style={{ backgroundColor: item.color, color: item.color }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{item.text}</p>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{item.time}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
