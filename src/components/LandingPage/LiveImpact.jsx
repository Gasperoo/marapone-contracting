import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Activity, ShieldCheck, Truck, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function LiveImpact() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[#0f172a]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold mb-6 border border-green-500/20 animate-pulse">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        LIVE NETWORK ACTIVITY
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">Real-Time Global Impact</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        See how Gasper is optimizing supply chains around the world right now.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    <StatCard
                        icon={<Truck className="text-[#22d3ee]" />}
                        label="Active Shipments"
                        value={14203}
                        suffix=""
                        delay={0}
                    />
                    <StatCard
                        icon={<ShieldCheck className="text-[#5227FF]" />}
                        label="Risks Mitigated"
                        value={849}
                        suffix=""
                        delay={0.1}
                    />
                    <StatCard
                        icon={<Clock className="text-[#c084fc]" />}
                        label="Hours Saved"
                        value={12500}
                        suffix="+"
                        delay={0.2}
                    />
                    <StatCard
                        icon={<Users className="text-emerald-400" />}
                        label="Active Users"
                        value={2840}
                        suffix=""
                        delay={0.3}
                    />
                </div>

                {/* Live Ticker */}
                <div className="w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="flex items-center py-3 bg-white/5 border-b border-white/5 px-4">
                        <Activity size={16} className="text-[#5227FF] mr-2" />
                        <span className="text-xs font-bold text-white tracking-wider">LIVE EVENT LOG</span>
                    </div>
                    <div className="py-4 relative flex overflow-x-hidden">
                        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
                            <TickerItem type="success" text="Route optimization complete: Shanghai -> Rotterdam (Saved 4h)" />
                            <TickerItem type="warning" text="Risk detected: Port congestion at LAX. Alternate route suggested." />
                            <TickerItem type="neutral" text="New supplier verified: Apex Electronics (Vietnam)" />
                            <TickerItem type="success" text="Customs clearance approved: Shipment #88291 (JFK)" />
                            <TickerItem type="warning" text="Weather alert: Typhoon approaching South China Sea" />
                            <TickerItem type="neutral" text="Data sync complete: SAP Integration" />
                            {/* Duplicate for seamless loop */}
                            <TickerItem type="success" text="Route optimization complete: Shanghai -> Rotterdam (Saved 4h)" />
                            <TickerItem type="warning" text="Risk detected: Port congestion at LAX. Alternate route suggested." />
                            <TickerItem type="neutral" text="New supplier verified: Apex Electronics (Vietnam)" />
                            <TickerItem type="success" text="Customs clearance approved: Shipment #88291 (JFK)" />
                        </div>
                        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 items-center">
                            {/* Second marquee layer if needed for css animation style, but single long line usually works with one animation if duplicated content. 
                               Using a simpler single-track marquee for now. */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon, label, value, suffix, delay }) {
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const rounded = useTransform(spring, (latest) => Math.floor(latest).toLocaleString());

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5227FF]/30 transition-colors"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-white/5">
                    {React.cloneElement(icon, { size: 24 })}
                </div>
                <div className="text-slate-400 text-sm font-medium">{label}</div>
            </div>
            <div className="text-4xl font-bold text-white">
                <motion.span>{rounded}</motion.span>{suffix}
            </div>
        </motion.div>
    );
}

function TickerItem({ type, text }) {
    const colors = {
        success: 'text-emerald-400',
        warning: 'text-yellow-400',
        neutral: 'text-slate-300'
    };

    const icons = {
        success: <CheckCircle size={14} />,
        warning: <AlertTriangle size={14} />,
        neutral: <Activity size={14} />
    };

    return (
        <div className="flex items-center gap-2 text-sm">
            <span className={colors[type]}>{icons[type]}</span>
            <span className="text-slate-300 font-mono">{text}</span>
        </div>
    );
}
