"use client";

import React from 'react';
import {
    ShieldCheck,
    Info,
    CreditCard,
    Search,
    User,
    MapPin,
    ArrowRight,
    ChevronDown
} from 'lucide-react';

interface LegalStepProps {
    onNext: () => void;
    onCancel: () => void;
    data: any;
    updateData: (fields: any) => void;
}

export const LegalStep: React.FC<LegalStepProps> = ({ onNext, onCancel, data, updateData }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 animate-fade-in">
            {/* Left Column: Context & Info */}
            <div className="lg:col-span-1 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Comencemos con los datos legales
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        Ingrese la información del RUC para configurar su entorno de cumplimiento LOPDP. Estos datos serán utilizados para generar sus contratos de adhesión automáticamente.
                    </p>
                </div>

                <div className="hidden lg:block rounded-xl border border-slate-200 dark:border-border-dark bg-white/50 dark:bg-card-dark/50 p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-3 mb-4">
                        <ShieldCheck className="text-green-500 mt-0.5" size={24} />
                        <div>
                            <h3 className="font-medium text-sm text-slate-900 dark:text-white">Seguridad Empresarial</h3>
                            <p className="text-xs text-slate-500 dark:text-muted mt-1">
                                Sus datos están protegidos con encriptación de 256-bits y cumplen con la normativa local vigente.
                            </p>
                        </div>
                    </div>
                    <div className="h-px w-full bg-slate-200 dark:bg-border-dark my-4"></div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-muted">
                        <Info size={16} />
                        <span>Necesita su número de RUC de 13 dígitos.</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-2">
                <form className="rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark shadow-sm overflow-hidden">
                    {/* Form Header */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                        <h3 className="font-medium text-slate-900 dark:text-white">Formulario de Registro</h3>
                        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                            Paso 1 de 3
                        </span>
                    </div>

                    {/* Form Body */}
                    <div className="p-6 md:p-8 space-y-6">

                        {/* RUC & Fetch Action */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="ruc">
                                Número de RUC <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <CreditCard className="text-slate-400" size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        id="ruc"
                                        name="ruc"
                                        value={data.ruc || ''}
                                        onChange={(e) => updateData({ ruc: e.target.value })}
                                        className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-input-dark pl-10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm h-11 transition-all"
                                        placeholder="1790012345001"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-border-dark bg-white dark:bg-input-dark px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all"
                                >
                                    <Search size={18} />
                                    Consultar SRI
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-muted">Ingrese los 13 dígitos sin guiones.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Razón Social */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="company_name">
                                    Razón Social <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="company_name"
                                    name="company_name"
                                    value={data.companyName || ''}
                                    onChange={(e) => updateData({ companyName: e.target.value })}
                                    className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-input-dark px-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm h-11 transition-all"
                                    placeholder="Ej. Corporación Favorita C.A."
                                />
                            </div>

                            {/* Admin Email */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="admin_email">
                                    Email del Administrador <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="admin_email"
                                    name="admin_email"
                                    value={data.adminEmail || ''}
                                    onChange={(e) => updateData({ adminEmail: e.target.value })}
                                    className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-input-dark px-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm h-11 transition-all"
                                    placeholder="admin@empresa.com"
                                    required
                                />
                            </div>

                            {/* Sector */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="sector">
                                    Sector Industrial <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="sector"
                                        name="sector"
                                        value={data.sector || ''}
                                        onChange={(e) => updateData({ sector: e.target.value })}
                                        className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-input-dark px-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm h-11 appearance-none transition-all"
                                    >
                                        <option value="" disabled>Seleccione una opción</option>
                                        <option value="fintech">Financiero / Fintech</option>
                                        <option value="retail">Retail & Comercio</option>
                                        <option value="health">Salud & Farma</option>
                                        <option value="gov">Gobierno</option>
                                        <option value="other">Otro</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legal Representative */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="legal_rep">
                                Representante Legal
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User className="text-slate-400" size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="legal_rep"
                                    name="legal_rep"
                                    className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-input-dark pl-10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm h-11 transition-all"
                                    placeholder="Nombre completo del representante"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="address">
                                Dirección Matriz
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MapPin className="text-slate-400" size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-input-dark pl-10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm h-11 transition-all"
                                    placeholder="Av. Amazonas y Naciones Unidas..."
                                />
                            </div>
                        </div>

                    </div>

                    {/* Form Footer */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-border-dark flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Cancelar
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

                {/* Bottom help text */}
                <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
                    <p>Al continuar, acepta nuestros <a href="#" className="underline hover:text-primary">Términos de Servicio</a> y <a href="#" className="underline hover:text-primary">Política de Privacidad</a>.</p>
                </div>
            </div>
        </div>
    );
};
