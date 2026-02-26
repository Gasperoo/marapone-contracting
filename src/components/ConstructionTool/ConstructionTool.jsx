import React, { useState } from 'react';
import { Bell, User, Search, Menu, Home as HomeIcon, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ConstructionSidebar } from './ConstructionSidebar';
import { ConstructionDashboard } from './ConstructionDashboard';
import { BlueprintAnalyzer } from './BlueprintAnalyzer';
import { TakeoffTools } from './TakeoffTools';
import { ConstructionAIPlanner } from './ConstructionAIPlanner';
import { GenerativeDesign } from './GenerativeDesign';
import { PredictiveMaintenance } from './PredictiveMaintenance';
import { CashFlowGuardian } from './CashFlowGuardian';
import { SubcontractorMatchmaker } from './SubcontractorMatchmaker';
import { ComplianceAutoPilot } from './ComplianceAutoPilot';
import { MicroProjectOptimizer } from './MicroProjectOptimizer';
import { ClientFeedbackFusion } from './ClientFeedbackFusion';
import { TheftSentinel } from './TheftSentinel';
import { SiteArrivalOptimizer } from './SiteArrivalOptimizer';
import '../GasperTool/GasperTool.css';
import '../../styles/ConstructionTool.css';

export default function ConstructionTool() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const tabLabels = {
        dashboard: 'Dashboard',
        blueprint: 'Blueprint Analyzer',
        takeoff: 'Takeoff Tools',
        planner: 'AI Planner',
        design: 'Generative Design',
        maintenance: 'Predictive Maintenance',
        cashflow: 'Cash Flow Guardian',
        subcontractor: 'Sub Matchmaker',
        cap: 'Compliance Auto-Pilot',
        optimizer: 'Micro-Project Optimizer',
        feedback: 'Client Feedback Fusion',
        theft: 'Theft Sentinel',
        utilization: 'Site Arrival Optimizer',
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <ConstructionDashboard onNavigate={setActiveTab} />;
            case 'blueprint': return <BlueprintAnalyzer />;
            case 'takeoff': return <TakeoffTools />;
            case 'planner': return <ConstructionAIPlanner />;
            case 'design': return <GenerativeDesign />;
            case 'maintenance': return <PredictiveMaintenance />;
            case 'cashflow': return <CashFlowGuardian />;
            case 'subcontractor': return <SubcontractorMatchmaker />;
            case 'cap': return <ComplianceAutoPilot />;
            case 'optimizer': return <MicroProjectOptimizer />;
            case 'feedback': return <ClientFeedbackFusion />;
            case 'theft': return <TheftSentinel />;
            case 'utilization': return <SiteArrivalOptimizer />;
            default: return <ConstructionDashboard onNavigate={setActiveTab} />;
        }
    };

    return (
        <div className="gasper-tool-container" style={{ background: 'linear-gradient(135deg, #080c14 0%, #0d1117 40%, #111827 100%)' }}>
            {/* Ambient Glow Background */}
            <div className="ct-ambient-bg" />

            <ConstructionSidebar
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
                <header className="ct-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 24px',
                }}>
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-white/70 hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={22} />
                        </button>
                        <div>
                            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
                                {tabLabels[activeTab] || 'Dashboard'}
                            </h2>
                        </div>
                        <button
                            className="flex items-center gap-2 ml-3 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                            onClick={() => navigate('/gasper')}
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                color: 'rgba(255,255,255,0.5)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255,107,0,0.08)';
                                e.target.style.borderColor = 'rgba(255,107,0,0.2)';
                                e.target.style.color = '#FF6B00';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.04)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                                e.target.style.color = 'rgba(255,255,255,0.5)';
                            }}
                        >
                            <HomeIcon size={13} />
                            <span>Launcher</span>
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
                            <input
                                type="text"
                                placeholder="Search projects, tasks..."
                                className="ct-search-input"
                                style={{
                                    paddingLeft: '36px',
                                    paddingRight: '16px',
                                    paddingTop: '8px',
                                    paddingBottom: '8px',
                                    fontSize: '0.8rem',
                                    color: 'white',
                                    width: '240px',
                                    outline: 'none',
                                }}
                            />
                        </div>

                        <button
                            className="p-2 rounded-xl transition-all relative"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                color: 'rgba(255,255,255,0.5)',
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
                                background: '#FF6B00',
                                boxShadow: '0 0 8px rgba(255,107,0,0.6)',
                                animation: 'ct-dot-pulse 2s ease-in-out infinite',
                            }} />
                        </button>

                        <div style={{
                            padding: 2,
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <div style={{
                                height: 32,
                                width: 32,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #FF6B00, #FFB800)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '0.7rem',
                                boxShadow: '0 0 15px rgba(255,107,0,0.3)',
                            }}>
                                GP
                            </div>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content ct-scrollbar" style={{ position: 'relative' }}>
                    {renderContent()}
                </div>
            </main>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
