import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    BrainCircuit, Calendar, AlertTriangle, CheckCircle, Clock,
    Users, TrendingUp, Zap, Target, ArrowRight, Lightbulb,
    Plus, X, Edit2, Trash2, ChevronDown
} from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

const PHASES = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];
const COLORS = ['#22c55e', '#3b82f6', '#FF6B00', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4', '#10b981', '#ef4444'];

export function ConstructionAIPlanner() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => { refresh(); }, []);
    const refresh = () => {
        if (!DataStore.isSeeded()) DataStore.seed();
        setTasks(DataStore.getAll('scheduleTasks'));
    };

    const totalWeeks = tasks.length > 0 ? Math.max(...tasks.map(t => (t.start || 0) + (t.duration || 0)), 24) : 24;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const activeTasks = tasks.filter(t => t.status === 'active').length;

    const handleAdd = () => {
        setEditItem(null);
        setForm({ name: '', phase: 'Phase 1', start: 0, duration: 2, progress: 0, status: 'pending', color: COLORS[tasks.length % COLORS.length] });
        setShowModal(true);
    };

    const handleEdit = (task) => {
        setEditItem(task);
        setForm({ ...task, start: String(task.start), duration: String(task.duration), progress: String(task.progress) });
        setShowModal(true);
    };

    const handleSave = () => {
        const payload = { ...form, start: parseInt(form.start) || 0, duration: parseInt(form.duration) || 1, progress: parseInt(form.progress) || 0 };
        if (payload.progress >= 100) payload.status = 'completed';
        else if (payload.progress > 0) payload.status = 'active';
        if (editItem) DataStore.update('scheduleTasks', editItem.id, payload);
        else DataStore.create('scheduleTasks', payload);
        setShowModal(false);
        refresh();
    };

    const handleDelete = (id) => { DataStore.delete('scheduleTasks', id); refresh(); };
    const handleProgressUpdate = (id, progress) => {
        const status = progress >= 100 ? 'completed' : progress > 0 ? 'active' : 'pending';
        DataStore.update('scheduleTasks', id, { progress, status });
        refresh();
    };

    // AI suggestions
    const riskFactors = [];
    const criticalPath = tasks.filter(t => t.status === 'active').sort((a, b) => (a.start + a.duration) - (b.start + b.duration));
    if (activeTasks > 4) riskFactors.push({ factor: 'Too Many Parallel Tasks', level: 'high', impact: 'Resource contention likely', color: '#ef4444' });
    if (tasks.some(t => t.progress < 50 && t.status === 'active' && t.start < totalWeeks * 0.3)) riskFactors.push({ factor: 'Behind Schedule', level: 'medium', impact: 'Early tasks lagging', color: '#f59e0b' });
    if (completedTasks === 0 && tasks.length > 0) riskFactors.push({ factor: 'No Completions Yet', level: 'low', impact: 'Build momentum', color: '#3b82f6' });

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title"><BrainCircuit className="icon-glow" style={{ color: '#FF6B00' }} size={24} /> AI Planner</h2>
                    <p className="ct-page-subtitle">Interactive Gantt chart with AI risk analysis</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Add Task</button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total Tasks', value: String(tasks.length), color: '#3b82f6' },
                    { label: 'Completed', value: String(completedTasks), color: '#22c55e' },
                    { label: 'In Progress', value: String(activeTasks), color: '#FF6B00' },
                    { label: 'Timeline', value: `${totalWeeks} weeks`, color: '#a855f7' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Gantt Chart */}
            <div className="ct-card" style={{ padding: 24, overflowX: 'auto' }}>
                <h3 className="ct-section-header"><Calendar size={15} className="ct-section-icon" /> Schedule Timeline</h3>
                <div style={{ minWidth: 700 }}>
                    {/* Week headers */}
                    <div style={{ display: 'flex', marginLeft: 200, marginBottom: 8 }}>
                        {Array.from({ length: totalWeeks }, (_, i) => (
                            <div key={i} style={{ flex: 1, fontSize: '0.55rem', color: '#9ca3af', textAlign: 'center', fontWeight: 600 }}>W{i + 1}</div>
                        ))}
                    </div>
                    {/* Task rows */}
                    {tasks.map((task, idx) => (
                        <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}
                            style={{ display: 'flex', alignItems: 'center', marginBottom: 6, minHeight: 36 }}>
                            <div style={{ width: 200, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, paddingRight: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: task.color, flexShrink: 0 }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.name}</span>
                                <div className="flex gap-0.5" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                                    <button onClick={() => handleEdit(task)} style={tinyBtn}><Edit2 size={10} style={{ color: '#3b82f6' }} /></button>
                                    <button onClick={() => handleDelete(task.id)} style={tinyBtn}><Trash2 size={10} style={{ color: '#ef4444' }} /></button>
                                </div>
                            </div>
                            <div style={{ flex: 1, position: 'relative', height: 28, background: 'rgba(0,0,0,0.02)', borderRadius: 4 }}>
                                <div style={{
                                    position: 'absolute',
                                    left: `${(task.start / totalWeeks) * 100}%`,
                                    width: `${(task.duration / totalWeeks) * 100}%`,
                                    height: '100%', borderRadius: 4,
                                    background: `${task.color}30`,
                                    border: `1px solid ${task.color}50`,
                                }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress}%` }}
                                        style={{ height: '100%', borderRadius: 4, background: task.color, opacity: 0.7 }} />
                                    <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: '0.55rem', fontWeight: 700, color: '#374151' }}>{task.progress}%</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Progress Controls + Risk Analysis */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header"><Target size={15} className="ct-section-icon" /> Update Progress</h3>
                    <div className="space-y-3">
                        {tasks.filter(t => t.status !== 'completed').map(task => (
                            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: 8, background: 'rgba(0,0,0,0.02)' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: task.color }} />
                                <span style={{ fontSize: '0.75rem', flex: 1, color: '#374151' }}>{task.name}</span>
                                <input type="range" min="0" max="100" value={task.progress}
                                    onChange={e => handleProgressUpdate(task.id, parseInt(e.target.value))}
                                    style={{ width: 80, accentColor: task.color }} />
                                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', width: 35, textAlign: 'right', color: '#6b7280' }}>{task.progress}%</span>
                            </div>
                        ))}
                        {tasks.filter(t => t.status !== 'completed').length === 0 && <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>All tasks completed! 🎉</p>}
                    </div>
                </div>

                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header"><AlertTriangle size={15} className="ct-section-icon" /> AI Risk Analysis</h3>
                    <div className="space-y-3">
                        {riskFactors.length === 0 && <p style={{ fontSize: '0.8rem', color: '#22c55e' }}>✓ No significant risks detected</p>}
                        {riskFactors.map((risk, idx) => (
                            <div key={idx} style={{ padding: 12, borderRadius: 10, background: `${risk.color}08`, border: `1px solid ${risk.color}20` }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{risk.factor}</div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: 2 }}>{risk.impact}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
                        onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            style={{ background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                            onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5">
                                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Add'} Task</h3>
                                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button>
                            </div>
                            <div className="space-y-3">
                                <div><label style={labelStyle}>Task Name</label><input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Phase</label><select value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })} style={inputStyle}>{PHASES.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div><label style={labelStyle}>Start (Week)</label><input type="number" min="0" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>Duration (Weeks)</label><input type="number" min="1" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>Progress (%)</label><input type="number" min="0" max="100" value={form.progress} onChange={e => setForm({ ...form, progress: e.target.value })} style={inputStyle} /></div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowModal(false)} style={cancelBtn}>Cancel</button>
                                <button onClick={handleSave} style={saveBtn}>{editItem ? 'Update' : 'Add Task'}</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const tinyBtn = { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 4, padding: 2, cursor: 'pointer', display: 'flex' };
const labelStyle = { fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 };
const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' };
const cancelBtn = { flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' };
const saveBtn = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #FF6B00, #FFB800)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
