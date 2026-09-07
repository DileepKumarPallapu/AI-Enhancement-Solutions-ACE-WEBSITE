// ACE Student Command Center & Daily Intelligence Database
// Evaluates Today's Priorities, Next Best Action, Profile Completeness, AI Daily Brief, and Timeline Ledger

export interface StudentPriorityItem {
  id: string;
  type: 'EVENT_REGISTRATION' | 'COMPETITION_DEADLINE' | 'MENTOR_SESSION' | 'LEARNING_GOAL' | 'PROFILE_ACTION' | 'APPLICATION_UPDATE';
  title: string;
  description: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  dueTime: string;
  actionUrl: string;
  actionLabel: string;
  reason: string;
}

export interface NextBestAction {
  id: string;
  title: string;
  category: 'REGISTRATION' | 'MENTORSHIP' | 'LEARNING' | 'CAREER';
  reason: string;
  primaryActionUrl: string;
  primaryActionLabel: string;
  secondaryActionUrl: string;
  secondaryActionLabel: string;
  dismissible: boolean;
}

export interface StudentTimelineEvent {
  id: string;
  userId: string;
  timestamp: string;
  title: string;
  description: string;
  iconType: 'IDENTITY' | 'HACKATHON' | 'MENTORSHIP' | 'LEARNING' | 'CAREER' | 'PROJECT';
  badgeLabel?: string;
  referenceUrl?: string;
}

export interface DailyBriefing {
  greeting: string;
  dateStr: string;
  summaryPoints: string[];
  recommendedAction: string;
  actionUrl: string;
}

export interface WeeklyReviewData {
  weekLabel: string;
  completedTasksCount: number;
  sessionsHeldCount: number;
  challengesClearedCount: number;
  activeApplicationsCount: number;
  keyAchievements: string[];
  skillsPracticed: string[];
  focusForNextWeek: string[];
}

const STORAGE_KEYS = {
  TIMELINE: 'ace_db_student_timeline_v1',
  DISMISSED_ACTIONS: 'ace_db_dismissed_actions_v1'
};

class StudentCommandCenterDatabase {
  private timeline: StudentTimelineEvent[] = [];
  private dismissedActionIds: Set<string> = new Set();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
    if (this.timeline.length === 0) {
      this.seedTimeline();
    }
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawTl = localStorage.getItem(STORAGE_KEYS.TIMELINE);
        if (rawTl) this.timeline = JSON.parse(rawTl);
        const rawDis = localStorage.getItem(STORAGE_KEYS.DISMISSED_ACTIONS);
        if (rawDis) this.dismissedActionIds = new Set(JSON.parse(rawDis));
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(this.timeline));
        localStorage.setItem(STORAGE_KEYS.DISMISSED_ACTIONS, JSON.stringify(Array.from(this.dismissedActionIds)));
      }
    } catch {
      // Fallback
    }
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedTimeline() {
    this.timeline = [
      {
        id: 'tl_01',
        userId: 'usr_student_dileep',
        timestamp: '2024-08-01T09:00:00.000Z',
        title: 'Enrolled & Verified at Vel Tech University',
        description: 'Issued canonical Digital Student ID ACE-2026-VT9842 with CSE Department affiliation.',
        iconType: 'IDENTITY',
        badgeLabel: 'Identity Issued'
      },
      {
        id: 'tl_02',
        userId: 'usr_student_dileep',
        timestamp: '2025-11-20T16:00:00.000Z',
        title: 'Won 1st Place at National AI Hackathon',
        description: 'Lead Neural Titans team to first place victory with Autonomous Ground Rescue Drone.',
        iconType: 'HACKATHON',
        badgeLabel: 'Gold Winner'
      },
      {
        id: 'tl_03',
        userId: 'usr_student_dileep',
        timestamp: '2026-01-15T10:00:00.000Z',
        title: 'Earned Full-Stack Masterclass Certificate',
        description: 'Graduated in top 2% of class with cryptographically verifiable Merkle credential.',
        iconType: 'LEARNING',
        badgeLabel: 'Certificate Verified',
        referenceUrl: '/verify/certificate/cert_fs_892'
      },
      {
        id: 'tl_04',
        userId: 'usr_student_dileep',
        timestamp: '2026-02-28T14:30:00.000Z',
        title: 'Completed Faculty Mentorship Milestone',
        description: 'Full-stack architecture and agentic pipeline approved by faculty mentor.',
        iconType: 'MENTORSHIP',
        badgeLabel: 'Mentor Endorsed'
      }
    ];
    this.save();
  }

  public getTimeline(userId: string): StudentTimelineEvent[] {
    return this.timeline.filter(t => t.userId === userId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public recordTimelineEvent(event: Omit<StudentTimelineEvent, 'id' | 'timestamp'>): void {
    const newEvent: StudentTimelineEvent = {
      ...event,
      id: `tl_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString()
    };
    this.timeline.unshift(newEvent);
    this.save();
  }

  public calculateProfileCompletion(user: {
    fullName?: string;
    username?: string;
    avatarUrl?: string;
    college?: string;
    bio?: string;
    email?: string;
    phone?: string;
  }): { percentage: number; missingFields: string[] } {
    const fields = [
      { name: 'Full Name', value: !!user.fullName },
      { name: 'Username', value: !!user.username },
      { name: 'Profile Avatar', value: !!user.avatarUrl && !user.avatarUrl.includes('placeholder') },
      { name: 'College Affiliation', value: !!user.college },
      { name: 'Student Bio & Summary', value: !!user.bio && user.bio.length > 10 },
      { name: 'Verified Email', value: !!user.email },
      { name: 'Contact Phone', value: !!user.phone }
    ];

    const completed = fields.filter(f => f.value).length;
    const missing = fields.filter(f => !f.value).map(f => f.name);
    const percentage = Math.round((completed / fields.length) * 100);

    return { percentage, missingFields: missing };
  }

  public getTodayPriorities(userId: string): StudentPriorityItem[] {
    return [
      {
        id: 'prio_01',
        type: 'EVENT_REGISTRATION',
        title: 'National AI & Robotics Hackathon 2026 Registration',
        description: 'Final registration closes in 3 days. Vel Tech teams eligible for direct jury round.',
        urgency: 'CRITICAL',
        dueTime: '2026-03-18T23:59:59.000Z',
        actionUrl: '/student/opportunities/opp_hack_001',
        actionLabel: 'Complete Registration',
        reason: 'Recommended by your faculty mentor Dr. K. Senthilkumar'
      },
      {
        id: 'prio_02',
        type: 'MENTOR_SESSION',
        title: 'Upcoming 1-on-1: Full-Stack Architecture Review',
        description: 'Scheduled with Senior Faculty Mentor on Google Meet.',
        urgency: 'HIGH',
        dueTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        actionUrl: '/calendar',
        actionLabel: 'View Meeting Details',
        reason: 'Milestone preparation for SIH internal finals'
      },
      {
        id: 'prio_03',
        type: 'LEARNING_GOAL',
        title: 'Complete Distributed Kubernetes Lab Module 4',
        description: '2 interactive deployment exercises remaining to claim verified course badge.',
        urgency: 'MEDIUM',
        dueTime: new Date(Date.now() + 86400000 * 4).toISOString(),
        actionUrl: '/student/opportunities/opp_crs_004',
        actionLabel: 'Resume Lab',
        reason: 'Required skill for your target role: AI Systems Engineer'
      }
    ];
  }

  public getNextBestAction(userId: string): NextBestAction | null {
    if (this.dismissedActionIds.has('nba_hackathon_register')) {
      return null;
    }

    return {
      id: 'nba_hackathon_register',
      title: 'Register for National AI Hackathon 2026 before March 18',
      category: 'REGISTRATION',
      reason: 'Your verified skills in React, TypeScript, and AI Agents match the problem statement requirements 96%, and Dr. K. Senthilkumar recommended it.',
      primaryActionUrl: '/student/opportunities/opp_hack_001',
      primaryActionLabel: 'Register with 1-Click ACE ID',
      secondaryActionUrl: '/teams/team_veltech_neural_01',
      secondaryActionLabel: 'View Squad Workspace',
      dismissible: true
    };
  }

  public dismissAction(actionId: string): void {
    this.dismissedActionIds.add(actionId);
    this.save();
  }

  public getDailyBriefing(userId: string, firstName: string = 'Dileep'): DailyBriefing {
    const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    return {
      greeting: `Good morning, ${firstName}`,
      dateStr: today,
      summaryPoints: [
        'National AI Hackathon registration window closes in 3 days.',
        'Mentorship session scheduled with Dr. K. Senthilkumar in 2 days.',
        '45 Daily Coding Missions completed with active streak intact.',
        'Your target role readiness is at 89% for AI Systems Engineer.'
      ],
      recommendedAction: 'Finalize your National AI Hackathon squad submission and review team tasks.',
      actionUrl: '/teams/team_veltech_neural_01'
    };
  }

  public getWeeklyReview(userId: string): WeeklyReviewData {
    return {
      weekLabel: 'Week of March 1 - March 7, 2026',
      completedTasksCount: 12,
      sessionsHeldCount: 2,
      challengesClearedCount: 8,
      activeApplicationsCount: 2,
      keyAchievements: [
        'Promoted React & TypeScript to Level 7 (Certificate Verified)',
        'Formed Vel Tech Neural Titans hackathon squad',
        'Advanced to Interview Stage at Anthropic Labs partner network'
      ],
      skillsPracticed: ['React', 'TypeScript', 'Autonomous AI Agents', 'Docker', 'ROS2 SLAM'],
      focusForNextWeek: [
        'Deploy ROS2 telemetry bridge to production',
        'Complete Kubernetes Distributed Labs module',
        'Conduct mock technical system design with faculty mentor'
      ]
    };
  }
}

export const studentCommandCenterDb = new StudentCommandCenterDatabase();
