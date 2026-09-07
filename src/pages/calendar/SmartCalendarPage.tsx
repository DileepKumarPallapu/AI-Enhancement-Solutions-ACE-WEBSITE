import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  MapPin, 
  Video, 
  Bell, 
  Tag, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { calendarDb, CalendarEventItem, CalendarItemType } from '../../services/db/calendarDatabase';
import { useAuth } from '../../context/AuthContext';

export const SmartCalendarPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [activeView, setActiveView] = useState<'MONTH' | 'WEEK' | 'AGENDA'>('AGENDA');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<CalendarItemType>('ACADEMIC_DEADLINE');
  const [newStartTime, setNewStartTime] = useState('');
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    setEvents(calendarDb.getByUser(currentUserId));
    const unsub = calendarDb.subscribe(() => {
      setEvents(calendarDb.getByUser(currentUserId));
    });
    return unsub;
  }, [currentUserId]);

  const filteredEvents = events.filter(e => {
    if (selectedType === 'ALL') return true;
    return e.type === selectedType;
  });

  const handleToggleComplete = (id: string) => {
    calendarDb.toggleCompleted(id);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newStartTime) return;

    calendarDb.addEvent({
      userId: currentUserId,
      title: newTitle,
      type: newType,
      priority: 'HIGH',
      startTime: new Date(newStartTime).toISOString(),
      endTime: new Date(new Date(newStartTime).getTime() + 3600000).toISOString(),
      location: newLocation || 'Vel Tech Campus',
      isOnline: newLocation.toLowerCase().includes('http') || newLocation.toLowerCase().includes('meet'),
      reminderMinutesBefore: [1440, 60],
      isCompleted: false,
      colorHex: '#10b981',
      tags: ['Academic', 'Personal']
    });

    setNewTitle('');
    setNewLocation('');
    setShowAddModal(false);
  };

  const getTypeBadge = (type: CalendarItemType) => {
    switch (type) {
      case 'REGISTERED_EVENT':
        return { label: 'Registered Event', bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400' };
      case 'MENTOR_SESSION':
        return { label: 'Mentor Session', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' };
      case 'ACADEMIC_DEADLINE':
        return { label: 'Academic Deadline', bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400' };
      case 'COMPETITION_ROUND':
        return { label: 'Competition Round', bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400' };
      default:
        return { label: 'Activity', bg: 'bg-slate-500/10 border-slate-500/30 text-slate-400' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-emerald-400" /> Smart ACE Calendar
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Unified real-time schedule for registered hackathons, mentor 1-on-1s, milestones, and deadlines.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition shadow-lg shadow-emerald-900/30"
            >
              <Plus className="w-4 h-4" /> Add Academic Milestone
            </button>
          </div>
        </div>

        {/* View Switcher & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2">
            {(['AGENDA', 'WEEK', 'MONTH'] as const).map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeView === v
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Event Types</option>
              <option value="REGISTERED_EVENT">Registered Events</option>
              <option value="MENTOR_SESSION">Mentor Sessions</option>
              <option value="ACADEMIC_DEADLINE">Academic Deadlines</option>
              <option value="COMPETITION_ROUND">Competition Rounds</option>
            </select>
          </div>
        </div>

        {/* Calendar View Content */}
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <CalendarIcon className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-semibold text-slate-300">No scheduled calendar items</h3>
              <p className="text-xs text-slate-500">Register for upcoming events or book mentor sessions to populate your schedule.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map(event => {
                const badge = getTypeBadge(event.type);
                return (
                  <div
                    key={event.id}
                    className={`p-5 rounded-2xl bg-slate-900 border transition hover:border-slate-700 space-y-4 ${
                      event.isCompleted ? 'opacity-60 border-slate-800/50' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <button
                        onClick={() => handleToggleComplete(event.id)}
                        className={`text-xs flex items-center gap-1 font-medium transition ${
                          event.isCompleted ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {event.isCompleted ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>

                    <div>
                      <h3 className={`text-base font-bold text-white ${event.isCompleted ? 'line-through text-slate-400' : ''}`}>
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{event.description}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{new Date(event.startTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {event.isOnline && event.meetingLink && (
                        <div className="flex items-center gap-2 pt-1">
                          <Video className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <a 
                            href={event.meetingLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                          >
                            Join Online Call <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {event.tags.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleCreateEvent} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Add Academic Milestone</h3>
            
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Vel Tech Hackathon Submission"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Category</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="ACADEMIC_DEADLINE">Academic Deadline</option>
                  <option value="REGISTERED_EVENT">Event Milestone</option>
                  <option value="COMPETITION_ROUND">Competition Round</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={newStartTime}
                  onChange={e => setNewStartTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Location / Meeting Link</label>
              <input
                type="text"
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
                placeholder="Campus lab or URL"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
              >
                Save Milestone
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
