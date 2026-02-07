import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { analyzeShipmentProfitability, generatePerformanceScorecard, trackQuoteEngagement, getConversionMetrics } from './services/analyticsService';
import { formatCurrency, formatPercentage } from '../../lib/utils';
import './GasperTool.css';

export function ProfitabilityAnalyzer() {
    const [view, setView] = useState('profitability');
    const [selectedShipment, setSelectedShipment] = useState('SHP-2024-001');
    const [selectedVendor, setSelectedVendor] = useState('DHL');

    // Get mock data
    const profitability = analyzeShipmentProfitability(selectedShipment);
    const performance = generatePerformanceScorecard('vendor-1', selectedVendor, 'carrier');
    const quote = trackQuoteEngagement('quote-1');
    const metrics = getConversionMetrics([quote, trackQuoteEngagement('quote-2'), trackQuoteEngagement('quote-3')]);

    // Mock trend data for charts
    const costTrendData = [
        { month: 'Jan', quoted: 3500, actual: 3650 },
        { month: 'Feb', quoted: 3600, actual: 3820 },
        { month: 'Mar', quoted: 3550, actual: 3700 },
        { month: 'Apr', quoted: 3700, actual: 3950 },
    ];

    return (
        <div className="space-y-6">
            {/* View Selector */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'profitability' ? 'bg-glass-highlight text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    onClick={() => setView('profitability')}
                >
                    Profitability
                </button>
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'performance' ? 'bg-glass-highlight text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    onClick={() => setView('performance')}
                >
                    Performance
                </button>
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'quotes' ? 'bg-glass-highlight text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    onClick={() => setView('quotes')}
                >
                    Quote Tracker
                </button>
            </div>

            {view === 'profitability' && (
                <div className="space-y-4">
                    <Card className="p-6 bg-white/5 border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Shipment Cost Analysis</h3>
                            <div className="w-48">
                                <Select value={selectedShipment} onValueChange={setSelectedShipment}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SHP-2024-001">SHP-2024-001</SelectItem>
                                        <SelectItem value="SHP-2024-002">SHP-2024-002</SelectItem>
                                        <SelectItem value="SHP-2024-003">SHP-2024-003</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-blue-500/10 rounded-lg">
                                <p className="text-sm text-blue-200">Quoted Total</p>
                                <p className="text-2xl font-bold text-white">{formatCurrency(profitability.quoted.total)}</p>
                            </div>
                            <div className="p-4 bg-orange-500/10 rounded-lg">
                                <p className="text-sm text-orange-200">Actual Total</p>
                                <p className="text-2xl font-bold text-white">{formatCurrency(profitability.actual.total)}</p>
                            </div>
                            <div className={`p-4 rounded-lg ${profitability.variance.total > 0 ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                                <p className="text-sm text-white/60">Variance</p>
                                <p className={`text-2xl font-bold flex items-center gap-1 ${profitability.variance.total > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    {profitability.variance.total > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                                    {formatCurrency(Math.abs(profitability.variance.total))}
                                </p>
                            </div>
                            <div className="p-4 bg-green-500/10 rounded-lg">
                                <p className="text-sm text-green-200">Profit Margin</p>
                                <p className="text-2xl font-bold text-white">{formatPercentage(profitability.profitability.margin)}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-white">Cost Breakdown</h4>
                            {['freight', 'duties', 'taxes', 'fees'].map((category) => (
                                <div key={category} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                                    <span className="capitalize font-medium text-white">{category}</span>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-white/60">
                                            Quoted: {formatCurrency(profitability.quoted[category])}
                                        </span>
                                        <span className="font-medium text-white">
                                            Actual: {formatCurrency(profitability.actual[category])}
                                        </span>
                                        <span className={profitability.variance[category] > 0 ? 'text-red-400' : 'text-green-400'}>
                                            {profitability.variance[category] > 0 ? '+' : ''}{formatCurrency(profitability.variance[category])}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6 bg-white/5 border-white/10">
                        <h4 className="font-semibold mb-4 text-white">Cost Trend Analysis</h4>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={costTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(23, 23, 23, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="quoted" stroke="#3b82f6" name="Quoted" />
                                    <Line type="monotone" dataKey="actual" stroke="#f97316" name="Actual" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            )}

            {view === 'performance' && (
                <div className="space-y-4">
                    <Card className="p-6 bg-white/5 border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Vendor Performance Scorecard</h3>
                            <div className="w-48">
                                <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DHL">DHL Express</SelectItem>
                                        <SelectItem value="FedEx">FedEx</SelectItem>
                                        <SelectItem value="Maersk">Maersk</SelectItem>
                                        <SelectItem value="UPS">UPS</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-sm text-white/60">On-Time %</p>
                                <p className="text-3xl font-bold text-white">{formatPercentage(performance.vendor.metrics.onTimePercentage, 0)}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-sm text-white/60">Reliability Score</p>
                                <p className="text-3xl font-bold text-white">{performance.vendor.metrics.reliabilityScore.toFixed(0)}/100</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-sm text-white/60">Ranking</p>
                                <p className="text-3xl font-bold text-white">#{performance.ranking} of {performance.totalVendors}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="p-4 bg-green-500/10 border-green-500/20">
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-400">
                                    <TrendingUp className="h-4 w-4" />
                                    Strengths
                                </h4>
                                <ul className="text-sm space-y-1">
                                    {performance.strengths.map((s, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-white/80">
                                            <span className="text-green-400">✓</span>
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            <Card className="p-4 bg-orange-500/10 border-orange-500/20">
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-orange-400">
                                    <AlertCircle className="h-4 w-4" />
                                    Areas for Improvement
                                </h4>
                                <ul className="text-sm space-y-1">
                                    {performance.weaknesses.map((w, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-white/80">
                                            <span className="text-orange-400">!</span>
                                            <span>{w}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        {performance.alternatives && (
                            <Card className="p-4 mt-4 bg-white/5 border-white/10">
                                <h4 className="font-semibold mb-3 text-white">Alternative Vendors</h4>
                                <div className="space-y-2">
                                    {performance.alternatives.map((alt, idx) => (
                                        <div key={idx} className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                                            <p className="font-medium text-white">{alt.vendorName}</p>
                                            <p className="text-sm text-white/60">{alt.reason}</p>
                                            {alt.estimatedSavings && (
                                                <p className="text-sm text-green-400 mt-1">
                                                    Potential savings: {formatCurrency(alt.estimatedSavings)}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </Card>
                </div>
            )}

            {view === 'quotes' && (
                <div className="space-y-4">
                    <Card className="p-6 bg-white/5 border-white/10">
                        <h3 className="text-xl font-semibold mb-4 text-white">Quote Follow-Up Tracker</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-sm text-white/60">Open Rate</p>
                                <p className="text-2xl font-bold text-white">{formatPercentage(metrics.openRate)}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-sm text-white/60">Click Rate</p>
                                <p className="text-2xl font-bold text-white">{formatPercentage(metrics.clickRate)}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <p className="text-sm text-white/60">Reply Rate</p>
                                <p className="text-2xl font-bold text-white">{formatPercentage(metrics.replyRate)}</p>
                            </div>
                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                <p className="text-sm text-green-200">Conversion Rate</p>
                                <p className="text-2xl font-bold text-white">{formatPercentage(metrics.conversionRate)}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-white">Recent Quotes</h4>
                            {[quote, trackQuoteEngagement('quote-2'), trackQuoteEngagement('quote-3')].map((q, idx) => (
                                <Card key={idx} className="p-4 bg-white/5 border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="font-medium text-white">{q.customerName}</p>
                                            <p className="text-sm text-white/60">{q.quoteId}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-white">{formatCurrency(q.quotedAmount)}</p>
                                            <span className={`text-xs px-2 py-1 rounded ${q.status === 'engaged' ? 'bg-green-500/20 text-green-300' :
                                                    q.status === 'opened' ? 'bg-blue-500/20 text-blue-300' :
                                                        'bg-white/10 text-white/60'
                                                }`}>
                                                {q.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/60">
                                        <span>Opened: {q.opened ? '✓' : '✗'}</span>
                                        <span>Clicked: {q.clicked ? '✓' : '✗'}</span>
                                        <span>Replied: {q.replied ? '✓' : '✗'}</span>
                                        <span className="ml-auto">Lead Score: {q.leadScore}/100</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
