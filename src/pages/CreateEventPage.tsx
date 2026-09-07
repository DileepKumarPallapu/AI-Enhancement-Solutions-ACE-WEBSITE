import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Upload, FileText, Calendar, MapPin, Ticket, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateAiEventCopy, calculateEventQualityScore } from '../services/aiService';
import { Button } from '../components/ui/Button';
import { eventPersistenceDb } from '../services/db/eventPersistenceDatabase';
import { useAuth } from '../context/AuthContext';
import { useAutoSave } from '../hooks/useAutoSave';
import { SaveStatus } from '../components/common/SaveStatus';
import { useToast } from '../context/ToastContext';

export const CreateEventPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const userId = currentUser?.id || 'usr_student_dileep';

  const defaultCollege = currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';
  const defaultCity = currentUser?.location?.split(',')[0] || 'Chennai';
  const defaultState = currentUser?.location?.split(',')[1]?.trim() || 'Tamil Nadu';

  const initialDraft = eventPersistenceDb.getDraft(userId);

  const [step, setStep] = useState(initialDraft ? initialDraft.step : 1);
  const [formData, setFormData] = useState(initialDraft ? initialDraft.formData : {
    title: 'CodeSprint National AI Hackathon 2026',
    eventType: 'Hackathon',
    category: 'Technical & Coding',
    venue: `Department of Computer Science & Engineering, ${defaultCollege}`,
    audience: 'Engineering & Computer Science Students',
    mode: 'HYBRID',
    startDate: '2026-10-20',
    ticketPrice: '0',
    description: '',
    shortDescription: '',
    seoTitle: '',
    seoDescription: '',
    tags: ['AI', 'Hackathon', 'React', 'FastAPI'],
    perks: 'Cash Prizes ₹75,000 + Internship Offers + Certificates'
  });

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEventSlug, setSubmittedEventSlug] = useState<string | null>(null);

  // Autosave Draft Hook
  const autoSave = useAutoSave({
    value: { step, formData },
    debounceMs: 700,
    enabled: !submitted,
    onSave: async (val) => {
      eventPersistenceDb.saveDraft(userId, val.step, val.formData);
    }
  });

  const handleResetDraft = () => {
    eventPersistenceDb.clearDraft(userId);
    setStep(1);
    setFormData({
      title: '',
      eventType: 'Hackathon',
      category: 'Technical & Coding',
      venue: `Auditorium, ${defaultCollege}`,
      audience: 'All College Students',
      mode: 'OFFLINE',
      startDate: '2026-10-25',
      ticketPrice: '0',
      description: '',
      shortDescription: '',
      seoTitle: '',
      seoDescription: '',
      tags: [],
      perks: ''
    });
    showToast('Draft reset ✓');
  };

  const handleRunAiAssistant = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      const generated = generateAiEventCopy({
        title: formData.title || 'National AI Hackathon',
        eventType: formData.eventType,
        venue: formData.venue,
        audience: formData.audience,
        perks: formData.perks
      });
      setFormData(prev => ({
        ...prev,
        description: generated.description,
        shortDescription: generated.shortDescription,
        seoTitle: generated.seoTitle,
        seoDescription: generated.seoDescription,
        tags: generated.tags
      }));
      setIsAiGenerating(false);
      showToast('AI copy generated and autosaved ✓');
    }, 600);
  };

  const qualityAssessment = calculateEventQualityScore({
    title: formData.title,
    description: formData.description || 'Sample preview description',
    bannerImages: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200'],
    mode: formData.mode as any,
    location: { venue: formData.venue },
    tickets: [{ id: 1, name: 'General Pass', isPaid: formData.ticketPrice !== '0', price: Number(formData.ticketPrice) || 0, currency: '₹' }],
    eventContacts: [{ name: currentUser?.fullName || 'Coordinator', phone: currentUser?.phoneNumber || '+91-9988776655' }]
  });

  const handleSubmitEvent = () => {
    const slug = `${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-6)}`;
    const newEvent = eventPersistenceDb.saveEvent({
      slug,
      title: formData.title,
      eventType: formData.eventType,
      category: formData.category,
      venue: formData.venue,
      city: defaultCity,
      state: defaultState,
      audience: formData.audience,
      mode: formData.mode as any,
      startDate: formData.startDate,
      ticketPrice: Number(formData.ticketPrice) || 0,
      currency: '₹',
      description: formData.description || formData.shortDescription || 'Event hosted on ACE platform.',
      shortDescription: formData.shortDescription || formData.description.slice(0, 150),
      perks: formData.perks,
      bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
      organizerId: userId,
      organizerName: currentUser?.fullName || 'Campus Organizer',
      institutionId: currentUser?.institutionId || 'inst-vel-tech-rangarajan-avadi',
      college: defaultCollege,
      qualityScore: qualityAssessment.score || 95,
      status: 'PUBLISHED',
      tags: formData.tags.length > 0 ? formData.tags : ['Technical', 'College']
    });

    eventPersistenceDb.clearDraft(userId);
    setSubmitted(true);
    setSubmittedEventSlug(slug);
    confetti({ particleCount: 90, spread: 70 });
    showToast('Event published successfully to ACE directory! 🎉');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Host / Submit a College Event</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Smart Event Creation Wizard with Auto-Drafting & Quality Verification</p>
        </div>
        <div className="flex items-center gap-3">
          <SaveStatus status={autoSave.status} lastSavedAt={autoSave.lastSavedAt} />
          {!submitted && (
            <button
              type="button"
              onClick={handleResetDraft}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Reset Draft"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-5 gap-2 text-center text-xs font-semibold">
        {[
          { num: 1, label: 'Basic Info' },
          { num: 2, label: 'Date & Venue' },
          { num: 3, label: 'Tickets' },
          { num: 4, label: 'AI Copywriter' },
          { num: 5, label: 'Review & Submit' }
        ].map(s => (
          <div
            key={s.num}
            onClick={() => !submitted && setStep(s.num)}
            className={`p-2.5 rounded-xl border cursor-pointer transition ${
              step === s.num
                ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                : step > s.num
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800'
            }`}
          >
            <span>{s.num}. {s.label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
        
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 1: Basic Event Information</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Event Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. NEXORA 2026 Technical Symposium"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Event Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none"
                >
                  <option value="Hackathon">Hackathon</option>
                  <option value="Symposium">Symposium</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Contest">Coding Contest</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Mode</label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none"
                >
                  <option value="OFFLINE">Offline On-Campus</option>
                  <option value="ONLINE">Online Virtual</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 2: Date & Physical Venue</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">College Venue & Department</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Audience</label>
                <input
                  type="text"
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 3: Tickets & Registration Fee</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Delegate Fee (₹ 0 for Free Registration)</label>
              <input
                type="number"
                value={formData.ticketPrice}
                onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Perks & Awards</label>
              <input
                type="text"
                value={formData.perks}
                onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white outline-none"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" /> Step 4: AI Content Assistant
              </h3>
              <Button variant="ai" size="sm" onClick={handleRunAiAssistant} disabled={isAiGenerating}>
                {isAiGenerating ? 'Generating...' : '✨ Generate Full Event Description'}
              </Button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Generated Description</label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Click the Generate button above to create rich copy automatically..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white font-mono"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 5: Review & AI Quality Verification</h3>
            
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200 block">AI Quality & Authenticity Score</span>
                <span className="text-[11px] text-purple-700 dark:text-purple-300">{qualityAssessment.status} Listing</span>
              </div>
              <span className="text-2xl font-black text-brand-600 dark:text-brand-400">{qualityAssessment.score}/100</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Venue:</strong> {formData.venue}</p>
              <p><strong>College:</strong> {defaultCollege}</p>
              <p><strong>Fee:</strong> {formData.ticketPrice === '0' || !formData.ticketPrice ? 'FREE' : `₹${formData.ticketPrice}`}</p>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-bold text-center">
                🎉 Event Published Successfully to ACE Directory!
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="outline"
            size="md"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1 || submitted}
          >
            Previous
          </Button>

          {step < 5 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(step + 1)}
              disabled={submitted}
            >
              Continue to Step {step + 1} →
            </Button>
          ) : (
            <Button
              variant="ai"
              size="md"
              disabled={submitted}
              onClick={handleSubmitEvent}
            >
              {submitted ? 'Published!' : 'Publish to ACE Platform'}
            </Button>
          )}
        </div>

      </div>

    </div>
  );
};
