export interface SmartOpportunityAlert {
  id: string;
  title: string;
  query: string;
  categories: string[];
  locations: string[];
  remoteOnly: boolean;
  frequency: 'INSTANT' | 'DAILY' | 'WEEKLY';
  isActive: boolean;
  matchCount: number;
  createdAt: string;
}

const STORAGE_KEY = 'ace_60x_smart_alerts';

export const smartAlertsDatabase = {
  getAll(): SmartOpportunityAlert[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: SmartOpportunityAlert[] = [
      {
        id: 'alert-1',
        title: 'AI & Cloud Internships in Chennai',
        query: 'AI Cloud Kubernetes',
        categories: ['INTERNSHIP', 'JOB'],
        locations: ['Chennai', 'Tamil Nadu'],
        remoteOnly: false,
        frequency: 'DAILY',
        isActive: true,
        matchCount: 6,
        createdAt: '2026-09-01T10:00:00Z'
      },
      {
        id: 'alert-2',
        title: 'National Coding Hackathons with Cash Prizes',
        query: 'Hackathon Coding Prize',
        categories: ['COMPETITION'],
        locations: ['All India', 'Online'],
        remoteOnly: true,
        frequency: 'INSTANT',
        isActive: true,
        matchCount: 4,
        createdAt: '2026-09-02T15:30:00Z'
      }
    ];
    this.saveAll(defaults);
    return defaults;
  },

  saveAll(alerts: SmartOpportunityAlert[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
    } catch {}
  },

  createAlert(alert: Omit<SmartOpportunityAlert, 'id' | 'createdAt' | 'matchCount'>): SmartOpportunityAlert {
    const all = this.getAll();
    const newAlert: SmartOpportunityAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      matchCount: 3,
      createdAt: new Date().toISOString()
    };
    all.push(newAlert);
    this.saveAll(all);
    return newAlert;
  },

  toggleActive(id: string): SmartOpportunityAlert | undefined {
    const all = this.getAll();
    const target = all.find(a => a.id === id);
    if (target) {
      target.isActive = !target.isActive;
      this.saveAll(all);
    }
    return target;
  },

  deleteAlert(id: string): SmartOpportunityAlert[] {
    const filtered = this.getAll().filter(a => a.id !== id);
    this.saveAll(filtered);
    return filtered;
  }
};
