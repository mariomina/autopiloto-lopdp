"use client";

import React from 'react';
import { ShieldCheck, Plus, MoreVertical } from 'lucide-react';

export const RoleManagement: React.FC = () => {
    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gestión de Roles</h3>
                    <p className="text-sm text-slate-500">Administre el acceso para Administradores, DPOs y Auditores.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-sm font-bold shadow-lg shadow-brand/20 transition-all">
                    <Plus size={16} /> Agregar Usuario
                </button>
            </div>

            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-colors">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-white/5">
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Usuario</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Rol</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Última Actividad</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {[
                            { name: 'Roberto Gomez', email: 'roberto.g@company.com', role: 'Admin', color: 'bg-purple-600', status: 'Activo', active: 'Hace 2 mins' },
                            { name: 'Maria Torres', email: 'm.torres@company.com', role: 'OPD (DPO)', color: 'bg-blue-600', status: 'Activo', active: 'Hace 1 hora' },
                            { name: 'Carlos Ruiz', email: 'cruiz@auditors.com', role: 'Auditor', color: 'bg-orange-600', status: 'Inactivo', active: 'Hace 2 días' },
                        ].map((user, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${i === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-400' : i === 1 ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-gradient-to-br from-emerald-500 to-teal-500'}`}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded border text-xs font-medium flex w-fit items-center gap-1.5
                                        ${user.role === 'Admin' ? 'bg-brand/10 border-brand/20 text-brand' :
                                            user.role === 'OPD (DPO)' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500 dark:text-blue-400' :
                                                'bg-amber-50 dark:bg-accent/10 border-amber-200 dark:border-accent/20 text-amber-600 dark:text-accent'}
                                    `}>
                                        {user.role === 'Admin' && <ShieldCheck size={12} />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full w-fit border ${user.status === 'Activo' ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-slate-200 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Activo' ? 'bg-green-500 dark:bg-green-400' : 'bg-slate-400'}`}></div>
                                        {user.status}
                                    </div>
                                </td>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{user.active}</td>
                                <td className="p-4 text-right">
                                    <button className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
