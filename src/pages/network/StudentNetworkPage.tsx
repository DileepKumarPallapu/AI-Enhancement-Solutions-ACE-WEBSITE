import React, { useState, useEffect } from 'react';
import { studentNetworkDatabase, PeerStudent } from '../../services/db/studentNetworkDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton, ACEEmptyState } from '../../components/ui/ace';
import { Users, UserPlus, UserCheck, Shield } from 'lucide-react';

export function StudentNetworkPage() {
  const [peers, setPeers] = useState<PeerStudent[]>([]);

  useEffect(() => {
    setPeers(studentNetworkDatabase.getPeers());
  }, []);

  const handleToggleFollow = (id: string) => {
    studentNetworkDatabase.toggleFollow(id);
    setPeers(studentNetworkDatabase.getPeers());
  };

  const handleConnection = (id: string) => {
    studentNetworkDatabase.sendConnectionRequest(id);
    setPeers(studentNetworkDatabase.getPeers());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Student Peer Network"
          description="Discover classmates, squad collaborators, and hackathon teammates across Vel Tech and partner institutions."
          badge="STUDENT NETWORK"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {peers.map((peer) => (
            <div key={peer.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-lg flex items-center justify-center">
                  {peer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{peer.name}</h4>
                  <p className="text-xs text-slate-500">{peer.department} • {peer.year}</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium truncate mt-0.5">{peer.institution}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {peer.skills.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-500">{peer.mutualConnections} mutual connections</div>
                <div className="flex gap-2">
                  <ACEButton
                    variant={peer.connectionStatus === 'CONNECTED' ? 'outline' : 'primary'}
                    size="sm"
                    className="flex-1 justify-center"
                    onClick={() => handleConnection(peer.id)}
                  >
                    {peer.connectionStatus === 'CONNECTED' ? 'Connected' : peer.connectionStatus === 'REQUEST_SENT' ? 'Pending' : 'Connect'}
                  </ACEButton>
                  <ACEButton
                    variant={peer.isFollowing ? 'outline' : 'secondary'}
                    size="sm"
                    onClick={() => handleToggleFollow(peer.id)}
                  >
                    {peer.isFollowing ? 'Following' : 'Follow'}
                  </ACEButton>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
