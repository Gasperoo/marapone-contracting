import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight, TrendingUp,
    TrendingDown, FileText, Zap, Clock, Send, ChevronRight
} from 'lucide-react';
import { getCashFlowForecast } from './constructionServices';

export function CashFlowGuardian() {
    const data = getCashFlowForecast();
    const [selectedAlert, setSelectedAlert] = useState(null);

    const maxVal = Math.max(...data.weeks.map(w => Math.max(w.inflow, w.outflow, Math.abs(w.balance))));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <DollarSign className="text-[#FF6B00]" size={24} />
                        Cash Flow Guardian™
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Proactive cash defense for construction SMBs</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5">
                        <Zap size={12} />
                        AI-Analyzed · 8 Week Forecast
                    </div>
                </div>
            </div>

            {/* Cash Flow Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Cash Flow Timeline</h3>
                <div className="flex items-end gap-3 h-[200px]">
                    {data.weeks.map((week, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex-1 flex flex-col items-center gap-1"
                        >
                            <div className="w-full flex gap-[2px] items-end h-[160px]">
                                {/* Inflow bar */}
                                <div
                                    className="flex-1 rounded-t-md bg-green-500/60 border border-green-500/30 transition-all hover:bg-green-500/80"
                                    style={{ height: `${(week.inflow / maxVal) * 100}%` }}
                                    title={`Inflow: $${week.inflow.toLocaleString()}`}
                                />
                                {/* Outflow bar */}
                                <div
                                    className="flex-1 rounded-t-md bg-red-500/60 border border-red-500/30 transition-all hover:bg-red-500/80"
                                    style={{ height: `${(week.outflow / maxVal) * 100}%` }}
                                    title={`Outflow: $${week.outflow.toLocaleString()}`}
                                />
                            </div>
                            {/* Balance indicator */}
                            <div className={`text-[10px] font-mono font-bold ${week.balance < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                {week.balance < 0 ? '-' : '+'}${Math.abs(week.balance / 1000).toFixed(0)}K
                            </div>
                            <div className="text-[10px] text-slate-500">{week.week}</div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex items-center gap-6 mt-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-green-500/60" /> Inflow</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-500/60" /> Outflow</span>
                </div>
            </div>

            {/* AI Alerts + Invoices */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Alerts */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-400" />
                        AI Cash Alerts
                    </h3>
                    <div className="space-y-3">
                        {data.alerts.map((alert, idx) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.08 }}
                                onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${alert.severity === 'critical' ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40' :
                                        alert.severity === 'warning' ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40' :
                                            'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                                            alert.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-300 leading-snug">{alert.message}</p>
                                        {selectedAlert === alert.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-3 pt-3 border-t border-white/10"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-[#FF6B00] font-bold flex items-center gap-1">
                                                        <Zap size={10} /> {alert.action}
                                                    </span>
                                                    <span className="text-xs text-green-400 font-bold">Save {alert.savingsEstimate}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Invoices */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <FileText size={16} className="text-[#FF6B00]" />
                        Invoice Tracker
                    </h3>
                    <div className="space-y-2">
                        {data.invoices.map((inv, idx) => (
                            <motion.div
                                key={inv.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <div>
                                    <div className="text-sm text-white font-medium">{inv.client}</div>
                                    <div className="text-xs text-slate-500">{inv.id} · {inv.project}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-white">${inv.amount.toLocaleString()}</div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${inv.status === 'overdue' ? 'bg-red-500/20 text-red-400' :
                                                inv.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                            }`}>{inv.status.toUpperCase()}</span>
                                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5"><Clock size={8} /> {inv.age}d</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Material Cost Tracker */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#FF6B00]" />
                    Material Cost Monitor
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.materialCosts.map((mat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.06 }}
                            className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                            <div className="text-xs text-slate-500 mb-1">{mat.material}</div>
                            <div className="text-lg font-bold text-white">${mat.current}</div>
                            <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${mat.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                                {mat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {mat.change}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Generate Cash Report', 'Accelerate All Overdue', 'Draft Extension Requests'].map((action, i) => (
                    <button key={i} className="h-12 border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/5 hover:border-white/20 text-white text-sm flex items-center justify-center gap-2 transition-all group">
                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#FF6B00] transition-colors" />
                        {action}
                        <ChevronRight size={14} className="text-white/30 group-hover:text-[#FF6B00] transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    );
}
