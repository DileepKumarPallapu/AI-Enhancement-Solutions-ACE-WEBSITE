import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { Trophy, Sparkles, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

export const MentorEventGuidancePage: React.FC = () => {
  const { myStudents, recommendResource } = useMentor();
  const [recommendedEvent, setRecommendedEvent] = useState<string | null>(null);

  const upcomingEvents = [
    { slug: 'shaastra-hackathon-2026', title: 'Shaastra National Techfest 2026', type: 'HACKATHON', college: 'IIT Madras', date: 'Oct 15, 2026' },
    { slug: 'smart-india-hackathon', title: 'Smart India Hackathon 2026 Grand Finale', type: 'HACKATHON', college: 'National Level', date: 'Nov 20, 2026' },
    { slug: 'kurukshetra-coding', title: 'Kurukshetra Algorithmic Coding Challenge', type: 'COMPETITION', college: 'Anna University', date: 'Oct 28, 2026' }
  ];

  const handleRecommend = async (eventSlug: string, eventTitle: string, eventType: any) => {
    if (myStudents.length === 0) return;
    const targetStudent = myStudents[0];
    await recommendResource({
      studentId: targetStudent.studentId,
      type: eventType,
      targetId: eventSlug,
      title: eventTitle,
      description: 'Recommended by your faculty mentor based on your interest and skills.',
      reason: 'Ideal opportunity to showcase your autonomous agent project.',
      categoryTag: 'Flagship Event',
      actionUrl: `/events/${eventSlug}`
    });
    setRecommendedEvent(eventSlug);
    setTimeout(() => setRecommendedEvent(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link to="/mentor/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Command Center
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Event & Hackathon Guidance Hub</h1>
          <p className="text-xs text-slate-400 mt-1">Discover campus fests, recommend to students with 1-click, and track participation.</p>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map(ev => (
            <div key={ev.slug} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-300 font-mono">
                  {ev.type}
                </span>
                <h3 className="font-bold text-base text-white">{ev.title}</h3>
                <p className="text-xs text-slate-400">{ev.college} • {ev.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRecommend(ev.slug, ev.title, ev.type)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  {recommendedEvent === ev.slug ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
                  {recommendedEvent === ev.slug ? 'Dispatched to Students' : 'Recommend to Students'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
