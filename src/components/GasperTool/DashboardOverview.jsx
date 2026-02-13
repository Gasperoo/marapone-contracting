import React from 'react';
import { Card } from '../ui/Card';
import { Activity, ArrowUpRight, Globe, Zap, Ship, Info, X } from 'lucide-react';
import { TradingViewWidget } from './widgets/TradingViewWidget';
import { VesselTracker } from './widgets/VesselTracker';
import { RailTracker } from './widgets/RailTracker';

export function DashboardOverview() {
    const [selectedWidget, setSelectedWidget] = React.useState(null);

    const handleWidgetClick = (title, description) => {
        setSelectedWidget({ title, description });
    };

    return (
        <div className="space-y-6 relative pb-10">
            {/* Widget Detail Modal */}
            {selectedWidget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedWidget(null)}>
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedWidget(null)}
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-white mb-2">{selectedWidget.title}</h3>
                        <p className="text-slate-300 leading-relaxed">{selectedWidget.description}</p>
                    </div>
                </div>
            )}

            {/* TradingView Ticker Tape */}
            <div className="w-full h-12 overflow-hidden rounded-xl border border-white/10 shadow-lg">
                <TradingViewWidget
                    src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                    containerId="tv-ticker-tape"
                    scriptHTML={{
                        "symbols": [
                            { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
                            { "proName": "FOREXCOM:NSXUSD", "title": "US 100" },
                            { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
                            { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
                            { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
                            { "proName": "TVC:UKOIL", "title": "Brent Oil" },
                            { "proName": "TVC:US05Y", "title": "US 5Y Yield" }
                        ],
                        "showSymbolLogo": true,
                        "colorTheme": "dark",
                        "isTransparent": false, // Opaque for better contrast in tape
                        "displayMode": "adaptive",
                        "locale": "en"
                    }}
                    className="w-full h-full"
                />
            </div>

            {/* Top Stats Row (Gasper Internal Data) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 glass-panel border-0 bg-white/5 relative group hover:bg-white/10 transition-colors">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Active Shipments", "12 active shipments currently in transit.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Active Shipments</h3>
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Ship size={20} /></div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">12</div>
                        <div className="flex items-center text-green-400 text-sm font-medium"><ArrowUpRight size={16} className="mr-1" />On Track</div>
                    </div>
                </Card>

                <Card className="p-6 glass-panel border-0 bg-white/5 relative group hover:bg-white/10 transition-colors">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Carbon Offset", "4.2 tons of CO2 saved this month.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Carbon Offset</h3>
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Zap size={20} /></div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">4.2t</div>
                        <div className="flex items-center text-green-400 text-sm font-medium"><ArrowUpRight size={16} className="mr-1" />+5%</div>
                    </div>
                </Card>

                <Card className="p-6 glass-panel border-0 bg-white/5 relative group hover:bg-white/10 transition-colors">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Global Risk", "Supply chain risk is actively monitored.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Global Risk</h3>
                        <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><Globe size={20} /></div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">Low</div>
                        <div className="text-sm text-white/40">Updated 2m ago</div>
                    </div>
                </Card>

                <Card className="p-6 glass-panel border-0 bg-white/5 relative group hover:bg-white/10 transition-colors">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Pending Actions", "3 items require approval.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Pending Actions</h3>
                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><Activity size={20} /></div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">3</div>
                        <div className="text-sm text-amber-400">Needs Attention</div>
                    </div>
                </Card>
            </div>

            {/* Main Market Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Action: Advanced Chart */}
                <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                    <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white/70">
                        Brent Crude Oil (Global Logistics Benchmark)
                    </div>
                    <TradingViewWidget
                        src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                        containerId="tv-advanced-chart"
                        scriptHTML={{
                            "width": "100%",
                            "height": "100%",
                            "symbol": "TVC:UKOIL",
                            "interval": "D",
                            "timezone": "Etc/UTC",
                            "theme": "dark",
                            "style": "1",
                            "locale": "en",
                            "enable_publishing": false,
                            "allow_symbol_change": true,
                            "calendar": false,
                            "support_host": "https://www.tradingview.com"
                        }}
                        className="w-full h-full"
                    />
                </div>

                {/* Side Actions: Calendar & Forex */}
                <div className="space-y-6 h-[500px] flex flex-col">
                    {/* Economic Calendar */}
                    <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative min-h-[240px]">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-[#0f172a] z-10 flex items-center px-4 border-b border-white/5">
                            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Economic Calendar</span>
                        </div>
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
                            containerId="tv-economic-calendar"
                            scriptHTML={{
                                "width": "100%",
                                "height": "100%",
                                "colorTheme": "dark",
                                "isTransparent": true,
                                "locale": "en",
                                "importanceFilter": "-1,0,1", // All importance? Maybe just high? "0,1" usually means medium/high
                                "countryFilter": "us,eu,cn,jp,gb" // Key logistics economies
                            }}
                            className="w-full h-full pt-8 bg-[#0f172a]"
                        />
                    </div>
                    {/* Market Overview / Forex */}
                    <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative min-h-[240px]">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-[#0f172a] z-10 flex items-center px-4 border-b border-white/5">
                            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Commodities & Forex</span>
                        </div>
                        <TradingViewWidget
                            src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
                            containerId="tv-market-overview"
                            scriptHTML={{
                                "colorTheme": "dark",
                                "dateRange": "12M",
                                "showChart": true,
                                "locale": "en",
                                "largeChartUrl": "",
                                "isTransparent": true,
                                "showSymbolLogo": true,
                                "showFloatingTooltip": false,
                                "width": "100%",
                                "height": "100%",
                                "tabs": [
                                    {
                                        "title": "Commodities",
                                        "symbols": [
                                            { "s": "TVC:UKOIL", "d": "Brent Oil" },
                                            { "s": "TVC:USOIL", "d": "WTI Oil" },
                                            { "s": "TVC:GOLD", "d": "Gold" },
                                            { "s": "TVC:SILVER", "d": "Silver" },
                                            { "s": "CBOT:ZW1!", "d": "Wheat" },
                                            { "s": "CBOT:ZC1!", "d": "Corn" }
                                        ]
                                    },
                                    {
                                        "title": "Forex",
                                        "symbols": [
                                            { "s": "FX:EURUSD", "d": "EUR/USD" },
                                            { "s": "FX:GBPUSD", "d": "GBP/USD" },
                                            { "s": "FX:USDJPY", "d": "USD/JPY" },
                                            { "s": "FX:USDCNH", "d": "USD/CNY" }
                                        ]
                                    }
                                ]
                            }}
                            className="w-full h-full pt-8 bg-[#0f172a]"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom: Specialized Logistics Trackers (Gasper unique value) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Vessel Tracker", "Satellite tracking of maritime vessels.")} />
                    <VesselTracker />
                </div>
                <div className="relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Rail Tracker", "Tracking for intermodal rail freight.")} />
                    <RailTracker />
                </div>
            </div>
        </div>
    );
}

function WidgetInfoButton({ onClick }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="absolute top-4 right-4 z-20 text-white/20 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        >
            <Info size={16} />
        </button>
    );
}
