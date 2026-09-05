import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Send, X, Bot, User, Trash2, ArrowRight, Play, BookOpen, 
  CheckCircle2, HelpCircle, Flame, ShieldCheck, Terminal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { aceAiTutor, AiChatMessage } from '../../services/ai/aceAiTutorEngine';

interface AceAiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AceAiAssistant: React.FC<AceAiAssistantProps> = ({ isOpen, onClose }) => {
  const { events, user } = useApp();
  const { coins, xp } = useLearnPlay();

  const [messages, setMessages] = useState<AiChatMessage[]>(() => {
    const saved = localStorage.getItem('ace_ai_2_chat_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-init',
        sender: 'bot',
        text: "### ✨ Welcome to ACE AI 2.0\nI'm your context-aware educational tutor. I can explain code concepts, diagnose errors, recommend personalized learning paths, or quiz your knowledge across Python, DSA, SQL, and Web Development.\n\n*What would you like to learn today?*",
        timestamp: 'Just now'
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('ace_ai_2_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    "What is binary search?",
    "Teach me Python roadmap",
    "Quiz me on JavaScript",
    "Which course should I take?",
    "Show upcoming hackathons",
    "How many coins do I have?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aceAiTutor.processUserQuery(query, {
        studentName: user?.name || 'Student',
        coins,
        xp,
        events
      });

      const botMsg: AiChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        cards: response.cards,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'bot',
        text: "### ✨ Chat reset.\nWhat concept or coding question can I explain next?",
        timestamp: 'Just now'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col font-sans">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 text-white flex items-center justify-between shadow-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center ring-2 ring-white/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm flex items-center gap-1.5">
              ACE AI 2.0 <span className="text-[10px] bg-emerald-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">TUTOR</span>
            </h3>
            <p className="text-[11px] text-purple-100">Personal Learning & Opportunity Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearHistory}
            title="Clear Chat History"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-xs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="flex-shrink-0 text-[11px] font-medium px-2.5 py-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 transition-colors shadow-2xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'bot' && (
              <div className="w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 text-xs mt-1 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-3xl p-4 text-xs space-y-3 leading-relaxed shadow-2xs ${
                m.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-br-xs font-medium'
                  : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                {m.text}
              </div>

              {m.cards && m.cards.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {m.cards.map((c, i) => (
                    <div key={i} className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">{c.title}</span>
                        {c.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-600 text-white font-mono">
                            {c.badge}
                          </span>
                        )}
                      </div>
                      {c.subtitle && <p className="text-[11px] text-slate-500">{c.subtitle}</p>}
                      <Link to={c.actionUrl} onClick={onClose} className="block pt-1">
                        <button className="w-full py-1.5 px-3 bg-brand-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-brand-700 transition-colors">
                          {c.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              <span className={`text-[9px] block text-right font-mono ${
                m.sender === 'user' ? 'text-purple-200' : 'text-slate-400'
              }`}>
                {m.timestamp}
              </span>
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 text-xs mt-1 shadow-2xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pl-2">
            <Bot className="w-4 h-4 text-brand-600 animate-spin" />
            <span>ACE AI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask ACE AI a concept, error, or course..."
          className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs outline-none text-slate-800 dark:text-slate-200 focus:border-brand-500 transition-colors"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="p-2.5 rounded-2xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40 transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
