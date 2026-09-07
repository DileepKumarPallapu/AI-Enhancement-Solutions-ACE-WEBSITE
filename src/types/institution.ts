export type InstitutionType = 
  | 'UNIVERSITY'
  | 'COLLEGE'
  | 'STANDALONE'
  | 'INSTITUTE'
  | 'OTHER';

export type InstitutionCategory = 
  | 'IIT'
  | 'NIT'
  | 'IIIT'
  | 'IIM'
  | 'IISER'
  | 'AIIMS'
  | 'INSTITUTE'
  | 'CENTRAL_UNIVERSITY'
  | 'STATE_UNIVERSITY'
  | 'DEEMED_UNIVERSITY'
  | 'PRIVATE_UNIVERSITY'
  | 'AUTONOMOUS_COLLEGE'
  | 'AFFILIATED_COLLEGE'
  | 'GOVERNMENT_COLLEGE'
  | 'CONSTITUENT_COLLEGE'
  | 'ENGINEERING_COLLEGE'
  | 'MEDICAL_COLLEGE'
  | 'MANAGEMENT_COLLEGE'
  | 'ARTS_SCIENCE_COLLEGE'
  | 'POLYTECHNIC'
  | 'OTHER';

export type ManagementType = 
  | 'CENTRAL_GOVT'
  | 'STATE_GOVT'
  | 'GOVT_AIDED'
  | 'GOVERNMENT'
  | 'GOVERNMENT_AIDED'
  | 'PRIVATE_UNAIDED'
  | 'PRIVATE_DEEMED'
  | 'PUBLIC_PRIVATE_PARTNERSHIP'
  | 'UNIVERSITY_MANAGED'
  | 'OTHER';

export type InstitutionStatus = 
  | 'ACTIVE'
  | 'PENDING_VERIFICATION'
  | 'PENDING_REVIEW'
  | 'INACTIVE'
  | 'ARCHIVED';

export interface IndiaState {
  id: string; // e.g. 'TN'
  name: string; // e.g. 'Tamil Nadu'
  type: 'STATE' | 'UT' | 'UNION_TERRITORY';
  code?: string;
  totalDistricts?: number;
  districtsCount?: number;
  institutionsCount?: number;
}

export interface IndiaDistrict {
  id: string; // e.g. 'TN-COI'
  name: string; // e.g. 'Coimbatore'
  stateId: string; // e.g. 'TN'
  headquarters?: string;
  stateName?: string;
  institutionsCount?: number;
}

export interface Institution {
  id: string;
  aisheCode?: string | null; // e.g. 'C-41046', 'U-0456'
  name: string; // Official Canonical Full Name
  shortName?: string; // e.g. 'PSG Tech', 'IIT Madras'
  slug: string; // e.g. 'psg-college-of-technology'
  institutionType: InstitutionType;
  institutionCategory: InstitutionCategory;
  managementType: ManagementType;
  universityName?: string;
  affiliatingUniversity?: string;
  affiliatedUniversityId?: string;
  stateId: string;
  stateName: string;
  districtId?: string;
  districtName?: string;
  city: string;
  address?: string;
  pincode?: string;
  website?: string;
  email?: string;
  phone?: string;
  establishedYear?: number;
  accreditation?: string; // e.g. 'NAAC A++ Grade'
  nirfRank?: number | null; // e.g. 63
  studentCount?: number;
  mentorCount?: number;
  eventCount?: number;
  ambassadorCount?: number;
  tags?: string[];
  searchAliases: string[];
  verified: boolean;
  status: InstitutionStatus;
  source?: 'AISHE_DIRECTORY' | 'NSP_REGISTRY' | 'USER_REQUEST' | 'MANUAL_VERIFIED';
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionSearchFilters {
  query?: string;
  stateId?: string;
  districtId?: string;
  city?: string;
  institutionType?: InstitutionType | 'ALL';
  institutionCategory?: InstitutionCategory | 'ALL';
  managementType?: ManagementType | 'ALL';
  verifiedOnly?: boolean;
  sortBy?: 'relevance' | 'nirf_rank' | 'name_asc' | 'name_desc' | 'students_desc';
  page?: number;
  limit?: number;
}

export interface InstitutionSearchResult {
  institutions: Institution[];
  items?: Institution[];
  total: number;
  page: number;
  limit?: number;
  totalPages: number;
  hasMore?: boolean;
}

export interface InstitutionRequestPayload {
  id?: string;
  name: string;
  shortName?: string;
  aisheCode?: string;
  institutionType: InstitutionType;
  institutionCategory?: InstitutionCategory;
  managementType?: ManagementType;
  stateId: string;
  stateName?: string;
  districtId?: string;
  districtName?: string;
  city: string;
  address?: string;
  pincode?: string;
  website?: string;
  requesterEmail?: string;
  requestedByUserId?: string;
  requestedByUserName?: string;
  notes?: string;
  status?: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  createdAt?: string;
}

export interface InstitutionHealthMetrics {
  totalInstitutions: number;
  verifiedCount: number;
  pendingRequestsCount: number;
  statesCovered: number;
  districtsCovered: number;
  byType: Record<string, number>;
  byState: Record<string, number>;
  qualityScore: number;
}
