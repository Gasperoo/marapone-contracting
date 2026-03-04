import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPinCheck, Plus, X, Edit2, Trash2 } from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

function parseTime(t) { if (!t) return 0; const [h, m] = t.split(':').map(Number); return h + (m || 0) / 60; }
function avgTime(times) { if (!times.length) return '—'; const a = times.reduce((s, t) => s + parseTime(t), 0) / times.length; return `${String(Math.floor(a)).padStart(2, '0')}:${String(Math.round((a % 1) * 60)).padStart(2, '0')}`; }

export function SiteArrivalOptimizer() {
    const [arrivals, setArrivals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => { refresh(); }, []);
    const refresh = () => { if (!DataStore.isSeeded()) DataStore.seed(); setArrivals(DataStore.getAll('siteArrivals')); };

    const handleAdd = () => { setEditItem(null); setForm({ crew: '', site: '', arrivalTime: '07:00', departureTime: '16:00', headcount: '', date: new Date().toISOString().split('T')[0] }); setShowModal(true); };
    const handleEdit = (i) => { setEditItem(i); setForm({ ...i, date: i.date?.split('T')[0] || '' }); setShowModal(true); };
    const handleSave = () => { const p = { ...form, headcount: parseInt(form.headcount) || 0, date: form.date ? new Date(form.date).toISOString() : new Date().toISOString() }; editItem ? DataStore.update('siteArrivals', editItem.id, p) : DataStore.create('siteArrivals', p); setShowModal(false); refresh(); };
    const handleDelete = (id) => { DataStore.delete('siteArrivals', id); refresh(); };

    const totalHC = arrivals.reduce((s, a) => s + (a.headcount || 0), 0);
    const bySite = {}; arrivals.forEach(a => { (bySite[a.site] = bySite[a.site] || []).push(a); });

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div><h2 className="ct-page-title"><MapPinCheck className="icon-glow" style={{ color: '#0ea5e9' }} size={24} /> Site Arrival Optimizer</h2><p className="ct-page-subtitle">Crew check-ins & utilization tracking</p></div>
                <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Log Arrival</button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[{ l: 'Total Logs', v: String(arrivals.length), c: '#3b82f6' }, { l: 'Total Headcount', v: String(totalHC), c: '#22c55e' }, { l: 'Avg Arrival', v: avgTime(arrivals.map(a => a.arrivalTime)), c: '#f59e0b' }, { l: 'Sites', v: String(Object.keys(bySite).length), c: '#a855f7' }].map((k, i) => (
                    <motion.div key={i} className="ct-kpi" style={{ '--kpi-color': k.c }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <div className="ct-kpi-label">{k.l}</div><div className="ct-kpi-value" style={{ color: k.c }}>{k.v}</div>
                    </motion.div>
                ))}
            </div>
            {Object.entries(bySite).map(([site, logs]) => (
                <div key={site} className="ct-card" style={{ padding: 16 }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}><MapPinCheck size={14} style={{ color: '#0ea5e9', display: 'inline', verticalAlign: -2 }} /> {site} <span style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 400 }}>({logs.length})</span></h3>
                    <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                        <thead><tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>{['Crew', 'Date', 'Arrival', 'Departure', 'HC', 'Hrs', ''].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                        <tbody>{logs.sort((a, b) => new Date(b.date) - new Date(a.date)).map(l => {
                            const hrs = (parseTime(l.departureTime) - parseTime(l.arrivalTime)).toFixed(1); return (
                                <tr key={l.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                    <td style={td}>{l.crew}</td><td style={td}>{new Date(l.date).toLocaleDateString()}</td><td style={td}>{l.arrivalTime}</td><td style={td}>{l.departureTime}</td>
                                    <td style={{ ...td, fontWeight: 600 }}>{l.headcount}</td><td style={{ ...td, color: parseFloat(hrs) >= 8 ? '#22c55e' : '#f59e0b' }}>{hrs}h</td>
                                    <td style={td}><div className="flex gap-1"><button onClick={() => handleEdit(l)} style={tb}><Edit2 size={10} style={{ color: '#3b82f6' }} /></button><button onClick={() => handleDelete(l.id)} style={tb}><Trash2 size={10} style={{ color: '#ef4444' }} /></button></div></td>
                                </tr>);
                        })}</tbody>
                    </table>
                </div>
            ))}
            <AnimatePresence>{showModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={ov} onClick={() => setShowModal(false)}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={ml} onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5"><h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Log'} Arrival</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button></div>
                        <div className="space-y-3">
                            <div><label style={lb}>Crew</label><input value={form.crew || ''} onChange={e => setForm({ ...form, crew: e.target.value })} style={ip} /></div>
                            <div><label style={lb}>Site</label><input value={form.site || ''} onChange={e => setForm({ ...form, site: e.target.value })} style={ip} /></div>
                            <div className="grid grid-cols-3 gap-3">
                                <div><label style={lb}>Arrival</label><input type="time" value={form.arrivalTime || ''} onChange={e => setForm({ ...form, arrivalTime: e.target.value })} style={ip} /></div>
                                <div><label style={lb}>Departure</label><input type="time" value={form.departureTime || ''} onChange={e => setForm({ ...form, departureTime: e.target.value })} style={ip} /></div>
                                <div><label style={lb}>Headcount</label><input type="number" min="1" value={form.headcount || ''} onChange={e => setForm({ ...form, headcount: e.target.value })} style={ip} /></div>
                            </div>
                            <div><label style={lb}>Date</label><input type="date" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} style={ip} /></div>
                        </div>
                        <div className="flex gap-3 mt-6"><button onClick={() => setShowModal(false)} style={cb}>Cancel</button><button onClick={handleSave} style={sb}>{editItem ? 'Update' : 'Log'}</button></div>
                    </motion.div>
                </motion.div>
            )}</AnimatePresence>
        </div>
    );
}

const tb = { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 4, padding: 2, cursor: 'pointer', display: 'flex' };
const th = { textAlign: 'left', padding: '6px 10px', fontSize: '0.65rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' };
const td = { padding: '8px 10px', fontSize: '0.8rem', color: '#374151' };
const lb = { fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 };
const ip = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' };
const ov = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' };
const ml = { background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' };
const cb = { flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' };
const sb = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
