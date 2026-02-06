"use client";

import React from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-midnight border-t border-white/5 py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h4 className="font-bold text-white mb-4">Producto</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Casos de Uso</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Integraciones</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Empresa</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cumplimiento LOPDP</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Certificaciones</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Newsletter</h4>
                        <p className="text-sm text-slate-400 mb-4">
                            Recibe actualizaciones sobre nuevas funcionalidades y mejores prácticas de cumplimiento.
                        </p>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-accent transition-all"
                                />
                            </div>
                            <button className="bg-white hover:bg-slate-200 text-midnight px-4 py-2.5 rounded-lg font-bold text-sm transition-all">
                                Suscribir
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 ENEXT. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
