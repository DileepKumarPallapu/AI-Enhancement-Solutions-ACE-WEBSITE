// ACE Opportunity Intelligence & Multi-Entity Aggregator Database
// Normalizes and scores Events, Hackathons, Competitions, Internships, Jobs, Scholarships, Courses, and Research

export type OpportunityCategory = 
  | 'HACKATHON'
  | 'COMPETITION'
  | 'INTERNSHIP'
  | 'JOB'
  | 'SCHOLARSHIP'
  | 'COURSE'
  | 'WORKSHOP'
  | 'MENTORSHIP'
  | 'RESEARCH_PROJECT';

export type OpportunityMode = 'ONLINE' | 'OFFLINE' | 'HYBRID';

export interface OpportunityMatchBreakdown {
  score: number; // 0 - 100 calculated
  reasons: string[];
  missingSkills: string[];
  mentorEndorsed: boolean;
  mentorName?: string;
}

export interface UnifiedOpportunity {
  id: string;
  title: string;
  slug: string;
  category: OpportunityCategory;
  organizerName: string;
  organizerLogoUrl: string;
  institutionId?: string;
  institutionName?: string;
  mode: OpportunityMode;
  location: string;
  startDate: string;
  deadline: string;
  isFree: boolean;
  feeAmount?: string;
  prizePool?: string;
  providesCertificate: boolean;
  eligibleDepartments: string[];
  eligibleYears: string[];
  requiredSkills: string[];
  targetCareers: string[];
  shortDescription: string;
  fullDescription: string;
  rules?: string[];
  timeline?: { phase: string; date: string }[];
  applyUrl?: string;
  isOfficialVerified: boolean;
  recommendedByMentorName?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'ace_db_unified_opportunities_v1';

class OpportunityDatabase {
  private opportunities: Map<string, UnifiedOpportunity> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.opportunities.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as UnifiedOpportunity[];
          items.forEach(item => this.opportunities.set(item.id, item));
        }
      }
    } catch {
      // Fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.opportunities.values())));
      }
    } catch {
      // Fallback
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedInitial() {
    const defaultOpportunities: UnifiedOpportunity[] = [
      {
        id: 'opp_hack_001',
        title: 'National AI & Autonomous Robotics Hackathon 2026',
        slug: 'national-ai-robotics-hackathon-2026',
        category: 'HACKATHON',
        organizerName: 'IIT Madras Center for Innovation',
        organizerLogoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=120',
        institutionId: 'inst-iit-madras-chennai',
        institutionName: 'IIT Madras',
        mode: 'HYBRID',
        location: 'IIT Madras Research Park, Chennai',
        startDate: '2026-03-25T09:00:00.000Z',
        deadline: '2026-03-18T23:59:59.000Z',
        isFree: true,
        prizePool: '₹5,00,000 Cash + Cloud Credits',
        providesCertificate: true,
        eligibleDepartments: ['Computer Science & Engineering', 'Artificial Intelligence & Data Science', 'Electronics & Communication'],
        eligibleYears: ['2nd Year', '3rd Year', '4th Year'],
        requiredSkills: ['React & TypeScript', 'Autonomous AI Agents', 'Python', 'ROS2'],
        targetCareers: ['AI Systems Engineer', 'Full-Stack Developer', 'Robotics Researcher'],
        shortDescription: 'Build next-gen multimodal agents and autonomous ground drone perception systems.',
        fullDescription: 'Join 500+ top collegiate developers across India for 36 hours of high-stakes hacking on autonomous systems, drone perception, and multi-agent coordination.',
        rules: [
          'Teams must consist of 2-4 members with at least 1 verified student ID.',
          'All code written must be original and open-sourced during judging.',
          'Mentors from Google and IIT Madras will review milestone progress.'
        ],
        timeline: [
          { phase: 'Registration Closes', date: '2026-03-18' },
          { phase: 'Problem Statement Release', date: '2026-03-22' },
          { phase: 'Grand Finale Hackathon', date: '2026-03-25' }
        ],
        isOfficialVerified: true,
        recommendedByMentorName: 'Dr. K. Senthilkumar',
        createdAt: '2026-03-01T00:00:00.000Z',
        updatedAt: '2026-03-01T00:00:00.000Z'
      },
      {
        id: 'opp_job_002',
        title: 'AI Systems Software Engineer Intern',
        slug: 'ai-systems-software-engineer-intern',
        category: 'INTERNSHIP',
        organizerName: 'Anthropic / Scale AI Partner Network',
        organizerLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
        mode: 'HYBRID',
        location: 'Bengaluru / Remote',
        startDate: '2026-05-01T00:00:00.000Z',
        deadline: '2026-03-28T23:59:59.000Z',
        isFree: true,
        feeAmount: '₹75,000 / month Stipend',
        providesCertificate: true,
        eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
        eligibleYears: ['3rd Year', '4th Year'],
        requiredSkills: ['React & TypeScript', 'Autonomous AI Agents', 'Python', 'Docker'],
        targetCareers: ['AI Systems Engineer'],
        shortDescription: 'Design and deploy state-of-the-art agentic evaluation harnesses and realtime browser assistants.',
        fullDescription: 'Direct 6-month paid internship with top AI labs working on distributed inference systems and agent tool-use orchestration.',
        isOfficialVerified: true,
        recommendedByMentorName: 'Dr. K. Senthilkumar',
        createdAt: '2026-03-02T00:00:00.000Z',
        updatedAt: '2026-03-02T00:00:00.000Z'
      },
      {
        id: 'opp_comp_003',
        title: 'Smart India Hackathon 2026 - Hardware & Software Edition',
        slug: 'smart-india-hackathon-2026',
        category: 'COMPETITION',
        organizerName: 'Ministry of Education Innovation Cell (MIC)',
        organizerLogoUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=120',
        mode: 'OFFLINE',
        location: 'Nodal Centers Nationwide (Vel Tech Internal Evaluation)',
        startDate: '2026-04-10T00:00:00.000Z',
        deadline: '2026-03-15T23:59:59.000Z',
        isFree: true,
        prizePool: '₹1,00,000 per Problem Statement',
        providesCertificate: true,
        eligibleDepartments: ['Computer Science & Engineering', 'Electronics & Communication', 'Mechanical Engineering'],
        eligibleYears: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
        requiredSkills: ['Algorithms & Data Structures', 'Autonomous AI Agents', 'Cloud Native & Docker'],
        targetCareers: ['Full-Stack Developer', 'AI Systems Engineer'],
        shortDescription: 'India largest nation-building innovation competition across ministries and industries.',
        fullDescription: 'Official SIH 2026 problem statements solving challenges for government ministries, railways, and smart city infrastructure.',
        isOfficialVerified: true,
        recommendedByMentorName: 'Prof. R. Jayasree',
        createdAt: '2026-03-01T00:00:00.000Z',
        updatedAt: '2026-03-01T00:00:00.000Z'
      },
      {
        id: 'opp_crs_004',
        title: 'Zero to Production Distributed Kubernetes Masterclass',
        slug: 'distributed-kubernetes-masterclass',
        category: 'COURSE',
        organizerName: 'ACE Cloud Native Academy',
        organizerLogoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120',
        mode: 'ONLINE',
        location: 'Self-Paced Virtual Lab',
        startDate: '2026-03-10T00:00:00.000Z',
        deadline: '2026-04-30T23:59:59.000Z',
        isFree: true,
        providesCertificate: true,
        eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
        eligibleYears: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
        requiredSkills: ['Cloud Native & Docker'],
        targetCareers: ['DevOps Engineer', 'Cloud Architect'],
        shortDescription: 'Master microservice orchestration, ingress routing, and auto-scaling clusters with real hands-on pods.',
        fullDescription: 'Comprehensive hands-on curriculum with 12 interactive coding labs, CI/CD pipelines, and verified certificate of completion on ACE.',
        isOfficialVerified: true,
        createdAt: '2026-03-01T00:00:00.000Z',
        updatedAt: '2026-03-01T00:00:00.000Z'
      }
    ];

    defaultOpportunities.forEach(opp => this.opportunities.set(opp.id, opp));
    this.saveToStorage();
  }

  public getAll(): UnifiedOpportunity[] {
    return Array.from(this.opportunities.values());
  }

  public getById(id: string): UnifiedOpportunity | null {
    return this.opportunities.get(id) || null;
  }

  public calculateMatch(opp: UnifiedOpportunity, student: {
    institutionId: string;
    department: string;
    year: string;
    skills: string[];
    targetCareer: string;
    interests: string[];
  }): OpportunityMatchBreakdown {
    const reasons: string[] = [];
    let score = 50;

    // 1. Institution / Eligibility Check
    const deptMatch = opp.eligibleDepartments.some(d => 
      student.department.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(student.department.toLowerCase())
    );
    if (deptMatch) {
      score += 15;
      reasons.push(`Your ${student.department} department is eligible`);
    }

    // 2. Career Alignment
    const careerMatch = opp.targetCareers.some(c => 
      c.toLowerCase().includes(student.targetCareer.toLowerCase()) || student.targetCareer.toLowerCase().includes(c.toLowerCase())
    );
    if (careerMatch) {
      score += 15;
      reasons.push(`Directly matches your target career: ${student.targetCareer}`);
    }

    // 3. Skill Overlap & Missing Skills
    const missingSkills: string[] = [];
    let matchedSkillsCount = 0;

    opp.requiredSkills.forEach(req => {
      const hasSkill = student.skills.some(s => s.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(s.toLowerCase()));
      if (hasSkill) {
        matchedSkillsCount += 1;
      } else {
        missingSkills.push(req);
      }
    });

    if (matchedSkillsCount > 0) {
      score += Math.min(15, matchedSkillsCount * 5);
      reasons.push(`Matches ${matchedSkillsCount} of your verified skills`);
    }

    // 4. Mentor Recommendation
    let mentorEndorsed = false;
    if (opp.recommendedByMentorName) {
      score += 10;
      mentorEndorsed = true;
      reasons.push(`Recommended by faculty mentor ${opp.recommendedByMentorName}`);
    }

    return {
      score: Math.min(100, Math.max(10, score)),
      reasons,
      missingSkills,
      mentorEndorsed,
      mentorName: opp.recommendedByMentorName
    };
  }
}

export const opportunityDb = new OpportunityDatabase();
