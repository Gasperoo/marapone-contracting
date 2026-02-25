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
import '../GasperTool/GasperTool.css';

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
        maintenance: 'Predictive Maintenance'
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <ConstructionDashboard onNavigate={setActiveTab} />;
            case 'blueprint': return <BlueprintAnalyzer />;
            case 'takeoff': return <TakeoffTools />;
            case 'planner': return <ConstructionAIPlanner />;
            case 'design': return <GenerativeDesign />;
            case 'maintenance': return <PredictiveMaintenance />;
            default: return <ConstructionDashboard onNavigate={setActiveTab} />;
        }
    };

    return (
        <div className="gasper-tool-container">
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

            <main className="gasper-main">
                <header className="dashboard-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-white/70 hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="header-title">
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>
                                {tabLabels[activeTab] || 'Dashboard'}
                            </h2>
                        </div>
                        <button
                            className="flex items-center gap-2 ml-4 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            onClick={() => navigate('/gasper')}
                        >
                            <HomeIcon size={14} />
                            <span>Launcher</span>
                        </button>
                    </div>

                    <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search projects, tasks..."
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]/50 focus:bg-white/10 w-64 transition-all"
                            />
                        </div>

                        <button className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#FF6B00] rounded-full shadow-lg shadow-[#FF6B00]/50"></span>
                        </button>

                        <div className="p-1 rounded-full border border-white/10 hover:border-white/30 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFB800] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-[#FF6B00]/20">
                                GP
                            </div>
                        </div>
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
