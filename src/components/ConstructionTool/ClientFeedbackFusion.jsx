import React from 'react';
import { motion } from 'motion/react';
import {
    MessageCircleHeart, TrendingUp, TrendingDown, AlertTriangle,
    Star, Mail, MessageSquare, Zap, ArrowRight, Heart, DollarSign, Minus, Lightbulb
} from 'lucide-react';
import { getClientFeedbackData } from './constructionServices';
import '../../styles/ConstructionTool.css';

export function ClientFeedbackFusion() {
    const data = getClientFeedbackData();

    const sentimentConfig = {
        positive: { color: '#22c55e', badge: 'ct-badge-green' },
        neutral: { color: '#3b82f6', badge: 'ct-badge-blue' },
        negative: { color: '#ef4444', badge: 'ct-badge-red' },
    };

    const channelIcons = { text: MessageSquare, email: Mail, review: Star };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="ct-page-header">
                <div>
                    <h2 className="ct-page-title">
                        <MessageCircleHeart className="icon-glow" style={{ color: '#FF6B00' }} size={24} />
                        Client Feedback Fusion™
                    </h2>
                    <p className="ct-page-subtitle">AI-powered relationship health monitor for construction SMBs</p>
                </div>
                <div className="ct-badge ct-badge-orange ct-badge-live">
                    <Heart size={10} /> Relationship Intelligence Active
                </div>
            </div>

            {/* Satisfaction Trend */}
            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header">
                    <TrendingUp size={15} className="ct-section-icon" />
                    Client Satisfaction Trend
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180 }}>
                    {data.satisfactionTrend.map((point, idx) => {
                        const barColor = point.score >= 85 ? '#22c55e' : point.score >= 75 ? '#f59e0b' : '#ef4444';
                        return (
                            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: barColor, marginBottom: 6 }}>
                                    {point.score}
                                </div>
                                <motion.div
                                    className="ct-chart-bar"
                                    style={{
                                        width: '60%',
                                        background: `linear-gradient(180deg, ${barColor}, ${barColor}40)`,
                                    }}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(point.score / 100) * 130}px` }}
                                    transition={{ delay: idx * 0.06, duration: 0.5 }}
                                />
                                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', marginTop: 8, fontWeight: 600 }}>{point.month}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Project Sentiment */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <Star size={15} className="ct-section-icon" />
                        Project Sentiment Analysis
                    </h3>
                    <div className="space-y-3">
                        {data.projectSentiment.map((proj, idx) => {
                            const sc = sentimentConfig[proj.sentiment];
                            return (
                                <motion.div
                                    key={idx}
                                    className={`ct-alert ct-alert-${proj.sentiment === 'negative' ? 'high' : proj.sentiment === 'neutral' ? 'low' : 'medium'}`}
                                    style={{ borderColor: `${sc.color}15`, background: `${sc.color}05` }}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.06 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{proj.project}</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: sc.color }}>{proj.score}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                                        <span className={sc.badge} style={{ fontSize: '0.5rem', padding: '2px 6px' }}>{proj.sentiment}</span>
                                        <span>{proj.reviews} reviews</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                            {proj.trend === 'up' ? <TrendingUp size={10} style={{ color: '#22c55e' }} /> :
                                                proj.trend === 'down' ? <TrendingDown size={10} style={{ color: '#ef4444' }} /> :
                                                    <Minus size={10} />}
                                            {proj.trend}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Dispute Predictions */}
                <div className="ct-card" style={{ padding: 24 }}>
                    <h3 className="ct-section-header">
                        <AlertTriangle size={15} className="ct-section-icon" />
                        Dispute Prediction
                    </h3>
                    <div className="space-y-3">
                        {data.disputes.map((dispute, idx) => (
                            <motion.div
                                key={dispute.id}
                                className={`ct-alert ct-alert-${dispute.risk === 'high' ? 'high' : 'medium'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.08 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{dispute.client}</span>
                                    <span className={`ct-badge ct-badge-${dispute.risk === 'high' ? 'red' : 'amber'}`} style={{ fontSize: '0.5rem' }}>
                                        {dispute.probability} risk
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>{dispute.issue}</div>
                                <div className="ct-ai-suggestion">
                                    <Lightbulb size={12} className="ai-icon" />
                                    <div>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FF6B00' }}>AI Suggestion: </span>
                                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>{dispute.suggestedAction}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Communications */}
            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header">
                    <MessageSquare size={15} className="ct-section-icon" />
                    Recent Communications
                </h3>
                <div className="space-y-1">
                    {data.recentComms.map((comm, idx) => {
                        const sc = sentimentConfig[comm.sentiment];
                        const ChannelIcon = channelIcons[comm.channel] || MessageSquare;
                        return (
                            <motion.div
                                key={comm.id}
                                className="ct-activity-item"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.05 }}
                            >
                                <div className="ct-icon-box" style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    background: `${sc.color}10`, border: `1px solid ${sc.color}20`,
                                }}>
                                    <ChannelIcon size={13} style={{ color: sc.color }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }}>{comm.client}</span>
                                        <span className={sc.badge} style={{ fontSize: '0.45rem', padding: '1px 5px' }}>{comm.sentiment}</span>
                                    </div>
                                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{comm.message}</p>
                                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', marginTop: 2 }}>{comm.project} · {comm.time}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Upsell Suggestions */}
            <div className="ct-card" style={{ padding: 24 }}>
                <h3 className="ct-section-header">
                    <DollarSign size={15} className="ct-section-icon" />
                    AI Upsell Opportunities
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {data.upsells.map((upsell, idx) => (
                        <motion.div
                            key={idx}
                            className="ct-card group"
                            style={{ padding: 16, cursor: 'pointer', borderColor: 'rgba(255,107,0,0.1)' }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.08 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{upsell.client}</span>
                                <span className="ct-gradient-text" style={{ fontSize: '1.1rem', fontWeight: 800 }}>{upsell.estimatedValue}</span>
                            </div>
                            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>{upsell.suggestion}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="ct-badge ct-badge-green" style={{ fontSize: '0.5rem' }}>{upsell.probability} conversion</span>
                                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
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
