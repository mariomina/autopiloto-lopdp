"use client";

import React from 'react';
import { MoreHorizontal, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface Investigation {
    id: string;
    entity: string;
    type: string;
    confidence: number;
    status: 'Bajo Revisión' | 'Análisis Pendiente' | 'Resuelto';
}

const investigations: Investigation[] = [
    { id: '#CASE-8821', entity: 'Empresa Pub. Sector A', type: 'Error Biométrico (Patrón)', confidence: 92, status: 'Bajo Revisión' },
    { id: '#CASE-8828', entity: 'Financiera del Sur', type: 'Audio Deepfake', confidence: 78, status: 'Análisis Pendiente' },
    { id: '#CASE-8819', entity: 'Cooperativa X', type: 'Suplantación de Dispositivo', confidence: 15, status: 'Resuelto' },
];

export const ActiveInvestigations: React.FC = () => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
        <div className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark overflow-hidden flex flex-col transition-all duration-300">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Investigaciones Activas</h3>
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar Caso..."
                            className="pl-8 pr-2 py-1 bg-slate-50 dark:bg-midnight border border-slate-200 dark:border-white/10 rounded-md text-[10px] outline-none focus:ring-1 focus:ring-brand w-32"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                        <Filter size={14} className="text-slate-500" />
                    </button>
                    {isExpanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </div>
            </div>

            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="overflow-x-auto overflow-y-auto flex-1 max-h-[400px]">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead className="bg-slate-50 dark:bg-midnight sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">ID CASO</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">ENTIDAD</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">SCORE</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">ESTADO</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                                {investigations.map((item, index) => (
                                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                        <td className="px-4 py-3 font-mono text-slate-500 text-[10px]">{item.id}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{item.entity}</span>
                                                <span className="text-[10px] text-slate-500">{item.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${item.confidence > 80 ? 'bg-red-500' : item.confidence > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${item.confidence}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-500">{item.confidence}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${item.status === 'Bajo Revisión' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                                    item.status === 'Análisis Pendiente' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded transition-colors text-slate-400">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-midnight/20 text-center">
                        <button className="text-[10px] text-slate-500 hover:text-brand font-bold uppercase tracking-widest">Cargar más registros</button>
                    </div>
                </div>
            )}
        </div>
    );
};
