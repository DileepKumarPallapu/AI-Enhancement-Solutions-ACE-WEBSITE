import React, { useState } from 'react';
import { 
  Gift, 
  Send, 
  Copy, 
  Check, 
  RotateCw, 
  Filter, 
  Search, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ReferralPage: React.FC = () => {
  const { user, referralInvitations, sendReferralInvites } = useApp();
  
  const [emailInput, setEmailInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'delivered' | 'pending' | 'failed'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const referralLink = `https://www.allcollegeevent.com/signup?ref=${user.referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendInvites = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    // Parse commas, spaces, newlines
    const emails = emailInput
      .split(/[,\s\n]+/)
      .map(e => e.trim())
      .filter(e => e.includes('@'));

    if (emails.length === 0) {
      alert('Please enter valid email addresses.');
      return;
    }

    sendReferralInvites(emails);
    setEmailInput('');
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
  };

  // Filter invitations table
  const filteredInvites = referralInvitations.filter(inv => {
    if (activeTab === 'sent' && inv.emailStatus !== 'SENT') return false;
    if (activeTab === 'delivered' && inv.deliveryStatus !== 'DELIVERED') return false;
    if (activeTab === 'pending' && inv.status !== 'PENDING') return false;
    if (activeTab === 'failed' && inv.emailStatus !== 'FAILED') return false;

    if (searchFilter.trim()) {
      const s = searchFilter.toLowerCase();
      if (!inv.recipientEmail.toLowerCase().includes(s) && !inv.invitedBy.toLowerCase().includes(s)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* 1. HEADER & SUMMARY CARDS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Refer & Earn Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Invite your friends to All College Event and unlock exciting reward points & perks!
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-brand-700">
          <Gift className="w-4 h-4 text-brand-600" />
          <span>10 Points Per Successful Referral</span>
        </div>
      </div>

      {/* 2. TOP SPLIT: INVITE VIA EMAIL & YOUR REFERRAL SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Invite via Email */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">Invite via Email</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Multi-invite</span>
            </div>
            <p className="text-xs text-slate-500">
              Invite multiple friends by entering their email addresses below.
            </p>
          </div>

          <form onSubmit={handleSendInvites} className="space-y-3 flex-1 flex flex-col justify-between">
            <textarea
              rows={4}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email addresses (press Enter, comma or Space)"
              className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none bg-slate-50/50"
            />
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                {emailInput.split(/[,\s\n]+/).filter(e => e.includes('@')).length} emails ready
              </span>
              <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
                Send Invitations
              </Button>
            </div>
          </form>
        </div>

        {/* Right: Your Referral Summary */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900">Your Referral Summary</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500">Your Referral Code</span>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 font-mono font-bold text-sm text-brand-700">
                <span>{user.referralCode}</span>
                <button onClick={handleCopyCode} className="text-brand-600 hover:text-brand-800">
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500">Referral Link</span>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="truncate mr-2">https://www.allcollegeevent.com/...</span>
                <button onClick={handleCopyLink} className="text-brand-600 hover:text-brand-800">
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Metric Stats Counters */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="p-3 rounded-2xl bg-slate-50">
              <p className="text-[11px] text-slate-400 font-medium">Total Referrals</p>
              <p className="text-lg sm:text-xl font-black text-slate-900 mt-1">{referralInvitations.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50">
              <p className="text-[11px] text-brand-600 font-medium">Points Earned</p>
              <p className="text-lg sm:text-xl font-black text-brand-700 mt-1">🎁 {user.pointsEarned}</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50">
              <p className="text-[11px] text-emerald-600 font-medium">Friends Joined</p>
              <p className="text-lg sm:text-xl font-black text-emerald-700 mt-1">6</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50">
              <p className="text-[11px] text-amber-600 font-medium">Pending</p>
              <p className="text-lg sm:text-xl font-black text-amber-700 mt-1">9</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center gap-2 text-xs text-purple-900">
            <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
            <span>Points are awarded immediately when your friend signs up and activates their account!</span>
          </div>
        </div>

      </div>

      {/* 3. INVITATIONS LEDGER TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { key: 'all', label: 'All Invitations' },
              { key: 'sent', label: 'Email Sent' },
              { key: 'delivered', label: 'Delivered' },
              { key: 'pending', label: 'Pending' },
              { key: 'failed', label: 'Failed' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-200 text-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search by email..."
                className="bg-transparent outline-none text-slate-900 w-36 sm:w-48"
              />
            </div>
            <Button variant="outline" size="sm" icon={<RotateCw className="w-3.5 h-3.5" />}>
              Bulk Resend
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Invited By</th>
                <th className="py-3 px-4">Recipient Email</th>
                <th className="py-3 px-4">Invitation Date</th>
                <th className="py-3 px-4">Email Status</th>
                <th className="py-3 px-4">Delivery Status</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredInvites.map((inv, idx) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-400">{idx + 1}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{inv.invitedBy}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{inv.recipientEmail}</td>
                  <td className="py-3.5 px-4 text-slate-500">{inv.invitationDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                      {inv.emailStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      {inv.deliveryStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-brand-600 hover:bg-slate-100">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
