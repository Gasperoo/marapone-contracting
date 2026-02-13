import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, AlertTriangle, CheckCircle2, Search, Filter, Plus, FileText, ChevronRight, Anchor, Truck, Scale } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { generateMockShipments } from './aiService';
import { formatDate, cn } from '../../lib/utils';
import { ShipTrackingMap } from './widgets/ShipTrackingMap';
import './GasperTool.css';

export function ShipmentDashboard() {
    const [shipments, setShipments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setShipments(generateMockShipments());
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const filteredShipments = shipments.filter(s => {
        const matchesFilter = filter === 'all' || s.status === filter;
        const matchesSearch = s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.destination.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusVariant = (status) => {
        switch (status) {
            case 'delivered': return 'success';
            case 'delayed': return 'destructive';
            case 'customs': return 'warning';
            case 'in_transit': return 'default';
            default: return 'outline';
        }
    };

    // Helper to determine milestone status
    const getMilestoneStatus = (shipmentStatus, stepIndex) => {
        // Simplified logic for demo
        const statusMap = {
            'pending': 0,
            'in_transit': 1,
            'customs': 2,
            'delivered': 3,
            'delayed': 1 // Assume delayed happens during transit
        };

        const currentStep = statusMap[shipmentStatus] || 0;
        if (stepIndex < currentStep) return 'completed';
        if (stepIndex === currentStep) return 'active';
        return 'pending';
    };

    const milestones = [
        { icon: Package, label: 'Origin' },
        { icon: Anchor, label: 'Ocean' },
        { icon: Scale, label: 'Customs' },
        { icon: MapPin, label: 'Final Mile' }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#5227FF] animate-spin"></div>
                    <p className="text-white/50 animate-pulse">Loading Shipments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/05 p-4 rounded-2xl border border-white/10 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                    <div className="flex bg-black/20 p-1 rounded-lg border border-white/10 shrink-0">
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2", viewMode === 'list' ? "bg-[#5227FF] text-white shadow-lg" : "text-white/50 hover:text-white")}
                        >
                            <FileText size={14} /> List
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2", viewMode === 'map' ? "bg-[#5227FF] text-white shadow-lg" : "text-white/50 hover:text-white")}
                        >
                            <MapPin size={14} /> Map
                        </button>
                    </div>
                    <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                        {['all', 'in_transit', 'customs', 'delayed', 'delivered'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border capitalize",
                                    filter === f
                                        ? "bg-white/10 text-white border-white/20"
                                        : "bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {f.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-48">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#5227FF]/50 transition-colors"
                        />
                    </div>
                    <Button className="bg-white text-black hover:bg-gray-200 rounded-xl shadow-lg shadow-white/10 gap-2 font-semibold whitespace-nowrap px-4">
                        <Plus size={16} /> <span className="hidden sm:inline">New</span>
                    </Button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'map' ? (
                <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                    <ShipTrackingMap />
                </div>
            ) : (
                <>
                    {/* Stats Overview (Compact) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                            <p className="text-blue-200/60 text-xs uppercase font-bold tracking-wider mb-1">Total Active</p>
                            <p className="text-2xl font-bold text-white">12</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                            <p className="text-orange-200/60 text-xs uppercase font-bold tracking-wider mb-1">Customs Hold</p>
                            <p className="text-2xl font-bold text-white">3</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                            <p className="text-red-200/60 text-xs uppercase font-bold tracking-wider mb-1">Critical Delays</p>
                            <p className="text-2xl font-bold text-white">1</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                            <p className="text-green-200/60 text-xs uppercase font-bold tracking-wider mb-1">Delivered (Mtd)</p>
                            <p className="text-2xl font-bold text-white">45</p>
                        </div>
                    </div>

                    {/* Shipments List */}
                    <div className="space-y-4">
                        {filteredShipments.length === 0 ? (
                            <div className="text-center py-20 text-white/30">
                                <Package size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No shipments found matching your criteria.</p>
                            </div>
                        ) : (
                            filteredShipments.map((shipment) => (
                                <div key={shipment.id} className="shipment-card group">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                                                <Package className="w-6 h-6 text-white/70" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-lg font-bold text-white">{shipment.id}</h3>
                                                    <Badge variant={getStatusVariant(shipment.status)} className="white-10 backdrop-blur-sm">
                                                        {shipment.status.replace('_', ' ')}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-white/50">{shipment.carrier} • Air Freight • {shipment.weight || '500kg'}</p>
                                            </div>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-sm text-white/40 mb-1">Estimated Arrival</p>
                                            <p className="text-xl font-mono text-white flex items-center gap-2 md:justify-end">
                                                <Clock size={16} className="text-[#5227FF]" />
                                                {formatDate(shipment.eta)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Track */}
                                    <div className="shipment-progress-track">
                                        {/* Background Line */}
                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>

                                        {/* Active Line (Mocked width based on status) */}
                                        <div
                                            className="absolute top-1/2 left-0 h-0.5 bg-[#5227FF] -translate-y-1/2 z-0 transition-all duration-1000"
                                            style={{
                                                width: shipment.status === 'delivered' ? '100%' :
                                                    shipment.status === 'customs' ? '66%' :
                                                        shipment.status === 'in_transit' ? '33%' : '0%'
                                            }}
                                        ></div>

                                        {milestones.map((step, index) => {
                                            const status = getMilestoneStatus(shipment.status, index);
                                            return (
                                                <div key={index} className="relative z-10 flex flex-col items-center">
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-[#0f172a]",
                                                        status === 'completed' || status === 'active'
                                                            ? "border-[#5227FF] text-[#5227FF] shadow-[0_0_15px_rgba(82,39,255,0.4)]"
                                                            : "border-white/10 text-white/20"
                                                    )}>
                                                        <step.icon size={14} />
                                                    </div>
                                                    <span className={cn(
                                                        "absolute top-10 text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap transition-colors",
                                                        status === 'active' ? "text-white" : "text-white/30"
                                                    )}>{step.label}</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex gap-4 text-sm text-white/50">
                                            <span className="flex items-center gap-2"><MapPin size={14} /> {shipment.origin}</span>
                                            <span className="text-white/20">→</span>
                                            <span className="flex items-center gap-2"><MapPin size={14} /> {shipment.destination}</span>
                                        </div>
                                        <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 group/btn">
                                            View Details <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
