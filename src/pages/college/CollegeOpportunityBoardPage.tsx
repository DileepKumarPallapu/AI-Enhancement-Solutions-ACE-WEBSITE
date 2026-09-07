import React from 'react';
import { collegeOpportunitiesDatabase } from '../../services/db/collegeOpportunitiesDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShieldCheck, School, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CollegeOpportunityBoardPage() {
  const opps = collegeOpportunitiesDatabase.getCollegeOpportunities();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="College Opportunity Board"
          description="Verified fellowships, research grants, hackathon nominations, and scholarships endorsed directly by Vel Tech Rangarajan Dr. Sagunthala R&D Institute."
          badge="INSTITUTIONAL CURATION"
        />

        <div className="space-y-4">
          {opps.map((opp) => (
            <div key={opp.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <ACEBadge variant="success">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> College Endorsed
                  </ACEBadge>
                  <ACEBadge variant="primary">{opp.category}</ACEBadge>
                  <span className="text-xs text-slate-500">Curated by: {opp.curatedBy}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{opp.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{opp.description}</p>
                <div className="text-xs text-slate-500 font-medium">
                  <strong>Eligibility:</strong> {opp.eligibility}
                </div>
              </div>
              <div className="flex flex-col justify-between items-end shrink-0">
                <span className="text-xs text-slate-500">
                  Deadline: {new Date(opp.deadline).toLocaleDateString()}
                </span>
                <Link to={opp.link}>
                  <ACEButton variant="primary" size="sm">
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                  </ACEButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
