import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  Star, 
  FileText, 
  ShieldCheck, 
  Copy, 
  Edit3, 
  Share2, 
  ExternalLink, 
  QrCode, 
  Sparkles,
  BookOpen,
  Code2,
  Calendar,
  Clock,
  Github,
  Linkedin,
  Globe,
  Settings,
  Shield,
  Activity,
  ArrowRight,
  TrendingUp,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { demoModeDatabase } from '../../services/db/demoModeDatabase';
import { AccountRole } from '../../types/account';

type ProfileTab = 
  | 'OVERVIEW' 
  | 'ABOUT' 
  | 'EDUCATION' 
  | 'SKILLS' 
  | 'PROJECTS' 
  | 'CERTIFICATES' 
  | 'ACHIEVEMENTS' 
  | 'CAREER' 
  | 'PORTFOLIO' 
  | 'WORKSPACES' 
  | 'ACTIVITY' 
  | 'SETTINGS';

export const MyProfilePage: React.FC = () => {
  const { currentUser, activeRole, switchWorkspace } = useAuth();
  const navigate = useNavigate();
  const demoStudent = demoModeDatabase.getDemoStudent();
  const [activeTab, setActiveTab] = useState<ProfileTab>('OVERVIEW');
  const [copied, setCopied] = useState(false);

  const studentName = currentUser?.fullName || demoStudent.name;
  const username = currentUser?.username || 'ace_demo';
  const institution = 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';
  const department = demoStudent.department || 'Computer Science & Engineering';
  const degree = demoStudent.degree || 'B.Tech CSE (Honors in AI/ML)';
  const isDemo = demoModeDatabase.isDemoMode();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 13 canonical workspaces
  const all13Workspaces = [
    { role: 'STUDENT' as AccountRole, name: 'Student Dashboard', path: '/student/dashboard', icon: '🎓', desc: 'Opportunity discovery, skill graph, coins wallet, and career simulator.', status: 'Active Core' },
    { role: 'COLLEGE_AMBASSADOR' as AccountRole, name: 'Campus Ambassador Dashboard', path: '/ambassador/dashboard', icon: '📣', desc: 'Manage collegiate event approvals, student referral drives, and campaigns.', status: 'Authorized' },
    { role: 'MENTOR' as AccountRole, name: 'Faculty Mentor Dashboard', path: '/mentor/dashboard', icon: '👨‍🏫', desc: 'Review mentee sprint milestones, project lab submissions, and endorsements.', status: 'Authorized' },
    { role: 'MENTOR' as AccountRole, name: 'Mentor Dashboard', path: '/mentor/dashboard', icon: '🧭', desc: 'Industry mentorship, office hours, and technical career advice.', status: 'Authorized' },
    { role: 'ORGANIZER' as AccountRole, name: 'Event Organizer Dashboard', path: '/organizer/dashboard', icon: '🎫', desc: 'Manage hackathon registrations, live QR attendance check-in, and badges.', status: 'Authorized' },
    { role: 'COLLEGE' as AccountRole, name: 'College Directorate Dashboard', path: '/college/dashboard', icon: '🏫', desc: 'Institution department management, mentor rosters, and accreditation stats.', status: 'Authorized' },
    { role: 'RECRUITER' as AccountRole, name: 'Recruiter Dashboard', path: '/recruiter/dashboard', icon: '💼', desc: 'Talent radar filter by verified evidence, candidate interviews, and job offers.', status: 'Authorized' },
    { role: 'JUDGE' as AccountRole, name: 'Judge Dashboard', path: '/judge/dashboard', icon: '⚖️', desc: 'Score assigned hackathons submissions against weighted rubrics.', status: 'Authorized' },
    { role: 'STUDENT' as AccountRole, name: 'Placement Cell Dashboard', path: '/placement', icon: '📊', desc: 'Campus hiring drives, student eligibility tracker, and corporate pipeline.', status: 'Unlocked' },
    { role: 'STUDENT' as AccountRole, name: 'Club / Chapter Dashboard', path: '/college/clubs', icon: '👥', desc: 'Collegiate tech chapters, internal hack nights, and member rosters.', status: 'Unlocked' },
    { role: 'STUDENT' as AccountRole, name: 'Training Provider Dashboard', path: '/provider', icon: '📚', desc: 'Publish micro-courses, track cohort completion, and issue digital credentials.', status: 'Unlocked' },
    { role: 'STUDENT' as AccountRole, name: 'Partner Dashboard', path: '/partners', icon: '🤝', desc: 'Sponsorship campaigns, research grants, and international exchange.', status: 'Unlocked' },
    { role: 'ADMIN' as AccountRole, name: 'Superadmin Dashboard', path: '/admin/dashboard', icon: '🛡️', desc: 'Platform governance, multi-role security, AI token cost center, and telemetry.', status: 'Platform Admin' }
  ];

  const handleOpenWorkspace = (ws: typeof all13Workspaces[0]) => {
    switchWorkspace(ws.role);
    navigate(ws.path);
  };

  const tabs: { id: ProfileTab; label: string; icon: string }[] = [
    { id: 'OVERVIEW', label: 'Overview', icon: '🌟' },
    { id: 'ABOUT', label: 'About', icon: '👤' },
    { id: 'EDUCATION', label: 'Education', icon: '🎓' },
    { id: 'SKILLS', label: 'Skills', icon: '🧠' },
    { id: 'PROJECTS', label: 'Projects', icon: '🧪' },
    { id: 'CERTIFICATES', label: 'Certificates', icon: '📜' },
    { id: 'ACHIEVEMENTS', label: 'Achievements', icon: '🏆' },
    { id: 'CAREER', label: 'Career', icon: '🎯' },
    { id: 'PORTFOLIO', label: 'Portfolio', icon: '🌐' },
    { id: 'WORKSPACES', label: 'My Workspaces', icon: '💼' },
    { id: 'ACTIVITY', label: 'Activity', icon: '⚡' },
    { id: 'SETTINGS', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* PROFILE HEADER HERO */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'} 
                  alt={studentName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-purple-500/20 shadow-md"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {studentName}
                  </h1>
                  {isDemo ? (
                    <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded-full text-xs font-black border border-purple-300 dark:border-purple-800">
                      ⚡ DEMO ACCOUNT
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-black border border-emerald-500/20">
                      ✓ Verified
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-[11px] font-mono">
                    @{username}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 font-medium flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span>{institution}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{department}</span>
                  <span>•</span>
                  <span>{degree}</span>
                  <span>•</span>
                  <span>Current Workspace: <strong className="text-purple-600 dark:text-purple-400">{activeRole}</strong></span>
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                title="Share Profile Link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied Link' : 'Share'}</span>
              </button>

              <Link
                to="/profile/edit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RESPONSIVE TABS NAVIGATION */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 shadow-2xs overflow-x-auto flex items-center gap-1 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        
        {/* 1. OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">CGPA (4th Year)</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">9.24</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Verified Skills</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">8 Badges</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">ACE Wallet</div>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">48,500 🪙</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Authorized Workspaces</div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">13 Dashboards</div>
              </div>
            </div>

            {/* Quick Workspace Switcher Shelf */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <span>My Authorized Workspaces (1-Click Launch)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Instant dashboard inspection with no logout or account switching</p>
                </div>
                <button
                  onClick={() => setActiveTab('WORKSPACES')}
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  View All 13 →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {all13Workspaces.slice(0, 6).map((ws, i) => (
                  <div
                    key={i}
                    onClick={() => handleOpenWorkspace(ws)}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-purple-500 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="text-2xl">{ws.icon}</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-purple-600">
                          {ws.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{ws.status}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. ABOUT */}
        {activeTab === 'ABOUT' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Professional Biography</h3>
              <p className="text-xs text-slate-500 mt-0.5">Summary of academic and technical background</p>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Senior Computer Science & Engineering undergraduate at Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology. 
              Specializing in Autonomous AI Systems, Distributed Orchestration, and Fullstack Web Architectures. Active contributor to campus technical chapters, 
              hackathons, and peer mentorship initiatives.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>demo.student@veltech.edu.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>portfolio.allcollegeevent.com/@ace_demo</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Github className="w-4 h-4 text-purple-600" />
                <span>github.com/dileep-veltech</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. EDUCATION */}
        {activeTab === 'EDUCATION' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Academic History & Credentials</h3>
                <p className="text-xs text-slate-500 mt-0.5">Verified collegiate records and degree progress</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-black">
                Institutional Source of Truth
              </span>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology
                  </h4>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                    Bachelor of Technology (B.Tech) in Computer Science & Engineering (Honors in AI/ML)
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Department of Computer Science & Engineering • 2022 – 2026 (4th Year)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Cumulative GPA</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white">9.24 / 10.0</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. SKILLS */}
        {activeTab === 'SKILLS' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Verified Technical Competencies</h3>
              <p className="text-xs text-slate-500 mt-0.5">Skill evaluations grounded in project repository proof and competition performance</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoStudent.skills.map((s, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Competency: {s.level}</div>
                  </div>
                  {s.verified && (
                    <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-md font-bold text-xs">
                      ✓ Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PROJECTS */}
        {activeTab === 'PROJECTS' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Student Project Lab Repositories</h3>
              <p className="text-xs text-slate-500 mt-0.5">Milestones signed off by Faculty Mentors and collaborators</p>
            </div>

            <div className="space-y-4">
              {demoStudent.projects.map((p, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">{p.title}</h4>
                    <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold">
                      {p.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tech.map((t, tidx) => (
                      <span key={tidx} className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-md font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CERTIFICATES */}
        {activeTab === 'CERTIFICATES' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Verifiable Certificates & Badges</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tamper-proof credentials issued by verified institutions and hackathons</p>
            </div>

            <div className="space-y-3">
              {demoStudent.certificates.map((c, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{c.title}</div>
                    <div className="text-slate-400 mt-0.5">Issuer: {c.issuer}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 font-semibold">{c.date}</span>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓ Cryptographically Verified</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. ACHIEVEMENTS */}
        {activeTab === 'ACHIEVEMENTS' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Honors & Competitions</h3>
              <p className="text-xs text-slate-500 mt-0.5">National hackathons and scholastic achievements</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/50 flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">National Smart India Hackathon Grand Finalist</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">MoE Innovation Cell • Jan 2026</div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800/50 flex items-center gap-3">
                <span className="text-2xl">🥇</span>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">First Place — Collegiate Autonomous Drone Challenge</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Vel Tech Technical Symposium • Oct 2025</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. CAREER */}
        {activeTab === 'CAREER' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Career Readiness & Benchmarks</h3>
              <p className="text-xs text-slate-500 mt-0.5">Target industry benchmarks and mathematical skill gap calculations</p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Target Role: Senior Fullstack AI Engineer</span>
                <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-md font-bold text-xs">
                  88% Match
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Benchmarked against 450+ industry technical specifications. Recommendation: Complete ROS2 Navigation 2 milestone.
              </p>
              <Link
                to="/career"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline pt-2"
              >
                <span>Open Universal Career Simulator →</span>
              </Link>
            </div>
          </div>
        )}

        {/* 9. PORTFOLIO */}
        {activeTab === 'PORTFOLIO' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Public Showcase Studio</h3>
              <p className="text-xs text-slate-500 mt-0.5">Shareable digital portfolio link with verified badges</p>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl space-y-3">
              <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">Public Portfolio URL</div>
              <div className="text-base font-black truncate">https://allcollegeevent.com/portfolio/@{username}</div>
              <div className="pt-2 flex gap-3">
                <Link
                  to="/student/portfolio"
                  className="px-4 py-2 bg-white text-purple-900 hover:bg-purple-50 rounded-xl text-xs font-black transition"
                >
                  Configure Studio
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 10. MY WORKSPACES (ALL 13 CARDS) */}
        {activeTab === 'WORKSPACES' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <span>My ACE Workspaces (All 13 Stakeholder Dashboards)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect any authorized stakeholder environment with instant single-click switching (zero logout)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {all13Workspaces.map((ws, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{ws.icon}</span>
                      <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-md text-[10px] font-black uppercase tracking-wider">
                        {ws.status}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white mt-3 group-hover:text-purple-600 transition-colors">
                      {ws.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {ws.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleOpenWorkspace(ws)}
                      className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>OPEN DASHBOARD</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. ACTIVITY */}
        {activeTab === 'ACTIVITY' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Audit Trail & Recent Activity</h3>
              <p className="text-xs text-slate-500 mt-0.5">Chronological system events and verification milestones</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Logged in to ACE Unified Operating System</span>
                <span className="text-slate-400">Just now</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Completed Sprint 4 Review with Faculty Mentor</span>
                <span className="text-slate-400">2 hours ago</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Verified TypeScript & Autonomous Agents Competency Badge</span>
                <span className="text-slate-400">1 day ago</span>
              </div>
            </div>
          </div>
        )}

        {/* 12. SETTINGS */}
        {activeTab === 'SETTINGS' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Account & Privacy Controls</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage credentials, preferences, and radar discoverability</p>
            </div>

            <div className="space-y-3">
              <Link
                to="/profile/edit"
                className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 transition flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Edit3 className="w-4 h-4 text-purple-600" />
                  <span>Edit Personal & Academic Profile Studio</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/settings"
                className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 transition flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-purple-600" />
                  <span>Global Platform Settings & Security Hub</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
