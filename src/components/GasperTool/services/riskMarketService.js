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
    ];

    return { currencies, commodities, news };
}
