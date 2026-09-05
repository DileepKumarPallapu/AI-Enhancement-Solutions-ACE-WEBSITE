import React, { createContext, useContext, useState, useEffect } from 'react';
import { MicroTask, SkillNode, XPTransaction, LearnPlayBadge } from '../types/learnPlay';
import { CoinTransaction, StudentWallet, RewardOption } from '../types/wallet';
import { formatCoinsToRupees, calculateCoinsToRupees, COINS_PER_RUPEE, MINIMUM_REDEMPTION_COINS, DAILY_EARNING_COIN_LIMIT } from '../config/coinConfig';
import { useApp } from './AppContext';

interface LearnPlayContextType {
  // Coins & Wallet State
  coins: number;
  wallet: StudentWallet;
  coinTransactions: CoinTransaction[];
  awardCoinsForChallenge: (challengeId: string, title: string, coins: number, xp: number) => { success: boolean; coinsAwarded: number; xpAwarded: number; message: string };
  redeemReward: (reward: RewardOption) => { success: boolean; message: string };
  getDailyEarnings: () => number;
  getWeeklyEarnings: () => number;
  getMonthlyEarnings: () => number;
  
  // XP & Progress State
  xp: number;
  level: number;
  levelTitle: string;
  dailyStreak: number;
  completedTaskIds: string[];
  xpHistory: XPTransaction[];
  badges: LearnPlayBadge[];
  skillNodes: SkillNode[];
  completeTask: (task: MicroTask) => { success: boolean; earnedXp: number; earnedCoins: number };
  isTaskCompleted: (taskId: string) => boolean;
  getSkillProgress: () => number;
}

const defaultSkillNodes: SkillNode[] = [
  { id: 'prog-vars', name: 'Variables & Data Types', category: 'Programming', level: 1, unlocked: true, completed: false, prerequisites: [], description: 'Understand integer, float, string, and boolean primitives.', icon: '📦' },
  { id: 'prog-cond', name: 'Conditions & Branching', category: 'Programming', level: 1, unlocked: true, completed: false, prerequisites: ['prog-vars'], description: 'If-else statements and logical boolean comparisons.', icon: '🔀' },
  { id: 'prog-loops', name: 'Loops & Iterations', category: 'Programming', level: 2, unlocked: false, completed: false, prerequisites: ['prog-cond'], description: 'For loops, while loops, and list iterations.', icon: '🔁' },
  { id: 'prog-funcs', name: 'Functions & Scope', category: 'Programming', level: 2, unlocked: false, completed: false, prerequisites: ['prog-loops'], description: 'Function signatures, return values, and parameters.', icon: '⚡' },
  { id: 'prog-arrays', name: 'Arrays & Data Structures', category: 'Programming', level: 3, unlocked: false, completed: false, prerequisites: ['prog-funcs'], description: 'Lists, dictionaries, and linear data structures.', icon: '🌲' },
  { id: 'prog-algos', name: 'Algorithms & Complexity', category: 'Programming', level: 4, unlocked: false, completed: false, prerequisites: ['prog-arrays'], description: 'Search, sorting, two-pointer, and Big-O notation.', icon: '🧠' }
];

const defaultBadges: LearnPlayBadge[] = [
  { id: 'b1', name: 'First Challenge', description: 'Completed your first verified micro-task.', icon: '🎯' },
  { id: 'b2', name: '7-Day Streak 🔥', description: 'Logged in and solved daily missions for 7 days.', icon: '🔥' },
  { id: 'b3', name: 'Debug Detective', description: 'Solved live code debugging challenges.', icon: '🕵️' },
  { id: 'b4', name: 'SQL Explorer', description: 'Wrote verified relational queries.', icon: '🗄️' },
  { id: 'b5', name: 'Master Creator', description: 'Reached Developer Level 5.', icon: '👑' }
];

const LearnPlayContext = createContext<LearnPlayContextType | undefined>(undefined);

export const LearnPlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  const studentId = user?.email || 'std-current';

  // 1. Coins & Wallet Persistence
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem(`ace_wallet_coins_${studentId}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [coinTransactions, setCoinTransactions] = useState<CoinTransaction[]>(() => {
    const saved = localStorage.getItem(`ace_wallet_txs_${studentId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [lifetimeEarnedCoins, setLifetimeEarnedCoins] = useState<number>(() => {
    const saved = localStorage.getItem(`ace_wallet_lifetime_earned_${studentId}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lifetimeRedeemedCoins, setLifetimeRedeemedCoins] = useState<number>(() => {
    const saved = localStorage.getItem(`ace_wallet_lifetime_redeemed_${studentId}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  // 2. XP & Task Progression Persistence
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem(`ace_xp_${studentId}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [dailyStreak, setDailyStreak] = useState<number>(() => {
    const saved = localStorage.getItem(`ace_streak_${studentId}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`ace_completed_tasks_${studentId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [xpHistory, setXpHistory] = useState<XPTransaction[]>(() => {
    const saved = localStorage.getItem(`ace_xp_history_${studentId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [skillNodes, setSkillNodes] = useState<SkillNode[]>(() => {
    const saved = localStorage.getItem(`ace_skills_${studentId}`);
    return saved ? JSON.parse(saved) : defaultSkillNodes;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(`ace_wallet_coins_${studentId}`, coins.toString());
  }, [coins, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_wallet_txs_${studentId}`, JSON.stringify(coinTransactions));
  }, [coinTransactions, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_wallet_lifetime_earned_${studentId}`, lifetimeEarnedCoins.toString());
  }, [lifetimeEarnedCoins, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_wallet_lifetime_redeemed_${studentId}`, lifetimeRedeemedCoins.toString());
  }, [lifetimeRedeemedCoins, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_xp_${studentId}`, xp.toString());
  }, [xp, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_streak_${studentId}`, dailyStreak.toString());
  }, [dailyStreak, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_completed_tasks_${studentId}`, JSON.stringify(completedTaskIds));
  }, [completedTaskIds, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_xp_history_${studentId}`, JSON.stringify(xpHistory));
  }, [xpHistory, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_skills_${studentId}`, JSON.stringify(skillNodes));
  }, [skillNodes, studentId]);

  // Level Progression Calculation from Real XP
  const getLevel = (totalXp: number) => {
    if (totalXp < 100) return { level: 1, title: 'Explorer' };
    if (totalXp < 250) return { level: 2, title: 'Learner' };
    if (totalXp < 500) return { level: 3, title: 'Builder' };
    if (totalXp < 900) return { level: 4, title: 'Problem Solver' };
    if (totalXp < 1400) return { level: 5, title: 'Developer' };
    if (totalXp < 2000) return { level: 6, title: 'Creator' };
    if (totalXp < 3000) return { level: 7, title: 'Challenger' };
    return { level: 8, title: 'Expert' };
  };

  const { level, title: levelTitle } = getLevel(xp);

  // Atomic Award Coins & XP for Challenge (with Idempotency)
  const awardCoinsForChallenge = (challengeId: string, title: string, coinsToAward: number, xpToAward: number) => {
    if (completedTaskIds.includes(challengeId)) {
      return { success: false, coinsAwarded: 0, xpAwarded: 0, message: 'Challenge already rewarded.' };
    }

    const prevBalance = coins;
    const nextBalance = prevBalance + coinsToAward;

    // 1. Record immutable ledger transaction
    const tx: CoinTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      studentId,
      type: 'EARN',
      source: 'LEARN_PLAY',
      referenceId: challengeId,
      coins: coinsToAward,
      balanceBefore: prevBalance,
      balanceAfter: nextBalance,
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      description: `Reward for: ${title}`
    };

    setCoins(nextBalance);
    setLifetimeEarnedCoins(prev => prev + coinsToAward);
    setCoinTransactions(prev => [tx, ...prev]);

    // 2. Award XP & record task completion
    setXp(prev => prev + xpToAward);
    setCompletedTaskIds(prev => [...prev, challengeId]);
    if (dailyStreak === 0) setDailyStreak(1);

    const xpTx: XPTransaction = {
      id: `xp-${Date.now()}`,
      taskId: challengeId,
      taskTitle: title,
      amount: xpToAward,
      timestamp: new Date().toLocaleString()
    };
    setXpHistory(prev => [xpTx, ...prev]);

    // 3. Unlock skill tree progression
    setSkillNodes(prev => prev.map((node, i) => {
      if (i === 0 && !node.completed) return { ...node, completed: true };
      if (i === 1 && !node.completed && prev[0].completed) return { ...node, completed: true };
      if (i === 2 && !node.unlocked && prev[1].completed) return { ...node, unlocked: true };
      return node;
    }));

    return { 
      success: true, 
      coinsAwarded: coinsToAward, 
      xpAwarded: xpToAward, 
      message: `✓ Earned +${coinsToAward} Coins & +${xpToAward} XP!` 
    };
  };

  // Complete MicroTask Wrapper
  const completeTask = (task: MicroTask) => {
    const coinsToAward = task.xpReward * 2; // e.g. 25 XP -> 50 Coins
    const res = awardCoinsForChallenge(task.id, task.title, coinsToAward, task.xpReward);
    return {
      success: res.success,
      earnedXp: res.xpAwarded,
      earnedCoins: res.coinsAwarded
    };
  };

  // Redeem Reward Option
  const redeemReward = (reward: RewardOption) => {
    if (coins < reward.coinsRequired) {
      const needed = reward.coinsRequired - coins;
      return { 
        success: false, 
        message: `Insufficient coins. You need ${needed} more coins to redeem ${formatCoinsToRupees(reward.coinsRequired)}.` 
      };
    }

    const prevBalance = coins;
    const nextBalance = prevBalance - reward.coinsRequired;

    const tx: CoinTransaction = {
      id: `tx-rdm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      studentId,
      type: 'REDEEM',
      source: 'REWARD_STORE',
      referenceId: reward.id,
      coins: -reward.coinsRequired,
      balanceBefore: prevBalance,
      balanceAfter: nextBalance,
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      description: `Redeemed: ${reward.title}`
    };

    setCoins(nextBalance);
    setLifetimeRedeemedCoins(prev => prev + reward.coinsRequired);
    setCoinTransactions(prev => [tx, ...prev]);

    return {
      success: true,
      message: `🎉 Successfully redeemed ${reward.title}! ${reward.coinsRequired} Coins deducted.`
    };
  };

  const isTaskCompleted = (taskId: string) => completedTaskIds.includes(taskId);

  const getSkillProgress = () => {
    const completedCount = skillNodes.filter(s => s.completed).length;
    return Math.round((completedCount / skillNodes.length) * 100);
  };

  const getDailyEarnings = () => {
    const today = new Date().toDateString();
    return coinTransactions
      .filter(t => t.type === 'EARN' && new Date(t.createdAt).toDateString() === today)
      .reduce((sum, t) => sum + t.coins, 0);
  };

  const getWeeklyEarnings = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return coinTransactions
      .filter(t => t.type === 'EARN' && new Date(t.createdAt) >= oneWeekAgo)
      .reduce((sum, t) => sum + t.coins, 0);
  };

  const getMonthlyEarnings = () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return coinTransactions
      .filter(t => t.type === 'EARN' && new Date(t.createdAt) >= oneMonthAgo)
      .reduce((sum, t) => sum + t.coins, 0);
  };

  const wallet: StudentWallet = {
    studentId,
    availableCoins: coins,
    pendingCoins: 0,
    lifetimeEarnedCoins,
    lifetimeRedeemedCoins
  };

  return (
    <LearnPlayContext.Provider value={{
      coins,
      wallet,
      coinTransactions,
      awardCoinsForChallenge,
      redeemReward,
      getDailyEarnings,
      getWeeklyEarnings,
      getMonthlyEarnings,
      xp,
      level,
      levelTitle,
      dailyStreak,
      completedTaskIds,
      xpHistory,
      badges: defaultBadges,
      skillNodes,
      completeTask,
      isTaskCompleted,
      getSkillProgress
    }}>
      {children}
    </LearnPlayContext.Provider>
  );
};

export const useLearnPlay = () => {
  const context = useContext(LearnPlayContext);
  if (!context) throw new Error('useLearnPlay must be used within LearnPlayProvider');
  return context;
};
