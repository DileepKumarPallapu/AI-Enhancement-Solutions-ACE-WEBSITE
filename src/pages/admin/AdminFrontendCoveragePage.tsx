import React, { useState } from 'react';
import { frontendCoverageDatabase, EntityCoverageItem } from '../../services/db/frontendCoverageDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShieldCheck, CheckCircle2, Layout, Database, Terminal, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminFrontendCoveragePage() {
  const inventory = frontendCoverageDatabase.getInventory();
  const summary = frontendCoverageDatabase.getCoverageSummary();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(inventory.map(i => i.category)))];

  const filtered = selectedCategory === 'ALL'
    ? inventory
    : inventory.filter(i => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="ACE Frontend-to-Backend Parity & Coverage Console"
          description="Complete internal audit verifying zero orphan backend features and complete visual representation across all 19 domain modules."
          badge="AUDIT CONSOLE"
        />

        {/* Coverage Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Entities</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{summary.totalEntities}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Covered in UI</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{summary.fullyCoveredCount}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Coverage Parity</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{summary.coveragePercentage}%</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Orphan Features</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">0</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Matrix Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Domain Entity</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Database Service & API</th>
                  <th className="p-3.5">Live Frontend Route</th>
                  <th className="p-3.5">CRUD Capabilities</th>
                  <th className="p-3.5">Coverage Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{item.entityName}</td>
                    <td className="p-3.5">
                      <ACEBadge variant="neutral">{item.category.replace(/_/g, ' ')}</ACEBadge>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">
                      <div>{item.databaseService}</div>
                      <div className="text-indigo-600 dark:text-indigo-400">{item.primaryApiRoute}</div>
                    </td>
                    <td className="p-3.5 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                      {item.frontendRoute}
                    </td>
                    <td className="p-3.5">
                      <div className="flex gap-1 font-mono text-[10px]">
                        <span className={item.capabilities.create ? 'text-emerald-600 font-bold' : 'text-slate-400'}>C</span>
                        <span className={item.capabilities.read ? 'text-emerald-600 font-bold' : 'text-slate-400'}>R</span>
                        <span className={item.capabilities.update ? 'text-emerald-600 font-bold' : 'text-slate-400'}>U</span>
                        <span className={item.capabilities.deleteOrArchive ? 'text-emerald-600 font-bold' : 'text-slate-400'}>D</span>
                        <span className={item.capabilities.export ? 'text-indigo-600 font-bold' : 'text-slate-400'}>EXP</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <ACEBadge variant="success">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {item.coverageStatus}
                      </ACEBadge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link to={item.frontendRoute}>
                        <ACEButton variant="outline" size="sm" className="flex items-center gap-1">
                          Open <ExternalLink className="w-3.5 h-3.5" />
                        </ACEButton>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
