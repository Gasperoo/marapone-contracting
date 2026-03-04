import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Calculator, Download, Plus, Search, Package, Layers,
    DollarSign, BarChart3, FileText, ChevronDown, ChevronRight, Sparkles,
    Edit2, Trash2, X, Save, Upload
} from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

const CATEGORIES = ['Structural', 'MEP', 'Finishes', 'Plumbing', 'Site Work', 'Other'];

export function TakeoffTools() {
    const [items, setItems] = useState([]);
    const [expandedCats, setExpandedCats] = useState({ Structural: true, MEP: true, Finishes: true });
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});
    const [searchText, setSearchText] = useState('');

    useEffect(() => { refresh(); }, []);

    const refresh = () => {
        if (!DataStore.isSeeded()) DataStore.seed();
        setItems(DataStore.getAll('takeoffItems'));
    };

    const toggleCategory = (name) => {
        setExpandedCats(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleAdd = (category = 'Structural') => {
        setEditItem(null);
        setForm({ category, desc: '', qty: '', unit: 'ea', rate: '' });
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setForm({ ...item, qty: String(item.qty), rate: String(item.rate) });
        setShowModal(true);
    };

    const handleSave = () => {
        const qty = parseFloat(form.qty) || 0;
        const rate = parseFloat(form.rate) || 0;
        const payload = { ...form, qty, rate, total: qty * rate };
        if (editItem) {
            DataStore.update('takeoffItems', editItem.id, payload);
        } else {
            DataStore.create('takeoffItems', payload);
        }
        setShowModal(false);
        refresh();
    };

    const handleDelete = (id) => {
        DataStore.delete('takeoffItems', id);
        refresh();
    };

    const handleExportCSV = () => {
        const header = 'Category,Description,Qty,Unit,Rate,Total\n';
        const rows = items.map(i => `"${i.category}","${i.desc}",${i.qty},${i.unit},${i.rate},${i.total}`).join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'takeoff_export.csv'; a.click();
        URL.revokeObjectURL(url);
    };

    // Group by category
    const grouped = {};
    CATEGORIES.forEach(c => { grouped[c] = []; });
    items.forEach(item => {
        const cat = CATEGORIES.includes(item.category) ? item.category : 'Other';
        grouped[cat].push(item);
    });

    const filtered = searchText
        ? items.filter(i => i.desc?.toLowerCase().includes(searchText.toLowerCase()) || i.category?.toLowerCase().includes(searchText.toLowerCase()))
        : null;

    const grandTotal = items.reduce((s, i) => s + (i.total || 0), 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <Calculator className="icon-glow" style={{ color: '#22c55e' }} size={24} />
                        Takeoff Tools
                    </h2>
                    <p className="ct-page-subtitle">Quantity extraction, BOQ generation & cost estimation</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => handleAdd()} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                        <Plus size={14} /> Add Item
                    </button>
                    <button onClick={handleExportCSV} className="ct-btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                        <Download size={14} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Summary Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total Items', value: String(items.length), color: '#3b82f6' },
                    { label: 'Categories', value: String(Object.values(grouped).filter(g => g.length > 0).length), color: '#a855f7' },
                    { label: 'Grand Total', value: `$${grandTotal.toLocaleString()}`, color: '#22c55e' },
                    { label: 'Avg Item Cost', value: items.length ? `$${Math.round(grandTotal / items.length).toLocaleString()}` : '$0', color: '#f59e0b' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input type="text" placeholder="Search items..." value={searchText} onChange={e => setSearchText(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }} />
            </div>

            {/* Category Accordion */}
            {filtered ? (
                <div className="ct-card" style={{ padding: 16 }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 12 }}>Search Results ({filtered.length})</h3>
                    {filtered.map(item => <ItemRow key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />)}
                    {filtered.length === 0 && <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>No items match your search.</p>}
                </div>
            ) : (
                CATEGORIES.map(cat => {
                    const catItems = grouped[cat];
                    if (catItems.length === 0) return null;
                    const catTotal = catItems.reduce((s, i) => s + (i.total || 0), 0);
                    const isExpanded = expandedCats[cat];

                    return (
                        <motion.div key={cat} className="ct-card" style={{ overflow: 'hidden' }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div onClick={() => toggleCategory(cat)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
                                <div className="flex items-center gap-3">
                                    {isExpanded ? <ChevronDown size={16} style={{ color: '#6b7280' }} /> : <ChevronRight size={16} style={{ color: '#6b7280' }} />}
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a' }}>{cat}</span>
                                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{catItems.length} items</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#22c55e' }}>${catTotal.toLocaleString()}</span>
                                    <button onClick={(e) => { e.stopPropagation(); handleAdd(cat); }}
                                        style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 6, padding: '3px 8px', fontSize: '0.65rem', fontWeight: 600, color: '#22c55e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                                        <Plus size={11} /> Add
                                    </button>
                                </div>
                            </div>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                        <div style={{ padding: '0 16px 16px' }}>
                                            <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                                                        <th style={thStyle}>Description</th>
                                                        <th style={{ ...thStyle, textAlign: 'right' }}>Qty</th>
                                                        <th style={{ ...thStyle, textAlign: 'center' }}>Unit</th>
                                                        <th style={{ ...thStyle, textAlign: 'right' }}>Rate</th>
                                                        <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
                                                        <th style={{ ...thStyle, textAlign: 'center', width: 70 }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {catItems.map(item => <ItemRow key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })
            )}

            {/* Grand Total Footer */}
            <div className="ct-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a' }}>Grand Total</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#22c55e' }}>${grandTotal.toLocaleString()}</span>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
                        onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            style={{ background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                            onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5">
                                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Add'} Takeoff Item</h3>
                                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label style={labelStyle}>Category</label>
                                    <select value={form.category || 'Structural'} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Description</label>
                                    <input value={form.desc || ''} onChange={e => setForm({ ...form, desc: e.target.value })} style={inputStyle} placeholder="e.g. Concrete Foundation (300mm slab)" />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label style={labelStyle}>Quantity</label>
                                        <input type="number" value={form.qty || ''} onChange={e => setForm({ ...form, qty: e.target.value })} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Unit</label>
                                        <select value={form.unit || 'ea'} onChange={e => setForm({ ...form, unit: e.target.value })} style={inputStyle}>
                                            {['ea', 'm', 'm²', 'm³', 'kg', 'ton', 'L', 'ft', 'ft²', 'yd³', 'lb', 'roll', 'sheet', 'set'].map(u => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Rate ($)</label>
                                        <input type="number" step="0.01" value={form.rate || ''} onChange={e => setForm({ ...form, rate: e.target.value })} style={inputStyle} />
                                    </div>
                                </div>
                                {form.qty && form.rate && (
                                    <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '8px 14px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Calculated Total</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#22c55e' }}>${(parseFloat(form.qty) * parseFloat(form.rate)).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowModal(false)} style={cancelBtnStyle}>Cancel</button>
                                <button onClick={handleSave} style={saveBtnStyle}>{editItem ? 'Update' : 'Add Item'}</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ItemRow({ item, onEdit, onDelete }) {
    return (
        <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
            <td style={{ ...tdStyle, maxWidth: 200 }}>{item.desc}</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontFamily: 'monospace' }}>{Number(item.qty).toLocaleString()}</td>
            <td style={{ ...tdStyle, textAlign: 'center', color: '#9ca3af' }}>{item.unit}</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontFamily: 'monospace' }}>${Number(item.rate).toLocaleString()}</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: '#22c55e' }}>${Number(item.total).toLocaleString()}</td>
            <td style={{ ...tdStyle, textAlign: 'center' }}>
                <div className="flex gap-1 justify-center">
                    <button onClick={() => onEdit(item)} style={actionBtnStyle}><Edit2 size={11} style={{ color: '#3b82f6' }} /></button>
                    <button onClick={() => onDelete(item.id)} style={actionBtnStyle}><Trash2 size={11} style={{ color: '#ef4444' }} /></button>
                </div>
            </td>
        </tr>
    );
}

const thStyle = { textAlign: 'left', padding: '6px 10px', fontSize: '0.65rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' };
const tdStyle = { padding: '8px 10px', fontSize: '0.8rem', color: '#374151' };
const labelStyle = { fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 };
const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' };
const actionBtnStyle = { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 5, padding: 3, cursor: 'pointer', display: 'flex', alignItems: 'center' };
const cancelBtnStyle = { flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' };
const saveBtnStyle = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(34,197,94,0.3)' };
