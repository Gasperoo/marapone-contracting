import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Loader2, Star, Truck, ArrowRightLeft, ArrowRight, DollarSign, Clock } from 'lucide-react';
import { compareCarrierRates, estimateReturnCost } from './services/rateOptimizationService';
import { formatCurrency, formatPercentage, simulateDelay } from '../../lib/utils';
import './GasperTool.css';

export function RateComparison() {
    const [mode, setMode] = useState('forward');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [returnResult, setReturnResult] = useState(null);

    // Form states
    const [origin, setOrigin] = useState('Shanghai');
    const [destination, setDestination] = useState('Toronto');
    const [weight, setWeight] = useState('100');
    const [serviceType, setServiceType] = useState('air');

    // Return form states
    const [returnReason, setReturnReason] = useState('defective');
    const [productValue, setProductValue] = useState('500');

    const handleCompare = async () => {
        setIsLoading(true);
        await simulateDelay(1500); // Simulate API call

        const request = {
            origin,
            destination,
            weight: parseFloat(weight),
            serviceType,
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
            origin: destination, // Flip for return
            destination: origin,
            weight: parseFloat(weight),
            returnReason,
            value: parseFloat(productValue),
        };

        const estimate = estimateReturnCost(request);
        setReturnResult(estimate);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
                <Button
                    variant={mode === 'forward' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('forward')}
                    className={mode === 'forward' ? 'bg-glass-highlight' : ''}
                >
                    <Truck className="h-4 w-4 mr-2" />
                    Rate Comparison
                </Button>
                <Button
                    variant={mode === 'reverse' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('reverse')}
                    className={mode === 'reverse' ? 'bg-glass-highlight' : ''}
                >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Reverse Logistics
                </Button>
            </div>

            {mode === 'forward' ? (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                        <Card className="p-6 bg-white/5 border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Shipment Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Origin</label>
                                    <Select value={origin} onValueChange={setOrigin}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Shanghai">Shanghai, China</SelectItem>
                                            <SelectItem value="New York">New York, USA</SelectItem>
                                            <SelectItem value="London">London, UK</SelectItem>
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
                                            <SelectItem value="Montreal">Montreal, Canada</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Weight (kg)</label>
                                    <Input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-white/80 mb-2 block">Service Type</label>
                                    <Select value={serviceType} onValueChange={setServiceType}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="air">Air Freight</SelectItem>
                                            <SelectItem value="ocean">Ocean Freight</SelectItem>
                                            <SelectItem value="express">Express Courier</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleCompare} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Compare Rates'}
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        {result ? (
                            <div className="space-y-4">
                                {/* AI Recommendation */}
                                <Card className="p-6 border-l-4 border-l-green-500 bg-white/5 border-white/10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                                AI Recommended: {result.recommendation.carrier}
                                            </h4>
                                            <p className="text-sm text-white/60 mt-1">
                                                Based on your preference for lowest cost and reliability.
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-green-400 font-medium">
                                                Save {formatCurrency(result.recommendation.savingsVsAverage)} vs avg
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg text-sm text-white/80 mb-2">
                                        <p className="font-medium mb-1">Why this option?</p>
                                        <p>{result.recommendation.reasoning}</p>
                                    </div>
                                </Card>

                                {/* All Rates */}
                                <div className="space-y-3">
                                    {result.rates.map((rate, idx) => (
                                        <Card key={idx} className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h5 className="font-bold text-white">{rate.carrier}</h5>
                                                    <p className="text-sm text-white/60">{rate.service}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        {rate.features.slice(0, 2).map((feat, i) => (
                                                            <span key={i} className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-white/80">
                                                                {feat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-white">{formatCurrency(rate.price)}</p>
                                                    <p className="text-sm text-white/60">{rate.transitDays} days</p>
                                                    <div className="flex items-center justify-end gap-1 mt-1">
                                                        <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-green-500"
                                                                style={{ width: formatPercentage(rate.reliability * 100) }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-white/40">{Math.round(rate.reliability * 100)}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-white/40 border-2 border-dashed border-white/10 rounded-lg">
                                <Truck className="h-12 w-12 mb-4 opacity-50" />
                                <p>Enter shipment details and click Compare Rates</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
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

                                <div>
                                    <p className="text-sm font-medium text-white mb-2">Required Documents:</p>
                                    <ul className="text-sm text-white/60 space-y-1 list-disc pl-4">
                                        {returnResult.requiredDocuments.map((doc, i) => (
                                            <li key={i}>{doc}</li>
                                        ))}
                                    </ul>
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
