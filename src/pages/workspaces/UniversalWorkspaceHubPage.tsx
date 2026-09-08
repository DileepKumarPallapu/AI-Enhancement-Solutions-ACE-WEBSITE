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
import { universalWorkspaceDatabase, WorkspaceItem, RoleAccessRequest, WorkspaceCategory } from '../../services/db/universalWorkspaceDatabase';
import { demoModeDatabase } from '../../services/db/demoModeDatabase';
import { AccountRole } from '../../types/account';

export const UniversalWorkspaceHubPage: React.FC = () => {
  const { currentUser, activeRole, switchWorkspace } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'CORE' | 'CAMPUS' | 'PROFESSIONAL' | 'ADMINISTRATION'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 13 Canonical ACE Workspaces
  const all13Workspaces = [
    {
      id: 'ws-student',
      role: 'STUDENT' as AccountRole,
      title: 'STUDENT',
      name: 'Student Dashboard',
      description: 'Personalized opportunity discovery feed, interactive skill graph, wallet rewards, student project lab, and career simulator.',
      icon: '🎓',
      category: 'CORE',
      route: '/student/dashboard',
      status: 'Active Core',
      metrics: '48,500 🪙 • 8 Verified Badges'
    },
    {
      id: 'ws-ambassador',
      role: 'COLLEGE_AMBASSADOR' as AccountRole,
      title: 'CAMPUS AMBASSADOR',
      name: 'Campus Ambassador Dashboard',
      description: 'Review and approve collegiate event proposals, coordinate student referral trees, and lead departmental outreach.',
      icon: '📣',
      category: 'CAMPUS',
      route: '/ambassador/dashboard',
      status: 'Authorized',
      metrics: '3 Approvals • 2,450 Reach'
    },
    {
      id: 'ws-faculty-mentor',
      role: 'MENTOR' as AccountRole,
      title: 'FACULTY MENTOR',
      name: 'Faculty Mentor Dashboard',
      description: 'Conduct 1-on-1 sprint reviews, sign off student project lab milestones, endorse competencies, and guide research.',
      icon: '👨‍🏫',
      category: 'CAMPUS',
      route: '/mentor/dashboard',
      status: 'Authorized',
      metrics: '12 Mentees • 2 Reviews Due'
    },
    {
      id: 'ws-mentor',
      role: 'MENTOR' as AccountRole,
      title: 'MENTOR',
      name: 'Mentor Dashboard',
      description: 'Industry technical mentorship, career guidance sessions, office hours scheduling, and mentee dossier reviews.',
      icon: '🧭',
      category: 'CAMPUS',
      route: '/mentor/dashboard',
      status: 'Authorized',
      metrics: '8 Active Mentees • 4 Sessions'
    },
    {
      id: 'ws-organizer',
      role: 'ORGANIZER' as AccountRole,
      title: 'ORGANIZER',
      name: 'Organizer Dashboard',
      description: 'End-to-end collegiate hackathon command: multi-track registrations, live QR attendance check-in, and automated certificates.',
      icon: '🎫',
      category: 'CORE',
      route: '/organizer/dashboard',
      status: 'Authorized',
      metrics: '620 Registrations • 94% Check-in'
    },
    {
      id: 'ws-college',
      role: 'COLLEGE' as AccountRole,
      title: 'COLLEGE',
      name: 'College Dashboard',
      description: 'Institution governance: department hierarchy, faculty mentor allocations, institutional NBA/NAAC accreditation stats.',
      icon: '🏫',
      category: 'CAMPUS',
      route: '/college/dashboard',
      status: 'Directorate',
      metrics: '8 Departments • 64 Mentors'
    },
    {
      id: 'ws-recruiter',
      role: 'RECRUITER' as AccountRole,
      title: 'RECRUITER',
      name: 'Recruiter Dashboard',
      description: 'Verified student talent radar filter by proven code evidence, technical interview schedules, and direct job offers pipeline.',
      icon: '💼',
      category: 'PROFESSIONAL',
      route: '/recruiter/dashboard',
      status: 'Authorized',
      metrics: '18 Shortlisted • 3 Offers Sent'
    },
    {
      id: 'ws-judge',
      role: 'JUDGE' as AccountRole,
      title: 'JUDGE',
      name: 'Judge Dashboard',
      description: 'Score assigned hackathon and competition submissions against multi-criteria weighted rubrics with real-time leaderboards.',
      icon: '⚖️',
      category: 'PROFESSIONAL',
      route: '/judge/dashboard',
      status: 'Authorized',
      metrics: '8 Teams • 6 Scored'
    },
    {
      id: 'ws-placement',
      role: 'STUDENT' as AccountRole,
      title: 'PLACEMENT',
      name: 'Placement Dashboard',
      description: 'Campus placement drive manager, automated student eligibility validation engine, corporate coordination, and offer logs.',
      icon: '📊',
      category: 'PROFESSIONAL',
      route: '/placement',
      status: 'Unlocked',
      metrics: '42 Companies • 5 Live Drives'
    },
    {
      id: 'ws-club',
      role: 'STUDENT' as AccountRole,
      title: 'CLUB',
      name: 'Club Dashboard',
      description: 'Manage collegiate technical chapters, student memberships, internal hack nights, budget allocations, and club events.',
      icon: '👥',
      category: 'CAMPUS',
      route: '/college/clubs',
      status: 'Unlocked',
      metrics: '145 Members • 2 Events'
    },
    {
      id: 'ws-provider',
      role: 'STUDENT' as AccountRole,
      title: 'TRAINING PROVIDER',
      name: 'Training Provider Dashboard',
      description: 'Publish certified micro-courses, track student cohort milestones, and issue tamper-proof verifiable digital credentials.',
      icon: '📚',
      category: 'PROFESSIONAL',
      route: '/provider',
      status: 'Unlocked',
      metrics: '1,200 Enrolled • 6 Courses'
    },
    {
      id: 'ws-partner',
      role: 'STUDENT' as AccountRole,
      title: 'PARTNER',
      name: 'Partner Dashboard',
      description: 'Coordinate global sponsorship campaigns, research lab grants, and international opportunity exchange programs.',
      icon: '🤝',
      category: 'PROFESSIONAL',
      route: '/partners',
      status: 'Unlocked',
      metrics: '4 Campaigns • ₹12.5L Grants'
    },
    {
      id: 'ws-admin',
      role: 'ADMIN' as AccountRole,
      title: 'ADMIN',
      name: 'Admin Dashboard',
      description: 'Master platform operations: multi-role governance, AI token usage cost center, workflow failure queues, and system telemetry.',
      icon: '🛡️',
      category: 'ADMINISTRATION',
      route: '/admin/dashboard',
      status: 'Superadmin',
      metrics: '100% Health • 13 Workspaces'
    }
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenWorkspace = (ws: typeof all13Workspaces[0]) => {
    switchWorkspace(ws.role);
    navigate(ws.route);
  };

  const filteredWorkspaces = all13Workspaces.filter(ws => {
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
                    <span className="font-bold text-slate-900 dark:text-slate-200">{ws.metrics}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isCurrentActive ? '🟢 Active Role' : '⚡ 1-Click Launch'}
                  </span>

                  <button
                    onClick={() => handleOpenWorkspace(ws)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
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
