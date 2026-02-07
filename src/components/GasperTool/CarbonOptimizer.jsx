import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { calculateCarbonFootprint } from './services/sustainabilityService';
import { formatCurrency, simulateDelay } from '../../lib/utils';
import { Leaf, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './GasperTool.css';

export function CarbonOptimizer() {
    const [origin, setOrigin] = useState('Shanghai');
    const [destination, setDestination] = useState('Toronto');
    const [weight, setWeight] = useState('5000');
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState(null);

    const handleCalculate = async () => {
        setIsLoading(true);
        await simulateDelay(1000);
        const result = calculateCarbonFootprint(origin, destination, parseFloat(weight));
        setReport(result);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-white/5 border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                    <Leaf className="h-5 w-5 text-green-400" />
                    Carbon Footprint Optimizer
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="text-sm font-medium text-white/80 mb-2 block">Origin</label>
                        <Select value={origin} onValueChange={setOrigin}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Shanghai">Shanghai, China</SelectItem>
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
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-white/80 mb-2 block">Weight (kg)</label>
                        <Select value={weight} onValueChange={setWeight}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="100">100 kg</SelectItem>
                                <SelectItem value="500">500 kg</SelectItem>
                                <SelectItem value="1000">1,000 kg</SelectItem>
                                <SelectItem value="5000">5,000 kg</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-end">
                        <Button onClick={handleCalculate} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Calculate Footprint'}
                        </Button>
                    </div>
                </div>

                {report && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="p-4 bg-white/5 border-white/10">
                                <p className="text-sm text-white/60">Total Emissions (Air)</p>
                                <p className="text-3xl font-bold text-white">
                                    {Math.round(report.totalEmissions).toLocaleString()} <span className="text-sm font-normal text-white/40">kg CO2e</span>
                                </p>
                            </Card>
                            <Card className="p-4 bg-green-500/10 border-green-500/20">
                                <p className="text-sm text-green-300">Potential Savings (Switch to Ocean)</p>
                                <p className="text-3xl font-bold text-green-300">
                                    -{Math.round(report.breakdownByMode['Air Freight'] - report.breakdownByMode['Ocean Freight']).toLocaleString()} <span className="text-sm font-normal">kg</span>
                                </p>
                            </Card>
                            <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                                <p className="text-sm text-blue-300">Offset Cost</p>
                                <p className="text-3xl font-bold text-blue-300">
                                    {formatCurrency(report.offsetOptions[0].totalCost)}
                                </p>
                            </Card>
                        </div>

                        {/* Chart */}
                        <div className="h-[300px] w-full">
                            <h4 className="text-sm font-medium mb-4 text-white">Emission Intensity by Mode (kg CO2e)</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={Object.entries(report.breakdownByMode).map(([name, value]) => ({ name, value }))}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip
                                        formatter={(value) => [`${Math.round(value)} kg`, 'CO2e']}
                                        contentStyle={{ backgroundColor: 'rgba(23, 23, 23, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {Object.entries(report.breakdownByMode).map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#22c55e' : '#3b82f6'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Recommendations */}
                        <div>
                            <h4 className="font-semibold mb-3 text-white">AI Recommendations for Sustainability</h4>
                            <div className="grid gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                {report.recommendations.map((rec, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-500/20 p-1 rounded-full">
                                            <Leaf className="h-4 w-4 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-white">{rec.type === 'mode_shift' ? 'Switch Transport Mode' : 'Consolidate Shipments'}</p>
                                            <p className="text-sm text-white/60">{rec.description}</p>
                                        </div>
                                        <div className="ml-auto text-green-400 font-medium text-sm">
                                            -{Math.round(rec.potentialSavingsKg)} kg CO2e
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Offset Options */}
                        <div>
                            <h4 className="font-semibold mb-3 text-white">Carbon Offset Programs</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {report.offsetOptions.map((opt, idx) => (
                                    <div key={idx} className="border border-white/10 p-4 rounded-lg flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer">
                                        <div>
                                            <p className="font-bold text-white">{opt.provider}</p>
                                            <p className="text-sm text-white/60">{opt.projectType}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-white">{formatCurrency(opt.totalCost)}</p>
                                            <Button size="sm" variant="outline" className="mt-1 h-7 border-white/20 hover:bg-white/10 text-white">Select</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
