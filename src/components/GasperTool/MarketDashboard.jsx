import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { getMarketData } from './services/riskMarketService';
import { simulateDelay } from '../../lib/utils';
import { TrendingUp, TrendingDown, Newspaper, Globe } from 'lucide-react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import './GasperTool.css';

export function MarketDashboard() {
    const [data, setData] = useState(null);

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
                {/* News Feed */}
                <Card className="col-span-1 lg:col-span-2 p-6 bg-white/5 border-white/10">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                        <Newspaper className="h-4 w-4" />
                        Live Trade Alerts & News
                    </h4>
                    <div className="space-y-4">
                        {data.news.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                <div className={`w-1 self-stretch rounded-full ${item.sentiment === 'negative' ? 'bg-red-500' :
                                        item.sentiment === 'positive' ? 'bg-green-500' :
                                            'bg-gray-400'
                                    }`}></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h5 className="font-medium text-sm text-white hover:text-blue-300 cursor-pointer transition-colors">{item.headline}</h5>
                                        <span className="text-xs text-white/40 whitespace-nowrap">{item.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-white/60 line-clamp-2 mb-2">
                                        {item.summary}
                                    </p>
                                    <div className="flex gap-2">
                                        {item.relatedRegions.map((region, rIdx) => (
                                            <span key={rIdx} className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                                                {region}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Mini Chart (Mock) */}
                <Card className="p-6 bg-white/5 border-white/10">
                    <h4 className="font-semibold mb-4 text-white">Spot Rate Trends (Asia-US)</h4>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { day: '1', val: 1200 }, { day: '5', val: 1250 }, { day: '10', val: 1220 },
                                { day: '15', val: 1300 }, { day: '20', val: 1280 }, { day: '25', val: 1350 }
                            ]}>
                                <Line type="monotone" dataKey="val" stroke="#8884d8" strokeWidth={2} dot={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(23, 23, 23, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-sm">
                        <p className="flex justify-between">
                            <span className="text-white/60">Current Avg:</span>
                            <span className="font-bold text-white">$1,350 / FEU</span>
                        </p>
                        <p className="flex justify-between mt-1">
                            <span className="text-white/60">WoW Change:</span>
                            <span className="text-green-400">+4.2%</span>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
