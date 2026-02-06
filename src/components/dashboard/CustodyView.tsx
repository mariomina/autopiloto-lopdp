"use client";

import React, { useState, useMemo } from 'react';
import { Download, Search, Calendar, ShieldCheck, Clock } from 'lucide-react';

export const CustodyView: React.FC = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [riskFilter, setRiskFilter] = useState('Todos');

    // Mock Data Extended for the view
    const ratLogs = [
        { id: '#EV-2049', user: 'Admin_04', role: 'Sistemas', action: 'Modificación de Política', time: '2026-10-24 14:32:01', hash: '8f43...9a1b', risk: 'Alto' },
        { id: '#EV-2048', user: 'Legal_01', role: 'Legal', action: 'Acceso a Datos Sensibles', time: '2026-10-24 12:15:33', hash: '3a12...7e9c', risk: 'Bajo' },
        { id: '#EV-2047', user: 'User_88', role: 'Ventas', action: 'Exportación de Reporte', time: '2026-10-24 10:05:12', hash: 'e5d1...2b4f', risk: 'Medio' },
        { id: '#EV-2046', user: 'Admin_04', role: 'Sistemas', action: 'Login Exitoso', time: '2026-10-24 09:00:00', hash: '92c8...11a3', risk: 'Bajo' },
        { id: '#EV-2045', user: 'DPO_Chief', role: 'Privacidad', action: 'Auditoría de Logs', time: '2026-10-23 17:45:22', hash: 'f2a7...8e01', risk: 'Bajo' },
    ];

    const filteredLogs = useMemo(() => {
        return ratLogs.filter(log => {
            const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) ||
                log.action.toLowerCase().includes(search.toLowerCase()) ||
                log.id.toLowerCase().includes(search.toLowerCase());
            const matchesRisk = riskFilter === 'Todos' || log.risk === riskFilter;
            return matchesSearch && matchesRisk;
        });
    }, [search, riskFilter]);

    const handleExport = () => {
        const headers = "ID,Usuario,Rol,Accion,Fecha,Hash,Riesgo\n";
        const csvContent = filteredLogs.map(log =>
            `${log.id},${log.user},${log.role},"${log.action}",${log.time},${log.hash},${log.risk}`
        ).join("\n");

        const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Reporte_RAT_Auditoria_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Reporte exportado exitosamente como CSV (Compatible con Excel/PDF).");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Cadena de Custodia (RAT)</h2>
                    <p className="text-slate-500 text-sm">Registro de Actividades de Tratamiento - Evidencia Inmutable SHA-256</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-6 py-3 bg-[#1552D4] hover:bg-[#1244b0] text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all border border-blue-400/20 active:scale-95"
                >
                    <Download size={18} /> Exportar Reporte
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar usuario o acción..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors dark:text-white"
                    />
                </div>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors dark:text-white"
                    />
                </div>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors dark:text-white"
                    />
                </div>
                <div>
                    <select
                        value={riskFilter}
                        onChange={(e) => setRiskFilter(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors dark:text-white appearance-none cursor-pointer"
                    >
                        <option value="Todos">Riesgo: Todos</option>
                        <option value="Bajo">Riesgo: Bajo</option>
                        <option value="Medio">Riesgo: Medio</option>
                        <option value="Alto">Riesgo: Alto</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl transition-colors min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID Evento</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuario</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Acción</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stamp Temporal (GMT-5)</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Evidencia (Hash)</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Riesgo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="p-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">{log.id}</td>
                                    <td className="p-4">
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">{log.user}</div>
                                        <div className="text-[10px] text-slate-400">{log.role}</div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{log.action}</td>
                                    <td className="p-4 text-xs text-slate-500 dark:text-slate-400 font-mono">{log.time}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={14} className="text-green-500" />
                                            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-black/40 px-2 py-1 rounded truncate w-24">
                                                {log.hash}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                                            ${log.risk === 'Alto' ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' :
                                                log.risk === 'Medio' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' :
                                                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'}
                                        `}>
                                            {log.risk}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center text-slate-500">
                                        No se encontraron registros de actividad con los filtros seleccionados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between transition-colors">
                    <div className="text-xs text-slate-500">Mostrando {filteredLogs.length} de {ratLogs.length} resultados</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors text-xs font-bold disabled:opacity-50" disabled>&lt; Anterior</button>
                        <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold">1</button>
                        <button className="px-3 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors text-xs font-bold">Siguiente &gt;</button>
                    </div>
                </div>
            </div>

            <p className="text-[10px] text-center text-slate-400 italic">
                Nota: Todo registro es inmutable y está sellado mediante un AuditChain propietario.
                Cualquier intento de alteración invalida el hash del bloque.
            </p>
        </div>
    );
};
