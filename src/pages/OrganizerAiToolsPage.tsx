import React, { useState } from 'react';
import { Sparkles, FileText, Share2, Search, CheckCircle2, Copy } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { generateAiEventContent, GeneratedCopyOutput } from '../services/ai/aiContentService';
import { useToast } from '../context/ToastContext';

export const OrganizerAiToolsPage: React.FC = () => {
  const { showToast } = useToast();
  const [title, setTitle] = useState('HACKVERSE 2026 – National Collegiate Hackathon');
  const [eventType, setEventType] = useState('Hackathon');
  const [dept, setDept] = useState('Computer Science & Engineering');
  const [generated, setGenerated] = useState<GeneratedCopyOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generateAiEventContent({
        title,
        eventType,
        department: dept,
        collegeName: 'Hindustan Institute of Technology'
      });
      setGenerated(result);
      setIsGenerating(false);
      showToast('AI Content Generated Successfully ✓');
    }, 600);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard ✓`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="ORGANIZER AI STUDIO"
        title="Event Copywriting &"
        highlight="SEO Generator."
        subtitle="1-Click automated generation of student descriptions, structured FAQs, SEO metadata, and social media promotions."
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Event Parameters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <option value="Hackathon">Hackathon</option>
              <option value="Symposium">Symposium</option>
              <option value="Workshop">Workshop</option>
              <option value="Conference">Conference</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Department</label>
            <input
              type="text"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        <Button variant="ai" size="lg" onClick={handleGenerate} disabled={isGenerating} icon={<Sparkles className="w-5 h-5" />}>
          {isGenerating ? 'Generating with ACE AI...' : 'Generate High-Converting Copy'}
        </Button>
      </div>

      {generated && (
        <div className="space-y-6 animate-fadeIn">
          {/* Description Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" /> Generated Event Description
              </h4>
              <button
                onClick={() => handleCopy(generated.description, 'Description')}
                className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {generated.description}
            </p>
          </div>

          {/* Social Caption */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-purple-600" /> WhatsApp & Instagram Social Caption
              </h4>
              <button
                onClick={() => handleCopy(generated.socialCaption, 'Social Caption')}
                className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
              {generated.socialCaption}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
