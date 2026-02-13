import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import {
    Search, Zap, TrendingUp, AlertTriangle, Leaf, Globe,
    Activity, MessageSquare, ChevronRight, BarChart3
} from 'lucide-react';
import { Card } from '../ui/Card';
import {
    getPredictiveSpendData,
    getCarrierHologramData,
    getSustainabilityMetrics,
    processNLPQuery
} from './services/analyticsService';
import { formatCurrency } from '../../lib/utils';
import './GasperTool.css';

export function Analytics() {
    const [query, setQuery] = useState('');
    const [aiResponse, setAiResponse] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    // Data State
    const spendData = getPredictiveSpendData();
    const radarData = getCarrierHologramData();
    const sustainability = getSustainabilityMetrics();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsTyping(true);
        // Simulate AI thinking
        setTimeout(() => {
            const response = processNLPQuery(query);
            setAiResponse(response);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4 md:px-6">

            {/* 1. Header & NLP Query Interface */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <BarChart3 className="text-purple-400" />
                        Predictive Analytics
                    </h1>
                    <p className="text-white/40 text-sm">AI-Powered Supply Chain Intelligence</p>
                </div>

                {/* 'Ask Analytics' Bar */}
                <form onSubmit={handleSearch} className="w-full md:w-[600px] relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                    <div className="relative flex items-center bg-[#0a0f1c] border border-white/10 rounded-full px-4 py-2 shadow-2xl focus-within:border-purple-500/50 transition-colors">
                        <Search className="text-white/40 w-5 h-5 mr-3" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask me anything (e.g., 'Projected spend for Q4', 'Maersk reliability')"
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20 text-sm font-light"
                        />
                        {isTyping && <div className="animate-pulse text-purple-400 text-xs font-mono mr-2">ANALYZING...</div>}
                    </div>
                </form>
            </div>

            {/* AI Answer Card */}
            {aiResponse && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 bg-purple-500 h-full"></div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                <Zap className="text-purple-400 w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-purple-300 font-mono text-sm mb-1 uppercase tracking-widest">AI Insight</h3>
                                <p className="text-xl text-white font-light leading-relaxed">"{aiResponse.answer}"</p>
                                <div className="mt-3 flex items-center gap-4 text-xs text-white/40 font-mono">
                                    <span>Confidence: <span className="text-green-400">{aiResponse.confidence}%</span></span>
                                    <span>Source: {aiResponse.relatedMetric.toUpperCase()} MODEL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Main Dashboard Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* A. Predictive Spend Modeling (The Oracle) */}
                <div className="col-span-12 lg:col-span-8">
                    <Card className="h-[500px] bg-[#050b14] border-white/10 p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <TrendingUp className="text-blue-400 w-5 h-5" />
                                        Predictive Spend Model
                                    </h3>
                                    <p className="text-xs text-white/40">Historical Actuals vs. AI Forecast</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="flex items-center gap-1 text-xs text-blue-400"><div className="w-3 h-0.5 bg-blue-500"></div> Actual</span>
                                    <span className="flex items-center gap-1 text-xs text-purple-400"><div className="w-3 h-0.5 bg-purple-500 border-dashed border-t"></div> Forecast</span>
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={spendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis
                                            stroke="rgba(255,255,255,0.3)"
                                            tick={{ fontSize: 12 }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                            formatter={(value) => formatCurrency(value)}
                                        />
                                        <defs>
                                            <linearGradient id="colorSpend" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="50%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#a855f7" />
                                            </linearGradient>
                                        </defs>
                                        <Line
                                            type="monotone"
                                            dataKey="spend"
                                            stroke="url(#colorSpend)"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#050b14', strokeWidth: 2 }}
                                            activeDot={{ r: 6, fill: '#fff' }}
                                        />
                                        {/* Confidence Interval Area could be added here */}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* B. Carrier Performance Hologram */}
                <div className="col-span-12 lg:col-span-4">
                    <Card className="h-[500px] bg-[#050b14] border-white/10 p-6 relative overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Activity className="text-emerald-400 w-5 h-5" />
                                Carrier Hologram
                            </h3>
                            <div className="bg-white/5 rounded-full px-3 py-1 text-xs text-white/60 font-mono">L3 Comparison</div>
                        </div>

                        <div className="flex-1 w-full relative">
                            {/* Holographic Effect Background */}
                            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full animate-pulse"></div>

                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Top Tier (Maersk)"
                                        dataKey="A"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fill="#10b981"
                                        fillOpacity={0.3}
                                    />
                                    <Radar
                                        name="Avg Market"
                                        dataKey="B"
                                        stroke="#64748b"
                                        strokeWidth={1}
                                        fill="#64748b"
                                        fillOpacity={0.1}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/60">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Top Tier (Maersk)
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-500"></div> Market Avg
                            </div>
                        </div>
                    </Card>
                </div>

                {/* C. Sustainability Impact Tracker */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <Card className="bg-gradient-to-br from-[#050b14] to-emerald-950/20 border border-white/10 p-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                            <Leaf className="text-emerald-400 w-5 h-5" />
                            Eco-Impact Tracker
                        </h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-white">{formatCurrency(sustainability.net).replace('$', '').replace('.00', '')}</span>
                            <span className="text-sm text-white/40 mb-1">kg CO₂e Net</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-white/40">
                            <span>0 kg</span>
                            <span>Target: {sustainability.target} kg</span>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <div className="bg-emerald-500/10 px-3 py-1 rounded text-xs text-emerald-400 border border-emerald-500/20">
                                {sustainability.trend}% vs Last Month
                            </div>
                            <div className="bg-white/5 px-3 py-1 rounded text-xs text-white/60 border border-white/10">
                                {sustainability.offset} kg Offset
                            </div>
                        </div>
                    </Card>
                </div>

                {/* D. Additional KPI Cards (Placeholder for Density) */}
                <div className="col-span-12 md:col-span-3 lg:col-span-4">
                    <Card className="h-full bg-[#050b14] border-white/10 p-6 flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                            <Globe className="text-blue-400 w-6 h-6" />
                        </div>
                        <h4 className="text-white font-medium">Network Efficiency</h4>
                        <span className="text-2xl font-bold text-white mt-1">94.8%</span>
                        <span className="text-xs text-green-400 mt-1 flex items-center gap-1">
                            <TrendingUp size={12} /> +2.4%
                        </span>
                    </Card>
                </div>

                <div className="col-span-12 md:col-span-3 lg:col-span-4">
                    <Card className="h-full bg-[#050b14] border-white/10 p-6 flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                            <AlertTriangle className="text-orange-400 w-6 h-6" />
                        </div>
                        <h4 className="text-white font-medium">Risk Exposure</h4>
                        <span className="text-2xl font-bold text-white mt-1">$420k</span>
                        <span className="text-xs text-orange-400 mt-1">Medium Level</span>
                    </Card>
                </div>

            </div>
        </div>
    );
}
