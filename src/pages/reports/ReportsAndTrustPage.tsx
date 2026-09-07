import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, AlertTriangle, FileText, CheckCircle2, 
  XCircle, Filter, Send, MessageSquare, Scale 
} from "lucide-react";
import { trustAndReportsDb, AbuseReportTicket } from "../../services/db/trustAndReportsDatabase";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const ReportsAndTrustPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [reports, setReports] = useState<AbuseReportTicket[]>([]);
  const [newReport, setNewReport] = useState({
    targetEntityType: "EVENT" as const,
    targetEntityId: "evt_101",
    targetEntityTitle: "Unauthorized Fake Hackathon",
    category: "EVENT_FRAUD" as const,
    description: "Event organizer is requesting private bank details."
  });

  useEffect(() => {
    const list = trustAndReportsDb.getAllReports();
    setReports(list);
  }, []);

  const handleSubmitNewReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.description.trim()) {
      showToast("Please provide incident details.", "error");
      return;
    }
    const created = trustAndReportsDb.submitReport({
      reporterUserId: user?.id || "usr_student_dileep",
      reporterName: "Dileep Kumar",
      targetEntityType: newReport.targetEntityType,
      targetEntityId: newReport.targetEntityId,
      targetEntityTitle: newReport.targetEntityTitle,
      category: newReport.category,
      description: newReport.description,
      evidenceLinks: []
    });
    setReports(prev => [created, ...prev]);
    showToast("Dispatched to Platform Trust & Safety team.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5 w-fit">
              <Scale className="w-3.5 h-3.5" /> Platform Trust & Safety
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Trust, Safety & Moderation Center</h1>
            <p className="text-sm text-slate-400">Report fraudulent events, plagiarism, spam, or submit appeals.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Submit Moderation Ticket
            </h2>
            <form onSubmit={handleSubmitNewReport} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Target Name or Title</label>
                <input 
                  type="text" 
                  value={newReport.targetEntityTitle}
                  onChange={(e) => setNewReport({ ...newReport, targetEntityTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Incident Description</label>
                <textarea 
                  rows={4}
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  placeholder="Provide links, timestamps, and details..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                Submit Official Report
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Recent Trust & Moderation Reports ({reports.length})
            </h2>

            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-300 text-xs font-semibold border border-red-800">
                      {report.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                      report.status === "RESOLVED" ? "bg-emerald-950 text-emerald-300" : "bg-slate-800 text-slate-400"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{report.targetEntityTitle} ({report.targetEntityType})</h4>
                  <p className="text-xs text-slate-300">{report.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsAndTrustPage;
