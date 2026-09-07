// ACE Universal Platform Event Bus
// Synchronizes cross-module events, cache invalidation, and real-time state transitions

export type DomainEventType = 
  | 'UserCreated'
  | 'ProfileUpdated'
  | 'InstitutionChanged'
  | 'EventCreated'
  | 'EventPublished'
  | 'EventRegistered'
  | 'AttendanceRecorded'
  | 'MentorAssigned'
  | 'GoalCompleted'
  | 'CourseCompleted'
  | 'ProjectPublished'
  | 'CertificateIssued'
  | 'WalletTransactionCreated'
  | 'RewardRedeemed'
  | 'ReportSubmitted'
  | 'TalentShortlisted';

export interface DomainEvent<T = any> {
  id: string;
  type: DomainEventType;
  payload: T;
  timestamp: string;
  source: string;
}

type EventListener<T = any> = (event: DomainEvent<T>) => void;

class PlatformEventBus {
  private listeners: Map<DomainEventType, Set<EventListener>> = new Map();
  private auditHistory: DomainEvent[] = [];

  public subscribe<T = any>(type: DomainEventType, listener: EventListener<T>): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener);
    return () => {
      this.listeners.get(type)?.delete(listener);
    };
  }

  public publish<T = any>(type: DomainEventType, payload: T, source: string = 'ACE_CORE'): DomainEvent<T> {
    const event: DomainEvent<T> = {
      id: `evt_bus_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      payload,
      timestamp: new Date().toISOString(),
      source
    };

    this.auditHistory.unshift(event);
    if (this.auditHistory.length > 500) {
      this.auditHistory.pop();
    }

    const callbacks = this.listeners.get(type);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(event);
        } catch (err) {
          console.error(`Error in event bus subscriber for ${type}:`, err);
        }
      });
    }

    return event;
  }

  public getRecentEvents(limit: number = 20): DomainEvent[] {
    return this.auditHistory.slice(0, limit);
  }
}

export const platformEventBus = new PlatformEventBus();
