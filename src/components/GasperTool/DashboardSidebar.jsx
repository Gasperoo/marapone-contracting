import React, { useState } from 'react';
import {
    MessageSquare, Search, Beaker, TrendingUp, BarChart3,
    Shield, FileText, Leaf, ShieldAlert, Globe, Package,
    ChevronLeft, ChevronRight, LayoutDashboard, Settings
} from 'lucide-react';
import './GasperTool.css';

export function DashboardSidebar({ activeTab, onTabChange, isCollapsed, toggleCollapse }) {

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
        { id: 'market', label: 'Market Intel', icon: Globe },
        { id: 'shipments', label: 'Shipments', icon: Package },
        { id: 'classifier', label: 'HS Classifier', icon: Search },
        { id: 'rates', label: 'Rate Check', icon: TrendingUp },
        { id: 'simulation', label: 'Digital Twin', icon: Beaker },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'compliance', label: 'Compliance', icon: Shield },
        { id: 'risk', label: 'Risk Monitor', icon: ShieldAlert },
        { id: 'carbon', label: 'Sustainability', icon: Leaf },
        { id: 'docs', label: 'Documents', icon: FileText },
    ];

    return (
        <div className={`gasper-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="brand-logo h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    GT
                </div>
                <h1 className={`font-bold text-lg tracking-tight text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                    Gasper<span className="text-blue-400">Tool</span>
                </h1>
            </div>

            <div className="sidebar-nav custom-scrollbar">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <item.icon size={20} className={`nav-item-icon ${activeTab === item.id ? 'text-cyan-400' : ''}`} />
                        <span className="nav-label">{item.label}</span>
                        {activeTab === item.id && !isCollapsed && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={toggleCollapse}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </div>
    );
}
