import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Check, Plus, Trash2, School, MapPin, Globe, Sparkles, Search, X } from 'lucide-react';
import { accountDb } from '../../services/db/accountDatabase';
import { InstitutionSelectorModal } from '../../components/institution/InstitutionSelectorModal';
import { Institution } from '../../types/institution';
import { EducationRecord, ProjectRecord } from '../../types/account';

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.fullName || currentUser?.displayName || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [college, setCollege] = useState(currentUser?.college || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [phone, setPhone] = useState(currentUser?.phoneNumber || currentUser?.phone || '');
  
  // Searchable College
  const [collegeSearch, setCollegeSearch] = useState('');
  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
  const [customCollege, setCustomCollege] = useState(false);

  // Social links
  const [github, setGithub] = useState(currentUser?.socialLinks?.github || currentUser?.github || '');
  const [linkedin, setLinkedin] = useState(currentUser?.socialLinks?.linkedin || currentUser?.linkedin || '');
  const [twitter, setTwitter] = useState(currentUser?.socialLinks?.twitter || currentUser?.twitter || '');
  const [website, setWebsite] = useState(currentUser?.socialLinks?.website || currentUser?.website || '');

  // Skills
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>(currentUser?.skills?.verified || []);
  const [interestedSkills, setInterestedSkills] = useState<string[]>(currentUser?.skills?.interested || []);
  const [newVerifiedSkill, setNewVerifiedSkill] = useState('');
  const [newInterestedSkill, setNewInterestedSkill] = useState('');

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || currentUser.displayName || '');
      setBio(currentUser.bio || '');
      setCollege(currentUser.college || (currentUser.roleProfileData as any)?.college || '');
      setLocation(currentUser.location || '');
      setPhone(currentUser.phoneNumber || currentUser.phone || '');
      setGithub(currentUser.socialLinks?.github || currentUser.github || '');
      setLinkedin(currentUser.socialLinks?.linkedin || currentUser.linkedin || '');
      setTwitter(currentUser.socialLinks?.twitter || currentUser.twitter || '');
      setWebsite(currentUser.socialLinks?.website || currentUser.website || '');
      setVerifiedSkills(currentUser.skills?.verified || []);
      setInterestedSkills(currentUser.skills?.interested || []);
    }
  }, [currentUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await updateProfile({
      fullName,
      displayName: fullName,
      bio,
      college,
      location,
      phone,
      phoneNumber: phone,
      website,
      github,
      linkedin,
      twitter,
      socialLinks: {
        github,
        linkedin,
        twitter,
        website
      },
      skills: {
        verified: verifiedSkills,
        interested: interestedSkills
      }
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addVerifiedSkill = () => {
    if (newVerifiedSkill.trim() && !verifiedSkills.includes(newVerifiedSkill.trim())) {
      setVerifiedSkills([...verifiedSkills, newVerifiedSkill.trim()]);
      setNewVerifiedSkill('');
    }
  };

  const removeVerifiedSkill = (skill: string) => {
    setVerifiedSkills(verifiedSkills.filter(s => s !== skill));
  };

  const addInterestedSkill = () => {
    if (newInterestedSkill.trim() && !interestedSkills.includes(newInterestedSkill.trim())) {
      setInterestedSkills([...interestedSkills, newInterestedSkill.trim()]);
      setNewInterestedSkill('');
    }
  };

  const removeInterestedSkill = (skill: string) => {
    setInterestedSkills(interestedSkills.filter(s => s !== skill));
  };


  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Basic Profile Settings</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update your public name, institution, bio, and contact handles.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition disabled:opacity-50 self-start sm:self-auto"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </>
          )}
        </button>
      </div>

      {/* Main Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Dileep Kumar"
          />
        </div>

        {/* Searchable College Selection */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-indigo-500" /> College / Institution (Pan-India Directory)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={college}
              readOnly
              onClick={() => setIsCollegeDropdownOpen(true)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              placeholder="Click to browse verified colleges across India..."
            />
            <button
              type="button"
              onClick={() => setIsCollegeDropdownOpen(true)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-indigo-50 dark:bg-indigo-900/30 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse</span>
            </button>
          </div>

          <InstitutionSelectorModal
            isOpen={isCollegeDropdownOpen}
            onClose={() => setIsCollegeDropdownOpen(false)}
            selectedName={college}
            onSelect={(inst: Institution) => {
              setCollege(inst.name);
              if (inst.city) setLocation(`${inst.city}, ${inst.stateName}`);
              setIsCollegeDropdownOpen(false);
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Location (City, State)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Coimbatore, Tamil Nadu"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
            Bio & Summary
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell fellow students, mentors, and recruiters about yourself..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-500" />
          Social & Online Presence
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">GitHub URL</label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Website / Portfolio</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Twitter / X</label>
            <input
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              placeholder="https://twitter.com/username"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          Core Skills & Stack
        </h3>

        <div className="flex flex-wrap gap-2">
          {verifiedSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center gap-1.5"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeVerifiedSkill(skill)}
                className="hover:text-emerald-900 dark:hover:text-white"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newVerifiedSkill}
            onChange={(e) => setNewVerifiedSkill(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
            placeholder="Add new skill..."
          />
          <button
            type="button"
            onClick={addVerifiedSkill}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
