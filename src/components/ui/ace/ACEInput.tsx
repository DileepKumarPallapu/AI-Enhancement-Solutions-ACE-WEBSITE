import React from 'react';

export interface ACEInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const ACEInput: React.FC<ACEInputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input
          className={`w-full ${icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 border-slate-300 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-all ${
            error ? 'border-rose-500 focus:border-rose-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
};
