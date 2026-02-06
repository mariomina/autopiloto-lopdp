"use client";

import React from 'react';
import { Check, X, ArrowRight, AlertTriangle } from 'lucide-react';

export const ComparisonTableSection: React.FC = () => {
    return (
        <section className="py-16 bg-background relative" id="comparacion">
            <div className="container mx-auto px-6">
                {/* Headline */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        ENEXT vs <span className="text-slate-500">Proceso Manual</span> vs <span className="text-slate-500">Competencia</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Compara y descubre por qué somos la opción #1 en Ecuador
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="max-w-6xl mx-auto overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-6 px-6 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                                    Característica
                                </th>
                                <th className="text-center py-6 px-6 text-slate-500 font-semibold text-sm">
                                    Proceso Manual
                                </th>
                                <th className="text-center py-6 px-6 text-slate-500 font-semibold text-sm">
                                    Competencia A
                                </th>
                                <th className="text-center py-6 px-6 bg-accent/5 rounded-t-2xl">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
                                        <span className="text-midnight font-bold text-sm">ENEXT</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1: Tiempo Onboarding */}
                            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 px-6 text-white font-semibold">
                                    Tiempo de Onboarding
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">3 días</div>
                                    <X className="text-red-500 mx-auto mt-2" size={20} />
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">1 día</div>
                                    <div className="flex justify-center mt-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <AlertTriangle className="text-yellow-500" size={16} />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6 text-center bg-accent/5">
                                    <div className="text-accent font-bold">3 minutos</div>
                                    <Check className="text-accent mx-auto mt-2" size={20} />
                                </td>
                            </tr>

                            {/* Row 2: Costo Mensual */}
                            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 px-6 text-white font-semibold">
                                    Costo Mensual
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">$5,000+</div>
                                    <X className="text-red-500 mx-auto mt-2" size={20} />
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">$3,000</div>
                                    <div className="flex justify-center mt-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <AlertTriangle className="text-yellow-500" size={16} />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6 text-center bg-accent/5">
                                    <div className="text-accent font-bold">Desde $1,200</div>
                                    <Check className="text-accent mx-auto mt-2" size={20} />
                                </td>
                            </tr>

                            {/* Row 3: Cumplimiento LOPDP */}
                            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 px-6 text-white font-semibold">
                                    Cumplimiento LOPDP
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">Manual</div>
                                    <X className="text-red-500 mx-auto mt-2" size={20} />
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">Parcial</div>
                                    <div className="flex justify-center mt-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <AlertTriangle className="text-yellow-500" size={16} />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6 text-center bg-accent/5">
                                    <div className="text-accent font-bold">100% Automático</div>
                                    <Check className="text-accent mx-auto mt-2" size={20} />
                                </td>
                            </tr>

                            {/* Row 4: Detección de Fraude */}
                            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 px-6 text-white font-semibold">
                                    Detección de Fraude
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">60%</div>
                                    <X className="text-red-500 mx-auto mt-2" size={20} />
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">85%</div>
                                    <div className="flex justify-center mt-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <AlertTriangle className="text-yellow-500" size={16} />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6 text-center bg-accent/5">
                                    <div className="text-accent font-bold">99.8%</div>
                                    <Check className="text-accent mx-auto mt-2" size={20} />
                                </td>
                            </tr>

                            {/* Row 5: Soporte */}
                            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 px-6 text-white font-semibold">
                                    Soporte
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">Email</div>
                                    <X className="text-red-500 mx-auto mt-2" size={20} />
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">Chat</div>
                                    <div className="flex justify-center mt-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <AlertTriangle className="text-yellow-500" size={16} />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6 text-center bg-accent/5">
                                    <div className="text-accent font-bold">24/7 en Español</div>
                                    <Check className="text-accent mx-auto mt-2" size={20} />
                                </td>
                            </tr>

                            {/* Row 6: Tiempo de Integración */}
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 px-6 text-white font-semibold rounded-bl-2xl">
                                    Tiempo de Integración
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">2 semanas</div>
                                    <X className="text-red-500 mx-auto mt-2" size={20} />
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="text-slate-400">1 semana</div>
                                    <div className="flex justify-center mt-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <AlertTriangle className="text-yellow-500" size={16} />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6 text-center bg-accent/5 rounded-br-2xl">
                                    <div className="text-accent font-bold">48 horas</div>
                                    <Check className="text-accent mx-auto mt-2" size={20} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    );
};
