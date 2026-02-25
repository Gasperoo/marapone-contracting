import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Calculator, Download, Plus, Search, Package, Layers,
    DollarSign, BarChart3, FileText, ChevronDown, ChevronRight
} from 'lucide-react';

const categories = [
    {
        name: 'Structural', color: '#3b82f6', expanded: true,
        items: [
            { desc: 'Concrete Foundation (300mm slab)', qty: '185', unit: 'm³', rate: '$132.00', total: '$24,420' },
            { desc: 'Rebar Mesh (SL82)', qty: '1,200', unit: 'm²', rate: '$8.50', total: '$10,200' },
            { desc: 'Steel Columns (W250×73)', qty: '24', unit: 'ea', rate: '$2,450', total: '$58,800' },
            { desc: 'Precast Concrete Panels', qty: '86', unit: 'ea', rate: '$1,800', total: '$154,800' },
        ]
    },
    {
        name: 'Electrical', color: '#f59e0b', expanded: false,
        items: [
            { desc: 'Main Distribution Board', qty: '2', unit: 'ea', rate: '$12,500', total: '$25,000' },
            { desc: 'Cable Tray (300mm)', qty: '420', unit: 'm', rate: '$45.00', total: '$18,900' },
            { desc: 'LED Panel Lights (600×600)', qty: '180', unit: 'ea', rate: '$85.00', total: '$15,300' },
        ]
    },
    {
        name: 'Plumbing', color: '#06b6d4', expanded: false,
        items: [
            { desc: 'PVC Pipe (100mm)', qty: '340', unit: 'm', rate: '$22.00', total: '$7,480' },
            { desc: 'Water Heater (200L)', qty: '4', unit: 'ea', rate: '$3,200', total: '$12,800' },
            { desc: 'Bathroom Fixtures Set', qty: '12', unit: 'set', rate: '$2,800', total: '$33,600' },
        ]
    },
    {
        name: 'Finishes', color: '#a855f7', expanded: false,
        items: [
            { desc: 'Porcelain Floor Tiles (600×600)', qty: '2,100', unit: 'm²', rate: '$48.00', total: '$100,800' },
            { desc: 'Interior Paint (Dulux)', qty: '3,400', unit: 'm²', rate: '$12.00', total: '$40,800' },
            { desc: 'Suspended Ceiling Grid', qty: '1,850', unit: 'm²', rate: '$35.00', total: '$64,750' },
        ]
    },
];

export function TakeoffTools() {
    const [expandedCats, setExpandedCats] = useState({ Structural: true });
    const [searchTerm, setSearchTerm] = useState('');

    const toggleCategory = (name) => {
        setExpandedCats(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const grandTotal = '$567,650';
    const itemCount = categories.reduce((acc, cat) => acc + cat.items.length, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calculator className="text-[#22c55e]" size={24} />
                        Takeoff Tools
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">AI-assisted quantity takeoff & BOQ generation</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all">
                        <Download size={14} />
                        Export Excel
                    </button>
                    <button className="px-3 py-2 bg-[#FF6B00] hover:bg-[#e55f00] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
                        <Plus size={14} />
                        Add Item
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Items</div>
                    <div className="text-2xl font-bold text-white">{itemCount}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Categories</div>
                    <div className="text-2xl font-bold text-white">{categories.length}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Grand Total</div>
                    <div className="text-2xl font-bold text-[#FF6B00]">{grandTotal}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">AI Confidence</div>
                    <div className="text-2xl font-bold text-green-400">96.7%</div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                    type="text"
                    placeholder="Search items, materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
                />
            </div>

            {/* BOQ Table */}
            <div className="space-y-3">
                {categories.map((cat, catIdx) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIdx * 0.08 }}
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                    >
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(cat.name)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                                <span className="text-white font-semibold">{cat.name}</span>
                                <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{cat.items.length} items</span>
                            </div>
                            {expandedCats[cat.name] ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                        </button>

                        {/* Items */}
                        {expandedCats[cat.name] && (
                            <div className="border-t border-white/5">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-slate-500 text-xs uppercase tracking-wider">
                                            <th className="text-left py-2 px-4 font-medium">Description</th>
                                            <th className="text-right py-2 px-4 font-medium">Qty</th>
                                            <th className="text-right py-2 px-4 font-medium">Unit</th>
                                            <th className="text-right py-2 px-4 font-medium">Rate</th>
                                            <th className="text-right py-2 px-4 font-medium">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cat.items.map((item, idx) => (
                                            <tr key={idx} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-3 px-4 text-slate-300">{item.desc}</td>
                                                <td className="py-3 px-4 text-right font-mono text-white">{item.qty}</td>
                                                <td className="py-3 px-4 text-right text-slate-500">{item.unit}</td>
                                                <td className="py-3 px-4 text-right font-mono text-slate-400">{item.rate}</td>
                                                <td className="py-3 px-4 text-right font-mono text-[#FF6B00] font-medium">{item.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
