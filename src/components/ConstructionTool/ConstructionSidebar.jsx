import React from 'react';
import {
    LayoutDashboard, FileSearch, Calculator, BrainCircuit,
    Boxes, Wrench, ChevronLeft, ChevronRight, X,
    Home as HomeIcon, ArrowLeft, DollarSign, UserSearch,
    ShieldCheck, CalendarClock, MessageCircleHeart, Siren, MapPinCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ConstructionTool.css';

export function ConstructionSidebar({ activeTab, onTabChange, isCollapsed, toggleCollapse, isMobileOpen, closeMobileMenu }) {
    const navigate = useNavigate();

    const navGroups = [
        {
            items: [
                { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            ]
        },
        {
            label: 'Analysis',
            items: [
                { id: 'blueprint', label: 'Blueprint AI', icon: FileSearch },
                { id: 'takeoff', label: 'Takeoff Tools', icon: Calculator },
                { id: 'planner', label: 'AI Planner', icon: BrainCircuit },
                { id: 'design', label: 'Generative Design', icon: Boxes },
            ]
        },
        {
            label: 'Operations',
            items: [
                { id: 'maintenance', label: 'Predictive Maint.', icon: Wrench },
                { id: 'cashflow', label: 'Cash Flow', icon: DollarSign },
                { id: 'subcontractor', label: 'Sub Matchmaker', icon: UserSearch },
                { id: 'cap', label: 'Compliance', icon: ShieldCheck },
            ]
        },
        {
            label: 'Field',
            items: [
                { id: 'optimizer', label: 'Job Optimizer', icon: CalendarClock },
                { id: 'feedback', label: 'Client Feedback', icon: MessageCircleHeart },
                { id: 'theft', label: 'Theft Sentinel', icon: Siren },
                { id: 'utilization', label: 'Site Arrival', icon: MapPinCheck },
            ]
        },
    ];

    const footerItems = [
        { id: 'launcher', label: 'Tool Launcher', icon: ArrowLeft, action: () => navigate('/gasper') },
        { id: 'home', label: 'Back to Site', icon: HomeIcon, action: () => navigate('/') },
    ];

    return (
        <div className={`gasper-sidebar ct-sidebar-bg ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
            {/* Brand Header */}
            <div className="sidebar-header">
                <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, #FF6B00, #FFB800)',
                        boxShadow: '0 0 20px rgba(255,107,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                >
                    CT
                </div>
                <h1 className={`font-bold text-lg tracking-tight text-white transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                    Gasper<span className="ct-gradient-text">Build</span>
                </h1>
                <button onClick={closeMobileMenu} className="md:hidden ml-auto text-white/60 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <div className="sidebar-nav ct-scrollbar" style={{ paddingTop: 8 }}>
                {navGroups.map((group, gIdx) => (
                    <div key={gIdx} style={{ marginBottom: 8 }}>
                        {group.label && !isCollapsed && (
                            <div style={{
                                padding: '8px 16px 6px',
                                fontSize: '0.55rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                color: 'rgba(255,255,255,0.2)',
                            }}>
                                {group.label}
                            </div>
                        )}
                        {group.label && isCollapsed && (
                            <div style={{
                                margin: '8px 12px',
                                height: 1,
                                background: 'rgba(255,255,255,0.06)',
                            }} />
                        )}
                        {group.items.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <div
                                    key={item.id}
                                    className={`nav-item ${isActive ? 'active ct-nav-item-active' : ''}`}
                                    onClick={() => item.action ? item.action() : onTabChange(item.id)}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <item.icon
                                        size={18}
                                        style={{
                                            color: isActive ? '#FF6B00' : 'rgba(255,255,255,0.5)',
                                            filter: isActive ? 'drop-shadow(0 0 6px rgba(255,107,0,0.5))' : 'none',
                                            transition: 'all 0.3s',
                                        }}
                                    />
                                    <span className="nav-label" style={{
                                        fontSize: '0.8rem',
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                                    }}>
                                        {item.label}
                                    </span>
                                    {isActive && !isCollapsed && (
                                        <div style={{
                                            marginLeft: 'auto',
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: '#FF6B00',
                                            boxShadow: '0 0 10px rgba(255,107,0,0.8), 0 0 20px rgba(255,107,0,0.4)',
                                            animation: 'ct-dot-pulse 2s ease-in-out infinite',
                                        }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

                {/* Separator */}
                <div style={{ margin: '8px 12px', height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {/* Footer Nav */}
                {footerItems.map((item) => (
                    <div
                        key={item.id}
                        className="nav-item"
                        onClick={() => item.action?.()}
                        title={isCollapsed ? item.label : undefined}
                    >
                        <item.icon size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
                        <span className="nav-label" style={{
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.45)',
                        }}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Collapse Toggle */}
            <div className="p-4 border-t border-white/[0.04] hidden md:block">
                <button
                    onClick={toggleCollapse}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>
        </div>
    );
}
