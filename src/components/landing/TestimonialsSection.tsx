"use client";

import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-16 bg-surface-dark/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">La confianza se construye con hechos</h2>
                    <p className="text-slate-400">Líderes de la industria que duermen tranquilos gracias a Enext.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 relative">
                        <Quote size={40} className="text-white/5 absolute top-6 right-6" />
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            "Redujimos el fraude de identidad a cero en nuestro producto de crédito digital. La integración tomó menos de una semana."
                        </p>
                        <div>
                            <h4 className="text-white font-bold">Carlos Andrade</h4>
                            <p className="text-sm text-slate-500 mb-4">CTO, Banco Andino</p>
                            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase rounded border border-accent/20">
                                Cero Fraudes
                            </span>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 relative">
                        <Quote size={40} className="text-white/5 absolute top-6 right-6" />
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            "Lo que más nos impresionó fue la UX. Nuestros clientes completan el onboarding en minutos sin fricción ni rechazos falsos."
                        </p>
                        <div>
                            <h4 className="text-white font-bold">María Paz</h4>
                            <p className="text-sm text-slate-500 mb-4">Gerente de Innovación, Seguros EQ</p>
                            <span className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-bold uppercase rounded border border-brand/20">
                                UX Sin Fricción
                            </span>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 relative">
                        <Quote size={40} className="text-white/5 absolute top-6 right-6" />
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            "Enext nos vendió tranquilidad. Saber que cumplimos la LOPDP automáticamente nos permite enfocarnos en crecer."
                        </p>
                        <div>
                            <h4 className="text-white font-bold">Roberto Silva</h4>
                            <p className="text-sm text-slate-500 mb-4">CEO, FinTech Ec</p>
                            <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase rounded border border-orange-500/20">
                                Compliance Automático
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
