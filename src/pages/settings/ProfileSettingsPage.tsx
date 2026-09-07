import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Check, Plus, Trash2, School, MapPin, Globe, Sparkles } from 'lucide-react';
import { EducationRecord, ProjectRecord } from '../../types/account';

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [college, setCollege] = useState(currentUser?.college || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  
  // Social links
  const [github, setGithub] = useState(currentUser?.socialLinks.github || '');
  const [linkedin, setLinkedin] = useState(currentUser?.socialLinks.linkedin || '');
  const [twitter, setTwitter] = useState(currentUser?.socialLinks.twitter || '');
  const [website, setWebsite] = useState(currentUser?.socialLinks.website || '');

  // Skills
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>(currentUser?.skills.verified || []);
  const [interestedSkills, setInterestedSkills] = useState<string[]>(currentUser?.skills.interested || []);
  const [newVerifiedSkill, setNewVerifiedSkill] = useState('');
  const [newInterestedSkill, setNewInterestedSkill] = useState('');

  // Education & Projects
  const [educationList, setEducationList] = useState<EducationRecord[]>(currentUser?.education || []);
  const [projectsList, setProjectsList] = useState<ProjectRecord[]>(currentUser?.projects || []);

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await updateProfile({
      fullName,
      bio,
      college,
      location,
      phone,
      socialLinks: {
        github,
        linkedin,
        twitter,
        website
      },
      skills: {
        verified: verifiedSkills,
        interested: interestedSkills
      },
      education: educationList,
      projects: projectsList
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

  const addEducation = () => {
    const newEdu: EducationRecord = {
      id: 'edu_' + Date.now(),
      institution: 'New College / University',
      degree: 'B.Tech / Degree',
      fieldOfStudy: 'Computer Science',
      startYear: 2022,
      endYear: 2026,
      current: true
    };
    setEducationList([...educationList, newEdu]);
  };

  const addProject = () => {
    const newProj: ProjectRecord = {
      id: 'proj_' + Date.now(),
      title: 'New Innovation Project',
      description: 'Describe the project architecture and results here.',
      technologies: ['React', 'TypeScript', 'Node.js'],
      liveUrl: '',
      githubUrl: ''
    };
    setProjectsList([...projectsList, newProj]);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">General Profile Information</h2>
          <p className="text-xs text-slate-400">Update your public identity across the ACE platform.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved Changes!' : saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Profile updated successfully and synced to your live public account.</span>
        </div>
      )}

      {/* Basic Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Full Display Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Primary Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">College / University</label>
          <div className="relative">
            <School className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
            <input
              type="text"
              required
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">City & State</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Bio / About Me</label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write a concise overview of your technical interests, achievements, and focus..."
        />
      </div>

      {/* Social Links */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          Social & Portfolio Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">GitHub Profile URL</label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full py-2 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full py-2 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">X / Twitter Handle or URL</label>
            <input
              type="url"
              placeholder="https://x.com/..."
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full py-2 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Personal Website / Portfolio</label>
            <input
              type="url"
              placeholder="https://mysite.dev"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full py-2 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>
        </div>
      </div>

      {/* Skills Manager */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Skills & Proficiencies
        </h3>

        {/* Verified / Mastered */}
        <div>
          <label className="block text-xs font-semibold text-emerald-400 uppercase mb-2">Verified & Mastered Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {verifiedSkills.map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-1.5">
                {skill}
                <button type="button" onClick={() => removeVerifiedSkill(skill)} className="hover:text-rose-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              placeholder="Add skill (e.g. React, Rust)"
              value={newVerifiedSkill}
              onChange={(e) => setNewVerifiedSkill(e.target.value)}
              className="flex-1 py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
            <button
              type="button"
              onClick={addVerifiedSkill}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Interested Skills */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Exploring / Interested Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {interestedSkills.map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5">
                {skill}
                <button type="button" onClick={() => removeInterestedSkill(skill)} className="hover:text-rose-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              placeholder="Add interest (e.g. Web3, LLMs)"
              value={newInterestedSkill}
              onChange={(e) => setNewInterestedSkill(e.target.value)}
              className="flex-1 py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
            <button
              type="button"
              onClick={addInterestedSkill}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Education Records */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <School className="w-4 h-4 text-indigo-400" />
            Education Entries
          </h3>
          <button
            type="button"
            onClick={addEducation}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-indigo-400 font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Degree
          </button>
        </div>
        {educationList.map((edu, idx) => (
          <div key={edu.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Entry #{idx + 1}</span>
              <button
                type="button"
                onClick={() => setEducationList(educationList.filter(e => e.id !== edu.id))}
                className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Institution Name"
                value={edu.institution}
                onChange={(e) => {
                  const updated = [...educationList];
                  updated[idx].institution = e.target.value;
                  setEducationList(updated);
                }}
                className="py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
              <input
                type="text"
                placeholder="Degree (e.g. B.Tech)"
                value={edu.degree}
                onChange={(e) => {
                  const updated = [...educationList];
                  updated[idx].degree = e.target.value;
                  setEducationList(updated);
                }}
                className="py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) => {
                  const updated = [...educationList];
                  updated[idx].fieldOfStudy = e.target.value;
                  setEducationList(updated);
                }}
                className="py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Projects Showcase
          </h3>
          <button
            type="button"
            onClick={addProject}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-purple-400 font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>
        {projectsList.map((proj, idx) => (
          <div key={proj.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Project #{idx + 1}</span>
              <button
                type="button"
                onClick={() => setProjectsList(projectsList.filter(p => p.id !== proj.id))}
                className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => {
                  const updated = [...projectsList];
                  updated[idx].title = e.target.value;
                  setProjectsList(updated);
                }}
                className="py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={proj.technologies.join(', ')}
                onChange={(e) => {
                  const updated = [...projectsList];
                  updated[idx].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  setProjectsList(updated);
                }}
                className="py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Short description of the project..."
              value={proj.description}
              onChange={(e) => {
                const updated = [...projectsList];
                updated[idx].description = e.target.value;
                setProjectsList(updated);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>
        ))}
      </div>

    </form>
  );
};
