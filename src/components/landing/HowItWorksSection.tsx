"use client";

import React from 'react';
import { Smartphone, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="py-16 bg-midnight relative overflow-hidden" id="como-funciona">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-accent text-lg font-bold uppercase tracking-wider mb-4 block">
                        Proceso Simple
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Cumplimiento LOPDP en <span className="text-accent">3 Pasos</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Desde la integración hasta la auditoría continua, todo automatizado
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-white/10 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {/* Step 1: Integración */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-14 h-14 rounded-full bg-surface-dark border-2 border-accent flex items-center justify-center relative z-10">
                                    <Smartphone size={24} className="text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-midnight text-xs font-bold border-2 border-midnight">01</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Integra en 48 Horas</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-4">
                                Conecta nuestra API REST o usa nuestros SDKs para iOS, Android y Web. Sin código complejo.
                            </p>
                            <div className="flex items-center gap-2 text-accent text-xs font-semibold">
                                <CheckCircle2 size={14} />
                                <span>Setup guiado incluido</span>
                            </div>
                        </div>

                        {/* Step 2: Automatización */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-14 h-14 rounded-full bg-surface-dark border-2 border-accent flex items-center justify-center relative z-10">
                                    <Eye size={24} className="text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-midnight text-xs font-bold border-2 border-midnight">02</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Auditoría Automática 24/7</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-4">
                                Cada acción se registra, audita y verifica automáticamente contra normativa LOPDP en tiempo real.
                            </p>
                            <div className="flex items-center gap-2 text-accent text-xs font-semibold">
                                <CheckCircle2 size={14} />
                                <span>Cero configuración manual</span>
                            </div>
                        </div>

                        {/* Step 3: Certificación */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-14 h-14 rounded-full bg-surface-dark border-2 border-accent flex items-center justify-center relative z-10">
                                    <FileText size={24} className="text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-midnight text-xs font-bold border-2 border-midnight">03</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Certificados Instantáneos</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-4">
                                Genera reportes de cumplimiento y certificados legales con un clic. Listos para auditorías.
                            </p>
                            <div className="flex items-center gap-2 text-accent text-xs font-semibold">
                                <CheckCircle2 size={14} />
                                <span>Validez legal garantizada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
