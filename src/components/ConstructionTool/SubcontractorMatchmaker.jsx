import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserSearch, Star, Phone, MapPin, Plus, X, Edit2, Trash2, Search, Award, Clock } from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

export function SubcontractorMatchmaker() {
    const [subs, setSubs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});
    const [searchText, setSearchText] = useState('');
    const [filterTrade, setFilterTrade] = useState('');

    useEffect(() => { refresh(); }, []);
    const refresh = () => { if (!DataStore.isSeeded()) DataStore.seed(); setSubs(DataStore.getAll('subcontractors')); };

    const handleAdd = () => { setEditItem(null); setForm({ name: '', trade: '', rating: 4, rate: '', capacity: 'Available', phone: '', projects: 0, onTime: 90 }); setShowModal(true); };
    const handleEdit = (s) => { setEditItem(s); setForm({ ...s, rate: String(s.rate), rating: String(s.rating) }); setShowModal(true); };
    const handleSave = () => {
        const payload = { ...form, rating: parseFloat(form.rating) || 0, rate: parseFloat(form.rate) || 0, projects: parseInt(form.projects) || 0, onTime: parseInt(form.onTime) || 0 };
        if (editItem) DataStore.update('subcontractors', editItem.id, payload);
        else DataStore.create('subcontractors', payload);
        setShowModal(false); refresh();
    };
    const handleDelete = (id) => { DataStore.delete('subcontractors', id); refresh(); };

    const trades = [...new Set(subs.map(s => s.trade).filter(Boolean))];
    const filtered = subs.filter(s => {
        if (searchText && !s.name?.toLowerCase().includes(searchText.toLowerCase()) && !s.trade?.toLowerCase().includes(searchText.toLowerCase())) return false;
        if (filterTrade && s.trade !== filterTrade) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div><h2 className="ct-page-title"><UserSearch className="icon-glow" style={{ color: '#06b6d4' }} size={24} /> Subcontractor Matchmaker</h2><p className="ct-page-subtitle">Manage and rate your subcontractor network</p></div>
                <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Add Sub</button>
            </div>

            <div className="flex gap-3 flex-wrap">
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                    <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input placeholder="Search subs..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }} />
                </div>
                <select value={filterTrade} onChange={e => setFilterTrade(e.target.value)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: '0.8rem', background: '#fafafa' }}>
                    <option value="">All Trades</option>
                    {trades.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((sub, idx) => (
                    <motion.div key={sub.id} className="ct-card" style={{ padding: 20 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a' }}>{sub.name}</div>
                                <div style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 600 }}>{sub.trade}</div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => handleEdit(sub)} style={tinyBtn}><Edit2 size={11} style={{ color: '#3b82f6' }} /></button>
                                <button onClick={() => handleDelete(sub.id)} style={tinyBtn}><Trash2 size={11} style={{ color: '#ef4444' }} /></button>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill={i < Math.round(sub.rating) ? '#f59e0b' : 'none'} stroke={i < Math.round(sub.rating) ? '#f59e0b' : '#d1d5db'} />)}
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginLeft: 4 }}>{sub.rating}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: '#6b7280' }}>
                            <div><strong>${sub.rate}</strong>/hr</div>
                            <div><Clock size={10} style={{ display: 'inline', verticalAlign: -1 }} /> {sub.onTime}% on-time</div>
                            <div><Award size={10} style={{ display: 'inline', verticalAlign: -1 }} /> {sub.projects} projects</div>
                            <div><span className={`ct-badge ${sub.capacity === 'Available' ? 'ct-badge-green' : 'ct-badge-amber'}`} style={{ fontSize: '0.55rem' }}>{sub.capacity}</span></div>
                        </div>
                        {sub.phone && <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: 8 }}><Phone size={10} style={{ display: 'inline', verticalAlign: -1 }} /> {sub.phone}</div>}
                    </motion.div>
                ))}
            </div>
            {filtered.length === 0 && <p style={{ fontSize: '0.85rem', color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>No subcontractors found.</p>}

            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle} onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={modalStyle} onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5"><h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Add'} Subcontractor</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button></div>
                            <div className="space-y-3">
                                <div><label style={labelStyle}>Name</label><input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label style={labelStyle}>Trade</label><input value={form.trade || ''} onChange={e => setForm({ ...form, trade: e.target.value })} style={inputStyle} placeholder="e.g. Electrical" /></div>
                                    <div><label style={labelStyle}>Rate ($/hr)</label><input type="number" value={form.rate || ''} onChange={e => setForm({ ...form, rate: e.target.value })} style={inputStyle} /></div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div><label style={labelStyle}>Rating (1-5)</label><input type="number" min="1" max="5" step="0.1" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>On-time %</label><input type="number" min="0" max="100" value={form.onTime} onChange={e => setForm({ ...form, onTime: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>Capacity</label><select value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} style={inputStyle}><option>Available</option><option>Busy</option><option>On Hold</option></select></div>
                                </div>
                                <div><label style={labelStyle}>Phone</label><input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} /></div>
                            </div>
                            <div className="flex gap-3 mt-6"><button onClick={() => setShowModal(false)} style={cancelBtn}>Cancel</button><button onClick={handleSave} style={saveBtn}>{editItem ? 'Update' : 'Add Sub'}</button></div>
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
const saveBtn = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
