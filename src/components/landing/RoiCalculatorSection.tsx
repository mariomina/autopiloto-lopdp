"use client";

import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { ViewState } from '@/types';

interface RoiCalculatorSectionProps {
    setView: (view: ViewState) => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({ setView }) => {
    const [clientsPerMonth, setClientsPerMonth] = useState<number>(100);
    const [hoursPerClient, setHoursPerClient] = useState<number>(24); // 3 días = 24 horas
    const [costPerHour, setCostPerHour] = useState<number>(15);

    // Cálculos
    const currentMonthlyCost = clientsPerMonth * hoursPerClient * costPerHour;
    const newTimePerClient = 0.05; // 3 minutos = 0.05 horas
    const newMonthlyCost = clientsPerMonth * newTimePerClient * costPerHour;
    const monthlySavings = currentMonthlyCost - newMonthlyCost;
    const annualSavings = monthlySavings * 12;
    const timeRecovered = clientsPerMonth * (hoursPerClient - newTimePerClient);
    const roi = ((annualSavings / (1200 * 12)) * 100).toFixed(0); // Asumiendo $1,200/mes de costo

    return (
        <section className="py-16 bg-midnight relative overflow-hidden" id="calculadora">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Headline */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                        <Calculator className="text-accent" size={18} />
                        <span className="text-accent text-sm font-bold">Calculadora Interactiva</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Calcula Tu <span className="text-accent">ROI en 30 Segundos</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Descubre cuánto dinero y tiempo ahorrarías con ENEXT
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Inputs */}
                        <div className="bg-surface-dark p-8 rounded-2xl border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-8">Datos de Tu Operación</h3>

                            <div className="space-y-6">
                                {/* Input 1 */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        ¿Cuántos clientes onboardeas al mes?
                                    </label>
                                    <input
                                        type="number"
                                        value={clientsPerMonth}
                                        onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white text-lg font-bold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                        min="1"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Número promedio mensual</p>
                                </div>

                                {/* Input 2 */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        ¿Cuántas horas toma tu proceso actual?
                                    </label>
                                    <input
                                        type="number"
                                        value={hoursPerClient}
                                        onChange={(e) => setHoursPerClient(Number(e.target.value))}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white text-lg font-bold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                        min="0.1"
                                        step="0.5"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Horas por cliente (3 días = 24 horas)</p>
                                </div>

                                {/* Input 3 */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        ¿Cuál es tu costo por hora de operación?
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                                        <input
                                            type="number"
                                            value={costPerHour}
                                            onChange={(e) => setCostPerHour(Number(e.target.value))}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-8 pr-4 text-white text-lg font-bold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                            min="1"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Costo promedio por hora de trabajo</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Results */}
                        <div className="space-y-6">
                            {/* Result Card 1 */}
                            <div className="bg-gradient-to-br from-accent/20 to-orange-500/20 p-8 rounded-2xl border border-accent/30 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                            <DollarSign className="text-accent" size={24} />
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">Ahorro Mensual</h4>
                                    </div>
                                    <div className="text-5xl font-black text-accent mb-2">
                                        ${monthlySavings.toLocaleString()}
                                    </div>
                                    <p className="text-slate-300 text-sm">
                                        ${annualSavings.toLocaleString()}/año ahorrados
                                    </p>
                                </div>
                            </div>

                            {/* Result Card 2 */}
                            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <Clock className="text-accent" size={20} />
                                    </div>
                                    <h4 className="text-base font-semibold text-white">Tiempo Recuperado</h4>
                                </div>
                                <div className="text-3xl font-black text-white mb-1">
                                    {timeRecovered.toFixed(0)} horas/mes
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Equivalente a {(timeRecovered / 160).toFixed(1)} empleados full-time
                                </p>
                            </div>

                            {/* Result Card 3 */}
                            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <TrendingUp className="text-accent" size={20} />
                                    </div>
                                    <h4 className="text-base font-semibold text-white">ROI Anual</h4>
                                </div>
                                <div className="text-3xl font-black text-accent mb-1">
                                    {roi}%
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Retorno sobre inversión en el primer año
                                </p>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => setView(ViewState.REGISTER)}
                                className="w-full bg-accent hover:bg-accent-hover text-midnight font-bold py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] text-lg"
                            >
                                Solicitar Análisis Personalizado →
                            </button>
                        </div>
                    </div>

                    {/* Bottom Note */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-500 text-sm">
                            * Cálculos basados en promedios de 500+ clientes. Resultados reales pueden variar.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
