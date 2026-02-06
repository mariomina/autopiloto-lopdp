"use client";

import React from 'react';
import { ViewState } from '@/types';
import { ArrowRight, CheckCircle2, Clock, Shield, Headphones } from 'lucide-react';

interface CtaSectionProps {
    setView: (view: ViewState) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ setView }) => {
    return (
        <section className="relative py-20 bg-midnight overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-accent/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-accent text-sm font-bold">Oferta Limitada</span>
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                    Únete a 500+ Empresas que <br />
                    <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">
                        Ya Duermen Tranquilas
                    </span>
                </h2>

                {/* Subheadline */}
                <p className="text-slate-300 text-xl max-w-3xl mx-auto mb-4">
                    Auditoría LOPDP <span className="text-accent font-bold">gratuita</span> de tu proceso actual.
                </p>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
                    Sin compromiso, sin tarjeta de crédito, sin letra pequeña.
                </p>

                {/* Dual CTA */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                    <button
                        onClick={() => setView(ViewState.REGISTER)}
                        className="bg-accent hover:bg-accent-hover text-midnight text-xl font-bold px-12 py-6 rounded-xl transition-all shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] flex items-center justify-center gap-3 group"
                    >
                        Solicitar Auditoría Gratis
                        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => setView(ViewState.REGISTER)}
                        className="bg-transparent border-2 border-white/20 hover:bg-white/5 hover:border-accent/50 text-white text-xl font-semibold px-12 py-6 rounded-xl transition-all flex items-center justify-center gap-3"
                    >
                        Hablar con Experto
                        <span className="text-sm text-slate-400">(15 min)</span>
                    </button>
                </div>

                {/* Trust Signals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                    <div className="flex flex-col items-center gap-3 p-6 bg-surface-dark/50 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <Clock className="text-accent" size={24} />
                        </div>
                        <div className="text-center">
                            <div className="text-white font-bold mb-1">Setup en 5 minutos</div>
                            <div className="text-slate-500 text-xs">Sin código requerido</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-6 bg-surface-dark/50 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <Headphones className="text-accent" size={24} />
                        </div>
                        <div className="text-center">
                            <div className="text-white font-bold mb-1">Soporte 24/7</div>
                            <div className="text-slate-500 text-xs">En español</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-6 bg-surface-dark/50 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <Shield className="text-accent" size={24} />
                        </div>
                        <div className="text-center">
                            <div className="text-white font-bold mb-1">Garantía 30 días</div>
                            <div className="text-slate-500 text-xs">Satisfacción total</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-6 bg-surface-dark/50 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <CheckCircle2 className="text-accent" size={24} />
                        </div>
                        <div className="text-center">
                            <div className="text-white font-bold mb-1">Certificado LOPDP</div>
                            <div className="text-slate-500 text-xs">Incluido gratis</div>
                        </div>
                    </div>
                </div>

                {/* Urgencia Controlada */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full">
                    <span className="text-red-400 text-sm">⏰</span>
                    <span className="text-red-300 text-sm font-semibold">
                        Solo 5 auditorías gratuitas disponibles este mes
                    </span>
                </div>
            </div>
        </section>
    );
};
