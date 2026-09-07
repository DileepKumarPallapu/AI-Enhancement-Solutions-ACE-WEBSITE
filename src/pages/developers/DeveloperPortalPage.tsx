import React, { useState } from 'react';
import { developerApiDatabase, ApiKeyItem, WebhookSubscription } from '../../services/db/developerApiDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Key, Webhook, Code, Copy, CheckCircle2, Shield } from 'lucide-react';

export function DeveloperPortalPage() {
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(developerApiDatabase.getApiKeys());
  const [webhooks, setWebhooks] = useState<WebhookSubscription[]>(developerApiDatabase.getWebhooks());
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const res = developerApiDatabase.createApiKey(newKeyName, ['read:students', 'read:events']);
    setApiKeys(developerApiDatabase.getApiKeys());
    setGeneratedKey(res.rawKey);
    setNewKeyName('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="ACE Developer Platform & API Engine"
          description="Build custom integrations, student information system (SIS) syncs, and event automations with secure API keys and webhook streams."
          badge="DEVELOPER PLATFORM"
        />

        {/* API Key Creation Form */}
        <ACECard title="API Keys & Authentication">
          <div className="space-y-4">
            {generatedKey && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> API Key Generated (Copy Now - Won't be shown again)
                </div>
                <div className="font-mono text-xs text-emerald-950 dark:text-emerald-100 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg break-all">
                  {generatedKey}
                </div>
              </div>
            )}

            <form onSubmit={handleCreateKey} className="flex gap-3">
              <input
                type="text"
                placeholder="Key Name (e.g., Campus ERP Sync)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <ACEButton variant="primary" size="md">
                Generate Live Key
              </ACEButton>
            </form>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {apiKeys.map((k) => (
                <div key={k.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{k.name}</div>
                    <div className="font-mono text-xs text-slate-500">{k.keyPrefix}... • Rate limit: {k.rateLimitPerMin} req/min</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ACEBadge variant="success">ACTIVE</ACEBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ACECard>

        {/* Webhooks Manager */}
        <ACECard title="Webhook Subscriptions">
          <div className="space-y-3">
            {webhooks.map((wh) => (
              <div key={wh.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">{wh.targetUrl}</div>
                  <div className="text-xs text-slate-500 mt-1">Events: {wh.events.join(', ')}</div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{wh.totalDeliveries} Deliveries</div>
                  <div className="text-slate-400">Status: {wh.lastDeliveryStatus}</div>
                </div>
              </div>
            ))}
          </div>
        </ACECard>

      </div>
    </div>
  );
}
