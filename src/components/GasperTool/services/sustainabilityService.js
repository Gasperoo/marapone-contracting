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
