import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { ACEEmptyState } from './ACEEmptyState';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
  className?: string;
}

export interface ACEDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKey?: keyof T;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
}

export function ACEDataTable<T>({
  data,
  columns,
  keyExtractor,
  searchable = true,
  searchPlaceholder = 'Search records...',
  searchKey,
  pageSize = 10,
  emptyTitle = 'No Records Found',
  emptyDescription = 'There are no items matching your criteria in the database.',
  onRowClick
}: ACEDataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filtered = data.filter(item => {
    if (!query) return true;
    if (searchKey) {
      const val = String(item[searchKey] || '').toLowerCase();
      return val.includes(query.toLowerCase());
    }
    return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortCol === null) return 0;
    const col = columns[sortCol];
    if (typeof col.accessor === 'function') return 0;
    const valA = a[col.accessor];
    const valB = b[col.accessor];
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (idx: number) => {
    if (sortCol === idx) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(idx);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            {sorted.length} total records
          </div>
        </div>
      )}

      {paginated.length === 0 ? (
        <ACEEmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      onClick={() => col.sortable && handleSort(idx)}
                      className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 select-none ${col.sortable ? 'cursor-pointer hover:text-indigo-600' : ''} ${col.className || ''}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.header}</span>
                        {col.sortable && sortCol === idx && (
                          sortAsc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {paginated.map(item => (
                  <tr
                    key={keyExtractor(item)}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/60 transition ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    {columns.map((col, idx) => (
                      <td key={idx} className={`px-5 py-3.5 text-slate-700 dark:text-slate-300 ${col.className || ''}`}>
                        {typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor] as any)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
