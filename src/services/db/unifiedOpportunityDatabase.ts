// ACE 20X Unified Opportunity Database
// Universal lifecycle: DRAFT -> AI_SCREENING -> REVIEW -> VERIFIED -> PUBLISHED -> OPEN -> CLOSED -> ARCHIVED

export type OpportunityCategory = 
  | 'EVENT'
  | 'COMPETITION'
  | 'INTERNSHIP'
  | 'JOB'
  | 'SCHOLARSHIP'
  | 'COURSE'
  | 'WORKSHOP'
  | 'HACKATHON'
  | 'FELLOWSHIP'
  | 'VOLUNTEER'
  | 'PROJECT'
  | 'MENTORSHIP';

export type OpportunityLifecycleStatus = 
  | 'DRAFT'
  | 'AI_SCREENING'
  | 'REVIEW'
  | 'VERIFIED'
  | 'PUBLISHED'
  | 'OPEN'
  | 'CLOSED'
  | 'ARCHIVED';

export interface UnifiedOpportunity {
  id: string;
  type: OpportunityCategory;
  title: string;
  description: string;
  providerName: string;
  providerLogoUrl: string;
  location: string;
  isRemote: boolean;
  eligibility: string;
  requiredSkills: string[];
  deadline: string;
  startDate?: string;
  stipendOrPrize?: string;
  lifecycleStatus: OpportunityLifecycleStatus;
  trustScore: number;
  aiScreeningFlags?: string[];
  matchExplanation?: string;
  createdAt: string;
  updatedAt: string;
}

class UnifiedOpportunityDatabase {
  private opportunities: Map<string, UnifiedOpportunity> = new Map();

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const initialList: UnifiedOpportunity[] = [
      {
        id: 'opp_ai_fellow_2026',
        type: 'FELLOWSHIP',
        title: 'Autonomous AI Agents Research Fellow',
        description: 'Collaborate with industry principal scientists to design next-gen multi-agent orchestrators with verifiable audit logs.',
        providerName: 'Google Cloud Labs',
        providerLogoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Chennai, India',
        isRemote: true,
        eligibility: 'B.Tech / M.Tech in CSE, AI/ML, ECE with verified Level 5+ GitHub projects',
        requiredSkills: ['React & TypeScript', 'Autonomous AI Agents', 'Python'],
        deadline: '2026-04-30T23:59:59Z',
        stipendOrPrize: '₹1,50,000 / month',
        lifecycleStatus: 'PUBLISHED',
        trustScore: 99,
        matchExplanation: 'Recommended because you are in 3rd Year CSE at Vel Tech with Level 7 verified TypeScript and Autonomous Agent repos.',
        createdAt: '2026-03-01T00:00:00Z',
        updatedAt: '2026-03-01T00:00:00Z'
      },
      {
        id: 'opp_nat_hackathon_2026',
        type: 'HACKATHON',
        title: 'National AI & Autonomous Robotics Hackathon 2026',
        description: 'Build edge perception and SLAM systems for disaster search and rescue drones.',
        providerName: 'Vel Tech University & IITM CFI',
        providerLogoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&auto=format&fit=crop&q=80',
        location: 'Avadi, Chennai',
        isRemote: false,
        eligibility: 'All verified engineering undergraduates in India',
        requiredSkills: ['ROS2', 'TypeScript', 'Computer Vision'],
        deadline: '2026-03-25T18:00:00Z',
        stipendOrPrize: '₹1,00,000 Prize Pool',
        lifecycleStatus: 'PUBLISHED',
        trustScore: 98,
        matchExplanation: 'Recommended because you have active robotics projects and faculty mentor endorsement.',
        createdAt: '2026-02-15T00:00:00Z',
        updatedAt: '2026-02-15T00:00:00Z'
      },
      {
        id: 'opp_fullstack_sde_2026',
        type: 'JOB',
        title: 'Junior Software Development Engineer (Campus 2026)',
        description: 'Develop high-performance frontends and distributed transactional backends.',
        providerName: 'Cognizant NextGen Labs',
        providerLogoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
        location: 'Chennai / Hyderabad',
        isRemote: false,
        eligibility: 'Graduating Class of 2026 with CGPA >= 8.0',
        requiredSkills: ['React & TypeScript', 'Node.js', 'PostgreSQL'],
        deadline: '2026-05-15T23:59:59Z',
        stipendOrPrize: '₹12,00,000 / annum',
        lifecycleStatus: 'PUBLISHED',
        trustScore: 96,
        matchExplanation: 'Matches your current CGPA of 9.4 and verified full-stack credential certificates.',
        createdAt: '2026-03-05T00:00:00Z',
        updatedAt: '2026-03-05T00:00:00Z'
      }
    ];

    initialList.forEach(o => this.opportunities.set(o.id, o));
  }

  public getAll(): UnifiedOpportunity[] {
    return Array.from(this.opportunities.values());
  }

  public getById(id: string): UnifiedOpportunity | null {
    return this.opportunities.get(id) || null;
  }

  public createOpportunity(opp: Omit<UnifiedOpportunity, 'id' | 'createdAt' | 'updatedAt'>): UnifiedOpportunity {
    const id = `opp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newOpp: UnifiedOpportunity = {
      ...opp,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.opportunities.set(id, newOpp);
    return newOpp;
  }
}

export const unifiedOpportunityDb = new UnifiedOpportunityDatabase();
