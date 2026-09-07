// ACE Real-Time Sync & Safe Polling Fallback Service

type SyncEventType = 'MESSAGE_RECEIVED' | 'NOTIFICATION_RECEIVED' | 'WALLET_UPDATED' | 'EVENT_STATUS_CHANGED' | 'MENTOR_SESSION_UPDATED';
type SyncCallback = (data?: any) => void;

class RealTimeSyncService {
  private listeners: Map<SyncEventType, Set<SyncCallback>> = new Map();
  private pollingIntervals: Map<string, any> = new Map();

  public subscribe(event: SyncEventType, cb: SyncCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(cb);

    return () => {
      this.listeners.get(event)?.delete(cb);
    };
  }

  public emit(event: SyncEventType, data?: any): void {
    this.listeners.get(event)?.forEach(cb => {
      try {
        cb(data);
      } catch (err) {
        console.error('[RealTimeSyncService] Subscriber error:', err);
      }
    });
  }

  public startSafePolling(key: string, fetchFn: () => Promise<void> | void, intervalMs = 15000): void {
    this.stopSafePolling(key);
    const id = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return; // Save bandwidth in background
      Promise.resolve(fetchFn()).catch(e => console.warn('[SafePolling] Background poll warning:', e));
    }, intervalMs);
    this.pollingIntervals.set(key, id);
  }

  public stopSafePolling(key: string): void {
    if (this.pollingIntervals.has(key)) {
      clearInterval(this.pollingIntervals.get(key));
      this.pollingIntervals.delete(key);
    }
  }
}

export const realTimeSyncService = new RealTimeSyncService();
