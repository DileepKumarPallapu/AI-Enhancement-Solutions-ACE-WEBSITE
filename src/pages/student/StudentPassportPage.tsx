import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Award, Share2, Download, CheckCircle2, 
  ExternalLink, User, BookOpen, Trophy, Briefcase, 
  Cpu, Flame, Star, CheckCircle, FileText, Globe
} from "lucide-react";
import { studentPassportDb, StudentPassport, PassportSectionItem } from "../../services/db/studentPassportDatabase";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const StudentPassportPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const studentId = user?.id || "usr_student_dileep";
  const [passport, setPassport] = useState<StudentPassport | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const data = studentPassportDb.getByUserId(studentId);
    setPassport(data);
  }, [studentId]);

  if (!passport) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleCopyShareLink = () => {
    const link = `${window.location.origin}/verify/${passport.aceId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    showToast("Public verification link copied to clipboard!", "success");
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadJson = () => {
    const jsonStr = studentPassportDb.exportPassportJson(studentId);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ACE-PASSPORT-${passport.aceId}.json`;
    a.click();
    showToast("Canonical Passport JSON downloaded!", "success");
  };

  const totalVerified = passport.totalVerifiedCount;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 p-6 md:p-10 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" 
                  alt={passport.fullName}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-indigo-500/50 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 rounded-full p-1.5 shadow-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ACE Verified Passport
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {passport.aceId}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {passport.fullName}
                </h1>
                <p className="text-indigo-300 font-medium text-sm md:text-base">
                  {passport.program}
                </p>
                <p className="text-slate-400 text-xs md:text-sm">
                  {passport.institutionName} ({passport.department})
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-300 pt-1">
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
                    Verified Items: <strong className="text-indigo-400">{totalVerified}</strong>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cryptographically Sealed
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-col gap-3 w-full md:w-auto">
              <button
                onClick={handleCopyShareLink}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink ? "Link Copied!" : "Share Passport"}
              </button>
              <button
                onClick={handleDownloadJson}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: "all", label: "Full Passport", icon: ShieldCheck },
            { id: "skills", label: "Skills", icon: Cpu },
            { id: "projects", label: "Projects", icon: Briefcase },
            { id: "competitions", label: "Competitions", icon: Trophy },
            { id: "certificates", label: "Certificates", icon: Award },
            { id: "mentorship", label: "Mentorship", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Sections Render */}
        <div className="space-y-6">
          {Object.entries(passport.sections).map(([secKey, items]: [string, PassportSectionItem[]]) => {
            if (activeTab !== "all" && activeTab !== secKey) return null;
            if (!items || items.length === 0) return null;

            return (
              <div key={secKey} className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white capitalize flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    {secKey} Records ({items.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-400">{item.subtitle}</p>
                        </div>
                        <span className={`text-[11px] px-2 py-0.5 rounded font-mono font-medium ${
                          item.verificationState === 'VERIFIED' ? "bg-emerald-950 text-emerald-300 border border-emerald-800" :
                          "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}>
                          {item.verificationState}
                        </span>
                      </div>
                      {item.verifiedBy && (
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1 border-t border-slate-900">
                          <CheckCircle2 className="w-3 h-3" /> Verified by {item.verifiedBy}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default StudentPassportPage;
