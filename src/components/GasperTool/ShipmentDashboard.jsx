import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { generateMockShipments } from './aiService';
import { formatDate } from '../../lib/utils';
import './GasperTool.css';

export function ShipmentDashboard() {
    const [shipments, setShipments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setShipments(generateMockShipments());
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'default'; // Using default/primary
            case 'delayed': return 'destructive';
            case 'customs': return 'secondary'; // Orange-ish in prototype but secondary maps to glass
            case 'in_transit': return 'outline';
            default: return 'outline';
        }
    };

    const getRiskBadge = (risk) => {
        switch (risk) {
            case 'High': return <Badge variant="destructive">High Risk</Badge>;
            case 'Medium': return <Badge variant="secondary">Medium Risk</Badge>;
            default: return <Badge variant="outline" className="text-green-500 border-green-500/20">Low Risk</Badge>;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 bg-white/5 border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Package className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-white/60">Active Shipments</p>
                            <p className="text-2xl font-bold text-white">12</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 bg-white/5 border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-sm text-white/60">Delays / Risks</p>
                            <p className="text-2xl font-bold text-white">3</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 bg-white/5 border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <CheckCircle2 className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-white/60">Delivered (Mtd)</p>
                            <p className="text-2xl font-bold text-white">45</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Active Shipments</h3>
                {shipments.map((shipment) => (
                    <Card key={shipment.id} className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <Package className="h-6 w-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-white">{shipment.id}</span>
                                        <Badge variant={getStatusColor(shipment.status)}>
                                            {shipment.status.replace('_', ' ').toUpperCase()}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-white/60">
                                        {shipment.carrier} • {shipment.trackingNumber}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-white/40 mb-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> Origin
                                    </p>
                                    <p className="text-white">{shipment.origin}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 mb-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> Destination
                                    </p>
                                    <p className="text-white">{shipment.destination}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 mb-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> ETA
                                    </p>
                                    <p className="text-white">{formatDate(shipment.eta)}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 mb-1">Risk Status</p>
                                    {getRiskBadge(shipment.delayRisk)}
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar Mock */}
                        <div className="mt-4 relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={`absolute top-0 left-0 h-full rounded-full ${shipment.status === 'delivered' ? 'bg-green-500 w-full' :
                                        shipment.status === 'customs' ? 'bg-orange-500 w-3/4' :
                                            shipment.status === 'delayed' ? 'bg-red-500 w-1/2' :
                                                'bg-blue-500 w-1/2'
                                    }`}
                            />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-white/40">
                            <span>Origin</span>
                            <span>{shipment.currentLocation}</span>
                            <span>Destination</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
