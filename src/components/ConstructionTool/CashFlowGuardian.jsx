import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight, TrendingUp,
    TrendingDown, FileText, Zap, Clock, Send, ChevronRight, Shield, Lightbulb
} from 'lucide-react';
import { getCashFlowForecast } from './constructionServices';
import '../../styles/ConstructionTool.css';

export function CashFlowGuardian() {
    const data = getCashFlowForecast();
    const maxVal = Math.max(...data.monthly.map(m => Math.max(m.inflow, m.outflow)));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <DollarSign className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Cash Flow Guardian
                    </h2>
                    <p className="ct-page-subtitle">Predictive cash defense & financial intelligence for SMBs</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`ct-badge ${data.healthScore >= 80 ? 'ct-badge-green' : 'ct-badge-amber'} ct-badge-live`}>
                        <Shield size={10} /> Health Score: {data.healthScore}/100
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                    { label: 'Cash Balance', value: data.currentBalance, color: '#22c55e' },
                    { label: 'Monthly Burn', value: data.monthlyBurn, color: '#ef4444' },
                    { label: 'Runway', value: data.runway, color: '#3b82f6' },
                    { label: 'AR Outstanding', value: data.arOutstanding, color: '#f59e0b' },
                    { label: 'AP Due', value: data.apDue, color: '#a855f7' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Cash Flow Chart */}
            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header">
                    <TrendingUp size={15} className="ct-section-icon" />
                    Cash Flow Forecast
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 200, paddingTop: 20 }}>
                    {data.monthly.map((month, idx) => (
                        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                            {/* Inflow Bar */}
                            <motion.div
                                className="ct-chart-bar"
                                style={{
                                    width: '40%',
                                    background: 'linear-gradient(180deg, #22c55e, rgba(34,197,94,0.5))',
                                }}
                                initial={{ height: 0 }}
                                animate={{ height: `${(month.inflow / maxVal) * 150}px` }}
                                transition={{ delay: 0.2 + idx * 0.05, duration: 0.5 }}
                            />
                            {/* Outflow Bar */}
                            <motion.div
                                className="ct-chart-bar"
                                style={{
                                    width: '40%',
                                    background: 'linear-gradient(180deg, #ef4444, rgba(239,68,68,0.5))',
                                    borderRadius: '0 0 6px 6px',
                                }}
                                initial={{ height: 0 }}
                                animate={{ height: `${(month.outflow / maxVal) * 150}px` }}
                                transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                            />
                            <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', marginTop: 4, fontWeight: 600 }}>{month.month}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: '#22c55e' }} /> Inflow
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: '#ef4444' }} /> Outflow
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* AI Alerts */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <AlertTriangle size={15} className="ct-section-icon" />
                        AI Cash Alerts
                    </h3>
                    <div className="space-y-3">
                        {data.alerts.map((alert, idx) => (
                            <motion.div
                                key={idx}
                                className={`ct-alert ct-alert-${alert.severity}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.08 }}
                            >
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', marginBottom: 4 }}>{alert.title}</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{alert.description}</div>
                                <div className="ct-ai-suggestion">
                                    <Lightbulb size={12} className="ai-icon" />
                                    <div>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FF6B00' }}>AI Fix: </span>
                                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>{alert.suggestion}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Payments */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <Clock size={15} className="ct-section-icon" />
                        Upcoming Payments
                    </h3>
                    <div className="space-y-2">
                        {data.upcomingPayments.map((payment, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.05 }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: 12, borderRadius: 10,
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.04)',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{payment.vendor}</div>
                                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{payment.project} · Due: {payment.dueDate}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        fontSize: '0.85rem', fontWeight: 700,
                                        color: payment.type === 'receivable' ? '#22c55e' : '#ef4444',
                                    }}>{payment.amount}</div>
                                    <span className={`ct-badge ${payment.type === 'receivable' ? 'ct-badge-green' : 'ct-badge-red'}`}
                                        style={{ fontSize: '0.5rem', padding: '2px 6px' }}>
                                        {payment.type === 'receivable' ? 'IN' : 'OUT'}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
