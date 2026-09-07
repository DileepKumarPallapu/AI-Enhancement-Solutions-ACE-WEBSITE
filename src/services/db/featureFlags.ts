// ACE Feature Flags & Privacy-Conscious Product Analytics Service

export interface FeatureFlags {
  enableDigitalIdNfc: boolean;
  enableDynamicQrScanner: boolean;
  enableAiSmartCopilot: boolean;
  enablePasskeyAuth: boolean;
  enablePwaPushNotifications: boolean;
  enablePublicResumeExport: boolean;
  enableTeamWorkspaceRealtime: boolean;
  enableStrictInstitutionBinding: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  enableDigitalIdNfc: true,
  enableDynamicQrScanner: true,
  enableAiSmartCopilot: true,
  enablePasskeyAuth: true,
  enablePwaPushNotifications: true,
  enablePublicResumeExport: true,
  enableTeamWorkspaceRealtime: true,
  enableStrictInstitutionBinding: true
};

const STORAGE_KEY = 'ace_feature_flags_v1';

class FeatureFlagService {
  private flags: FeatureFlags = { ...DEFAULT_FLAGS };
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.flags = { ...DEFAULT_FLAGS, ...JSON.parse(raw) };
        }
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.flags));
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

  public getAll(): FeatureFlags {
    return { ...this.flags };
  }

  public isEnabled(flag: keyof FeatureFlags): boolean {
    return !!this.flags[flag];
  }

  public setFlag(flag: keyof FeatureFlags, enabled: boolean): void {
    this.flags[flag] = enabled;
    this.save();
  }
}

export const featureFlags = new FeatureFlagService();
