"use client";

import React, { useState, useMemo } from 'react';
import { Download, Plus, Search, FileText, CheckCircle, Clock, AlertCircle, MoreVertical, ShieldCheck } from 'lucide-react';

export const SignatureView: React.FC = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    // Mock Data
    const docs = [
        { id: '#DOC-8291', name: 'Contrato Servicios Cloud v2.pdf', signer: 'Juan Pérez', role: 'JP', date: '24 Oct 2026', hash: 'e7a...9f', status: 'Firmado', type: 'PDF' },
        { id: '#DOC-8290', name: 'Anexo Protección Datos.docx', signer: 'María Loza', role: 'ML', date: '23 Oct 2026', hash: '8d2...1a', status: 'Pendiente', type: 'DOCX' },
        { id: '#DOC-8289', name: 'Acuerdo Confidencialidad.pdf', signer: 'Carlos Ruiz', role: 'CR', date: '22 Oct 2026', hash: '9f1...cc', status: 'Firmado', type: 'PDF' },
        { id: '#DOC-8288', name: 'Consentimiento Biométrico.pdf', signer: 'Sonia Vega', role: 'SV', date: '21 Oct 2026', hash: '5b4...e2', status: 'Expirado', type: 'PDF' },
        { id: '#DOC-8287', name: 'Protocolo de Seguridad V1.4', signer: 'Roberto Mantilla', role: 'RM', date: '20 Oct 2026', hash: 'a1b...3d', status: 'Firmado', type: 'PDF' },
    ];

    const filteredDocs = useMemo(() => {
        return docs.filter(doc => {
            const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
                doc.signer.toLowerCase().includes(search.toLowerCase()) ||
                doc.id.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'Todos' || doc.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const handleExport = () => {
        const headers = "ID,Nombre Documento,Firmante,Fecha,Hash,Estado\n";
        const csvContent = filteredDocs.map(doc =>
            `${doc.id},"${doc.name}",${doc.signer},${doc.date},${doc.hash},${doc.status}`
        ).join("\n");

        const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Reporte_Firmas_Digitales_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Reporte de firmas exportado exitosamente.");
    };

    const handleAddDocument = () => {
        alert("🚀 Simulador de Carga: En un entorno real, aquí se abriría una zona de 'Drag & Drop' para subir archivos PDF y configurar el flujo de firma electrónica.");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Firma Electrónica & Contratos</h2>
                    <p className="text-slate-500 text-sm">Repositorio legal con sellado de tiempo y evidencias LOPDP.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={handleExport}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-sm text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
                    >
                        <Download size={18} /> Exportar Reporte
                    </button>
                    <button
                        onClick={handleAddDocument}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1552D4] hover:bg-[#1244b0] text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        <Plus size={18} /> Nuevo Documento
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                            <Clock size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">PENDIENTES</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">12</div>
                    <p className="text-xs text-slate-500">Documentos esperando firma del cliente.</p>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                            <CheckCircle size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">FIRMADOS HOY</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">48</div>
                    <p className="text-xs text-slate-500">Legalizados digitalmente con validez LOPDP.</p>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg transition-colors overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FileText size={80} />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
                            <ShieldCheck size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">CUMPLIMIENTO</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">99.2%</div>
                    <p className="text-xs text-slate-500">Documentación con evidencia de consentimiento.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/10 transition-colors shadow-sm">
                <div className="flex-1 min-w-[200px] relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por documento o firmante..."
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                </div>
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-600 dark:text-slate-300 outline-none cursor-pointer focus:border-blue-500"
                    >
                        <option value="Todos">Todos los estados</option>
                        <option value="Firmado">Firmado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Expirado">Expirado</option>
                    </select>
                </div>
            </div>

            {/* Documents List */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl transition-colors min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Documento</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Firmante Principal</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Evidencia (LOPDP)</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
                                <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded border border-slate-200 dark:border-white/10 text-slate-400 group-hover:text-blue-500 transition-colors">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">{doc.name}</div>
                                                <div className="text-[10px] text-slate-500 font-mono italic">{doc.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                                {doc.role}
                                            </div>
                                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{doc.signer}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{doc.date}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[9px] font-mono text-slate-400 truncate w-32 bg-slate-100 dark:bg-black/30 px-2 py-0.5 rounded">SHA-256: {doc.hash}</div>
                                            <div className="text-[8px] font-bold text-blue-500 dark:text-blue-400 tracking-wider">TSA TIME-STAMPED</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                                            ${doc.status === 'Firmado' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' :
                                                doc.status === 'Pendiente' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                                                    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}
                                        `}>
                                            {doc.status === 'Firmado' && <CheckCircle size={12} />}
                                            {doc.status === 'Pendiente' && <Clock size={12} />}
                                            {doc.status === 'Expirado' && <AlertCircle size={12} />}
                                            {doc.status}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => alert(`Opciones para ${doc.name}:\n\n- Ver Documento\n- Reenviar Solicitud\n- Ver Evidencia AuditChain\n- Descargar Certificado`)}
                                            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center text-slate-500">
                                        No se encontraron documentos en el repositorio.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer simple de tabla */}
                <div className="p-4 bg-slate-50 dark:bg-black/20 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">ENEXT SAFE-REPOSITORY SYSTEM</span>
                    <div className="flex gap-4">
                        <span className="text-[10px] text-slate-400">Total Espacio: 1.4 GB / 10 GB</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
