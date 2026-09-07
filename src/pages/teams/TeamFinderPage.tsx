import React, { useState, useEffect } from 'react';
import { Users, Plus, Sparkles, Filter, ExternalLink, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { teamDb, TeamWorkspace } from '../../services/db/teamDatabase';
import { useAuth } from '../../context/AuthContext';

export const TeamFinderPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  
  const [teams, setTeams] = useState<TeamWorkspace[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinTeamId, setJoinTeamId] = useState<string | null>(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [targetRole, setTargetRole] = useState('Frontend Engineer');

  useEffect(() => {
    setTeams(teamDb.getAll());
    const unsub = teamDb.subscribe(() => {
      setTeams(teamDb.getAll());
    });
    return unsub;
  }, []);

  const handleSendJoinRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinTeamId) return;

    teamDb.requestToJoin(joinTeamId, {
      userId: currentUserId,
      userName: user?.displayName || 'Dileep Kumar',
      userAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      userCollege: user?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      targetRole,
      pitchMessage
    });

    setJoinTeamId(null);
    setPitchMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-400" /> Hackathon Team Finder & Matchmaker
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Find cross-disciplinary teammates across universities and collaborate in private real-time workspaces.
            </p>
          </div>
          <a
            href="/teams/team_veltech_neural_01"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-lg shadow-emerald-900/30"
          >
            Open My Team Workspace
          </a>
        </div>

        {/* Squad Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map(team => (
            <div key={team.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">{team.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-xs font-semibold text-slate-300 border border-slate-800">
                    {team.members.length} / {team.targetSize} Members
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{team.teamName}</h3>
                <p className="text-xs text-slate-400">{team.tagline}</p>
              </div>

              {/* Members Preview */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500">Confirmed Roster:</span>
                <div className="flex flex-wrap gap-2">
                  {team.members.map(m => (
                    <div key={m.userId} className="flex items-center gap-2 p-1.5 pr-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <img src={m.avatarUrl} alt={m.fullName} className="w-6 h-6 rounded-lg object-cover" />
                      <div>
                        <span className="font-semibold text-white block">{m.displayName}</span>
                        <span className="text-[9px] text-slate-400">{m.roleInTeam}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Looking for Roles */}
              {team.lookingForRoles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400">Actively Recruiting:</span>
                  <div className="flex flex-wrap gap-2">
                    {team.lookingForRoles.map(role => (
                      <span key={role} className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
                        + {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <a
                  href={`/teams/${team.id}`}
                  className="text-xs text-slate-400 hover:text-white font-medium"
                >
                  View Workspace Details →
                </a>
                <button
                  onClick={() => setJoinTeamId(team.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition"
                >
                  Request to Join Squad
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Join Request Modal */}
      {joinTeamId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSendJoinRequest} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Join Squad Request</h3>
            
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Target Role</label>
              <input
                type="text"
                required
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Pitch & Relevant Project Experience</label>
              <textarea
                rows={3}
                required
                value={pitchMessage}
                onChange={e => setPitchMessage(e.target.value)}
                placeholder="Share your strengths, github links, or past hackathon achievements..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setJoinTeamId(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
