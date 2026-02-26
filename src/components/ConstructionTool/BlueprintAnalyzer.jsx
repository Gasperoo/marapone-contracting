import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    FileSearch, Upload, Layers, Grid3X3, CheckCircle, AlertTriangle,
    ZoomIn, ZoomOut, RotateCw, Move, Eye, Download, Cpu, Box,
    DoorOpen, Ruler, ChevronDown, ChevronUp, Search,
    Send, MessageSquare, Sparkles, X, FileText, Image, PenTool,
    TriangleAlert, Shield, ArrowUpRight, Home, Maximize2, Droplets,
    Zap, Wind, Flame, Lightbulb, TrendingUp, Fan, AlertCircle, Type,
    Plus, RefreshCw, Info, BarChart3
} from 'lucide-react';
import {
    simulateAnalysis,
    getFullAnalysisResult,
    getAnalysisPhases,
    getSampleBlueprints,
    getBlueprintChatResponse,
    getSupportedFormats,
    detectFileType
} from './blueprintAIServices';
import '../../styles/BlueprintAI.css';

// Icon lookup for dynamic element rendering
const iconMap = {
    'grid-3x3': Grid3X3, 'door-open': DoorOpen, 'square': Box, 'trending-up': TrendingUp,
    'droplets': Droplets, 'zap': Zap, 'lightbulb': Lightbulb, 'wind': Wind, 'fan': Fan,
    'flame': Flame, 'alert-circle': AlertCircle, 'ruler': Ruler, 'type': Type,
};

export function BlueprintAnalyzer() {
    // State machine: 'upload' | 'analyzing' | 'results'
    const [view, setView] = useState('upload');
    const [dragOver, setDragOver] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    // Analysis progress
    const [currentPhase, setCurrentPhase] = useState(null);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [phaseProgress, setPhaseProgress] = useState(0);
    const [elementsFound, setElementsFound] = useState(0);
    const [completedPhases, setCompletedPhases] = useState([]);

    // Results UI state
    const [activeInsightTab, setActiveInsightTab] = useState('elements');
    const [visibleLayers, setVisibleLayers] = useState({});
    const [expandedCompliance, setExpandedCompliance] = useState(null);
    const [chatOpen, setChatOpen] = useState(true);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    // Animated counters
    const [animatedStats, setAnimatedStats] = useState({
        totalElements: 0, complianceScore: 0, estimatedCost: 0, issuesFound: 0, roomsDetected: 0
    });

    const fileInputRef = useRef(null);
    const chatEndRef = useRef(null);
    const canvasRef = useRef(null);

    // Initialize layers when result changes
    useEffect(() => {
        if (analysisResult) {
            const layers = {};
            analysisResult.layers.forEach(l => { layers[l.id] = true; });
            setVisibleLayers(layers);
        }
    }, [analysisResult]);

    // Animate stat counters
    useEffect(() => {
        if (analysisResult && view === 'results') {
            const target = analysisResult.summary;
            const duration = 1500;
            const steps = 40;
            let step = 0;
            const interval = setInterval(() => {
                step++;
                const t = step / steps;
                const ease = 1 - Math.pow(1 - t, 3);
                setAnimatedStats({
                    totalElements: Math.round(target.totalElements * ease),
                    complianceScore: Math.round(target.complianceScore * ease),
                    estimatedCost: Math.round(target.estimatedCost * ease),
                    issuesFound: Math.round(target.issuesFound * ease),
                    roomsDetected: Math.round(target.roomsDetected * ease),
                });
                if (step >= steps) clearInterval(interval);
            }, duration / steps);
            return () => clearInterval(interval);
        }
    }, [analysisResult, view]);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, isTyping]);

    // ========================================================================
    // FILE HANDLING
    // ========================================================================

    const handleFileSelect = useCallback((file) => {
        if (!file) return;
        setCurrentFile(file);
        startAnalysis(file);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragOver(false);
    }, []);

    const handleSampleLoad = useCallback((sample) => {
        const mockFile = { name: sample.name + '.' + sample.format.toLowerCase(), size: parseFloat(sample.size) * 1024 * 1024 };
        setCurrentFile(mockFile);
        startAnalysis(mockFile);
    }, []);

    // ========================================================================
    // ANALYSIS
    // ========================================================================

    const startAnalysis = useCallback((file) => {
        setView('analyzing');
        setCompletedPhases([]);
        setPhaseIndex(0);
        setPhaseProgress(0);
        setElementsFound(0);
        setChatMessages([]);

        simulateAnalysis(
            file,
            (phase, idx, total) => {
                setCurrentPhase(phase);
                setPhaseIndex(idx);
                setPhaseProgress(0);
                if (idx > 0) {
                    setCompletedPhases(prev => [...prev, idx - 1]);
                }
            },
            (progress, idx) => {
                setPhaseProgress(progress);
            },
            (count) => {
                setElementsFound(count);
            }
        ).then((result) => {
            setCompletedPhases(prev => [...prev, getAnalysisPhases().length - 1]);
            setTimeout(() => {
                setAnalysisResult(result);
                setView('results');
            }, 600);
        });
    }, []);

    const resetAnalysis = useCallback(() => {
        setView('upload');
        setCurrentFile(null);
        setAnalysisResult(null);
        setActiveInsightTab('elements');
        setZoomLevel(1);
        setCanvasPan({ x: 0, y: 0 });
        setChatMessages([]);
    }, []);

    // ========================================================================
    // CHAT
    // ========================================================================

    const handleChatSend = useCallback((text) => {
        const msg = text || chatInput.trim();
        if (!msg) return;
        setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
        setChatInput('');
        setIsTyping(true);

        setTimeout(() => {
            const response = getBlueprintChatResponse(msg);
            setChatMessages(prev => [...prev, { role: 'assistant', text: response.response }]);
            setIsTyping(false);
        }, 1200 + Math.random() * 800);
    }, [chatInput]);

    // ========================================================================
    // CANVAS CONTROLS
    // ========================================================================

    const handleCanvasMouseDown = useCallback((e) => {
        setIsPanning(true);
        setPanStart({ x: e.clientX - canvasPan.x, y: e.clientY - canvasPan.y });
    }, [canvasPan]);

    const handleCanvasMouseMove = useCallback((e) => {
        if (!isPanning) return;
        setCanvasPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }, [isPanning, panStart]);

    const handleCanvasMouseUp = useCallback(() => {
        setIsPanning(false);
    }, []);

    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel(prev => Math.max(0.3, Math.min(3, prev + delta)));
    }, []);

    // ========================================================================
    // RENDER: UPLOAD STATE
    // ========================================================================

    if (view === 'upload') {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="text-[#FF6B00]" size={24} />
                            Blueprint AI
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">Next-gen AI-powered blueprint reading, analysis & compliance checking</p>
                    </div>
                </div>

                {/* Upload Zone */}
                <div
                    className={`blueprint-upload-zone ${dragOver ? 'drag-over' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.tiff,.tif,.ifc,.rvt,.skp,.svg"
                        onChange={(e) => handleFileSelect(e.target.files[0])}
                    />

                    <div className="upload-icon-wrapper">
                        <div className="upload-icon-ring" />
                        <div className="upload-icon-ring" />
                        <div className="upload-icon-ring" />
                        <div className="upload-icon-inner">
                            <Upload size={36} className="text-[#FF6B00]" />
                        </div>
                    </div>

                    <motion.h3
                        className="text-xl font-bold text-white mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Drop your blueprint anywhere
                    </motion.h3>
                    <motion.p
                        className="text-slate-400 text-sm mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        or click to browse files
                    </motion.p>

                    <div className="format-badges">
                        {['PDF', 'DWG', 'DXF', 'PNG', 'JPG', 'TIFF', 'IFC', 'RVT', 'SKP'].map(fmt => (
                            <span key={fmt} className="format-badge">{fmt}</span>
                        ))}
                    </div>
                </div>

                {/* Sample Blueprints for Demo */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                        <FileText size={14} />
                        Sample Blueprints — Load Instantly for Demo
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                        {getSampleBlueprints().map((sample) => (
                            <motion.div
                                key={sample.id}
                                className="sample-blueprint-card"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={(e) => { e.stopPropagation(); handleSampleLoad(sample); }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00]/20 to-[#FFB800]/10 flex items-center justify-center flex-shrink-0">
                                    <FileText size={18} className="text-[#FF6B00]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-white truncate">{sample.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{sample.format} • {sample.size} • {sample.type}</div>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-500 flex-shrink-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ========================================================================
    // RENDER: ANALYZING STATE
    // ========================================================================

    if (view === 'analyzing') {
        const phases = getAnalysisPhases();
        return (
            <div className="analysis-pipeline">
                {/* Neural Background */}
                <div className="neural-bg">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="neural-node"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`l${i}`}
                            className="neural-line"
                            style={{
                                top: `${Math.random() * 100}%`,
                                width: `${30 + Math.random() * 40}%`,
                                left: `${Math.random() * 60}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1.5 + Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Scanning Line */}
                <div className="scan-line" />

                {/* Header */}
                <motion.div
                    className="text-center mb-8 relative z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-sm font-semibold mb-4">
                        <Cpu size={16} className="animate-pulse" />
                        Gasper AI Engine Active
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Analyzing Blueprint</h2>
                    <p className="text-slate-400 text-sm">{currentFile?.name || 'Processing...'}</p>
                </motion.div>

                {/* Elements Counter */}
                <motion.div
                    className="text-center mb-8 relative z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="elements-counter">{elementsFound}</div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Elements Detected</div>
                </motion.div>

                {/* Phase List */}
                <div className="phase-list">
                    {phases.map((phase, idx) => {
                        const isActive = idx === phaseIndex;
                        const isComplete = completedPhases.includes(idx);
                        const isPending = idx > phaseIndex;

                        return (
                            <motion.div
                                key={phase.id}
                                className={`phase-item ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <div className="phase-icon-box">
                                    {isComplete ? (
                                        <CheckCircle size={18} className="text-green-400" />
                                    ) : isActive ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                                            <RefreshCw size={18} className="text-[#FF6B00]" />
                                        </motion.div>
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-white/20" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-semibold ${isActive ? 'text-white' : isComplete ? 'text-slate-300' : 'text-slate-500'}`}>
                                            {phase.label}
                                        </span>
                                        {isActive && (
                                            <span className="text-xs font-mono text-[#FF6B00]">{Math.round(phaseProgress)}%</span>
                                        )}
                                        {isComplete && (
                                            <span className="text-xs text-green-400">Done</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">{phase.desc}</div>
                                    {isActive && (
                                        <div className="phase-progress-bar mt-2">
                                            <div className="phase-progress-fill" style={{ width: `${phaseProgress}%` }} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ========================================================================
    // RENDER: RESULTS STATE
    // ========================================================================

    const result = analysisResult;
    if (!result) return null;

    const getVisibleElements = () => {
        return result.detectedElements.filter(el => visibleLayers[el.layer] !== false);
    };

    return (
        <div className="space-y-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="text-[#FF6B00]" size={24} />
                        Blueprint AI
                    </h2>
                    <p className="text-slate-400 text-sm mt-0.5">Analysis complete — {result.fileInfo.name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="new-analysis-btn" onClick={resetAnalysis}>
                        <Plus size={14} />
                        New Analysis
                    </button>
                    <button className="new-analysis-btn">
                        <Download size={14} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* File Info Bar */}
            <div className="file-info-bar">
                <div className="file-info-item"><FileText size={12} /><strong>{result.fileInfo.name}</strong></div>
                <div className="file-info-item">Format: <strong>{result.fileInfo.format}</strong></div>
                <div className="file-info-item">Size: <strong>{(result.fileInfo.size / 1048576).toFixed(1)} MB</strong></div>
                <div className="file-info-item">Dimensions: <strong>{result.fileInfo.dimensions}</strong></div>
                <div className="file-info-item">Scale: <strong>{result.fileInfo.scale}</strong></div>
                <div className="file-info-item">Confidence: <strong className="text-green-400">{result.summary.confidence}%</strong></div>
            </div>

            {/* Summary Stats Bar */}
            <motion.div
                className="stats-bar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="stat-card">
                    <div className="stat-value orange">{animatedStats.totalElements}</div>
                    <div className="stat-label">Elements</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value green">{animatedStats.complianceScore}%</div>
                    <div className="stat-label">Compliance</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value blue">${animatedStats.estimatedCost.toLocaleString()}</div>
                    <div className="stat-label">Est. Materials</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value red">{animatedStats.issuesFound}</div>
                    <div className="stat-label">Issues</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value purple">{animatedStats.roomsDetected}</div>
                    <div className="stat-label">Rooms</div>
                </div>
            </motion.div>

            {/* Main Grid: Canvas + Insights */}
            <div className="results-grid">
                {/* Blueprint Canvas */}
                <div className="blueprint-canvas-wrapper">
                    {/* Toolbar */}
                    <div className="canvas-toolbar">
                        <div className="toolbar-group" style={{ gap: '4px', overflowX: 'auto' }}>
                            {result.layers.map(layer => (
                                <button
                                    key={layer.id}
                                    className={`layer-chip ${visibleLayers[layer.id] !== false ? 'active' : ''}`}
                                    style={{
                                        '--chip-color': layer.color,
                                        '--chip-bg': `${layer.color}15`,
                                    }}
                                    onClick={() => setVisibleLayers(prev => ({ ...prev, [layer.id]: !prev[layer.id] }))}
                                >
                                    {layer.label}
                                </button>
                            ))}
                        </div>
                        <div className="toolbar-group">
                            <button className="toolbar-btn" onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.2))}><ZoomIn size={16} /></button>
                            <button className="toolbar-btn" onClick={() => setZoomLevel(prev => Math.max(0.3, prev - 0.2))}><ZoomOut size={16} /></button>
                            <button className="toolbar-btn" onClick={() => { setZoomLevel(1); setCanvasPan({ x: 0, y: 0 }); }}><Maximize2 size={16} /></button>
                            <span className="text-xs text-slate-500 ml-1 font-mono">{Math.round(zoomLevel * 100)}%</span>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div
                        ref={canvasRef}
                        className="blueprint-canvas"
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                        onWheel={handleWheel}
                    >
                        <div className="grid-bg" />

                        {/* Status Badges */}
                        <div className="canvas-badge top-left">
                            <Cpu size={12} />
                            AI Analysis Complete
                        </div>
                        <div className="canvas-badge top-right">
                            Scale: {result.fileInfo.scale} | Floor 1 of {result.fileInfo.sheets}
                        </div>

                        {/* Blueprint SVG */}
                        <svg
                            viewBox="0 0 600 400"
                            style={{
                                width: '90%',
                                height: '90%',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: `translate(calc(-50% + ${canvasPan.x}px), calc(-50% + ${canvasPan.y}px)) scale(${zoomLevel})`,
                                transition: isPanning ? 'none' : 'transform 0.2s',
                            }}
                        >
                            {/* Outer walls */}
                            {visibleLayers.structural !== false && (
                                <g opacity="0.9">
                                    <rect x="40" y="40" width="520" height="320" fill="none" stroke="#3b82f6" strokeWidth="3" />
                                    {/* Interior walls */}
                                    <line x1="250" y1="40" x2="250" y2="230" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
                                    <line x1="40" y1="230" x2="420" y2="230" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
                                    <line x1="420" y1="230" x2="420" y2="360" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
                                    <line x1="250" y1="230" x2="250" y2="360" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
                                    <line x1="420" y1="135" x2="560" y2="135" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
                                    {/* Doors */}
                                    <path d="M 235 230 A 15 15 0 0 1 250 215" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.8" />
                                    <path d="M 250 55 A 15 15 0 0 1 265 40" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.8" />
                                    <path d="M 405 230 A 15 15 0 0 0 420 245" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.8" />
                                    <path d="M 235 360 A 15 15 0 0 0 250 345" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.8" />
                                    {/* Windows */}
                                    <line x1="100" y1="40" x2="170" y2="40" stroke="#06b6d4" strokeWidth="4" opacity="0.6" />
                                    <line x1="320" y1="40" x2="400" y2="40" stroke="#06b6d4" strokeWidth="4" opacity="0.6" />
                                    <line x1="40" y1="120" x2="40" y2="190" stroke="#06b6d4" strokeWidth="4" opacity="0.6" />
                                    <line x1="560" y1="200" x2="560" y2="280" stroke="#06b6d4" strokeWidth="4" opacity="0.6" />
                                    {/* Room Labels */}
                                    <text x="140" y="135" fill="#3b82f680" fontSize="13" textAnchor="middle" fontWeight="600">LIVING ROOM</text>
                                    <text x="140" y="152" fill="#3b82f640" fontSize="9" textAnchor="middle">6.2m × 4.8m</text>
                                    <text x="400" y="90" fill="#3b82f680" fontSize="13" textAnchor="middle" fontWeight="600">KITCHEN</text>
                                    <text x="400" y="107" fill="#3b82f640" fontSize="9" textAnchor="middle">5.1m × 4.8m</text>
                                    <text x="145" y="300" fill="#3b82f680" fontSize="13" textAnchor="middle" fontWeight="600">MASTER BEDROOM</text>
                                    <text x="145" y="317" fill="#3b82f640" fontSize="9" textAnchor="middle">8.5m × 3.4m</text>
                                    <text x="335" y="300" fill="#3b82f680" fontSize="11" textAnchor="middle" fontWeight="600">BEDROOM 2</text>
                                    <text x="335" y="315" fill="#3b82f640" fontSize="8" textAnchor="middle">4.6m × 3.5m</text>
                                    <text x="490" y="200" fill="#3b82f680" fontSize="9" textAnchor="middle">BATH 1</text>
                                    <text x="490" y="300" fill="#3b82f680" fontSize="9" textAnchor="middle">UTILITY</text>
                                    {/* Stairs */}
                                    <g opacity="0.5">
                                        <line x1="475" y1="45" x2="475" y2="100" stroke="#f59e0b" strokeWidth="0.5" />
                                        <line x1="485" y1="45" x2="485" y2="100" stroke="#f59e0b" strokeWidth="0.5" />
                                        <line x1="495" y1="45" x2="495" y2="100" stroke="#f59e0b" strokeWidth="0.5" />
                                        <line x1="505" y1="45" x2="505" y2="100" stroke="#f59e0b" strokeWidth="0.5" />
                                        <line x1="515" y1="45" x2="515" y2="100" stroke="#f59e0b" strokeWidth="0.5" />
                                        <text x="495" y="80" fill="#f59e0b80" fontSize="7" textAnchor="middle">STAIR A</text>
                                    </g>
                                </g>
                            )}

                            {/* Plumbing */}
                            {visibleLayers.mep !== false && (
                                <g opacity="0.6">
                                    <circle cx="475" cy="175" r="4" fill="#0ea5e9" />
                                    <circle cx="490" cy="175" r="4" fill="#0ea5e9" />
                                    <circle cx="475" cy="195" r="6" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                                    <rect x="100" y="270" width="8" height="8" fill="#0ea5e9" opacity="0.5" rx="1" />
                                    <rect x="170" y="270" width="8" height="8" fill="#0ea5e9" opacity="0.5" rx="1" />
                                </g>
                            )}

                            {/* Electrical */}
                            {visibleLayers.electrical !== false && (
                                <g opacity="0.5">
                                    {[
                                        [60, 60], [180, 60], [310, 60], [530, 60],
                                        [60, 160], [200, 160], [60, 250], [200, 340],
                                        [350, 340], [530, 250], [530, 340],
                                    ].map(([x, y], i) => (
                                        <circle key={`outlet-${i}`} cx={x} cy={y} r="3" fill="#eab308" />
                                    ))}
                                    {/* Light fixtures */}
                                    {[
                                        [140, 130], [400, 85], [145, 295], [335, 295], [490, 170], [490, 290],
                                    ].map(([x, y], i) => (
                                        <g key={`light-${i}`}>
                                            <circle cx={x} cy={y} r="6" fill="none" stroke="#fbbf24" strokeWidth="0.8" />
                                            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#fbbf24" strokeWidth="0.5" />
                                            <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke="#fbbf24" strokeWidth="0.5" />
                                        </g>
                                    ))}
                                </g>
                            )}

                            {/* HVAC */}
                            {visibleLayers.hvac !== false && (
                                <g opacity="0.4">
                                    <rect x="300" y="55" width="30" height="20" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" rx="2" />
                                    <text x="315" y="68" fill="#ef4444" fontSize="5" textAnchor="middle">VENT</text>
                                    <rect x="120" y="260" width="30" height="20" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" rx="2" />
                                    <text x="135" y="273" fill="#ef4444" fontSize="5" textAnchor="middle">VENT</text>
                                </g>
                            )}

                            {/* Fire Protection */}
                            {visibleLayers.fire !== false && (
                                <g opacity="0.5">
                                    {[
                                        [100, 100], [200, 100], [350, 100], [500, 100],
                                        [100, 200], [350, 200], [500, 200],
                                        [100, 310], [200, 310], [350, 310], [500, 310],
                                    ].map(([x, y], i) => (
                                        <g key={`sprinkler-${i}`}>
                                            <circle cx={x} cy={y} r="3" fill="#dc2626" opacity="0.6" />
                                            <circle cx={x} cy={y} r="6" fill="none" stroke="#dc2626" strokeWidth="0.5" strokeDasharray="1,1" />
                                        </g>
                                    ))}
                                </g>
                            )}

                            {/* Dimensions */}
                            {visibleLayers.dimensions !== false && (
                                <g opacity="0.5">
                                    <line x1="40" y1="25" x2="560" y2="25" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="3,3" />
                                    <text x="300" y="20" fill="#a855f780" fontSize="8" textAnchor="middle">21.7m (71'-2")</text>
                                    <line x1="25" y1="40" x2="25" y2="360" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="3,3" />
                                    <text x="15" y="200" fill="#a855f780" fontSize="8" textAnchor="middle" transform="rotate(-90, 15, 200)">13.4m (43'-11")</text>
                                </g>
                            )}

                            {/* AI Annotations */}
                            {visibleLayers.annotations !== false && (
                                <g>
                                    {/* Issue Marker - Guardrail */}
                                    <circle cx="560" cy="240" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8">
                                        <animate attributeName="r" values="14;16;14" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <text x="560" y="260" fill="#ef4444" fontSize="6" textAnchor="middle" fontWeight="600">⚠ RAIL</text>

                                    {/* Issue Marker - STC */}
                                    <circle cx="250" cy="290" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8">
                                        <animate attributeName="r" values="14;16;14" dur="2.5s" repeatCount="indefinite" />
                                    </circle>
                                    <text x="250" y="280" fill="#f59e0b" fontSize="5" textAnchor="middle" fontWeight="600">STC 45</text>

                                    {/* Positive marker */}
                                    <circle cx="140" cy="135" r="12" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.4">
                                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                </g>
                            )}
                        </svg>

                        {/* Minimap */}
                        <div className="minimap">
                            <svg viewBox="0 0 600 400" width="120" height="80" style={{ opacity: 0.5 }}>
                                <rect x="40" y="40" width="520" height="320" fill="none" stroke="#3b82f6" strokeWidth="4" />
                                <line x1="250" y1="40" x2="250" y2="230" stroke="#3b82f6" strokeWidth="3" />
                                <line x1="40" y1="230" x2="420" y2="230" stroke="#3b82f6" strokeWidth="3" />
                                <line x1="420" y1="230" x2="420" y2="360" stroke="#3b82f6" strokeWidth="3" />
                            </svg>
                            <div className="minimap-viewport" style={{
                                width: `${100 / zoomLevel}%`,
                                height: `${100 / zoomLevel}%`,
                                left: `${50 - 50 / zoomLevel - canvasPan.x / 10}%`,
                                top: `${50 - 50 / zoomLevel - canvasPan.y / 10}%`,
                            }} />
                        </div>
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="insights-panel">
                    <div className="insights-tabs">
                        {[
                            { id: 'elements', label: 'Elements', icon: Eye },
                            { id: 'compliance', label: 'Compliance', icon: Shield },
                            { id: 'materials', label: 'Materials', icon: Layers },
                            { id: 'risks', label: 'Risks', icon: TriangleAlert },
                            { id: 'rooms', label: 'Rooms', icon: Home },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                className={`insights-tab ${activeInsightTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveInsightTab(tab.id)}
                            >
                                <tab.icon size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="insights-content">
                        <AnimatePresence mode="wait">
                            {/* Elements Tab */}
                            {activeInsightTab === 'elements' && (
                                <motion.div key="elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    {result.detectedElements.map((el, idx) => {
                                        const Icon = iconMap[el.icon] || Box;
                                        const isVisible = visibleLayers[el.layer] !== false;
                                        return (
                                            <motion.div
                                                key={el.id}
                                                className="element-row"
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: isVisible ? 1 : 0.3, x: 0 }}
                                                transition={{ delay: idx * 0.03 }}
                                                onClick={() => setVisibleLayers(prev => ({ ...prev, [el.layer]: !prev[el.layer] }))}
                                            >
                                                <div className="element-info">
                                                    <div className="element-dot" style={{ backgroundColor: el.color }} />
                                                    <Icon size={13} style={{ color: el.color, opacity: 0.7 }} />
                                                    <span className="text-xs text-slate-300">{el.type}</span>
                                                </div>
                                                <div className="element-stats">
                                                    <span className="text-xs font-mono text-white font-semibold">{el.count}</span>
                                                    <div className="confidence-bar-track">
                                                        <div
                                                            className={`confidence-bar-fill ${el.confidence < 90 ? 'low' : el.confidence < 95 ? 'medium' : ''}`}
                                                            style={{ width: `${el.confidence}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-green-400">{el.confidence}%</span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}

                            {/* Compliance Tab */}
                            {activeInsightTab === 'compliance' && (
                                <motion.div key="compliance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <span className="text-xs text-slate-500">
                                            {result.complianceChecks.filter(c => c.status === 'pass').length}/{result.complianceChecks.length} Passing
                                        </span>
                                        <div className="flex gap-1">
                                            <span className="status-badge pass" style={{ fontSize: '0.6rem' }}>
                                                {result.complianceChecks.filter(c => c.status === 'pass').length} Pass
                                            </span>
                                            <span className="status-badge warning" style={{ fontSize: '0.6rem' }}>
                                                {result.complianceChecks.filter(c => c.status === 'warning').length} Warn
                                            </span>
                                            <span className="status-badge fail" style={{ fontSize: '0.6rem' }}>
                                                {result.complianceChecks.filter(c => c.status === 'fail').length} Fail
                                            </span>
                                        </div>
                                    </div>
                                    {result.complianceChecks.map((check, idx) => (
                                        <motion.div
                                            key={check.id}
                                            className={`compliance-row ${expandedCompliance === check.id ? 'expanded' : ''}`}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.03 }}
                                            onClick={() => setExpandedCompliance(expandedCompliance === check.id ? null : check.id)}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-start gap-2 flex-1 min-w-0">
                                                    {check.status === 'pass' && <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />}
                                                    {check.status === 'warning' && <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />}
                                                    {check.status === 'fail' && <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />}
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-semibold text-slate-200">{check.title}</div>
                                                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{check.code}</div>
                                                    </div>
                                                </div>
                                                <span className={`status-badge ${check.status}`}>{check.status}</span>
                                            </div>
                                            <AnimatePresence>
                                                {expandedCompliance === check.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-slate-400 leading-relaxed">
                                                            {check.details}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Materials Tab */}
                            {activeInsightTab === 'materials' && (
                                <motion.div key="materials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <span className="text-xs text-slate-500">{result.materialQuantities.length} items</span>
                                        <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors">
                                            <Download size={10} />
                                            Export CSV
                                        </button>
                                    </div>
                                    <table className="material-table">
                                        <thead>
                                            <tr>
                                                <th>Material</th>
                                                <th style={{ textAlign: 'right' }}>Qty</th>
                                                <th style={{ textAlign: 'right' }}>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.materialQuantities.map((mat, idx) => (
                                                <motion.tr
                                                    key={mat.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.03 }}
                                                >
                                                    <td className="text-xs text-slate-300" style={{ maxWidth: 160 }}>
                                                        <div className="truncate">{mat.material}</div>
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <span className="text-xs font-mono text-slate-400">{mat.qty} {mat.unit}</span>
                                                    </td>
                                                    <td className="cost-cell" style={{ textAlign: 'right', fontSize: '0.75rem' }}>
                                                        ${mat.total.toLocaleString()}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={2} className="text-xs font-bold text-white pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                                    Total Estimated
                                                </td>
                                                <td className="cost-cell text-right font-bold pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem' }}>
                                                    ${result.materialQuantities.reduce((a, b) => a + b.total, 0).toLocaleString()}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </motion.div>
                            )}

                            {/* Risks Tab */}
                            {activeInsightTab === 'risks' && (
                                <motion.div key="risks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    {result.risks.map((risk, idx) => (
                                        <motion.div
                                            key={risk.id}
                                            className={`risk-card ${risk.severity}`}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <span className="text-xs font-semibold text-white">{risk.title}</span>
                                                <span className={`severity-dot ${risk.severity}`}>{risk.severity}</span>
                                            </div>
                                            <div className="text-[10px] text-slate-500 mb-1.5">{risk.location}</div>
                                            <div className="text-[11px] text-slate-400 leading-relaxed mb-2">{risk.desc}</div>
                                            <div className="flex items-start gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                                <Lightbulb size={11} className="text-[#FF6B00] mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <div className="text-[10px] text-slate-300">{risk.fix}</div>
                                                    <div className="text-[10px] text-[#FF6B00] font-semibold mt-0.5">Est. {risk.estimatedCost}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Rooms Tab */}
                            {activeInsightTab === 'rooms' && (
                                <motion.div key="rooms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <table className="room-table">
                                        <thead>
                                            <tr>
                                                <th>Room</th>
                                                <th>Area</th>
                                                <th>Egress</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.rooms.map((room, idx) => (
                                                <motion.tr
                                                    key={room.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.03 }}
                                                >
                                                    <td>
                                                        <div className="text-xs font-semibold text-slate-200">{room.name}</div>
                                                        <div className="text-[9px] text-slate-500">{room.dimensions}</div>
                                                    </td>
                                                    <td className="text-xs text-slate-400">{room.area}</td>
                                                    <td className="text-xs text-slate-400 text-center">{room.egress}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* AI Chat Section */}
            <div className="ai-chat-section">
                <div className="ai-chat-header" onClick={() => setChatOpen(!chatOpen)}>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FFB800] flex items-center justify-center">
                            <MessageSquare size={14} className="text-white" />
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-white">Blueprint AI Assistant</span>
                            <span className="text-[10px] text-slate-500 ml-2">Ask anything about this blueprint</span>
                        </div>
                    </div>
                    {chatOpen ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronUp size={16} className="text-slate-500" />}
                </div>

                <AnimatePresence>
                    {chatOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                        >
                            {/* Quick Ask Buttons */}
                            <div className="quick-asks">
                                {[
                                    'What are the fire code issues?',
                                    'Estimate total cost',
                                    'List all rooms',
                                    'Check ADA compliance',
                                ].map((q) => (
                                    <button
                                        key={q}
                                        className="quick-ask-btn"
                                        onClick={() => handleChatSend(q)}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>

                            {/* Messages */}
                            {chatMessages.length > 0 && (
                                <div className="chat-messages-area">
                                    {chatMessages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            className={`chat-bubble ${msg.role}`}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                        >
                                            {msg.text.split('\n').map((line, i) => (
                                                <div key={i}>{line || <br />}</div>
                                            ))}
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <div className="chat-bubble assistant">
                                            <div className="typing-indicator">
                                                <span /><span /><span />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>
                            )}

                            {/* Input */}
                            <div className="chat-input-row">
                                <input
                                    type="text"
                                    className="chat-input-field"
                                    placeholder="Ask about this blueprint..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                                />
                                <button className="chat-send-btn" onClick={() => handleChatSend()}>
                                    <Send size={14} />
                                    Ask
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
