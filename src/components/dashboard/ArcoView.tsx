"use client";

import React, { useState, useMemo } from 'react';
import { Download, Plus, FileText, AlertTriangle, Clock, CheckCircle2, Filter, Calendar, Search } from 'lucide-react';

const MOCK_ARCO = [
    { id: 'AR-2026-001', requester: 'Roberto Mantilla', email: 'r.mantilla@gmail.com', type: 'Acceso', date: '2026-10-24', status: 'Nuevo', deadlineDays: 14 },
    { id: 'AR-2026-002', requester: 'Elena Valero', email: 'e.valero@outlook.com', type: 'Rectificación', date: '2026-10-20', status: 'En Proceso', deadlineDays: 2 },
    { id: 'AR-2026-003', requester: 'Carlos Jaramillo', email: 'c.jaramillo@biz.com', type: 'Cancelación', date: '2026-10-18', status: 'Nuevo', deadlineDays: 1 },
    { id: 'AR-2026-004', requester: 'Patricia Ortiz', email: 'p.ortiz@agency.ec', type: 'Oposición', date: '2026-10-15', status: 'Resuelto', deadlineDays: 0 },
    { id: 'AR-2026-005', requester: 'Sonia Vega', email: 's.vega@host.com', type: 'Acceso', date: '2026-10-22', status: 'En Proceso', deadlineDays: 5 },
];

export const ArcoView: React.FC = () => {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('Todos');

    const filteredArco = useMemo(() => {
        return MOCK_ARCO.filter(req => {
            const matchesSearch = req.requester.toLowerCase().includes(search.toLowerCase()) ||
                req.id.toLowerCase().includes(search.toLowerCase());
            const matchesType = typeFilter === 'Todos' || req.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [search, typeFilter]);

    const handleExport = () => {
        const headers = "ID,Solicitante,Email,Tipo,Fecha,Estado,Dias_Restantes\n";
        const csvContent = filteredArco.map(req =>
            `${req.id},${req.requester},${req.email},${req.type},${req.date},${req.status},${req.deadlineDays}`
        ).join("\n");

        const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Bandeja_Derechos_ARCO_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Reporte de solicitudes ARCO exportado exitosamente.");
    };

    const handleNewRequest = () => {
        alert("📋 Formulario de Solicitud de Derechos ARCO:\n\nEn la versión final, este botón abre un formulario legal donde se cargan los datos del titular, el tipo de derecho reclamado y se adjunta el documento de identidad.");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Gestión de Derechos ARCO</h2>
                    <p className="text-slate-500 text-sm">Bandeja de Entrada - LOPDP Ecuador | Visualización centralizada</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={handleExport}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-sm text-slate-600 dark:text-slate-300 transition-colors shadow-sm active:scale-95"
                    >
                        <Download size={16} /> Exportar Reporte
                    </button>
                    <button
                        onClick={handleNewRequest}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1552D4] hover:bg-[#1244b0] text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        <Plus size={16} /> Nueva Solicitud
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* ... existing cards ... */}
                <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Solicitudes Abiertas</span>
                        <FileText size={16} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">142 <span className="text-sm font-medium text-green-500 ml-1">↑ 12%</span></div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">Plazos Críticos (&lt;3 días)</span>
                        <AlertTriangle size={16} className="text-amber-500 dark:text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">18 <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-1">! Acción</span></div>
                </div>
                {/* Average Resolution and Total Resolved cards ... */}
                <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Promedio Resolución</span>
                        <Clock size={16} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">4.2 <span className="text-sm font-medium text-slate-400">Días</span></div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Total Resueltos</span>
                        <CheckCircle2 size={16} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">1,205 <span className="text-xs text-slate-500 ml-1">Cumplidos</span></div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
                <div className="flex-1 min-w-[200px] relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por ID o Solicitante..."
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => alert("Selector de Calendario.")}
                        className="px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <Calendar size={16} /> Rango de Fechas
                    </button>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-600 dark:text-slate-300 outline-none cursor-pointer focus:border-blue-500"
                    >
                        <option value="Todos">Tipo: Todos</option>
                        <option value="Acceso">Acceso</option>
                        <option value="Rectificación">Rectificación</option>
                        <option value="Cancelación">Cancelación</option>
                        <option value="Oposición">Oposición</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl transition-colors min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                                <th className="p-4 w-10"></th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID Solicitud</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitante</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo ARCO</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha Recibida</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Alerta Plazo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredArco.length > 0 ? filteredArco.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="p-4 text-center"><div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-blue-500 cursor-pointer"></div></td>
                                    <td className="p-4 font-mono text-sm text-slate-900 dark:text-white font-medium">
                                        {req.id}
                                        <div className="text-[10px] text-slate-500 mt-1">Ref: LOPDP-EC</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white
                                                ${req.type === 'Acceso' ? 'bg-emerald-600' : ''}
                                                ${req.type === 'Rectificación' ? 'bg-blue-600' : ''}
                                                ${req.type === 'Cancelación' ? 'bg-red-600' : ''}
                                                ${req.type === 'Oposición' ? 'bg-slate-600' : ''}
                                            `}>
                                                {req.requester.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">{req.requester}</div>
                                                <div className="text-xs text-slate-500">{req.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{req.type}</td>
                                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{req.date}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${req.status === 'Nuevo' ? 'bg-blue-500' : req.status === 'Resuelto' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                            <span className="text-sm text-slate-700 dark:text-white">{req.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {req.deadlineDays > 0 ? (
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit
                                                ${req.deadlineDays < 3 ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'}
                                            `}>
                                                {req.deadlineDays < 3 && <Clock size={14} />}
                                                <span className="text-xs font-bold">{req.deadlineDays} Días Restantes</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-emerald-500 text-xs font-medium">
                                                <CheckCircle2 size={14} /> Resuelto
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="p-20 text-center text-slate-500">
                                        No se encontraron solicitudes ARCO.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="p-4 flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-transparent">
                    <span>Mostrando {filteredArco.length} de {MOCK_ARCO.length} resultados filtrados</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-white dark:bg-black/20 border border-slate-100 dark:border-white/10 text-slate-400 disabled:opacity-50" disabled>&lt;</button>
                        <button className="px-3 py-1 rounded bg-[#1552D4] text-white">1</button>
                        <button className="px-3 py-1 rounded bg-white dark:bg-black/20 border border-slate-100 dark:border-white/10 text-slate-400">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
