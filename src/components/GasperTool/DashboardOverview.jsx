import React from 'react';
import { Card } from '../ui/Card';
import { Activity, ArrowUpRight, Globe, Zap, Ship, Info, X } from 'lucide-react';
import { TradingViewWidget } from './widgets/TradingViewWidget';
import { VesselTracker } from './widgets/VesselTracker';
import { RailTracker } from './widgets/RailTracker';

export function DashboardOverview() {
    const [selectedWidget, setSelectedWidget] = React.useState(null);
    const [neuralFeed, setNeuralFeed] = React.useState([
        { id: 1, text: 'Neural Link: Rotterdam Port Terminal 4 established', time: 'Just now', type: 'info' },
        { id: 2, text: 'Delta-V Prediction: 2.4% rate fluctuation detected', time: '1m ago', type: 'warning' },
        { id: 3, text: 'Satellite GS-12 active: High precision tracking enabled', time: '2m ago', type: 'success' },
    ]);

    // Simulate growing neural feed
    React.useEffect(() => {
        const interval = setInterval(() => {
            const events = [
                'Vessel MAERSK-72 handshaking with Suez API...',
                'Predictive AI: Potential labor delay in Ningbo (Conf: 82%)',
                'Blockchain Block #154238 verified for Shipment SHP-99',
                'Global Flux Intensity stabilizing at Class 2',
                'Customs Neural Core: Auto-approval rate hit 98%'
            ];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            setNeuralFeed(prev => [{ id: Date.now(), text: randomEvent, time: 'Just now', type: 'info' }, ...prev.slice(0, 4)]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

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
                        "isTransparent": false,
                        "displayMode": "adaptive",
                        "locale": "en"
                    }}
                    className="w-full h-full"
                />
            </div>

            {/* Top Stats Row (Gasper Internal Data) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Active Shipments", val: "12", trend: "On Track", icon: Ship, color: "blue", spark: [30, 45, 32, 50, 45, 60] },
                    { title: "Carbon Offset", val: "4.2t", trend: "+5%", icon: Zap, color: "green", spark: [10, 20, 15, 35, 40, 55] },
                    { title: "Global Risk", val: "Low", trend: "Stable", icon: Globe, color: "red", spark: [20, 15, 25, 20, 15, 10] },
                    { title: "Pending Actions", val: "3", trend: "Attention", icon: Activity, color: "amber", spark: [5, 15, 8, 20, 12, 18] }
                ].map((stat, i) => (
                    <Card key={i} className="p-6 glass-panel border-0 bg-white/5 relative group hover:bg-white/10 transition-colors overflow-hidden">
                        <WidgetInfoButton onClick={() => handleWidgetClick(stat.title, `${stat.val} metrics currently recorded.`)} />
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/60 font-medium text-xs uppercase tracking-wider">{stat.title}</h3>
                            <div className={`p-2 bg-${stat.color}-500/20 rounded-lg text-${stat.color}-400`}><stat.icon size={18} /></div>
                        </div>
                        <div className="flex items-end justify-between relative z-10">
                            <div>
                                <div className="text-3xl font-bold text-white">{stat.val}</div>
                                <div className={`flex items-center text-${stat.color}-400 text-[10px] font-bold uppercase mt-1`}>{stat.trend}</div>
                            </div>

                            {/* SVG Sparkline */}
                            <div className="h-10 w-24 opacity-40 group-hover:opacity-100 transition-opacity">
                                <svg viewBox="0 0 100 40" className="w-full h-full">
                                    <path
                                        d={`M0 ${stat.spark[0]} ${stat.spark.map((v, i) => `L${(i + 1) * 20} ${40 - v}`).join(' ')}`}
                                        fill="none"
                                        stroke={stat.color === 'blue' ? '#3b82f6' : stat.color === 'green' ? '#10b981' : stat.color === 'red' ? '#ef4444' : '#f59e0b'}
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        {/* Background Gradient */}
                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl`}></div>
                    </Card>
                ))}
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

                {/* Side Panel: Neural Logistics Stream */}
                <div className="lg:col-span-1 h-[500px] flex flex-col space-y-6">
                    <Card className="flex-1 bg-[#050b14] border-white/10 p-6 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity size={80} className="text-blue-500" />
                        </div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-6 uppercase tracking-widest relative z-10">
                            <Zap className="text-blue-400 w-4 h-4" />
                            Neural Telemetry Stream
                        </h3>

                        <div className="flex-1 space-y-4 overflow-hidden relative z-10">
                            {neuralFeed.map((event) => (
                                <div key={event.id} className="animate-in slide-in-from-top-4 border-l-2 border-blue-500/30 pl-4 py-1">
                                    <p className="text-[11px] text-white font-mono leading-relaxed">{event.text}</p>
                                    <p className="text-[9px] text-white/30 uppercase mt-1 font-bold">{event.time}</p>
                                </div>
                            ))}
                        </div>

                        {/* Global Flux Gauge */}
                        <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Flux Intensity</span>
                                <span className="text-[10px] font-bold text-emerald-400 uppercase">Class 2 (Optimal)</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                                <div className="h-full bg-emerald-500" style={{ width: '40%' }}></div>
                                <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '2%' }}></div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 bg-white/5 border-white/10 text-center">
                            <p className="text-[9px] text-white/40 uppercase font-bold mb-1">Port Density</p>
                            <p className="text-lg font-bold text-white">LOW</p>
                        </Card>
                        <Card className="p-4 bg-white/5 border-white/10 text-center">
                            <p className="text-[9px] text-white/40 uppercase font-bold mb-1">Fuel Flux</p>
                            <p className="text-lg font-bold text-red-400 font-mono">+1.22%</p>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Bottom: Specialized Logistics Trackers */}
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
