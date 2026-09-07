import React, { useState } from 'react';
import { useMentor } from '../../../context/MentorContext';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Send,
  ArrowLeft,
  Users
} from 'lucide-react';
import { MentorshipMessage } from '../../../types/mentorship';

export const StudentMentorMessagesPage: React.FC = () => {
  const { collegeMentors, sendMessage, getMessagesWithUser } = useMentor();
  const { currentUser } = useAuth();

  const [selectedMentorId, setSelectedMentorId] = useState<string>(collegeMentors[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);

  const activeMentor = collegeMentors.find(m => m.id === selectedMentorId) || collegeMentors[0];
  const threadMessages = activeMentor ? getMessagesWithUser(activeMentor.id) : [];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeMentor) return;
    setSending(true);
    try {
      await sendMessage(activeMentor.id, inputText.trim());
      setInputText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/student/mentorship" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentorship Hub
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentor Communications</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Direct, asynchronous guidance and file reviews with your faculty leads.
            </p>
          </div>
        </div>

        {collegeMentors.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
            <Users className="w-8 h-8 mx-auto text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No mentors available</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Request mentorship first to start a direct advisory messaging channel.</p>
            <Link to="/student/mentorship/find" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs">
              Find Verified Mentor
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
            {/* Mentors sidebar */}
            <div className="lg:col-span-1 space-y-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Faculty Mentors</h3>
              {collegeMentors.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMentorId(m.id)}
                  className={`w-full p-3 rounded-2xl text-left transition flex items-center gap-3 ${
                    (selectedMentorId === m.id || (!selectedMentorId && m.id === collegeMentors[0].id))
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <img
                    src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={m.fullName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.fullName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{m.department}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat Thread */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden shadow-sm">
              {/* Thread Header */}
              {activeMentor && (
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeMentor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={activeMentor.fullName}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activeMentor.fullName}</h4>
                      <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                        {activeMentor.designation} • {activeMentor.academicSchool}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Online
                  </span>
                </div>
              )}

              {/* Messages Area */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 max-h-[450px]">
                {threadMessages.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                    Start a conversation with {activeMentor?.fullName}. Send updates on projects or ask questions.
                  </div>
                ) : (
                  threadMessages.map(msg => {
                    const isMe = msg.senderId === currentUser?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-tr-none'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                          }`}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                          {new Date(msg.sentAt || msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder={`Send message to ${activeMentor?.fullName || 'mentor'}...`}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={sending || !inputText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
