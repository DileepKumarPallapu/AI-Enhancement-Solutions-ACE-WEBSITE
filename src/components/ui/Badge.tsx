import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'purple' | 'neutral' | 'gradient';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = ''
}) => {
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium'
  };

  const variants = {
    primary: 'bg-brand-100 text-brand-700 border border-brand-200/60',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border border-purple-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    gradient: 'bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-semibold shadow-sm'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizes[size]} ${variants[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
