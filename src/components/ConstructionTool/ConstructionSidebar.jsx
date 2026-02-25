import React, { useState } from 'react';
import {
    LayoutDashboard, FileSearch, Calculator, BrainCircuit,
    Boxes, Wrench, ChevronLeft, ChevronRight, X,
    Home as HomeIcon, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../GasperTool/GasperTool.css';

export function ConstructionSidebar({ activeTab, onTabChange, isCollapsed, toggleCollapse, isMobileOpen, closeMobileMenu }) {
    const navigate = useNavigate();

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'blueprint', label: 'Blueprint AI', icon: FileSearch },
        { id: 'takeoff', label: 'Takeoff Tools', icon: Calculator },
        { id: 'planner', label: 'AI Planner', icon: BrainCircuit },
        { id: 'design', label: 'Generative Design', icon: Boxes },
        { id: 'maintenance', label: 'Predictive Maint.', icon: Wrench },
        { id: 'launcher', label: 'Tool Launcher', icon: ArrowLeft, action: () => navigate('/gasper') },
        { id: 'home', label: 'Back to Site', icon: HomeIcon, action: () => navigate('/') },
    ];

    return (
        <div className={`gasper-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div className="brand-logo h-8 w-8 bg-gradient-to-br from-[#FF6B00] to-[#FFB800] rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ boxShadow: '0 0 10px rgba(255,107,0,0.4)' }}>
                    CT
                </div>
                <h1 className={`font-bold text-lg tracking-tight text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                    Gasper<span className="text-[#FF6B00]">Build</span>
                </h1>
                <button
                    onClick={closeMobileMenu}
                    className="md:hidden ml-auto text-white/60 hover:text-white"
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
                        style={activeTab === item.id ? {
                            background: 'linear-gradient(90deg, rgba(255,107,0,0.1) 0%, rgba(255,184,0,0.1) 100%)',
                            border: '1px solid rgba(255,107,0,0.3)',
                            boxShadow: '0 0 15px rgba(255,107,0,0.1)'
                        } : {}}
                    >
                        <item.icon size={20} className={`nav-item-icon ${activeTab === item.id ? 'text-[#FF6B00]' : ''}`} />
                        <span className="nav-label">{item.label}</span>
                        {activeTab === item.id && !isCollapsed && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-white/10 hidden md:block">
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
