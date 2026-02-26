import React from 'react';
import { motion } from 'motion/react';
import {
    Siren, MapPin, Lock, Unlock, AlertTriangle, CheckCircle,
    Zap, Clock, Car, Shield, Eye, ArrowRight, Radio
} from 'lucide-react';
import { getTheftSentinelData } from './constructionServices';
import '../../styles/ConstructionTool.css';

export function TheftSentinel() {
    const data = getTheftSentinelData();
    const statusCfg = {
        'on-site': { color: '#22c55e', badge: 'ct-badge-green', label: 'ON SITE' },
        'in-transit': { color: '#3b82f6', badge: 'ct-badge-blue', label: 'IN TRANSIT' },
        'yard': { color: '#a855f7', badge: 'ct-badge-purple', label: 'AT YARD' },
        'parked': { color: '#f59e0b', badge: 'ct-badge-amber', label: 'PARKED' },
    };

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title"><Siren className="icon-glow" style={{ color: '#FF6B00' }} size={24} />Theft Sentinel™</h2>
                    <p className="ct-page-subtitle">AI predictive theft & unauthorized use detection</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="ct-badge ct-badge-green ct-badge-live"><Shield size={10} /> All Perimeters Secure</div>
                    <div className="ct-badge ct-badge-orange"><Zap size={10} /> {data.stats.anomaliesToday} Anomalies</div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                {[
                    { l: 'Total Vehicles', v: data.stats.totalVehicles, c: 'white' },
                    { l: 'Active Today', v: data.stats.activeToday, c: '#22c55e' },
                    { l: 'Anomalies', v: data.stats.anomaliesToday, c: '#f59e0b' },
                    { l: 'Thefts Prevented', v: data.stats.theftsPrevented, c: '#FF6B00' },
                    { l: 'Avg Risk', v: data.stats.avgRiskScore, c: '#3b82f6' },
                    { l: 'Cost Saved', v: data.stats.costSaved, c: '#22c55e' },
                ].map((s, i) => (
                    <motion.div key={i} className="ct-kpi" style={{ '--kpi-color': s.c }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <div className="ct-kpi-label">{s.l}</div>
                        <div className="ct-kpi-value" style={{ color: s.c }}>{s.v}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                    <div className="ct-card" style={{ padding: 24 }}>
                        <h3 className="ct-section-header"><Car size={15} className="ct-section-icon" />Fleet Status Monitor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {data.vehicles.map((v, i) => {
                                const sc = statusCfg[v.status] || statusCfg.parked;
                                const hi = v.riskScore > 30;
                                return (
                                    <motion.div key={v.id} className="ct-card" style={{ padding: 16, borderColor: hi ? 'rgba(239,68,68,0.2)' : undefined, boxShadow: hi ? '0 0 15px rgba(239,68,68,0.08)' : undefined }}
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                            <div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{v.name}</div>
                                                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{v.type} · {v.driver}</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {v.engineLock ? <Lock size={13} style={{ color: '#22c55e' }} /> : <Unlock size={13} style={{ color: 'rgba(255,255,255,0.2)' }} />}
                                                <span className={`ct-badge ${sc.badge}`} style={{ fontSize: '0.5rem', padding: '2px 6px' }}>{sc.label}</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={9} />{v.location}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}><Clock size={8} /> {v.lastPing}</span>
                                                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 800, color: v.riskScore > 30 ? '#ef4444' : v.riskScore > 15 ? '#f59e0b' : '#22c55e' }}>R:{v.riskScore}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="ct-card" style={{ padding: 20 }}>
                        <h3 className="ct-section-header"><AlertTriangle size={14} className="ct-section-icon" />Anomaly Feed</h3>
                        <div className="space-y-2">
                            {data.anomalies.map((a, i) => (
                                <motion.div key={a.id} className={`ct-alert ct-alert-${a.severity}`} style={{ padding: 12 }}
                                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>{a.vehicle}</span>
                                        <span className={`ct-badge ct-badge-${a.severity === 'high' ? 'red' : a.severity === 'medium' ? 'amber' : 'blue'}`} style={{ fontSize: '0.45rem', padding: '1px 5px' }}>{a.severity}</span>
                                    </div>
                                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{a.message}</p>
                                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginTop: 4 }}>{a.time} · {a.type}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="ct-card" style={{ padding: 20 }}>
                        <h3 className="ct-section-header"><Radio size={14} className="ct-section-icon" />Geofence Zones</h3>
                        <div className="space-y-2">
                            {data.geofences.map((gf, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'white' }}>{gf.name}</div>
                                        <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>{gf.vehicleCount} vehicles · {gf.type}</div>
                                    </div>
                                    <span className={`ct-badge ${gf.status === 'secure' ? 'ct-badge-green' : ''}`} style={{ fontSize: '0.5rem', padding: '2px 6px', ...(gf.status !== 'secure' ? { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' } : {}) }}>{gf.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Lock All Idle Vehicles', 'Generate Theft Report', 'Configure Geofence Alerts'].map((a, i) => (
                    <button key={i} className="ct-action-btn" style={{ height: 48, justifyContent: 'center' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                        {a}
                        <ArrowRight size={12} style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }} />
                    </button>
                ))}
            </div>
        </div>
    );
}
