import React, { useState } from 'react';
import { socialNetworkDatabase, StudentConnection, FollowEntity, ConnectionRecommendation } from '../../services/db/socialNetworkDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Users, UserCheck, UserPlus, Check, X, Shield, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StudentConnectionsPage() {
  const [activeTab, setActiveTab] = useState<'CONNECTIONS' | 'REQUESTS' | 'SUGGESTED' | 'FOLLOWING'>('CONNECTIONS');
  const [connections, setConnections] = useState<StudentConnection[]>(socialNetworkDatabase.getActiveConnections());
  const [requests, setRequests] = useState<StudentConnection[]>(socialNetworkDatabase.getPendingRequests());
  const [suggested, setSuggested] = useState<ConnectionRecommendation[]>(socialNetworkDatabase.getSuggestedConnections());
  const [follows, setFollows] = useState<FollowEntity[]>(socialNetworkDatabase.getFollows());

  const handleAccept = (id: string) => {
    socialNetworkDatabase.acceptConnectionRequest(id);
    setConnections(socialNetworkDatabase.getActiveConnections());
    setRequests(socialNetworkDatabase.getPendingRequests());
  };

  const handleDecline = (id: string) => {
    socialNetworkDatabase.declineConnectionRequest(id);
    setRequests(socialNetworkDatabase.getPendingRequests());
  };

  const handleConnect = (rec: ConnectionRecommendation) => {
    socialNetworkDatabase.sendConnectionRequest(
      rec.userId,
      rec.fullName,
      rec.headline,
      rec.avatarUrl,
      rec.institutionName,
      rec.department,
      rec.sharedSkills
    );
    setSuggested(suggested.filter(s => s.userId !== rec.userId));
  };

  const handleToggleFollow = (targetId: string, type: FollowEntity['targetType'], name: string, avatar: string, badge?: string) => {
    socialNetworkDatabase.toggleFollow(targetId, type, name, avatar, badge);
    setFollows(socialNetworkDatabase.getFollows());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="Student Network & Campus Connections"
          description="Connect with peers, faculty mentors, official student chapters, and research teams."
          badge="CAMPUS GRAPH"
          actions={
            <Link to="/messages">
              <ACEButton variant="primary" size="sm" className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>Direct Messages</span>
              </ACEButton>
            </Link>
          }
        />

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          {[
            { id: 'CONNECTIONS', label: `My Connections (${connections.length})` },
            { id: 'REQUESTS', label: `Pending Requests (${requests.length})` },
            { id: 'SUGGESTED', label: 'AI Suggested Teammates' },
            { id: 'FOLLOWING', label: `Following (${follows.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'CONNECTIONS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map(conn => (
              <ACECard key={conn.id} className="p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-3">
                  <img src={conn.recipientAvatar} alt={conn.recipientName} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{conn.recipientName}</h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{conn.recipientHeadline}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{conn.recipientInstitution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {conn.matchingFactors.map(f => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                      ✓ {f}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                  <Link to="/messages" className="flex-1">
                    <ACEButton variant="outline" size="sm" className="w-full">Message</ACEButton>
                  </Link>
                  <Link to="/student/passport">
                    <ACEButton variant="outline" size="sm">Passport</ACEButton>
                  </Link>
                </div>
              </ACECard>
            ))}
          </div>
        )}

        {activeTab === 'REQUESTS' && (
          <div className="space-y-3 max-w-2xl">
            {requests.length === 0 ? (
              <ACECard className="p-8 text-center text-slate-500">
                <UserCheck className="w-10 h-10 mx-auto mb-2 text-indigo-400" />
                <p className="text-sm font-bold">No pending connection requests.</p>
              </ACECard>
            ) : (
              requests.map(req => (
                <ACECard key={req.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={req.recipientAvatar} alt={req.recipientName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{req.recipientName}</h4>
                      <p className="text-xs text-slate-500">{req.recipientHeadline}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 transition"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept
                    </button>
                    <button
                      onClick={() => handleDecline(req.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 transition"
                    >
                      <X className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                </ACECard>
              ))
            )}
          </div>
        )}

        {activeTab === 'SUGGESTED' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggested.map(rec => (
              <ACECard key={rec.userId} className="p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img src={rec.avatarUrl} alt={rec.fullName} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rec.fullName}</h4>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400">{rec.headline}</p>
                      <p className="text-[10px] text-slate-400">{rec.department}</p>
                    </div>
                  </div>
                  <ACEBadge variant="success" size="sm">{rec.matchScore}% Match</ACEBadge>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Shared Skills & Synergy</p>
                  <div className="flex flex-wrap gap-1">
                    {rec.sharedSkills.map(s => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleConnect(rec)}
                  className="w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Connect
                </button>
              </ACECard>
            ))}
          </div>
        )}

        {activeTab === 'FOLLOWING' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {follows.map(f => (
              <ACECard key={f.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={f.targetAvatar} alt={f.targetName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{f.targetName}</h4>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase">{f.targetType}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleFollow(f.targetId, f.targetType, f.targetName, f.targetAvatar, f.targetBadge)}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition"
                >
                  Following
                </button>
              </ACECard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
