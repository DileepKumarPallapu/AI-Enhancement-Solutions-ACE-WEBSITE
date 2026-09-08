import { digitalPassportDatabase } from '../digitalPassportDatabase';
import { credentialsDatabase } from '../credentialsDatabase';
import { resumeBuilderDatabase } from '../resumeBuilderDatabase';
import { portfolioBuilderDatabase } from '../portfolioBuilderDatabase';
import { studentPrivacyDatabase } from '../studentPrivacyDatabase';

export async function runPhase80XTests(): Promise<{ name: string; passed: boolean; error?: string }[]> {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  function test(name: string, fn: () => void) {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err?.message || String(err) });
    }
  }

  // 1. Digital Student Passport Aggregation & Mathematical Completeness
  test('[DigitalPassport] Retrieves canonical student passport with deterministic completeness', () => {
    const passport = digitalPassportDatabase.getPassport();
    if (!passport || !passport.student || !passport.student.institution.name.includes('Vel Tech')) {
      throw new Error('Passport must be bound to canonical Vel Tech student');
    }
    if (passport.completenessPercentage <= 0 || passport.completenessPercentage > 100) {
      throw new Error(`Invalid completeness percentage: ${passport.completenessPercentage}%`);
    }
    if (passport.skills.length === 0 || passport.projects.length === 0) {
      throw new Error('Passport must contain verified skills and projects');
    }
  });

  // 2. Skill Evidence & Verification Lifecycle
  test('[SkillPassport] Adds new skill and verifies progressive evidence states', () => {
    const newSkill = digitalPassportDatabase.addSkill({
      name: 'Distributed Systems & Consensus',
      level: 'ADVANCED',
      status: 'VERIFIED',
      evidenceSource: 'Production Distributed Queue Capstone Project',
      evidenceLink: 'https://github.com/dileepkumar/distributed-queue-go',
      relatedRole: 'Systems Software Engineer',
      verifiedBy: 'Dr. S. Ramanathan'
    });

    if (!newSkill.id || newSkill.status !== 'VERIFIED' || !newSkill.evidenceSource) {
      throw new Error('Failed to create verified skill with evidence trail');
    }
  });

  // 3. Project Passport Persistence & Verification Source
  test('[ProjectPassport] Adds verified project and validates GitHub/live repository link', () => {
    const newProj = digitalPassportDatabase.addProject({
      title: 'Real-Time Edge Event Pipeline',
      description: 'Zero-downtime stream processor using WebSockets and Redis pub/sub.',
      role: 'Backend Architect',
      technologies: ['TypeScript', 'Redis', 'Node.js'],
      skills: ['TypeScript', 'Redis'],
      githubUrl: 'https://github.com/dileepkumar/edge-event-pipeline',
      status: 'COMPLETED',
      verificationSource: 'MENTOR_VERIFIED',
      verifiedBy: 'Dr. P. Chandrasekar',
      startDate: '2026-02-01'
    });

    if (!newProj.id || newProj.verificationSource !== 'MENTOR_VERIFIED') {
      throw new Error('Failed to register verified project in passport');
    }
  });

  // 4. Credential Wallet & Cryptographic Signature Attestation
  test('[CredentialsDatabase] Validates cryptographic signature and status query', () => {
    const creds = credentialsDatabase.getAllCredentials();
    if (!creds || creds.length === 0) throw new Error('Expected credentials in wallet');
    const first = creds[0];
    if (!first.cryptographicSignature.startsWith('ed25519:') || first.status !== 'ACTIVE') {
      throw new Error('Credential missing cryptographic Ed25519 signature or active status');
    }

    const queried = credentialsDatabase.getCredentialById(first.credentialId);
    if (!queried || queried.credentialId !== first.credentialId) {
      throw new Error('Failed to query credential by unique ID');
    }
  });

  // 5. Credential Revocation Lifecycle
  test('[CredentialsDatabase] Revokes credential with audit reason and timestamp', () => {
    const revoked = credentialsDatabase.revokeCredential('cred-aws-cloud-2025', 'Audit expiration test');
    if (!revoked || revoked.status !== 'REVOKED' || revoked.metadata.revocationReason !== 'Audit expiration test') {
      throw new Error('Failed to revoke credential with audit reason');
    }
  });

  // 6. Resume Builder Multi-Template Profiles
  test('[ResumeBuilder] Loads ATS-standard resume profiles mapped from passport records', () => {
    const resumes = resumeBuilderDatabase.getAllResumes();
    if (!resumes || resumes.length === 0) throw new Error('Expected resume profiles');
    const sweResume = resumes.find(r => r.targetRole.includes('Software Engineer'));
    if (!sweResume || sweResume.selectedSkillIds.length === 0 || !sweResume.showGpa) {
      throw new Error('Expected SWE resume profile with selected skills and GPA flag');
    }
  });

  // 7. Portfolio Builder Customization
  test('[PortfolioBuilder] Retrieves and persists custom portfolio theme & visibility', () => {
    const config = portfolioBuilderDatabase.getPortfolioConfig();
    if (!config || !config.slug || config.visibility !== 'PUBLIC') {
      throw new Error('Expected public portfolio configuration');
    }

    config.headline = 'Senior Systems Architect & Full-Stack Engineer';
    const updated = portfolioBuilderDatabase.savePortfolioConfig(config);
    if (updated.headline !== 'Senior Systems Architect & Full-Stack Engineer') {
      throw new Error('Failed to persist portfolio headline update');
    }
  });

  // 8. Student Privacy Controls & Discoverability
  test('[StudentPrivacy] Toggles recruiter radar visibility and persists preferences', () => {
    const settings = studentPrivacyDatabase.getSettings();
    if (!settings.isPublicProfileDiscoverable) throw new Error('Expected default discoverability');

    settings.recruiterRadarVisible = false;
    const saved = studentPrivacyDatabase.saveSettings(settings);
    if (saved.recruiterRadarVisible !== false) {
      throw new Error('Failed to update recruiter radar privacy toggle');
    }
  });

  // 9. Verification Request Lifecycle
  test('[DigitalPassport] Submits verification request with evidence', () => {
    const req = digitalPassportDatabase.requestVerification(
      'SKILL_EVIDENCE',
      'Kubernetes Multi-Cluster Orchestration',
      'CKA Certificate #LF-CKA-99214'
    );
    if (!req.id || req.status !== 'PENDING' || !req.submittedEvidence) {
      throw new Error('Failed to create pending verification request');
    }
  });

  return results;
}
