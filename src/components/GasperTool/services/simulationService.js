// Simulation Service
// Ported from prototype

import { generateId } from '../../../lib/utils';

export function runSupplyChainSimulation(params) {
    const results = params.scenarios.map((scenario) => {
        // Advanced Simulation Logic: Node-Based Impact Propagation
        // 1. Identify affected nodes based on scenario
        const affectedNodes = identifyAffectedNodes(scenario.type, params.route);

        // 2. Calculate propagation speed (days per node hop)
        const propagationSpeed = calculatePropagation(scenario.severity);

        // 3. Financial Risk Calculation (Revenue at Risk)
        const dailyRevenue = params.currentCost * 1.5; // Simulated revenue margin
        const potentialLoss = calculateFinancialRisk(dailyRevenue, scenario.severity, scenario.type);

        // 4. AI Prediction Confidence
        const aiConfidence = 85 + Math.floor(Math.random() * 10); // 85-95% confidence

        return {
            id: generateId(),
            scenarioName: `${scenario.type.replace(/_/g, ' ').toUpperCase()} - ${scenario.severity}`,
            affectedNodes,
            propagationSpeed,
            financialImpact: {
                revenueAtRisk: potentialLoss,
                insuranceCoverage: potentialLoss * 0.4,
                netExposure: potentialLoss * 0.6
            },
            operationalImpact: {
                delayDays: Math.round(propagationSpeed * 2.5), // Simulated hop delay
                efficiencyDrop: Math.round(Math.random() * 30 + 10) // 10-40% efficiency drop
            },
            riskScore: calculateRiskScore(scenario.severity, potentialLoss),
            aiPrediction: {
                confidence: aiConfidence,
                insight: generateAIInsight(scenario.type, affectedNodes.length, potentialLoss),
                nextBestAction: generateNextBestAction(scenario.type)
            },
            mitigations: generateMitigations(scenario.type, scenario.severity),
            timestamp: new Date().toISOString()
        };
    });

    return {
        id: generateId(),
        parameters: params,
        results,
        networkStatus: {
            activeNodes: 1420,
            healthParams: { latency: '24ms', uptime: '99.9%' },
            globalRiskLevel: 'Moderate'
        },
        createdAt: new Date().toISOString(),
        status: 'completed',
    };
}



function identifyAffectedNodes(type, route) {
    // Simulate identifying nodes in the graph
    const baseNodes = ['Shanghai Port', 'Suez Canal', 'Rotterdam Hub'];
    if (type === 'port_strike') return ['Los Angeles Port', 'Long Beach Terminal', 'Intermodal Rail A'];
    if (type === 'weather_event') return ['Gulf of Mexico Route', 'Houston Port'];
    if (type === 'supplier_bankruptcy') return ['Tier 2 Supplier - Shenzhen', 'Components Warehouse B'];
    if (type === 'cyber_attack') return ['Global Operations Center', 'Maersk Data Hub', 'Customs EDI System'];
    if (type === 'geopolitical_tension') return ['Red Sea Passage', 'Bab el-Mandeb Strait', 'Suez Canal'];
    if (type === 'supplier_insolvency') return ['Chip Manufacturer A', 'Battery Supplier B', 'Assembly Plant C'];
    return baseNodes;
}

function calculatePropagation(severity) {
    switch (severity) {
        case 'Critical': return 5; // Fast spread
        case 'High': return 3;
        case 'Medium': return 2;
        default: return 1;
    }
}

function calculateFinancialRisk(dailyRev, severity, type) {
    const riskFactor = severity === 'Critical' ? 10 : severity === 'High' ? 5 : 2;
    let multiplier = 0.8 + Math.random() * 0.4;

    // Higher risk for specific events
    if (type === 'cyber_attack') multiplier *= 1.5;
    if (type === 'geopolitical_tension') multiplier *= 1.2;

    return Math.round(dailyRev * riskFactor * multiplier);
}

function calculateRiskScore(severity, loss) {
    let score = severity === 'Critical' ? 90 : severity === 'High' ? 75 : 45;
    if (loss > 100000) score += 5;
    return Math.min(99, score);
}

function generateAIInsight(type, nodesCount, loss) {
    const insights = [
        `AI detects anomaly pattern similar to 2024 ${type} event.`,
        `Propagation analysis suggests ${nodesCount} critical nodes will be impacted within 48 hours.`,
        `Financial models predict a $${(loss / 1000).toFixed(1)}k variances if unmitigated.`,
    ];

    if (type === 'cyber_attack') {
        insights.push(`Ransomware signature detected in carrier booking system. Immediate isolation recommended.`);
        insights.push(`Data integrity compromised in 3 nodes. Switch to manual verification.`);
    }
    if (type === 'geopolitical_tension') {
        insights.push(`Hostile activity reported near key chokepoint. Insurance premiums spiking 400%.`);
    }

    return insights[Math.floor(Math.random() * insights.length)];
}

function generateNextBestAction(type) {
    if (type === 'port_strike') return 'Reroute to Seattle/Tacoma (Capacity Available)';
    if (type === 'weather_event') return 'Hold shipment at Origin Warehouse (Weather clearing in 48h)';
    if (type === 'cyber_attack') return 'Switch to offline backup protocols & notify partners';
    if (type === 'geopolitical_tension') return 'Reroute via Cape of Good Hope (+10 days transit)';
    if (type === 'supplier_insolvency') return 'Activate secondary supplier in Vietnam';
    return 'Activate redundancy protocol B-2';
}

function generateMitigations(scenarioType, severity) {
    const baseMitigations = {
        tariff_change: [
            'Explore alternative sourcing from countries with favorable trade agreements',
            'Negotiate with suppliers to share tariff burden',
            'Consider local manufacturing or assembly to reduce tariff exposure',
            'Build inventory before tariff implementation',
        ],
        port_strike: [
            'Diversify shipping routes to use alternative ports',
            'Increase safety stock levels to buffer against delays',
            'Establish relationships with multiple carriers',
            'Consider air freight for critical shipments',
        ],
        carrier_failure: [
            'Maintain backup carrier relationships',
            'Implement carrier performance monitoring',
            'Use freight forwarders with multi-carrier access',
            'Negotiate service level agreements with penalties',
        ],
        demand_spike: [
            'Implement dynamic pricing strategies',
            'Increase production capacity or secure additional suppliers',
            'Use predictive analytics for demand forecasting',
            'Build strategic inventory reserves',
        ],
        weather_event: [
            'Monitor weather forecasts and adjust shipping schedules',
            'Use alternative routes during severe weather seasons',
            'Increase insurance coverage for weather-related risks',
            'Build buffer time into delivery schedules',
        ],
        customs_delay: [
            'Ensure all documentation is complete and accurate',
            'Use licensed customs brokers',
            'Apply for trusted trader programs (e.g., C-TPAT)',
            'Pre-clear shipments when possible',
        ],
    };

    const mitigations = baseMitigations[scenarioType] || [];

    // Add severity-specific mitigations
    if (severity === 'High' || severity === 'Critical') {
        mitigations.push('Consider emergency response protocols and escalation procedures');
        mitigations.push('Engage executive leadership for strategic decision-making');
    }

    return mitigations.slice(0, 5); // Return top 5
}

function generateAlternativeRoutes(_origin, _destination, scenarioType) {
    const routes = [];

    if (scenarioType === 'port_strike' || scenarioType === 'weather_event') {
        routes.push(`Air freight via major hub (faster but 3-4x more expensive)`);
        routes.push(`Rail + truck multimodal option (moderate speed and cost)`);
        routes.push(`Alternative port routing (may add 5-7 days but avoids disruption)`);
    }

    if (scenarioType === 'tariff_change') {
        routes.push(`Source from alternative country with better tariff rates`);
        routes.push(`Partial assembly in free trade zone to reduce tariff base`);
    }

    return routes;
}

export function generateScenarioOptions(commodity, _route) {
    // Generate AI-suggested scenarios based on commodity and route
    const scenarios = [
        {
            type: 'port_strike',
            severity: 'Medium',
            description: 'Labor negotiations at major port may lead to work slowdowns',
        },
        {
            type: 'tariff_change',
            severity: 'High',
            description: 'Proposed tariff increase on this commodity category',
        },
        {
            type: 'weather_event',
            severity: 'Low',
            description: 'Seasonal weather patterns may affect shipping routes',
        },
    ];

    // Add commodity-specific scenarios
    if (commodity.toLowerCase().includes('electronic')) {
        scenarios.push({
            type: 'demand_spike',
            severity: 'Medium',
            description: 'Holiday season demand surge for electronics',
        });
    }

    return scenarios;
}

const TARIFF_SCENARIOS = {
    steel: [
        {
            scenarioName: 'Section 232 Tariff Increase',
            commodity: 'Steel Products',
            hsCode: '7208.10.00',
            route: { origin: 'China', destination: 'USA' },
            currentTariff: 25,
            proposedTariff: 50,
            effectiveDate: '2026-03-01',
            source: 'US Department of Commerce',
        },
        {
            scenarioName: 'EU CBAM Implementation',
            commodity: 'Steel Products',
            hsCode: '7208.10.00',
            route: { origin: 'China', destination: 'EU' },
            currentTariff: 0,
            proposedTariff: 15,
            effectiveDate: '2026-01-01',
            source: 'European Commission',
        },
    ],
    ev: [
        {
            scenarioName: 'EV Import Tariff',
            commodity: 'Electric Vehicles',
            hsCode: '8703.80.00',
            route: { origin: 'China', destination: 'USA' },
            currentTariff: 27.5,
            proposedTariff: 100,
            effectiveDate: '2026-06-01',
            source: 'USTR Proposed Rule',
        },
    ],
    agriculture: [
        {
            scenarioName: 'Agricultural Product Tariff',
            commodity: 'Soybeans',
            hsCode: '1201.90.00',
            route: { origin: 'USA', destination: 'China' },
            currentTariff: 33,
            proposedTariff: 50,
            effectiveDate: '2026-04-01',
            source: 'China Ministry of Commerce',
        },
    ],
    electronics: [
        {
            scenarioName: 'Consumer Electronics Tariff',
            commodity: 'Smartphones',
            hsCode: '8517.13.00',
            route: { origin: 'China', destination: 'USA' },
            currentTariff: 0,
            proposedTariff: 25,
            effectiveDate: '2026-05-01',
            source: 'USTR Section 301 Review',
        },
    ],
};

export function simulateTariffChange(commodity, route, productValue, annualVolume) {
    // Find matching scenario
    const commodityKey = Object.keys(TARIFF_SCENARIOS).find((key) =>
        commodity.toLowerCase().includes(key)
    ) || 'electronics';

    const scenarios = TARIFF_SCENARIOS[commodityKey] || TARIFF_SCENARIOS.electronics;
    const scenario = scenarios.find(
        (s) =>
            s.route.origin.toLowerCase().includes(route.origin.toLowerCase()) &&
            s.route.destination.toLowerCase().includes(route.destination.toLowerCase())
    ) || scenarios[0];

    // Calculate impact
    const currentDuty = productValue * (scenario.currentTariff / 100);
    const proposedDuty = productValue * (scenario.proposedTariff / 100);
    const additionalCost = proposedDuty - currentDuty;
    const percentageIncrease = ((proposedDuty - currentDuty) / currentDuty) * 100;

    // Estimate volume impact (higher tariffs typically reduce import volume)
    const volumeReduction = Math.min(0.3, (scenario.proposedTariff - scenario.currentTariff) / 100);
    const projectedVolume = annualVolume * (1 - volumeReduction);

    // Generate alternative sourcing options
    const alternativeSourcing = getAlternativeSourcing(scenario, productValue);

    // Compliance changes
    const complianceChanges = [
        'Updated customs declaration forms required',
        'Additional documentation for tariff classification',
        'Country of origin certification may be required',
    ];

    if (scenario.proposedTariff > 50) {
        complianceChanges.push('Enhanced customs scrutiny expected');
        complianceChanges.push('Consider applying for tariff exclusion or exemption');
    }

    const recommendations = [
        `Estimated annual cost increase: $${((additionalCost * annualVolume) / 1000).toFixed(0)}K`,
        'Evaluate alternative sourcing options to mitigate tariff impact',
        'Consider negotiating price adjustments with current suppliers',
        'Build inventory before effective date to lock in current rates',
        'Monitor for potential tariff exclusion processes',
    ];

    return {
        scenario,
        impact: {
            currentDuty,
            proposedDuty,
            additionalCost,
            percentageIncrease,
        },
        volumeImpact: {
            currentVolume: annualVolume,
            projectedVolume,
            volumeChange: projectedVolume - annualVolume,
        },
        alternativeSourcing,
        complianceChanges,
        recommendations,
    };
}

function getAlternativeSourcing(scenario, productValue) {
    const alternatives = [];

    // Generate alternatives based on destination
    if (scenario.route.destination.toLowerCase().includes('usa')) {
        alternatives.push(
            {
                country: 'Mexico',
                tariffRate: 0,
                estimatedCost: productValue * 1.05, // 5% higher production cost
                savings: productValue * (scenario.proposedTariff / 100) - productValue * 0.05,
                tradeAgreement: 'USMCA',
            },
            {
                country: 'Vietnam',
                tariffRate: 5,
                estimatedCost: productValue * 1.02,
                savings: productValue * (scenario.proposedTariff / 100) - productValue * 0.07,
                tradeAgreement: 'MFN',
            }
        );
    } else if (scenario.route.destination.toLowerCase().includes('eu')) {
        alternatives.push(
            {
                country: 'Turkey',
                tariffRate: 0,
                estimatedCost: productValue * 1.08,
                savings: productValue * (scenario.proposedTariff / 100) - productValue * 0.08,
                tradeAgreement: 'EU-Turkey Customs Union',
            }
        );
    }

    return alternatives;
}
