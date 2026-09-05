import React, { createContext, useContext, useState, useEffect } from 'react';
import { ArcadeGameMode, ArcadeQuestion, UserQuestionState, ArcadeHistoryRecord } from '../types/arcade';
import { ARCADE_QUESTIONS } from '../data/arcadeQuestions';
import { useLearnPlay } from './LearnPlayContext';

interface ArcadeContextType {
  activeMode: ArcadeGameMode;
  setActiveMode: (mode: ArcadeGameMode) => void;
  currentRound: number;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  activeQuestion: ArcadeQuestion;
  totalQuestions: number;
  userAnswers: Record<string, UserQuestionState>;
  saveAnswerState: (questionId: string, state: Partial<UserQuestionState>) => void;
  goToNextQuestion: () => boolean;
  goToPreviousQuestion: () => boolean;
  jumpToQuestion: (idx: number) => void;
  isRoundComplete: boolean;
  sessionSummary: {
    totalScore: number;
    correctCount: number;
    wrongCount: number;
    accuracy: number;
    earnedXp: number;
  };
  historyRecords: ArcadeHistoryRecord[];
  addHistoryRecord: (record: Omit<ArcadeHistoryRecord, 'id' | 'timestamp'>) => void;
  restartGame: () => void;
}

const defaultHistory: ArcadeHistoryRecord[] = [
  {
    id: 'hist-1',
    gameMode: 'output-guess',
    gameTitle: 'Output Guess',
    round: 1,
    questionNumber: 1,
    questionTitle: 'JavaScript Type Coercion with Plus Operator',
    selectedAnswer: 'B. 52',
    correctAnswer: 'B. 52',
    result: 'CORRECT',
    score: 15,
    earnedXp: 15,
    explanation: 'When the + operator is used with a string operand, JavaScript performs string concatenation, resulting in "52".',
    timestamp: '2026-09-03 08:30'
  }
];

const ArcadeContext = createContext<ArcadeContextType | undefined>(undefined);

export const ArcadeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { completeTask } = useLearnPlay();

  const [activeMode, setActiveMode] = useState<ArcadeGameMode>('code-builder');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [userAnswers, setUserAnswers] = useState<Record<string, UserQuestionState>>(() => {
    const saved = localStorage.getItem('ace_arcade_user_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [historyRecords, setHistoryRecords] = useState<ArcadeHistoryRecord[]>(() => {
    const saved = localStorage.getItem('ace_arcade_history');
    return saved ? JSON.parse(saved) : defaultHistory;
  });

  useEffect(() => {
    localStorage.setItem('ace_arcade_user_answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem('ace_arcade_history', JSON.stringify(historyRecords));
  }, [historyRecords]);

  const questions = ARCADE_QUESTIONS[activeMode] || ARCADE_QUESTIONS['code-builder'];
  const activeQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;

  const saveAnswerState = (questionId: string, partial: Partial<UserQuestionState>) => {
    setUserAnswers(prev => {
      const existing = prev[questionId] || {
        questionId,
        isSubmitted: false,
        isCorrect: false,
        earnedXp: 0,
        timestamp: new Date().toISOString()
      };
      return {
        ...prev,
        [questionId]: { ...existing, ...partial, timestamp: new Date().toISOString() }
      };
    });
  };

  const addHistoryRecord = (rec: Omit<ArcadeHistoryRecord, 'id' | 'timestamp'>) => {
    const newRecord: ArcadeHistoryRecord = {
      ...rec,
      id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleString()
    };
    setHistoryRecords(prev => [newRecord, ...prev]);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return true;
    }
    return false;
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      return true;
    }
    return false;
  };

  const jumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < totalQuestions) {
      setCurrentQuestionIndex(idx);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
  };

  // Calculate session metrics
  const answeredList = questions.map(q => userAnswers[q.id]).filter(Boolean);
  const correctCount = answeredList.filter(a => a.isCorrect).length;
  const wrongCount = answeredList.filter(a => a.isSubmitted && !a.isCorrect).length;
  const totalScore = answeredList.reduce((acc, a) => acc + (a.isCorrect ? (questions.find(q => q.id === a.questionId)?.xpReward || 15) : 0), 0);
  const accuracy = (correctCount + wrongCount) > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
  const isRoundComplete = answeredList.length === totalQuestions && answeredList.every(a => a.isSubmitted);

  return (
    <ArcadeContext.Provider value={{
      activeMode,
      setActiveMode: (mode) => {
        setActiveMode(mode);
        setCurrentQuestionIndex(0);
      },
      currentRound,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      activeQuestion,
      totalQuestions,
      userAnswers,
      saveAnswerState,
      goToNextQuestion,
      goToPreviousQuestion,
      jumpToQuestion,
      isRoundComplete,
      sessionSummary: {
        totalScore,
        correctCount,
        wrongCount,
        accuracy,
        earnedXp: totalScore
      },
      historyRecords,
      addHistoryRecord,
      restartGame
    }}>
      {children}
    </ArcadeContext.Provider>
  );
};

export const useArcade = () => {
  const context = useContext(ArcadeContext);
  if (!context) throw new Error('useArcade must be used within ArcadeProvider');
  return context;
};
