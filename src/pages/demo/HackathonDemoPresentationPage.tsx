import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Layers, 
  Play, 
  ShieldCheck, 
  Users, 
  Building2, 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  X,
  Star,
  Zap,
  Globe,
  Award,
  BookOpen,
  Code2,
  Briefcase,
  Layers as LayersIcon
} from 'lucide-react';
import { demoModeDatabase, DemoTourStep, DemoWorkspaceItem } from '../../services/db/demoModeDatabase';

export const HackathonDemoPresentationPage: React.FC = () => {
  const navigate = useNavigate();
  const workspaces = demoModeDatabase.getAllDemoWorkspaces();
  const tourSteps = demoModeDatabase.getTourSteps();

  const [tourOpen, setTourOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep: DemoTourStep = tourSteps[currentStepIndex] || tourSteps[0];

  const handleStartDemo = () => {
    demoModeDatabase.setDemoMode(true);
    navigate('/student/dashboard');
  };

  const handleExplorePlatform = () => {
    navigate('/events');
  };

  const handleViewWorkspaces = () => {
    navigate('/workspaces');
  };

  const handleStartTour = () => {
    setCurrentStepIndex(0);
    setTourOpen(true);
  };

  const handleNextStep = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setTourOpen(false);
      navigate(currentStep.route);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Presentation Header */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HACKATHON DEMO SHOWCASE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            ACE — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">AI-Powered Student Opportunity Ecosystem</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-bold leading-relaxed">
            Discover. Learn. Connect. Build. Grow.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A unified digital operating system connecting Students, Colleges, Mentors, Ambassadors, Organizers, Recruiters, and Judges in ONE connected platform.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleStartDemo}
              className="px-6 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-purple-600/25 transition transform hover:scale-105 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>START DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleStartTour}
              className="px-6 py-3.5 bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-700/60 font-bold text-sm rounded-2xl transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>START 15-STEP TOUR</span>
            </button>

            <button
              onClick={handleExplorePlatform}
              className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold text-sm rounded-2xl transition"
            >
              EXPLORE PLATFORM
            </button>

            <button
              onClick={handleViewWorkspaces}
              className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold text-sm rounded-2xl transition"
            >
              VIEW WORKSPACES
            </button>
          </div>
        </div>

        {/* Institution Context Anchor Card */}
        <div className="bg-slate-900/70 border border-purple-500/30 rounded-3xl p-6 text-center max-w-2xl mx-auto backdrop-blur-md shadow-xl">
          <div className="text-xs text-purple-400 font-bold uppercase tracking-wider font-mono">Institutional Anchor & Source of Truth</div>
          <div className="text-lg font-black text-white mt-1">Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology</div>
          <div className="text-xs text-slate-400 mt-1">Department of Computer Science & Engineering • Chennai, Tamil Nadu</div>
        </div>

        {/* All 13 Unlocked Workspaces Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-purple-400" />
                <span>All 13 Operational Workspaces (Fully Unlocked)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Explore every stakeholder persona without multiple logins or session disruption</p>
            </div>

            <Link
              to="/workspaces"
              className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <span>View Workspace Hub</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/60 rounded-3xl p-5 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-purple-900/10"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
                        {ws.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-950 text-purple-300 rounded-md border border-purple-800/40 font-mono">
                          {ws.title}
                        </span>
                        <h3 className="text-base font-black text-white mt-1 group-hover:text-purple-300 transition-colors">
                          {ws.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {ws.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {ws.keyFeatures.slice(0, 3).map((f, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md font-medium">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-bold">
                    {ws.metrics[0].label}: <strong className="text-white">{ws.metrics[0].value}</strong>
                  </div>

                  <Link
                    to={ws.route}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 15-Step Interactive Guided Tour Modal */}
      {tourOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-black">
                  Step {currentStep.step} of {tourSteps.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">Guided Architecture Walkthrough</span>
              </div>
              <button
                onClick={() => setTourOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
                title="Exit Tour"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl p-2 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  {currentStep.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{currentStep.title}</h3>
                  <div className="text-xs text-purple-300 font-bold">{currentStep.roleName} Operational Context</div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {currentStep.description}
              </p>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2 mt-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Demonstration Capabilities:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.keyHighlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-purple-200 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tour Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                  currentStepIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTourOpen(false)}
                  className="px-3.5 py-2 text-slate-400 hover:text-slate-200 text-xs font-bold transition"
                >
                  EXIT
                </button>

                <Link
                  to={currentStep.route}
                  onClick={() => setTourOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl text-xs font-bold transition"
                >
                  Open {currentStep.roleName} →
                </Link>

                <button
                  onClick={handleNextStep}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md"
                >
                  <span>{currentStepIndex === tourSteps.length - 1 ? 'FINISH' : 'NEXT'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
