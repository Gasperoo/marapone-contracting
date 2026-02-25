import React from 'react';
import { motion } from 'motion/react';
import {
    MapPinCheck, Car, Clock, Fuel, ArrowRight,
    Zap, TrendingUp, RefreshCw, FileText, BarChart3
} from 'lucide-react';
import { getSiteUtilizationData } from './constructionServices';

export function SiteArrivalOptimizer() {
    const data = getSiteUtilizationData();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <MapPinCheck className="text-[#FF6B00]" size={24} />
                        Site Arrival Optimizer™
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Fleet productivity & utilization intelligence</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5">
                    <Zap size={12} />
                    {data.dailyReport.productivityRecovered} Productivity Recovered
                </div>
            </div>

            {/* Daily Report KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                    { label: 'Billable Hours', value: data.dailyReport.totalBillableHours + 'h', color: 'text-green-400' },
                    { label: 'Total Idle', value: data.dailyReport.totalIdleTime, color: 'text-amber-400' },
                    { label: 'Avg Utilization', value: data.dailyReport.avgUtilization, color: 'text-[#FF6B00]' },
                    { label: 'Fuel Wasted', value: data.dailyReport.fuelWasted, color: 'text-red-400' },
                    { label: 'Date', value: data.dailyReport.date, color: 'text-white' },
                ].map((kpi, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                    >
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                        <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Vehicle Utilization Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 size={16} className="text-[#FF6B00]" />
                    Vehicle Utilization
                </h3>
                <div className="space-y-2">
                    {data.vehicles.map((vehicle, idx) => (
                        <motion.div
                            key={vehicle.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                        >
                            {/* Vehicle Info */}
                            <div className="w-36 flex-shrink-0">
                                <div className="text-sm text-white font-medium">{vehicle.name}</div>
                                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <MapPinCheck size={8} />{vehicle.site}
                                </div>
                            </div>

                            {/* Utilization Bar */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] text-slate-500">Utilization</span>
                                    <span className={`text-xs font-bold ${vehicle.utilization >= 80 ? 'text-green-400' :
                                            vehicle.utilization >= 40 ? 'text-amber-400' : 'text-red-400'
                                        }`}>{vehicle.utilization}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${vehicle.utilization}%` }}
                                        transition={{ delay: 0.2 + idx * 0.05, duration: 0.6 }}
                                        className={`h-full rounded-full ${vehicle.utilization >= 80 ? 'bg-green-500' :
                                                vehicle.utilization >= 40 ? 'bg-amber-500' : 'bg-red-500'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="flex items-center gap-4 flex-shrink-0 text-xs">
                                <div className="text-center">
                                    <div className="text-white font-bold">{vehicle.billableHours}h</div>
                                    <div className="text-[9px] text-slate-500">Billable</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-amber-400 font-bold">{vehicle.idle}</div>
                                    <div className="text-[9px] text-slate-500">Idle</div>
                                </div>
                                <div className="text-center">
                                    <div className={`font-bold ${vehicle.fuelWaste === '$0' ? 'text-green-400' : 'text-red-400'}`}>{vehicle.fuelWaste}</div>
                                    <div className="text-[9px] text-slate-500">Fuel Waste</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Reassignment Suggestions */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <RefreshCw size={16} className="text-[#FF6B00]" />
                        AI Reassignment Suggestions
                    </h3>
                    <div className="space-y-3">
                        {data.reassignments.map((reassign, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.08 }}
                                className="p-4 rounded-xl bg-[#FF6B00]/5 border border-[#FF6B00]/15 hover:border-[#FF6B00]/30 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Car size={14} className="text-[#FF6B00]" />
                                    <span className="text-sm text-white font-medium">{reassign.vehicle}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                    <span className="text-red-400/70">{reassign.from}</span>
                                    <ArrowRight size={10} className="text-[#FF6B00]" />
                                    <span className="text-green-400">{reassign.to}</span>
                                </div>
                                <p className="text-[11px] text-slate-500">{reassign.reason}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-green-400 font-bold">Save {reassign.savings}</span>
                                    <span className="text-xs text-slate-500 group-hover:text-[#FF6B00] flex items-center gap-1 transition-colors">
                                        Apply <ArrowRight size={10} />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Site Activity Summary */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#FF6B00]" />
                        Site Activity Summary
                    </h3>
                    <div className="space-y-3">
                        {data.siteActivity.map((site, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.06 }}
                                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white font-medium">{site.site}</span>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${site.peakVehicles > 0 ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                                        }`}>{site.peakVehicles > 0 ? 'ACTIVE' : 'IDLE'}</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-[10px]">
                                    <div><span className="text-slate-500">Arrivals:</span> <span className="text-white font-bold">{site.arrivals}</span></div>
                                    <div><span className="text-slate-500">Departures:</span> <span className="text-white font-bold">{site.departures}</span></div>
                                    <div><span className="text-slate-500">First In:</span> <span className="text-white font-bold">{site.firstArrival || '—'}</span></div>
                                    <div><span className="text-slate-500">Peak:</span> <span className="text-white font-bold">{site.peakVehicles} vehicles</span></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Export Daily Report', 'Share Client Proof', 'Optimize Tomorrow\'s Routes'].map((action, i) => (
                    <button key={i} className="h-12 border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/5 hover:border-white/20 text-white text-sm flex items-center justify-center gap-2 transition-all group">
                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#FF6B00] transition-colors" />
                        {action}
                        <ArrowRight size={14} className="text-white/30 group-hover:text-[#FF6B00] transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    );
}
