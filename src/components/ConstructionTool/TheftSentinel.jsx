import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Siren, AlertTriangle, CheckCircle, Shield, Plus, X, Edit2, Trash2, Eye, Clock, MapPin } from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

export function TheftSentinel() {
    const [alerts, setAlerts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => { refresh(); }, []);
    const refresh = () => { if (!DataStore.isSeeded()) DataStore.seed(); setAlerts(DataStore.getAll('securityAlerts')); };

    const handleAdd = () => { setEditItem(null); setForm({ type: 'unauthorized_access', severity: 'medium', site: '', description: '', status: 'open', timestamp: new Date().toISOString().split('T')[0] }); setShowModal(true); };
    const handleEdit = (item) => { setEditItem(item); setForm({ ...item, timestamp: item.timestamp?.split('T')[0] || '' }); setShowModal(true); };
    const handleSave = () => {
        const payload = { ...form, timestamp: form.timestamp ? new Date(form.timestamp).toISOString() : new Date().toISOString() };
        if (editItem) DataStore.update('securityAlerts', editItem.id, payload);
        else DataStore.create('securityAlerts', payload);
        setShowModal(false); refresh();
    };
    const handleDelete = (id) => { DataStore.delete('securityAlerts', id); refresh(); };
    const handleResolve = (id) => { DataStore.update('securityAlerts', id, { status: 'resolved' }); refresh(); };

    const open = alerts.filter(a => a.status === 'open').length;
    const investigating = alerts.filter(a => a.status === 'investigating').length;
    const resolved = alerts.filter(a => a.status === 'resolved').length;

    const sevColors = { high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' };
    const statusColors = { open: '#ef4444', investigating: '#f59e0b', resolved: '#22c55e' };
    const typeLabels = { unauthorized_access: 'Unauthorized Access', equipment_movement: 'Equipment Movement', material_discrepancy: 'Material Discrepancy', vandalism: 'Vandalism', other: 'Other' };

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div><h2 className="ct-page-title"><Siren className="icon-glow" style={{ color: '#dc2626' }} size={24} /> Theft Sentinel</h2><p className="ct-page-subtitle">Security alerts & incident management</p></div>
                <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Log Alert</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total Alerts', value: String(alerts.length), color: '#3b82f6' },
                    { label: 'Open', value: String(open), color: open > 0 ? '#ef4444' : '#22c55e' },
                    { label: 'Investigating', value: String(investigating), color: '#f59e0b' },
                    { label: 'Resolved', value: String(resolved), color: '#22c55e' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-3">
                {alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((alert, idx) => (
                    <motion.div key={alert.id} className="ct-card" style={{ padding: 16, borderLeft: `3px solid ${sevColors[alert.severity]}` }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div style={{ background: `${sevColors[alert.severity]}15`, borderRadius: 8, padding: 6, display: 'flex' }}>
                                    <AlertTriangle size={16} style={{ color: sevColors[alert.severity] }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>{typeLabels[alert.type] || alert.type}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}><MapPin size={10} style={{ display: 'inline', verticalAlign: -1 }} /> {alert.site} · {new Date(alert.timestamp).toLocaleDateString()}</div>
                                    <p style={{ fontSize: '0.8rem', color: '#374151', marginTop: 4 }}>{alert.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`ct-badge`} style={{ fontSize: '0.55rem', background: `${statusColors[alert.status]}15`, color: statusColors[alert.status], border: `1px solid ${statusColors[alert.status]}30` }}>{alert.status}</span>
                                {alert.status !== 'resolved' && <button onClick={() => handleResolve(alert.id)} title="Mark Resolved" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 6, padding: 4, cursor: 'pointer', color: '#22c55e', display: 'flex' }}><CheckCircle size={12} /></button>}
                                <button onClick={() => handleEdit(alert)} style={tinyBtn}><Edit2 size={11} style={{ color: '#3b82f6' }} /></button>
                                <button onClick={() => handleDelete(alert.id)} style={tinyBtn}><Trash2 size={11} style={{ color: '#ef4444' }} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle} onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={modalStyle} onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5"><h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Log'} Security Alert</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label style={labelStyle}>Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}><option value="unauthorized_access">Unauthorized Access</option><option value="equipment_movement">Equipment Movement</option><option value="material_discrepancy">Material Discrepancy</option><option value="vandalism">Vandalism</option><option value="other">Other</option></select></div>
                                    <div><label style={labelStyle}>Severity</label><select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} style={inputStyle}><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label style={labelStyle}>Site</label><input value={form.site || ''} onChange={e => setForm({ ...form, site: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>Date</label><input type="date" value={form.timestamp || ''} onChange={e => setForm({ ...form, timestamp: e.target.value })} style={inputStyle} /></div>
                                </div>
                                <div><label style={labelStyle}>Description</label><textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} /></div>
                                <div><label style={labelStyle}>Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}><option value="open">Open</option><option value="investigating">Investigating</option><option value="resolved">Resolved</option></select></div>
                            </div>
                            <div className="flex gap-3 mt-6"><button onClick={() => setShowModal(false)} style={cancelBtn}>Cancel</button><button onClick={handleSave} style={saveBtn}>{editItem ? 'Update' : 'Log Alert'}</button></div>
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
const saveBtn = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
