import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import { Send, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MentorMessagesPage: React.FC = () => {
  const { myStudents, sendMessage, getMessagesWithUser } = useMentor();
  const { currentUser } = useAuth();

  const [activeStudentId, setActiveStudentId] = useState(myStudents[0]?.studentId || 'usr_student_dileep');
  const [inputText, setInputText] = useState('');

  const activeStudent = myStudents.find(s => s.studentId === activeStudentId) || myStudents[0];
  const messages = getMessagesWithUser(activeStudentId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    await sendMessage(activeStudentId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <Link to="/mentor/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Command Center
          </Link>
          <h1 className="text-2xl font-extrabold text-white">Student Mentorship Inbox</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Sidebar */}
          <div className="p-4 border-r border-slate-800 space-y-2 overflow-y-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-2">Assigned Students</span>
            {myStudents.map(student => (
              <button
                key={student.id}
                onClick={() => setActiveStudentId(student.studentId)}
                className={`w-full p-3 rounded-2xl text-left flex items-center gap-3 transition ${
                  activeStudentId === student.studentId ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <img src={student.studentAvatar} alt={student.studentName} className="w-9 h-9 rounded-xl object-cover" />
                <div className="overflow-hidden">
                  <p className="font-bold text-xs truncate">{student.studentName}</p>
                  <p className={`text-[10px] truncate ${activeStudentId === student.studentId ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {student.primaryMentorshipArea}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 flex flex-col justify-between h-full bg-slate-950/40">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <img src={activeStudent?.studentAvatar} alt="Avatar" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-xs text-white">{activeStudent?.studentName}</h3>
                <p className="text-[10px] text-indigo-400">{activeStudent?.studentDepartment}</p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map(msg => {
                const isMe = msg.senderRole === 'MENTOR';
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'
                    }`}>
                      <p>{msg.content}</p>
                      <span className="text-[9px] opacity-70 block text-right">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSend} className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type guidance message or feedback..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 py-2 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
              />
              <button type="submit" className="p-2 rounded-xl bg-indigo-600 text-white">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
