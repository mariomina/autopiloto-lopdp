"use client";

import React, { useState } from 'react';
import { ViewState } from '@/types';
import { LegalStep } from './LegalStep';
import { ModulesStep } from './ModulesStep';
import { BrandingStep } from './BrandingStep';
import {
    Shield,
    CircleHelp,
    Building2,
    Check,
    Puzzle,
    Palette
} from 'lucide-react';

interface RegisterContainerProps {
    setView: (view: ViewState) => void;
}

export const RegisterContainer: React.FC<RegisterContainerProps> = ({ setView }) => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        ruc: '',
        companyName: '',
        sector: '',
        adminEmail: '',
        modules: {
            rat: true,
            biometrics: false,
            signature: false,
            arco: false
        },
        portalName: 'Portal de Cumplimiento Corporativo',
        primaryColor: '#1152d4',
        logoUrl: ''
    });

    const updateData = (fields: any) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);
    const handleCancel = () => setView(ViewState.LOGIN);

    const handleFinish = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    legal: {
                        ruc: formData.ruc,
                        companyName: formData.companyName,
                        sector: formData.sector,
                        adminEmail: formData.adminEmail
                    },
                    modules: formData.modules,
                    branding: {
                        portalName: formData.portalName,
                        primaryColor: formData.primaryColor,
                        logoUrl: formData.logoUrl
                    }
                })
            });

            const contentType = response.headers.get("content-type");
            let result;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                const text = await response.text();
                console.error("Non-JSON response received:", text);
                throw new Error("El servidor devolvió un error inesperado (HTML). Revisa la consola del servidor.");
            }

            if (!response.ok) {
                throw new Error(result.error || 'Algo salió mal al registrar la empresa.');
            }

            // Success: Move to Dashboard
            setView(ViewState.DASHBOARD_HOME);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-slate-100 font-sans selection:bg-primary/30">
            {/* Top Navigation - Exact Match */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="flex h-16 items-center justify-between px-6 lg:px-12">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                            <Shield className="text-xl" size={20} />
                        </div>
                        <h1 className="text-sm font-semibold tracking-tight lg:text-base dark:text-white">ENEXT Compliance Orchestrator</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                            <CircleHelp className="text-lg" size={18} />
                            <span className="hidden sm:inline">Centro de Ayuda</span>
                        </button>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                        <div className="flex items-center gap-2">
                            {/* Avatar - Using a div with bg-image to match HTML structure */}
                            <div
                                className="h-8 w-8 rounded-full bg-cover bg-center ring-2 ring-slate-100 dark:ring-slate-800"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcI0nZsDMfhZuhhVNtDrnHJHIa0PPnA77voJEnuv1U-TfM6_5UWjzdURMyEqKd9XIKY8GyGRlHtcqU6VrBzf5OydnXUFmDRoKAtbC5Pil84eSxKgkWQyoXnpKc2CG-glRrlPhPdFWhmFb_FlU3GKt14KdCC_eGMeldh_yLqRjztWA-4W3_qRI1GELgHKohCxFiSNVLUiHVs-_MFZGO6hrNMHJvgKICaZwWzIowPo8ddUlaldNuXTRtgKjDvB2cBwkTz_TMaxOjwPc')" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start pt-10 pb-20 px-4 md:px-8">
                <div className="w-full max-w-4xl flex flex-col gap-10">

                    {/* Stepper - Exact Match Logic */}
                    <nav aria-label="Progress">
                        <ol className="flex items-center w-full" role="list">

                            {/* Step 1: Datos Legales */}
                            <li className="relative flex-1 pr-8 sm:pr-20">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className={`h-0.5 w-full ${step >= 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-border-dark'}`}></div>
                                </div>
                                <a
                                    href="#"
                                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-background-light dark:ring-background-dark ${step === 1
                                        ? 'bg-primary hover:bg-primary/90'
                                        : step > 1
                                            ? 'bg-primary'
                                            : 'bg-white dark:bg-card-dark border-2 border-slate-300 dark:border-border-dark'
                                        }`}
                                    onClick={(e) => { e.preventDefault(); if (step > 1) setStep(1); }}
                                >
                                    {step > 1 ? (
                                        <Check className="text-white" size={16} />
                                    ) : (
                                        <Building2 className={`${step === 1 ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} size={16} />
                                    )}
                                </a>
                                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap ${step >= 1 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                                    Datos Legales
                                </span>
                            </li>

                            {/* Step 2: Módulos */}
                            <li className="relative flex-1 px-8 sm:px-20">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className={`h-0.5 w-full ${step >= 2 ? 'bg-slate-200 dark:bg-border-dark' : 'bg-slate-200 dark:bg-border-dark'}`}>
                                        {/* Progressive fill for current step if needed, simplified here to state logic */}
                                        <div className={`h-full bg-primary transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-background-light dark:ring-background-dark ${step === 2
                                        ? 'bg-primary shadow-lg shadow-primary/20'
                                        : step > 2
                                            ? 'bg-primary'
                                            : 'bg-white dark:bg-card-dark border-2 border-slate-300 dark:border-border-dark hover:border-slate-400'
                                        }`}
                                    onClick={(e) => { e.preventDefault(); if (step > 2) setStep(2); }}
                                >
                                    {step > 2 ? (
                                        <Check className="text-white" size={16} />
                                    ) : (
                                        <Puzzle className={`${step === 2 || step > 2 ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} size={16} />
                                    )}
                                </a>
                                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap ${step >= 2 ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                                    Módulos
                                </span>
                            </li>

                            {/* Step 3: Branding */}
                            <li className="relative flex-1 pl-8 sm:pl-20">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className={`h-0.5 w-full ${step >= 3 ? 'bg-primary' : 'bg-slate-200 dark:bg-border-dark'}`}>
                                        <div className={`h-full bg-primary transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-background-light dark:ring-background-dark ${step === 3
                                        ? 'bg-primary shadow-lg shadow-primary/25'
                                        : 'bg-white dark:bg-card-dark border-2 border-slate-300 dark:border-border-dark hover:border-slate-400'
                                        }`}
                                >
                                    <Palette className={`${step === 3 ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} size={16} />
                                </a>
                                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap ${step === 3 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                                    Branding
                                </span>
                            </li>
                        </ol>
                    </nav>

                    {/* Error Message Display */}
                    {error && (
                        <div className="mx-auto w-full max-w-4xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-3 animate-shake">
                            <CircleHelp size={20} />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    {/* Content Container */}
                    <div className={`w-full ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                        {step === 1 && <LegalStep onNext={handleNext} onCancel={handleCancel} data={formData} updateData={updateData} />}
                        {step === 2 && <ModulesStep onNext={handleNext} onBack={handleBack} data={formData} updateData={updateData} />}
                        {step === 3 && <BrandingStep onFinish={handleFinish} onBack={handleBack} data={formData} updateData={updateData} isLoading={isLoading} />}
                    </div>

                </div>
            </main>
        </div>
    );
};
