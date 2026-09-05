import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Upload, FileText, Calendar, MapPin, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateAiEventCopy, calculateEventQualityScore } from '../services/aiService';
import { Button } from '../components/ui/Button';

export const CreateEventPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: 'CodeSprint National Hackathon 2026',
    eventType: 'Hackathon',
    category: 'Technical & Coding',
    venue: 'Hindustan Institute of Technology, Coimbatore',
    audience: 'Engineering & Computer Science Students',
    mode: 'OFFLINE',
    startDate: '2026-10-10',
    ticketPrice: '0',
    description: '',
    shortDescription: '',
    seoTitle: '',
    seoDescription: '',
    tags: [] as string[],
    perks: 'Cash Prizes ₹50,000 + Internship Offers + Certificates'
  });

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRunAiAssistant = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      const generated = generateAiEventCopy({
        title: formData.title,
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
    }, 800);
  };

  const qualityAssessment = calculateEventQualityScore({
    title: formData.title,
    description: formData.description || 'Sample preview description',
    bannerImages: ['https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/55392a78-124c-4139-982b-2f3fcfdb6252-WhatsApp-Image-2026-08-31-at-9.37.06-PM.webp'],
    mode: formData.mode as any,
    location: { venue: formData.venue },
    tickets: [{ id: 1, name: 'General Pass', isPaid: formData.ticketPrice !== '0', price: Number(formData.ticketPrice), currency: '₹' }],
    eventContacts: [{ name: 'Coordinator', phone: '+91-9988776655' }]
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Host / Submit a College Event</h1>
        <p className="text-xs text-slate-500 mt-1">9-Step Intelligent Wizard with AI Copywriter & Quality Verification</p>
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
          <div key={s.num} className={`p-2.5 rounded-xl border ${step === s.num ? 'bg-brand-500 text-white border-brand-500 shadow-sm' : step > s.num ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-400 border-slate-200'}`}>
            <span>{s.num}. {s.label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
        
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900">Step 1: Basic Event Information</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Event Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Event Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none"
                >
                  <option value="Hackathon">Hackathon</option>
                  <option value="Symposium">Symposium</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mode</label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none"
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
            <h3 className="font-bold text-base text-slate-900">Step 2: Date & Physical Venue</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">College Venue & City</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Target Audience</label>
              <input
                type="text"
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900">Step 3: Tickets & Registration Fee</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Delegate Fee (₹ 0 for Free)</label>
              <input
                type="number"
                value={formData.ticketPrice}
                onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Perks & Awards</label>
              <input
                type="text"
                value={formData.perks}
                onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" /> Step 4: AI Content Assistant
              </h3>
              <Button variant="ai" size="sm" onClick={handleRunAiAssistant} disabled={isAiGenerating}>
                {isAiGenerating ? 'Generating...' : '✨ Generate Full Event Description'}
              </Button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Generated HTML Description</label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Click the Generate button above to create rich copy automatically..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 font-mono"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900">Step 5: Review & AI Quality Verification</h3>
            
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-900 block">AI Quality & Authenticity Score</span>
                <span className="text-[11px] text-purple-700">{qualityAssessment.status} Listing</span>
              </div>
              <span className="text-2xl font-black text-brand-600">{qualityAssessment.score}/100</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-700 space-y-1">
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Venue:</strong> {formData.venue}</p>
              <p><strong>Fee:</strong> {formData.ticketPrice === '0' ? 'FREE' : `₹${formData.ticketPrice}`}</p>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold text-center">
                🎉 Event Submitted Successfully for Admin Review!
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Button
            variant="outline"
            size="md"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>

          {step < 5 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(step + 1)}
            >
              Continue to Step {step + 1} →
            </Button>
          ) : (
            <Button
              variant="ai"
              size="md"
              onClick={() => {
                setSubmitted(true);
                confetti({ particleCount: 80, spread: 60 });
              }}
            >
              Submit for Publication
            </Button>
          )}
        </div>

      </div>

    </div>
  );
};
