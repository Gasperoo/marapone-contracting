import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { getMarketData } from './services/riskMarketService';
import { simulateDelay } from '../../lib/utils';
import { TrendingUp, TrendingDown, Newspaper, Globe } from 'lucide-react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import './GasperTool.css';

export function MarketDashboard() {
    const [data, setData] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState('asia_us_west');

    useEffect(() => {
        // Simulate loading
        const load = async () => {
            await simulateDelay(500);
            setData(getMarketData());
        };
        load();
    }, []);

    if (!data) return (
        <div className="flex items-center justify-center p-12 text-white/60">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
            Loading Market Intelligence...
        </div>
    );

    const currentSpot = data.spotRates[selectedRoute];

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-blue-400" />
                Global Market Intelligence
            </h3>

            {/* Currency & Commodities Ticker */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.currencies.map((curr, idx) => (
                    <Card key={idx} className="p-4 flex items-center justify-between hover:bg-white/10 transition-colors bg-white/5 border-white/10">
                        <div>
                            <p className="text-sm font-medium text-white/60">{curr.pair}</p>
                            <p className="text-2xl font-bold text-white">{curr.currentRate.toFixed(4)}</p>
                        </div>
                        <div className={`text-right ${curr.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            <div className="flex items-center justify-end gap-1">
                                {curr.change24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                <span className="font-bold">{Math.abs(curr.change24h)}%</span>
                            </div>
                            <p className="text-xs opacity-80 text-white/60">{curr.forecast}</p>
                        </div>
                    </Card>
                ))}

                {/* Highlight one commodity */}
                <Card className="p-4 flex items-center justify-between hover:bg-amber-500/10 transition-colors bg-amber-500/5 border-amber-500/20">
                    <div>
                        <p className="text-sm font-medium text-amber-200">{data.commodities[0].name}</p>
                        <p className="text-2xl font-bold text-amber-100">${data.commodities[0].price}</p>
                    </div>
                    <div className="text-right text-red-400">
                        <div className="flex items-center justify-end gap-1">
                            <TrendingDown className="h-4 w-4" />
                            <span className="font-bold">{data.commodities[0].changePercentage}%</span>
                        </div>
                        <p className="text-xs text-amber-200 uppercase">{data.commodities[0].unit}</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* News Feed - Now Scrollable */}
                <Card className="col-span-1 lg:col-span-2 p-6 bg-white/5 border-white/10 flex flex-col max-h-[500px]">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-white sticky top-0 bg-transparent z-10">
                        <Newspaper className="h-4 w-4" />
                        Live Trade Alerts & News
                    </h4>
                    <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
                        {data.news.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                                <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${item.sentiment === 'negative' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                    item.sentiment === 'positive' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                        'bg-gray-400'
                                    }`}></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h5 className="font-medium text-sm text-white group-hover:text-blue-300 cursor-pointer transition-colors truncate pr-2">{item.headline}</h5>
                                        <span className="text-xs text-white/40 whitespace-nowrap flex-shrink-0">{item.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-white/60 line-clamp-2 mb-2">
                                        {item.summary}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-white/60 border border-white/5">
                                            {item.source}
                                        </span>
                                        {item.relatedRegions.map((region, rIdx) => (
                                            <span key={rIdx} className="text-[10px] px-1.5 py-0.5 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                                                {region}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Spot Rate Trends - With Route Selector */}
                <Card className="p-6 bg-white/5 border-white/10 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-semibold text-white">Spot Rate Trends</h4>
                        <select
                            value={selectedRoute}
                            onChange={(e) => setSelectedRoute(e.target.value)}
                            className="bg-black/40 border border-white/20 text-xs text-white rounded px-2 py-1 outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="asia_us_west">Asia &rarr; US West</option>
                            <option value="asia_europe">Asia &rarr; N. Europe</option>
                            <option value="trans_atlantic">Europe &rarr; US East</option>
                        </select>
                    </div>

                    <div className="h-[200px] w-full mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentSpot.history}>
                                <Line
                                    type="monotone"
                                    dataKey="val"
                                    stroke="#5227FF"
                                    strokeWidth={3}
                                    dot={{ fill: '#5227FF', r: 4, strokeWidth: 0 }}
                                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                                />
                                <Tooltip
                                    cursor={{ stroke: 'white', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                    formatter={(value) => [`$${value}`, 'Rate']}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10 text-sm">
                        <div className="flex justify-between items-baseline mb-2">
                            <span className="text-white/60 text-xs uppercase tracking-wider">{currentSpot.label}</span>
                        </div>
                        <p className="flex justify-between items-end">
                            <span className="text-white/60">Current Rate:</span>
                            <span className="font-bold text-2xl text-white">${currentSpot.current} <span className="text-sm font-normal text-white/40">/ {currentSpot.unit}</span></span>
                        </p>
                        <p className="flex justify-between mt-2">
                            <span className="text-white/60">WoW Change:</span>
                            <span className={`font-medium ${currentSpot.change.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
                                {currentSpot.change}
                                {/* Red is bad for shipping costs usually, green is good (lower), but lets stick to standard red=down green=up logic or red=expensive? 
                                    Actually in logistics high rates = bad for shippers. 
                                    Let's keep green = + and red = - for consistency with charts, OR stick to financial logic. 
                                    Let's use standard green for + and red for - for now, or adapt based on user context.
                                    Actually line 43 used green for >= 0. Let's keep that consistency.
                                */}
                            </span>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
