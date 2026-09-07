import React from 'react';

export interface ACECardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  elevated?: boolean;
  hoverable?: boolean;
  title?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

export const ACECard: React.FC<ACECardProps> = ({
  elevated = false,
  hoverable = false,
  title,
  badge,
  actions,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all ${
        elevated
          ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xl'
          : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/60 dark:border-slate-800/80'
      } ${
        hoverable ? 'hover:border-indigo-500/50 hover:shadow-2xl hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {(title || badge || actions) && (
        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            {title && typeof title === 'string' ? (
              <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">{title}</h3>
            ) : (
              title
            )}
            {badge && (
              typeof badge === 'string' ? (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                  {badge}
                </span>
              ) : badge
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

