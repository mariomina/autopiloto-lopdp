"use client";

import React, { useState } from 'react';
import { ViewState } from '@/types';
import { SettingsView } from '@/components/shared';
import { HelpGuide } from './HelpGuide';
import {
  LayoutDashboard,
  FileClock,
  ScanFace,
  Scale,
  PenTool,
  FileBadge,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Sun,
  Moon
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, toggleTheme, isDark }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: React.ElementType; label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => {
          setView(view);
          setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative
          ${isActive
            ? 'bg-brand/10 text-brand'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
          }`}
      >
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-r-full"></div>}
        <Icon size={20} className={isActive ? 'text-brand' : 'text-slate-500 dark:text-slate-400 group-hover:text-brand transition-colors'} />
        <span className={`font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark z-20 transition-colors duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-[0_0_15px_rgba(94,72,232,0.5)]">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">ENEXT</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {/* 1. Dashboard */}
          <NavItem view={ViewState.DASHBOARD_HOME} icon={LayoutDashboard} label="Dashboard" />

          {/* 2. Registro de Actividad (RAT) */}
          <NavItem view={ViewState.DASHBOARD_RAT} icon={FileClock} label="Registro de Actividad (RAT)" />

          {/* 3. Centro de Identidad & Fraude */}
          <NavItem view={ViewState.DASHBOARD_BIOMETRICS} icon={ScanFace} label="Identidad & Fraude" />

          {/* 4. Gestión ARCO */}
          <NavItem view={ViewState.DASHBOARD_ARCO} icon={Scale} label="Gestión de Derechos ARCO" />

          {/* 5. Firma Electrónica */}
          <NavItem view={ViewState.DASHBOARD_SIGNATURE} icon={PenTool} label="Firma & Contratos" />

          {/* 6. Reportes */}
          <NavItem view={ViewState.DASHBOARD_REPORTS} icon={FileBadge} label="Reportes & Certificados" />

          <div className="pt-8 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sistema</p>
          </div>
          <NavItem view={ViewState.DASHBOARD_SETTINGS} icon={Settings} label="Ajustes" />
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/10">
          <button onClick={() => setView(ViewState.LANDING)} className="flex items-center gap-3 px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg w-full transition-colors">
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-midnight/80 backdrop-blur-md z-30 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-500 hover:text-brand">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white hidden sm:block">
              {currentView === ViewState.DASHBOARD_HOME && 'Resumen Ejecutivo'}
              {currentView === ViewState.DASHBOARD_RAT && 'Trazabilidad & Evidencia (RAT)'}
              {currentView === ViewState.DASHBOARD_BIOMETRICS && 'Centro de Identidad & Fraude'}
              {currentView === ViewState.DASHBOARD_ARCO && 'Solicitudes ARCO LOPDP'}
              {currentView === ViewState.DASHBOARD_SIGNATURE && 'Gestión Documental'}
              {currentView === ViewState.DASHBOARD_REPORTS && 'Centro de Auditoría'}
              {currentView === ViewState.DASHBOARD_SETTINGS && 'Configuración de Tenant'}
            </h2>
            <HelpGuide view={currentView} />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-brand hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-white/5 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-purple-400 border border-white/20 shadow-md"></div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Background glow for aesthetics - Adjusted for light mode */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-brand/5 dark:bg-brand/5 rounded-full blur-[100px]"></div>
            <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-accent/5 dark:bg-accent/5 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-white/10 flex flex-col animate-slide-in">
            <div className="p-6 flex items-center justify-between">
              <span className="text-xl font-bold text-slate-900 dark:text-white">ENEXT</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <NavItem view={ViewState.DASHBOARD_HOME} icon={LayoutDashboard} label="Dashboard" />
              <NavItem view={ViewState.DASHBOARD_RAT} icon={FileClock} label="RAT" />
              <NavItem view={ViewState.DASHBOARD_BIOMETRICS} icon={ScanFace} label="Biometría" />
              <NavItem view={ViewState.DASHBOARD_ARCO} icon={Scale} label="ARCO" />
              <NavItem view={ViewState.DASHBOARD_SIGNATURE} icon={PenTool} label="Firmas" />
              <NavItem view={ViewState.DASHBOARD_REPORTS} icon={FileBadge} label="Reportes" />
              <NavItem view={ViewState.DASHBOARD_SETTINGS} icon={Settings} label="Ajustes" />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};