// Blueprint AI Services — Simulated AI analysis engine for demo/testing
// This provides realistic mock data and timed analysis flows

// ============================================================================
// FILE TYPE DETECTION
// ============================================================================

const SUPPORTED_FORMATS = {
    pdf: { label: 'PDF Document', icon: 'file-text', category: 'document' },
    dwg: { label: 'AutoCAD Drawing', icon: 'pen-tool', category: 'cad' },
    dxf: { label: 'Drawing Exchange', icon: 'pen-tool', category: 'cad' },
    png: { label: 'PNG Image', icon: 'image', category: 'image' },
    jpg: { label: 'JPEG Image', icon: 'image', category: 'image' },
    jpeg: { label: 'JPEG Image', icon: 'image', category: 'image' },
    tiff: { label: 'TIFF Image', icon: 'image', category: 'image' },
    tif: { label: 'TIFF Image', icon: 'image', category: 'image' },
    ifc: { label: 'IFC BIM Model', icon: 'box', category: 'bim' },
    rvt: { label: 'Revit Model', icon: 'box', category: 'bim' },
    skp: { label: 'SketchUp Model', icon: 'box', category: 'bim' },
    svg: { label: 'SVG Vector', icon: 'image', category: 'image' },
};

export function detectFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    return SUPPORTED_FORMATS[ext] || { label: 'Unknown', icon: 'file', category: 'unknown' };
}

export function getSupportedFormats() {
    return Object.keys(SUPPORTED_FORMATS);
}

// ============================================================================
// ANALYSIS PHASES
// ============================================================================

export function getAnalysisPhases() {
    return [
        { id: 'scan', label: 'Scanning Document', desc: 'Reading file structure and metadata', duration: 1200, icon: 'scan' },
        { id: 'ocr', label: 'OCR Text Extraction', desc: 'Extracting text, labels, and dimensions', duration: 1800, icon: 'type' },
        { id: 'detect', label: 'Element Detection', desc: 'AI identifying walls, doors, windows, fixtures', duration: 2500, icon: 'search' },
        { id: 'layers', label: 'Layer Separation', desc: 'Separating structural, MEP, electrical layers', duration: 1500, icon: 'layers' },
        { id: 'compliance', label: 'Compliance Analysis', desc: 'Checking IBC, ADA, NFPA, OSHA codes', duration: 2000, icon: 'shield-check' },
        { id: 'takeoff', label: 'Material Takeoff', desc: 'Calculating quantities and cost estimates', duration: 1800, icon: 'calculator' },
        { id: 'risk', label: 'Risk Assessment', desc: 'Identifying potential issues and hazards', duration: 1400, icon: 'alert-triangle' },
        { id: 'report', label: 'Report Generation', desc: 'Compiling comprehensive analysis report', duration: 1000, icon: 'file-text' },
    ];
}

// ============================================================================
// SIMULATED ANALYSIS
// ============================================================================

export function simulateAnalysis(file, onPhaseChange, onProgress, onElementFound) {
    const phases = getAnalysisPhases();
    let currentPhase = 0;
    let totalElements = 0;

    return new Promise((resolve) => {
        function runPhase() {
            if (currentPhase >= phases.length) {
                resolve(getFullAnalysisResult(file));
                return;
            }

            const phase = phases[currentPhase];
            onPhaseChange(phase, currentPhase, phases.length);

            // Simulate progress within phase
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress > 100) progress = 100;
                onProgress(progress, currentPhase);

                // Randomly "find" elements during detection phase
                if (phase.id === 'detect' && Math.random() > 0.4) {
                    totalElements += Math.floor(Math.random() * 3) + 1;
                    onElementFound(totalElements);
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    currentPhase++;
                    setTimeout(runPhase, 300);
                }
            }, phase.duration / 8);
        }

        runPhase();
    });
}

// ============================================================================
// FULL ANALYSIS RESULT
// ============================================================================

export function getFullAnalysisResult(file) {
    return {
        fileInfo: {
            name: file?.name || 'Riverside_Apartments_Floor1.pdf',
            size: file?.size || 2457600,
            format: file ? detectFileType(file.name).label : 'PDF Document',
            dimensions: '36" × 24" (ARCH D)',
            scale: '1/4" = 1\'-0"',
            sheets: 3,
            uploadedAt: new Date().toISOString(),
        },
        summary: {
            totalElements: 287,
            complianceScore: 82,
            estimatedCost: 172400,
            issuesFound: 7,
            roomsDetected: 14,
            layersExtracted: 6,
            analysisTime: '13.2s',
            confidence: 96.4,
        },
        detectedElements: [
            { id: 'e1', type: 'Exterior Walls', count: 12, confidence: 99.4, color: '#3b82f6', layer: 'structural', icon: 'grid-3x3', visible: true },
            { id: 'e2', type: 'Interior Walls', count: 35, confidence: 98.8, color: '#6366f1', layer: 'structural', icon: 'grid-3x3', visible: true },
            { id: 'e3', type: 'Doors', count: 23, confidence: 98.2, color: '#22c55e', layer: 'structural', icon: 'door-open', visible: true },
            { id: 'e4', type: 'Windows', count: 31, confidence: 97.5, color: '#06b6d4', layer: 'structural', icon: 'square', visible: true },
            { id: 'e5', type: 'Stairs', count: 4, confidence: 99.1, color: '#f59e0b', layer: 'structural', icon: 'trending-up', visible: true },
            { id: 'e6', type: 'Plumbing Fixtures', count: 18, confidence: 96.3, color: '#0ea5e9', layer: 'mep', icon: 'droplets', visible: true },
            { id: 'e7', type: 'Electrical Outlets', count: 84, confidence: 94.1, color: '#eab308', layer: 'electrical', icon: 'zap', visible: true },
            { id: 'e8', type: 'Light Fixtures', count: 42, confidence: 95.7, color: '#fbbf24', layer: 'electrical', icon: 'lightbulb', visible: true },
            { id: 'e9', type: 'HVAC Ducts', count: 12, confidence: 93.8, color: '#ef4444', layer: 'hvac', icon: 'wind', visible: true },
            { id: 'e10', type: 'HVAC Vents', count: 16, confidence: 92.4, color: '#f87171', layer: 'hvac', icon: 'fan', visible: true },
            { id: 'e11', type: 'Fire Sprinklers', count: 28, confidence: 97.2, color: '#dc2626', layer: 'fire', icon: 'flame', visible: true },
            { id: 'e12', type: 'Smoke Detectors', count: 14, confidence: 96.8, color: '#b91c1c', layer: 'fire', icon: 'alert-circle', visible: true },
            { id: 'e13', type: 'Dimension Lines', count: 156, confidence: 99.6, color: '#a855f7', layer: 'dimensions', icon: 'ruler', visible: true },
            { id: 'e14', type: 'Text Labels', count: 89, confidence: 98.9, color: '#8b5cf6', layer: 'annotations', icon: 'type', visible: true },
        ],
        complianceChecks: [
            { id: 'c1', code: 'IBC 2021 §1005.1', title: 'Egress Width', desc: 'Minimum egress width of 0.2" per occupant', status: 'pass', severity: 'high', details: 'All corridors meet minimum 44" width requirement. Main corridor: 60" measured.' },
            { id: 'c2', code: 'ADA §4.13.5', title: 'Door Clearance', desc: 'Accessible door maneuvering clearance', status: 'pass', severity: 'high', details: 'All doors provide minimum 18" pull-side clearance. Verified at 23 door locations.' },
            { id: 'c3', code: 'IBC 2021 §1017.2', title: 'Exit Access Travel', desc: 'Maximum travel distance to exit', status: 'warning', severity: 'high', details: 'Unit 207 travel distance: 248ft. Maximum with sprinklers: 250ft. Within limits but close to threshold.' },
            { id: 'c4', code: 'NFPA 13 §8.5.2', title: 'Sprinkler Coverage', desc: 'Maximum area per sprinkler head', status: 'pass', severity: 'medium', details: 'Coverage area: 130 sq ft per head. Maximum allowed: 225 sq ft. Exceeds requirements.' },
            { id: 'c5', code: 'IBC 2021 §1207.4', title: 'Sound Transmission', desc: 'STC rating between dwelling units', status: 'fail', severity: 'medium', details: 'Wall assembly between Units 204-205 shows STC 45. Minimum required: STC 50. Needs upgraded assembly.' },
            { id: 'c6', code: 'ADA §4.3.3', title: 'Corridor Width', desc: 'Accessible route minimum width', status: 'pass', severity: 'high', details: 'All corridors provide minimum 36" clear width. Narrowest point: 42" at elevator lobby.' },
            { id: 'c7', code: 'IBC 2021 §1010.1.1', title: 'Door Swing Direction', desc: 'Doors in high-occupancy areas must swing in egress direction', status: 'warning', severity: 'medium', details: 'Community room door (occupancy 52) swings against egress. Consider reversing swing direction.' },
            { id: 'c8', code: 'NFPA 72 §17.7.3', title: 'Smoke Detector Spacing', desc: 'Maximum spacing for smoke detectors', status: 'pass', severity: 'high', details: 'All detectors within 30ft spacing. Average spacing: 24ft.' },
            { id: 'c9', code: 'IBC 2021 §1207.2', title: 'Ceiling Height', desc: 'Minimum ceiling height 7\'-6"', status: 'pass', severity: 'low', details: 'Ceiling height: 9\'-0" throughout. Exceeds minimum by 18".' },
            { id: 'c10', code: 'OSHA §1926.502', title: 'Guardrail Height', desc: 'Balcony guardrail minimum 42"', status: 'fail', severity: 'high', details: 'Balcony railings shown at 36" height. OSHA requires minimum 42". Critical safety issue.' },
        ],
        materialQuantities: [
            { id: 'm1', material: 'Concrete (Grade 30 / 4000 PSI)', qty: '342', unit: 'm³', unitCost: 132, total: 45144, category: 'structural' },
            { id: 'm2', material: 'Rebar (#4 Grade 60)', qty: '28.4', unit: 'tons', unitCost: 1113, total: 31609, category: 'structural' },
            { id: 'm3', material: 'Structural Steel (W-Shape)', qty: '18.2', unit: 'tons', unitCost: 2901, total: 52798, category: 'structural' },
            { id: 'm4', material: 'Drywall (5/8" Type X)', qty: '1,847', unit: 'm²', unitCost: 7.69, total: 14202, category: 'finishes' },
            { id: 'm5', material: 'Insulation (R-19 Fiberglass)', qty: '1,420', unit: 'm²', unitCost: 4.50, total: 6390, category: 'envelope' },
            { id: 'm6', material: 'Glass (Low-E Double Pane)', qty: '220', unit: 'm²', unitCost: 130, total: 28600, category: 'envelope' },
            { id: 'm7', material: 'Roofing Membrane (TPO)', qty: '580', unit: 'm²', unitCost: 18.50, total: 10730, category: 'envelope' },
            { id: 'm8', material: 'Copper Pipe (3/4")', qty: '240', unit: 'lf', unitCost: 8.75, total: 2100, category: 'mep' },
            { id: 'm9', material: 'PVC Drain Pipe (4")', qty: '380', unit: 'lf', unitCost: 6.20, total: 2356, category: 'mep' },
            { id: 'm10', material: 'Electrical Wire (12/2 NM)', qty: '4,200', unit: 'lf', unitCost: 0.85, total: 3570, category: 'electrical' },
            { id: 'm11', material: 'Fire Sprinkler Heads', qty: '28', unit: 'ea', unitCost: 45, total: 1260, category: 'fire' },
            { id: 'm12', material: 'HVAC Ductwork (Galv.)', qty: '320', unit: 'lf', unitCost: 22, total: 7040, category: 'hvac' },
        ],
        risks: [
            { id: 'r1', severity: 'critical', title: 'Guardrail Height Non-Compliance', location: 'All balconies (Units 201-212)', desc: 'Guardrails shown at 36" do not meet 42" OSHA minimum. Fall hazard.', fix: 'Redesign guardrail assemblies to 42" minimum height.', estimatedCost: '$8,400' },
            { id: 'r2', severity: 'high', title: 'Sound Transmission Deficiency', location: 'Wall between Units 204-205', desc: 'STC 45 rating does not meet IBC minimum STC 50 for dwelling unit separation.', fix: 'Upgrade to double-stud wall assembly with resilient channels.', estimatedCost: '$3,200' },
            { id: 'r3', severity: 'medium', title: 'Travel Distance Near Limit', location: 'Unit 207', desc: 'Exit travel distance 248ft approaches 250ft maximum with sprinklers.', fix: 'Consider adding secondary exit access or relocating unit entry.', estimatedCost: '$12,000' },
            { id: 'r4', severity: 'medium', title: 'Door Swing Direction', location: 'Community Room', desc: 'High-occupancy door swings against egress direction.', fix: 'Reverse door swing and add closer/coordinator.', estimatedCost: '$1,800' },
            { id: 'r5', severity: 'low', title: 'Electrical Panel Access', location: 'Corridor B, Floor 1', desc: 'Limited clearance in front of electrical panel (28" vs 30" required).', fix: 'Reconfigure storage to provide 30" clear working space.', estimatedCost: '$500' },
            { id: 'r6', severity: 'low', title: 'Missing ADA Signage Locations', location: 'Stairwell entries', desc: 'Tactile signage locations not shown on plans for stairwell doors.', fix: 'Add ADA-compliant tactile signs at all stairwell entries.', estimatedCost: '$600' },
            { id: 'r7', severity: 'info', title: 'Accessibility Enhancement Opportunity', location: 'Main lobby', desc: 'Lobby layout could benefit from wider turning radius for wheelchair access.', fix: 'Consider expanding lobby turning area from 60" to 72" diameter.', estimatedCost: '$2,200' },
        ],
        rooms: [
            { id: 'rm1', name: 'Living Room', floor: 1, area: '29.76 m² (320 sf)', dimensions: '6.2m × 4.8m', occupancy: 'Residential', ceilingHeight: '9\'-0"', egress: 2 },
            { id: 'rm2', name: 'Kitchen', floor: 1, area: '24.48 m² (263 sf)', dimensions: '5.1m × 4.8m', occupancy: 'Residential', ceilingHeight: '9\'-0"', egress: 1 },
            { id: 'rm3', name: 'Master Bedroom', floor: 1, area: '28.90 m² (311 sf)', dimensions: '8.5m × 3.4m', occupancy: 'Residential', ceilingHeight: '9\'-0"', egress: 2 },
            { id: 'rm4', name: 'Bathroom 1', floor: 1, area: '7.44 m² (80 sf)', dimensions: '3.1m × 2.4m', occupancy: 'Residential', ceilingHeight: '8\'-0"', egress: 1 },
            { id: 'rm5', name: 'Bedroom 2', floor: 1, area: '16.12 m² (173 sf)', dimensions: '4.6m × 3.5m', occupancy: 'Residential', ceilingHeight: '9\'-0"', egress: 1 },
            { id: 'rm6', name: 'Bathroom 2', floor: 1, area: '5.58 m² (60 sf)', dimensions: '2.7m × 2.1m', occupancy: 'Residential', ceilingHeight: '8\'-0"', egress: 1 },
            { id: 'rm7', name: 'Corridor', floor: 1, area: '18.60 m² (200 sf)', dimensions: '15.5m × 1.2m', occupancy: 'Common', ceilingHeight: '9\'-0"', egress: 3 },
            { id: 'rm8', name: 'Utility Room', floor: 1, area: '6.97 m² (75 sf)', dimensions: '3.2m × 2.18m', occupancy: 'Utility', ceilingHeight: '8\'-0"', egress: 1 },
            { id: 'rm9', name: 'Community Room', floor: 1, area: '46.45 m² (500 sf)', dimensions: '9.3m × 5.0m', occupancy: 'Assembly (52)', ceilingHeight: '10\'-0"', egress: 2 },
            { id: 'rm10', name: 'Lobby', floor: 1, area: '32.52 m² (350 sf)', dimensions: '7.8m × 4.17m', occupancy: 'Common', ceilingHeight: '12\'-0"', egress: 3 },
            { id: 'rm11', name: 'Elevator Lobby', floor: 1, area: '11.15 m² (120 sf)', dimensions: '4.3m × 2.6m', occupancy: 'Common', ceilingHeight: '9\'-0"', egress: 2 },
            { id: 'rm12', name: 'Stairwell A', floor: 1, area: '9.29 m² (100 sf)', dimensions: '3.5m × 2.65m', occupancy: 'Egress', ceilingHeight: '—', egress: 2 },
            { id: 'rm13', name: 'Stairwell B', floor: 1, area: '9.29 m² (100 sf)', dimensions: '3.5m × 2.65m', occupancy: 'Egress', ceilingHeight: '—', egress: 2 },
            { id: 'rm14', name: 'Mechanical Room', floor: 1, area: '18.58 m² (200 sf)', dimensions: '5.4m × 3.44m', occupancy: 'Utility', ceilingHeight: '10\'-0"', egress: 1 },
        ],
        layers: [
            { id: 'structural', label: 'Structural', color: '#3b82f6', visible: true, elementCount: 105 },
            { id: 'mep', label: 'Plumbing / MEP', color: '#0ea5e9', visible: true, elementCount: 18 },
            { id: 'electrical', label: 'Electrical', color: '#eab308', visible: true, elementCount: 126 },
            { id: 'hvac', label: 'HVAC', color: '#ef4444', visible: true, elementCount: 28 },
            { id: 'fire', label: 'Fire Protection', color: '#dc2626', visible: true, elementCount: 42 },
            { id: 'dimensions', label: 'Dimensions', color: '#a855f7', visible: true, elementCount: 156 },
            { id: 'annotations', label: 'Annotations', color: '#8b5cf6', visible: true, elementCount: 89 },
        ],
    };
}

// ============================================================================
// AI CHAT RESPONSES
// ============================================================================

const chatResponses = {
    'fire': {
        response: "I found **2 fire code issues** in this blueprint:\n\n1. **NFPA 13 §8.5.2** — Sprinkler coverage is compliant ✅ (130 sq ft/head vs 225 max)\n2. **Community Room Door** — Swings against egress direction in a space with 52-person occupancy. Recommend reversing swing per IBC §1010.1.1.\n\nThe 28 sprinkler heads and 14 smoke detectors are adequately spaced per NFPA 72.",
        references: ['c4', 'c7'],
    },
    'cost': {
        response: "Based on the material takeoff analysis:\n\n**Total Estimated Material Cost: $172,400**\n\nTop 3 cost drivers:\n1. Structural Steel (W-Shape) — **$52,798** (30.6%)\n2. Concrete (Grade 30) — **$45,144** (26.2%)\n3. Rebar (#4 Grade 60) — **$31,609** (18.3%)\n\nThis excludes labor, permits, and equipment rental. Typical total construction cost at 2.8x material = **~$482,700**.",
        references: ['m1', 'm2', 'm3'],
    },
    'rooms': {
        response: "I detected **14 rooms** on this floor plan:\n\n• 3 Bedrooms (Master + 2 secondary)\n• 2 Bathrooms\n• 1 Living Room (320 sf)\n• 1 Kitchen (263 sf)\n• 1 Community Room (500 sf, 52-person occupancy)\n• 1 Lobby (350 sf, 12' ceilings)\n• 2 Stairwells (A & B)\n• 1 Utility Room + 1 Mechanical Room\n• 1 Corridor + 1 Elevator Lobby\n\nTotal floor area: approximately **2,852 sq ft** of usable space.",
        references: [],
    },
    'ada': {
        response: "**ADA Compliance Summary:**\n\n✅ **Door Clearance** (§4.13.5) — All 23 doors provide minimum 18\" pull-side clearance\n✅ **Corridor Width** (§4.3.3) — All routes ≥ 36\" clear (narrowest: 42\")\n⚠️ **Stairwell Signage** — Tactile signs not shown at stairwell doors\n💡 **Enhancement** — Lobby turning radius could be expanded from 60\" to 72\" for improved wheelchair access\n\nOverall ADA compliance: **Good** with minor signage additions needed.",
        references: ['c2', 'c6', 'r6', 'r7'],
    },
    'default': {
        response: "I've analyzed this blueprint thoroughly. Here's what I can help with:\n\n• **Element counts** — 287 elements detected across 7 layers\n• **Compliance** — 82% score, 2 failures, 2 warnings\n• **Cost estimates** — $172,400 in materials\n• **Room details** — 14 rooms, ~2,852 sq ft\n• **Risk assessment** — 7 issues (1 critical, 1 high, 2 medium, 2 low, 1 info)\n\nAsk me about specific areas, codes, materials, or rooms for more detail.",
        references: [],
    },
};

export function getBlueprintChatResponse(question) {
    const q = question.toLowerCase();
    if (q.includes('fire') || q.includes('sprinkler') || q.includes('nfpa')) return chatResponses['fire'];
    if (q.includes('cost') || q.includes('price') || q.includes('estimate') || q.includes('budget') || q.includes('material')) return chatResponses['cost'];
    if (q.includes('room') || q.includes('space') || q.includes('area') || q.includes('floor')) return chatResponses['rooms'];
    if (q.includes('ada') || q.includes('access') || q.includes('handicap') || q.includes('wheelchair') || q.includes('disability')) return chatResponses['ada'];
    return chatResponses['default'];
}

// ============================================================================
// SAMPLE BLUEPRINTS FOR DEMO
// ============================================================================

export function getSampleBlueprints() {
    return [
        { id: 's1', name: 'Riverside Apartments — Floor 1', format: 'PDF', size: '2.4 MB', type: 'Residential', sheets: 3 },
        { id: 's2', name: 'Metro Office Tower — Level 12', format: 'DWG', size: '8.1 MB', type: 'Commercial', sheets: 1 },
        { id: 's3', name: 'Springfield Municipal Center', format: 'IFC', size: '45.2 MB', type: 'Institutional', sheets: 12 },
        { id: 's4', name: 'Henderson Kitchen Renovation', format: 'PDF', size: '1.1 MB', type: 'Residential Reno', sheets: 2 },
    ];
}
