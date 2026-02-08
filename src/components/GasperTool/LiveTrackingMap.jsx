import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'motion/react';
import { initTrackingService, updateVehiclePositions } from '../../services/trackingService';

// Fix Leaflet Textures
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for types
const createCustomIcon = (emoji) => L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="font-size: 24px; filter: drop-shadow(0 0 5px rgba(82, 39, 255, 0.8));">${emoji}</div>`
});

export function LiveTrackingMap() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        initTrackingService(40); // Init 40 vehicles

        const interval = setInterval(() => {
            setVehicles(updateVehiclePositions());
        }, 100); // 60 FPS-ish updates

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-4 left-4 z-[500] bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Global Logistics
                </h3>
                <div className="text-xs text-slate-400">Tracking {vehicles.length} active units</div>
            </div>

            <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%', background: '#1a1a1a' }}>
                {/* Dark Matter Tiles for "Sci-Fi" look */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {vehicles.map(v => (
                    <React.Fragment key={v.id}>
                        <Marker
                            position={[v.lat, v.lng]}
                            icon={createCustomIcon(v.type.icon)}
                        >
                            <Popup className="glass-popup">
                                <div className="p-1">
                                    <strong className="text-indigo-400">{v.id}</strong><br />
                                    Type: {v.type.id.toUpperCase()}<br />
                                    From: {v.start.name}<br />
                                    To: {v.end.name}<br />
                                    Cargo: {v.cargo}
                                </div>
                            </Popup>
                        </Marker>
                        {/* Trail Line */}
                        <Polyline
                            positions={[[v.start.lat, v.start.lng], [v.end.lat, v.end.lng]]}
                            pathOptions={{ color: v.type.id === 'plane' ? '#22d3ee' : '#5227FF', weight: 1, opacity: 0.2, dashArray: '5,5' }}
                        />
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
}
