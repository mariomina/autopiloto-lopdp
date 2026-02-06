"use client";

import React from 'react';
import { ViewState } from '@/types';
import { Button } from '@/components/shared';
import { Fingerprint, Mail } from 'lucide-react';

interface LoginFormProps {
    setView: (view: ViewState) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setView }) => {
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setView(ViewState.DASHBOARD_HOME);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden p-4 transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand/10 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-surface-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                {/* Header */}
                <div className="p-8 pb-0 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand mb-6 shadow-[0_0_20px_rgba(94,72,232,0.4)]">
                        <span className="text-white font-bold text-xl">E</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Bienvenido a ENEXT</h2>
                    <p className="text-slate-400 text-sm">Gestión de identidad segura para empresas.</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase">Email Corporativo</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    placeholder="nombre@empresa.com"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button fullWidth type="submit" size="lg">Ingresar</Button>
                        </div>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-surface-dark px-2 text-slate-500">O ingresa con</span></div>
                        </div>

                        <Button
                            type="button"
                            fullWidth
                            variant="secondary"
                            className="group border-brand/30 hover:border-brand h-12"
                            onClick={() => setView(ViewState.INVISIBLE_PORTAL)}
                        >
                            <Fingerprint className="mr-2 text-brand group-hover:text-white transition-colors" size={20} />
                            Autenticación Biométrica Pasiva
                        </Button>

                        <div className="text-center mt-6">
                            <button type="button" onClick={() => setView(ViewState.REGISTER)} className="text-sm text-slate-400 hover:text-white transition-colors">
                                ¿No tienes cuenta? <span className="text-brand font-bold">Regístrate</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer Links */}
            <div className="absolute bottom-6 flex gap-6 text-xs text-slate-600">
                <a href="#" className="hover:text-slate-400">Términos</a>
                <a href="#" className="hover:text-slate-400">Privacidad</a>
                <a href="#" className="hover:text-slate-400">Soporte</a>
            </div>
        </div>
    );
};
