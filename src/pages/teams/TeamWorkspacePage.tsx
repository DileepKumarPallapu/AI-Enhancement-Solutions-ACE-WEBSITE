import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users, CheckCircle2, Plus, Github, Figma, Link2, ExternalLink, MessageSquare, ShieldCheck } from 'lucide-react';
import { teamDb, TeamWorkspace, TeamTask } from '../../services/db/teamDatabase';
import { useAuth } from '../../context/AuthContext';

export const TeamWorkspacePage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';

  const [team, setTeam] = useState<TeamWorkspace | null>(teamDb.getById(teamId || 'team_veltech_neural_01'));
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const t = teamDb.getById(teamId || 'team_veltech_neural_01');
    setTeam(t);
    const unsub = teamDb.subscribe(() => {
      setTeam(teamDb.getById(teamId || 'team_veltech_neural_01'));
    });
    return unsub;
  }, [teamId]);

  if (!team) return null;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    teamDb.addTask(team.id, {
      title: taskTitle,
      status: 'TODO',
      priority: 'HIGH',
      assignedToUserId: currentUserId,
      assignedToName: user?.displayName || 'Dileep Kumar'
    });
    setTaskTitle('');
  };

  const handleToggleTask = (taskId: string, currentStatus: TeamTask['status']) => {
    const nextStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    teamDb.updateTaskStatus(team.id, taskId, nextStatus);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Workspace Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Private Hackathon Workspace</span>
              <h1 className="text-2xl font-bold text-white mt-1">{team.teamName}</h1>
              <p className="text-xs text-slate-400">{team.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                Event: {team.eventName}
              </span>
            </div>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Task Board */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Sprint Deliverables & Checklist</h3>
                <span className="text-xs text-slate-400">{team.tasks.filter(t => t.status === 'DONE').length} / {team.tasks.length} Completed</span>
              </div>

              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder="Add a new deliverable or code task..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
                >
                  Add Task
                </button>
              </form>

              <div className="space-y-2 pt-2">
                {team.tasks.map(tsk => (
                  <div
                    key={tsk.id}
                    onClick={() => handleToggleTask(tsk.id, tsk.status)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                      tsk.status === 'DONE'
                        ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`w-4 h-4 ${tsk.status === 'DONE' ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span className={`text-xs font-medium text-white ${tsk.status === 'DONE' ? 'line-through text-slate-400' : ''}`}>
                        {tsk.title}
                      </span>
                    </div>
                    {tsk.assignedToName && (
                      <span className="text-[10px] text-slate-400">{tsk.assignedToName}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources / Links */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Project Repositories & Artifacts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {team.resources.map(res => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white truncate">{res.title}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Members Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Squad Members</h3>
              <div className="space-y-3">
                {team.members.map(m => (
                  <div key={m.userId} className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <img src={m.avatarUrl} alt={m.fullName} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white">{m.displayName}</h4>
                      <p className="text-[10px] text-emerald-400 font-medium">{m.roleInTeam}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[160px]">{m.institutionName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
