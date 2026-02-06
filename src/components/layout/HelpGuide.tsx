"use client";

import React, { useState } from 'react';
import { HelpCircle, X, CheckCircle2, ChevronRight } from 'lucide-react';
import { ViewState } from '@/types';

interface HelpGuideProps {
    view: ViewState;
}

const GUIDE_CONTENT: Record<string, { title: string, description: string, bullets: string[], color: string }> = {
    [ViewState.DASHBOARD_HOME]: {
        title: "¡Bienvenido! 👋",
        description: "Aquí te cuento cómo va todo. Es tu panel para ver si tu empresa está protegida y si hay algo importante que debas revisar hoy.",
        bullets: [
            "Mira si estás cumpliendo la ley.",
            "Entérate de cualquier alerta rápida.",
            "Vigila tus números más importantes."
        ],
        color: "brand"
    },
    [ViewState.DASHBOARD_RAT]: {
        title: "Tu Historial Seguro 📖",
        description: "Esto es como una caja fuerte: aquí se anota cada movimiento de datos. Si alguien pregunta, aquí tienes la prueba de que todo está en orden.",
        bullets: [
            "Nada de lo que ves aquí se puede borrar.",
            "Es tu seguro ante auditorías.",
            "Busca cualquier detalle en segundos."
        ],
        color: "brand"
    },
    [ViewState.DASHBOARD_BIOMETRICS]: {
        title: "Control de Seguridad 🛡️",
        description: "Tú tienes el mando. Eliges si la IA debe ser muy estricta para atrapar videos falsos (Deepfakes) antes de que alguien firme.",
        bullets: [
            "Sube o baja la 'fuerza' del escudo.",
            "Mira cómo atrapamos identidades falsas.",
            "Tú decides cuánto riesgo quieres correr."
        ],
        color: "accent"
    },
    [ViewState.DASHBOARD_ARCO]: {
        title: "Tranquilidad con Clientes 🤝",
        description: "Si un cliente quiere ver o borrar sus datos, hazlo aquí. Te avisamos de los días que te quedan para que no tengas problemas legales.",
        bullets: [
            "Responde a tus clientes a tiempo.",
            "Olvídate de las hojas de Excel.",
            "Guarda evidencia de cada respuesta."
        ],
        color: "blue-500"
    },
    [ViewState.DASHBOARD_SIGNATURE]: {
        title: "Firmas sin Estrés ✍️",
        description: "Firma todo digitalmente. Es legal y seguro porque nos aseguramos de que quien firma sea realmente tu cliente por su cara.",
        bullets: [
            "No más papeles ni carpetas físicas.",
            "Vínculo legal por biometría.",
            "Mira quién falta por firmar hoy."
        ],
        color: "brand"
    },
    [ViewState.DASHBOARD_REPORTS]: {
        title: "Tus Reportes Listos 📜",
        description: "Bájate informes para demostrar que cumples al 100%. Es la forma más fácil de decir: 'Hacemos las cosas bien'.",
        bullets: [
            "Descarga tus reportes en un clic.",
            "Listos para cualquier inspección.",
            "Todo organizado por mes."
        ],
        color: "brand"
    },
    [ViewState.DASHBOARD_SETTINGS]: {
        title: "Configura tu Casa ⚙️",
        description: "Este es el lugar para invitar a tu equipo, poner tu logo y tus colores. Haz que ENEXT se sienta parte de tu empresa.",
        bullets: [
            "Crea accesos para tus empleados.",
            "Personaliza con tu logo y marca.",
            "Maneja tus llaves de seguridad."
        ],
        color: "slate-500"
    }
};

export const HelpGuide: React.FC<HelpGuideProps> = ({ view }) => {
    const [isOpen, setIsOpen] = useState(false);
    const content = GUIDE_CONTENT[view];

    if (!content) return null;

    return (
        <div className="relative inline-block ml-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-400 hover:text-brand transition-all p-1.5 rounded-full hover:bg-brand/10 group flex items-center justify-center border border-transparent hover:border-brand/20"
                title="¿Para qué sirve esta parte?"
            >
                <HelpCircle size={16} className="group-hover:rotate-12 transition-transform" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[9999] grid place-items-center p-6 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
                    <div
                        className="fixed inset-0 cursor-pointer pointer-events-auto"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-[280px] bg-white dark:bg-surface-dark p-6 rounded-[1.25rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 pointer-events-auto animate-fade-in-up">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-${content.color}/10 flex items-center justify-center text-${content.color}`}>
                                <CheckCircle2 size={24} />
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-full transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{content.title}</h4>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                            {content.description}
                        </p>

                        <div className="space-y-3 mb-6 border-t border-slate-100 dark:border-white/5 pt-4">
                            {content.bullets.map((bullet, i) => (
                                <div key={i} className="flex gap-2.5 items-start">
                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-brand shrink-0"></div>
                                    <span className="text-[11px] text-slate-600 dark:text-slate-200 font-bold leading-tight">{bullet}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2.5 bg-brand hover:bg-brand-hover text-white rounded-xl text-[12px] font-black transition-all flex items-center justify-center gap-2 group shadow-lg shadow-brand/20"
                        >
                            ¡Entendido! <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
