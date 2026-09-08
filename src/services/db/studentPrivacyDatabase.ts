export interface StudentPrivacySettings {
  userId: string;
  isPublicProfileDiscoverable: boolean;
  recruiterRadarVisible: boolean;
  collegeAdminVisible: boolean;
  mentorVisible: boolean;
  portfolioVisible: boolean;
  showCertificatesPublicly: boolean;
  showProjectsPublicly: boolean;
  showSkillsPublicly: boolean;
  showGpaOnPublicResume: boolean;
  allowPeerConnections: boolean;
  updatedAt: string;
}

const STORAGE_KEY_PRIVACY = 'ace_80x_student_privacy';

export const studentPrivacyDatabase = {
  getSettings(): StudentPrivacySettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PRIVACY);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: StudentPrivacySettings = {
      userId: 'usr-student-dileep-veltech',
      isPublicProfileDiscoverable: true,
      recruiterRadarVisible: true,
      collegeAdminVisible: true,
      mentorVisible: true,
      portfolioVisible: true,
      showCertificatesPublicly: true,
      showProjectsPublicly: true,
      showSkillsPublicly: true,
      showGpaOnPublicResume: true,
      allowPeerConnections: true,
      updatedAt: new Date().toISOString()
    };
    this.saveSettings(defaults);
    return defaults;
  },

  saveSettings(settings: StudentPrivacySettings): StudentPrivacySettings {
    try {
      settings.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_PRIVACY, JSON.stringify(settings));
    } catch {}
    return settings;
  }
};
