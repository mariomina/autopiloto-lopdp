"use client";

import React, { useState } from 'react';
import {
    RefreshCw,
    Banknote,
    ArrowRight,
    Check
} from 'lucide-react';

interface ModulesStepProps {
    onNext: () => void;
    onBack: () => void;
    data: any;
    updateData: (fields: any) => void;
}

export const ModulesStep: React.FC<ModulesStepProps> = ({ onNext, onBack, data, updateData }) => {
    // Collect specific module state from props
    const modules = data.modules || {
        rat: true,
        biometrics: false,
        signature: false,
        arco: false
    };

    const toggleModule = (key: string) => {
        updateData({
            modules: {
                ...modules,
                [key]: !modules[key]
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 animate-fade-in">
            {/* Left Column: Context & Info */}
            <div className="lg:col-span-1 space-y-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Personalice su infraestructura de cumplimiento
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        Seleccione los módulos operativos que desea activar en su instancia. Cada módulo se despliega en contenedores aislados para garantizar la integridad de los datos.
                    </p>
                </div>

                <div className="hidden lg:block rounded-xl border border-slate-200 dark:border-border-dark bg-white/50 dark:bg-card-dark/50 p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-3 mb-4">
                        <RefreshCw className="text-blue-500 mt-0.5" size={24} />
                        <div>
                            <h3 className="font-medium text-sm text-slate-900 dark:text-white">Sincronización Automática</h3>
                            <p className="text-xs text-slate-500 dark:text-muted mt-1">
                                Los módulos seleccionados se aprovisionarán automáticamente al finalizar el registro.
                            </p>
                        </div>
                    </div>
                    <div className="h-px w-full bg-slate-200 dark:bg-border-dark my-4"></div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-muted">
                        <Banknote size={16} />
                        <span>El costo se ajustará según su selección.</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-2">
                <form className="rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark shadow-sm overflow-hidden flex flex-col h-full">
                    {/* Form Header */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                        <h3 className="font-medium text-slate-900 dark:text-white">Configuración de Módulos</h3>
                        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                            Paso 2 de 3
                        </span>
                    </div>

                    {/* Form Body */}
                    <div className="p-6 md:p-8 flex-1">
                        <div className="space-y-4">

                            {/* Module 1: RAT (Core) */}
                            <div className="flex items-start justify-between p-4 rounded-lg border border-primary/30 bg-primary/5 dark:bg-primary/10">
                                <div className="space-y-1 pr-4">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-slate-900 dark:text-white">Orquestador de Evidencias (RAT)</h4>
                                        <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20">Core</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Registro de Actividades de Tratamiento y gestión centralizada de bitácoras de cumplimiento LOPDP.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={modules.rat}
                                    className="bg-primary relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-card-dark"
                                >
                                    <span aria-hidden="true" className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                </button>
                            </div>

                            {/* Module 2: Biometría */}
                            <div className={`flex items-start justify-between p-4 rounded-lg border transition-colors ${modules.biometrics ? 'border-primary/30 bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-border-dark hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                <div className="space-y-1 pr-4">
                                    <h4 className="font-medium text-slate-900 dark:text-white">Validación Biométrica Pasiva</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Motor de prueba de vida (liveness detection) certificado iBeta Nivel 2 para onboarding digital.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={modules.biometrics}
                                    onClick={() => toggleModule('biometrics')}
                                    className={`${modules.biometrics ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-card-dark`}
                                >
                                    <span aria-hidden="true" className={`${modules.biometrics ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                                </button>
                            </div>

                            {/* Module 3: Firma Cloud */}
                            <div className={`flex items-start justify-between p-4 rounded-lg border transition-colors ${modules.signature ? 'border-primary/30 bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-border-dark hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                <div className="space-y-1 pr-4">
                                    <h4 className="font-medium text-slate-900 dark:text-white">Firma Electrónica Cloud</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Generación y estampado de firmas electrónicas con validez jurídica en documentos PDF/XML.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={modules.signature}
                                    onClick={() => toggleModule('signature')}
                                    className={`${modules.signature ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-card-dark`}
                                >
                                    <span aria-hidden="true" className={`${modules.signature ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                                </button>
                            </div>

                            {/* Module 4: ARCO */}
                            <div className={`flex items-start justify-between p-4 rounded-lg border transition-colors ${modules.arco ? 'border-primary/30 bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-border-dark hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                <div className="space-y-1 pr-4">
                                    <h4 className="font-medium text-slate-900 dark:text-white">Gestión de Derechos ARCO</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Portal de autogestión para titulares de datos (Acceso, Rectificación, Cancelación y Oposición).
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={modules.arco}
                                    onClick={() => toggleModule('arco')}
                                    className={`${modules.arco ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-card-dark`}
                                >
                                    <span aria-hidden="true" className={`${modules.arco ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-border-dark flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onBack}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-border-dark bg-white dark:bg-transparent px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-card-dark transition-all"
                        >
                            Atrás
                        </button>
                        <button
                            type="button"
                            onClick={onNext}
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all gap-2"
                        >
                            Siguiente
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
                    <p>Al continuar, acepta la configuración de módulos seleccionada.</p>
                </div>
            </div>
        </div>
    );
};
