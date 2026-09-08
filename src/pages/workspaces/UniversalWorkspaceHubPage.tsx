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
  StarOff, 
  PlusCircle, 
  ChevronRight, 
  LayoutGrid, 
  ListFilter, 
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
  FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { universalWorkspaceDatabase, WorkspaceItem, RoleAccessRequest, WorkspaceCategory } from '../../services/db/universalWorkspaceDatabase';
import { demoModeDatabase } from '../../services/db/demoModeDatabase';
import { AccountRole } from '../../types/account';

export const UniversalWorkspaceHubPage: React.FC = () => {
  const { currentUser, activeRole, switchWorkspace } = useAuth();
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | WorkspaceCategory>('ALL');
  const [roleRequests, setRoleRequests] = useState<RoleAccessRequest[]>([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequestRole, setSelectedRequestRole] = useState<AccountRole>('RECRUITER');
  const [requestReason, setRequestReason] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const userId = currentUser?.id || 'usr-student-001';

  const loadData = () => {
    const list = universalWorkspaceDatabase.getAuthorizedWorkspaces(userId);
    setWorkspaces(list);
    setRoleRequests(universalWorkspaceDatabase.getAllRoleRequests().filter(r => r.userId === userId));
  };

  useEffect(() => {
    loadData();
    const unsub = universalWorkspaceDatabase.subscribe(loadData);
    return () => { unsub(); };
  }, [userId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenWorkspace = (ws: WorkspaceItem) => {
    switchWorkspace(ws.role);
    universalWorkspaceDatabase.switchActiveWorkspace(userId, ws.role);
    navigate(ws.route);
  };

  const handleToggleFavorite = (e: React.MouseEvent, role: AccountRole) => {
    e.stopPropagation();
    universalWorkspaceDatabase.toggleFavoriteWorkspace(userId, role);
    loadData();
    showToast(`Updated favorite status for ${role}`);
  };

  const handleSetDefault = (e: React.MouseEvent, role: AccountRole) => {
    e.stopPropagation();
    universalWorkspaceDatabase.setDefaultWorkspace(userId, role);
    loadData();
    showToast(`Set ${role} as default workspace after login`);
  };

  const handleSubmitRoleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestReason.trim()) return;

    universalWorkspaceDatabase.submitRoleAccessRequest({
      userId,
      userName: currentUser?.fullName || 'Pallapu Dileep Kumar',
      requestedRole: selectedRequestRole,
      reason: requestReason
    });

    setRequestReason('');
    setShowRequestModal(false);
    loadData();
    showToast(`Access request for ${selectedRequestRole} submitted to institution administrator.`);
  };

  const filteredWorkspaces = workspaces.filter(ws => {
    const matchesSearch = ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || ws.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteWorkspaces = workspaces.filter(ws => ws.isFavorite);

  const categoryLabels: Record<WorkspaceCategory, string> = {
    PERSONAL: 'My Personal & Career',
    CAMPUS: 'My Campus & Mentorship',
    ORGANIZATION: 'My Organizations & Chapters',
    PROFESSIONAL: 'My Professional & Industry',
    ADMINISTRATION: 'Governance & Security'
  };

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
            <Link to="/home" className="hover:text-purple-600 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>ACE Super Platform</span>
            </Link>
            <span>/</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">Universal Workspaces</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRequestModal(true)}
              className="px-4 py-2 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-purple-200 dark:border-purple-800"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Request Role Access</span>
            </button>
            <Link
              to="/home"
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
            >
              ← Back to Universal Home
            </Link>
          </div>
        </div>

                {/* Hackathon Demo Mode Showcase Banner */}
        {demoModeDatabase.isDemoMode() && (
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 border-2 border-purple-500/40 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-xl">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">HACKATHON DEMO MODE ACTIVE</h2>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-md text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                      13 Workspaces Unlocked
                    </span>
                  </div>
                  <p className="text-xs text-purple-200 mt-0.5">
                    Evaluators and judges can open and inspect any workspace directly without multiple accounts or relogging.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  to="/demo"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>13-Step Presentation Tour</span>
                </Link>
                <button
                  onClick={() => {
                    demoModeDatabase.resetDemoData();
                    showToast('Demo dataset reset to initial state.');
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Reset Demo
                </button>
              </div>
            </div>

            {/* Quick 13 Dashboards Direct Launcher Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2 border-t border-purple-800/40">
              {demoModeDatabase.getAllDemoWorkspaces().map(d => (
                <Link
                  key={d.id}
                  to={d.route}
                  className="p-2.5 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-700/30 hover:border-purple-400/60 rounded-xl transition text-center group flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-lg">{d.icon}</span>
                  <span className="text-[11px] font-bold text-slate-200 group-hover:text-purple-300 truncate w-full">
                    {d.name.replace(/^[\S\s]+\s/, '')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* User Identity Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-600/30 border-2 border-purple-400/40 flex items-center justify-center text-3xl font-black text-white shadow-inner flex-shrink-0">
                🎓
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{currentUser?.fullName || 'Pallapu Dileep Kumar'}</h1>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold">
                    ✓ Verified Account
                  </span>
                </div>
                <p className="text-purple-200 text-sm mt-1 font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>{currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-purple-300">
                  <span>Current Active Workspace: <strong className="text-white bg-purple-500/30 px-2 py-0.5 rounded-lg border border-purple-400/30">{activeRole}</strong></span>
                  <span>•</span>
                  <span>Authorized Workspaces: <strong className="text-white">{workspaces.length}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center min-w-[110px]">
                <div className="text-xs text-purple-200 font-medium">Pending Tasks</div>
                <div className="text-xl font-black text-white mt-0.5">
                  {workspaces.reduce((acc, w) => acc + w.pendingTasksCount, 0)}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center min-w-[110px]">
                <div className="text-xs text-purple-200 font-medium">Notifications</div>
                <div className="text-xl font-black text-white mt-0.5">
                  {workspaces.reduce((acc, w) => acc + w.notificationsCount, 0)}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center min-w-[110px]">
                <div className="text-xs text-purple-200 font-medium">Deadlines</div>
                <div className="text-xl font-black text-white mt-0.5">
                  {workspaces.reduce((acc, w) => acc + w.urgentDeadlinesCount, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite / Pinned Shelf */}
        {favoriteWorkspaces.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Pinned Favorites</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteWorkspaces.map(ws => (
                <div
                  key={ws.id}
                  onClick={() => handleOpenWorkspace(ws)}
                  className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 hover:border-purple-500 dark:hover:border-purple-400 transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ws.icon}</span>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                        {ws.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {ws.pendingTasksCount} Tasks • {ws.notificationsCount} Alerts
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400 transform group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search authorized workspaces..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {(['ALL', 'PERSONAL', 'CAMPUS', 'ORGANIZATION', 'PROFESSIONAL', 'ADMINISTRATION'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'ALL' ? 'All Workspaces' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Workspaces Grid */}
        {filteredWorkspaces.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Authorized Workspaces Found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              No workspaces matched your search filter. You can submit a request for additional role permissions.
            </p>
            <button
              onClick={() => setShowRequestModal(true)}
              className="mt-4 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all inline-flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Request Role Access</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map(ws => {
              const isCurrentActive = activeRole === ws.role;
              return (
                <div
                  key={ws.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all flex flex-col justify-between relative group ${
                    isCurrentActive
                      ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Top Bar on Card */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900 flex items-center justify-center text-2xl shadow-xs">
                          {ws.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                            {ws.category}
                          </span>
                          <h3 className="text-base font-black text-slate-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                            {ws.label}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={e => handleToggleFavorite(e, ws.role)}
                          title={ws.isFavorite ? 'Unpin from favorites' : 'Pin to favorites'}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                        >
                          <Star className={`w-4 h-4 ${ws.isFavorite ? 'text-amber-500 fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                      {ws.description}
                    </p>

                    {/* Institution / Scope Context */}
                    <div className="mt-4 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                        <Building2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                        <span className="truncate font-medium">{ws.departmentName || ws.institutionName}</span>
                      </div>
                      {isCurrentActive && (
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-md text-[10px] font-extrabold flex-shrink-0">
                          Active Now
                        </span>
                      )}
                    </div>

                    {/* Operational Telemetry Badges */}
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Tasks</div>
                        <div className="text-sm font-black text-slate-900 dark:text-slate-100">{ws.pendingTasksCount}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Alerts</div>
                        <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">{ws.notificationsCount}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Deadlines</div>
                        <div className="text-sm font-black text-rose-600 dark:text-rose-400">{ws.urgentDeadlinesCount}</div>
                      </div>
                    </div>

                    {/* Quick Shortcuts */}
                    {ws.quickActions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                        {ws.quickActions.map((qa, i) => (
                          <Link
                            key={i}
                            to={qa.route}
                            onClick={e => {
                              e.stopPropagation();
                              switchWorkspace(ws.role);
                              universalWorkspaceDatabase.switchActiveWorkspace(userId, ws.role);
                            }}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-400 transition-colors"
                          >
                            {qa.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Primary Action Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={e => handleSetDefault(e, ws.role)}
                      className={`text-[11px] font-bold ${ws.isDefault ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {ws.isDefault ? '✓ Default Workspace' : 'Set as Default'}
                    </button>

                    <button
                      onClick={() => handleOpenWorkspace(ws)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Existing Role Requests Status Section */}
        {roleRequests.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-purple-600" />
                <span>Your Role Access Requests</span>
              </h3>
              <span className="text-xs text-slate-500">{roleRequests.length} pending / reviewed</span>
            </div>

            <div className="space-y-3">
              {roleRequests.map(req => (
                <div
                  key={req.id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {req.requestedRole}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        req.status === 'REJECTED' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Reason: "{req.reason}"
                    </p>
                    {req.reviewerNotes && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5 font-medium">
                        Admin Note: {req.reviewerNotes}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    Requested on {new Date(req.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Role Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Request Role Workspace Access</h3>
                <p className="text-xs text-slate-500 mt-0.5">Submit verification credentials to unlock authorized dashboards</p>
              </div>
              <button
                onClick={() => setShowRequestModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitRoleRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Role Workspace
                </label>
                <select
                  value={selectedRequestRole}
                  onChange={e => setSelectedRequestRole(e.target.value as AccountRole)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="RECRUITER">💼 Recruiter & Talent Radar Workspace</option>
                  <option value="JUDGE">⚖️ Judge & Competition Arena Workspace</option>
                  <option value="COLLEGE">🏫 College & Department Admin Workspace</option>
                  <option value="ORGANIZER">🎫 Event Organizer Directorate</option>
                  <option value="MENTOR">👨‍🏫 Faculty Mentor Workspace</option>
                  <option value="COLLEGE_AMBASSADOR">📣 Campus Ambassador Workspace</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Institution Affiliation
                </label>
                <input
                  type="text"
                  disabled
                  value={currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'}
                  className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Statement of Intent & Reason
                </label>
                <textarea
                  required
                  rows={3}
                  value={requestReason}
                  onChange={e => setRequestReason(e.target.value)}
                  placeholder="Explain why you require access and provide department or faculty reference details..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Role Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
