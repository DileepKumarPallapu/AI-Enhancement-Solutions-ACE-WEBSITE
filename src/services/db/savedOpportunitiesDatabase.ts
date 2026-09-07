export interface SavedOpportunityItem {
  id: string;
  opportunityId: string;
  title: string;
  provider: string;
  category: 'EVENT' | 'COMPETITION' | 'INTERNSHIP' | 'JOB' | 'COURSE' | 'SCHOLARSHIP' | 'PROJECT';
  location: string;
  mode: 'REMOTE' | 'ONSITE' | 'HYBRID';
  deadline: string;
  stipendOrPrize?: string;
  folder: string;
  tags: string[];
  notes: string;
  reminderDate?: string;
  savedAt: string;
}

const STORAGE_KEY = 'ace_60x_saved_opportunities';

export const savedOpportunitiesDatabase = {
  getAll(): SavedOpportunityItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: SavedOpportunityItem[] = [
      {
        id: 'save-1',
        opportunityId: 'opp-1',
        title: 'Cloud Infrastructure Engineering Intern',
        provider: 'Vel Tech R&D Tech Park',
        category: 'INTERNSHIP',
        location: 'Chennai, Tamil Nadu',
        mode: 'HYBRID',
        deadline: '2026-09-25T23:59:59Z',
        stipendOrPrize: '₹25,000 / month',
        folder: 'Priority Internships',
        tags: ['Cloud', 'Kubernetes', 'FastTrack'],
        notes: 'Review system architecture requirements before applying next Monday.',
        reminderDate: '2026-09-20',
        savedAt: '2026-09-05T10:00:00Z'
      },
      {
        id: 'save-2',
        opportunityId: 'opp-2',
        title: 'National Smart Mobility AI Hackathon 2026',
        provider: 'IIT Madras & Vel Tech Innovation Hub',
        category: 'COMPETITION',
        location: 'Chennai, Tamil Nadu',
        mode: 'ONSITE',
        deadline: '2026-09-18T18:00:00Z',
        stipendOrPrize: '₹1,50,000 Prize Pool',
        folder: 'Hackathons',
        tags: ['AI', 'SmartCity', 'Hackathon'],
        notes: 'Teamed up with Vel Tech Squad 3. Submission draft ready.',
        reminderDate: '2026-09-15',
        savedAt: '2026-09-06T14:30:00Z'
      },
      {
        id: 'save-3',
        opportunityId: 'opp-3',
        title: 'Associate Software Engineer - Distributed Systems',
        provider: 'Zoho Corporation',
        category: 'JOB',
        location: 'Chennai, Tamil Nadu',
        mode: 'ONSITE',
        deadline: '2026-10-15T23:59:59Z',
        stipendOrPrize: '₹12.5L / annum',
        folder: 'Placements 2027',
        tags: ['FullTime', 'CoreSWE'],
        notes: 'Requires strong Java/Go and PostgreSQL understanding.',
        savedAt: '2026-09-07T09:15:00Z'
      }
    ];
    this.saveAll(defaults);
    return defaults;
  },

  saveAll(items: SavedOpportunityItem[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  },

  add(item: Omit<SavedOpportunityItem, 'id' | 'savedAt'>): SavedOpportunityItem {
    const all = this.getAll();
    const newItem: SavedOpportunityItem = {
      ...item,
      id: `save-${Date.now()}`,
      savedAt: new Date().toISOString()
    };
    all.unshift(newItem);
    this.saveAll(all);
    return newItem;
  },

  remove(id: string): SavedOpportunityItem[] {
    const filtered = this.getAll().filter(i => i.id !== id && i.opportunityId !== id);
    this.saveAll(filtered);
    return filtered;
  },

  updateNotes(id: string, notes: string, folder?: string, tags?: string[]): SavedOpportunityItem | undefined {
    const all = this.getAll();
    const target = all.find(i => i.id === id);
    if (target) {
      target.notes = notes;
      if (folder) target.folder = folder;
      if (tags) target.tags = tags;
      this.saveAll(all);
    }
    return target;
  }
};
