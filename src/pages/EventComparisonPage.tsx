import { Link } from 'react-router-dom';
import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const EventComparisonPage: React.FC = () => {
  const { events } = useApp();
  const compareItems = events.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">AI Event Comparison Matrix</h1>
        <p className="text-xs text-slate-500 mt-1">Side-by-side analysis of mode, ticket price, certificates, and suitability.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {compareItems.map((e, idx) => (
          <div key={e.identity} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="p-3 bg-purple-50 rounded-2xl text-center font-bold text-xs text-brand-700">
              {idx === 0 ? 'Best for Coding & Symposiums' : idx === 1 ? 'Top Free Hackathon' : 'Best Research Value'}
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">{e.title}</h3>
            <div className="divide-y divide-slate-100 text-xs space-y-2">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-400">Mode</span>
                <span className="font-bold">{e.mode}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-400">Price</span>
                <span className="font-bold text-brand-600">{e.isPaid ? '₹200' : 'FREE'}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-400">Location</span>
                <span className="font-bold">{e.location?.city}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-400">Certificate</span>
                <span className="font-bold text-emerald-600">Yes (Verified)</span>
              </div>
            </div>
            <Link to={`/events/${e.slug}`} className="block">
              <Button variant="primary" size="sm" className="w-full">
                View Full Details
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
