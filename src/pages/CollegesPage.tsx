import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Award } from 'lucide-react';

export const CollegesPage: React.FC = () => {
  const colleges = [
    { name: "Hindustan Institute of Technology", city: "Coimbatore", count: 8 },
    { name: "Karpagam College of Engineering", city: "Coimbatore", count: 12 },
    { name: "KPR Institute of Engineering and Technology", city: "Coimbatore", count: 15 },
    { name: "SNS College of Technology", city: "Coimbatore", count: 9 },
    { name: "Tamil Nadu Agricultural University", city: "Coimbatore", count: 6 },
    { name: "PSG College of Technology", city: "Coimbatore", count: 18 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Partner Colleges & Universities</h1>
        <p className="text-xs text-slate-500 mt-1">Explore engineering colleges, deemed universities, and polytechnics hosting verified events on ACE.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {colleges.map((c, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs hover:shadow-lg transition-all">
            <div className="p-3 bg-purple-50 text-brand-600 rounded-2xl w-fit">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">{c.name}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {c.city}, Tamil Nadu
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-600">{c.count} Live Events</span>
              <Link to={`/events?q=${encodeURIComponent(c.name)}`} className="text-slate-500 hover:text-brand-600">View Events →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
