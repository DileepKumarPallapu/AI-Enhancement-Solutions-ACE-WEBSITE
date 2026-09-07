import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Eye,
  Trophy
} from 'lucide-react';

export const MentorStudentDossierPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const {
    myStudents,
    studentGoals,
    studentActionPlans,
    createNote
  } = useMentor();

  const mentee = myStudents.find(m => m.studentId === studentId) || myStudents[0];

  const [noteTopic, setNoteTopic] = useState('');
  const [noteSummary, setNoteSummary] = useState('');
  const [mentorRec, setMentorRec] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [localNotes, setLocalNotes] = useState<any[]>([]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentee || !noteTopic || !noteSummary) return;

    await createNote({
      studentId: mentee.studentId,
      type: isPrivate ? 'PRIVATE_MENTOR_NOTE' : 'STUDENT_VISIBLE_NOTE',
      topic: noteTopic,
      discussionSummary: noteSummary,
      mentorRecommendation: mentorRec || 'Continue working on planned milestones.',
      priority: 'MEDIUM'
    });

    setLocalNotes(prev => [
      ...prev,
      {
        id: `note-${Date.now()}`,
        topic: noteTopic,
        summary: noteSummary,
        isPrivate,
        createdAt: new Date().toISOString()
      }
    ]);
    setNoteTopic('');
    setNoteSummary('');
    setMentorRec('');
  };

  const studentName = mentee?.studentName || 'Dileep Kumar';
  const studentDept = mentee?.studentDepartment || 'Computer Science and Engineering';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/mentor/students" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Roster
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{studentName} — Student Dossier</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {studentDept} • Avadi Chennai Campus • Assigned Mentee
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Active Advisory
            </span>
          </div>
        </div>

        {/* Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Academic Profile & Notes */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Student Profile</h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Institution:</span>
                  <span className="font-semibold text-right max-w-[170px] truncate">Vel Tech Rangarajan Dr. Sagunthala R&D</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold">{studentDept}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Year of Study:</span>
                  <span className="font-semibold">4th Year (B.Tech)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Domain Focus:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI / Cloud Systems</span>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Advisory Notes</h3>

              <form onSubmit={handleAddNote} className="space-y-3">
                <input
                  type="text"
                  placeholder="Note Topic..."
                  value={noteTopic}
                  onChange={e => setNoteTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  required
                />
                <textarea
                  rows={3}
                  placeholder="Discussion summary & observations..."
                  value={noteSummary}
                  onChange={e => setNoteSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Mentor recommendation..."
                  value={mentorRec}
                  onChange={e => setMentorRec(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={e => setIsPrivate(e.target.checked)}
                      className="rounded"
                    />
                    {isPrivate ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Eye className="w-3.5 h-3.5 text-indigo-500" />}
                    {isPrivate ? 'Private Note' : 'Visible to Student'}
                  </label>

                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                  >
                    Save Note
                  </button>
                </div>
              </form>

              {localNotes.length > 0 && (
                <div className="space-y-2 pt-2">
                  {localNotes.map(n => (
                    <div key={n.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">{n.topic}</span>
                        {n.isPrivate ? (
                          <span className="text-[10px] text-amber-500 font-bold">Private</span>
                        ) : (
                          <span className="text-[10px] text-indigo-500 font-bold">Shared</span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{n.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Columns: Goals & Action Plans */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Goals & Roadmaps */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-indigo-500" /> Active 3-Month Success Plans
              </h3>

              {studentGoals.length === 0 ? (
                <p className="text-xs text-slate-400">No active goal roadmaps created yet.</p>
              ) : (
                studentGoals.map(g => (
                  <div key={g.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{g.title}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{g.description}</p>
                      </div>
                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono">{g.progressPercentage}%</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: `${g.progressPercentage}%` }} />
                    </div>

                    <div className="space-y-1">
                      {g.milestones.map(m => (
                        <div key={m.id} className="flex items-center gap-2 text-[11px]">
                          {m.completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-400" />}
                          <span className={m.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}>
                            Month {m.monthIndex}: {m.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Action Plans */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Assigned Action Plans
              </h3>

              {studentActionPlans.length === 0 ? (
                <p className="text-xs text-slate-400">No action plans assigned yet.</p>
              ) : (
                studentActionPlans.map(p => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{p.title}</h4>
                      <span className="text-[10px] text-slate-500">Status: {p.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{p.tasks.length} tasks assigned</p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
