import React, { useState } from 'react';
import { Target, CheckCircle2, Sparkles, Filter, Play, HelpCircle, XCircle } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { useToast } from '../../context/ToastContext';
import { MicroTask } from '../../types/learnPlay';

const sampleTasks: MicroTask[] = [
  {
    id: 'mt-1',
    title: 'Spot the Phishing Security Signal',
    category: 'Cybersecurity',
    type: 'MULTIPLE_CHOICE',
    description: 'You receive an urgent email from "support@allc0llegeevent-security.xyz" asking you to verify your college password within 15 minutes. What is the most obvious phishing signal?',
    difficulty: 'Easy',
    estimatedTime: '3 mins',
    xpReward: 15,
    options: [
      'The email was sent during regular business hours',
      'The sender domain uses a lookalike spoofed domain (.xyz with a zero in college)',
      'The message uses professional English grammar',
      'The email includes the official ACE purple logo'
    ],
    correctAnswer: 1,
    explanation: 'Attackers frequently register typo-squatted domains (like using "0" instead of "o" and uncommon TLDs like .xyz) paired with artificial urgency.',
    hints: ['Examine the exact domain name of the sender email address.']
  },
  {
    id: 'mt-2',
    title: 'Improve the Resume Impact Metric',
    category: 'Resume',
    type: 'MULTIPLE_CHOICE',
    description: 'Which bullet point is strongest according to the Google XYZ formula (Accomplished [X], measured by [Y], by doing [Z])?',
    difficulty: 'Medium',
    estimatedTime: '4 mins',
    xpReward: 20,
    options: [
      'Responsible for developing web pages using React and Tailwind',
      'Helped the college symposium team build a registration website',
      'Engineered an automated QR check-in portal with React 19, reducing attendee check-in latency by 45% for 850 students',
      'Worked hard on frontend features and fixed several bugs'
    ],
    correctAnswer: 2,
    explanation: 'Option 3 provides concrete metrics (45% latency reduction, 850 students) and specific technologies (React 19).',
    hints: ['Look for quantitative metrics and measurable outcomes.']
  },
  {
    id: 'mt-3',
    title: 'SQL Relational Count Query',
    category: 'Data',
    type: 'MULTIPLE_CHOICE',
    description: 'Which SQL query retrieves the total number of registered students grouped by their college department?',
    difficulty: 'Medium',
    estimatedTime: '5 mins',
    xpReward: 20,
    options: [
      'SELECT department, COUNT(*) FROM students GROUP BY department;',
      'SELECT department FROM students WHERE count > 0;',
      'COUNT department FROM students ORDER BY department;',
      'SELECT ALL FROM students GROUP department;'
    ],
    correctAnswer: 0,
    explanation: 'GROUP BY department paired with aggregate function COUNT(*) is the standard relational query syntax.',
    hints: ['Remember the SQL clause used to aggregate records by categorical columns.']
  }
];

export const MicroTasksPage: React.FC = () => {
  const { completeTask, isTaskCompleted } = useLearnPlay();
  const { showToast } = useToast();

  const [selectedTask, setSelectedTask] = useState<MicroTask | null>(sampleTasks[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handleValidate = () => {
    if (selectedOption === null || !selectedTask) return;

    if (selectedOption === selectedTask.correctAnswer) {
      setResultMessage({ isCorrect: true, text: `✓ Correct! ${selectedTask.explanation}` });
      completeTask(selectedTask);
      showToast(`Task Solved! +${selectedTask.xpReward} XP Earned ✓`, 'success');
    } else {
      setResultMessage({ isCorrect: false, text: `✗ Incorrect. That is not the right choice. Review the concept and try again.` });
      showToast('Incorrect option selected. Try again!', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="GAMIFIED SKILL PRACTICE"
        title="Micro-Task"
        highlight="Arena."
        subtitle="Complete 5-minute practical tasks across Cybersecurity, Career, SQL, AI, and Logical Reasoning."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Task List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Select a Micro-Task</h3>
          {sampleTasks.map(t => {
            const isDone = isTaskCompleted(t.id);
            const isCurrent = selectedTask?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTask(t);
                  setSelectedOption(null);
                  setResultMessage(null);
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-purple-50 dark:bg-purple-950/60 border-brand-500 shadow-md' 
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {t.category}
                  </span>
                  <span className="text-xs font-bold text-amber-600">+{t.xpReward} XP</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1">{t.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>⏱ {t.estimatedTime}</span>
                  {isDone && <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Task Workspace */}
        {selectedTask && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xs">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-600">{selectedTask.category} • {selectedTask.difficulty}</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedTask.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {selectedTask.description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {selectedTask.options?.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedOption(i)}
                  className={`p-3.5 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                    selectedOption === i 
                      ? 'bg-brand-50 dark:bg-purple-950 border-brand-500 text-brand-800 dark:text-brand-200 font-bold' 
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleValidate}
              disabled={selectedOption === null}
              icon={<Play className="w-4 h-4" />}
            >
              Verify Answer
            </Button>

            {resultMessage && (
              <div className={`p-4 rounded-2xl text-xs font-medium animate-fadeIn ${
                resultMessage.isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}>
                {resultMessage.text}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
