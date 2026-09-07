import React, { useState } from 'react';
import { 
  UserCheck, Building2, User, Sparkles, 
  Trash2, ExternalLink, CheckCircle2 
} from 'lucide-react';
import { networkFollowDb, FollowRecord } from '../../services/db/networkFollowDatabase';
import { ACECard, ACEBadge, ACEButton, ACEEmptyState } from '../../components/ui/ace';
import { useToast } from '../../context/ToastContext';

export const FollowingPage: React.FC = () => {
  const [follows, setFollows] = useState<FollowRecord[]>(networkFollowDb.getFollows('usr_student_dileep'));
  const { showToast } = useToast();

  const handleUnfollow = (record: FollowRecord) => {
    networkFollowDb.toggleFollow('usr_student_dileep', record.targetType, record.targetId, record.targetName);
    setFollows(networkFollowDb.getFollows('usr_student_dileep'));
    showToast(`Unfollowed ${record.targetName}`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              Following Network
            </span>
            <h1 className="text-2xl font-bold text-white">Entities & Topics You Follow</h1>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950 px-3 py-1 rounded-lg border border-indigo-800">
            {follows.length} Followed
          </span>
        </div>

        {follows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {follows.map((item) => (
              <ACECard key={item.id} className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ACEBadge variant="primary">{item.targetType}</ACEBadge>
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.targetName}</h3>
                  {item.targetSubtitle && <p className="text-xs text-slate-400">{item.targetSubtitle}</p>}
                </div>

                <button
                  onClick={() => handleUnfollow(item)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-xs font-medium text-slate-300 transition-all cursor-pointer border border-slate-700"
                >
                  Unfollow
                </button>
              </ACECard>
            ))}
          </div>
        ) : (
          <ACEEmptyState
            title="You are not following any entities yet"
            description="Follow colleges, faculty mentors, companies, and technical topics to personalize your opportunity feed."
          />
        )}
      </div>
    </div>
  );
};
export default FollowingPage;
