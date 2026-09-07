import React, { useState } from 'react';
import { useMentor } from '../../../context/MentorContext';
import { useAuth } from '../../../context/AuthContext';
import { Send, ArrowLeft, Paperclip, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentMentorMessagesPage: React.FC = () => {
  const { assignedMentors, sendMessage, getMessagesWithUser } = useMentor();
  const { currentUser } = useAuth();
  
  const [activeMentorId, setActiveMentorId] = useState(assignedMentors[0]?.mentorId || '');
  const [inputText, setInputText] = useState('');

  const activeMentor = assignedMentors.find(a => a.mentorId === activeMentorId) || assignedMentors[0];
  const messages = activeMentorId ? getMessagesWithUser(activeMentorId) : [];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeMentorId) return;
    await sendMessage(activeMentorId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/student/mentor" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Mentor Chat Channel</h1>
          </div>

          {/* Mentor Selector */}
          <div className="flex items-center gap-2">
            {assignedMentors.map(m => (
              <button
                key={m.mentorId}
                onClick={() => setActiveMentorId(m.mentorId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeMentorId === m.mentorId ? 'bg-indigo-600 text-white shadow' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {m.mentorName}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Box */}
        {assignedMentors.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-3 shadow-sm">
            <p className="text-xs text-slate-500 dark:text-slate-400">You do not have an active assigned mentor to chat with yet.</p>
            <Link to="/student/mentors" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
              Find Faculty Mentor
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm dark:shadow-2xl flex flex-col h-[550px]">
            
            {/* Header */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  {activeMentor?.mentorName?.charAt(0) || 'M'}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{activeMentor?.mentorName || 'Campus Mentor'}</h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Verified Mentor • {activeMentor?.studentCollege || 'Vel Tech'}</p>
                </div>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  Send a message to begin your 1-on-1 mentorship discussion.
                </div>
              ) : (
                messages.map(msg => {
                  const isMe = msg.senderId === currentUser?.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                        isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-bl-none'
                      }`}>
                        <p>{msg.content}</p>
                        <span className="text-[9px] opacity-70 block text-right">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message or question for your mentor..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
