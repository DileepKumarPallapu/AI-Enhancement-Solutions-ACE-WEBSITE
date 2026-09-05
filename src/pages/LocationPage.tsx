import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { MapPin } from 'lucide-react';

export const LocationPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const { events } = useApp();

  const formattedCity = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'Chennai';
  const cityEvents = events.filter(e => e.location?.city?.toLowerCase() === formattedCity.toLowerCase() || e.mode === 'ONLINE');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase mb-2">
          <MapPin className="w-4 h-4" /> Regional Campus Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">College Events in {formattedCity}</h1>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-2">
          Discover all verified technical symposiums, hackathons, and cultural fests hosted across colleges in {formattedCity}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cityEvents.map(e => (
          <EventCard key={e.identity} event={e} showAiMatch={false} />
        ))}
      </div>
    </div>
  );
};
