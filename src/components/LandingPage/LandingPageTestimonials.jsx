import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        quote: "Gasper has completely transformed our logistics operations. The visibility we have now is unprecedented.",
        author: "Sarah Jenkins",
        role: "VP of Operations, GlobalFreight",
        rating: 5
    },
    {
        quote: "The predictive AI saved us over $2M in potential delay costs last quarter alone.",
        author: "Michael Chang",
        role: "Supply Chain Director, TechFlow",
        rating: 5
    },
    {
        quote: "Finally, a tool that actually integrates with our legacy systems without a headache.",
        author: "Elena Rodriguez",
        role: "CTO, Marapone Logistics",
        rating: 5
    }
];

export function LandingPageTestimonials() {
    return (
        <section className="py-24 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Trusted by Leaders</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0f172a] p-8 rounded-2xl border border-white/10 relative"
                        >
                            <div className="flex gap-1 text-amber-400 mb-4">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-300 mb-6 italic">"{t.quote}"</p>
                            <div>
                                <h4 className="text-white font-bold">{t.author}</h4>
                                <p className="text-sm text-slate-500">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
