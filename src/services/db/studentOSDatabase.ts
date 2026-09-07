import { getCanonicalStudent } from './canonicalDataArchitecture';
import { nextBestActionEngine, NextBestActionItem } from './nextBestActionEngine';
import { studentCareerProfileDatabase, CareerReadinessScorecard } from './studentCareerProfileDatabase';
import { savedOpportunitiesDatabase, SavedOpportunityItem } from './savedOpportunitiesDatabase';
import { interviewAndOfferDatabase } from './interviewAndOfferDatabase';

export interface StudentOSState {
  student: ReturnType<typeof getCanonicalStudent>;
  priorities: { title: string; subtitle: string; badge: string; link: string; urgency: 'HIGH' | 'MEDIUM' | 'NORMAL' }[];
  nextBestActions: NextBestActionItem[];
  careerReadiness: CareerReadinessScorecard[];
  savedOpportunities: SavedOpportunityItem[];
  stats: {
    verifiedSkillsCount: number;
    activeApplicationsCount: number;
    upcomingDeadlinesCount: number;
    completedMilestonesCount: number;
    aceCoinsBalance: number;
  };
}

export const studentOSDatabase = {
  getOSState(userId?: string): StudentOSState {
    const student = getCanonicalStudent();
    const nextBestActions = nextBestActionEngine.getActions(userId).filter(a => a.status === 'PENDING');
    const careerReadiness = studentCareerProfileDatabase.getEvidenceBasedReadiness();
    const savedOpportunities = savedOpportunitiesDatabase.getAll();

    return {
      student,
      priorities: [
        {
          title: 'Cloud Architecture Case Study Submission',
          subtitle: 'Closes in 4 days (Sep 12, 2026)',
          badge: 'Project Lab',
          link: '/project-lab',
          urgency: 'HIGH'
        },
        {
          title: 'Mock Technical Interview with AI Simulator',
          subtitle: 'Prepare for Zoho SWE Interview',
          badge: 'Interview Prep',
          link: '/career/interview-ai',
          urgency: 'HIGH'
        },
        {
          title: 'National Smart India Hackathon Ideation Round',
          subtitle: 'Nominated team review',
          badge: 'Competitions',
          link: '/competitions',
          urgency: 'NORMAL'
        }
      ],
      nextBestActions,
      careerReadiness,
      savedOpportunities,
      stats: {
        verifiedSkillsCount: 7,
        activeApplicationsCount: 3,
        upcomingDeadlinesCount: 4,
        completedMilestonesCount: 6,
        aceCoinsBalance: 4500 // ₹45 INR
      }
    };
  }
};
