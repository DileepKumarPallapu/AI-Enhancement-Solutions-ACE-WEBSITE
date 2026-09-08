import React, { useState } from 'react';
import { GitBranch, Plus, Trash2, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { workflowEngineDatabase, WorkflowStep, WorkflowStepType } from '../../services/db/workflowEngineDatabase';
import { useNavigate } from 'react-router-dom';

export const VisualWorkflowBuilderPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'CAREER' | 'LEARNING' | 'EVENTS' | 'MENTORSHIP'>('CAREER');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: 'step_1',
      stepNumber: 1,
      type: 'TRIGGER',
      title: 'Workflow Trigger Event',
      description: 'Triggered when student initiates action from Opportunity Exchange.',
      assignedActor: 'STUDENT',
      status: 'PENDING'
    },
    {
      id: 'step_2',
      stepNumber: 2,
      type: 'AI_ACTION',
      title: 'AI Competency Gap Analysis',
      description: 'AI analyzes digital passport skills against target role requirements.',
      assignedActor: 'AI_AGENT',
      status: 'PENDING'
    },
    {
      id: 'step_3',
      stepNumber: 3,
      type: 'HUMAN_APPROVAL',
      title: 'Faculty Mentor Sign-Off Gate',
      description: 'Dr. Aravind Swaminathan validates project evidence and attestation.',
      assignedActor: 'MENTOR',
      status: 'PENDING',
      requiresApproval: true,
      approvalRiskLevel: 'MEDIUM'
    },
    {
      id: 'step_4',
      stepNumber: 4,
      type: 'END',
      title: 'Submit & Complete Workflow',
      description: 'Persists application with immutable audit correlation ID.',
      assignedActor: 'SYSTEM',
      status: 'PENDING'
    }
  ]);

  const navigate = useNavigate();

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      id: `step_${Date.now()}`,
      stepNumber: steps.length + 1,
      type: 'ACTION',
      title: 'New Orchestration Step',
      description: 'Perform automated task or notification dispatch.',
      assignedActor: 'SYSTEM',
      status: 'PENDING'
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (idx: number) => {
    if (steps.length <= 2) return;
    setSteps(steps.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!title.trim()) return;
    const def = workflowEngineDatabase.createDefinition({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      description: description || 'Custom multi-step workflow defined by user.',
      category,
      targetRole: 'STUDENT',
      version: 1,
      status: 'ACTIVE',
      steps,
      createdBy: 'usr_student_dileep'
    });
    navigate(`/workflows/${def.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">ACE Workflow Studio</span>
            <h1 className="text-2xl md:text-3xl font-black text-white">Visual Workflow Builder</h1>
          </div>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all cursor-pointer shadow-lg"
          >
            Save & Publish Definition
          </button>
        </div>

        {/* Definition Details */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 mb-1 block">Workflow Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Higher Studies Research SOP Preparation"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="CAREER">Career & Placements</option>
                <option value="LEARNING">Learning & Skills</option>
                <option value="EVENTS">Competitions & Hackathons</option>
                <option value="MENTORSHIP">Faculty Mentorship</option>
              </select>
            </div>
          </div>
        </div>

        {/* Steps Timeline / Canvas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Workflow Execution Sequence ({steps.length} Steps)</h2>
            <button
              onClick={handleAddStep}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4 group hover:border-indigo-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
                        {step.type}
                      </span>
                      <span className="text-xs text-slate-500">• Actor: {step.assignedActor}</span>
                    </div>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...steps];
                        updated[idx].title = e.target.value;
                        setSteps(updated);
                      }}
                      className="text-sm font-bold text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none w-full"
                    />
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...steps];
                        updated[idx].description = e.target.value;
                        setSteps(updated);
                      }}
                      className="text-xs text-slate-400 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none w-full"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveStep(idx)}
                  className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                  title="Remove step"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
