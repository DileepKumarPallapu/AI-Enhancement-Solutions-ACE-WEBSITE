import React, { useState } from 'react';
import { portfolioBuilderDatabase, PortfolioConfig } from '../../services/db/portfolioBuilderDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Layout, Palette, Globe, CheckCircle2, Save } from 'lucide-react';

export function PortfolioBuilderPage() {
  const [config, setConfig] = useState<PortfolioConfig>(portfolioBuilderDatabase.getPortfolioConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    portfolioBuilderDatabase.savePortfolioConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Student Public Portfolio Builder"
          description="Curate showcased engineering projects, verified badges, and customizable themes for public employer discovery."
          badge="PORTFOLIO BUILDER"
        />

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Portfolio configuration saved and published to /u/{config.slug}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <ACECard title="Portfolio Identity & Headline">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={(e) => setConfig({ ...config, headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Biography & Engineering Focus
                </label>
                <textarea
                  rows={3}
                  value={config.bio}
                  onChange={(e) => setConfig({ ...config, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </ACECard>

          <ACECard title="Theme & Visibility Settings">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Portfolio Theme
                </label>
                <select
                  value={config.theme}
                  onChange={(e: any) => setConfig({ ...config, theme: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="INDIGO_MINIMAL">Indigo Minimal</option>
                  <option value="OBSIDIAN_PRO">Obsidian Pro</option>
                  <option value="CLEAN_LIGHT">Clean Light</option>
                  <option value="CYBER_EMERALD">Cyber Emerald</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Visibility Level
                </label>
                <select
                  value={config.visibility}
                  onChange={(e: any) => setConfig({ ...config, visibility: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="PUBLIC">Public (Discoverable)</option>
                  <option value="UNLISTED">Unlisted (Direct Link Only)</option>
                  <option value="PRIVATE">Private (Restricted)</option>
                </select>
              </div>
            </div>
          </ACECard>

          <div className="flex justify-end">
            <ACEButton variant="primary" size="md" className="flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Portfolio Configuration
            </ACEButton>
          </div>
        </form>

      </div>
    </div>
  );
}
