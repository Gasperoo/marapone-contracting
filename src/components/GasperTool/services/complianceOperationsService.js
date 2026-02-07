// Compliance Q&A and Operations Service
// Ported from prototype

import { generateId } from '../../../lib/utils';

// ============================================================================
// COMPLIANCE Q&A - Conversational Regulation Assistant
// ============================================================================

const COMPLIANCE_KNOWLEDGE_BASE = {
    cbam: {
        questionId: 'cbam',
        answer: `The EU Carbon Border Adjustment Mechanism (CBAM) is a carbon tariff on imports of carbon-intensive goods. Starting January 1, 2026, importers must purchase CBAM certificates corresponding to the embedded carbon emissions in their products.

Key points:
• Applies to: cement, iron & steel, aluminum, fertilizers, electricity, and hydrogen
• Importers must report embedded emissions quarterly
• CBAM certificates price matches EU ETS carbon price
• Exemptions for goods from countries with equivalent carbon pricing
• Transitional period: 2023-2025 (reporting only, no financial adjustment)`,
        citations: [
            {
                source: 'European Commission - CBAM Regulation',
                url: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en',
                lastUpdated: '2025-12-15',
            },
            {
                source: 'EU Regulation 2023/956',
                lastUpdated: '2023-05-16',
            },
        ],
        relatedRegulations: [
            'EU Emissions Trading System (ETS)',
            'Product Environmental Footprint (PEF)',
            'Deforestation Regulation (EUDR)',
        ],
        confidence: 0.95,
        warnings: [
            'CBAM requirements are complex and vary by product category',
            'Consult with a customs specialist for specific product classifications',
        ],
    },
    usmca: {
        questionId: 'usmca',
        answer: `The United States-Mexico-Canada Agreement (USMCA) replaced NAFTA in 2020, providing preferential tariff treatment for qualifying goods traded between the three countries.

Key requirements for duty-free treatment:
• Products must meet Rules of Origin (ROO) criteria
• Certificate of Origin required (USMCA Certificate)
• Regional Value Content (RVC) thresholds vary by product
• Labor Value Content (LVC) requirements for automotive
• Self-certification system (no government certification needed)

Common ROO methods:
• Tariff shift: Product classified under different HS code than inputs
• Regional value content: Minimum % of value from USMCA countries
• Specific process: Undergoes specific manufacturing process`,
        citations: [
            {
                source: 'USTR - USMCA Text',
                url: 'https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement',
                lastUpdated: '2020-07-01',
            },
        ],
        relatedRegulations: ['Automotive Rules of Origin', 'Textile and Apparel ROO', 'Steel and Aluminum Provisions'],
        confidence: 0.92,
    },
    sanctions: {
        questionId: 'sanctions',
        answer: `Trade sanctions are restrictions imposed by governments to limit trade with specific countries, entities, or individuals for foreign policy or national security reasons.

Current major sanctions programs (as of 2026):
• Russia/Belarus: Comprehensive sanctions on most goods, services, and financial transactions
• Iran: Sanctions on petroleum, financial services, and most trade
• North Korea: Comprehensive trade embargo
• Syria: Sanctions on petroleum and luxury goods
• Venezuela: Targeted sanctions on government officials and oil sector

Compliance requirements:
• Screen all parties against OFAC SDN List, UN Consolidated List, EU Sanctions List
• Implement "Know Your Customer" (KYC) procedures
• Maintain records of screening for 5+ years
• Report suspicious activities to authorities
• Obtain licenses for authorized transactions in sanctioned jurisdictions`,
        citations: [
            {
                source: 'OFAC Sanctions Programs',
                url: 'https://ofac.treasury.gov/sanctions-programs-and-country-information',
                lastUpdated: '2026-01-15',
            },
            {
                source: 'UN Security Council Sanctions',
                url: 'https://www.un.org/securitycouncil/sanctions',
                lastUpdated: '2026-01-10',
            },
        ],
        relatedRegulations: ['Export Administration Regulations (EAR)', 'International Traffic in Arms Regulations (ITAR)'],
        confidence: 0.90,
        warnings: [
            'Sanctions change frequently - always verify current status',
            'Penalties for violations can be severe, including criminal charges',
        ],
    },
};

export function answerComplianceQuestion(question) {
    const q = question.toLowerCase();

    // Match question to knowledge base
    if (q.includes('cbam') || q.includes('carbon border') || q.includes('carbon tariff')) {
        return COMPLIANCE_KNOWLEDGE_BASE.cbam;
    }

    if (q.includes('usmca') || q.includes('nafta') || q.includes('rules of origin')) {
        return COMPLIANCE_KNOWLEDGE_BASE.usmca;
    }

    if (q.includes('sanction') || q.includes('embargo') || q.includes('restricted')) {
        return COMPLIANCE_KNOWLEDGE_BASE.sanctions;
    }

    // Generic response for unmatched questions
    return {
        questionId: generateId(),
        answer: `I don't have specific information on that topic in my current knowledge base. However, I recommend consulting the following resources:

• Your country's customs authority website
• World Trade Organization (WTO) resources
• International Chamber of Commerce (ICC) guidelines
• A licensed customs broker or trade compliance consultant

For specific product classifications or complex regulatory questions, professional consultation is always recommended.`,
        citations: [
            {
                source: 'WTO Trade Topics',
                url: 'https://www.wto.org/english/tratop_e/tratop_e.htm',
                lastUpdated: '2026-01-01',
            },
        ],
        relatedRegulations: [],
        confidence: 0.50,
        warnings: ['This is a general response - specific guidance may vary by jurisdiction'],
    };
}

export function getRegulationUpdates() {
    // Mock recent regulation updates
    return [
        {
            id: generateId(),
            title: 'EU CBAM Enters Full Implementation Phase',
            summary: 'The Carbon Border Adjustment Mechanism transitions from reporting-only to full financial adjustment. Importers must now purchase CBAM certificates.',
            effectiveDate: '2026-01-01',
            affectedCountries: ['EU Member States'],
            affectedCommodities: ['Steel', 'Aluminum', 'Cement', 'Fertilizers', 'Electricity'],
            source: 'European Commission',
            severity: 'Critical',
        },
        {
            id: generateId(),
            title: 'US Increases Tariffs on Chinese EVs to 100%',
            summary: 'New tariff rate applies to electric vehicles imported from China, effective immediately.',
            effectiveDate: '2026-02-01',
            affectedCountries: ['USA'],
            affectedCommodities: ['Electric Vehicles', 'EV Batteries'],
            source: 'USTR',
            severity: 'Critical',
        },
        {
            id: generateId(),
            title: 'Canada Updates Food Labeling Requirements',
            summary: 'New bilingual labeling requirements for imported food products include enhanced allergen warnings.',
            effectiveDate: '2026-03-15',
            affectedCountries: ['Canada'],
            affectedCommodities: ['Food Products', 'Beverages'],
            source: 'CFIA',
            severity: 'Important',
        },
        {
            id: generateId(),
            title: 'UK Post-Brexit Border Controls Phase 3',
            summary: 'Full customs declarations now required for all EU goods entering UK. Simplified procedures end.',
            effectiveDate: '2026-04-01',
            affectedCountries: ['United Kingdom'],
            affectedCommodities: ['All Goods from EU'],
            source: 'HMRC',
            severity: 'Important',
        },
    ];
}

// ============================================================================
// POD & CLAIM ASSISTANT - Document Processing Automation
// ============================================================================

export function processPOD(file) {
    // Mock OCR/extraction - in real implementation, use OCR service
    const mockData = {
        shipmentId: 'SHP-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        deliveryDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        recipientName: 'John Smith',
        recipientSignature: Math.random() > 0.2,
        condition: Math.random() > 0.8 ? 'damaged' : Math.random() > 0.95 ? 'partial' : 'good',
        notes: Math.random() > 0.7 ? 'Package delivered to front desk' : undefined,
        extractedFrom: typeof file === 'string' ? file : file.name,
    };

    return mockData;
}

export function detectDiscrepancies(pod, expectedData) {
    const discrepancies = [];

    // Check for missing signature
    if (!pod.recipientSignature) {
        discrepancies.push({
            type: 'missing_signature',
            severity: 'High',
            description: 'Proof of delivery lacks recipient signature',
            recommendedAction: 'Contact recipient to obtain signature or photo confirmation',
        });
    }

    // Check for damage
    if (pod.condition === 'damaged') {
        discrepancies.push({
            type: 'damage_noted',
            severity: 'High',
            description: 'Damage noted on delivery receipt',
            recommendedAction: 'File insurance claim immediately and document damage with photos',
        });
    }

    // Check for partial delivery
    if (pod.condition === 'partial') {
        discrepancies.push({
            type: 'quantity_mismatch',
            severity: 'High',
            description: 'Partial delivery - not all items received',
            recommendedAction: 'Contact carrier to locate missing items and file claim if necessary',
        });
    }

    // Check for late delivery (if expected date provided)
    if (expectedData?.deliveryDate) {
        const expected = new Date(expectedData.deliveryDate);
        const actual = new Date(pod.deliveryDate);
        const delayDays = Math.floor((actual.getTime() - expected.getTime()) / (1000 * 60 * 60 * 24));

        if (delayDays > 2) {
            discrepancies.push({
                type: 'late_delivery',
                severity: delayDays > 7 ? 'High' : 'Medium',
                description: `Delivery was ${delayDays} days late`,
                recommendedAction: 'Request service credit from carrier for late delivery',
            });
        }
    }

    // Check for wrong recipient
    if (expectedData?.recipientName && pod.recipientName !== expectedData.recipientName) {
        discrepancies.push({
            type: 'wrong_recipient',
            severity: 'High',
            description: `Package signed by ${pod.recipientName}, expected ${expectedData.recipientName}`,
            recommendedAction: 'Verify delivery location and contact recipient to confirm receipt',
        });
    }

    return discrepancies;
}

export function generateClaimTemplate(discrepancies, pod) {
    // Determine claim type
    const hasDamage = discrepancies.some((d) => d.type === 'damage_noted');
    const hasLoss = discrepancies.some((d) => d.type === 'quantity_mismatch');
    const hasDelay = discrepancies.some((d) => d.type === 'late_delivery');

    let claimType = 'General Claim';
    let claimAmount = 0;

    if (hasDamage) {
        claimType = 'Damage Claim';
        claimAmount = 500; // Mock value
    } else if (hasLoss) {
        claimType = 'Loss/Shortage Claim';
        claimAmount = 750;
    } else if (hasDelay) {
        claimType = 'Service Failure Claim';
        claimAmount = 100;
    }

    const supportingDocuments = [
        'Proof of Delivery (POD)',
        'Commercial Invoice',
        'Bill of Lading / Air Waybill',
    ];

    if (hasDamage) {
        supportingDocuments.push('Photos of damaged goods', 'Inspection report');
    }

    if (hasLoss) {
        supportingDocuments.push('Packing list', 'Inventory count sheet');
    }

    const template = `FREIGHT CLAIM NOTICE

Claim Type: ${claimType}
Shipment ID: ${pod.shipmentId}
Delivery Date: ${new Date(pod.deliveryDate).toLocaleDateString()}

DESCRIPTION OF CLAIM:
${discrepancies.map((d) => `• ${d.description}`).join('\n')}

CLAIM AMOUNT: $${claimAmount.toFixed(2)}

SUPPORTING DOCUMENTATION:
${supportingDocuments.map((doc, i) => `${i + 1}. ${doc}`).join('\n')}

REQUESTED RESOLUTION:
${hasDamage ? 'Full reimbursement for damaged goods' : hasLoss ? 'Reimbursement for missing items' : 'Service credit for late delivery'}

Please process this claim within 30 days as per the carrier's terms and conditions.

Claimant Information:
[Your Company Name]
[Contact Information]
[Date]`;

    return {
        claimType,
        claimAmount,
        description: discrepancies.map((d) => d.description).join('; '),
        supportingDocuments,
        submissionInstructions: 'Submit claim to carrier within 9 months of delivery date. Include all supporting documentation.',
        template,
    };
}

export function analyzePOD(pod, expectedData) {
    const discrepancies = detectDiscrepancies(pod, expectedData);
    const claimRecommended = discrepancies.some((d) => d.severity === 'High');
    const claimTemplate = claimRecommended ? generateClaimTemplate(discrepancies, pod) : undefined;

    return {
        pod,
        discrepancies,
        claimRecommended,
        claimTemplate,
    };
}
