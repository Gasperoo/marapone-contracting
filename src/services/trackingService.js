// Simulated tracking service for Gasper Tool
// Generates realistic movement for Ships, Planes, Trains, and Trucks

const VEHICLE_TYPES = {
    SHIP: { id: 'ship', icon: '🚢', speed: 0.05, pathType: 'ocean' },
    PLANE: { id: 'plane', icon: '✈️', speed: 0.2, pathType: 'air' },
    TRAIN: { id: 'train', icon: '🚆', speed: 0.08, pathType: 'land' },
    TRUCK: { id: 'truck', icon: '🚛', speed: 0.06, pathType: 'land' }
};

// Major global hubs
const HUBS = [
    { name: 'Shanghai', lat: 31.2304, lng: 121.4737, type: 'port' },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, type: 'port' },
    { name: 'Rotterdam', lat: 51.9225, lng: 4.47917, type: 'port' },
    { name: 'Los Angeles', lat: 33.7423, lng: -118.2758, type: 'port' },
    { name: 'New York', lat: 40.7128, lng: -74.0060, type: 'port' },
    { name: 'London', lat: 51.5074, lng: -0.1278, type: 'air' },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708, type: 'air' },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, type: 'mixed' },
    { name: 'Hamburg', lat: 53.5511, lng: 9.9937, type: 'rail' },
    { name: 'Duisburg', lat: 51.4344, lng: 6.7623, type: 'rail' } // Key silk road rail hub
];

let vehicles = [];

export const initTrackingService = (count = 50) => {
    vehicles = [];
    for (let i = 0; i < count; i++) {
        const startHub = HUBS[Math.floor(Math.random() * HUBS.length)];
        const endHub = HUBS[Math.floor(Math.random() * HUBS.length)];

        if (startHub === endHub) continue;

        let type = VEHICLE_TYPES.SHIP;
        if (Math.random() > 0.6) type = VEHICLE_TYPES.PLANE;
        else if (Math.random() > 0.8) type = VEHICLE_TYPES.TRAIN;

        vehicles.push({
            id: `TRK-${Math.floor(Math.random() * 10000)}`,
            type: type,
            start: startHub,
            end: endHub,
            progress: Math.random(), // 0 to 1
            status: 'In Transit',
            cargo: 'Electronics'
        });
    }
    return vehicles;
};

export const updateVehiclePositions = () => {
    return vehicles.map(v => {
        // Advance progress
        v.progress += v.type.speed * 0.005;
        if (v.progress >= 1) {
            v.progress = 0;
            // Swap start/end for simplicity loop
            const temp = v.start;
            v.start = v.end;
            v.end = temp;
        }

        // Calculate current lat/lng based on great circle (simplified linear for now)
        const lat = v.start.lat + (v.end.lat - v.start.lat) * v.progress;
        const lng = v.start.lng + (v.end.lng - v.start.lng) * v.progress;

        return {
            ...v,
            lat,
            lng
        };
    });
};
