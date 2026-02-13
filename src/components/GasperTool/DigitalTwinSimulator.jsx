import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Activity, Globe, Zap, Shield, AlertTriangle, TrendingDown, DollarSign, Cpu, Loader2, Play } from 'lucide-react';
import { runSupplyChainSimulation, simulateTariffChange } from './services/simulationService';
import { formatCurrency } from '../../lib/utils';
import './GasperTool.css';

export function DigitalTwinSimulator() {
    const [activeScenario, setActiveScenario] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [ticker, setTicker] = useState({ revenue: 1450200, risk: 0 });

    // Scenario State
    const [scenarioType, setScenarioType] = useState('port_strike');
    const [severity, setSeverity] = useState('High');

    // Simulate live ticker effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTicker(prev => ({
                revenue: prev.revenue + Math.floor(Math.random() * 500),
                risk: activeScenario ? prev.risk + Math.floor(Math.random() * 50 - 20) : 0
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, [activeScenario]);

    const handleRunSimulation = async () => {
        setIsLoading(true);
        setActiveScenario({ type: scenarioType, severity });

        // Aesthetic delay for "Processing"
        await new Promise(resolve => setTimeout(resolve, 2000));

        const params = {
            origin: 'Shanghai',
            destination: 'Los Angeles',
            commodity: 'Electronics',
            currentCost: 50000,
            scenarios: [{ type: scenarioType, severity }]
        };

        const simulation = runSupplyChainSimulation(params);
        setResult(simulation.results[0]);
        setTicker(prev => ({ ...prev, risk: simulation.results[0].financialImpact.revenueAtRisk }));
        setIsLoading(false);
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-12">

            {/* 1. Global Command Center Header */}
            <div className="grid grid-cols-12 gap-6 min-h-[600px] relative">

                {/* 3D Main Globe View */}
                <div className="col-span-12 lg:col-span-9 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#050b14] shadow-2xl">
                    {/* Background Grid & Stars */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

                    {/* The "Globe" (CSS 3D approximation) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#1e293b,black)] opacity-80 border border-white/5 shadow-[0_0_100px_rgba(59,130,246,0.1)] relative animate-slow-spin">
                            {/* Map Texture Overlay */}
                            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-20 mix-blend-overlay"></div>

                            {/* Active Nodes */}
                            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] animate-ping"></div>
                            <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] animate-ping animation-delay-1000"></div>

                            {/* Scenario Impact Zone */}
                            {activeScenario && (
                                <div className="absolute top-[40%] left-[20%] w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
                            )}
                        </div>
                    </div>

                    {/* HUD Overlay */}
                    <div className="absolute top-6 left-6 flex gap-4">
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-mono text-green-400">SYSTEM ONLINE</span>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                            <Activity size={14} className="text-blue-400" />
                            <span className="text-xs font-mono text-blue-300">NODES: 1,420</span>
                        </div>
                    </div>

                    {/* Scenario Control Panel (Responsive) */}
                    <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl z-20">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Cpu size={16} className="text-purple-400" />
                            SCENARIO INJECTOR
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-mono text-white/50 uppercase">Event Type</label>
                                <Select value={scenarioType} onValueChange={setScenarioType}>
                                    <SelectTrigger className="h-8 bg-white/5 border-white/10 text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="port_strike">Port Strike (LA/LB)</SelectItem>
                                        <SelectItem value="weather_event">Typhoon (Pacific)</SelectItem>
                                        <SelectItem value="tariff_change">Tariff Hike (China-US)</SelectItem>
                                        <SelectItem value="cyber_attack">Cyber Attack (Ransomware)</SelectItem>
                                        <SelectItem value="geopolitical_tension">Geopolitical Tension (Red Sea)</SelectItem>
                                        <SelectItem value="supplier_insolvency">Supplier Insolvency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-white/50 uppercase">Severity</label>
                                <Select value={severity} onValueChange={setSeverity}>
                                    <SelectTrigger className="h-8 bg-white/5 border-white/10 text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Medium">Medium (Class 2)</SelectItem>
                                        <SelectItem value="High">High (Class 3)</SelectItem>
                                        <SelectItem value="Critical">Critical (Class 5)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={handleRunSimulation}
                                disabled={isLoading}
                                className="w-full h-9 bg-red-600 hover:bg-red-700 text-white border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'INJECT SCENARIO'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Metrics */}
                <div className="col-span-12 lg:col-span-3 space-y-4 h-full flex flex-col">
                    {/* Financial Ticker */}
                    <Card className="bg-[#050b14] border-white/10 p-5 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                        <DollarSign className="w-10 h-10 text-blue-500 mb-2 opacity-80" />
                        <div className="text-3xl font-mono font-bold text-white mb-1">
                            {formatCurrency(ticker.revenue).split('.')[0]}
                        </div>
                        <div className="text-xs font-mono text-blue-400 uppercase tracking-widest">Global Revenue Flow</div>
                    </Card>

                    {/* Risk Gauge */}
                    <Card className={`bg-[#050b14] border-white/10 p-5 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden transition-all duration-500 ${result ? 'border-red-500/50 bg-red-950/20' : ''}`}>
                        <AlertTriangle className={`w-10 h-10 mb-2 transition-colors ${result ? 'text-red-500 animate-pulse' : 'text-white/20'}`} />
                        <div className={`text-3xl font-mono font-bold transition-colors ${result ? 'text-red-500' : 'text-white/40'}`}>
                            {result ? formatCurrency(ticker.risk).split('.')[0] : '$0'}
                        </div>
                        <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Revenue at Risk</div>
                    </Card>

                    {/* AI Insight Feed */}
                    <Card className="bg-[#050b14] border-white/10 p-4 flex-[2] overflow-hidden flex flex-col">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2 mb-3">
                            <Zap size={12} /> AI Cortex Stream
                        </h4>
                        <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                            {result ? (
                                <>
                                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                        <p className="text-xs text-emerald-100 leading-relaxed font-mono">
                                            {">"} {result.aiPrediction.insight}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                                        <p className="text-[10px] text-white/40 uppercase mb-1">Recommended Action</p>
                                        <p className="text-xs text-white leading-relaxed font-mono">
                                            {result.aiPrediction.nextBestAction}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                                        <p className="text-[10px] text-white/40 uppercase mb-1">Affected Nodes</p>
                                        <div className="flex flex-wrap gap-1">
                                            {result.affectedNodes.map((n, i) => (
                                                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-300 rounded border border-red-500/30">
                                                    {n}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-10 opacity-30">
                                    <Activity size={24} className="mx-auto mb-2" />
                                    <p className="text-xs font-mono">Awaiting Scenario Injection...</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            {/* 2. Detailed Breakdown Grid (Only if result exists) */}
            {result && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-10 fade-in duration-700">
                    <Card className="p-6 bg-white/5 border-white/10">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingDown size={18} className="text-red-400" /> Operational Impact
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-white/60">Projected Delay</span>
                                <span className="text-xl font-bold text-red-400">+{result.operationalImpact.delayDays} Days</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-500 h-full" style={{ width: `${Math.min(100, result.operationalImpact.delayDays * 10)}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-white/60">Efficiency Drop</span>
                                <span className="text-xl font-bold text-orange-400">-{result.operationalImpact.efficiencyDrop}%</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white/5 border-white/10">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Shield size={18} className="text-blue-400" /> Mitigation Strategy
                        </h4>
                        <ul className="space-y-3">
                            {result.mitigations.slice(0, 3).map((mitigation, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-white/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                                    {mitigation}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6 bg-white/5 border-white/10">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Cpu size={18} className="text-purple-400" /> AI Confidence
                        </h4>
                        <div className="flex flex-col items-center justify-center py-2">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                                    <circle cx="64" cy="64" r="60" stroke="#c084fc" strokeWidth="8" fill="none" strokeDasharray="377" strokeDashoffset={377 * (1 - result.aiPrediction.confidence / 100)} className="transition-all duration-1000 ease-out" />
                                </svg>
                                <span className="absolute text-2xl font-bold text-white">{result.aiPrediction.confidence}%</span>
                            </div>
                            <p className="text-xs text-white/40 mt-2 text-center max-w-[200px]">Based on analysis of 14,000+ similar historical events.</p>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
