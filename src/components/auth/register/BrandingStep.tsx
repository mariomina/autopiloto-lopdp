"use client";

import React, { useState } from 'react';
import {
    PenTool,
    Monitor, // Aspect Ratio equiv
    ArrowLeft,
    CloudUpload,
    BadgeCheck,
    ArrowRight
} from 'lucide-react';

interface BrandingStepProps {
    onFinish: () => void;
    onBack: () => void;
    data: any;
    updateData: (fields: any) => void;
    isLoading?: boolean;
}

export const BrandingStep: React.FC<BrandingStepProps> = ({ onFinish, onBack, data, updateData, isLoading }) => {
    const primaryColor = data.primaryColor || '#1152d4';
    const portalName = data.portalName || 'Portal de Cumplimiento Corporativo';

    const setPrimaryColor = (color: string) => updateData({ primaryColor: color });
    const setPortalName = (name: string) => updateData({ portalName: name });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 animate-fade-in">
            {/* Left Column: Context & Info */}
            <div className="lg:col-span-1 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Su marca, su confianza
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        Personalice la experiencia de sus usuarios. Una identidad visual consistente reduce las tasas de abandono en un 40% y aumenta la confianza en los procesos de cumplimiento legal.
                    </p>
                </div>

                <div className="hidden lg:block rounded-xl border border-slate-200 dark:border-border-dark bg-white/50 dark:bg-card-dark/50 p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-3 mb-4">
                        <PenTool className="text-blue-500 mt-0.5" size={24} />
                        <div>
                            <h3 className="font-medium text-sm text-slate-900 dark:text-white">Guía de Diseño</h3>
                            <p className="text-xs text-slate-500 dark:text-muted mt-1">
                                Recomendamos utilizar logotipos en formato SVG para garantizar la máxima nitidez en todas las resoluciones.
                            </p>
                        </div>
                    </div>
                    <div className="h-px w-full bg-slate-200 dark:bg-border-dark my-4"></div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-muted">
                        <Monitor size={16} />
                        <span>Relación de aspecto recomendada 3:1</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-2">
                <form className="rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark shadow-sm overflow-hidden flex flex-col h-full">
                    {/* Form Header */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                        <h3 className="font-medium text-slate-900 dark:text-white">Personalización de Identidad</h3>
                        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                            Paso 3 de 3
                        </span>
                    </div>

                    {/* Form Body */}
                    <div className="p-6 md:p-8 space-y-8 flex-1">

                        {/* Portal Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="portal_name">
                                Nombre del Portal <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="portal_name"
                                    name="portal_name"
                                    value={portalName}
                                    onChange={(e) => setPortalName(e.target.value)}
                                    className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-input-dark px-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm h-11 transition-shadow"
                                    placeholder="Ej. Portal de Cumplimiento Corporativo"
                                />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-muted">Este nombre será visible en la pestaña del navegador y correos electrónicos.</p>
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Logotipo Corporativo
                            </label>
                            <div className="relative group">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="h-10 w-10 mb-3 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
                                            <CloudUpload size={24} />
                                        </div>
                                        <p className="mb-1 text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Haga clic para subir</span> o arrastre y suelte</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">SVG, PNG, JPG (MÁX. 2MB)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Color Picker */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Color Primario del Portal
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative h-12 w-12 rounded-full overflow-hidden shadow-sm ring-2 ring-slate-200 dark:ring-slate-700">
                                        <input
                                            type="color"
                                            id="primary_color"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-slate-400">#</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={primaryColor.replace('#', '')}
                                                readOnly
                                                className="block w-full rounded-lg border border-slate-300黑暗:border-border-dark bg-slate-50 dark:bg-input-dark pl-7 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 font-mono uppercase"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-muted">Se utilizará en botones, enlaces y acentos visuales.</p>
                            </div>

                            {/* Preview */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Vista Previa
                                </label>
                                <div className="grid grid-cols-2 gap-3 h-[88px]">
                                    {/* Light Card */}
                                    <div className="rounded-lg border border-slate-200 bg-white flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
                                        <span className="relative text-sm font-bold text-slate-800 flex items-center gap-2">
                                            <BadgeCheck style={{ color: primaryColor }} size={16} />
                                            LOGO
                                        </span>
                                    </div>
                                    {/* Dark Card */}
                                    <div className="rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:8px_8px] opacity-20"></div>
                                        <span className="relative text-sm font-bold text-white flex items-center gap-2">
                                            <BadgeCheck style={{ color: primaryColor }} size={16} />
                                            LOGO
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Form Footer */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-border-dark flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onBack}
                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Atrás
                        </button>
                        <button
                            type="button"
                            onClick={onFinish}
                            disabled={isLoading}
                            className={`inline-flex items-center justify-center rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    Finalizar Configuración
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
                    <p>Al finalizar, será redirigido al panel principal de administración.</p>
                </div>
            </div>
        </div>
    );
};
