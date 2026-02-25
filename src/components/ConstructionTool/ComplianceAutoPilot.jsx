import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    ShieldCheck, AlertTriangle, CheckCircle, FileText, Camera,
    Zap, Clock, Radio, ArrowRight, Globe, Scale
} from 'lucide-react';
import { getComplianceData } from './constructionServices';

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
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="text-[#FF6B00]" size={24} />
                        Compliance Auto-Pilot™
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">End-to-end compliance coaching for construction SMBs</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${data.overallScore >= 80 ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                            data.overallScore >= 60 ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' :
                                'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}>
                        <ShieldCheck size={12} />
                        Compliance Score: {data.overallScore}/100
                    </div>
                </div>
            </div>

            {/* Reg Update Ticker */}
            <div className="bg-[#0a0f1c] border border-white/10 rounded-full py-2 px-4 overflow-hidden">
                <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
                    <span className="text-[#FF6B00] font-bold text-xs">REGULATORY UPDATES:</span>
                    {data.recentUpdates.map((update, i) => (
                        <span key={i} className="text-xs text-white/60 mx-4">
                            <span className="text-white/30 mr-2">[{update.time}]</span>
                            {update.text}
                            <span className="text-[#FF6B00] ml-2">● {update.source}</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Issues Panel */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Compliance Issues */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-amber-400" />
                            Flagged Compliance Issues
                        </h3>
                        <div className="space-y-3">
                            {data.issues.map((issue, idx) => (
                                <motion.div
                                    key={issue.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                    className={`p-4 rounded-xl border transition-all hover:bg-white/[0.03] ${issue.severity === 'high' ? 'border-red-500/20 bg-red-500/5' :
                                            issue.severity === 'medium' ? 'border-amber-500/20 bg-amber-500/5' :
                                                'border-blue-500/20 bg-blue-500/5'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${issue.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                                                    issue.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                }`}>{issue.severity}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-bold">{issue.category}</span>
                                        </div>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${issue.status === 'open' ? 'bg-red-500/10 text-red-400' :
                                                issue.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400' :
                                                    'bg-green-500/10 text-green-400'
                                            }`}>{issue.status.toUpperCase()}</span>
                                    </div>
                                    <div className="text-sm text-white font-medium mb-1">{issue.title}</div>
                                    <div className="text-xs text-slate-400 mb-3">{issue.description}</div>
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#FF6B00]/5 border border-[#FF6B00]/10">
                                        <div className="flex items-center gap-1.5 text-xs text-[#FF6B00]">
                                            <Zap size={10} />
                                            <span className="font-bold">AI Fix Plan:</span>
                                            <span className="text-white/70">{issue.fixPlan}</span>
                                        </div>
                                        <span className="text-[10px] text-red-400 font-mono">Fine: {issue.estimatedFine}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Inspection Simulation */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                <Camera size={16} className="text-[#FF6B00]" />
                                AI Inspection Simulator
                            </h3>
                            {scanning ? (
                                <span className="text-xs text-[#FF6B00] animate-pulse font-mono">SCANNING...</span>
                            ) : (
                                <button onClick={handleScan} className="px-3 py-1.5 text-xs rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] font-bold hover:bg-[#FF6B00]/20 transition-colors">
                                    Run Simulation
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {data.inspectionResults.map((result, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + idx * 0.05 }}
                                    className={`p-3 rounded-xl text-center border ${result.status === 'pass' ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
                                        }`}
                                >
                                    <div className={`text-2xl font-bold ${result.status === 'pass' ? 'text-green-400' : 'text-red-400'}`}>
                                        {scanning ? '...' : result.score}
                                    </div>
                                    <div className="text-[10px] text-slate-500 mt-1">{result.area}</div>
                                    <div className={`text-[9px] font-bold uppercase mt-1 ${result.status === 'pass' ? 'text-green-400' : 'text-red-400'}`}>
                                        {scanning ? 'SCANNING' : result.status}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Permits */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <FileText className="text-[#FF6B00] w-4 h-4" />
                            Permit Status
                        </h3>
                        <div className="space-y-2">
                            {data.permits.map((permit, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-white font-medium">{permit.type}</span>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${permit.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                                permit.status === 'pending-review' ? 'bg-amber-500/20 text-amber-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                            }`}>{permit.status.toUpperCase()}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">{permit.id} · {permit.project}</div>
                                    {permit.expires && <div className="text-[10px] text-slate-500 mt-0.5">Exp: {permit.expires}</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Zone */}
                    <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-6 text-center hover:border-[#FF6B00]/40 transition-colors cursor-pointer group">
                        <Camera size={32} className="mx-auto text-white/20 group-hover:text-[#FF6B00] transition-colors mb-3" />
                        <div className="text-sm text-white/60 group-hover:text-white transition-colors">Upload Photos or Documents</div>
                        <div className="text-xs text-slate-500 mt-1">AI will analyze for compliance issues</div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                        {['Generate Audit Report', 'Auto-Fill Permit Application', 'Schedule Re-Inspection'].map((action, i) => (
                            <button key={i} className="w-full py-3 px-4 text-xs font-medium text-left border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/5 hover:border-white/20 text-white flex items-center gap-2 transition-all group">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#FF6B00] transition-colors" />
                                {action}
                                <ArrowRight size={10} className="ml-auto text-white/20 group-hover:text-[#FF6B00] transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
