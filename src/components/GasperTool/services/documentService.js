// AI Document Generator Service
// Ported from prototype

import { generateId } from '../../../lib/utils';

export function generateTradeDocument(request) {
    // Determine title based on type
    const titles = {
        invoice: 'COMMERCIAL INVOICE',
        packing_list: 'PACKING LIST',
        origin_certificate: 'CERTIFICATE OF ORIGIN',
        bill_of_lading: 'BILL OF LADING',
    };

    // Mock content generation based on template
    const sections = [
        {
            heading: 'Shipper / Exporter',
            content: 'Global Trade Co.\n123 Export Blvd\nShanghai, China 200000',
        },
        {
            heading: 'Consignee',
            content: 'North American Imports Ltd.\n456 Import Dr\nToronto, ON M5V 2H1\nCanada',
        },
        {
            heading: 'Shipment Details',
            content: {
                'Invoice No': `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
                'Date': new Date().toLocaleDateString(),
                'Transport Mode': 'Air Freight',
                'Port of Loading': 'Shanghai Pudong (PVG)',
                'Port of Discharge': 'Toronto Pearson (YYZ)',
            },
        },
        {
            heading: 'Line Items',
            content: request.template === 'compact'
                ? '1. Wireless Bluetooth Speakers (HS 8518.21) - 500 Units - $12,500.00'
                : 'Item 1: Wireless Bluetooth Speakers\nHS Code: 8518.21.00\nQty: 500 Units\nUnit Price: $25.00\nTotal Value: $12,500.00\nCountry of Origin: China',
        },
    ];

    if (request.includeSignature) {
        sections.push({
            heading: 'Authorization',
            content: 'Signed by: [Authorized Signature]\nDate: ' + new Date().toLocaleDateString(),
        });
    }

    return {
        id: generateId(),
        type: request.documentTypes[0], // For demo, just returning the first match
        dateCreated: new Date().toISOString(),
        status: 'generated',
        content: {
            title: titles[request.documentTypes[0]] || 'TRADE DOCUMENT',
            sections,
        },
        metadata: {
            shipmentId: request.shipmentId,
            version: 1,
            generatedBy: 'AI Document Generator',
        },
    };
}

/**
 * Mocks the extraction of data from a raw document image/PDF via Neural OCR
 */
export function parseDocumentOCR(docType = 'bill_of_lading') {
    return {
        confidence: 0.985,
        fieldsExtracted: [
            { label: 'Carrier', value: 'Maersk Line A/S', confidence: 0.99 },
            { label: 'Vessel', value: 'MAERSK MC-KINNEY MOLLER', confidence: 0.98 },
            { label: 'Container ID', value: 'MSKU 123456-7', confidence: 0.99 },
            { label: 'Weight', value: '24,500 KG', confidence: 0.97 },
            { label: 'Origin Port', value: 'Shanghai (CNSHA)', confidence: 0.99 }
        ],
        anomalies: [
            { field: 'Date', raw: '2024-02-30', suggestion: 'Possible invalid date detected (Feb offset)', severity: 'warning' }
        ]
    };
}

/**
 * Mocks a blockchain notary check for document authenticity
 */
export function getBlockchainNotaryRecord(docId) {
    const timestamp = new Date().toISOString();
    return {
        isAuthentic: true,
        chainId: 'ETH-L2-OPTIMISM-99',
        blockNumber: 15482931,
        txHash: '0x' + Math.random().toString(16).slice(2, 42),
        notaryTime: timestamp,
        merkleRoot: '0xabc...def',
        certificateUrl: `/api/verify/${docId}`
    };
}

