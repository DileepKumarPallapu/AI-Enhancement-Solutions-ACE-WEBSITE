import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Search,
  Building2,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Filter,
  PlusCircle,
  Award,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { institutionDatabase } from '../../services/db/institutionDatabase';
import { Institution, InstitutionType } from '../../types/institution';
import { RequestInstitutionModal } from './RequestInstitutionModal';

interface InstitutionSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (institution: Institution) => void;
  selectedId?: string;
  selectedName?: string;
  title?: string;
}

export const InstitutionSelectorModal: React.FC<InstitutionSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedId,
  selectedName,
  title = 'Select Your Institution'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [page, setPage] = useState(1);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const states = useMemo(() => institutionDatabase.getAllStates(), []);
  const districts = useMemo(() => {
    if (!selectedState) return [];
    return institutionDatabase.getDistrictsByState(selectedState);
  }, [selectedState]);

  // Execute search
  const searchResult = useMemo(() => {
    if (!isOpen) return { institutions: [], total: 0, page: 1, totalPages: 1, hasMore: false };

    return institutionDatabase.searchInstitutions({
      query: debouncedQuery,
      stateId: selectedState || undefined,
      districtId: selectedDistrict || undefined,
      institutionType: selectedType !== 'ALL' ? (selectedType as InstitutionType) : undefined,
      page,
      limit: 20
    });
  }, [isOpen, debouncedQuery, selectedState, selectedDistrict, selectedType, page]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div className="bg-card border border-border rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
          {/* Modal Header */}
          <div className="p-5 border-b border-border bg-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{title}</h3>
                <p className="text-xs text-muted-foreground">
                  Search across verified colleges and universities across all 36 States & UTs in India.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 border-b border-border bg-card space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by college name, short code (e.g. PSG, IITM), AISHE code, or city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* State Filter */}
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('');
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All States & UTs (India)</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>

              {/* District Filter */}
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setPage(1);
                }}
                disabled={!selectedState || districts.length === 0}
                className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              >
                <option value="">All Districts</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">All Types</option>
                <option value="COLLEGE">Colleges</option>
                <option value="UNIVERSITY">Universities</option>
                <option value="INSTITUTE">Institutes (IIT/NIT/IIIT)</option>
                <option value="STANDALONE">Standalone</option>
              </select>
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 min-h-[300px]">
            {searchResult.institutions.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-foreground">No matching institutions found</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  We couldn't find an institution matching &quot;{searchQuery}&quot;. You can request to add your college now.
                </p>
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(true)}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  Request to Add Institution
                </button>
              </div>
            ) : (
              searchResult.institutions.map((inst) => {
                const isSelected = selectedId === inst.id || selectedName === inst.name;
                return (
                  <div
                    key={inst.id}
                    onClick={() => {
                      onSelect(inst);
                      onClose();
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`p-2.5 rounded-xl flex-shrink-0 mt-0.5 ${
                          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-foreground text-sm truncate">{inst.name}</h4>
                          {inst.verified && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                          {inst.aisheCode && (
                            <span className="px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-mono">
                              AISHE: {inst.aisheCode}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            {inst.city}, {inst.stateName}
                          </span>
                          <span className="text-muted-foreground/60">•</span>
                          <span>{inst.institutionCategory.replace(/_/g, ' ')}</span>
                          {inst.nirfRank && (
                            <>
                              <span className="text-muted-foreground/60">•</span>
                              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                                <Award className="w-3 h-3" />
                                NIRF #{inst.nirfRank}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-border bg-muted/40 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Showing {searchResult.institutions.length} of {searchResult.total} institutions</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRequestModalOpen(true)}
                className="text-primary hover:underline font-medium flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Can't find your college?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Institution Sub-Modal */}
      <RequestInstitutionModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        prefillName={searchQuery}
      />
    </>
  );
};
