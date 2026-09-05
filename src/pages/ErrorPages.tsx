import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldAlert, Home, Grid, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-purple-50 dark:bg-purple-950/60 text-brand-600 flex items-center justify-center mx-auto text-2xl font-black font-mono">
          404
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Page Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The opportunity or route you are looking for has been moved or does not exist in the active ACE catalog.
          </p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" className="w-full" icon={<Home className="w-4 h-4" />}>
              Go to Homepage
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" size="md" className="w-full" icon={<Grid className="w-4 h-4" />}>
              Explore All Features
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Access Restricted (403)</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your current account role does not have authorization to view this internal workspace.
          </p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <Link to="/auth/login">
            <Button variant="primary" size="md" className="w-full" icon={<RotateCcw className="w-4 h-4" />}>
              Switch Persona / Login
            </Button>
          </Link>
          <Link to="/student">
            <Button variant="outline" size="md" className="w-full" icon={<Home className="w-4 h-4" />}>
              Return to Student Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
