import { getCanonicalStudent } from './canonicalDataArchitecture';

export interface StudentCareerProfile {
  userId: string;
  careerGoal: string;
  targetRoles: string[];
  preferredIndustries: string[];
  preferredLocations: string[];
  remotePreference: 'REMOTE_ONLY' | 'HYBRID' | 'ONSITE' | 'FLEXIBLE';
  skills: string[];
  learningGoals: string[];
  salaryExpectationsINR: string;
  availability: 'IMMEDIATE' | 'WITHIN_1_MONTH' | 'WITHIN_3_MONTHS' | 'GRADUATION_2027';
  internshipPreference: boolean;
  jobPreference: boolean;
  updatedAt: string;
}

export interface CareerReadinessScorecard {
  category: 'RESUME' | 'PORTFOLIO' | 'SKILLS' | 'PROJECTS' | 'CERTIFICATES' | 'EXPERIENCE' | 'APPLICATIONS' | 'INTERVIEW_PREP';
  title: string;
  status: 'COMPLETE' | 'NEEDS_IMPROVEMENT' | 'INCOMPLETE';
  evidenceCount: number;
  evidenceDetails: string[];
  actionRequired?: string;
  actionLink?: string;
}

const STORAGE_KEY = 'ace_60x_student_career_profile';

export const studentCareerProfileDatabase = {
  getProfile(userId?: string): StudentCareerProfile {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    const student = getCanonicalStudent();
    const defaults: StudentCareerProfile = {
      userId: student.id,
      careerGoal: 'Become a Senior Full Stack & Cloud Platform Engineer building scalable distributed systems in India & globally.',
      targetRoles: ['Full Stack Developer', 'Cloud & DevOps Engineer', 'AI / ML Engineer'],
      preferredIndustries: ['Enterprise SaaS', 'Cloud Infrastructure', 'Artificial Intelligence', 'Fintech'],
      preferredLocations: ['Chennai', 'Bengaluru', 'Hyderabad', 'Remote'],
      remotePreference: 'HYBRID',
      skills: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes'],
      learningGoals: ['Distributed Systems Architecture', 'Kubernetes Multi-Cluster Management', 'LLM Agent Orchestration'],
      salaryExpectationsINR: '₹12L - ₹20L / annum',
      availability: 'IMMEDIATE',
      internshipPreference: true,
      jobPreference: true,
      updatedAt: new Date().toISOString()
    };
    this.saveProfile(defaults);
    return defaults;
  },

  saveProfile(profile: StudentCareerProfile): StudentCareerProfile {
    try {
      profile.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {}
    return profile;
  },

  getEvidenceBasedReadiness(): CareerReadinessScorecard[] {
    const student = getCanonicalStudent();
    return [
      {
        category: 'RESUME',
        title: 'Verified Technical Resume',
        status: 'COMPLETE',
        evidenceCount: 1,
        evidenceDetails: ['Standard ATS-optimized resume generated with cryptographic verification link']
      },
      {
        category: 'PORTFOLIO',
        title: 'Live Engineering Portfolio',
        status: 'COMPLETE',
        evidenceCount: 3,
        evidenceDetails: ['Public ACE Portfolio published at /portfolio/dileep-kumar', 'GitHub repository linked']
      },
      {
        category: 'SKILLS',
        title: 'Verified Competencies',
        status: 'COMPLETE',
        evidenceCount: 7,
        evidenceDetails: ['TypeScript (Advanced)', 'React (Advanced)', 'Node.js (Proficient)', 'Python (Proficient)', 'PostgreSQL (Intermediate)']
      },
      {
        category: 'PROJECTS',
        title: 'Production Projects',
        status: 'COMPLETE',
        evidenceCount: 2,
        evidenceDetails: ['All College Events (ACE) Super Platform (Active)', 'Distributed Task Queue in Go']
      },
      {
        category: 'CERTIFICATES',
        title: 'Institutional Certifications',
        status: 'COMPLETE',
        evidenceCount: 2,
        evidenceDetails: ['Vel Tech National CodeFest 2026 - Winner', 'AWS Certified Cloud Practitioner']
      },
      {
        category: 'EXPERIENCE',
        title: 'Internship & Campus Work',
        status: 'NEEDS_IMPROVEMENT',
        evidenceCount: 1,
        evidenceDetails: ['Vel Tech R&D Lab Research Assistant'],
        actionRequired: 'Apply for 1 industry summer internship to fulfill enterprise experience credit',
        actionLink: '/opportunities'
      },
      {
        category: 'APPLICATIONS',
        title: 'Active Pipeline Tracking',
        status: 'COMPLETE',
        evidenceCount: 3,
        evidenceDetails: ['Zoho Cloud Intern (Under Review)', 'Freshworks SWE (Shortlisted)', 'TCS Innovator (Applied)']
      },
      {
        category: 'INTERVIEW_PREP',
        title: 'Mock Interview Simulations',
        status: 'NEEDS_IMPROVEMENT',
        evidenceCount: 2,
        evidenceDetails: ['1 Technical round completed (Score: 88%)', '0 Behavioral rounds completed'],
        actionRequired: 'Complete 1 Behavioral AI Mock Simulation before real company panel',
        actionLink: '/career/interview-ai'
      }
    ];
  }
};
