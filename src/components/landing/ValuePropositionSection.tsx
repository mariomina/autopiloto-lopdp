"use client";

import React from 'react';
import { ShieldAlert, TrendingDown, AlertTriangle, CheckCircle2, X, TrendingUp } from 'lucide-react';

export const ValuePropositionSection: React.FC = () => {
    return (
        <section className="py-16 bg-midnight relative overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Overline */}
                <div className="text-center mb-4">
                    <span className="text-accent text-sm font-bold uppercase tracking-wider">La Única Plataforma Todo-en-Uno</span>
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                    3 Problemas Críticos, <span className="text-accent">1 Solución Completa</span>
                </h2>

                <p className="text-center text-slate-400 text-lg max-w-2xl mx-auto mb-16">
                    Mientras otras soluciones solo cubren una pieza del rompecabezas, ENEXT lo resuelve todo.
                </p>

                {/* 3 Columnas - Problema → Solución → Resultado */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Columna 1: Multas LOPDP */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group">
                        {/* Problema */}
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                                <ShieldAlert size={24} />
                            </div>
                            <div className="flex items-start gap-2 mb-3">
                                <X className="text-red-400 shrink-0 mt-1" size={18} />
                                <div>
                                    <h4 className="text-white font-bold mb-2">Problema</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Multas LOPDP de hasta <span className="text-red-400 font-bold">$50K</span> pueden quebrar tu empresa
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Solución */}
                        <div className="mb-6 pb-6 border-b border-white/5">
                            <div className="flex items-start gap-2 mb-3">
                                <CheckCircle2 className="text-accent shrink-0 mt-1" size={18} />
                                <div>
                                    <h4 className="text-white font-bold mb-2">Solución</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Auditoría automática 24/7 detecta incumplimientos <span className="text-accent font-semibold">antes</span> de inspección
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Resultado */}
                        <div className="flex items-start gap-2">
                            <TrendingUp className="text-green-400 shrink-0 mt-1" size={18} />
                            <div>
                                <h4 className="text-white font-bold mb-2">Resultado</h4>
                                <p className="text-green-400 text-sm font-semibold">
                                    Cero multas en 500+ clientes desde 2023
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Columna 2: Fraude Sintético */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group">
                        {/* Problema */}
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="flex items-start gap-2 mb-3">
                                <X className="text-red-400 shrink-0 mt-1" size={18} />
                                <div>
                                    <h4 className="text-white font-bold mb-2">Problema</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Fraude sintético te cuesta <span className="text-red-400 font-bold">$120K/año</span> en pérdidas
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Solución */}
                        <div className="mb-6 pb-6 border-b border-white/5">
                            <div className="flex items-start gap-2 mb-3">
                                <CheckCircle2 className="text-accent shrink-0 mt-1" size={18} />
                                <div>
                                    <h4 className="text-white font-bold mb-2">Solución</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        IA detecta deepfakes en <span className="text-accent font-semibold">3 segundos</span> con 99.8% precisión
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Resultado */}
                        <div className="flex items-start gap-2">
                            <TrendingUp className="text-green-400 shrink-0 mt-1" size={18} />
                            <div>
                                <h4 className="text-white font-bold mb-2">Resultado</h4>
                                <p className="text-green-400 text-sm font-semibold">
                                    Bloquea 99.8% de intentos de fraude
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Columna 3: Onboarding Lento */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group">
                        {/* Problema */}
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                                <TrendingDown size={24} />
                            </div>
                            <div className="flex items-start gap-2 mb-3">
                                <X className="text-red-400 shrink-0 mt-1" size={18} />
                                <div>
                                    <h4 className="text-white font-bold mb-2">Problema</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Onboarding manual toma <span className="text-red-400 font-bold">3 días</span> y pierde 40% de clientes
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Solución */}
                        <div className="mb-6 pb-6 border-b border-white/5">
                            <div className="flex items-start gap-2 mb-3">
                                <CheckCircle2 className="text-accent shrink-0 mt-1" size={18} />
                                <div>
                                    <h4 className="text-white font-bold mb-2">Solución</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Firma electrónica legal en <span className="text-accent font-semibold">3 minutos</span> desde cualquier dispositivo
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Resultado */}
                        <div className="flex items-start gap-2">
                            <TrendingUp className="text-green-400 shrink-0 mt-1" size={18} />
                            <div>
                                <h4 className="text-white font-bold mb-2">Resultado</h4>
                                <p className="text-green-400 text-sm font-semibold">
                                    95% menos tiempo, 60% más conversión
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
