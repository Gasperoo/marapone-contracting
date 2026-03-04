import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    DollarSign, AlertTriangle, TrendingUp, Clock, Shield, Lightbulb,
    Plus, X, Edit2, Trash2, Check, FileText, Send
} from 'lucide-react';
import { DataStore } from '../../services/ConstructionDataStore';
import '../../styles/ConstructionTool.css';

export function CashFlowGuardian() {
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(null); // 'invoice' | 'payable' | null
    const [editItem, setEditItem] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'invoices' | 'payables'

    // Form state
    const [form, setForm] = useState({});

    useEffect(() => { refresh(); }, []);

    const refresh = () => {
        if (!DataStore.isSeeded()) DataStore.seed();
        setData(DataStore.getCashFlowSummary());
    };

    const handleAddInvoice = () => {
        setEditItem(null);
        setForm({ client: '', project: '', amount: '', dueDate: '', description: '', status: 'sent' });
        setShowModal('invoice');
    };

    const handleAddPayable = () => {
        setEditItem(null);
        setForm({ vendor: '', project: '', amount: '', dueDate: '', description: '', status: 'pending' });
        setShowModal('payable');
    };

    const handleEditInvoice = (inv) => {
        setEditItem(inv);
        setForm({ ...inv, amount: String(inv.amount), dueDate: inv.dueDate?.split('T')[0] || '' });
        setShowModal('invoice');
    };

    const handleEditPayable = (pay) => {
        setEditItem(pay);
        setForm({ ...pay, amount: String(pay.amount), dueDate: pay.dueDate?.split('T')[0] || '' });
        setShowModal('payable');
    };

    const handleSave = () => {
        const payload = { ...form, amount: parseFloat(form.amount) || 0, dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : new Date().toISOString() };
        if (showModal === 'invoice') {
            if (editItem) DataStore.updateInvoice(editItem.id, payload);
            else DataStore.addInvoice(payload);
        } else {
            if (editItem) DataStore.updatePayable(editItem.id, payload);
            else DataStore.addPayable(payload);
        }
        setShowModal(null);
        refresh();
    };

    const handleDeleteInvoice = (id) => { DataStore.deleteInvoice(id); refresh(); };
    const handleDeletePayable = (id) => { DataStore.deletePayable(id); refresh(); };
    const handleMarkPaid = (type, id) => {
        if (type === 'invoice') DataStore.updateInvoice(id, { status: 'paid' });
        else DataStore.updatePayable(id, { status: 'paid' });
        refresh();
    };

    if (!data) return null;
    const maxVal = Math.max(1, ...data.monthly.map(m => Math.max(m.inflow, m.outflow)));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <DollarSign className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Cash Flow Guardian
                    </h2>
                    <p className="ct-page-subtitle">Live financial intelligence — add your invoices & payables</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleAddInvoice} className="ct-btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                        <Plus size={14} /> Add Invoice (AR)
                    </button>
                    <button onClick={handleAddPayable} className="ct-btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                        <Plus size={14} /> Add Payable (AP)
                    </button>
                    <div className={`ct-badge ${data.healthScore >= 80 ? 'ct-badge-green' : data.healthScore >= 50 ? 'ct-badge-amber' : 'ct-badge-red'} ct-badge-live`}>
                        <Shield size={10} /> Health: {data.healthScore}/100
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                    { label: 'Cash Balance', value: `$${Math.abs(data.cashBalance).toLocaleString()}`, color: data.cashBalance >= 0 ? '#22c55e' : '#ef4444' },
                    { label: 'AR Outstanding', value: `$${data.outstandingAR.toLocaleString()}`, color: '#f59e0b' },
                    { label: 'AP Due', value: `$${data.outstandingAP.toLocaleString()}`, color: '#a855f7' },
                    { label: 'Runway', value: `${data.runway} mo`, color: '#3b82f6' },
                    { label: 'Total Invoices', value: String(data.invoices.length), color: '#6b7280' },
                ].map((kpi, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': kpi.color }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <div className="ct-kpi-label">{kpi.label}</div>
                        <div className="ct-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                {[{ id: 'overview', label: 'Overview' }, { id: 'invoices', label: `Invoices (${data.invoices.length})` }, { id: 'payables', label: `Payables (${data.payables.length})` }].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`ct-tab ${activeTab === tab.id ? 'ct-tab-active' : ''}`}
                        style={{ padding: '6px 14px', fontSize: '0.75rem', borderRadius: 8, fontWeight: 600, border: '1px solid', borderColor: activeTab === tab.id ? '#FF6B00' : 'rgba(0,0,0,0.08)', background: activeTab === tab.id ? 'rgba(255,107,0,0.08)' : 'rgba(0,0,0,0.02)', color: activeTab === tab.id ? '#FF6B00' : '#6b7280', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <>
                    {/* Cash Flow Chart */}
                    <div className="ct-card" style={{ padding: 24 }}>
                        <h3 className="ct-section-header">
                            <TrendingUp size={15} className="ct-section-icon" />
                            Cash Flow Forecast
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 200, paddingTop: 20 }}>
                            {data.monthly.map((month, idx) => (
                                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                    <motion.div className="ct-chart-bar" style={{ width: '40%', background: 'linear-gradient(180deg, #22c55e, rgba(34,197,94,0.5))' }}
                                        initial={{ height: 0 }} animate={{ height: `${(month.inflow / maxVal) * 150}px` }} transition={{ delay: 0.2 + idx * 0.05, duration: 0.5 }} />
                                    <motion.div className="ct-chart-bar" style={{ width: '40%', background: 'linear-gradient(180deg, #ef4444, rgba(239,68,68,0.5))', borderRadius: '0 0 6px 6px' }}
                                        initial={{ height: 0 }} animate={{ height: `${(month.outflow / maxVal) * 150}px` }} transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }} />
                                    <div style={{ fontSize: '0.55rem', color: '#6b7280', marginTop: 4, fontWeight: 600 }}>{month.month}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', color: '#9ca3af' }}>
                                <div style={{ width: 10, height: 10, borderRadius: 3, background: '#22c55e' }} /> Inflow (AR)
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', color: '#9ca3af' }}>
                                <div style={{ width: 10, height: 10, borderRadius: 3, background: '#ef4444' }} /> Outflow (AP)
                            </div>
                        </div>
                    </div>

                    {/* Alerts + Upcoming */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="ct-card" style={{ padding: 24 }}>
                            <h3 className="ct-section-header"><AlertTriangle size={15} className="ct-section-icon" /> AI Cash Alerts</h3>
                            <div className="space-y-3">
                                {data.alerts.length === 0 && <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>No alerts — your cash flow looks healthy!</p>}
                                {data.alerts.map((alert, idx) => (
                                    <motion.div key={idx} className={`ct-alert ct-alert-${alert.severity}`}
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.08 }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{alert.title}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: 8 }}>{alert.description}</div>
                                        <div className="ct-ai-suggestion">
                                            <Lightbulb size={12} className="ai-icon" />
                                            <div>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FF6B00' }}>AI Fix: </span>
                                                <span style={{ fontSize: '0.65rem', color: '#6b7280' }}>{alert.suggestion}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="ct-card" style={{ padding: 24 }}>
                            <h3 className="ct-section-header"><Clock size={15} className="ct-section-icon" /> Upcoming Payments</h3>
                            <div className="space-y-2">
                                {[...data.invoices.filter(i => i.status !== 'paid'), ...data.payables.filter(p => p.status !== 'paid')]
                                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                                    .slice(0, 6)
                                    .map((item, idx) => {
                                        const isInvoice = !!item.client;
                                        return (
                                            <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.05 }}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>{isInvoice ? item.client : item.vendor}</div>
                                                    <div style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: 2 }}>{item.project} · Due: {new Date(item.dueDate).toLocaleDateString()}</div>
                                                </div>
                                                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <div>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isInvoice ? '#22c55e' : '#ef4444' }}>${parseFloat(item.amount).toLocaleString()}</div>
                                                        <span className={`ct-badge ${isInvoice ? 'ct-badge-green' : 'ct-badge-red'}`} style={{ fontSize: '0.5rem', padding: '2px 6px' }}>
                                                            {isInvoice ? 'IN' : 'OUT'}
                                                        </span>
                                                    </div>
                                                    <button onClick={() => handleMarkPaid(isInvoice ? 'invoice' : 'payable', item.id)} title="Mark as Paid"
                                                        style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 6, padding: 4, cursor: 'pointer', color: '#22c55e' }}>
                                                        <Check size={12} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'invoices' && (
                <div className="ct-card" style={{ padding: 24 }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="ct-section-header" style={{ margin: 0 }}><FileText size={15} className="ct-section-icon" /> All Invoices (AR)</h3>
                        <button onClick={handleAddInvoice} className="ct-btn-primary" style={{ fontSize: '0.7rem', padding: '5px 10px' }}><Plus size={12} /> Add</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                                    <th style={thStyle}>Client</th><th style={thStyle}>Project</th><th style={thStyle}>Amount</th><th style={thStyle}>Due</th><th style={thStyle}>Status</th><th style={thStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.invoices.map(inv => (
                                    <tr key={inv.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={tdStyle}>{inv.client}</td>
                                        <td style={tdStyle}>{inv.project}</td>
                                        <td style={{ ...tdStyle, fontWeight: 700, color: '#22c55e' }}>${parseFloat(inv.amount).toLocaleString()}</td>
                                        <td style={tdStyle}>{new Date(inv.dueDate).toLocaleDateString()}</td>
                                        <td style={tdStyle}>
                                            <span className={`ct-badge ${inv.status === 'paid' ? 'ct-badge-green' : inv.status === 'overdue' ? 'ct-badge-red' : 'ct-badge-amber'}`} style={{ fontSize: '0.6rem' }}>{inv.status}</span>
                                        </td>
                                        <td style={tdStyle}>
                                            <div className="flex gap-1">
                                                {inv.status !== 'paid' && <button onClick={() => handleMarkPaid('invoice', inv.id)} style={actionBtn}><Check size={12} style={{ color: '#22c55e' }} /></button>}
                                                <button onClick={() => handleEditInvoice(inv)} style={actionBtn}><Edit2 size={12} style={{ color: '#3b82f6' }} /></button>
                                                <button onClick={() => handleDeleteInvoice(inv.id)} style={actionBtn}><Trash2 size={12} style={{ color: '#ef4444' }} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'payables' && (
                <div className="ct-card" style={{ padding: 24 }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="ct-section-header" style={{ margin: 0 }}><Send size={15} className="ct-section-icon" /> All Payables (AP)</h3>
                        <button onClick={handleAddPayable} className="ct-btn-primary" style={{ fontSize: '0.7rem', padding: '5px 10px' }}><Plus size={12} /> Add</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                                    <th style={thStyle}>Vendor</th><th style={thStyle}>Project</th><th style={thStyle}>Amount</th><th style={thStyle}>Due</th><th style={thStyle}>Status</th><th style={thStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.payables.map(pay => (
                                    <tr key={pay.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={tdStyle}>{pay.vendor}</td>
                                        <td style={tdStyle}>{pay.project}</td>
                                        <td style={{ ...tdStyle, fontWeight: 700, color: '#ef4444' }}>${parseFloat(pay.amount).toLocaleString()}</td>
                                        <td style={tdStyle}>{new Date(pay.dueDate).toLocaleDateString()}</td>
                                        <td style={tdStyle}>
                                            <span className={`ct-badge ${pay.status === 'paid' ? 'ct-badge-green' : pay.status === 'overdue' ? 'ct-badge-red' : 'ct-badge-amber'}`} style={{ fontSize: '0.6rem' }}>{pay.status}</span>
                                        </td>
                                        <td style={tdStyle}>
                                            <div className="flex gap-1">
                                                {pay.status !== 'paid' && <button onClick={() => handleMarkPaid('payable', pay.id)} style={actionBtn}><Check size={12} style={{ color: '#22c55e' }} /></button>}
                                                <button onClick={() => handleEditPayable(pay)} style={actionBtn}><Edit2 size={12} style={{ color: '#3b82f6' }} /></button>
                                                <button onClick={() => handleDeletePayable(pay.id)} style={actionBtn}><Trash2 size={12} style={{ color: '#ef4444' }} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
                        onClick={() => setShowModal(null)}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                            onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-5">
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>
                                    {editItem ? 'Edit' : 'Add'} {showModal === 'invoice' ? 'Invoice (AR)' : 'Payable (AP)'}
                                </h3>
                                <button onClick={() => setShowModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button>
                            </div>
                            <div className="space-y-3">
                                <FormField label={showModal === 'invoice' ? 'Client' : 'Vendor'} value={form[showModal === 'invoice' ? 'client' : 'vendor'] || ''} onChange={v => setForm({ ...form, [showModal === 'invoice' ? 'client' : 'vendor']: v })} />
                                <FormField label="Project" value={form.project || ''} onChange={v => setForm({ ...form, project: v })} />
                                <FormField label="Amount ($)" value={form.amount || ''} onChange={v => setForm({ ...form, amount: v })} type="number" />
                                <FormField label="Due Date" value={form.dueDate?.split('T')[0] || ''} onChange={v => setForm({ ...form, dueDate: v })} type="date" />
                                <FormField label="Description" value={form.description || ''} onChange={v => setForm({ ...form, description: v })} />
                                <div>
                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Status</label>
                                    <select value={form.status || 'pending'} onChange={e => setForm({ ...form, status: e.target.value })}
                                        style={inputStyle}>
                                        <option value="sent">Sent</option>
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="overdue">Overdue</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowModal(null)} style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                                <button onClick={handleSave} style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #FF6B00, #FFB800)', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,107,0,0.3)' }}>
                                    {editItem ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Simple helpers ───
function FormField({ label, value, onChange, type = 'text' }) {
    return (
        <div>
            <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>{label}</label>
            <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
        </div>
    );
}

const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.8rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' };
const thStyle = { textAlign: 'left', padding: '8px 10px', fontSize: '0.7rem', fontWeight: 600, color: '#6b7280' };
const tdStyle = { padding: '10px', fontSize: '0.8rem', color: '#374151' };
const actionBtn = { background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 6, padding: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' };
