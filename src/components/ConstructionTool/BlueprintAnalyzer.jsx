import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    FileSearch, Upload, Layers, Grid3X3, CheckCircle, AlertTriangle,
    ZoomIn, ZoomOut, RotateCw, Move, Eye, Download, Cpu, Box,
    DoorOpen, Pipette, Ruler, Thermometer
} from 'lucide-react';

const detectedElements = [
    { type: 'Walls', count: 47, icon: Grid3X3, color: '#3b82f6', accuracy: '99.2%' },
    { type: 'Doors', count: 23, icon: DoorOpen, color: '#22c55e', accuracy: '98.7%' },
    { type: 'Windows', count: 31, icon: Box, color: '#a855f7', accuracy: '97.9%' },
    { type: 'Plumbing', count: 18, icon: Pipette, color: '#06b6d4', accuracy: '96.4%' },
    { type: 'HVAC Ducts', count: 12, icon: Thermometer, color: '#ef4444', accuracy: '95.8%' },
    { type: 'Dimensions', count: 156, icon: Ruler, color: '#f59e0b', accuracy: '99.5%' },
];

const complianceChecks = [
    { code: 'IBC 2021 §1005.1', desc: 'Egress width requirements', status: 'pass' },
    { code: 'ADA §4.13', desc: 'Accessible door clearance', status: 'pass' },
    { code: 'IBC 2021 §1015.1', desc: 'Exit access travel distance', status: 'warning' },
    { code: 'NFPA 13', desc: 'Sprinkler system coverage', status: 'pass' },
    { code: 'IBC 2021 §1207.4', desc: 'Sound transmission class', status: 'fail' },
];

const materialQuantities = [
    { material: 'Concrete (Grade 30)', qty: '342 m³', unit: 'Cubic Meters', cost: '$45,200' },
    { material: 'Rebar (Grade 60)', qty: '28.4 tons', unit: 'Metric Tons', cost: '$31,600' },
    { material: 'Drywall (12.5mm)', qty: '1,847 m²', unit: 'Square Meters', cost: '$14,200' },
    { material: 'Structural Steel (W-Shape)', qty: '18.2 tons', unit: 'Metric Tons', cost: '$52,800' },
    { material: 'Glass (Double Pane)', qty: '220 m²', unit: 'Square Meters', cost: '$28,600' },
];

export function BlueprintAnalyzer() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analyzed, setAnalyzed] = useState(true);
    const [activeLayer, setActiveLayer] = useState('all');

    const layers = ['all', 'structural', 'mep', 'dimensions', 'annotations'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileSearch className="text-[#3b82f6]" size={24} />
                        Blueprint Analyzer
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">AI-powered plan reading, annotation, and compliance checking</p>
                </div>
                <button className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e55f00] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
                    <Upload size={16} />
                    Upload Blueprint
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Blueprint Viewer */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-1">
                            {layers.map(layer => (
                                <button
                                    key={layer}
                                    onClick={() => setActiveLayer(layer)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${activeLayer === layer ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {layer}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><ZoomIn size={16} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><ZoomOut size={16} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><RotateCw size={16} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Move size={16} /></button>
                        </div>
                    </div>

                    {/* Blueprint Canvas */}
                    <div className="relative h-[500px] bg-[#0a0e14] flex items-center justify-center overflow-hidden">
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }} />

                        {/* Simplified Blueprint Visualization */}
                        <svg viewBox="0 0 400 300" className="w-[85%] h-[85%] relative z-10">
                            {/* Outer walls */}
                            <rect x="30" y="30" width="340" height="240" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
                            {/* Interior walls */}
                            <line x1="180" y1="30" x2="180" y2="170" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                            <line x1="30" y1="170" x2="280" y2="170" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                            <line x1="280" y1="170" x2="280" y2="270" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                            {/* Rooms */}
                            <text x="100" y="105" fill="#3b82f680" fontSize="10" textAnchor="middle">LIVING ROOM</text>
                            <text x="100" y="115" fill="#3b82f640" fontSize="7" textAnchor="middle">6.2m × 4.8m</text>
                            <text x="280" y="105" fill="#3b82f680" fontSize="10" textAnchor="middle">KITCHEN</text>
                            <text x="280" y="115" fill="#3b82f640" fontSize="7" textAnchor="middle">5.1m × 4.8m</text>
                            <text x="150" y="225" fill="#3b82f680" fontSize="10" textAnchor="middle">MASTER BEDROOM</text>
                            <text x="150" y="235" fill="#3b82f640" fontSize="7" textAnchor="middle">8.5m × 3.4m</text>
                            <text x="340" y="225" fill="#3b82f680" fontSize="8" textAnchor="middle">BATH</text>
                            {/* Doors */}
                            <path d="M 165 170 A 15 15 0 0 1 180 155" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.7" />
                            <path d="M 180 45 A 15 15 0 0 1 195 30" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.7" />
                            {/* Dimension lines */}
                            <line x1="30" y1="15" x2="370" y2="15" stroke="#f59e0b" strokeWidth="0.5" opacity="0.5" strokeDasharray="3,3" />
                            <text x="200" y="12" fill="#f59e0b80" fontSize="7" textAnchor="middle">14.2m</text>
                            {/* AI Annotations */}
                            <circle cx="165" cy="170" r="12" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8">
                                <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="100" cy="170" r="5" fill="#ef4444" opacity="0.3">
                                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                        </svg>

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1.5">
                            <Cpu size={12} />
                            AI Analysis Complete
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs">
                            Scale: 1:100 | Floor 1 of 3
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-4">
                    {/* Detected Elements */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Eye size={16} className="text-[#FF6B00]" />
                            Detected Elements
                        </h3>
                        <div className="space-y-3">
                            {detectedElements.map((el, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <el.icon size={14} style={{ color: el.color }} />
                                        <span className="text-sm text-slate-300">{el.type}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-mono text-white">{el.count}</span>
                                        <span className="text-xs text-green-400">{el.accuracy}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Code Compliance */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            Code Compliance
                        </h3>
                        <div className="space-y-2">
                            {complianceChecks.map((check, idx) => (
                                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg text-xs">
                                    {check.status === 'pass' && <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />}
                                    {check.status === 'warning' && <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />}
                                    {check.status === 'fail' && <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />}
                                    <div>
                                        <div className="text-slate-300 font-mono">{check.code}</div>
                                        <div className="text-slate-500">{check.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Material Quantities */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <Layers size={16} className="text-[#FF6B00]" />
                        Extracted Material Quantities
                    </h3>
                    <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all">
                        <Download size={12} />
                        Export CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Material</th>
                                <th className="text-right py-3 px-4 text-slate-400 font-medium">Quantity</th>
                                <th className="text-right py-3 px-4 text-slate-400 font-medium">Unit</th>
                                <th className="text-right py-3 px-4 text-slate-400 font-medium">Est. Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materialQuantities.map((mat, idx) => (
                                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-white">{mat.material}</td>
                                    <td className="py-3 px-4 text-right font-mono text-slate-300">{mat.qty}</td>
                                    <td className="py-3 px-4 text-right text-slate-500">{mat.unit}</td>
                                    <td className="py-3 px-4 text-right font-mono text-[#FF6B00]">{mat.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
