import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircleHeart, Star, TrendingUp, TrendingDown, Plus, X, Edit2, Trash2, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

export function ClientFeedbackFusion() {
    const [feedback, setFeedback] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => { refresh(); }, []);
    const refresh = () => { if (!DataStore.isSeeded()) DataStore.seed(); setFeedback(DataStore.getAll('clientFeedback')); };

    const handleAdd = () => { setEditItem(null); setForm({ client: '', project: '', rating: 4, sentiment: 'positive', comment: '', date: new Date().toISOString().split('T')[0] }); setShowModal(true); };
    const handleEdit = (item) => { setEditItem(item); setForm({ ...item, date: item.date?.split('T')[0] || '' }); setShowModal(true); };
    const handleSave = () => {
        const payload = { ...form, rating: parseInt(form.rating) || 0, date: form.date ? new Date(form.date).toISOString() : new Date().toISOString() };
        if (editItem) DataStore.update('clientFeedback', editItem.id, payload);
        else DataStore.create('clientFeedback', payload);
        setShowModal(false); refresh();
    };
    const handleDelete = (id) => { DataStore.delete('clientFeedback', id); refresh(); };

    const avgRating = feedback.length ? (feedback.reduce((s, f) => s + (f.rating || 0), 0) / feedback.length).toFixed(1) : '0';
    const positive = feedback.filter(f => f.sentiment === 'positive').length;
    const negative = feedback.filter(f => f.sentiment === 'negative').length;
    const nps = feedback.length ? Math.round(((positive - negative) / feedback.length) * 100) : 0;
    const sentimentColors = { positive: '#22c55e', neutral: '#f59e0b', negative: '#ef4444' };
    const SentimentIcon = { positive: ThumbsUp, neutral: Minus, negative: ThumbsDown };

    return (
        <div className="space-y-6">
            <div className="ct-page-header">
                <div><h2 className="ct-page-title"><MessageCircleHeart className="icon-glow" style={{ color: '#ec4899' }} size={24} /> Client Feedback Fusion</h2><p className="ct-page-subtitle">Track client satisfaction & sentiment analysis</p></div>
                <button onClick={handleAdd} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}><Plus size={14} /> Add Feedback</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total Reviews', value: String(feedback.length), color: '#3b82f6' },
                    { label: 'Avg Rating', value: `${avgRating}/5`, color: '#f59e0b' },
                    { label: 'NPS Score', value: `${nps > 0 ? '+' : ''}${nps}`, color: nps >= 0 ? '#22c55e' : '#ef4444' },
                    { label: 'Positive', value: `${feedback.length ? Math.round(positive / feedback.length * 100) : 0}%`, color: '#22c55e' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-3">
                {feedback.sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, idx) => {
                    const Icon = SentimentIcon[item.sentiment] || Minus;
                    return (
                        <motion.div key={item.id} className="ct-card" style={{ padding: 18 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div style={{ background: `${sentimentColors[item.sentiment]}15`, border: `1px solid ${sentimentColors[item.sentiment]}30`, borderRadius: 8, padding: 6, display: 'flex' }}>
                                        <Icon size={16} style={{ color: sentimentColors[item.sentiment] }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>{item.client}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.project} · {new Date(item.date).toLocaleDateString()}</div>
                                        <div className="flex items-center gap-1 mt-1">
                                            {Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill={i < item.rating ? '#f59e0b' : 'none'} stroke={i < item.rating ? '#f59e0b' : '#d1d5db'} />)}
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: '#374151', marginTop: 6, lineHeight: 1.5 }}>"{item.comment}"</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => handleEdit(item)} style={tinyBtn}><Edit2 size={11} style={{ color: '#3b82f6' }} /></button>
                                    <button onClick={() => handleDelete(item.id)} style={tinyBtn}><Trash2 size={11} style={{ color: '#ef4444' }} /></button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={overlayStyle} onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={modalStyle} onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5"><h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{editItem ? 'Edit' : 'Add'} Feedback</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button></div>
                            <div className="space-y-3">
                                <div><label style={labelStyle}>Client</label><input value={form.client || ''} onChange={e => setForm({ ...form, client: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Project</label><input value={form.project || ''} onChange={e => setForm({ ...form, project: e.target.value })} style={inputStyle} /></div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div><label style={labelStyle}>Rating (1-5)</label><input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} style={inputStyle} /></div>
                                    <div><label style={labelStyle}>Sentiment</label><select value={form.sentiment} onChange={e => setForm({ ...form, sentiment: e.target.value })} style={inputStyle}><option value="positive">Positive</option><option value="neutral">Neutral</option><option value="negative">Negative</option></select></div>
                                    <div><label style={labelStyle}>Date</label><input type="date" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} /></div>
                                </div>
                                <div><label style={labelStyle}>Comment</label><textarea value={form.comment || ''} onChange={e => setForm({ ...form, comment: e.target.value })} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} /></div>
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
const saveBtn = { flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #ec4899, #db2777)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' };
