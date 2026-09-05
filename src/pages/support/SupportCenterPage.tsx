import React, { useState } from 'react';
import { HelpCircle, Send, MessageSquare, CheckCircle2, LifeBuoy } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useManagement } from '../../context/ManagementContext';
import { useToast } from '../../context/ToastContext';

export const SupportCenterPage: React.FC = () => {
  const { createSupportTicket, supportTickets, activePersona, activeRole } = useManagement();
  const { showToast } = useToast();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'REGISTRATION' | 'CERTIFICATE' | 'ORGANIZER_VERIFICATION' | 'PAYMENT' | 'TECHNICAL'>('TECHNICAL');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    createSupportTicket({
      requesterId: activePersona.email,
      requesterName: activePersona.name,
      requesterRole: activeRole,
      subject,
      category,
      message
    });
    setSubject('');
    setMessage('');
    showToast('Support ticket dispatched to ACE Help Desk ✓', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="ACE HELP DESK & ASSISTANCE"
        title="Support &"
        highlight="Ticket Center."
        subtitle="Need assistance with event registration, certificates, or organizer verification? Submit a ticket to our response team."
      />

      {/* Ticket Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <LifeBuoy className="w-5 h-5 text-brand-600" /> Create Support Request
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Issue downloading certificate"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="TECHNICAL">Technical Issue</option>
                <option value="CERTIFICATE">Certificate Verification</option>
                <option value="REGISTRATION">Registration / Ticket Problem</option>
                <option value="ORGANIZER_VERIFICATION">Organizer Verification</option>
                <option value="PAYMENT">Payment Inquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Detailed Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue with relevant event IDs or error messages..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              required
            />
          </div>

          <Button variant="primary" size="md" type="submit" icon={<Send className="w-4 h-4" />}>
            Submit Ticket
          </Button>
        </form>
      </div>

    </div>
  );
};
