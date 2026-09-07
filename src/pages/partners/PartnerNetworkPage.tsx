import React from 'react';
import { partnerSponsorshipDatabase } from '../../services/db/partnerSponsorshipDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Handshake, Award, ShieldCheck } from 'lucide-react';

export function PartnerNetworkPage() {
  const partners = partnerSponsorshipDatabase.getPartners();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="ACE Partner & Sponsor Network"
          description="Enterprise sponsors, technology alliances, and academic affiliates supporting campus innovation."
          badge="PARTNER NETWORK"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <ACEBadge variant="success">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {p.tier} PARTNER
                </ACEBadge>
                <span className="text-xs text-slate-500">{p.industry}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">{p.name}</h4>
              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>Total Grants: <strong>{p.totalSponsoredINR}</strong></span>
                <span>Active Campaigns: <strong>{p.activeCampaignsCount}</strong></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
