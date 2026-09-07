import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { GraduationCap, ShieldCheck, CheckCircle2, ArrowRight, Upload, Sparkles } from 'lucide-react';
import { MentorSpecialty, MentorshipArea } from '../../types/mentor';

export const BecomeMentorPage: React.FC = () => {
  const { submitApplication } = useMentor();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [designation, setDesignation] = useState('Assistant Professor / Senior Engineer');
  const [experience, setExperience] = useState(8);
  const [education, setEducation] = useState('M.Tech / Ph.D.');
  const [skills, setSkills] = useState('Python, Cloud, System Design, React');
  const [bio, setBio] = useState('');
  const [philosophy, setPhilosophy] = useState('');
  const [motivation, setMotivation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitApplication({
      fullName,
      email,
      phoneNumber: phone,
      collegeName,
      collegeId: 'inst-vel-tech-rangarajan-avadi',
      department,
      designation,
      yearsOfExperience: Number(experience),
      education,
      specialties: ['ACADEMIC_CSE', 'PROJECTS_TECHNICAL'],
      mentorshipAreas: ['Academic Guidance', 'Technical Guidance', 'Project Guidance'],
      expertiseSkills: skills.split(',').map(s => s.trim()).filter(Boolean),
      bio,
      guidancePhilosophy: philosophy,
      preferredStudentGroups: ['Pre-Final Year', 'Final Year B.Tech'],
      motivationStatement: motivation
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Apply to Become a Verified Campus Mentor</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Join the elite team of verified domain leads guiding students through academics, hackathons, and placement excellence.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mentor Application Submitted!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your application has been logged into the College Admin review queue. You will receive an official notification once verified.
            </p>
            <div className="pt-4">
              <Link to="/mentors" className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-md">
                Return to Mentors Directory
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm dark:shadow-2xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. / Prof. / Er. Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Official Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="faculty@veltech.edu.in"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Institution / University</label>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={e => setCollegeName(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Current Designation</label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Years of Experience</label>
                <input
                  type="number"
                  required
                  value={experience}
                  onChange={e => setExperience(Number(e.target.value))}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Key Technical & Guidance Skills (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline your background in industry, research, and hackathon judging..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Guidance Philosophy</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Your approach to student problem solving and career growth..."
                  value={philosophy}
                  onChange={e => setPhilosophy(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:opacity-95 transition"
            >
              Submit Application for Verification
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
