import React, { useState } from 'react';
import { Bell, User, Search, Menu, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { LiveTrackingMap } from './LiveTrackingMap';
import './GasperTool.css';

export default function GasperTool() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardOverview />;
            case 'map': return <LiveTrackingMap />;
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
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                }}
                isCollapsed={sidebarCollapsed}
                toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                isMobileOpen={mobileMenuOpen}
                closeMobileMenu={() => setMobileMenuOpen(false)}
            />

            <main className="gasper-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-white/70 hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="header-title">
                            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Explorer</h2>
                        </div>
                        <button
                            className="flex items-center gap-2 ml-4 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            onClick={() => navigate('/')}
                        >
                            <HomeIcon size={14} />
                            <span>Back to Home</span>
                        </button>
                    </div>

                    <div className="header-actions">
                        <div className="relative group hidden md:block">
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

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
