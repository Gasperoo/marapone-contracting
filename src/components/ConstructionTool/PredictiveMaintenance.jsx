import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Wrench, AlertTriangle, CheckCircle, Activity, Thermometer,
    Gauge, Clock, Calendar, TrendingUp, TrendingDown, Zap,
    BarChart3, Settings, Eye, Bell, Plus, X, Edit2, Trash2, Save
} from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

export function PredictiveMaintenance() {
    const [equipment, setEquipment] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});
    const [sensorForm, setSensorForm] = useState({ label: '', value: '', unit: '', max: '' });

    useEffect(() => { refresh(); }, []);
    const refresh = () => {
        if (!DataStore.isSeeded()) DataStore.seed();
        const eq = DataStore.getAll('equipment');
        setEquipment(eq);
        if (!selected && eq.length > 0) setSelected(eq[0].id);
    };

    const handleAdd = () => {
        setEditItem(null);
        setForm({ name: '', project: '', health: 90, nextMaint: '', sensors: [] });
        setShowModal(true);
    };

    const handleEdit = (eq) => {
        setEditItem(eq);
        setForm({ ...eq, nextMaint: eq.nextMaint?.split('T')[0] || '' });
        setShowModal(true);
    };

    const handleSave = () => {
        const payload = { ...form, health: parseInt(form.health) || 0, status: form.health >= 85 ? 'healthy' : form.health >= 60 ? 'warning' : 'critical', nextMaint: form.nextMaint ? new Date(form.nextMaint).toISOString() : '' };
        if (editItem) DataStore.update('equipment', editItem.id, payload);
        else DataStore.create('equipment', payload);
        setShowModal(false);
        refresh();
    };

    const handleDelete = (id) => { DataStore.delete('equipment', id); if (selected === id) setSelected(null); refresh(); };

    const handleAddSensor = () => {
        if (!sensorForm.label) return;
        const sensors = [...(form.sensors || []), { label: sensorForm.label, value: parseFloat(sensorForm.value) || 0, unit: sensorForm.unit, max: parseFloat(sensorForm.max) || 100, status: 'ok' }];
        setForm({ ...form, sensors });
        setSensorForm({ label: '', value: '', unit: '', max: '' });
    };

    const handleUpdateSensorReading = (eqId, sensorIdx, newValue) => {
        const eq = equipment.find(e => e.id === eqId);
        if (!eq) return;
        const sensors = [...eq.sensors];
        sensors[sensorIdx] = { ...sensors[sensorIdx], value: parseFloat(newValue) || 0 };
        const pct = sensors[sensorIdx].value / sensors[sensorIdx].max * 100;
        sensors[sensorIdx].status = pct > 90 ? 'critical' : pct > 75 ? 'warn' : 'ok';
        const avgPct = sensors.reduce((s, sen) => s + (sen.value / sen.max * 100), 0) / sensors.length;
        const health = Math.max(0, Math.min(100, Math.round(100 - avgPct * 0.3)));
        DataStore.update('equipment', eqId, { sensors, health, status: health >= 85 ? 'healthy' : health >= 60 ? 'warning' : 'critical' });
        refresh();
    };

    const selectedEq = equipment.find(e => e.id === selected);
    const avgHealth = equipment.length ? Math.round(equipment.reduce((s, e) => s + e.health, 0) / equipment.length) : 0;
    const warnings = equipment.filter(e => e.status !== 'healthy').length;

    // AI predictions
    const predictions = equipment.flatMap(eq =>
        (eq.sensors || []).filter(s => s.status === 'warn' || s.status === 'critical').map(s => ({
            equipment: `${eq.name} — ${s.label}`,
            severity: s.status === 'critical' ? 'high' : 'medium',
            reading: `${s.value} ${s.unit} / ${s.max} ${s.unit}`,
            recommendation: s.status === 'critical' ? 'Immediate inspection required' : 'Schedule preventive maintenance',
        }))
    );

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title"><Wrench className="icon-glow" style={{ color: '#ef4444' }} size={24} /> Predictive Maintenance</h2>
                    <p className="ct-page-subtitle">Equipment health monitoring — log sensor readings for insights</p>
                </div>
                <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Add Equipment</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Fleet Size', value: String(equipment.length), color: '#3b82f6' },
                    { label: 'Avg Health', value: `${avgHealth}%`, color: avgHealth >= 85 ? '#22c55e' : '#f59e0b' },
                    { label: 'Warnings', value: String(warnings), color: warnings > 0 ? '#ef4444' : '#22c55e' },
                    { label: 'AI Alerts', value: String(predictions.length), color: predictions.length > 0 ? '#f59e0b' : '#22c55e' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Equipment List */}
                <div className="ct-card" style={{ padding: 16 }}>
                    <h3 className="ct-section-header" style={{ margin: '0 0 12px' }}><Settings size={14} className="ct-section-icon" /> Equipment</h3>
                    <div className="space-y-2">
                        {equipment.map(eq => (
                            <div key={eq.id} onClick={() => setSelected(eq.id)}
                                style={{ padding: 12, borderRadius: 10, cursor: 'pointer', background: selected === eq.id ? 'rgba(255,107,0,0.05)' : 'rgba(0,0,0,0.02)', border: `1px solid ${selected === eq.id ? 'rgba(255,107,0,0.2)' : 'rgba(0,0,0,0.04)'}`, transition: 'all 0.2s' }}>
                                <div className="flex items-center justify-between">
                                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{eq.name}</div>
                                    <div className="flex gap-1">
                                        <button onClick={(e) => { e.stopPropagation(); handleEdit(eq); }} style={tinyBtn}><Edit2 size={10} style={{ color: '#3b82f6' }} /></button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDelete(eq.id); }} style={tinyBtn}><Trash2 size={10} style={{ color: '#ef4444' }} /></button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.06)' }}>
                                        <div style={{ width: `${eq.health}%`, height: '100%', borderRadius: 2, background: eq.health >= 85 ? '#22c55e' : eq.health >= 60 ? '#f59e0b' : '#ef4444' }} />
                                    </div>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: eq.health >= 85 ? '#22c55e' : eq.health >= 60 ? '#f59e0b' : '#ef4444' }}>{eq.health}%</span>
                                </div>
                                <div style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: 4 }}>{eq.project}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sensor Detail */}
                <div className="lg:col-span-2 ct-card" style={{ padding: 24 }}>
                    {selectedEq ? (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>{selectedEq.name}</h3>
                                    <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{selectedEq.project} · Next maintenance: {selectedEq.nextMaint ? new Date(selectedEq.nextMaint).toLocaleDateString() : 'Not set'}</p>
                                </div>
                                <div className={`ct-badge ${selectedEq.status === 'healthy' ? 'ct-badge-green' : selectedEq.status === 'warning' ? 'ct-badge-amber' : 'ct-badge-red'}`}>
                                    {selectedEq.status}
                                </div>
                            </div>
                            <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>Sensor Readings (edit values to log new readings)</h4>
                            <div className="space-y-3">
                                {(selectedEq.sensors || []).map((sensor, idx) => {
                                    const pct = (sensor.value / sensor.max) * 100;
                                    return (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 8, background: 'rgba(0,0,0,0.02)' }}>
                                            <div style={{ width: 100, fontSize: '0.7rem', fontWeight: 600, color: '#6b7280' }}>{sensor.label}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>
                                                    <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: 4, background: pct > 90 ? '#ef4444' : pct > 75 ? '#f59e0b' : '#22c55e', transition: 'width 0.3s' }} />
                                                </div>
                                            </div>
                                            <input type="number" value={sensor.value} onChange={e => handleUpdateSensorReading(selectedEq.id, idx, e.target.value)}
                                                style={{ width: 60, padding: '4px 6px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.75rem', textAlign: 'center', outline: 'none' }} />
                                            <span style={{ fontSize: '0.65rem', color: '#9ca3af', width: 40 }}>{sensor.unit}</span>
                                            <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>/ {sensor.max}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <p style={{ fontSize: '0.85rem', color: '#9ca3af', padding: '2rem 0', textAlign: 'center' }}>Select equipment to view sensor details</p>
                    )}
                </div>
            </div>

            {/* AI Predictions */}
            {predictions.length > 0 && (
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header"><Zap size={15} className="ct-section-icon" /> AI Failure Predictions</h3>
                    <div className="space-y-2">
                        {predictions.map((pred, idx) => (
                            <div key={idx} style={{ padding: 12, borderRadius: 10, background: pred.severity === 'high' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)', border: `1px solid ${pred.severity === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)'}` }}>
                                <div className="flex items-center justify-between">
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{pred.equipment}</span>
                                    <span className={`ct-badge ${pred.severity === 'high' ? 'ct-badge-red' : 'ct-badge-amber'}`} style={{ fontSize: '0.55rem' }}>{pred.severity}</span>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: 4 }}>Reading: {pred.reading} — {pred.recommendation}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
                        onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            style={{ background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }}
                            onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5">
                                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Add'} Equipment</h3>
                                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button>
                            </div>
                            <div className="space-y-3">
                                <div><label style={labelStyle}>Equipment Name</label><input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="e.g. Tower Crane #01" /></div>
                                <div><label style={labelStyle}>Project</label><input value={form.project || ''} onChange={e => setForm({ ...form, project: e.target.value })} style={inputStyle} /></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label style={labelStyle}>Health (%)</label><input type="number" min="0" max="100" value={form.health} onChange={e => setForm({ ...form, health: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>Next Maintenance</label><input type="date" value={form.nextMaint} onChange={e => setForm({ ...form, nextMaint: e.target.value })} style={inputStyle} /></div>
                                </div>
                                {/* Sensor builder */}
                                <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 12 }}>
                                    <label style={labelStyle}>Sensors ({(form.sensors || []).length})</label>
                                    <div className="grid grid-cols-4 gap-2 mb-2">
                                        <input placeholder="Label" value={sensorForm.label} onChange={e => setSensorForm({ ...sensorForm, label: e.target.value })} style={{ ...inputStyle, fontSize: '0.7rem' }} />
                                        <input placeholder="Value" type="number" value={sensorForm.value} onChange={e => setSensorForm({ ...sensorForm, value: e.target.value })} style={{ ...inputStyle, fontSize: '0.7rem' }} />
                                        <input placeholder="Unit" value={sensorForm.unit} onChange={e => setSensorForm({ ...sensorForm, unit: e.target.value })} style={{ ...inputStyle, fontSize: '0.7rem' }} />
                                        <button onClick={handleAddSensor} style={{ ...inputStyle, background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer', border: '1px solid rgba(34,197,94,0.2)' }}>+ Add</button>
                                    </div>
                                    {(form.sensors || []).map((s, i) => (
                                        <div key={i} style={{ fontSize: '0.7rem', color: '#6b7280', padding: '4px 0' }}>{s.label}: {s.value} {s.unit} (max: {s.max})</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowModal(false)} style={cancelBtn}>Cancel</button>
                                <button onClick={handleSave} style={saveBtn}>{editItem ? 'Update' : 'Add Equipment'}</button>
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
const saveBtn = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
