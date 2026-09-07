import React, { useState, useEffect } from 'react';
import { savedOpportunitiesDatabase, SavedOpportunityItem } from '../../services/db/savedOpportunitiesDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton, ACEEmptyState } from '../../components/ui/ace';
import { Bookmark, Folder, Tag, Calendar, Trash2, Edit3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SavedOpportunitiesPage() {
  const [items, setItems] = useState<SavedOpportunityItem[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');

  useEffect(() => {
    setItems(savedOpportunitiesDatabase.getAll());
  }, []);

  const folders = ['ALL', ...Array.from(new Set(items.map(i => i.folder)))];

  const filteredItems = selectedFolder === 'ALL' ? items : items.filter(i => i.folder === selectedFolder);

  const handleDelete = (id: string) => {
    const updated = savedOpportunitiesDatabase.remove(id);
    setItems(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Saved Opportunities & Folders"
          description="Organize bookmarked internships, competitions, hackathons, and job postings with personal notes and deadline reminders."
          badge="SAVED HUB"
        />

        {/* Folder Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {folders.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedFolder === f
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {f === 'ALL' ? '📁 All Saved' : `📁 ${f}`}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <ACEEmptyState
            title="No Saved Opportunities"
            description="You have not saved any opportunities in this folder yet. Browse the opportunity marketplace to bookmark active openings."
            actionText="Discover Opportunities"
            onAction={() => window.location.href = '/opportunities'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <ACEBadge variant="primary">{item.category}</ACEBadge>
                    <span className="text-xs font-semibold text-slate-500">📁 {item.folder}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.provider} • {item.location}</p>
                  </div>
                  {item.stipendOrPrize && (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {item.stipendOrPrize}
                    </div>
                  )}
                  {item.notes && (
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs text-slate-600 dark:text-slate-300 italic">
                      "{item.notes}"
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Closes: {new Date(item.deadline).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link to="/opportunities">
                      <ACEButton variant="outline" size="sm">Apply</ACEButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
