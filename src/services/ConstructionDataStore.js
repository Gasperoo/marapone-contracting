/**
 * ConstructionDataStore — Unified CRUD service for all Construction Tool data.
 * Uses localStorage for persistence. Call seed() on first run to populate demo data.
 */

const STORAGE_KEY = 'marapone_construction_data';
const ACTIVITY_KEY = 'marapone_construction_activity';

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
        projects: [],
        takeoffItems: [],
        cashFlow: { invoices: [], payables: [], budgets: [] },
        equipment: [],
        subcontractors: [],
        compliance: [],
        scheduleTasks: [],
        clientFeedback: [],
        securityAlerts: [],
        siteArrivals: [],
        _seeded: false,
    };
}

let _uid = Date.now();
function uid() { return `id_${_uid++}_${Math.random().toString(36).slice(2, 7)}`; }

// ─────────────────────────────────────────────
//  PUBLIC API
// ─────────────────────────────────────────────

export const DataStore = {
    // Generic CRUD for flat arrays
    getAll(entity) {
        const store = ensureStore();
        return store[entity] || [];
    },

    getById(entity, id) {
        return this.getAll(entity).find(item => item.id === id) || null;
    },

    create(entity, data) {
        const store = ensureStore();
        if (!store[entity]) store[entity] = [];
        const item = { id: uid(), createdAt: new Date().toISOString(), ...data };
        store[entity].push(item);
        saveStore(store);
        logActivity('create', entity, item);
        return item;
    },

    update(entity, id, updates) {
        const store = ensureStore();
        const arr = store[entity] || [];
        const idx = arr.findIndex(item => item.id === id);
        if (idx === -1) return null;
        arr[idx] = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
        saveStore(store);
        logActivity('update', entity, arr[idx]);
        return arr[idx];
    },

    delete(entity, id) {
        const store = ensureStore();
        const arr = store[entity] || [];
        const idx = arr.findIndex(item => item.id === id);
        if (idx === -1) return false;
        const removed = arr.splice(idx, 1)[0];
        saveStore(store);
        logActivity('delete', entity, removed);
        return true;
    },

    // Nested CRUD for cashFlow sub-entities
    getCashFlow() {
        const store = ensureStore();
        return store.cashFlow || { invoices: [], payables: [], budgets: [] };
    },

    addInvoice(invoice) {
        const store = ensureStore();
        const item = { id: uid(), createdAt: new Date().toISOString(), ...invoice };
        store.cashFlow.invoices.push(item);
        saveStore(store);
        logActivity('create', 'invoice', item);
        return item;
    },

    updateInvoice(id, updates) {
        const store = ensureStore();
        const idx = store.cashFlow.invoices.findIndex(i => i.id === id);
        if (idx === -1) return null;
        store.cashFlow.invoices[idx] = { ...store.cashFlow.invoices[idx], ...updates };
        saveStore(store);
        return store.cashFlow.invoices[idx];
    },

    deleteInvoice(id) {
        const store = ensureStore();
        store.cashFlow.invoices = store.cashFlow.invoices.filter(i => i.id !== id);
        saveStore(store);
        return true;
    },

    addPayable(payable) {
        const store = ensureStore();
        const item = { id: uid(), createdAt: new Date().toISOString(), ...payable };
        store.cashFlow.payables.push(item);
        saveStore(store);
        logActivity('create', 'payable', item);
        return item;
    },

    updatePayable(id, updates) {
        const store = ensureStore();
        const idx = store.cashFlow.payables.findIndex(i => i.id === id);
        if (idx === -1) return null;
        store.cashFlow.payables[idx] = { ...store.cashFlow.payables[idx], ...updates };
        saveStore(store);
        return store.cashFlow.payables[idx];
    },

    deletePayable(id) {
        const store = ensureStore();
        store.cashFlow.payables = store.cashFlow.payables.filter(i => i.id !== id);
        saveStore(store);
        return true;
    },

    // ─── Computed aggregates ────────────────────
    getDashboardStats() {
        const store = ensureStore();
        const projects = store.projects || [];
        const activeProjects = projects.filter(p => p.status === 'active').length;
        const tasks = store.scheduleTasks || [];
        const completedTasks = tasks.filter(t => t.status === 'completed').length;
        const totalTasks = tasks.length;
        const takeoffItems = store.takeoffItems || [];
        const equipment = store.equipment || [];
        const avgHealth = equipment.length
            ? Math.round(equipment.reduce((s, e) => s + (e.health || 0), 0) / equipment.length)
            : 0;

        return {
            activeProjects: activeProjects || projects.length,
            completedTasks,
            totalTasks,
            takeoffItemCount: takeoffItems.length,
            avgEquipmentHealth: avgHealth,
            totalBudget: projects.reduce((s, p) => s + (parseFloat(p.budget) || 0), 0),
        };
    },

    getCashFlowSummary() {
        const cf = this.getCashFlow();
        const invoices = cf.invoices || [];
        const payables = cf.payables || [];

        const totalAR = invoices.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
        const paidAR = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
        const outstandingAR = totalAR - paidAR;

        const totalAP = payables.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
        const paidAP = payables.filter(p => p.status === 'paid').reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
        const outstandingAP = totalAP - paidAP;

        const cashBalance = paidAR - paidAP;
        const monthlyBurn = totalAP / Math.max(payables.length, 1);

        // Build monthly data
        const monthlyData = buildMonthlyData(invoices, payables);

        // Generate alerts
        const alerts = generateCashAlerts(invoices, payables, cashBalance, monthlyBurn);

        return {
            cashBalance,
            totalAR,
            outstandingAR,
            totalAP,
            outstandingAP,
            monthlyBurn,
            runway: monthlyBurn > 0 ? (cashBalance / monthlyBurn).toFixed(1) : '∞',
            healthScore: computeCashHealthScore(cashBalance, outstandingAR, outstandingAP),
            monthly: monthlyData,
            alerts,
            invoices,
            payables,
        };
    },

    // ─── Activity log ───────────────────────────
    getActivity(limit = 20) {
        try {
            const raw = localStorage.getItem(ACTIVITY_KEY);
            const all = raw ? JSON.parse(raw) : [];
            return all.slice(0, limit);
        } catch { return []; }
    },

    // ─── Seed / Reset ───────────────────────────
    seed() {
        const store = ensureStore();
        if (store._seeded) return; // Already seeded
        const seeded = { ...createEmptyStore(), ...getSeedData(), _seeded: true };
        saveStore(seeded);
        // Seed some activity
        const seedActivities = [
            { action: 'create', entity: 'project', label: 'Created project: Harbor View Tower', time: new Date(Date.now() - 3600000).toISOString(), color: '#22c55e' },
            { action: 'create', entity: 'invoice', label: 'Added invoice: Riverside Apartments — $34,500', time: new Date(Date.now() - 7200000).toISOString(), color: '#f59e0b' },
            { action: 'update', entity: 'equipment', label: 'Logged sensor reading: Crane #01 Motor Temp 72°C', time: new Date(Date.now() - 10800000).toISOString(), color: '#3b82f6' },
            { action: 'create', entity: 'compliance', label: 'Added permit: Building Permit #BP-2025-042', time: new Date(Date.now() - 14400000).toISOString(), color: '#10b981' },
            { action: 'create', entity: 'takeoffItem', label: 'Added 42 takeoff items from blueprint analysis', time: new Date(Date.now() - 18000000).toISOString(), color: '#3b82f6' },
        ];
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(seedActivities));
    },

    reset() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(ACTIVITY_KEY);
    },

    isSeeded() {
        const store = loadStore();
        return store?._seeded === true;
    },
};

// ─────────────────────────────────────────────
//  ACTIVITY LOG
// ─────────────────────────────────────────────

const entityLabels = {
    projects: 'project', takeoffItems: 'takeoff item', equipment: 'equipment',
    subcontractors: 'subcontractor', compliance: 'compliance item',
    scheduleTasks: 'schedule task', clientFeedback: 'client feedback',
    securityAlerts: 'security alert', siteArrivals: 'arrival log',
    invoice: 'invoice', payable: 'payable',
};

const actionVerbs = { create: 'Added', update: 'Updated', delete: 'Removed' };
const actionColors = { create: '#22c55e', update: '#3b82f6', delete: '#ef4444' };

function logActivity(action, entity, item) {
    try {
        const raw = localStorage.getItem(ACTIVITY_KEY);
        const activities = raw ? JSON.parse(raw) : [];
        const label = `${actionVerbs[action] || action} ${entityLabels[entity] || entity}: ${item?.name || item?.vendor || item?.client || item?.desc || item?.id || ''}`.trim();
        activities.unshift({
            action, entity, label,
            time: new Date().toISOString(),
            color: actionColors[action] || '#6b7280',
        });
        // Keep max 100
        if (activities.length > 100) activities.length = 100;
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activities));
    } catch { /* silent */ }
}

// ─────────────────────────────────────────────
//  CASH FLOW HELPERS
// ─────────────────────────────────────────────

function buildMonthlyData(invoices, payables) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const result = [];

    for (let i = -3; i <= 4; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const m = d.getMonth();
        const y = d.getFullYear();
        const monthInvoices = invoices.filter(inv => {
            const invDate = new Date(inv.dueDate || inv.createdAt);
            return invDate.getMonth() === m && invDate.getFullYear() === y;
        });
        const monthPayables = payables.filter(p => {
            const pDate = new Date(p.dueDate || p.createdAt);
            return pDate.getMonth() === m && pDate.getFullYear() === y;
        });
        result.push({
            month: months[m],
            inflow: monthInvoices.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0),
            outflow: monthPayables.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0),
        });
    }
    return result;
}

function computeCashHealthScore(balance, arOut, apOut) {
    let score = 50;
    if (balance > 0) score += Math.min(25, balance / 10000);
    if (arOut < apOut) score += 10; else score -= 10;
    if (balance > apOut * 2) score += 15;
    return Math.max(0, Math.min(100, Math.round(score)));
}

function generateCashAlerts(invoices, payables, balance, burn) {
    const alerts = [];
    const now = Date.now();

    // Overdue invoices
    const overdue = invoices.filter(i => i.status !== 'paid' && new Date(i.dueDate) < now);
    if (overdue.length > 0) {
        const total = overdue.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
        alerts.push({
            severity: 'critical',
            title: `${overdue.length} Overdue Invoice${overdue.length > 1 ? 's' : ''}`,
            description: `$${total.toLocaleString()} outstanding past due date.`,
            suggestion: `Send reminders to ${overdue.map(i => i.client).join(', ')}.`,
        });
    }

    // Low runway
    if (burn > 0 && balance / burn < 3) {
        alerts.push({
            severity: 'warning',
            title: 'Low Cash Runway',
            description: `Only ${(balance / burn).toFixed(1)} months of runway at current burn rate.`,
            suggestion: 'Accelerate AR collections or negotiate extended AP terms.',
        });
    }

    // Large upcoming payable
    const upcoming = payables.filter(p => p.status !== 'paid' && new Date(p.dueDate) > now && new Date(p.dueDate) < now + 14 * 86400000);
    if (upcoming.length > 0) {
        alerts.push({
            severity: 'info',
            title: `${upcoming.length} Payment${upcoming.length > 1 ? 's' : ''} Due Soon`,
            description: `$${upcoming.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0).toLocaleString()} due within 14 days.`,
            suggestion: 'Review cash position and prioritize critical vendor payments.',
        });
    }

    return alerts;
}

// ─────────────────────────────────────────────
//  SEED DATA
// ─────────────────────────────────────────────

function getSeedData() {
    const now = new Date();
    const ms = (days) => new Date(now.getTime() + days * 86400000).toISOString();
    const past = (days) => new Date(now.getTime() - days * 86400000).toISOString();

    return {
        projects: [
            { id: uid(), name: 'Harbor View Tower', status: 'active', budget: 8700000, progress: 31, phase: 'Foundation', startDate: past(90), endDate: ms(270) },
            { id: uid(), name: 'Westside Commercial', status: 'active', budget: 4200000, progress: 68, phase: 'Structural', startDate: past(180), endDate: ms(120) },
            { id: uid(), name: 'Midtown Renovation', status: 'active', budget: 1900000, progress: 82, phase: 'MEP Rough-In', startDate: past(240), endDate: ms(45) },
            { id: uid(), name: 'Riverside Apartments', status: 'active', budget: 3400000, progress: 45, phase: 'Framing', startDate: past(120), endDate: ms(200) },
        ],

        takeoffItems: [
            { id: uid(), category: 'Structural', desc: 'Concrete Foundation (300mm slab)', qty: 185, unit: 'm³', rate: 132, total: 24420 },
            { id: uid(), category: 'Structural', desc: 'Rebar (#4 Grade 60)', qty: 12400, unit: 'kg', rate: 1.85, total: 22940 },
            { id: uid(), category: 'Structural', desc: 'Structural Steel Beams (W12×26)', qty: 48, unit: 'ea', rate: 1250, total: 60000 },
            { id: uid(), category: 'Structural', desc: 'Formwork (Plywood)', qty: 2200, unit: 'm²', rate: 28, total: 61600 },
            { id: uid(), category: 'MEP', desc: 'Copper Pipe (3/4" Supply)', qty: 850, unit: 'm', rate: 32, total: 27200 },
            { id: uid(), category: 'MEP', desc: 'PVC Drainage (4")', qty: 420, unit: 'm', rate: 18, total: 7560 },
            { id: uid(), category: 'MEP', desc: 'LED Light Fixtures (Recessed)', qty: 240, unit: 'ea', rate: 185, total: 44400 },
            { id: uid(), category: 'MEP', desc: 'Electrical Outlets (Duplex)', qty: 180, unit: 'ea', rate: 45, total: 8100 },
            { id: uid(), category: 'Finishes', desc: 'Drywall (12.5mm)', qty: 4800, unit: 'm²', rate: 22, total: 105600 },
            { id: uid(), category: 'Finishes', desc: 'Interior Paint (Dulux)', qty: 3400, unit: 'm²', rate: 12, total: 40800 },
            { id: uid(), category: 'Finishes', desc: 'Ceramic Floor Tile', qty: 1200, unit: 'm²', rate: 65, total: 78000 },
            { id: uid(), category: 'Finishes', desc: 'Suspended Ceiling Grid', qty: 1850, unit: 'm²', rate: 35, total: 64750 },
        ],

        cashFlow: {
            invoices: [
                { id: uid(), client: 'Riverside Apartments LLC', project: 'Riverside Apartments', amount: 34500, dueDate: past(12), status: 'overdue', description: 'Phase 2 Progress Payment' },
                { id: uid(), client: 'Metro Commercial Group', project: 'Westside Commercial', amount: 67200, dueDate: ms(5), status: 'pending', description: 'Structural Milestone' },
                { id: uid(), client: 'Henderson Homes', project: 'Midtown Renovation', amount: 18900, dueDate: ms(12), status: 'sent', description: 'MEP Rough-In Progress' },
                { id: uid(), client: 'City of Springfield', project: 'Harbor View Tower', amount: 125000, dueDate: ms(20), status: 'sent', description: 'Foundation Completion' },
                { id: uid(), client: 'Riverside Apartments LLC', project: 'Riverside Apartments', amount: 28000, dueDate: past(45), status: 'paid', description: 'Phase 1 Final' },
                { id: uid(), client: 'Metro Commercial Group', project: 'Westside Commercial', amount: 95000, dueDate: past(30), status: 'paid', description: 'Design Phase Complete' },
            ],
            payables: [
                { id: uid(), vendor: 'ABC Lumber Supply', project: 'Midtown Renovation', amount: 12800, dueDate: ms(3), status: 'pending', description: 'Lumber Order #LO-2847' },
                { id: uid(), vendor: 'City Concrete Co.', project: 'Harbor View Tower', amount: 28400, dueDate: ms(8), status: 'pending', description: 'Foundation Pour #3' },
                { id: uid(), vendor: 'Steel Dynamics Inc.', project: 'Westside Commercial', amount: 45000, dueDate: ms(15), status: 'pending', description: 'Structural Steel Delivery' },
                { id: uid(), vendor: 'Pacific Electrical', project: 'Riverside Apartments', amount: 8200, dueDate: past(5), status: 'overdue', description: 'Panel Installation' },
                { id: uid(), vendor: 'ABC Lumber Supply', project: 'Westside Commercial', amount: 18500, dueDate: past(20), status: 'paid', description: 'Framing Material' },
                { id: uid(), vendor: 'City Concrete Co.', project: 'Harbor View Tower', amount: 32000, dueDate: past(35), status: 'paid', description: 'Foundation Pour #1-2' },
            ],
            budgets: [],
        },

        equipment: [
            {
                id: uid(), name: 'Tower Crane #01', status: 'healthy', health: 96, nextMaint: ms(12), project: 'Harbor View Tower',
                sensors: [
                    { label: 'Motor Temp', value: 72, unit: '°C', max: 95, status: 'ok' },
                    { label: 'Cable Tension', value: 82, unit: '%', max: 100, status: 'ok' },
                    { label: 'Wind Load', value: 34, unit: 'km/h', max: 65, status: 'ok' },
                ]
            },
            {
                id: uid(), name: 'Excavator CAT 320', status: 'warning', health: 78, nextMaint: ms(3), project: 'Riverside Apartments',
                sensors: [
                    { label: 'Hydraulic Pressure', value: 285, unit: 'bar', max: 350, status: 'ok' },
                    { label: 'Engine Temp', value: 88, unit: '°C', max: 105, status: 'warn' },
                    { label: 'Track Tension', value: 78, unit: '%', max: 100, status: 'warn' },
                ]
            },
            {
                id: uid(), name: 'Concrete Pump #02', status: 'healthy', health: 89, nextMaint: ms(8), project: 'Harbor View Tower',
                sensors: [
                    { label: 'Pump Pressure', value: 165, unit: 'bar', max: 200, status: 'ok' },
                    { label: 'Hopper Level', value: 65, unit: '%', max: 100, status: 'ok' },
                    { label: 'Motor Speed', value: 1420, unit: 'RPM', max: 1800, status: 'ok' },
                ]
            },
            {
                id: uid(), name: 'Generator #01', status: 'healthy', health: 92, nextMaint: ms(15), project: 'Westside Commercial',
                sensors: [
                    { label: 'Output Voltage', value: 398, unit: 'V', max: 420, status: 'ok' },
                    { label: 'Fuel Level', value: 68, unit: '%', max: 100, status: 'ok' },
                    { label: 'Load', value: 72, unit: '%', max: 100, status: 'ok' },
                ]
            },
        ],

        subcontractors: [
            { id: uid(), name: 'Rodriguez Concrete', trade: 'Concrete', rating: 4.8, rate: 145, capacity: 'Available', phone: '(555) 123-4567', projects: 12, onTime: 96 },
            { id: uid(), name: 'Summit Steel Works', trade: 'Structural Steel', rating: 4.6, rate: 185, capacity: 'Busy', phone: '(555) 234-5678', projects: 8, onTime: 92 },
            { id: uid(), name: 'Pacific Electrical', trade: 'Electrical', rating: 4.3, rate: 125, capacity: 'Available', phone: '(555) 345-6789', projects: 15, onTime: 88 },
            { id: uid(), name: 'Clearwater Plumbing', trade: 'Plumbing', rating: 4.7, rate: 135, capacity: 'Available', phone: '(555) 456-7890', projects: 10, onTime: 94 },
            { id: uid(), name: 'Premier Drywall', trade: 'Drywall', rating: 4.1, rate: 95, capacity: 'Busy', phone: '(555) 567-8901', projects: 20, onTime: 85 },
        ],

        compliance: [
            { id: uid(), type: 'permit', name: 'Building Permit #BP-2025-042', project: 'Harbor View Tower', status: 'active', expiryDate: ms(180), issuedDate: past(30) },
            { id: uid(), type: 'permit', name: 'Demolition Permit #DP-2025-011', project: 'Midtown Renovation', status: 'active', expiryDate: ms(60), issuedDate: past(90) },
            { id: uid(), type: 'inspection', name: 'Foundation Inspection', project: 'Harbor View Tower', status: 'pass', inspectionDate: past(7), inspector: 'J. Martinez' },
            { id: uid(), type: 'inspection', name: 'Electrical Rough-In', project: 'Westside Commercial', status: 'pending', inspectionDate: ms(5), inspector: 'TBD' },
            { id: uid(), type: 'inspection', name: 'Fire Sprinkler Test', project: 'Midtown Renovation', status: 'fail', inspectionDate: past(2), inspector: 'R. Chen', notes: 'Pressure drop in Zone B — re-test required' },
            { id: uid(), type: 'cert', name: 'OSHA Safety Certification', project: 'All Sites', status: 'active', expiryDate: ms(90) },
        ],

        scheduleTasks: [
            { id: uid(), name: 'Site Preparation', phase: 'Phase 1', start: 0, duration: 3, progress: 100, status: 'completed', color: '#22c55e' },
            { id: uid(), name: 'Foundation Work', phase: 'Phase 1', start: 2, duration: 5, progress: 85, status: 'active', color: '#3b82f6' },
            { id: uid(), name: 'Structural Steel', phase: 'Phase 2', start: 6, duration: 6, progress: 40, status: 'active', color: '#FF6B00' },
            { id: uid(), name: 'MEP Rough-In', phase: 'Phase 2', start: 8, duration: 8, progress: 15, status: 'active', color: '#a855f7' },
            { id: uid(), name: 'Exterior Envelope', phase: 'Phase 3', start: 12, duration: 5, progress: 0, status: 'pending', color: '#f59e0b' },
            { id: uid(), name: 'Interior Finishes', phase: 'Phase 3', start: 14, duration: 6, progress: 0, status: 'pending', color: '#ec4899' },
            { id: uid(), name: 'Systems Testing', phase: 'Phase 4', start: 18, duration: 3, progress: 0, status: 'pending', color: '#06b6d4' },
            { id: uid(), name: 'Final Inspections', phase: 'Phase 4', start: 21, duration: 2, progress: 0, status: 'pending', color: '#10b981' },
        ],

        clientFeedback: [
            { id: uid(), client: 'Riverside Apartments LLC', project: 'Riverside Apartments', rating: 4, sentiment: 'positive', comment: 'Impressed with the foundation work quality. Team is professional.', date: past(5) },
            { id: uid(), client: 'Metro Commercial Group', project: 'Westside Commercial', rating: 3, sentiment: 'neutral', comment: 'Timeline is slipping slightly. Need better communication on delays.', date: past(12) },
            { id: uid(), client: 'City of Springfield', project: 'Harbor View Tower', rating: 5, sentiment: 'positive', comment: 'Excellent project management. Budget tracking is transparent.', date: past(3) },
            { id: uid(), client: 'Henderson Homes', project: 'Midtown Renovation', rating: 2, sentiment: 'negative', comment: 'Too many change orders. Costs are escalating beyond initial estimates.', date: past(8) },
        ],

        securityAlerts: [
            { id: uid(), type: 'unauthorized_access', severity: 'high', site: 'Harbor View Tower', description: 'Motion detected in Zone B at 2:34 AM — no scheduled crew', timestamp: past(1), status: 'open' },
            { id: uid(), type: 'equipment_movement', severity: 'medium', site: 'Westside Commercial', description: 'Excavator GPS shows unexpected movement after hours', timestamp: past(3), status: 'investigating' },
            { id: uid(), type: 'material_discrepancy', severity: 'low', site: 'Midtown Renovation', description: 'Copper pipe inventory 15% below expected — possible shrinkage', timestamp: past(7), status: 'resolved' },
        ],

        siteArrivals: [
            { id: uid(), crew: 'Concrete Team A', site: 'Harbor View Tower', arrivalTime: '06:45', departureTime: '15:30', headcount: 8, date: past(0) },
            { id: uid(), crew: 'Steel Crew B', site: 'Westside Commercial', arrivalTime: '07:15', departureTime: '16:00', headcount: 6, date: past(0) },
            { id: uid(), crew: 'Electrical Team C', site: 'Midtown Renovation', arrivalTime: '07:00', departureTime: '15:45', headcount: 4, date: past(0) },
            { id: uid(), crew: 'Concrete Team A', site: 'Harbor View Tower', arrivalTime: '06:50', departureTime: '15:15', headcount: 8, date: past(1) },
            { id: uid(), crew: 'Framing Crew D', site: 'Riverside Apartments', arrivalTime: '07:30', departureTime: '16:15', headcount: 10, date: past(1) },
        ],
    };
}

export default DataStore;
