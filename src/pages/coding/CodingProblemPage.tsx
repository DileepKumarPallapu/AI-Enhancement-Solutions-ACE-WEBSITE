import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, CheckCircle2, RotateCcw, HelpCircle, Sparkles, Code, Terminal, Brain, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const CodingProblemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(
`# Write your solution in Python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`
  );

  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput(`✓ Test Case 1 Passed: [0, 1] (Target: 9)\n✓ Test Case 2 Passed: [1, 2] (Target: 6)\n\nExecution Time: 42ms | Memory: 14.8 MB\nAll sample test cases passed successfully!`);
      showToast('Code executed successfully ✓');
    }, 600);
  };

  const handleSubmitCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput(`🎉 SUCCESS: ACCEPTED!\nPassed 54/54 hidden test cases.\n\nRuntime: 38ms (Beats 94.2% of Python submissions)\nEarned: +20 XP + 5 ACE Reward Points!`);
      showToast('Problem Solved! +20 XP Earned ✓', 'success');
    }, 800);
  };

  const handleGetHint = () => {
    setHint("Hint: A brute force approach takes O(n²). Can you use a Hash Map (dictionary in Python) to store complements in O(n) linear time?");
  };

  const handleAskAi = () => {
    setAiExplanation("ACE Coding AI Analysis: Your code uses a single-pass hash map which runs in O(n) time complexity and O(n) space complexity. It's the optimal approach for Two Sum!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link to="/coding/practice" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-black text-slate-900 dark:text-white">1. Two Sum</h1>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Easy • +20 XP</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript (Node 20)</option>
            <option value="java">Java 17</option>
            <option value="cpp">C++ 20</option>
          </select>
          <Button variant="outline" size="sm" onClick={handleGetHint} icon={<HelpCircle className="w-3.5 h-3.5" />}>
            Get Hint
          </Button>
          <Button variant="ai" size="sm" onClick={handleAskAi} icon={<Sparkles className="w-3.5 h-3.5" />}>
            Ask Coding AI
          </Button>
        </div>
      </div>

      {/* Editor & Problem 2-Pane View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Problem Description */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Problem Description</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Given an array of integers <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">nums</code> and an integer <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">target</code>, return <em>indices of the two numbers such that they add up to target</em>.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">Example 1:</h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-[11px] space-y-1">
              <p><strong>Input:</strong> nums = [2,7,11,15], target = 9</p>
              <p><strong>Output:</strong> [0,1]</p>
              <p className="text-slate-400 font-sans">Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</p>
            </div>
          </div>

          {hint && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
              <span className="font-bold">💡 Hint:</span>
              <p className="text-[11px] mt-0.5 leading-relaxed">{hint}</p>
            </div>
          )}

          {aiExplanation && (
            <div className="p-3 bg-purple-50 dark:bg-purple-950/60 rounded-xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 animate-fadeIn">
              <span className="font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-brand-600" /> ACE Coding AI:</span>
              <p className="text-[11px] mt-0.5 leading-relaxed">{aiExplanation}</p>
            </div>
          )}
        </div>

        {/* Right: Code Editor & Execution Console */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <span>solution.py</span>
              <span className="text-emerald-400">● Interactive Editor</span>
            </div>
            <textarea
              rows={12}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950 text-purple-200 p-4 font-mono text-xs outline-none leading-relaxed resize-none"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={() => setCode(`def twoSum(nums, target):\n    pass`)}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Code
            </Button>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={handleRunCode}
                disabled={isRunning}
                icon={<Play className="w-4 h-4" />}
              >
                Run Code
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmitCode}
                disabled={isRunning}
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Submit Solution
              </Button>
            </div>
          </div>

          {/* Console Output */}
          {output && (
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs whitespace-pre-wrap border border-slate-800 animate-fadeIn">
              <div className="flex items-center gap-2 pb-2 text-[10px] text-slate-400 border-b border-slate-800 mb-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Console Output
              </div>
              {output}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
