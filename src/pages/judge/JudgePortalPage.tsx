import React, { useState, useEffect } from "react";
import { 
  Gavel, CheckCircle2, ShieldAlert, Award, FileText, 
  ExternalLink, ChevronRight, Star, RefreshCw
} from "lucide-react";
import { judgeDb, JudgeAssignment } from "../../services/db/judgeDatabase";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const JudgePortalPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const judgeId = user?.id || "usr_mentor_arun";
  const [assignments, setAssignments] = useState<JudgeAssignment[]>([]);
  const [selectedAsg, setSelectedAsg] = useState<JudgeAssignment | null>(null);

  useEffect(() => {
    const list = judgeDb.getAssignmentsForJudge(judgeId);
    setAssignments(list);
    if (list.length > 0) {
      setSelectedAsg(list[0]);
    }
  }, [judgeId]);

  const handleSubmitScore = () => {
    if (!selectedAsg) return;
    judgeDb.submitScore(selectedAsg.id, [
      { criteriaName: 'Technical Architecture & Originality', score: 24, feedback: 'Great edge architecture.' }
    ]);
    showToast("Official rubric score committed to canonical leaderboard.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 w-fit">
              <Gavel className="w-3.5 h-3.5" /> Restricted Judge Evaluation Terminal
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Hackathon & Contest Submissions Review</h1>
            <p className="text-sm text-slate-400">Score assigned student projects using standard multi-tier rubrics.</p>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            Judge: <strong className="text-amber-400">{judgeId}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Submissions ({assignments.length})</h2>
            <div className="space-y-2">
              {assignments.map((asg) => {
                const isSelected = selectedAsg?.id === asg.id;
                return (
                  <button
                    key={asg.id}
                    onClick={() => setSelectedAsg(asg)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-950/60 border-indigo-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-indigo-400">{asg.eventName}</span>
                    </div>
                    <div className="font-bold text-white text-sm">{asg.projectTitle}</div>
                    <div className="text-xs text-slate-400 mt-1">Team: {asg.teamName}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            {selectedAsg && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{selectedAsg.projectTitle}</h3>
                  <p className="text-sm text-slate-400">Team: <strong className="text-indigo-300">{selectedAsg.teamName}</strong></p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h4 className="text-sm font-bold text-white">Evaluation Rubrics (Current Score: {selectedAsg.totalScore}/100)</h4>
                  <div className="space-y-2">
                    {selectedAsg.rubrics.map((r, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-sm">
                        <span>{r.criteriaName}</span>
                        <span className="font-bold text-indigo-400">{r.awardedScore} / {r.maxScore}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSubmitScore}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer"
                    >
                      Submit Official Scores
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default JudgePortalPage;
