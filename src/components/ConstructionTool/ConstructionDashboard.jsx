import React from 'react';
import { motion } from 'motion/react';
import {
    HardHat, FileSearch, Calculator, BrainCircuit, Boxes, Wrench,
    TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, ArrowRight,
    DollarSign, UserSearch, ShieldCheck, CalendarClock, MessageCircleHeart, Siren, MapPinCheck
} from 'lucide-react';

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
    { type: 'success', text: 'Blueprint analysis completed — Warehouse B (Phase 2)', time: '5m ago' },
    { type: 'warning', text: 'Equipment alert: Crane #04 bearing vibration anomaly detected', time: '12m ago' },
    { type: 'info', text: 'AI Planner updated schedule for Commercial Tower – saved 6 days', time: '1h ago' },
    { type: 'success', text: 'Takeoff report exported for Riverside Apartments (42 items)', time: '2h ago' },
    { type: 'info', text: 'Generative Design produced 8 new layout variants for Office Complex', time: '3h ago' },
];

export function ConstructionDashboard({ onNavigate }) {
    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <HardHat className="text-[#FF6B00]" size={28} />
                        Construction Command Center
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">AI-powered construction intelligence at your fingertips</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
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
                        className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all group"
                    >
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">{stat.label}</div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="flex items-center gap-1 text-xs" style={{ color: stat.color }}>
                            <TrendingUp size={12} />
                            {stat.change}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Module Quick Access */}
            <div>
                <h3 className="text-white font-semibold mb-4">Quick Launch</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {modules.map((mod, idx) => (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.06 }}
                            onClick={() => onNavigate?.(mod.id)}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/[0.08] hover:-translate-y-1 transition-all group"
                        >
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                                style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}
                            >
                                <mod.icon size={20} style={{ color: mod.color }} />
                            </div>
                            <div className="text-white font-medium text-sm mb-1">{mod.label}</div>
                            <div className="text-slate-500 text-xs">{mod.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {recentActivity.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            {item.type === 'success' && <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />}
                            {item.type === 'warning' && <AlertTriangle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />}
                            {item.type === 'info' && <Clock size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-300 leading-snug">{item.text}</p>
                            </div>
                            <span className="text-xs text-slate-600 flex-shrink-0">{item.time}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
