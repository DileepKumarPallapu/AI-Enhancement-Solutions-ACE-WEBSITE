import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import { accountDb } from '../../services/db/accountDatabase';
import {
  User,
  BookOpen,
  Trophy,
  Award,
  Sparkles,
  Calendar,
  Lock,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ActionItemPriority, NotePrivacyLevel } from '../../types/mentor';

export const MentorStudentDossierPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { studentGoals, studentActionItems, studentRecommendations, createGoal, createActionItem, createNote, recommendResource } = useMentor();
  const { currentUser } = useAuth();

  const studentAccount = accountDb.getAccountById(studentId || 'usr_student_dileep');
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'notes' | 'recommendations'>('overview');

  // Note creation form state
  const [noteTopic, setNoteTopic] = useState('');
  const [noteSummary, setNoteSummary] = useState('');
  const [noteRec, setNoteRec] = useState('');
  const [notePrivacy, setNotePrivacy] = useState<NotePrivacyLevel>('PRIVATE_MENTOR_NOTE');
  const [noteAdded, setNoteAdded] = useState(false);

  // Goal creation state
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState<'CAREER' | 'TECHNICAL' | 'EVENT'>('TECHNICAL');
  const [goalDate, setGoalDate] = useState('2026-11-30');

  if (!studentAccount) {
    return <div className="p-8 text-center text-slate-400">Student not found.</div>;
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote({
      studentId: studentAccount.id,
      sessionDate: new Date().toISOString().split('T')[0],
      topic: noteTopic,
      discussionSummary: noteSummary,
      mentorRecommendation: noteRec,
      priority: 'HIGH',
      privacyLevel: notePrivacy
    });
    setNoteAdded(true);
    setNoteTopic('');
    setNoteSummary('');
    setNoteRec('');
    setTimeout(() => setNoteAdded(false), 2500);
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGoal({
      studentId: studentAccount.id,
      title: goalTitle,
      targetCategory: goalCategory,
      targetDate: goalDate,
      progressPercentage: 10,
      milestones: [
        { id: 'm_' + Date.now(), monthIndex: 1, title: 'Foundations & Architecture', description: 'Complete core setup', completed: false }
      ],
      status: 'ACTIVE'
    });
    setGoalTitle('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div>
          <Link to="/mentor/students" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Student Roster
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={studentAccount.avatarUrl} alt={studentAccount.fullName} className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30" />
              <div>
                <h1 className="text-2xl font-black text-white">{studentAccount.fullName}</h1>
                <p className="text-xs text-indigo-400 font-mono">@{studentAccount.username} • {studentAccount.college}</p>
                <p className="text-xs text-slate-400 mt-0.5">{studentAccount.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          {[
            { key: 'overview', label: 'Student Profile & Skills' },
            { key: 'goals', label: 'Success Roadmap & Goals' },
            { key: 'notes', label: 'Faculty Notes & Observations' },
            { key: 'recommendations', label: 'Event Guidance' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.key ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" /> Academic & Bio
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{studentAccount.bio}</p>
              <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-white">Computer Science & Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Graduation:</span>
                  <span className="font-semibold text-white">Class of 2026</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" /> Verified Skills & Proficiencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {studentAccount.skills?.verified?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOALS & ROADMAP */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" /> Create New Success Plan Goal
              </h3>
              <form onSubmit={handleAddGoal} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Goal Title (e.g. Master Agentic AI & Hackathons)"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                  className="sm:col-span-2 py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
                <button type="submit" className="py-2 rounded-xl bg-indigo-600 font-bold text-white">
                  Add Goal
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {studentGoals.map(g => (
                <div key={g.id} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{g.title}</h4>
                    <span className="font-mono font-bold text-indigo-400 text-xs">{g.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: `${g.progressPercentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" /> Add Mentorship Note
              </h3>
              {noteAdded && <p className="text-xs text-emerald-400 font-bold">Note recorded successfully!</p>}
              <form onSubmit={handleAddNote} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Session Topic / Focus Area"
                  value={noteTopic}
                  onChange={e => setNoteTopic(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Discussion Summary..."
                  value={noteSummary}
                  onChange={e => setNoteSummary(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Mentor Actionable Recommendation"
                  value={noteRec}
                  onChange={e => setNoteRec(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
                <div className="flex items-center justify-between pt-1">
                  <select
                    value={notePrivacy}
                    onChange={e => setNotePrivacy(e.target.value as any)}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  >
                    <option value="PRIVATE_MENTOR_NOTE">🔒 Private (Faculty Only)</option>
                    <option value="SHARED_WITH_STUDENT">👁️ Shared with Student</option>
                  </select>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 font-bold text-white">
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: RECOMMENDATIONS */}
        {activeTab === 'recommendations' && (
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-400" /> Event & Competition Guidance
            </h3>
            <div className="space-y-3">
              {studentRecommendations.map(rec => (
                <div key={rec.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-white">{rec.title}</h4>
                    <p className="text-[11px] text-slate-400">{rec.reason}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] bg-indigo-500/10 text-indigo-300 font-mono font-bold">
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
