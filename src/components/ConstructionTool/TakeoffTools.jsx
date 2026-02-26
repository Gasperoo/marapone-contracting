import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Calculator, Download, Plus, Search, Package, Layers,
    DollarSign, BarChart3, FileText, ChevronDown, ChevronRight, Sparkles
} from 'lucide-react';
import '../../styles/ConstructionTool.css';

const categories = [
    {
        name: 'Structural', color: '#3b82f6', expanded: true,
        items: [
            { desc: 'Concrete Foundation (300mm slab)', qty: '185', unit: 'm³', rate: '$132.00', total: '$24,420' },
            { desc: 'Rebar (Grade 60, #5)', qty: '12,400', unit: 'kg', rate: '$1.85', total: '$22,940' },
            { desc: 'Structural Steel (W-beams)', qty: '45', unit: 'tons', rate: '$2,800', total: '$126,000' },
            { desc: 'CMU Block Wall (200mm)', qty: '2,800', unit: 'm²', rate: '$65.00', total: '$182,000' },
        ]
    },
    {
        name: 'Electrical', color: '#f59e0b', expanded: false,
        items: [
            { desc: 'Main Service Panel (400A)', qty: '2', unit: 'ea', rate: '$8,500', total: '$17,000' },
            { desc: 'Branch Circuit Wiring (12 AWG)', qty: '4,200', unit: 'm', rate: '$8.50', total: '$35,700' },
            { desc: 'LED Light Fixtures (Recessed)', qty: '240', unit: 'ea', rate: '$185.00', total: '$44,400' },
            { desc: 'Electrical Outlets (Duplex)', qty: '180', unit: 'ea', rate: '$45.00', total: '$8,100' },
        ]
    },
    {
        name: 'Plumbing', color: '#06b6d4', expanded: false,
        items: [
            { desc: 'Copper Pipe (3/4" Supply)', qty: '850', unit: 'm', rate: '$32.00', total: '$27,200' },
            { desc: 'PVC Drain (4" DWV)', qty: '620', unit: 'm', rate: '$18.00', total: '$11,160' },
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
    const [expandedCats, setExpandedCats] = useState({ 'Structural': true });

    const toggleCategory = (name) => {
        setExpandedCats(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const grandTotal = categories.reduce((acc, cat) =>
        acc + cat.items.reduce((s, item) => s + parseInt(item.total.replace(/[$,]/g, '')), 0), 0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <Calculator className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Takeoff Tools
                    </h2>
                    <p className="ct-page-subtitle">AI-extracted quantities & BOQ generation</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="ct-action-btn">
                        <Download size={14} /> Export BOQ
                    </button>
                    <button className="ct-action-btn-primary ct-action-btn">
                        <Plus size={14} /> New Takeoff
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Items', value: categories.reduce((a, c) => a + c.items.length, 0), color: '#FF6B00' },
                    { label: 'Categories', value: categories.length, color: '#3b82f6' },
                    { label: 'Grand Total', value: '$' + grandTotal.toLocaleString(), color: '#22c55e' },
                    { label: 'AI Confidence', value: '97.2%', color: '#a855f7' },
                ].map((stat, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': stat.color }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                        <div className="ct-kpi-label">{stat.label}</div>
                        <div className="ct-kpi-value" style={{ color: stat.color }}>{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Categories */}
            <div className="space-y-3">
                {categories.map((cat, catIdx) => {
                    const isExpanded = expandedCats[cat.name];
                    const catTotal = cat.items.reduce((s, item) => s + parseInt(item.total.replace(/[$,]/g, '')), 0);
                    return (
                        <motion.div
                            key={cat.name}
                            className="ct-card"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + catIdx * 0.08 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {/* Category accent strip */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                background: cat.color
                            }} />

                            {/* Category Header */}
                            <div
                                onClick={() => toggleCategory(cat.name)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '16px 20px', cursor: 'pointer'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                        width: 8, height: 8, borderRadius: 4,
                                        background: cat.color,
                                        boxShadow: `0 0 8px ${cat.color}80`,
                                    }} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{cat.name}</span>
                                    <span style={{
                                        fontSize: '0.6rem', fontWeight: 700,
                                        padding: '2px 8px', borderRadius: 100,
                                        background: `${cat.color}15`, color: cat.color,
                                        border: `1px solid ${cat.color}25`,
                                    }}>
                                        {cat.items.length} items
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                                        ${catTotal.toLocaleString()}
                                    </span>
                                    {isExpanded ? <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.3)' }} /> :
                                        <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />}
                                </div>
                            </div>

                            {/* Table */}
                            {isExpanded && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                                    <table className="ct-table">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th style={{ textAlign: 'right' }}>Quantity</th>
                                                <th style={{ textAlign: 'right' }}>Unit</th>
                                                <th style={{ textAlign: 'right' }}>Rate</th>
                                                <th style={{ textAlign: 'right' }}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cat.items.map((item, idx) => (
                                                <motion.tr key={idx}
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.04 }}>
                                                    <td>{item.desc}</td>
                                                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{item.qty}</td>
                                                    <td style={{ textAlign: 'right', color: 'rgba(255,255,255,0.4)' }}>{item.unit}</td>
                                                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{item.rate}</td>
                                                    <td style={{ textAlign: 'right', fontWeight: 700, color: cat.color }}>{item.total}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Grand Total */}
            <div className="ct-card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
                        Grand Total Estimated Cost
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                        AI confidence: 97.2% · Based on local market rates
                    </div>
                </div>
                <div className="ct-gradient-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                    ${grandTotal.toLocaleString()}
                </div>
            </div>
        </div>
    );
}
