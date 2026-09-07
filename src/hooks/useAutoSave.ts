import { useState, useEffect, useRef, useCallback } from 'react';

export type AutoSaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved' | 'error' | 'offline';

export interface UseAutoSaveOptions<T> {
  value: T;
  onSave: (value: T) => Promise<void> | void;
  debounceMs?: number;
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  compareFn?: (a: T, b: T) => boolean;
}

export interface UseAutoSaveReturn {
  status: AutoSaveStatus;
  lastSavedAt: Date | null;
  errorMessage: string | null;
  isSaving: boolean;
  isSaved: boolean;
  isDirty: boolean;
  isOffline: boolean;
  saveNow: () => Promise<void>;
  resetStatus: () => void;
}

export function useAutoSave<T>({
  value,
  onSave,
  debounceMs = 800,
  enabled = true,
  onSuccess,
  onError,
  compareFn = (a, b) => JSON.stringify(a) === JSON.stringify(b)
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  const lastSavedValueRef = useRef<T>(value);
  const latestValueRef = useRef<T>(value);
  const onSaveRef = useRef(onSave);
  const timerRef = useRef<any>(null);
  const isInitialMount = useRef<boolean>(true);

  latestValueRef.current = value;
  onSaveRef.current = onSave;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOnline = () => {
      setIsOffline(false);
      if (!compareFn(latestValueRef.current, lastSavedValueRef.current)) {
        setStatus('unsaved');
      }
    };
    const handleOffline = () => {
      setIsOffline(true);
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [compareFn]);

  const executeSave = useCallback(async (valToSave: T) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
      setStatus('offline');
      return;
    }

    try {
      setStatus('saving');
      setErrorMessage(null);
      await Promise.resolve(onSaveRef.current(valToSave));
      lastSavedValueRef.current = valToSave;
      const now = new Date();
      setLastSavedAt(now);
      setStatus('saved');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('[useAutoSave] Save error:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'Failed to save changes');
      if (onError) onError(err);
    }
  }, [onSuccess, onError]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      lastSavedValueRef.current = value;
      return;
    }

    if (!enabled) return;

    const isDifferent = !compareFn(value, lastSavedValueRef.current);
    if (!isDifferent) {
      return;
    }

    setStatus('unsaved');

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      executeSave(latestValueRef.current);
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, debounceMs, enabled, compareFn, executeSave]);

  const saveNow = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    await executeSave(latestValueRef.current);
  }, [executeSave]);

  const resetStatus = useCallback(() => {
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  return {
    status,
    lastSavedAt,
    errorMessage,
    isSaving: status === 'saving',
    isSaved: status === 'saved',
    isDirty: status === 'unsaved',
    isOffline,
    saveNow,
    resetStatus
  };
}
