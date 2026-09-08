import React from 'react';
import { Building2, ShieldCheck, Award, ArrowRight, Handshake } from 'lucide-react';
import { partnerSponsorshipDatabase } from '../../services/db/partnerSponsorshipDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const GlobalPartnerMarketplacePage: React.FC = () => {
  const partners = partnerSponsorshipDatabase.getPartners();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 w-fit">
            <Handshake className="w-3.5 h-3.5 text-blue-400" /> Global Partner Network
          </span>
          <h1 className="text-3xl font-extrabold text-white">Partner & Sponsorship Marketplace</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Verified corporate sponsors, academic affiliates, and training providers funding campus hackathons, research labs, and student fellowships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map(p => (
            <div key={p.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-blue-400">{p.industry}</p>
                </div>
                <ACEBadge variant="success">{p.tier}</ACEBadge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-800/50 rounded-2xl">
                  <span className="text-slate-400">Active Campaigns:</span>
                  <div className="text-white font-bold text-base mt-1">{p.activeCampaignsCount}</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-2xl">
                  <span className="text-slate-400">Total Sponsored:</span>
                  <div className="text-emerald-400 font-bold text-base font-mono mt-1">{p.totalSponsoredINR}</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800">
                <span className="text-emerald-300 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Verified Institutional Partner
                </span>
                <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold">
                  View Partner Hub
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
