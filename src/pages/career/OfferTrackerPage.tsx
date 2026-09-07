import React, { useState, useEffect } from 'react';
import { interviewAndOfferDatabase, StudentOfferItem } from '../../services/db/interviewAndOfferDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { CheckCircle2, Award, Briefcase } from 'lucide-react';

export function OfferTrackerPage() {
  const [offers, setOffers] = useState<StudentOfferItem[]>([]);

  useEffect(() => {
    setOffers(interviewAndOfferDatabase.getOffers());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Student Offer & Placement Tracker"
          description="Private repository of verified internship and full-time job offers received throughout your college journey."
          badge="OFFER TRACKER"
        />

        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ACEBadge variant="success">{offer.status}</ACEBadge>
                  <ACEBadge variant="neutral">{offer.offerType}</ACEBadge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{offer.companyName}</h3>
                <div className="text-xs text-slate-500">{offer.role} • {offer.location}</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{offer.ctcOrStipend}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic">"{offer.notes}"</p>
              </div>
              <div className="text-xs text-slate-500 self-end md:self-center">
                Joining Date: {new Date(offer.joiningDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
