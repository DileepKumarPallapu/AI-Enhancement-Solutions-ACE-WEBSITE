export type ArcadeGameMode = 
  | 'code-builder'
  | 'debug'
  | 'output-guess'
  | 'code-quiz'
  | 'algorithm-race'
  | 'sql'
  | 'fix-bug'
  | 'memory-match';

export interface ArcadeQuestion {
  id: string;
  gameMode: ArcadeGameMode;
  round: number;
  questionNumber: number;
  title: string;
  prompt: string;
  snippet?: string;
  options?: string[];
  correctOptionIndex?: number;
  correctAnswerText?: string;
  blocks?: string[];
  correctBlockOrder?: string[];
  initialCode?: string;
  testCases?: { input: string; expectedOutput: string }[];
  sqlExpectedPattern?: string;
  explanation: string;
  hints: string[];
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UserQuestionState {
  questionId: string;
  selectedOptionIndex?: number;
  enteredCode?: string;
  selectedBlocks?: string[];
  memoryMatches?: string[];
  isSubmitted: boolean;
  isCorrect: boolean;
  userOutput?: string;
  earnedXp: number;
  timestamp: string;
}

export interface ArcadeHistoryRecord {
  id: string;
  gameMode: ArcadeGameMode;
  gameTitle: string;
  round: number;
  questionNumber: number;
  questionTitle: string;
  selectedAnswer: string;
  correctAnswer: string;
  result: 'CORRECT' | 'WRONG' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR';
  score: number;
  earnedXp: number;
  explanation: string;
  timestamp: string;
}
