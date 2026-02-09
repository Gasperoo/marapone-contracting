// Real-Time Cargo Tracking Service
// Integrates multiple free APIs for vessel, flight, and rail tracking

const ENABLE_REAL_TRACKING = import.meta.env.VITE_ENABLE_REAL_TRACKING === 'true';
const AISSTREAM_API_KEY = import.meta.env.VITE_AISSTREAM_API_KEY;
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

// ===== VESSEL TRACKING (AISStream.io) =====
class VesselTracker {
    constructor() {
        this.ws = null;
        this.vessels = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect() {
        if (!AISSTREAM_API_KEY) {
            console.warn('AISStream API key not configured. Vessel tracking disabled.');
            return;
        }

        try {
            this.ws = new WebSocket('wss://stream.aisstream.io/v0/stream');

            this.ws.onopen = () => {
                console.log('✅ Connected to AISStream.io');
                this.reconnectAttempts = 0;

                // Subscribe to global vessel positions
                const subscriptionMessage = {
                    APIKey: AISSTREAM_API_KEY,
                    BoundingBoxes: [
                        [[-90, -180], [90, 180]] // Global coverage
                    ],
                    FilterMessageTypes: ['PositionReport'] // Only position updates
                };

                this.ws.send(JSON.stringify(subscriptionMessage));
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.MessageType === 'PositionReport') {
                        this.processVesselPosition(data);
                    }
                } catch (error) {
                    console.error('Error parsing AIS message:', error);
                }
            };

            this.ws.onerror = (error) => {
                console.error('AISStream WebSocket error:', error);
            };

            this.ws.onclose = () => {
                console.log('AISStream connection closed');
                this.attemptReconnect();
            };
        } catch (error) {
            console.error('Failed to connect to AISStream:', error);
        }
    }

    processVesselPosition(data) {
        const msg = data.Message?.PositionReport;
        if (!msg) return;

        const mmsi = data.MetaData?.MMSI;
        const lat = msg.Latitude;
        const lng = msg.Longitude;

        if (!mmsi || !lat || !lng) return;

        const vessel = new TrackedVehicle(
            `VESSEL-${mmsi}`,
            'vessel',
            lat,
            lng,
            {
                mmsi: mmsi,
                name: data.MetaData?.ShipName || `Vessel ${mmsi}`,
                speed: msg.Sog || 0, // Speed over ground
                heading: msg.Cog || 0, // Course over ground
                destination: data.MetaData?.Destination || 'Unknown',
                shipType: data.MetaData?.ShipType || 'Cargo',
                icon: '🚢'
            }
        );

        this.vessels.set(mmsi, vessel);

        // Limit stored vessels to prevent memory issues
        if (this.vessels.size > 500) {
            const oldestKey = this.vessels.keys().next().value;
            this.vessels.delete(oldestKey);
        }
    }

    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
            console.log(`Reconnecting to AISStream in ${delay}ms (attempt ${this.reconnectAttempts})`);
            setTimeout(() => this.connect(), delay);
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
    }
}

// ===== FLIGHT TRACKING (OpenSky Network) =====
class FlightTracker {
    constructor() {
        this.flights = new Map();
        this.lastFetch = 0;
        this.fetchInterval = 10000; // 10 seconds (respects rate limits)
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

            // Add authentication if credentials provided
            if (OPENSKY_USERNAME && OPENSKY_PASSWORD) {
                const auth = btoa(`${OPENSKY_USERNAME}:${OPENSKY_PASSWORD}`);
                options.headers = { 'Authorization': `Basic ${auth}` };
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`OpenSky API error: ${response.status}`);
            }

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

        // Process up to 200 flights to avoid overwhelming the map
        const states = data.states.slice(0, 200);

        states.forEach(state => {
            const [
                icao24, callsign, origin_country, time_position, last_contact,
                longitude, latitude, baro_altitude, on_ground, velocity,
                true_track, vertical_rate, sensors, geo_altitude, squawk, spi, position_source
            ] = state;

            // Skip grounded aircraft
            if (on_ground || !latitude || !longitude) return;

            const flight = new TrackedVehicle(
                `FLIGHT-${icao24}`,
                'flight',
                latitude,
                longitude,
                {
                    icao24: icao24,
                    callsign: callsign?.trim() || icao24,
                    origin_country: origin_country,
                    altitude: Math.round(baro_altitude || geo_altitude || 0),
                    velocity: Math.round(velocity || 0),
                    heading: Math.round(true_track || 0),
                    vertical_rate: vertical_rate || 0,
                    icon: '✈️'
                }
            );

            this.flights.set(icao24, flight);
        });
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
        // Major North American freight corridors
        const routes = [
            // BNSF Northern Transcon
            { start: { name: 'Seattle', lat: 47.6062, lng: -122.3321 }, end: { name: 'Chicago', lat: 41.8781, lng: -87.6298 } },
            // Union Pacific Sunset Route
            { start: { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 }, end: { name: 'New Orleans', lat: 29.9511, lng: -90.0715 } },
            // CSX I-95 Corridor
            { start: { name: 'Miami', lat: 25.7617, lng: -80.1918 }, end: { name: 'New York', lat: 40.7128, lng: -74.0060 } },
            // Norfolk Southern Crescent Corridor
            { start: { name: 'Atlanta', lat: 33.7490, lng: -84.3880 }, end: { name: 'Washington DC', lat: 38.9072, lng: -77.0369 } },
            // Canadian Pacific
            { start: { name: 'Vancouver', lat: 49.2827, lng: -123.1207 }, end: { name: 'Toronto', lat: 43.6532, lng: -79.3832 } },
        ];

        routes.forEach((route, idx) => {
            const train = {
                id: `RAIL-${1000 + idx}`,
                type: 'rail',
                start: route.start,
                end: route.end,
                progress: Math.random(),
                speed: 0.08, // Realistic freight speed
                metadata: {
                    name: `Freight ${1000 + idx}`,
                    carrier: ['BNSF', 'UP', 'CSX', 'NS', 'CP'][idx],
                    cargo: ['Containers', 'Coal', 'Grain', 'Automobiles', 'Intermodal'][idx],
                    icon: '🚆'
                }
            };
            this.trains.push(train);
        });
    }

    updatePositions() {
        this.trains.forEach(train => {
            train.progress += train.speed * 0.005;
            if (train.progress >= 1) {
                train.progress = 0;
                // Swap start/end for round trip
                const temp = train.start;
                train.start = train.end;
                train.end = temp;
            }

            const lat = train.start.lat + (train.end.lat - train.start.lat) * train.progress;
            const lng = train.start.lng + (train.end.lng - train.start.lng) * train.progress;

            train.lat = lat;
            train.lng = lng;
        });

        return this.trains.map(t => new TrackedVehicle(
            t.id,
            t.type,
            t.lat,
            t.lng,
            {
                ...t.metadata,
                destination: t.end.name,
                origin: t.start.name
            }
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
            // Flight data fetched on-demand to respect rate limits
        } else {
            console.log('📍 Real-time tracking disabled. Using simulated data.');
        }

        this.initialized = true;
    }

    async getAllVehicles() {
        if (!ENABLE_REAL_TRACKING) {
            return this.railTracker.getTrains(); // Fallback to simulated rail only
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
