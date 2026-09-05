export type CoinTransactionType = 
  | 'EARN'
  | 'BONUS'
  | 'REDEEM'
  | 'REVERSAL'
  | 'ADJUSTMENT';

export interface CoinTransaction {
  id: string;
  studentId: string;
  type: CoinTransactionType;
  source: string;
  referenceId: string;
  coins: number;
  balanceBefore: number;
  balanceAfter: number;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  description: string;
}

export interface StudentWallet {
  studentId: string;
  availableCoins: number;
  pendingCoins: number;
  lifetimeEarnedCoins: number;
  lifetimeRedeemedCoins: number;
}

export interface RewardOption {
  id: string;
  title: string;
  coinsRequired: number;
  rupeeValue: number;
  category: 'VOUCHER' | 'CASHBACK' | 'MERCH';
  description: string;
  inStock: boolean;
}
