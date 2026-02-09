"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Download, Search, Calendar, ShieldCheck, Clock, Loader2, AlertTriangle } from 'lucide-react';

interface AuditEvent {
    id: string;
    eventType: string;
    timestamp: string;
    payloadHash: string;
    metadata: any;
    payload: any;
}

export const CustodyView: React.FC = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [eventFilter, setEventFilter] = useState('Todos');

    // State for real data
    const [events, setEvents] = useState<AuditEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState<'VERIFIED' | 'COMPROMISED' | 'CHECKING' | null>(null);

    // Fetch data on mount
    useEffect(() => {
        const fetchAuditData = async () => {
            try {
                setIsLoading(true);
                // Usamos un tenantId demo por ahora, en prod vendría del contexto de auth
                const tenantId = 'demo-tenant-id';
                const response = await fetch(`/api/audit?tenantId=${tenantId}&limit=50`);
                const result = await response.json();

                if (result.success) {
                    setEvents(result.data.events);
                    // Si la API devuelve status de integridad
                    if (result.data.chainIntegrity?.isValid) {
                        setVerificationStatus('VERIFIED');
                    } else if (result.data.chainIntegrity) {
                        setVerificationStatus('COMPROMISED');
                    }
                }
            } catch (error) {
                console.error('Failed to fetch audit logs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuditData();
    }, []);

    const filteredLogs = useMemo(() => {
        return events.filter(log => {
            const matchesSearch =
                log.id.toLowerCase().includes(search.toLowerCase()) ||
                log.eventType.toLowerCase().includes(search.toLowerCase());

            const matchesType = eventFilter === 'Todos' || log.eventType === eventFilter;

            // Date filtering could be added here

            return matchesSearch && matchesType;
        });
    }, [search, eventFilter, events]);

    const handleExport = () => {
        // Redirigir al endpoint de exportación
        const tenantId = 'demo-tenant-id';
        window.location.href = `/api/audit/export?tenantId=${tenantId}&format=csv`;
    };

    const getRiskLevel = (eventType: string) => {
        if (eventType.includes('DELETION') || eventType.includes('REVOKED')) return 'Alto';
        if (eventType.includes('UPDATED') || eventType.includes('ACCESS') || eventType.includes('COMPROMISED')) return 'Medio';
        return 'Bajo';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        Cadena de Custodia (RAT)
                        {verificationStatus === 'VERIFIED' && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200 flex items-center gap-1">
                                <ShieldCheck size={12} /> Cadena Verificada
                            </span>
                        )}
                        {verificationStatus === 'COMPROMISED' && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full border border-red-200 flex items-center gap-1">
                                <AlertTriangle size={12} /> Integridad Comprometida
                            </span>
                        )}
                    </h2>
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
                        placeholder="Buscar ID o tipo de evento..."
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
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors dark:text-white appearance-none cursor-pointer"
                    >
                        <option value="Todos">Tipo: Todos</option>
                        <option value="CONSENT_GRANTED">Consentimiento Otorgado</option>
                        <option value="ARCO_REQUEST_CREATED">Solicitud ARCO</option>
                        <option value="IDENTITY_CREATED">Identidad Creada</option>
                        <option value="SIGNATURE_COMPLETED">Firma Digital</option>
                        <option value="BIOMETRIC_VERIFICATION">Biometría</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl transition-colors min-h-[400px]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-[400px]">
                        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
                        <p className="text-slate-500">Cargando cadena de auditoría...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID Evento</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo de Evento</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Detalles</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stamp Temporal</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hash SHA-256</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Riesgo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {filteredLogs.length > 0 ? filteredLogs.map((log) => {
                                    const risk = getRiskLevel(log.eventType);
                                    return (
                                        <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                            <td className="p-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold truncate max-w-[100px]" title={log.id}>
                                                {log.id.substring(0, 8)}...
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">{log.eventType.replace(/_/g, ' ')}</div>
                                            </td>
                                            <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                                                <span className="text-xs text-slate-500 block truncate max-w-[150px]" title={JSON.stringify(log.payload, null, 2)}>
                                                    {log.payload ? JSON.stringify(log.payload).substring(0, 50) : '-'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={14} className="text-green-500" />
                                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-black/40 px-2 py-1 rounded truncate w-24" title={log.payloadHash}>
                                                        {log.payloadHash.substring(0, 16)}...
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                                                    ${risk === 'Alto' ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' :
                                                        risk === 'Medio' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' :
                                                            'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'}
                                                `}>
                                                    {risk}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center text-slate-500">
                                            No se encontraron registros de auditoría.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination (Simple version) */}
                <div className="p-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between transition-colors">
                    <div className="text-xs text-slate-500">Mostrando {filteredLogs.length} eventos</div>
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
