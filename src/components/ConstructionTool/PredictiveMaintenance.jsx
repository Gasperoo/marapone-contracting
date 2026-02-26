import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Wrench, AlertTriangle, CheckCircle, Activity, Thermometer,
    Gauge, Clock, Calendar, TrendingUp, TrendingDown, Zap,
    BarChart3, Settings, Eye, Bell
} from 'lucide-react';
import '../../styles/ConstructionTool.css';

const equipment = [
    {
        name: 'Tower Crane #01', status: 'healthy', health: 96, nextMaint: '12 days',
        sensors: [
            { label: 'Motor Temp', value: '72°C', max: '95°C', pct: 76, status: 'ok' },
            { label: 'Load Cell', value: '4.2 ton', max: '8.0 ton', pct: 52, status: 'ok' },
            { label: 'Cable Wear', value: '12%', max: '100%', pct: 12, status: 'ok' },
            { label: 'Brake Pad', value: '68%', max: '100%', pct: 68, status: 'ok' },
        ]
    },
    {
        name: 'Excavator #03', status: 'warning', health: 72, nextMaint: '3 days',
        sensors: [
            { label: 'Hydraulic Pressure', value: '285 bar', max: '350 bar', pct: 81, status: 'warn' },
            { label: 'Engine Temp', value: '92°C', max: '105°C', pct: 87, status: 'warn' },
            { label: 'Track Tension', value: '78%', max: '100%', pct: 78, status: 'warn' },
            { label: 'Operating Hours', value: '4,821', max: '6,000', pct: 80, status: 'ok' },
        ]
    },
    {
        name: 'Concrete Pump #02', status: 'healthy', health: 89, nextMaint: '8 days',
        sensors: [
            { label: 'Pump Pressure', value: '165 bar', max: '200 bar', pct: 82, status: 'ok' },
            { label: 'Pipeline Wear', value: '22%', max: '100%', pct: 22, status: 'ok' },
            { label: 'Motor Speed', value: '1,420 RPM', max: '1,800 RPM', pct: 79, status: 'ok' },
            { label: 'Concrete Output', value: '45 m³/h', max: '60 m³/h', pct: 75, status: 'ok' },
        ]
    },
];

const predictions = [
    { equipment: 'Crane #01 — Brake Assembly', prob: '18%', timeframe: '45-60 days', severity: 'low', cost: '$3,200' },
    { equipment: 'Excavator #03 — Hydraulic Seals', prob: '67%', timeframe: '7-14 days', severity: 'high', cost: '$8,500' },
    { equipment: 'Pump #02 — Pipeline Section B', prob: '34%', timeframe: '20-30 days', severity: 'medium', cost: '$4,100' },
];

const schedule = [
    { date: 'Feb 28', task: 'Excavator #03 — Hydraulic Service', priority: 'high', status: 'confirmed' },
    { date: 'Mar 03', task: 'Crane #01 — Quarterly Inspection', priority: 'medium', status: 'scheduled' },
    { date: 'Mar 08', task: 'Pump #02 — Valve Replacement', priority: 'medium', status: 'pending' },
    { date: 'Mar 15', task: 'Generator #01 — Full Service', priority: 'low', status: 'pending' },
];

export function PredictiveMaintenance() {
    const [selectedEquipment, setSelectedEquipment] = useState(0);

    const statusConfig = {
        healthy: { color: '#22c55e', label: 'HEALTHY' },
        warning: { color: '#f59e0b', label: 'WARNING' },
        critical: { color: '#ef4444', label: 'CRITICAL' },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <Wrench className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Predictive Maintenance
                    </h2>
                    <p className="ct-page-subtitle">AI-powered equipment health monitoring & failure prediction</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="ct-badge ct-badge-green ct-badge-live">
                        {equipment.filter(e => e.status === 'healthy').length}/{equipment.length} Healthy
                    </div>
                    <div className="ct-badge ct-badge-amber">
                        <AlertTriangle size={10} /> 1 Warning
                    </div>
                </div>
            </div>

            {/* Equipment Cards */}
            <div className="grid lg:grid-cols-3 gap-4">
                {equipment.map((eq, idx) => {
                    const sc = statusConfig[eq.status];
                    const isSelected = selectedEquipment === idx;
                    return (
                        <motion.div
                            key={idx}
                            className="ct-card"
                            style={{
                                padding: 20, cursor: 'pointer',
                                borderColor: isSelected ? `${sc.color}30` : undefined,
                                boxShadow: isSelected ? `0 0 20px ${sc.color}15` : undefined,
                            }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            onClick={() => setSelectedEquipment(idx)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{eq.name}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                                        Next maintenance: {eq.nextMaint}
                                    </div>
                                </div>

                                {/* Health Ring */}
                                <div className="ct-ring-gauge" style={{ width: 52, height: 52 }}>
                                    <svg width="52" height="52" viewBox="0 0 52 52">
                                        <circle className="track" cx="26" cy="26" r="21" strokeWidth="4" />
                                        <circle className="fill" cx="26" cy="26" r="21"
                                            stroke={sc.color} strokeWidth="4"
                                            strokeDasharray="132"
                                            strokeDashoffset={132 - (132 * eq.health) / 100}
                                        />
                                    </svg>
                                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                                        <span className="ct-ring-value" style={{ fontSize: '0.8rem', color: sc.color }}>{eq.health}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sensor Bars */}
                            <div className="space-y-3">
                                {eq.sensors.map((s, si) => (
                                    <div key={si}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: s.status === 'warn' ? '#f59e0b' : 'rgba(255,255,255,0.7)' }}>
                                                {s.value}
                                            </span>
                                        </div>
                                        <div className="ct-progress">
                                            <motion.div
                                                className={`ct-progress-fill ${s.status === 'warn' ? 'amber' : s.pct > 80 ? 'amber' : 'green'}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${s.pct}%` }}
                                                transition={{ delay: 0.3 + si * 0.1, duration: 0.6 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Status badge */}
                            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
                                <span className={`ct-badge ct-badge-${eq.status === 'healthy' ? 'green' : 'amber'}`}>
                                    {sc.label}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Failure Predictions */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <Activity size={15} className="ct-section-icon" />
                        Failure Predictions
                    </h3>
                    <div className="space-y-3">
                        {predictions.map((pred, idx) => (
                            <motion.div
                                key={idx}
                                className={`ct-alert ct-alert-${pred.severity}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.08 }}
                            >
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', marginBottom: 6 }}>{pred.equipment}</div>
                                <div style={{ display: 'flex', gap: 16, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                                    <span>Probability: <strong style={{ color: pred.severity === 'high' ? '#ef4444' : pred.severity === 'medium' ? '#f59e0b' : '#22c55e' }}>{pred.prob}</strong></span>
                                    <span>Window: <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{pred.timeframe}</strong></span>
                                    <span>Est. Cost: <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{pred.cost}</strong></span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Maintenance Schedule */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <Calendar size={15} className="ct-section-icon" />
                        Upcoming Maintenance
                    </h3>
                    <div className="space-y-2">
                        {schedule.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.06 }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12, padding: 12,
                                    borderRadius: 10, background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.04)',
                                    transition: 'background 0.2s',
                                }}
                            >
                                <div style={{
                                    width: 44, flexShrink: 0, textAlign: 'center', padding: '4px 0',
                                    borderRadius: 8,
                                    background: item.priority === 'high' ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${item.priority === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)'}`,
                                }}>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: item.priority === 'high' ? '#ef4444' : 'rgba(255,255,255,0.5)' }}>{item.date}</div>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{item.task}</div>
                                </div>
                                <span className={`ct-badge ct-badge-${item.status === 'confirmed' ? 'green' : item.status === 'scheduled' ? 'blue' : 'amber'}`}
                                    style={{ fontSize: '0.55rem' }}>
                                    {item.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
