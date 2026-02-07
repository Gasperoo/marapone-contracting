import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { Droplets, Coins, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

export function CommodityTicker() {
    // Note: Most commodity APIs are paid or have very strict limits.
    // For this demo, we'll use a mix of static data with random small fluctuations to simulate "live" market behavior
    // or fetch from a free source if one is stable. 
    // Given the constraints, we will simulate a "Live Feed" based on base market values.

    const [commodities, setCommodities] = useState([
        { name: 'Brent Crude', symbol: 'OIL', price: 82.40, change: 1.2, unit: 'USD/bbl', icon: Droplets, color: 'text-amber-500' },
        { name: 'Gold Spot', symbol: 'XAU', price: 2035.50, change: -0.5, unit: 'USD/oz', icon: Coins, color: 'text-yellow-400' },
        { name: 'Natural Gas', symbol: 'NG', price: 2.85, change: 3.1, unit: 'USD/MMBtu', icon: Droplets, color: 'text-blue-400' },
    ]);

    const simulateLiveMarket = () => {
        setCommodities(prev => prev.map(c => {
            const volatility = 0.002; // 0.2% fluctuation
            const change = (Math.random() * volatility * 2) - volatility;
            const newPrice = c.price * (1 + change);
            return {
                ...c,
                price: newPrice,
                change: c.change + (change * 100)
            };
        }));
    };

    useEffect(() => {
        const interval = setInterval(simulateLiveMarket, 3000); // Update every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="p-5 glass-panel border-0 bg-white/5 relative overflow-hidden h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <TrendingUp size={18} className="text-green-400" />
                    Commodities
                </h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Live</span>
                </div>
            </div>

            <div className="space-y-4">
                {commodities.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full bg-white/5 ${item.color}`}>
                                <item.icon size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{item.name}</div>
                                <div className="text-[10px] text-white/50">{item.unit}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-mono font-bold text-white">
                                {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className={`text-xs flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {Math.abs(item.change).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-[10px] text-white/30 text-center">
                Simulated Live Feed
            </div>
        </Card>
    );
}
