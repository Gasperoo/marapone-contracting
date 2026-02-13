import React from 'react';
import { ShipTrackingMap } from './widgets/ShipTrackingMap';

export function LiveTrackingMap() {
    return (
        <div className="w-full h-full p-6">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                <ShipTrackingMap />
            </div>
        </div>
    );
}
