// ACE Double-Entry Wallet, Coin Ledger & Rewards Redemption Database Layer

export interface PersistentCoinTransaction {
  id: string;
  userId: string;
  amount: number; // positive for credit, negative for debit
  type: 'CREDIT' | 'DEBIT';
  category: 'CHALLENGE_REWARD' | 'DAILY_LOGIN' | 'REFERRAL_BONUS' | 'HACKATHON_WIN' | 'REWARD_REDEMPTION' | 'ADMIN_ADJUSTMENT';
  description: string;
  idempotencyKey?: string;
  balanceAfter: number;
  timestamp: string;
}

export interface PersistentRedemptionOrder {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCollege: string;
  rewardId: string;
  rewardTitle: string;
  rewardType: 'UPI_CASH' | 'AMAZON_GIFT_CARD' | 'TECH_BOOK' | 'SWAG_PACK' | 'EVENT_PASS';
  coinsCost: number;
  inrValue: number;
  payoutDetails: string; // UPI ID, delivery address, or email
  status: 'PENDING_APPROVAL' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  adminNotes?: string;
  txHash?: string;
  requestedAt: string;
  completedAt?: string;
}

const STORAGE_KEYS = {
  COIN_TXS: 'ace_wallet_coin_transactions_v2',
  REDEMPTIONS: 'ace_wallet_redemption_orders_v2'
};

const SEED_TXS: Record<string, PersistentCoinTransaction[]> = {
  'usr_student_dileep': [
    {
      id: 'tx-seed-1',
      userId: 'usr_student_dileep',
      amount: 100,
      type: 'CREDIT',
      category: 'DAILY_LOGIN',
      description: 'Welcome to ACE Platform — Signup Bonus',
      balanceAfter: 100,
      timestamp: '2026-09-01T08:00:00Z'
    },
    {
      id: 'tx-seed-2',
      userId: 'usr_student_dileep',
      amount: 50,
      type: 'CREDIT',
      category: 'CHALLENGE_REWARD',
      description: 'Solved Output Guess Arcade Round 1',
      balanceAfter: 150,
      timestamp: '2026-09-02T12:00:00Z'
    }
  ]
};

class WalletPersistenceDatabase {
  private transactionsByUser: Record<string, PersistentCoinTransaction[]> = {};
  private redemptionOrders: PersistentRedemptionOrder[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;

      const rawTxs = localStorage.getItem(STORAGE_KEYS.COIN_TXS);
      this.transactionsByUser = rawTxs ? JSON.parse(rawTxs) : SEED_TXS;

      const rawRedemptions = localStorage.getItem(STORAGE_KEYS.REDEMPTIONS);
      this.redemptionOrders = rawRedemptions ? JSON.parse(rawRedemptions) : [];
    } catch (e) {
      console.error('[WalletPersistenceDatabase] Hydration error:', e);
      this.transactionsByUser = SEED_TXS;
    }
  }

  private persistTxs() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.COIN_TXS, JSON.stringify(this.transactionsByUser));
    }
  }

  private persistRedemptions() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(this.redemptionOrders));
    }
  }

  public getBalance(userId: string): number {
    const txs = this.transactionsByUser[userId] || [];
    return txs.reduce((bal, tx) => bal + tx.amount, 0);
  }

  public getTransactions(userId: string): PersistentCoinTransaction[] {
    return [...(this.transactionsByUser[userId] || [])].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  public creditCoins(params: {
    userId: string;
    amount: number;
    category: PersistentCoinTransaction['category'];
    description: string;
    idempotencyKey?: string;
  }): { success: boolean; newBalance: number; transaction?: PersistentCoinTransaction } {
    if (params.amount <= 0) {
      return { success: false, newBalance: this.getBalance(params.userId) };
    }

    if (!this.transactionsByUser[params.userId]) {
      this.transactionsByUser[params.userId] = [];
    }

    // Idempotency check
    if (params.idempotencyKey) {
      const existing = this.transactionsByUser[params.userId].find(t => t.idempotencyKey === params.idempotencyKey);
      if (existing) {
        return { success: true, newBalance: this.getBalance(params.userId), transaction: existing };
      }
    }

    const currentBalance = this.getBalance(params.userId);
    const newBalance = currentBalance + params.amount;

    const tx: PersistentCoinTransaction = {
      id: `ctx-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      userId: params.userId,
      amount: params.amount,
      type: 'CREDIT',
      category: params.category,
      description: params.description,
      idempotencyKey: params.idempotencyKey,
      balanceAfter: newBalance,
      timestamp: new Date().toISOString()
    };

    this.transactionsByUser[params.userId].unshift(tx);
    this.persistTxs();
    return { success: true, newBalance, transaction: tx };
  }

  public debitCoins(params: {
    userId: string;
    amount: number;
    category: PersistentCoinTransaction['category'];
    description: string;
    idempotencyKey?: string;
  }): { success: boolean; newBalance: number; transaction?: PersistentCoinTransaction; error?: string } {
    if (params.amount <= 0) {
      return { success: false, newBalance: this.getBalance(params.userId), error: 'Invalid amount' };
    }

    const currentBalance = this.getBalance(params.userId);
    if (currentBalance < params.amount) {
      return { success: false, newBalance: currentBalance, error: 'Insufficient coin balance' };
    }

    if (!this.transactionsByUser[params.userId]) {
      this.transactionsByUser[params.userId] = [];
    }

    // Idempotency check
    if (params.idempotencyKey) {
      const existing = this.transactionsByUser[params.userId].find(t => t.idempotencyKey === params.idempotencyKey);
      if (existing) {
        return { success: true, newBalance: this.getBalance(params.userId), transaction: existing };
      }
    }

    const newBalance = currentBalance - params.amount;

    const tx: PersistentCoinTransaction = {
      id: `ctx-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      userId: params.userId,
      amount: -params.amount,
      type: 'DEBIT',
      category: params.category,
      description: params.description,
      idempotencyKey: params.idempotencyKey,
      balanceAfter: newBalance,
      timestamp: new Date().toISOString()
    };

    this.transactionsByUser[params.userId].unshift(tx);
    this.persistTxs();
    return { success: true, newBalance, transaction: tx };
  }

  public requestRedemption(order: Omit<PersistentRedemptionOrder, 'id' | 'status' | 'requestedAt'>): {
    success: boolean;
    order?: PersistentRedemptionOrder;
    error?: string;
  } {
    const debitResult = this.debitCoins({
      userId: order.userId,
      amount: order.coinsCost,
      category: 'REWARD_REDEMPTION',
      description: `Redemption: ${order.rewardTitle} (₹${order.inrValue})`
    });

    if (!debitResult.success) {
      return { success: false, error: debitResult.error || 'Failed to debit coins' };
    }

    const newOrder: PersistentRedemptionOrder = {
      ...order,
      id: `ord-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      status: 'PENDING_APPROVAL',
      requestedAt: new Date().toISOString()
    };

    this.redemptionOrders.unshift(newOrder);
    this.persistRedemptions();
    return { success: true, order: newOrder };
  }

  public getRedemptionOrders(userId?: string): PersistentRedemptionOrder[] {
    if (userId) {
      return this.redemptionOrders.filter(o => o.userId === userId);
    }
    return [...this.redemptionOrders];
  }

  public updateOrderStatus(orderId: string, status: PersistentRedemptionOrder['status'], adminNotes?: string): boolean {
    const order = this.redemptionOrders.find(o => o.id === orderId);
    if (!order) return false;
    order.status = status;
    if (adminNotes) order.adminNotes = adminNotes;
    if (status === 'COMPLETED') order.completedAt = new Date().toISOString();
    this.persistRedemptions();
    return true;
  }
}

export const walletPersistenceDb = new WalletPersistenceDatabase();
