import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu } from 'lucide-react';

export default function ProcessStep({ number, title, description, icon, align, details }) {
    const isLeft = align === 'left';
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`flex flex-col md:flex-row items-center gap-8 mb-24 relative z-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`md:w-1/2 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} w-full`}
            >
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 w-full max-w-lg cursor-pointer hover:border-[#5227FF]/50 transition-all duration-300 group
                        ${isOpen ? 'border-[#5227FF] bg-black/60 shadow-[0_0_30px_rgba(82,39,255,0.15)]' : ''}
                    `}
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5227FF] to-[#22d3ee] rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-sm"></div>

                    <div className="relative z-10">
                        <div className="text-[#5227FF] text-xs font-bold tracking-widest mb-4 flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-[#5227FF]/10 border border-[#5227FF]/20">STEP {number}</span>
                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                className="text-white/50"
                            >
                                ▼
                            </motion.span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#22d3ee] transition-colors">{title}</h3>
                        <p className="text-slate-400 mb-4 leading-relaxed">{description}</p>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 mt-4 border-t border-white/10">
                                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                            <Cpu size={14} className="text-[#22d3ee]" /> Technical Specs
                                        </h4>
                                        <ul className="space-y-2">
                                            {details && details.map((detail, idx) => (
                                                <li key={idx} className="text-xs text-slate-300 flex items-center bg-white/5 p-2 rounded-lg">
                                                    <div className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full mr-3" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Center Icon */}
            <div className="relative z-10 flex-shrink-0">
                <div className={`w-20 h-20 rounded-full bg-[#0f172a] border-2 flex items-center justify-center text-white shadow-[0_0_30px_rgba(82,39,255,0.3)] transition-all duration-500 z-20 relative ${isOpen ? 'border-[#22d3ee] text-[#22d3ee] scale-110' : 'border-[#5227FF] text-white'}`}>
                    {icon}
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-[#5227FF] animate-ping opacity-20"></div>
            </div>

            <div className="md:w-1/2" /> {/* Spacer */}
        </div>
    );
}
