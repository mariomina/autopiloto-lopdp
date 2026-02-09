"use client";

import React from 'react';
import { ViewState } from '@/types';

interface NavItemProps {
    view: ViewState;
    icon: React.ElementType;
    label: string;
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
}

/**
 * NavItem Component
 * 
 * Navigation item for the sidebar menu. Displays an icon, label, and active state indicator.
 * Extracted from Layout component to prevent re-creation on every render.
 * 
 * @param view - The ViewState this item navigates to
 * @param icon - Lucide icon component to display
 * @param label - Text label for the navigation item
 * @param currentView - Current active ViewState
 * @param onNavigate - Callback function to handle navigation
 */
export const NavItem: React.FC<NavItemProps> = ({
    view,
    icon: Icon,
    label,
    currentView,
    onNavigate
}) => {
    const isActive = currentView === view;

    return (
        <button
            onClick={() => onNavigate(view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative
        ${isActive
                    ? 'bg-brand/10 text-brand'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Navigate to ${label}`}
        >
            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-r-full"></div>}
            <Icon
                size={20}
                className={isActive ? 'text-brand' : 'text-slate-500 dark:text-slate-400 group-hover:text-brand transition-colors'}
                aria-hidden="true"
            />
            <span className={`font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
        </button>
    );
};
