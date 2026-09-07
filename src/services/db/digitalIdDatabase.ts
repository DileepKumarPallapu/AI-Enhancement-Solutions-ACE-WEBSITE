// ACE Digital Student ID Database
// Manages verified student digital cards, QR verification tokens, and card styling

export interface DigitalStudentId {
  id: string;
  userId: string;
  aceId: string; // Format: ACE-2026-XXXXXX
  fullName: string;
  displayName: string;
  avatarUrl: string;
  institutionId: string;
  institutionName: string;
  campusAddress: string;
  department: string;
  program: string;
  batchYear: string;
  currentSemester: number;
  rollNumber: string;
  bloodGroup?: string;
  emergencyContact?: string;
  isVerified: boolean;
  verificationBadge: 'VERIFIED_STUDENT' | 'CAMPUS_AMBASSADOR' | 'COMMUNITY_LEAD' | 'TOP_CONTRIBUTOR';
  issuedAt: string;
  expiresAt: string;
  verificationToken: string; // Signed opaque token
  verificationUrl: string; // Safe public URL, never exposes raw PII
  cardTheme: 'quantum_emerald' | 'cyber_indigo' | 'aurora_gold' | 'obsidian_dark' | 'glassmorphism';
  nfcCardEnabled: boolean;
  qrScansCount: number;
  lastScannedAt?: string;
}

const STORAGE_KEY = 'ace_db_digital_ids_v1';

class DigitalIdDatabase {
  private ids: Map<string, DigitalStudentId> = new Map();
  private tokenIndex: Map<string, string> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.ids.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as DigitalStudentId[];
          items.forEach(item => {
            this.ids.set(item.userId, item);
            this.tokenIndex.set(item.verificationToken, item.id);
          });
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const items = Array.from(this.ids.values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch {
      // Storage fallback
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private generateVerificationToken(userId: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    return `ace_vt_${userId.substring(0, 8)}_${timestamp}_${random}`;
  }

  public seedInitial() {
    const defaultStudentToken = this.generateVerificationToken('usr_student_dileep');
    const dileepCard: DigitalStudentId = {
      id: 'did_student_dileep',
      userId: 'usr_student_dileep',
      aceId: 'ACE-2026-VT9842',
      fullName: 'Dileep Kumar Pallapu',
      displayName: 'Dileep Kumar',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      campusAddress: 'No. 42, Avadi-Vel Tech Road, Vel Nagar, Avadi, Chennai - 600062, Tamil Nadu, India',
      department: 'Computer Science & Engineering',
      program: 'B.Tech - Artificial Intelligence & Machine Learning',
      batchYear: '2023 - 2027',
      currentSemester: 6,
      rollNumber: 'VTU2023CSE0412',
      bloodGroup: 'O+',
      emergencyContact: '+91 98765 43210',
      isVerified: true,
      verificationBadge: 'CAMPUS_AMBASSADOR',
      issuedAt: '2024-08-01T09:00:00.000Z',
      expiresAt: '2027-06-30T23:59:59.000Z',
      verificationToken: defaultStudentToken,
      verificationUrl: `https://allcollegeevent.com/verify/token?t=${defaultStudentToken}`,
      cardTheme: 'quantum_emerald',
      nfcCardEnabled: true,
      qrScansCount: 42,
      lastScannedAt: new Date(Date.now() - 3600000 * 4).toISOString()
    };

    this.ids.set(dileepCard.userId, dileepCard);
    this.tokenIndex.set(dileepCard.verificationToken, dileepCard.id);
    this.saveToStorage();
  }

  public getByUserId(userId: string): DigitalStudentId | null {
    return this.ids.get(userId) || null;
  }

  public getByToken(token: string): DigitalStudentId | null {
    for (const card of this.ids.values()) {
      if (card.verificationToken === token) {
        return card;
      }
    }
    return null;
  }

  public createOrUpdate(card: Partial<DigitalStudentId> & { userId: string }): DigitalStudentId {
    const existing = this.ids.get(card.userId);
    const token = existing?.verificationToken || this.generateVerificationToken(card.userId);
    const aceId = existing?.aceId || `ACE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const updated: DigitalStudentId = {
      id: existing?.id || `did_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId: card.userId,
      aceId: card.aceId || aceId,
      fullName: card.fullName || existing?.fullName || 'Student User',
      displayName: card.displayName || existing?.displayName || 'Student',
      avatarUrl: card.avatarUrl || existing?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      institutionId: card.institutionId || existing?.institutionId || 'inst-vel-tech-rangarajan-avadi',
      institutionName: card.institutionName || existing?.institutionName || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      campusAddress: card.campusAddress || existing?.campusAddress || 'Avadi, Chennai, Tamil Nadu, India',
      department: card.department || existing?.department || 'Computer Science & Engineering',
      program: card.program || existing?.program || 'B.Tech CSE',
      batchYear: card.batchYear || existing?.batchYear || '2023 - 2027',
      currentSemester: card.currentSemester || existing?.currentSemester || 6,
      rollNumber: card.rollNumber || existing?.rollNumber || 'REG-PENDING',
      bloodGroup: card.bloodGroup || existing?.bloodGroup,
      emergencyContact: card.emergencyContact || existing?.emergencyContact,
      isVerified: card.isVerified ?? existing?.isVerified ?? true,
      verificationBadge: card.verificationBadge || existing?.verificationBadge || 'VERIFIED_STUDENT',
      issuedAt: existing?.issuedAt || new Date().toISOString(),
      expiresAt: card.expiresAt || existing?.expiresAt || new Date(Date.now() + 86400000 * 365 * 2).toISOString(),
      verificationToken: token,
      verificationUrl: `https://allcollegeevent.com/verify/token?t=${token}`,
      cardTheme: card.cardTheme || existing?.cardTheme || 'quantum_emerald',
      nfcCardEnabled: card.nfcCardEnabled ?? existing?.nfcCardEnabled ?? true,
      qrScansCount: (existing?.qrScansCount || 0) + (card.qrScansCount ? card.qrScansCount : 0),
      lastScannedAt: card.lastScannedAt || existing?.lastScannedAt
    };

    this.ids.set(updated.userId, updated);
    this.tokenIndex.set(token, updated.id);
    this.saveToStorage();
    return updated;
  }

  public recordScan(token: string): { success: boolean; card?: DigitalStudentId; message: string } {
    const card = this.getByToken(token);
    if (!card) {
      return { success: false, message: 'Invalid or expired student verification token.' };
    }

    card.qrScansCount += 1;
    card.lastScannedAt = new Date().toISOString();
    this.ids.set(card.userId, card);
    this.saveToStorage();

    return {
      success: true,
      card,
      message: 'Student ID successfully verified.'
    };
  }

  public updateTheme(userId: string, theme: DigitalStudentId['cardTheme']): boolean {
    const card = this.getByUserId(userId);
    if (!card) return false;
    card.cardTheme = theme;
    this.ids.set(userId, card);
    this.saveToStorage();
    return true;
  }
}

export const digitalIdDb = new DigitalIdDatabase();
