import React, { createContext, useContext, useState, useEffect } from 'react';
import { Competition, CompetitionRegistration, CompetitionWinnerRecord } from '../types/competition';
import { COMPETITIONS_DATA } from '../data/competitionsData';
import { useLearnPlay } from './LearnPlayContext';
import { useApp } from './AppContext';

interface CompetitionContextType {
  competitions: Competition[];
  registrations: CompetitionRegistration[];
  myWins: CompetitionWinnerRecord[];
  registerForCompetition: (comp: Competition, teamName?: string) => { success: boolean; message: string };
  isRegistered: (compId: string) => boolean;
  claimWinnerPrize: (winRecord: CompetitionWinnerRecord) => { success: boolean; message: string };
  getCompetitionById: (id: string) => Competition | undefined;
}

const defaultWins: CompetitionWinnerRecord[] = [
  {
    competitionId: 'comp-python-2026',
    competitionTitle: 'ACE National Python Championship 2026',
    position: 1,
    coinsWon: 5000,
    cashEquivalent: '₹50.00 value',
    wonAt: '2026-09-02',
    certificateId: 'CERT-WIN-902',
    claimed: false
  }
];

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export const CompetitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { awardCoinsForChallenge } = useLearnPlay();
  const { user } = useApp();
  const studentId = user?.email || 'std-current';

  const [registrations, setRegistrations] = useState<CompetitionRegistration[]>(() => {
    const saved = localStorage.getItem(`ace_comp_regs_${studentId}`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'reg-demo-1',
        competitionId: 'comp-python-2026',
        studentId,
        studentName: user?.name || 'Student Delegate',
        college: user?.college || 'Hindustan Institute of Technology',
        registeredAt: '2026-09-02',
        status: 'CONFIRMED'
      }
    ];
  });

  const [myWins, setMyWins] = useState<CompetitionWinnerRecord[]>(() => {
    const saved = localStorage.getItem(`ace_comp_wins_${studentId}`);
    return saved ? JSON.parse(saved) : defaultWins;
  });

  useEffect(() => {
    localStorage.setItem(`ace_comp_regs_${studentId}`, JSON.stringify(registrations));
  }, [registrations, studentId]);

  useEffect(() => {
    localStorage.setItem(`ace_comp_wins_${studentId}`, JSON.stringify(myWins));
  }, [myWins, studentId]);

  const registerForCompetition = (comp: Competition, teamName?: string) => {
    if (registrations.some(r => r.competitionId === comp.id)) {
      return { success: false, message: 'You are already registered for this competition.' };
    }

    const newReg: CompetitionRegistration = {
      id: `reg-${Date.now()}`,
      competitionId: comp.id,
      studentId,
      studentName: user?.name || 'Student Delegate',
      college: user?.college || 'Hindustan Institute of Technology',
      registeredAt: new Date().toISOString().split('T')[0],
      teamName,
      status: 'CONFIRMED'
    };

    setRegistrations(prev => [...prev, newReg]);
    return { success: true, message: `Successfully registered for ${comp.title}! You can enter the contest room when it goes live.` };
  };

  const isRegistered = (compId: string) => registrations.some(r => r.competitionId === compId);

  const claimWinnerPrize = (winRecord: CompetitionWinnerRecord) => {
    if (winRecord.claimed) {
      return { success: false, message: 'Prize already credited to your wallet.' };
    }

    // Award coins atomically to wallet
    awardCoinsForChallenge(
      `win-${winRecord.competitionId}`,
      `1st Place Winner Prize - ${winRecord.competitionTitle}`,
      winRecord.coinsWon,
      100 // XP
    );

    setMyWins(prev => prev.map(w => w.competitionId === winRecord.competitionId ? { ...w, claimed: true } : w));

    return {
      success: true,
      message: `🎉 Claimed 🪙 ${winRecord.coinsWon.toLocaleString()} Coins! Credited to your wallet.`
    };
  };

  const getCompetitionById = (id: string) => {
    return COMPETITIONS_DATA.find(c => c.id === id || c.slug === id);
  };

  return (
    <CompetitionContext.Provider value={{
      competitions: COMPETITIONS_DATA,
      registrations,
      myWins,
      registerForCompetition,
      isRegistered,
      claimWinnerPrize,
      getCompetitionById
    }}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (!context) throw new Error('useCompetition must be used within CompetitionProvider');
  return context;
};
