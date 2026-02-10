
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ViewState } from '@/types';
import { Layout } from '@/components/layout';
// Import DashboardOverview directly to avoid barrel file loading triggers
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

// Dynamic imports for heavy views
const CustodyView = dynamic(() => import('@/components/dashboard/CustodyView').then(mod => mod.CustodyView), {
    loading: () => <div className="p-12 text-center text-slate-500 dark:text-slate-400 animate-pulse">Cargando Auditoría de Custodia...</div>,
    ssr: false
});
const BiometricsView = dynamic(() => import('@/components/dashboard/BiometricsView').then(mod => mod.BiometricsView), {
    loading: () => <div className="p-12 text-center text-slate-500 dark:text-slate-400 animate-pulse">Iniciando Motor Biométrico...</div>,
    ssr: false
});
const SignatureView = dynamic(() => import('@/components/dashboard/SignatureView').then(mod => mod.SignatureView), {
    loading: () => <div className="p-12 text-center text-slate-500 dark:text-slate-400 animate-pulse">Cargando Gestor de Firmas...</div>,
    ssr: false
});
const ArcoView = dynamic(() => import('@/components/dashboard/ArcoView').then(mod => mod.ArcoView), {
    loading: () => <div className="p-12 text-center text-slate-500 dark:text-slate-400 animate-pulse">Cargando Solicitudes ARCO...</div>,
    ssr: false
});
const ReportsView = dynamic(() => import('@/components/dashboard/ReportsView').then(mod => mod.ReportsView), {
    loading: () => <div className="p-12 text-center text-slate-500 dark:text-slate-400 animate-pulse">Preparando Reportes...</div>,
    ssr: false
});

// Shared components dynamic load
const SettingsView = dynamic(() => import('@/components/shared/SettingsView').then(mod => mod.SettingsView), { ssr: false });
const InvisiblePortal = dynamic(() => import('@/components/shared/InvisiblePortal').then(mod => mod.InvisiblePortal), { ssr: false });

export default function DashboardPage() {
    const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD_HOME);
    const [isDark, setIsDark] = useState(true);

    // Initial mount effect to load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('enext-theme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
        }
    }, []);

    // Theme setup - runs on mount and whenever isDark changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('enext-theme', next ? 'dark' : 'light');
            return next;
        });
    };

    // Helper to render Dashboard content based on view
    const renderDashboardContent = () => {
        switch (currentView) {
            case ViewState.DASHBOARD_RAT:
                return <CustodyView />;
            case ViewState.DASHBOARD_BIOMETRICS:
                return <BiometricsView />;
            case ViewState.DASHBOARD_ARCO:
                return <ArcoView />;
            case ViewState.DASHBOARD_SIGNATURE:
                return <SignatureView />;
            case ViewState.DASHBOARD_REPORTS:
                return <ReportsView />;
            case ViewState.DASHBOARD_SETTINGS:
                return <SettingsView />;
            case ViewState.INVISIBLE_PORTAL:
                return <InvisiblePortal setView={setView} />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <Layout
            currentView={currentView}
            setView={setView}
            toggleTheme={toggleTheme}
            isDark={isDark}
        >
            {renderDashboardContent()}
        </Layout>
    );
}
