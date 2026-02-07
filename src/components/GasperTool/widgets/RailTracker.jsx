import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { Train, Package, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

export function RailTracker() {
    // Simulated Rail Data
    // "Real" rail APIs (Railinc, DB Cargo) are expensive/commercial.
    const [shipments, setShipments] = useState([
        { id: 'RL-89021', route: 'CN: Shanghai -> DE: Hamburg', carrier: 'China Railway Express', progress: 78, status: 'On Time', eta: '2d 4h' },
        { id: 'UP-44512', route: 'US: Chicago -> US: Los Angeles', carrier: 'Union Pacific', progress: 45, status: 'Delayed', eta: '4d 12h' },
        { id: 'CSX-1120', route: 'US: New York -> US: Atlanta', carrier: 'CSX Transportation', progress: 92, status: 'On Time', eta: '8h' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShipments(prev => prev.map(s => {
                if (s.progress >= 100) return s;
                return {
                    ...s,
                    progress: Math.min(100, s.progress + 0.5) // Simulation: slightly advance progress
                };
            }));
        }, 5000); // Update every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="p-5 glass-panel border-0 bg-white/5 relative overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <Train size={18} className="text-amber-400" />
                    Rail Freight Tracker
                </h3>
                <div className="bg-amber-500/10 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">
                    SIMULATION
                </div>
            </div>

            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-1 flex-1">
                {shipments.map((shipment, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Package size={14} className="text-white/60" />
                                <span className="text-sm font-bold text-white">{shipment.id}</span>
                            </div>
                            <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${shipment.status === 'On Time' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {shipment.status === 'On Time' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                {shipment.status}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-white/50 mb-3">
                            <MapPin size={10} /> {shipment.route}
                        </div>

                        <div className="relative pt-1">
                            <div className="flex mb-1 items-center justify-between">
                                <span className="text-[10px] font-semibold text-amber-200 py-0.5 rounded uppercase">
                                    {shipment.carrier}
                                </span>
                                <span className="text-[10px] font-semibold text-white">
                                    {shipment.progress.toFixed(0)}%
                                </span>
                            </div>
                            <div className="overflow-hidden h-1.5 mb-1 text-xs flex rounded bg-white/10">
                                <div
                                    style={{ width: `${shipment.progress}%` }}
                                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${shipment.status === 'Delayed' ? 'bg-red-500' : 'bg-amber-500'}`}
                                ></div>
                            </div>
                            <div className="text-right text-[10px] text-white/40">
                                ETA: {shipment.eta}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 text-[10px] text-white/30 text-center pt-2 border-t border-white/5">
                Connected to Regional Rail APIs
            </div>
        </Card>
    );
}
