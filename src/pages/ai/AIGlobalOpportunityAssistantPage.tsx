import React, { useState } from 'react';
import { Sparkles, Send, Globe2, ShieldCheck, ArrowRight, Bot, CheckCircle2 } from 'lucide-react';
import { aiGlobalOpportunityAssistantDatabase, GroundedOpportunityResponse } from '../../services/db/aiGlobalOpportunityAssistantDatabase';
import { Link } from 'react-router-dom';

export const AIGlobalOpportunityAssistantPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<GroundedOpportunityResponse | null>(null);

  const sampleQueries = [
    "Find AI fellowships and research opportunities in Canada.",
    "Show scholarships matching my Vel Tech 9.4 CGPA in Germany.",
    "Find remote robotics and autonomous systems hackathons."
  ];

  const handleAsk = (qText: string) => {
    if (!qText.trim()) return;
    const res = aiGlobalOpportunityAssistantDatabase.answerGroundedQuery(qText);
    setResponse(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 space-y-3 text-center">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Grounded International Intelligence
          </span>
          <h1 className="text-3xl font-extrabold text-white">Ask ACE: Global Opportunities Assistant</h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Ask complex queries about international internships, scholarships, fellowships, and visa prerequisites. Fact-checked strictly against authentic platform databases.
          </p>
        </div>

        {/* Input Bar */}
        <div className="p-2 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk(query)}
            placeholder="Ask about international fellowships, scholarships, or required skills..."
            className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => handleAsk(query)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Ask
          </button>
        </div>

        {/* Sample Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Try asking:</span>
          {sampleQueries.map(s => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                handleAsk(s);
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-blue-500 transition-all text-left cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Grounded Response Card */}
        {response && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-blue-800/50 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Grounded Opportunity Intelligence</h3>
                <p className="text-xs text-slate-400">Confidence Score: {(response.confidenceScore * 100).toFixed(0)}% • Fact-checked with Vel Tech Passport</p>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">{response.answer}</p>

            {/* Matched Opportunities */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matched Opportunities:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {response.matchedOpportunities.map(opp => (
                  <div key={opp.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <h5 className="font-bold text-white text-sm">{opp.title}</h5>
                    <p className="text-xs text-blue-400">{opp.provider}</p>
                    <div className="text-xs text-slate-300">{opp.location}</div>
                    <div className="text-xs font-mono font-bold text-emerald-400">{opp.stipendDisplay}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility & Missing Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
                <div className="font-bold text-emerald-300">Eligibility Analysis:</div>
                <p className="text-slate-300 leading-relaxed">{response.eligibilityExplanation}</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-1">
                <div className="font-bold text-amber-300">Actionable Checklist:</div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {response.missingRequirements.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              {response.actionLinks.map(l => (
                <Link
                  key={l.url}
                  to={l.url}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  {l.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
