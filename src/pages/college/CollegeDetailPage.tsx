import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  Award,
  Users,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  GraduationCap,
  Share2,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { institutionDatabase } from '../../services/db/institutionDatabase';
import { mentorDb } from '../../services/db/mentorDatabase';

export const CollegeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'mentors' | 'events' | 'ambassadors'>('overview');
  const [copied, setCopied] = useState(false);

  const institution = useMemo(() => {
    if (!slug) return null;
    return institutionDatabase.getInstitutionBySlug(slug);
  }, [slug]);

  const collegeMentors = useMemo(() => {
    if (!institution) return [];
    return mentorDb.getMentorsByCollege(institution.name);
  }, [institution]);

  if (!institution) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Institution Not Found</h2>
          <p className="text-sm text-muted-foreground">
            The institution page you are looking for does not exist or may have been renamed.
          </p>
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Link
            to="/colleges"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Institutions</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Building2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{institution.name}</h1>
                  {institution.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Campus
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    {institution.city}, {institution.districtName ? `${institution.districtName}, ` : ''}{institution.stateName}
                  </span>
                  {institution.aisheCode && (
                    <span className="px-2 py-0.5 rounded-md bg-muted text-foreground text-xs font-mono">
                      AISHE: {institution.aisheCode}
                    </span>
                  )}
                  {institution.nirfRank && (
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                      <Award className="w-4 h-4" />
                      NIRF #{institution.nirfRank}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              {institution.website && (
                <a
                  href={institution.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-primary/20"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview & Details
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'mentors'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Campus Mentors ({collegeMentors.length || institution.mentorCount || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events ({institution.eventCount || 0})</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Card */}
              <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                <h3 className="text-lg font-bold text-foreground">Institution Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">Institution Type</span>
                    <span className="font-semibold text-foreground">{institution.institutionType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Category</span>
                    <span className="font-semibold text-foreground">{institution.institutionCategory.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Management Type</span>
                    <span className="font-semibold text-foreground">{institution.managementType.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Year Established</span>
                    <span className="font-semibold text-foreground">{institution.establishedYear || 'N/A'}</span>
                  </div>
                  {institution.affiliatingUniversity && (
                    <div className="sm:col-span-2">
                      <span className="text-xs text-muted-foreground block">Affiliating University</span>
                      <span className="font-semibold text-foreground">{institution.affiliatingUniversity}</span>
                    </div>
                  )}
                  {institution.accreditation && (
                    <div className="sm:col-span-2">
                      <span className="text-xs text-muted-foreground block">Accreditation</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{institution.accreditation}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Campus Address */}
              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <h3 className="text-lg font-bold text-foreground">Campus Location</h3>
                <p className="text-sm text-muted-foreground">{institution.address}</p>
                <div className="text-xs text-muted-foreground pt-2">
                  <span>State Code: <strong className="text-foreground">{institution.stateId}</strong></span>
                  {institution.pincode && <span className="ml-4">Pincode: <strong className="text-foreground">{institution.pincode}</strong></span>}
                </div>
              </div>
            </div>

            {/* Right Side Stats */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider text-muted-foreground">
                  Campus Quick Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                    <span className="text-xs text-muted-foreground">Registered Students</span>
                    <span className="font-bold text-foreground">{institution.studentCount ? institution.studentCount.toLocaleString() : 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                    <span className="text-xs text-muted-foreground">Verified Mentors</span>
                    <span className="font-bold text-indigo-500">{collegeMentors.length || institution.mentorCount || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                    <span className="text-xs text-muted-foreground">Campus Events</span>
                    <span className="font-bold text-amber-500">{institution.eventCount || 0}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/register"
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all shadow-md shadow-primary/20"
                  >
                    <span>Join as Student / Mentor</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Verified Campus Mentors</h3>
              <Link
                to="/mentors"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Browse All ACE Mentors</span>
                <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            {collegeMentors.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-card border border-border space-y-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground">No mentors enrolled yet for this campus</h4>
                <p className="text-xs text-muted-foreground">
                  Are you a faculty member or industry expert from this institution? Join ACE as a verified mentor today.
                </p>
                <Link
                  to="/mentor/apply"
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90"
                >
                  Apply as Campus Mentor
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collegeMentors.map((m: any) => (
                  <div key={m.id} className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                        alt={m.name}
                        className="w-12 h-12 rounded-full object-cover border border-border"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{m.name}</h4>
                        <p className="text-xs text-muted-foreground">{m.title || m.specialization}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{m.bio}</p>
                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-emerald-500 font-semibold">{m.rating || 4.9} ★</span>
                      <Link to={`/mentors/${m.id}`} className="text-primary font-semibold hover:underline">
                        Book Guidance
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="p-8 text-center rounded-2xl bg-card border border-border space-y-3">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-foreground">Campus Events & Tech Fests</h4>
            <p className="text-xs text-muted-foreground">
              Explore national hackathons, technical symposiums, and cultural events hosted by {institution.shortName || institution.name}.
            </p>
            <Link
              to="/events"
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90"
            >
              Explore National Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
