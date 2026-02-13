import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
    FileText, ShieldCheck, Zap, Globe,
    Search, Cpu, Lock, Send, Download,
    Eye, CheckCircle2, AlertCircle, RefreshCw,
    Layers, Fingerprint, Database
} from 'lucide-react';
import {
    generateTradeDocument,
    parseDocumentOCR,
    getBlockchainNotaryRecord
} from './services/documentService';
import './GasperTool.css';

export function DocSentinel() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [ocrData, setOcrData] = useState(null);
    const [isDispatching, setIsDispatching] = useState(false);
    const [dispatchStep, setDispatchStep] = useState(0);
    const [notaryInfo, setNotaryInfo] = useState(null);

    const handleScan = async () => {
        setIsScanning(true);
        setScanProgress(0);
        setOcrData(null);

        // Progress simulation
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);

        setTimeout(() => {
            const data = parseDocumentOCR();
            setOcrData(data);
            setIsScanning(false);
            setNotaryInfo(getBlockchainNotaryRecord('DOC-' + Math.random().toString(36).slice(2, 9)));
        }, 2500);
    };

    const handleDispatch = () => {
        setIsDispatching(true);
        setDispatchStep(1);

        setTimeout(() => setDispatchStep(2), 1500);
        setTimeout(() => setDispatchStep(3), 3000);
        setTimeout(() => {
            setIsDispatching(false);
            // Completed
        }, 4500);
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4 md:px-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <ShieldCheck className="text-blue-500" />
                        DocSentinel Hub™
                    </h1>
                    <p className="text-white/40 text-sm">Neural Document Processing & Blockchain Notary</p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 text-white/60 hover:text-white">
                        <Database size={16} className="mr-2" />
                        Archive
                    </Button>
                    <Button onClick={handleScan} disabled={isScanning} className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                        {isScanning ? <RefreshCw className="mr-2 animate-spin" size={16} /> : <Zap className="mr-2" size={16} />}
                        Neural Scan Document
                    </Button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* 1. Document Scanner / OCR Workspace */}
                <div className="col-span-12 lg:col-span-7">
                    <Card className="h-[650px] bg-[#0a0f18] border-blue-500/10 p-0 relative overflow-hidden group">

                        {/* Scanner Viewport */}
                        <div className="absolute inset-x-8 top-8 bottom-24 bg-white/5 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">

                            {/* Paper Simulation */}
                            <div className={`w-[450px] aspect-[1/1.4] bg-white shadow-2xl transition-all duration-1000 transform ${isScanning ? 'scale-105 opacity-80' : 'scale-100'}`}>
                                <div className="p-8 text-slate-800">
                                    <div className="flex justify-between mb-8 opacity-40">
                                        <div className="w-24 h-4 bg-slate-300 rounded"></div>
                                        <div className="w-16 h-4 bg-slate-300 rounded"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-full h-2 bg-slate-100 rounded"></div>
                                        <div className="w-full h-2 bg-slate-100 rounded"></div>
                                        <div className="w-3/4 h-2 bg-slate-100 rounded"></div>
                                        <div className="pt-8 grid grid-cols-2 gap-4">
                                            <div className="h-20 border border-dashed border-slate-200 rounded"></div>
                                            <div className="h-20 border border-dashed border-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scanner Laser Sweep */}
                                {isScanning && (
                                    <div className="absolute inset-0 z-20 pointer-events-none">
                                        <div className="h-1 w-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute top-0 animate-sweep"></div>
                                        <div className="absolute inset-0 bg-blue-500/5 animate-scanner-glow"></div>
                                    </div>
                                )}

                                {/* Bounding Boxes (Revealed after scan) */}
                                {ocrData && !isScanning && (
                                    <div className="absolute inset-0 z-20 pointer-events-none p-8">
                                        <div className="absolute top-12 left-8 border-2 border-emerald-500/50 bg-emerald-500/5 w-32 h-6 animate-pulse"></div>
                                        <div className="absolute top-24 left-8 border-2 border-emerald-500/50 bg-emerald-500/5 w-48 h-12 animate-pulse" style={{ animationDelay: '200ms' }}></div>
                                        <div className="absolute bottom-24 right-8 border-2 border-blue-500/50 bg-blue-500/5 w-24 h-12 animate-pulse" style={{ animationDelay: '400ms' }}></div>
                                    </div>
                                )}
                            </div>

                            {/* Empty State Instructions */}
                            {!isScanning && !ocrData && (
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto border border-blue-500/20">
                                        <FileText className="text-blue-400" size={32} />
                                    </div>
                                    <p className="text-white/40 font-medium">Drop document or click scan to begin AI extraction</p>
                                </div>
                            )}
                        </div>

                        {/* Scanner HUD Overlay */}
                        <div className="absolute bottom-0 inset-x-0 h-20 bg-black/40 backdrop-blur-md border-t border-white/5 px-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isScanning ? 'bg-blue-500 animate-pulse text-white' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                    {isScanning ? `Extracting Data... ${scanProgress}%` : ocrData ? 'Extraction Verified' : 'Ready to Parse'}
                                </div>
                                {ocrData && <span className="text-white/40 text-[10px] uppercase font-mono">Confidence: {(ocrData.confidence * 100).toFixed(1)}%</span>}
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-white/40 hover:text-white">
                                    <Eye size={14} className="mr-2" /> Detail Mode
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 2. Side Panel - Intelligence & Audit */}
                <div className="col-span-12 lg:col-span-5 space-y-6">

                    {/* Neural Extractions Card */}
                    <Card className="bg-[#0a0f18] border-blue-500/10 p-6 flex flex-col h-[380px]">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6 uppercase tracking-wider">
                            <Cpu className="text-blue-400 w-4 h-4" />
                            Neural Extractions
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                            {ocrData ? (
                                ocrData.fieldsExtracted.map((field, i) => (
                                    <div key={i} className="group relative bg-white/5 border border-white/5 p-4 rounded-xl hover:border-blue-500/30 transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-[10px] text-white/40 font-bold uppercase">{field.label}</p>
                                            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                                                <Fingerprint size={10} /> {(field.confidence * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                        <p className="text-white font-medium">{field.value}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                                    <Layers size={48} className="mb-4 text-blue-400" />
                                    <p className="text-sm">No data extracted yet</p>
                                </div>
                            )}
                        </div>

                        {ocrData?.anomalies.length > 0 && (
                            <div className="mt-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                                <AlertCircle className="text-yellow-500 shrink-0" size={16} />
                                <div>
                                    <p className="text-[10px] font-bold text-yellow-500 uppercase">Risk Alert</p>
                                    <p className="text-[10px] text-white/70">{ocrData.anomalies[0].suggestion}</p>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Blockchain Notary Seal */}
                    <Card className="bg-[#101827] border-blue-500/20 p-6 relative overflow-hidden group">

                        {/* Notary Animation / BG */}
                        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>

                        <div className="relative z-10">
                            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6 uppercase tracking-wider">
                                <Lock className="text-emerald-400 w-4 h-4" />
                                Blockchain Notary Seal
                            </h3>

                            {notaryInfo ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                        <div>
                                            <p className="text-[10px] text-white/40 font-bold uppercase">Chain ID</p>
                                            <p className="text-xs font-mono text-white">{notaryInfo.chainId}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-white/40 font-bold uppercase">Block</p>
                                            <p className="text-xs font-mono text-white">#{notaryInfo.blockNumber}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] text-white/40 font-bold uppercase">Transaction Hash</p>
                                        <p className="text-[10px] font-mono text-blue-300 break-all p-2 bg-black/40 rounded border border-white/5">
                                            {notaryInfo.txHash}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 w-fit px-3 py-1 rounded-full border border-emerald-500/20">
                                        <CheckCircle2 size={12} /> SECURED & TIMESTAMPED
                                    </div>
                                </div>
                            ) : (
                                <p className="text-white/20 text-xs italic">Complete scan to notarize document...</p>
                            )}
                        </div>
                    </Card>

                </div>
            </div>

            {/* Bottom Actions - Express Dispatch */}
            <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-12 bg-[#0a0f18] border-blue-500/10 p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-bold text-lg flex items-center gap-3">
                                <Send className="text-blue-500" />
                                Express Customs Dispatch
                            </h3>
                            <p className="text-white/40 text-sm max-w-md">Automated filing to 190+ global port authorities via EDI & Blockchain Direct-Link.</p>
                        </div>

                        <div className="flex-1 max-w-xl w-full">
                            {isDispatching ? (
                                <div className="space-y-4 w-full">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                        <span>{dispatchStep === 1 ? 'Handshaking...' : dispatchStep === 2 ? 'Validating Fields...' : 'Transmission Success'}</span>
                                        <span>{dispatchStep * 33}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: (dispatchStep * 33.33) + '%' }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center md:justify-end gap-4 w-full">
                                    <Button variant="outline" className="border-white/10 text-white/60">
                                        <Download className="mr-2" size={16} /> Bulk Export
                                    </Button>
                                    <Button onClick={handleDispatch} className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 gap-2 h-12 shadow-lg shadow-emerald-500/20">
                                        <Globe size={18} />
                                        Initialize Global Dispatch
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Global Dispatch Status Log (Optional Floating HUD would be cool but keeping it clean) */}
        </div>
    );
}
