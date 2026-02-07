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
    const carriers = CARRIER_DATABASE[request.serviceType] || CARRIER_DATABASE.air;

    // Calculate distance factor
    const distanceFactor = calculateDistanceFactor(request.origin, request.destination);

    // Generate rates for each carrier
    const rates = carriers.map((carrier) => {
        const basePrice = request.weight * carrier.baseRate * distanceFactor;
        const transitDays = Math.round(
            (request.serviceType === 'ocean' ? 28 : request.serviceType === 'ground' ? 5 : 3) / carrier.speedFactor
        );

        // Calculate score based on preferences
        let score = 50; // Base score

        if (request.preferences.prioritizeSpeed) {
            score += (carrier.speedFactor - 0.5) * 30;
        }

        if (request.preferences.prioritizeCost) {
            const avgRate = carriers.reduce((sum, c) => sum + c.baseRate, 0) / carriers.length;
            score += ((avgRate - carrier.baseRate) / avgRate) * 30;
        }

        score += carrier.reliabilityScore * 20;

        // Features based on carrier
        const features = [];
        if (carrier.reliabilityScore > 0.9) features.push('Real-time tracking');
        if (carrier.speedFactor > 1.1) features.push('Express delivery');
        if (request.serviceType === 'ocean') features.push('Door-to-door service');
        features.push('Insurance included');

        return {
            carrier: carrier.name,
            service: getServiceName(request.serviceType, carrier.name),
            price: Math.round(basePrice * 100) / 100,
            transitDays,
            reliability: carrier.reliabilityScore,
            features,
            restrictions: getRestrictions(request.serviceType),
            score: Math.round(score),
        };
    });

    // Sort by score
    rates.sort((a, b) => b.score - a.score);

    // Generate AI recommendation
    const topRate = rates[0];
    const avgPrice = rates.reduce((sum, r) => sum + r.price, 0) / rates.length;
    const savingsVsAverage = avgPrice - topRate.price;

    const reasoning = generateRecommendationReasoning(topRate, request.preferences, savingsVsAverage);
    const tradeoffs = generateTradeoffs(topRate, rates);

    return {
        request,
        rates,
        recommendation: {
            carrier: topRate.carrier,
            reasoning,
            savingsVsAverage,
            tradeoffs,
        },
        timestamp: new Date().toISOString(),
    };
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
