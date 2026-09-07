import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

export interface ACEAvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  verified?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl'
};

const badgeSizeClasses = {
  xs: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
  sm: 'w-3 h-3 -bottom-0.5 -right-0.5',
  md: 'w-3.5 h-3.5 -bottom-0.5 -right-0.5',
  lg: 'w-4 h-4 -bottom-1 -right-1',
  xl: 'w-5 h-5 -bottom-1 -right-1',
  '2xl': 'w-6 h-6 -bottom-1 -right-1'
};

export const ACEAvatar: React.FC<ACEAvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  verified = false,
  className = ''
}) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center border border-indigo-200 dark:border-indigo-900 shadow-xs select-none`}
        >
          {initials}
        </div>
      )}

      {verified && (
        <div
          className={`absolute ${badgeSizeClasses[size]} bg-indigo-600 text-white rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-xs`}
          title="Verified Student Identity"
        >
          <ShieldCheck className="w-full h-full p-0.5" />
        </div>
      )}
    </div>
  );
};
