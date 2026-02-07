// Ported from prototype mockAI.ts

const HS_CODE_DATABASE = {
    // Electronics
    'bluetooth speaker': {
        code: '8518.21.00',
        description: 'Loudspeakers, without housing (portable)',
        confidence: 0.92,
        reasoning: 'Product is a portable audio device with wireless connectivity',
        dutyRate: '0% (MFN)',
    },
    'laptop': {
        code: '8471.30.01',
        description: 'Portable automatic data processing machines, weighing not more than 10 kg',
        confidence: 0.95,
        reasoning: 'Portable computing device for personal use',
        dutyRate: '0% (MFN)',
    },
    'smartphone': {
        code: '8517.13.00',
        description: 'Smartphones',
        confidence: 0.98,
        reasoning: 'Mobile telephone with computing capabilities',
        dutyRate: '0% (MFN)',
    },
    'headphones': {
        code: '8518.30.20',
        description: 'Headphones and earphones, whether or not combined with a microphone',
        confidence: 0.94,
        reasoning: 'Personal audio listening device',
        dutyRate: '0% (MFN)',
    },
    'tablet': {
        code: '8471.30.01',
        description: 'Portable automatic data processing machines, weighing not more than 10 kg',
        confidence: 0.93,
        reasoning: 'Portable touchscreen computing device',
        dutyRate: '0% (MFN)',
    },

    // Clothing & Textiles
    'cotton t-shirt': {
        code: '6109.10.00',
        description: 'T-shirts, singlets and other vests, of cotton, knitted or crocheted',
        confidence: 0.96,
        reasoning: 'Knitted cotton garment for upper body',
        dutyRate: '18% (MFN)',
    },
    'jeans': {
        code: '6203.42.00',
        description: 'Men\'s or boys\' trousers, bib and brace overalls, of cotton',
        confidence: 0.94,
        reasoning: 'Cotton denim trousers',
        dutyRate: '17% (MFN)',
    },
    'running shoes': {
        code: '6404.11.00',
        description: 'Sports footwear; tennis shoes, basketball shoes, gym shoes, training shoes',
        confidence: 0.91,
        reasoning: 'Athletic footwear with rubber/plastic outer sole',
        dutyRate: '20% (MFN)',
    },

    // Food & Beverage
    'coffee beans': {
        code: '0901.21.00',
        description: 'Coffee, not roasted, not decaffeinated',
        confidence: 0.97,
        reasoning: 'Raw coffee beans for roasting',
        dutyRate: '0% (MFN)',
    },
    'olive oil': {
        code: '1509.10.00',
        description: 'Virgin olive oil',
        confidence: 0.95,
        reasoning: 'Edible vegetable oil from olives',
        dutyRate: '0% (MFN)',
    },

    // Furniture
    'office chair': {
        code: '9401.30.00',
        description: 'Swivel seats with variable height adjustment',
        confidence: 0.93,
        reasoning: 'Adjustable seating furniture for office use',
        dutyRate: '0% (MFN)',
    },
    'wooden table': {
        code: '9403.60.00',
        description: 'Other wooden furniture',
        confidence: 0.89,
        reasoning: 'Furniture primarily of wood construction',
        dutyRate: '0% (MFN)',
    },

    // Toys & Games
    'board game': {
        code: '9504.90.00',
        description: 'Other games, operated by coins, banknotes, bank cards, tokens or by other means of payment',
        confidence: 0.87,
        reasoning: 'Entertainment game for multiple players',
        dutyRate: '0% (MFN)',
    },
    'stuffed animal': {
        code: '9503.00.21',
        description: 'Toys representing animals or non-human creatures',
        confidence: 0.94,
        reasoning: 'Soft toy in animal form',
        dutyRate: '0% (MFN)',
    },
};

export function classifyHSCode(productDescription) {
    const query = productDescription.toLowerCase().trim();

    // Direct match
    if (HS_CODE_DATABASE[query]) {
        return HS_CODE_DATABASE[query];
    }

    // Fuzzy keyword matching
    const keywords = query.split(' ');
    for (const [key, value] of Object.entries(HS_CODE_DATABASE)) {
        const keyWords = key.split(' ');
        const matchCount = keywords.filter(kw => keyWords.some(k => k.includes(kw) || kw.includes(k))).length;

        if (matchCount >= Math.min(2, keywords.length)) {
            return {
                ...value,
                confidence: value.confidence * 0.85, // Lower confidence for fuzzy match
                reasoning: `${value.reasoning} (matched based on keywords: ${keywords.join(', ')})`,
            };
        }
    }

    // Generic fallback
    return {
        code: '9999.99.99',
        description: 'Product classification requires manual review',
        confidence: 0.45,
        reasoning: 'Unable to automatically classify this product. Please consult with a customs broker for accurate HS code determination.',
        dutyRate: 'Unknown - requires manual classification',
    };
}

export function estimateLandedCost(params) {
    const { units, unitPrice, origin, destination, weight = units * 0.5 } = params;

    const productCost = units * unitPrice;

    // Shipping estimation (very simplified)
    const distanceFactor = getDistanceFactor(origin, destination);
    const shipping = weight * distanceFactor * 3.5; // $3.50 per kg base rate

    // Duties (simplified - would need actual HS code lookup)
    const dutyRate = 0.065; // 6.5% average
    const duties = productCost * dutyRate;

    // Taxes (Canadian HST/GST)
    const taxRate = destination.toLowerCase().includes('ontario') || destination.toLowerCase().includes('toronto') ? 0.13 : 0.05;
    const taxes = (productCost + duties) * taxRate;

    // Insurance (0.5% of product value)
    const insurance = productCost * 0.005;

    const total = productCost + shipping + duties + taxes + insurance;

    return {
        breakdown: {
            productCost,
            shipping,
            duties,
            taxes,
            insurance,
            total,
        },
        currency: 'CAD',
        perUnit: total / units,
        notes: [
            'Duty rates vary by product classification (HS code)',
            'Shipping costs are estimates and may vary by carrier',
            `Tax rate of ${(taxRate * 100).toFixed(0)}% applied based on destination`,
            'Insurance is optional but recommended for high-value shipments',
        ],
    };
}

function getDistanceFactor(origin, _destination) {
    const o = origin.toLowerCase();

    // Simplified distance factors
    if (o.includes('china') || o.includes('shanghai') || o.includes('beijing')) {
        return 2.5;
    }
    if (o.includes('usa') || o.includes('united states')) {
        return 1.2;
    }
    if (o.includes('europe') || o.includes('uk')) {
        return 2.0;
    }
    if (o.includes('mexico')) {
        return 1.5;
    }

    return 2.0; // Default
}

export function generateComplianceChecklist(productType, _origin, destination) {
    const product = productType.toLowerCase();
    const dest = destination.toLowerCase();

    const documents = [
        {
            name: 'Commercial Invoice',
            required: true,
            description: 'Detailed invoice showing product description, value, and terms of sale',
            authority: 'CBSA',
        },
        {
            name: 'Packing List',
            required: true,
            description: 'Detailed list of package contents, weights, and dimensions',
            authority: 'CBSA',
        },
        {
            name: 'Bill of Lading / Air Waybill',
            required: true,
            description: 'Transport document issued by carrier',
            authority: 'Carrier',
        },
    ];

    const warnings = [];
    let complexity = 'Low';
    let estimatedTime = '3-5 business days';

    // Electronics-specific
    if (product.includes('electronic') || product.includes('laptop') || product.includes('phone')) {
        documents.push(
            {
                name: 'FCC Compliance Certificate',
                required: true,
                description: 'Federal Communications Commission compliance for electronic devices',
                authority: 'FCC',
            },
            {
                name: 'CE Marking (if from EU)',
                required: false,
                description: 'European conformity marking',
                authority: 'EU',
            },
            {
                name: 'Battery Safety Documentation',
                required: true,
                description: 'UN38.3 test summary for lithium batteries',
                authority: 'Transport Canada',
            }
        );
        complexity = 'Medium';
        estimatedTime = '5-7 business days';
        warnings.push('Electronics with batteries require special handling and documentation');
    }

    // Food products
    if (product.includes('food') || product.includes('coffee') || product.includes('beverage')) {
        documents.push(
            {
                name: 'CFIA Import License',
                required: true,
                description: 'Canadian Food Inspection Agency import permit',
                authority: 'CFIA',
            },
            {
                name: 'Ingredient List & Nutritional Info',
                required: true,
                description: 'Complete ingredient declaration and nutritional facts',
                authority: 'Health Canada',
            },
            {
                name: 'Allergen Declaration',
                required: true,
                description: 'Declaration of major allergens present',
                authority: 'Health Canada',
            }
        );
        complexity = 'High';
        estimatedTime = '10-15 business days';
        warnings.push('Food products require CFIA approval before import');
        warnings.push('Labeling must comply with Canadian bilingual requirements');
    }

    // Textiles & clothing
    if (product.includes('clothing') || product.includes('textile') || product.includes('shirt') || product.includes('jeans')) {
        documents.push(
            {
                name: 'Textile Declaration',
                required: true,
                description: 'Fiber content and country of origin labeling',
                authority: 'Competition Bureau',
            },
            {
                name: 'Care Labeling',
                required: true,
                description: 'Washing and care instructions in English and French',
                authority: 'Competition Bureau',
            }
        );
        warnings.push('All textile labels must be in both English and French');
    }

    // Canada-specific
    if (dest.includes('canada') || dest.includes('toronto') || dest.includes('vancouver')) {
        documents.push({
            name: 'CBSA Declaration',
            required: true,
            description: 'Canada Border Services Agency import declaration',
            authority: 'CBSA',
        });
    }

    return {
        documents,
        estimatedTime,
        complexity,
        warnings,
    };
}

export function screenForSanctions(companyName, country) {
    const name = companyName.toLowerCase();
    const countryLower = country.toLowerCase();

    // High-risk countries (simplified)
    const highRiskCountries = ['iran', 'north korea', 'syria', 'cuba', 'russia', 'belarus'];
    const mediumRiskCountries = ['venezuela', 'myanmar', 'zimbabwe'];

    // Simulate risk scoring
    let score = Math.random() * 30; // Base score 0-30
    const flags = [];
    let riskLevel = 'Low';

    // Country-based risk
    if (highRiskCountries.some(c => countryLower.includes(c))) {
        score += 60;
        flags.push(`High-risk jurisdiction: ${country}`);
        flags.push('Subject to comprehensive sanctions');
    } else if (mediumRiskCountries.some(c => countryLower.includes(c))) {
        score += 35;
        flags.push(`Medium-risk jurisdiction: ${country}`);
    }

    // Name-based screening (very simplified mock)
    const suspiciousKeywords = ['international', 'trading', 'export', 'import'];
    if (suspiciousKeywords.some(kw => name.includes(kw))) {
        score += 5;
    }

    // Determine risk level
    if (score >= 70) {
        riskLevel = 'Critical';
    } else if (score >= 50) {
        riskLevel = 'High';
    } else if (score >= 30) {
        riskLevel = 'Medium';
    }

    const recommendation =
        riskLevel === 'Critical' ? 'DO NOT PROCEED - Consult legal counsel immediately' :
            riskLevel === 'High' ? 'Enhanced due diligence required before proceeding' :
                riskLevel === 'Medium' ? 'Standard due diligence recommended' :
                    'Low risk - safe to proceed with standard checks';

    return {
        riskLevel,
        score: Math.round(score),
        flags,
        recommendation,
        checkedAgainst: [
            'OFAC SDN List (US)',
            'UN Consolidated Sanctions List',
            'EU Sanctions List',
            'Canadian Sanctions List',
            'UK Sanctions List',
        ],
        lastUpdated: new Date().toISOString(),
    };
}

export function getFreightQuotes(params) {
    const { weight, origin, destination, serviceType } = params;

    const baseRate = serviceType === 'air' ? 8.5 : serviceType === 'ocean' ? 2.0 : 3.5;
    const distanceFactor = getDistanceFactor(origin, destination);

    const quotes = [];

    if (serviceType === 'air') {
        quotes.push(
            {
                carrier: 'DHL Express',
                service: 'Express Worldwide',
                price: weight * baseRate * distanceFactor * 1.2,
                transitDays: 3,
                reliability: 0.95,
                recommended: true,
            },
            {
                carrier: 'FedEx',
                service: 'International Priority',
                price: weight * baseRate * distanceFactor * 1.15,
                transitDays: 4,
                reliability: 0.93,
            },
            {
                carrier: 'UPS',
                service: 'Worldwide Express',
                price: weight * baseRate * distanceFactor * 1.18,
                transitDays: 3,
                reliability: 0.94,
            }
        );
    } else if (serviceType === 'ocean') {
        quotes.push(
            {
                carrier: 'Maersk',
                service: 'Ocean FCL',
                price: weight * baseRate * distanceFactor * 0.8,
                transitDays: 28,
                reliability: 0.88,
                recommended: true,
            },
            {
                carrier: 'MSC',
                service: 'Standard Ocean',
                price: weight * baseRate * distanceFactor * 0.75,
                transitDays: 32,
                reliability: 0.85,
            }
        );
    } else {
        quotes.push(
            {
                carrier: 'Purolator',
                service: 'Ground',
                price: weight * baseRate * distanceFactor,
                transitDays: 5,
                reliability: 0.91,
                recommended: true,
            }
        );
    }

    const optimizationTips = [
        'Consider consolidating shipments to reduce per-unit costs',
        serviceType === 'air' ? 'Ocean freight could save up to 70% for non-urgent shipments' : null,
        'Negotiate volume discounts with carriers for regular shipments',
        'Use a freight forwarder for better rates on international shipments',
    ].filter(Boolean);

    const cheapest = Math.min(...quotes.map(q => q.price));
    const mostExpensive = Math.max(...quotes.map(q => q.price));

    return {
        quotes: quotes.sort((a, b) => b.price - a.price),
        optimizationTips,
        estimatedSavings: mostExpensive - cheapest,
    };
}

export function predictDisruptions(origin, destination, _route) {
    const disruptions = [];
    const mitigationStrategies = [];

    // Simulate various disruptions based on routes
    const o = origin.toLowerCase();
    const d = destination.toLowerCase();

    // Port congestion (common for China routes)
    if (o.includes('china') || o.includes('shanghai')) {
        disruptions.push({
            type: 'port_strike',
            severity: 'Medium',
            location: 'Port of Shanghai',
            description: 'Increased container processing times due to high volume',
            impact: 'Potential 3-5 day delay in departure',
            probability: 0.65,
        });
    }

    // Weather disruptions
    const month = new Date().getMonth();
    if (month >= 5 && month <= 10) { // Hurricane season
        disruptions.push({
            type: 'weather',
            severity: 'Low',
            location: 'Pacific Ocean / Atlantic routes',
            description: 'Seasonal weather patterns may affect shipping routes',
            impact: 'Possible route diversions adding 1-2 days',
            probability: 0.35,
        });
    }

    // Customs delays
    if (d.includes('canada') || d.includes('toronto') || d.includes('vancouver')) {
        disruptions.push({
            type: 'customs_delay',
            severity: 'Low',
            location: 'Canadian Border Services',
            description: 'Standard customs processing variability',
            impact: '1-3 day processing time variation',
            probability: 0.45,
        });
    }

    // Capacity constraints
    disruptions.push({
        type: 'capacity',
        severity: 'Medium',
        location: 'Global shipping',
        description: 'High demand period affecting carrier capacity',
        impact: 'Limited availability, potential rate increases',
        probability: 0.55,
    });

    // Generate mitigation strategies
    mitigationStrategies.push(
        'Book shipments 2-3 weeks in advance to secure capacity',
        'Maintain safety stock of critical items',
        'Establish relationships with multiple carriers for backup options',
        'Consider air freight for time-sensitive shipments',
        'Use a freight forwarder with multiple routing options'
    );

    // Calculate overall risk score
    const riskScore = disruptions.reduce((sum, d) => sum + (d.probability * (d.severity === 'High' ? 3 : d.severity === 'Medium' ? 2 : 1)), 0) / disruptions.length * 100;

    return {
        disruptions,
        mitigationStrategies,
        alternativeRoutes: [
            'Air freight via Anchorage hub (faster but more expensive)',
            'Ocean freight via Vancouver instead of Toronto (may reduce customs delays)',
        ],
        riskScore: Math.round(riskScore),
    };
}

export function generateTradeWorkflow(workflowType) {
    const type = workflowType.toLowerCase();

    if (type.includes('import') || type.includes('importing')) {
        return {
            workflowType: 'Import Process',
            estimatedDuration: '15-20 business days',
            steps: [
                {
                    step: 1,
                    title: 'Product Classification',
                    description: 'Determine HS code for your product',
                    status: 'completed',
                    aiSuggestion: 'Use our HS code classifier tool for instant classification',
                },
                {
                    step: 2,
                    title: 'Supplier Agreement',
                    description: 'Negotiate terms with supplier (Incoterms, payment, delivery)',
                    status: 'in_progress',
                    aiSuggestion: 'Recommend FOB or CIF terms for better cost control',
                },
                {
                    step: 3,
                    title: 'Compliance Documentation',
                    description: 'Gather all required import documents',
                    status: 'pending',
                    aiSuggestion: 'Generate compliance checklist based on your product type',
                },
                {
                    step: 4,
                    title: 'Freight Booking',
                    description: 'Book shipping with carrier or freight forwarder',
                    status: 'pending',
                    aiSuggestion: 'Compare quotes from multiple carriers to optimize costs',
                },
                {
                    step: 5,
                    title: 'Customs Clearance',
                    description: 'Submit import declaration and pay duties/taxes',
                    status: 'pending',
                    aiSuggestion: 'Use a licensed customs broker for faster processing',
                },
                {
                    step: 6,
                    title: 'Delivery & Inspection',
                    description: 'Receive goods and verify against purchase order',
                    status: 'pending',
                },
            ],
        };
    }

    if (type.includes('invoice')) {
        return {
            workflowType: 'Invoice Generation',
            estimatedDuration: '10 minutes',
            steps: [
                {
                    step: 1,
                    title: 'Gather Shipment Details',
                    description: 'Collect product descriptions, quantities, and values',
                    status: 'completed',
                },
                {
                    step: 2,
                    title: 'Calculate Costs',
                    description: 'Determine unit prices, shipping, and total value',
                    status: 'in_progress',
                    aiSuggestion: 'Use landed cost calculator for accurate pricing',
                },
                {
                    step: 3,
                    title: 'Generate Invoice',
                    description: 'Create commercial invoice with all required fields',
                    status: 'pending',
                    aiSuggestion: 'Auto-populate from shipment data',
                },
                {
                    step: 4,
                    title: 'Review & Send',
                    description: 'Verify accuracy and send to customer/customs',
                    status: 'pending',
                },
            ],
        };
    }

    // Default workflow
    return {
        workflowType: 'General Trade Process',
        estimatedDuration: '10-15 business days',
        steps: [
            {
                step: 1,
                title: 'Planning',
                description: 'Define requirements and identify suppliers',
                status: 'pending',
            },
            {
                step: 2,
                title: 'Documentation',
                description: 'Prepare all necessary trade documents',
                status: 'pending',
            },
            {
                step: 3,
                title: 'Execution',
                description: 'Execute the trade transaction',
                status: 'pending',
            },
            {
                step: 4,
                title: 'Completion',
                description: 'Finalize and close the transaction',
                status: 'pending',
            },
        ],
    };
}

// ============================================================================
// MOCK SHIPMENT DATA GENERATION
// ============================================================================

export function generateMockShipments() {
    return [
        {
            id: 'SHP-2024-001',
            status: 'in_transit',
            origin: 'Shanghai, China',
            destination: 'Toronto, ON',
            currentLocation: 'Pacific Ocean',
            eta: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            confidence: 0.88,
            delayRisk: 'Low',
            trackingNumber: 'MAEU1234567890',
            carrier: 'Maersk',
        },
        {
            id: 'SHP-2024-002',
            status: 'customs',
            origin: 'Los Angeles, CA',
            destination: 'Vancouver, BC',
            currentLocation: 'CBSA Vancouver',
            eta: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            confidence: 0.75,
            delayRisk: 'Medium',
            trackingNumber: 'UPS9876543210',
            carrier: 'UPS',
        },
        {
            id: 'SHP-2024-003',
            status: 'delivered',
            origin: 'Hamburg, Germany',
            destination: 'Montreal, QC',
            currentLocation: 'Delivered',
            eta: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            confidence: 1.0,
            delayRisk: 'Low',
            trackingNumber: 'DHL5555666677',
            carrier: 'DHL',
        },
        {
            id: 'SHP-2024-004',
            status: 'delayed',
            origin: 'Mumbai, India',
            destination: 'Toronto, ON',
            currentLocation: 'Port of Mumbai',
            eta: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
            confidence: 0.62,
            delayRisk: 'High',
            trackingNumber: 'MSC1122334455',
            carrier: 'MSC',
        },
    ];
}

