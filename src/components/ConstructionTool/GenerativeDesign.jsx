import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Boxes, Cpu, Maximize, RotateCw, Layers, Zap, Eye,
    Star, ArrowRight, Settings, Grid3X3, BarChart3
} from 'lucide-react';

const designVariants = [
    { id: 'A', name: 'Open Floor Plan', score: 92, space: '94%', structural: 'A+', cost: '$2.4M', natural_light: '87%', selected: true },
    { id: 'B', name: 'Modular Layout', score: 88, space: '91%', structural: 'A', cost: '$2.1M', natural_light: '79%' },
    { id: 'C', name: 'L-Shape Config', score: 85, space: '88%', structural: 'A+', cost: '$2.3M', natural_light: '83%' },
    { id: 'D', name: 'Atrium Core', score: 79, space: '82%', structural: 'B+', cost: '$2.7M', natural_light: '95%' },
];

const parameters = [
    { name: 'Max Floor Area', value: '4,200 m²', icon: Grid3X3 },
    { name: 'Min Natural Light', value: '75%', icon: Eye },
    { name: 'Structural Load', value: '4.5 kPa', icon: Layers },
    { name: 'Target Budget', value: '$2.5M', icon: BarChart3 },
];

export function GenerativeDesign() {
    const [selectedVariant, setSelectedVariant] = useState('A');
    const [isGenerating, setIsGenerating] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Boxes className="text-[#a855f7]" size={24} />
                        Generative Design Studio
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">AI-driven 3D design optimization & space planning</p>
                </div>
                <button
                    onClick={() => { setIsGenerating(true); setTimeout(() => setIsGenerating(false), 2000); }}
                    className="px-4 py-2 bg-gradient-to-r from-[#a855f7] to-[#FF6B00] hover:brightness-110 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                >
                    <Cpu size={16} className={isGenerating ? 'animate-spin' : ''} />
                    {isGenerating ? 'Generating...' : 'Generate Variants'}
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* 3D Viewer */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                        <div className="text-sm text-white font-medium">3D Viewport — Variant {selectedVariant}</div>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><RotateCw size={14} /></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Maximize size={14} /></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Settings size={14} /></button>
                        </div>
                    </div>

                    {/* 3D Isometric View (CSS) */}
                    <div className="relative h-[450px] bg-[#080b10] flex items-center justify-center overflow-hidden">
                        {/* Grid floor */}
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)',
                            backgroundSize: '30px 30px',
                            transform: 'perspective(500px) rotateX(40deg)',
                            transformOrigin: 'center bottom'
                        }} />

                        {/* Isometric Building */}
                        <div className="relative" style={{ transform: 'rotateX(-20deg) rotateY(30deg)', transformStyle: 'preserve-3d' }}>
                            {/* Base/Foundation */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative"
                            >
                                {/* Floor 1 */}
                                <div className="w-64 h-48 border-2 border-[#a855f7]/40 bg-[#a855f7]/5 rounded-lg relative mb-[-1px]">
                                    {/* Room divisions */}
                                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-[#a855f7]/20" />
                                    <div className="absolute top-1/2 left-0 right-0 h-px bg-[#a855f7]/20" />
                                    {/* Room labels */}
                                    <div className="absolute top-3 left-3 text-[8px] text-[#a855f7]/60 font-mono">LOBBY</div>
                                    <div className="absolute top-3 right-3 text-[8px] text-[#a855f7]/60 font-mono text-right">OFFICE A</div>
                                    <div className="absolute bottom-3 left-3 text-[8px] text-[#a855f7]/60 font-mono">MEETING</div>
                                    <div className="absolute bottom-3 right-3 text-[8px] text-[#a855f7]/60 font-mono text-right">OFFICE B</div>
                                    {/* Floor label */}
                                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] text-[#a855f7] font-bold -rotate-90">FL 1</div>
                                </div>
                                {/* Floor 2 */}
                                <div className="w-64 h-40 border-2 border-[#3b82f6]/40 bg-[#3b82f6]/5 rounded-lg relative mb-[-1px]">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#3b82f6]/20" />
                                    <div className="absolute top-4 left-4 text-[8px] text-[#3b82f6]/60 font-mono">OPEN PLAN</div>
                                    <div className="absolute bottom-4 right-4 text-[8px] text-[#3b82f6]/60 font-mono">BREAK ROOM</div>
                                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] text-[#3b82f6] font-bold -rotate-90">FL 2</div>
                                </div>
                                {/* Roof */}
                                <div className="w-64 h-6 border-2 border-[#FF6B00]/40 bg-[#FF6B00]/10 rounded-t-lg relative">
                                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] text-[#FF6B00] font-bold -rotate-90">ROOF</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Structural analysis overlay dots */}
                        <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] text-xs font-bold flex items-center gap-1.5">
                            <Eye size={12} />
                            Structural Analysis Active
                        </div>

                        {/* Metrics overlay */}
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between gap-8">
                                <span className="text-[10px] text-slate-500 uppercase">Space Util.</span>
                                <span className="text-sm font-mono text-green-400">94%</span>
                            </div>
                            <div className="flex items-center justify-between gap-8">
                                <span className="text-[10px] text-slate-500 uppercase">Natural Light</span>
                                <span className="text-sm font-mono text-amber-400">87%</span>
                            </div>
                            <div className="flex items-center justify-between gap-8">
                                <span className="text-[10px] text-slate-500 uppercase">Struct. Grade</span>
                                <span className="text-sm font-mono text-[#a855f7]">A+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-4">
                    {/* Design Parameters */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Settings size={16} className="text-[#a855f7]" />
                            Design Parameters
                        </h3>
                        <div className="space-y-3">
                            {parameters.map((param, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <param.icon size={14} className="text-[#a855f7]" />
                                        {param.name}
                                    </div>
                                    <span className="text-sm font-mono text-white">{param.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Design Variants */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Layers size={16} className="text-[#FF6B00]" />
                            Generated Variants
                        </h3>
                        <div className="space-y-2">
                            {designVariants.map((variant) => (
                                <motion.div
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant.id)}
                                    whileHover={{ scale: 1.01 }}
                                    className={`p-3 rounded-xl cursor-pointer transition-all ${selectedVariant === variant.id
                                        ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/30'
                                        : 'bg-white/[0.03] border border-white/5 hover:border-white/15'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white">{variant.id}</span>
                                            <span className="text-sm text-white font-medium">{variant.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={12} className="text-amber-400" fill="currentColor" />
                                            <span className="text-sm font-bold text-white">{variant.score}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                                        <div className="text-slate-500">Cost: <span className="text-white">{variant.cost}</span></div>
                                        <div className="text-slate-500">Space: <span className="text-white">{variant.space}</span></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
