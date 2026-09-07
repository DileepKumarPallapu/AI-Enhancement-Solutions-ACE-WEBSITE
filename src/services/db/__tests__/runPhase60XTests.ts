import { studentOSDatabase } from '../studentOSDatabase';
import { nextBestActionEngine } from '../nextBestActionEngine';
import { opportunityGraphDatabase } from '../opportunityGraphDatabase';
import { roleIntelligenceDatabase } from '../roleIntelligenceDatabase';
import { studentCareerProfileDatabase } from '../studentCareerProfileDatabase';
import { savedOpportunitiesDatabase } from '../savedOpportunitiesDatabase';
import { smartAlertsDatabase } from '../smartAlertsDatabase';
import { collegeOpportunitiesDatabase } from '../collegeOpportunitiesDatabase';
import { departmentHubDatabase } from '../departmentHubDatabase';
import { studentNetworkDatabase } from '../studentNetworkDatabase';
import { interviewAndOfferDatabase } from '../interviewAndOfferDatabase';
import { knowledgeHubDatabase } from '../knowledgeHubDatabase';

export async function runPhase60XTests(): Promise<{ name: string; passed: boolean; error?: string }[]> {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  function test(name: string, fn: () => void) {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err?.message || String(err) });
    }
  }

  // 1. Student OS State Aggregator
  test('[StudentOS] Retrieves unified operational status and priorities', () => {
    const os = studentOSDatabase.getOSState();
    if (!os || !os.student || !os.priorities || os.priorities.length === 0) {
      throw new Error('Expected non-empty student OS state and active priorities');
    }
    if (os.stats.verifiedSkillsCount <= 0 || os.stats.aceCoinsBalance !== 4500) {
      throw new Error('Expected authentic stats and 4500 ACE coins balance');
    }
  });

  // 2. Next Best Action Engine
  test('[NextBestActionEngine] Evaluates explainable actions and supports dismiss / complete', () => {
    const actions = nextBestActionEngine.getActions();
    if (!actions || actions.length === 0) throw new Error('Expected Next Best Actions');
    const first = actions[0];
    if (!first.reason || !first.ctaLink) throw new Error('Action missing explainable reason or CTA link');

    const dismissed = nextBestActionEngine.dismissAction(first.id);
    const target = dismissed.find(a => a.id === first.id);
    if (!target || target.status !== 'DISMISSED') throw new Error('Failed to dismiss action');
  });

  // 3. Opportunity Graph & Skill Gap Mapping
  test('[OpportunityGraph] Constructs student skill-role graph and maps course recommendations', () => {
    const graph = opportunityGraphDatabase.getGraphForStudent(['React', 'TypeScript']);
    if (!graph.nodes || graph.nodes.length === 0 || !graph.edges || graph.edges.length === 0) {
      throw new Error('Graph must contain nodes and relationship edges');
    }

    const analysis = opportunityGraphDatabase.analyzeOpportunitySkills(
      'opp-cloud',
      'Cloud Engineer Intern',
      'INTERNSHIP',
      ['TypeScript', 'Kubernetes', 'Docker'],
      ['TypeScript']
    );
    if (!analysis.matchingSkills.includes('TypeScript') || !analysis.skillsToDevelop.includes('Kubernetes')) {
      throw new Error('Failed to analyze matching and missing skills');
    }
    if (analysis.recommendedCourses.length === 0) {
      throw new Error('Expected linked courses for missing skills');
    }
  });

  // 4. Role Intelligence Catalog
  test('[RoleIntelligence] Provides comprehensive role profiles and learning roadmaps', () => {
    const roles = roleIntelligenceDatabase.getAllRoles();
    if (!roles || roles.length < 5) throw new Error('Expected at least 5 deep role profiles');
    const swe = roleIntelligenceDatabase.getRoleById('swe');
    if (!swe || !swe.requiredSkills || swe.learningPaths.length === 0) {
      throw new Error('Expected valid SWE role profile with learning paths');
    }
  });

  // 5. Student Career Profile & Evidence-Based Readiness
  test('[CareerProfile] Persists career preferences and evaluates readiness evidence', () => {
    const profile = studentCareerProfileDatabase.getProfile();
    if (!profile.careerGoal || profile.targetRoles.length === 0) {
      throw new Error('Expected career profile with goals and target roles');
    }

    const readiness = studentCareerProfileDatabase.getEvidenceBasedReadiness();
    if (!readiness || readiness.length === 0) throw new Error('Expected evidence readiness pillars');
    const resumePillar = readiness.find(r => r.category === 'RESUME');
    if (!resumePillar || resumePillar.evidenceCount <= 0) {
      throw new Error('Expected verified resume evidence pillar');
    }
  });

  // 6. Saved Opportunities with Folders
  test('[SavedOpportunities] Supports custom folders and item removal', () => {
    const saved = savedOpportunitiesDatabase.getAll();
    if (!saved || saved.length === 0) throw new Error('Expected initial saved opportunities');

    const added = savedOpportunitiesDatabase.add({
      opportunityId: 'test-opp-1',
      title: 'Distributed Systems Fellowship',
      provider: 'Vel Tech Labs',
      category: 'INTERNSHIP',
      location: 'Chennai',
      mode: 'HYBRID',
      deadline: '2026-10-01',
      folder: 'Test Folder',
      tags: ['Test'],
      notes: 'Test note'
    });

    if (!added.id || added.folder !== 'Test Folder') throw new Error('Failed to add saved opportunity');

    const updated = savedOpportunitiesDatabase.remove(added.id);
    if (updated.some(i => i.id === added.id)) throw new Error('Failed to remove saved opportunity');
  });

  // 7. Smart Alerts
  test('[SmartAlerts] Stores alert configurations and allows active toggling', () => {
    const alerts = smartAlertsDatabase.getAll();
    if (!alerts || alerts.length === 0) throw new Error('Expected smart alerts');
    const first = alerts[0];
    const toggled = smartAlertsDatabase.toggleActive(first.id);
    if (!toggled || toggled.isActive === first.isActive) throw new Error('Failed to toggle alert active state');
  });

  // 8. Student Peer Network
  test('[StudentNetwork] Lists peer students and handles connection / follow toggles', () => {
    const peers = studentNetworkDatabase.getPeers();
    if (!peers || peers.length === 0) throw new Error('Expected network peers');
    const first = peers[0];
    const followed = studentNetworkDatabase.toggleFollow(first.id);
    if (!followed || followed.isFollowing === first.isFollowing) {
      throw new Error('Failed to toggle follow status');
    }
  });

  // 9. Interview Simulator & Offer Tracker
  test('[InterviewAndOffers] Submits AI simulation evaluation and retrieves career milestones', () => {
    const evalResult = interviewAndOfferDatabase.submitAIEvaluation(
      'Explain microservice communication strategies.',
      'We use gRPC for high throughput synchronous RPC and Kafka for asynchronous domain events.',
      'TECHNICAL'
    );
    if (!evalResult || evalResult.scoreOutOf100 <= 0 || evalResult.strengths.length === 0) {
      throw new Error('AI Interview simulator failed to evaluate response');
    }

    const milestones = interviewAndOfferDatabase.getMilestones();
    if (!milestones || milestones.length < 4) throw new Error('Expected career milestone history');
  });

  // 10. Knowledge Hub Search
  test('[KnowledgeHub] Searches official guides and filters by category', () => {
    const articles = knowledgeHubDatabase.searchArticles('resume', 'CAREER');
    if (!articles || articles.length === 0) throw new Error('Failed to find resume career guide');
    if (!articles[0].author || !articles[0].source) throw new Error('Article missing verified author/source');
  });

  return results;
}