import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
    HardHat, FileSearch, Calculator, BrainCircuit, Boxes, Wrench,
    TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, ArrowRight,
    DollarSign, UserSearch, ShieldCheck, CalendarClock, MessageCircleHeart, Siren, MapPinCheck,
    Sparkles, Zap, Activity, RefreshCw
} from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

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

function timeAgo(iso) {
    if (!iso) return '';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export function ConstructionDashboard({ onNavigate }) {
    const [dashData, setDashData] = useState(null);

    useEffect(() => {
        // Seed on first visit
        if (!DataStore.isSeeded()) DataStore.seed();
        refreshData();
    }, []);

    const refreshData = () => {
        const stats = DataStore.getDashboardStats();
        const activity = DataStore.getActivity(8);
        const cf = DataStore.getCashFlowSummary();
        setDashData({ stats, activity, cf });
    };

    if (!dashData) return null;
    const { stats, activity, cf } = dashData;

    const statCards = [
        { label: 'Active Projects', value: String(stats.activeProjects), change: `$${(stats.totalBudget / 1000000).toFixed(1)}M portfolio`, trend: 'up', color: '#FF6B00' },
        { label: 'Tasks', value: `${stats.completedTasks}/${stats.totalTasks}`, change: stats.totalTasks > 0 ? `${Math.round(stats.completedTasks / stats.totalTasks * 100)}% complete` : 'No tasks yet', trend: 'up', color: '#22c55e' },
        { label: 'Takeoff Items', value: String(stats.takeoffItemCount), change: 'Across all projects', trend: 'up', color: '#3b82f6' },
        { label: 'Equip. Health', value: stats.avgEquipmentHealth > 0 ? `${stats.avgEquipmentHealth}%` : 'N/A', change: 'Average fleet health', trend: stats.avgEquipmentHealth >= 85 ? 'up' : 'down', color: stats.avgEquipmentHealth >= 85 ? '#22c55e' : '#f59e0b' },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="ct-page-header">
                <div>
                    <h1 className="ct-page-title">
                        <HardHat className="icon-glow" style={{ color: '#FF6B00' }} size={28} />
                        Construction Command Center
                    </h1>
                    <p className="ct-page-subtitle">AI-powered construction intelligence — live data</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={refreshData} className="ct-badge" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <RefreshCw size={12} /> Refresh
                    </button>
                    <div className="ct-badge ct-badge-green ct-badge-live">
                        All Systems Online
                    </div>
                </div>
            </div>

            {/* Cash Flow Banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ct-card"
                style={{ padding: '16px 20px', cursor: 'pointer' }}
                onClick={() => onNavigate?.('cashflow')}
            >
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                        <div className="ct-icon-box" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                            <DollarSign size={16} style={{ color: '#22c55e' }} />
                        </div>
                        <div>
                            <div className="text-xs font-medium" style={{ color: '#6b7280' }}>Cash Balance</div>
                            <div className="text-lg font-black" style={{ color: cf.cashBalance >= 0 ? '#22c55e' : '#ef4444' }}>
                                ${Math.abs(cf.cashBalance).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs">
                        <div><span style={{ color: '#6b7280' }}>AR Outstanding: </span><span className="font-bold" style={{ color: '#f59e0b' }}>${cf.outstandingAR.toLocaleString()}</span></div>
                        <div><span style={{ color: '#6b7280' }}>AP Due: </span><span className="font-bold" style={{ color: '#ef4444' }}>${cf.outstandingAP.toLocaleString()}</span></div>
                        <div><span style={{ color: '#6b7280' }}>Health: </span><span className="font-bold" style={{ color: cf.healthScore >= 70 ? '#22c55e' : '#f59e0b' }}>{cf.healthScore}/100</span></div>
                    </div>
                    <ArrowRight size={16} style={{ color: '#9ca3af' }} />
                </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, idx) => (
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
                            {stat.trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
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
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{mod.label}</div>
                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{mod.desc}</div>
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
                    {activity.length === 0 && (
                        <p style={{ fontSize: '0.8rem', color: '#9ca3af', padding: '1rem 0' }}>No activity yet. Use the tools to start generating data.</p>
                    )}
                    {activity.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="ct-activity-item"
                        >
                            <div className="ct-activity-dot" style={{ backgroundColor: item.color, color: item.color }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.5 }}>{item.label}</p>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: '#9ca3af', flexShrink: 0 }}>{timeAgo(item.time)}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
