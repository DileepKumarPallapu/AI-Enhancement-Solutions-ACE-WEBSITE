import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../../context/MentorContext';
import { useAuth } from '../../../context/AuthContext';
import { mentorMatchingService, MentorMatchResult } from '../../../services/ai/mentorMatchingService';
import { MentorshipArea, Mentor, GoalCategory } from '../../../types/mentorship';
import {
  Search,
  Sparkles,
  Star,
  School,
  CheckCircle2,
  Users,
  Send,
  AlertCircle
} from 'lucide-react';

export const StudentFindMentorPage: React.FC = () => {
  const { collegeMentors, assignedMentors, requestMentorship } = useMentor();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiMatches, setAiMatches] = useState<MentorMatchResult[] | null>(null);
  
  // Request Modal State
  const [selectedMentorForReq, setSelectedMentorForReq] = useState<Mentor | null>(null);
  const [requestCategory, setRequestCategory] = useState<GoalCategory>('CAREER');
  const [requestGoal, setRequestGoal] = useState('');
  const [requestMsg, setRequestMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);

  // AI Matching Form State
  const [major, setMajor] = useState('Computer Science and Engineering');
  const [targetCareer, setTargetCareer] = useState('AI & Machine Learning Engineer');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['AI/ML', 'Hackathons', 'Cloud Computing']);

  const schools = [
    { key: 'all', label: 'All Academic Schools' },
    { key: 'School of Computing', label: 'School of Computing' },
    { key: 'School of Electrical and Communication', label: 'School of Electrical & Communication' },
    { key: 'School of Mechanical and Construction', label: 'School of Mechanical & Construction' },
    { key: 'School of Bioengineering', label: 'School of Bioengineering' },
    { key: 'School of Science and Humanities', label: 'School of Science & Humanities' },
    { key: 'School of Management', label: 'School of Management' },
    { key: 'School of Law', label: 'School of Law' },
    { key: 'School of Media Arts and Design', label: 'School of Media Arts & Design' },
    { key: 'School of Commerce', label: 'School of Commerce' }
  ];

  const areas: { key: string; label: string; value: MentorshipArea | 'all' }[] = [
    { key: 'all', label: 'All Guidance Areas', value: 'all' },
    { key: 'Academic Guidance', label: 'Academic Excellence', value: 'Academic Guidance' },
    { key: 'Career Guidance', label: 'Career & Placements', value: 'Career Guidance' },
    { key: 'Hackathon Guidance', label: 'Hackathons & Events', value: 'Hackathon Guidance' },
    { key: 'Project Guidance', label: 'Technical Projects', value: 'Project Guidance' },
    { key: 'Higher Studies', label: 'Higher Studies & Research', value: 'Higher Studies' },
    { key: 'Technical Guidance', label: 'Technical & System Architecture', value: 'Technical Guidance' }
  ];

  const filteredMentors = collegeMentors.filter(m => {
    const matchesSearch = m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.expertiseSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSchool = selectedSchool === 'all' || m.academicSchool === selectedSchool;
    const matchesArea = selectedArea === 'all' || m.mentorshipAreas.includes(selectedArea as any);
    return matchesSearch && matchesSchool && matchesArea;
  });

  const handleRunAiMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const results = mentorMatchingService.matchMentorsForStudent(
      currentUser,
      collegeMentors,
      {
        studyMajor: major,
        yearOfStudy: '4th Year',
        interests: selectedInterests,
        skillsLearning: ['Python', 'React', 'Deep Learning', 'FastAPI'],
        targetCareer,
        preferredAreas: ['Career Guidance', 'Project Guidance', 'Hackathon Guidance'],
        preferredDays: ['Monday', 'Wednesday', 'Friday']
      }
    );
    setAiMatches(results);
  };

  const handleOpenRequest = (mentor: Mentor) => {
    setSelectedMentorForReq(mentor);
    setRequestGoal('');
    setRequestMsg('');
    setReqSuccess(false);
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentorForReq) return;
    setSubmitting(true);
    try {
      await requestMentorship({
        mentorId: selectedMentorForReq.id,
        goalCategory: requestCategory,
        primaryGoal: requestGoal || 'Academic and technical roadmap for final year placements & hackathons.',
        message: requestMsg || 'Hello Professor, I would like to request your mentorship in the CSE department.',
        preferredDays: ['Monday', 'Wednesday'],
        preferredTime: '16:00 - 18:00',
        preferredCommunication: 'Online Video Room',
        assignmentType: assignedMentors.length === 0 ? 'PRIMARY' : 'SECONDARY'
      });
      setReqSuccess(true);
      setTimeout(() => {
        setReqSuccess(false);
        setSelectedMentorForReq(null);
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const studentCollegeName = currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
              <School className="w-3.5 h-3.5" /> {studentCollegeName}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Find Your Campus Mentor</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Connect with officially verified faculty domain leads dedicated strictly to your institution.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/mentorship"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              My Mentorship Hub
            </Link>
            <button
              onClick={() => setShowAiModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> AI Mentor Matcher
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, skill, or department..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <select
              value={selectedSchool}
              onChange={e => setSelectedSchool(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {schools.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {areas.map(a => (
                <option key={a.key} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-500" /> Available Verified Mentors ({filteredMentors.length})
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">Institution: {studentCollegeName}</span>
          </div>

          {filteredMentors.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
              <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No mentors found matching criteria.</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Try changing your search query or school filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map(mentor => {
                const isAssigned = assignedMentors.some(a => a.mentorId === mentor.id);
                const hasCapacity = mentor.currentStudentCount < mentor.maxStudents;
                
                return (
                  <div
                    key={mentor.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition shadow-sm hover:shadow-lg flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start gap-3.5">
                        <img
                          src={mentor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={mentor.fullName}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/20 shadow-sm"
                        />
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                              {mentor.fullName}
                            </h3>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                              <Star className="w-3 h-3 fill-amber-500" /> {mentor.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                            {mentor.designation}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {mentor.department}
                          </p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                        <div className="flex justify-between text-slate-500 dark:text-slate-400">
                          <span>School:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200 text-right truncate max-w-[170px]">{mentor.academicSchool}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 dark:text-slate-400">
                          <span>Capacity:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {mentor.currentStudentCount} / {mentor.maxStudents} Mentees
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-500 dark:text-slate-400">
                          <span>Experience:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{mentor.experienceYears} Years</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Expertise</span>
                        <div className="flex flex-wrap gap-1.5">
                          {mentor.expertiseSkills.slice(0, 4).map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[10px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {mentor.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <Link
                        to={`/mentor/${mentor.id}`}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        Profile
                      </Link>

                      {isAssigned ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active Mentor
                        </span>
                      ) : (
                        <button
                          disabled={!hasCapacity}
                          onClick={() => handleOpenRequest(mentor)}
                          className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                            hasCapacity
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {hasCapacity ? 'Request Mentorship' : 'Capacity Full'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Matcher Modal */}
        {showAiModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl my-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Mentor Match Engine</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tailored matching based on your major, career aspirations, and domain interests</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAiModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {!aiMatches ? (
                <form onSubmit={handleRunAiMatch} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Major / Degree</label>
                    <input
                      type="text"
                      value={major}
                      onChange={e => setMajor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Career / Domain Goal</label>
                    <input
                      type="text"
                      value={targetCareer}
                      onChange={e => setTargetCareer(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowAiModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Generate Recommendations
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {aiMatches.map((match, idx) => (
                      <div
                        key={match.mentor.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                Rank #{idx + 1}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                {match.mentor.fullName}
                              </h4>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {match.mentor.department} • {match.mentor.academicSchool}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono">
                              {match.matchScore}% Match
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Match Reasons:</span>
                          <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                            {match.matchReasons.map((r, rIdx) => (
                              <li key={rIdx} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {r}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => {
                              setShowAiModal(false);
                              handleOpenRequest(match.mentor);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                          >
                            Select & Request
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setAiMatches(null)}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      ← Re-run Matching
                    </button>
                    <button
                      onClick={() => setShowAiModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mentorship Request Modal */}
        {selectedMentorForReq && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Request Campus Mentorship</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">To: {selectedMentorForReq.fullName} ({selectedMentorForReq.department})</p>
                </div>
                <button
                  onClick={() => setSelectedMentorForReq(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {reqSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Request Submitted Successfully!</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Your mentor will review your application and respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSendRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mentorship Goal Category</label>
                    <select
                      value={requestCategory}
                      onChange={e => setRequestCategory(e.target.value as GoalCategory)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="CAREER">Career & Placements</option>
                      <option value="PROJECT">Technical Project & Architecture</option>
                      <option value="COMPETITION">Hackathons & Competitions</option>
                      <option value="ACADEMIC">Academic Excellence & Core Subjects</option>
                      <option value="RESEARCH">Higher Studies & Research</option>
                      <option value="STARTUP">Startup & Innovation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Learning / Career Goal</label>
                    <input
                      type="text"
                      placeholder="e.g., Target Google SWE / Master distributed systems"
                      value={requestGoal}
                      onChange={e => setRequestGoal(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Personal Message to Mentor</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your background and how you would like to collaborate..."
                      value={requestMsg}
                      onChange={e => setRequestMsg(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setSelectedMentorForReq(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20"
                    >
                      {submitting ? 'Submitting...' : <><Send className="w-3.5 h-3.5" /> Send Request</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
