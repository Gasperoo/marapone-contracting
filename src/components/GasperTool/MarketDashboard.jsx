import React from 'react';
import { Card } from '../ui/Card';
import { TradingViewWidget } from './widgets/TradingViewWidget';
import { Globe, TrendingUp, Zap, Newspaper, BarChart2 } from 'lucide-react';
import { VesselTracker } from './widgets/VesselTracker'; // Reuse if needed, or keep it strict market
import './GasperTool.css';

export function MarketDashboard() {
    return (
        <div className="space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-white/90">
                    <Globe className="text-blue-500" />
                    Global Market Intelligence
                </h3>
                <span className="text-xs font-semibold text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-wider">
                    Live Institutional Data
                </span>
            </div>

            {/* Top Row: The "Money Grid" - Forex Cross Rates & Technical Sentiment */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[450px]">
                {/* 1. Forex Cross Rates (2/3 width) - The matrix of global trade */}
                <div className="xl:col-span-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0f172a] group hover:border-white/20 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-9 bg-gradient-to-r from-[#0f172a] to-transparent z-10 flex items-center px-4 border-b border-white/5 pointer-events-none">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp size={12} /> Forex Cross Rates
                        </span>
                    </div>
                    {/* Padding top to account for header */}
                    <div className="w-full h-full pt-6">
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js"
                            containerId="tv-forex-cross"
                            scriptHTML={{
                                "width": "100%",
                                "height": "100%",
                                "currencies": [
                                    "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY", "HKD"
                                ],
                                "isTransparent": true,
                                "colorTheme": "dark",
                                "locale": "en",
                                "largeChartUrl": ""
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* 2. Technical Analysis Speedometers (1/3 width) */}
                <div className="xl:col-span-1 grid grid-rows-2 gap-4">
                    {/* Oil Sentiment */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#0f172a] relative">
                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/20">
                                Brent Crude Oil
                            </span>
                        </div>
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                            containerId="tv-tech-oil"
                            scriptHTML={{
                                "interval": "1D",
                                "width": "100%",
                                "isTransparent": true,
                                "height": "100%",
                                "symbol": "TVC:UKOIL",
                                "showIntervalTabs": true,
                                "displayMode": "single",
                                "locale": "en",
                                "colorTheme": "dark"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                    {/* Gold Sentiment */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#0f172a] relative">
                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-yellow-400/20">
                                Gold Spot
                            </span>
                        </div>
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                            containerId="tv-tech-gold"
                            scriptHTML={{
                                "interval": "1D",
                                "width": "100%",
                                "isTransparent": true,
                                "height": "100%",
                                "symbol": "TVC:GOLD",
                                "showIntervalTabs": true,
                                "displayMode": "single",
                                "locale": "en",
                                "colorTheme": "dark"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Middle Row: The Visuals - Heatmap & Timeline */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[600px]">
                {/* 3. Forex/Stock Heatmap (2/3 width) */}
                <div className="xl:col-span-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0f172a]">
                    <div className="absolute top-0 left-0 right-0 h-9 bg-[#0f172a] z-10 flex items-center px-4 border-b border-white/5 pointer-events-none">
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
                            <BarChart2 size={12} /> Market Heatmap
                        </span>
                    </div>
                    <div className="w-full h-full pt-8">
                        {/* Using Stock Heatmap (S&P 500) for a "Market Overview" feel, visually denser than Forex */}
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
                            containerId="tv-stock-heatmap"
                            scriptHTML={{
                                "exchanges": [],
                                "dataSource": "SPX500",
                                "grouping": "sector",
                                "blockSize": "market_cap_basic",
                                "blockColor": "change",
                                "locale": "en",
                                "symbolUrl": "",
                                "colorTheme": "dark",
                                "hasTopBar": false,
                                "isTransparent": true,
                                "width": "100%",
                                "height": "100%"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* 4. News Timeline (1/3 width) */}
                <div className="xl:col-span-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0f172a]">
                    <div className="absolute top-0 left-0 right-0 h-9 bg-[#0f172a] z-10 flex items-center px-4 border-b border-white/5 pointer-events-none">
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <Newspaper size={12} /> Global Market News
                        </span>
                    </div>
                    <div className="w-full h-full pt-8">
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
                            containerId="tv-news-timeline"
                            scriptHTML={{
                                "feedMode": "market",
                                "market": "commodity",
                                "isTransparent": true,
                                "displayMode": "regular",
                                "width": "100%",
                                "height": "100%",
                                "colorTheme": "dark",
                                "locale": "en"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Ticker Tape (Logistics Focus) */}
            <div className="h-[72px] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#0f172a] flex items-center">
                <TradingViewWidget
                    src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                    containerId="tv-logistics-tape"
                    scriptHTML={{
                        "symbols": [
                            { "proName": "NYSE:FDX", "title": "FedEx" },
                            { "proName": "NYSE:UPS", "title": "UPS" },
                            { "proName": "CPSE:MAERSK.B", "title": "Maersk" },
                            { "proName": "ETR:DHL", "title": "DHL Group" },
                            { "proName": "TVC:UKOIL", "title": "Brent Oil" },
                            { "proName": "TVC:GOLD", "title": "Gold" },
                            { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
                            { "proName": "FX_IDC:USDCNY", "title": "USD/CNY" }
                        ],
                        "showSymbolLogo": true,
                        "colorTheme": "dark",
                        "isTransparent": true,
                        "displayMode": "adaptive",
                        "locale": "en"
                    }}
                    className="w-full h-full"
                />
            </div>
        </div>
    );
}
