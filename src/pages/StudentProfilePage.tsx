import React, { useState } from 'react';
import { 
  UserCheck, ShieldCheck, Mail, MapPin, Calendar, GraduationCap, 
  Award, Gift, Settings, Sparkles, Check, CheckCircle2, Edit3, 
  Camera, Globe, Github, Linkedin, ExternalLink, Phone, Plus, 
  Trash2, FileText, Upload, RefreshCw, Save, Trophy, Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
];

const BANNER_THEMES = [
  { id: 'purple-gradient', name: 'Purple Sunset', class: 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600' },
  { id: 'cyber-neon', name: 'Cyber Neon', class: 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-900' },
  { id: 'emerald-aurora', name: 'Emerald Aurora', class: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900' },
  { id: 'sunset-amber', name: 'Sunset Glow', class: 'bg-gradient-to-r from-amber-500 via-rose-600 to-purple-800' },
];

export const StudentProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useApp();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'edit_profile' | 'badges' | 'vouchers'>('overview');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  
  // Edit Form State
  const [formData, setFormData] = useState({
    name: user.name || 'Dileep Kumar Pallapu',
    tagline: user.tagline || 'Aspiring Full Stack Engineer & Machine Learning Enthusiast',
    bio: user.bio || 'Computer Science student passionate about building scalable web applications, participating in collegiate hackathons, and exploring artificial intelligence.',
    email: user.email || 'dileepkumarpallapu28@gmail.com',
    phone: user.phone || '+91 98765 43210',
    city: user.city || 'Chennai',
    state: user.state || 'Tamil Nadu',
    college: user.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    department: user.department || 'B.Tech - Computer Science & Engineering',
    year: user.year || '3rd Year (2023 - 2027)',
    studentIdNumber: user.studentIdNumber || '23BCSE1048',
    cgpa: user.cgpa || '8.85 / 10.0',
    githubUrl: user.githubUrl || 'https://github.com/DileepKumarPallapu',
    linkedinUrl: user.linkedinUrl || 'https://linkedin.com/in/dileep-kumar',
    portfolioUrl: user.portfolioUrl || 'https://dileep-portfolio.dev',
    avatarUrl: user.avatarUrl,
    bannerTheme: user.bannerTheme || 'purple-gradient'
  });

  const [skills, setSkills] = useState<string[]>(user.skills || ['Python', 'JavaScript', 'React.js', 'SQL', 'Data Structures & Algorithms']);
  const [newSkillInput, setNewSkillInput] = useState('');

  const currentBannerClass = BANNER_THEMES.find(t => t.id === formData.bannerTheme)?.class || BANNER_THEMES[0].class;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      ...formData,
      skills,
      profileCompletionPercentage: 95
    });
    showToast('Profile details updated successfully! ✓', 'success');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setActiveTab('overview');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      const updated = [...skills, newSkillInput.trim()];
      setSkills(updated);
      updateUserProfile({ skills: updated });
      setNewSkillInput('');
      showToast('Added skill: ' + newSkillInput.trim(), 'info');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    updateUserProfile({ skills: updated });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 font-sans">
      
      {/* Banner */}
      <div className={`relative rounded-3xl overflow-hidden ${currentBannerClass} h-36 sm:h-48 shadow-md transition-all duration-500`}>
        <button
          onClick={() => {
            setActiveTab('edit_profile');
            showToast('Select a banner theme in edit mode!', 'info');
          }}
          className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md text-white text-xs font-bold hover:bg-black/50 transition-colors flex items-center gap-1.5"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Change Cover</span>
        </button>
      </div>

      {/* Main Profile Info Header */}
      <div className="relative px-4 sm:px-8 -mt-16 sm:-mt-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative group">
              <img
                src={formData.avatarUrl}
                alt={formData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-2xl -mt-12 sm:-mt-16 bg-white dark:bg-slate-800"
              />
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute inset-0 -mt-12 sm:-mt-16 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1"
                title="Change Avatar"
              >
                <Camera className="w-4 h-4" /> Edit
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{formData.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-brand-700 dark:text-brand-300 font-bold text-xs uppercase font-mono">
                  Verified Student
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CGPA {formData.cgpa}
                </span>
              </div>
              <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">{formData.tagline}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-2 pt-0.5">
                <span>{formData.college}</span>
                <span>•</span>
                <span>{formData.department}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant={activeTab === 'edit_profile' ? 'secondary' : 'primary'}
              size="md"
              icon={<Edit3 className="w-4 h-4" />}
              onClick={() => setActiveTab(activeTab === 'edit_profile' ? 'overview' : 'edit_profile')}
            >
              {activeTab === 'edit_profile' ? 'View Overview' : 'Edit Profile'}
            </Button>
          </div>

        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { key: 'overview', label: '👤 Profile Overview' },
          { key: 'edit_profile', label: '✏️ Edit Profile & Pictures' },
          { key: 'badges', label: '🏆 Verified Badges' },
          { key: 'vouchers', label: '🎁 Rewards & Vouchers' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.key 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: About, Skills & Academics */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* About Me Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">About Me</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{formData.bio}</p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.githubUrl && (
                  <a href={formData.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-brand-600 transition-colors">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {formData.linkedinUrl && (
                  <a href={formData.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-brand-600 transition-colors">
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn
                  </a>
                )}
                {formData.portfolioUrl && (
                  <a href={formData.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-brand-600 transition-colors">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" /> Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* Technical Skills Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Verified & Target Skills</h3>
                <span className="text-xs font-bold text-brand-600 font-mono">{skills.length} Skills</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center gap-1.5">
                    <span>{s}</span>
                    <button onClick={() => handleRemoveSkill(s)} className="text-slate-400 hover:text-rose-600">×</button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add a new skill (e.g. Docker, TypeScript, PyTorch)..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none"
                />
                <Button variant="outline" size="sm" type="submit" icon={<Plus className="w-3.5 h-3.5" />}>
                  Add Skill
                </Button>
              </form>
            </div>

          </div>

          {/* Right Column: Contact & Quick Stats */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Profile Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Student Information</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span className="truncate">{formData.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{formData.city}, {formData.state}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <GraduationCap className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Roll No: {formData.studentIdNumber}</span>
                </div>
              </div>
            </div>

            {/* Profile Completion Meter */}
            <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-3xl p-6 text-white space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">Profile Strength</span>
                <span className="font-mono font-bold">95% Complete</span>
              </div>
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '95%' }} />
              </div>
              <p className="text-[11px] text-purple-100">
                Your profile is verified and visible to campus event organizers and recruiters.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Edit Profile & Picture Studio */}
      {activeTab === 'edit_profile' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-xs">
          
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Edit Student Profile & Picture Studio</h2>
            <p className="text-xs text-slate-500 mt-1">Update your personal, academic, avatar, and social links.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-8">
            
            {/* 1. Cover Theme Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase font-mono block">
                1. Select Cover Banner Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BANNER_THEMES.map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, bannerTheme: theme.id })}
                    className={`h-16 rounded-2xl ${theme.class} p-3 text-left flex flex-col justify-end text-white font-bold text-xs transition-all ${
                      formData.bannerTheme === theme.id ? 'ring-4 ring-brand-500 scale-102 shadow-md' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Avatar Selection Studio */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase font-mono block">
                2. Choose Avatar Preset or Custom Picture
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {AVATAR_PRESETS.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatarUrl: img })}
                    className={`relative rounded-2xl overflow-hidden ring-2 transition-all ${
                      formData.avatarUrl === img ? 'ring-brand-500 scale-105 shadow-md' : 'ring-transparent hover:ring-slate-300'
                    }`}
                  >
                    <img src={img} alt="preset" className="w-14 h-14 object-cover" />
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="text-[11px] text-slate-400 block mb-1">Or paste custom image URL:</label>
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full max-w-lg px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>
            </div>

            {/* 3. Personal Information */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
                3. Personal & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Headline / Target Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">About Me / Bio</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 4. Academic Details */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
                4. Academic & College Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">College / University Name</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Year of Study</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CGPA / Percentage</label>
                  <input
                    type="text"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 5. Developer & Social Links */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">
                5. Developer Portfolios & Social Profiles
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">GitHub Profile</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Portfolio Website</label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="primary" size="lg" type="submit" icon={<Save className="w-4 h-4" />}>
                Save All Changes
              </Button>
              <Button variant="outline" size="lg" type="button" onClick={() => setActiveTab('overview')}>
                Cancel
              </Button>
            </div>

          </form>

        </div>
      )}

      {/* Tab 3: Badges */}
      {activeTab === 'badges' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Earned Honors & Badges</h3>
            <p className="text-xs text-slate-500 mt-1">Verified achievements earned through competitions, hackathons, and daily coding tasks.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Code Ninja', desc: 'Solved 25+ Coding Arcade Questions', icon: '🥷', color: 'bg-purple-100 dark:bg-purple-950 text-brand-700' },
              { title: 'Hackathon Warrior', desc: 'Participated in National Hackathons', icon: '⚔️', color: 'bg-amber-100 dark:bg-amber-950 text-amber-700' },
              { title: '7-Day Streak', desc: 'Consistent daily micro-task solver', icon: '🔥', color: 'bg-rose-100 dark:bg-rose-950 text-rose-700' },
              { title: 'ACE Ambassador', desc: 'Active collegiate community advocate', icon: '🤝', color: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700' }
            ].map(b => (
              <div key={b.title} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center space-y-2">
                <span className="text-3xl block">{b.icon}</span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{b.title}</h4>
                <p className="text-[10px] text-slate-500 leading-snug">{b.desc}</p>
                <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[9px] font-bold">
                  ✓ Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Vouchers */}
      {activeTab === 'vouchers' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Active Vouchers & Rewards</h3>
            <p className="text-xs text-slate-500 mt-1">Claimed gift vouchers and redeemable tokens.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider">ACE MERCH VOUCHER</span>
                <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded">₹150 OFF</span>
              </div>
              <h4 className="font-black text-lg">Code: ACE-STUDENT-2026</h4>
              <p className="text-[11px] text-purple-100">Valid on tech accessories and engineering textbooks in Rewards Store.</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider">HACKATHON TICKET PASS</span>
                <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded">FREE ENTRY</span>
              </div>
              <h4 className="font-black text-lg">Code: HACKVERSE-VIP</h4>
              <p className="text-[11px] text-amber-100">100% Free Entry ticket pass for upcoming collegiate symposiums.</p>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Choose Profile Avatar</h3>
              <button onClick={() => setIsAvatarModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {AVATAR_PRESETS.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFormData({ ...formData, avatarUrl: img });
                    updateUserProfile({ avatarUrl: img });
                    setIsAvatarModalOpen(false);
                    showToast('Avatar updated! ✓', 'success');
                  }}
                  className="rounded-2xl overflow-hidden ring-2 ring-transparent hover:ring-brand-500 transition-all hover:scale-105"
                >
                  <img src={img} alt="preset" className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
