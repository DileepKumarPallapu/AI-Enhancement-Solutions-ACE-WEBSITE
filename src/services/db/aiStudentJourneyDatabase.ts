/**
 * ACE 30X — Student Journey & Outcome Analytics Service
 * Tracks authentic student lifecycle progress across 8 stages:
 * Discover → Register → Attend → Learn → Build → Compete → Apply → Achieve
 */

export interface JourneyMilestoneEvent {
  id: string;
  stage: 'DISCOVER' | 'REGISTER' | 'ATTEND' | 'LEARN' | 'BUILD' | 'COMPETE' | 'APPLY' | 'ACHIEVE';
  title: string;
  description: string;
  timestamp: string;
  verifiedEvidenceUrl?: string;
  category: string;
}

export interface StudentJourneyMetrics {
  userId: string;
  eventsDiscovered: number;
  eventsRegistered: number;
  eventsAttended: number;
  coursesCompleted: number;
  practiceHours: number;
  projectsBuilt: number;
  competitionsJoined: number;
  applicationsSubmitted: number;
  interviewsScheduled: number;
  verifiedCertificates: number;
  skillsVerifiedCount: number;
  milestones: JourneyMilestoneEvent[];
}

const STORAGE_KEY = 'ace_ai_student_journey_v1';

class AIStudentJourneyDatabaseService {
  private journeyData: StudentJourneyMetrics;

  constructor() {
    this.journeyData = this.loadInitial();
  }

  private loadInitial(): StudentJourneyMetrics {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
    } catch {
      // fallback
    }

    return {
      userId: 'usr-student-001',
      eventsDiscovered: 42,
      eventsRegistered: 6,
      eventsAttended: 5,
      coursesCompleted: 4,
      practiceHours: 38,
      projectsBuilt: 3,
      competitionsJoined: 2,
      applicationsSubmitted: 4,
      interviewsScheduled: 2,
      verifiedCertificates: 3,
      skillsVerifiedCount: 7,
      milestones: [
        {
          id: 'jm-1',
          stage: 'ACHIEVE',
          title: 'Earned Verified Full-Stack Web Development Certificate',
          description: 'Issued by Vel Tech Rangarajan Dr. Sagunthala R&D Institute with verifiable cryptographic signature.',
          timestamp: '2026-03-05T14:30:00Z',
          verifiedEvidenceUrl: '/certificates/CERT-2026-VT-0091',
          category: 'CERTIFICATE'
        },
        {
          id: 'jm-2',
          stage: 'APPLY',
          title: 'Scheduled Technical Interview with InnoTech Labs',
          description: 'Recruiter panel invited candidate based on verified project evidence in Project Lab.',
          timestamp: '2026-03-03T11:00:00Z',
          category: 'CAREER'
        },
        {
          id: 'jm-3',
          stage: 'BUILD',
          title: 'Shipped AI Campus Study Assistant in Project Lab',
          description: 'Deployed public prototype with 100% test coverage and GitHub repository link.',
          timestamp: '2026-02-28T17:45:00Z',
          verifiedEvidenceUrl: '/project-lab',
          category: 'PROJECT'
        },
        {
          id: 'jm-4',
          stage: 'COMPETE',
          title: 'Ranked Top 5% in National Algorithm Arena Challenge',
          description: 'Solved 4 algorithmic problems with anti-cheat telemetry validation.',
          timestamp: '2026-02-20T16:00:00Z',
          category: 'COMPETITION'
        },
        {
          id: 'jm-5',
          stage: 'LEARN',
          title: 'Completed Advanced React 19 & TypeScript Interactive Track',
          description: 'Earned 500 XP and unlocked Level 3 Skill Evidence badge.',
          timestamp: '2026-02-10T12:00:00Z',
          category: 'LEARNING'
        },
        {
          id: 'jm-6',
          stage: 'ATTEND',
          title: 'Attended AI & Cloud Innovation Summit at Vel Tech',
          description: 'Digital attendance verified via geo-fenced QR check-in.',
          timestamp: '2026-01-25T10:00:00Z',
          category: 'EVENT'
        }
      ]
    };
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.journeyData));
      }
    } catch {
      // ignore
    }
  }

  public getJourneyMetrics(userId: string = 'usr-student-001'): StudentJourneyMetrics {
    return this.journeyData;
  }

  public logJourneyMilestone(milestone: Omit<JourneyMilestoneEvent, 'id' | 'timestamp'>): JourneyMilestoneEvent {
    const newEvent: JourneyMilestoneEvent = {
      ...milestone,
      id: `jm-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    this.journeyData.milestones.unshift(newEvent);
    this.persist();
    return newEvent;
  }
}

export const aiStudentJourneyDatabase = new AIStudentJourneyDatabaseService();
