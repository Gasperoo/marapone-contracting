import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Loader2, Star, Truck, ArrowRightLeft, Plane, Ship, Train, Zap, DollarSign, Calendar, Info, MapPin } from 'lucide-react';
import { compareCarrierRates, estimateReturnCost } from './services/rateOptimizationService';
import { formatCurrency, formatPercentage, simulateDelay } from '../../lib/utils';
import './GasperTool.css';

export function RateComparison() {
    const [mode, setMode] = useState('forward');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [viewMode, setViewMode] = useState('all'); // all, ocean, air, rail
    const [sortBy, setSortBy] = useState('cheapest'); // cheapest, fastest, greenest

    // Form states
    const [origin, setOrigin] = useState('Shanghai');
    const [destination, setDestination] = useState('Toronto');
    const [weight, setWeight] = useState('100');

    // Return form states
    const [returnReason, setReturnReason] = useState('defective');
    const [productValue, setProductValue] = useState('500');
    const [returnResult, setReturnResult] = useState(null);

    const handleCompare = async () => {
        setIsLoading(true);
        await simulateDelay(1500);

        const request = {
            origin,
            destination,
            weight: parseFloat(weight),
            serviceType: 'all', // Get all modes
            preferences: {
                prioritizeSpeed: false,
                prioritizeCost: true,
            },
        };

        const comparison = compareCarrierRates(request);
        setResult(comparison);
        setIsLoading(false);
    };

    const handleReturnEstimate = async () => {
        setIsLoading(true);
        await simulateDelay(1200);

        const request = {
            origin: destination,
            destination: origin,
            weight: parseFloat(weight),
            returnReason,
            value: parseFloat(productValue),
        };

        const estimate = estimateReturnCost(request);
        setReturnResult(estimate);
        setIsLoading(false);
    };

    // Filter and sort rates
    const filteredRates = result?.rates.filter(r => viewMode === 'all' || r.mode === viewMode)
        .sort((a, b) => {
            if (sortBy === 'cheapest') return a.price - b.price;
            if (sortBy === 'fastest') return a.transitDays - b.transitDays;
            if (sortBy === 'greenest') return a.emissions - b.emissions;
            return 0;
        });

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Mode Switcher */}
            <div className="flex justify-center mb-8">
                <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
                    <Button
                        variant={mode === 'forward' ? 'default' : 'ghost'}
                        onClick={() => setMode('forward')}
                        className={`px-6 rounded-lg transition-all ${mode === 'forward' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-white/60 hover:text-white'}`}
                    >
                        <Truck className="h-4 w-4 mr-2" />
                        Rate Comparison
                    </Button>
                    <Button
                        variant={mode === 'reverse' ? 'default' : 'ghost'}
                        onClick={() => setMode('reverse')}
                        className={`px-6 rounded-lg transition-all ${mode === 'reverse' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25' : 'text-white/60 hover:text-white'}`}
                    >
                        <ArrowRightLeft className="h-4 w-4 mr-2" />
                        Reverse Logistics
                    </Button>
                </div>
            </div>

            {mode === 'forward' ? (
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Left Panel: Search */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 bg-[#0f172a] border-white/10 shadow-xl">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-blue-400" />
                                Route Details
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Origin</label>
                                    <Select value={origin} onValueChange={setOrigin}>
                                        <SelectTrigger className="bg-white/5 border-white/10 h-10"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Shanghai">Shanghai, China</SelectItem>
                                            <SelectItem value="New York">New York, USA</SelectItem>
                                            <SelectItem value="London">London, UK</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Destination</label>
                                    <Select value={destination} onValueChange={setDestination}>
                                        <SelectTrigger className="bg-white/5 border-white/10 h-10"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Toronto">Toronto, Canada</SelectItem>
                                            <SelectItem value="Vancouver">Vancouver, Canada</SelectItem>
                                            <SelectItem value="Montreal">Montreal, Canada</SelectItem>
                                            <SelectItem value="Los Angeles">Los Angeles, USA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Weight (kg)</label>
                                    <Input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="bg-white/5 border-white/10 h-10"
                                    />
                                </div>
                                <Button
                                    onClick={handleCompare}
                                    disabled={isLoading}
                                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20"
                                >
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : 'Find Best Rates'}
                                </Button>
                            </div>
                        </Card>

                        {/* Smart Insight Card */}
                        {result && (
                            <Card className="p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-full text-green-400 mt-1">
                                        <Zap size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-400 text-sm mb-1">Gasper AI Insight</h4>
                                        <p className="text-sm text-white/80 leading-relaxed">
                                            {result.recommendation.insight}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Right Panel: Results */}
                    <div className="lg:col-span-3 space-y-6">
                        {result ? (
                            <div className="space-y-6">
                                {/* Visual Route Map (Placeholder for now, could be Google Maps / Leaflet) */}
                                <div className="h-48 w-full rounded-2xl bg-[#0f172a] border border-white/10 relative overflow-hidden flex items-center justify-center group">
                                    {/* Simple SVG Route Visualization */}
                                    <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale"></div>
                                    <div className="relative z-10 flex items-center gap-8 w-full max-w-2xl px-12">
                                        <div className="flex flex-col items-center">
                                            <div className="h-4 w-4 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"></div>
                                            <span className="mt-2 text-sm font-bold text-white">{origin}</span>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-white/10 via-blue-500 to-white/10 relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-2 text-xs text-blue-400 font-mono">
                                                {origin === 'Shanghai' ? (destination.includes('Canada') ? '11,000 km' : '10,500 km') : 'Distance Calc...'}
                                            </div>
                                            <Plane className="absolute top-1/2 left-1/3 -translate-y-1/2 -mt-3 text-white/50 animate-pulse" size={16} />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="h-4 w-4 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
                                            <span className="mt-2 text-sm font-bold text-white">{destination}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Controls: Tabs & Sort */}
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                                        {[
                                            { id: 'all', icon: Truck, label: 'All Modes' },
                                            { id: 'ocean', icon: Ship, label: 'Sea' },
                                            { id: 'air', icon: Plane, label: 'Air' },
                                            { id: 'rail', icon: Train, label: 'Rail' },
                                        ].map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setViewMode(tab.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === tab.id ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'
                                                    }`}
                                            >
                                                <tab.icon size={16} />
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-white/40">Sort by:</span>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="bg-transparent text-white font-medium border-none focus:ring-0 cursor-pointer"
                                        >
                                            <option value="cheapest" className="bg-[#0f172a]">Lowest Price</option>
                                            <option value="fastest" className="bg-[#0f172a]">Fastest Time</option>
                                            <option value="greenest" className="bg-[#0f172a]">Lowest CO2</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Rate Cards */}
                                <div className="space-y-4">
                                    {filteredRates?.map((rate) => (
                                        <Card key={rate.id} className="group overflow-hidden bg-white/5 border-white/10 hover:border-blue-500/50 transition-all duration-300">
                                            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                                                {/* Carrier Info */}
                                                <div className="md:col-span-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 index flex items-center justify-center rounded-lg ${rate.mode === 'air' ? 'bg-purple-500/10 text-purple-400' :
                                                                rate.mode === 'ocean' ? 'bg-blue-500/10 text-blue-400' :
                                                                    'bg-orange-500/10 text-orange-400'
                                                            }`}>
                                                            {rate.mode === 'air' ? <Plane size={20} /> : rate.mode === 'ocean' ? <Ship size={20} /> : <Train size={20} />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white text-lg">{rate.carrier}</h4>
                                                            <p className="text-xs text-white/50 uppercase tracking-wide">{rate.service}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Route Info */}
                                                <div className="md:col-span-3">
                                                    <div className="flex items-center gap-1 text-white/80 mb-1">
                                                        <Calendar size={14} className="text-white/40" />
                                                        <span className="font-medium text-lg">{rate.transitDays} Days</span>
                                                    </div>
                                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                                        <div className="bg-green-500 h-full" style={{ width: `${rate.reliability * 100}%` }}></div>
                                                    </div>
                                                    <p className="text-xs text-white/40 mt-1">{Math.round(rate.reliability * 100)}% on-time performance</p>
                                                </div>

                                                {/* Eco & Features */}
                                                <div className="md:col-span-3 space-y-2">
                                                    <div className="flex flex-wrap gap-2">
                                                        {rate.features.map((feat, i) => (
                                                            <span key={i} className="text-[10px] px-2 py-0.5 bg-white/5 rounded border border-white/5 text-white/60">
                                                                {feat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="text-xs text-white/40 flex items-center gap-1">
                                                        <div className={`h-2 w-2 rounded-full ${rate.emissions < 500 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                                        {rate.emissions} kg CO2e
                                                    </div>
                                                </div>

                                                {/* Price & Action */}
                                                <div className="md:col-span-3 text-right">
                                                    <div className="text-2xl font-black text-white mb-1">{formatCurrency(rate.price)}</div>
                                                    <div className="text-xs text-green-400 mb-3 flex justify-end items-center gap-1">
                                                        {rate.history.trend === 'down' ? '↓' : '↑'} {rate.history.percent}% vs avg
                                                    </div>
                                                    <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white w-full border border-white/10">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Expandable Details (Always visible for demo but styled as "breakdown") */}
                                            <div className="px-6 py-4 bg-black/20 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-2 justify-end text-sm">
                                                <span className="text-white/40 font-semibold uppercase text-xs tracking-wider">Cost Breakdown:</span>
                                                {Object.entries(rate.costBreakdown).map(([key, val]) => (
                                                    <div key={key} className="flex items-center gap-2">
                                                        <span className="text-white/60 capitalize">{key.replace('_', ' ')}:</span>
                                                        <span className="text-white font-mono">{formatCurrency(val)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/10 rounded-3xl min-h-[400px]">
                                <MapPin className="h-16 w-16 mb-6 opacity-30" />
                                <h3 className="text-xl font-medium text-white/40">Enter route details to find rates</h3>
                                <p className="text-white/20 max-w-sm text-center mt-2">Compare prices across all transport modes instantly.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* Reverse Logistics (Simplifed for this update, retained functionality) */
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-white/5 border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">Reverse Logistics Estimator</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-white/80 mb-2 block">Return Reason</label>
                                <Select value={returnReason} onValueChange={setReturnReason}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="defective">Defective Product</SelectItem>
                                        <SelectItem value="wrong_item">Wrong Item Sent</SelectItem>
                                        <SelectItem value="customer_return">Customer Changed Mind</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-white/80 mb-2 block">Product Value ($)</label>
                                <Input
                                    type="number"
                                    value={productValue}
                                    onChange={(e) => setProductValue(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleReturnEstimate} disabled={isLoading} className="w-full bg-orange-600 hover:bg-orange-700">
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Estimate Return Cost'}
                            </Button>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        {returnResult ? (
                            <Card className="p-6 bg-white/5 border-white/10">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    Estimated Cost: {formatCurrency(returnResult.estimatedCost)}
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Shipping</span>
                                        <span className="text-white">{formatCurrency(returnResult.costBreakdown.shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Handling</span>
                                        <span className="text-white">{formatCurrency(returnResult.costBreakdown.handling)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Insurance</span>
                                        <span className="text-white">{formatCurrency(returnResult.costBreakdown.insurance)}</span>
                                    </div>
                                    <div className="pt-2 border-t border-white/10 flex justify-between font-bold">
                                        <span className="text-white">Total</span>
                                        <span className="text-orange-400">{formatCurrency(returnResult.estimatedCost)}</span>
                                    </div>
                                </div>
                            </Card>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-white/40 border-2 border-dashed border-white/10 rounded-lg p-8">
                                <ArrowRightLeft className="h-12 w-12 mb-4 opacity-50" />
                                <p>Calculate return shipping costs and requirements</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
