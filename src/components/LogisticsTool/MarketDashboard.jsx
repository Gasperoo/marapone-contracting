import React from 'react';
import { Card } from '../ui/Card';
import { TradingViewWidget } from '../GasperTool/widgets/TradingViewWidget';
import { Globe, TrendingUp, Zap, Newspaper, BarChart2 } from 'lucide-react';
import '../../styles/LogisticsTool.css';

export function MarketDashboard() {
    return (
        <div className="space-y-6 pb-10">
            <div className="lt-page-header">
                <div className="lt-page-title">
                    <Globe size={22} className="icon-glow" style={{ color: '#0EA5E9' }} />
                    Global Market Intelligence
                </div>
                <span className="lt-badge lt-badge-cyan lt-badge-live">
                    Live Institutional Data
                </span>
            </div>

            {/* Top Row: Forex Cross Rates & Technical Sentiment */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[450px]">
                {/* 1. Forex Cross Rates (2/3 width) */}
                <div className="xl:col-span-2 rounded-2xl overflow-hidden border border-black/[0.08] shadow-2xl relative bg-white group hover:border-[rgba(14,165,233,0.25)] transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-9 bg-white z-10 flex items-center px-4 border-b border-black/[0.06] pointer-events-none">
                        <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp size={12} /> Forex Cross Rates
                        </span>
                    </div>
                    <div className="w-full h-full pt-6">
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js"
                            containerId="tv-forex-cross-lt"
                            scriptHTML={{
                                "width": "100%",
                                "height": "100%",
                                "currencies": [
                                    "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY", "HKD"
                                ],
                                "isTransparent": true,
                                "colorTheme": "light",
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
                    <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-lg bg-white relative hover:border-[rgba(14,165,233,0.25)] transition-all">
                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                            <span className="lt-badge lt-badge-amber lt-badge-live">
                                Brent Crude Oil
                            </span>
                        </div>
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                            containerId="tv-tech-oil-lt"
                            scriptHTML={{
                                "interval": "1D",
                                "width": "100%",
                                "isTransparent": true,
                                "height": "100%",
                                "symbol": "TVC:UKOIL",
                                "showIntervalTabs": true,
                                "displayMode": "single",
                                "locale": "en",
                                "colorTheme": "light"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                    {/* Gold Sentiment */}
                    <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-lg bg-white relative hover:border-[rgba(14,165,233,0.25)] transition-all">
                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                            <span className="lt-badge lt-badge-amber lt-badge-live">
                                Gold Spot
                            </span>
                        </div>
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                            containerId="tv-tech-gold-lt"
                            scriptHTML={{
                                "interval": "1D",
                                "width": "100%",
                                "isTransparent": true,
                                "height": "100%",
                                "symbol": "TVC:GOLD",
                                "showIntervalTabs": true,
                                "displayMode": "single",
                                "locale": "en",
                                "colorTheme": "light"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Middle Row: Heatmap & Timeline */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[600px]">
                {/* 3. Forex/Stock Heatmap (2/3 width) */}
                <div className="xl:col-span-2 rounded-2xl overflow-hidden border border-black/[0.08] shadow-2xl relative bg-white hover:border-[rgba(14,165,233,0.25)] transition-all">
                    <div className="absolute top-0 left-0 right-0 h-9 bg-white z-10 flex items-center px-4 border-b border-black/[0.06] pointer-events-none">
                        <span className="text-[10px] font-bold text-[#22c55e] uppercase tracking-widest flex items-center gap-2">
                            <BarChart2 size={12} /> Market Heatmap
                        </span>
                    </div>
                    <div className="w-full h-full pt-8">
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
                            containerId="tv-stock-heatmap-lt"
                            scriptHTML={{
                                "exchanges": [],
                                "dataSource": "SPX500",
                                "grouping": "sector",
                                "blockSize": "market_cap_basic",
                                "blockColor": "change",
                                "locale": "en",
                                "symbolUrl": "",
                                "colorTheme": "light",
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
                <div className="xl:col-span-1 rounded-2xl overflow-hidden border border-black/[0.08] shadow-2xl relative bg-white hover:border-[rgba(14,165,233,0.25)] transition-all">
                    <div className="absolute top-0 left-0 right-0 h-9 bg-white z-10 flex items-center px-4 border-b border-black/[0.06] pointer-events-none">
                        <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2">
                            <Newspaper size={12} /> Global Market News
                        </span>
                    </div>
                    <div className="w-full h-full pt-8">
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
                            containerId="tv-news-timeline-lt"
                            scriptHTML={{
                                "feedMode": "market",
                                "market": "commodity",
                                "isTransparent": true,
                                "displayMode": "regular",
                                "width": "100%",
                                "height": "100%",
                                "colorTheme": "light",
                                "locale": "en"
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Ticker Tape (Logistics Focus) */}
            <div className="h-[72px] rounded-xl overflow-hidden border border-black/[0.08] shadow-lg bg-white flex items-center">
                <TradingViewWidget
                    src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                    containerId="tv-logistics-tape-lt"
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
                        "colorTheme": "light",
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
