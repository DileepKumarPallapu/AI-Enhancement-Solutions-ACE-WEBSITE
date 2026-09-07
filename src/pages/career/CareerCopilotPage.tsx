import React, { useState } from 'react';
import { 
  Sparkles, Send, Bot, User, ArrowRight, 
  CheckCircle2, BookOpen, Briefcase, Award 
} from 'lucide-react';
import { careerCopilotService, CopilotMessage } from '../../services/ai/careerCopilotService';
import { useNavigate } from 'react-router-dom';

export const CareerCopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init_1',
      sender: 'COPILOT',
      text: 'Hello Dileep! I am your ACE AI Career Copilot. I have synchronized with your Vel Tech 3rd Year CSE record, 9.4 CGPA, and verified GitHub project repos. How can I help accelerate your career today?',
      suggestedActions: [
        { label: 'Review My Role Matches', url: '/career/roadmap' },
        { label: 'Check Skill Gaps', url: '/career/skills' },
        { label: 'AI Interview Practice', url: '/career/interview' }
      ],
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: CopilotMessage = {
      id: `usr_${Date.now()}`,
      sender: 'USER',
      text: inputText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const reply = careerCopilotService.generateAdvice(userMsg.text);
      setMessages(prev => [...prev, reply]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col justify-between max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4 pb-4">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              AI Career Copilot
            </span>
            <h1 className="text-2xl font-extrabold text-white">Personalized Career Intelligence</h1>
            <p className="text-xs text-slate-400">Grounded strictly in your authentic academic records and verified skill evidence.</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] p-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'COPILOT' && (
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed space-y-3 ${
              m.sender === 'USER'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              <p>{m.text}</p>

              {m.suggestedActions && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                  {m.suggestedActions.map((act) => (
                    <button
                      key={act.label}
                      onClick={() => navigate(act.url)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 text-xs font-medium flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <span>{act.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {m.sender === 'USER' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="pt-4 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Copilot about resume advice, skill gaps, role roadmaps, or fellowships..."
          className="flex-1 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm shadow-xl"
        />
        <button
          type="submit"
          className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/25"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
export default CareerCopilotPage;
