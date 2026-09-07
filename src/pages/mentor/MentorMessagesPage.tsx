import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Send,
  ArrowLeft,
  Users
} from 'lucide-react';

export const MentorMessagesPage: React.FC = () => {
  const { myStudents, sendMessage, getMessagesWithUser } = useMentor();
  const { currentUser } = useAuth();

  const [selectedStudentId, setSelectedStudentId] = useState<string>(myStudents[0]?.studentId || '');
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);

  const activeMentee = myStudents.find(m => m.studentId === selectedStudentId) || myStudents[0];
  const threadMessages = activeMentee ? getMessagesWithUser(activeMentee.studentId) : [];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeMentee) return;
    setSending(true);
    try {
      await sendMessage(activeMentee.studentId, inputText.trim());
      setInputText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentee Communications</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Direct asynchronous channel with assigned student cohort.
          </p>
        </div>

        {myStudents.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            No mentees currently assigned.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[550px]">
            {/* Mentees list */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">My Mentees</h3>
              {myStudents.map(m => (
                <button
                  key={m.studentId}
                  onClick={() => setSelectedStudentId(m.studentId)}
                  className={`w-full p-3 rounded-2xl text-left transition ${
                    (selectedStudentId === m.studentId || (!selectedStudentId && m.studentId === myStudents[0].studentId))
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.studentName}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{m.studentDepartment}</p>
                </button>
              ))}
            </div>

            {/* Chat Thread */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-xs">
                Chatting with {activeMentee?.studentName || 'Student'}
              </div>

              <div className="p-6 overflow-y-auto space-y-4 flex-1 max-h-[420px]">
                {threadMessages.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No messages yet. Send an advisory update or assignment.
                  </div>
                ) : (
                  threadMessages.map(msg => {
                    const isMe = msg.senderId === currentUser?.id;
                    return (
                      <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-tr-none'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                          }`}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 font-mono">
                          {new Date(msg.sentAt || msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Send guidance to student..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={sending || !inputText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2"
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
