import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  badge,
  actions,
  breadcrumbs
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-50/70 via-white to-white dark:from-slate-900/90 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xs mb-8">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          
          {/* Eyebrow & Badge */}
          <div className="flex flex-wrap items-center gap-2">
            {eyebrow && (
              <span className="text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-brand-700 dark:text-brand-300 border border-purple-200 dark:border-purple-800">
                {eyebrow}
              </span>
            )}
            {badge}
          </div>

          {/* Large Title */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {title}{' '}
            {highlight && (
              <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-medium">
            {subtitle}
          </p>
        </div>

        {actions && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
