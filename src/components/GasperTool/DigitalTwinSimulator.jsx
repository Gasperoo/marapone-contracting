import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Loader2, Play, AlertTriangle, Globe, Network, Activity } from 'lucide-react';
import { runSupplyChainSimulation, simulateTariffChange } from './services/simulationService';
import { formatCurrency, formatPercentage, simulateDelay } from '../../lib/utils';
import './GasperTool.css';

export function DigitalTwinSimulator() {
    const [mode, setMode] = useState('supply-chain');
    const [activeView, setActiveView] = useState('map'); // map or network
    const [isLoading, setIsLoading] = useState(false);
    const [simulationResult, setSimulationResult] = useState(null);
    const [tariffResult, setTariffResult] = useState(null);

    // Supply Chain Simulation State
    const [origin, setOrigin] = useState('Shanghai');
    const [destination, setDestination] = useState('Toronto');
    const [commodity, setCommodity] = useState('Electronics');
    const [scenarioType, setScenarioType] = useState('port_strike');

    // Tariff Simulation State
    const [tariffCommodity, setTariffCommodity] = useState('steel');
    const [tariffOrigin, setTariffOrigin] = useState('China');
    const [tariffDestination, setTariffDestination] = useState('USA');

    const nodes = [
        { id: 1, x: 25, y: 33, label: 'Origin' },
        { id: 2, x: 75, y: 66, label: 'Destination' },
        { id: 3, x: 50, y: 50, label: 'Hub' }
    ];

    const handleSupplyChainSimulation = async () => {
        setIsLoading(true);
        await simulateDelay(1000);

        const params = {
            origin,
            destination,
            commodity,
            volume: 1000,
            currentCost: 50000,
            scenarios: [
                {
                    type: scenarioType,
                    severity: 'Medium',
                    description: `Simulated ${scenarioType.replace(/_/g, ' ')} scenario`,
                },
            ],
        };

        const result = runSupplyChainSimulation(params);
        setSimulationResult(result);
        setIsLoading(false);
    };

    const handleTariffSimulation = async () => {
        setIsLoading(true);
        await simulateDelay(1000);

        const result = simulateTariffChange(
            tariffCommodity,
            { origin: tariffOrigin, destination: tariffDestination },
            10000,
            500
        );

        setTariffResult(result);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            {/* Mode Selector */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
                <Button
                    variant={mode === 'supply-chain' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('supply-chain')}
                    className={mode === 'supply-chain' ? 'bg-glass-highlight' : ''}
                >
                    Supply Chain Simulation
                </Button>
                <Button
                    variant={mode === 'tariff' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('tariff')}
                    className={mode === 'tariff' ? 'bg-glass-highlight' : ''}
                >
                    Tariff Impact Simulator
                </Button>
            </div>

            {/* Visualization Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                    {mode === 'supply-chain' ? 'Digital Twin Supply Chain' : 'Tariff Impact Analysis'}
                </h3>
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveView('map')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2 ${activeView === 'map' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/60 hover:bg-white/10'}`}
                    >
                        <Globe size={14} /> Global Map
                    </button>
                    <button
                        onClick={() => setActiveView('network')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2 ${activeView === 'network' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-white/60 hover:bg-white/10'}`}
                    >
                        <Network size={14} /> Network Graph
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Visualization */}
                <Card className="lg:col-span-2 glass-panel border-0 bg-white/5 relative overflow-hidden flex flex-col min-h-[500px]">
                    {activeView === 'map' ? (
                        <div className="flex-1 bg-black/20 flex items-center justify-center relative group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-30 bg-cover bg-center"></div>

                            {/* Simulated Nodes on Map */}
                            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)] animate-pulse"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(192,132,252,0.6)] animate-pulse delay-700"></div>

                            {/* Connection Line */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <path d="M 25% 33% Q 50% 10% 75% 66%" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="opacity-60">
                                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="20s" repeatCount="indefinite" />
                                </path>
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#22d3ee" />
                                        <stop offset="100%" stopColor="#c084fc" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="z-10 bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center max-w-sm">
                                <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                <h3 className="text-lg font-semibold text-white mb-1">Live Digital Twin</h3>
                                <p className="text-white/60 text-sm">Monitoring {nodes.length} active nodes. AI anomaly detection is running.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 bg-black/20 flex items-center justify-center text-white/40">
                            <div className="text-center">
                                <Network size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Network Graph Visualization</p>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Right Column: Controls & Results */}
                <div className="space-y-6">
                    {mode === 'supply-chain' ? (
                        <Card className="p-6 bg-white/5 border-white/10">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Origin</label>
                                    <Select value={origin} onValueChange={setOrigin}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Shanghai">Shanghai, China</SelectItem>
                                            <SelectItem value="Beijing">Beijing, China</SelectItem>
                                            <SelectItem value="Mumbai">Mumbai, India</SelectItem>
                                            <SelectItem value="Hamburg">Hamburg, Germany</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Destination</label>
                                    <Select value={destination} onValueChange={setDestination}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Toronto">Toronto, Canada</SelectItem>
                                            <SelectItem value="Vancouver">Vancouver, Canada</SelectItem>
                                            <SelectItem value="New York">New York, USA</SelectItem>
                                            <SelectItem value="Los Angeles">Los Angeles, USA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Commodity</label>
                                    <Select value={commodity} onValueChange={setCommodity}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Textiles">Textiles</SelectItem>
                                            <SelectItem value="Machinery">Machinery</SelectItem>
                                            <SelectItem value="Food">Food Products</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Scenario</label>
                                    <Select value={scenarioType} onValueChange={setScenarioType}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="port_strike">Port Strike</SelectItem>
                                            <SelectItem value="tariff_change">Tariff Change</SelectItem>
                                            <SelectItem value="carrier_failure">Carrier Failure</SelectItem>
                                            <SelectItem value="demand_spike">Demand Spike</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button onClick={handleSupplyChainSimulation} disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2">
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                    Run Simulation
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-6 bg-white/5 border-white/10">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Commodity</label>
                                    <Select value={tariffCommodity} onValueChange={setTariffCommodity}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="steel">Steel Products</SelectItem>
                                            <SelectItem value="ev">Electric Vehicles</SelectItem>
                                            <SelectItem value="agriculture">Agricultural Products</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Origin</label>
                                    <Select value={tariffOrigin} onValueChange={setTariffOrigin}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="China">China</SelectItem>
                                            <SelectItem value="USA">USA</SelectItem>
                                            <SelectItem value="EU">European Union</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Destination</label>
                                    <Select value={tariffDestination} onValueChange={setTariffDestination}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USA">USA</SelectItem>
                                            <SelectItem value="EU">European Union</SelectItem>
                                            <SelectItem value="China">China</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button onClick={handleTariffSimulation} disabled={isLoading} className="w-full bg-pink-600 hover:bg-pink-700 mt-2">
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                    Simulate Impact
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Results Section */}
                    {mode === 'supply-chain' && simulationResult && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {simulationResult.results.map((result, idx) => (
                                <Card key={idx} className="p-4 bg-white/10 border-white/20">
                                    <h4 className="font-semibold mb-3 text-white">{result.scenarioName}</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-white/60">Cost Impact</p>
                                            <p className="text-lg font-semibold text-red-400">
                                                +{formatCurrency(result.costImpact.delta)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Timeline</p>
                                            <p className="text-lg font-semibold text-orange-400">
                                                +{result.timelineImpact.delayDays} days
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-xs text-white/60">Risk Score: <span className="text-white">{result.riskScore}/100</span></p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {mode === 'tariff' && tariffResult && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <Card className="p-4 bg-blue-900/20 border-blue-500/20">
                                <h4 className="font-semibold mb-2 text-white">{tariffResult.scenario.scenarioName}</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                    <div>
                                        <p className="text-white/60">Current</p>
                                        <p className="text-xl font-bold text-white">{tariffResult.scenario.currentTariff}%</p>
                                    </div>
                                    <div>
                                        <p className="text-white/60">Proposed</p>
                                        <p className="text-xl font-bold text-red-400">{tariffResult.scenario.proposedTariff}%</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p className="text-white/60">Addt. Cost</p>
                                    <p className="text-lg font-semibold text-red-400">+{formatCurrency(tariffResult.impact.additionalCost)}</p>
                                </div>
                            </Card>
                            {tariffResult.alternativeSourcing.length > 0 && (
                                <Card className="p-4 bg-white/5 border-white/10">
                                    <h4 className="font-semibold mb-2 text-white text-sm">Alternative Sourcing</h4>
                                    <div className="space-y-2">
                                        {tariffResult.alternativeSourcing.slice(0, 2).map((alt, idx) => (
                                            <div key={idx} className="p-2 bg-green-500/10 rounded text-xs text-white">
                                                <div className="font-medium">{alt.country}</div>
                                                <div className="text-white/60">Tariff: {alt.tariffRate}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
