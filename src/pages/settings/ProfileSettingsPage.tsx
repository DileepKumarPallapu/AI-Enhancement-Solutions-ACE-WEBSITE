import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Check, Plus, Trash2, School, MapPin, Globe, Sparkles, Search, X } from 'lucide-react';
import { VERIFIED_COLLEGES, accountDb } from '../../services/db/accountDatabase';
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

  const filteredColleges = VERIFIED_COLLEGES.filter(c =>
    c.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(collegeSearch.toLowerCase())
  );

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
            <School className="w-3.5 h-3.5 text-indigo-500" /> College / Institution
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={college}
              readOnly={!customCollege}
              onClick={() => !customCollege && setIsCollegeDropdownOpen(true)}
              onChange={(e) => customCollege && setCollege(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              placeholder="Select or enter your college..."
            />
            <button
              type="button"
              onClick={() => setIsCollegeDropdownOpen(!isCollegeDropdownOpen)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              Change
            </button>
          </div>

          {isCollegeDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Search Colleges</span>
                <button type="button" onClick={() => setIsCollegeDropdownOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={collegeSearch}
                  onChange={e => setCollegeSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  placeholder="Search verified Indian colleges..."
                />
              </div>
              <div className="max-h-52 overflow-y-auto space-y-1">
                {filteredColleges.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCollege(c.name);
                      setIsCollegeDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-200"
                  >
                    <span>{c.name}</span>
                    <span className="text-slate-400 text-[10px]">{c.city}</span>
                  </button>
                ))}
              </div>
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    setCustomCollege(true);
                    setIsCollegeDropdownOpen(false);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Type custom college name
                </button>
              </div>
            </div>
          )}
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
