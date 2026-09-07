import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  CheckCircle2,
  XCircle,
  Plus,
  Upload,
  Download,
  Filter,
  Trash2,
  Edit2,
  AlertCircle,
  Clock,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';
import { institutionDatabase } from '../../services/db/institutionDatabase';
import { Institution, InstitutionType, ManagementType } from '../../types/institution';

export const AdminInstitutionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'requests' | 'import_export'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  // New Institution Form Modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newShortName, setNewShortName] = useState('');
  const [newAishe, setNewAishe] = useState('');
  const [newType, setNewType] = useState<InstitutionType>('COLLEGE');
  const [newStateId, setNewStateId] = useState('TN');
  const [newCity, setNewCity] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newNirf, setNewNirf] = useState('');

  // Bulk Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const states = useMemo(() => institutionDatabase.getAllStates(), []);

  const searchResult = useMemo(() => {
    return institutionDatabase.searchInstitutions({
      query: searchQuery,
      stateId: selectedState || undefined,
      institutionType: selectedType !== 'ALL' ? (selectedType as InstitutionType) : undefined,
      page,
      limit: 25
    });
  }, [searchQuery, selectedState, selectedType, page, refreshKey]);

  const requests = useMemo(() => {
    return institutionDatabase.getInstitutionRequests();
  }, [refreshKey]);

  const metrics = useMemo(() => {
    return institutionDatabase.getInstitutionHealthMetrics();
  }, [refreshKey]);

  const handleCreateInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCity.trim()) return;

    institutionDatabase.createInstitution({
      name: newName.trim(),
      shortName: newShortName.trim() || undefined,
      aisheCode: newAishe.trim() ? newAishe.trim().toUpperCase() : undefined,
      institutionType: newType,
      stateId: newStateId,
      city: newCity.trim(),
      website: newWebsite.trim() || undefined,
      nirfRank: newNirf ? parseInt(newNirf, 10) : undefined,
      verified: true
    });

    setIsAddOpen(false);
    setNewName('');
    setNewShortName('');
    setNewAishe('');
    setNewCity('');
    setNewWebsite('');
    setNewNirf('');
    setRefreshKey((k) => k + 1);
  };

  const handleApproveRequest = (requestId: string) => {
    institutionDatabase.approveInstitutionRequest(requestId, 'SuperAdmin');
    setRefreshKey((k) => k + 1);
  };

  const handleRejectRequest = (requestId: string) => {
    institutionDatabase.rejectInstitutionRequest(requestId, 'Information unverifiable or duplicate');
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this institution?')) {
      institutionDatabase.deleteInstitution(id);
      setRefreshKey((k) => k + 1);
    }
  };

  const handleExportCSV = () => {
    const csv = institutionDatabase.exportInstitutionsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ace_institutions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const json = institutionDatabase.exportInstitutionsJSON();
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ace_institutions_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!Array.isArray(parsed)) {
        setImportStatus({ msg: 'Import JSON must be an array of institution objects', type: 'error' });
        return;
      }
      const res = institutionDatabase.importInstitutions(parsed, 'merge');
      setImportStatus({
        msg: `Successfully processed! Imported: ${res.imported}, Updated: ${res.updated}, Skipped: ${res.skipped}`,
        type: 'success'
      });
      setRefreshKey((k) => k + 1);
      setImportJsonText('');
    } catch (err: any) {
      setImportStatus({ msg: `Failed to parse JSON: ${err.message}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Header */}
      <div className="border-b border-border bg-card py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Institution Directory Management</h1>
              <p className="text-xs text-muted-foreground">
                Manage India-wide colleges, universities, verification requests, and AISHE mappings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Institution</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="text-xs text-muted-foreground">Total Institutions</div>
            <div className="text-2xl font-bold text-foreground mt-1">{metrics.totalInstitutions}</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="text-xs text-muted-foreground">Verified</div>
            <div className="text-2xl font-bold text-emerald-500 mt-1">{metrics.verifiedCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="text-xs text-muted-foreground">States Covered</div>
            <div className="text-2xl font-bold text-indigo-500 mt-1">{metrics.statesCovered} / 36</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="text-xs text-muted-foreground">Pending Requests</div>
            <div className="text-2xl font-bold text-amber-500 mt-1">{metrics.pendingRequestsCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border col-span-2 sm:col-span-1">
            <div className="text-xs text-muted-foreground">Data Quality Score</div>
            <div className="text-2xl font-bold text-primary mt-1">{metrics.qualityScore}%</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'directory'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            All Institutions ({metrics.totalInstitutions})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Verification Queue</span>
            {metrics.pendingRequestsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {metrics.pendingRequestsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('import_export')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'import_export'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Bulk Import / Export</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Directory */}
      {activeTab === 'directory' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, AISHE code, acronym, or city..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All States / UTs</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

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
              <option value="INSTITUTE">Institutes</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                  <tr>
                    <th className="p-3.5">Institution</th>
                    <th className="p-3.5">AISHE Code</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Type / Category</th>
                    <th className="p-3.5">NIRF</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {searchResult.institutions.map((inst) => (
                    <tr key={inst.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-foreground">{inst.name}</div>
                        {inst.shortName && (
                          <div className="text-[11px] text-muted-foreground font-mono">{inst.shortName}</div>
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-foreground font-medium">
                        {inst.aisheCode || <span className="text-muted-foreground/60 italic">Unassigned</span>}
                      </td>
                      <td className="p-3.5">
                        <div className="text-foreground">{inst.city}</div>
                        <div className="text-[11px] text-muted-foreground">{inst.stateName}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-md bg-muted text-foreground text-[10px] font-semibold">
                          {inst.institutionType}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {inst.nirfRank ? (
                          <span className="text-amber-600 dark:text-amber-400 font-bold">#{inst.nirfRank}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {inst.verified ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="text-amber-500 text-[11px]">Unverified</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDelete(inst.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete Institution"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-3.5 border-t border-border bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Showing {searchResult.institutions.length} of {searchResult.total}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 rounded-lg border border-border bg-card text-foreground disabled:opacity-40"
                >
                  Prev
                </button>
                <span>
                  {page} / {searchResult.totalPages}
                </span>
                <button
                  disabled={page >= searchResult.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 rounded-lg border border-border bg-card text-foreground disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Requests */}
      {activeTab === 'requests' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-4">
          <h3 className="text-base font-bold text-foreground">User Submitted Institution Requests</h3>
          {requests.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-card border border-border text-muted-foreground text-xs">
              No pending institution verification requests.
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground text-sm">{r.name}</h4>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          r.status === 'PENDING_REVIEW'
                            ? 'bg-amber-500/10 text-amber-500'
                            : r.status === 'APPROVED'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-rose-500/10 text-rose-500'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span>{r.city}, {r.stateId}</span>
                      {r.aisheCode && <span className="ml-3 font-mono">AISHE: {r.aisheCode}</span>}
                      {r.requesterEmail && <span className="ml-3">By: {r.requesterEmail}</span>}
                    </div>
                  </div>

                  {r.status === 'PENDING_REVIEW' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveRequest(r.id || '')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectRequest(r.id || '')}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-semibold hover:bg-rose-500/20 transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Bulk Import & Export */}
      {activeTab === 'import_export' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Card */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base">Export Institution Registry</h3>
                  <p className="text-xs text-muted-foreground">Download the entire database in standard formats.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export as CSV
                </button>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-muted flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export as JSON
                </button>
              </div>
            </div>

            {/* Import Card */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base">Bulk JSON Import</h3>
                  <p className="text-xs text-muted-foreground">Paste valid JSON array with institution schema.</p>
                </div>
              </div>

              <textarea
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='[{"name": "New Institute", "stateId": "TN", "city": "Chennai", "aisheCode": "C-12345"}]'
                rows={4}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
              />

              {importStatus && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    importStatus.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-500'
                  }`}
                >
                  {importStatus.msg}
                </div>
              )}

              <button
                onClick={handleImportJSON}
                disabled={!importJsonText.trim()}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Run Import Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Institution Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-foreground text-lg">Add New Higher Education Institution</h3>
            <form onSubmit={handleCreateInstitution} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Full Institution Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Short Name</label>
                  <input
                    type="text"
                    value={newShortName}
                    onChange={(e) => setNewShortName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">AISHE Code</label>
                  <input
                    type="text"
                    value={newAishe}
                    onChange={(e) => setNewAishe(e.target.value)}
                    placeholder="e.g. C-41046"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">State / UT *</label>
                  <select
                    value={newStateId}
                    onChange={(e) => setNewStateId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                  >
                    {states.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">NIRF Rank</label>
                  <input
                    type="number"
                    value={newNirf}
                    onChange={(e) => setNewNirf(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Website</label>
                  <input
                    type="url"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90"
                >
                  Create Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
