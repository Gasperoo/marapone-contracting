import React, { useState } from 'react';
import {
    MessageSquare, Search, Beaker, TrendingUp, BarChart3,
    Shield, FileText, Leaf, ShieldAlert, Globe, Package,
    ChevronLeft, ChevronRight, LayoutDashboard, Settings, X, Home as HomeIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './GasperTool.css';

export function DashboardSidebar({ activeTab, onTabChange, isCollapsed, toggleCollapse, isMobileOpen, closeMobileMenu }) {
    const navigate = useNavigate();

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'map', label: 'Live Map', icon: Globe },
        { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
        { id: 'market', label: 'Market Intel', icon: TrendingUp },
        { id: 'shipments', label: 'Shipments', icon: Package },
        { id: 'classifier', label: 'HS Classifier', icon: Search },
        { id: 'rates', label: 'Rate Check', icon: TrendingUp },
        { id: 'simulation', label: 'Digital Twin', icon: Beaker },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'compliance', label: 'Compliance', icon: Shield },
        { id: 'risk', label: 'Risk Monitor', icon: ShieldAlert },
        { id: 'carbon', label: 'Sustainability', icon: Leaf },
        { id: 'docs', label: 'Documents', icon: FileText },
        { id: 'home', label: 'Back to Site', icon: HomeIcon, action: () => navigate('/') },
    ];

    return (
        <div className={`gasper-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div className="brand-logo h-8 w-8 bg-gradient-to-br from-[#FF6B00] to-[#F59E0B] rounded-full flex items-center justify-center text-white font-bold text-xs">
                    GT
                </div>
                <h1 className={`font-bold text-lg tracking-tight text-[#1a1a1a] transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                    Gasper<span className="text-[#FF6B00]">Tool</span>
                </h1>
                <button
                    onClick={closeMobileMenu}
                    className="md:hidden ml-auto text-gray-500 hover:text-gray-900"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="sidebar-nav custom-scrollbar">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => item.action ? item.action() : onTabChange(item.id)}
                    >
                        <item.icon size={20} className={`nav-item-icon ${activeTab === item.id ? 'text-[#FF6B00]' : ''}`} />
                        <span className="nav-label">{item.label}</span>
                        {activeTab === item.id && !isCollapsed && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-black/[0.06] hidden md:block">
                <button
                    onClick={toggleCollapse}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-black/5 text-gray-400 hover:text-gray-700 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </div>
    );
}
