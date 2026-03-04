import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertTriangle, CheckCircle, Clock, FileText, Plus, X, Edit2, Trash2, Calendar } from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

export function ComplianceAutoPilot() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});
    const [filter, setFilter] = useState('all');

    useEffect(() => { refresh(); }, []);
    const refresh = () => { if (!DataStore.isSeeded()) DataStore.seed(); setItems(DataStore.getAll('compliance')); };

    const handleAdd = () => { setEditItem(null); setForm({ type: 'permit', name: '', project: '', status: 'pending', expiryDate: '', inspector: '', notes: '' }); setShowModal(true); };
    const handleEdit = (item) => { setEditItem(item); setForm({ ...item, expiryDate: item.expiryDate?.split('T')[0] || '', inspectionDate: item.inspectionDate?.split('T')[0] || '' }); setShowModal(true); };
    const handleSave = () => {
        const payload = { ...form };
        if (payload.expiryDate) payload.expiryDate = new Date(payload.expiryDate).toISOString();
        if (payload.inspectionDate) payload.inspectionDate = new Date(payload.inspectionDate).toISOString();
        if (editItem) DataStore.update('compliance', editItem.id, payload);
        else DataStore.create('compliance', payload);
        setShowModal(false); refresh();
    };
    const handleDelete = (id) => { DataStore.delete('compliance', id); refresh(); };
    const toggleStatus = (item) => {
        const next = { pass: 'fail', fail: 'pending', pending: 'pass', active: 'expired', expired: 'active' };
        DataStore.update('compliance', item.id, { status: next[item.status] || 'active' });
        refresh();
    };

    const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);
    const passing = items.filter(i => i.status === 'pass' || i.status === 'active').length;
    const failing = items.filter(i => i.status === 'fail' || i.status === 'expired').length;
    const pending = items.filter(i => i.status === 'pending').length;

    const statusColors = { pass: '#22c55e', active: '#22c55e', fail: '#ef4444', expired: '#ef4444', pending: '#f59e0b' };
    const statusIcons = { pass: CheckCircle, active: CheckCircle, fail: AlertTriangle, expired: AlertTriangle, pending: Clock };

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div><h2 className="ct-page-title"><ShieldCheck className="icon-glow" style={{ color: '#10b981' }} size={24} /> Compliance Auto-Pilot</h2><p className="ct-page-subtitle">Permits, inspections & certifications management</p></div>
                <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Add Item</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total Items', value: String(items.length), color: '#3b82f6' },
                    { label: 'Passing', value: String(passing), color: '#22c55e' },
                    { label: 'Failing', value: String(failing), color: '#ef4444' },
                    { label: 'Pending', value: String(pending), color: '#f59e0b' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="flex gap-2">
                {[{ id: 'all', label: 'All' }, { id: 'permit', label: 'Permits' }, { id: 'inspection', label: 'Inspections' }, { id: 'cert', label: 'Certifications' }].map(tab => (
                    <button key={tab.id} onClick={() => setFilter(tab.id)}
                        style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: 8, fontWeight: 600, border: '1px solid', borderColor: filter === tab.id ? '#10b981' : 'rgba(0,0,0,0.08)', background: filter === tab.id ? 'rgba(16,185,129,0.08)' : 'rgba(0,0,0,0.02)', color: filter === tab.id ? '#10b981' : '#6b7280', cursor: 'pointer' }}>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filtered.map((item, idx) => {
                    const Icon = statusIcons[item.status] || Clock;
                    return (
                        <motion.div key={item.id} className="ct-card" style={{ padding: 16 }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => toggleStatus(item)} style={{ background: `${statusColors[item.status]}15`, border: `1px solid ${statusColors[item.status]}30`, borderRadius: 8, padding: 6, cursor: 'pointer', display: 'flex' }}>
                                        <Icon size={16} style={{ color: statusColors[item.status] }} />
                                    </button>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.project}{item.inspector ? ` · Inspector: ${item.inspector}` : ''}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`ct-badge ${item.status === 'pass' || item.status === 'active' ? 'ct-badge-green' : item.status === 'fail' || item.status === 'expired' ? 'ct-badge-red' : 'ct-badge-amber'}`} style={{ fontSize: '0.6rem' }}>{item.status}</span>
                                    {item.expiryDate && <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}><Calendar size={10} style={{ display: 'inline', verticalAlign: -1 }} /> {new Date(item.expiryDate).toLocaleDateString()}</span>}
                                    <button onClick={() => handleEdit(item)} style={tinyBtn}><Edit2 size={11} style={{ color: '#3b82f6' }} /></button>
                                    <button onClick={() => handleDelete(item.id)} style={tinyBtn}><Trash2 size={11} style={{ color: '#ef4444' }} /></button>
                                </div>
                            </div>
                            {item.notes && <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: 6, padding: '4px 8px', background: 'rgba(239,68,68,0.05)', borderRadius: 6 }}>{item.notes}</div>}
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle} onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={modalStyle} onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5"><h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Add'} Compliance Item</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label style={labelStyle}>Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}><option value="permit">Permit</option><option value="inspection">Inspection</option><option value="cert">Certification</option></select></div>
                                    <div><label style={labelStyle}>Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}><option value="active">Active</option><option value="pass">Pass</option><option value="fail">Fail</option><option value="pending">Pending</option><option value="expired">Expired</option></select></div>
                                </div>
                                <div><label style={labelStyle}>Name</label><input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Project</label><input value={form.project || ''} onChange={e => setForm({ ...form, project: e.target.value })} style={inputStyle} /></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label style={labelStyle}>Expiry Date</label><input type="date" value={form.expiryDate || ''} onChange={e => setForm({ ...form, expiryDate: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>Inspector</label><input value={form.inspector || ''} onChange={e => setForm({ ...form, inspector: e.target.value })} style={inputStyle} /></div>
                                </div>
                                <div><label style={labelStyle}>Notes</label><textarea value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} /></div>
                            </div>
                            <div className="flex gap-3 mt-6"><button onClick={() => setShowModal(false)} style={cancelBtn}>Cancel</button><button onClick={handleSave} style={saveBtn}>{editItem ? 'Update' : 'Add'}</button></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const tinyBtn = { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 4, padding: 3, cursor: 'pointer', display: 'flex' };
const labelStyle = { fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 };
const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' };
const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' };
const modalStyle = { background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' };
const cancelBtn = { flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' };
const saveBtn = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
