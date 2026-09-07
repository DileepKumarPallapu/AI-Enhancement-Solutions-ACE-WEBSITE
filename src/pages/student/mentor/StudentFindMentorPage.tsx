import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../../context/MentorContext';
import { useAuth } from '../../../context/AuthContext';
import { mentorService, MentorMatchResult } from '../../../services/db/mentorService';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Star,
  Calendar,
  Filter,
  ArrowRight,
  School,
  CheckCircle2,
  Users,
  Compass,
  Briefcase
} from 'lucide-react';
import { MentorshipArea } from '../../../types/mentor';

export const StudentFindMentorPage: React.FC = () => {
  const { collegeMentors, requestMentor } = useMentor();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiMatches, setAiMatches] = useState<MentorMatchResult[] | null>(null);

  // AI Matching Form State
  const [major, setMajor] = useState('Computer Science');
  const [targetCareer, setTargetCareer] = useState('AI Engineer / Full-Stack');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['AI/ML', 'Hackathons']);

  const areas: { key: string; label: string }[] = [
    { key: 'all', label: 'All Specialties' },
    { key: 'Academic Guidance', label: 'Academic Guidance' },
    { key: 'Career Guidance', label: 'Career & Placements' },
    { key: 'Hackathon Guidance', label: 'Hackathons & Events' },
    { key: 'Project Guidance', label: 'Technical Projects' },
    { key: 'Higher Studies', label: 'Higher Studies & Research' }
  ];

  const filtered = collegeMentors.filter(m => {
    const matchesSearch = m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.expertiseSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArea = selectedArea === 'all' || m.mentorshipAreas.includes(selectedArea as any);
    return matchesSearch && matchesArea;
  });

  const handleRunAiMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const results = mentorService.matchMentorsForStudent(currentUser, {
      studyMajor: major,
      yearOfStudy: '4th Year',
      interests: selectedInterests,
      skillsLearning: ['Python', 'React', 'Agentic AI'],
      targetCareer,
      guidanceType: ['AI/ML' as any, 'Technical Guidance' as any],
      preferredCommunication: 'Online Video',
      preferredDays: ['Monday', 'Wednesday']
    });
    setAiMatches(results);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <School className="w-3.5 h-3.5" /> {currentUser?.college || 'PSG College of Technology'}
            </div>
            <h1 className="text-3xl font-extrabold text-white">Find Your Campus Mentor</h1>
            <p className="text-slate-400 text-xs mt-1">
              Connect with 4–5 officially verified domain mentors dedicated to your institution.
            </p>
          </div>

          <button
            onClick={() => setShowAiModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> AI Mentor Matcher
          </button>
        </div>

        {/* Search & Area Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, skill, or department..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {areas.map(a => (
              <button
                key={a.key}
                onClick={() => setSelectedArea(a.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedArea === a.key
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Matches Banner (If active) */}
        {aiMatches && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> AI Top Mentor Recommendations
              </h3>
              <button
                onClick={() => setAiMatches(null)}
                className="text-xs text-indigo-300 hover:text-white"
              >
                Clear AI Filter
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiMatches.slice(0, 2).map(({ mentor, matchTier, matchScore, reasons }) => (
                <div key={mentor.id} className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 flex items-start gap-3">
                  <img src={mentor.avatarUrl} alt={mentor.fullName} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-xs">{mentor.fullName}</h4>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                        {matchTier} ({matchScore}%)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{mentor.designation}</p>
                    <ul className="text-[10px] text-indigo-300 list-disc list-inside">
                      {reasons.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mentor Cards Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
            <p className="text-slate-400 text-sm">No mentors match your search criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedArea('all'); }}
              className="text-xs text-indigo-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(mentor => (
              <div
                key={mentor.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-indigo-500/40 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-24 w-full relative bg-slate-800">
                    <img src={mentor.coverPhotoUrl} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {mentor.ratingAverage} ({mentor.ratingCount})
                    </div>
                  </div>

                  <div className="px-5 pt-0 relative -mt-8 space-y-3">
                    <div className="flex items-end gap-3">
                      <img
                        src={mentor.avatarUrl}
                        alt={mentor.fullName}
                        className="w-16 h-16 rounded-2xl object-cover border-4 border-slate-900 shadow-xl"
                      />
                      <div className="pb-1 overflow-hidden">
                        <h3 className="font-bold text-sm text-white truncate flex items-center gap-1">
                          {mentor.fullName}
                          {mentor.isVerifiedMentor && <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />}
                        </h3>
                        <p className="text-xs text-indigo-400 font-mono truncate">@{mentor.username}</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      <p className="font-semibold text-slate-200">{mentor.designation}</p>
                      <p className="truncate">{mentor.department}</p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {mentor.professionalBio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mentor.expertiseSkills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px]">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        {mentor.availability.availableDays.slice(0, 2).join(', ')}
                      </span>
                      <span className="font-mono text-slate-300">{mentor.currentStudentsCount} / {mentor.maxStudentsCapacity}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-slate-800 flex items-center gap-2">
                  <Link
                    to={`/mentor/${mentor.username}`}
                    className="flex-1 py-2 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/mentor/${mentor.username}`}
                    className="flex-1 py-2 text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30"
                  >
                    Request
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* AI Mentor Matcher Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Campus Mentor Matcher
            </h3>
            <p className="text-xs text-slate-400">
              Answer 3 quick preferences and ACE AI will evaluate real college mentor specialization fit.
            </p>

            <form onSubmit={handleRunAiMatch} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Engineering Major</label>
                <input
                  type="text"
                  required
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Career Role</label>
                <input
                  type="text"
                  required
                  value={targetCareer}
                  onChange={e => setTargetCareer(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => setShowAiModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold"
                >
                  Find Matching Mentors
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
