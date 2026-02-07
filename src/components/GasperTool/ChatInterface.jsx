import React, { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
// We don't really need the Card component here if we style it manually in CSS or just use it as a wrapper
// but keeping imports partially consistent is helper
import { cn, generateId, formatCurrency } from '../../lib/utils';
import {
    classifyHSCode,
    estimateLandedCost,
    generateComplianceChecklist,
    screenForSanctions,
    getFreightQuotes,
    predictDisruptions,
    generateTradeWorkflow,
} from './aiService';

export function ChatInterface() {
    const [messages, setMessages] = useState([
        {
            id: generateId(),
            role: 'assistant',
            content: 'Hello! I\'m your Gasper AI trade assistant. I can help you with:\n\n• HS code classification\n• Landed cost estimation\n• Compliance documentation\n• Sanctions screening\n• Freight quotes\n• Shipment delay predictions\n• Trade workflow automation\n\nWhat would you like help with today?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Auto-scroll to bottom
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: generateId(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate AI processing delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const response = generateResponse(userMessage.content);
        setMessages((prev) => [...prev, response]);
        setIsLoading(false);
    };

    const generateResponse = (query) => {
        const q = query.toLowerCase();

        // HS Code classification
        if (q.includes('hs code') || q.includes('classify') || q.includes('tariff code')) {
            const productMatch = q.match(/(?:for|code for|classify)\s+(.+?)(?:\?|$)/);
            const product = productMatch ? productMatch[1].trim() : 'bluetooth speaker';
            const result = classifyHSCode(product);

            return {
                id: generateId(),
                role: 'assistant',
                content: `I've classified "${product}" for you:\n\n**HS Code:** ${result.code}\n**Description:** ${result.description}\n**Confidence:** ${(result.confidence * 100).toFixed(0)}%\n**Duty Rate:** ${result.dutyRate}\n\n**Reasoning:** ${result.reasoning}\n\n${result.confidence < 0.7 ? '⚠️ Low confidence - recommend consulting a customs broker for verification.' : ''}`,
                timestamp: new Date(),
                metadata: { hsCode: result },
            };
        }

        // Landed cost estimation
        if (q.includes('landed cost') || q.includes('estimate cost') || q.includes('total cost')) {
            const result = estimateLandedCost({
                units: 200,
                unitPrice: 25,
                origin: 'China',
                destination: 'Toronto',
            });

            return {
                id: generateId(),
                role: 'assistant',
                content: `Here's the landed cost estimate for 200 units from China to Toronto:\n\n**Product Cost:** ${formatCurrency(result.breakdown.productCost)}\n**Shipping:** ${formatCurrency(result.breakdown.shipping)}\n**Duties:** ${formatCurrency(result.breakdown.duties)}\n**Taxes:** ${formatCurrency(result.breakdown.taxes)}\n**Insurance:** ${formatCurrency(result.breakdown.insurance)}\n\n**Total:** ${formatCurrency(result.breakdown.total)}\n**Per Unit:** ${formatCurrency(result.perUnit)}\n\n📝 Notes:\n${result.notes.map((n) => `• ${n}`).join('\n')}`,
                timestamp: new Date(),
                metadata: { landedCost: result },
            };
        }

        // Compliance documents
        if (q.includes('documents') || q.includes('compliance') || q.includes('paperwork')) {
            const productType = q.includes('electronic') ? 'electronics' : q.includes('food') ? 'food' : 'general';
            const result = generateComplianceChecklist(productType, 'China', 'Canada');

            return {
                id: generateId(),
                role: 'assistant',
                content: `Here's your compliance checklist for importing ${productType} to Canada:\n\n**Complexity:** ${result.complexity}\n**Estimated Processing Time:** ${result.estimatedTime}\n\n**Required Documents:**\n${result.documents
                    .filter((d) => d.required)
                    .map((d) => `✓ **${d.name}**\n  ${d.description}`)
                    .join('\n\n')}\n\n${result.warnings.length > 0 ? `⚠️ **Important Warnings:**\n${result.warnings.map((w) => `• ${w}`).join('\n')}` : ''}`,
                timestamp: new Date(),
                metadata: { compliance: result },
            };
        }

        // Sanctions screening
        if (q.includes('sanction') || q.includes('screen') || q.includes('risk')) {
            const result = screenForSanctions('ABC Trading Company', 'China');

            return {
                id: generateId(),
                role: 'assistant',
                content: `**Sanctions Screening Report**\n\n**Risk Level:** ${result.riskLevel}\n**Risk Score:** ${result.score}/100\n**Recommendation:** ${result.recommendation}\n\n**Checked Against:**\n${result.checkedAgainst.map((s) => `• ${s}`).join('\n')}\n\n${result.flags.length > 0 ? `🚩 **Flags:**\n${result.flags.map((f) => `• ${f}`).join('\n')}` : '✅ No sanctions flags found'}`,
                timestamp: new Date(),
                metadata: { sanctions: result },
            };
        }

        // Freight quotes
        if (q.includes('freight') || q.includes('quote') || q.includes('shipping cost')) {
            const result = getFreightQuotes({
                weight: 500,
                origin: 'Beijing',
                destination: 'Toronto',
                serviceType: 'air',
            });

            return {
                id: generateId(),
                role: 'assistant',
                content: `**Freight Quotes for 500kg Air Cargo (Beijing → Toronto)**\n\n${result.quotes
                    .map(
                        (q) =>
                            `**${q.carrier}** - ${q.service}\n💰 ${formatCurrency(q.price)} | 📅 ${q.transitDays} days | ⭐ ${(q.reliability * 100).toFixed(0)}% reliability${q.recommended ? ' ✨ **Recommended**' : ''}`
                    )
                    .join('\n\n')}\n\n**Optimization Tips:**\n${result.optimizationTips.map((t) => `• ${t}`).join('\n')}\n\n💡 Potential savings: ${formatCurrency(result.estimatedSavings || 0)}`,
                timestamp: new Date(),
                metadata: { quotes: result },
            };
        }

        // Delay predictions
        if (q.includes('delay') || q.includes('predict') || q.includes('disruption')) {
            const result = predictDisruptions('Shanghai', 'Vancouver');

            return {
                id: generateId(),
                role: 'assistant',
                content: `**Supply Chain Disruption Analysis (Shanghai → Vancouver)**\n\n**Overall Risk Score:** ${result.riskScore}/100\n\n**Potential Disruptions:**\n${result.disruptions
                    .map(
                        (d) =>
                            `🔸 **${d.type.replace(/_/g, ' ').toUpperCase()}** (${d.severity} severity)\n   📍 ${d.location}\n   ${d.description}\n   Impact: ${d.impact}\n   Probability: ${(d.probability * 100).toFixed(0)}%`
                    )
                    .join('\n\n')}\n\n**Mitigation Strategies:**\n${result.mitigationStrategies.map((s) => `• ${s}`).join('\n')}`,
                timestamp: new Date(),
                metadata: { disruptions: result },
            };
        }

        // Workflow automation
        if (q.includes('workflow') || q.includes('process') || q.includes('steps')) {
            const workflowType = q.includes('invoice') ? 'invoice' : 'import';
            const result = generateTradeWorkflow(workflowType);

            return {
                id: generateId(),
                role: 'assistant',
                content: `**${result.workflowType} Workflow**\n\nEstimated Duration: ${result.estimatedDuration}\n\n${result.steps
                    .map(
                        (s) =>
                            `**Step ${s.step}: ${s.title}** ${s.status === 'completed' ? '✅' : s.status === 'in_progress' ? '🔄' : '⏳'}\n${s.description}${s.aiSuggestion ? `\n💡 AI Suggestion: ${s.aiSuggestion}` : ''}`
                    )
                    .join('\n\n')}`,
                timestamp: new Date(),
            };
        }

        // Default response
        return {
            id: generateId(),
            role: 'assistant',
            content: 'I can help you with that! Try asking me about:\n\n• "What HS code for [product]?"\n• "Estimate landed cost for [quantity] units from [origin] to [destination]"\n• "What documents do I need to import [product] to Canada?"\n• "Screen [company] for sanctions"\n• "Get freight quote for [weight]kg from [origin] to [destination]"\n• "Predict delays for shipment from [origin] to [destination]"\n• "Show me the import workflow"',
            timestamp: new Date(),
        };
    };

    return (
        <div className="chat-container">
            {/* Messages */}
            <div className="chat-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.role}`}
                    >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                ))}
                {isLoading && (
                    <div className="chat-message assistant">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-area">
                <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about import/export..."
                        className="chat-input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="gasper-btn primary">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
