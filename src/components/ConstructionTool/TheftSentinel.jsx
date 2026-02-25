import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Siren, MapPin, Lock, Unlock, AlertTriangle, CheckCircle,
    Zap, Clock, Car, Shield, Eye, ArrowRight, Radio
} from 'lucide-react';
import { getTheftSentinelData } from './constructionServices';

export function TheftSentinel() {
    const data = getTheftSentinelData();

    const statusColors = {
        'on-site': { bg: 'bg-green-500/10', text: 'text-green-400', label: 'ON SITE' },
        'in-transit': { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'IN TRANSIT' },
        'yard': { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'AT YARD' },
        'parked': { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'PARKED' },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Siren className="text-[#FF6B00]" size={24} />
                        Theft Sentinel™
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">AI predictive theft & unauthorized use detection</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1.5">
                        <Shield size={12} />
                        All Perimeters Secure
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5">
                        <Zap size={12} />
                        {data.stats.anomaliesToday} Anomalies Today
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                {[
                    { label: 'Total Vehicles', value: data.stats.totalVehicles, color: 'text-white' },
                    { label: 'Active Today', value: data.stats.activeToday, color: 'text-green-400' },
                    { label: 'Anomalies', value: data.stats.anomaliesToday, color: 'text-amber-400' },
                    { label: 'Thefts Prevented', value: data.stats.theftsPrevented, color: 'text-[#FF6B00]' },
                    { label: 'Avg Risk Score', value: data.stats.avgRiskScore, color: 'text-blue-400' },
                    { label: 'Cost Saved', value: data.stats.costSaved, color: 'text-green-400' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                    >
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Vehicle Fleet Grid */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Car size={16} className="text-[#FF6B00]" />
                            Fleet Status Monitor
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {data.vehicles.map((vehicle, idx) => {
                                const sc = statusColors[vehicle.status] || statusColors.parked;
                                const isHighRisk = vehicle.riskScore > 30;
                                return (
                                    <motion.div
                                        key={vehicle.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className={`p-4 rounded-xl border transition-all hover:bg-white/[0.03] ${isHighRisk ? 'border-red-500/30 bg-red-500/5' : 'border-white/10 bg-white/[0.02]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <div className="text-sm text-white font-semibold">{vehicle.name}</div>
                                                <div className="text-[10px] text-slate-500">{vehicle.type} · {vehicle.driver}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {vehicle.engineLock ? (
                                                    <Lock size={14} className="text-green-400" title="Engine Locked" />
                                                ) : (
                                                    <Unlock size={14} className="text-white/30" title="Engine Unlocked" />
                                                )}
                                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>
                                                    {sc.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <MapPin size={10} />
                                                {vehicle.location}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-slate-500">
                                                    <Clock size={8} className="inline mr-0.5" />{vehicle.lastPing}
                                                </span>
                                                <span className={`text-xs font-mono font-bold ${vehicle.riskScore > 30 ? 'text-red-400' :
                                                        vehicle.riskScore > 15 ? 'text-amber-400' : 'text-green-400'
                                                    }`}>
                                                    R:{vehicle.riskScore}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Anomaly Feed */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <AlertTriangle className="text-amber-400 w-4 h-4" />
                            Anomaly Detection Feed
                        </h3>
                        <div className="space-y-2">
                            {data.anomalies.map((anomaly, idx) => (
                                <motion.div
                                    key={anomaly.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.06 }}
                                    className={`p-3 rounded-lg border ${anomaly.severity === 'high' ? 'border-red-500/20 bg-red-500/5' :
                                            anomaly.severity === 'medium' ? 'border-amber-500/20 bg-amber-500/5' :
                                                'border-blue-500/20 bg-blue-500/5'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-white font-bold">{anomaly.vehicle}</span>
                                        <div className="flex items-center gap-1.5">
                                            {anomaly.resolved && <CheckCircle size={10} className="text-green-400" />}
                                            <span className={`text-[9px] font-bold uppercase ${anomaly.severity === 'high' ? 'text-red-400' :
                                                    anomaly.severity === 'medium' ? 'text-amber-400' : 'text-blue-400'
                                                }`}>{anomaly.severity}</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-snug">{anomaly.message}</p>
                                    <div className="text-[9px] text-slate-600 mt-1 font-mono">{anomaly.time} · {anomaly.type}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Geofence Status */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <Radio className="text-[#FF6B00] w-4 h-4" />
                            Geofence Zones
                        </h3>
                        <div className="space-y-2">
                            {data.geofences.map((gf, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors">
                                    <div>
                                        <div className="text-xs text-white font-medium">{gf.name}</div>
                                        <div className="text-[10px] text-slate-500">{gf.vehicleCount} vehicles · {gf.type}</div>
                                    </div>
                                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${gf.status === 'secure' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                                        }`}>{gf.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Lock All Idle Vehicles', 'Generate Theft Report', 'Configure Geofence Alerts'].map((action, i) => (
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
