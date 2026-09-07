// ACE Optimistic Concurrency Control & Conflict Detection Service

export interface VersionedEntity {
  id: string;
  version: number;
  updatedAt: string;
}

export class ConflictDetectionService {
  /**
   * Evaluates whether an update is safe or stale.
   */
  public checkConflict<T extends VersionedEntity>(
    currentRecordInDb: T | undefined,
    incomingUpdate: Partial<T> & { version?: number }
  ): { isConflict: boolean; message?: string } {
    if (!currentRecordInDb) {
      return { isConflict: false };
    }

    if (incomingUpdate.version !== undefined && incomingUpdate.version < currentRecordInDb.version) {
      return {
        isConflict: true,
        message: 'This item was updated in another session or tab. Please reload the latest version to avoid overwriting newer data.'
      };
    }

    return { isConflict: false };
  }
}

export const conflictDetectionService = new ConflictDetectionService();
