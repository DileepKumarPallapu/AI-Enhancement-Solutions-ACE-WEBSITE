import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentOSDatabase, StudentOSState } from '../../services/db/studentOSDatabase';
import { nextBestActionEngine, NextBestActionItem } from '../../services/db/nextBestActionEngine';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton, ACEEmptyState } from '../../components/ui/ace';
import { Sparkles, CheckCircle2, ArrowRight, Zap, Target, BookOpen, Trophy, Briefcase, Users, Award, Shield, Wallet, BarChart3, Clock, AlertCircle } from 'lucide-react';

export function StudentOSPage() {
  const [osState, setOsState] = useState<StudentOSState | null>(null);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ACTIONS' | 'READINESS' | 'SAVED'>('OVERVIEW');

  useEffect(() => {
    setOsState(studentOSDatabase.getOSState());
  }, []);

  const handleDismissAction = (id: string) => {
    nextBestActionEngine.dismissAction(id);
    setOsState(studentOSDatabase.getOSState());
  };

  const handleCompleteAction = (id: string) => {
    nextBestActionEngine.completeAction(id);
    setOsState(studentOSDatabase.getOSState());
  };

  if (!osState) return null;

  const { student, priorities, nextBestActions, careerReadiness, savedOpportunities, stats } = osState;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <ACEPageHeader
          title={`Welcome to ACE Student OS, ${student.profile.firstName}`}
          description="Your centralized operational dashboard connecting learning, projects, mentor check-ins, and career milestones."
          badge="STUDENT OS v60X"
          actions={
            <div className="flex gap-3">
              <Link to="/career/profile">
                <ACEButton variant="outline" size="sm">Career Profile</ACEButton>
              </Link>
              <Link to="/student/id">
                <ACEButton variant="primary" size="sm">Digital ID</ACEButton>
              </Link>
            </div>
          }
        />

        {/* Operational Status Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Skills</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.verifiedSkillsCount}</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cryptographic
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Apps</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.activeApplicationsCount}</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-medium">2 Under Review</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadlines</div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats.upcomingDeadlinesCount}</div>
            <div className="text-xs text-slate-500 mt-1">Within 14 days</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Milestones</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.completedMilestonesCount}</div>
            <div className="text-xs text-slate-500 mt-1">Verified records</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm col-span-2 sm:col-span-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ACE Balance</div>
            <div className="text-2xl font-bold text-amber-500 mt-1">{stats.aceCoinsBalance}</div>
            <div className="text-xs text-slate-500 mt-1">₹{stats.aceCoinsBalance / 100} INR value</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`pb-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'OVERVIEW'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Operational Overview
          </button>
          <button
            onClick={() => setActiveTab('ACTIONS')}
            className={`pb-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'ACTIONS'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Next Best Actions
            <span className="px-1.5 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full font-bold">
              {nextBestActions.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('READINESS')}
            className={`pb-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'READINESS'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Career Readiness Evidence
          </button>
          <button
            onClick={() => setActiveTab('SAVED')}
            className={`pb-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'SAVED'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Saved Opportunities ({savedOpportunities.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col (2 cols): Next Best Action Spotlight & Today's Priorities */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Spotlight Card */}
              {nextBestActions.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Spotlight Recommendation
                  </div>
                  <h3 className="text-xl font-bold">{nextBestActions[0].title}</h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-xl">{nextBestActions[0].reason}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link to={nextBestActions[0].ctaLink}>
                      <ACEButton variant="primary" size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                        {nextBestActions[0].ctaText} <ArrowRight className="w-4 h-4 ml-1.5" />
                      </ACEButton>
                    </Link>
                    <button
                      onClick={() => handleDismissAction(nextBestActions[0].id)}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Dismiss for now
                    </button>
                  </div>
                </div>
              )}

              {/* Priorities List */}
              <ACECard title="Today's Active Priorities" badge={`${priorities.length} Items`}>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {priorities.map((p, idx) => (
                    <div key={idx} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{p.title}</span>
                          <ACEBadge variant={p.urgency === 'HIGH' ? 'danger' : 'neutral'}>{p.badge}</ACEBadge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.subtitle}</p>
                      </div>
                      <Link to={p.link}>
                        <ACEButton variant="outline" size="sm">Open</ACEButton>
                      </Link>
                    </div>
                  ))}
                </div>
              </ACECard>

              {/* Quick Ecosystem Launcher */}
              <ACECard title="Ecosystem Launchpad">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Link to="/career/roles" className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-center transition-colors">
                    <Briefcase className="w-5 h-5 mx-auto text-indigo-600 dark:text-indigo-400 mb-1" />
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">Role Intel</div>
                  </Link>
                  <Link to="/network" className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-center transition-colors">
                    <Users className="w-5 h-5 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">Peer Network</div>
                  </Link>
                  <Link to="/career/interview-ai" className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-center transition-colors">
                    <Zap className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">AI Simulator</div>
                  </Link>
                  <Link to="/knowledge" className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-center transition-colors">
                    <BookOpen className="w-5 h-5 mx-auto text-cyan-600 dark:text-cyan-400 mb-1" />
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">Knowledge Hub</div>
                  </Link>
                </div>
              </ACECard>

            </div>

            {/* Right Col: Student Institutional Profile & Verification Status */}
            <div className="space-y-6">
              
              <ACECard title="Canonical Student Identity">
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Student Name</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{student.profile.firstName} {student.profile.lastName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Institution</div>
                    <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{student.institution.name}</div>
                    <div className="text-xs text-slate-500">{student.institution.city}, {student.institution.state}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Department & Year</div>
                    <div className="text-slate-800 dark:text-slate-200 mt-0.5">{student.profile.department} • Year {student.profile.year}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Shield className="w-4 h-4" /> Identity Verified
                    </span>
                    <Link to="/student/id" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                      View QR ID
                    </Link>
                  </div>
                </div>
              </ACECard>

              <ACECard title="College Curated Boards">
                <p className="text-xs text-slate-500 mb-3">
                  Opportunities, fellowships, and hackathons curated directly by Vel Tech faculty.
                </p>
                <Link to="/college/opportunities">
                  <ACEButton variant="outline" size="sm" className="w-full justify-center">
                    Browse College Board
                  </ACEButton>
                </Link>
              </ACECard>

            </div>

          </div>
        )}

        {/* Tab 2: Next Best Actions List */}
        {activeTab === 'ACTIONS' && (
          <div className="space-y-4">
            {nextBestActions.map((action) => (
              <div
                key={action.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <ACEBadge variant={action.priority === 'CRITICAL' ? 'danger' : action.priority === 'HIGH' ? 'warning' : 'primary'}>
                      {action.priority}
                    </ACEBadge>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{action.category}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{action.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{action.reason}</p>
                </div>
                <div className="flex items-center gap-2 self-end md:self-center">
                  <Link to={action.ctaLink}>
                    <ACEButton variant="primary" size="sm">
                      {action.ctaText}
                    </ACEButton>
                  </Link>
                  <ACEButton variant="outline" size="sm" onClick={() => handleCompleteAction(action.id)}>
                    Mark Done
                  </ACEButton>
                  <button
                    onClick={() => handleDismissAction(action.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Career Readiness Evidence */}
        {activeTab === 'READINESS' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 rounded-xl p-4 text-xs text-indigo-800 dark:text-indigo-300">
              <strong>Evidence-Based Verification:</strong> ACE evaluates your career readiness based on authentic project links, verified certifications, real interview simulations, and verified skills—not arbitrary percentages.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerReadiness.map((pillar, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{pillar.title}</h4>
                    <ACEBadge variant={pillar.status === 'COMPLETE' ? 'success' : pillar.status === 'NEEDS_IMPROVEMENT' ? 'warning' : 'neutral'}>
                      {pillar.status.replace('_', ' ')}
                    </ACEBadge>
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                    {pillar.evidenceDetails.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                  {pillar.actionRequired && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-amber-600 dark:text-amber-400 font-medium">{pillar.actionRequired}</span>
                      {pillar.actionLink && (
                        <Link to={pillar.actionLink} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                          Fix Now
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Saved Opportunities */}
        {activeTab === 'SAVED' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Saved Opportunities & Folders</h3>
              <Link to="/student/saved">
                <ACEButton variant="outline" size="sm">Open Full Saved Hub</ACEButton>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedOpportunities.map((opp) => (
                <div key={opp.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <ACEBadge variant="primary">{opp.category}</ACEBadge>
                    <span className="text-xs text-slate-500">{opp.folder}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">{opp.title}</h4>
                  <div className="text-xs text-slate-500">{opp.provider} • {opp.location}</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">{opp.stipendOrPrize}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
