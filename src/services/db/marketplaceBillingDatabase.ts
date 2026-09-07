export interface MarketplaceProduct {
  id: string;
  title: string;
  category: 'COURSE' | 'WORKSHOP' | 'MENTORSHIP' | 'CAREER_SERVICE';
  provider: string;
  priceINR: number;
  priceCoins: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  targetAudience: 'STUDENT' | 'COLLEGE' | 'RECRUITER';
  priceMonthlyINR: number;
  features: string[];
  limits: {
    maxEventsOrDrives: number;
    maxCandidateSearches: number;
    apiCallsPerDay: number;
  };
}

export const marketplaceBillingDatabase = {
  getProducts(): MarketplaceProduct[] {
    return [
      {
        id: 'prod-1',
        title: '1-on-1 System Design Mock Interview with Principal Architect',
        category: 'MENTORSHIP',
        provider: 'Dr. S. Ramanathan, Vel Tech R&D',
        priceINR: 1500,
        priceCoins: 150000,
        rating: 4.9,
        reviewsCount: 38,
        isVerified: true
      },
      {
        id: 'prod-2',
        title: 'Distributed Systems Capstone Guided Code Review',
        category: 'CAREER_SERVICE',
        provider: 'ACE Engineering Advisory Board',
        priceINR: 1000,
        priceCoins: 100000,
        rating: 4.8,
        reviewsCount: 29,
        isVerified: true
      }
    ];
  },

  getPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'plan-student-free',
        name: 'Student Community Tier',
        targetAudience: 'STUDENT',
        priceMonthlyINR: 0,
        features: ['Digital Student ID', 'Opportunity Graph', 'Event Registrations', 'Standard Portfolio'],
        limits: { maxEventsOrDrives: 100, maxCandidateSearches: 0, apiCallsPerDay: 50 }
      },
      {
        id: 'plan-college-enterprise',
        name: 'Institutional Campus OS',
        targetAudience: 'COLLEGE',
        priceMonthlyINR: 25000,
        features: ['Full Placement Cell OS', 'Department Hierarchy', 'Verified Digital IDs', 'Dedicated SIS API Webhooks'],
        limits: { maxEventsOrDrives: 1000, maxCandidateSearches: 10000, apiCallsPerDay: 50000 }
      }
    ];
  }
};
