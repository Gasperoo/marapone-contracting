import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
// import { Label } from '../ui/Label'; // We don't have Label, just use span/label tag
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { classifyHSCode } from './aiService';

export function HSCodeClassifier() {
    const [productDescription, setProductDescription] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClassify = async (e) => {
        e.preventDefault();
        if (!productDescription.trim()) return;

        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        const classification = classifyHSCode(productDescription);
        setResult(classification);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="gasper-card">
                <h3 className="text-xl font-bold mb-2">HS Code Classifier</h3>
                <p className="text-sm text-muted-foreground mb-4">Enter a product description to get its Harmonized System (HS) code classification</p>

                <form onSubmit={handleClassify} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="product" className="gasper-label">Product Description</label>
                        <Input
                            id="product"
                            placeholder="e.g., portable Bluetooth speaker"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="gasper-input"
                        />
                    </div>
                    <Button type="submit" disabled={isLoading || !productDescription.trim()} className="gasper-btn primary w-full">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Classifying...
                            </>
                        ) : (
                            <>
                                <Search className="mr-2 h-4 w-4" />
                                Classify Product
                            </>
                        )}
                    </Button>
                </form>
            </div>

            {result && (
                <div className="gasper-card" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white">{result.code}</h3>
                            <p className="mt-1 text-white/80">{result.description}</p>
                        </div>
                        {result.confidence >= 0.7 ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                            <AlertCircle className="h-6 w-6 text-yellow-500" />
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="gasper-label">Confidence</p>
                            <div className="mt-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${result.confidence >= 0.7
                                                ? 'bg-green-500'
                                                : result.confidence >= 0.5
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                                }`}
                                            style={{ width: `${result.confidence * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-white">
                                        {(result.confidence * 100).toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="gasper-label">Duty Rate</p>
                            <p className="mt-1 text-lg font-semibold text-white">{result.dutyRate}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="gasper-label mb-2">Reasoning</p>
                        <p className="text-sm text-white/80">{result.reasoning}</p>
                    </div>

                    {result.confidence < 0.7 && (
                        <div className="bg-yellow-900/40 border border-yellow-800 rounded-lg p-4">
                            <div className="flex gap-2">
                                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-yellow-200">
                                        Low Confidence Classification
                                    </p>
                                    <p className="text-sm text-yellow-300/80 mt-1">
                                        We recommend consulting with a licensed customs broker to verify this
                                        classification before importing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
