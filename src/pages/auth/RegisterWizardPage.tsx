import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Lock, Phone, GraduationCap, Building2, 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Gift, 
  Check, ShieldCheck, UserPlus, Eye, EyeOff, Search
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { AccountRole } from '../../types/account';
import { VERIFIED_COLLEGES, accountDb } from '../../services/db/accountDatabase';
import { InstitutionSelectorModal } from '../../components/institution/InstitutionSelectorModal';
import { Institution } from '../../types/institution';
import confetti from 'canvas-confetti';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80'
];

const DOMAIN_OPTIONS = [
  'Web Development', 'AI / ML', 'Cybersecurity', 'Cloud Computing', 
  'Mobile Apps', 'Data Science', 'UI/UX Design', 'DevOps', 'Robotics'
];

export const RegisterWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<AccountRole>('STUDENT');
  
  // Step 2: Credentials
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<{ available?: boolean; message?: string }>({});

  // Step 3: Role details
  const [collegeQuery, setCollegeQuery] = useState('Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology');
  const [isInstModalOpen, setIsInstModalOpen] = useState(false);
  const [degree, setDegree] = useState('B.Tech');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('1st Year');
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('STUDENT_CLUB');
  const [orgDesc, setOrgDesc] = useState('');

  // Step 4: Career & Skills
  const [careerGoal, setCareerGoal] = useState('Full Stack Engineer');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['Web Development', 'AI / ML']);
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['JavaScript', 'Python']);

  // Step 5: Avatar
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0]);

  // Step 6: Verification Simulation
  const [emailOtp, setEmailOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleUsernameCheck = (val: string) => {
    setUsername(val);
    if (!val.trim()) {
      setUsernameStatus({});
      return;
    }
    const check = accountDb.checkUsernameAvailability(val);
    setUsernameStatus({ available: check.available, message: check.reason });
  };

  const handleToggleDomain = (d: string) => {
    if (selectedDomains.includes(d)) {
      setSelectedDomains(selectedDomains.filter(x => x !== d));
    } else {
      setSelectedDomains([...selectedDomains, d]);
    }
  };

  const handleCompleteRegistration = async () => {
    setIsVerifying(true);
    try {
      const res = await register({
        role,
        username,
        email,
        phoneNumber: phone,
        password,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`.trim(),
        avatarUrl: selectedAvatar,
        college: collegeQuery,
        degree,
        department,
        year,
        careerGoal,
        interestedDomains: selectedDomains,
        preferredLanguages: selectedLangs,
        organizationName: orgName,
        organizationType: orgType as any,
        orgDescription: orgDesc
      });

      if (res.success && res.user) {
        setStep(7); // Complete step
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        showToast(`Welcome to ACE, ${res.user.displayName}! 🪙 500 Bonus Coins deposited.`, 'success');
      } else {
        showToast(res.error || 'Registration failed', 'error');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6 pb-24 font-sans">
      
      {/* Step Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Step {step} of 7: {
            step === 1 ? 'Select Account Role' :
            step === 2 ? 'Account Credentials' :
            step === 3 ? 'Academic & Institution Details' :
            step === 4 ? 'Career Goals & Domains' :
            step === 5 ? 'Choose Avatar' :
            step === 6 ? 'Security Verification' : 'Welcome to ACE!'
          }</span>
          <span className="font-mono text-brand-600">{Math.round((step / 7) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Multi-Step Box */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        
        {/* STEP 1: ROLE SELECTION */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Choose Your ACE Role</h2>
              <p className="text-xs text-slate-500 mt-1">Select the account type that best describes your objective.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'STUDENT', title: '🎓 Student / Learner', desc: 'Discover events, compete in hackathons, play coding games, and earn verified rewards.' },
                { id: 'COLLEGE_AMBASSADOR', title: '🤝 Campus Ambassador', desc: 'Represent your college, drive student campaigns, promote symposiums, and earn referral bonuses.' },
                { id: 'ORGANIZER', title: '🏛️ Event Organizer', desc: 'Host college symposiums, manage registrations, issue certificates, and review submissions.' },
                { id: 'MENTOR', title: '💡 Mentor / Educator', desc: 'Guide students, conduct coding sessions, evaluate capstone projects, and share expertise.' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as AccountRole)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                    role === r.id 
                      ? 'border-brand-600 bg-brand-50/60 dark:bg-purple-950/40 ring-2 ring-brand-500/30' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{r.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{r.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="primary" size="md" onClick={() => setStep(2)} icon={<ArrowRight className="w-4 h-4" />}>
                Continue to Credentials
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: CREDENTIALS */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Basic Credentials</h2>
              <p className="text-xs text-slate-500 mt-1">Set up your unique username, display name, and password.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Dileep"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Unique Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => handleUsernameCheck(e.target.value)}
                    placeholder="e.g. dileepkumar"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                    required
                  />
                  {username && (
                    <span className={`text-[10px] font-bold mt-1 block ${usernameStatus.available ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {usernameStatus.available ? '✓ Username is available' : `✗ ${usernameStatus.message || 'Username taken'}`}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Confirm Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="md" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                onClick={() => setStep(3)} 
                disabled={!firstName || !username || !email || !password || password !== confirmPassword}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Next: Role Details
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: ROLE DETAILS */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {role === 'ORGANIZER' ? 'Organization Information' : 'Academic & College Information'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Connect your verified institution or organization.</p>
            </div>

            {role === 'ORGANIZER' ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Organization / Event Name</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Shaastra IIT Madras Tech Club"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Organization Type</label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="COLLEGE">College / University</option>
                    <option value="STUDENT_CLUB">Student Club / Society</option>
                    <option value="STARTUP">Startup / Tech Company</option>
                    <option value="NGO">NGO / Non-Profit</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    College / University (Pan-India Directory)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={collegeQuery}
                      readOnly
                      onClick={() => setIsInstModalOpen(true)}
                      placeholder="Click to browse verified colleges across India..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setIsInstModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-brand-600 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800 text-xs hover:bg-purple-100 transition whitespace-nowrap"
                    >
                      Browse All
                    </button>
                  </div>

                  <InstitutionSelectorModal
                    isOpen={isInstModalOpen}
                    onClose={() => setIsInstModalOpen(false)}
                    selectedName={collegeQuery}
                    onSelect={(inst: Institution) => {
                      setCollegeQuery(inst.name);
                      setIsInstModalOpen(false);
                    }}
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Degree</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech / B.E / B.Sc"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Computer Science & Engineering"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Year of Study</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="md" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={() => setStep(4)} icon={<ArrowRight className="w-4 h-4" />}>
                Next: Career Goals
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: CAREER & DOMAINS */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Career Goal & Interested Domains</h2>
              <p className="text-xs text-slate-500 mt-1">Helps ACE AI recommend personalized courses, hackathons, and mentors.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Target Role</label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g. Full Stack Developer, ML Engineer, SOC Analyst..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Interested Domains</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {DOMAIN_OPTIONS.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleToggleDomain(d)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedDomains.includes(d)
                          ? 'border-brand-600 bg-purple-50 dark:bg-purple-950 text-brand-700 font-bold ring-1 ring-brand-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {selectedDomains.includes(d) ? '✓ ' : '+ '}{d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="md" onClick={() => setStep(3)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={() => setStep(5)} icon={<ArrowRight className="w-4 h-4" />}>
                Next: Avatar Selection
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: AVATAR SELECTION */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Choose Profile Avatar</h2>
              <p className="text-xs text-slate-500 mt-1">Pick a starter avatar. You can upload custom photos anytime in settings.</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
              {AVATAR_PRESETS.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedAvatar(img)}
                  className={`rounded-2xl overflow-hidden ring-2 transition-all ${
                    selectedAvatar === img ? 'ring-brand-600 scale-105 shadow-md' : 'ring-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="preset" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="md" onClick={() => setStep(4)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={() => setStep(6)} icon={<ArrowRight className="w-4 h-4" />}>
                Next: Security Verification
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: VERIFICATION SIMULATION */}
        {step === 6 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Account Verification</h2>
              <p className="text-xs text-slate-500 mt-1">Confirm your email address and claim your welcome rewards.</p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center gap-3 text-xs text-amber-900 dark:text-amber-200 font-medium">
              <Gift className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Completing registration deposits <strong>🪙 500 Welcome ACE Coins</strong> into your account!</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Verification Code</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP (e.g. 123456)"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <Button variant="outline" size="sm" type="button" onClick={() => setEmailOtp('123456')}>
                    Auto-Fill Demo OTP
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="md" onClick={() => setStep(5)} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                onClick={handleCompleteRegistration} 
                disabled={isVerifying}
                icon={<UserPlus className="w-4 h-4" />}
              >
                {isVerifying ? 'Creating Account...' : 'Complete & Launch Dashboard'}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 7: REGISTRATION COMPLETE */}
        {step === 7 && (
          <div className="text-center space-y-5 py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Registration Complete! 🎉</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your account <strong>@{username}</strong> has been created and verified.
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 max-w-xs mx-auto text-xs font-mono font-bold text-brand-700 dark:text-brand-300">
              🪙 +500 Welcome Coins Awarded!
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <Button variant="primary" size="lg" onClick={() => navigate('/student')} icon={<ArrowRight className="w-4 h-4" />}>
                Go to Student Dashboard
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/settings/profile')}>
                Customize Profile
              </Button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
