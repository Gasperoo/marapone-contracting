// Construction Tool Services — Mock data for all 7 new AI tools

// ============================================================================
// 1. CASH FLOW GUARDIAN (CFG)
// ============================================================================

export function getCashFlowForecast() {
    return {
        weeks: [
            { week: 'W1', inflow: 45000, outflow: 38000, balance: 52000 },
            { week: 'W2', inflow: 12000, outflow: 41000, balance: 23000 },
            { week: 'W3', inflow: 8000, outflow: 35000, balance: -4000 },
            { week: 'W4', inflow: 62000, outflow: 29000, balance: 29000 },
            { week: 'W5', inflow: 55000, outflow: 44000, balance: 40000 },
            { week: 'W6', inflow: 18000, outflow: 52000, balance: 6000 },
            { week: 'W7', inflow: 71000, outflow: 33000, balance: 44000 },
            { week: 'W8', inflow: 30000, outflow: 47000, balance: 27000 },
        ],
        alerts: [
            { id: 1, severity: 'critical', message: 'Projected $4K shortfall in Week 3 — client payment delayed on Riverside Apts', action: 'Accelerate Invoice #1047', savingsEstimate: '$3,200' },
            { id: 2, severity: 'warning', message: 'Material price hike expected: lumber up 12% by March', action: 'Lock supplier pricing now', savingsEstimate: '$8,400' },
            { id: 3, severity: 'info', message: 'Week 6 cash thin — consider extending supplier terms on concrete order', action: 'Auto-draft extension request', savingsEstimate: '$2,100' },
        ],
        invoices: [
            { id: 'INV-1047', client: 'Riverside Apartments LLC', amount: 34500, age: 42, status: 'overdue', project: 'Riverside Phase 2' },
            { id: 'INV-1051', client: 'Metro Commercial Group', amount: 67200, age: 28, status: 'pending', project: 'Office Tower A' },
            { id: 'INV-1053', client: 'Henderson Homes', amount: 18900, age: 14, status: 'sent', project: 'Henderson Reno' },
            { id: 'INV-1055', client: 'City of Springfield', amount: 125000, age: 7, status: 'sent', project: 'Municipal Center' },
        ],
        materialCosts: [
            { material: 'Lumber (SPF 2x4)', current: 4.85, previous: 4.32, trend: 'up', change: '+12.3%' },
            { material: 'Concrete (per yard)', current: 142, previous: 138, trend: 'up', change: '+2.9%' },
            { material: 'Rebar (#4)', current: 0.72, previous: 0.75, trend: 'down', change: '-4.0%' },
            { material: 'Drywall (4x8)', current: 14.20, previous: 13.90, trend: 'up', change: '+2.2%' },
        ],
    };
}

// ============================================================================
// 2. SUBCONTRACTOR MATCHMAKER AI (SMA)
// ============================================================================

export function getSubcontractorMatches() {
    return {
        projectSpec: {
            name: 'Riverside Apartments Phase 2',
            trades: ['Plumbing', 'Electrical', 'HVAC', 'Drywall'],
            location: 'Springfield, IL',
            startDate: '2026-03-15',
            budget: '$420,000',
        },
        matches: [
            {
                id: 's1', name: 'Rivera Plumbing Co.', trade: 'Plumbing', rating: 4.8, reviews: 127,
                matchScore: 96, distance: '4.2 mi', availability: 'Available Mar 15',
                reliability: 94, pastProjects: 23, avgCompletionRate: '98%',
                priceRange: '$45-55/hr', certifications: ['Licensed', 'Insured', 'Bonded'],
            },
            {
                id: 's2', name: 'Spark Electric LLC', trade: 'Electrical', rating: 4.6, reviews: 89,
                matchScore: 91, distance: '7.8 mi', availability: 'Available Mar 20',
                reliability: 88, pastProjects: 15, avgCompletionRate: '95%',
                priceRange: '$55-70/hr', certifications: ['Master Electrician', 'Insured'],
            },
            {
                id: 's3', name: 'Comfort Air Systems', trade: 'HVAC', rating: 4.9, reviews: 203,
                matchScore: 89, distance: '12.1 mi', availability: 'Available Apr 1',
                reliability: 97, pastProjects: 41, avgCompletionRate: '99%',
                priceRange: '$60-80/hr', certifications: ['EPA Certified', 'NATE', 'Insured'],
            },
            {
                id: 's4', name: 'ProWall Interiors', trade: 'Drywall', rating: 4.4, reviews: 56,
                matchScore: 85, distance: '3.1 mi', availability: 'Available Mar 15',
                reliability: 82, pastProjects: 12, avgCompletionRate: '92%',
                priceRange: '$35-45/hr', certifications: ['Insured', 'Bonded'],
            },
        ],
        milestones: [
            { phase: 'Rough-In', status: 'pending', dueDate: '2026-04-01', completion: 0 },
            { phase: 'Inspection', status: 'pending', dueDate: '2026-04-15', completion: 0 },
            { phase: 'Finish Work', status: 'pending', dueDate: '2026-05-01', completion: 0 },
            { phase: 'Final Walkthrough', status: 'pending', dueDate: '2026-05-15', completion: 0 },
        ],
    };
}

// ============================================================================
// 3. COMPLIANCE AUTO-PILOT (CAP)
// ============================================================================

export function getComplianceData() {
    return {
        overallScore: 87,
        issues: [
            { id: 1, severity: 'high', category: 'OSHA', title: 'Missing fall protection on Level 3', description: 'Workers observed without harnesses above 6ft', fixPlan: 'Deploy temporary guardrails and distribute harnesses', estimatedFine: '$13,653', status: 'open' },
            { id: 2, severity: 'medium', category: 'Building Code', title: 'Fire exit signage incomplete', description: 'Emergency exit signs missing in corridor B2', fixPlan: 'Install illuminated exit signs per IBC 1013.1', estimatedFine: '$2,500', status: 'in-progress' },
            { id: 3, severity: 'low', category: 'EPA', title: 'Stormwater permit renewal due', description: 'SWPPP renewal needed by March 30', fixPlan: 'Auto-submit renewal application', estimatedFine: '$1,000', status: 'scheduled' },
            { id: 4, severity: 'high', category: 'ADA', title: 'Ramp slope exceeds maximum', description: 'Entrance ramp at 1:10 ratio, code requires 1:12', fixPlan: 'Redesign ramp to meet ADA 405.2 slope requirements', estimatedFine: '$5,000', status: 'open' },
        ],
        recentUpdates: [
            { time: '2h ago', text: 'Springfield adopted 2024 IBC amendments — 3 new requirements', source: 'Municipal Registry' },
            { time: '6h ago', text: 'OSHA issued updated silica dust exposure limits (50 µg/m³)', source: 'Federal Register' },
            { time: '1d ago', text: 'EPA extended comment period on lead paint renovation rule', source: 'EPA.gov' },
        ],
        permits: [
            { id: 'P-2026-0142', type: 'Building Permit', project: 'Riverside Apts', status: 'approved', expires: '2026-09-30' },
            { id: 'P-2026-0198', type: 'Electrical Permit', project: 'Office Tower A', status: 'pending-review', expires: null },
            { id: 'P-2026-0205', type: 'Demolition Permit', project: 'Henderson Reno', status: 'auto-submitted', expires: null },
        ],
        inspectionResults: [
            { area: 'Fall Protection', score: 72, status: 'fail' },
            { area: 'PPE Compliance', score: 91, status: 'pass' },
            { area: 'Electrical Safety', score: 88, status: 'pass' },
            { area: 'Fire Prevention', score: 65, status: 'fail' },
            { area: 'Housekeeping', score: 95, status: 'pass' },
        ],
    };
}

// ============================================================================
// 4. MICRO-PROJECT OPTIMIZER (MPO)
// ============================================================================

export function getOptimizedSchedule() {
    return {
        date: 'Tuesday, Feb 25, 2026',
        crews: [
            {
                id: 'c1', name: 'Alpha Team', lead: 'Mike Torres', members: 4, fatigue: 'low',
                jobs: [
                    { time: '7:00 AM', job: 'Henderson Kitchen Reno', address: '1842 Oak St', duration: '3h', status: 'in-progress', travel: '12 min' },
                    { time: '10:30 AM', job: 'Riverside Apt #204 Bath', address: '500 River Dr', duration: '2.5h', status: 'next', travel: '18 min' },
                    { time: '1:30 PM', job: 'Metro Office Patch', address: '221 Main St', duration: '2h', status: 'scheduled', travel: '8 min' },
                ],
            },
            {
                id: 'c2', name: 'Bravo Team', lead: 'Sarah Chen', members: 3, fatigue: 'medium',
                jobs: [
                    { time: '7:30 AM', job: 'Springfield Deck Build', address: '95 Maple Ave', duration: '5h', status: 'in-progress', travel: '20 min' },
                    { time: '1:00 PM', job: 'Johnson Fence Install', address: '310 Pine Rd', duration: '3h', status: 'scheduled', travel: '15 min' },
                ],
            },
            {
                id: 'c3', name: 'Charlie Team', lead: 'Dave Kim', members: 5, fatigue: 'low',
                jobs: [
                    { time: '6:30 AM', job: 'Municipal Center Phase 1', address: '1 City Hall Plz', duration: '8h', status: 'in-progress', travel: '25 min' },
                ],
            },
        ],
        disruptions: [
            { type: 'weather', message: 'Rain expected 2-5 PM — outdoor work at risk', suggestion: 'Move Springfield Deck interior framing earlier' },
            { type: 'traffic', message: 'I-55 closure near River Dr exit', suggestion: 'Reroute Alpha Team via Rt 4 — saves 12 min' },
        ],
        metrics: {
            totalJobs: 6, completedToday: 2, onTime: '83%', avgTravelTime: '16 min',
            utilizationRate: '91%', fuelSaved: '$47',
        },
    };
}

// ============================================================================
// 5. CLIENT FEEDBACK FUSION (CFF)
// ============================================================================

export function getClientFeedbackData() {
    return {
        satisfactionTrend: [
            { month: 'Sep', score: 82 },
            { month: 'Oct', score: 85 },
            { month: 'Nov', score: 79 },
            { month: 'Dec', score: 88 },
            { month: 'Jan', score: 91 },
            { month: 'Feb', score: 87 },
        ],
        projectSentiment: [
            { project: 'Riverside Apts Phase 2', sentiment: 'positive', score: 92, reviews: 8, trend: 'up' },
            { project: 'Office Tower A', sentiment: 'neutral', score: 74, reviews: 5, trend: 'stable' },
            { project: 'Henderson Reno', sentiment: 'positive', score: 88, reviews: 3, trend: 'up' },
            { project: 'Municipal Center', sentiment: 'negative', score: 61, reviews: 12, trend: 'down' },
        ],
        disputes: [
            { id: 'd1', client: 'City of Springfield', project: 'Municipal Center', risk: 'high', probability: '72%', issue: 'Timeline delays triggering penalty clause', suggestedAction: 'Schedule client meeting, present revised timeline with recovery plan' },
            { id: 'd2', client: 'Metro Commercial', project: 'Office Tower A', risk: 'medium', probability: '35%', issue: 'Change order pricing disagreement', suggestedAction: 'Send detailed cost breakdown with market comparisons' },
        ],
        recentComms: [
            { id: 'cm1', client: 'Mrs. Henderson', channel: 'text', sentiment: 'positive', message: 'Kitchen looks amazing! Love the backsplash choice.', time: '1h ago', project: 'Henderson Reno' },
            { id: 'cm2', client: 'Springfield PM Office', channel: 'email', sentiment: 'negative', message: 'We need an updated timeline ASAP. Council is asking questions.', time: '3h ago', project: 'Municipal Center' },
            { id: 'cm3', client: 'Riverside HOA', channel: 'review', sentiment: 'positive', message: 'Professional crew, clean site. Very impressed with Phase 1.', time: '1d ago', project: 'Riverside Apts Phase 2' },
            { id: 'cm4', client: 'Metro Facilities Mgr', channel: 'email', sentiment: 'neutral', message: 'Can we discuss the HVAC spec change? Need clarity on cost impact.', time: '1d ago', project: 'Office Tower A' },
        ],
        upsells: [
            { client: 'Mrs. Henderson', suggestion: 'Bathroom renovation — mentioned interest during kitchen walkthrough', probability: '68%', estimatedValue: '$18,500' },
            { client: 'Riverside HOA', suggestion: 'Phase 3 landscaping — positive sentiment indicates readiness', probability: '55%', estimatedValue: '$92,000' },
        ],
    };
}

// ============================================================================
// 6. PREDICTIVE THEFT & UNAUTHORIZED USE SENTINEL (PTUS)
// ============================================================================

export function getTheftSentinelData() {
    return {
        vehicles: [
            { id: 'V-01', name: 'F-250 #01', type: 'Pickup', driver: 'Mike T.', status: 'on-site', location: 'Henderson Reno', riskScore: 12, lastPing: '2m ago', engineLock: false },
            { id: 'V-02', name: 'Transit Van #02', type: 'Van', driver: 'Sarah C.', status: 'in-transit', location: 'I-55 Southbound', riskScore: 8, lastPing: '1m ago', engineLock: false },
            { id: 'V-03', name: 'F-350 #03', type: 'Pickup', driver: 'Dave K.', status: 'on-site', location: 'Municipal Center', riskScore: 5, lastPing: '3m ago', engineLock: false },
            { id: 'V-04', name: 'Excavator #04', type: 'Equipment', driver: 'Unassigned', status: 'yard', location: 'Main Yard', riskScore: 22, lastPing: '15m ago', engineLock: true },
            { id: 'V-05', name: 'Skid Steer #05', type: 'Equipment', driver: 'Unassigned', status: 'yard', location: 'Main Yard', riskScore: 18, lastPing: '8m ago', engineLock: true },
            { id: 'V-06', name: 'F-150 #06', type: 'Pickup', driver: 'Off Duty', status: 'parked', location: 'Employee Lot', riskScore: 45, lastPing: '4h ago', engineLock: false },
        ],
        anomalies: [
            { id: 'a1', vehicle: 'F-150 #06', type: 'after-hours', time: '11:42 PM', message: 'Movement detected outside work hours (11:42 PM)', severity: 'high', resolved: false },
            { id: 'a2', vehicle: 'Excavator #04', type: 'geofence', time: '6:15 AM', message: 'Approached yard perimeter fence — stayed 4 min then returned', severity: 'medium', resolved: true },
            { id: 'a3', vehicle: 'Transit Van #02', type: 'detour', time: '9:30 AM', message: 'Unexpected 2.3 mi detour from optimal route', severity: 'low', resolved: false },
        ],
        geofences: [
            { name: 'Main Yard', type: 'base', vehicleCount: 2, status: 'secure' },
            { name: 'Henderson Site', type: 'jobsite', vehicleCount: 1, status: 'secure' },
            { name: 'Municipal Center', type: 'jobsite', vehicleCount: 1, status: 'secure' },
            { name: 'Riverside Apts', type: 'jobsite', vehicleCount: 0, status: 'empty' },
        ],
        stats: {
            totalVehicles: 6, activeToday: 3, anomaliesToday: 3, theftsPrevented: 2,
            avgRiskScore: 18, costSaved: '$12,400',
        },
    };
}

// ============================================================================
// 7. SITE ARRIVAL & UTILIZATION OPTIMIZER (SAUO)
// ============================================================================

export function getSiteUtilizationData() {
    return {
        vehicles: [
            { id: 'V-01', name: 'F-250 #01', site: 'Henderson Reno', arrival: '7:12 AM', onSite: '5h 48m', idle: '22m', utilization: 94, billableHours: 5.4, fuelWaste: '$3.20' },
            { id: 'V-02', name: 'Transit Van #02', site: 'In Transit → Riverside', arrival: null, onSite: '0h', idle: '45m', utilization: 62, billableHours: 2.1, fuelWaste: '$8.70' },
            { id: 'V-03', name: 'F-350 #03', site: 'Municipal Center', arrival: '6:42 AM', onSite: '6h 18m', idle: '8m', utilization: 98, billableHours: 6.2, fuelWaste: '$1.10' },
            { id: 'V-04', name: 'Excavator #04', site: 'Main Yard (Standby)', arrival: null, onSite: '0h', idle: '8h', utilization: 0, billableHours: 0, fuelWaste: '$0' },
            { id: 'V-05', name: 'Skid Steer #05', site: 'Main Yard (Standby)', arrival: null, onSite: '0h', idle: '8h', utilization: 0, billableHours: 0, fuelWaste: '$0' },
            { id: 'V-06', name: 'F-150 #06', site: 'Off Duty', arrival: null, onSite: '0h', idle: '0h', utilization: 0, billableHours: 0, fuelWaste: '$0' },
        ],
        reassignments: [
            { vehicle: 'Transit Van #02', from: 'Riverside Apts', to: 'Henderson Reno', reason: 'Closer proximity — save 22 min travel', savings: '$14' },
            { vehicle: 'Excavator #04', from: 'Yard Standby', to: 'Municipal Center', reason: 'Foundation work starting tomorrow — pre-position', savings: '$85' },
        ],
        dailyReport: {
            date: 'Feb 25, 2026',
            totalBillableHours: 13.7,
            totalIdleTime: '9h 23m',
            avgUtilization: '42%',
            fuelWasted: '$13.00',
            productivityRecovered: '18%',
        },
        siteActivity: [
            { site: 'Henderson Reno', arrivals: 1, departures: 0, peakVehicles: 1, firstArrival: '7:12 AM', lastDeparture: null },
            { site: 'Municipal Center', arrivals: 1, departures: 0, peakVehicles: 1, firstArrival: '6:42 AM', lastDeparture: null },
            { site: 'Riverside Apts', arrivals: 0, departures: 0, peakVehicles: 0, firstArrival: null, lastDeparture: null },
        ],
    };
}
