import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  Star,
  Calendar,
  MessageSquare,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  Check,
  Share2,
  MapPin,
  School
} from 'lucide-react';
import { MentorshipArea, SessionMode } from '../../types/mentor';

export const MentorPublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { collegeMentors, requestMentor, bookSession } = useMentor();
  const { currentUser } = useAuth();

  const mentor = collegeMentors.find(m => m.username.toLowerCase() === username?.toLowerCase().replace('@', ''));

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Request form state
  const [reason, setReason] = useState('');
  const [primaryArea, setPrimaryArea] = useState<MentorshipArea>('Technical Guidance');
  const [currentGoal, setCurrentGoal] = useState('');
  const [helpDescription, setHelpDescription] = useState('');
  const [preferredComm, setPreferredComm] = useState('ACE In-App Video');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Monday', 'Wednesday']);

  // Booking form state
  const [sessionDate, setSessionDate] = useState('2026-09-16');
  const [sessionTime, setSessionTime] = useState('17:00');
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionMode, setSessionMode] = useState<SessionMode>('ONLINE');

  if (!mentor) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Mentor Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested mentor @{username} is not registered or unavailable.</p>
        <Link to="/mentors" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold">
          Browse All Mentors
        </Link>
      </div>
    );
  }

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestMentor({
      mentorId: mentor.id,
      mentorName: mentor.fullName,
      reason,
      primaryGuidanceArea: primaryArea,
      currentGoal,
      helpNeededDescription: helpDescription,
      preferredCommunication: preferredComm,
      preferredDays,
      preferredTime: 'Evening (4 PM - 7 PM)'
    });
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setShowRequestModal(false);
    }, 2500);
  };

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookSession({
      mentorId: mentor.id,
      mentorName: mentor.fullName,
      mentorAvatar: mentor.avatarUrl,
      date: sessionDate,
      time: sessionTime,
      durationMinutes: mentor.availability.sessionDurationMinutes,
      topic: sessionTopic || '1-on-1 Strategy & Technical Guidance',
      mentorshipArea: mentor.mentorshipAreas[0] || 'Technical Guidance',
      mode: sessionMode,
      meetingUrl: 'https://meet.ace.edu/room/' + mentor.username
    });
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setShowBookingModal(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Cover Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
        <img src={mentor.coverPhotoUrl} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Quick Info Card */}
          <div className="space-y-6">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="relative -mt-16 sm:-mt-20 inline-block">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.fullName}
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-slate-900 shadow-2xl"
                />
                {mentor.isVerifiedMentor && (
                  <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-indigo-600 text-white shadow-lg border-2 border-slate-900">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-black text-white">{mentor.fullName}</h1>
                <p className="text-indigo-400 font-mono text-sm">@{mentor.username}</p>
                <p className="text-xs font-semibold text-slate-300 mt-2">{mentor.designation}</p>
                <p className="text-xs text-slate-400">{mentor.department}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{mentor.collegeName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{mentor.yearsOfExperience}+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 flex-shrink-0 fill-amber-400" />
                  <span>{mentor.ratingAverage} / 5.0 ({mentor.ratingCount} reviews)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:opacity-95 transition"
                >
                  Request as My Mentor
                </button>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-indigo-400" /> Book Guidance Session
                </button>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Weekly Availability
              </h3>
              <div className="space-y-2 text-xs">
                {mentor.availability.slots.map(slot => (
                  <div key={slot.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{slot.dayOfWeek}</span>
                    <span className="font-mono text-indigo-300">{slot.startTime} – {slot.endTime}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                Session duration: {mentor.availability.sessionDurationMinutes} mins. Max {mentor.availability.maxSessionsPerDay} sessions/day.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Sections (Bio, Areas, Philosophy, Education, Certifications) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About & Guidance Philosophy */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" /> Professional Background & Bio
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{mentor.professionalBio}</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Guidance Philosophy</h4>
                <p className="text-xs text-slate-300 italic">"{mentor.guidancePhilosophy}"</p>
              </div>
            </div>

            {/* Mentorship Focus Areas & Skills */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" /> Mentorship Specialties & Areas
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Primary Guidance Areas</span>
                  <div className="flex flex-wrap gap-2">
                    {mentor.mentorshipAreas.map((area, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Technical Skills & Expertise</span>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertiseSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Credentials */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" /> Education & Credentials
              </h3>
              
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <p className="font-bold text-white text-sm">{mentor.education}</p>
                <p className="text-slate-400">Verified by {mentor.collegeName} Administration</p>
              </div>

              {mentor.certifications.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Certifications & Honors</span>
                  <div className="space-y-1.5">
                    {mentor.certifications.map((cert, idx) => (
                      <div key={idx} className="px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300">
                        📜 {cert}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Request {mentor.fullName} as Mentor</h3>
            
            {requestSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Request Sent Successfully!</h4>
                <p className="text-xs text-slate-400">The mentor has received your application and will review it shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Guidance Focus</label>
                  <select
                    value={primaryArea}
                    onChange={e => setPrimaryArea(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    {mentor.mentorshipAreas.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Current Academic / Career Goal</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Become ML Engineer & Win Smart India Hackathon"
                    value={currentGoal}
                    onChange={e => setCurrentGoal(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">What Specific Help Do You Need?</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your current bottlenecks, upcoming hackathons, or topics you want guidance on..."
                    value={helpDescription}
                    onChange={e => setHelpDescription(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Book Mentorship Session</h3>
            
            {bookingSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Session Confirmed!</h4>
                <p className="text-xs text-slate-400">Added to your schedule with direct meeting link.</p>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Session Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architecture Review for SIH Project"
                    value={sessionTopic}
                    onChange={e => setSessionTopic(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={sessionDate}
                      onChange={e => setSessionDate(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Time Slot</label>
                    <input
                      type="time"
                      value={sessionTime}
                      onChange={e => setSessionTime(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
