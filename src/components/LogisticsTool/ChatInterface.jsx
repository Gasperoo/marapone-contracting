import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Plus, MessageSquare, Zap, FileText, Search, Activity, Box, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { cn, generateId, formatCurrency } from '../../lib/utils';
import {
    classifyHSCode,
    estimateLandedCost,
    generateComplianceChecklist,
    screenForSanctions,
    getFreightQuotes,
    predictDisruptions,
    generateTradeWorkflow,
} from '../GasperTool/aiService';
import '../../styles/LogisticsTool.css';

export function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages, isLoading]);

    const handleCardClick = (prompt) => {
        setInput(prompt);
    };

    const handleSubmit = async (e, overrideInput) => {
        if (e) e.preventDefault();
        const textToProcess = overrideInput || input;

        if (!textToProcess.trim() || isLoading) return;

        const userMessage = {
            id: generateId(),
            role: 'user',
            content: textToProcess,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setShowWelcome(false);

        await new Promise((resolve) => setTimeout(resolve, 1200));

        try {
            const response = generateResponse(userMessage.content);
            setMessages((prev) => [...prev, response]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages((prev) => [...prev, {
                id: generateId(),
                role: 'assistant',
                content: "I'm sorry, I encountered an error processing your request. Please try again.",
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const generateResponse = (query) => {
        const q = query.toLowerCase();
        let content = '';
        let metadata = {};

        if (q.includes('hs code') || q.includes('classify')) {
            const result = classifyHSCode(q);
            content = `I've classified this product for you:\n\n**HS Code:** ${result.code}\n**Description:** ${result.description}\n**Duty Rate:** ${result.dutyRate}\n\n${result.reasoning}`;
        } else if (q.includes('cost') || q.includes('estimate')) {
            const result = estimateLandedCost({
                units: 200,
                unitPrice: 25,
                origin: 'China',
                destination: 'Toronto'
            });
            content = `Estimated Landed Cost: **${formatCurrency(result.breakdown.total)}**\n\nIncludes shipping, duties, and insurance for 200 units from China to Toronto.`;
        } else if (q.includes('compliance') || q.includes('document')) {
            content = `For this import, you will need:\n\n1. **Commercial Invoice**\n2. **Packing List**\n3. **Bill of Lading**\n4. **Certificate of Origin**\n\nEnsure all documents match the HS code classification to avoid delays.`;
        } else if (q.includes('delay') || q.includes('risk')) {
            content = `**Risk Warning:** Potential delays detected at Shanghai Port due to congestion (48h wait time). Rerouting via Ningbo is recommended if time-sensitive.`;
        } else {
            content = `I can help with that. Could you provide more specific details so I can give you an accurate trade analysis?`;
        }

        return {
            id: generateId(),
            role: 'assistant',
            content,
            timestamp: new Date(),
            metadata
        };
    };

    const formatMessage = (text) => {
        return text.split('\n\n').map((block, i) => (
            <p key={i} className="mb-3 last:mb-0">
                {block.split('\n').map((line, j) => (
                    <span key={j} className="block">
                        {line.split(/(\*\*.*?\*\*)/).map((part, k) => (
                            part.startsWith('**') && part.endsWith('**') ?
                                <strong key={k} className="text-[#1a1a1a] font-semibold">{part.slice(2, -2)}</strong> :
                                part
                        ))}
                    </span>
                ))}
            </p>
        ));
    };

    return (
        <div className="flex h-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white relative">

            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-64 border-r border-black/[0.06] bg-[#FAFAFA]">
                <div className="p-4">
                    <Button onClick={() => { setMessages([]); setShowWelcome(true); }} className="w-full justify-start gap-2 bg-black/[0.03] hover:bg-black/[0.06] text-[#1a1a1a] border-black/[0.08]">
                        <Plus size={16} /> New Chat
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-2 lt-scrollbar">
                    <h3 className="text-xs font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">Recent</h3>
                    <div className="space-y-1">
                        {['Import Regulations China', 'HS Code 8517.62', 'Cost Estimate Q4'].map((chat, i) => (
                            <button key={i} onClick={() => handleCardClick(chat)} className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-[#1a1a1a] hover:bg-black/[0.03] rounded-lg transition-colors flex items-center gap-2 group">
                                <MessageSquare size={14} className="opacity-50 group-hover:opacity-100" />
                                <span className="truncate">{chat}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xs font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">Suggested</h3>
                        <div className="space-y-1">
                            <button onClick={() => handleCardClick('Detect anomalies in my supply chain')} className="w-full text-left px-3 py-2 text-sm text-[#0EA5E9] hover:text-[#0284C7] hover:bg-[#0EA5E9]/8 rounded-lg transition-colors flex items-center gap-2">
                                <Zap size={14} /> Detect Anomalies
                            </button>
                            <button onClick={() => handleCardClick('Draft a supplier contract template')} className="w-full text-left px-3 py-2 text-sm text-[#0EA5E9] hover:text-[#0284C7] hover:bg-[#0EA5E9]/8 rounded-lg transition-colors flex items-center gap-2">
                                <FileText size={14} /> Draft Contract
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative bg-white">
                {/* Chat Header */}
                <div className="h-14 border-b border-black/[0.06] flex items-center px-6 justify-between bg-white/80 backdrop-blur-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{
                            background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                            boxShadow: '0 0 15px rgba(14,165,233,0.3)',
                        }}>
                            <Zap size={16} fill="white" color="white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#1a1a1a] text-sm">GasperShip AI</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative lt-scrollbar">
                    {showWelcome && (
                        <div className="max-w-3xl mx-auto mt-10">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center">How can I help you today?</h2>
                            <p className="text-gray-500 text-center mb-8">I analyze global trade data to give you instant answers.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div onClick={() => handleCardClick("Classify HS Code for...")} className="lt-module-card" style={{ '--module-color': '#0EA5E9', cursor: 'pointer' }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-[#0EA5E9] group-hover:scale-110 transition-transform" style={{ background: 'rgba(14,165,233,0.1)' }}>
                                        <Search size={20} />
                                    </div>
                                    <h3 className="text-[#1a1a1a] font-medium mb-1">HS Code Classification</h3>
                                    <p className="text-sm text-gray-400">Find the correct tariff codes and duty rates instantly.</p>
                                </div>
                                <div onClick={() => handleCardClick("Check compliance for...")} className="lt-module-card" style={{ '--module-color': '#22c55e', cursor: 'pointer' }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-green-500 group-hover:scale-110 transition-transform" style={{ background: 'rgba(34,197,94,0.1)' }}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h3 className="text-[#1a1a1a] font-medium mb-1">Compliance Check</h3>
                                    <p className="text-sm text-gray-400">Generate required document checklists for any route.</p>
                                </div>
                                <div onClick={() => handleCardClick("Predict delays for shipment from...")} className="lt-module-card" style={{ '--module-color': '#f59e0b', cursor: 'pointer' }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-amber-500 group-hover:scale-110 transition-transform" style={{ background: 'rgba(245,158,11,0.1)' }}>
                                        <Activity size={20} />
                                    </div>
                                    <h3 className="text-[#1a1a1a] font-medium mb-1">Risk & Delays</h3>
                                    <p className="text-sm text-gray-400">Predict disruptions and weather impacts on your lanes.</p>
                                </div>
                                <div onClick={() => handleCardClick("Estimate landed cost for...")} className="lt-module-card" style={{ '--module-color': '#a855f7', cursor: 'pointer' }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform" style={{ background: 'rgba(168,85,247,0.1)' }}>
                                        <Box size={20} />
                                    </div>
                                    <h3 className="text-[#1a1a1a] font-medium mb-1">Landed Cost</h3>
                                    <p className="text-sm text-gray-400">Calculate total cost including freight, duties, and taxes.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div key={message.id} className={cn("flex w-full", message.role === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn("flex max-w-[85%] md:max-w-[75%]", message.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                                    message.role === 'user' ? "bg-black/[0.06] ml-3" : "mr-3")}
                                    style={message.role === 'assistant' ? {
                                        background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                                        boxShadow: '0 0 12px rgba(14,165,233,0.3)',
                                    } : undefined}
                                >
                                    {message.role === 'user' ? <div className="text-xs font-bold text-[#1a1a1a]">You</div> : <Zap size={14} fill="white" color="white" />}
                                </div>

                                <div className={cn(
                                    "rounded-2xl px-4 py-3 text-sm",
                                    message.role === 'user'
                                        ? "bg-[#0EA5E9] text-white rounded-br-md"
                                        : "bg-[#F5F5F5] text-[#374151] rounded-bl-md border border-black/[0.06]"
                                )}>
                                    {formatMessage(message.content)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex w-full justify-start">
                            <div className="flex max-w-[85%] flex-row">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 mr-3" style={{
                                    background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                                    boxShadow: '0 0 12px rgba(14,165,233,0.3)',
                                }}>
                                    <Zap size={14} fill="white" color="white" />
                                </div>
                                <div className="rounded-2xl rounded-bl-md bg-[#F5F5F5] border border-black/[0.06] flex items-center gap-1 h-10 px-4">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 pt-2 bg-white border-t border-black/[0.04]">
                    <div className="relative">
                        <form onSubmit={handleSubmit} className="relative z-10">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask GasperShip AI about shipments, codes, or regulations..."
                                className="w-full bg-[#F9FAFB] border-black/[0.08] rounded-xl pl-4 pr-14 py-4 min-h-[60px] max-h-[200px] shadow-lg focus:border-[#0EA5E9]/50 focus:ring-1 focus:ring-[#0EA5E9]/50 text-[#1a1a1a] placeholder:text-gray-400 resize-none lt-scrollbar"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-3 bottom-3 h-9 w-9 rounded-lg shadow-lg transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                                    color: 'white',
                                    boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                                }}
                            >
                                <Send size={16} />
                            </Button>
                        </form>
                    </div>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-gray-400">AI analyses are estimates based on available data. Verify critical information with official sources.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
