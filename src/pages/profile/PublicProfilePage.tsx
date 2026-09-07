import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { accountDb } from '../../services/db/accountDatabase';
import { Account, AccountRole, GalleryImage } from '../../types/account';
import {
  MapPin, School, CheckCircle2, ShieldCheck, Edit3, Share2,
  Calendar, Award, ExternalLink, Github, Linkedin, Twitter, Globe,
  Users, Sparkles, BookOpen, Briefcase, Trophy, Image as ImageIcon,
  UserCheck, UserPlus, QrCode, FileText, Check, ChevronRight, X,
  Download, Eye, Maximize2, Compass
} from 'lucide-react';

export const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const { currentUser, toggleFollow } = useAuth();
  const [profileUser, setProfileUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'activity' | 'gallery'>('overview');
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!username) {
      setProfileUser(currentUser);
    } else {
      const cleanUsername = username.replace('@', '').toLowerCase().trim();
      const user = accountDb.getAccountByUsername(cleanUsername);
      setProfileUser(user || null);
    }
    setLoading(false);
  }, [username, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mr-3" />
        Loading profile...
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center p-6 transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-4">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">User Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6 text-sm">
          The profile @{username} does not exist or may have been updated.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition text-sm shadow-md"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;
  const isFollowing = currentUser ? currentUser.following.includes(profileUser.id) : false;
  const userGallery = accountDb.getGalleryImages(profileUser.id);

  // College source of truth
  const displayCollege = profileUser.college || (profileUser.roleProfileData as any)?.college || 'Not Specified';
  const roleData: any = profileUser.roleProfileData || {};

  const roleColors: Record<AccountRole, string> = {
    STUDENT: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    COLLEGE_AMBASSADOR: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    ORGANIZER: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    MENTOR: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    COLLEGE: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    ADMIN: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFollow = () => {
    if (!currentUser) return;
    toggleFollow(profileUser.id);
    const updated = accountDb.getAccountById(profileUser.id);
    if (updated) setProfileUser({ ...updated });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-200">
      {/* Cover Header Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-200 dark:bg-slate-900">
        <img
          src={profileUser.coverPhotoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600'}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        
        {/* Quick action buttons on cover */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/10 text-white text-xs font-semibold hover:bg-slate-900/90 transition flex items-center gap-2 shadow-md"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Share'}
          </button>
          <button
            onClick={() => setShowQrModal(true)}
            className="p-2 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/10 text-white hover:bg-slate-900/90 transition shadow-md"
            title="Show QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
          {isOwnProfile && (
            <Link
              to="/profile/edit"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </Link>
          )}
        </div>
      </div>

      {/* Main Profile Info Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 sm:-mt-24 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            {/* Avatar & Identifiers */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="relative">
                <img
                  src={profileUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={profileUser.displayName}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white dark:border-slate-950 shadow-2xl bg-white dark:bg-slate-900"
                />
                {profileUser.isVerified && (
                  <div className="absolute bottom-1 right-1 p-1.5 rounded-xl bg-indigo-600 text-white border-2 border-white dark:border-slate-950 shadow-md" title="ACE Verified Profile">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {profileUser.displayName || profileUser.fullName}
                  </h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${roleColors[profileUser.role]}`}>
                    {profileUser.role.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">@{profileUser.username}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-medium">
                    <School className="w-4 h-4 text-slate-400" />
                    <span>{displayCollege}</span>
                  </div>
                  {profileUser.location && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{profileUser.location}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Follow / Edit Button Area */}
            <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              {!isOwnProfile && currentUser && (
                <button
                  onClick={handleToggleFollow}
                  className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm ${
                    isFollowing
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4 text-emerald-500" /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" /> Follow
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tagline & Bio */}
        {(profileUser.tagline || profileUser.bio) && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-6 shadow-sm">
            {profileUser.tagline && (
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">
                "{profileUser.tagline}"
              </p>
            )}
            {profileUser.bio && (
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {profileUser.bio}
              </p>
            )}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Ace Reputation
            </div>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {profileUser.stats?.reputationScore?.toLocaleString() || profileUser.pointsEarned || 2450}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Followers
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {profileUser.followersCount || profileUser.followers?.length || 0}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Events Attended
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {profileUser.stats?.eventsAttended || 14}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Profile Strength
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {profileUser.profileStrength || 95}%
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-2 sm:gap-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Projects', icon: BookOpen },
            { id: 'skills', label: 'Skills & Stack', icon: Sparkles },
            { id: 'activity', label: 'Certificates & Honors', icon: Award },
            { id: 'gallery', label: `Gallery (${userGallery.length})`, icon: ImageIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition whitespace-nowrap px-1 ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Tab Views */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <>
                {/* Academic & Degree Details Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <School className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Academic Profile
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">Institution</div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">{displayCollege}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">Degree & Department</div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">
                        {roleData.degree || 'B.Tech'} - {roleData.department || roleData.major || 'Computer Science'}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">Academic Year / Class</div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">
                        {roleData.year || '4th Year'} (Class of {roleData.graduationYear || '2026'})
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">Student Identifier</div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">
                        {roleData.studentIdNumber || 'Verified Student'} {roleData.cgpa ? `• ${roleData.cgpa} CGPA` : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Projects */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Featured Projects ({profileUser.projects?.length || 0})
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {profileUser.projects && profileUser.projects.length > 0 ? (
                      profileUser.projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{proj.title || proj.name}</h4>
                            <div className="flex items-center gap-2">
                              {proj.githubUrl && (
                                <a
                                  href={proj.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                                  title="GitHub Repository"
                                >
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                              {proj.liveUrl && (
                                <a
                                  href={proj.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition"
                                  title="Live Demo"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {proj.description}
                          </p>

                          {proj.technologies && proj.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {proj.technologies.map((t, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400 text-xs">No public projects added yet.</div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Verified & Core Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skills?.verified?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-blue-500" />
                    Interested In & Exploring
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skills?.interested?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CERTIFICATES & ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Certifications & Honors ({profileUser.certificates?.length || 0})
                </h3>

                {profileUser.certificates && profileUser.certificates.length > 0 ? (
                  profileUser.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          {cert.title}
                          {cert.isAceVerified && (
                            <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">Issued by {cert.issuer} • {cert.issueDate}</div>
                      </div>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition flex items-center gap-1.5"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs">No certificates listed yet.</div>
                )}
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Campus & Event Photos
                  </h3>
                  <Link
                    to={`/profile/@${profileUser.username}/gallery`}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All Gallery Albums
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {userGallery.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setLightboxImage(img)}
                      className="group relative h-36 rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800"
                    >
                      <img
                        src={img.thumbnailUrl || img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-2.5">
                        <p className="text-[11px] text-white font-medium truncate">{img.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Sidebar Info */}
          <div className="space-y-6">
            {/* Social Links Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect & Links
              </h4>
              <div className="space-y-2">
                {profileUser.socialLinks?.github && (
                  <a
                    href={profileUser.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {profileUser.socialLinks?.linkedin && (
                  <a
                    href={profileUser.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                  </a>
                )}
                {profileUser.socialLinks?.website && (
                  <a
                    href={profileUser.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
                  >
                    <Globe className="w-4 h-4 text-emerald-600" /> Website / Portfolio
                  </a>
                )}
                {profileUser.socialLinks?.twitter && (
                  <a
                    href={profileUser.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
                  >
                    <Twitter className="w-4 h-4 text-sky-500" /> Twitter / X
                  </a>
                )}
              </div>
            </div>

            {/* Quick QR Profile Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Share Profile</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Scan or share your unique ACE profile link with recruiters and peers.
              </p>
              <button
                onClick={() => setShowQrModal(true)}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition"
              >
                Open QR Modal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ACE Identity Pass</span>
              <button onClick={() => setShowQrModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-inner inline-block">
              {/* SVG QR Code Simulation */}
              <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="25" height="25" fill="#1e1b4b" rx="4" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#4f46e5" />
                <rect x="65" y="10" width="25" height="25" fill="#1e1b4b" rx="4" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#4f46e5" />
                <rect x="10" y="65" width="25" height="25" fill="#1e1b4b" rx="4" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#4f46e5" />
                <rect x="42" y="12" width="6" height="16" fill="#1e1b4b" />
                <rect x="42" y="38" width="16" height="6" fill="#4f46e5" />
                <rect x="42" y="55" width="16" height="16" fill="#1e1b4b" rx="2" />
                <rect x="68" y="42" width="20" height="6" fill="#1e1b4b" />
                <rect x="65" y="65" width="25" height="25" fill="#4f46e5" rx="4" />
              </svg>
            </div>

            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">@{profileUser.username}</div>
              <div className="text-xs text-slate-500">{displayCollege}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition"
              >
                {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption}
                className="w-full max-h-[75vh] object-contain mx-auto"
              />
              <div className="p-4 bg-slate-900/90 text-white">
                <p className="text-sm font-semibold">{lightboxImage.caption}</p>
                <p className="text-xs text-slate-400 mt-0.5">{lightboxImage.category || 'Campus Photo'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
