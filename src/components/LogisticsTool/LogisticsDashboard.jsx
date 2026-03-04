import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
    Globe, MessageSquare, Search, TrendingUp, Package,
    Beaker, BarChart3, Shield, ShieldAlert, Leaf, FileText,
    DollarSign, ArrowRight, Sparkles, Zap, Activity,
    RefreshCw, Ship, Plane, Truck, AlertTriangle
} from 'lucide-react';
import { LogisticsDataStore } from '../../services/LogisticsDataStore';
import '../../styles/LogisticsTool.css';

const modules = [
    { id: 'map', label: 'Live Tracking', icon: Globe, desc: 'Real-time vessel & cargo tracking', color: '#0EA5E9' },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare, desc: 'Natural language supply chain queries', color: '#8b5cf6' },
    { id: 'classifier', label: 'HS Classifier', icon: Search, desc: 'AI-powered tariff code classification', color: '#f59e0b' },
    { id: 'market', label: 'Market Intel', icon: TrendingUp, desc: 'Real-time trade & rate intelligence', color: '#22c55e' },
    { id: 'shipments', label: 'Shipments', icon: Package, desc: 'End-to-end shipment management', color: '#3b82f6' },
    { id: 'rates', label: 'Rate Check', icon: DollarSign, desc: 'Multi-carrier rate comparison', color: '#ec4899' },
    { id: 'simulation', label: 'Digital Twin', icon: Beaker, desc: 'Supply chain simulation engine', color: '#06b6d4' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Advanced freight analytics & KPIs', color: '#10b981' },
    { id: 'compliance', label: 'Compliance', icon: Shield, desc: 'Regulatory compliance automation', color: '#f97316' },
    { id: 'risk', label: 'Risk Monitor', icon: ShieldAlert, desc: 'Predictive risk & disruption alerts', color: '#ef4444' },
    { id: 'carbon', label: 'Sustainability', icon: Leaf, desc: 'Carbon footprint & green logistics', color: '#84cc16' },
    { id: 'docs', label: 'Documents', icon: FileText, desc: 'AI document processing & validation', color: '#a855f7' },
    { id: 'profitability', label: 'Profitability', icon: DollarSign, desc: 'Revenue optimization & margin analysis', color: '#0d9488' },
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

export function LogisticsDashboard({ onNavigate }) {
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        LogisticsDataStore.seed();
        refreshData();
    }, []);

    const refreshData = () => {
        setRefreshing(true);
        setTimeout(() => {
            setStats(LogisticsDataStore.getDashboardStats());
            setActivity(LogisticsDataStore.getActivity(8));
            setRefreshing(false);
        }, 300);
    };

    if (!stats) return null;

    const statCards = [
        { label: 'Active Shipments', value: stats.activeShipments, icon: Ship, change: `${stats.totalShipments} total`, positive: true, color: '#0EA5E9' },
        { label: 'On-Time Rate', value: `${stats.onTimeRate}%`, icon: Zap, change: '+2.1% vs last month', positive: true, color: '#22c55e' },
        { label: 'Compliance Score', value: `${stats.complianceScore}%`, icon: Shield, change: 'All certifications active', positive: true, color: '#3b82f6' },
        { label: 'Savings YTD', value: stats.savingsYTD, icon: Sparkles, change: '+18% vs target', positive: true, color: '#a855f7' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header */}
            <div className="lt-page-header">
                <div>
                    <div className="lt-page-title">
                        <Activity size={22} className="icon-glow" style={{ color: '#0EA5E9' }} />
                        Logistics Command Center
                    </div>
                    <div className="lt-page-subtitle">
                        Real-time overview of your global supply chain operations
                    </div>
                </div>
                <button onClick={refreshData} className="lt-action-btn" style={{ gap: 6 }}>
                    <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Stat Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                {statCards.map((s, i) => (
                    <motion.div
                        key={i}
                        className="lt-stat-card"
                        style={{ '--accent-color': s.color }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div className="lt-stat-label">{s.label}</div>
                                <div className="lt-stat-value">{s.value}</div>
                                <div className="lt-stat-change" style={{ color: s.positive ? '#22c55e' : '#ef4444' }}>
                                    {s.change}
                                </div>
                            </div>
                            <div className="lt-icon-box" style={{
                                background: `${s.color}12`,
                                borderColor: `${s.color}25`,
                            }}>
                                <s.icon size={18} style={{ color: s.color }} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Risk Alerts Banner */}
            {stats.activeAlerts > 0 && (
                <motion.div
                    className="lt-alert lt-alert-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                    onClick={() => onNavigate('risk')}
                >
                    <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a1a1a' }}>
                            {stats.activeAlerts} Active Risk Alert{stats.activeAlerts > 1 ? 's' : ''}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                            Click to view disruption details and mitigation recommendations
                        </div>
                    </div>
                    <ArrowRight size={16} style={{ color: '#f59e0b' }} />
                </motion.div>
            )}

            {/* Two column: Modules + Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
                {/* Module Grid */}
                <div>
                    <div className="lt-section-header">
                        <Zap size={16} className="lt-section-icon" />
                        Quick Launch
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                        {modules.map((mod, i) => (
                            <motion.div
                                key={mod.id}
                                className="lt-module-card"
                                style={{ '--module-color': mod.color }}
                                onClick={() => onNavigate(mod.id)}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.04 }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                    <div style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: `${mod.color}12`,
                                        border: `1px solid ${mod.color}25`,
                                    }}>
                                        <mod.icon size={16} style={{ color: mod.color }} />
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#1a1a1a' }}>
                                        {mod.label}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280', lineHeight: 1.4 }}>
                                    {mod.desc}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="lt-card" style={{ padding: 20 }}>
                    <div className="lt-section-header" style={{ marginBottom: 12 }}>
                        <Activity size={16} className="lt-section-icon" />
                        Recent Activity
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {activity.map((item, i) => (
                            <div key={item.id || i} className="lt-activity-item">
                                <div className="lt-activity-dot" style={{ color: item.color, background: item.color }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#1a1a1a' }}>
                                        <span style={{ fontWeight: 600, color: item.color }}>{item.verb}</span>{' '}
                                        {item.label}: {item.name}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: 2 }}>
                                        {timeAgo(item.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {activity.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '24px 0', color: '#9ca3af', fontSize: '0.8rem' }}>
                                No recent activity
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
