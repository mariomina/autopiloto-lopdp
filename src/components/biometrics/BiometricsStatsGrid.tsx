"use client";

import React from 'react';
import { Shield, Ban, ScanFace, AlertTriangle } from 'lucide-react';

interface StatCardProps {
    id: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    label: string;
    value: string | number;
    trend?: {
        value: string;
        positive: boolean;
    };
    progressBar?: number;
    isActive: boolean;
    onClick: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ id, icon, iconBg, iconColor, label, value, trend, progressBar, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`group relative overflow-hidden rounded-xl border p-6 transition-all cursor-pointer ${isActive
                ? 'border-brand bg-brand/5 shadow-lg shadow-brand/5 scale-[1.02]'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5'
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 ${isActive ? 'bg-brand text-white' : iconBg + ' ' + iconColor} rounded-xl shadow-sm transition-colors`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${trend.positive
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                        : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'
                        }`}>
                        {trend.value}
                    </span>
                )}
            </div>
            <p className={`text-sm font-medium mb-1 transition-colors ${isActive ? 'text-brand dark:text-brand' : 'text-slate-500 dark:text-slate-400'}`}>{label}</p>
            <p className={`text-3xl font-bold transition-colors ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>{value}</p>

            {/* Accent Bar at bottom for active state */}
            <div className={`absolute bottom-0 left-0 h-1 transition-all duration-300 ${isActive ? 'w-full bg-brand' : 'w-0 bg-transparent'}`}></div>

            {progressBar !== undefined && !isActive && (
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100 dark:bg-gray-800">
                    <div
                        className="h-full bg-brand transition-all duration-500"
                        style={{ width: `${progressBar}%` }}
                    ></div>
                </div>
            )}
        </div>
    );
};

interface BiometricsStatsGridProps {
    activeCard: string;
    onCardClick: (id: string) => void;
}

export const BiometricsStatsGrid: React.FC<BiometricsStatsGridProps> = ({ activeCard, onCardClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
                id="compliance"
                isActive={activeCard === 'compliance'}
                onClick={() => onCardClick('compliance')}
                icon={<Shield size={24} />}
                iconBg="bg-blue-50 dark:bg-blue-500/10"
                iconColor="text-blue-600 dark:text-blue-400"
                label="Puntaje LOPDP"
                value="98/100"
                trend={{ value: "+2.4%", positive: true }}
            />

            <StatCard
                id="fraud"
                isActive={activeCard === 'fraud'}
                onClick={() => onCardClick('fraud')}
                icon={<Ban size={24} />}
                iconBg="bg-red-50 dark:bg-red-500/10"
                iconColor="text-red-600 dark:text-red-400"
                label="Fraudes Bloqueados"
                value="1,240"
                trend={{ value: "+12% vol", positive: false }}
            />

            <StatCard
                id="deepfake"
                isActive={activeCard === 'deepfake'}
                onClick={() => onCardClick('deepfake')}
                icon={<ScanFace size={24} />}
                iconBg="bg-purple-50 dark:bg-purple-500/10"
                iconColor="text-purple-600 dark:text-purple-400"
                label="Efectividad Deepfake"
                value="99.2%"
                trend={{ value: "Estable", positive: true }}
            />

            <StatCard
                id="threats"
                isActive={activeCard === 'threats'}
                onClick={() => onCardClick('threats')}
                icon={<AlertTriangle size={24} />}
                iconBg="bg-amber-50 dark:bg-amber-500/10"
                iconColor="text-amber-600 dark:text-amber-400"
                label="Amenazas Activadas"
                value="4 Detectadas"
                trend={{ value: "Carga Alta", positive: false }}
            />
        </div>
    );
};
