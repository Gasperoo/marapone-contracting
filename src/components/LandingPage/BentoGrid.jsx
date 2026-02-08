import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Cpu, Zap, Shield, X, ArrowRight } from 'lucide-react';

export function BentoGrid() {
    const [selectedId, setSelectedId] = useState(null);

    const items = [
        {
            id: 'global',
            title: 'Global Reach',
            subtitle: 'Real-time data from 200+ countries.',
            description: 'Our network spans the entire globe, integrating data from local carriers, port authorities, and satellite feeds. Whether your cargo is on a ship in the Pacific or a truck in Hamburg, you have total visibility.',
            icon: <Globe size={40} className="text-[#5227FF]" />,
            className: "md:col-span-2 md:row-span-2",
            bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        },
        {
            id: 'ai',
            title: 'AI Core',
            subtitle: 'Predictive intelligence.',
            description: 'Gasper’s AI doesn’t just report what happened; it predicts what will happen. We analyze weather patterns, strike probabilities, and historical route performance to forecast delays days in advance.',
            icon: <Cpu size={40} className="text-cyan-400" />,
            className: "md:col-span-1 md:row-span-3",
            gradient: "from-cyan-500/10 via-transparent to-transparent"
        },
        {
            id: 'speed',
            title: '<50ms Latency',
            subtitle: 'Instant updates.',
            description: 'In logistics, speed is currency. Our distributed edge infrastructure ensures that when a status changes in the real world, it changes on your dashboard in milliseconds.',
            icon: <Zap size={32} className="text-amber-400" />,
            className: "md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center"
        },
        {
            id: 'security',
            title: 'SOC2 Compliant',
            subtitle: 'Bank-grade security.',
            description: 'Your supply chain data is sensitive. We encrypt it at rest and in transit, and our platform is rigorously audited to meet the highest enterprise security standards.',
            icon: <Shield size={32} className="text-green-400" />,
            className: "md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center"
        }
    ];

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Gasper?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Click any card to explore our core capabilities.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-6 h-[800px] md:h-[600px]">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layoutId={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#5227FF]/50 transition-colors cursor-pointer ${item.className}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {item.bgImage && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-[#5227FF]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="mb-4">{item.icon}</div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-slate-400 line-clamp-2">{item.subtitle}</p>
                                    </div>
                                    <div className={`w-full h-32 bg-cover bg-center rounded-xl opacity-60 mix-blend-screen grayscale group-hover:grayscale-0 transition-all duration-500`} style={{ backgroundImage: `url(${item.bgImage})` }} />
                                </div>
                            </>
                        )}

                        {item.gradient && (
                            <>
                                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="mb-4">{item.icon}</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-400 mb-4">{item.subtitle}</p>

                                    {/* Abstract Visual for AI */}
                                    <div className="mt-auto space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                                                <div className="h-full bg-cyan-500/50 rounded-full w-[80%]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {!item.bgImage && !item.gradient && (
                            <>
                                <div className="mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                {item.subtitle && <p className="text-slate-400 text-sm mt-2">{item.subtitle}</p>}
                            </>
                        )}
                    </motion.div>
                ))}

                {/* Integration Box (Static link) */}
                <motion.div
                    className="md:col-span-3 md:row-span-1 bg-gradient-to-r from-[#5227FF] to-cyan-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-lg shadow-cyan-500/20"
                    whileHover={{ scale: 1.01 }}
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

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={selectedId}
                            className="bg-[#0f172a] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 shadow-2xl"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                            >
                                <X size={20} />
                            </button>

                            {(() => {
                                const item = items.find(i => i.id === selectedId);
                                return item ? (
                                    <div className="p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-4 bg-white/5 rounded-2xl">{item.icon}</div>
                                            <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                                        </div>
                                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                            {item.description}
                                        </p>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setSelectedId(null)}
                                                className="px-6 py-2 bg-[#5227FF] text-white rounded-lg font-semibold hover:bg-[#4319cc] transition-colors"
                                            >
                                                Got it
                                            </button>
                                        </div>
                                    </div>
                                ) : null;
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}



