// ACE 90X Real-Time Direct Messaging Database
// Supports 1-to-1, group, mentor, team, and club channels with replies, reactions, file attachments, and block-security

export interface MessageReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  fileType: string;
  sizeBytes: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRoleBadge?: string;
  content: string;
  replyToMessageId?: string;
  replyToSnippet?: string;
  attachments: MessageAttachment[];
  reactions: MessageReaction[];
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ChatConversation {
  id: string;
  type: 'DIRECT' | 'GROUP' | 'MENTOR' | 'TEAM' | 'CLUB';
  title: string;
  avatarUrl: string;
  participants: {
    userId: string;
    userName: string;
    userAvatar: string;
    role?: string;
  }[];
  lastMessageSnippet: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
}

const CONVERSATIONS_STORAGE = 'ace_db_conversations_v90';
const MESSAGES_STORAGE = 'ace_db_messages_v90';

class DirectMessagingDatabase {
  private conversations: Map<string, ChatConversation> = new Map();
  private messages: Map<string, ChatMessage[]> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.conversations.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawConv = localStorage.getItem(CONVERSATIONS_STORAGE);
        if (rawConv) {
          const convs: ChatConversation[] = JSON.parse(rawConv);
          convs.forEach(c => this.conversations.set(c.id, c));
        }
        const rawMsg = localStorage.getItem(MESSAGES_STORAGE);
        if (rawMsg) {
          const mapData: Record<string, ChatMessage[]> = JSON.parse(rawMsg);
          Object.entries(mapData).forEach(([k, v]) => this.messages.set(k, v));
        }
      }
    } catch (e) {
      console.warn('Failed to load messaging storage', e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(CONVERSATIONS_STORAGE, JSON.stringify(Array.from(this.conversations.values())));
        const mapObj: Record<string, ChatMessage[]> = {};
        this.messages.forEach((msgs, convId) => {
          mapObj[convId] = msgs;
        });
        localStorage.setItem(MESSAGES_STORAGE, JSON.stringify(mapObj));
      }
      this.listeners.forEach(fn => fn());
    } catch (e) {
      console.warn('Failed to save messaging storage', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const seedConvs: ChatConversation[] = [
      {
        id: 'conv_mentor_aravind',
        type: 'MENTOR',
        title: 'Dr. Aravind Swaminathan (Faculty Mentor)',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        participants: [
          { userId: 'usr_student_dileep', userName: 'Dileep Kumar', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
          { userId: 'mentor_dr_aravind', userName: 'Dr. Aravind Swaminathan', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', role: 'Faculty Mentor' }
        ],
        lastMessageSnippet: 'Reviewed your SIH 2026 AI architecture paper. Let us schedule a mock review session.',
        lastMessageTimestamp: '2026-03-05T14:30:00Z',
        unreadCount: 1,
        isPinned: true,
        isMuted: false
      },
      {
        id: 'conv_team_neural_core',
        type: 'TEAM',
        title: 'NeuralCore Squad • SIH 2026 Team',
        avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
        participants: [
          { userId: 'usr_student_dileep', userName: 'Dileep Kumar', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
          { userId: 'usr_student_priya', userName: 'Priya Sundaram', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
          { userId: 'usr_student_karthik', userName: 'Karthik Raja', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
        ],
        lastMessageSnippet: 'Pushed the Ed25519 cryptographic token verification branch to GitHub repo.',
        lastMessageTimestamp: '2026-03-06T11:15:00Z',
        unreadCount: 0,
        isPinned: true,
        isMuted: false
      },
      {
        id: 'conv_direct_priya',
        type: 'DIRECT',
        title: 'Priya Sundaram',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        participants: [
          { userId: 'usr_student_dileep', userName: 'Dileep Kumar', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
          { userId: 'usr_student_priya', userName: 'Priya Sundaram', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
        ],
        lastMessageSnippet: 'Are we submitting the project report by Friday 5 PM?',
        lastMessageTimestamp: '2026-03-06T09:40:00Z',
        unreadCount: 0,
        isPinned: false,
        isMuted: false
      }
    ];

    seedConvs.forEach(c => this.conversations.set(c.id, c));

    const seedMentorMsgs: ChatMessage[] = [
      {
        id: 'msg_1',
        conversationId: 'conv_mentor_aravind',
        senderId: 'usr_student_dileep',
        senderName: 'Dileep Kumar',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        content: 'Good morning Dr. Aravind, I have uploaded our autonomous agent architecture diagram and test verification logs for your review.',
        attachments: [
          { id: 'att_1', name: 'Agent_Architecture_v80X.pdf', url: 'https://veltech.edu.in/docs/agent.pdf', fileType: 'application/pdf', sizeBytes: 2450000 }
        ],
        reactions: [{ emoji: '👍', userId: 'mentor_dr_aravind', userName: 'Dr. Aravind' }],
        isRead: true,
        createdAt: '2026-03-05T10:00:00Z'
      },
      {
        id: 'msg_2',
        conversationId: 'conv_mentor_aravind',
        senderId: 'mentor_dr_aravind',
        senderName: 'Dr. Aravind Swaminathan',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        senderRoleBadge: 'Faculty Mentor',
        content: 'Reviewed your SIH 2026 AI architecture paper. Let us schedule a mock review session.',
        attachments: [],
        reactions: [{ emoji: '🎉', userId: 'usr_student_dileep', userName: 'Dileep Kumar' }],
        isRead: false,
        createdAt: '2026-03-05T14:30:00Z'
      }
    ];

    const seedTeamMsgs: ChatMessage[] = [
      {
        id: 'msg_3',
        conversationId: 'conv_team_neural_core',
        senderId: 'usr_student_karthik',
        senderName: 'Karthik Raja',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        content: 'I have set up Docker containers and verified cloud deployment pipelines.',
        attachments: [],
        reactions: [{ emoji: '🚀', userId: 'usr_student_dileep', userName: 'Dileep Kumar' }],
        isRead: true,
        createdAt: '2026-03-06T10:00:00Z'
      },
      {
        id: 'msg_4',
        conversationId: 'conv_team_neural_core',
        senderId: 'usr_student_dileep',
        senderName: 'Dileep Kumar',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        content: 'Pushed the Ed25519 cryptographic token verification branch to GitHub repo.',
        attachments: [],
        reactions: [{ emoji: '💯', userId: 'usr_student_priya', userName: 'Priya Sundaram' }],
        isRead: true,
        createdAt: '2026-03-06T11:15:00Z'
      }
    ];

    this.messages.set('conv_mentor_aravind', seedMentorMsgs);
    this.messages.set('conv_team_neural_core', seedTeamMsgs);
    this.messages.set('conv_direct_priya', []);
    this.saveToStorage();
  }

  public getConversations(userId: string = 'usr_student_dileep'): ChatConversation[] {
    return Array.from(this.conversations.values()).filter(c => 
      c.participants.some(p => p.userId === userId)
    );
  }

  public getMessages(conversationId: string): ChatMessage[] {
    return this.messages.get(conversationId) || [];
  }

  public sendMessage(conversationId: string, content: string, replyToMessageId?: string, attachments: MessageAttachment[] = []): ChatMessage {
    const conv = this.conversations.get(conversationId);
    if (!conv) throw new Error('Conversation not found');

    let replyToSnippet: string | undefined;
    if (replyToMessageId) {
      const msgs = this.messages.get(conversationId) || [];
      const target = msgs.find(m => m.id === replyToMessageId);
      if (target) {
        replyToSnippet = target.content.substring(0, 50) + (target.content.length > 50 ? '...' : '');
      }
    }

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId: 'usr_student_dileep',
      senderName: 'Dileep Kumar',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      content,
      replyToMessageId,
      replyToSnippet,
      attachments,
      reactions: [],
      isRead: true,
      createdAt: new Date().toISOString()
    };

    const currentMsgs = this.messages.get(conversationId) || [];
    currentMsgs.push(newMsg);
    this.messages.set(conversationId, currentMsgs);

    conv.lastMessageSnippet = content;
    conv.lastMessageTimestamp = newMsg.createdAt;
    this.conversations.set(conv.id, conv);

    this.saveToStorage();
    return newMsg;
  }

  public toggleReaction(conversationId: string, messageId: string, emoji: string): boolean {
    const msgs = this.messages.get(conversationId) || [];
    const msg = msgs.find(m => m.id === messageId);
    if (!msg) return false;

    const existingIdx = msg.reactions.findIndex(r => r.userId === 'usr_student_dileep' && r.emoji === emoji);
    if (existingIdx >= 0) {
      msg.reactions.splice(existingIdx, 1);
    } else {
      msg.reactions.push({
        emoji,
        userId: 'usr_student_dileep',
        userName: 'Dileep Kumar'
      });
    }

    this.saveToStorage();
    return true;
  }
}

export const directMessagingDatabase = new DirectMessagingDatabase();
