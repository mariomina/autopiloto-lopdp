"use client";

import React from 'react';
import { Download, ShieldCheck, Zap } from 'lucide-react';
import { BiometricsStatsGrid, RiskRadarChart, RecentInterceptions, ActiveInvestigations } from '@/components/biometrics';

export const BiometricsView: React.FC = () => {
    const [deepfakeTolerance, setDeepfakeTolerance] = React.useState(95);
    const [biometricPrecision, setBiometricPrecision] = React.useState(90);
    const [activeCard, setActiveCard] = React.useState('compliance');

    const handleExport = () => {
        const content = `REPORTE DE SEGURIDAD BIOMÉTRICA\n\nFecha: ${new Date().toLocaleDateString()}\nEntorno: Producción\nTolerancia Deepfake: ${deepfakeTolerance}%\nPrecisión Biométrica: ${biometricPrecision}%\n\nResumen de Amenazas:\n- Intercepciones hoy: 12\n- Riesgo Detectado: Bajo\n\nEste reporte es una evidencia técnica para cumplimiento LOPDP.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Reporte_Biometria_Seguridad_${new Date().toISOString().split('T')[0]}.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Reporte de seguridad biométrica exportado exitosamente.");
    };

    const handleStartAudit = () => {
        alert("🚀 Iniciando Auditoría de Vectores de Ataque...\n\nEscaneando logs de acceso biométrico buscando patrones de inyección de video y deepfakes sintéticos.\n\nTiempo estimado: 45 segundos.");
    };

    // Recomendación de IA basada en vectores de amenaza
    const getRecommendation = () => {
        if (deepfakeTolerance < 90) {
            return {
                message: "⚠️ Recomendación: Aumentar protección un 5% debido a picos de Clonación de Voz detectados",
                color: "text-amber-600 dark:text-amber-400"
            };
        }
        return {
            message: "✓ Configuración óptima para el nivel de amenazas actual",
            color: "text-emerald-600 dark:text-emerald-400"
        };
    };

    const recommendation = getRecommendation();

    return (
        <div className="space-y-6">
            {/* Header / Título de la Categoría */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <p className="text-[10px] font-bold text-[#1552D4] tracking-[0.2em] mb-2 uppercase">Integrity Hub // V2.4.1</p>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Biometría & Seguridad Panel</h1>
                    <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">Monitoreo de IA en tiempo real para cumplimiento de LOPDP y prevención de fraude de identidad. Análisis de identidades sintéticas y vectores de deepfakes.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={handleExport}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-700 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
                    >
                        <Download size={18} /> Exportar Reporte
                    </button>
                    <button
                        onClick={handleStartAudit}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1552D4] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-[#1244b0] transition-all active:scale-95"
                    >
                        <ShieldCheck size={18} /> Iniciar Auditoría
                    </button>
                </div>
            </div>

            {/* Zone 1: Awareness - Stats Grid */}
            <BiometricsStatsGrid activeCard={activeCard} onCardClick={setActiveCard} />

            {/* Zone 2: Analysis - Risk Radar + Configuration */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Risk Radar Chart (2/3 width) */}
                <div className="xl:col-span-2">
                    <RiskRadarChart activeMetric={activeCard} />
                </div>

                {/* Configuration Controls with AI Recommendations (1/3 width) */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex-1 transition-colors shadow-lg overflow-hidden relative">
                        {/* Decorative background circle */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 relative z-10">Consola de Decisión</h3>
                        <p className="text-xs text-slate-500 mb-6 relative z-10">Ajuste el balance entre seguridad máxima y experiencia de usuario (UX).</p>

                        <div className="space-y-8 relative z-10">
                            <div>
                                <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500 dark:text-slate-400">Tolerancia a Deepfakes</span>
                                    <span className="text-[#1552D4]">Sensibilidad: {(deepfakeTolerance / 100).toFixed(2)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="80"
                                    max="100"
                                    value={deepfakeTolerance}
                                    onChange={(e) => setDeepfakeTolerance(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-[#1552D4]"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                                    <span className="text-red-500">Protección Máxima</span>
                                    <span>Balanceado</span>
                                    <span className="text-amber-600">Alta Fluidez</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500 dark:text-slate-400">Precisión Biométrica</span>
                                    <span className="text-[#1552D4]">{biometricPrecision}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="70"
                                    max="99"
                                    value={biometricPrecision}
                                    onChange={(e) => setBiometricPrecision(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-[#1552D4]"
                                />
                            </div>
                        </div>

                        {/* AI Recommendation */}
                        <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap size={40} className="text-[#1552D4]" />
                            </div>
                            <div className="flex items-start gap-3 relative z-10">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <Zap size={16} className="text-[#1552D4] fill-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">Asistente de Optimización</h4>
                                    <p className={`text-[10px] leading-tight font-medium ${recommendation.color}`}>
                                        {recommendation.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => alert("Configuración de seguridad actualizada en todos los clusters de validación biométrica.")}
                            className="w-full mt-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-200 dark:shadow-none"
                        >
                            Aplicar Configuración Global
                        </button>
                    </div>
                </div>
            </div>

            {/* Zona 3: Acción - Intercepciones e Investigaciones (Horizontales y Desplegables) */}
            <div className="flex flex-col gap-6">
                <RecentInterceptions />
                <ActiveInvestigations />
            </div>
        </div>
    );
};
