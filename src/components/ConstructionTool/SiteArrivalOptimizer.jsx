import React from 'react';
import { motion } from 'motion/react';
import {
    MapPinCheck, Car, Clock, Fuel, ArrowRight,
    Zap, TrendingUp, RefreshCw, FileText, BarChart3
} from 'lucide-react';
import { getSiteUtilizationData } from './constructionServices';
import '../../styles/ConstructionTool.css';

export function SiteArrivalOptimizer() {
    const data = getSiteUtilizationData();

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title"><MapPinCheck className="icon-glow" style={{ color: '#FF6B00' }} size={24} />Site Arrival Optimizer™</h2>
                    <p className="ct-page-subtitle">Fleet productivity & utilization intelligence</p>
                </div>
                <div className="ct-badge ct-badge-orange ct-badge-live">
                    {data.dailyReport.productivityRecovered} Productivity Recovered
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                    { l: 'Billable Hours', v: data.dailyReport.totalBillableHours + 'h', c: '#22c55e' },
                    { l: 'Total Idle', v: data.dailyReport.totalIdleTime, c: '#f59e0b' },
                    { l: 'Avg Utilization', v: data.dailyReport.avgUtilization, c: '#FF6B00' },
                    { l: 'Fuel Wasted', v: data.dailyReport.fuelWasted, c: '#ef4444' },
                    { l: 'Date', v: data.dailyReport.date, c: 'white' },
                ].map((k, i) => (
                    <motion.div key={i} className="ct-kpi" style={{ '--kpi-color': k.c }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <div className="ct-kpi-label">{k.l}</div>
                        <div className="ct-kpi-value" style={{ color: k.c }}>{k.v}</div>
                    </motion.div>
                ))}
            </div>

            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header"><BarChart3 size={15} className="ct-section-icon" />Vehicle Utilization</h3>
                <div className="space-y-2">
                    {data.vehicles.map((v, i) => (
                        <motion.div key={v.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ width: 130, flexShrink: 0 }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }}>{v.name}</div>
                                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 3 }}><MapPinCheck size={8} />{v.site}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>Utilization</span>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: v.utilization >= 80 ? '#22c55e' : v.utilization >= 40 ? '#f59e0b' : '#ef4444' }}>{v.utilization}%</span>
                                </div>
                                <div className="ct-progress">
                                    <motion.div
                                        className={`ct-progress-fill ${v.utilization >= 80 ? 'green' : v.utilization >= 40 ? 'amber' : 'red'}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${v.utilization}%` }}
                                        transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16, flexShrink: 0, fontSize: '0.7rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, color: 'white' }}>{v.billableHours}h</div>
                                    <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)' }}>Billable</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, color: '#f59e0b' }}>{v.idle}</div>
                                    <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)' }}>Idle</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, color: v.fuelWaste === '$0' ? '#22c55e' : '#ef4444' }}>{v.fuelWaste}</div>
                                    <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)' }}>Fuel Waste</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header"><RefreshCw size={15} className="ct-section-icon" />AI Reassignment Suggestions</h3>
                    <div className="space-y-3">
                        {data.reassignments.map((r, i) => (
                            <motion.div key={i} className="ct-card group" style={{ padding: 16, cursor: 'pointer', borderColor: 'rgba(255,107,0,0.1)' }}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <Car size={14} style={{ color: '#FF6B00' }} />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{r.vehicle}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', marginBottom: 6 }}>
                                    <span style={{ color: 'rgba(239,68,68,0.7)' }}>{r.from}</span>
                                    <ArrowRight size={10} style={{ color: '#FF6B00' }} />
                                    <span style={{ color: '#22c55e' }}>{r.to}</span>
                                </div>
                                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{r.reason}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                    <span className="ct-badge ct-badge-green" style={{ fontSize: '0.55rem' }}>Save {r.savings}</span>
                                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>Apply <ArrowRight size={10} /></span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header"><TrendingUp size={15} className="ct-section-icon" />Site Activity Summary</h3>
                    <div className="space-y-3">
                        {data.siteActivity.map((site, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.06 }}
                                style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{site.site}</span>
                                    <span className={`ct-badge ${site.peakVehicles > 0 ? 'ct-badge-green' : ''}`}
                                        style={{ fontSize: '0.5rem', padding: '2px 6px', ...(site.peakVehicles === 0 ? { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' } : {}) }}>
                                        {site.peakVehicles > 0 ? 'ACTIVE' : 'IDLE'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2" style={{ fontSize: '0.6rem' }}>
                                    <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>Arrivals:</span> <strong style={{ color: 'white' }}>{site.arrivals}</strong></div>
                                    <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>Departures:</span> <strong style={{ color: 'white' }}>{site.departures}</strong></div>
                                    <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>First In:</span> <strong style={{ color: 'white' }}>{site.firstArrival || '—'}</strong></div>
                                    <div><span style={{ color: 'rgba(255,255,255,0.3)' }}>Peak:</span> <strong style={{ color: 'white' }}>{site.peakVehicles} vehicles</strong></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Export Daily Report', 'Share Client Proof', "Optimize Tomorrow's Routes"].map((a, i) => (
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
