/**
 * ACE 30X — AI Privacy Controls & User Consent Database Service
 * Manages persistent user permissions for AI profile modeling, activity ingestion, and notification preferences.
 */

export interface AIPrivacySettings {
  userId: string;
  useProfileForRecommendations: boolean;
  useLearningActivity: boolean;
  useApplicationActivity: boolean;
  useEventActivity: boolean;
  useCompetitionActivity: boolean;
  useProjectActivity: boolean;
  useAIMemory: boolean;
  personalizedNotifications: boolean;
  allowRecruiterSmartMatching: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'ace_ai_privacy_settings_v1';

class AIPrivacySettingsDatabaseService {
  private settingsMap: Map<string, AIPrivacySettings> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed: AIPrivacySettings[] = JSON.parse(data);
          parsed.forEach(s => this.settingsMap.set(s.userId, s));
          return;
        }
      }
    } catch {
      // fallback
    }

    // Default privacy settings for primary student
    this.settingsMap.set('usr-student-001', {
      userId: 'usr-student-001',
      useProfileForRecommendations: true,
      useLearningActivity: true,
      useApplicationActivity: true,
      useEventActivity: true,
      useCompetitionActivity: true,
      useProjectActivity: true,
      useAIMemory: true,
      personalizedNotifications: true,
      allowRecruiterSmartMatching: true,
      updatedAt: new Date().toISOString()
    });
    this.persist();
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.settingsMap.values())));
      }
    } catch {
      // ignore
    }
  }

  public getSettings(userId: string = 'usr-student-001'): AIPrivacySettings {
    const s = this.settingsMap.get(userId);
    if (s) return s;

    const defaultSettings: AIPrivacySettings = {
      userId,
      useProfileForRecommendations: true,
      useLearningActivity: true,
      useApplicationActivity: true,
      useEventActivity: true,
      useCompetitionActivity: true,
      useProjectActivity: true,
      useAIMemory: true,
      personalizedNotifications: true,
      allowRecruiterSmartMatching: true,
      updatedAt: new Date().toISOString()
    };
    this.settingsMap.set(userId, defaultSettings);
    this.persist();
    return defaultSettings;
  }

  public updateSettings(userId: string, partial: Partial<Omit<AIPrivacySettings, 'userId' | 'updatedAt'>>): AIPrivacySettings {
    const current = this.getSettings(userId);
    const updated: AIPrivacySettings = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString()
    };
    this.settingsMap.set(userId, updated);
    this.persist();
    return updated;
  }
}

export const aiPrivacySettingsDatabase = new AIPrivacySettingsDatabaseService();
