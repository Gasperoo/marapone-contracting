import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { ShieldAlert, Search, CheckCircle2, AlertOctagon, Info, Loader2 } from 'lucide-react';
import { screenEntity } from './services/riskMarketService';
import { simulateDelay } from '../../lib/utils';
import './GasperTool.css';

export function SanctionsMonitor() {
    const [entityName, setEntityName] = useState('');
    const [country, setCountry] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleScan = async () => {
        if (!entityName) return;
        setIsLoading(true);
        await simulateDelay(1200); // Simulate API call
        const scanResult = screenEntity({
            entityName,
            country: country || 'Unknown',
            entityType: 'company',
        });
        setResult(scanResult);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-white/5 border-white/10">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-white">
                    <ShieldAlert className="h-6 w-6 text-indigo-400" />
                    Sanctions Screening Watchtower
                </h3>
                <p className="text-sm text-white/60 mb-6">
                    Screen entities against OFAC, EU, UN, and UK sanctions lists in real-time.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <Input
                            placeholder="Enter Company or Individual Name..."
                            value={entityName}
                            onChange={(e) => setEntityName(e.target.value)}
                            className="h-10"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <Select value={country} onValueChange={setCountry}>
                            <SelectTrigger className="h-10"><SelectValue placeholder="Country (Optional)" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="China">China</SelectItem>
                                <SelectItem value="Russia">Russia</SelectItem>
                                <SelectItem value="Iran">Iran</SelectItem>
                                <SelectItem value="UAE">UAE</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleScan} disabled={isLoading || !entityName} className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                        Screen Entity
                    </Button>
                </div>

                {/* Results Display */}
                {result && (
                    <div className={`border rounded-lg p-6 animate-in fade-in zoom-in-95 duration-300 ${result.riskLevel === 'high' ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'
                        }`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full ${result.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                }`}>
                                {result.riskLevel === 'high' ? <AlertOctagon className="h-8 w-8" /> : <CheckCircle2 className="h-8 w-8" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{result.entityScanned}</h4>
                                        <p className="text-sm font-medium opacity-80 uppercase tracking-wide text-white/80">
                                            Status: {result.resolution} • Risk Level: {result.riskLevel.toUpperCase()}
                                        </p>
                                    </div>
                                    <p className="text-xs font-mono opacity-60 text-white/60">ID: {result.id}</p>
                                </div>

                                {result.matches.length > 0 ? (
                                    <div className="mt-4 space-y-3">
                                        <p className="font-semibold text-sm text-white">Matches Found:</p>
                                        {result.matches.map((match, idx) => (
                                            <div key={idx} className="bg-black/20 p-3 rounded text-sm text-white/90">
                                                <p><span className="font-bold">{match.listProvider} List</span> — Score: {Math.round(match.matchScore * 100)}%</p>
                                                <p className="text-xs mt-1 text-white/60">Matched Entity: {match.matchedEntity}</p>
                                                <p className="text-xs text-white/60">Program: {match.program}</p>
                                                <p className="text-xs mt-1 italic opacity-80 text-white/60">"{match.notes}"</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-4 text-sm text-white/80">
                                        No matches found in global sanctions databases. This entity appears clear for trade based on current lists.
                                    </p>
                                )}
                            </div>
                        </div>

                        {result.riskLevel === 'high' && (
                            <div className="mt-4 flex gap-2 justify-end">
                                <Button variant="destructive" size="sm">Flag Transaction</Button>
                                <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-white">Request Full Report</Button>
                            </div>
                        )}
                    </div>
                )}

                {!result && (
                    <div className="text-center py-12 text-white/40 bg-white/5 rounded-lg border border-dashed border-white/10">
                        <Info className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>Enter an entity name above to perform a real-time sanctions check.</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
