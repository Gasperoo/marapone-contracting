import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    UserSearch, Star, MapPin, Clock, Shield, CheckCircle,
    Zap, MessageSquare, ArrowRight, Award, Users
} from 'lucide-react';
import { getSubcontractorMatches } from './constructionServices';

export function SubcontractorMatchmaker() {
    const data = getSubcontractorMatches();
    const [selectedSub, setSelectedSub] = useState(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <UserSearch className="text-[#FF6B00]" size={24} />
                        Subcontractor Matchmaker™
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">AI-powered sub matching for your projects</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5">
                        <Zap size={12} />
                        {data.matches.length} Matches Found
                    </div>
                </div>
            </div>

            {/* Project Spec Card */}
            <div className="bg-[#FF6B00]/5 border border-[#FF6B00]/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#FF6B00] mb-3">
                    <Shield size={14} />
                    Active Project Spec
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Project</div>
                        <div className="text-sm text-white font-medium">{data.projectSpec.name}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Trades Needed</div>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                            {data.projectSpec.trades.map(t => (
                                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">{t}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Location</div>
                        <div className="text-sm text-white font-medium flex items-center gap-1"><MapPin size={10} />{data.projectSpec.location}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Start Date</div>
                        <div className="text-sm text-white font-medium">{data.projectSpec.startDate}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Budget</div>
                        <div className="text-sm text-white font-medium">{data.projectSpec.budget}</div>
                    </div>
                </div>
            </div>

            {/* Matched Subs Grid */}
            <div>
                <h3 className="text-white font-semibold mb-4">AI-Matched Subcontractors</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.matches.map((sub, idx) => (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            onClick={() => setSelectedSub(selectedSub === sub.id ? null : sub.id)}
                            className={`bg-white/5 border rounded-2xl p-5 cursor-pointer transition-all hover:bg-white/[0.07] ${selectedSub === sub.id ? 'border-[#FF6B00]/40 shadow-[0_0_20px_rgba(255,107,0,0.1)]' : 'border-white/10'
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="text-white font-semibold">{sub.name}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                        <span className="px-1.5 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00] font-bold">{sub.trade}</span>
                                        <span className="flex items-center gap-0.5"><MapPin size={9} />{sub.distance}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-[#FF6B00]">{sub.matchScore}%</div>
                                    <div className="text-[9px] text-slate-500 uppercase">Match</div>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-3 mb-3">
                                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                                    <div className="flex items-center justify-center gap-0.5 text-amber-400">
                                        <Star size={10} fill="currentColor" />
                                        <span className="text-sm font-bold text-white">{sub.rating}</span>
                                    </div>
                                    <div className="text-[9px] text-slate-500">{sub.reviews} reviews</div>
                                </div>
                                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                                    <div className="text-sm font-bold text-white">{sub.reliability}%</div>
                                    <div className="text-[9px] text-slate-500">Reliability</div>
                                </div>
                                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                                    <div className="text-sm font-bold text-white">{sub.pastProjects}</div>
                                    <div className="text-[9px] text-slate-500">Past Jobs</div>
                                </div>
                            </div>

                            {/* Availability & Price */}
                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1 text-green-400"><Clock size={10} />{sub.availability}</span>
                                <span className="text-slate-400">{sub.priceRange}</span>
                            </div>

                            {/* Certifications */}
                            <div className="flex flex-wrap gap-1 mt-2">
                                {sub.certifications.map(cert => (
                                    <span key={cert} className="text-[9px] px-1.5 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-green-400 flex items-center gap-0.5">
                                        <CheckCircle size={7} />{cert}
                                    </span>
                                ))}
                            </div>

                            {/* Expanded Actions */}
                            {selectedSub === sub.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 pt-4 border-t border-white/10 flex gap-2"
                                >
                                    <button className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 hover:bg-[#FF6B00]/20 transition-colors flex items-center justify-center gap-1">
                                        <MessageSquare size={12} /> Contact
                                    </button>
                                    <button className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 transition-colors flex items-center justify-center gap-1">
                                        <Award size={12} /> Generate Contract
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Milestone Tracker */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#FF6B00]" />
                    Smart Contract Milestones
                </h3>
                <div className="flex items-center gap-2">
                    {data.milestones.map((ms, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex-1 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <div className="text-xs text-white font-medium">{ms.phase}</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{ms.dueDate}</div>
                                <div className={`text-[9px] font-bold uppercase mt-1 ${ms.status === 'complete' ? 'text-green-400' : 'text-slate-500'}`}>{ms.status}</div>
                            </div>
                            {idx < data.milestones.length - 1 && (
                                <ArrowRight size={14} className="text-white/20 flex-shrink-0" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
