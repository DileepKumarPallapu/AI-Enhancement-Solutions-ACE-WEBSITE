import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Bookmark, 
  Building2, 
  ExternalLink,
  Tag,
  Award
} from 'lucide-react';
import { opportunityDb, UnifiedOpportunity, OpportunityCategory } from '../../services/db/opportunityDatabase';
import { bookmarkDb } from '../../services/db/bookmarkDatabase';
import { calendarDb } from '../../services/db/calendarDatabase';
import { useAuth } from '../../context/AuthContext';

export const OpportunityIntelligencePage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';

  const [opportunities, setOpportunities] = useState<UnifiedOpportunity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedMode, setSelectedMode] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const studentProfile = {
    institutionId: 'inst-vel-tech-rangarajan-avadi',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    skills: ['React & TypeScript', 'Autonomous AI Agents', 'Python', 'Cloud Native & Docker'],
    targetCareer: 'AI Systems Engineer',
    interests: ['AI/ML', 'Hackathons', 'Robotics']
  };

  useEffect(() => {
    const opps = opportunityDb.getAll();
    setOpportunities(opps);
    
    // Load bookmarks
    const bms = bookmarkDb.getByUser(currentUserId);
    setBookmarkedIds(new Set(bms.map(b => b.entityId)));
  }, [currentUserId]);

  const handleToggleBookmark = (opp: UnifiedOpportunity) => {
    bookmarkDb.toggleBookmark({
      userId: currentUserId,
      entityId: opp.id,
      type: 'OPPORTUNITY',
      title: opp.title,
      subtitle: `${opp.organizerName} • ${opp.category}`,
      targetUrl: `/student/opportunities/${opp.id}`,
      tags: [opp.category]
    });

    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(opp.id)) next.delete(opp.id);
      else next.add(opp.id);
      return next;
    });
  };

  const handleSyncToCalendar = (opp: UnifiedOpportunity) => {
    calendarDb.addEvent({
      userId: currentUserId,
      title: `${opp.title} Deadline`,
      type: opp.category === 'HACKATHON' ? 'REGISTERED_EVENT' : 'ACADEMIC_DEADLINE',
      priority: 'CRITICAL',
      startTime: opp.deadline,
      endTime: new Date(new Date(opp.deadline).getTime() + 3600000).toISOString(),
      location: opp.location,
      isOnline: opp.mode === 'ONLINE',
      reminderMinutesBefore: [1440, 60],
      isCompleted: false,
      colorHex: '#10b981',
      tags: [opp.category, 'Opportunity']
    });
    alert('Deadline successfully synced to your Smart ACE Calendar!');
  };

  const filtered = opportunities.filter(opp => {
    if (selectedCategory !== 'ALL' && opp.category !== selectedCategory) return false;
    if (selectedMode !== 'ALL' && opp.mode !== selectedMode) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = opp.title.toLowerCase().includes(q) || opp.organizerName.toLowerCase().includes(q) || opp.requiredSkills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Explainable Opportunity Radar
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">ACE Opportunity Intelligence</h1>
          <p className="text-slate-400 text-sm">
            Curated events, fellowships, hackathons, and openings matched deterministically to your academic credentials.
          </p>
        </div>

        {/* Faceted Filter & Search Bar */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by title, organization, or required skill (e.g. ROS2, TypeScript)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Categories</option>
                <option value="HACKATHON">Hackathons</option>
                <option value="COMPETITION">Competitions</option>
                <option value="INTERNSHIP">Internships</option>
                <option value="COURSE">Courses</option>
              </select>

              <select
                value={selectedMode}
                onChange={e => setSelectedMode(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Modes</option>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opportunity Card Stream */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <Compass className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-semibold text-slate-300">No opportunities match your current preferences</h3>
              <button onClick={() => { setSelectedCategory('ALL'); setSelectedMode('ALL'); setSearchQuery(''); }} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold">
                Reset All Filters
              </button>
            </div>
          ) : (
            filtered.map(opp => {
              const match = opportunityDb.calculateMatch(opp, studentProfile);
              const isSaved = bookmarkedIds.has(opp.id);

              return (
                <div
                  key={opp.id}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-6 shadow-xl"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img src={opp.organizerLogoUrl} alt={opp.organizerName} className="w-14 h-14 rounded-2xl object-cover border border-slate-800 shrink-0" />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 text-[10px] font-bold uppercase border border-slate-800">
                            {opp.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                            {match.score}% Calculated Match
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-white hover:text-emerald-400 transition">
                          <Link to={`/student/opportunities/${opp.id}`}>{opp.title}</Link>
                        </h2>
                        <p className="text-xs text-slate-400 flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5" /> {opp.organizerName} • {opp.location} ({opp.mode})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleBookmark(opp)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition ${
                          isSaved ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                        title={isSaved ? 'Saved to Bookmarks' : 'Save Bookmark'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSyncToCalendar(opp)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-blue-400" /> Sync Calendar
                      </button>
                      <Link
                        to={`/student/opportunities/${opp.id}`}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-lg shadow-emerald-900/30"
                      >
                        Inspect & Apply →
                      </Link>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{opp.shortDescription}</p>

                  {/* Explainable Match Breakdown */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Why You're Seeing This:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {match.reasons.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills & Deadline Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 uppercase font-bold mr-1">Skills:</span>
                      {opp.requiredSkills.map(sk => (
                        <span key={sk} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                    <div className="text-slate-400">
                      Deadline: <span className="text-white font-medium">{new Date(opp.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
