"use client";

import React from 'react';
import { Upload, Info } from 'lucide-react';

export const BrandingSettings: React.FC = () => {
    return (
        <section className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personalización de Marca</h3>
            <p className="text-sm text-slate-500 -mt-2 mb-4">Personalice la apariencia de sus reportes y el portal de usuarios.</p>

            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl p-8 transition-colors shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Logotipo de la Empresa</label>
                        <div className="border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-brand/50 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group bg-slate-50 dark:bg-black/20 h-[180px]">
                            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 group-hover:bg-brand/10 flex items-center justify-center text-slate-400 group-hover:text-brand mb-3 transition-colors">
                                <Upload size={20} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-brand transition-colors">Clic para subir</span>
                            <span className="text-xs text-slate-500 mt-1">SVG, PNG o JPG (max 2MB)</span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Nombre de la Empresa</label>
                            <input
                                type="text"
                                defaultValue="Acme Corporation"
                                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Color de Acento (Reportes)</label>
                                <div className="flex gap-2 items-center bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg p-1.5 pr-3">
                                    <div className="w-8 h-8 rounded bg-[#10B77F] border border-slate-200 dark:border-white/10 cursor-pointer"></div>
                                    <input
                                        type="text"
                                        defaultValue="#10B77F"
                                        className="w-full bg-transparent border-none text-slate-900 dark:text-white text-sm font-mono focus:ring-0 p-0"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Correo de Soporte</label>
                                <input
                                    type="email"
                                    defaultValue="support@acme.com"
                                    className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-brand outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Alert */}
                <div className="mt-8 flex gap-3 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg items-start">
                    <Info className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Los cambios de marca se aplicarán a todos los informes PDF generados y al portal orientado al cliente inmediatamente después de guardar.
                    </p>
                </div>
            </div>
        </section>
    );
};
