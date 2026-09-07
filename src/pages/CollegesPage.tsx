import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  MapPin,
  Award,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2,
  Filter,
  PlusCircle,
  ExternalLink,
  GraduationCap,
  Layers
} from 'lucide-react';
import { institutionDatabase } from '../services/db/institutionDatabase';
import { Institution, InstitutionType, ManagementType } from '../types/institution';
import { RequestInstitutionModal } from '../components/institution/RequestInstitutionModal';

export const CollegesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedManagement, setSelectedManagement] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'relevance' | 'nirf_rank' | 'name_asc' | 'students_desc'>('relevance');
  const [page, setPage] = useState(1);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const states = useMemo(() => institutionDatabase.getAllStates(), []);
  const districts = useMemo(() => {
    if (!selectedState) return [];
    return institutionDatabase.getDistrictsByState(selectedState);
  }, [selectedState]);

  const searchResult = useMemo(() => {
    return institutionDatabase.searchInstitutions({
      query: searchQuery,
      stateId: selectedState || undefined,
      districtId: selectedDistrict || undefined,
      institutionType: selectedType !== 'ALL' ? (selectedType as InstitutionType) : undefined,
      managementType: selectedManagement !== 'ALL' ? (selectedManagement as ManagementType) : undefined,
      sortBy,
      page,
      limit: 12
    });
  }, [searchQuery, selectedState, selectedDistrict, selectedType, selectedManagement, sortBy, page]);

  const metrics = useMemo(() => institutionDatabase.getInstitutionHealthMetrics(), []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pan-India Higher Education Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Explore Colleges & Universities Across India
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover verified IITs, NITs, Central & State Universities, and premier autonomous colleges across all 36 States & Union Territories.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
            <div className="p-4 rounded-2xl bg-card border border-border text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{metrics.totalInstitutions}+</div>
              <div className="text-xs text-muted-foreground mt-1">Verified Institutions</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{metrics.statesCovered}</div>
              <div className="text-xs text-muted-foreground mt-1">States & UTs</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-500">100%</div>
              <div className="text-xs text-muted-foreground mt-1">AISHE Mapped</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-500">50K+</div>
              <div className="text-xs text-muted-foreground mt-1">Students Connected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search and Filters Bar */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by college name, AISHE code (e.g. C-41046), short name (e.g. PSG, IITM), or city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-auto"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="nirf_rank">Sort: NIRF Ranking</option>
                <option value="name_asc">Sort: Name (A-Z)</option>
                <option value="students_desc">Sort: Student Body</option>
              </select>

              <button
                onClick={() => setIsRequestOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add College</span>
              </button>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-border">
            {/* State Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">State / UT</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('');
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All 36 States & UTs</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setPage(1);
                }}
                disabled={!selectedState || districts.length === 0}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              >
                <option value="">All Districts</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Institution Type Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Institution Type</label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">All Types</option>
                <option value="COLLEGE">Colleges</option>
                <option value="UNIVERSITY">Universities</option>
                <option value="INSTITUTE">Institutes (IIT/NIT/IIIT)</option>
                <option value="STANDALONE">Standalone Institutions</option>
              </select>
            </div>

            {/* Management Type */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Management</label>
              <select
                value={selectedManagement}
                onChange={(e) => {
                  setSelectedManagement(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">All Managements</option>
                <option value="CENTRAL_GOVT">Central Government</option>
                <option value="STATE_GOVT">State Government</option>
                <option value="GOVT_AIDED">Government Aided</option>
                <option value="PRIVATE_UNAIDED">Private (Self-Financed)</option>
                <option value="PRIVATE_DEEMED">Private Deemed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Showing {searchResult.institutions.length} of {searchResult.total} Institutions
            </h2>
            {selectedState && (
              <span className="text-xs text-primary font-medium">
                Filtered: {states.find((s) => s.id === selectedState)?.name}
              </span>
            )}
          </div>

          {searchResult.institutions.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No institutions match your search criteria</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Try searching for a different keyword, clearing location filters, or submit a request to add your institution.
              </p>
              <button
                onClick={() => setIsRequestOpen(true)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Submit Institution Request
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResult.institutions.map((inst) => (
                <div
                  key={inst.id}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Icon, AISHE code, Verified */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {inst.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        )}
                        {inst.nirfRank && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-semibold">
                            <Award className="w-3.5 h-3.5" />
                            NIRF #{inst.nirfRank}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Short name */}
                    <div>
                      <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors line-clamp-2">
                        {inst.name}
                      </h3>
                      {inst.shortName && (
                        <p className="text-xs font-semibold text-muted-foreground mt-0.5">{inst.shortName}</p>
                      )}
                    </div>

                    {/* Location & Details */}
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">
                          {inst.city}, {inst.stateName}
                        </span>
                      </div>
                      {inst.aisheCode && (
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <span className="text-muted-foreground/80">AISHE:</span>
                          <span className="text-foreground font-semibold">{inst.aisheCode}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{inst.institutionCategory.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats & Link */}
                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        {inst.mentorCount || 0} Mentors
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {inst.eventCount || 0} Events
                      </span>
                    </div>

                    <Link
                      to={`/college/${inst.slug}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-1"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {searchResult.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 transition-all"
              >
                Previous
              </button>
              <span className="text-xs text-muted-foreground px-3">
                Page {page} of {searchResult.totalPages}
              </span>
              <button
                disabled={page >= searchResult.totalPages}
                onClick={() => setPage((p) => Math.min(searchResult.totalPages, p + 1))}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      <RequestInstitutionModal
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
        prefillName={searchQuery}
      />
    </div>
  );
};
