/**
 * LogisticsDataStore — Unified CRUD service for all Logistics Tool data.
 * Uses localStorage for persistence. Call seed() on first run to populate demo data.
 */

const STORAGE_KEY = 'marapone_logistics_data';

// ─────────────────────────────────────────────
//  CORE CRUD
// ─────────────────────────────────────────────

function loadStore() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function ensureStore() {
    let store = loadStore();
    if (!store) {
        store = createEmptyStore();
        saveStore(store);
    }
    return store;
}

function createEmptyStore() {
    return {
        shipments: [],
        shipmentEvents: [],
        rateQuotes: [],
        complianceItems: [],
        documents: [],
        carbonReports: [],
        riskAlerts: [],
        marketIntel: [],
        activity: [],
    };
}

let _uid = Date.now();
function uid() { return `lt-${++_uid}`; }

// ─────────────────────────────────────────────
//  PUBLIC API
// ─────────────────────────────────────────────

export const LogisticsDataStore = {
    // Generic CRUD for flat arrays
    getAll(entity) {
        const store = ensureStore();
        return store[entity] || [];
    },

    getById(entity, id) {
        return this.getAll(entity).find(r => r.id === id) || null;
    },

    create(entity, data) {
        const store = ensureStore();
        if (!store[entity]) store[entity] = [];
        const item = { id: uid(), ...data, createdAt: new Date().toISOString() };
        store[entity].push(item);
        logActivity('create', entity, item);
        saveStore(store);
        return item;
    },

    update(entity, id, updates) {
        const store = ensureStore();
        const arr = store[entity] || [];
        const idx = arr.findIndex(r => r.id === id);
        if (idx === -1) return null;
        arr[idx] = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
        logActivity('update', entity, arr[idx]);
        saveStore(store);
        return arr[idx];
    },

    delete(entity, id) {
        const store = ensureStore();
        const arr = store[entity] || [];
        const idx = arr.findIndex(r => r.id === id);
        if (idx === -1) return false;
        const [removed] = arr.splice(idx, 1);
        logActivity('delete', entity, removed);
        saveStore(store);
        return true;
    },

    // ─── Computed aggregates ────────────────────
    getDashboardStats() {
        const shipments = this.getAll('shipments');
        const active = shipments.filter(s => s.status !== 'delivered' && s.status !== 'cancelled');
        const delivered = shipments.filter(s => s.status === 'delivered');
        const onTime = delivered.filter(s => !s.delayed);
        const riskAlerts = this.getAll('riskAlerts');
        const compliance = this.getAll('complianceItems');
        const totalValue = shipments.reduce((sum, s) => sum + (s.value || 0), 0);

        return {
            activeShipments: active.length,
            onTimeRate: delivered.length > 0 ? Math.round((onTime.length / delivered.length) * 100) : 98,
            complianceScore: compliance.length > 0
                ? Math.round(compliance.filter(c => c.status === 'compliant').length / compliance.length * 100)
                : 96,
            savingsYTD: '$' + (totalValue * 0.032).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            activeAlerts: riskAlerts.filter(r => r.status === 'active').length,
            totalShipments: shipments.length,
            deliveredCount: delivered.length,
        };
    },

    getShipmentSummary() {
        const shipments = this.getAll('shipments');
        const byStatus = {};
        shipments.forEach(s => {
            byStatus[s.status] = (byStatus[s.status] || 0) + 1;
        });
        const byMode = {};
        shipments.forEach(s => {
            byMode[s.mode] = (byMode[s.mode] || 0) + 1;
        });
        return { byStatus, byMode, total: shipments.length };
    },

    // ─── Activity log ───────────────────────────
    getActivity(limit = 20) {
        const store = ensureStore();
        return (store.activity || [])
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    },

    // ─── Seed / Reset ───────────────────────────
    seed() {
        const store = ensureStore();
        if (store.shipments && store.shipments.length > 0) return; // already seeded
        const seedData = getSeedData();
        Object.assign(store, seedData);
        saveStore(store);
    },

    reset() {
        localStorage.removeItem(STORAGE_KEY);
        this.seed();
    },

    isSeeded() {
        const store = loadStore();
        return store && store.shipments && store.shipments.length > 0;
    },
};

// ─────────────────────────────────────────────
//  ACTIVITY LOG
// ─────────────────────────────────────────────

const entityLabels = {
    shipments: 'shipment', rateQuotes: 'rate quote', complianceItems: 'compliance item',
    documents: 'document', carbonReports: 'carbon report', riskAlerts: 'risk alert',
    marketIntel: 'market intel',
};

const actionVerbs = { create: 'Added', update: 'Updated', delete: 'Removed' };
const actionColors = { create: '#22c55e', update: '#3b82f6', delete: '#ef4444' };

function logActivity(action, entity, item) {
    const store = ensureStore();
    if (!store.activity) store.activity = [];
    store.activity.push({
        id: uid(),
        action,
        entity,
        verb: actionVerbs[action] || action,
        label: entityLabels[entity] || entity,
        name: item?.name || item?.origin || item?.title || item?.id || '',
        color: actionColors[action] || '#6b7280',
        timestamp: new Date().toISOString(),
    });
    // keep last 100
    if (store.activity.length > 100) store.activity = store.activity.slice(-100);
    saveStore(store);
}

// ─────────────────────────────────────────────
//  SEED DATA
// ─────────────────────────────────────────────

function getSeedData() {
    const now = Date.now();
    const ms = (days) => days * 86400000;
    const past = (days) => new Date(now - ms(days)).toISOString();
    const future = (days) => new Date(now + ms(days)).toISOString();

    return {
        shipments: [
            { id: 'SH-001', name: 'Electronics Import — Shenzhen', origin: 'Shenzhen, CN', destination: 'Long Beach, US', mode: 'ocean', status: 'in-transit', value: 285000, eta: future(8), departure: past(12), vessel: 'MSC Marina', container: 'MSCU-2847561', progress: 60, delayed: false },
            { id: 'SH-002', name: 'Auto Parts — Hamburg', origin: 'Hamburg, DE', destination: 'Newark, US', mode: 'ocean', status: 'in-transit', value: 142000, eta: future(5), departure: past(9), vessel: 'Maersk Edmonton', container: 'MAEU-1029384', progress: 72, delayed: false },
            { id: 'SH-003', name: 'Textiles — Mumbai', origin: 'Mumbai, IN', destination: 'Rotterdam, NL', mode: 'ocean', status: 'customs', value: 89000, eta: future(2), departure: past(18), vessel: 'CMA CGM Liberty', container: 'CMAU-5561029', progress: 88, delayed: true },
            { id: 'SH-004', name: 'Pharma Shipment — Basel', origin: 'Basel, CH', destination: 'Singapore, SG', mode: 'air', status: 'in-transit', value: 520000, eta: future(1), departure: past(1), flight: 'LX 8032', awb: '724-8392718', progress: 65, delayed: false },
            { id: 'SH-005', name: 'Machinery — Osaka', origin: 'Osaka, JP', destination: 'Los Angeles, US', mode: 'ocean', status: 'loading', value: 380000, eta: future(14), departure: future(1), vessel: 'ONE Commitment', container: 'KKFU-7381920', progress: 15, delayed: false },
            { id: 'SH-006', name: 'Wine Shipment — Bordeaux', origin: 'Bordeaux, FR', destination: 'New York, US', mode: 'ocean', status: 'delivered', value: 67000, eta: past(2), departure: past(22), vessel: 'Hapag Lloyd Express', container: 'HLXU-9920183', progress: 100, delayed: false },
            { id: 'SH-007', name: 'Coffee Beans — Santos', origin: 'Santos, BR', destination: 'Antwerp, BE', mode: 'ocean', status: 'delivered', value: 195000, eta: past(5), departure: past(30), vessel: 'MSC Gülsün', container: 'MSCU-6671029', progress: 100, delayed: false },
            { id: 'SH-008', name: 'Steel Coils — Busan', origin: 'Busan, KR', destination: 'Houston, US', mode: 'ocean', status: 'in-transit', value: 410000, eta: future(11), departure: past(7), vessel: 'Evergreen Ever Given', container: 'EGLV-3928471', progress: 38, delayed: false },
            { id: 'SH-009', name: 'Luxury Goods — Milan', origin: 'Milan, IT', destination: 'Dubai, AE', mode: 'air', status: 'delivered', value: 720000, eta: past(1), departure: past(2), flight: 'EK 4091', awb: '176-2938471', progress: 100, delayed: false },
            { id: 'SH-010', name: 'Semiconductor Wafers — Taipei', origin: 'Taipei, TW', destination: 'Dresden, DE', mode: 'air', status: 'in-transit', value: 1250000, eta: future(1), departure: past(0.5), flight: 'CI 9128', awb: '297-1920384', progress: 55, delayed: false },
        ],
        rateQuotes: [
            { id: 'RQ-001', route: 'Shanghai → LA', mode: 'FCL 40ft', carrier: 'MSC', rate: 2850, currency: 'USD', validUntil: future(7), trend: 'up', change: '+3.2%' },
            { id: 'RQ-002', route: 'Hamburg → NY', mode: 'FCL 20ft', carrier: 'Maersk', rate: 1950, currency: 'USD', validUntil: future(5), trend: 'down', change: '-1.8%' },
            { id: 'RQ-003', route: 'Singapore → Rotterdam', mode: 'FCL 40ft', carrier: 'ONE', rate: 3200, currency: 'USD', validUntil: future(10), trend: 'stable', change: '+0.2%' },
            { id: 'RQ-004', route: 'Shenzhen → Long Beach', mode: 'LCL', carrier: 'CMA CGM', rate: 85, currency: 'USD/CBM', validUntil: future(3), trend: 'up', change: '+5.1%' },
            { id: 'RQ-005', route: 'Mumbai → Felixstowe', mode: 'FCL 40ft HC', carrier: 'Hapag-Lloyd', rate: 2700, currency: 'USD', validUntil: future(8), trend: 'down', change: '-2.4%' },
        ],
        complianceItems: [
            { id: 'CI-001', title: 'CTPAT Certification', status: 'compliant', category: 'security', lastAudit: past(30), nextAudit: future(60), score: 98, region: 'US' },
            { id: 'CI-002', title: 'AEO Status', status: 'compliant', category: 'customs', lastAudit: past(45), nextAudit: future(45), score: 95, region: 'EU' },
            { id: 'CI-003', title: 'ISPS Code Compliance', status: 'compliant', category: 'maritime', lastAudit: past(15), nextAudit: future(75), score: 100, region: 'Global' },
            { id: 'CI-004', title: 'Dangerous Goods Handling', status: 'review', category: 'safety', lastAudit: past(60), nextAudit: future(5), score: 87, region: 'Global' },
            { id: 'CI-005', title: 'Sanctions Screening', status: 'compliant', category: 'trade', lastAudit: past(1), nextAudit: future(29), score: 100, region: 'Global' },
            { id: 'CI-006', title: 'SOLAS VGM Compliance', status: 'compliant', category: 'maritime', lastAudit: past(20), nextAudit: future(70), score: 96, region: 'Global' },
        ],
        documents: [
            { id: 'DOC-001', title: 'Bill of Lading — SH-001', type: 'bill-of-lading', status: 'verified', shipmentId: 'SH-001', createdAt: past(12) },
            { id: 'DOC-002', title: 'Commercial Invoice — SH-001', type: 'commercial-invoice', status: 'verified', shipmentId: 'SH-001', createdAt: past(12) },
            { id: 'DOC-003', title: 'Certificate of Origin — SH-003', type: 'certificate-origin', status: 'pending', shipmentId: 'SH-003', createdAt: past(18) },
            { id: 'DOC-004', title: 'Packing List — SH-004', type: 'packing-list', status: 'verified', shipmentId: 'SH-004', createdAt: past(1) },
            { id: 'DOC-005', title: 'Insurance Certificate — SH-008', type: 'insurance', status: 'verified', shipmentId: 'SH-008', createdAt: past(7) },
            { id: 'DOC-006', title: 'Airway Bill — SH-010', type: 'airway-bill', status: 'processing', shipmentId: 'SH-010', createdAt: past(0.5) },
        ],
        carbonReports: [
            { id: 'CR-001', shipmentId: 'SH-006', co2Kg: 4200, mode: 'ocean', distance: 5800, offsetStatus: 'offset', rating: 'A' },
            { id: 'CR-002', shipmentId: 'SH-007', co2Kg: 6800, mode: 'ocean', distance: 9200, offsetStatus: 'partial', rating: 'B' },
            { id: 'CR-003', shipmentId: 'SH-004', co2Kg: 18500, mode: 'air', distance: 10200, offsetStatus: 'none', rating: 'D' },
            { id: 'CR-004', shipmentId: 'SH-009', co2Kg: 22100, mode: 'air', distance: 5600, offsetStatus: 'offset', rating: 'C' },
        ],
        riskAlerts: [
            { id: 'RA-001', title: 'Suez Canal Congestion', severity: 'high', status: 'active', region: 'Middle East', impact: 'Potential 3-5 day delays for Asia-Europe routes', createdAt: past(2) },
            { id: 'RA-002', title: 'Port Strike — Felixstowe', severity: 'medium', status: 'active', region: 'UK', impact: 'Limited berth availability, 24-48hr delays expected', createdAt: past(1) },
            { id: 'RA-003', title: 'Typhoon Warning — Western Pacific', severity: 'high', status: 'active', region: 'Asia Pacific', impact: 'Vessel diversions likely for JP/KR/TW departures', createdAt: past(0.5) },
            { id: 'RA-004', title: 'Customs System Upgrade — US CBP', severity: 'low', status: 'resolved', region: 'North America', impact: 'ACE system downtime resolved — normal processing resumed', createdAt: past(5) },
            { id: 'RA-005', title: 'Blank Sailing — Asia-USWC', severity: 'medium', status: 'active', region: 'Trans-Pacific', impact: 'MSC/2M alliance cancelling 2 sailings, capacity reduced 15%', createdAt: past(3) },
        ],
        marketIntel: [
            { id: 'MI-001', title: 'Trans-Pacific Rates Surge', category: 'rates', summary: 'Spot rates Shanghai-LA up 12% WoW due to blank sailings and capacity constraints', trend: 'bearish', timestamp: past(1) },
            { id: 'MI-002', title: 'EU Carbon Border Tax Update', category: 'regulation', summary: 'CBAM transitional phase reporting requirements tightened for maritime imports', trend: 'neutral', timestamp: past(2) },
            { id: 'MI-003', title: 'New Panama Canal Restrictions', category: 'infrastructure', summary: 'Draft restrictions extended through Q1 — max 24 vessels/day transit', trend: 'bearish', timestamp: past(3) },
            { id: 'MI-004', title: 'Container Surplus Expected Q2', category: 'equipment', summary: 'New container production exceeding scrapping rates, equipment surplus expected', trend: 'bullish', timestamp: past(4) },
        ],
        activity: [
            { id: 'ACT-001', action: 'create', entity: 'shipments', verb: 'Added', label: 'shipment', name: 'Semiconductor Wafers — Taipei', color: '#22c55e', timestamp: past(0.5) },
            { id: 'ACT-002', action: 'update', entity: 'shipments', verb: 'Updated', label: 'shipment', name: 'Textiles — Mumbai', color: '#3b82f6', timestamp: past(1) },
            { id: 'ACT-003', action: 'create', entity: 'riskAlerts', verb: 'Added', label: 'risk alert', name: 'Typhoon Warning — Western Pacific', color: '#22c55e', timestamp: past(0.5) },
            { id: 'ACT-004', action: 'update', entity: 'complianceItems', verb: 'Updated', label: 'compliance item', name: 'Sanctions Screening', color: '#3b82f6', timestamp: past(1) },
            { id: 'ACT-005', action: 'create', entity: 'documents', verb: 'Added', label: 'document', name: 'Airway Bill — SH-010', color: '#22c55e', timestamp: past(0.5) },
            { id: 'ACT-006', action: 'update', entity: 'shipments', verb: 'Updated', label: 'shipment', name: 'Steel Coils — Busan', color: '#3b82f6', timestamp: past(2) },
            { id: 'ACT-007', action: 'create', entity: 'marketIntel', verb: 'Added', label: 'market intel', name: 'Trans-Pacific Rates Surge', color: '#22c55e', timestamp: past(1) },
        ],
    };
}

export default LogisticsDataStore;
