
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, label, icon: Icon }) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href === '/dashboard' && pathname === '/dashboard');

    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative
        ${isActive
                    ? 'bg-brand/10 text-brand'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
            aria-current={isActive ? 'page' : undefined}
        >
            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-r-full"></div>}
            <Icon
                size={20}
                className={isActive ? 'text-brand' : 'text-slate-500 dark:text-slate-400 group-hover:text-brand transition-colors'}
                aria-hidden="true"
            />
            <span className={`font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
        </Link>
    );
};
