import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarClock, Plus, X, Edit2, Trash2, Users, Clock, Zap } from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

// MicroProjectOptimizer uses scheduleTasks as its data source
export function MicroProjectOptimizer() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => { refresh(); }, []);
    const refresh = () => { if (!DataStore.isSeeded()) DataStore.seed(); setTasks(DataStore.getAll('scheduleTasks')); };

    const handleAdd = () => { setEditItem(null); setForm({ name: '', phase: 'Phase 1', duration: 1, crew: 1, priority: 'medium', status: 'pending', progress: 0 }); setShowModal(true); };
    const handleEdit = (t) => { setEditItem(t); setForm({ ...t }); setShowModal(true); };
    const handleSave = () => {
        const p = { ...form, duration: parseInt(form.duration) || 1, crew: parseInt(form.crew) || 1, progress: parseInt(form.progress) || 0, start: parseInt(form.start) || 0 };
        if (p.progress >= 100) p.status = 'completed';
        editItem ? DataStore.update('scheduleTasks', editItem.id, p) : DataStore.create('scheduleTasks', p);
        setShowModal(false); refresh();
    };
    const handleDelete = (id) => { DataStore.delete('scheduleTasks', id); refresh(); };

    const pending = tasks.filter(t => t.status === 'pending');
    const active = tasks.filter(t => t.status === 'active');
    const completed = tasks.filter(t => t.status === 'completed');
    const totalWeeks = tasks.reduce((s, t) => s + (t.duration || 0), 0);

    // AI optimization suggestions
    const suggestions = [];
    if (active.length > 3) suggestions.push({ text: `${active.length} tasks running in parallel — consider staggering to avoid resource conflicts`, type: 'warning' });
    if (pending.length > active.length * 2) suggestions.push({ text: 'Large backlog detected — prioritize critical path items to maintain momentum', type: 'info' });
    const longTasks = tasks.filter(t => t.duration > 4 && t.status !== 'completed');
    if (longTasks.length) suggestions.push({ text: `Break down ${longTasks.map(t => `"${t.name}"`).join(', ')} into smaller sub-tasks for better tracking`, type: 'tip' });

    const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' };

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div><h2 className="ct-page-title"><CalendarClock className="icon-glow" style={{ color: '#8b5cf6' }} size={24} /> Micro-Project Optimizer</h2><p className="ct-page-subtitle">Multi-job crew scheduling & optimization</p></div>
                <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Add Job</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[{ l: 'Total Jobs', v: String(tasks.length), c: '#3b82f6' }, { l: 'Active', v: String(active.length), c: '#FF6B00' }, { l: 'Completed', v: String(completed.length), c: '#22c55e' }, { l: 'Total Duration', v: `${totalWeeks}w`, c: '#a855f7' }].map((k, i) => (
                    <motion.div key={i} className="ct-kpi" style={{ '--kpi-color': k.c }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <div className="ct-kpi-label">{k.l}</div><div className="ct-kpi-value" style={{ color: k.c }}>{k.v}</div>
                    </motion.div>
                ))}
            </div>

            {suggestions.length > 0 && (
                <div className="ct-card" style={{ padding: 16 }}>
                    <h3 className="ct-section-header" style={{ margin: '0 0 8px' }}><Zap size={14} className="ct-section-icon" /> AI Optimization</h3>
                    {suggestions.map((s, i) => (
                        <div key={i} style={{ fontSize: '0.75rem', color: '#374151', padding: '6px 0', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                            <span style={{ color: s.type === 'warning' ? '#f59e0b' : '#3b82f6' }}>•</span> {s.text}
                        </div>
                    ))}
                </div>
            )}

            {/* Kanban-style columns */}
            <div className="grid md:grid-cols-3 gap-4">
                {[{ title: 'Pending', items: pending, color: '#f59e0b' }, { title: 'Active', items: active, color: '#FF6B00' }, { title: 'Completed', items: completed, color: '#22c55e' }].map(col => (
                    <div key={col.title}>
                        <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: col.color, marginBottom: 8, padding: '4px 0', borderBottom: `2px solid ${col.color}20` }}>{col.title} ({col.items.length})</h3>
                        <div className="space-y-2">
                            {col.items.map((t, i) => (
                                <motion.div key={t.id} className="ct-card" style={{ padding: 14 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>{t.name}</div>
                                        <div className="flex gap-1">
                                            <button onClick={() => handleEdit(t)} style={tb}><Edit2 size={10} style={{ color: '#3b82f6' }} /></button>
                                            <button onClick={() => handleDelete(t.id)} style={tb}><Trash2 size={10} style={{ color: '#ef4444' }} /></button>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: 6 }}>{t.phase}</div>
                                    <div className="flex gap-3" style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                                        <span><Clock size={10} style={{ display: 'inline', verticalAlign: -1 }} /> {t.duration}w</span>
                                        {t.crew && <span><Users size={10} style={{ display: 'inline', verticalAlign: -1 }} /> {t.crew}</span>}
                                        {t.priority && <span className="ct-badge" style={{ fontSize: '0.5rem', padding: '1px 5px', background: `${priorityColors[t.priority] || '#6b7280'}15`, color: priorityColors[t.priority] || '#6b7280' }}>{t.priority}</span>}
                                    </div>
                                    {t.status !== 'completed' && <div style={{ marginTop: 8 }}><div style={{ height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.06)' }}><div style={{ width: `${t.progress || 0}%`, height: '100%', borderRadius: 2, background: col.color, transition: 'width 0.3s' }} /></div><div style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: 2, textAlign: 'right' }}>{t.progress || 0}%</div></div>}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>{showModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={ov} onClick={() => setShowModal(false)}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={ml} onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5"><h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Add'} Job</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button></div>
                        <div className="space-y-3">
                            <div><label style={lb}>Job Name</label><input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} style={ip} /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label style={lb}>Phase</label><select value={form.phase || 'Phase 1'} onChange={e => setForm({ ...form, phase: e.target.value })} style={ip}>{['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].map(p => <option key={p}>{p}</option>)}</select></div>
                                <div><label style={lb}>Priority</label><select value={form.priority || 'medium'} onChange={e => setForm({ ...form, priority: e.target.value })} style={ip}><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div><label style={lb}>Duration (weeks)</label><input type="number" min="1" value={form.duration || ''} onChange={e => setForm({ ...form, duration: e.target.value })} style={ip} /></div>
                                <div><label style={lb}>Crew Size</label><input type="number" min="1" value={form.crew || ''} onChange={e => setForm({ ...form, crew: e.target.value })} style={ip} /></div>
                                <div><label style={lb}>Progress %</label><input type="number" min="0" max="100" value={form.progress || 0} onChange={e => setForm({ ...form, progress: e.target.value })} style={ip} /></div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6"><button onClick={() => setShowModal(false)} style={cb}>Cancel</button><button onClick={handleSave} style={sb}>{editItem ? 'Update' : 'Add Job'}</button></div>
                    </motion.div>
                </motion.div>
            )}</AnimatePresence>
        </div>
    );
}

const tb = { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 4, padding: 2, cursor: 'pointer', display: 'flex' };
const lb = { fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 };
const ip = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' };
const ov = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' };
const ml = { background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' };
const cb = { flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' };
const sb = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
