import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
    Shield, Globe, FileText, Activity, AlertTriangle,
    CheckCircle, Search, Radio, ScanLine, ScrollText
} from 'lucide-react';
import {
    getRegulatoryHeatmapData,
    getBlockchainAuditLog,
    getComplianceNews,
    getDocumentScanOverlay
} from './services/complianceOperationsService';
import './GasperTool.css';

export function ComplianceGuard() {
    const [activeTab, setActiveTab] = useState('radar');
    const [scanning, setScanning] = useState(false);

    // Data Loading
    const heatmapPoints = getRegulatoryHeatmapData();
    const auditLog = getBlockchainAuditLog();
    const newsFeed = getComplianceNews();
    const scanPoints = getDocumentScanOverlay();

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => setScanning(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4 md:px-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Shield className="text-emerald-400" />
                        ComplianceGuard™
                    </h1>
                    <p className="text-white/40 text-sm">Autonomous Regulatory Defense System</p>
                </div>

                {/* News Ticker */}
                <div className="flex-1 max-w-2xl bg-[#0a0f1c] border border-white/10 rounded-full py-2 px-4 overflow-hidden relative">
                    <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
                        <span className="text-red-400 font-bold text-xs">LIVE UPDATES:</span>
                        {newsFeed.map((news, i) => (
                            <span key={i} className="text-xs text-white/60 mx-4">
                                <span className="text-white/30 mr-2">[{news.time}]</span>
                                {news.headline}
                                <span className="text-emerald-500 ml-2">● {news.source}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* 1. Regulatory Radar (3D Globe Representation) */}
                <div className="col-span-12 lg:col-span-8">
                    <Card className="h-[600px] bg-[#050b14] border-white/10 p-0 relative overflow-hidden group">

                        {/* Map Background (Visual Simulation) */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]"></div>
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'invert(1) hue-rotate(180deg)'
                        }}></div>

                        {/* Interactive Points */}
                        {heatmapPoints.map((point, i) => {
                            // Simple projection mapping for visual demo (Not accurate geo-coords for this CSS hack, but sufficient for UI feel)
                            // In real app, use react-map-gl or three.js globe
                            const top = 50 - (point.lat / 90) * 40 + '%';
                            const left = 50 + (point.lng / 180) * 40 + '%';

                            return (
                                <div key={i}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group/point cursor-pointer"
                                    style={{ top: top, left: left }}>

                                    <div className={`w-3 h-3 rounded-full animate-ping absolute opacity-75 
                                        ${point.type === 'critical' ? 'bg-red-500' :
                                            point.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full relative z-10 border border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]
                                        ${point.type === 'critical' ? 'bg-red-500' :
                                            point.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                    </div>

                                    {/* Hover Tooltip */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-white/20 p-2 rounded backdrop-blur-md opacity-0 group-hover/point:opacity-100 transition-opacity z-20 pointer-events-none">
                                        <div className="text-xs font-bold text-white mb-1">{point.location}</div>
                                        <div className="text-[10px] text-white/70 uppercase tracking-wider mb-1">{point.issue}</div>
                                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                            <div className="bg-current h-full" style={{ width: point.intensity * 100 + '%', color: point.type === 'critical' ? '#ef4444' : '#f97316' }}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* HUD Overlays */}
                        <div className="absolute top-6 left-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Globe className="text-blue-400 w-5 h-5" />
                                Regulatory Radar
                            </h3>
                            <div className="flex gap-4 mt-2 text-xs text-white/40 font-mono">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> CRITICAL</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> WARNING</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> MONITORING</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 2. Right Column Tools */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* A. Smart Contract Audit Ledger */}
                    <Card className="h-[280px] bg-[#050b14] border-white/10 p-4 flex flex-col">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <Activity className="text-purple-400 w-4 h-4" />
                            Smart Contract Ledger
                        </h3>
                        <div className="flex-1 overflow-hidden relative">
                            <div className="absolute inset-0 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                                {auditLog.map((log, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-2 rounded flex items-center justify-between text-xs group hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="font-mono text-white/30">{log.id}</div>
                                            <div>
                                                <div className="text-white font-medium">{log.action}</div>
                                                <div className="text-white/40 text-[10px]">{log.subject}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold 
                                                ${log.status === 'PASS' || log.status === 'VERIFIED' || log.status === 'CLEARED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {log.status}
                                            </div>
                                            <div className="text-[9px] font-mono text-white/20 mt-1">{log.hash}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-white/30 font-mono">
                            <span>BLOCK: #8829102</span>
                            <span className="flex items-center gap-1 text-emerald-500"><CheckCircle size={10} /> NETWORK SECURE</span>
                        </div>
                    </Card>

                    {/* B. AI Document Audit */}
                    <Card className="h-[296px] bg-[#050b14] border-white/10 p-0 relative overflow-hidden flex flex-col">
                        <div className="absolute inset-0 p-6 flex flex-col z-10">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2 uppercase tracking-wider">
                                    <ScanLine className="text-blue-400 w-4 h-4" />
                                    AI Optical Scanner
                                </h3>
                                {scanning ? (
                                    <span className="text-xs text-blue-400 animate-pulse font-mono">SCANNING...</span>
                                ) : (
                                    <Button size="xs" variant="outline" onClick={handleScan} className="border-white/10 h-6 text-[10px]">
                                        START SCAN
                                    </Button>
                                )}
                            </div>

                            {/* Simulated Document View */}
                            <div className="flex-1 bg-white p-4 rounded-sm relative overflow-hidden shadow-2xl transform transition-all">
                                {/* Document Content (Abstract) */}
                                <div className="space-y-2 opacity-50 blur-[0.5px]">
                                    <div className="h-4 w-1/3 bg-black/80 mb-4"></div>
                                    <div className="h-2 w-full bg-black/20"></div>
                                    <div className="h-2 w-full bg-black/20"></div>
                                    <div className="h-2 w-3/4 bg-black/20"></div>
                                    <div className="h-20 w-full border border-black/10 mt-4"></div>
                                </div>

                                {/* AI Overlay Layer */}
                                {scanning && (
                                    <div className="absolute inset-0 bg-blue-500/10 z-20">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
                                    </div>
                                )}

                                {/* Detected Points Overlay (Always visible after scan or permanently for demo) */}
                                {!scanning && scanPoints.map((pt, i) => (
                                    <div key={i} className="absolute w-full h-full inset-0 pointer-events-none">
                                        <div
                                            className={`absolute border ${pt.status === 'verified' ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500 bg-red-500/10'}`}
                                            style={{ left: pt.x + '%', top: pt.y + '%', width: '30%', height: '8%' }}
                                        >
                                            <div className={`absolute -top-4 left-0 text-[8px] font-bold px-1 py-0.5 text-white
                                                ${pt.status === 'verified' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                                {pt.status === 'verified' ? '✔' : '⚠'} {pt.label}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                </div>
            </div>

            {/* 3. Bottom Action Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Generate Audit Report', 'Verify HS Codes', 'Sanctions Screening', 'Upload Documents'].map((action, i) => (
                    <Button key={i} variant="outline" className="h-12 border-white/10 hover:bg-white/5 hover:border-white/20 text-white justify-start pl-4 group">
                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-400 mr-3 transition-colors"></div>
                        {action}
                    </Button>
                ))}
            </div>
        </div>
    );
}
