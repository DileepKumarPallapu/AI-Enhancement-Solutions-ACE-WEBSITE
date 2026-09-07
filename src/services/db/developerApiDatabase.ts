export interface ApiKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  hashedSecret: string;
  scopes: string[];
  rateLimitPerMin: number;
  createdAt: string;
  lastUsedAt?: string;
  isActive: boolean;
}

export interface WebhookSubscription {
  id: string;
  targetUrl: string;
  events: string[];
  secretKey: string;
  isActive: boolean;
  totalDeliveries: number;
  lastDeliveryStatus?: 'SUCCESS' | 'FAILED';
  createdAt: string;
}

const STORAGE_KEY_APIKEYS = 'ace_70x_api_keys';
const STORAGE_KEY_WEBHOOKS = 'ace_70x_webhooks';

export const developerApiDatabase = {
  getApiKeys(): ApiKeyItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_APIKEYS);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: ApiKeyItem[] = [
      {
        id: 'key-prod-1',
        name: 'Vel Tech SIS Integration Key',
        keyPrefix: 'ace_live_vt99',
        hashedSecret: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        scopes: ['read:students', 'read:events', 'write:attendance'],
        rateLimitPerMin: 120,
        createdAt: '2026-08-15T10:00:00Z',
        lastUsedAt: '2026-09-07T18:30:00Z',
        isActive: true
      }
    ];
    this.saveApiKeys(defaults);
    return defaults;
  },

  saveApiKeys(keys: ApiKeyItem[]) {
    try {
      localStorage.setItem(STORAGE_KEY_APIKEYS, JSON.stringify(keys));
    } catch {}
  },

  createApiKey(name: string, scopes: string[]): { item: ApiKeyItem; rawKey: string } {
    const keys = this.getApiKeys();
    const rawSecret = `sec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const prefix = `ace_live_${Math.random().toString(36).substring(2, 6)}`;
    const fullKey = `${prefix}_${rawSecret}`;

    const newItem: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name,
      keyPrefix: prefix,
      hashedSecret: `sha256:${rawSecret}`,
      scopes,
      rateLimitPerMin: 100,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    keys.unshift(newItem);
    this.saveApiKeys(keys);
    return { item: newItem, rawKey: fullKey };
  },

  getWebhooks(): WebhookSubscription[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_WEBHOOKS);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: WebhookSubscription[] = [
      {
        id: 'wh-1',
        targetUrl: 'https://api.veltech.edu.in/webhooks/ace-events',
        events: ['application.status_changed', 'offer.created', 'certificate.issued'],
        secretKey: 'whsec_veltech_prod_9921',
        isActive: true,
        totalDeliveries: 284,
        lastDeliveryStatus: 'SUCCESS',
        createdAt: '2026-08-20T09:00:00Z'
      }
    ];
    this.saveWebhooks(defaults);
    return defaults;
  },

  saveWebhooks(webhooks: WebhookSubscription[]) {
    try {
      localStorage.setItem(STORAGE_KEY_WEBHOOKS, JSON.stringify(webhooks));
    } catch {}
  },

  createWebhook(targetUrl: string, events: string[]): WebhookSubscription {
    const webhooks = this.getWebhooks();
    const newWh: WebhookSubscription = {
      id: `wh-${Date.now()}`,
      targetUrl,
      events,
      secretKey: `whsec_${Math.random().toString(36).substring(2, 12)}`,
      isActive: true,
      totalDeliveries: 0,
      createdAt: new Date().toISOString()
    };
    webhooks.unshift(newWh);
    this.saveWebhooks(webhooks);
    return newWh;
  }
};
