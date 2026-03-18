import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Zap, Ship, HardHat, Brain, Shield, BarChart3, Layers } from 'lucide-react';

export default function RuixenAbout() {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-6">

                {/* Dual Engine Hero */}
                <section className="mb-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 text-sm font-medium text-gray-400 shadow-sm">
                            <Layers size={14} className="text-[#FF6B00]" />
                            Unified Platform
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Two Engines. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#FF6B00]">One Vision.</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Marapone unifies supply chain intelligence and construction AI under a single architecture — purpose-built for industries that move and build the physical world.
                        </p>
                    </div>

                    {/* Engine Cards */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Logistics Engine */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="group relative rounded-3xl overflow-hidden border border-[#0EA5E9]/20 bg-white/5 p-8 md:p-10 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(14,165,233,0.12)] hover:border-[#0EA5E9]/40"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                            <div className="p-3 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 inline-flex mb-6">
                                <Ship className="text-[#0EA5E9] w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Logistics OS</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Real-time vessel tracking, predictive route optimization, automated HS code classification, and freight rate intelligence — all unified in one digital twin.
                            </p>
                            <div className="space-y-3 mb-8">
                                {['Global AIS Vessel Tracking', 'AI-Powered Risk Screening', 'Multi-Modal Visibility'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <Link to="/industries" className="inline-flex items-center text-[#0EA5E9] font-bold hover:text-[#38BDF8] transition-colors group/link">
                                Explore Logistics <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Construction Engine */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="group relative rounded-3xl overflow-hidden border border-[#FF6B00]/20 bg-white/5 p-8 md:p-10 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,107,0,0.12)] hover:border-[#FF6B00]/40"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                            <div className="p-3 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 inline-flex mb-6">
                                <HardHat className="text-[#FF6B00] w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Construction AI</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Blueprint intelligence, automated takeoffs, generative design, cash flow forecasting, and real-time site security — end-to-end project command.
                            </p>
                            <div className="space-y-3 mb-8">
                                {['Automated Blueprint Takeoffs', 'Predictive Cash Flow Engine', 'AI Site Security Monitoring'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-[#4b5563]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <Link to="/industries" className="inline-flex items-center text-[#FF6B00] font-bold hover:text-[#F59E0B] transition-colors group/link">
                                Explore Construction <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Platform Stats Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard value="12+" label="AI Agents" icon={<Brain size={20} className="text-[#FF6B00]" />} />
                        <StatCard value="99.9%" label="Uptime SLA" icon={<Shield size={20} className="text-[#0EA5E9]" />} />
                        <StatCard value="$5B+" label="Managed Value" icon={<BarChart3 size={20} className="text-[#F59E0B]" />} />
                        <StatCard value="Global" label="Coverage" icon={<Globe size={20} className="text-[#38BDF8]" />} />
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="text-center pb-8">
                    <div className="p-10 md:p-14 rounded-3xl border border-white/5 bg-white/5 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-10 bg-[#FF6B00] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full blur-[100px] opacity-10 bg-[#0EA5E9] pointer-events-none" />

                        <div className="relative z-10">
                            <Zap size={28} className="text-[#FF6B00] mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Operations?</h3>
                            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
                                Whether you're moving cargo across oceans or building skyscrapers, Marapone's AI platform delivers the intelligence edge you need.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] shadow-[0_8px_25px_rgba(255,107,0,0.25)] hover:-translate-y-1 transition-all">
                                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

function StatCard({ value, label, icon }) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center hover:shadow-md transition-shadow group">
            <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
        </div>
    );
}
