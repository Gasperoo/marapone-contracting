// Analytics Service
// Ported from prototype

export function analyzeShipmentProfitability(shipmentId) {
    // Mock data - in real implementation, fetch from database
    const quoted = {
        freight: 2500,
        duties: 650,
        taxes: 325,
        fees: 150,
        total: 3625,
    };

    // Simulate variance (actual costs often differ from quotes)
    const varianceFactors = {
        freight: 1 + (Math.random() * 0.2 - 0.05), // -5% to +15%
        duties: 1 + (Math.random() * 0.1 - 0.02), // -2% to +8%
        taxes: 1.0, // Usually exact
        fees: 1 + (Math.random() * 0.3), // 0% to +30% (fees often have surprises)
    };

    const actual = {
        freight: Math.round(quoted.freight * varianceFactors.freight),
        duties: Math.round(quoted.duties * varianceFactors.duties),
        taxes: quoted.taxes,
        fees: Math.round(quoted.fees * varianceFactors.fees),
        total: 0,
    };
    actual.total = actual.freight + actual.duties + actual.taxes + actual.fees;

    const variance = {
        freight: actual.freight - quoted.freight,
        duties: actual.duties - quoted.duties,
        taxes: actual.taxes - quoted.taxes,
        fees: actual.fees - quoted.fees,
        total: actual.total - quoted.total,
        percentage: ((actual.total - quoted.total) / quoted.total) * 100,
    };

    // Profitability calculation
    const revenue = 8000; // Mock revenue
    const profitability = {
        revenue,
        totalCost: actual.total,
        profit: revenue - actual.total,
        margin: ((revenue - actual.total) / revenue) * 100,
    };

    return {
        shipmentId,
        quoted,
        actual,
        variance,
        profitability,
    };
}

export function identifyTrends(_shipments) {
    // Group by period (mock implementation)
    const trends = [
        {
            period: '2024-01',
            averageCost: 3650,
            averageVariance: 125,
            shipmentCount: 12,
            topOvercharges: [
                { carrier: 'DHL', amount: 450, frequency: 4 },
                { carrier: 'Maersk', amount: 280, frequency: 3 },
            ],
        },
        {
            period: '2024-02',
            averageCost: 3720,
            averageVariance: 180,
            shipmentCount: 15,
            topOvercharges: [
                { carrier: 'FedEx', amount: 520, frequency: 5 },
                { carrier: 'MSC', amount: 310, frequency: 4 },
            ],
        },
    ];

    return trends;
}

export function generateOptimizationReport(analysis) {
    const trends = identifyTrends(analysis);

    const insights = [
        'Freight costs are consistently 8% higher than quoted',
        'Carrier fees show high variability, averaging 25% over estimates',
        'DHL has the highest overcharge frequency at 33% of shipments',
        'Q1 shows seasonal cost increase of 12% vs. Q4',
    ];

    const recommendations = [
        'Negotiate fixed-fee contracts with top 3 carriers to reduce variance',
        'Implement pre-shipment cost validation to catch quote errors',
        'Consider switching 30% of DHL volume to FedEx for better cost predictability',
        'Build 15% buffer into Q1 budgets for seasonal increases',
    ];

    const totalSavingsOpportunity = analysis.reduce((sum, a) => {
        return sum + Math.max(0, a.variance.total);
    }, 0);

    return {
        shipments: analysis,
        trends,
        insights,
        recommendations,
        totalSavingsOpportunity,
    };
}

export function generatePerformanceScorecard(vendorId, vendorName, vendorType, _shipments) {
    // Mock metrics - in real implementation, calculate from historical data
    const metrics = {
        vendorId,
        vendorName,
        vendorType,
        metrics: {
            onTimePercentage: 85 + Math.random() * 12,
            costVariance: -5 + Math.random() * 15, // -5% to +10%
            delayFrequency: Math.random() * 20, // 0-20 delays per 100 shipments
            averageDelayDays: 2 + Math.random() * 3,
            reliabilityScore: 75 + Math.random() * 20,
            qualityScore: 80 + Math.random() * 15,
        },
        shipmentCount: Math.floor(50 + Math.random() * 150),
        totalValue: Math.floor(100000 + Math.random() * 400000),
        period: '2024 Q1',
    };

    // Determine ranking (mock)
    const ranking = Math.floor(Math.random() * 10) + 1;
    const totalVendors = 25;

    // Identify strengths and weaknesses
    const strengths = [];
    const weaknesses = [];

    if (metrics.metrics.onTimePercentage > 90) {
        strengths.push('Excellent on-time delivery performance');
    } else if (metrics.metrics.onTimePercentage < 80) {
        weaknesses.push('Below-average on-time delivery rate');
    }

    if (metrics.metrics.costVariance < 5) {
        strengths.push('Consistent pricing with minimal overcharges');
    } else if (metrics.metrics.costVariance > 10) {
        weaknesses.push('High cost variance, frequent unexpected charges');
    }

    if (metrics.metrics.reliabilityScore > 85) {
        strengths.push('High reliability score');
    } else if (metrics.metrics.reliabilityScore < 75) {
        weaknesses.push('Reliability concerns');
    }

    // Generate recommendations
    const recommendations = [];

    if (metrics.metrics.onTimePercentage < 85) {
        recommendations.push('Consider implementing service level agreements with penalties');
    }

    if (metrics.metrics.costVariance > 8) {
        recommendations.push('Request detailed cost breakdowns and negotiate fixed pricing');
    }

    if (metrics.metrics.delayFrequency > 15) {
        recommendations.push('Diversify vendor base to reduce dependency');
    }

    // Generate alternatives if performance is poor
    const alternatives = [];

    if (metrics.metrics.reliabilityScore < 80 || metrics.metrics.onTimePercentage < 85) {
        alternatives.push(
            {
                vendorName: 'Alternative Carrier A',
                reason: 'Better on-time performance (92%) and lower cost variance',
                estimatedSavings: 15000,
            },
            {
                vendorName: 'Alternative Carrier B',
                reason: 'Competitive pricing with similar service levels',
                estimatedSavings: 8000,
            }
        );
    }

    return {
        vendor: metrics,
        ranking,
        totalVendors,
        strengths,
        weaknesses,
        recommendations,
        alternatives: alternatives.length > 0 ? alternatives : undefined,
    };
}

export function rankVendors(vendors) {
    // Calculate composite score for each vendor
    const scored = vendors.map((v) => ({
        ...v,
        compositeScore:
            v.metrics.onTimePercentage * 0.3 +
            v.metrics.reliabilityScore * 0.3 +
            v.metrics.qualityScore * 0.2 +
            (100 - v.metrics.delayFrequency * 2) * 0.1 +
            (100 - Math.abs(v.metrics.costVariance)) * 0.1,
    }));

    // Sort by composite score
    return scored.sort((a, b) => b.compositeScore - a.compositeScore);
}

export function trackQuoteEngagement(quoteId) {
    // Mock engagement data
    const sentAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const opened = Math.random() > 0.3;
    const clicked = opened && Math.random() > 0.5;
    const replied = clicked && Math.random() > 0.6;

    const leadScore = calculateLeadScore(opened, clicked, replied, sentAt);

    let status = 'sent';
    if (replied) status = 'engaged';
    else if (clicked) status = 'engaged';
    else if (opened) status = 'opened';

    return {
        quoteId,
        customerEmail: 'customer@example.com',
        customerName: 'ABC Trading Co.',
        quotedAmount: 5000 + Math.random() * 10000,
        sentAt: sentAt.toISOString(),
        opened,
        openedAt: opened ? new Date(sentAt.getTime() + Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        clicked,
        clickedAt: clicked ? new Date(sentAt.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        replied,
        repliedAt: replied ? new Date(sentAt.getTime() + Math.random() * 4 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        leadScore,
        status,
    };
}

function calculateLeadScore(opened, clicked, replied, sentAt) {
    let score = 20; // Base score

    if (opened) score += 20;
    if (clicked) score += 30;
    if (replied) score += 30;

    // Recency bonus
    const daysSinceSent = (Date.now() - sentAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceSent < 2) score += 10;
    else if (daysSinceSent > 7) score -= 10;

    return Math.min(100, Math.max(0, score));
}

export function generateFollowUpMessage(engagement) {
    const daysSinceSent = (Date.now() - new Date(engagement.sentAt).getTime()) / (1000 * 60 * 60 * 24);

    let subject = '';
    let body = '';
    let tone = 'professional';
    let includesDiscount = false;
    let discountAmount = 0;

    if (!engagement.opened && daysSinceSent > 3) {
        // Not opened - gentle reminder
        subject = `Following up on your freight quote - ${engagement.quoteId}`;
        body = `Hi ${engagement.customerName},\n\nI wanted to follow up on the freight quote I sent you a few days ago. I understand you're busy, but I wanted to make sure you received it and see if you have any questions.\n\nThe quote is valid for another week, and I'm happy to discuss any details or explore options that might better fit your needs.\n\nBest regards`;
        tone = 'friendly';
    } else if (engagement.opened && !engagement.clicked && daysSinceSent > 2) {
        // Opened but not clicked - provide value
        subject = `Additional details on your quote - ${engagement.quoteId}`;
        body = `Hi ${engagement.customerName},\n\nThank you for reviewing the quote. I wanted to share some additional information that might be helpful:\n\n• We offer flexible payment terms\n• Insurance is included at no extra cost\n• Real-time tracking for all shipments\n\nIf you'd like to discuss this further or need any adjustments to the quote, I'm here to help.\n\nBest regards`;
        tone = 'professional';
    } else if (engagement.clicked && !engagement.replied && daysSinceSent > 4) {
        // Clicked but no reply - offer incentive
        subject = `Special offer on your quote - ${engagement.quoteId}`;
        body = `Hi ${engagement.customerName},\n\nI noticed you reviewed our quote and wanted to offer you a special 5% discount if you book within the next 48 hours.\n\nThis brings your total to $${(engagement.quotedAmount * 0.95).toFixed(2)}, and we can have your shipment moving by the end of the week.\n\nLet me know if you'd like to proceed!\n\nBest regards`;
        tone = 'friendly';
        includesDiscount = true;
        discountAmount = engagement.quotedAmount * 0.05;
    } else {
        // Default follow-up
        subject = `Checking in on your freight quote`;
        body = `Hi ${engagement.customerName},\n\nI wanted to check in and see if you have any questions about the quote I sent. I'm here to help make your shipping as smooth as possible.\n\nBest regards`;
        tone = 'professional';
    }

    return {
        quoteId: engagement.quoteId,
        subject,
        body,
        tone,
        includesDiscount,
        discountAmount: includesDiscount ? discountAmount : undefined,
    };
}

export function scoreLeadQuality(engagement) {
    return engagement.leadScore;
}

export function getConversionMetrics(quotes) {
    const total = quotes.length;
    const opened = quotes.filter((q) => q.opened).length;
    const clicked = quotes.filter((q) => q.clicked).length;
    const replied = quotes.filter((q) => q.replied).length;
    const won = quotes.filter((q) => q.status === 'won').length;

    const conversions = quotes.filter((q) => q.status === 'won');
    const avgTimeToConversion = conversions.length > 0
        ? conversions.reduce((sum, q) => {
            const sent = new Date(q.sentAt).getTime();
            const replied = q.repliedAt ? new Date(q.repliedAt).getTime() : sent;
            return sum + (replied - sent) / (1000 * 60 * 60 * 24);
        }, 0) / conversions.length
        : 0;

    const avgQuoteValue = quotes.reduce((sum, q) => sum + q.quotedAmount, 0) / total;

    return {
        totalQuotes: total,
        openRate: (opened / total) * 100,
        clickRate: (clicked / total) * 100,
        replyRate: (replied / total) * 100,
        conversionRate: (won / total) * 100,
        averageTimeToConversion: avgTimeToConversion,
        averageQuoteValue: avgQuoteValue,
    };
}

// --- NEW ANALYTICS FEATURES ---

export function getPredictiveSpendData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = new Date().getMonth();

    return months.map((month, index) => {
        const isFuture = index > currentMonthIndex;
        // Base value: 1.2M - 1.5M range
        const baseSpend = 1200000 + Math.random() * 300000;

        // Add trend: increasing towards end of year
        const trend = index * 20000;

        let value = baseSpend + trend;

        // Future values include uncertainty range
        if (isFuture) {
            const uncertainty = (index - currentMonthIndex) * 50000;
            return {
                month,
                spend: Math.round(value),
                predicted: true,
                lowerBound: Math.round(value - uncertainty),
                upperBound: Math.round(value + uncertainty)
            };
        }

        return {
            month,
            spend: Math.round(value),
            predicted: false
        };
    });
}

export function getCarrierHologramData() {
    return [
        { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
        { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
        { subject: 'Cost Efficiency', A: 86, B: 130, fullMark: 150 },
        { subject: 'Sustainability', A: 99, B: 100, fullMark: 150 },
        { subject: 'Flexibility', A: 85, B: 90, fullMark: 150 },
        { subject: 'Tech Integration', A: 65, B: 85, fullMark: 150 },
    ];
}

export function getSustainabilityMetrics() {
    return {
        totalCarbon: 12450, // kg CO2
        target: 10000,
        trend: -12.5, // 12.5% reduction
        offset: 8500,
        net: 3950
    };
}

export function processNLPQuery(query) {
    const q = query.toLowerCase();

    if (q.includes('spend') && q.includes('q4')) {
        return {
            answer: "Projected spend for Q4 2024 is $4.2M, which is 12% higher than Q3 due to anticipated holiday surcharges.",
            confidence: 98,
            relatedMetric: 'predictive_spend'
        };
    }

    if (q.includes('maersk') || q.includes('reliability')) {
        return {
            answer: "Maersk is currently ranking #1 for Reliability Score (98/100) but has a higher cost variance than MSC.",
            confidence: 94,
            relatedMetric: 'carrier_hologram'
        };
    }

    if (q.includes('carbon') || q.includes('sustainability')) {
        return {
            answer: "Current carbon emissions are 12.5% below baseline. We are on track to meet the 2025 Net Zero targets.",
            confidence: 99,
            relatedMetric: 'sustainability'
        };
    }

    return {
        answer: "I'm analyzing that query. Here is a general breakdown of your supply chain performance...",
        confidence: 75
    };
}
