import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../ui/Card';
import { Ship, Navigation, Anchor, Map, Wifi, WifiOff } from 'lucide-react';

export function VesselTracker() {
    const [vessels, setVessels] = useState([]);
    const [status, setStatus] = useState('disconnected'); // disconnected, connecting, connected
    const [apiKey, setApiKey] = useState(''); // In real app, this would be env var
    const [isDemo, setIsDemo] = useState(true);
    const ws = useRef(null);

    // Initial Demo Data
    const demoVessels = [
        { name: 'EVER GIVEN', type: 'Cargo', lat: 30.01, lon: 32.54, speed: 12.5, dest: 'Rotterdam', status: 'Underway' },
        { name: 'MAERSK SEALAND', type: 'Cargo', lat: 34.22, lon: -118.24, speed: 0, dest: 'Los Angeles', status: 'Moored' },
        { name: 'MSC IRIS', type: 'Cargo', lat: 1.29, lon: 103.85, speed: 10.2, dest: 'Singapore', status: 'Underway' },
        { name: 'CMA CGM MARCO POLO', type: 'Cargo', lat: 51.50, lon: 0.12, speed: 14.0, dest: 'Hamburg', status: 'Underway' },
    ];

    useEffect(() => {
        if (isDemo) {
            setVessels(demoVessels);
            const interval = setInterval(() => {
                // Simulate movement
                setVessels(prev => prev.map(v => {
                    if (v.status === 'Moored') return v;
                    return {
                        ...v,
                        lat: v.lat + (Math.random() - 0.5) * 0.01,
                        lon: v.lon + (Math.random() - 0.5) * 0.01,
                        speed: Math.max(0, v.speed + (Math.random() - 0.5))
                    };
                }));
            }, 2000);
            setStatus('demo');
            return () => clearInterval(interval);
        }
    }, [isDemo]);

    const connectAISStream = () => {
        if (!apiKey) {
            alert("Please enter a valid AISStream API Key to connect live.");
            return;
        }

        setIsDemo(false);
        setStatus('connecting');

        const socket = new WebSocket('wss://stream.aisstream.io/v0/stream');

        socket.onopen = () => {
            setStatus('connected');
            const subscriptionMessage = {
                APIKey: apiKey,
                BoundingBoxes: [[[-90, -180], [90, 180]]], // Global
                FiltersShipMMSI: [],
                FilterMessageTypes: ["PositionReport"]
            };
            socket.send(JSON.stringify(subscriptionMessage));
            setVessels([]); // Clear demo data
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.MessageType === 'PositionReport') {
                const msg = response.Message.PositionReport;
                const meta = response.MetaData;

                setVessels(prev => {
                    // Update existing or add new, keep list size manageable
                    const existingIdx = prev.findIndex(v => v.mmsi === msg.UserID);
                    const newVessel = {
                        name: meta.ShipName || `Vessel ${msg.UserID}`,
                        mmsi: msg.UserID,
                        lat: msg.Latitude,
                        lon: msg.Longitude,
                        speed: msg.Sog,
                        dest: 'Unknown', // Destination is in ShipStaticData, not PositionReport
                        status: msg.NavigationalStatus === 0 ? 'Underway' : 'Other'
                    };

                    if (existingIdx >= 0) {
                        const newPrev = [...prev];
                        newPrev[existingIdx] = newVessel;
                        return newPrev;
                    } else {
                        return [newVessel, ...prev].slice(0, 10);
                    }
                });
            }
        };

        socket.onclose = () => {
            setStatus('disconnected');
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            setStatus('error');
        };

        ws.current = socket;
    };

    const toggleMode = () => {
        if (isDemo) {
            setIsDemo(false); // Will show input
            setVessels([]);
            setStatus('disconnected');
        } else {
            if (ws.current) ws.current.close();
            setIsDemo(true);
        }
    };

    return (
        <Card className="p-5 glass-panel border-0 bg-white/5 relative overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <Ship size={18} className="text-cyan-400" />
                    Global Vessel Tracking
                </h3>
                <button
                    onClick={toggleMode}
                    className={`text-[10px] px-2 py-1 rounded border transition-colors ${isDemo ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
                >
                    {isDemo ? 'DEMO MODE' : 'LIVE API'}
                </button>
            </div>

            {!isDemo && status !== 'connected' && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter AISStream API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white mb-2"
                    />
                    <button
                        onClick={connectAISStream}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs py-1.5 rounded transition-colors"
                    >
                        Connect WebSocket
                    </button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                {vessels.map((v, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-cyan-900/40 text-cyan-400">
                                {v.status === 'Moored' ? <Anchor size={14} /> : <Navigation size={14} className={v.status === 'Underway' ? 'transform rotate-45' : ''} />}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white leading-none">{v.name}</div>
                                <div className="text-[10px] text-white/50 mt-1 flex items-center gap-1">
                                    <Map size={10} /> {v.lat.toFixed(2)}, {v.lon.toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-mono text-cyan-300">{v.speed.toFixed(1)} kn</div>
                            <div className="text-[10px] text-white/40">{v.dest}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40">
                <span>{vessels.length} Active Vessels</span>
                <span className="flex items-center gap-1">
                    {status === 'connected' ? <Wifi size={10} className="text-green-400" /> : <WifiOff size={10} />}
                    {status.toUpperCase()}
                </span>
            </div>
        </Card>
    );
}
