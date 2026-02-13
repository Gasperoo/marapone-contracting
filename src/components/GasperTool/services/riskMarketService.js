// Risk & Market Intelligence Service
// Ported from prototype

import { generateId } from '../../../lib/utils';

// 1. Sanctions Screening
export function screenEntity(request) {
    const isRisky = request.entityName.toLowerCase().includes('global') || request.country.toLowerCase() === 'russia';

    return {
        id: generateId(),
        timestamp: new Date().toISOString(),
        entityScanned: request.entityName,
        riskLevel: isRisky ? 'high' : 'low',
        matches: isRisky ? [
            {
                listProvider: 'OFAC',
                matchScore: 0.95,
                matchedEntity: request.entityName + ' Holdings Ltd.',
                program: 'Specially Designated Nationals',
                status: 'active',
                notes: 'Exact name match found in SDN list.',
            }
        ] : [],
        resolution: isRisky ? 'flagged' : 'clear',
    };
}

// 2. Market Intelligence
export function getMarketData() {
    const currencies = [
        { pair: 'USD/CNY', currentRate: 7.23, change24h: 0.15, trend: 'up', forecast: 'Expected to stabilize around 7.25 next week.' },
        { pair: 'EUR/USD', currentRate: 1.08, change24h: -0.05, trend: 'stable', forecast: 'Minor fluctuations expected due to ECB announcement.' },
        { pair: 'USD/CAD', currentRate: 1.36, change24h: 0.02, trend: 'up', forecast: 'Bullish trend continues.' },
    ];

    const commodities = [
        { name: 'Crude Oil (WTI)', unit: 'Barrel', price: 78.50, changePercentage: -1.2, impactLevel: 'medium' },
        { name: 'Steel', unit: 'Ton', price: 850, changePercentage: 2.5, impactLevel: 'high' },
        { name: 'Cotton', unit: 'lb', price: 0.95, changePercentage: 0.0, impactLevel: 'low' },
    ];

    const news = [
        {
            id: 'n1',
            headline: 'Red Sea Disruptions Continue to Affect Shipping Routes',
            source: 'Logistics Daily',
            timestamp: '2 hours ago',
            summary: 'Major carriers are diverting vessels around Cape of Good Hope, adding 10-14 days to transit times.',
            sentiment: 'negative',
            relatedRegions: ['Middle East', 'Europe'],
            affectedIndustries: ['All'],
            url: '#',
        },
        {
            id: 'n2',
            headline: 'New Trade Agreement Signed Between UK and Pacific Nations',
            source: 'Global Trade Review',
            timestamp: '5 hours ago',
            summary: 'Tariffs on 99% of goods to be eliminated, boosting export opportunities.',
            sentiment: 'positive',
            relatedRegions: ['UK', 'Asia-Pacific'],
            affectedIndustries: ['Automotive', 'Agriculture'],
            url: '#',
        },
        {
            id: 'n3',
            headline: 'Container Spot Rates Stabilize After Q1 Surge',
            source: 'Freight Waves',
            timestamp: '1 day ago',
            summary: 'Demand normalization is leading to steadier pricing on Trans-Pacific lanes.',
            sentiment: 'neutral',
            relatedRegions: ['China', 'USA'],
            affectedIndustries: ['Retail', 'Electronics'],
            url: '#',
        },
        {
            id: 'n4',
            headline: 'Panama Canal Authority Increases Daily Slot Limits',
            source: 'Maritime Executive',
            timestamp: '3 hours ago',
            summary: 'Water levels have improved, allowing for 3 more daily transits starting next month.',
            sentiment: 'positive',
            relatedRegions: ['Americas'],
            affectedIndustries: ['Energy', 'Grains'],
            url: '#',
        },
        {
            id: 'n5',
            headline: 'Strike Action Looming at German Ports',
            source: 'Reuters Logistics',
            timestamp: '6 hours ago',
            summary: 'Union negotiations have stalled, raising fears of 48-hour warning strikes in Hamburg and Bremerhaven.',
            sentiment: 'negative',
            relatedRegions: ['Europe', 'Germany'],
            affectedIndustries: ['Automotive', 'Manufacturing'],
            url: '#',
        },
        {
            id: 'n6',
            headline: 'Air Freight Volumes Surge Ahead of Lunar New Year',
            source: 'Air Cargo News',
            timestamp: '8 hours ago',
            summary: 'e-Commerce demand remains strong, driving up rates out of Hong Kong and Shanghai.',
            sentiment: 'positive',
            relatedRegions: ['Asia', 'Global'],
            affectedIndustries: ['E-commerce', 'Fashion'],
            url: '#',
        },
        {
            id: 'n7',
            headline: 'India Investigates Steel Dumping Allegations',
            source: 'Economic Times',
            timestamp: '12 hours ago',
            summary: 'Government initiates probe into cheap steel imports from Vietnam and China.',
            sentiment: 'neutral',
            relatedRegions: ['India', 'Asia'],
            affectedIndustries: ['Steel', 'Construction'],
            url: '#',
        },
        {
            id: 'n8',
            headline: 'Baltimore Bridge Reconstruction Funding Approved',
            source: 'US Dept of Transport',
            timestamp: '14 hours ago',
            summary: 'Federal funds released to fast-track the rebuilding of the Key Bridge.',
            sentiment: 'positive',
            relatedRegions: ['USA'],
            affectedIndustries: ['Infrastructure', 'Logistics'],
            url: '#',
        },
        {
            id: 'n9',
            headline: 'Typhoon Warning Issued for South China Sea',
            source: 'Weather Logistics',
            timestamp: '30 mins ago',
            summary: 'Typhoon Gaemi expected to disrupt shipping lanes near Taiwan and Fujian.',
            sentiment: 'negative',
            relatedRegions: ['Asia'],
            affectedIndustries: ['Shipping'],
            url: '#',
        },
        {
            id: 'n10',
            headline: 'EU Carbon Border Tax (CBAM) Reporting Phase Begins',
            source: 'European Commission',
            timestamp: '1 day ago',
            summary: 'Importers must now report embedded emissions for cement, iron, steel, and aluminum.',
            sentiment: 'neutral',
            relatedRegions: ['Europe'],
            affectedIndustries: ['Manufacturing', 'Materials'],
            url: '#',
        },
    ];

    const spotRates = {
        'asia_us_west': {
            label: 'Asia to US West Coast',
            current: 1350,
            unit: 'FEU',
            change: '+4.2%',
            history: [
                { day: '1', val: 1200 }, { day: '5', val: 1250 }, { day: '10', val: 1220 },
                { day: '15', val: 1300 }, { day: '20', val: 1280 }, { day: '25', val: 1350 }
            ]
        },
        'asia_europe': {
            label: 'Asia to North Europe',
            current: 3100,
            unit: 'FEU',
            change: '-1.5%',
            history: [
                { day: '1', val: 3200 }, { day: '5', val: 3150 }, { day: '10', val: 3180 },
                { day: '15', val: 3120 }, { day: '20', val: 3050 }, { day: '25', val: 3100 }
            ]
        },
        'trans_atlantic': {
            label: 'Europe to US East Coast',
            current: 1850,
            unit: 'FEU',
            change: '+0.5%',
            history: [
                { day: '1', val: 1800 }, { day: '5', val: 1810 }, { day: '10', val: 1820 },
                { day: '15', val: 1830 }, { day: '20', val: 1840 }, { day: '25', val: 1850 }
            ]
        }
    };

    return { currencies, commodities, news, spotRates };
}

// ============================================================================
// RISK SENTINEL - Advanced Threat Intelligence
// ============================================================================

export function getOperationalRiskMap() {
    // Mock data for Global Threat Map
    return [
        { lat: 10.4326, lng: -75.5332, type: 'weather', severity: 'high', location: 'Caribbean Sea', event: 'Hurricane Warning' },
        { lat: 31.2304, lng: 121.4737, type: 'logistics', severity: 'medium', location: 'Shanghai Port', event: 'Congestion > 5 days' },
        { lat: 53.5488, lng: 9.9872, type: 'labor', severity: 'critical', location: 'Hamburg, DE', event: 'Union Strike Action' },
        { lat: 25.2048, lng: 55.2708, type: 'geopolitical', severity: 'high', location: 'Strait of Hormuz', event: 'Naval Tensions' },
        { lat: 33.7490, lng: -84.3880, type: 'cyber', severity: 'medium', location: 'Atlanta Hub', event: 'System Outage' },
        { lat: 1.3521, lng: 103.8198, type: 'weather', severity: 'low', location: 'Singapore', event: 'Monsoon Delays' }
    ];
}

export function getSupplierDependencyTree() {
    // Mock Dependency Graph Nodes
    return {
        nodes: [
            { id: 'root', label: 'Marapone HQ', type: 'hq', risk: 10 },
            { id: 's1', label: 'Foxconn (CN)', type: 'supplier', risk: 45 },
            { id: 's2', label: 'TSMC (TW)', type: 'supplier', risk: 85 }, // High geopolitical risk
            { id: 's3', label: 'Samsung (KR)', type: 'supplier', risk: 20 },
            { id: 'l1', label: 'Maersk Line', type: 'logistics', risk: 30 },
            { id: 'l2', label: 'DHL Aviation', type: 'logistics', risk: 15 },
        ],
        links: [
            { source: 'root', target: 's1' },
            { source: 'root', target: 's2' },
            { source: 'root', target: 's3' },
            { source: 's1', target: 'l1' }, // Foxconn uses Maersk
            { source: 's2', target: 'l2' }, // TSMC uses DHL
            { source: 's3', target: 'l1' }
        ]
    };
}

export function getPredictiveRiskScores() {
    // AI Risk Predictions
    return [
        { category: 'Geopolitical Stability', score: 85, trend: 'up', insight: 'Election year volatility in key manufacturing hubs' },
        { category: 'Port Congestion', score: 62, trend: 'down', insight: 'Seasonal peak easing, but labor talks ongoing' },
        { category: 'Cybersecurity', score: 45, trend: 'stable', insight: 'Ransomware threats to logistics providers rising' },
        { category: 'Climate Risk', score: 78, trend: 'up', insight: 'El Niño pattern increasing storm frequency in Pacific' }
    ];
}

export function getLiveDisruptionFeed() {
    // Real-time Alerts
    return [
        { id: 1, type: 'critical', message: 'Suez Canal: Vessel grounded at km 151, traffic halted.', time: '10m ago' },
        { id: 2, type: 'warning', message: 'Los Angeles Port: Gate system failure causing truck queues.', time: '45m ago' },
        { id: 3, type: 'info', message: 'Panama Canal: Draft restrictions lifted for Neopanamax locks.', time: '2h ago' },
        { id: 4, type: 'warning', message: 'Rotterdam: Customs strike planned for next Tuesday.', time: '5h ago' }
    ];
}
