import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Search, 
  Star, 
  PlusCircle, 
  ChevronRight, 
  Sparkles, 
  Building2, 
  Users, 
  Layers, 
  ArrowRight,
  Bell,
  CheckSquare,
  AlertTriangle,
  Send,
  Home,
  FileCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dashboardRegistry, WorkspaceDefinition, WorkspaceCategory } from '../../services/db/dashboardRegistry';
import { demoModeDatabase } from '../../services/db/demoModeDatabase';
import { AccountRole } from '../../types/account';

export const UniversalWorkspaceHubPage: React.FC = () => {
  const { currentUser, activeRole, switchWorkspace } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | WorkspaceCategory>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceDefinition[]>(() => dashboardRegistry.getAllWorkspaces());

  useEffect(() => {
    const unsub = dashboardRegistry.subscribe(() => {
      setWorkspaces(dashboardRegistry.getAllWorkspaces());
    });
    return unsub;
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenWorkspace = (ws: WorkspaceDefinition) => {
    switchWorkspace(ws.role as AccountRole);
    navigate(ws.route);
  };

  const filteredWorkspaces = workspaces.filter(ws => {
    const matchesSearch = ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || ws.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-purple-600 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>ACE Super Platform</span>
            </Link>
            <span>/</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">My ACE Workspaces</span>
          </div>

          <Link
            to="/profile/me"
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
          >
            👤 View My Profile
          </Link>
        </div>

        {/* User Identity Hero Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-600/30 border-2 border-purple-400/40 flex items-center justify-center text-3xl font-black text-white shadow-inner flex-shrink-0">
                🎓
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    My ACE Workspaces
                  </h1>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold">
                    ✓ All 13 Dashboards Unlocked
                  </span>
                </div>
                <p className="text-purple-200 text-sm mt-1 font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-purple-300">
                  <span>Current Active Role: <strong className="text-white bg-purple-500/30 px-2 py-0.5 rounded-lg border border-purple-400/30">{activeRole}</strong></span>
                  <span>•</span>
                  <span>Total Dashboards: <strong className="text-white">13 Available</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                to="/demo"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/25 transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>13-Step Presentation Tour</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search workspaces (e.g. Student, Mentor, Recruiter)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {(['ALL', 'CORE', 'CAMPUS', 'PROFESSIONAL', 'ADMINISTRATION'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'ALL' ? 'All 13 Workspaces' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 13 Workspaces Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkspaces.map(ws => {
            const isCurrentActive = activeRole === ws.role;
            return (
              <div
                key={ws.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all flex flex-col justify-between group ${
                  isCurrentActive
                    ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-lg'
                    : 'border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900 flex items-center justify-center text-2xl shadow-xs">
                        {ws.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 rounded-md font-mono">
                          {ws.title}
                        </span>
                        <h3 className="text-base font-black text-slate-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                          {ws.name}
                        </h3>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-md text-[10px] font-bold">
                      {ws.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {ws.description}
                  </p>

                  <div className="mt-4 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span>Telemetry:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-200">{ws.metricsSummary}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isCurrentActive ? '🟢 Active Role' : '⚡ 1-Click Launch'}
                  </span>

                  <button
                    onClick={() => handleOpenWorkspace(ws)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>OPEN DASHBOARD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
