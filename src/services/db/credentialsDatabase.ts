export interface DigitalCredential {
  credentialId: string;
  title: string;
  credentialType: 'CERTIFICATE' | 'BADGE' | 'COMPETITION_AWARD' | 'COURSE_COMPLETION' | 'SKILL_ATTESTATION' | 'INTERNSHIP';
  issuerName: string;
  issuerInstitutionId: string;
  recipientName: string;
  recipientUserId: string;
  recipientRollNumber: string;
  issuedAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  cryptographicSignature: string;
  verificationToken: string;
  evidenceSummary: string;
  metadata: Record<string, any>;
}

const STORAGE_KEY_CREDS = 'ace_80x_digital_credentials';

export const credentialsDatabase = {
  getAllCredentials(): DigitalCredential[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CREDS);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: DigitalCredential[] = [
      {
        credentialId: 'cred-vt-codefest-2026',
        title: '1st Prize Winner - Vel Tech National CodeFest 2026',
        credentialType: 'COMPETITION_AWARD',
        issuerName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        issuerInstitutionId: 'inst-vel-tech-rangarajan-avadi',
        recipientName: 'Dileep Kumar',
        recipientUserId: 'usr-student-dileep-veltech',
        recipientRollNumber: 'VTU-2023-CSE-042',
        issuedAt: '2026-04-20T17:00:00Z',
        status: 'ACTIVE',
        cryptographicSignature: 'ed25519:8f9a2b4c1d6e3f5a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
        verificationToken: 'vtok_codefest_2026_dileep_vt99',
        evidenceSummary: 'Built production campus event queue scoring 98.5/100 on multi-criteria rubric.',
        metadata: {
          rank: '1st Place',
          prizeAmountINR: '₹50,000',
          evaluationCriteria: 'System Design, Latency, Zero Data Loss'
        }
      },
      {
        credentialId: 'cred-aws-cloud-2025',
        title: 'AWS Certified Cloud Practitioner Attestation',
        credentialType: 'CERTIFICATE',
        issuerName: 'Amazon Web Services (AWS Educate Partnership)',
        issuerInstitutionId: 'inst-vel-tech-rangarajan-avadi',
        recipientName: 'Dileep Kumar',
        recipientUserId: 'usr-student-dileep-veltech',
        recipientRollNumber: 'VTU-2023-CSE-042',
        issuedAt: '2025-08-12T10:30:00Z',
        status: 'ACTIVE',
        cryptographicSignature: 'ed25519:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
        verificationToken: 'vtok_aws_ccp_2025_dileep',
        evidenceSummary: 'Demonstrated proficiency in AWS cloud security, VPC architecture, and IAM roles.',
        metadata: {
          validationScore: '890/1000',
          certificateNumber: 'AWS-CCP-882194'
        }
      }
    ];
    this.saveCredentials(defaults);
    return defaults;
  },

  saveCredentials(creds: DigitalCredential[]) {
    try {
      localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(creds));
    } catch {}
  },

  getCredentialById(idOrToken: string): DigitalCredential | undefined {
    const creds = this.getAllCredentials();
    return creds.find(c => c.credentialId === idOrToken || c.verificationToken === idOrToken);
  },

  revokeCredential(credentialId: string, reason: string): DigitalCredential | undefined {
    const creds = this.getAllCredentials();
    const target = creds.find(c => c.credentialId === credentialId);
    if (target) {
      target.status = 'REVOKED';
      target.metadata.revocationReason = reason;
      target.metadata.revokedAt = new Date().toISOString();
      this.saveCredentials(creds);
    }
    return target;
  }
};
