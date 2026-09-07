import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { accountDb, VERIFIED_COLLEGES } from '../../services/db/accountDatabase';
import { Account, EducationRecord, ProjectRecord, CertificateRecord } from '../../types/account';
import {
  User, School, BookOpen, Briefcase, Sparkles, Image as ImageIcon,
  Shield, Lock, ArrowLeft, Save, Check, AlertTriangle, Trash2, Plus,
  ExternalLink, Github, Linkedin, Twitter, Globe, Upload, Camera, Search, RefreshCw, X
} from 'lucide-react';

type EditTab = 'PERSONAL' | 'EDUCATION' | 'CAREER' | 'SKILLS' | 'PROJECTS' | 'MEDIA' | 'PRIVACY' | 'ACCOUNT';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState<EditTab>('PERSONAL');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<{ available?: boolean; msg?: string }>({});
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [country, setCountry] = useState('India');
  const [website, setWebsite] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');

  // Education & College
  const [college, setCollege] = useState('');
  const [collegeSearch, setCollegeSearch] = useState('');
  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
  const [customCollege, setCustomCollege] = useState(false);
  const [showCollegeChangeWarning, setShowCollegeChangeWarning] = useState(false);
  const [pendingCollege, setPendingCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [educationList, setEducationList] = useState<EducationRecord[]>([]);

  // Career
  const [careerGoal, setCareerGoal] = useState('');
  const [interestedDomains, setInterestedDomains] = useState<string[]>([]);
  const [newDomainInput, setNewDomainInput] = useState('');

  // Skills
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>([]);
  const [interestedSkills, setInterestedSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newInterestedSkillInput, setNewInterestedSkillInput] = useState('');

  // Projects & Certificates
  const [projectsList, setProjectsList] = useState<ProjectRecord[]>([]);
  const [certificatesList, setCertificatesList] = useState<CertificateRecord[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<ProjectRecord> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<CertificateRecord> | null>(null);

  // Media
  const [avatarUrl, setAvatarUrl] = useState('');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');
  const [coverTheme, setCoverTheme] = useState('cosmic_indigo');

  // Privacy
  const [profileVisibility, setProfileVisibility] = useState<'PUBLIC' | 'REGISTERED' | 'COLLEGE_ONLY' | 'PRIVATE'>('PUBLIC');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showCollege, setShowCollege] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showGallery, setShowGallery] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [allowFollowers, setAllowFollowers] = useState(true);

  // Cover Presets
  const COVER_PRESETS = [
    { id: 'cosmic_indigo', name: 'Cosmic Indigo', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600' },
    { id: 'midnight_cyber', name: 'Midnight Cyber', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600' },
    { id: 'emerald_aurora', name: 'Emerald Aurora', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600' },
    { id: 'sunset_blaze', name: 'Sunset Blaze', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600' },
    { id: 'slate_minimal', name: 'Slate Clean', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600' }
  ];

  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  ];

  // Load currentUser data
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setFirstName(currentUser.firstName || '');
    setLastName(currentUser.lastName || '');
    setDisplayName(currentUser.displayName || currentUser.fullName || '');
    setUsername(currentUser.username || '');
    setTagline(currentUser.tagline || '');
    setBio(currentUser.bio || '');
    setPhoneNumber(currentUser.phoneNumber || currentUser.phone || '');
    setCity(currentUser.city || '');
    setStateVal(currentUser.state || '');
    setCountry(currentUser.country || 'India');
    setWebsite(currentUser.website || currentUser.socialLinks?.website || '');
    setGithub(currentUser.github || currentUser.socialLinks?.github || '');
    setLinkedin(currentUser.linkedin || currentUser.socialLinks?.linkedin || '');
    setTwitter(currentUser.twitter || currentUser.socialLinks?.twitter || '');

    // College & Education
    const roleData: any = currentUser.roleProfileData || {};
    const primaryCollege = currentUser.college || roleData.college || '';
    setCollege(primaryCollege);
    setDegree(roleData.degree || 'B.Tech');
    setDepartment(roleData.department || roleData.major || 'Computer Science and Engineering');
    setYear(roleData.year || '4th Year');
    setGraduationYear(roleData.graduationYear || '2026');
    setStudentIdNumber(roleData.studentIdNumber || '');
    setCgpa(roleData.cgpa || '');
    setEducationList(currentUser.education || []);

    // Career
    setCareerGoal(currentUser.studentData?.careerGoal || 'Full-Stack & Distributed AI Engineer');
    setInterestedDomains(currentUser.studentData?.interestedDomains || ['Full-Stack', 'AI / ML', 'System Design']);

    // Skills
    setVerifiedSkills(currentUser.skills?.verified || []);
    setInterestedSkills(currentUser.skills?.interested || []);

    // Projects & Certificates
    setProjectsList(currentUser.projects || []);
    setCertificatesList(currentUser.certificates || []);

    // Media
    setAvatarUrl(currentUser.avatarUrl || AVATAR_PRESETS[0]);
    setCoverPhotoUrl(currentUser.coverPhotoUrl || COVER_PRESETS[0].url);
    setCoverTheme(currentUser.coverTheme || 'cosmic_indigo');

    // Privacy
    const priv = currentUser.privacyPreferences || currentUser.privacy || {};
    setProfileVisibility((priv.profileVisibility as any) || 'PUBLIC');
    setShowEmail(!!priv.showEmail);
    setShowPhone(!!priv.showPhone);
    setShowCollege(priv.showCollege !== false);
    setShowSkills(priv.showSkills !== false);
    setShowProjects(priv.showProjects !== false);
    setShowGallery((priv.showGallery as any) || 'PUBLIC');
    setAllowFollowers(priv.allowFollowers !== false);
  }, [currentUser, navigate]);

  // Username validation check
  const handleCheckUsername = (val: string) => {
    setUsername(val);
    if (!val || val === currentUser?.username) {
      setUsernameStatus({});
      return;
    }
    const check = accountDb.checkUsernameAvailability(val);
    if (check.available) {
      setUsernameStatus({ available: true, msg: 'Username is available!' });
    } else {
      setUsernameStatus({ available: false, msg: check.reason || 'Username taken' });
    }
  };

  // College selection handler
  const handleSelectCollege = (colName: string) => {
    if (college && college !== colName) {
      setPendingCollege(colName);
      setShowCollegeChangeWarning(true);
    } else {
      setCollege(colName);
      setIsCollegeDropdownOpen(false);
    }
  };

  const confirmCollegeChange = () => {
    setCollege(pendingCollege);
    setShowCollegeChangeWarning(false);
    setIsCollegeDropdownOpen(false);
  };

  // Save all profile changes
  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const cleanUsername = username.trim().toLowerCase().replace('@', '');
      if (cleanUsername !== currentUser.username && accountDb.isUsernameTaken(cleanUsername, currentUser.id)) {
        setErrorMsg('Username is already taken by another user.');
        setSaving(false);
        return;
      }

      const updatedRoleProfileData = {
        ...(currentUser.roleProfileData || {}),
        college,
        degree,
        department,
        major: department,
        year,
        graduationYear,
        studentIdNumber,
        cgpa
      };

      const updatedAccount: Partial<Account> = {
        firstName,
        lastName,
        displayName: displayName || `${firstName} ${lastName}`.trim(),
        fullName: `${firstName} ${lastName}`.trim(),
        username: cleanUsername,
        tagline,
        bio,
        phoneNumber,
        phone: phoneNumber,
        college,
        city,
        state: stateVal,
        country,
        location: `${city}${city && stateVal ? ', ' : ''}${stateVal}`,
        website,
        github,
        linkedin,
        twitter,
        socialLinks: {
          website,
          github,
          linkedin,
          twitter
        },
        skills: {
          verified: verifiedSkills,
          interested: interestedSkills
        },
        education: educationList,
        projects: projectsList,
        certificates: certificatesList,
        avatarUrl,
        coverPhotoUrl,
        coverTheme,
        roleProfileData: updatedRoleProfileData,
        privacyPreferences: {
          profileVisibility,
          showEmail,
          showPhone,
          showCollege,
          showLocation: true,
          showSkills,
          showProjects,
          showGallery,
          showAchievements: true,
          showSocialLinks: true,
          allowFollowers
        },
        privacy: {
          profileVisibility,
          showEmail,
          showPhone,
          showCollege,
          showLocation: true,
          showSkills,
          showProjects,
          showGallery,
          showAchievements: true,
          showSocialLinks: true,
          allowFollowers
        }
      };

      await updateProfile(updatedAccount);
      refreshUser();

      setSuccessMsg('Your profile has been successfully saved to the ACE database!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  // Skill Helpers
  const addVerifiedSkill = () => {
    if (newSkillInput.trim() && !verifiedSkills.includes(newSkillInput.trim())) {
      setVerifiedSkills([...verifiedSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const removeVerifiedSkill = (skill: string) => {
    setVerifiedSkills(verifiedSkills.filter(s => s !== skill));
  };

  const addInterestedSkill = () => {
    if (newInterestedSkillInput.trim() && !interestedSkills.includes(newInterestedSkillInput.trim())) {
      setInterestedSkills([...interestedSkills, newInterestedSkillInput.trim()]);
      setNewInterestedSkillInput('');
    }
  };

  const removeInterestedSkill = (skill: string) => {
    setInterestedSkills(interestedSkills.filter(s => s !== skill));
  };

  // Filtered colleges for search
  const filteredColleges = VERIFIED_COLLEGES.filter(c =>
    c.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 transition-colors duration-200">
      {/* Top Banner & Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={currentUser ? `/profile/@${currentUser.username}` : '/profile'}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Profile</span>
            </Link>
            <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Edit Account Profile
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={currentUser ? `/profile/@${currentUser.username}` : '/profile'}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              View Public
            </Link>
            <button
              onClick={() => handleSaveProfile()}
              disabled={saving}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Toast Alerts */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 shadow-sm animate-fade-in">
            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <p className="text-sm font-medium">{successMsg}</p>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 flex items-center gap-3 shadow-sm animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm sticky top-24">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Profile Sections
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'PERSONAL', label: 'Personal & Identity', icon: User },
                  { id: 'EDUCATION', label: 'College & Academics', icon: School },
                  { id: 'CAREER', label: 'Career & Goals', icon: Briefcase },
                  { id: 'SKILLS', label: 'Skills & Stack', icon: Sparkles },
                  { id: 'PROJECTS', label: 'Projects & Certs', icon: BookOpen },
                  { id: 'MEDIA', label: 'Avatar & Cover Photo', icon: ImageIcon },
                  { id: 'PRIVACY', label: 'Privacy & Visibility', icon: Shield },
                  { id: 'ACCOUNT', label: 'Account Security', icon: Lock },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id as EditTab)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-500/30'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Profile Strength Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 px-3">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-500 dark:text-slate-400">Profile Strength</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{currentUser?.profileStrength || 85}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${currentUser?.profileStrength || 85}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              {/* TAB 1: PERSONAL */}
              {activeTab === 'PERSONAL' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal & Identity</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Manage your public name, username, bio, and contact information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="Dileep"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="Kumar"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="Dileep Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Username (Unique Handle)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-medium">@</span>
                        <input
                          type="text"
                          value={username}
                          onChange={e => handleCheckUsername(e.target.value)}
                          className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="dileepkumar"
                        />
                      </div>
                      {usernameStatus.msg && (
                        <p className={`text-xs mt-1.5 ${usernameStatus.available ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {usernameStatus.msg}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Professional Headline / Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={e => setTagline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="e.g., Aspiring Full-Stack & AI Systems Engineer | Open Source Enthusiast"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Bio / About You
                    </label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="Write a brief introduction about your background, projects, hackathon achievements, and what you are learning..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="Coimbatore"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={stateVal}
                        onChange={e => setStateVal(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="Tamil Nadu"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="India"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Social & Developer Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5" /> GitHub Profile URL
                        </label>
                        <input
                          type="text"
                          value={github}
                          onChange={e => setGithub(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                          placeholder="https://github.com/username"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile URL
                        </label>
                        <input
                          type="text"
                          value={linkedin}
                          onChange={e => setLinkedin(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5" /> Personal Website / Portfolio
                        </label>
                        <input
                          type="text"
                          value={website}
                          onChange={e => setWebsite(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                          <Twitter className="w-3.5 h-3.5" /> Twitter / X Profile
                        </label>
                        <input
                          type="text"
                          value={twitter}
                          onChange={e => setTwitter(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EDUCATION & COLLEGE */}
              {activeTab === 'EDUCATION' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">College & Academic Information</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Your registered institution is used to calculate college rankings, assign college mentors, and grant event eligibility.
                    </p>
                  </div>

                  {/* College Selection Box */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Selected Institution / University
                    </label>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={college}
                          readOnly={!customCollege}
                          onClick={() => !customCollege && setIsCollegeDropdownOpen(true)}
                          onChange={e => customCollege && setCollege(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          placeholder="Select or search verified college"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsCollegeDropdownOpen(!isCollegeDropdownOpen)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      >
                        Change
                      </button>
                    </div>

                    {/* College Search Dropdown Modal */}
                    {isCollegeDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 animate-fade-in">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Search Verified Indian Colleges
                          </span>
                          <button
                            onClick={() => setIsCollegeDropdownOpen(false)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          >
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
                            placeholder="Search by college name, city, state..."
                          />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-1">
                          {filteredColleges.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => handleSelectCollege(c.name)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition flex items-center justify-between ${
                                college === c.name
                                  ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 font-semibold'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div>
                                <div className="font-medium">{c.name}</div>
                                <div className="text-xs text-slate-400">{c.city}, {c.state}</div>
                              </div>
                              {college === c.name && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            </button>
                          ))}
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span className="text-xs text-slate-400">Can't find your college?</span>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomCollege(true);
                              setIsCollegeDropdownOpen(false);
                            }}
                            className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                          >
                            Type Custom College Name
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Warning modal on changing college */}
                  {showCollegeChangeWarning && (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 space-y-3">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold">Confirm College Institution Change</div>
                          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                            You are changing your college from <strong>"{college}"</strong> to <strong>"{pendingCollege}"</strong>.
                            This will re-align your assigned college mentors, peer leaderboard, and campus communities.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setShowCollegeChangeWarning(false)}
                          className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={confirmCollegeChange}
                          className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition"
                        >
                          Yes, Confirm Change
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Academic Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Degree Program
                      </label>
                      <select
                        value={degree}
                        onChange={e => setDegree(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                      >
                        <option value="B.Tech">Bachelor of Technology (B.Tech)</option>
                        <option value="B.E.">Bachelor of Engineering (B.E.)</option>
                        <option value="B.Sc">Bachelor of Science (B.Sc)</option>
                        <option value="BCA">Bachelor of Computer Applications (BCA)</option>
                        <option value="M.Tech">Master of Technology (M.Tech)</option>
                        <option value="MCA">Master of Computer Applications (MCA)</option>
                        <option value="M.Sc">Master of Science (M.Sc)</option>
                        <option value="Ph.D">Doctor of Philosophy (Ph.D)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Department / Branch
                      </label>
                      <input
                        type="text"
                        value={department}
                        onChange={e => setDepartment(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="Computer Science and Engineering"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Year of Study
                      </label>
                      <select
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th Year">5th Year</option>
                        <option value="Graduated">Graduated / Alumni</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Graduation Year
                      </label>
                      <input
                        type="text"
                        value={graduationYear}
                        onChange={e => setGraduationYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="2026"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Student ID / Roll No.
                      </label>
                      <input
                        type="text"
                        value={studentIdNumber}
                        onChange={e => setStudentIdNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="22CS089"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        CGPA / Grade
                      </label>
                      <input
                        type="text"
                        value={cgpa}
                        onChange={e => setCgpa(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="8.9 / 10"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CAREER & GOALS */}
              {activeTab === 'CAREER' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Career Aspirations & Target Roles</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Share your dream career paths to receive personalized mentorship and hackathon recommendations.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Target Career Goal / Dream Role
                    </label>
                    <input
                      type="text"
                      value={careerGoal}
                      onChange={e => setCareerGoal(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                      placeholder="e.g. Lead AI Systems Engineer at a high-growth tech startup"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Interested Technical Domains
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {interestedDomains.map((domain) => (
                        <span
                          key={domain}
                          className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold flex items-center gap-1.5"
                        >
                          {domain}
                          <button
                            type="button"
                            onClick={() => setInterestedDomains(interestedDomains.filter(d => d !== domain))}
                            className="hover:text-indigo-900 dark:hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newDomainInput}
                        onChange={e => setNewDomainInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (newDomainInput.trim() && !interestedDomains.includes(newDomainInput.trim())) {
                              setInterestedDomains([...interestedDomains, newDomainInput.trim()]);
                              setNewDomainInput('');
                            }
                          }
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="Add domain (e.g., Autonomous Agents, Web3, Distributed Systems)"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newDomainInput.trim() && !interestedDomains.includes(newDomainInput.trim())) {
                            setInterestedDomains([...interestedDomains, newDomainInput.trim()]);
                            setNewDomainInput('');
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SKILLS */}
              {activeTab === 'SKILLS' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Technical Skills & Stack</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Showcase technologies you build with, as well as topics you are currently exploring.
                    </p>
                  </div>

                  {/* Verified / Core Skills */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Core / Verified Skills
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
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
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkillInput}
                        onChange={e => setNewSkillInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addVerifiedSkill();
                          }
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="Add skill (e.g., React 19, TypeScript, PyTorch, Docker)"
                      />
                      <button
                        type="button"
                        onClick={addVerifiedSkill}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                      >
                        Add Skill
                      </button>
                    </div>
                  </div>

                  {/* Interested Skills */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Skills You Want to Learn / Interested In
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {interestedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold flex items-center gap-1.5"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeInterestedSkill(skill)}
                            className="hover:text-blue-900 dark:hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newInterestedSkillInput}
                        onChange={e => setNewInterestedSkillInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addInterestedSkill();
                          }
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
                        placeholder="e.g., Rust, Kubernetes, Quantum Computing, LLM Fine-Tuning"
                      />
                      <button
                        type="button"
                        onClick={addInterestedSkill}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                      >
                        Add Interest
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PROJECTS & CERTIFICATES */}
              {activeTab === 'PROJECTS' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Featured Projects & Certifications</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Highlight your notable development projects, open-source repositories, and verified achievements.
                    </p>
                  </div>

                  {/* Projects List */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Projects ({projectsList.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newProj: ProjectRecord = {
                            id: 'proj_' + Date.now(),
                            title: 'New Innovation Project',
                            description: 'Description of technologies and architecture built.',
                            technologies: ['React', 'TypeScript'],
                            githubUrl: 'https://github.com/',
                            visibility: 'PUBLIC'
                          };
                          setProjectsList([...projectsList, newProj]);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Project
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projectsList.map((proj, idx) => (
                        <div key={proj.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={proj.title || proj.name || ''}
                              onChange={e => {
                                const updated = [...projectsList];
                                updated[idx] = { ...proj, title: e.target.value, name: e.target.value };
                                setProjectsList(updated);
                              }}
                              className="font-bold text-sm bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white flex-1 mr-4"
                              placeholder="Project Title"
                            />
                            <button
                              type="button"
                              onClick={() => setProjectsList(projectsList.filter(p => p.id !== proj.id))}
                              className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={e => {
                              const updated = [...projectsList];
                              updated[idx] = { ...proj, description: e.target.value };
                              setProjectsList(updated);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                            placeholder="Describe the problem solved, tech stack, and impact..."
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={proj.githubUrl || ''}
                              onChange={e => {
                                const updated = [...projectsList];
                                updated[idx] = { ...proj, githubUrl: e.target.value };
                                setProjectsList(updated);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                              placeholder="GitHub Repository URL"
                            />
                            <input
                              type="text"
                              value={proj.liveUrl || ''}
                              onChange={e => {
                                const updated = [...projectsList];
                                updated[idx] = { ...proj, liveUrl: e.target.value };
                                setProjectsList(updated);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                              placeholder="Live Deployment URL"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certificates List */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Certifications & Credentials ({certificatesList.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newCert: CertificateRecord = {
                            id: 'cert_' + Date.now(),
                            title: 'Certified Cloud & AI Engineer',
                            issuer: 'ACE National Tech Council',
                            issueDate: '2026-01-15',
                            isAceVerified: true
                          };
                          setCertificatesList([...certificatesList, newCert]);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Certificate
                      </button>
                    </div>

                    <div className="space-y-3">
                      {certificatesList.map((cert, idx) => (
                        <div key={cert.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={cert.title}
                              onChange={e => {
                                const updated = [...certificatesList];
                                updated[idx] = { ...cert, title: e.target.value };
                                setCertificatesList(updated);
                              }}
                              className="font-bold text-sm bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white flex-1 mr-4"
                              placeholder="Certificate Title"
                            />
                            <button
                              type="button"
                              onClick={() => setCertificatesList(certificatesList.filter(c => c.id !== cert.id))}
                              className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={e => {
                                const updated = [...certificatesList];
                                updated[idx] = { ...cert, issuer: e.target.value };
                                setCertificatesList(updated);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                              placeholder="Issuing Organization"
                            />
                            <input
                              type="text"
                              value={cert.credentialUrl || ''}
                              onChange={e => {
                                const updated = [...certificatesList];
                                updated[idx] = { ...cert, credentialUrl: e.target.value };
                                setCertificatesList(updated);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                              placeholder="Credential Verification Link"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: MEDIA & PHOTOS */}
              {activeTab === 'MEDIA' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Photo & Cover Banner</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Customize your avatar and banner image to personalize your ACE presence.
                    </p>
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">
                      Avatar / Profile Picture
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative group">
                        <img
                          src={avatarUrl}
                          alt="Avatar Preview"
                          className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                        />
                      </div>

                      <div className="flex-1 space-y-3 w-full">
                        <input
                          type="text"
                          value={avatarUrl}
                          onChange={e => setAvatarUrl(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                          placeholder="Paste image URL..."
                        />

                        <div>
                          <div className="text-xs text-slate-400 mb-1.5">Or choose a preset:</div>
                          <div className="flex gap-2">
                            {AVATAR_PRESETS.map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setAvatarUrl(preset)}
                                className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition ${
                                  avatarUrl === preset ? 'border-indigo-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                <img src={preset} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cover Photo */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">
                      Cover Banner Image
                    </label>

                    <div className="h-32 rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
                      <img
                        src={coverPhotoUrl}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={coverPhotoUrl}
                        onChange={e => setCoverPhotoUrl(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                        placeholder="Custom Banner image URL..."
                      />

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {COVER_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              setCoverPhotoUrl(preset.url);
                              setCoverTheme(preset.id);
                            }}
                            className={`p-1.5 rounded-xl border text-left transition ${
                              coverPhotoUrl === preset.url
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <div className="h-12 rounded-lg overflow-hidden mb-1">
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                              {preset.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: PRIVACY & VISIBILITY */}
              {activeTab === 'PRIVACY' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Privacy & Visibility Preferences</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Control who can view your profile information, academic records, and contact details.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Overall Profile Visibility
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'PUBLIC', label: 'Public (Everyone)', desc: 'Visible to all students, recruiters & visitors' },
                          { id: 'COLLEGE_ONLY', label: 'Campus Only', desc: 'Only students & faculty from your college' },
                          { id: 'PRIVATE', label: 'Private (Invite Only)', desc: 'Only users you explicitly approve' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setProfileVisibility(opt.id as any)}
                            className={`p-3 rounded-xl border text-left transition ${
                              profileVisibility === opt.id
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="font-bold text-sm mb-1">{opt.label}</div>
                            <div className="text-xs text-slate-400">{opt.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Information Display Toggles
                      </div>

                      {[
                        { label: 'Display College & Academic Department', value: showCollege, setter: setShowCollege },
                        { label: 'Display Technical Skills & Stack', value: showSkills, setter: setShowSkills },
                        { label: 'Display Projects & Certifications', value: showProjects, setter: setShowProjects },
                        { label: 'Allow Peer Students to Follow Me', value: allowFollowers, setter: setAllowFollowers },
                        { label: 'Display Email Address on Profile', value: showEmail, setter: setShowEmail },
                        { label: 'Display Phone Number on Profile', value: showPhone, setter: setShowPhone },
                      ].map((toggle, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 cursor-pointer"
                        >
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{toggle.label}</span>
                          <input
                            type="checkbox"
                            checked={toggle.value}
                            onChange={e => toggle.setter(e.target.checked)}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: ACCOUNT SECURITY */}
              {activeTab === 'ACCOUNT' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Account Security & Credentials</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Manage your password, registered email address, and security sessions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Registered Email</div>
                        <div className="text-xs text-slate-500">{currentUser?.email}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Password & Authentication</div>
                      <div className="text-xs text-slate-500">Last changed recently</div>
                    </div>
                    <Link
                      to="/settings/security"
                      className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      Change Password
                    </Link>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      to="/settings/danger-zone"
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Deactivate or Delete Account
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Form Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  to={currentUser ? `/profile/@${currentUser.username}` : '/profile'}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </Link>

                <button
                  type="button"
                  onClick={() => handleSaveProfile()}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
