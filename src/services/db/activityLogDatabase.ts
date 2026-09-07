// ACE Universal User Activity Log Database
// Immutable ledger of all real authenticated user activities

import { ActivityLog, EntityId } from './canonicalDataArchitecture';

const STORAGE_KEY_ACTIVITIES = 'ace_user_activity_logs_v2';

const SEED_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act_1',
    userId: 'usr_student_dileep',
    type: 'EVENT_REGISTERED',
    title: 'Registered for NEXORA 2K26 Symposium',
    description: 'Confirmed delegate seat for paper presentation and AI coding tracks at Vel Tech Campus.',
    entityType: 'EVENT',
    entityId: 'evt-nexora-2k26',
    timestamp: '2026-09-02T10:00:00Z'
  },
  {
    id: 'act_2',
    userId: 'usr_student_dileep',
    type: 'CERTIFICATE_EARNED',
    title: 'Earned Verified Certificate',
    description: 'Received tamper-proof certificate for HACKVERSE 2.0 National Hackathon Finalist.',
    entityType: 'CERTIFICATE',
    entityId: 'cert-1',
    timestamp: '2026-09-02T08:30:00Z'
  },
  {
    id: 'act_3',
    userId: 'usr_student_dileep',
    type: 'COINS_EARNED',
    title: 'Earned +100 ACE Coins',
    description: 'Completed Python Data Structures Challenge and maintained 5-day coding streak.',
    entityType: 'WALLET',
    entityId: 'tx-seed-1',
    timestamp: '2026-09-01T14:20:00Z'
  },
  {
    id: 'act_4',
    userId: 'usr_student_dileep',
    type: 'POST_CREATED',
    title: 'Posted in Campus Community',
    description: 'Created hackathon teammate search discussion for React/FastAPI AI agent project.',
    entityType: 'POST',
    entityId: 'post-1',
    timestamp: '2026-09-01T11:00:00Z'
  },
  {
    id: 'act_5',
    userId: 'usr_student_dileep',
    type: 'PROFILE_UPDATED',
    title: 'Updated Academic Profile',
    description: 'Set registered college to Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology.',
    entityType: 'PROFILE',
    entityId: 'usr_student_dileep',
    timestamp: '2026-08-30T16:45:00Z'
  }
];

class ActivityLogDatabase {
  private activities: ActivityLog[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
      this.activities = raw ? JSON.parse(raw) : SEED_ACTIVITIES;
    } catch (e) {
      this.activities = SEED_ACTIVITIES;
    }
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(this.activities));
    }
  }

  public getActivitiesByUser(userId: EntityId): ActivityLog[] {
    return this.activities
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public recordActivity(params: {
    userId: EntityId;
    type: ActivityLog['type'];
    title: string;
    description: string;
    entityType: ActivityLog['entityType'];
    entityId: EntityId;
    metadata?: Record<string, any>;
  }): ActivityLog {
    const act: ActivityLog = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: params.userId,
      type: params.type,
      title: params.title,
      description: params.description,
      entityType: params.entityType,
      entityId: params.entityId,
      metadata: params.metadata,
      timestamp: new Date().toISOString()
    };
    this.activities.unshift(act);
    this.persist();
    return act;
  }
}

export const activityLogDb = new ActivityLogDatabase();
