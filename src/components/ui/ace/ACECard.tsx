import React from 'react';

export interface ACECardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hoverable?: boolean;
}

export const ACECard: React.FC<ACECardProps> = ({
  elevated = false,
  hoverable = false,
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
      {children}
    </div>
  );
};
