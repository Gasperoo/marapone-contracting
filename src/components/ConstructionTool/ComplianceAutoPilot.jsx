import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    ShieldCheck, AlertTriangle, CheckCircle, FileText, Camera,
    Zap, Clock, Radio, ArrowRight, Globe, Scale, Lightbulb
} from 'lucide-react';
import { getComplianceData } from './constructionServices';
import '../../styles/ConstructionTool.css';

export function ComplianceAutoPilot() {
    const data = getComplianceData();
    const [scanning, setScanning] = useState(false);

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => setScanning(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <ShieldCheck className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Compliance Auto-Pilot™
                    </h2>
                    <p className="ct-page-subtitle">End-to-end compliance coaching for construction SMBs</p>
                </div>
                <div className={`ct-badge ${data.overallScore >= 80 ? 'ct-badge-green' : data.overallScore >= 60 ? 'ct-badge-amber' : 'ct-badge-red'} ct-badge-live`}>
                    <ShieldCheck size={10} /> Compliance Score: {data.overallScore}/100
                </div>
            </div>

            {/* Reg Update Ticker */}
            <div className="ct-card" style={{ borderRadius: 100, padding: '10px 20px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FF6B00', flexShrink: 0, letterSpacing: '0.05em' }}>REGULATORY UPDATES:</span>
                    <div style={{ overflow: 'hidden' }}>
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            style={{ display: 'flex', gap: 32 }}
                        >
                            {[...data.recentUpdates, ...data.recentUpdates].map((update, i) => (
                                <span key={i} style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.2)', marginRight: 8 }}>[{update.time}]</span>
                                    {update.text}
                                    <span style={{ color: '#FF6B00', marginLeft: 8 }}>● {update.source}</span>
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Issues Panel */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Compliance Issues */}
                    <div className="ct-card" style={{ padding: 24 }}>
                        <h3 className="ct-section-header">
                            <AlertTriangle size={15} className="ct-section-icon" />
                            Flagged Compliance Issues
                        </h3>
                        <div className="space-y-3">
                            {data.issues.map((issue, idx) => (
                                <motion.div
                                    key={issue.id}
                                    className={`ct-alert ct-alert-${issue.severity}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span className={`ct-badge ct-badge-${issue.severity === 'high' ? 'red' : issue.severity === 'medium' ? 'amber' : 'blue'}`}
                                                style={{ fontSize: '0.5rem', padding: '2px 6px' }}>
                                                {issue.severity}
                                            </span>
                                            <span className="ct-badge" style={{
                                                fontSize: '0.5rem', padding: '2px 6px',
                                                background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                            }}>
                                                {issue.category}
                                            </span>
                                        </div>
                                        <span className={`ct-badge ct-badge-${issue.status === 'open' ? 'red' : issue.status === 'in-progress' ? 'amber' : 'green'}`}
                                            style={{ fontSize: '0.5rem', padding: '2px 6px' }}>
                                            {issue.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', marginBottom: 4 }}>{issue.title}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>{issue.description}</div>
                                    <div className="ct-ai-suggestion">
                                        <Lightbulb size={12} className="ai-icon" />
                                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FF6B00' }}>AI Fix Plan: </span>
                                                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>{issue.fixPlan}</span>
                                            </div>
                                            <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: '#ef4444', fontWeight: 700 }}>Fine: {issue.estimatedFine}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Inspection Simulation */}
                    <div className="ct-card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 className="ct-section-header" style={{ marginBottom: 0 }}>
                                <Camera size={15} className="ct-section-icon" />
                                AI Inspection Simulator
                            </h3>
                            {scanning ? (
                                <span className="ct-badge ct-badge-orange ct-badge-live" style={{ animation: 'ct-dot-pulse 1s infinite' }}>
                                    SCANNING...
                                </span>
                            ) : (
                                <button onClick={handleScan} className="ct-action-btn" style={{ padding: '6px 14px' }}>
                                    <Zap size={12} /> Run Simulation
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {data.inspectionResults.map((result, idx) => (
                                <motion.div
                                    key={idx}
                                    className="ct-kpi"
                                    style={{
                                        '--kpi-color': result.status === 'pass' ? '#22c55e' : '#ef4444',
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + idx * 0.05 }}
                                >
                                    <div style={{
                                        fontSize: '1.5rem', fontWeight: 800,
                                        color: scanning ? 'rgba(255,255,255,0.3)' : result.status === 'pass' ? '#22c55e' : '#ef4444',
                                        transition: 'color 0.3s',
                                    }}>
                                        {scanning ? '...' : result.score}
                                    </div>
                                    <div className="ct-kpi-label" style={{ marginTop: 4 }}>{result.area}</div>
                                    <span className={`ct-badge ${result.status === 'pass' ? 'ct-badge-green' : 'ct-badge-red'}`}
                                        style={{ fontSize: '0.5rem', padding: '1px 6px', marginTop: 6 }}>
                                        {scanning ? 'SCANNING' : result.status}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Permits */}
                    <div className="ct-card" style={{ padding: 20 }}>
                        <h3 className="ct-section-header">
                            <FileText size={14} className="ct-section-icon" />
                            Permit Status
                        </h3>
                        <div className="space-y-2">
                            {data.permits.map((permit, idx) => (
                                <motion.div key={idx}
                                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.04 }}
                                    style={{
                                        padding: 12, borderRadius: 10,
                                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                                        transition: 'background 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'white' }}>{permit.type}</span>
                                        <span className={`ct-badge ${permit.status === 'approved' ? 'ct-badge-green' : permit.status === 'pending-review' ? 'ct-badge-amber' : 'ct-badge-blue'}`}
                                            style={{ fontSize: '0.5rem', padding: '2px 6px' }}>
                                            {permit.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>{permit.id} · {permit.project}</div>
                                    {permit.expires && <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>Exp: {permit.expires}</div>}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Zone */}
                    <div className="ct-card" style={{
                        padding: 24, textAlign: 'center', cursor: 'pointer',
                        borderStyle: 'dashed', borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.08)',
                        transition: 'all 0.3s',
                    }}>
                        <Camera size={28} style={{ margin: '0 auto 12px', color: 'rgba(255,255,255,0.15)' }} />
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Upload Photos or Documents</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>AI will analyze for compliance issues</div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                        {['Generate Audit Report', 'Auto-Fill Permit Application', 'Schedule Re-Inspection'].map((action, i) => (
                            <button key={i} className="ct-action-btn" style={{ width: '100%', justifyContent: 'flex-start' }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                                {action}
                                <ArrowRight size={10} style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)' }} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
