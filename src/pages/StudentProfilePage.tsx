import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  Gift, 
  Settings, 
  Sparkles,
  Check,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';

export const StudentProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'badges' | 'vouchers' | 'settings'>('overview');

  const [skills, setSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      updateUserProfile({ skills: updated });
      setNewSkill('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Profile Header Banner matching uploaded screenshot */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 h-36 sm:h-44 shadow-md" />

      <div className="relative px-6 sm:px-10 -mt-16 sm:-mt-20">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white shadow-xl -mt-12 sm:-mt-16 bg-white"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase">{user.role}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-purple-50 border border-purple-100 text-center">
              <span className="text-[10px] font-bold text-brand-600 uppercase">Following</span>
              <p className="text-base font-black text-brand-900">{user.followingCount}</p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Status</span>
              <p className="text-base font-black text-emerald-900">Active</p>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'stats', label: 'Stats' },
          { key: 'badges', label: 'Badges' },
          { key: 'vouchers', label: 'My Vouchers' },
          { key: 'settings', label: 'Settings' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Personal Profile Details Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-brand-600" /> Personal Profile
              </h3>
              <span className="text-xs text-brand-600 font-bold">{user.profileCompletionPercentage}% Complete</span>
            </div>

            {/* Profile completion bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-brand-500 to-indigo-600 h-full rounded-full" style={{ width: `${user.profileCompletionPercentage}%` }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-medium block mb-1">Account Holder</span>
                <p className="font-bold text-slate-800 text-sm">{user.name}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Contact Email</span>
                <p className="font-mono font-medium text-slate-800">{user.email}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Location</span>
                <p className="font-bold text-slate-800">{user.city}, {user.state}, {user.country}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Birth Date</span>
                <p className="font-bold text-slate-800">{user.dob}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">College / University</span>
                <p className="font-bold text-slate-800">{user.college}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Department & Year</span>
                <p className="font-bold text-slate-800">{user.department} ({user.year})</p>
              </div>
            </div>

            {/* Skills & AI Matching Tags */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Technical Skills & AI Preferences
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-xl bg-purple-50 text-brand-700 border border-purple-200 text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2 pt-2 max-w-sm">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill (e.g. Next.js, Flutter)..."
                  className="text-xs px-3 py-2 rounded-xl border border-slate-200 flex-1 outline-none focus:border-brand-500"
                />
                <Button type="submit" variant="primary" size="sm">
                  Add
                </Button>
              </form>
            </div>
          </div>

          {/* Right AI Matching Preferences */}
          <div className="lg:col-span-4 bg-purple-50 rounded-3xl border border-purple-200 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h4 className="font-bold text-sm text-purple-950">AI Feed Optimization</h4>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              Your profile information helps ACE AI recommend high-fit hackathons, symposiums, and internships before registration deadlines.
            </p>
            <div className="p-3 bg-white rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Region:</span>
                <span className="font-bold text-slate-800">{user.city} + Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Domain Affinity:</span>
                <span className="font-bold text-brand-600">AI & Web Dev</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab: Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <div className="text-3xl">🚀</div>
            <h4 className="font-bold text-xs text-slate-900">Early Pioneer</h4>
            <p className="text-[10px] text-slate-400">Joined ACE during 2026 launch</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <div className="text-3xl">🏆</div>
            <h4 className="font-bold text-xs text-slate-900">Hackathon Enthusiast</h4>
            <p className="text-[10px] text-slate-400">Participated in 3+ hackathons</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <div className="text-3xl">🎁</div>
            <h4 className="font-bold text-xs text-slate-900">Top Referrer</h4>
            <p className="text-[10px] text-slate-400">Invited 10+ classmates</p>
          </div>
        </div>
      )}

    </div>
  );
};
