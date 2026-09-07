import React, { useState } from 'react';
import { knowledgeHubDatabase, KnowledgeArticle } from '../../services/db/knowledgeHubDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { BookOpen, Search, ArrowRight } from 'lucide-react';

export function KnowledgeHubPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');

  const articles = knowledgeHubDatabase.searchArticles(search, category);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="ACE Knowledge Hub"
          description="Official engineering career frameworks, digital identity policies, and campus technology guides."
          badge="KNOWLEDGE HUB"
        />

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search official guides, career roadmaps, or policies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['ALL', 'CAREER', 'GUIDE', 'FAQ', 'LEARNING'].map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  category === c
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a) => (
            <div key={a.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <ACEBadge variant="primary">{a.category}</ACEBadge>
                  <span className="text-xs text-slate-500">{a.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{a.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">{a.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {a.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>{a.author}</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
