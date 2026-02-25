import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    MessageCircleHeart, TrendingUp, TrendingDown, AlertTriangle,
    Star, Mail, MessageSquare, Zap, ArrowRight, Heart, DollarSign, Minus
} from 'lucide-react';
import { getClientFeedbackData } from './constructionServices';

export function ClientFeedbackFusion() {
    const data = getClientFeedbackData();

    const sentimentColors = {
        positive: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
        neutral: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
        negative: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    };

    const channelIcons = {
        text: MessageSquare,
        email: Mail,
        review: Star,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <MessageCircleHeart className="text-[#FF6B00]" size={24} />
                        Client Feedback Fusion™
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">AI-powered relationship health monitor for construction SMBs</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5">
                    <Heart size={12} />
                    Relationship Intelligence Active
                </div>
            </div>

            {/* Satisfaction Trend */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Client Satisfaction Trend</h3>
                <div className="flex items-end gap-4 h-[160px]">
                    {data.satisfactionTrend.map((point, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ delay: idx * 0.06, duration: 0.4 }}
                            style={{ transformOrigin: 'bottom' }}
                            className="flex-1 flex flex-col items-center"
                        >
                            <div className="text-xs font-bold mb-1" style={{ color: point.score >= 85 ? '#22c55e' : point.score >= 75 ? '#f59e0b' : '#ef4444' }}>
                                {point.score}
                            </div>
                            <div
                                className="w-full rounded-t-lg transition-all"
                                style={{
                                    height: `${(point.score / 100) * 120}px`,
                                    background: point.score >= 85 ? 'rgba(34,197,94,0.3)' : point.score >= 75 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)',
                                    border: `1px solid ${point.score >= 85 ? 'rgba(34,197,94,0.4)' : point.score >= 75 ? 'rgba(245,158,11,0.4)' : 'rgba(239,68,68,0.4)'}`,
                                }}
                            />
                            <div className="text-[10px] text-slate-500 mt-2">{point.month}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Project Sentiment */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Star size={16} className="text-[#FF6B00]" />
                        Project Sentiment Analysis
                    </h3>
                    <div className="space-y-3">
                        {data.projectSentiment.map((proj, idx) => {
                            const sc = sentimentColors[proj.sentiment];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.06 }}
                                    className={`p-3 rounded-xl border ${sc.border} ${sc.bg} transition-all hover:bg-white/[0.05]`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-white font-medium">{proj.project}</span>
                                        <span className={`text-lg font-bold ${sc.text}`}>{proj.score}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <span className={`font-bold uppercase ${sc.text}`}>{proj.sentiment}</span>
                                        <span>{proj.reviews} reviews</span>
                                        <span className="flex items-center gap-0.5">
                                            {proj.trend === 'up' ? <TrendingUp size={10} className="text-green-400" /> :
                                                proj.trend === 'down' ? <TrendingDown size={10} className="text-red-400" /> :
                                                    <Minus size={10} className="text-slate-500" />}
                                            {proj.trend}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Dispute Predictions */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-400" />
                        Dispute Prediction
                    </h3>
                    <div className="space-y-3">
                        {data.disputes.map((dispute, idx) => (
                            <motion.div
                                key={dispute.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.08 }}
                                className={`p-4 rounded-xl border ${dispute.risk === 'high' ? 'border-red-500/20 bg-red-500/5' : 'border-amber-500/20 bg-amber-500/5'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white font-medium">{dispute.client}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${dispute.risk === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                        }`}>{dispute.probability} risk</span>
                                </div>
                                <div className="text-xs text-slate-400 mb-2">{dispute.issue}</div>
                                <div className="flex items-center gap-1.5 text-xs text-[#FF6B00] p-2 rounded-lg bg-[#FF6B00]/5 border border-[#FF6B00]/10">
                                    <Zap size={10} />
                                    <span className="font-bold">AI Suggestion:</span>
                                    <span className="text-white/70">{dispute.suggestedAction}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Communications */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#FF6B00]" />
                    Recent Communications
                </h3>
                <div className="space-y-2">
                    {data.recentComms.map((comm, idx) => {
                        const sc = sentimentColors[comm.sentiment];
                        const ChannelIcon = channelIcons[comm.channel] || MessageSquare;
                        return (
                            <motion.div
                                key={comm.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.05 }}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${sc.bg} border ${sc.border}`}>
                                    <ChannelIcon size={14} className={sc.text} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-sm text-white font-medium">{comm.client}</span>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${sc.bg} ${sc.text}`}>{comm.sentiment}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed truncate">{comm.message}</p>
                                    <div className="text-[10px] text-slate-600 mt-0.5">{comm.project} · {comm.time}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Upsell Suggestions */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <DollarSign size={16} className="text-[#FF6B00]" />
                    AI Upsell Opportunities
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {data.upsells.map((upsell, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.08 }}
                            className="p-4 rounded-xl bg-[#FF6B00]/5 border border-[#FF6B00]/15 hover:border-[#FF6B00]/30 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-white font-medium">{upsell.client}</span>
                                <span className="text-lg font-bold text-[#FF6B00]">{upsell.estimatedValue}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-2">{upsell.suggestion}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-green-400 font-bold">{upsell.probability} conversion probability</span>
                                <span className="text-xs text-slate-500 group-hover:text-[#FF6B00] flex items-center gap-1 transition-colors">
                                    Draft Proposal <ArrowRight size={10} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
