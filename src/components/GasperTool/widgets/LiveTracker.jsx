import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/Card'; // Adjusted path: widgets -> GasperTool -> ui (up 2 levels?) No.
// File is at src/components/GasperTool/widgets/LiveTracker.jsx
// Card is at src/components/ui/Card.jsx ... wait
// MarketDashboard imports from '../ui/Card'. So Card is at src/components/ui/Card?
// Let's check imports.
// GasperTool.jsx is at src/components/GasperTool/GasperTool.jsx
// It imports MarketDashboard from './MarketDashboard'.
// MarketDashboard imports Card from '../ui/Card'.
// This refers to src/components/GasperTool/../ui/Card -> src/components/ui/Card.
// So simple 'ui' folder in components.
//
// My file: src/components/GasperTool/widgets/LiveTracker.jsx
// Values: src/components/ui/Card -> ../../ui/Card
import { RefreshCw, Wind, Droplets, TrendingUp, TrendingDown, ArrowRight, CloudRain } from 'lucide-react';
import { getLiveCurrencyRates, getPortWeather, PORTS } from '../services/liveDataService';

export function LiveTracker() {
    const [currency, setCurrency] = useState(null);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        // Fetch Currency
        const currData = await getLiveCurrencyRates();
        setCurrency(currData);
        setLastUpdated(new Date().toLocaleTimeString());

        // Fetch Weather for all ports
        const weatherPromises = Object.entries(PORTS).map(async ([key, port]) => {
            const data = await getPortWeather(port.lat, port.lon);
            return { [key]: data };
        });

        const weatherResults = await Promise.all(weatherPromises);
        const combinedWeather = weatherResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setWeather(combinedWeather);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000 * 5); // Refresh every 5 mins
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code) => {
        // Simple mapping for WMO codes
        if (code <= 3) return "☀️";
        if (code <= 48) return "☁️";
        if (code <= 67) return "🌧️";
        if (code <= 77) return "❄️";
        if (code <= 99) return "⛈️";
        return "❓";
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Currency Tracker */}
            <Card className="p-5 glass-panel border-0 bg-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp size={100} />
                </div>

                <div className="flex justify-between items-center mb-4 relative z-10">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Live Forex (USD Base)
                    </h3>
                    <button onClick={fetchData} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <RefreshCw size={14} className={`text-white/60 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                    {loading && !currency ? (
                        <div className="text-white/40 text-sm col-span-2">Loading rates...</div>
                    ) : currency ? (
                        <>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                <div className="text-xs text-white/60 mb-1">EUR / USD</div>
                                <div className="text-xl font-bold text-white">{(1 / currency.EUR).toFixed(4)}</div>
                                <div className="text-xs text-green-400 flex items-center mt-1">
                                    <TrendingUp size={10} className="mr-1" /> Live
                                </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                <div className="text-xs text-white/60 mb-1">GBP / USD</div>
                                <div className="text-xl font-bold text-white">{(1 / currency.GBP).toFixed(4)}</div>
                                <div className="text-xs text-green-400 flex items-center mt-1">
                                    <TrendingUp size={10} className="mr-1" /> Live
                                </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                <div className="text-xs text-white/60 mb-1">USD / CNY</div>
                                <div className="text-xl font-bold text-white">{currency.CNY.toFixed(4)}</div>
                                <div className="text-xs text-blue-400 flex items-center mt-1">
                                    <ArrowRight size={10} className="mr-1" /> Stable
                                </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                <div className="text-xs text-white/60 mb-1">USD / JPY</div>
                                <div className="text-xl font-bold text-white">{currency.JPY.toFixed(2)}</div>
                                <div className="text-xs text-red-400 flex items-center mt-1">
                                    <TrendingDown size={10} className="mr-1" /> -0.2%
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-red-400 text-sm col-span-2">Failed to load</div>
                    )}
                </div>
                <div className="text-[10px] text-white/30 mt-3 text-right">
                    Updated: {lastUpdated}
                </div>
            </Card>

            {/* Port Weather Tracker */}
            <Card className="p-5 glass-panel border-0 bg-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CloudRain size={100} />
                </div>

                <div className="flex justify-between items-center mb-4 relative z-10">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        Port Conditions
                    </h3>
                </div>

                <div className="space-y-3 relative z-10">
                    {loading && Object.keys(weather).length === 0 ? (
                        <div className="text-white/40 text-sm">Loading weather...</div>
                    ) : (
                        Object.entries(PORTS).map(([key, port]) => {
                            const w = weather[key]?.current;
                            if (!w) return null;
                            return (
                                <div key={key} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{getWeatherIcon(w.weather_code)}</div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{port.name}</div>
                                            <div className="text-xs text-white/50 flex items-center gap-2">
                                                <span className="flex items-center gap-1"><Wind size={10} /> {w.wind_speed_10m} km/h</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-white">{w.temperature_2m}°C</div>
                                        <div className="text-xs text-white/40">Real-time</div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </Card>
        </div>
    );
}

// Helper component for icon to avoid import error if I missed one
const CloudRainIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 14v6" />
        <path d="M8 14v6" />
        <path d="M12 16v6" />
    </svg>
);
