import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Trophy,
  ArrowRight,
  BookOpen,
  Briefcase,
  Star,
  Compass,
  Users,
  Award,
  ChevronRight,
  School
} from 'lucide-react';

export const MentorsLandingPage: React.FC = () => {
  const { collegeMentors } = useMentor();
  const { currentUser } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialtiesList = [
    { key: 'all', label: 'All Disciplines' },
    { key: 'ACADEMIC_CSE', label: 'Academic & AI/CSE' },
    { key: 'CAREER_PLACEMENTS', label: 'Career & Placements' },
    { key: 'EVENTS_COMPETITIONS', label: 'Hackathons & Competitions' },
    { key: 'PROJECTS_TECHNICAL', label: 'Technical Projects' },
    { key: 'HIGHER_STUDIES_RESEARCH', label: 'Higher Studies & Research' }
  ];

  const filteredMentors = selectedSpecialty === 'all'
    ? collegeMentors
    : collegeMentors.filter(m => m.specialties.includes(selectedSpecialty as any));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-800 bg-radial-gradient from-indigo-950/40 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Official Campus Mentorship 2.0
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Meet Your Verified <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">College Mentors</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Get personalized 1-on-1 guidance for academics, competitive hackathons, industry projects, placement strategy, and global higher studies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/student/mentors"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center gap-2"
            >
              Find My Mentor <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/become-mentor"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-200 font-semibold text-sm hover:bg-slate-800 transition-all"
            >
              Apply to Become a Mentor
            </Link>
          </div>

          {/* Quick College Badge */}
          {currentUser?.college && (
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <School className="w-4 h-4 text-indigo-400" />
              <span>Browsing verified mentors for: <strong className="text-white">{currentUser.college}</strong></span>
            </div>
          )}
        </div>
      </section>

      {/* 5 Core Guidance Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">5 Dedicated Mentorship Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-400">Each participating institution provides 4–5 verified domain leads.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Academic & AI/CSE', icon: BookOpen, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'Core algorithm mastery, subject clarity & exam optimization.' },
            { title: 'Career & Placements', icon: Briefcase, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'Resume tuning, Tier-1 tech company SDE prep & mock interviews.' },
            { title: 'Events & Hackathons', icon: Trophy, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'Team forming, pitch strategy, and SIH national competition coach.' },
            { title: 'Technical Projects', icon: Sparkles, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', desc: 'Production microservices, cloud deployments & open source.' },
            { title: 'Higher Studies & Research', icon: GraduationCap, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'GRE, GATE, SOP reviews, and international scholarship grants.' }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-slate-700 transition">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pillar.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verified Mentors Roster */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
              Verified Campus Mentors
            </h2>
            <p className="text-xs text-slate-400 mt-1">Available for 1-on-1 booking and term-long success planning.</p>
          </div>

          {/* Specialty Filter Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {specialtiesList.map(s => (
              <button
                key={s.key}
                onClick={() => setSelectedSpecialty(s.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedSpecialty === s.key
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <div
              key={mentor.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-indigo-500/40 transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Banner */}
                <div className="h-28 w-full relative bg-slate-800">
                  <img src={mentor.coverPhotoUrl} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {mentor.ratingAverage} ({mentor.ratingCount})
                  </div>
                </div>

                {/* Avatar & Title */}
                <div className="px-6 pt-0 relative -mt-10 space-y-3">
                  <div className="flex items-end gap-3">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.fullName}
                      className="w-18 h-18 rounded-2xl object-cover border-4 border-slate-900 shadow-xl"
                    />
                    <div className="pb-1 overflow-hidden">
                      <h3 className="font-extrabold text-base text-white truncate flex items-center gap-1">
                        {mentor.fullName}
                        {mentor.isVerifiedMentor && <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />}
                      </h3>
                      <p className="text-xs text-indigo-400 font-mono truncate">@{mentor.username}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-slate-200">{mentor.designation}</p>
                    <p className="text-slate-400 truncate">{mentor.institutionName}</p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {mentor.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mentor.expertiseSkills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px]">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Availability Badge */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{mentor.availability.availableDays.slice(0, 3).join(', ')}</span>
                    </div>
                    <span className="font-mono text-slate-300">{mentor.currentStudentsCount} / {mentor.maxStudentsCapacity} Students</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <Link
                  to={`/mentor/${mentor.username}`}
                  className="flex-1 py-2.5 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                >
                  View Profile
                </Link>
                <Link
                  to={`/student/mentors`}
                  className="flex-1 py-2.5 text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30"
                >
                  Request Mentor
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Mentorship Works Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How ACE Mentorship Works</h2>
          <p className="text-xs sm:text-sm text-slate-400">From onboarding to winning hackathons and cracking dream placements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Find Your College Mentor', desc: 'Browse mentors specifically approved for your university or use AI match.' },
            { step: '02', title: 'Request Guidance', desc: 'Select primary guidance areas: Academic, Placements, Projects, or Hackathons.' },
            { step: '03', title: 'Build 3-Month Plan', desc: 'Create a milestone success plan with action items and recommended events.' },
            { step: '04', title: '1-on-1 Guidance & Chat', desc: 'Book verified online/in-person sessions and chat securely in-app.' }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-indigo-500/30 font-mono block">{item.step}</span>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
