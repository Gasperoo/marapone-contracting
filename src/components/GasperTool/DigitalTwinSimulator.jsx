import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Loader2, Play, AlertTriangle } from 'lucide-react';
import { runSupplyChainSimulation, simulateTariffChange } from './services/simulationService';
import { formatCurrency, formatPercentage, simulateDelay } from '../../lib/utils';
import './GasperTool.css';

export function DigitalTwinSimulator() {
    const [mode, setMode] = useState('supply-chain');
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

            {mode === 'supply-chain' ? (
                <Card className="p-6 bg-white/5 border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white">Digital Twin Supply Chain Simulator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                            <label className="text-sm font-medium text-white/80 mb-2 block">Scenario Type</label>
                            <Select value={scenarioType} onValueChange={setScenarioType}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="port_strike">Port Strike</SelectItem>
                                    <SelectItem value="tariff_change">Tariff Change</SelectItem>
                                    <SelectItem value="carrier_failure">Carrier Failure</SelectItem>
                                    <SelectItem value="demand_spike">Demand Spike</SelectItem>
                                    <SelectItem value="weather_event">Weather Event</SelectItem>
                                    <SelectItem value="customs_delay">Customs Delay</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button onClick={handleSupplyChainSimulation} disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        Run Simulation
                    </Button>

                    {simulationResult && (
                        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {simulationResult.results.map((result, idx) => (
                                <Card key={idx} className="p-4 bg-white/10 border-white/20">
                                    <h4 className="font-semibold mb-3 text-white">{result.scenarioName}</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-white/60">Cost Impact</p>
                                            <p className="text-lg font-semibold text-red-400">
                                                +{formatCurrency(result.costImpact.delta)} ({formatPercentage(result.costImpact.deltaPercentage)})
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Timeline Impact</p>
                                            <p className="text-lg font-semibold text-orange-400">
                                                +{result.timelineImpact.delayDays} days
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Risk Score</p>
                                            <p className="text-lg font-semibold text-white">{result.riskScore}/100</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Confidence</p>
                                            <p className="text-lg font-semibold text-white">{formatPercentage(result.confidence * 100)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm font-medium mb-2 text-white">Mitigation Strategies:</p>
                                        <ul className="text-sm space-y-1">
                                            {result.mitigations.map((m, i) => (
                                                <li key={i} className="flex items-start gap-2 text-white/80">
                                                    <span className="text-green-400">•</span>
                                                    <span>{m}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </Card>
            ) : (
                <Card className="p-6 bg-white/5 border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white">Tariff Impact Simulator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="text-sm font-medium text-white/80 mb-2 block">Commodity</label>
                            <Select value={tariffCommodity} onValueChange={setTariffCommodity}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="steel">Steel Products</SelectItem>
                                    <SelectItem value="ev">Electric Vehicles</SelectItem>
                                    <SelectItem value="agriculture">Agricultural Products</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
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
                                    <SelectItem value="Mexico">Mexico</SelectItem>
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
                                    <SelectItem value="Canada">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button onClick={handleTariffSimulation} disabled={isLoading} className="w-full bg-pink-600 hover:bg-pink-700">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        Simulate Tariff Impact
                    </Button>

                    {tariffResult && (
                        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <Card className="p-4 bg-blue-900/20 border-blue-500/20">
                                <h4 className="font-semibold mb-2 text-white">{tariffResult.scenario.scenarioName}</h4>
                                <p className="text-sm text-white/60 mb-4">
                                    {tariffResult.scenario.commodity} • {tariffResult.scenario.route.origin} → {tariffResult.scenario.route.destination}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-white/60">Current Tariff</p>
                                        <p className="text-2xl font-bold text-white">{tariffResult.scenario.currentTariff}%</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/60">Proposed Tariff</p>
                                        <p className="text-2xl font-bold text-red-400">{tariffResult.scenario.proposedTariff}%</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 bg-white/5 border-white/10">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                                    Cost Impact
                                </h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-white/60">Additional Cost per Unit</p>
                                        <p className="text-lg font-semibold text-red-400">
                                            +{formatCurrency(tariffResult.impact.additionalCost)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white/60">Percentage Increase</p>
                                        <p className="text-lg font-semibold text-red-400">
                                            +{formatPercentage(tariffResult.impact.percentageIncrease)}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {tariffResult.alternativeSourcing.length > 0 && (
                                <Card className="p-4 bg-white/5 border-white/10">
                                    <h4 className="font-semibold mb-3 text-white">Alternative Sourcing Options</h4>
                                    <div className="space-y-3">
                                        {tariffResult.alternativeSourcing.map((alt, idx) => (
                                            <div key={idx} className="p-3 bg-green-500/10 rounded-lg text-white">
                                                <p className="font-medium">{alt.country}</p>
                                                <p className="text-sm text-white/60">{alt.tradeAgreement}</p>
                                                <p className="text-sm mt-1">
                                                    Tariff: {alt.tariffRate}% • Potential Savings: {formatCurrency(alt.savings)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}

                            <Card className="p-4 bg-white/5 border-white/10">
                                <h4 className="font-semibold mb-2 text-white">Recommendations</h4>
                                <ul className="text-sm space-y-1">
                                    {tariffResult.recommendations.map((rec, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-white/80">
                                            <span className="text-blue-400">•</span>
                                            <span>{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
