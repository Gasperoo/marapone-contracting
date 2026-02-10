import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function FeatureCard({ icon, title, description, details }) {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };
    const opacity = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        position.x.set(e.clientX - rect.left);
        position.y.set(e.clientY - rect.top);
    };

    const handleFocus = () => {
        setIsFocused(true);
        opacity.set(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        opacity.set(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-full rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden group"
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [position.x, position.y],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(82, 39, 255, 0.15), transparent 40%)`
                    ),
                }}
            />

            {/* Spotlight Border */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [position.x, position.y],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(82, 39, 255, 0.4), transparent 40%)`
                    ),
                    maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                }}
            />

            <div className="relative p-8 h-full flex flex-col z-10">
                <div className="w-14 h-14 rounded-xl bg-[#5227FF]/10 flex items-center justify-center text-[#5227FF] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(82,39,255,0.2)]">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#5227FF] transition-colors">{title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed flex-grow">{description}</p>

                <div className="pt-6 border-t border-white/5">
                    <ul className="grid grid-cols-1 gap-3">
                        {details.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-300">
                                <CheckCircle2 size={16} className="text-[#5227FF] mr-3 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
