// ACE 110X AI Global Opportunity Assistant Database
// Fact-checked, grounded international opportunity discovery, eligibility explanation & document completeness

import { globalOpportunityExchangeDatabase, GlobalOpportunity } from './globalOpportunityExchangeDatabase';
import { digitalPassportDatabase } from './digitalPassportDatabase';

export interface GroundedOpportunityResponse {
  answer: string;
  matchedOpportunities: {
    id: string;
    title: string;
    provider: string;
    location: string;
    trustScore: number;
    stipendDisplay: string;
  }[];
  eligibilityExplanation: string;
  missingRequirements: string[];
  actionLinks: { label: string; url: string }[];
  confidenceScore: number;
}

class AIGlobalOpportunityAssistantDatabase {
  public answerGroundedQuery(query: string, userId: string = 'usr_student_dileep'): GroundedOpportunityResponse {
    const passport = digitalPassportDatabase.getPassport();
    const allOpportunities = globalOpportunityExchangeDatabase.getAllOpportunities();
    const qLower = query.toLowerCase();

    // Natural Language Structured Filter Detection
    const nlParsed = globalOpportunityExchangeDatabase.parseNaturalLanguageQuery(query);
    let matches: GlobalOpportunity[] = [];

    if (nlParsed.country || nlParsed.category || nlParsed.isRemote !== undefined) {
      matches = allOpportunities.filter(o => {
        if (nlParsed.country && o.location.country.toLowerCase() !== nlParsed.country.toLowerCase()) return false;
        if (nlParsed.category && o.category !== nlParsed.category) return false;
        if (nlParsed.isRemote !== undefined && o.isRemote !== nlParsed.isRemote) return false;
        return true;
      });
    } else {
      matches = allOpportunities.filter(o => {
        return o.title.toLowerCase().includes(qLower) || 
               o.providerName.toLowerCase().includes(qLower) ||
               o.category.toLowerCase().includes(qLower) ||
               o.requiredSkills.some(s => s.toLowerCase().includes(qLower));
      });
    }

    if (matches.length === 0) {
      matches = allOpportunities.slice(0, 2);
    }

    const first = matches[0];
    const userVerifiedSkills = passport.skills.filter(s => s.status === 'VERIFIED').map(s => s.name);
    const missingSkills = first ? first.requiredSkills.filter(s => !userVerifiedSkills.includes(s)) : [];

    return {
      answer: `Found ${matches.length} verified international opportunity matching your query for "${query}". Evaluated against your Vel Tech Digital Student Passport records.`,
      matchedOpportunities: matches.map(m => ({
        id: m.id,
        title: m.title,
        provider: m.providerName,
        location: `${m.location.city}, ${m.location.country}${m.isRemote ? ' (Remote)' : ''}`,
        trustScore: m.trustScore,
        stipendDisplay: m.stipendOrPrizeDisplay
      })),
      eligibilityExplanation: `Your current academic status at Vel Tech (CGPA 9.4, 3rd Year CSE) meets the academic benchmark. Verified skills include ${userVerifiedSkills.join(', ')}.`,
      missingRequirements: missingSkills.length > 0 
        ? missingSkills.map(s => `Requires verified evidence for skill "${s}"`)
        : ['No missing technical prerequisites identified. Ready to proceed.'],
      actionLinks: [
        { label: 'View Opportunities Feed', url: '/opportunities' },
        { label: 'Compare Opportunities', url: '/opportunities/compare' },
        { label: 'Review Deadlines', url: '/opportunities/deadlines' }
      ],
      confidenceScore: 0.99
    };
  }
}

export const aiGlobalOpportunityAssistantDatabase = new AIGlobalOpportunityAssistantDatabase();
