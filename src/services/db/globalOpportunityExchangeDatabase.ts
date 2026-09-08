// ACE 110X Global Opportunity Exchange Database
// Canonical Location Hierarchy, Taxonomy, Ingestion, Deduplication, Search & Comparison

export type GlobalOpportunityCategory = 
  | 'EVENT'
  | 'COMPETITION'
  | 'HACKATHON'
  | 'INTERNSHIP'
  | 'JOB'
  | 'SCHOLARSHIP'
  | 'FELLOWSHIP'
  | 'COURSE'
  | 'WORKSHOP'
  | 'RESEARCH'
  | 'PROJECT'
  | 'MENTORSHIP'
  | 'VOLUNTEERING'
  | 'CAMPUS_PROGRAM'
  | 'GRANT';

export type OpportunitySourceType = 
  | 'OFFICIAL_ACE'
  | 'PARTNER'
  | 'INSTITUTION'
  | 'COMPANY'
  | 'ORGANIZER'
  | 'PROVIDER'
  | 'IMPORTED_VERIFIED';

export type OpportunityVerificationStatus = 
  | 'VERIFIED'
  | 'PARTNER_VERIFIED'
  | 'PENDING'
  | 'UNVERIFIED'
  | 'FLAGGED'
  | 'EXPIRED'
  | 'REMOVED';

export type DeadlineTimeBucket = 'TODAY' | 'TOMORROW' | 'THIS_WEEK' | 'NEXT_WEEK' | 'LATER' | 'OVERDUE';

export interface GlobalLocation {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  timezone: string;
  isRemoteFriendly: boolean;
}

export interface UserGlobalPreferences {
  country: string;
  region: string;
  city: string;
  timezone: string;
  currency: string;
  language: 'en' | 'hi' | 'ta' | 'te';
  relocationInterest: boolean;
  remotePreference: boolean;
}

export interface GlobalOpportunity {
  id: string;
  title: string;
  slug: string;
  category: GlobalOpportunityCategory;
  providerName: string;
  providerType: 'COLLEGE' | 'COMPANY' | 'ORGANIZER' | 'PROVIDER' | 'RESEARCH_LAB' | 'NGO';
  providerLogoUrl: string;
  location: GlobalLocation;
  isRemote: boolean;
  eligibility: string;
  requiredSkills: string[];
  targetDepartments: string[];
  minExperienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  deadline: string;
  startDate?: string;
  stipendOrPrizeINR: number; // 0 for free / uncompensated
  stipendOrPrizeDisplay: string;
  isPaid: boolean;
  sourceType: OpportunitySourceType;
  sourceUrl?: string;
  verificationStatus: OpportunityVerificationStatus;
  trustScore: number;
  lastVerifiedAt: string;
  matchScore?: number;
  matchReasons?: string[];
  externalFingerprint?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedOpportunitySearch {
  id: string;
  userId: string;
  query: string;
  filters: {
    category?: GlobalOpportunityCategory;
    country?: string;
    city?: string;
    isRemote?: boolean;
    skills?: string[];
  };
  alertsEnabled: boolean;
  createdAt: string;
}

export interface OpportunityScamReport {
  id: string;
  opportunityId: string;
  reporterUserId: string;
  reason: 'FAKE' | 'SCAM' | 'EXPIRED' | 'DUPLICATE' | 'MISLEADING' | 'WRONG_ELIGIBILITY';
  details: string;
  status: 'NEW' | 'INVESTIGATING' | 'ACTIONED' | 'DISMISSED';
  createdAt: string;
}

class GlobalOpportunityExchangeDatabase {
  private opportunities: Map<string, GlobalOpportunity> = new Map();
  private userPreferences: Map<string, UserGlobalPreferences> = new Map();
  private savedSearches: Map<string, SavedOpportunitySearch> = new Map();
  private reports: Map<string, OpportunityScamReport> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.seedDefaultData();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedDefaultData() {
    this.userPreferences.set('usr_student_dileep', {
      country: 'India',
      region: 'Tamil Nadu',
      city: 'Chennai',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      language: 'en',
      relocationInterest: true,
      remotePreference: true
    });

    const initial: GlobalOpportunity[] = [
      {
        id: 'opp_glob_fellow_01',
        title: 'Autonomous AI Agents Research Fellow',
        slug: 'autonomous-ai-agents-research-fellow',
        category: 'FELLOWSHIP',
        providerName: 'Google Cloud Research Labs',
        providerType: 'COMPANY',
        providerLogoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
        location: {
          country: 'India',
          countryCode: 'IN',
          region: 'Karnataka',
          city: 'Bengaluru',
          timezone: 'Asia/Kolkata',
          isRemoteFriendly: true
        },
        isRemote: true,
        eligibility: 'B.Tech / M.Tech in CSE/AI with verified Git repositories and Level 5+ skill rank',
        requiredSkills: ['React & TypeScript', 'Autonomous AI Agents', 'Python'],
        targetDepartments: ['Computer Science and Engineering', 'Artificial Intelligence & Data Science'],
        minExperienceLevel: 'INTERMEDIATE',
        deadline: '2026-04-30T23:59:59Z',
        startDate: '2026-06-01T09:00:00Z',
        stipendOrPrizeINR: 150000,
        stipendOrPrizeDisplay: '₹1,50,000 / month',
        isPaid: true,
        sourceType: 'PARTNER',
        sourceUrl: 'https://cloud.google.com/research',
        verificationStatus: 'PARTNER_VERIFIED',
        trustScore: 99,
        lastVerifiedAt: '2026-03-08T00:00:00Z',
        matchScore: 98,
        matchReasons: ['Matches your Level 7 verified TypeScript skills', 'Vel Tech CSE student synergy'],
        createdAt: '2026-03-01T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'opp_glob_hackathon_02',
        title: 'National Autonomous Robotics & SLAM Hackathon',
        slug: 'national-autonomous-robotics-hackathon',
        category: 'HACKATHON',
        providerName: 'Vel Tech R&D Institute & IITM CFI',
        providerType: 'RESEARCH_LAB',
        providerLogoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&auto=format&fit=crop&q=80',
        location: {
          country: 'India',
          countryCode: 'IN',
          region: 'Tamil Nadu',
          city: 'Chennai',
          timezone: 'Asia/Kolkata',
          isRemoteFriendly: false
        },
        isRemote: false,
        eligibility: 'All verified undergraduate students from accredited universities',
        requiredSkills: ['ROS2', 'TypeScript', 'Computer Vision'],
        targetDepartments: ['Computer Science and Engineering', 'Mechanical Engineering', 'ECE'],
        minExperienceLevel: 'ALL_LEVELS',
        deadline: '2026-03-25T18:00:00Z',
        startDate: '2026-04-05T09:00:00Z',
        stipendOrPrizeINR: 100000,
        stipendOrPrizeDisplay: '₹1,00,000 Prize Pool',
        isPaid: true,
        sourceType: 'INSTITUTION',
        verificationStatus: 'VERIFIED',
        lastVerifiedAt: '2026-03-08T00:00:00Z',
        trustScore: 98,
        matchScore: 95,
        matchReasons: ['Assigned mentor Dr. Aravind Swaminathan is reviewing submissions'],
        createdAt: '2026-02-15T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'opp_glob_research_03',
        title: 'Distributed Neural Acceleration Lab Visiting Scholar',
        slug: 'distributed-neural-acceleration-visiting-scholar',
        category: 'RESEARCH',
        providerName: 'Vector Institute & University of Toronto',
        providerType: 'RESEARCH_LAB',
        providerLogoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
        location: {
          country: 'Canada',
          countryCode: 'CA',
          region: 'Ontario',
          city: 'Toronto',
          timezone: 'America/Toronto',
          isRemoteFriendly: true
        },
        isRemote: true,
        eligibility: 'Undergraduates with demonstrated peer-reviewed research or open-source neural engine contributions',
        requiredSkills: ['CUDA', 'Python', 'Distributed Systems'],
        targetDepartments: ['Computer Science and Engineering', 'Information Technology'],
        minExperienceLevel: 'ADVANCED',
        deadline: '2026-05-10T23:59:59Z',
        stipendOrPrizeINR: 220000,
        stipendOrPrizeDisplay: '$3,500 CAD / month (≈ ₹2,20,000)',
        isPaid: true,
        sourceType: 'IMPORTED_VERIFIED',
        sourceUrl: 'https://vectorinstitute.ai/programs',
        verificationStatus: 'VERIFIED',
        trustScore: 96,
        lastVerifiedAt: '2026-03-08T00:00:00Z',
        matchScore: 91,
        matchReasons: ['International research fellowship open to Indian students'],
        createdAt: '2026-03-04T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'opp_glob_scholarship_04',
        title: 'Global STEM Scholars Leadership Grant 2026',
        slug: 'global-stem-scholars-leadership-grant',
        category: 'SCHOLARSHIP',
        providerName: 'DAAD & Indo-German Science Foundation',
        providerType: 'COLLEGE',
        providerLogoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80',
        location: {
          country: 'Germany',
          countryCode: 'DE',
          region: 'Berlin',
          city: 'Berlin',
          timezone: 'Europe/Berlin',
          isRemoteFriendly: false
        },
        isRemote: false,
        eligibility: 'Pre-final or Final year B.Tech students with CGPA >= 8.5 and leadership project proof',
        requiredSkills: ['Research Methodology', 'Software Engineering'],
        targetDepartments: ['Computer Science and Engineering', 'ECE', 'Mechanical Engineering'],
        minExperienceLevel: 'ALL_LEVELS',
        deadline: '2026-06-15T23:59:59Z',
        stipendOrPrizeINR: 500000,
        stipendOrPrizeDisplay: '€5,500 Grant (≈ ₹5,00,000)',
        isPaid: true,
        sourceType: 'PARTNER',
        sourceUrl: 'https://www.daad.de',
        verificationStatus: 'VERIFIED',
        trustScore: 99,
        lastVerifiedAt: '2026-03-08T00:00:00Z',
        matchScore: 94,
        matchReasons: ['Your Vel Tech CGPA of 9.4 exceeds the 8.5 requirement'],
        createdAt: '2026-03-02T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'opp_glob_volunteering_05',
        title: 'Tech for Rural Literacy & Code Mentorship Campaign',
        slug: 'tech-for-rural-literacy-code-mentorship',
        category: 'VOLUNTEERING',
        providerName: 'Teach for India & Vel Tech Outreach Cell',
        providerType: 'NGO',
        providerLogoUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&auto=format&fit=crop&q=80',
        location: {
          country: 'India',
          countryCode: 'IN',
          region: 'Tamil Nadu',
          city: 'Chennai',
          timezone: 'Asia/Kolkata',
          isRemoteFriendly: true
        },
        isRemote: true,
        eligibility: 'Passionate engineering students eager to mentor school students in basic algorithms',
        requiredSkills: ['Python Basics', 'Communication', 'Mentorship'],
        targetDepartments: ['All Departments'],
        minExperienceLevel: 'BEGINNER',
        deadline: '2026-04-15T18:00:00Z',
        stipendOrPrizeINR: 0,
        stipendOrPrizeDisplay: 'Verified Passport Community Impact Badge + Certificate',
        isPaid: false,
        sourceType: 'OFFICIAL_ACE',
        verificationStatus: 'VERIFIED',
        trustScore: 97,
        lastVerifiedAt: '2026-03-08T00:00:00Z',
        matchScore: 88,
        matchReasons: ['Adds verified social impact evidence to your Digital Passport'],
        createdAt: '2026-03-05T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      }
    ];

    initial.forEach(o => this.opportunities.set(o.id, o));
  }

  public getAllOpportunities(): GlobalOpportunity[] {
    return Array.from(this.opportunities.values());
  }

  public getOpportunityById(id: string): GlobalOpportunity | null {
    return this.opportunities.get(id) || null;
  }

  public getUserPreferences(userId: string = 'usr_student_dileep'): UserGlobalPreferences {
    return this.userPreferences.get(userId) || {
      country: 'India',
      region: 'Tamil Nadu',
      city: 'Chennai',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      language: 'en',
      relocationInterest: true,
      remotePreference: true
    };
  }

  public updateUserPreferences(userId: string, prefs: Partial<UserGlobalPreferences>): UserGlobalPreferences {
    const current = this.getUserPreferences(userId);
    const updated = { ...current, ...prefs };
    this.userPreferences.set(userId, updated);
    this.notify();
    return updated;
  }

  public parseNaturalLanguageQuery(nlQuery: string): {
    extractedKeywords: string;
    category?: GlobalOpportunityCategory;
    country?: string;
    isRemote?: boolean;
    requiredSkills?: string[];
  } {
    const q = nlQuery.toLowerCase();
    let category: GlobalOpportunityCategory | undefined;
    let country: string | undefined;
    let isRemote: boolean | undefined;
    const skills: string[] = [];

    if (q.includes('internship') || q.includes('intern')) category = 'INTERNSHIP';
    else if (q.includes('fellowship') || q.includes('fellow')) category = 'FELLOWSHIP';
    else if (q.includes('hackathon')) category = 'HACKATHON';
    else if (q.includes('scholarship')) category = 'SCHOLARSHIP';
    else if (q.includes('research')) category = 'RESEARCH';
    else if (q.includes('volunteer')) category = 'VOLUNTEERING';
    else if (q.includes('job') || q.includes('sde') || q.includes('developer')) category = 'JOB';

    if (q.includes('canada')) country = 'Canada';
    else if (q.includes('india')) country = 'India';
    else if (q.includes('germany') || q.includes('europe')) country = 'Germany';
    else if (q.includes('usa') || q.includes('united states')) country = 'United States';
    else if (q.includes('uk') || q.includes('london')) country = 'United Kingdom';

    if (q.includes('remote') || q.includes('work from home')) isRemote = true;

    if (q.includes('ai') || q.includes('machine learning')) skills.push('Autonomous AI Agents');
    if (q.includes('react') || q.includes('typescript')) skills.push('React & TypeScript');
    if (q.includes('robotics') || q.includes('ros')) skills.push('ROS2');

    return {
      extractedKeywords: nlQuery,
      category,
      country,
      isRemote,
      requiredSkills: skills.length > 0 ? skills : undefined
    };
  }

  public searchOpportunities(params: {
    query?: string;
    category?: GlobalOpportunityCategory | 'ALL';
    country?: string;
    isRemote?: boolean;
    verificationStatus?: OpportunityVerificationStatus;
  }): GlobalOpportunity[] {
    const all = this.getAllOpportunities();
    return all.filter(item => {
      if (params.category && params.category !== 'ALL' && item.category !== params.category) return false;
      if (params.country && item.location.country.toLowerCase() !== params.country.toLowerCase()) return false;
      if (params.isRemote !== undefined && item.isRemote !== params.isRemote) return false;
      if (params.verificationStatus && item.verificationStatus !== params.verificationStatus) return false;
      if (params.query) {
        const q = params.query.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesProvider = item.providerName.toLowerCase().includes(q);
        const matchesSkills = item.requiredSkills.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesProvider && !matchesSkills) return false;
      }
      return true;
    });
  }

  public getDeadlinesByBucket(): Record<DeadlineTimeBucket, GlobalOpportunity[]> {
    const now = new Date();
    const buckets: Record<DeadlineTimeBucket, GlobalOpportunity[]> = {
      TODAY: [],
      TOMORROW: [],
      THIS_WEEK: [],
      NEXT_WEEK: [],
      LATER: [],
      OVERDUE: []
    };

    const all = this.getAllOpportunities();
    all.forEach(item => {
      const d = new Date(item.deadline);
      const diffHours = (d.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (diffHours < 0) {
        buckets.OVERDUE.push(item);
      } else if (diffHours <= 24) {
        buckets.TODAY.push(item);
      } else if (diffHours <= 48) {
        buckets.TOMORROW.push(item);
      } else if (diffHours <= 168) {
        buckets.THIS_WEEK.push(item);
      } else if (diffHours <= 336) {
        buckets.NEXT_WEEK.push(item);
      } else {
        buckets.LATER.push(item);
      }
    });

    return buckets;
  }

  public compareOpportunities(ids: string[]): GlobalOpportunity[] {
    return ids.map(id => this.opportunities.get(id)).filter(Boolean) as GlobalOpportunity[];
  }

  public ingestOpportunity(opp: Omit<GlobalOpportunity, 'id' | 'createdAt' | 'updatedAt'>): {
    success: boolean;
    opportunity?: GlobalOpportunity;
    isDuplicate: boolean;
    duplicateOfId?: string;
  } {
    // Duplicate Detection Pipeline
    const normalizedTitle = opp.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const all = this.getAllOpportunities();
    for (const existing of all) {
      const existingTitle = existing.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const sameOrg = existing.providerName.toLowerCase() === opp.providerName.toLowerCase();
      const sameDate = existing.deadline.slice(0, 10) === opp.deadline.slice(0, 10);
      if ((sameOrg && (normalizedTitle === existingTitle || sameDate)) || (opp.sourceUrl && existing.sourceUrl === opp.sourceUrl)) {
        return {
          success: false,
          isDuplicate: true,
          duplicateOfId: existing.id
        };
      }
    }

    const id = `opp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newOpp: GlobalOpportunity = {
      ...opp,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.opportunities.set(id, newOpp);
    this.notify();
    return { success: true, opportunity: newOpp, isDuplicate: false };
  }

  public submitScamReport(opportunityId: string, reason: OpportunityScamReport['reason'], details: string, reporterUserId: string = 'usr_student_dileep'): OpportunityScamReport {
    const report: OpportunityScamReport = {
      id: `rep_scam_${Date.now()}`,
      opportunityId,
      reporterUserId,
      reason,
      details,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    this.reports.set(report.id, report);
    this.notify();
    return report;
  }

  public getAllScamReports(): OpportunityScamReport[] {
    return Array.from(this.reports.values());
  }

  public saveSearch(userId: string, query: string, filters: SavedOpportunitySearch['filters']): SavedOpportunitySearch {
    const s: SavedOpportunitySearch = {
      id: `saved_search_${Date.now()}`,
      userId,
      query,
      filters,
      alertsEnabled: true,
      createdAt: new Date().toISOString()
    };
    this.savedSearches.set(s.id, s);
    this.notify();
    return s;
  }

  public getSavedSearches(userId: string = 'usr_student_dileep'): SavedOpportunitySearch[] {
    return Array.from(this.savedSearches.values()).filter(s => s.userId === userId);
  }

  public deleteSavedSearch(id: string): boolean {
    const res = this.savedSearches.delete(id);
    if (res) this.notify();
    return res;
  }
}

export const globalOpportunityExchangeDatabase = new GlobalOpportunityExchangeDatabase();
