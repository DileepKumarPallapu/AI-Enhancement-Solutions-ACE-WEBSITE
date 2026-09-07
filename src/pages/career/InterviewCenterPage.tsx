import React, { useState, useEffect } from "react";
import { 
  Terminal, Play, CheckCircle2, Award, Clock, Sparkles, 
  Send, RefreshCw, Star, BookOpen, AlertCircle, ChevronRight 
} from "lucide-react";
import { interviewPrepDb, InterviewQuestion, MockInterviewSubmission } from "../../services/db/interviewPrepDatabase";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const InterviewCenterPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const studentId = user?.id || "usr_student_dileep";
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [latestSubmission, setLatestSubmission] = useState<MockInterviewSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const list = interviewPrepDb.getQuestions();
    setQuestions(list);
    if (list.length > 0) {
      setSelectedQuestion(list[0]);
    }
  }, []);

  const handleSubmitAnswer = () => {
    if (!selectedQuestion || !studentAnswer.trim()) {
      showToast("Please provide an answer before submitting.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const sub = interviewPrepDb.submitMockResponse(studentId, selectedQuestion.id, studentAnswer);
      setLatestSubmission(sub);
      setIsSubmitting(false);
      showToast(`Scored ${sub.aiEvaluation.overallScore}/100 with actionable feedback!`, "success");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border border-indigo-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <Terminal className="w-3.5 h-3.5" /> AI Interview Simulation Lab
            </span>
            <h1 className="text-3xl font-extrabold text-white">Technical & Behavioral Interview Prep</h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Master real campus interview questions with instant AI rubrics, structural feedback, and code evaluation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Interview Question Bank</h2>
            <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
              {questions.map((q) => {
                const isSelected = selectedQuestion?.id === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestion(q);
                      setLatestSubmission(null);
                      setStudentAnswer("");
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-indigo-950/60 border-indigo-500 text-white shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-indigo-400">{q.category}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {q.difficulty}
                      </span>
                    </div>
                    <div className="text-sm font-medium line-clamp-2">{q.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {selectedQuestion && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded bg-indigo-900/60 text-indigo-300 text-xs font-semibold">
                    {selectedQuestion.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedQuestion.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedQuestion.questionPrompt}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>Your Answer / Implementation:</span>
                    <span>Markdown & Code formatting supported</span>
                  </label>
                  <textarea
                    rows={8}
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Structure your thought process, architecture diagram concepts, and code snippet..."
                    className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Evaluating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Submit for AI Review
                      </>
                    )}
                  </button>
                </div>

                {latestSubmission && (
                  <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> AI Evaluation & Score
                      </h4>
                      <span className="text-lg font-extrabold text-white px-3 py-1 bg-emerald-950 rounded-lg border border-emerald-800">
                        {latestSubmission.aiEvaluation.overallScore} / 100
                      </span>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-slate-900">
                      <span className="text-xs font-semibold text-indigo-300">Strengths Identified:</span>
                      <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                        {latestSubmission.aiEvaluation.strengths.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InterviewCenterPage;
