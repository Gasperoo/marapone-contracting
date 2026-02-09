import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'motion/react';
import { initRealTimeTracking, getAllTrackedVehicles, shutdownTracking } from '../../services/realTimeTrackingService';

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
    const [filters, setFilters] = useState({
        vessel: true,
        flight: true,
        rail: true
    });
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Initialize real-time tracking
        initRealTimeTracking();
        setIsConnected(true);

        // Fetch vehicles periodically
        const fetchVehicles = async () => {
            try {
                const data = await getAllTrackedVehicles();
                setVehicles(data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles(); // Initial fetch
        const interval = setInterval(fetchVehicles, 5000); // Update every 5 seconds

        return () => {
            clearInterval(interval);
            shutdownTracking();
        };
    }, []);

    const toggleFilter = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const filteredVehicles = vehicles.filter(v => filters[v.type]);

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Header with Stats and Filters */}
            <div className="absolute top-4 left-4 z-[500] bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-sm">
                <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                    Live Global Logistics
                </h3>
                <div className="text-xs text-slate-400 mb-3">
                    Tracking {filteredVehicles.length} active units
                </div>

                {/* Multi-Select Filter */}
                <div className="flex flex-col gap-2">
                    <div className="text-xs text-slate-400 mb-1">Filter by Type:</div>
                    {[
                        { key: 'vessel', label: '🚢 Vessels', count: vehicles.filter(v => v.type === 'vessel').length },
                        { key: 'flight', label: '✈️ Flights', count: vehicles.filter(v => v.type === 'flight').length },
                        { key: 'rail', label: '🚆 Rail', count: vehicles.filter(v => v.type === 'rail').length }
                    ].map(({ key, label, count }) => (
                        <button
                            key={key}
                            onClick={() => toggleFilter(key)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${filters[key]
                                    ? 'bg-[#5227FF] text-white shadow-lg shadow-purple-500/20'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${filters[key] ? 'border-white bg-white' : 'border-slate-500'
                                    }`}>
                                    {filters[key] && <span className="text-[#5227FF] text-xs">✓</span>}
                                </span>
                                {label}
                            </span>
                            <span className="text-xs opacity-70">{count}</span>
                        </button>
                    ))}
                </div>
            </div>

            <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%', background: '#1a1a1a' }}>
                {/* Dark Matter Tiles for "Sci-Fi" look */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {filteredVehicles.map(v => (
                    <React.Fragment key={v.id}>
                        <Marker
                            position={[v.lat, v.lng]}
                            icon={createCustomIcon(v.metadata?.icon || '📍')}
                        >
                            <Popup className="glass-popup">
                                <div className="p-1">
                                    <strong className="text-indigo-400">{v.metadata?.name || v.id}</strong><br />
                                    Type: {v.type.toUpperCase()}<br />
                                    {v.metadata?.destination && `Destination: ${v.metadata.destination}`}<br />
                                    {v.metadata?.speed !== undefined && `Speed: ${Math.round(v.metadata.speed)} kn`}<br />
                                    {v.metadata?.altitude !== undefined && `Altitude: ${v.metadata.altitude} m`}<br />
                                    {v.metadata?.heading !== undefined && `Heading: ${Math.round(v.metadata.heading)}°`}<br />
                                    {v.metadata?.cargo && `Cargo: ${v.metadata.cargo}`}
                                </div>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
}
