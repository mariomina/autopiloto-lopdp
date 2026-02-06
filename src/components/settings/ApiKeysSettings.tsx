"use client";

import React from 'react';
import { Key, Copy, RefreshCw, ExternalLink } from 'lucide-react';

export const ApiKeysSettings: React.FC = () => {
    return (
        <section className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Integración API</h3>
            <p className="text-sm text-slate-500 -mt-2 mb-4">Gestione las claves API para acceder al Motor de Cumplimiento ENEXT programáticamente.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Key Box */}
                <div className="lg:col-span-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl p-6 relative overflow-hidden transition-colors shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500">
                            <Key size={16} />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">Clave API de Producción</span>
                        <span className="ml-auto px-2 py-0.5 bg-green-500 text-white dark:text-midnight text-[10px] font-bold rounded uppercase">Live</span>
                    </div>

                    <div className="flex gap-2 mb-6">
                        <div className="flex-1 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg flex items-center px-4 font-mono text-sm text-slate-600 dark:text-slate-300 relative">
                            sk_live_enext_2026_****************
                            <span className="absolute right-3 text-xs text-slate-500 dark:text-slate-600 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5">Oculto</span>
                        </div>
                        <button className="bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white px-4 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm">
                            <Copy size={16} /> Copiar
                        </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-white/5 pt-4">
                        <span>Creado el 24 de Oct, 2025 por Roberto Gomez</span>
                        <button className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1.5 transition-colors">
                            <RefreshCw size={12} /> Regenerar Clave
                        </button>
                    </div>
                </div>

                {/* Docs Box */}
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl p-6 flex flex-col justify-between transition-colors shadow-sm">
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Docs Desarrolladores</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Lea la guía de integración para aprender cómo autenticar solicitudes de forma segura usando JWT y OAuth2.
                        </p>
                    </div>
                    <a href="#" className="flex items-center gap-2 text-brand hover:text-brand-hover text-sm font-bold mt-6 transition-colors">
                        Ver Documentación <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
};
