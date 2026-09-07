// ACE Chat, Direct Messaging, and AI Assistant Conversation History Layer

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface SupportTicketRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCollege: string;
  subject: string;
  category: 'ACCOUNT' | 'VERIFICATION' | 'EVENT_ISSUE' | 'COIN_PAYOUT' | 'MENTORSHIP' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  messages: Array<{ sender: string; text: string; timestamp: string }>;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  DIRECT_MSGS: 'ace_chat_direct_msgs_v2',
  AI_CHAT_HISTORY: 'ace_ai_chat_conversations_v2',
  TICKETS: 'ace_support_tickets_v2'
};

class ChatDatabase {
  private directMessages: ChatMessage[] = [];
  private aiChatHistoryByUser: Record<string, AiChatMessage[]> = {};
  private supportTickets: SupportTicketRecord[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;

      const rawMsgs = localStorage.getItem(STORAGE_KEYS.DIRECT_MSGS);
      this.directMessages = rawMsgs ? JSON.parse(rawMsgs) : [];

      const rawAi = localStorage.getItem(STORAGE_KEYS.AI_CHAT_HISTORY);
      this.aiChatHistoryByUser = rawAi ? JSON.parse(rawAi) : {
        'usr_student_dileep': [
          {
            id: 'ai-msg-1',
            role: 'assistant',
            content: 'Hello Dileep! I am Ask ACE, your intelligent campus copilot. How can I assist you with hackathons, symposiums, or mentorship at Vel Tech today?',
            timestamp: '2026-09-02T09:00:00Z'
          }
        ]
      };

      const rawTickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
      this.supportTickets = rawTickets ? JSON.parse(rawTickets) : [];
    } catch (e) {
      console.error('[ChatDatabase] Hydration error:', e);
    }
  }

  private persist(key: string, data: any) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  // --- AI Chat History ---
  public getAiMessages(userId: string): AiChatMessage[] {
    return this.aiChatHistoryByUser[userId] || [];
  }

  public appendAiMessage(userId: string, role: 'user' | 'assistant' | 'system', content: string): AiChatMessage {
    if (!this.aiChatHistoryByUser[userId]) this.aiChatHistoryByUser[userId] = [];
    const msg: AiChatMessage = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      role,
      content,
      timestamp: new Date().toISOString()
    };
    this.aiChatHistoryByUser[userId].push(msg);
    this.persist(STORAGE_KEYS.AI_CHAT_HISTORY, this.aiChatHistoryByUser);
    return msg;
  }

  public clearAiHistory(userId: string): void {
    delete this.aiChatHistoryByUser[userId];
    this.persist(STORAGE_KEYS.AI_CHAT_HISTORY, this.aiChatHistoryByUser);
  }

  // --- Direct Messaging ---
  public getConversation(userId1: string, userId2: string): ChatMessage[] {
    return this.directMessages.filter(
      m => (m.senderId === userId1 && m.recipientId === userId2) || (m.senderId === userId2 && m.recipientId === userId1)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  public sendMessage(msg: Omit<ChatMessage, 'id' | 'timestamp' | 'isRead'>): ChatMessage {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    this.directMessages.push(newMsg);
    this.persist(STORAGE_KEYS.DIRECT_MSGS, this.directMessages);
    return newMsg;
  }

  // --- Support Tickets ---
  public createTicket(ticket: Omit<SupportTicketRecord, 'id' | 'status' | 'createdAt' | 'updatedAt'>): SupportTicketRecord {
    const now = new Date().toISOString();
    const newTicket: SupportTicketRecord = {
      ...ticket,
      id: `TCK-${Date.now().toString().slice(-6)}`,
      status: 'OPEN',
      createdAt: now,
      updatedAt: now
    };
    this.supportTickets.unshift(newTicket);
    this.persist(STORAGE_KEYS.TICKETS, this.supportTickets);
    return newTicket;
  }

  public getUserTickets(userId: string): SupportTicketRecord[] {
    return this.supportTickets.filter(t => t.userId === userId);
  }

  public getAllTickets(): SupportTicketRecord[] {
    return [...this.supportTickets];
  }
}

export const chatDb = new ChatDatabase();
