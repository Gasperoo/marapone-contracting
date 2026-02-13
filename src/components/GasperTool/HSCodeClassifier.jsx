import React, { useState, useEffect } from 'react';
import { Search, Loader2, CheckCircle2, AlertCircle, ChevronRight, Calculator, FileText, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { classifyHSCode } from './aiService';
import './GasperTool.css';

export function HSCodeClassifier() {
    const [productDescription, setProductDescription] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);

    const loadingSteps = [
        "Analyzing product keywords...",
        "Scanning Harmonized System chapters...",
        "Matching WCO rulings...",
        "Calculating estimated duties...",
        "Finalizing classification..."
    ];

    const handleClassify = async (e) => {
        e.preventDefault();
        if (!productDescription.trim()) return;

        setIsLoading(true);
        setResult(null);
        setLoadingStep(0);

        // Simulate multi-step "thinking" process
        for (let i = 0; i < loadingSteps.length; i++) {
            setLoadingStep(i);
            await new Promise(resolve => setTimeout(resolve, 600)); // 600ms per step
        }

        const classification = classifyHSCode(productDescription);
        setResult(classification);
        setIsLoading(false);
    };

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            {/* Header / Search Section */}
            <div className="text-center space-y-6 py-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">AI Commodity Classifier</h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    Instantly classify products with our advanced reasoning engine. Get HS codes, duty estimates, and compliance checks in seconds.
                </p>

                <form onSubmit={handleClassify} className="max-w-xl mx-auto relative">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex shadow-2xl">
                            <Input
                                placeholder="Describe your product (e.g., 'Wireless Bluetooth Speaker')"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                className="h-14 pl-6 pr-32 rounded-xl bg-[#0f172a] border-white/10 text-lg shadow-inner focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !productDescription.trim()}
                                className="absolute right-2 top-2 bottom-2 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Classify"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Loading State - Visualizing the "Mind" */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
                        <Loader2 className="h-16 w-16 text-blue-400 animate-spin relative z-10" />
                    </div>
                    <div className="space-y-2 text-center">
                        <h3 className="text-xl font-medium text-white">{loadingSteps[loadingStep]}</h3>
                        <div className="flex gap-2 justify-center">
                            {loadingSteps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${idx <= loadingStep ? 'bg-blue-500' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Result Section */}
            {result && !isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-5 duration-700">

                    {/* Classification Card (Main) */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-white/10 shadow-2xl relative overflow-hidden group">
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-1000"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            HS Code Result
                                        </span>
                                        {result.confidence >= 0.8 && (
                                            <span className="flex items-center gap-1 text-green-400 text-xs font-medium">
                                                <CheckCircle2 size={12} /> High Confidence
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
                                        {result.code}
                                    </h1>
                                    <p className="text-lg text-white/60 mt-2 font-medium">{result.description}</p>
                                </div>

                                {/* Confidence Score Visual */}
                                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                                    <div className="relative h-20 w-20 mx-auto flex items-center justify-center">
                                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                                            <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                            <path className={`transition-all duration-1000 ease-out ${result.confidence >= 0.8 ? 'text-green-500' : 'text-yellow-500'}`}
                                                strokeDasharray={`${result.confidence * 100}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" stroke="currentColor" strokeWidth="4"
                                            />
                                        </svg>
                                        <span className="absolute text-xl font-bold text-white">{(result.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <span className="text-xs text-white/40 uppercase tracking-widest mt-2 block">Match Score</span>
                                </div>
                            </div>

                            {/* Hierarchy Tree */}
                            <div className="space-y-3 relative z-10 bg-black/20 rounded-xl p-5 border border-white/5">
                                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Classification Hierarchy</h4>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Section', val: result.hierarchy.section },
                                        { label: 'Chapter', val: result.hierarchy.chapter },
                                        { label: 'Heading', val: result.hierarchy.heading },
                                        { label: 'Subheading', val: result.hierarchy.subheading, active: true },
                                    ].map((item, idx) => (
                                        <div key={idx} className={`flex items-start gap-4 ${item.active ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-opacity'}`}>
                                            <div className="flex flex-col items-center mt-1">
                                                <div className={`h-2 w-2 rounded-full ${item.active ? 'bg-blue-500 shadow-[0_0_8px_rgb(59,130,246)]' : 'bg-white/30'}`}></div>
                                                {idx !== 3 && <div className="h-full w-px bg-white/10 my-1"></div>}
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">{item.label}</span>
                                                <p className={`text-sm ${item.active ? 'text-white font-semibold' : 'text-white/80'}`}>{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Reasoning Engine Output */}
                        <Card className="p-6 bg-white/5 border-white/10">
                            <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                <Zap className="text-yellow-400 h-5 w-5" />
                                AI Reasoning Engine
                            </h4>
                            <div className="space-y-3">
                                {result.reasoning_steps?.map((step, idx) => (
                                    <div key={idx} className="flex gap-3 text-sm text-white/80 items-start p-2 rounded hover:bg-white/5 transition-colors">
                                        <span className="text-blue-400 font-mono mt-0.5">{idx + 1}.</span>
                                        <span>{step}</span>
                                    </div>
                                )) || (
                                        <p className="text-white/60 text-sm italic">No reasoning steps available.</p>
                                    )}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Cards (Duty & Compliance) */}
                    <div className="space-y-6">
                        {/* Duty Estimator */}
                        <Card className="p-6 bg-[#0f172a] border-white/10 shadow-xl">
                            <h4 className="flex items-center gap-2 font-semibold text-white mb-6 border-b border-white/5 pb-4">
                                <Calculator className="text-green-400 h-5 w-5" />
                                Estimated Landed Cost
                            </h4>
                            <div className="space-y-5">
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-white/60">General Duty Rate</span>
                                    <span className="font-bold text-white bg-white/5 px-2 py-1 rounded group-hover:bg-white/10 transition-colors">
                                        {result.duties.general}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-white/60">China Tariff (301)</span>
                                    <span className="font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                                        {result.duties.china_tariff}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-white/60">Import VAT</span>
                                    <span className="font-bold text-white bg-white/5 px-2 py-1 rounded">
                                        {result.duties.vat}
                                    </span>
                                </div>

                                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 leading-relaxed mt-4">
                                    <span className="font-bold">Pro Tip:</span> Confirm FTA eligibility (e.g., USMCA) to potentially reduce these duties to 0%.
                                </div>
                            </div>
                        </Card>

                        {/* Compliance Check */}
                        <Card className="p-6 bg-[#0f172a] border-white/10 shadow-xl">
                            <h4 className="flex items-center gap-2 font-semibold text-white mb-4">
                                <ShieldCheck className="text-purple-400 h-5 w-5" />
                                Compliance Checks
                            </h4>
                            <ul className="space-y-3">
                                {result.compliance.restrictions.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                        <FileText className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-white/80">{req}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                                <span className="text-xs text-white/40 uppercase">Risk Level</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${result.compliance.risk_level === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    result.compliance.risk_level === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {result.compliance.risk_level}
                                </span>
                            </div>
                        </Card>
                    </div>

                </div>
            )}
        </div>
    );
}
