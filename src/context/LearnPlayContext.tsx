import React, { createContext, useContext, useState, useEffect } from 'react';
import { MicroTask, SkillNode, XPTransaction, LearnPlayBadge } from '../types/learnPlay';
import { CoinTransaction, StudentWallet, RewardOption } from '../types/wallet';
import { calculateCoinsToRupees, COINS_PER_RUPEE, MINIMUM_REDEMPTION_COINS, DAILY_EARNING_COIN_LIMIT } from '../config/coinConfig';
import { useApp } from './AppContext';
import { learningPersistenceDb } from '../services/db/learningPersistenceDatabase';
import { walletPersistenceDb } from '../services/db/walletPersistenceDatabase';
import { accountDb } from '../services/db/accountDatabase';

interface LearnPlayContextType {
  coins: number;
  wallet: StudentWallet;
  coinTransactions: CoinTransaction[];
  awardCoinsForChallenge: (challengeId: string, title: string, coins: number, xp: number) => { success: boolean; coinsAwarded: number; xpAwarded: number; message: string };
  redeemReward: (reward: RewardOption, payoutDetails?: string) => { success: boolean; message: string };
  getDailyEarnings: () => number;
  getWeeklyEarnings: () => number;
  getMonthlyEarnings: () => number;
  
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
  { id: 'prog-vars', name: 'Variables & Data Types', category: 'Programming', level: 1, unlocked: true, completed: true, prerequisites: [], description: 'Understand integer, float, string, and boolean primitives.', icon: '📦' },
  { id: 'prog-cond', name: 'Conditions & Branching', category: 'Programming', level: 1, unlocked: true, completed: true, prerequisites: ['prog-vars'], description: 'If-else statements and logical boolean comparisons.', icon: '🔀' },
  { id: 'prog-loops', name: 'Loops & Iterations', category: 'Programming', level: 2, unlocked: true, completed: false, prerequisites: ['prog-cond'], description: 'For loops, while loops, and list iterations.', icon: '🔁' },
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
  const currentAcc = accountDb.getCurrentUser();
  const studentId = currentAcc?.id || 'usr_student_dileep';

  const [coins, setCoins] = useState<number>(() => {
    return walletPersistenceDb.getBalance(studentId);
  });

  const [coinTransactions, setCoinTransactions] = useState<CoinTransaction[]>(() => {
    const raw = walletPersistenceDb.getTransactions(studentId);
    return raw.map(t => ({
      id: t.id,
      studentId,
      type: (t.type === 'CREDIT' ? 'EARN' : 'REDEEM') as any,
      source: t.category,
      referenceId: t.idempotencyKey || t.id,
      coins: Math.abs(t.amount),
      balanceBefore: t.balanceAfter - t.amount,
      balanceAfter: t.balanceAfter,
      status: 'COMPLETED',
      createdAt: t.timestamp,
      description: t.description
    }));
  });

  const [xp, setXp] = useState<number>(() => {
    return learningPersistenceDb.getXpTotal(studentId) || 200;
  });

  const [dailyStreak, setDailyStreak] = useState<number>(() => {
    return learningPersistenceDb.getStreak(studentId).currentStreak;
  });

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    return learningPersistenceDb.getCompletedTaskIds(studentId);
  });

  const [xpHistory, setXpHistory] = useState<XPTransaction[]>(() => {
    const list = learningPersistenceDb.getXpHistory(studentId);
    return list.map(x => ({
      id: x.id,
      taskId: x.source,
      taskTitle: x.description,
      amount: x.amount,
      timestamp: x.timestamp
    }));
  });

  const [skillNodes] = useState<SkillNode[]>(defaultSkillNodes);
  const badges: LearnPlayBadge[] = defaultBadges;

  const level = Math.floor(xp / 200) + 1;
  const levelTitle = level >= 5 ? 'Architect' : level >= 3 ? 'Engineer' : 'Apprentice';

  const awardCoinsForChallenge = (challengeId: string, title: string, coinsToAward: number, xpToAward: number) => {
    const cred = walletPersistenceDb.creditCoins({
      userId: studentId,
      amount: coinsToAward,
      category: 'CHALLENGE_REWARD',
      description: `Challenge: ${title}`,
      idempotencyKey: `ch-${challengeId}-${studentId}`
    });

    if (cred.success) {
      setCoins(cred.newBalance);
      setCoinTransactions(walletPersistenceDb.getTransactions(studentId).map(t => ({
        id: t.id,
        studentId,
        type: (t.type === 'CREDIT' ? 'EARN' : 'REDEEM') as any,
        source: t.category,
        referenceId: t.idempotencyKey || t.id,
        coins: Math.abs(t.amount),
        balanceBefore: t.balanceAfter - t.amount,
        balanceAfter: t.balanceAfter,
        status: 'COMPLETED',
        createdAt: t.timestamp,
        description: t.description
      })));
    }

    if (xpToAward > 0) {
      learningPersistenceDb.awardXp(studentId, xpToAward, 'CODING_CHALLENGE', title);
      setXp(learningPersistenceDb.getXpTotal(studentId));
      setXpHistory(learningPersistenceDb.getXpHistory(studentId).map(x => ({
        id: x.id,
        taskId: x.source,
        taskTitle: x.description,
        amount: x.amount,
        timestamp: x.timestamp
      })));
    }

    learningPersistenceDb.touchStreak(studentId);
    setDailyStreak(learningPersistenceDb.getStreak(studentId).currentStreak);

    return {
      success: true,
      coinsAwarded: coinsToAward,
      xpAwarded: xpToAward,
      message: `Earned +${coinsToAward} Coins & +${xpToAward} XP!`
    };
  };

  const redeemReward = (reward: RewardOption, payoutDetails?: string) => {
    const res = walletPersistenceDb.requestRedemption({
      userId: studentId,
      userName: currentAcc?.fullName || 'Dileep Kumar',
      userEmail: currentAcc?.email || 'dileep.kumar@veltech.edu.in',
      userCollege: currentAcc?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      rewardId: reward.id,
      rewardTitle: reward.title,
      rewardType: 'UPI_CASH',
      coinsCost: reward.coinsRequired,
      inrValue: reward.rupeeValue,
      payoutDetails: payoutDetails || 'Registered UPI / Email'
    });

    if (!res.success) {
      return { success: false, message: res.error || 'Failed to redeem reward' };
    }

    setCoins(walletPersistenceDb.getBalance(studentId));
    setCoinTransactions(walletPersistenceDb.getTransactions(studentId).map(t => ({
      id: t.id,
      studentId,
      type: (t.type === 'CREDIT' ? 'EARN' : 'REDEEM') as any,
      source: t.category,
      referenceId: t.idempotencyKey || t.id,
      coins: Math.abs(t.amount),
      balanceBefore: t.balanceAfter - t.amount,
      balanceAfter: t.balanceAfter,
      status: 'COMPLETED',
      createdAt: t.timestamp,
      description: t.description
    })));

    return { success: true, message: `Redemption of ${reward.title} submitted for processing!` };
  };

  const completeTask = (task: MicroTask) => {
    const ok = learningPersistenceDb.completeTask(studentId, task.id, task.xpReward, 10);
    if (!ok) {
      return { success: false, earnedXp: 0, earnedCoins: 0 };
    }

    walletPersistenceDb.creditCoins({
      userId: studentId,
      amount: 10,
      category: 'CHALLENGE_REWARD',
      description: `MicroTask: ${task.title}`
    });
    setCoins(walletPersistenceDb.getBalance(studentId));

    setCompletedTaskIds(learningPersistenceDb.getCompletedTaskIds(studentId));
    setXp(learningPersistenceDb.getXpTotal(studentId));
    setDailyStreak(learningPersistenceDb.getStreak(studentId).currentStreak);

    return { success: true, earnedXp: task.xpReward, earnedCoins: 10 };
  };

  const isTaskCompleted = (taskId: string) => {
    return learningPersistenceDb.isTaskCompleted(studentId, taskId);
  };

  const getSkillProgress = () => {
    const completed = skillNodes.filter(n => n.completed).length;
    return Math.round((completed / skillNodes.length) * 100);
  };

  const getDailyEarnings = () => 150;
  const getWeeklyEarnings = () => 450;
  const getMonthlyEarnings = () => 1200;

  const wallet: StudentWallet = {
    studentId,
    availableCoins: coins,
    pendingCoins: 0,
    lifetimeEarnedCoins: coins + 100,
    lifetimeRedeemedCoins: 0
  };

  return (
    <LearnPlayContext.Provider
      value={{
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
        badges,
        skillNodes,
        completeTask,
        isTaskCompleted,
        getSkillProgress
      }}
    >
      {children}
    </LearnPlayContext.Provider>
  );
};

export const useLearnPlay = () => {
  const context = useContext(LearnPlayContext);
  if (!context) throw new Error('useLearnPlay must be used within LearnPlayProvider');
  return context;
};
