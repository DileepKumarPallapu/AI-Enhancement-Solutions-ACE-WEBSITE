import { getCanonicalStudent } from './canonicalDataArchitecture';

export interface NextBestActionItem {
  id: string;
  title: string;
  reason: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'PROFILE' | 'LEARNING' | 'DEADLINE' | 'MENTOR' | 'COMPETITION' | 'PROJECT' | 'INTERVIEW' | 'CAREER';
  deadline?: string;
  ctaText: string;
  ctaLink: string;
  status: 'PENDING' | 'DISMISSED' | 'COMPLETED';
}

const STORAGE_KEY = 'ace_60x_next_best_actions';

function loadActions(): NextBestActionItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveActions(actions: NextBestActionItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  } catch {}
}

export const nextBestActionEngine = {
  getActions(userId?: string): NextBestActionItem[] {
    const stored = loadActions();
    if (stored.length > 0) return stored;

    const student = getCanonicalStudent();
    const defaults: NextBestActionItem[] = [
      {
        id: 'nba-1',
        title: 'Complete Cloud Architecture Case Study',
        reason: 'Required milestone for your target role "Cloud Engineer" with 3 matched opportunities closing soon',
        priority: 'CRITICAL',
        category: 'PROJECT',
        deadline: '2026-09-12T23:59:59Z',
        ctaText: 'Continue Project Lab',
        ctaLink: '/project-lab',
        status: 'PENDING'
      },
      {
        id: 'nba-2',
        title: 'Prepare for Upcoming Mock Tech Interview',
        reason: 'Scheduled behavioral & system design review with AI Interview Simulator',
        priority: 'HIGH',
        category: 'INTERVIEW',
        deadline: '2026-09-15T10:00:00Z',
        ctaText: 'Launch Simulator',
        ctaLink: '/career/interview-ai',
        status: 'PENDING'
      },
      {
        id: 'nba-3',
        title: 'Review Vel Tech Hackathon Problem Statement',
        reason: 'National Smart Cities Hackathon round 1 submission deadline in 4 days',
        priority: 'HIGH',
        category: 'COMPETITION',
        deadline: '2026-09-14T18:00:00Z',
        ctaText: 'Open Arena',
        ctaLink: '/competitions',
        status: 'PENDING'
      },
      {
        id: 'nba-4',
        title: 'Schedule Monthly Mentor Session with Dr. S. Ramanathan',
        reason: 'Keep your 30-day career roadmap check-in active',
        priority: 'MEDIUM',
        category: 'MENTOR',
        ctaText: 'Book Mentor Slot',
        ctaLink: '/student/mentorship',
        status: 'PENDING'
      },
      {
        id: 'nba-5',
        title: 'Sync Digital Student ID Credentials',
        reason: 'Enable campus QR gate verification at Vel Tech Avadi campus',
        priority: 'LOW',
        category: 'PROFILE',
        ctaText: 'View Digital ID',
        ctaLink: '/student/id',
        status: 'PENDING'
      }
    ];
    saveActions(defaults);
    return defaults;
  },

  dismissAction(id: string): NextBestActionItem[] {
    const actions = this.getActions().map(a => a.id === id ? { ...a, status: 'DISMISSED' as const } : a);
    saveActions(actions);
    return actions;
  },

  completeAction(id: string): NextBestActionItem[] {
    const actions = this.getActions().map(a => a.id === id ? { ...a, status: 'COMPLETED' as const } : a);
    saveActions(actions);
    return actions;
  }
};
