// Real-Time Cargo Tracking Service
// Integrates multiple free APIs for vessel, flight, and rail tracking

const ENABLE_REAL_TRACKING = import.meta.env.VITE_ENABLE_REAL_TRACKING === 'true';
const AISSTREAM_API_KEY = import.meta.env.VITE_AISSTREAM_API_KEY;
const AISHUB_USERNAME = import.meta.env.VITE_AISHUB_USERNAME;
const OPENSKY_USERNAME = import.meta.env.VITE_OPENSKY_NETWORK_USERNAME;
const OPENSKY_PASSWORD = import.meta.env.VITE_OPENSKY_NETWORK_PASSWORD;

// Unified vehicle data structure
class TrackedVehicle {
    constructor(id, type, lat, lng, metadata = {}) {
        this.id = id;
        this.type = type; // 'vessel', 'flight', 'rail'
        this.lat = lat;
        this.lng = lng;
        this.metadata = metadata; // name, destination, speed, heading, etc.
        this.lastUpdate = Date.now();
    }
}

// ===== VESSEL TRACKING (AISStream.io + MyShipTracking.com + AISHub) =====
class VesselTracker {
    constructor() {
        this.ws = null;
        this.vessels = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.useMyShipTracking = !!import.meta.env.VITE_MYSHIPTRACKING_API_KEY;
        this.useAISHub = !!AISHUB_USERNAME;
        this.myShipTrackingInterval = null;
        this.aisHubInterval = null;
    }

    connect() {
        if (this.useMyShipTracking) {
            this.connectMyShipTracking();
        } else if (this.useAISHub) {
            this.connectAISHub();
        } else if (AISSTREAM_API_KEY) {
            this.connectAISStream();
        } else {
            console.warn('No vessel tracking API configured.');
        }
    }

    // MyShipTracking.com REST API (Paid)
    async connectMyShipTracking() {
        console.log('✅ Using MyShipTracking.com API');

        const fetchVessels = async () => {
            try {
                const zones = [
                    { lat1: 20, lon1: -130, lat2: 50, lon2: -60 },  // North America
                    { lat1: 35, lon1: -10, lat2: 60, lon2: 30 },    // Europe
                    { lat1: -10, lon1: 90, lat2: 40, lon2: 140 },   // Asia-Pacific
                ];

                for (const zone of zones) {
                    const url = `https://api.myshiptracking.com/vessels/zone?lat1=${zone.lat1}&lon1=${zone.lon1}&lat2=${zone.lat2}&lon2=${zone.lon2}`;

                    const response = await fetch(url, {
                        headers: {
                            'x-api-key': import.meta.env.VITE_MYSHIPTRACKING_API_KEY
                        }
                    });

                    if (!response.ok) continue;
                    const data = await response.json();
                    this.processMyShipTrackingData(data);
                }
            } catch (error) {
                console.error('Error fetching MyShipTracking data:', error);
            }
        };

        await fetchVessels();
        this.myShipTrackingInterval = setInterval(fetchVessels, 30000);
    }

    processMyShipTrackingData(data) {
        if (!data || !Array.isArray(data)) return;

        data.forEach(vessel => {
            const mmsi = vessel.MMSI;
            if (!mmsi || !vessel.LAT || !vessel.LON) return;

            this.vessels.set(mmsi, new TrackedVehicle(
                `VESSEL-${mmsi}`,
                'vessel',
                vessel.LAT,
                vessel.LON,
                {
                    mmsi, name: vessel.SHIPNAME || `Vessel ${mmsi}`,
                    speed: vessel.SPEED || 0, heading: vessel.COURSE || 0,
                    destination: vessel.DESTINATION || 'Unknown',
                    shipType: vessel.TYPE_NAME || 'Cargo', icon: '🚢'
                }
            ));
        });

        if (this.vessels.size > 500) {
            const keys = Array.from(this.vessels.keys()).slice(0, this.vessels.size - 500);
            keys.forEach(k => this.vessels.delete(k));
        }
    }

    // AISHub.net REST API (Free with AIS feed contribution)
    async connectAISHub() {
        console.log('✅ Using AISHub.net API');

        const fetchVessels = async () => {
            try {
                const zones = [
                    { latmin: 20, latmax: 50, lonmin: -130, lonmax: -60 },
                    { latmin: 35, latmax: 60, lonmin: -10, lonmax: 30 },
                    { latmin: -10, latmax: 40, lonmin: 90, lonmax: 140 },
                ];

                for (const zone of zones) {
                    const url = `https://data.aishub.net/ws.php?username=${AISHUB_USERNAME}&format=1&output=json&compress=0&latmin=${zone.latmin}&latmax=${zone.latmax}&lonmin=${zone.lonmin}&lonmax=${zone.lonmax}`;
                    const response = await fetch(url);
                    if (!response.ok) continue;
                    const data = await response.json();
                    this.processAISHubData(data);
                }
            } catch (error) {
                console.error('Error fetching AISHub data:', error);
            }
        };

        await fetchVessels();
        this.aisHubInterval = setInterval(fetchVessels, 60000);
    }

    processAISHubData(data) {
        if (!data || !Array.isArray(data)) return;

        data.forEach(vessel => {
            const mmsi = vessel.MMSI;
            if (!mmsi || !vessel.LATITUDE || !vessel.LONGITUDE) return;

            this.vessels.set(mmsi, new TrackedVehicle(
                `VESSEL-${mmsi}`,
                'vessel',
                vessel.LATITUDE,
                vessel.LONGITUDE,
                {
                    mmsi, name: vessel.NAME || `Vessel ${mmsi}`,
                    speed: vessel.SOG || 0, heading: vessel.COG || 0,
                    destination: vessel.DEST || 'Unknown',
                    shipType: vessel.TYPE || 'Cargo', icon: '🚢'
                }
            ));
        });

        if (this.vessels.size > 500) {
            const keys = Array.from(this.vessels.keys()).slice(0, this.vessels.size - 500);
            keys.forEach(k => this.vessels.delete(k));
        }
    }

    // AISStream.io WebSocket API (Free)
    connectAISStream() {
        if (!AISSTREAM_API_KEY) return;

        try {
            this.ws = new WebSocket('wss://stream.aisstream.io/v0/stream');

            this.ws.onopen = () => {
                console.log('✅ Connected to AISStream.io');
                this.reconnectAttempts = 0;
                this.ws.send(JSON.stringify({
                    APIKey: AISSTREAM_API_KEY,
                    BoundingBoxes: [[[-90, -180], [90, 180]]],
                    FilterMessageTypes: ['PositionReport']
                }));
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.MessageType === 'PositionReport') {
                        this.processAISStreamPosition(data);
                    }
                } catch (error) {
                    console.error('Error parsing AIS message:', error);
                }
            };

            this.ws.onerror = (error) => console.error('AISStream error:', error);
            this.ws.onclose = () => this.attemptReconnect();
        } catch (error) {
            console.error('Failed to connect to AISStream:', error);
        }
    }

    processAISStreamPosition(data) {
        const msg = data.Message?.PositionReport;
        const mmsi = data.MetaData?.MMSI;
        if (!msg || !mmsi || !msg.Latitude || !msg.Longitude) return;

        this.vessels.set(mmsi, new TrackedVehicle(
            `VESSEL-${mmsi}`,
            'vessel',
            msg.Latitude,
            msg.Longitude,
            {
                mmsi, name: data.MetaData?.ShipName || `Vessel ${mmsi}`,
                speed: msg.Sog || 0, heading: msg.Cog || 0,
                destination: data.MetaData?.Destination || 'Unknown',
                shipType: data.MetaData?.ShipType || 'Cargo', icon: '🚢'
            }
        ));

        if (this.vessels.size > 500) {
            const oldestKey = this.vessels.keys().next().value;
            this.vessels.delete(oldestKey);
        }
    }

    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
            setTimeout(() => this.connectAISStream(), delay);
        }
    }

    getVessels() {
        return Array.from(this.vessels.values());
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        if (this.myShipTrackingInterval) clearInterval(this.myShipTrackingInterval);
        if (this.aisHubInterval) clearInterval(this.aisHubInterval);
    }
}

// ===== FLIGHT TRACKING (OpenSky Network with Cargo Filter) =====
class FlightTracker {
    constructor() {
        this.flights = new Map();
        this.lastFetch = 0;
        this.fetchInterval = 10000;
        this.isLoading = false;
    }

    async fetchFlights() {
        const now = Date.now();
        if (now - this.lastFetch < this.fetchInterval || this.isLoading) {
            return this.getFlights();
        }

        this.isLoading = true;
        this.lastFetch = now;

        try {
            const url = 'https://opensky-network.org/api/states/all';
            const options = {};

            if (OPENSKY_USERNAME && OPENSKY_PASSWORD) {
                options.headers = { 'Authorization': `Basic ${btoa(`${OPENSKY_USERNAME}:${OPENSKY_PASSWORD}`)}` };
            }

            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`OpenSky API error: ${response.status}`);

            const data = await response.json();
            this.processFlightData(data);
        } catch (error) {
            console.error('Error fetching flight data:', error);
        } finally {
            this.isLoading = false;
        }

        return this.getFlights();
    }

    processFlightData(data) {
        if (!data.states) return;

        this.flights.clear();
        let cargoCount = 0, otherCount = 0;

        data.states.slice(0, 300).forEach(state => {
            const [icao24, callsign, origin_country, , , longitude, latitude, baro_altitude, on_ground, velocity, true_track, vertical_rate, , geo_altitude] = state;

            if (on_ground || !latitude || !longitude) return;

            const cleanCallsign = callsign?.trim() || icao24;
            const isCargo =
                cleanCallsign.includes('CARGO') || cleanCallsign.includes('FDX') ||
                cleanCallsign.includes('UPS') || cleanCallsign.includes('DHL') ||
                cleanCallsign.includes('ABX') || cleanCallsign.includes('GTI') ||
                cleanCallsign.includes('CKS') || cleanCallsign.match(/^[A-Z]{3}\d{1,4}F$/);

            if (!isCargo && otherCount > 50) return;
            if (isCargo) cargoCount++; else otherCount++;

            this.flights.set(icao24, new TrackedVehicle(
                `FLIGHT-${icao24}`,
                'flight',
                latitude,
                longitude,
                {
                    icao24, callsign: cleanCallsign, origin_country,
                    altitude: Math.round(baro_altitude || geo_altitude || 0),
                    velocity: Math.round(velocity || 0),
                    heading: Math.round(true_track || 0),
                    vertical_rate: vertical_rate || 0,
                    isCargo, icon: isCargo ? '📦' : '✈️'
                }
            ));
        });

        console.log(`✈️ Loaded ${cargoCount} cargo flights, ${otherCount} other flights`);
    }

    getFlights() {
        return Array.from(this.flights.values());
    }
}

// ===== RAIL TRACKING (Enhanced Simulation) =====
class RailTracker {
    constructor() {
        this.trains = [];
        this.initializeTrains();
    }

    initializeTrains() {
        const routes = [
            { start: { name: 'Seattle', lat: 47.6062, lng: -122.3321 }, end: { name: 'Chicago', lat: 41.8781, lng: -87.6298 } },
            { start: { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 }, end: { name: 'New Orleans', lat: 29.9511, lng: -90.0715 } },
            { start: { name: 'Miami', lat: 25.7617, lng: -80.1918 }, end: { name: 'New York', lat: 40.7128, lng: -74.0060 } },
            { start: { name: 'Atlanta', lat: 33.7490, lng: -84.3880 }, end: { name: 'Washington DC', lat: 38.9072, lng: -77.0369 } },
            { start: { name: 'Vancouver', lat: 49.2827, lng: -123.1207 }, end: { name: 'Toronto', lat: 43.6532, lng: -79.3832 } },
        ];

        routes.forEach((route, idx) => {
            this.trains.push({
                id: `RAIL-${1000 + idx}`, type: 'rail',
                start: route.start, end: route.end,
                progress: Math.random(), speed: 0.08,
                metadata: {
                    name: `Freight ${1000 + idx}`,
                    carrier: ['BNSF', 'UP', 'CSX', 'NS', 'CP'][idx],
                    cargo: ['Containers', 'Coal', 'Grain', 'Automobiles', 'Intermodal'][idx],
                    icon: '🚆'
                }
            });
        });
    }

    updatePositions() {
        this.trains.forEach(train => {
            train.progress += train.speed * 0.005;
            if (train.progress >= 1) {
                train.progress = 0;
                [train.start, train.end] = [train.end, train.start];
            }

            train.lat = train.start.lat + (train.end.lat - train.start.lat) * train.progress;
            train.lng = train.start.lng + (train.end.lng - train.start.lng) * train.progress;
        });

        return this.trains.map(t => new TrackedVehicle(
            t.id, t.type, t.lat, t.lng,
            { ...t.metadata, destination: t.end.name, origin: t.start.name }
        ));
    }

    getTrains() {
        return this.updatePositions();
    }
}

// ===== MAIN SERVICE =====
class RealTimeTrackingService {
    constructor() {
        this.vesselTracker = new VesselTracker();
        this.flightTracker = new FlightTracker();
        this.railTracker = new RailTracker();
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;

        if (ENABLE_REAL_TRACKING) {
            console.log('🌐 Initializing Real-Time Tracking Service');
            this.vesselTracker.connect();
        } else {
            console.log('📍 Real-time tracking disabled. Using simulated data.');
        }

        this.initialized = true;
    }

    async getAllVehicles() {
        if (!ENABLE_REAL_TRACKING) {
            return this.railTracker.getTrains();
        }

        const vessels = this.vesselTracker.getVessels();
        const flights = await this.flightTracker.fetchFlights();
        const trains = this.railTracker.getTrains();

        return [...vessels, ...flights, ...trains];
    }

    async getVehiclesByType(type) {
        const all = await this.getAllVehicles();
        return all.filter(v => v.type === type);
    }

    shutdown() {
        this.vesselTracker.disconnect();
        this.initialized = false;
    }
}

// Export singleton instance
export const realTimeTrackingService = new RealTimeTrackingService();

// Convenience exports
export const initRealTimeTracking = () => realTimeTrackingService.initialize();
export const getAllTrackedVehicles = () => realTimeTrackingService.getAllVehicles();
export const getTrackedVehiclesByType = (type) => realTimeTrackingService.getVehiclesByType(type);
export const shutdownTracking = () => realTimeTrackingService.shutdown();
