// Centralized Master Persistence Hub & Data Management Registry
import { accountDb } from './accountDatabase';
import { institutionDb } from './institutionDatabase';
import { mentorshipDb } from './mentorshipDatabase';
import { eventPersistenceDb } from './eventPersistenceDatabase';
import { communityDb } from './communityDatabase';
import { projectDb } from './projectDatabase';
import { certificateDb } from './certificateDatabase';
import { learningPersistenceDb } from './learningPersistenceDatabase';
import { walletPersistenceDb } from './walletPersistenceDatabase';
import { notificationDb } from './notificationDatabase';
import { chatDb } from './chatDatabase';
import { settingsDb } from './settingsDatabase';

export interface PersistenceStorageDiagnostics {
  usedBytes: number;
  usedFormatted: string;
  itemCounts: Record<string, number>;
  lastChecked: string;
}

export const persistenceHub = {
  // Database accessors
  accounts: accountDb,
  institutions: institutionDb,
  mentorship: mentorshipDb,
  events: eventPersistenceDb,
  community: communityDb,
  projects: projectDb,
  certificates: certificateDb,
  learning: learningPersistenceDb,
  wallet: walletPersistenceDb,
  notifications: notificationDb,
  chat: chatDb,
  settings: settingsDb,

  // Diagnostics
  getDiagnostics(): PersistenceStorageDiagnostics {
    let totalBytes = 0;
    const itemCounts: Record<string, number> = {
      accounts: accountDb.getAllAccounts().length,
      events: eventPersistenceDb.getAllEvents().length,
      communityPosts: communityDb.getPosts().length,
      projects: projectDb.getAllProjects().length,
      notifications: 10,
      mentorshipSessions: mentorshipDb.getAllSessions().length
    };

    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ace_')) {
          const val = localStorage.getItem(key) || '';
          totalBytes += (key.length + val.length) * 2; // UTF-16 bytes
        }
      }
    }

    return {
      usedBytes: totalBytes,
      usedFormatted: `${(totalBytes / 1024).toFixed(2)} KB`,
      itemCounts,
      lastChecked: new Date().toISOString()
    };
  },

  // Export full user database snapshot to JSON
  exportDataSnapshot(): string {
    const data: Record<string, any> = {};
    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ace_')) {
          data[key] = localStorage.getItem(key);
        }
      }
    }
    return JSON.stringify(data, null, 2);
  },

  // Restore database snapshot from JSON
  restoreDataSnapshot(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (typeof localStorage !== 'undefined') {
        Object.keys(data).forEach(key => {
          if (key.startsWith('ace_')) {
            localStorage.setItem(key, data[key]);
          }
        });
      }
      return true;
    } catch (e) {
      console.error('[persistenceHub] Failed to restore snapshot:', e);
      return false;
    }
  }
};
