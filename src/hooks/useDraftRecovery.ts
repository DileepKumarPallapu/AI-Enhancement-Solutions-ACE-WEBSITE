import { useState, useEffect } from 'react';

export interface UseDraftRecoveryOptions<T> {
  draftKey: string;
  initialValue: T;
  onRestore?: (restored: T) => void;
}

export function useDraftRecovery<T>({
  draftKey,
  initialValue,
  onRestore
}: UseDraftRecoveryOptions<T>) {
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [draftData, setDraftData] = useState<T | null>(null);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(`ace_draft_${draftKey}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        setDraftData(parsed);
        setHasDraft(true);
      }
    } catch (e) {
      // ignore
    }
  }, [draftKey]);

  const saveDraft = (data: T) => {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(`ace_draft_${draftKey}`, JSON.stringify(data));
      setDraftData(data);
      setHasDraft(true);
    } catch (e) {
      // ignore
    }
  };

  const clearDraft = () => {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(`ace_draft_${draftKey}`);
      setHasDraft(false);
      setDraftData(null);
    } catch (e) {
      // ignore
    }
  };

  const restoreDraft = (): T | null => {
    if (draftData) {
      if (onRestore) onRestore(draftData);
      return draftData;
    }
    return null;
  };

  return {
    hasDraft,
    draftData,
    saveDraft,
    clearDraft,
    restoreDraft
  };
}
