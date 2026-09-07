import React, { useState, useEffect } from "react";
import { 
  Building2, Search, Filter, Users, Calendar, Briefcase, 
  MapPin, ShieldCheck, Mail, CheckCircle2, ChevronRight, 
  Star, Clock, Award, Plus, Eye
} from "lucide-react";
import { recruiterDb, CandidateTalentProfile, RecruiterJobPosting } from "../../services/db/recruiterDatabase";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const RecruiterPortalPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const recruiterId = user?.id || "usr_rec_anthropic";
  const [candidates, setCandidates] = useState<CandidateTalentProfile[]>([]);
  const [jobPostings, setJobPostings] = useState<RecruiterJobPosting[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"search" | "jobs">("search");
  const [shortlistedUserIds, setShortlistedUserIds] = useState<string[]>([]);

  useEffect(() => {
    const list = recruiterDb.searchTalent({});
    setCandidates(list);
    setJobPostings(recruiterDb.getJobs());
    const short = recruiterDb.getShortlists(recruiterId).map(s => s.candidateUserId);
    setShortlistedUserIds(short);
  }, [recruiterId]);

  const handleShortlist = (candUserId: string, name: string) => {
    const defaultJobId = jobPostings[0]?.id || "job_default";
    recruiterDb.shortlistCandidate(recruiterId, defaultJobId, candUserId, "Shortlisted from Talent Radar");
    setShortlistedUserIds(prev => [...prev, candUserId]);
    showToast(`${name} added to recruiter pipeline!`, "success");
  };

  const filteredCandidates = candidates.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.verifiedSkills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    c.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Recruiter Hub & Talent Radar
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Campus Talent Discovery</h1>
            <p className="text-sm text-slate-400">Discover, evaluate, and hire verified student talent with proof-of-work passports.</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab("search")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === "search" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white bg-slate-800"}`}
            >
              Talent Search ({candidates.length})
            </button>
            <button 
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === "jobs" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white bg-slate-800"}`}
            >
              Job Postings ({jobPostings.length})
            </button>
          </div>
        </div>

        {activeTab === "search" && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by candidate name, skill (e.g. React, TypeScript), or college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.userId} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={candidate.avatarUrl} 
                          alt={candidate.fullName} 
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/40"
                        />
                        <div>
                          <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                            {candidate.fullName}
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          </h3>
                          <p className="text-xs text-indigo-400 font-medium">{candidate.department}</p>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 font-mono font-semibold border border-indigo-800">
                        {candidate.matchScore || 95}% Match
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        {candidate.institutionName}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-slate-500" />
                        {candidate.year} • {candidate.verifiedProjectsCount} Verified Projects
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 font-medium block mb-1.5">Verified Core Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.verifiedSkills.map((skill) => (
                          <span key={skill.name} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => handleShortlist(candidate.userId, candidate.fullName)}
                      disabled={shortlistedUserIds.includes(candidate.userId)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        shortlistedUserIds.includes(candidate.userId)
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}
                    >
                      {shortlistedUserIds.includes(candidate.userId) ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Shortlisted
                        </>
                      ) : (
                        "Shortlist"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobPostings.map((job) => (
              <div key={job.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{job.title}</h3>
                    <p className="text-xs text-indigo-400 font-medium">{job.companyName} • {job.roleType}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800">
                    {job.applicantsCount} Applicants
                  </span>
                </div>
                <p className="text-sm text-slate-300 line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>{job.location}</span>
                  <span className="font-semibold text-white">{job.salaryOrStipend}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default RecruiterPortalPage;
