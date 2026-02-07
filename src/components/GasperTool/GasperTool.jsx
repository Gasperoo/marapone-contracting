import React, { useState } from 'react';
import { Bell, User, Search } from 'lucide-react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardOverview } from './DashboardOverview';
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
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardOverview />;
            case 'chat': return <ChatInterface />;
            case 'classifier': return <HSCodeClassifier />;
            case 'shipments': return <ShipmentDashboard />;
            case 'simulation': return <DigitalTwinSimulator />;
            case 'rates': return <RateComparison />;
            case 'analytics': return <ProfitabilityAnalyzer />;
            case 'compliance': return <ComplianceQA />;
            case 'docs': return <DocumentGenerator />;
            case 'carbon': return <CarbonOptimizer />;
            case 'risk': return <SanctionsMonitor />;
            case 'market': return <MarketDashboard />;
            default: return <DashboardOverview />;
        }
    };

    return (
        <div className="gasper-tool-container">
            <DashboardSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isCollapsed={sidebarCollapsed}
                toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <main className="gasper-main">
                <header className="dashboard-header">
                    <div className="header-title">
                        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Explorer</h2>
                    </div>

                    <div className="header-actions">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search shipments, rates..."
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 w-64 transition-all"
                            />
                        </div>

                        <button className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></span>
                        </button>

                        <button className="p-1 rounded-full border border-white/10 hover:border-white/30 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                GP
                            </div>
                        </button>
                    </div>
                </header>

                <div className="dashboard-content custom-scrollbar">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
