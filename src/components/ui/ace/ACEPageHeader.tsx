import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface ACEPageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const ACEPageHeader: React.FC<ACEPageHeaderProps> = ({
  title,
  description,
  badge,
  breadcrumbs,
  actions,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}>
      <div className="space-y-1.5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                {b.path ? (
                  <Link to={b.path} className="hover:text-indigo-600 transition">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2.5">
          {badge}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>
        </div>

        {description && (
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-auto">{actions}</div>}
    </div>
  );
};
