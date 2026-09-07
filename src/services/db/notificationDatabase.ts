// ACE Persistent Notification Engine

export interface PersistentNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'DEADLINE' | 'RECOMMENDATION' | 'REWARD' | 'MENTORSHIP' | 'COMMUNITY' | 'SYSTEM';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

const STORAGE_KEYS = {
  NOTIFICATIONS: 'ace_persistent_notifications_v2'
};

const SEED_NOTIFS: PersistentNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr_student_dileep',
    title: 'Registration Closing Soon',
    message: 'Registration closes in 48 hours for NEXORA 2K26 Technical Symposium.',
    type: 'DEADLINE',
    link: '/events/nexora-2k26-a-national-level-technical-symposium-20260901-040857-58300',
    isRead: false,
    createdAt: '2026-09-02T10:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'usr_student_dileep',
    title: 'New AI Recommendation',
    message: 'We discovered 3 new Hackathons matching your Autonomous AI interests.',
    type: 'RECOMMENDATION',
    link: '/events',
    isRead: false,
    createdAt: '2026-09-02T08:00:00Z'
  },
  {
    id: 'notif-3',
    userId: 'usr_student_dileep',
    title: 'Referral Points Credited',
    message: '+50 ACE Reward Coins awarded for verified friend onboarding.',
    type: 'REWARD',
    link: '/rewards',
    isRead: true,
    createdAt: '2026-09-01T15:00:00Z'
  }
];

class NotificationDatabase {
  private notifications: PersistentNotification[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      this.notifications = raw ? JSON.parse(raw) : SEED_NOTIFS;
    } catch (e) {
      console.error('[NotificationDatabase] Hydration error:', e);
      this.notifications = SEED_NOTIFS;
    }
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.notifications));
    }
  }

  public getNotificationsByUser(userId: string): PersistentNotification[] {
    return this.notifications.filter(n => n.userId === userId || n.userId === 'ALL');
  }

  public getUnreadCount(userId: string): number {
    return this.getNotificationsByUser(userId).filter(n => !n.isRead).length;
  }

  public markAsRead(id: string): void {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      this.persist();
    }
  }

  public markAllAsRead(userId: string): void {
    this.notifications.forEach(n => {
      if (n.userId === userId || n.userId === 'ALL') {
        n.isRead = true;
      }
    });
    this.persist();
  }

  public createNotification(notif: Omit<PersistentNotification, 'id' | 'createdAt' | 'isRead'>): PersistentNotification {
    const newNotif: PersistentNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    this.notifications.unshift(newNotif);
    this.persist();
    return newNotif;
  }

  public deleteNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.persist();
  }
}

export const notificationDb = new NotificationDatabase();
