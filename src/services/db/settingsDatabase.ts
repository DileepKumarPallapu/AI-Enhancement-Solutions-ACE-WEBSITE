// ACE Persistent User Preferences and System Settings

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  eventAlerts: boolean;
  mentorshipAlerts: boolean;
  soundEffects: boolean;
  language: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  PREFERENCES: 'ace_user_preferences_v2'
};

const DEFAULT_PREFERENCES: UserPreferences = {
  userId: 'usr_student_dileep',
  theme: 'light',
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  eventAlerts: true,
  mentorshipAlerts: true,
  soundEffects: true,
  language: 'en',
  updatedAt: new Date().toISOString()
};

class SettingsDatabase {
  private preferencesByUser: Record<string, UserPreferences> = {};

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      this.preferencesByUser = raw ? JSON.parse(raw) : { 'usr_student_dileep': DEFAULT_PREFERENCES };
    } catch (e) {
      console.error('[SettingsDatabase] Hydration error:', e);
    }
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(this.preferencesByUser));
    }
  }

  public getUserPreferences(userId: string): UserPreferences {
    if (!this.preferencesByUser[userId]) {
      this.preferencesByUser[userId] = {
        ...DEFAULT_PREFERENCES,
        userId,
        updatedAt: new Date().toISOString()
      };
      this.persist();
    }
    return this.preferencesByUser[userId];
  }

  public updatePreferences(userId: string, updates: Partial<UserPreferences>): UserPreferences {
    const existing = this.getUserPreferences(userId);
    const updated: UserPreferences = {
      ...existing,
      ...updates,
      userId,
      updatedAt: new Date().toISOString()
    };
    this.preferencesByUser[userId] = updated;
    this.persist();
    return updated;
  }
}

export const settingsDb = new SettingsDatabase();
