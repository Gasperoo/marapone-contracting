import React from 'react';
import { ShipTrackingMap } from './widgets/ShipTrackingMap';
import { Shield, Radio, Locate, Target } from 'lucide-react';

export function LiveTrackingMap() {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [telemetry, setTelemetry] = React.useState({
        activeVessels: 482,
        airFreight: 129,
        portCongestion: 'Normal',
        signalStrength: '98%'
    });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width * 180 - 90).toFixed(4),
            y: ((e.clientY - rect.top) / rect.height * -90 + 45).toFixed(4)
        });
    };

    return (
        <div className="w-full h-full p-6 relative group" onMouseMove={handleMouseMove}>

            {/* Satellite HUD Overlay (Top Left) */}
            <div className="absolute top-10 left-10 z-20 space-y-4 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-left-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                            <Radio className="text-blue-400 animate-pulse" size={18} />
                        </div>
                        <div>
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Global Telemetry</h3>
                            <p className="text-[10px] text-blue-400 font-mono">LINK: GS-SAT-LINK-ALPHA</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[9px] text-white/40 font-bold uppercase mb-1">Active Vessels</p>
                            <p className="text-lg font-mono font-bold text-white">{telemetry.activeVessels}</p>
                        </div>
                        <div>
                            <p className="text-[9px] text-white/40 font-bold uppercase mb-1">Air Cargo</p>
                            <p className="text-lg font-mono font-bold text-white">{telemetry.airFreight}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4 delay-100">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">PORT DENSITY: OPTIMAL</span>
                </div>
            </div>

            {/* Coordinate HUD (Bottom Right) */}
            <div className="absolute bottom-10 right-10 z-20 pointer-events-none bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-4 text-white/60 font-mono text-[10px] animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2">
                    <Locate size={12} className="text-blue-400" />
                    <span>LAT: {mousePos.y}°</span>
                </div>
                <div className="h-3 w-px bg-white/10"></div>
                <div className="flex items-center gap-2">
                    <Target size={12} className="text-blue-400" />
                    <span>LONG: {mousePos.x}°</span>
                </div>
            </div>

            {/* System Status HUD (Top Right) */}
            <div className="absolute top-10 right-10 z-20 pointer-events-none space-y-2 text-right">
                <div className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase">Encryption Active</div>
                <div className="text-[10px] font-mono text-white/20 font-bold tracking-widest uppercase">AES-256-GCM / LAYER 7</div>
            </div>

            {/* The Map itself */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 relative">
                <ShipTrackingMap />

                {/* Scanner Scanline Aesthetic */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5 opacity-50"></div>
            </div>
        </div>
    );
}

