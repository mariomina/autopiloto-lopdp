"use client";

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ShieldCheck, FileText } from 'lucide-react';

const COLORS = ['#5E48E8', '#161B22'];
const DATA_SCORE = [{ name: 'Score', value: 85 }, { name: 'Remaining', value: 15 }];
const DATA_ACTIVITY = [
    { name: 'Lun', val: 400 }, { name: 'Mar', val: 300 }, { name: 'Mie', val: 550 },
    { name: 'Jue', val: 480 }, { name: 'Vie', val: 620 }, { name: 'Sab', val: 200 }, { name: 'Dom', val: 150 }
];

export const DashboardOverview: React.FC = () => {
    const [stats, setStats] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/dashboard/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Skeleton / Loading State simplificado
    if (loading) {
        return <div className="p-8 text-center text-slate-500 animate-pulse">Cargando datos de su empresa...</div>;
    }

    if (!stats) return null;

    const DATA_SCORE = [
        { name: 'Score', value: stats.stats.complianceScore },
        { name: 'Remaining', value: 100 - stats.stats.complianceScore }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                {stats.tenantName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Compliance Score Card */}
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg relative overflow-hidden group transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-accent/20 transition-all"></div>
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-4">Compliance Score LOPDP</h3>
                    <div className="flex items-center justify-between">
                        <div className="w-32 h-32 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={DATA_SCORE}
                                        innerRadius={40}
                                        outerRadius={55}
                                        startAngle={180}
                                        endAngle={0}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell key="cell-0" fill={stats.stats.complianceScore > 80 ? "#10B981" : "#F59E0B"} />
                                        <Cell key="cell-1" fill="currentColor" className="text-slate-100 dark:text-[#30363d]" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1 text-center">
                                <span className={`text-3xl font-bold ${stats.stats.complianceScore > 80 ? 'text-green-500' : 'text-amber-500'}`}>
                                    {stats.stats.complianceScore}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-400">Estado</p>
                            <p className={`text-lg font-bold ${stats.stats.complianceScore > 80 ? 'text-green-500' : 'text-amber-500'}`}>
                                {stats.stats.complianceScore > 80 ? 'Óptimo' : 'Regular'}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Identidades: {stats.stats.identities}</p>
                        </div>
                    </div>
                </div>

                {/* ARCO Requests Alert Card */}
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg relative overflow-hidden group transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-red-500/20 transition-all"></div>
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium">Solicitudes ARCO</h3>
                        <ShieldCheck className="text-brand" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.stats.arcoPending}</span>
                            {stats.stats.arcoPending > 0 && (
                                <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 dark:border-red-500/30">
                                    Pendientes
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500">Solicitudes de derechos (Acceso, Rectificación) esperando respuesta.</p>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-red-500 w-full h-full transition-all duration-500"
                                style={{ width: `${Math.min(stats.stats.arcoPending * 10, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Contracts Card */}
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg relative overflow-hidden group transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-brand/20 transition-all"></div>
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium">Contratos Firmados</h3>
                        <FileText className="text-brand" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            {stats.stats.contractsSigned}
                        </span>
                        <p className="text-xs text-slate-500">Documentos legalizados digitalmente</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                            Total Eventos: {stats.stats.consentEvents}
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg transition-colors">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Actividad de Identidad Digital</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DATA_ACTIVITY}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5E48E8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#5E48E8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="#666" axisLine={false} tickLine={false} />
                            <YAxis stroke="#666" axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#161B22', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="val" stroke="#5E48E8" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
