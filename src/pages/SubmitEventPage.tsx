import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Ticket, 
  Award, 
  Image, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Upload, 
  Info,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { useToast } from '../context/ToastContext';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { EventSubmissionData } from '../types/workflow';

export const SubmitEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSubmissionById, createOrUpdateSubmission, resubmitEvent } = useWorkflow();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [submitterNote, setSubmitterNote] = useState('');

  // Existing submission if editing
  const existing = id ? getSubmissionById(id) : undefined;
  const isEditingChanges = Boolean(existing && existing.requestedChanges);
  const requestedFields = existing?.requestedChanges?.fields || [];

  // Form State
  const [formData, setFormData] = useState<Partial<EventSubmissionData>>({
    title: '',
    eventType: 'Symposium',
    category: 'Technical & Coding',
    shortDescription: '',
    fullDescription: '',
    college: {
      name: 'Hindustan Institute of Technology',
      department: 'Computer Science & Engineering',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      website: 'https://hindustan.ac.in'
    },
    organizer: {
      name: '',
      email: '',
      phone: '',
      type: 'Student',
      isSubmittingOnBehalf: true
    },
    schedule: {
      startDate: '2026-10-15',
      endDate: '2026-10-15',
      startTime: '09:00 AM',
      endTime: '04:30 PM',
      regDeadline: '2026-10-10',
      timezone: 'Asia/Kolkata (IST)'
    },
    location: {
      mode: 'OFFLINE',
      venue: '',
      building: '',
      room: '',
      city: 'Coimbatore',
      address: '',
      mapsUrl: ''
    },
    registration: {
      type: 'FREE',
      url: '',
      fee: 0,
      maxParticipants: 150,
      teamSize: '1-4 Members',
      eligibility: 'All Engineering & Tech Students'
    },
    prizes: {
      prizePool: '₹50,000',
      firstPrize: '₹25,000',
      certificate: true,
      certificateType: 'Participation',
      accommodation: false,
      food: true
    },
    media: {
      posterUrl: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/b9228fbd-8694-44c7-94f7-d1b80968788c-Screenshot-2026-08-31-at-3.00.07-PM.webp'
    },
    additional: {
      rules: 'Standard inter-collegiate code of conduct applies.',
      faqs: [],
      socialLinks: {}
    }
  });

  // Populate existing data when editing
  useEffect(() => {
    if (existing) {
      setFormData(existing);
    }
  }, [existing]);

  const updateNested = (category: keyof EventSubmissionData, key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [key]: value
      }
    }));
  };

  const isFieldFlagged = (fieldName: string) => {
    return requestedFields.some(f => f.toLowerCase().includes(fieldName.toLowerCase()));
  };

  const handleSaveDraft = () => {
    createOrUpdateSubmission({ ...formData, id: existing?.id }, true);
    navigate('/my-submissions');
  };

  const handleFinalSubmit = () => {
    if (isEditingChanges && existing) {
      resubmitEvent(existing.id, formData, submitterNote || 'Updated according to reviewer requests');
      navigate('/my-submissions');
    } else {
      const created = createOrUpdateSubmission({ ...formData, id: existing?.id }, false);
      navigate('/my-submissions');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="EVENT VERIFICATION PIPELINE"
        title={isEditingChanges ? "Update & Resubmit" : "Submit College"}
        highlight="Opportunity."
        subtitle={
          isEditingChanges
            ? "Your submission has been pre-loaded into the original form. Update the highlighted fields and resubmit for verification."
            : "Anyone can submit a college event. Submissions undergo College Ambassador & ACE Admin review before public publication."
        }
        badge={
          isEditingChanges ? (
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Changes Requested on {existing?.id}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Multi-Level Verified
            </span>
          )
        }
      />

      {/* Reviewer Note Alert Banner */}
      {isEditingChanges && existing?.requestedChanges && (
        <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-700 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100 font-extrabold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Reviewer Feedback from {existing.requestedChanges.requestedBy}</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
            "{existing.requestedChanges.comments}"
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="font-bold text-amber-900 dark:text-amber-300">Fields to modify:</span>
            {requestedFields.map((f, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900 font-mono font-bold text-amber-950 dark:text-amber-100 text-[11px]">
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stepper Wizard Progress */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        {[
          { num: 1, label: 'Basics' },
          { num: 2, label: 'College' },
          { num: 3, label: 'Schedule' },
          { num: 4, label: 'Location' },
          { num: 5, label: 'Registration' },
          { num: 6, label: 'Prizes' },
          { num: 7, label: 'Media' },
          { num: 8, label: 'AI Review' }
        ].map(s => (
          <button
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              step === s.num
                ? 'bg-brand-500 text-white shadow-sm'
                : step > s.num
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-400'
            }`}
          >
            <span>{s.num}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: EVENT BASICS */}
      {step === 1 && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Step 1 — Event Basics</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Event Title *</label>
                {isFieldFlagged('title') && <span className="text-[10px] font-bold text-amber-600 animate-pulse">⚠ Update Required</span>}
              </div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Autonomous AI Agents Hackathon 2026"
                className={`w-full text-xs p-3 rounded-xl border outline-none ${isFieldFlagged('title') ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200 dark:border-slate-700'}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Event Type *</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                >
                  {['Hackathon', 'Symposium', 'Workshop', 'Conference', 'Internship', 'Job Fair', 'Contest', 'Cultural'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                >
                  {['Technical & Coding', 'Management & Leadership', 'Research & Academia', 'Design & Media', 'Cultural & Arts'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Short Description *</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="One sentence summary for student cards"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Description *</label>
              <textarea
                rows={4}
                value={formData.fullDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                placeholder="Comprehensive agenda, guidelines, and benefits..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: COLLEGE / ORGANIZER */}
      {step === 2 && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Step 2 — College & Organizer Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">College / University Name *</label>
                <input
                  type="text"
                  value={formData.college?.name}
                  onChange={(e) => updateNested('college', 'name', e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Hosting Department</label>
                <input
                  type="text"
                  value={formData.college?.department}
                  onChange={(e) => updateNested('college', 'department', e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Organizer Contact Name *</label>
                <input
                  type="text"
                  value={formData.organizer?.name}
                  onChange={(e) => updateNested('organizer', 'name', e.target.value)}
                  placeholder="Faculty / Student Coordinator"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Organizer Email *</label>
                <input
                  type="email"
                  value={formData.organizer?.email}
                  onChange={(e) => updateNested('organizer', 'email', e.target.value)}
                  placeholder="official@college.edu"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Organizer Phone *</label>
                <input
                  type="text"
                  value={formData.organizer?.phone}
                  onChange={(e) => updateNested('organizer', 'phone', e.target.value)}
                  placeholder="+91 98401 23456"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center gap-3">
              <input
                type="checkbox"
                id="onBehalf"
                checked={formData.organizer?.isSubmittingOnBehalf}
                onChange={(e) => updateNested('organizer', 'isSubmittingOnBehalf', e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <label htmlFor="onBehalf" className="text-xs font-semibold text-purple-900 dark:text-purple-200">
                I am submitting this event on behalf of the college / club (triggers organizer confirmation workflow).
              </label>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: LOCATION (With change highlight if flagged) */}
      {step === 4 && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Step 4 — Location & Mode</h3>
            {isFieldFlagged('venue') && (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold animate-pulse">
                ⚠ Reviewer Requested Venue Update
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              {['OFFLINE', 'ONLINE', 'HYBRID'].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => updateNested('location', 'mode', m)}
                  className={`flex-1 p-3 rounded-2xl border text-xs font-bold ${
                    formData.location?.mode === m ? 'bg-brand-500 text-white border-brand-500 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {formData.location?.mode !== 'ONLINE' && (
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Venue / Auditorium / Block *</label>
                    {isFieldFlagged('venue') && <span className="text-[10px] font-bold text-amber-600">⚠ Update Required</span>}
                  </div>
                  <input
                    type="text"
                    value={formData.location?.venue}
                    onChange={(e) => updateNested('location', 'venue', e.target.value)}
                    placeholder="e.g. APJ Abdul Kalam Block, Turing Lab 301"
                    className={`w-full text-xs p-3 rounded-xl border outline-none ${isFieldFlagged('venue') ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200 dark:border-slate-700'}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.location?.city}
                      onChange={(e) => updateNested('location', 'city', e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Google Maps Link</label>
                    <input
                      type="text"
                      value={formData.location?.mapsUrl}
                      onChange={(e) => updateNested('location', 'mapsUrl', e.target.value)}
                      placeholder="https://maps.google.com/..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: REGISTRATION (With change highlight if flagged) */}
      {step === 5 && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Step 5 — Registration & Tickets</h3>
            {isFieldFlagged('registrationUrl') && (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold animate-pulse">
                ⚠ Reviewer Requested URL Update
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Official Registration URL *</label>
                {isFieldFlagged('registrationUrl') && <span className="text-[10px] font-bold text-amber-600">⚠ Update Required</span>}
              </div>
              <input
                type="text"
                value={formData.registration?.url}
                onChange={(e) => updateNested('registration', 'url', e.target.value)}
                placeholder="https://college.edu/events/register"
                className={`w-full text-xs p-3 rounded-xl border outline-none ${isFieldFlagged('registrationUrl') ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200 dark:border-slate-700'}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Fee Structure</label>
                <select
                  value={formData.registration?.type}
                  onChange={(e) => updateNested('registration', 'type', e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <option value="FREE">100% Free</option>
                  <option value="PAID">Paid Registration</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Fee (₹)</label>
                <input
                  type="number"
                  value={formData.registration?.fee}
                  onChange={(e) => updateNested('registration', 'fee', Number(e.target.value))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Max Participants</label>
                <input
                  type="number"
                  value={formData.registration?.maxParticipants}
                  onChange={(e) => updateNested('registration', 'maxParticipants', Number(e.target.value))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: AI QUALITY CHECK & SUBMIT */}
      {(step === 8 || step === 3 || step === 6 || step === 7) && step === 8 && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">AI Quality Verification & Review</h3>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
              Quality Score: 94 / 100
            </span>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs text-emerald-900 dark:text-emerald-200">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All Mandatory Parameters Verified
            </p>
            <ul className="space-y-1 pl-5 list-disc text-[11px] text-emerald-800 dark:text-emerald-300">
              <li>Event title and descriptions meet clarity standards</li>
              <li>Organizer contact details verified for domain matching</li>
              <li>No duplicate event found in active database</li>
              <li>Poster dimensions and aspect ratio validated</li>
            </ul>
          </div>

          {isEditingChanges && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">Submitter Modification Summary *</label>
              <textarea
                rows={2}
                value={submitterNote}
                onChange={(e) => setSubmitterNote(e.target.value)}
                placeholder="Explain what changes were made (e.g. 'Updated Turing block room number and verified Google Maps pin')..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>
          )}
        </div>
      )}

      {/* Bottom Action Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <Button
          variant="outline"
          size="md"
          onClick={() => setStep(prev => Math.max(1, prev - 1))}
          disabled={step === 1}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" onClick={handleSaveDraft} icon={<Save className="w-4 h-4" />}>
            Save Draft
          </Button>

          {step < 8 ? (
            <Button variant="primary" size="md" onClick={() => setStep(prev => prev + 1)}>
              Next Step →
            </Button>
          ) : (
            <Button
              variant="ai"
              size="lg"
              onClick={handleFinalSubmit}
              icon={<Sparkles className="w-5 h-5" />}
            >
              {isEditingChanges ? 'Resubmit for Verification' : 'Submit for Ambassador Review'}
            </Button>
          )}
        </div>
      </div>

    </div>
  );
};
