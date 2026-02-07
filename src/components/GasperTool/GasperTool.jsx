import React, { useState } from 'react';
import { MessageSquare, Search, Beaker, TrendingUp, BarChart3, Shield, FileText, Leaf, ShieldAlert, Globe, Package } from 'lucide-react';
import { ChatInterface } from './ChatInterface';
import { HSCodeClassifier } from './HSCodeClassifier';
import { ShipmentDashboard } from './ShipmentDashboard';
import { DigitalTwinSimulator } from './DigitalTwinSimulator';
import { RateComparison } from './RateComparison';
import { ProfitabilityAnalyzer } from './ProfitabilityAnalyzer';
import { ComplianceQA } from './ComplianceQA';
import { DocumentGenerator } from './DocumentGenerator';
import { CarbonOptimizer } from './CarbonOptimizer';
import { SanctionsMonitor } from './SanctionsMonitor';
import { MarketDashboard } from './MarketDashboard';
import './GasperTool.css';

export default function GasperTool() {
    const [activeTab, setActiveTab] = useState('chat');

    const tabs = [
        { id: 'chat', label: 'AI Chat', icon: MessageSquare, component: ChatInterface },
        { id: 'classifier', label: 'HS Code', icon: Search, component: HSCodeClassifier },
        { id: 'shipments', label: 'Shipments', icon: Package, component: ShipmentDashboard },
        { id: 'simulation', label: 'Simulate', icon: Beaker, component: DigitalTwinSimulator },
        { id: 'rates', label: 'Rates', icon: TrendingUp, component: RateComparison },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, component: ProfitabilityAnalyzer },
        { id: 'compliance', label: 'Compliance', icon: Shield, component: ComplianceQA },
        { id: 'docs', label: 'Docs', icon: FileText, component: DocumentGenerator },
        { id: 'carbon', label: 'Carbon', icon: Leaf, component: CarbonOptimizer },
        { id: 'risk', label: 'Risk', icon: ShieldAlert, component: SanctionsMonitor },
        { id: 'market', label: 'Market', icon: Globe, component: MarketDashboard },
    ];

    const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || ChatInterface;

    return (
        <div className="gasper-tool-container">
            <div className="gasper-header">
                <h1 className="gasper-title">Gasper Trade Tool</h1>
                <p className="gasper-subtitle">Your intelligent companion for import/export and logistics</p>
            </div>

            <div className="gasper-tabs-list">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`gasper-tab-trigger ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="gasper-content">
                <ActiveComponent />
            </div>
        </div>
    );
}
