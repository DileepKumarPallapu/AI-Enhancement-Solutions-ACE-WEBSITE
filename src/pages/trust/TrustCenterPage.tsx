import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Globe, Building2, Award, AlertTriangle, Search, ExternalLink } from 'lucide-react';
import { trustDatabase, OrganizationTrustProfile } from '../../services/db/trustDatabase';
import { ACEBadge } from '../../components/ui/ace/ACEBadge';

export const TrustCenterPage: React.FC = () => {
  const [profiles] = useState<OrganizationTrustProfile[]>(trustDatabase.getAllProfiles());
  const [query, setQuery] = useState('');

  const filtered = profiles.filter(p =>
    p.orgName.toLowerCase().includes(query.toLowerCase()) ||
    p.officialWebsite.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-indigo-900/50 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACE Trust, Verification & Evidence Authority</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            ACE Trust & Verification Center
          </h1>
          <p className="text-indigo-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Every verification status on AllCollegeEvent is backed by immutable institutional DNS ownership, cryptographic certificate records, and audit logs. Zero arbitrary numbers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search verified universities, companies, and opportunity providers..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
        </div>

        {/* Organization Profiles */}
        <div className="space-y-4">
          {filtered.map(profile => (
            <div key={profile.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">{profile.orgName}</h2>
                      <ACEBadge variant="success" size="sm">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {profile.status}
                        </span>
                      </ACEBadge>
                    </div>
                    <a
                      href={profile.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Globe className="w-3 h-3" /> {profile.officialWebsite} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 self-end sm:self-center">
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white">{profile.evidence.certificatesIssuedCount}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Certificates</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white">{profile.evidence.previousEventsCount}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Events</div>
                  </div>
                </div>
              </div>

              {/* Evidence Explanations */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Verified Trust Evidence:</div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {profile.trustScoreEvidenceExplanation.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
