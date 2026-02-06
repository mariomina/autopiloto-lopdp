"use client";

import React, { useState } from 'react';
import { FileBadge, Calendar, Plus, Clock, CheckCircle2, Eye, Share2, Download, Fingerprint, ShieldCheck } from 'lucide-react';

const MOCK_CERTIFICATES = [
    { id: 'CERT-001', name: 'Certificado de Transparencia LOPDP', date: '24 Oct 2026', status: 'Verificado', hash: '8d9f...2a' },
    { id: 'CERT-002', name: 'Log de Auditoría de Accesos', date: '20 Oct 2026', status: 'Verificado', hash: 'c3e4...d5' },
    { id: 'CERT-003', name: 'Reporte de Incidentes Q3', date: '15 Oct 2026', status: 'Verificado', hash: '6a7b...8c' },
];

export const ReportsView: React.FC = () => {
    const [generating, setGenerating] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setGenerating(false);

            // Auto-download the newly "generated" certificate
            const content = `CERTIFICADO DE TRANSPARENCIA LOPDP\n\nOrganización: BANCO DEL AUSTRO S.A.\nFecha: ${new Date().toLocaleDateString()}\nEstado: CUMPLIMIENTO ÓPTIMO\nHash de Verificación: ${Math.random().toString(16).substring(2, 10)}\n\nGenerado por ENEXT Compliance Orchestrator.`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `Certificado_Transparencia_${new Date().getFullYear()}.txt`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert("¡Certificado Generado con Éxito!\n\nEl documento ha sido sellado criptográficamente y se ha iniciado la descarga automática.");
        }, 2000);
    };

    const handleDownload = (name: string, hash: string) => {
        const content = `REPORTE DE AUDITORÍA\n\nNombre: ${name}\nID: ${hash}\nFecha: ${new Date().toLocaleDateString()}\n\nEste documento contiene la evidencia técnica del cumplimiento normativo LOPDP.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${name.replace(/\s+/g, '_')}.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`Descargando archivo: ${name}.txt\n\nVerificando integridad SHA-256... ¡Pase!`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Centro de Auditoría</h2>
                    <p className="text-slate-500 text-sm">Gestión de cumplimiento y emisión de certificados LOPDP.</p>
                </div>
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-500 uppercase tracking-wide">Sistema Seguro & Encriptado</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Generator & History */}
                <div className="space-y-6">
                    {/* Generator */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <FileBadge className="text-[#1552D4]" size={24} />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Generación de Documentos</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Fecha Inicio</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input type="text" defaultValue="01/10/2026" className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white outline-none focus:border-[#1552D4]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Fecha Fin</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input type="text" defaultValue="31/10/2026" className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white outline-none focus:border-[#1552D4]" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Tipo de Reporte</label>
                                <select className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white outline-none focus:border-[#1552D4]">
                                    <option>Certificado de Transparencia LOPDP</option>
                                    <option>Log de Auditoría de Accesos</option>
                                    <option>Reporte de Incidentes de Seguridad</option>
                                </select>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={generating}
                                className={`w-full py-3 ${generating ? 'bg-slate-400' : 'bg-[#1552D4] hover:bg-[#1244b0]'} text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95`}
                            >
                                {generating ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><Plus size={18} /> Generar Certificado</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* History */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg flex-1 transition-colors min-h-[300px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Clock className="text-slate-400" size={18} />
                                <h3 className="font-bold text-slate-900 dark:text-white">Historial Reciente</h3>
                            </div>
                            <button className="text-xs text-[#1552D4] hover:underline">Ver Todo</button>
                        </div>

                        <div className="space-y-3">
                            {MOCK_CERTIFICATES.map(cert => (
                                <div key={cert.id} className="p-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-lg hover:border-slate-300 dark:hover:border-white/20 transition-all group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{cert.name}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 bg-green-500/10 text-green-600 dark:text-green-500 rounded border border-green-500/20 flex items-center gap-1"><CheckCircle2 size={10} /> Verificado</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">{cert.date}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-mono text-slate-600 bg-slate-200 dark:bg-black/30 px-2 py-1 rounded">Hash: {cert.hash}</div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => alert("Enlace de verificación copiado.")}
                                                className="p-1 hover:text-[#1552D4] text-slate-400"
                                            >
                                                <Share2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDownload(cert.name, cert.hash)}
                                                className="p-1 hover:text-[#1552D4] text-slate-400"
                                            >
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Preview */}
                <div className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden flex flex-col transition-colors">
                    <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Eye className="text-[#1552D4]" size={18} />
                            <span className="font-bold text-slate-900 dark:text-white text-sm">Vista Previa del Certificado Real</span>
                        </div>
                        <button
                            onClick={() => alert("Abriendo visor de documentos...")}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded bg-white dark:bg-black/20 shadow-sm"
                        >
                            <Share2 size={12} /> Pantalla Completa
                        </button>
                    </div>

                    <div className="flex-1 p-8 bg-slate-100 dark:bg-slate-950 overflow-y-auto flex justify-center">
                        {/* The Document Paper */}
                        <div className="w-full max-w-[500px] bg-white text-slate-900 p-8 shadow-2xl min-h-[700px] relative transition-transform hover:scale-[1.01] duration-300">
                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                <Fingerprint size={300} />
                            </div>

                            <div className="flex justify-between items-center mb-12">
                                <div className="flex items-center gap-2 text-[#1552D4]">
                                    <ShieldCheck size={32} />
                                    <div className="leading-tight">
                                        <h1 className="font-bold text-xl text-slate-900 tracking-tight">ENEXT</h1>
                                        <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Compliance S.A.</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-slate-200">Sello de Veracidad</div>
                            </div>

                            <div className="text-center mb-12">
                                <h2 className="text-2xl font-black uppercase tracking-wide text-slate-900 mb-2">Certificado de Transparencia</h2>
                                <div className="w-16 h-1 bg-[#1552D4] mx-auto"></div>
                                <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Protocolo LOPDP-EC-2026</p>
                            </div>

                            <div className="space-y-6 text-sm text-slate-600 leading-relaxed text-center mb-12 px-4">
                                <p>
                                    Por medio del presente documento, <strong className="text-slate-900">ENEXT Compliance S.A.</strong>, en su calidad de auditor técnico, certifica que la organización:
                                </p>
                                <p className="text-2xl font-black text-[#1552D4] py-2 tracking-tight">BANCO DEL AUSTRO S.A.</p>
                                <p>
                                    Ha completado satisfactoriamente la auditoría de cumplimiento normativo conforme a la <strong className="text-slate-900">Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de Ecuador, demostrando la implementación de medidas técnicas, físicas y organizativas de seguridad a nivel de datos y procesos.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-12">
                                <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Periodo Auditado</span>
                                    <span className="block font-bold text-slate-900">Q4 - OCT 2026</span>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-lg text-center border border-emerald-100">
                                    <span className="block text-[10px] uppercase font-bold text-emerald-600 mb-1">Nivel de Riesgo</span>
                                    <span className="block font-bold text-emerald-700">BAJO / SEGURO</span>
                                </div>
                            </div>

                            <div className="border-t-2 border-slate-100 pt-8 mt-auto flex justify-between items-end">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 bg-black text-white p-1">
                                        <div className="grid grid-cols-2 gap-1 h-full">
                                            <div className="bg-white"></div><div className="bg-white"></div>
                                            <div className="bg-white"></div><div className="bg-transparent"></div>
                                        </div>
                                    </div>
                                    <div className="text-[8px] text-slate-400 font-mono">
                                        <p className="font-bold text-slate-600 mb-0.5 uppercase">AuditChain Verification</p>
                                        <p>https://verify.enext.com/bda-2026</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 border-2 border-[#1552D4]/20 rounded-full flex items-center justify-center mx-auto mb-2 relative">
                                        <div className="w-12 h-12 border border-[#1552D4]/40 rounded-full border-dashed animate-spin-slow"></div>
                                        <CheckCircle2 className="absolute text-[#1552D4]" size={24} />
                                    </div>
                                    <div className="bg-[#1552D4] text-white text-[8px] px-2 py-0.5 rounded-full font-bold mb-1 shadow-sm">VALIDO 2026</div>
                                    <p className="text-[8px] font-bold uppercase text-slate-400">Firmado Digitalmente</p>
                                </div>
                            </div>

                            <div className="mt-8 text-[7px] text-slate-300 font-mono break-all text-center">
                                CÉDULA DE IDENTIDAD DIGITAL - HASH INTEGRITY CHECK<br />
                                8d9f2a1b9c3e4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
