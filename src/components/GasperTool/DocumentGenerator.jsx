import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { FileText, Download, CheckCircle, Loader2 } from 'lucide-react';
import { generateTradeDocument } from './services/documentService';
import { simulateDelay } from '../../lib/utils';
import './GasperTool.css';

export function DocumentGenerator() {
    const [docType, setDocType] = useState('invoice');
    const [template, setTemplate] = useState('standard');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedDoc, setGeneratedDoc] = useState(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        await simulateDelay(1500); // Simulate PDF generation time

        const doc = generateTradeDocument({
            shipmentId: 'SHP-2024-001',
            documentTypes: [docType],
            includeSignature: true,
            template: template,
        });

        setGeneratedDoc(doc);
        setIsGenerating(false);
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-white/5 border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-white">AI Document Generator</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="text-sm font-medium text-white/80 mb-2 block">Document Type</label>
                        <Select value={docType} onValueChange={setDocType}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="invoice">Commercial Invoice</SelectItem>
                                <SelectItem value="packing_list">Packing List</SelectItem>
                                <SelectItem value="origin_certificate">Certificate of Origin</SelectItem>
                                <SelectItem value="bill_of_lading">Bill of Lading</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-white/80 mb-2 block">Template Style</label>
                        <Select value={template} onValueChange={setTemplate}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="formal">Formal</SelectItem>
                                <SelectItem value="compact">Compact</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-end">
                        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-indigo-600 hover:bg-indigo-700">
                            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
                            Generate Document
                        </Button>
                    </div>
                </div>

                {generatedDoc && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="border border-white/10 rounded-lg p-6 bg-white shadow-lg text-slate-900 mb-4 min-h-[500px]">
                            {/* Document Preview Header - White Paper Look */}
                            <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold uppercase text-slate-800">{generatedDoc.content.title}</h2>
                                    <p className="text-sm text-slate-500">Generated on {new Date(generatedDoc.dateCreated).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-sm text-slate-400">ID: {generatedDoc.id}</p>
                                </div>
                            </div>

                            {/* Document Sections */}
                            <div className="space-y-6">
                                {generatedDoc.content.sections.map((section, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-sm font-semibold text-slate-500 uppercase mb-1">{section.heading}</h4>
                                        {typeof section.content === 'string' ? (
                                            <pre className="text-sm font-sans whitespace-pre-wrap bg-slate-50 text-slate-700 p-3 rounded border border-slate-100">{section.content}</pre>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-3 rounded border border-slate-100">
                                                {Object.entries(section.content).map(([key, value]) => (
                                                    <div key={key}>
                                                        <span className="font-medium text-slate-700">{key}:</span> <span className="text-slate-600">{String(value)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" className="text-green-400 border-green-500/20 bg-green-500/10 hover:bg-green-500/20">
                                <CheckCircle className="h-4 w-4 mr-2" /> Verified by AI
                            </Button>
                            <Button className="bg-white/10 hover:bg-white/20">
                                <Download className="h-4 w-4 mr-2" /> Download PDF
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
