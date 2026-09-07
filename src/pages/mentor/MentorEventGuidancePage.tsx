import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { Trophy, Sparkles, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

export const MentorEventGuidancePage: React.FC = () => {
  const { myStudents, recommendResource } = useMentor();
  const [recommendedEvent, setRecommendedEvent] = useState<string | null>(null);

  const upcomingEvents = [
    { slug: 'shaastra-hackathon-2026', title: 'Shaastra National Techfest 2026', type: 'EVENT' as const, college: 'IIT Madras', date: 'Oct 15, 2026' },
    { slug: 'smart-india-hackathon', title: 'Smart India Hackathon 2026 Grand Finale', type: 'COMPETITION' as const, college: 'National Level', date: 'Nov 20, 2026' },
    { slug: 'kurukshetra-coding', title: 'Kurukshetra Algorithmic Coding Challenge', type: 'COMPETITION' as const, college: 'Anna University', date: 'Oct 28, 2026' }
  ];

  const handleRecommend = async (eventSlug: string, eventTitle: string, eventType: any) => {
    if (myStudents.length === 0) return;
    const targetStudent = myStudents[0];
    await recommendResource({
      targetStudentId: targetStudent.studentId,
      type: eventType,
      title: eventTitle,
      description: 'Recommended by your faculty mentor based on your interest and skills.',
      url: `/events/${eventSlug}`,
      recommendationReason: 'Ideal opportunity to showcase your autonomous agent project.',
      categoryTag: 'Flagship Event',
      linkedEventSlug: eventSlug,
      linkedEventTitle: eventTitle
    });
    setRecommendedEvent(eventSlug);
    setTimeout(() => setRecommendedEvent(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Event & Hackathon Guidance Hub</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Recommend national hackathons, technical conferences, and coding competitions directly to your student cohort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <div key={event.slug} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono">
                  {event.type}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{event.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{event.college} • {event.date}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                {recommendedEvent === event.slug ? (
                  <span className="w-full py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Recommendation Sent!
                  </span>
                ) : (
                  <button
                    onClick={() => handleRecommend(event.slug, event.title, event.type)}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" /> Recommend to Mentees
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
