import React from 'react';
import { motion } from 'motion/react';

export default function IndustryCard({ icon, title, description, color, useCase }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative p-1 rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent hover:from-[#5227FF]/50 transition-all duration-500"
        >
            <div className="absolute inset-0 bg-slate-950 rounded-2xl m-[1px] z-0"></div>
            <div className="relative z-10 p-7 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 ${color} group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

                <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-[#5227FF]/20 transition-colors">
                    <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Use Case</div>
                    <div className="text-sm text-slate-200">{useCase}</div>
                </div>
            </div>
        </motion.div>
    );
}
