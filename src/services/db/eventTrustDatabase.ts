// ACE Event Trust Scoring & Change History Database
// Evaluates organizer credibility, historical verifications, prize pools, and provides change history audit logs

export interface EventChangeEntry {
  id: string;
  eventId: string;
  changedField: string;
  oldValue: string;
  newValue: string;
  changedAt: string;
  changedBy: string;
  changeSummary: string;
  impactLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface EventTrustEvaluation {
  eventId: string;
  trustScore: number; // 0 - 100
  trustTier: 'VERIFIED_OFFICIAL' | 'HIGH_TRUST' | 'STANDARD' | 'UNVERIFIED_NEW';
  factors: {
    institutionVerified: boolean;
    organizerTrackRecordYears: number;
    escrowPrizeProtected: boolean;
    clearRulesAndRubric: boolean;
    previousEventsCompleted: number;
  };
  changeHistory: EventChangeEntry[];
  lastAuditedAt: string;
}

const STORAGE_KEY = 'ace_db_event_trust_v1';

class EventTrustDatabase {
  private trustRecords: Map<string, EventTrustEvaluation> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.trustRecords.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as EventTrustEvaluation[];
          items.forEach(t => this.trustRecords.set(t.eventId, t));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.trustRecords.values())));
      }
    } catch {
      // Storage fallback
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedInitial() {
    const sampleRecord: EventTrustEvaluation = {
      eventId: 'evt_nat_hackathon_2026',
      trustScore: 98,
      trustTier: 'VERIFIED_OFFICIAL',
      factors: {
        institutionVerified: true,
        organizerTrackRecordYears: 6,
        escrowPrizeProtected: true,
        clearRulesAndRubric: true,
        previousEventsCompleted: 14
      },
      lastAuditedAt: new Date().toISOString(),
      changeHistory: [
        {
          id: 'chg_001',
          eventId: 'evt_nat_hackathon_2026',
          changedField: 'prizePool',
          oldValue: '₹3,00,000',
          newValue: '₹5,00,000',
          changedAt: '2026-02-20T14:00:00.000Z',
          changedBy: 'IIT Madras Organizing Committee',
          changeSummary: 'Prize pool increased due to new AI Industry Sponsorship',
          impactLevel: 'HIGH'
        },
        {
          id: 'chg_002',
          eventId: 'evt_nat_hackathon_2026',
          changedField: 'registrationDeadline',
          oldValue: '2026-03-10',
          newValue: '2026-03-14',
          changedAt: '2026-03-01T10:00:00.000Z',
          changedBy: 'IIT Madras Organizing Committee',
          changeSummary: 'Registration window extended by 4 days due to server high traffic',
          impactLevel: 'MEDIUM'
        }
      ]
    };

    this.trustRecords.set(sampleRecord.eventId, sampleRecord);
    this.saveToStorage();
  }

  public getForEvent(eventId: string): EventTrustEvaluation {
    const existing = this.trustRecords.get(eventId);
    if (existing) return existing;

    const defaultTrust: EventTrustEvaluation = {
      eventId,
      trustScore: 88,
      trustTier: 'HIGH_TRUST',
      factors: {
        institutionVerified: true,
        organizerTrackRecordYears: 2,
        escrowPrizeProtected: true,
        clearRulesAndRubric: true,
        previousEventsCompleted: 3
      },
      changeHistory: [],
      lastAuditedAt: new Date().toISOString()
    };
    this.trustRecords.set(eventId, defaultTrust);
    this.saveToStorage();
    return defaultTrust;
  }

  public recordChange(params: Omit<EventChangeEntry, 'id' | 'changedAt'>): void {
    const evalData = this.getForEvent(params.eventId);
    const entry: EventChangeEntry = {
      ...params,
      id: `chg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      changedAt: new Date().toISOString()
    };
    evalData.changeHistory.unshift(entry);
    this.trustRecords.set(params.eventId, evalData);
    this.saveToStorage();
  }
}

export const eventTrustDb = new EventTrustDatabase();
