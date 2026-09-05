import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Share2, 
  Bookmark, 
  Heart, 
  Users, 
  Sparkles, 
  Award, 
  Building2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Ticket, 
  ExternalLink,
  ChevronRight,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { fetchEventBySlug } from '../services/api';
import { EventItem } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { savedEvents, likedEvents, toggleSaveEvent, toggleLikeEvent, registerForEvent, registeredEvents, user } = useApp();
  
  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'tickets' | 'eligibility' | 'faqs'>('overview');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      fetchEventBySlug(slug).then(data => {
        setEvent(data);
        setIsLoading(false);
      });
    }
  }, [slug]);

  if (isLoading || !event) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading verified event details...</p>
      </div>
    );
  }

  const isSaved = savedEvents.includes(event.slug);
  const isLiked = likedEvents.includes(event.slug);
  const isRegistered = registeredEvents.includes(event.slug);

  const handleRegister = () => {
    registerForEvent(event.slug);
    setRegistrationSuccess(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`Registered via AllCollegeEvent: ${window.location.href}`);
    const location = encodeURIComponent(event.location?.venue || 'Campus');
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <div className="space-y-10 pb-24">
      
      {/* 1. HERO POSTER & METADATA BANNER */}
      <section className="bg-slate-900 text-white relative overflow-hidden py-10 sm:py-16">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#7F00FF_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Poster */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 aspect-[16/10] bg-slate-800">
            <img
              src={event.bannerImages?.[0]}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Header Info */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="purple" size="md" className="font-bold">
                {event.mode} Mode
              </Badge>
              {event.eventTypeName && (
                <Badge variant="neutral" size="md" className="bg-white/10 text-white border-white/20">
                  {event.eventTypeName}
                </Badge>
              )}
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold ml-2">
                <ShieldCheck className="w-4 h-4" /> ACE Verified Listing
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {event.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-purple-200">
              <Building2 className="w-4 h-4 text-brand-400" />
              <span className="font-bold">{event.org?.organizationName || 'Verified College Organizers'}</span>
            </div>

            {/* Event Time & Venue Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Calendar className="w-4 h-4 text-brand-400" />
                <span>{event.calendars?.[0]?.startDate || 'Upcoming Date'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span className="truncate">{event.location?.venue || 'Campus Grounds'}</span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {isRegistered ? (
                <Button variant="secondary" size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Registered Successfully
                </Button>
              ) : (
                <Button variant="ai" size="lg" onClick={() => setIsRegisterModalOpen(true)}>
                  Register Now • {event.isPaid ? `₹${event.tickets?.[0]?.price || 200}` : 'FREE'}
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleSaveEvent(event.slug)}
                className={`${isSaved ? 'bg-brand-500 text-white border-brand-500' : 'bg-white/10 text-white border-white/20'}`}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsShareModalOpen(true)}
                className="bg-white/10 text-white border-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TAB NAVIGATION & DETAILS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tabbed Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'schedule', label: 'Rounds & Timeline' },
              { key: 'tickets', label: 'Tickets & Pricing' },
              { key: 'eligibility', label: 'Eligibility & Rules' },
              { key: 'faqs', label: 'FAQs & Contact' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-xl font-black text-slate-900">About the Event</h3>
              <div 
                className="text-sm text-slate-700 leading-relaxed space-y-3 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />

              {/* Event Perks Grid */}
              {event.eventPerks && event.eventPerks.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-600" /> Perks & Rewards
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {event.eventPerks.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-semibold text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Schedule & Rounds */}
          {activeTab === 'schedule' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-xl font-black text-slate-900">Rounds & Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                    R1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Inauguration & Keynote Presentation</h4>
                    <p className="text-xs text-slate-500 mt-0.5">09:00 AM - 10:30 AM</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Welcome address by department heads, introduction of panel judges, and distribution of symposium kits.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                    R2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Main Competition Sprint</h4>
                    <p className="text-xs text-slate-500 mt-0.5">11:00 AM - 03:30 PM</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Concurrent tracks: Coding showdowns, technical paper presentations, CAD challenges, and AI demos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Valedictory & Prize Distribution</h4>
                    <p className="text-xs text-slate-500 mt-0.5">04:00 PM - 05:00 PM</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Announcement of cash prize winners, trophy distribution, and certificate issuance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Tickets & Registration */}
          {activeTab === 'tickets' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-xl font-black text-slate-900">Available Ticket Tiers</h3>
              <div className="space-y-4">
                {event.tickets?.map(ticket => (
                  <div key={ticket.id} className="p-5 rounded-2xl border border-brand-200 bg-brand-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{ticket.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{ticket.description || 'Full access delegate pass with certificate & kit.'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black text-slate-900">
                        {!ticket.isPaid || ticket.price === 0 ? 'FREE' : `₹${ticket.price}`}
                      </span>
                      <Button variant="primary" size="sm" onClick={() => setIsRegisterModalOpen(true)}>
                        Select Ticket
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Eligibility & Rules */}
          {activeTab === 'eligibility' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-xl font-black text-slate-900">Eligibility & Guidelines</h3>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>• <strong>Eligible Departments:</strong> {event.eligibleDeptIdentities?.join(', ') || 'All engineering and arts/science disciplines.'}</p>
                <p>• <strong>ID Card:</strong> All participants must present a valid college identity card at the verification desk.</p>
                <p>• <strong>Laptops:</strong> Recommended for coding, technical web design, and algorithmic tracks.</p>
                <p>• <strong>Certificates:</strong> Issued only to verified attendees who complete all rounds.</p>
              </div>
            </div>
          )}

          {/* Tab 5: FAQs */}
          {activeTab === 'faqs' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-xl font-black text-slate-900">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                  <h4 className="font-bold text-xs text-slate-900">Is spot registration available?</h4>
                  <p className="text-xs text-slate-600">Spot registrations depend on seat limits. Prior online registration through ACE is strongly recommended.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                  <h4 className="font-bold text-xs text-slate-900">Is food and accommodation provided?</h4>
                  <p className="text-xs text-slate-600">{event.eventAccommodations?.[0] || 'Lunch is included. Hostel accommodation is available on nominal charge.'}</p>
                </div>
              </div>

              {/* Contact Organizers */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-2">Organizer Contacts</h4>
                {event.eventContacts?.map((c, i) => (
                  <div key={i} className="flex items-center gap-4 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">{c.name}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-brand-600" /> {c.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-brand-600" /> {c.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: AI Insights & Quick Booking Sidebar */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* AI Student Match Analysis */}
          <div className="bg-purple-50 rounded-3xl border border-purple-200 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h4 className="font-bold text-sm text-purple-950">Why This Event Suits You</h4>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              {event.aiSuitabilityReason || 'Strongly aligns with your Computer Science interests, full-stack skills, and Chennai region.'}
            </p>
            <div className="p-3 bg-white/80 rounded-xl flex items-center justify-between text-xs">
              <span className="text-purple-900 font-semibold">AI Match Score</span>
              <span className="font-black text-brand-600 text-sm">94% Fit</span>
            </div>
          </div>

          {/* Quick Registration Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h4 className="font-bold text-sm text-slate-900">Registration Summary</h4>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Registration Status:</span>
                <span className="font-bold text-emerald-600">Open Now</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Ticket Price:</span>
                <span className="font-bold text-slate-900">{event.isPaid ? '₹200' : 'FREE'}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Verified Certificate:</span>
                <span className="font-bold text-brand-600">Included</span>
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full" onClick={() => setIsRegisterModalOpen(true)}>
              {isRegistered ? 'View Pass' : 'Register Now'}
            </Button>

            <button
              onClick={handleAddToCalendar}
              className="w-full text-center text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" /> Sync to Google Calendar
            </button>
          </div>

        </div>

      </div>

      {/* REGISTRATION MODAL */}
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} title="Confirm Event Registration">
        {registrationSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">You're Registered for {event.title}!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Confirmation and ticket pass have been saved to your student dashboard.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Button variant="primary" size="md" onClick={handleAddToCalendar}>
                Add to Google Calendar
              </Button>
              <Button variant="outline" size="md" onClick={() => setIsRegisterModalOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
              <p><strong>Participant:</strong> {user.name}</p>
              <p><strong>College:</strong> {user.college}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <p className="text-xs text-slate-500">
              By confirming, your delegate pass will be generated and your profile will be registered with the organizing committee.
            </p>
            <Button variant="primary" size="lg" className="w-full" onClick={handleRegister}>
              Confirm Registration ({event.isPaid ? '₹200' : 'FREE'})
            </Button>
          </div>
        )}
      </Modal>

      {/* SHARE MODAL */}
      <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="Share Event with Friends">
        <div className="space-y-4 text-center py-2">
          <p className="text-xs text-slate-500">
            Share with classmates on WhatsApp or LinkedIn. You earn +10 ACE Reward points for every successful join!
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${event.title} on AllCollegeEvent: ${window.location.href}`)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Event link copied to clipboard!');
            }}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Copy Event Link
          </button>
        </div>
      </Modal>

    </div>
  );
};
