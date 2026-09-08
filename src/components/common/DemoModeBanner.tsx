import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutGrid, RotateCcw, ShieldCheck, ChevronRight, X, Compass } from 'lucide-react';
import { demoModeDatabase } from '../../services/db/demoModeDatabase';

export const DemoModeBanner: React.FC = () => {
  const location = useLocation();
  const [isDemo, setIsDemo] = useState(demoModeDatabase.isDemoMode());
  const [isDismissed, setIsDismissed] = useState(false);
  const [resetNotification, setResetNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsub = demoModeDatabase.subscribe(() => {
      setIsDemo(demoModeDatabase.isDemoMode());
    });
    return () => unsub();
  }, []);

  if (!isDemo || isDismissed) return null;

  const handleResetDemo = () => {
    demoModeDatabase.resetDemoData();
    setResetNotification('Demo data refreshed to initial state.');
    setTimeout(() => setResetNotification(null), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white text-xs py-1.5 px-4 sticky top-0 z-50 shadow-md border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black rounded-md text-[10px] tracking-wider uppercase flex-shrink-0">
            ⚡ HACKATHON DEMO MODE
          </span>
          <span className="font-semibold text-purple-100 hidden sm:inline truncate">
            All 13 Workspaces & Role Dashboards are unlocked for judging evaluation.
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/demo"
            className="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-lg font-bold transition-colors flex items-center gap-1 text-[11px]"
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Presentation & Tour</span>
          </Link>

          <Link
            to="/workspaces"
            className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-extrabold transition-colors flex items-center gap-1 text-[11px]"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Workspace Hub</span>
          </Link>

          <button
            onClick={handleResetDemo}
            title="Reset demo data"
            className="p-1 hover:bg-white/20 rounded-md text-purple-200 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-white/20 rounded-md text-purple-200 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {resetNotification && (
        <div className="text-[11px] text-center bg-purple-900 text-amber-200 py-1 font-bold">
          ✓ {resetNotification}
        </div>
      )}
    </div>
  );
};
