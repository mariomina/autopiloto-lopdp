"use client";

import React from 'react';
import { ViewState } from '@/types';
import { ArrowRight, Fingerprint, ShieldCheck, Cloud, Lock, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
    setView: (view: ViewState) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setView }) => {
    return (
        <>
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 transition-colors duration-300">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-lg text-midnight shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                            <Fingerprint size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">ENEXT</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a>
                        <a href="#como-funciona" className="hover:text-white transition-colors">Cómo Funciona</a>
                        <a href="#calculadora" className="hover:text-white transition-colors">ROI Calculator</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setView(ViewState.LOGIN)} className="text-sm font-semibold text-white hover:text-accent transition-colors">
                            Login
                        </button>
                        <button
                            onClick={() => setView(ViewState.REGISTER)}
                            className="bg-accent hover:bg-accent-hover text-midnight text-sm font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]"
                        >
                            Auditoría Gratis <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Content */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    {/* Badge de Credibilidad */}
                    <div className="flex justify-center mb-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-accent/10 border border-accent/20 rounded-full">
                            <CheckCircle2 className="text-accent" size={18} />
                            <span className="text-sm font-bold text-white">Certificado LOPDP</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-300">500+ Empresas Protegidas</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-300">99.8% Precisión</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Cumplimiento LOPDP Automático
                        <br />
                        <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">
                            para Empresas Ecuatorianas
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Evita multas de hasta <span className="text-accent font-bold">$50,000</span> y bloquea fraude sintético con IA.
                        <br />
                        <span className="text-slate-400">Sin abogados, sin papeleos, sin dolores de cabeza.</span>
                    </p>

                    {/* Dual CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <button
                            onClick={() => setView(ViewState.REGISTER)}
                            className="bg-accent hover:bg-accent-hover text-midnight font-bold px-10 py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] text-lg group"
                        >
                            Auditoría Gratis en 48 Horas
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => setView(ViewState.REGISTER)}
                            className="bg-white/5 border-2 border-white/20 hover:border-accent/50 hover:bg-white/10 text-white font-semibold px-10 py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            Ver Demo de 2 Minutos
                        </button>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-accent" size={16} />
                            <span>Sin tarjeta de crédito</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-accent" size={16} />
                            <span>Setup en 5 minutos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-accent" size={16} />
                            <span>Soporte 24/7 en español</span>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-surface-dark/50 border border-white/10 rounded-2xl backdrop-blur-sm">
                            <div className="text-4xl font-black text-accent mb-2">$50K</div>
                            <div className="text-slate-400 text-sm">Multas LOPDP evitadas</div>
                        </div>
                        <div className="text-center p-6 bg-surface-dark/50 border border-white/10 rounded-2xl backdrop-blur-sm">
                            <div className="text-4xl font-black text-accent mb-2">99.8%</div>
                            <div className="text-slate-400 text-sm">Fraude bloqueado</div>
                        </div>
                        <div className="text-center p-6 bg-surface-dark/50 border border-white/10 rounded-2xl backdrop-blur-sm">
                            <div className="text-4xl font-black text-accent mb-2">3 min</div>
                            <div className="text-slate-400 text-sm">Onboarding completo</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
