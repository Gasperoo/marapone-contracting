import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Textarea } from '../ui/Textarea';
import { Loader2, Send, FileText, AlertCircle, Upload } from 'lucide-react';
import { answerComplianceQuestion, getRegulationUpdates, processPOD, analyzePOD } from './services/complianceOperationsService';
import { simulateDelay } from '../../lib/utils';
import './GasperTool.css';

export function ComplianceQA() {
    const [mode, setMode] = useState('qa');
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [answer, setAnswer] = useState(null);
    const [podAnalysis, setPodAnalysis] = useState(null);

    const updates = getRegulationUpdates();

    const suggestedQuestions = [
        'What are the latest EU CBAM rules for steel imports?',
        'What documents do I need for USMCA certification?',
        'How do I screen for sanctions compliance?',
        'What are the import restrictions for food products to Canada?',
    ];

    const handleAskQuestion = async () => {
        if (!question.trim()) return;

        setIsLoading(true);
        await simulateDelay(800);

        const result = answerComplianceQuestion(question);
        setAnswer(result);
        setIsLoading(false);
    };

    const handleProcessPOD = async () => {
        setIsLoading(true);
        await simulateDelay(1000);

        const pod = processPOD('mock-pod-document.pdf');
        const analysis = analyzePOD(pod);
        setPodAnalysis(analysis);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            {/* Mode Selector */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
                <Button
                    variant={mode === 'qa' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('qa')}
                    className={mode === 'qa' ? 'bg-glass-highlight' : ''}
                >
                    Compliance Q&A
                </Button>
                <Button
                    variant={mode === 'pod' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('pod')}
                    className={mode === 'pod' ? 'bg-glass-highlight' : ''}
                >
                    POD & Claims Assistant
                </Button>
            </div>

            {mode === 'qa' ? (
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Main Q&A Panel */}
                    <div className="md:col-span-2 space-y-4">
                        <Card className="p-6 bg-white/5 border-white/10">
                            <h3 className="text-xl font-semibold mb-4 text-white">Ask a Compliance Question</h3>

                            <div className="space-y-4">
                                <div>
                                    <Textarea
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="Ask about regulations, compliance requirements, tariffs, or trade agreements..."
                                        className="min-h-[100px] bg-white/5 text-white placeholder:text-white/40 border-white/10 focus:border-white/30"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleAskQuestion();
                                            }
                                        }}
                                    />
                                </div>

                                <Button onClick={handleAskQuestion} disabled={isLoading || !question.trim()} className="w-full bg-blue-600 hover:bg-blue-700">
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                                    Ask Question
                                </Button>

                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-sm font-medium mb-2 text-white/80">Suggested Questions:</p>
                                    <div className="space-y-2">
                                        {suggestedQuestions.map((q, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setQuestion(q)}
                                                className="w-full text-left text-sm p-2 rounded hover:bg-white/10 transition-colors text-blue-300"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {answer && (
                            <Card className="p-6 bg-white/10 border-white/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="flex items-start gap-3 mb-4">
                                    <FileText className="h-5 w-5 text-blue-400 mt-1" />
                                    <div className="flex-1">
                                        <h4 className="font-semibold mb-2 text-white">Answer</h4>
                                        <div className="prose prose-sm prose-invert max-w-none">
                                            <p className="whitespace-pre-wrap text-white/90">{answer.answer}</p>
                                        </div>

                                        {answer.warnings && answer.warnings.length > 0 && (
                                            <div className="mt-4 p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                                <div className="flex items-start gap-2">
                                                    <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium mb-1 text-orange-200">Important Warnings:</p>
                                                        <ul className="text-sm space-y-1 text-orange-100">
                                                            {answer.warnings.map((w, idx) => (
                                                                <li key={idx}>• {w}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-sm font-medium mb-2 text-white/80">Sources:</p>
                                            <ul className="text-sm space-y-1">
                                                {answer.citations.map((c, idx) => (
                                                    <li key={idx} className="text-white/60">
                                                        • {c.source} (Updated: {new Date(c.lastUpdated).toLocaleDateString()})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {answer.relatedRegulations.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <p className="text-sm font-medium mb-2 text-white/80">Related Regulations:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {answer.relatedRegulations.map((r, idx) => (
                                                        <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 rounded text-blue-200">
                                                            {r}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar - Recent Updates */}
                    <div className="space-y-4">
                        <Card className="p-4 bg-white/5 border-white/10">
                            <h4 className="font-semibold mb-3 text-white">Recent Regulation Updates</h4>
                            <div className="space-y-3">
                                {updates.map((update) => (
                                    <div key={update.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                        <div className="flex items-start gap-2 mb-1">
                                            <span className={`text-xs px-2 py-0.5 rounded ${update.severity === 'Critical' ? 'bg-red-500/20 text-red-300' :
                                                    update.severity === 'Important' ? 'bg-orange-500/20 text-orange-300' :
                                                        'bg-blue-500/20 text-blue-300'
                                                }`}>
                                                {update.severity}
                                            </span>
                                        </div>
                                        <p className="font-medium text-sm mb-1 text-white">{update.title}</p>
                                        <p className="text-xs text-white/60 mb-2">{update.summary}</p>
                                        <p className="text-xs text-white/40">
                                            Effective: {new Date(update.effectiveDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <Card className="p-6 bg-white/5 border-white/10">
                        <h3 className="text-xl font-semibold mb-4 text-white">Proof of Delivery & Claims Assistant</h3>

                        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center mb-6 hover:border-white/20 transition-colors">
                            <Upload className="h-12 w-12 mx-auto mb-4 text-white/40" />
                            <p className="text-sm text-white/60 mb-4">
                                Upload POD document (PDF, JPG, PNG)
                            </p>
                            <Button onClick={handleProcessPOD} disabled={isLoading} variant="outline" className="border-white/20 hover:bg-white/10">
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Process Sample POD
                            </Button>
                        </div>

                        {podAnalysis && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <Card className="p-4 bg-white/5 border-white/10">
                                    <h4 className="font-semibold mb-3 text-white">Extracted Data</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-white/60">Shipment ID</p>
                                            <p className="font-medium text-white">{podAnalysis.pod.shipmentId}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Delivery Date</p>
                                            <p className="font-medium text-white">{new Date(podAnalysis.pod.deliveryDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Recipient</p>
                                            <p className="font-medium text-white">{podAnalysis.pod.recipientName}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Condition</p>
                                            <p className={`font-medium ${podAnalysis.pod.condition === 'good' ? 'text-green-400' :
                                                    podAnalysis.pod.condition === 'damaged' ? 'text-red-400' :
                                                        'text-orange-400'
                                                }`}>
                                                {podAnalysis.pod.condition.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                {podAnalysis.discrepancies.length > 0 && (
                                    <Card className="p-4 bg-orange-500/10 border-orange-500/20">
                                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-orange-400">
                                            <AlertCircle className="h-4 w-4" />
                                            Discrepancies Detected ({podAnalysis.discrepancies.length})
                                        </h4>
                                        <div className="space-y-3">
                                            {podAnalysis.discrepancies.map((disc, idx) => (
                                                <div key={idx} className="p-3 bg-black/20 rounded border border-orange-500/10">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-medium text-sm text-white">{disc.type.replace(/_/g, ' ').toUpperCase()}</p>
                                                        <span className={`text-xs px-2 py-0.5 rounded ${disc.severity === 'High' ? 'bg-red-500/20 text-red-300' :
                                                                disc.severity === 'Medium' ? 'bg-orange-500/20 text-orange-300' :
                                                                    'bg-yellow-500/20 text-yellow-300'
                                                            }`}>
                                                            {disc.severity}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-white/80 mb-2">{disc.description}</p>
                                                    <p className="text-sm text-white">
                                                        <span className="font-medium text-orange-300">Action:</span> {disc.recommendedAction}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {podAnalysis.claimTemplate && (
                                    <Card className="p-4 bg-white/5 border-white/10">
                                        <h4 className="font-semibold mb-3 text-white">Generated Claim Template</h4>
                                        <div className="p-4 bg-black/30 rounded font-mono text-xs whitespace-pre-wrap text-white/80">
                                            {podAnalysis.claimTemplate.template}
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-white">Download Template</Button>
                                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-white">Email to Carrier</Button>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
}
