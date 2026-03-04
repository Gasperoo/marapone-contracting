import React, { useState } from 'react';
import { Bell, Search, Menu, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LogisticsSidebar } from './LogisticsSidebar';
import { LogisticsDashboard } from './LogisticsDashboard';
import { LiveTrackingMap } from '../GasperTool/LiveTrackingMap';
import { ChatInterface } from '../GasperTool/ChatInterface';
import { HSCodeClassifier } from '../GasperTool/HSCodeClassifier';
import { MarketDashboard } from '../GasperTool/MarketDashboard';
import { ShipmentDashboard } from '../GasperTool/ShipmentDashboard';
import { RateComparison } from '../GasperTool/RateComparison';
import { DigitalTwinSimulator } from '../GasperTool/DigitalTwinSimulator';
import { Analytics } from '../GasperTool/Analytics';
import { ComplianceGuard } from '../GasperTool/ComplianceGuard';
import { DocSentinel } from '../GasperTool/DocSentinel';
import { EcoSentinel } from '../GasperTool/EcoSentinel';
import { RiskSentinel } from '../GasperTool/RiskSentinel';
import { ProfitabilityAnalyzer } from '../GasperTool/ProfitabilityAnalyzer';
import '../GasperTool/GasperTool.css';
import '../../styles/LogisticsTool.css';

export default function LogisticsTool() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const tabLabels = {
        dashboard: 'Dashboard',
        map: 'Live Tracking Map',
        chat: 'AI Assistant',
        classifier: 'HS Code Classifier',
        market: 'Market Intelligence',
        shipments: 'Shipment Dashboard',
        rates: 'Rate Comparison',
        simulation: 'Digital Twin Simulator',
        analytics: 'Analytics',
        compliance: 'Compliance Guard',
        risk: 'Risk Sentinel',
        carbon: 'Eco Sentinel',
        docs: 'Document Sentinel',
        profitability: 'Profitability Analyzer',
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <LogisticsDashboard onNavigate={setActiveTab} />;
            case 'map': return <LiveTrackingMap />;
            case 'chat': return <ChatInterface />;
            case 'classifier': return <HSCodeClassifier />;
            case 'market': return <MarketDashboard />;
            case 'shipments': return <ShipmentDashboard />;
            case 'rates': return <RateComparison />;
            case 'simulation': return <DigitalTwinSimulator />;
            case 'analytics': return <Analytics />;
            case 'compliance': return <ComplianceGuard />;
            case 'risk': return <RiskSentinel />;
            case 'carbon': return <EcoSentinel />;
            case 'docs': return <DocSentinel />;
            case 'profitability': return <ProfitabilityAnalyzer />;
            default: return <LogisticsDashboard onNavigate={setActiveTab} />;
        }
    };

    return (
        <div className="gasper-tool-container" style={{ background: '#F5F5F5' }}>
            {/* Ambient Glow Background */}
            <div className="lt-ambient-bg" />

            <LogisticsSidebar
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

            <main className="gasper-main" style={{ position: 'relative', zIndex: 1 }}>
                {/* Premium Header */}
                <header className="lt-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 24px',
                }}>
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={22} />
                        </button>
                        <div>
                            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
                                {tabLabels[activeTab] || 'Dashboard'}
                            </h2>
                        </div>
                        <button
                            className="flex items-center gap-2 ml-3 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                            onClick={() => navigate('/gasper')}
                            style={{
                                background: 'rgba(0,0,0,0.03)',
                                border: '1px solid rgba(0,0,0,0.08)',
                                color: '#6b7280',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(14,165,233,0.08)';
                                e.target.style.borderColor = 'rgba(14,165,233,0.2)';
                                e.target.style.color = '#0EA5E9';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(0,0,0,0.03)';
                                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                                e.target.style.color = '#6b7280';
                            }}
                        >
                            <HomeIcon size={13} />
                            <span>Launcher</span>
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'rgba(0,0,0,0.25)' }} />
                            <input
                                type="text"
                                placeholder="Search shipments, rates..."
                                className="lt-search-input"
                                style={{
                                    paddingLeft: '36px',
                                    paddingRight: '16px',
                                    paddingTop: '8px',
                                    paddingBottom: '8px',
                                    fontSize: '0.8rem',
                                    color: '#1a1a1a',
                                    width: '240px',
                                    outline: 'none',
                                }}
                            />
                        </div>

                        <button onClick={() => alert("This operational feature is currently in preview.")}
                            className="p-2 rounded-xl transition-all relative"
                            style={{
                                background: 'rgba(0,0,0,0.03)',
                                border: '1px solid rgba(0,0,0,0.08)',
                                color: '#6b7280',
                            }}
                        >
                            <Bell size={17} />
                            <span style={{
                                position: 'absolute',
                                top: 7,
                                right: 7,
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                background: '#0EA5E9',
                                boxShadow: '0 0 8px rgba(14,165,233,0.6)',
                                animation: 'lt-dot-pulse 2s ease-in-out infinite',
                            }} />
                        </button>

                        <div style={{
                            padding: 2,
                            borderRadius: '50%',
                            border: '1px solid rgba(0,0,0,0.08)',
                        }}>
                            <div style={{
                                height: 32,
                                width: 32,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '0.7rem',
                                boxShadow: '0 0 15px rgba(14,165,233,0.3)',
                            }}>
                                GP
                            </div>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content lt-scrollbar" style={{ position: 'relative' }}>
                    {renderContent()}
                </div>
            </main>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
