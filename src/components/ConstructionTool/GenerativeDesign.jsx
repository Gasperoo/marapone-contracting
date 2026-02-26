import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Boxes, Cpu, Maximize, RotateCw, Layers, Zap, Eye,
    Star, ArrowRight, Settings, Grid3X3, BarChart3, Trophy
} from 'lucide-react';
import '../../styles/ConstructionTool.css';

const designVariants = [
    { name: 'Variant Alpha', score: 94, energy: 'A+', cost: '$2.3M', material: '340 m³', light: '92%', style: 'Open Plan' },
    { name: 'Variant Beta', score: 89, energy: 'A', cost: '$2.1M', material: '310 m³', light: '88%', style: 'Modular' },
    { name: 'Variant Gamma', score: 85, energy: 'A', cost: '$2.4M', material: '355 m³', light: '95%', style: 'Hybrid' },
    { name: 'Variant Delta', score: 78, energy: 'B+', cost: '$1.9M', material: '280 m³', light: '82%', style: 'Compact' },
];

const constraints = [
    { name: 'Max Floor Area', value: '2,500 m²', icon: Maximize },
    { name: 'Energy Rating', value: 'A+ Target', icon: Zap },
    { name: 'Min Natural Light', value: '75%', icon: Eye },
    { name: 'Structural Load', value: '4.5 kPa', icon: Layers },
    { name: 'Target Budget', value: '$2.5M', icon: BarChart3 },
];

export function GenerativeDesign() {
    const [selectedVariant, setSelectedVariant] = useState(0);

    const medalColors = ['#FFB800', '#c0c0c0', '#cd7f32', '#666'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <Boxes className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Generative Design
                    </h2>
                    <p className="ct-page-subtitle">AI-generated design optimization with constraint satisfaction</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="ct-badge ct-badge-purple ct-badge-live">
                        {designVariants.length} Variants Generated
                    </div>
                    <button className="ct-action-btn">
                        <RotateCw size={14} /> Regenerate
                    </button>
                </div>
            </div>

            {/* Constraints */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {constraints.map((c, idx) => (
                    <motion.div key={idx} className="ct-kpi" style={{ '--kpi-color': '#a855f7' }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                        <c.icon size={14} style={{ color: '#a855f7', margin: '0 auto 6px', display: 'block', filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.4))' }} />
                        <div className="ct-kpi-label">{c.name}</div>
                        <div className="ct-kpi-value" style={{ fontSize: '0.95rem', color: 'white' }}>{c.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                {/* 3D Preview Area */}
                <div className="lg:col-span-7">
                    <div className="ct-card" style={{ padding: 0, height: 380, position: 'relative', overflow: 'hidden' }}>
                        {/* Grid overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `
                                linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                        }} />

                        {/* Scan line */}
                        <div style={{
                            position: 'absolute', left: 0, right: 0, height: 1,
                            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)',
                            animation: 'ct-scan-sweep 4s ease-in-out infinite',
                        }} />

                        {/* Isometric Building Visualization */}
                        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                            {/* Floor grid */}
                            <g opacity="0.15">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <line key={`h${i}`} x1="100" y1={180 + i * 15} x2="300" y2={180 + i * 15 - 40}
                                        stroke="#a855f7" strokeWidth="0.5" />
                                ))}
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <line key={`v${i}`} x1={100 + i * 25} y1="180" x2={100 + i * 25 + 100} y2={180 - 40}
                                        stroke="#a855f7" strokeWidth="0.5" />
                                ))}
                            </g>

                            {/* Building volumes */}
                            <g>
                                {/* Main block */}
                                <polygon points="150,120 250,90 300,110 300,180 200,210 150,190" fill="rgba(168,85,247,0.08)" stroke="#a855f7" strokeWidth="1" opacity="0.8" />
                                <polygon points="150,120 150,190 200,210 200,140" fill="rgba(168,85,247,0.12)" stroke="#a855f7" strokeWidth="0.8" opacity="0.6" />
                                <polygon points="150,120 250,90 200,140" fill="rgba(168,85,247,0.04)" stroke="#a855f7" strokeWidth="0.5" opacity="0.4" />

                                {/* Secondary block */}
                                <polygon points="200,140 280,115 320,130 320,195 260,215 200,200" fill="rgba(59,130,246,0.06)" stroke="#3b82f6" strokeWidth="0.8" opacity="0.6" />

                                {/* Roof accent */}
                                <polygon points="160,115 240,88 225,85 145,112" fill="rgba(255,107,0,0.1)" stroke="#FF6B00" strokeWidth="0.5" opacity="0.5" />
                            </g>

                            {/* Measurement Lines */}
                            <g opacity="0.4">
                                <line x1="140" y1="195" x2="140" y2="215" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2" />
                                <line x1="140" y1="215" x2="210" y2="215" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2" />
                                <text x="175" y="225" fill="#a855f7" fontSize="7" textAnchor="middle">24.5m</text>
                            </g>

                            {/* AI Score Badge */}
                            <g>
                                <rect x="20" y="20" width="80" height="40" rx="8" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5" />
                                <text x="60" y="37" fill="#a855f7" fontSize="7" textAnchor="middle" fontWeight="700">AI SCORE</text>
                                <text x="60" y="52" fill="white" fontSize="14" textAnchor="middle" fontWeight="800">{designVariants[selectedVariant].score}</text>
                            </g>
                        </svg>

                        {/* Badges */}
                        <div style={{
                            position: 'absolute', bottom: 16, right: 16,
                            display: 'flex', gap: 8,
                        }}>
                            <span className="ct-badge ct-badge-purple" style={{ fontSize: '0.55rem' }}>
                                <Cpu size={10} /> AI Rendered
                            </span>
                            <span className="ct-badge ct-badge-blue" style={{ fontSize: '0.55rem' }}>
                                {designVariants[selectedVariant].style}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Variant Cards */}
                <div className="lg:col-span-5 space-y-3">
                    <h3 className="ct-section-header">
                        <Trophy size={15} className="ct-section-icon" />
                        Ranked Variants
                    </h3>
                    {designVariants.map((variant, idx) => (
                        <motion.div
                            key={idx}
                            className={`ct-card group`}
                            style={{
                                padding: 16, cursor: 'pointer',
                                borderColor: selectedVariant === idx ? 'rgba(168,85,247,0.3)' : undefined,
                                boxShadow: selectedVariant === idx ? '0 0 20px rgba(168,85,247,0.1)' : undefined,
                            }}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.08 }}
                            onClick={() => setSelectedVariant(idx)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {/* Rank Medal */}
                                <div style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    background: `${medalColors[idx]}15`,
                                    border: `1px solid ${medalColors[idx]}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.8rem', fontWeight: 800, color: medalColors[idx],
                                    flexShrink: 0,
                                }}>
                                    #{idx + 1}
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{variant.name}</div>
                                    <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                                        <span>Cost: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{variant.cost}</strong></span>
                                        <span>Energy: <strong style={{ color: '#22c55e' }}>{variant.energy}</strong></span>
                                        <span>Light: <strong style={{ color: '#f59e0b' }}>{variant.light}</strong></span>
                                    </div>
                                </div>

                                {/* Score Ring */}
                                <div className="ct-ring-gauge" style={{ width: 44, height: 44 }}>
                                    <svg width="44" height="44" viewBox="0 0 44 44">
                                        <circle className="track" cx="22" cy="22" r="18" />
                                        <circle className="fill" cx="22" cy="22" r="18"
                                            stroke={medalColors[idx] || '#a855f7'}
                                            strokeDasharray="113"
                                            strokeDashoffset={113 - (113 * variant.score) / 100}
                                        />
                                    </svg>
                                    <span className="ct-ring-value" style={{ fontSize: '0.7rem' }}>{variant.score}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
