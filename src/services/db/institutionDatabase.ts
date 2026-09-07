import {
  Institution,
  IndiaState,
  IndiaDistrict,
  InstitutionSearchFilters,
  InstitutionSearchResult,
  InstitutionRequestPayload,
  InstitutionHealthMetrics
} from '../../types/institution';
import { INDIA_STATES, INDIA_DISTRICTS, INITIAL_INSTITUTIONS } from './institutionData';

const STORAGE_KEY_INSTITUTIONS = 'ace_institutions_v1';
const STORAGE_KEY_REQUESTS = 'ace_institution_requests_v1';

class InstitutionDatabaseService {
  private institutions: Institution[] = [];
  private requests: InstitutionRequestPayload[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;
    try {
      const storedInst = localStorage.getItem(STORAGE_KEY_INSTITUTIONS);
      if (storedInst) {
        this.institutions = JSON.parse(storedInst);
      } else {
        this.institutions = [...INITIAL_INSTITUTIONS];
        this.saveInstitutions();
      }

      const storedReq = localStorage.getItem(STORAGE_KEY_REQUESTS);
      if (storedReq) {
        this.requests = JSON.parse(storedReq);
      } else {
        this.requests = [];
      }
    } catch (e) {
      console.warn('Failed to load institutions from localStorage, using initial dataset:', e);
      this.institutions = [...INITIAL_INSTITUTIONS];
    }
    this.isInitialized = true;
  }

  private saveInstitutions() {
    try {
      localStorage.setItem(STORAGE_KEY_INSTITUTIONS, JSON.stringify(this.institutions));
    } catch (e) {
      console.error('Failed to save institutions to localStorage:', e);
    }
  }

  private saveRequests() {
    try {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(this.requests));
    } catch (e) {
      console.error('Failed to save requests to localStorage:', e);
    }
  }

  // Geography lookups
  public getAllStates(): IndiaState[] {
    return [...INDIA_STATES];
  }

  public getStateById(stateId: string): IndiaState | undefined {
    return INDIA_STATES.find(s => s.id === stateId || s.code === stateId);
  }

  public getDistrictsByState(stateId: string): IndiaDistrict[] {
    const state = this.getStateById(stateId);
    if (!state) return [];
    return INDIA_DISTRICTS[state.id] || [];
  }

  public getCitiesByDistrict(stateId: string, districtId: string): string[] {
    const insts = this.institutions.filter(i => i.stateId === stateId && i.districtId === districtId);
    const cities = new Set<string>();
    insts.forEach(i => {
      if (i.city) cities.add(i.city);
    });
    return Array.from(cities);
  }

  // Core Search and Filtering
  public searchInstitutions(filters: InstitutionSearchFilters = {}): InstitutionSearchResult {
    this.init();
    const {
      query = '',
      stateId,
      districtId,
      institutionType,
      institutionCategory,
      managementType,
      verifiedOnly,
      sortBy = 'relevance',
      page = 1,
      limit = 20
    } = filters;

    let results = this.institutions.filter(inst => inst.status === 'ACTIVE');

    // Filter by State
    if (stateId) {
      results = results.filter(i => i.stateId === stateId);
    }

    // Filter by District
    if (districtId) {
      results = results.filter(i => i.districtId === districtId);
    }

    // Filter by Type
    if (institutionType) {
      results = results.filter(i => i.institutionType === institutionType);
    }

    // Filter by Category
    if (institutionCategory) {
      results = results.filter(i => i.institutionCategory === institutionCategory);
    }

    // Filter by Management
    if (managementType) {
      results = results.filter(i => i.managementType === managementType);
    }

    // Filter by Verified
    if (verifiedOnly) {
      results = results.filter(i => i.verified);
    }

    // Search Query Processing with relevance scoring
    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery) {
      const tokens = cleanQuery.split(/\s+/).filter(Boolean);

      const scored = results.map(inst => {
        let score = 0;
        const nameLower = inst.name.toLowerCase();
        const shortNameLower = (inst.shortName || '').toLowerCase();
        const aisheLower = (inst.aisheCode || '').toLowerCase();
        const cityLower = inst.city.toLowerCase();
        const distLower = (inst.districtName || '').toLowerCase();
        const aliases = (inst.searchAliases || []).map(a => a.toLowerCase());

        // Exact matches
        if (aisheLower === cleanQuery) score += 100;
        if (shortNameLower === cleanQuery) score += 80;
        if (nameLower === cleanQuery) score += 70;

        // Prefix match
        if (nameLower.startsWith(cleanQuery)) score += 50;
        if (shortNameLower.startsWith(cleanQuery)) score += 45;

        // Search alias matches
        for (const alias of aliases) {
          if (alias === cleanQuery) score += 60;
          else if (alias.includes(cleanQuery)) score += 30;
        }

        // Substring matches
        if (nameLower.includes(cleanQuery)) score += 35;
        if (shortNameLower.includes(cleanQuery)) score += 25;
        if (cityLower.includes(cleanQuery)) score += 20;
        if (distLower.includes(cleanQuery)) score += 15;

        // Token matches
        let tokenMatches = 0;
        for (const token of tokens) {
          if (
            nameLower.includes(token) ||
            shortNameLower.includes(token) ||
            cityLower.includes(token) ||
            distLower.includes(token) ||
            aliases.some(a => a.includes(token))
          ) {
            tokenMatches++;
          }
        }
        score += tokenMatches * 10;

        return { inst, score };
      });

      // Filter out non-matching results
      const matching = scored.filter(s => s.score > 0);

      // Sort by score or specific sort
      if (sortBy === 'relevance') {
        matching.sort((a, b) => b.score - a.score);
      }
      results = matching.map(m => m.inst);
    }

    // Non-relevance sorting
    if (sortBy === 'name_asc') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'nirf_rank') {
      results.sort((a, b) => {
        const rankA = a.nirfRank || 999999;
        const rankB = b.nirfRank || 999999;
        return rankA - rankB;
      });
    } else if (sortBy === 'students_desc') {
      results.sort((a, b) => (b.studentCount || 0) - (a.studentCount || 0));
    }

    const total = results.length;
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const totalPages = Math.ceil(total / safeLimit) || 1;
    const safePage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (safePage - 1) * safeLimit;
    const paginatedInstitutions = results.slice(startIndex, startIndex + safeLimit);

    return {
      institutions: paginatedInstitutions,
      total,
      page: safePage,
      totalPages,
      hasMore: safePage < totalPages
    };
  }

  // Get Single Institution
  public getInstitutionById(id: string): Institution | null {
    this.init();
    return this.institutions.find(i => i.id === id) || null;
  }

  public getInstitutionBySlug(slug: string): Institution | null {
    this.init();
    return this.institutions.find(i => i.slug === slug || i.id === slug) || null;
  }

  public getInstitutionByAisheCode(aisheCode: string): Institution | null {
    this.init();
    const clean = aisheCode.trim().toUpperCase();
    return this.institutions.find(i => (i.aisheCode || '').toUpperCase() === clean) || null;
  }

  public getFeaturedInstitutions(limit = 6): Institution[] {
    this.init();
    return this.institutions
      .filter(i => i.status === 'ACTIVE' && i.verified)
      .sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999))
      .slice(0, limit);
  }

  // User Custom Institution Request
  public requestInstitution(payload: Omit<InstitutionRequestPayload, 'id' | 'status' | 'createdAt'>): {
    success: boolean;
    requestId: string;
    message: string;
  } {
    this.init();
    const requestId = 'req-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const newRequest: InstitutionRequestPayload = {
      ...payload,
      id: requestId,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString()
    };

    this.requests.unshift(newRequest);
    this.saveRequests();

    return {
      success: true,
      requestId,
      message: 'Your institution has been submitted for verification. It will appear once verified by our team.'
    };
  }

  public getInstitutionRequests(status?: string): InstitutionRequestPayload[] {
    this.init();
    if (status) {
      return this.requests.filter(r => r.status === status);
    }
    return [...this.requests];
  }

  public approveInstitutionRequest(requestId: string, reviewerId?: string): { success: boolean; institution?: Institution } {
    this.init();
    const request = this.requests.find(r => r.id === requestId);
    if (!request) return { success: false };

    request.status = 'APPROVED';
    request.reviewedAt = new Date().toISOString();
    request.reviewedBy = reviewerId || 'ACE Admin';

    // Create active institution from request
    const slug = request.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const state = this.getStateById(request.stateId);

    const newInst: Institution = {
      id: 'inst-' + Date.now(),
      name: request.name,
      shortName: request.shortName || request.name.split(' ').map(w => w[0]).join('').toUpperCase(),
      slug: slug + '-' + Math.random().toString(36).substring(2, 5),
      aisheCode: request.aisheCode,
      institutionType: request.institutionType,
      institutionCategory: request.institutionCategory || 'AFFILIATED_COLLEGE',
      managementType: request.managementType || 'PRIVATE_UNAIDED',
      stateId: request.stateId,
      stateName: state?.name || request.stateId,
      districtId: request.districtId || request.districtName || '',
      districtName: request.districtName || '',
      city: request.city,
      address: request.address || request.city,
      pincode: request.pincode,
      website: request.website,
      verified: true,
      status: 'ACTIVE',
      searchAliases: [request.shortName || '', request.city].filter(Boolean),
      studentCount: 0,
      mentorCount: 0,
      eventCount: 0,
      ambassadorCount: 0,
      tags: [request.institutionType, request.city],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.institutions.unshift(newInst);
    this.saveInstitutions();
    this.saveRequests();

    return { success: true, institution: newInst };
  }

  public rejectInstitutionRequest(requestId: string, rejectionReason: string): { success: boolean } {
    this.init();
    const request = this.requests.find(r => r.id === requestId);
    if (!request) return { success: false };

    request.status = 'REJECTED';
    request.rejectionReason = rejectionReason;
    request.reviewedAt = new Date().toISOString();
    this.saveRequests();

    return { success: true };
  }

  // Admin CRUD
  public createInstitution(data: Partial<Institution>): Institution {
    this.init();
    const state = this.getStateById(data.stateId || 'TN');
    const slug = (data.name || 'institution')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newInst: Institution = {
      id: 'inst-' + Date.now(),
      name: data.name || 'New Institution',
      shortName: data.shortName || '',
      slug: slug + '-' + Math.random().toString(36).substring(2, 5),
      aisheCode: data.aisheCode,
      institutionType: data.institutionType || 'COLLEGE',
      institutionCategory: data.institutionCategory || 'AFFILIATED_COLLEGE',
      managementType: data.managementType || 'GOVT_AIDED',
      stateId: data.stateId || 'TN',
      stateName: state?.name || 'Tamil Nadu',
      districtId: data.districtId || '',
      districtName: data.districtName || '',
      city: data.city || '',
      address: data.address || '',
      pincode: data.pincode,
      website: data.website,
      email: data.email,
      phone: data.phone,
      establishedYear: data.establishedYear,
      accreditation: data.accreditation,
      affiliatingUniversity: data.affiliatingUniversity,
      nirfRank: data.nirfRank,
      verified: data.verified ?? true,
      status: data.status || 'ACTIVE',
      searchAliases: data.searchAliases || [],
      studentCount: data.studentCount || 0,
      mentorCount: data.mentorCount || 0,
      eventCount: data.eventCount || 0,
      ambassadorCount: data.ambassadorCount || 0,
      tags: data.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.institutions.unshift(newInst);
    this.saveInstitutions();
    return newInst;
  }

  public updateInstitution(id: string, updates: Partial<Institution>): Institution | null {
    this.init();
    const index = this.institutions.findIndex(i => i.id === id);
    if (index === -1) return null;

    this.institutions[index] = {
      ...this.institutions[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveInstitutions();
    return this.institutions[index];
  }

  public deleteInstitution(id: string): boolean {
    this.init();
    const index = this.institutions.findIndex(i => i.id === id);
    if (index === -1) return false;

    this.institutions.splice(index, 1);
    this.saveInstitutions();
    return true;
  }

  // Health Metrics for Admin
  public getInstitutionHealthMetrics(): InstitutionHealthMetrics {
    this.init();
    const statesCovered = new Set(this.institutions.map(i => i.stateId)).size;
    const districtsCovered = new Set(this.institutions.map(i => i.districtId).filter(Boolean)).size;

    const byType: Record<string, number> = {};
    const byState: Record<string, number> = {};

    this.institutions.forEach(i => {
      byType[i.institutionType] = (byType[i.institutionType] || 0) + 1;
      byState[i.stateId] = (byState[i.stateId] || 0) + 1;
    });

    const pendingRequests = this.requests.filter(r => r.status === 'PENDING_REVIEW').length;
    const missingAishe = this.institutions.filter(i => !i.aisheCode).length;

    return {
      totalInstitutions: this.institutions.length,
      verifiedCount: this.institutions.filter(i => i.verified).length,
      pendingRequestsCount: pendingRequests,
      statesCovered,
      districtsCovered,
      byType,
      byState,
      qualityScore: Math.round(
        (1 - missingAishe / (this.institutions.length || 1)) * 50 +
        (this.institutions.filter(i => i.verified).length / (this.institutions.length || 1)) * 50
      )
    };
  }

  // Import / Export
  public importInstitutions(
    items: Partial<Institution>[],
    mode: 'merge' | 'replace' = 'merge'
  ): { imported: number; updated: number; skipped: number } {
    this.init();
    let imported = 0;
    let updated = 0;
    let skipped = 0;

    if (mode === 'replace') {
      this.institutions = [];
    }

    items.forEach(item => {
      if (!item.name) {
        skipped++;
        return;
      }

      // Check if duplicate by AISHE code or name + city
      const existing = this.institutions.find(
        i =>
          (item.aisheCode && i.aisheCode && i.aisheCode.toUpperCase() === item.aisheCode.toUpperCase()) ||
          (i.name.toLowerCase() === item.name!.toLowerCase() && i.city.toLowerCase() === (item.city || '').toLowerCase())
      );

      if (existing) {
        Object.assign(existing, item, { updatedAt: new Date().toISOString() });
        updated++;
      } else {
        const state = this.getStateById(item.stateId || 'TN');
        const slug = item.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        const newInst: Institution = {
          id: item.id || 'inst-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          name: item.name,
          shortName: item.shortName || '',
          slug: item.slug || slug + '-' + Math.random().toString(36).substring(2, 5),
          aisheCode: item.aisheCode,
          institutionType: item.institutionType || 'COLLEGE',
          institutionCategory: item.institutionCategory || 'AFFILIATED_COLLEGE',
          managementType: item.managementType || 'PRIVATE_UNAIDED',
          stateId: item.stateId || 'TN',
          stateName: state?.name || item.stateName || 'Tamil Nadu',
          districtId: item.districtId || '',
          districtName: item.districtName || '',
          city: item.city || '',
          address: item.address || '',
          pincode: item.pincode,
          website: item.website,
          establishedYear: item.establishedYear,
          accreditation: item.accreditation,
          verified: item.verified ?? true,
          status: item.status || 'ACTIVE',
          searchAliases: item.searchAliases || [],
          studentCount: item.studentCount || 0,
          mentorCount: item.mentorCount || 0,
          eventCount: item.eventCount || 0,
          ambassadorCount: item.ambassadorCount || 0,
          tags: item.tags || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        this.institutions.push(newInst);
        imported++;
      }
    });

    this.saveInstitutions();
    return { imported, updated, skipped };
  }

  public exportInstitutionsJSON(): string {
    this.init();
    return JSON.stringify(this.institutions, null, 2);
  }

  public exportInstitutionsCSV(): string {
    this.init();
    const headers = ['AISHE Code', 'Institution Name', 'Short Name', 'Type', 'Category', 'State', 'District', 'City', 'NIRF Rank', 'Website'];
    const rows = this.institutions.map(i => [
      `"${i.aisheCode || ''}"`,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${(i.shortName || '').replace(/"/g, '""')}"`,
      `"${i.institutionType}"`,
      `"${i.institutionCategory}"`,
      `"${i.stateName}"`,
      `"${i.districtName || ''}"`,
      `"${i.city}"`,
      `"${i.nirfRank || ''}"`,
      `"${i.website || ''}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

export const institutionDatabase = new InstitutionDatabaseService();
