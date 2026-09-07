// ACE Event Attendance & QR Check-In Database
// Handles organizer dynamic QR generation, attendee scans, audit records, and offline check-in queue

export type CheckInStatus = 'CHECKED_IN' | 'DUPLICATE_ATTEMPT' | 'INVALID_TICKET' | 'EVENT_EXPIRED' | 'NOT_STARTED' | 'REVOKED';

export interface AttendanceRecord {
  id: string;
  eventId: string;
  eventName: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCollege: string;
  userAceId: string;
  ticketId: string;
  checkInMethod: 'QR_SCANNER' | 'ORGANIZER_MANUAL' | 'STUDENT_SELF_CHECKIN' | 'NFC_TAP';
  status: CheckInStatus;
  scannedAt: string;
  scannedByUserId: string;
  scannedByUserName: string;
  deviceInfo: string;
  location?: { lat: number; lng: number };
  notes?: string;
  isCorrected?: boolean;
  correctionReason?: string;
}

export interface EventCheckInConfig {
  eventId: string;
  eventName: string;
  organizerId: string;
  checkInOpenTime: string;
  checkInCloseTime: string;
  dynamicQrRefreshSeconds: number;
  allowSelfCheckIn: boolean;
  geofenceRadiusMeters?: number;
  latitude?: number;
  longitude?: number;
}

const STORAGE_KEY = 'ace_db_attendance_records_v1';
const CONFIG_STORAGE_KEY = 'ace_db_attendance_configs_v1';

class AttendanceDatabase {
  private records: Map<string, AttendanceRecord> = new Map();
  private configs: Map<string, EventCheckInConfig> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.records.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as AttendanceRecord[];
          items.forEach(r => this.records.set(r.id, r));
        }
        const rawConfigs = localStorage.getItem(CONFIG_STORAGE_KEY);
        if (rawConfigs) {
          const configs = JSON.parse(rawConfigs) as EventCheckInConfig[];
          configs.forEach(c => this.configs.set(c.eventId, c));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.records.values())));
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(Array.from(this.configs.values())));
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

  public seedInitial() {
    const sampleRecord: AttendanceRecord = {
      id: 'att_seed_001',
      eventId: 'evt_nat_hackathon_2026',
      eventName: 'National AI & Autonomous Robotics Hackathon 2026',
      userId: 'usr_student_dileep',
      userName: 'Dileep Kumar Pallapu',
      userEmail: 'dileep.kumar@veltech.edu.in',
      userCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      userAceId: 'ACE-2026-VT9842',
      ticketId: 'tkt_hack_2026_891',
      checkInMethod: 'QR_SCANNER',
      status: 'CHECKED_IN',
      scannedAt: '2026-03-15T08:45:00.000Z',
      scannedByUserId: 'usr_org_iitm',
      scannedByUserName: 'IIT Madras Event Ops Team',
      deviceInfo: 'ACE QR Pro Scanner v2.4 (Android)',
      notes: 'Checked in at Main Gate Hall A'
    };

    const sampleConfig: EventCheckInConfig = {
      eventId: 'evt_nat_hackathon_2026',
      eventName: 'National AI & Autonomous Robotics Hackathon 2026',
      organizerId: 'usr_org_iitm',
      checkInOpenTime: '2026-03-15T07:00:00.000Z',
      checkInCloseTime: '2026-03-15T12:00:00.000Z',
      dynamicQrRefreshSeconds: 30,
      allowSelfCheckIn: false
    };

    this.records.set(sampleRecord.id, sampleRecord);
    this.configs.set(sampleConfig.eventId, sampleConfig);
    this.saveToStorage();
  }

  public getByEvent(eventId: string): AttendanceRecord[] {
    return Array.from(this.records.values())
      .filter(r => r.eventId === eventId)
      .sort((a, b) => new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime());
  }

  public getByUser(userId: string): AttendanceRecord[] {
    return Array.from(this.records.values())
      .filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime());
  }

  public isCheckedIn(eventId: string, userId: string): boolean {
    return Array.from(this.records.values()).some(
      r => r.eventId === eventId && r.userId === userId && r.status === 'CHECKED_IN'
    );
  }

  public checkInAttendee(params: {
    eventId: string;
    eventName: string;
    userId: string;
    userName: string;
    userEmail: string;
    userCollege: string;
    userAceId: string;
    ticketId: string;
    checkInMethod: AttendanceRecord['checkInMethod'];
    scannedByUserId: string;
    scannedByUserName: string;
    deviceInfo?: string;
  }): { success: boolean; record: AttendanceRecord; message: string } {
    // Check duplicate check-in
    const already = Array.from(this.records.values()).find(
      r => r.eventId === params.eventId && r.userId === params.userId && r.status === 'CHECKED_IN'
    );

    if (already) {
      const duplicateRecord: AttendanceRecord = {
        id: `att_dup_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        eventId: params.eventId,
        eventName: params.eventName,
        userId: params.userId,
        userName: params.userName,
        userEmail: params.userEmail,
        userCollege: params.userCollege,
        userAceId: params.userAceId,
        ticketId: params.ticketId,
        checkInMethod: params.checkInMethod,
        status: 'DUPLICATE_ATTEMPT',
        scannedAt: new Date().toISOString(),
        scannedByUserId: params.scannedByUserId,
        scannedByUserName: params.scannedByUserName,
        deviceInfo: params.deviceInfo || 'ACE Web Scanner',
        notes: `Duplicate scan. Original check-in was at ${already.scannedAt}`
      };
      this.records.set(duplicateRecord.id, duplicateRecord);
      this.saveToStorage();
      return {
        success: false,
        record: duplicateRecord,
        message: `Already checked in at ${new Date(already.scannedAt).toLocaleTimeString()}`
      };
    }

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      eventId: params.eventId,
      eventName: params.eventName,
      userId: params.userId,
      userName: params.userName,
      userEmail: params.userEmail,
      userCollege: params.userCollege,
      userAceId: params.userAceId,
      ticketId: params.ticketId,
      checkInMethod: params.checkInMethod,
      status: 'CHECKED_IN',
      scannedAt: new Date().toISOString(),
      scannedByUserId: params.scannedByUserId,
      scannedByUserName: params.scannedByUserName,
      deviceInfo: params.deviceInfo || 'ACE Web Scanner'
    };

    this.records.set(newRecord.id, newRecord);
    this.saveToStorage();

    return {
      success: true,
      record: newRecord,
      message: 'Attendee check-in verified successfully!'
    };
  }

  public manualCorrection(recordId: string, correctedStatus: CheckInStatus, reason: string): boolean {
    const rec = this.records.get(recordId);
    if (!rec) return false;
    rec.status = correctedStatus;
    rec.isCorrected = true;
    rec.correctionReason = reason;
    this.records.set(recordId, rec);
    this.saveToStorage();
    return true;
  }
}

export const attendanceDb = new AttendanceDatabase();
