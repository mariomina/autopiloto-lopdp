"use client";

import React, { useState, useEffect } from 'react';
import { ViewState } from '@/types';
import { Layout } from '@/components/layout';
import { Landing } from '@/components/Landing';
import { Auth } from '@/components/Auth';
import { InvisiblePortal, SettingsView } from '@/components/shared';
import {
  DashboardOverview,
  CustodyView,
  BiometricsView,
  SignatureView,
  ArcoView,
  ReportsView
} from '@/components/dashboard';

export default function Home() {
  const [currentView, setView] = useState<ViewState>(ViewState.LANDING);
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
      default:
        return <DashboardOverview />;
    }
  };

  // Routing Logic
  if (currentView === ViewState.LANDING) {
    return <Landing setView={setView} />;
  }

  if (currentView === ViewState.LOGIN || currentView === ViewState.REGISTER) {
    return (
      <Auth
        setView={setView}
        mode={currentView === ViewState.LOGIN ? 'login' : 'register'}
      />
    );
  }

  if (currentView === ViewState.INVISIBLE_PORTAL) {
    return <InvisiblePortal setView={setView} />;
  }

  // Dashboard Layout for all Dashboard Views
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
