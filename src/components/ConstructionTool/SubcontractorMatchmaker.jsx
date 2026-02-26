import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    UserSearch, Star, MapPin, Clock, Shield, CheckCircle,
    Zap, MessageSquare, ArrowRight, Award, Users
} from 'lucide-react';
import { getSubcontractorMatches } from './constructionServices';
import '../../styles/ConstructionTool.css';

export function SubcontractorMatchmaker() {
    const data = getSubcontractorMatches();
    const [selectedSub, setSelectedSub] = useState(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <UserSearch className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Subcontractor Matchmaker™
                    </h2>
                    <p className="ct-page-subtitle">AI-powered sub matching for your projects</p>
                </div>
                <div className="ct-badge ct-badge-orange ct-badge-live">
                    {data.matches.length} Matches Found
                </div>
            </div>

            {/* Project Spec Card */}
            <div className="ct-card ct-border-glow" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', fontWeight: 700, color: '#FF6B00', marginBottom: 14 }}>
                    <Shield size={14} style={{ filter: 'drop-shadow(0 0 4px rgba(255,107,0,0.4))' }} />
                    Active Project Spec
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <div className="ct-kpi-label">Project</div>
                        <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 600, marginTop: 4 }}>{data.projectSpec.name}</div>
                    </div>
                    <div>
                        <div className="ct-kpi-label">Trades Needed</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                            {data.projectSpec.trades.map(t => (
                                <span key={t} className="ct-badge ct-badge-blue" style={{ fontSize: '0.5rem', padding: '2px 6px' }}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="ct-kpi-label">Location</div>
                        <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 500, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <MapPin size={10} style={{ color: 'rgba(255,255,255,0.4)' }} />{data.projectSpec.location}
                        </div>
                    </div>
                    <div>
                        <div className="ct-kpi-label">Start Date</div>
                        <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 500, marginTop: 4 }}>{data.projectSpec.startDate}</div>
                    </div>
                    <div>
                        <div className="ct-kpi-label">Budget</div>
                        <div className="ct-gradient-text" style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: 4 }}>{data.projectSpec.budget}</div>
                    </div>
                </div>
            </div>

            {/* Matched Subs Grid */}
            <div>
                <h3 className="ct-section-header">
                    <Users size={15} className="ct-section-icon" />
                    AI-Matched Subcontractors
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.matches.map((sub, idx) => (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06 }}
                            onClick={() => setSelectedSub(selectedSub === sub.id ? null : sub.id)}
                            className="ct-card"
                            style={{
                                padding: 20, cursor: 'pointer',
                                borderColor: selectedSub === sub.id ? 'rgba(255,107,0,0.3)' : undefined,
                                boxShadow: selectedSub === sub.id ? '0 0 25px rgba(255,107,0,0.1)' : undefined,
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{sub.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                        <span className="ct-badge ct-badge-orange" style={{ fontSize: '0.55rem', padding: '2px 8px' }}>{sub.trade}</span>
                                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 3 }}>
                                            <MapPin size={9} />{sub.distance}
                                        </span>
                                    </div>
                                </div>
                                {/* Match Score Ring */}
                                <div className="ct-ring-gauge" style={{ width: 48, height: 48 }}>
                                    <svg width="48" height="48" viewBox="0 0 48 48">
                                        <circle className="track" cx="24" cy="24" r="19" strokeWidth="4" />
                                        <circle className="fill" cx="24" cy="24" r="19"
                                            stroke="#FF6B00" strokeWidth="4"
                                            strokeDasharray="119"
                                            strokeDashoffset={119 - (119 * sub.matchScore) / 100}
                                        />
                                    </svg>
                                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                                        <span className="ct-ring-value" style={{ fontSize: '0.75rem', color: '#FF6B00' }}>{sub.matchScore}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 12 }}>
                                {[
                                    { label: `${sub.reviews} reviews`, value: sub.rating, icon: <Star size={9} fill="#fbbf24" color="#fbbf24" /> },
                                    { label: 'Reliability', value: `${sub.reliability}%` },
                                    { label: 'Past Jobs', value: sub.pastProjects },
                                ].map((s, si) => (
                                    <div key={si} style={{
                                        textAlign: 'center', padding: 8, borderRadius: 8,
                                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>
                                            {s.icon}{s.value}
                                        </div>
                                        <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Availability & Price */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />{sub.availability}</span>
                                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{sub.priceRange}</span>
                            </div>

                            {/* Certifications */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                                {sub.certifications.map(cert => (
                                    <span key={cert} className="ct-badge ct-badge-green" style={{ fontSize: '0.5rem', padding: '2px 6px' }}>
                                        <CheckCircle size={7} />{cert}
                                    </span>
                                ))}
                            </div>

                            {/* Expanded Actions */}
                            {selectedSub === sub.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}
                                >
                                    <button className="ct-action-btn" style={{ flex: 1 }}>
                                        <MessageSquare size={12} /> Contact
                                    </button>
                                    <button className="ct-action-btn ct-action-btn-primary" style={{ flex: 1 }}>
                                        <Award size={12} /> Generate Contract
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Milestone Tracker */}
            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header">
                    <CheckCircle size={15} className="ct-section-icon" />
                    Smart Contract Milestones
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {data.milestones.map((ms, idx) => (
                        <React.Fragment key={idx}>
                            <div className="ct-kpi" style={{
                                flex: 1, '--kpi-color': ms.status === 'complete' ? '#22c55e' : 'rgba(255,255,255,0.1)',
                            }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>{ms.phase}</div>
                                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{ms.dueDate}</div>
                                <span className={`ct-badge ${ms.status === 'complete' ? 'ct-badge-green' : 'ct-badge-blue'}`}
                                    style={{ fontSize: '0.5rem', padding: '2px 6px', marginTop: 6 }}>
                                    {ms.status}
                                </span>
                            </div>
                            {idx < data.milestones.length - 1 && (
                                <ArrowRight size={14} style={{ color: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
