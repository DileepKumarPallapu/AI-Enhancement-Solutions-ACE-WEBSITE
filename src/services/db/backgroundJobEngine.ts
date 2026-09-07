/**
 * ACE 50X — Background Job & Idempotent Task Execution Engine
 * Handles async heavy workloads: search indexing, notification dispatch, certificate verification, and recommendation aggregation.
 */

export type JobType =
  | 'SEARCH_INDEX_UPDATE'
  | 'NOTIFICATION_DISPATCH'
  | 'CERTIFICATE_GENERATION'
  | 'RECOMMENDATION_UPDATE'
  | 'ANALYTICS_AGGREGATION'
  | 'DATA_EXPORT';

export type JobStatus = 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';

export interface BackgroundJob {
  id: string;
  jobType: JobType;
  idempotencyKey?: string;
  payload: Record<string, any>;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

const STORAGE_KEY = 'ace_background_jobs_v1';

class BackgroundJobEngine {
  private jobs: Map<string, BackgroundJob> = new Map();
  private processedKeys: Set<string> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed: BackgroundJob[] = JSON.parse(data);
          parsed.forEach(j => {
            this.jobs.set(j.id, j);
            if (j.idempotencyKey) this.processedKeys.add(j.idempotencyKey);
          });
          return;
        }
      }
    } catch {
      // fallback
    }

    const seed: BackgroundJob[] = [
      {
        id: 'job-101',
        jobType: 'SEARCH_INDEX_UPDATE',
        idempotencyKey: 'idem-search-seed-01',
        payload: { target: 'EVENTS_AND_OPPORTUNITIES' },
        status: 'COMPLETED',
        attempts: 1,
        maxAttempts: 3,
        createdAt: '2026-03-08T00:00:00Z',
        completedAt: '2026-03-08T00:00:02Z'
      },
      {
        id: 'job-102',
        jobType: 'NOTIFICATION_DISPATCH',
        idempotencyKey: 'idem-notif-brief-01',
        payload: { recipientId: 'usr_student_dileep', type: 'MORNING_BRIEF' },
        status: 'COMPLETED',
        attempts: 1,
        maxAttempts: 3,
        createdAt: '2026-03-08T00:05:00Z',
        completedAt: '2026-03-08T00:05:01Z'
      }
    ];

    seed.forEach(j => {
      this.jobs.set(j.id, j);
      if (j.idempotencyKey) this.processedKeys.add(j.idempotencyKey);
    });
    this.persist();
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.jobs.values())));
      }
    } catch {
      // ignore
    }
  }

  public getJobs(): BackgroundJob[] {
    return Array.from(this.jobs.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public enqueueJob(params: {
    jobType: JobType;
    payload: Record<string, any>;
    idempotencyKey?: string;
    maxAttempts?: number;
  }): { job: BackgroundJob; isDuplicate: boolean } {
    if (params.idempotencyKey && this.processedKeys.has(params.idempotencyKey)) {
      const existing = Array.from(this.jobs.values()).find(j => j.idempotencyKey === params.idempotencyKey);
      if (existing) {
        return { job: existing, isDuplicate: true };
      }
    }

    const id = `job-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const job: BackgroundJob = {
      id,
      jobType: params.jobType,
      idempotencyKey: params.idempotencyKey,
      payload: params.payload,
      status: 'QUEUED',
      attempts: 0,
      maxAttempts: params.maxAttempts || 3,
      createdAt: new Date().toISOString()
    };

    if (params.idempotencyKey) {
      this.processedKeys.add(params.idempotencyKey);
    }

    this.jobs.set(id, job);
    this.persist();

    // Synchronously execute / simulate fast background worker
    this.processJob(id);

    return { job, isDuplicate: false };
  }

  private processJob(id: string) {
    const job = this.jobs.get(id);
    if (!job) return;

    job.status = 'PROCESSING';
    job.attempts++;

    // Simulated reliable execution
    job.status = 'COMPLETED';
    job.completedAt = new Date().toISOString();
    this.jobs.set(id, job);
    this.persist();
  }
}

export const backgroundJobEngine = new BackgroundJobEngine();
