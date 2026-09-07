import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { accountDb } from '../../services/db/accountDatabase';
import { Account, AccountRole, StudentProfileData, AmbassadorProfileData, OrganizerProfileData, MentorProfileData, CollegeProfileData } from '../../types/account';
import {
  MapPin, School, CheckCircle2, ShieldCheck, Edit3, Share2,
  Calendar, Award, ExternalLink, Github, Linkedin, Twitter, Globe,
  Users, Sparkles, BookOpen, Briefcase, Trophy, Image as ImageIcon,
  UserCheck, UserPlus, QrCode, FileText, Check
} from 'lucide-react';

export const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const { currentUser, toggleFollow } = useAuth();
  const [profileUser, setProfileUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'activity' | 'gallery'>('overview');
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!username) {
      setProfileUser(currentUser);
    } else {
      const cleanUsername = username.replace('@', '').toLowerCase();
      const user = accountDb.getAccountByUsername(cleanUsername);
      setProfileUser(user || null);
    }
    setLoading(false);
  }, [username, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mr-3" />
        Loading profile...
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
        <p className="text-slate-400 max-w-md mb-6">
          The profile @{username} doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;
  const isFollowing = currentUser?.following.includes(profileUser.id);
  const userGallery = accountDb.getGalleryImages(profileUser.id);

  const roleColors: Record<AccountRole, string> = {
    STUDENT: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    COLLEGE_AMBASSADOR: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    ORGANIZER: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    MENTOR: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    COLLEGE: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    ADMIN: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Cover Header Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
        <img
          src={profileUser.coverPhotoUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Quick action buttons on cover */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 text-sm font-medium hover:bg-slate-800 transition flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied' : 'Share'}
          </button>
          <button
            onClick={() => setShowQrModal(true)}
            className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 hover:bg-slate-800 transition"
            title="Show QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
          {isOwnProfile && (
            <Link
              to="/settings/profile"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </Link>
          )}
        </div>
      </div>

      {/* Main Profile Info Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Column: Avatar & Quick Info Card */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="relative -mt-16 sm:-mt-20 inline-block mx-auto">
                <img
                  src={profileUser.avatarUrl}
                  alt={profileUser.fullName}
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-slate-900 shadow-2xl"
                />
                {profileUser.isVerified && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1.5 rounded-xl border-2 border-slate-900 shadow-lg"
                    title="Verified Account"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">{profileUser.fullName}</h1>
                </div>
                <p className="text-indigo-400 font-mono text-sm">@{profileUser.username}</p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider border ${roleColors[profileUser.role]}`}>
                    {profileUser.role.replace('_', ' ')}
                  </span>
                  {profileUser.emailVerified && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Email Verified
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{profileUser.bio}</p>

              {/* Location & College Details */}
              <div className="space-y-2.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2.5">
                  <School className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{profileUser.college}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{profileUser.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>Joined {new Date(profileUser.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
                <div>
                  <div className="text-lg font-bold text-white">{profileUser.stats.eventsAttended}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Events</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{profileUser.stats.followersCount}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{profileUser.stats.reputationScore}</div>
                  <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Rep</div>
                </div>
              </div>

              {/* Follow / Action Buttons */}
              {!isOwnProfile && currentUser && (
                <button
                  onClick={() => toggleFollow(profileUser.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                    isFollowing
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4 text-emerald-400" /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" /> Follow
                    </>
                  )}
                </button>
              )}

              {/* Social Links */}
              <div className="flex items-center justify-center gap-3 pt-2">
                {profileUser.socialLinks.github && (
                  <a
                    href={profileUser.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profileUser.socialLinks.linkedin && (
                  <a
                    href={profileUser.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profileUser.socialLinks.twitter && (
                  <a
                    href={profileUser.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {profileUser.socialLinks.website && (
                  <a
                    href={profileUser.socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Profile Strength Indicator (Only for owner) */}
              {isOwnProfile && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-indigo-300 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Profile Strength
                    </span>
                    <span className="text-indigo-400 font-bold">{profileUser.profileStrength}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${profileUser.profileStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tabbed Content (Overview, Education, Skills, Projects, Gallery) */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
              {(['overview', 'skills', 'activity', 'gallery'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition flex items-center gap-2 ${
                    activeTab === tab
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {tab === 'overview' && <BookOpen className="w-4 h-4" />}
                  {tab === 'skills' && <Award className="w-4 h-4" />}
                  {tab === 'activity' && <Trophy className="w-4 h-4" />}
                  {tab === 'gallery' && <ImageIcon className="w-4 h-4" />}
                  {tab}
                  {tab === 'gallery' && (
                    <span className="text-xs px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400">
                      {userGallery.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Role Specific Highlight Banner */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-400" />
                    Role Experience & Focus
                  </h3>
                  
                  {profileUser.role === 'STUDENT' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Degree & Major</span>
                        <p className="font-semibold text-white mt-1">{(profileUser.roleProfileData as StudentProfileData).degree || 'Engineering'} in {(profileUser.roleProfileData as StudentProfileData).major || 'Computer Science'}</p>
                        <p className="text-xs text-slate-400 mt-1">Graduation: Class of {(profileUser.roleProfileData as StudentProfileData).graduationYear || '2026'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Student ID / Roll</span>
                        <p className="font-mono text-indigo-300 mt-1">{(profileUser.roleProfileData as StudentProfileData).studentIdNumber || 'Verified On-Campus'}</p>
                        <p className="text-xs text-slate-400 mt-1">Status: Active Student</p>
                      </div>
                    </div>
                  )}

                  {profileUser.role === 'COLLEGE_AMBASSADOR' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Campus</span>
                        <p className="font-semibold text-white mt-1">{(profileUser.roleProfileData as AmbassadorProfileData).campusName}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Students Referred</span>
                        <p className="font-semibold text-amber-400 mt-1">{(profileUser.roleProfileData as AmbassadorProfileData).referralCount} Students</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Campaigns</span>
                        <p className="font-semibold text-indigo-400 mt-1">{(profileUser.roleProfileData as AmbassadorProfileData).eventsPromotedCount} Active</p>
                      </div>
                    </div>
                  )}

                  {profileUser.role === 'ORGANIZER' && (
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{(profileUser.roleProfileData as OrganizerProfileData).organizationName}</span>
                        <span className="text-xs text-purple-400 uppercase font-bold">{(profileUser.roleProfileData as OrganizerProfileData).organizerType}</span>
                      </div>
                      <p className="text-xs text-slate-400">Official Campus Event Partner</p>
                    </div>
                  )}

                  {profileUser.role === 'MENTOR' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Domain Expertise</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(profileUser.roleProfileData as MentorProfileData).domainExpertise?.map((exp, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Years Experience</span>
                        <p className="text-xl font-bold text-white mt-1">{(profileUser.roleProfileData as MentorProfileData).yearsOfExperience} Years</p>
                        <p className="text-xs text-slate-400">Available for 1-on-1 Mentorship</p>
                      </div>
                    </div>
                  )}

                  {profileUser.role === 'COLLEGE' && (
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <p className="text-sm font-semibold text-white">Accreditation: {(profileUser.roleProfileData as CollegeProfileData).accreditation || 'NAAC A++'}</p>
                      <p className="text-xs text-slate-400 mt-1">Official verified university portal for technical fests & hackathons.</p>
                    </div>
                  )}
                </div>

                {/* Education Timeline */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <School className="w-5 h-5 text-indigo-400" />
                    Education History
                  </h3>
                  {profileUser.education.length === 0 ? (
                    <p className="text-sm text-slate-500">No education entries added yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {profileUser.education.map((edu) => (
                        <div key={edu.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between">
                          <div>
                            <h4 className="text-base font-bold text-white">{edu.institution}</h4>
                            <p className="text-sm text-indigo-400">{edu.degree} in {edu.fieldOfStudy}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {edu.startYear} — {edu.current ? 'Present' : edu.endYear} {edu.grade && `• Grade: ${edu.grade}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Projects Showcase */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    Featured Projects
                  </h3>
                  {profileUser.projects.length === 0 ? (
                    <p className="text-sm text-slate-500">No projects published yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileUser.projects.map((proj) => (
                        <div key={proj.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-white text-base">{proj.title}</h4>
                              <div className="flex items-center gap-2">
                                {proj.githubUrl && (
                                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                                    <Github className="w-4 h-4" />
                                  </a>
                                )}
                                {proj.liveUrl && (
                                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300">
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{proj.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {proj.technologies.map((t, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SKILLS & CERTIFICATES */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-emerald-400" />
                      Verified Skill Proficiencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profileUser.skills.verified.length === 0 ? (
                        <p className="text-sm text-slate-500">No verified skills yet.</p>
                      ) : (
                        profileUser.skills.verified.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-3">Interested / Exploring Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileUser.skills.interested.length === 0 ? (
                        <p className="text-sm text-slate-500">No interested skills listed.</p>
                      ) : (
                        profileUser.skills.interested.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Certificates */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    Issued Credentials & Certificates
                  </h3>
                  {profileUser.certificates.length === 0 ? (
                    <p className="text-sm text-slate-500">No certificates uploaded yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profileUser.certificates.map((cert) => (
                        <div key={cert.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                            <p className="text-xs text-amber-400 mt-0.5">{cert.issuer}</p>
                            <p className="text-[11px] text-slate-500 mt-1">Issued: {cert.issueDate}</p>
                          </div>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ACTIVITY & ACHIEVEMENTS */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Achievements & Honors
                  </h3>
                  {profileUser.achievements.length === 0 ? (
                    <p className="text-sm text-slate-500">No achievements recorded yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {profileUser.achievements.map((ach) => (
                        <div key={ach.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">{ach.description}</p>
                            <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">{ach.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PHOTO GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-indigo-400" />
                      Visual Photo Gallery
                    </h3>
                    {isOwnProfile && (
                      <Link
                        to="/settings/photos"
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                      >
                        Manage & Upload Photos →
                      </Link>
                    )}
                  </div>

                  {userGallery.length === 0 ? (
                    <p className="text-sm text-slate-500 py-6 text-center">
                      No gallery photos published yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {userGallery.map((img) => (
                        <div key={img.id} className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800">
                          <img
                            src={img.url}
                            alt={img.caption || 'Gallery photo'}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                            <p className="text-xs font-medium text-white truncate">{img.caption}</p>
                            <span className="text-[10px] text-slate-400 uppercase">{img.albumId}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <h3 className="text-lg font-bold text-white">Profile Quick Share QR</h3>
            <div className="p-4 bg-white rounded-2xl mx-auto inline-block">
              {/* Fallback QR representation */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.origin + '/profile/' + profileUser.username)}`}
                alt="QR Code"
                className="w-44 h-44"
              />
            </div>
            <p className="text-xs text-slate-400 font-mono">@{profileUser.username}</p>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
