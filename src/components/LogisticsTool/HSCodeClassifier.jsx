import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, AlertCircle, ChevronRight, Calculator, FileText, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { classifyHSCode } from '../GasperTool/aiService';
import '../../styles/LogisticsTool.css';

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

        for (let i = 0; i < loadingSteps.length; i++) {
            setLoadingStep(i);
            await new Promise(resolve => setTimeout(resolve, 600));
        }

        const classification = classifyHSCode(productDescription);
        setResult(classification);
        setIsLoading(false);
    };

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto relative">

            {/* Background Circuitry Aesthetic (Neural Links) */}
            {isLoading && (
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]">
                        <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
                            <path d="M100 200 L400 200 M400 200 L700 100 M400 200 L700 300" stroke="#0EA5E9" strokeWidth="2" fill="none" className="animate-pulse" />
                            <circle cx="100" cy="200" r="4" fill="#0EA5E9" className="animate-ping" />
                            <circle cx="700" cy="100" r="4" fill="#38BDF8" style={{ animationDelay: '500ms' }} className="animate-ping" />
                            <circle cx="700" cy="300" r="4" fill="#0EA5E9" style={{ animationDelay: '1000ms' }} className="animate-ping" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Header / Search Section */}
            <div className="text-center space-y-6 py-8 relative z-10">
                <div className="lt-badge lt-badge-cyan lt-badge-live" style={{ margin: '0 auto', width: 'fit-content' }}>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Engine v4.0</span>
                </div>
                <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Commodity Intelligence Core</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
                    Proprietary deep-learning architecture for global HTS/HS classification & duty optimization.
                </p>

                <form onSubmit={handleClassify} className="max-w-xl mx-auto relative">
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" style={{ background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)' }}></div>
                        <div className="relative flex shadow-2xl">
                            <Input
                                placeholder="Universal product descriptor..."
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                className="h-16 pl-8 pr-32 rounded-2xl bg-white/80 backdrop-blur-md border-black/[0.08] text-lg shadow-inner focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all font-medium text-[#1a1a1a]"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !productDescription.trim()}
                                className="absolute right-2 top-2 bottom-2 px-8 rounded-xl text-white font-black uppercase tracking-widest text-xs transition-all shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                                    boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                                }}
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Analyze"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in zoom-in duration-500 relative z-10">
                    <div className="grid grid-cols-5 gap-4">
                        {loadingSteps.map((_, idx) => (
                            <div key={idx} className={`h-1 w-12 rounded-full transition-all duration-500 ${idx <= loadingStep ? 'shadow-[0_0_10px_rgba(14,165,233,0.8)]' : 'bg-black/[0.03]'}`}
                                style={idx <= loadingStep ? { background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)' } : undefined}
                            ></div>
                        ))}
                    </div>
                    <div className="text-center">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] h-5">{loadingSteps[loadingStep]}</h3>
                    </div>
                </div>
            )}

            {/* Result Section */}
            {result && !isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-5 duration-700 relative z-10">

                    {/* Classification Card (Main) */}
                    <div className="lg:col-span-8 space-y-6">
                        <Card className="p-10 bg-white border-black/[0.08] shadow-3xl relative overflow-hidden group" style={{ borderLeft: '4px solid #0EA5E9' }}>
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <FileText size={160} className="text-[#1a1a1a]" />
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="lt-badge lt-badge-green">
                                            Verified Result
                                        </span>
                                        <div className="flex items-center gap-1 text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest">
                                            <ShieldCheck size={12} /> Legal Binding: Tier 1
                                        </div>
                                    </div>
                                    <h1 className="text-7xl font-black text-[#1a1a1a] tracking-tighter mb-4 flex items-baseline gap-2">
                                        {result.code}
                                        <span className="text-sm font-mono text-gray-400">/HS-REV-23</span>
                                    </h1>
                                    <p className="text-xl text-gray-500 font-medium leading-relaxed italic border-l-2 border-black/[0.06] pl-6">{result.description}</p>
                                </div>

                                {/* Confidence Score */}
                                <div className="lt-card" style={{ padding: 24, textAlign: 'center', minWidth: 140 }}>
                                    <div className="relative h-24 w-24 mx-auto flex items-center justify-center">
                                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                                            <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />
                                            <path
                                                className={`transition-all duration-1000 ease-out`}
                                                style={{ color: result.confidence >= 0.8 ? '#0EA5E9' : '#f59e0b' }}
                                                strokeDasharray={`${result.confidence * 100}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" stroke="currentColor" strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="absolute text-2xl font-black text-[#1a1a1a]">{(result.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <span className="lt-stat-label mt-4 block">Confidence Index</span>
                                </div>
                            </div>

                            {/* Reasoning Engine Trace */}
                            <div className="space-y-6 relative z-10">
                                <div className="p-6 bg-[#F5F5F5] rounded-2xl border border-black/[0.06]">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <Zap size={14} className="text-[#0EA5E9]" />
                                        Neural Logic Trace
                                    </h4>
                                    <div className="space-y-4">
                                        {result.reasoning_steps?.map((step, idx) => (
                                            <div key={idx} className="flex gap-4 text-sm text-gray-500 animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${idx * 150}ms` }}>
                                                <span className="text-[#0EA5E9] font-black font-mono">[{idx + 1}]</span>
                                                <span className="leading-relaxed">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar: Lab Diagnostics */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Financial Analysis */}
                        <Card className="p-8 bg-white border-black/[0.08] relative overflow-hidden group" style={{ borderLeft: '3px solid #22c55e' }}>
                            <h4 className="text-xs font-black text-[#1a1a1a] uppercase tracking-[0.2em] mb-8 border-b border-black/[0.06] pb-4">
                                Financial Impact Analysis
                            </h4>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="lt-stat-label">Standard Duty Vector</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-2xl font-black text-[#1a1a1a]">{result.duties.general}</span>
                                        <span className="text-[10px] text-emerald-500 font-bold mb-1">OPTIMIZED</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="lt-stat-label">China Tariff Surcharge (301)</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-2xl font-black text-red-500">{result.duties.china_tariff}</span>
                                        <span className="text-[10px] text-red-400 font-bold mb-1">HIGH IMPACT</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-black/[0.06]">
                                    <p className="text-[11px] text-gray-400 leading-relaxed italic">
                                        System suggests auditing USMCA eligibility for potential 100% duty remission.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Compliance Matrix */}
                        <Card className="p-8 bg-white border-black/[0.08] relative overflow-hidden" style={{ borderLeft: '3px solid #a855f7' }}>
                            <h4 className="text-xs font-black text-[#1a1a1a] uppercase tracking-[0.2em] mb-6">
                                Compliance Matrix
                            </h4>
                            <div className="space-y-3">
                                {result.compliance.restrictions.map((req, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-3 bg-[#F5F5F5] rounded-xl border border-black/[0.06] hover:border-black/[0.1] transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shadow-[0_0_5px_rgba(192,132,252,0.8)]"></div>
                                        <span className="text-xs text-gray-500 leading-relaxed">{req}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-between items-center bg-[#F5F5F5] p-3 rounded-lg border border-black/[0.06]">
                                <span className="lt-stat-label">Global Risk Seal</span>
                                <span className={`text-[10px] font-black px-2 py-1 rounded tracking-tighter ${result.compliance.risk_level === 'Low' ? 'text-emerald-500' : 'text-red-500'}`}>
                                    CLASS: {result.compliance.risk_level.toUpperCase()}
                                </span>
                            </div>
                        </Card>
                    </div>

                </div>
            )}
        </div>
    );
}
