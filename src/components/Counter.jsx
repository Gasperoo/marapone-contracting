import React, { useState, useEffect, useRef } from 'react';
import { useInView, useSpring } from 'motion/react';

export default function Counter({ value, label, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const springValue = useSpring(0, { stiffness: 50, damping: 20 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2 font-mono">
                {displayValue.toLocaleString()}{suffix}
            </div>
            <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold">{label}</div>
        </div>
    );
}
