import React from 'react';
import { ShipTrackingMap } from '../GasperTool/widgets/ShipTrackingMap';
import { Shield, Radio, Locate, Target } from 'lucide-react';
import '../../styles/LogisticsTool.css';

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
                <div className="lt-card" style={{ padding: 16, animation: 'lt-fade-in-up 0.5s ease-out' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="lt-icon-box" style={{ width: 40, height: 40, background: 'rgba(14,165,233,0.12)', borderColor: 'rgba(14,165,233,0.25)' }}>
                            <Radio className="text-[#0EA5E9] animate-pulse" size={18} />
                        </div>
                        <div>
                            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest">Global Telemetry</h3>
                            <p className="text-[10px] text-[#0EA5E9] font-mono">LINK: GS-SAT-LINK-ALPHA</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="lt-stat-label">Active Vessels</p>
                            <p className="text-lg font-mono font-bold text-[#1a1a1a]">{telemetry.activeVessels}</p>
                        </div>
                        <div>
                            <p className="lt-stat-label">Air Cargo</p>
                            <p className="text-lg font-mono font-bold text-[#1a1a1a]">{telemetry.airFreight}</p>
                        </div>
                    </div>
                </div>

                <div className="lt-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, animation: 'lt-fade-in-up 0.7s ease-out' }}>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">PORT DENSITY: OPTIMAL</span>
                </div>
            </div>

            {/* Coordinate HUD (Bottom Right) */}
            <div className="absolute bottom-10 right-10 z-20 pointer-events-none lt-glass px-4 py-2 rounded-full flex items-center gap-4 text-gray-500 font-mono text-[10px]"
                style={{ animation: 'lt-fade-in-up 0.6s ease-out' }}>
                <div className="flex items-center gap-2">
                    <Locate size={12} className="text-[#0EA5E9]" />
                    <span>LAT: {mousePos.y}°</span>
                </div>
                <div className="h-3 w-px bg-black/[0.08]"></div>
                <div className="flex items-center gap-2">
                    <Target size={12} className="text-[#0EA5E9]" />
                    <span>LONG: {mousePos.x}°</span>
                </div>
            </div>

            {/* System Status HUD (Top Right) */}
            <div className="absolute top-10 right-10 z-20 pointer-events-none space-y-2 text-right">
                <div className="text-[10px] font-mono text-[#0EA5E9] font-bold tracking-widest uppercase">Encryption Active</div>
                <div className="text-[10px] font-mono text-gray-400 font-bold tracking-widest uppercase">AES-256-GCM / LAYER 7</div>
            </div>

            {/* The Map itself */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-black/[0.08] shadow-2xl bg-white/50 relative">
                <ShipTrackingMap />

                {/* Scanner Scanline Aesthetic - cyan theme */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0EA5E9]/5 via-transparent to-[#38BDF8]/5 opacity-50"></div>
            </div>
        </div>
    );
}
