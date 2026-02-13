import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
    Leaf, Globe, Wind, Droplets, Zap,
    BarChart3, Compass, History, TreePine,
    ArrowUpRight, ArrowDownRight, CheckCircle2
} from 'lucide-react';
import {
    getGlobalHeatmapData,
    getESGScorecard,
    getGreenCorridors
} from './services/sustainabilityService';
import './GasperTool.css';

export function EcoSentinel() {
    const heatmapData = getGlobalHeatmapData();
    const scorecard = getESGScorecard();
    const greenCorridors = getGreenCorridors();

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4 md:px-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Leaf className="text-emerald-500" />
                        EcoSentinel™
                    </h1>
                    <p className="text-white/40 text-sm">Autonomous ESG Control & Carbon Intelligence</p>
                </div>

                {/* Overall Score */}
                <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl">
                    <div>
                        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Trust Index</p>
                        <p className="text-2xl font-black text-white">{scorecard.overall}<span className="text-emerald-500 text-sm">/100</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow"></div>
                        <Leaf size={20} className="text-emerald-500" />
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* 1. Global Emissions & Offset Heatmap */}
                <div className="col-span-12 lg:col-span-8">
                    <Card className="h-[550px] bg-[#05140b] border-emerald-500/10 p-0 relative overflow-hidden group">

                        {/* Map Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]"></div>
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'invert(1) sepia(1) saturate(5) hue-rotate(90deg)'
                        }}></div>

                        {/* Animated Connections (Visual Only) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <path d="M 70% 30% Q 50% 50% 30% 70%" stroke="url(#greenGrad)" strokeWidth="1" fill="transparent" className="animate-dash" />
                            <defs>
                                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Data Points */}
                        {heatmapData.map((point, i) => {
                            const top = 50 - (point.lat / 90) * 40 + '%';
                            const left = 50 + (point.lng / 180) * 40 + '%';

                            return (
                                <div key={i}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group/point cursor-pointer"
                                    style={{ top: top, left: left }}>

                                    <div className={`w-3 h-3 rounded-full animate-ping absolute opacity-75 
                                        ${point.type === 'offset' ? 'bg-blue-400' : 'bg-emerald-500'}`}>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full relative z-10 flex items-center justify-center border border-white/20
                                        ${point.type === 'offset' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`}>
                                        {point.type === 'offset' ? <TreePine size={10} className="text-white" /> : <Wind size={10} className="text-white" />}
                                    </div>

                                    {/* Tooltip */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-emerald-500/30 p-3 rounded backdrop-blur-md opacity-0 group-hover/point:opacity-100 transition-opacity z-20 pointer-events-none">
                                        <div className="text-xs font-bold text-emerald-400 mb-1 uppercase">{point.location}</div>
                                        <div className="text-[10px] text-white/70">{point.status}</div>
                                        {point.type === 'offset' && <div className="mt-2 flex items-center gap-1 text-[9px] text-blue-300 font-mono"><CheckCircle2 size={10} /> VERIFIED BY ECO-LEDGER</div>}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Map HUD */}
                        <div className="absolute bottom-6 left-6 flex gap-6 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/5">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Global Intensity</p>
                                <div className="h-2 w-32 bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-emerald-500" style={{ width: '40%' }}></div>
                                    <div className="h-full bg-yellow-500" style={{ width: '30%' }}></div>
                                    <div className="h-full bg-red-500" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                            <div className="border-l border-white/10 pl-6">
                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Active Projects</p>
                                <p className="text-lg font-bold text-white">12,482 <span className="text-[10px] text-emerald-400">↑ 12%</span></p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 2. Side Panel - Intelligence & Routes */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* ESG Scorecard Levers */}
                    <Card className="bg-[#05140b] border-emerald-500/10 p-5">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <BarChart3 className="text-emerald-400 w-4 h-4" />
                            AI ESG Scorecard
                        </h3>
                        <div className="space-y-4">
                            {scorecard.levers.map((lever, i) => (
                                <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-[10px] text-white/40 font-bold uppercase">{lever.label}</p>
                                            <p className="text-lg font-bold text-white">{lever.value.toLocaleString()} <span className="text-xs text-white/40 font-normal">{lever.unit}</span></p>
                                        </div>
                                        <div className={`p-1.5 rounded-lg ${lever.trend === 'down' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                                            {lever.trend === 'down' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                                        </div>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full mt-3">
                                        <div
                                            className={`h-full rounded-full ${lever.status === 'good' ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                                            style={{ width: (lever.value / 6000 * 100) + '%' }}>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Green Corridor Navigator */}
                    <Card className="h-[275px] bg-[#05140b] border-emerald-500/10 p-5 overflow-hidden flex flex-col">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <Compass className="text-blue-400 w-4 h-4" />
                            Green Corridor Navigator
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                            {greenCorridors.map((route, i) => (
                                <div key={i} className="group cursor-pointer bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 p-3 rounded-xl transition-all">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-white">{route.route}</span>
                                        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono">-{route.reduction} CO2</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-white/40">{route.mode}</span>
                                        <span className="text-emerald-400 font-bold">RELIABILITY: {route.reliability}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>
            </div>

            {/* Bottom Section - Offset Marketplace Ledger */}
            <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-12 bg-[#05140b] border-emerald-500/10 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <History className="text-emerald-400" />
                            <div>
                                <h3 className="text-white font-bold">Offset Marketplace Ledger</h3>
                                <p className="text-white/30 text-xs font-mono uppercase">Verified Environmental Assets • Immutable Audit Trail</p>
                            </div>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                            <Leaf size={16} />
                            Purchase Offset Credits
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Amazon Rainforest Protection', id: 'EP-99212', impact: '2.4M Tons', type: 'Forestry', region: 'Brazil' },
                            { name: 'Sahara Solar Initiative', id: 'EP-88123', impact: '1.2M Tons', type: 'Renewable', region: 'Morocco' },
                            { name: 'Baltic Wind Array VII', id: 'EP-44501', impact: '850K Tons', type: 'Wind', region: 'Denmark' }
                        ].map((project, i) => (
                            <div key={i} className="relative p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <TreePine size={64} className="text-emerald-400" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] text-emerald-400 font-mono mb-1">{project.type} • {project.id}</p>
                                    <h4 className="text-white font-bold mb-4">{project.name}</h4>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase">Lifetime Impact</p>
                                            <p className="text-lg font-black text-white">{project.impact}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-white/40 uppercase">Region</p>
                                            <p className="text-xs font-bold text-white">{project.region}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
