import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Target, Brain, ShieldCheck, CheckCircle2, AlertCircle, 
  ArrowRight, Play, Award, BookOpen, Layers, Terminal, Star, Clock, 
  Compass, HelpCircle, Check, RefreshCw, Zap, Trophy, Calendar
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { DOMAINS_TAXONOMY, getDomainById, getRoleById } from '../../data/taxonomyData';
import { courseIntelligence, StudentLearnerProfile } from '../../services/ai/courseIntelligenceEngine';
import { useToast } from '../../context/ToastContext';
import { useLearnPlay } from '../../context/LearnPlayContext';

export const PersonalizedLearningPathPage: React.FC = () => {
  const { showToast } = useToast();
  const { xp } = useLearnPlay();

  const [selectedDomainId, setSelectedDomainId] = useState<string>('ai-ml');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('ml-engineer');
  const [currentLevel, setCurrentLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [knownLanguages, setKnownLanguages] = useState<string[]>(['Python']);
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>(['Python']);
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
  
  const [activeTab, setActiveTab] = useState<'RECOMMENDATIONS' | 'SKILL_GAPS' | 'ROADMAP' | 'LANGUAGES' | 'PROJECTS'>('RECOMMENDATIONS');
  
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentScore, setAssessmentScore] = useState(0);

  const activeDomain = useMemo(() => getDomainById(selectedDomainId) || DOMAINS_TAXONOMY[0], [selectedDomainId]);
  const activeRole = useMemo(() => getRoleById(selectedRoleId) || activeDomain.roles[0], [selectedRoleId, activeDomain]);

  const learnerProfile: StudentLearnerProfile = useMemo(() => ({
    domainId: selectedDomainId,
    targetRoleId: selectedRoleId,
    currentLevel,
    verifiedSkills,
    knownLanguages,
    completedCourseIds,
    inProgressCourseIds: []
  }), [selectedDomainId, selectedRoleId, currentLevel, verifiedSkills, knownLanguages, completedCourseIds]);

  const { nextBestCourse, rankedCourses, skillGaps, roadmapSteps } = useMemo(() => {
    return courseIntelligence.getPersonalizedRecommendations(learnerProfile);
  }, [learnerProfile]);

  const handleDomainChange = (domainId: string) => {
    setSelectedDomainId(domainId);
    const domain = getDomainById(domainId);
    if (domain && domain.roles.length > 0) {
      setSelectedRoleId(domain.roles[0].id);
    }
    showToast(`Domain switched to ${domain?.name}. Recommendations refreshed!`, 'info');
  };

  const handleCompleteAssessment = () => {
    if (assessmentScore >= 2) {
      const newSkill = activeRole.coreSkills[0] || 'Python';
      setVerifiedSkills(prev => Array.from(new Set([...prev, newSkill, 'Statistics & Probability'])));
      showToast(`Assessment passed! Verified skills updated: ${newSkill}`, 'success');
    } else {
      showToast('Assessment completed. Recommended foundational course prioritized.', 'info');
    }
    setIsAssessmentOpen(false);
    setAssessmentStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 font-sans">
      
      <PageHeader
        eyebrow="ACE COURSE INTELLIGENCE 2.0"
        title="Personalized Learning Path &"
        highlight="Domain Intelligence."
        subtitle="Dynamic, prerequisite-aware course sequences aligned with your chosen career domain, target role, and verified technical skills."
        badge={
          <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-800 text-xs font-bold font-mono">
            Active: {activeDomain.name} · {activeRole.title}
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              icon={<Zap className="w-4 h-4 text-brand-600" />}
              onClick={() => setIsAssessmentOpen(true)}
            >
              Take Skill Assessment
            </Button>
            <Link to="/learn-play">
              <Button variant="primary" size="md" icon={<Play className="w-4 h-4" />}>
                Daily Coding Tasks
              </Button>
            </Link>
          </div>
        }
      />

      {/* Target Domain & Role Selection Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">STEP 1: SELECT CAREER DOMAIN</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-2.5">
            {DOMAINS_TAXONOMY.map(dom => (
              <button
                key={dom.id}
                onClick={() => handleDomainChange(dom.id)}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  selectedDomainId === dom.id
                    ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xs font-bold block truncate">{dom.name}</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1">{dom.roles.length} Roles</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">STEP 2: TARGET ROLE</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeDomain.roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRoleId(r.id);
                    showToast(`Target role set to ${r.title}`, 'info');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedRoleId === r.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {r.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">PROFICIENCY LEVEL</span>
              <div className="flex gap-1.5 mt-1">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setCurrentLevel(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition-colors ${
                      currentLevel === lvl
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Next Best Course Banner */}
      {nextBestCourse && (
        <div className="bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2.5 z-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold font-mono uppercase tracking-wider backdrop-blur-md">
                🔥 YOUR NEXT BEST ACTION
              </span>
              <span className="text-xs text-purple-200 font-mono">
                {nextBestCourse.matchScore}% Computed Match Score
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black">{nextBestCourse.course.title}</h2>
            <p className="text-xs text-purple-100 leading-relaxed">{nextBestCourse.course.description}</p>

            <div className="flex flex-wrap gap-3 pt-1 text-xs text-purple-200 font-mono">
              <span>⏱️ {nextBestCourse.course.durationWeeks} Weeks ({nextBestCourse.course.estimatedHours}h)</span>
              <span>👨‍🏫 {nextBestCourse.course.instructor}</span>
              <span>⭐ {nextBestCourse.course.rating}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 z-10">
            <Link to="/learn-play">
              <Button variant="secondary" size="lg" icon={<Play className="w-4 h-4" />}>
                Start Course Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'RECOMMENDATIONS', label: '✨ Ranked Courses' },
          { id: 'SKILL_GAPS', label: '📊 Skill Gap Matrix' },
          { id: 'ROADMAP', label: '🗺️ Sequential Roadmap' },
          { id: 'LANGUAGES', label: '💻 Languages & Tools' },
          { id: 'PROJECTS', label: '🛠️ Portfolio Projects' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Ranked Courses */}
      {activeTab === 'RECOMMENDATIONS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rankedCourses.map((rec) => (
              <div
                key={rec.course.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-brand-700 dark:text-brand-300 text-[10px] font-bold font-mono">
                      {rec.course.courseType} · {rec.course.level}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rec.course.rating} ({rec.course.enrolledCount} Enrolled)
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{rec.course.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{rec.course.institution} · Instructor: {rec.course.instructor}</p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{rec.course.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rec.course.skillsCovered.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WHY THIS COURSE FOR YOU?</span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {rec.matchScore}% Match ({rec.confidence} Confidence)
                      </span>
                    </div>

                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {rec.whyRecommended.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>

                    {rec.whyNotRecommended && (
                      <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-[11px] flex items-start gap-2 mt-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{rec.whyNotRecommended}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-400 font-mono">
                    <span>⏱️ {rec.course.durationWeeks} Weeks ({rec.course.estimatedHours}h total)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to="/learn-play">
                      <Button
                        variant={rec.isPrerequisiteSatisfied ? 'primary' : 'outline'}
                        size="sm"
                        icon={<Play className="w-3.5 h-3.5" />}
                      >
                        {rec.isPrerequisiteSatisfied ? 'Enroll Course' : 'View Syllabus'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Skill Gap Analysis */}
      {activeTab === 'SKILL_GAPS' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Skill Gap Benchmark: {activeRole.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Comparing your verified test scores and challenge performance against industry requirements.
            </p>
          </div>

          <div className="space-y-4">
            {skillGaps.map(g => (
              <div key={g.skillName} className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{g.skillName}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-500">Mastery: <strong className="text-brand-600">{g.currentMastery}%</strong> / {g.targetBenchmark}%</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      g.status === 'Mastered' ? 'bg-emerald-100 text-emerald-800' :
                      g.status === 'In Progress' ? 'bg-purple-100 text-brand-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {g.status}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden flex">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      g.status === 'Mastered' ? 'bg-emerald-500' :
                      g.status === 'In Progress' ? 'bg-brand-600' : 'bg-rose-500'
                    }`} 
                    style={{ width: `${g.currentMastery}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Roadmap */}
      {activeTab === 'ROADMAP' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {activeRole.title} Milestone Roadmap
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Prerequisite-ordered sequential mastery path optimized for placement readiness.
            </p>
          </div>

          <div className="space-y-3">
            {roadmapSteps.map(s => (
              <div key={s.stepNumber} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between text-xs border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold font-mono text-xs shadow-xs">
                    {s.stepNumber}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{s.title}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">{s.tag}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full font-bold font-mono text-[10px] ${
                  s.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                  s.status === 'In Progress' ? 'bg-purple-100 text-brand-800' :
                  s.status === 'Next Recommended' ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-400' : 'bg-slate-200 text-slate-700'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Languages & Tools */}
      {activeTab === 'LANGUAGES' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Languages & Technologies for {activeRole.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Standard technology stacks required by industry employers for this role.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-800 space-y-2">
              <span className="text-xs font-bold text-brand-700 dark:text-brand-300 font-mono uppercase">Primary Required Languages</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeRole.requiredLanguages.length > 0 ? activeRole.requiredLanguages.map(l => (
                  <span key={l} className="px-3 py-1 rounded-xl bg-brand-600 text-white font-bold text-xs font-mono shadow-2xs">
                    {l}
                  </span>
                )) : <span className="text-xs text-slate-400">No strict language dependency (Design / Visual Role)</span>}
              </div>
            </div>

            {activeRole.alternativeLanguages && activeRole.alternativeLanguages.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-mono uppercase">Alternative Ecosystem Languages</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeRole.alternativeLanguages.map(l => (
                    <span key={l} className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs font-mono">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Portfolio Projects */}
      {activeTab === 'PROJECTS' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Placement Portfolio Projects for {activeRole.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Real-world capstone projects designed to prove technical depth to campus recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeRole.projectIdeas.map((proj, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-lg bg-brand-600 text-white font-bold font-mono text-[11px] flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-2 leading-snug">{proj}</h4>
                </div>
                <Link to="/learn-play">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Start Project Specs
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnostic Assessment Modal */}
      {isAssessmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Diagnostic Skill Assessment</h3>
                <p className="text-xs text-slate-400">Verifying skills for {activeRole.title}</p>
              </div>
              <button onClick={() => setIsAssessmentOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-600 font-mono">Question {assessmentStep + 1} of 2</span>
              
              {assessmentStep === 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Which data structure provides O(1) average time complexity for key-value lookups?
                  </p>
                  {['Array / List', 'Hash Table / Dictionary', 'Binary Search Tree', 'Linked List'].map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => {
                        if (i === 1) setAssessmentScore(prev => prev + 1);
                        setAssessmentStep(1);
                      }}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-xs font-medium hover:border-brand-500 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {assessmentStep === 1 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    In SQL, which clause is used to filter aggregated group results?
                  </p>
                  {['WHERE', 'HAVING', 'ORDER BY', 'GROUP BY'].map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => {
                        if (i === 1) setAssessmentScore(prev => prev + 1);
                        handleCompleteAssessment();
                      }}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-xs font-medium hover:border-brand-500 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
