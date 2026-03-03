import React from 'react';

const logos = [
    "MAERSK", "MSC", "CMA CGM", "HAPAG-LLOYD", "EVERGREEN", "ONE", "COSCO", "YANG MING"
];

export function LogoMarquee() {
    return (
        <section className="py-12 border-y border-[#1a1a1a]/5 overflow-hidden relative z-10 bg-[#f9fafb]/50">
            <p className="text-center text-[#6b7280] text-sm font-bold uppercase tracking-widest mb-10">Trusted by Global Logistics Leaders</p>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-16 px-8">
                    {logos.map((logo, i) => (
                        <span key={i} className="text-2xl font-bold font-mono text-[#1a1a1a]/30">{logo}</span>
                    ))}
                    {logos.map((logo, i) => (
                        <span key={`duplicate-${i}`} className="text-2xl font-bold font-mono text-[#1a1a1a]/30">{logo}</span>
                    ))}
                    {logos.map((logo, i) => (
                        <span key={`duplicate-2-${i}`} className="text-2xl font-bold font-mono text-[#1a1a1a]/30">{logo}</span>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 px-8">
                    {logos.map((logo, i) => (
                        <span key={i} className="text-2xl font-bold font-mono text-[#1a1a1a]/30">{logo}</span>
                    ))}
                    {logos.map((logo, i) => (
                        <span key={`duplicate-${i}`} className="text-2xl font-bold font-mono text-[#1a1a1a]/30">{logo}</span>
                    ))}
                    {logos.map((logo, i) => (
                        <span key={`duplicate-2-${i}`} className="text-2xl font-bold font-mono text-[#1a1a1a]/30">{logo}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
