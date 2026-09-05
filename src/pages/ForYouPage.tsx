import React, { useState } from 'react';
import { Sparkles, Brain, ThumbsUp, ThumbsDown, Info, ArrowRight, ShieldCheck, Flame, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { EventCard } from '../components/events/EventCard';
import { Modal } from '../components/ui/Modal';
import { rankEventsForProfile } from '../services/aiService';

export const ForYouPage: React.FC = () => {
  const { user, events, giveFeedFeedback } = useApp();
  const [showExplanation, setShowExplanation] = useState(false);

  const ranked = rankEventsForProfile(events, user);
  const hackathons = ranked.filter(e => e.categoryName?.includes('Coding') || e.eventTypeName?.includes('Hackathon'));
  const freeOpportunities = ranked.filter(e => !e.isPaid);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      
      <PageHeader
        eyebrow="FOR YOU"
        title="Opportunities Selected"
        highlight="Around Your Interests."
        subtitle={`Personalized intelligence stream mapped to ${user.department} (${user.year}) at ${user.college}, located in ${user.city}.`}
        badge={
          <button
            onClick={() => setShowExplanation(true)}
            className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center gap-1 hover:bg-purple-200"
          >
            <Info className="w-3.5 h-3.5" /> Why am I seeing this?
          </button>
        }
      />

      {/* Section 1: Made For You */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" /> Made for You
          </h2>
          <span className="text-xs text-slate-400">Ranked by 8 profile dimensions</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranked.slice(0, 3).map(e => (
            <EventCard key={e.identity} event={e} showAiMatch={true} />
          ))}
        </div>
      </section>

      {/* Section 2: Recommended Hackathons */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" /> Recommended Hackathons
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.slice(0, 3).map(e => (
            <EventCard key={e.identity} event={e} showAiMatch={true} />
          ))}
        </div>
      </section>

      {/* Section 3: 100% Free Opportunities */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" /> Free Opportunities with Certificates
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeOpportunities.slice(0, 3).map(e => (
            <EventCard key={e.identity} event={e} showAiMatch={false} />
          ))}
        </div>
      </section>

      {/* Explanation Modal */}
      <Modal isOpen={showExplanation} onClose={() => setShowExplanation(false)} title="Why You Are Seeing These Recommendations">
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>ACE AI dynamically scores every event across <strong>8 dimensions</strong>:</p>
          <ul className="space-y-1.5 pl-4 list-disc text-slate-700 dark:text-slate-200">
            <li><strong>Department Eligibility:</strong> Matching {user.department}</li>
            <li><strong>Skill Alignment:</strong> Matching your skills ({user.skills.slice(0, 3).join(', ')})</li>
            <li><strong>Location Proximity:</strong> Events in {user.city} and virtual online fests</li>
            <li><strong>Urgency:</strong> Events closing registration in the next 7 days</li>
          </ul>
          <p className="pt-2 text-purple-700 dark:text-purple-300 font-semibold">
            You can update your skills anytime in your Profile to adjust this feed.
          </p>
        </div>
      </Modal>

    </div>
  );
};
