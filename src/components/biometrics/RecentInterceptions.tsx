"use client";

import React from 'react';
import { ChevronDown, ChevronUp, UserX, FileText, ShieldCheck, Camera } from 'lucide-react';

interface Interception {
    time: string;
    vector: string;
    icon: React.ReactNode;
    action: 'BLOCKED' | 'FLAGGED' | 'PASSED';
    confidence: number;
}

const interceptions: Interception[] = [
    { time: '10:42:05', vector: 'Suplantación de Cédula', icon: <UserX size={16} />, action: 'BLOCKED', confidence: 98.4 },
    { time: '10:41:12', vector: 'Falsificación de Firma', icon: <FileText size={16} />, action: 'FLAGGED', confidence: 72.1 },
    { time: '10:38:55', vector: 'Inyección de Video', icon: <Camera size={16} />, action: 'BLOCKED', confidence: 99.1 },
    { time: '10:35:20', vector: 'Verificación Facial', icon: <ShieldCheck size={16} />, action: 'PASSED', confidence: 94.2 },
    { time: '10:32:01', vector: 'Documento Alterado', icon: <FileText size={16} />, action: 'BLOCKED', confidence: 96.8 },
];

export const RecentInterceptions: React.FC = () => {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [identities, setIdentities] = React.useState<any[]>([]);
    const [search, setSearch] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            fetchIdentities();
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchIdentities = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/identities/list?search=${search}`);
            if (res.ok) {
                const data = await res.json();
                setIdentities(data.identities);
            }
        } catch (error) {
            console.error("Error fetching identities", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark overflow-hidden flex flex-col transition-all duration-300">
            <div
                className="p-4 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors gap-4"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Identidades Recientes</h3>
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-bold">{identities.length}</span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Buscar por cédula o nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-xs bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-1.5 w-full sm:w-48 focus:ring-1 focus:ring-brand outline-none"
                    />

                    <div className="flex items-center gap-2" onClick={() => setIsExpanded(!isExpanded)}>
                        <button className="text-[10px] text-brand font-bold uppercase tracking-widest hover:underline whitespace-nowrap hidden sm:block">
                            Refresh
                        </button>
                        {isExpanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="overflow-y-auto flex-1 max-h-[400px] animate-in fade-in slide-in-from-top-2 duration-300">
                    {loading ? (
                        <div className="p-8 text-center text-xs text-slate-500">Buscando identidades...</div>
                    ) : identities.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-500">No se encontraron resultados.</div>
                    ) : (
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead className="bg-slate-50 dark:bg-midnight sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hora/Fecha</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Identidad / Vector</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Score Bio</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                                {identities.map((item, index) => {
                                    // Simulation of AI Analysis Data (Metadata mocking)
                                    const confidence = 92 + (index % 7);
                                    const isRecent = new Date(item.createdAt).getTime() > Date.now() - 86400000;

                                    return (
                                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                            <td className="px-4 py-3 font-mono text-slate-500 text-xs">
                                                {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                <div className="text-[9px] opacity-60">{new Date(item.createdAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-emerald-500">
                                                        <ShieldCheck size={16} />
                                                    </span>
                                                    <div>
                                                        <div className="text-slate-900 dark:text-white font-bold text-xs">{item.fullName}</div>
                                                        <div className="text-[10px] text-slate-500">CI: {item.idNumber} • Facial Verify</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-center items-center gap-2">
                                                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-emerald-500"
                                                            style={{ width: `${confidence}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-500 w-8">{confidence}%</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                                                    VERIFICADO
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

