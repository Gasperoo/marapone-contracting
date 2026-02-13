// Rate Optimization Service
// Ported from prototype

const CARRIER_DATABASE = {
    air: [
        { name: 'DHL Express', baseRate: 8.5, speedFactor: 1.2, reliabilityScore: 0.95 },
        { name: 'FedEx International', baseRate: 8.2, speedFactor: 1.15, reliabilityScore: 0.93 },
        { name: 'UPS Worldwide', baseRate: 8.3, speedFactor: 1.18, reliabilityScore: 0.94 },
        { name: 'Emirates SkyCargo', baseRate: 7.8, speedFactor: 1.1, reliabilityScore: 0.91 },
    ],
    ocean: [
        { name: 'Maersk', baseRate: 2.0, speedFactor: 0.8, reliabilityScore: 0.88 },
        { name: 'MSC', baseRate: 1.8, speedFactor: 0.75, reliabilityScore: 0.85 },
        { name: 'CMA CGM', baseRate: 1.9, speedFactor: 0.78, reliabilityScore: 0.87 },
        { name: 'COSCO', baseRate: 1.7, speedFactor: 0.72, reliabilityScore: 0.83 },
    ],
    ground: [
        { name: 'Purolator', baseRate: 3.5, speedFactor: 1.0, reliabilityScore: 0.91 },
        { name: 'Canada Post', baseRate: 3.2, speedFactor: 0.9, reliabilityScore: 0.88 },
        { name: 'FedEx Ground', baseRate: 3.4, speedFactor: 0.95, reliabilityScore: 0.90 },
    ],
    express: [
        { name: 'DHL Express', baseRate: 12.0, speedFactor: 1.5, reliabilityScore: 0.96 },
        { name: 'FedEx Priority', baseRate: 11.5, speedFactor: 1.45, reliabilityScore: 0.95 },
        { name: 'UPS Express', baseRate: 11.8, speedFactor: 1.48, reliabilityScore: 0.95 },
    ],
};


export function compareCarrierRates(request) {
    // Generate multi-modal results if no specific mode is locked, or just the requested one
    const modes = request.serviceType === 'all' ? ['ocean', 'air', 'ground', 'rail'] : [request.serviceType];

    let allRates = [];

    modes.forEach(mode => {
        if (!CARRIER_DATABASE[mode]) return;

        const carrierRates = CARRIER_DATABASE[mode].map(carrier => {
            const distanceFactor = calculateDistanceFactor(request.origin, request.destination);
            // Dynamic base price calculation with surcharge logic
            const baseFreight = request.weight * carrier.baseRate * distanceFactor;

            // Generate detailed cost breakdown
            const costBreakdown = generateCostBreakdown(baseFreight, mode);
            const totalPrice = Object.values(costBreakdown).reduce((a, b) => a + b, 0);

            // Transit time calc
            const baseTransit = mode === 'ocean' ? 28 : mode === 'rail' ? 18 : mode === 'ground' ? 5 : 3;
            const transitDays = Math.round(baseTransit / carrier.speedFactor);

            // Sustainability Metrics (kg CO2e)
            const emissions = calculateEmissions(request.weight, distanceFactor * 1000, mode);

            // Historical Trend (simulated)
            const history = {
                trend: Math.random() > 0.5 ? 'up' : 'down',
                percent: Math.floor(Math.random() * 15) + 1,
                forecast: Math.random() > 0.5 ? 'stable' : 'increasing'
            };

            return {
                id: `${mode}-${carrier.name}-${Date.now()}`,
                mode: mode,
                carrier: carrier.name,
                service: getServiceName(mode, carrier.name),
                price: Math.round(totalPrice * 100) / 100,
                costBreakdown,
                transitDays,
                reliability: carrier.reliabilityScore,
                emissions,
                history,
                features: generateFeatures(carrier, mode),
                restrictions: getRestrictions(mode),
                score: calculateScore(totalPrice, transitDays, carrier.reliabilityScore, request.preferences)
            };
        });
        allRates = [...allRates, ...carrierRates];
    });

    // Sort by checking preferences (default to lowest price)
    allRates.sort((a, b) => a.price - b.price);

    return {
        request,
        rates: allRates,
        route: {
            origin: { name: request.origin, coords: getCoordinates(request.origin) },
            destination: { name: request.destination, coords: getCoordinates(request.destination) }
        },
        recommendation: generateSmartRecommendation(allRates, request.preferences),
        timestamp: new Date().toISOString(),
    };
}

function generateCostBreakdown(baseFreight, mode) {
    if (mode === 'ocean') {
        return {
            freight: Math.round(baseFreight * 0.7),
            baf: Math.round(baseFreight * 0.15), // Bunker Adjustment Factor
            caf: Math.round(baseFreight * 0.05), // Currency Adjustment Factor
            thc: Math.round(baseFreight * 0.1),  // Terminal Handling Charge
            docs: 45
        };
    } else if (mode === 'air') {
        return {
            freight: Math.round(baseFreight * 0.8),
            fuel_surcharge: Math.round(baseFreight * 0.15),
            security: Math.round(baseFreight * 0.05),
            screening: 35
        };
    } else {
        return {
            freight: Math.round(baseFreight * 0.9),
            fuel: Math.round(baseFreight * 0.1),
            toll: 25
        };
    }
}

function calculateEmissions(weightKg, distanceKm, mode) {
    // CO2 factors (kg CO2e per ton-km)
    const factors = { ocean: 0.01, rail: 0.02, ground: 0.06, air: 0.55 };
    const emissions = (weightKg / 1000) * distanceKm * (factors[mode] || 0.05);
    return Math.round(emissions);
}

function generateFeatures(carrier, mode) {
    const features = [];
    if (carrier.reliabilityScore > 0.9) features.push('Guaranteed Capacity');
    if (mode === 'ocean') features.push('Carbon Offset Available');
    if (mode === 'air') features.push('Prio Boarding');
    features.push('Real-time Tracking');
    return features;
}

function calculateScore(price, days, reliability, prefs) {
    let score = 50;
    score -= price * 0.01; // Lower price = higher score
    if (prefs?.prioritizeSpeed) score -= days * 2; // Lower days = higher score
    score += reliability * 100;
    return Math.round(score);
}

function generateSmartRecommendation(rates, prefs) {
    // Find absolute bests
    const cheapest = rates.reduce((prev, curr) => prev.price < curr.price ? prev : curr);
    const fastest = rates.reduce((prev, curr) => prev.transitDays < curr.transitDays ? prev : curr);
    const greenest = rates.reduce((prev, curr) => prev.emissions < curr.emissions ? prev : curr);

    return {
        cheapest: { ...cheapest, badge: 'Best Value' },
        fastest: { ...fastest, badge: 'Fastest' },
        greenest: { ...greenest, badge: 'Eco Choice' },
        insight: `Going with ${greenest.carrier} via ${greenest.mode} saves ${((1 - greenest.emissions / rates.find(r => r.mode === 'air')?.emissions) * 100).toFixed(0)}% CO2 vs Air Freight.`
    };
}

function getCoordinates(city) {
    // Mock coordinates for map
    const coords = {
        'Shanghai': [121.47, 31.23],
        'New York': [-74.00, 40.71],
        'London': [-0.12, 51.50],
        'Toronto': [-79.38, 43.65],
        'Vancouver': [-123.12, 49.28],
        'Montreal': [-73.56, 45.50],
        'Los Angeles': [-118.24, 34.05]
    };
    return coords[city] || [0, 0];
}

function calculateCustomsDuties(price, _origin, _destination) {
    // Simplified customs duty calculation
    const o = _origin.toLowerCase();
    const d = _destination.toLowerCase();

    if ((o.includes('china') || o.includes('asia')) && (d.includes('canada') || d.includes('usa'))) {
        return price * 0.05; // 5% duty
    }
    if ((o.includes('europe') || o.includes('uk')) && (d.includes('canada') || d.includes('usa'))) {
        return price * 0.03; // 3% duty
    }
    if ((o.includes('usa') || o.includes('mexico')) && d.includes('canada')) {
        return price * 0.01; // 1% duty (NAFTA/USMCA)
    }

    return price * 0.02; // Default 2% duty
}

function calculateDistanceFactor(origin, destination) {
    // Simplified distance calculation
    const o = origin.toLowerCase();
    const d = destination.toLowerCase();

    if ((o.includes('china') || o.includes('asia')) && (d.includes('canada') || d.includes('usa'))) {
        return 2.5;
    }
    if ((o.includes('europe') || o.includes('uk')) && (d.includes('canada') || d.includes('usa'))) {
        return 2.0;
    }
    if ((o.includes('usa') || o.includes('mexico')) && d.includes('canada')) {
        return 1.2;
    }

    return 1.5; // Default
}

function getServiceName(serviceType, carrierName) {
    const serviceNames = {
        air: {
            'DHL Express': 'Express Worldwide',
            'FedEx International': 'International Priority',
            'UPS Worldwide': 'Worldwide Express',
            'Emirates SkyCargo': 'Air Freight',
        },
        ocean: {
            Maersk: 'Ocean FCL',
            MSC: 'Standard Ocean',
            'CMA CGM': 'Ocean Freight',
            COSCO: 'Container Service',
        },
        ground: {
            Purolator: 'Ground Service',
            'Canada Post': 'Expedited Parcel',
            'FedEx Ground': 'Ground Economy',
        },
        express: {
            'DHL Express': 'Same Day',
            'FedEx Priority': 'Priority Overnight',
            'UPS Express': 'Next Day Air',
        },
    };

    return serviceNames[serviceType]?.[carrierName] || 'Standard Service';
}

function getRestrictions(serviceType) {
    const restrictions = [];

    if (serviceType === 'air' || serviceType === 'express') {
        restrictions.push('Hazmat restrictions apply');
        restrictions.push('Battery shipments require special documentation');
    }

    if (serviceType === 'ocean') {
        restrictions.push('Minimum volume requirements may apply');
        restrictions.push('Port-to-port service only');
    }

    return restrictions;
}

function generateRecommendationReasoning(topRate, preferences, savings) {
    const reasons = [];

    if (preferences.prioritizeSpeed) {
        reasons.push(`Fastest transit time of ${topRate.transitDays} days`);
    }

    if (preferences.prioritizeCost && savings > 0) {
        reasons.push(`$${savings.toFixed(2)} cheaper than average`);
    }

    if (topRate.reliability > 0.9) {
        reasons.push(`Excellent reliability score of ${(topRate.reliability * 100).toFixed(0)}%`);
    }

    if (topRate.features.length > 3) {
        reasons.push(`Comprehensive features including ${topRate.features.slice(0, 2).join(' and ')}`);
    }

    return reasons.join('. ') + '.';
}

function generateTradeoffs(topRate, allRates) {
    const tradeoffs = [];

    // Find cheapest option
    const cheapest = allRates.reduce((min, r) => (r.price < min.price ? r : min));
    if (cheapest.carrier !== topRate.carrier && cheapest.price < topRate.price * 0.9) {
        tradeoffs.push(
            `${cheapest.carrier} is ${((1 - cheapest.price / topRate.price) * 100).toFixed(0)}% cheaper but has lower reliability`
        );
    }

    // Find fastest option
    const fastest = allRates.reduce((min, r) => (r.transitDays < min.transitDays ? r : min));
    if (fastest.carrier !== topRate.carrier) {
        tradeoffs.push(`${fastest.carrier} is ${topRate.transitDays - fastest.transitDays} days faster`);
    }

    return tradeoffs;
}

export function recommendBestOption(rates, _userHistory) {
    return rates[0];
}

export function estimateReturnCost(request) {
    // Base cost calculation
    const distanceFactor = calculateDistanceFactor(request.origin, request.destination);
    const baseShippingCost = request.weight * 4.5 * distanceFactor; // Slightly higher than forward logistics

    // Return reason affects cost
    const reasonMultiplier = {
        defective: 1.0, // Supplier usually covers
        wrong_item: 1.0, // Company covers
        customer_return: 1.2, // May charge customer
        warranty: 1.1,
        other: 1.15,
    }[request.returnReason];

    const shippingCost = baseShippingCost * reasonMultiplier;

    // Customs and duties (often waived for returns but not always)
    const customsCost = calculateCustomsDuties(request.value, request.origin, request.destination);

    // Handling and inspection
    const handlingCost = 25 + request.value * 0.01;

    // Insurance
    const insuranceCost = request.value * 0.005;

    const totalCost = shippingCost + customsCost + handlingCost + insuranceCost;

    // Determine recommended carrier
    const recommendedCarrier = request.weight > 100 ? 'Freight Forwarder' :
        request.returnReason === 'defective' ? 'UPS' : 'Purolator';

    // Transit days
    const transitDays = request.weight > 100 ? 10 : 5;

    // Customs implications
    const customsImplications = [
        'Return shipment must reference original import documentation',
        'Duty drawback may be available for returned goods',
    ];

    if (request.returnReason === 'defective') {
        customsImplications.push('Defective goods may qualify for duty exemption');
    }

    // Required documents
    const requiredDocuments = [
        'Return Merchandise Authorization (RMA)',
        'Original commercial invoice',
        'Packing list',
        'Proof of defect (if applicable)',
    ];

    // Special instructions
    const specialInstructions = [
        'Clearly mark package as "RETURN SHIPMENT"',
        'Include RMA number on all shipping labels',
    ];

    if (request.returnReason === 'defective') {
        specialInstructions.push('Photograph defect before shipping');
        specialInstructions.push('Use original packaging if possible');
    }

    return {
        request,
        estimatedCost: Math.round(totalCost * 100) / 100,
        recommendedCarrier,
        transitDays,
        customsImplications,
        requiredDocuments,
        specialInstructions,
        costBreakdown: {
            shipping: Math.round(shippingCost * 100) / 100,
            customs: Math.round(customsCost * 100) / 100,
            handling: Math.round(handlingCost * 100) / 100,
            insurance: Math.round(insuranceCost * 100) / 100,
        },
    };
}

export function suggestReturnRoute(_origin, _destination) {
    return [
        'Direct carrier pickup from customer location',
        'Drop-off at nearest carrier depot',
        'Consolidated return via regional distribution center',
    ];
}
