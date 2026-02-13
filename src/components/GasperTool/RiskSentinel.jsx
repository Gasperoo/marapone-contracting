import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
    AlertOctagon, Globe, Zap, Truck, CloudRain,
    ShieldAlert, Activity, GitCommit, GitPullRequest, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
    getOperationalRiskMap,
    getPredictiveRiskScores,
    getLiveDisruptionFeed,
    getSupplierDependencyTree
} from './services/riskMarketService';
import './GasperTool.css';

export function RiskSentinel() {
    const riskMap = getOperationalRiskMap();
    const riskScores = getPredictiveRiskScores();
    const newsFeed = getLiveDisruptionFeed();
    const dependencyTree = getSupplierDependencyTree();

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4 md:px-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <AlertOctagon className="text-red-500" />
                        RiskSentinel™
                    </h1>
                    <p className="text-white/40 text-sm">Global Supply Chain Threat Matrix</p>
                </div>

                {/* News Ticker */}
                <div className="flex-1 max-w-2xl bg-[#0a0f1c] border border-white/10 rounded-full py-2 px-4 overflow-hidden relative">
                    <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
                        <span className="text-orange-400 font-bold text-xs">DISRUPTION ALERT:</span>
                        {newsFeed.map((news, i) => (
                            <span key={i} className="text-xs text-white/60 mx-4 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${news.type === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                                {news.message}
                                <span className="text-white/30 text-[10px] ml-1">[{news.time}]</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* 1. Global Threat Map (3D Globe Representation) */}
                <div className="col-span-12 lg:col-span-8">
                    <Card className="h-[600px] bg-[#050b14] border-white/10 p-0 relative overflow-hidden group">

                        {/* Map Background (Visual Simulation) */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_70%)]"></div>
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'invert(1) hue-rotate(180deg) brightness(0.8)'
                        }}></div>

                        {/* Interactive Points */}
                        {riskMap.map((point, i) => {
                            // Simple projection mapping
                            const top = 50 - (point.lat / 90) * 40 + '%';
                            const left = 50 + (point.lng / 180) * 40 + '%';

                            let Icon = ShieldAlert;
                            if (point.type === 'weather') Icon = CloudRain;
                            if (point.type === 'logistics') Icon = Truck;
                            if (point.type === 'cyber') Icon = Zap;
                            if (point.type === 'labor') Icon = Activity;

                            return (
                                <div key={i}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group/point cursor-pointer"
                                    style={{ top: top, left: left }}>

                                    <div className={`w-4 h-4 rounded-full animate-ping absolute opacity-75 
                                        ${point.severity === 'critical' ? 'bg-red-500' :
                                            point.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full relative z-10 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]
                                        ${point.severity === 'critical' ? 'bg-red-500' :
                                            point.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-600'}`}>
                                        <Icon size={12} className="text-white" />
                                    </div>

                                    {/* Hover Tooltip */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-red-500/30 p-3 rounded backdrop-blur-md opacity-0 group-hover/point:opacity-100 transition-opacity z-20 pointer-events-none">
                                        <div className="text-xs font-bold text-red-400 mb-1 uppercase">{point.event}</div>
                                        <div className="text-[10px] text-white/70 mb-1">{point.location}</div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* HUD Overlays */}
                        <div className="absolute top-6 left-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Globe className="text-red-400 w-5 h-5" />
                                Operational Threat Layout
                            </h3>
                            <div className="flex gap-4 mt-2 text-xs text-white/40 font-mono">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> CRITICAL</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> HIGH</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> MEDIUM</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 2. Right Column Tools */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* A. Predictive Risk Scoring */}
                    <Card className="bg-[#050b14] border-white/10 p-5">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <Activity className="text-blue-400 w-4 h-4" />
                            AI Predictive Analysis
                        </h3>
                        <div className="space-y-4">
                            {riskScores.map((score, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-3 rounded hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-white">{score.category}</span>
                                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded
                                            ${score.score > 70 ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                            {score.score}/100
                                            {score.trend === 'up' ? <ArrowUpRight size={12} /> :
                                                score.trend === 'down' ? <ArrowDownRight size={12} /> : null}
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-white/50 leading-relaxed">
                                        {score.insight}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* B. Supply Chain Dependency Graph */}
                    <Card className="h-[260px] bg-[#050b14] border-white/10 p-5 flex flex-col">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
                            <GitPullRequest className="text-purple-400 w-4 h-4" />
                            Dependency Graph
                        </h3>
                        <div className="flex-1 overflow-y-auto relative scrollbar-hide">
                            {/* Visual Tree Representation */}
                            <div className="flex flex-col gap-4 pl-2 border-l border-white/10 ml-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
                                    <span className="text-sm font-bold text-white">Marapone HQ</span>
                                </div>

                                <div className="pl-6 space-y-4 border-l border-white/10 ml-[5px]">
                                    {/* Sub-node Cluster 1 */}
                                    <div className="relative">
                                        <div className="absolute -left-[25px] top-3 w-6 hpx bg-white/10"></div>
                                        <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <GitCommit size={14} className="text-orange-400" />
                                                <span className="text-xs text-white">Foxconn (CN)</span>
                                            </div>
                                            <span className="text-[10px] text-orange-400 font-mono">RISK: 45</span>
                                        </div>
                                    </div>

                                    {/* Sub-node Cluster 2 (High Risk) */}
                                    <div className="relative">
                                        <div className="absolute -left-[25px] top-3 w-6 hpx bg-white/10"></div>
                                        <div className="bg-red-500/10 p-2 rounded border border-red-500/30 flex justify-between items-center shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                            <div className="flex items-center gap-2">
                                                <GitCommit size={14} className="text-red-400" />
                                                <span className="text-xs text-white font-medium">TSMC (TW)</span>
                                            </div>
                                            <span className="text-[10px] text-red-400 font-mono font-bold">RISK: 85</span>
                                        </div>
                                        {/* Tier-2 Supplier */}
                                        <div className="pl-6 mt-2 relative">
                                            <div className="absolute -left-[14px] top-3 w-4 hpx bg-white/10"></div>
                                            <div className="bg-white/5 p-1.5 rounded border border-white/5 flex gap-2 w-fit">
                                                <Truck size={10} className="text-blue-400" />
                                                <span className="text-[10px] text-white/60">DHL Aviation</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub-node Cluster 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[25px] top-3 w-6 hpx bg-white/10"></div>
                                        <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <GitCommit size={14} className="text-emerald-400" />
                                                <span className="text-xs text-white">Samsung (KR)</span>
                                            </div>
                                            <span className="text-[10px] text-emerald-400 font-mono">RISK: 20</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}
