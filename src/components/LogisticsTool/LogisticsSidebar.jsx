import React from 'react';
import {
    LayoutDashboard, Globe, MessageSquare, Search, TrendingUp,
    Package, Beaker, BarChart3, Shield, ShieldAlert, Leaf,
    FileText, DollarSign, ChevronLeft, ChevronRight, X,
    Home as HomeIcon, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LogisticsTool.css';

export function LogisticsSidebar({ activeTab, onTabChange, isCollapsed, toggleCollapse, isMobileOpen, closeMobileMenu }) {
    const navigate = useNavigate();

    const navGroups = [
        {
            items: [
                { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            ]
        },
        {
            label: 'Intelligence',
            items: [
                { id: 'map', label: 'Live Map', icon: Globe },
                { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
                { id: 'classifier', label: 'HS Classifier', icon: Search },
                { id: 'market', label: 'Market Intel', icon: TrendingUp },
            ]
        },
        {
            label: 'Operations',
            items: [
                { id: 'shipments', label: 'Shipments', icon: Package },
                { id: 'rates', label: 'Rate Check', icon: TrendingUp },
                { id: 'simulation', label: 'Digital Twin', icon: Beaker },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ]
        },
        {
            label: 'Fleet & Compliance',
            items: [
                { id: 'compliance', label: 'Compliance', icon: Shield },
                { id: 'risk', label: 'Risk Monitor', icon: ShieldAlert },
                { id: 'carbon', label: 'Sustainability', icon: Leaf },
                { id: 'docs', label: 'Documents', icon: FileText },
                { id: 'profitability', label: 'Profitability', icon: DollarSign },
            ]
        },
    ];

    const footerItems = [
        { id: 'launcher', label: 'Tool Launcher', icon: ArrowLeft, action: () => navigate('/gasper') },
        { id: 'home', label: 'Back to Site', icon: HomeIcon, action: () => navigate('/') },
    ];

    return (
        <div className={`gasper-sidebar lt-sidebar-bg ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
            {/* Brand Header */}
            <div className="sidebar-header">
                <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                        boxShadow: '0 0 20px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                >
                    LT
                </div>
                <h1 className={`font-bold text-lg tracking-tight text-[#1a1a1a] transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                    Gasper<span className="lt-gradient-text">Ship</span>
                </h1>
                <button onClick={closeMobileMenu} className="md:hidden ml-auto text-gray-500 hover:text-gray-900">
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <div className="sidebar-nav lt-scrollbar" style={{ paddingTop: 8 }}>
                {navGroups.map((group, gIdx) => (
                    <div key={gIdx} style={{ marginBottom: 8 }}>
                        {group.label && !isCollapsed && (
                            <div style={{
                                padding: '8px 16px 6px',
                                fontSize: '0.55rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                color: 'rgba(0,0,0,0.3)',
                            }}>
                                {group.label}
                            </div>
                        )}
                        {group.label && isCollapsed && (
                            <div style={{
                                margin: '8px 12px',
                                height: 1,
                                background: 'rgba(0,0,0,0.06)',
                            }} />
                        )}
                        {group.items.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <div
                                    key={item.id}
                                    className={`nav-item ${isActive ? 'active lt-nav-item-active' : ''}`}
                                    onClick={() => item.action ? item.action() : onTabChange(item.id)}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <item.icon
                                        size={18}
                                        style={{
                                            color: isActive ? '#0EA5E9' : '#6b7280',
                                            filter: isActive ? 'drop-shadow(0 0 6px rgba(14,165,233,0.5))' : 'none',
                                            transition: 'all 0.3s',
                                        }}
                                    />
                                    <span className="nav-label" style={{
                                        fontSize: '0.8rem',
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#1a1a1a' : '#6b7280',
                                    }}>
                                        {item.label}
                                    </span>
                                    {isActive && !isCollapsed && (
                                        <div style={{
                                            marginLeft: 'auto',
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: '#0EA5E9',
                                            boxShadow: '0 0 10px rgba(14,165,233,0.8), 0 0 20px rgba(14,165,233,0.4)',
                                            animation: 'lt-dot-pulse 2s ease-in-out infinite',
                                        }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

                {/* Separator */}
                <div style={{ margin: '8px 12px', height: 1, background: 'rgba(0,0,0,0.06)' }} />

                {/* Footer Nav */}
                {footerItems.map((item) => (
                    <div
                        key={item.id}
                        className="nav-item"
                        onClick={() => item.action?.()}
                        title={isCollapsed ? item.label : undefined}
                    >
                        <item.icon size={18} style={{ color: '#6b7280' }} />
                        <span className="nav-label" style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                        }}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Collapse Toggle */}
            <div className="p-4 border-t border-black/[0.06] hidden md:block">
                <button
                    onClick={toggleCollapse}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-black/5 text-gray-400 hover:text-gray-700 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>
        </div>
    );
}
