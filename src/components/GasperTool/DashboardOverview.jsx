import React from 'react';
import { Card } from '../ui/Card';
import { Activity, ArrowUpRight, Globe, Zap, Ship, Info, X } from 'lucide-react';
import { LiveTracker } from './widgets/LiveTracker';
import { FlightTracker } from './widgets/FlightWidget';
import { CommodityTicker } from './widgets/CommodityTicker';
import { PublicHolidays } from './widgets/PublicHolidays';
import { VesselTracker } from './widgets/VesselTracker';
import { RailTracker } from './widgets/RailTracker';

export function DashboardOverview() {
    const [selectedWidget, setSelectedWidget] = React.useState(null);

    const handleWidgetClick = (title, description) => {
        setSelectedWidget({ title, description });
    };

    return (
        <div className="space-y-6 relative">
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
                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-[#5227FF] hover:bg-[#5227FF]/80 text-white rounded-lg text-sm font-medium transition-colors"
                                onClick={() => setSelectedWidget(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 glass-panel border-0 bg-white/5 relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Active Shipments", "You have 12 active shipments currently in transit. 8 are on schedule, 3 are at risk of delay, and 1 has arrived at port.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Active Shipments</h3>
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Ship size={20} />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">12</div>
                        <div className="flex items-center text-green-400 text-sm font-medium">
                            <ArrowUpRight size={16} className="mr-1" />
                            On Track
                        </div>
                    </div>
                </Card>

                <Card className="p-6 glass-panel border-0 bg-white/5 relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Carbon Offset", "Your sustainable routing choices have saved 4.2 tons of CO2 this month compared to standard routing.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Carbon Offset</h3>
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                            <Zap size={20} />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">4.2t</div>
                        <div className="flex items-center text-green-400 text-sm font-medium">
                            <ArrowUpRight size={16} className="mr-1" />
                            +5%
                        </div>
                    </div>
                </Card>

                <Card className="p-6 glass-panel border-0 bg-white/5 relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Global Risk", "Current global supply chain risk is low. No major geopolitical or weather events are impacting your primary routes.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Global Risk</h3>
                        <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                            <Globe size={20} />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">Low</div>
                        <div className="text-sm text-white/40">Updated 2m ago</div>
                    </div>
                </Card>

                <Card className="p-6 glass-panel border-0 bg-white/5 relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Pending Actions", "3 items require your attention: 2 Approvals pending for new routes, 1 document signature required.")} />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/60 font-medium text-sm">Pending Actions</h3>
                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">3</div>
                        <div className="text-sm text-amber-400">Needs Attention</div>
                    </div>
                </Card>
            </div>

            {/* Live Tracker Widget */}
            <div className="relative group">
                <div className="flex justify-between items-end mt-8 mb-4">
                    <h2 className="text-lg font-semibold text-white/80">Live Market & Logistics Data</h2>
                    <button
                        onClick={() => handleWidgetClick("Live Tracker", "Real-time feed of market rates, container availability, and port congestion indices.")}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <Info size={16} />
                    </button>
                </div>
                <LiveTracker />
            </div>

            {/* New Widgets Row 1 - Market & General */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
                <div className="relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Flight Tracker", "Live tracking of air freight shipments.")} />
                    <FlightTracker />
                </div>
                <div className="relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Commodity Ticker", "Live prices for key commodities like Crude Oil, Gold, and Wheat.")} />
                    <CommodityTicker />
                </div>
                <div className="relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Public Holidays", "Upcoming public holidays in your key shipping destinations.")} />
                    <PublicHolidays />
                </div>
            </div>

            {/* New Widgets Row 2 - Logistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
                <div className="relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Vessel Tracker", "Satellite tracking of maritime vessels.")} />
                    <VesselTracker />
                </div>
                <div className="relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Rail Tracker", "Tracking for intermodal rail freight.")} />
                    <RailTracker />
                </div>
            </div>

            {/* Placeholder for Map or other big widget */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[320px]">
                <Card className="col-span-1 lg:col-span-2 glass-panel border-0 bg-white/5 p-6 flex flex-col justify-center items-center text-white/40 relative overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
                    <Globe size={48} className="mb-4 opacity-50" />
                    <span className="z-10 text-lg font-medium">Global Logistics Map (Coming Soon)</span>
                </Card>
                <Card className="glass-panel border-0 bg-white/5 p-6 relative group">
                    <WidgetInfoButton onClick={() => handleWidgetClick("Recent Alerts", "Critical alerts affecting your supply chain.")} />
                    <h3 className="font-semibold text-white mb-4">Recent Alerts</h3>
                    <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></div>
                            <div>
                                <p className="text-sm text-white font-medium">Port Congestion Warning</p>
                                <p className="text-xs text-white/50">Shanghai Port reporting 48h delays.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
                            <div>
                                <p className="text-sm text-white font-medium">Rate Hike Alert</p>
                                <p className="text-xs text-white/50">Trans-Pacific rates up by 5%.</p>
                            </div>
                        </div>
                    </div>
                </Card>
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
