import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Compass, QrCode, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';

export const StudentEventsPage: React.FC = () => {
  const { registeredEvents, events } = useApp();

  const myRegisteredList = events.filter(e => registeredEvents.includes(e.identity) || registeredEvents.includes(String(e.id)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/student" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">COLLEGIATE CALENDAR</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">My Registered Events & QR Passes</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="EVENT REGISTRATIONS"
        title="Registered"
        highlight="Passes."
        subtitle="Manage your symposium passes, check-in QR codes, and delegate credentials."
        actions={
          <Link to="/events">
            <Button variant="primary" size="md" icon={<Compass className="w-4 h-4" />}>
              Explore More Events
            </Button>
          </Link>
        }
      />

      <div className="space-y-4">
        {myRegisteredList.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">No Registered Events Yet</h3>
            <p className="text-xs text-slate-500">Explore symposiums and hackathons to reserve your delegate pass.</p>
            <Link to="/events">
              <Button variant="primary" size="md">
                Browse Events Catalog
              </Button>
            </Link>
          </div>
        ) : (
          myRegisteredList.map(e => (
            <div key={e.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] mb-1 inline-block">
                  CONFIRMED DELEGATE
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{e.title}</h3>
                <p className="text-slate-500 mt-1">{e.mode} · Status: Verified</p>
              </div>

              <div className="flex items-center gap-2">
                <Link to={`/events/${e.slug || e.id}`}>
                  <Button variant="outline" size="sm">
                    View Event Details
                  </Button>
                </Link>
                <Link to="/student/dashboard">
                  <Button variant="primary" size="sm" icon={<QrCode className="w-4 h-4" />}>
                    View QR Pass
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
