import React from 'react';
import { motion } from 'motion/react';
import { Map, Zap, Shield, Cpu, Globe } from 'lucide-react';

export function BentoGrid() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Gasper?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    We combine speed, intelligence, and global reach into a single platform.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-6 h-[800px] md:h-[600px]">

                {/* Large Box - Global Reach */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 md:row-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#5227FF]/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5227FF]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <Globe className="text-[#5227FF] mb-4" size={40} />
                            <h3 className="text-2xl font-bold text-white mb-2">Global Reach</h3>
                            <p className="text-slate-400">Real-time data from 200+ countries, covering air, sea, and land routes instantly.</p>
                        </div>
                        <div className="w-full h-32 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-center rounded-xl opacity-60 mix-blend-screen grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                </motion.div>

                {/* Tall Box - AI Powered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-1 md:row-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 h-full flex flex-col">
                        <Cpu className="text-cyan-400 mb-4" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-2">AI Core</h3>
                        <p className="text-slate-400 mb-8">Our proprietary ML models predict delays 48 hours before they happen.</p>
                        <div className="mt-auto space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${80 + i * 5}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-cyan-500/50 rounded-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Medium Box - Speed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-1 md:row-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:bg-white/10 transition-colors"
                >
                    <Zap className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-xl font-bold text-white">&lt;50ms Latency</h3>
                </motion.div>

                {/* Medium Box - Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-1 md:row-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:bg-white/10 transition-colors"
                >
                    <Shield className="text-green-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-xl font-bold text-white">SOC2 Compliant</h3>
                </motion.div>

                {/* Wide Box - Integration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-3 md:row-span-1 bg-gradient-to-r from-[#5227FF] to-cyan-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-lg shadow-cyan-500/20"
                >
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold mb-2">Connect Your Stack</h3>
                        <p className="opacity-90">Seamless integration with SAP, Oracle, and 50+ other ERPs.</p>
                    </div>
                    <button className="px-6 py-3 bg-white text-[#5227FF] font-bold rounded-xl hover:bg-opacity-90 transition-colors">
                        View Documentation
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

