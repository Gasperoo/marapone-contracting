import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Cpu, Globe, Rocket, Calendar } from 'lucide-react';

const milestones = [
    {
        year: '2019',
        title: 'Project Inception',
        description: 'A team of ex-enterprise architects and logistics veterans united in Zurich. The goal was simple: solve the data fragmentation problem.',
        icon: Target,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        border: 'border-orange-400/20'
    },
    {
        year: '2021',
        title: 'AI Core Activation',
        description: 'Successfully deployed our first neural network capable of predicting port congestion with 85% accuracy. Series A funding secured.',
        icon: Cpu,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10',
        border: 'border-cyan-400/20'
    },
    {
        year: '2023',
        title: 'Global Expansion',
        description: 'Opened strategic hubs in Singapore and San Francisco. Integrated with 50+ major carriers and customs databases.',
        icon: Globe,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20'
    },
    {
        year: '2026',
        title: 'Gasper Public Launch',
        description: 'Complete platform rollout. Introducing the world\'s first generative supply chain assistant. The future is here.',
        icon: Rocket,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20'
    }
];

export default function Evolution() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal scroll transform: Moves the content left as we scroll down
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#0f172a]">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Header */}
                <div className="absolute top-12 left-6 md:left-20 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5227FF]/10 text-[#5227FF] text-sm font-semibold mb-4 border border-[#5227FF]/20"
                    >
                        <Calendar size={14} />
                        <span>Strategic Roadmap</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Evolution</h2>
                    <p className="text-slate-400 max-w-md">From a whiteboard in Zurich to a global intelligence network.</p>
                </div>

                {/* Horizontal Scroll Container */}
                <motion.div style={{ x }} className="flex gap-12 pl-6 md:pl-20 items-center">
                    {milestones.map((item, index) => (
                        <div
                            key={index}
                            className={`relative min-w-[300px] md:min-w-[500px] h-[400px] md:h-[500px] rounded-3xl border ${item.border} ${item.bg} backdrop-blur-md overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}
                        >
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />
                            <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br from-${item.color.split('-')[1]}-500/20 to-transparent blur-3xl rounded-full translate-x-1/2 -translate-y-1/2`} />

                            <div className="absolute top-8 right-8">
                                <span className={`text-6xl md:text-8xl font-black opacity-10 ${item.color}`}>{item.year}</span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                <div className={`inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 ${item.color}`}>
                                    <item.icon size={32} />
                                </div>
                                <div className={`text-sm font-bold tracking-widest uppercase mb-2 ${item.color}`}>{item.year}</div>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-slate-300 text-lg leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                    {/* End Spacer */}
                    <div className="min-w-[20vw]" />
                </motion.div>

                {/* Progress Bar */}
                <div className="absolute bottom-12 left-6 right-6 md:left-20 md:right-20 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        style={{ scaleX: scrollYProgress }}
                        className="h-full bg-[#5227FF] origin-left"
                    />
                </div>
            </div>
        </section>
    );
}
