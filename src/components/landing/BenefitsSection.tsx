"use client";

import React from 'react';
import {
    Clock, DollarSign, Shield, Zap, TrendingUp, Globe,
    CheckCircle2, FileText, Ban, Banknote, Lock, Smartphone,
    Target, Sparkles, User, BookOpen
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
    return (
        <section className="py-16 bg-background relative overflow-hidden" id="beneficios">
            {/* Fondo Decorativo Animado */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Headline */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-accent text-sm font-bold uppercase tracking-wider mb-4 block">Beneficios Reales</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Por Qué las Empresas Líderes <span className="text-accent">Eligen ENEXT</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        No vendemos características técnicas. Vendemos resultados medibles para tu negocio.
                    </p>
                </div>

                {/* Grid 2x3 - Beneficios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    {/* Beneficio 1: Ahorra Tiempo */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)]">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-accent transition-colors">Ahorra Tiempo</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Clock size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    De <span className="line-through text-slate-500 mx-1">3 días</span> → <span className="text-white font-bold bg-accent/20 px-2 py-0.5 rounded">3 minutos</span> de onboarding
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <DollarSign size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Ahorra <span className="text-white font-bold">160 horas/mes</span> de trabajo manual
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <TrendingUp size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    ROI positivo en el <span className="text-white font-bold">primer mes</span>
                                </span>
                            </li>
                        </ul>
                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">95%</div>
                                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mt-1">Reducción de tiempo</div>
                            </div>
                            <TrendingUp size={24} className="text-slate-600 group-hover:text-accent transition-colors mb-2" />
                        </div>
                    </div>

                    {/* Beneficio 2: Reduce Riesgo Legal */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)]">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-accent transition-colors">Reduce Riesgo Legal</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Shield size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    <span className="text-white font-bold bg-accent/20 px-2 py-0.5 rounded">Cero multas</span> LOPDP garantizado
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <FileText size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Auditoría <span className="text-white font-bold">continua automática</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Certificados legales <span className="text-white font-bold">instantáneos</span>
                                </span>
                            </li>
                        </ul>
                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">$50K</div>
                                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mt-1">Multas evitadas</div>
                            </div>
                            <Shield size={24} className="text-slate-600 group-hover:text-accent transition-colors mb-2" />
                        </div>
                    </div>

                    {/* Beneficio 3: Bloquea Fraude */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)]">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Lock size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-accent transition-colors">Bloquea Fraude</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Ban size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    <span className="text-white font-bold bg-accent/20 px-2 py-0.5 rounded">99.8%</span> de fraude sintético bloqueado
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Banknote size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Ahorra <span className="text-white font-bold">$120K/año</span> en pérdidas
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Shield size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Protección <span className="text-white font-bold">iBeta Nivel 2</span> certificada
                                </span>
                            </li>
                        </ul>
                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">99.8%</div>
                                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mt-1">Precisión</div>
                            </div>
                            <Lock size={24} className="text-slate-600 group-hover:text-accent transition-colors mb-2" />
                        </div>
                    </div>

                    {/* Beneficio 4: Escala Sin Fricción */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)]">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-accent transition-colors">Escala Sin Fricción</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Zap size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Procesa <span className="text-white font-bold bg-accent/20 px-2 py-0.5 rounded">10,000+</span> verificaciones/día
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Globe size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    API-first, integra en <span className="text-white font-bold">48 horas</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Smartphone size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Funciona en <span className="text-white font-bold">Web, iOS y Android</span>
                                </span>
                            </li>
                        </ul>
                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">48h</div>
                                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mt-1">Integración</div>
                            </div>
                            <Zap size={24} className="text-slate-600 group-hover:text-accent transition-colors mb-2" />
                        </div>
                    </div>

                    {/* Beneficio 5: Aumenta Conversión */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)]">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-accent transition-colors">Aumenta Conversión</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Target size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    <span className="text-white font-bold bg-accent/20 px-2 py-0.5 rounded">+60%</span> más clientes completados
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <TrendingUp size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Reduce abandono de <span className="line-through text-slate-500 mx-1">40%</span> → <span className="text-white font-bold">8%</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Sparkles size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    UX <span className="text-white font-bold">sin fricción</span> en móvil
                                </span>
                            </li>
                        </ul>
                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">+60%</div>
                                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mt-1">Conversión</div>
                            </div>
                            <Target size={24} className="text-slate-600 group-hover:text-accent transition-colors mb-2" />
                        </div>
                    </div>

                    {/* Beneficio 6: Soporte Premium */}
                    <div className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)]">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-accent transition-colors">Soporte Premium</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <Globe size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Soporte <span className="text-white font-bold bg-accent/20 px-2 py-0.5 rounded">24/7 en español</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <User size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Integración <span className="text-white font-bold">guiada gratuita</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 rounded bg-surface-light/10 text-accent mt-0.5">
                                    <BookOpen size={14} />
                                </div>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Documentación <span className="text-white font-bold">completa en español</span>
                                </span>
                            </li>
                        </ul>
                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">24/7</div>
                                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mt-1">Soporte real</div>
                            </div>
                            <Globe size={24} className="text-slate-600 group-hover:text-accent transition-colors mb-2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
