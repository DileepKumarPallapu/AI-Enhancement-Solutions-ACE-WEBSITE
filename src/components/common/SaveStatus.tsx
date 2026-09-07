import React from 'react';
import { CheckCircle2, Loader2, AlertCircle, WifiOff, Cloud } from 'lucide-react';
import { AutoSaveStatus } from '../../hooks/useAutoSave';

interface SaveStatusProps {
  status: AutoSaveStatus;
  lastSavedAt?: Date | null;
  errorMessage?: string | null;
  onRetry?: () => void;
  className?: string;
  compact?: boolean;
}

export const SaveStatus: React.FC<SaveStatusProps> = ({
  status,
  lastSavedAt,
  errorMessage,
  onRetry,
  className = '',
  compact = false
}) => {
  if (status === 'idle' && !lastSavedAt) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs ${className}`}>
        {status === 'saving' && (
          <span className="flex items-center gap-1 text-indigo-600 font-medium animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Saving...</span>
          </span>
        )}
        {status === 'saved' && (
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saved</span>
          </span>
        )}
        {status === 'unsaved' && (
          <span className="flex items-center gap-1 text-amber-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Unsaved</span>
          </span>
        )}
        {status === 'offline' && (
          <span className="flex items-center gap-1 text-slate-500 font-medium" title="Changes saved locally">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline</span>
          </span>
        )}
        {status === 'error' && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium"
            title={errorMessage || 'Click to retry'}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Retry save</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${className} ${
      status === 'saving' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
      status === 'saved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
      status === 'unsaved' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
      status === 'offline' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
      status === 'error' ? 'bg-rose-50 text-rose-700 border border-rose-200 cursor-pointer' :
      'bg-slate-50 text-slate-500 border border-slate-200'
    }`}
    onClick={status === 'error' && onRetry ? onRetry : undefined}
    >
      {status === 'saving' && (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
          <span className="font-semibold">Saving changes...</span>
        </>
      )}

      {status === 'saved' && (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold">
            All changes saved {lastSavedAt && `at ${formatTime(lastSavedAt)}`}
          </span>
        </>
      )}

      {status === 'unsaved' && (
        <>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-semibold">Unsaved edits...</span>
        </>
      )}

      {status === 'offline' && (
        <>
          <WifiOff className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold">Offline mode (Saved locally)</span>
        </>
      )}

      {status === 'error' && (
        <>
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          <span className="font-semibold">{errorMessage || 'Save failed — click to retry'}</span>
        </>
      )}

      {status === 'idle' && lastSavedAt && (
        <>
          <Cloud className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-500">Saved at {formatTime(lastSavedAt)}</span>
        </>
      )}
    </div>
  );
};
