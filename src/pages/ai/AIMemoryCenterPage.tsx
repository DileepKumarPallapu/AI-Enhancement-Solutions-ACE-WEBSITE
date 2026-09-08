import React, { useState } from 'react';
import { aiMemoryDatabase, AiMemoryItem, MemoryCategory } from '../../services/db/aiMemoryDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Brain, Trash2, Plus, CheckCircle2, Shield, Info } from 'lucide-react';

export function AIMemoryCenterPage() {
  const [memories, setMemories] = useState<AiMemoryItem[]>(aiMemoryDatabase.getAllMemories());
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [category, setCategory] = useState<MemoryCategory>('CAREER_GOAL');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [whyUseful, setWhyUseful] = useState('');

  const handleDelete = (id: string) => {
    aiMemoryDatabase.deleteMemory(id);
    setMemories(aiMemoryDatabase.getAllMemories());
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all stored AI preferences?')) {
      aiMemoryDatabase.clearAllMemories();
      setMemories([]);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    aiMemoryDatabase.addMemory(category, title, content, whyUseful || 'Custom user preference');
    setMemories(aiMemoryDatabase.getAllMemories());
    setShowAddModal(false);
    setTitle('');
    setContent('');
    setWhyUseful('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="Transparent AI Memory Center"
          description="View, edit, and control all preferences remembered by ACE AI. Zero hidden profiling."
          badge="USER CONSENT & PRIVACY CONTROL"
          actions={
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-700 transition"
              >
                <Plus className="w-4 h-4" /> Add Preference
              </button>
              {memories.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-bold border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition"
                >
                  Clear All
                </button>
              )}
            </div>
          }
        />

        {/* Information Callout */}
        <ACECard className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            ACE AI uses these explicitly consented memory items solely to ground personalized career guidance, recommendation rankings, and teammate match scoring. You retain complete ownership to delete or edit them at any moment.
          </p>
        </ACECard>

        {/* Memories List */}
        <div className="space-y-4">
          {memories.length === 0 ? (
            <ACECard className="p-12 text-center text-slate-400 text-xs font-bold">
              No memories stored. Click "Add Preference" to teach ACE your career focus.
            </ACECard>
          ) : (
            memories.map(mem => (
              <ACECard key={mem.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-mono">
                        {mem.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Updated: {new Date(mem.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{mem.title}</h4>
                  </div>
                  <button
                    onClick={() => handleDelete(mem.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    title="Delete Memory"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                  {mem.content}
                </p>

                <div className="text-[11px] text-slate-400">
                  <span className="font-bold text-indigo-500">Why ACE uses this: </span>{mem.whyUseful}
                </div>
              </ACECard>
            ))
          )}
        </div>

        {/* Add Memory Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <ACECard className="max-w-md w-full p-6 space-y-4 animate-scaleUp">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" /> Add Consented AI Preference
              </h3>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                  >
                    <option value="CAREER_GOAL">Career Goal & Target Roles</option>
                    <option value="TECH_PREFERENCE">Preferred Technologies & Stacks</option>
                    <option value="LOCATION_PREFERENCE">Location Preferences</option>
                    <option value="LEARNING_STYLE">Learning Style & Format</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Target Role: Full Stack AI Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Content / Details</label>
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="e.g. Focus on TypeScript, Python, and PyTorch for Autonomous Agents."
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Why Useful</label>
                  <input
                    type="text"
                    value={whyUseful}
                    onChange={e => setWhyUseful(e.target.value)}
                    placeholder="e.g. Enhances hackathon team and role recommendations."
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
                  >
                    Save Preference
                  </button>
                </div>
              </form>
            </ACECard>
          </div>
        )}

      </div>
    </div>
  );
}
