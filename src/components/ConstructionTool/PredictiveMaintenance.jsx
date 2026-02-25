import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Wrench, AlertTriangle, CheckCircle, Activity, Thermometer,
    Gauge, Clock, Calendar, TrendingUp, TrendingDown, Zap,
    BarChart3, Settings, Eye, Bell
} from 'lucide-react';

const equipment = [
    {
        name: 'Tower Crane #01', status: 'healthy', health: 96, nextMaint: '12 days',
        sensors: [
            { label: 'Motor Temp', value: '72°C', max: '95°C', pct: 76, status: 'ok' },
            { label: 'Bearing Vibration', value: '2.1 mm/s', max: '4.5 mm/s', pct: 47, status: 'ok' },
            { label: 'Hydraulic Press.', value: '218 bar', max: '250 bar', pct: 87, status: 'warn' },
            { label: 'Load Cycles', value: '14,287', max: '25,000', pct: 57, status: 'ok' },
        ]
    },
    {
        name: 'Excavator #03', status: 'warning', health: 71, nextMaint: '3 days',
        sensors: [
            { label: 'Engine Temp', value: '98°C', max: '110°C', pct: 89, status: 'warn' },
            { label: 'Fuel Efficiency', value: '82%', max: '100%', pct: 82, status: 'ok' },
            { label: 'Track Tension', value: '78%', max: '100%', pct: 78, status: 'warn' },
            { label: 'Operating Hours', value: '4,821', max: '6,000', pct: 80, status: 'ok' },
        ]
    },
    {
        name: 'Concrete Pump #02', status: 'healthy', health: 89, nextMaint: '8 days',
        sensors: [
            { label: 'Pump Pressure', value: '165 bar', max: '200 bar', pct: 82, status: 'ok' },
            { label: 'Pipeline Wear', value: '23%', max: '100%', pct: 23, status: 'ok' },
            { label: 'Motor Speed', value: '1,420 RPM', max: '1,800 RPM', pct: 79, status: 'ok' },
            { label: 'Concrete Output', value: '45 m³/h', max: '60 m³/h', pct: 75, status: 'ok' },
        ]
    },
];

const predictions = [
    { equipment: 'Crane #01 — Brake Assembly', prob: '18%', timeframe: '45-60 days', severity: 'low', cost: '$3,200' },
    { equipment: 'Excavator #03 — Turbo Charger', prob: '67%', timeframe: '5-12 days', severity: 'high', cost: '$8,500' },
    { equipment: 'Pump #02 — Delivery Pipe', prob: '34%', timeframe: '20-30 days', severity: 'medium', cost: '$1,800' },
    { equipment: 'Generator #01 — Alternator', prob: '12%', timeframe: '90+ days', severity: 'low', cost: '$4,200' },
];

const maintenanceSchedule = [
    { date: 'Feb 28', task: 'Excavator #03 — Oil & Filter Change', priority: 'high', status: 'scheduled' },
    { date: 'Mar 05', task: 'Crane #01 — Rope Inspection', priority: 'medium', status: 'scheduled' },
    { date: 'Mar 08', task: 'Pump #02 — Valve Replacement', priority: 'medium', status: 'pending' },
    { date: 'Mar 15', task: 'Generator #01 — Full Service', priority: 'low', status: 'pending' },
];

export function PredictiveMaintenance() {
    const [selectedEquipment, setSelectedEquipment] = useState(0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Wrench className="text-[#ef4444]" size={24} />
                        Predictive Maintenance
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">IoT-powered equipment health monitoring & failure prediction</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1.5">
                        <Activity size={12} />
                        {equipment.filter(e => e.status === 'healthy').length}/{equipment.length} Healthy
                    </div>
                </div>
            </div>

            {/* Equipment Cards */}
            <div className="grid lg:grid-cols-3 gap-4">
                {equipment.map((eq, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        onClick={() => setSelectedEquipment(idx)}
                        className={`bg-white/5 border rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 ${selectedEquipment === idx ? 'border-[#FF6B00]/40 bg-white/[0.07]' : 'border-white/10'}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-semibold text-sm">{eq.name}</h3>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${eq.status === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {eq.status.toUpperCase()}
                            </div>
                        </div>

                        {/* Health Gauge */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-16 h-16">
                                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                    <path d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                                    <path d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31" fill="none"
                                        stroke={eq.health > 85 ? '#22c55e' : eq.health > 60 ? '#f59e0b' : '#ef4444'}
                                        strokeWidth="3" strokeDasharray={`${eq.health} ${100 - eq.health}`} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{eq.health}%</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500">Next Maintenance</div>
                                <div className="text-sm font-medium text-white flex items-center gap-1">
                                    <Clock size={12} className="text-[#FF6B00]" />
                                    {eq.nextMaint}
                                </div>
                            </div>
                        </div>

                        {/* Sensor Bars */}
                        <div className="space-y-2">
                            {eq.sensors.map((sensor, sIdx) => (
                                <div key={sIdx}>
                                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                                        <span className="text-slate-500">{sensor.label}</span>
                                        <span className="text-slate-400 font-mono">{sensor.value}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                width: `${sensor.pct}%`,
                                                background: sensor.status === 'warn' ? '#f59e0b' : '#22c55e'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Failure Predictions */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-400" />
                        Failure Predictions
                    </h3>
                    <div className="space-y-3">
                        {predictions.map((pred, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.06 }}
                                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-white font-medium">{pred.equipment}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pred.severity === 'high' ? 'bg-red-500/20 text-red-400' : pred.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {pred.prob} risk
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><Clock size={10} />{pred.timeframe}</span>
                                    <span className="flex items-center gap-1 text-[#FF6B00]">Cost: {pred.cost}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Maintenance Schedule */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Calendar size={16} className="text-[#FF6B00]" />
                        Upcoming Maintenance
                    </h3>
                    <div className="space-y-3">
                        {maintenanceSchedule.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.06 }}
                                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <div className="text-center flex-shrink-0 w-14">
                                    <div className="text-xs text-slate-500">{item.date.split(' ')[0]}</div>
                                    <div className="text-lg font-bold text-white">{item.date.split(' ')[1]}</div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-white truncate">{item.task}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.priority === 'high' ? 'bg-red-500/20 text-red-400' : item.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {item.priority}
                                        </span>
                                        <span className="text-[10px] text-slate-500 capitalize">{item.status}</span>
                                    </div>
                                </div>
                                <Bell size={14} className="text-slate-600 flex-shrink-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
