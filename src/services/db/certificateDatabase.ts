// ACE Tamper-Proof Verified Certificates Database Layer

export interface PersistentCertificate {
  id: string;
  certificateNumber: string;
  title: string;
  eventName: string;
  issuer: string;
  issuerId?: string;
  issuedDate: string;
  recipientId: string;
  recipientName: string;
  recipientCollege: string;
  skills: string[];
  type: 'EVENT_PARTICIPATION' | 'EVENT_WINNER' | 'WORKSHOP_COMPLETION' | 'EXTERNAL_UPLOAD' | 'MENTORSHIP_COMPLETION';
  verificationHash: string;
  qrVerificationUrl: string;
  pdfDownloadUrl?: string;
  fileUrl?: string; // For user uploaded external certificates
  status: 'VERIFIED' | 'PENDING_AUDIT' | 'REVOKED';
  createdAt: string;
}

const STORAGE_KEYS = {
  CERTIFICATES: 'ace_persistent_certificates_v2'
};

const SEED_CERTIFICATES: PersistentCertificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'ACE-CERT-884920',
    title: 'HACKVERSE 2.0 National Hackathon Finalist',
    eventName: 'HACKVERSE 2.0',
    issuer: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology & ACE Directorate',
    issuerId: 'inst-vel-tech-rangarajan-avadi',
    issuedDate: 'August 28, 2026',
    recipientId: 'usr_student_dileep',
    recipientName: 'Pallapu Dileep Kumar',
    recipientCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    skills: ['Generative AI', 'React 19', 'FastAPI', 'Team Leadership'],
    type: 'EVENT_WINNER',
    verificationHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    qrVerificationUrl: 'https://www.allcollegeevent.com/verify-certificate/ACE-CERT-884920',
    status: 'VERIFIED',
    createdAt: '2026-08-28T18:00:00Z'
  },
  {
    id: 'cert-2',
    certificateNumber: 'ACE-CERT-773192',
    title: 'Hands-on Autonomous Agent Architectures Workshop',
    eventName: 'AI Engineering Workshop Series',
    issuer: 'Department of Computer Science & Engineering, Vel Tech',
    issuerId: 'inst-vel-tech-rangarajan-avadi',
    issuedDate: 'July 15, 2026',
    recipientId: 'usr_student_dileep',
    recipientName: 'Pallapu Dileep Kumar',
    recipientCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    skills: ['Autonomous Agents', 'LangChain', 'Prompt Engineering'],
    type: 'WORKSHOP_COMPLETION',
    verificationHash: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    qrVerificationUrl: 'https://www.allcollegeevent.com/verify-certificate/ACE-CERT-773192',
    status: 'VERIFIED',
    createdAt: '2026-07-15T16:00:00Z'
  }
];

class CertificateDatabase {
  private certificates: PersistentCertificate[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      this.certificates = raw ? JSON.parse(raw) : SEED_CERTIFICATES;
    } catch (e) {
      console.error('[CertificateDatabase] Hydration error:', e);
      this.certificates = SEED_CERTIFICATES;
    }
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(this.certificates));
    }
  }

  public getCertificatesByUser(userId: string): PersistentCertificate[] {
    return this.certificates.filter(c => c.recipientId === userId);
  }

  public getCertificateByIdOrNumber(idOrNum: string): PersistentCertificate | undefined {
    return this.certificates.find(c => c.id === idOrNum || c.certificateNumber.toLowerCase() === idOrNum.toLowerCase());
  }

  public addCertificate(cert: Omit<PersistentCertificate, 'id' | 'createdAt'> & { id?: string }): PersistentCertificate {
    const now = new Date().toISOString();
    const newCert: PersistentCertificate = {
      ...cert,
      id: cert.id || `cert-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: now
    };
    this.certificates.unshift(newCert);
    this.persist();
    return newCert;
  }

  public deleteCertificate(id: string, userId: string): boolean {
    const cert = this.certificates.find(c => c.id === id);
    if (!cert) return false;
    if (cert.recipientId !== userId && userId !== 'usr_admin') {
      return false;
    }
    this.certificates = this.certificates.filter(c => c.id !== id);
    this.persist();
    return true;
  }
}

export const certificateDb = new CertificateDatabase();
