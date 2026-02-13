// Sustainability / Carbon Footprint Service
// Ported from prototype

export function calculateCarbonFootprint(origin, destination, weightKg) {
    // Mock distance based on locations (simplified logic)
    const distanceKm = 12000; // Approx China to Toronto

    // Emission factors (kg CO2e per ton-km)
    const factors = {
        air: 0.5,
        ocean: 0.01,
        rail: 0.05,
        truck: 0.1,
    };

    const estimates = [
        {
            routeId: 'air-express',
            origin,
            destination,
            distanceKm,
            mode: 'air',
            intensityFactor: factors.air,
            co2eKg: (weightKg / 1000) * distanceKm * factors.air,
        },
        {
            routeId: 'ocean-freight',
            origin,
            destination,
            distanceKm,
            mode: 'ocean',
            intensityFactor: factors.ocean,
            co2eKg: (weightKg / 1000) * distanceKm * factors.ocean,
        },
    ];

    const airEmissions = estimates.find(e => e.mode === 'air')?.co2eKg || 0;
    const oceanEmissions = estimates.find(e => e.mode === 'ocean')?.co2eKg || 0;

    return {
        totalEmissions: airEmissions, // Assuming default is Air for this scenario
        breakdownByMode: {
            'Air Freight': airEmissions,
            'Ocean Freight': oceanEmissions,
            'Rail': (weightKg / 1000) * distanceKm * factors.rail,
        },
        timelineData: [
            { period: 'Jan', emissions: 4500 },
            { period: 'Feb', emissions: 4200 },
            { period: 'Mar', emissions: 3800 }, // Reducing
            { period: 'Apr', emissions: 4100 },
        ],
        recommendations: [
            {
                type: 'mode_shift',
                description: 'Switching from Air to Ocean saves 98% of carbon emissions for this route.',
                potentialSavingsKg: airEmissions - oceanEmissions,
            },
            {
                type: 'consolidation',
                description: 'Consolidating shipments to reduce frequency by 20% can save ~500kg CO2e annually.',
                potentialSavingsKg: 500,
            },
        ],
        offsetOptions: [
            {
                provider: 'Reforestation Pro',
                costPerTon: 15, // USD
                projectType: 'Tree Planting',
                totalCost: (airEmissions / 1000) * 15,
            },
            {
                provider: 'Clean Energy Fund',
                costPerTon: 22, // USD
                projectType: 'Wind Farm Development',
                totalCost: (airEmissions / 1000) * 22,
            },
        ],
    };
}

// ============================================================================
// ECO SENTINEL - Advanced ESG Command Center
// ============================================================================

export function getGlobalHeatmapData() {
    // Mock data for Global Emissions Heatmap
    return [
        { lat: 31.2304, lng: 121.4737, intensity: 0.95, type: 'source', location: 'Shanghai, CN', status: 'High Intensity' },
        { lat: 40.7128, lng: -74.0060, intensity: 0.75, type: 'source', location: 'New York, USA', status: 'Processing Hub' },
        { lat: -23.5505, lng: -46.6333, intensity: 0.85, type: 'offset', location: 'Amazon Rainforest', status: 'Reforestation Active' },
        { lat: 51.5074, lng: -0.1278, intensity: 0.40, type: 'source', location: 'London, UK', status: 'Low Carbon Zone' },
        { lat: 1.3521, lng: 103.8198, intensity: 0.60, type: 'source', location: 'Singapore', status: 'Sustainable Bunkering' },
        { lat: -15.7938, lng: -47.8828, intensity: 0.90, type: 'offset', location: 'Cerrado Region', status: 'Bio-char Project' }
    ];
}

export function getESGScorecard() {
    return {
        overall: 78,
        levers: [
            { id: 'scope1', label: 'Scope 1 (Direct)', value: 1240, unit: 'tCO2e', trend: 'down', status: 'good' },
            { id: 'scope2', label: 'Scope 2 (Energy)', value: 850, unit: 'tCO2e', trend: 'up', status: 'warning' },
            { id: 'scope3', label: 'Scope 3 (Supply Chain)', value: 4520, unit: 'tCO2e', trend: 'down', status: 'good' }
        ],
        milestones: [
            { label: 'Net Zero 2030', progress: 45 },
            { label: 'RE100 Commitment', progress: 80 }
        ]
    };
}

export function getGreenCorridors() {
    return [
        {
            route: 'Shanghai → Rotterdam',
            mode: 'Ocean (Bio-LNG)',
            reduction: '85%',
            costImpact: '+12%',
            reliability: 'High'
        },
        {
            route: 'Guangzhou → Paris',
            mode: 'Rail (Electric)',
            reduction: '72%',
            costImpact: '+20%',
            reliability: 'Medium'
        },
        {
            route: 'Los Angeles → New York',
            mode: 'Truck (Hydrogen)',
            reduction: '92%',
            costImpact: '+35%',
            reliability: 'Experimental'
        }
    ];
}

