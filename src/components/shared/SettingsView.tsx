"use client";

import React from 'react';
import { Save } from 'lucide-react';
import { RoleManagement } from '@/components/settings/RoleManagement';
import { ApiKeysSettings } from '@/components/settings/ApiKeysSettings';
import { BrandingSettings } from '@/components/settings/BrandingSettings';

export const SettingsView: React.FC = () => {
    return (
        <div className="pb-12">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <div className="flex items-center text-sm text-slate-500 mb-2 gap-2">
                        <span>Inicio</span> <span className="text-slate-400 dark:text-slate-600">›</span> <span>Ajustes</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Configuración & Ajustes</h2>
                    <p className="text-slate-500 dark:text-slate-400">Gestione la configuración de su tenant, roles de usuario, claves API y preferencias de marca para la plataforma ENEXT.</p>
                </div>

                <div className="border-t border-slate-200 dark:border-white/5 my-8"></div>

                {/* Modular Sections */}
                <RoleManagement />
                <ApiKeysSettings />
                <BrandingSettings />

                {/* Save Actions Footer */}
                <div className="fixed bottom-0 left-0 right-0 md:left-72 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-t border-slate-200 dark:border-white/10 p-4 px-8 flex justify-between items-center z-20 transition-colors">
                    <span className="text-xs text-slate-500">Guardado: Hoy a las 09:42 AM</span>
                    <div className="flex gap-4">
                        <button className="px-6 py-2.5 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Cancelar</button>
                        <button className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-white font-bold rounded-lg shadow-lg shadow-brand/20 transition-all flex items-center gap-2">
                            <Save size={18} /> Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
