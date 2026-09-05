import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Calendar, Trophy, Briefcase, Code, BookOpen, Users, Award, 
  Sparkles, FileText, CheckSquare, ShieldCheck, History, AlertTriangle, 
  HelpCircle, Building2, Search, ArrowRight, Grid, LayoutDashboard
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';

export const ExploreDirectoryPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const featureGroups = [
    {
      category: 'OPPORTUNITY DISCOVERY',
      icon: Compass,
      color: 'from-purple-600 to-indigo-600',
      features: [
        { title: 'Verified Events Explorer', desc: 'Browse symposiums, workshops, and technical paper tracks.', path: '/events', badge: 'Public' },
        { title: 'National Hackathons Hub', desc: 'Cash prize pools, tracks (AI/Web3), and team formation.', path: '/hackathons', badge: 'Popular' },
        { title: 'AI Personalized Feed', desc: '8-dimension profile-aware opportunity recommendations.', path: '/for-you', badge: 'AI Powered' },
        { title: 'Smart Search with Natural Language', desc: 'Search events, topics, cities, and filters with AI.', path: '/search', badge: 'Smart' },
        { title: 'Collegiate Locations Directory', desc: 'Filter symposiums in Chennai, Coimbatore, Bengaluru.', path: '/colleges', badge: 'Directory' }
      ]
    },
    {
      category: 'CODING & GAMIFIED LEARNING',
      icon: Code,
      color: 'from-blue-600 to-cyan-600',
      features: [
        { title: 'Interactive Coding Problem Solver', desc: 'Python/Java/C++ IDE with live test cases and Socratic AI tutor.', path: '/coding/practice/two-sum', badge: 'Interactive' },
        { title: '8 Browser Coding Mini-Games', desc: 'Code Builder, Debug The Code, Output Guess, and SQL Challenge.', path: '/coding/games', badge: 'Gamified' },
        { title: 'Daily Coding Streak & Challenge', desc: 'Daily challenges, XP rewards, and college leaderboards.', path: '/coding', badge: 'Daily' },
        { title: 'Structured Learning Academy', desc: 'Full curriculums for Python, Full-Stack Web, and DSA Mastery.', path: '/learn', badge: 'Academy' }
      ]
    },
    {
      category: 'CAREER & STUDENT PORTFOLIO',
      icon: Briefcase,
      color: 'from-emerald-600 to-teal-600',
      features: [
        { title: 'Internships & Fresher Tech Jobs', desc: 'Verified summer internships, fellowships, and startup roles.', path: '/student/career', badge: 'Verified' },
        { title: 'Automated ATS Resume Builder', desc: '1-Click compile verified ACE hackathons & coding stats to PDF.', path: '/student/resume', badge: '1-Click' },
        { title: 'Application Tracker', desc: 'Kanban board for applied, shortlisted, and interview statuses.', path: '/student/applications', badge: 'Tracker' },
        { title: 'Cryptographic Certificate Wallet', desc: 'Tamper-proof delegate certificates with QR authenticity checks.', path: '/certificates', badge: 'Verified' }
      ]
    },
    {
      category: 'COMMUNITY & REFERRALS',
      icon: Users,
      color: 'from-amber-600 to-orange-600',
      features: [
        { title: 'College Campus Network', desc: 'Inter-collegiate discussion feed, hackathon team finder.', path: '/community', badge: 'Social' },
        { title: 'Refer & Earn Rewards Center', desc: 'Earn +10 ACE points per invite, redeem for Amazon gift cards.', path: '/referral', badge: 'Rewards' },
        { title: 'Student Contests & Quizzes', desc: 'Collegiate trivia, weekly skill challenges, and badges.', path: '/contests', badge: 'Contests' }
      ]
    },
    {
      category: 'ROLE WORKSPACES & MANAGEMENT',
      icon: LayoutDashboard,
      color: 'from-rose-600 to-pink-600',
      features: [
        { title: 'Student Portal Dashboard', desc: 'Registered QR passes, streaks, and personal achievements.', path: '/student', badge: 'Student' },
        { title: 'Campus Ambassador (AMB) Command Center', desc: 'Outreach campaigns, student directory, and event reviews.', path: '/ambassador', badge: 'Ambassador' },
        { title: 'Organizer Center & Check-in Scanner', desc: 'Event creator wizard, attendee manager, and live QR check-in.', path: '/organizer', badge: 'Organizer' },
        { title: 'Institutional College Workspace', desc: 'Accredited department management, HOD rosters, and symposiums.', path: '/college', badge: 'College' },
        { title: 'ACE Admin AI Risk Center', desc: 'Anomaly radar, duplicate detection, and poster date verification.', path: '/admin/ai-risk', badge: 'Admin' },
        { title: 'Immutable System Audit Logs', desc: 'Chronological moderation records with actor ID and timestamps.', path: '/admin/audit-logs', badge: 'Governance' },
        { title: 'Student Reports & Safety Center', desc: 'Resolution queue for complaints and suspicious listing reports.', path: '/admin/reports', badge: 'Safety' },
        { title: 'Support & Help Desk Ticket Center', desc: 'Submit inquiries regarding certificates and organizer verification.', path: '/support', badge: 'Support' }
      ]
    }
  ];

  const filtered = featureGroups.map(group => ({
    ...group,
    features: group.features.filter(f => 
      f.title.toLowerCase().includes(search.toLowerCase()) || 
      f.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(g => g.features.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      
      <PageHeader
        eyebrow="ALLCOLLEGEEVENT ECOSYSTEM DIRECTORY"
        title="Explore All ACE"
        highlight="Features."
        subtitle="One unified directory connecting every opportunity, coding challenge, learning path, and role-based workspace."
        badge={
          <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold flex items-center gap-1">
            <Grid className="w-3.5 h-3.5" /> 24+ Production Modules Connected
          </span>
        }
      />

      {/* Quick Search */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-xs">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Filter features (e.g., Hackathons, Coding Games, Resume Builder, AI Risk, Tasks)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs bg-transparent outline-none text-slate-800 dark:text-slate-200 font-medium"
        />
      </div>

      {/* Feature Groups */}
      <div className="space-y-8">
        {filtered.map((group, idx) => {
          const Icon = group.icon;
          return (
            <section key={idx} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${group.color} text-white`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                  {group.category} ({group.features.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.features.map((f, fIdx) => (
                  <Link
                    key={fIdx}
                    to={f.path}
                    className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all group flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-brand-700 dark:text-brand-300">
                          {f.badge}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                        {f.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-brand-600 flex items-center gap-1">
                      Open Module →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
};
