import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, BookOpen, Target, CheckCircle2, TrendingUp, ArrowRight, 
  Layers, Clock, Star, Brain, ShieldCheck, Play, Award, ThumbsUp, Bookmark
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { COURSES_CATALOG, CourseItem } from '../../data/courseData';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { useToast } from '../../context/ToastContext';

export const AiCourseRecommendationsPage: React.FC = () => {
  const { xp, completedTaskIds } = useLearnPlay();
  const { showToast } = useToast();

  const [targetGoal, setTargetGoal] = useState<string>('Full Stack Developer');
  const [activeTab, setActiveTab] = useState<'RECOMMENDED' | 'ROADMAP' | 'SKILL_GAPS'>('RECOMMENDED');

  const skillGaps = [
    { skill: 'React Component Architecture', current: 65, target: 90, status: 'In Progress' },
    { skill: 'Relational Database & SQL', current: 20, target: 85, status: 'High Gap' },
    { skill: 'REST API & Authentication', current: 40, target: 80, status: 'Moderate Gap' },
    { skill: 'Data Structures & Algorithms', current: 50, target: 85, status: 'Practice Needed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="ACE AI 2.0 RECOMMENDATION ENGINE"
        title="Personalized Learning Paths &"
        highlight="Course Intelligence."
        subtitle="Courses and skill roadmaps algorithmically aligned with your career goals, verified challenge accuracy, and detected skill gaps."
        badge={
          <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-800 text-xs font-bold font-mono">
            AI Profile Active · Target: {targetGoal}
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Link to="/learn-play">
              <Button variant="primary" size="md" icon={<Play className="w-4 h-4" />}>
                Start Daily Practice
              </Button>
            </Link>
          </div>
        }
      />

      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-brand-600">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">CAREER OBJECTIVE</span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Targeting: {targetGoal}</h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['Full Stack Developer', 'AI/ML Engineer', 'Software Engineer (SDE)', 'Data Scientist'].map(goal => (
            <button
              key={goal}
              onClick={() => {
                setTargetGoal(goal);
                showToast(`Switched target to ${goal}. Recommendations updated!`, 'info');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                targetGoal === goal 
                  ? 'bg-brand-600 text-white shadow-xs' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('RECOMMENDED')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-colors ${
            activeTab === 'RECOMMENDED' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          ✨ Recommended Courses
        </button>
        <button
          onClick={() => setActiveTab('SKILL_GAPS')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-colors ${
            activeTab === 'SKILL_GAPS' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          📊 Skill Gap Analysis
        </button>
        <button
          onClick={() => setActiveTab('ROADMAP')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-colors ${
            activeTab === 'ROADMAP' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          🗺️ Step-by-Step Learning Roadmap
        </button>
      </div>

      {activeTab === 'RECOMMENDED' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES_CATALOG.map(course => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-brand-700 text-[10px] font-bold font-mono">
                    {course.category} · {course.level}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 font-mono flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {course.rating} ({course.enrolledCount} Students)
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{course.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{course.institution} · Instructor: {course.instructor}</p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{course.description}</p>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">WHY THIS COURSE FOR YOU?</span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {course.matchReasons?.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="text-xs text-slate-400 font-mono">
                  <span>⏱️ {course.durationWeeks} Weeks ({course.estimatedHours}h total)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link to="/learn-play">
                    <Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
                      Start Learning Path
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'SKILL_GAPS' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Target Career Benchmark: {targetGoal}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Comparing your verified coding test scores against industry requirements.
            </p>
          </div>

          <div className="space-y-4">
            {skillGaps.map(g => (
              <div key={g.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{g.skill}</span>
                  <span className="font-mono text-slate-500">
                    Current: <strong className="text-brand-600">{g.current}%</strong> / Target: {g.target}% ({g.status})
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-brand-600 h-full rounded-full" style={{ width: `${g.current}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ROADMAP' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Full Stack Developer Milestone Roadmap
            </h3>
            <p className="text-xs text-slate-500 mt-1">Sequential mastery path optimized for practical engineering readiness.</p>
          </div>

          <div className="space-y-4">
            {[
              { step: 1, title: 'HTML5 Semantic Layouts & CSS3 Responsive Grid', status: 'Completed', tag: 'Foundation' },
              { step: 2, title: 'Modern JavaScript (ES6+, Closures, Async/Await)', status: 'In Progress', tag: 'Core Language' },
              { step: 3, title: 'React.js Component Architecture & Hooks', status: 'Next Recommended', tag: 'Frontend' },
              { step: 4, title: 'Relational Database Schema Design & SQL Queries', status: 'Upcoming', tag: 'Data' },
              { step: 5, title: 'Node.js Express REST APIs & Authentication', status: 'Upcoming', tag: 'Backend' },
              { step: 6, title: 'Production Capstone Web Application', status: 'Final Milestone', tag: 'Portfolio' }
            ].map(s => (
              <div key={s.step} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold font-mono text-xs">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{s.title}</h4>
                    <span className="text-[11px] text-slate-400">{s.tag}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold font-mono text-[10px] ${
                  s.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                  s.status === 'In Progress' ? 'bg-purple-100 text-brand-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
