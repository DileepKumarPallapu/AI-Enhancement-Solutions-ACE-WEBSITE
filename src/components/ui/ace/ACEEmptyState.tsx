import React from 'react';

export interface ACEEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const ACEEmptyState: React.FC<ACEEmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4 ${className}`}>
      {icon && <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">{icon}</div>}
      <div className="space-y-1">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">{description}</p>
      </div>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
