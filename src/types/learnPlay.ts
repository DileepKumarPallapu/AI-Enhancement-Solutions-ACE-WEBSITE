export type MicroTaskCategory = 
  | 'Coding'
  | 'Web Development'
  | 'Data'
  | 'AI'
  | 'Cybersecurity'
  | 'UI/UX'
  | 'Digital Marketing'
  | 'Communication'
  | 'English'
  | 'Career'
  | 'Resume'
  | 'Interview'
  | 'Problem Solving'
  | 'Logical Reasoning';

export type TaskInteractionType = 
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'DRAG_DROP'
  | 'MATCHING'
  | 'FILL_BLANK'
  | 'DEBUGGING'
  | 'PREDICT_OUTPUT'
  | 'SQL_CHALLENGE'
  | 'REAL_WORLD';

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
  isHidden?: boolean;
}

export interface MicroTask {
  id: string;
  title: string;
  category: MicroTaskCategory;
  type: TaskInteractionType;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  xpReward: number;
  initialCode?: string;
  options?: string[];
  correctAnswer: string | string[] | number;
  explanation: string;
  hints: string[];
  testCases?: TestCase[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: number;
  unlocked: boolean;
  completed: boolean;
  prerequisites: string[];
  description: string;
  icon: string;
}

export interface XPTransaction {
  id: string;
  taskId: string;
  taskTitle: string;
  amount: number;
  timestamp: string;
}

export interface LearnPlayBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
