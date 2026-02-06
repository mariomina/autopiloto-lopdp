"use client";

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';

interface ThreatVector {
    name: string;
    severity: 'High' | 'Med' | 'Low';
    percentage: number;
    color: string;
    intensity: number;
}

const getMetricData = (metric: string) => {
    switch (metric) {
        case 'fraud':
            return {
                time: [
                    { time: '08:00', threats: 20, neutralized: 18 },
                    { time: '10:00', threats: 35, neutralized: 32 },
                    { time: '12:00', threats: 95, neutralized: 90 },
                    { time: '14:00', threats: 60, neutralized: 58 },
                    { time: '16:00', threats: 40, neutralized: 39 },
                    { time: '18:00', threats: 25, neutralized: 25 },
                    { time: '20:00', threats: 10, neutralized: 10 },
                ],
                radar: [
                    { subject: 'Validación ID', A: 120, B: 110, fullMark: 150 },
                    { subject: 'Face Match', A: 40, B: 100, fullMark: 150 },
                    { subject: 'Video Inyect.', A: 30, B: 110, fullMark: 150 },
                    { subject: 'Firma Digital', A: 20, B: 120, fullMark: 150 },
                    { subject: 'Metadatos', A: 140, B: 90, fullMark: 150 },
                    { subject: 'Latencia', A: 65, B: 85, fullMark: 150 },
                ]
            };
        case 'deepfake':
            return {
                time: [
                    { time: '08:00', threats: 5, neutralized: 5 },
                    { time: '10:00', threats: 15, neutralized: 14 },
                    { time: '12:00', threats: 45, neutralized: 42 },
                    { time: '14:00', threats: 80, neutralized: 76 },
                    { time: '16:00', threats: 120, neutralized: 115 },
                    { time: '18:00', threats: 90, neutralized: 88 },
                    { time: '20:00', threats: 40, neutralized: 40 },
                ],
                radar: [
                    { subject: 'Validación ID', A: 50, B: 110, fullMark: 150 },
                    { subject: 'Face Match', A: 145, B: 130, fullMark: 150 },
                    { subject: 'Video Inyect.', A: 130, B: 110, fullMark: 150 },
                    { subject: 'Firma Digital', A: 30, B: 80, fullMark: 150 },
                    { subject: 'Metadatos', A: 85, B: 90, fullMark: 150 },
                    { subject: 'Latencia', A: 110, B: 85, fullMark: 150 },
                ]
            };
        case 'threats':
            return {
                time: [
                    { time: '08:00', threats: 50, neutralized: 45 },
                    { time: '10:00', threats: 40, neutralized: 38 },
                    { time: '12:00', threats: 30, neutralized: 30 },
                    { time: '14:00', threats: 45, neutralized: 45 },
                    { time: '16:00', threats: 70, neutralized: 68 },
                    { time: '18:00', threats: 110, neutralized: 105 },
                    { time: '20:00', threats: 90, neutralized: 85 },
                ],
                radar: [
                    { subject: 'Validación ID', A: 90, B: 110, fullMark: 150 },
                    { subject: 'Face Match', A: 80, B: 130, fullMark: 150 },
                    { subject: 'Video Inyect.', A: 95, B: 110, fullMark: 150 },
                    { subject: 'Firma Digital', A: 140, B: 100, fullMark: 150 },
                    { subject: 'Metadatos', A: 110, B: 90, fullMark: 150 },
                    { subject: 'Latencia', A: 75, B: 85, fullMark: 150 },
                ]
            };
        default: // compliance
            return {
                time: [
                    { time: '08:00', threats: 10, neutralized: 10 },
                    { time: '10:00', threats: 15, neutralized: 15 },
                    { time: '12:00', threats: 25, neutralized: 25 },
                    { time: '14:00', threats: 20, neutralized: 20 },
                    { time: '16:00', threats: 18, neutralized: 18 },
                    { time: '18:00', threats: 12, neutralized: 12 },
                    { time: '20:00', threats: 8, neutralized: 8 },
                ],
                radar: [
                    { subject: 'Validación ID', A: 140, B: 140, fullMark: 150 },
                    { subject: 'Face Match', A: 130, B: 130, fullMark: 150 },
                    { subject: 'Video Inyect.', A: 125, B: 125, fullMark: 150 },
                    { subject: 'Firma Digital', A: 135, B: 135, fullMark: 150 },
                    { subject: 'Metadatos', A: 145, B: 145, fullMark: 150 },
                    { subject: 'Latencia', A: 120, B: 120, fullMark: 150 },
                ]
            };
    }
};

const threatVectors: ThreatVector[] = [
    { name: 'Suplantación de Cédula', severity: 'High', percentage: 78, color: 'bg-red-500', intensity: 85 },
    { name: 'Inyección de Video', severity: 'High', percentage: 92, color: 'bg-red-600', intensity: 95 },
    { name: 'Falsificación de Firma', severity: 'Med', percentage: 45, color: 'bg-amber-500', intensity: 60 },
];

interface RiskRadarChartProps {
    activeMetric?: string;
}

export const RiskRadarChart: React.FC<RiskRadarChartProps> = ({ activeMetric = 'compliance' }) => {
    const data = getMetricData(activeMetric);

    const getMetricInfo = () => {
        switch (activeMetric) {
            case 'fraud':
                return {
                    title: "Análisis de Fraudes Bloqueados",
                    desc: "Historial detallado de intentos de suplantación de identidad y documentos"
                };
            case 'deepfake':
                return {
                    title: "Efectividad vs Deepfakes",
                    desc: "Rendimiento del motor de detección de inyección de video y recreación facial"
                };
            case 'threats':
                return {
                    title: "Vectores de Amenaza Críticos",
                    desc: "Monitoreo de nuevas modalidades de ataque en fotos de cédula y firmas"
                };
            default:
                return {
                    title: "Cumplimiento y Puntaje LOPDP",
                    desc: "Evolución del índice de confianza en validación de identidad legal"
                };
        }
    };

    const metricInfo = getMetricInfo();

    return (
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark overflow-hidden flex flex-col min-h-[500px] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-slate-200 dark:border-white/10 gap-4">
                <div className="flex items-center gap-3">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{metricInfo.title}</h3>
                        <p className="text-xs text-slate-500">{metricInfo.desc}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <select className="bg-slate-50 dark:bg-midnight border border-slate-200 dark:border-white/10 text-xs rounded-lg py-1.5 px-3 text-slate-600 dark:text-slate-300 outline-none focus:ring-1 focus:ring-brand">
                        <option>Vista Temporal</option>
                        <option>Vista Radar</option>
                    </select>
                    <select className="bg-slate-50 dark:bg-midnight border border-slate-200 dark:border-white/10 text-xs rounded-lg py-1.5 px-3 text-slate-600 dark:text-slate-300 outline-none focus:ring-1 focus:ring-brand">
                        <option>Últimas 24 Horas</option>
                        <option>Últimos 7 Días</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 flex-1 p-6 gap-8">
                {/* Main Graph Visualization */}
                <div className="lg:col-span-2 h-[350px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.time} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorNeutralized" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                            <XAxis
                                dataKey="time"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#94a3b8' }}
                            />
                            <YAxis
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#94a3b8' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '12px'
                                }}
                                itemStyle={{ padding: '2px 0' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="threats"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorThreats)"
                                name="Amenazas"
                            />
                            <Area
                                type="monotone"
                                dataKey="neutralized"
                                stroke="#0ea5e9"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorNeutralized)"
                                name="Neutralizadas"
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* Performance Label */}
                    <div className="absolute top-2 right-4 flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="size-2 rounded-full bg-red-500"></div>
                            <span className="text-[10px] font-medium text-slate-500 uppercase">Intentos</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="size-2 rounded-full bg-sky-500"></div>
                            <span className="text-[10px] font-medium text-slate-500 uppercase">Respuestas</span>
                        </div>
                    </div>
                </div>

                {/* Threat Vectors list */}
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                    <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Impacto por Vector</h4>
                    {threatVectors.map((vector, index) => (
                        <div key={index} className="p-3 rounded-xl bg-slate-50 dark:bg-midnight/50 border border-slate-100 dark:border-white/5 transition-all hover:translate-x-1 group cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{vector.name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${vector.severity === 'High' ? 'bg-red-500/10 text-red-500' :
                                    vector.severity === 'Med' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                    {vector.severity === 'High' ? 'ALTO' : vector.severity === 'Med' ? 'MEDIO' : 'BAJO'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                                    <div
                                        className={`${vector.color} h-full rounded-full transition-all duration-700 group-hover:opacity-80`}
                                        style={{ width: `${vector.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 w-8 text-right font-bold">{vector.percentage}%</span>
                            </div>
                        </div>
                    ))}

                    <button className="mt-2 text-xs text-brand font-bold py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
                        Descargar Reporte Forense
                    </button>
                </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="bg-slate-50 dark:bg-midnight p-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
                <div className="size-6 bg-brand/10 rounded flex items-center justify-center">
                    <span className="text-brand text-[8px] font-bold">IA</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 italic">
                    "Correlación detectada entre <b>Inyección de Video</b> y ataques de suplantación facial."
                </p>
            </div>
        </div>
    );
};
