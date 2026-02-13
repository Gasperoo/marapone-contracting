import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Loader2, Star, Truck, ArrowRightLeft, Plane, Ship, Train, Zap, DollarSign, Calendar, Info, MapPin, Clock, Anchor, Activity } from 'lucide-react';
import { compareCarrierRates, estimateReturnCost } from './services/rateOptimizationService';
import { formatCurrency, formatPercentage, simulateDelay } from '../../lib/utils';
import './GasperTool.css';

const RateCard = ({ rate, origin, destination }) => {
    const getModeIcon = (mode) => {
        switch (mode) {
            case 'air': return Plane;
            case 'ocean': return Ship;
            case 'rail': return Train;
            default: return Truck;
        }
    };

    const Icon = getModeIcon(rate.mode);

    return (
        <Card className="bg-[#050b14] border-white/10 overflow-hidden group hover:border-blue-500/30 transition-all duration-500 shadow-xl relative">

            {/* Carrier Identity HUD */}
            <div className="flex flex-col md:flex-row p-6 md:p-8 gap-8 items-start md:items-center relative z-10">
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                        <Icon size={32} className="text-white/40 group-hover:text-blue-400" />
                    </div>
                </div>

                <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black text-white tracking-tight">{rate.carrier}</h3>
                        <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded uppercase">
                            {rate.service}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold uppercase tracking-wider">
                            <Clock size={14} /> {rate.transitDays} Days
                        </div>
                        <div className="h-3 w-px bg-white/10"></div>
                        <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold uppercase tracking-wider">
                            <Anchor size={14} /> {rate.vessel || 'Direct Routing'}
                        </div>
                        <div className="h-3 w-px bg-white/10"></div>
                        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                            <Zap size={14} /> {Math.round(rate.reliability * 100)}% Reliability
                        </div>
                    </div>
                </div>

                {/* Price & Book HUD */}
                <div className="text-right space-y-3 min-w-[200px]">
                    <div className="space-y-0.5">
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Total Estimated Freight</p>
                        <div className="text-4xl font-black text-white tabular-nums">${rate.price.toLocaleString()}</div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs py-6 rounded-xl shadow-lg shadow-blue-500/20">
                        Book Space
                    </Button>
                </div>
            </div>

            {/* Dynamic Route Arc Visualizer */}
            <div className="h-32 bg-black/40 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                {/* Visual Arc */}
                <svg className="w-full h-full px-20 overflow-visible" viewBox="0 0 800 120">
                    <defs>
                        <linearGradient id={`grad-${rate.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                        </linearGradient>
                    </defs>

                    {/* The Path */}
                    <path
                        d="M 50 100 Q 400 -20 750 100"
                        fill="none"
                        stroke={`url(#grad-${rate.id})`}
                        strokeWidth="2"
                        strokeDasharray="8,8"
                        className="animate-[dash_30s_linear_infinite]"
                    />

                    {/* Origin/Dest Nodes */}
                    <g transform="translate(50, 100)">
                        <circle r="6" fill="#050b14" stroke="#3b82f6" strokeWidth="2" />
                        <text y="20" textAnchor="middle" className="fill-white/40 text-[10px] font-black uppercase tracking-widest">{origin}</text>
                    </g>
                    <g transform="translate(750, 100)">
                        <circle r="6" fill="#3b82f6" className="animate-pulse" />
                        <text y="20" textAnchor="middle" className="fill-blue-400 text-[10px] font-black uppercase tracking-widest">{destination}</text>
                    </g>
                </svg>

                {/* Metadata HUD Overlays */}
                <div className="absolute top-4 left-8 text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Telemetry Link: Active</div>
                <div className="absolute bottom-4 right-8 text-[9px] font-mono text-emerald-500/40 uppercase tracking-[0.2em]">Fuel Surcharge: {rate.history.percent}% Flux</div>
            </div>

            {/* AI Insight Bar */}
            <div className="bg-white/5 px-8 py-3 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-2">
                    <Activity size={12} className="text-yellow-500" />
                    <span className="text-[10px] text-white/60 font-medium">AI INSIGHT: {rate.features.join(' • ')}</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20"></div>
                </div>
            </div>
        </Card>
    );
};

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
                                {/* Visual Route Map */}
                                <div className="h-64 w-full rounded-3xl bg-[#050b14] border border-white/10 relative overflow-hidden flex items-center justify-center group shadow-2xl">
                                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                    <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[2px]"></div>

                                    <div className="relative z-10 flex items-center gap-12 w-full max-w-4xl px-20">
                                        <div className="flex flex-col items-center">
                                            <div className="h-4 w-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] border-4 border-white/20"></div>
                                            <span className="mt-4 text-xs font-black text-white uppercase tracking-[0.3em]">{origin}</span>
                                        </div>

                                        <div className="flex-1 relative h-32 flex items-center">
                                            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 100">
                                                <path
                                                    d="M 0 50 Q 200 -20 400 50"
                                                    fill="none"
                                                    stroke="#3b82f6"
                                                    strokeWidth="2"
                                                    strokeDasharray="4,4"
                                                    className="opacity-40"
                                                />
                                                <circle r="4" fill="#3b82f6">
                                                    <animateMotion
                                                        path="M 0 50 Q 200 -20 400 50"
                                                        dur="3s"
                                                        repeatCount="indefinite"
                                                    />
                                                </circle>
                                            </svg>
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#050b14] border border-white/10 px-4 py-1 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                                Active Corridor Analysis
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="h-4 w-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] border-4 border-blue-500/20"></div>
                                            <span className="mt-4 text-xs font-black text-white uppercase tracking-[0.3em]">{destination}</span>
                                        </div>
                                    </div>

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5 opacity-50"></div>
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
                                <div className="space-y-6">
                                    {filteredRates?.map((rate) => (
                                        <RateCard key={rate.id} rate={rate} origin={origin} destination={destination} />
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
