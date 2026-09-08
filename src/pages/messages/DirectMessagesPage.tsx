import React, { useState } from 'react';
import { directMessagingDatabase, ChatConversation, ChatMessage } from '../../services/db/directMessagingDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { MessageSquare, Send, Paperclip, Smile, ShieldCheck, Pin, CheckCheck } from 'lucide-react';

export function DirectMessagesPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(directMessagingDatabase.getConversations());
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || '');
  const [messages, setMessages] = useState<ChatMessage[]>(directMessagingDatabase.getMessages(selectedConvId));
  const [inputVal, setInputVal] = useState<string>('');

  const activeConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const handleSelectConv = (id: string) => {
    setSelectedConvId(id);
    setMessages(directMessagingDatabase.getMessages(id));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !selectedConvId) return;

    directMessagingDatabase.sendMessage(selectedConvId, inputVal.trim());
    setInputVal('');
    setMessages(directMessagingDatabase.getMessages(selectedConvId));
    setConversations(directMessagingDatabase.getConversations());
  };

  const handleReaction = (msgId: string, emoji: string) => {
    directMessagingDatabase.toggleReaction(selectedConvId, msgId, emoji);
    setMessages(directMessagingDatabase.getMessages(selectedConvId));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="Direct & Channel Messaging 2.0"
          description="End-to-end authenticated communications with faculty mentors, hackathon squads, and student clubs."
          badge="MESSAGE SECURITY ENFORCED"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[650px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          
          {/* Conversation Sidebar */}
          <div className="border-r border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">My Channels & Mentors</h3>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
              {conversations.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectConv(c.id)}
                  className={`w-full p-4 flex items-start gap-3 text-left transition-all ${
                    selectedConvId === c.id
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <img src={c.avatarUrl} alt={c.title} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{c.title}</h4>
                      {c.isPinned && <Pin className="w-3 h-3 text-indigo-500" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{c.lastMessageSnippet}</p>
                    <span className="text-[10px] font-mono text-indigo-500 uppercase">{c.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Chat Thread */}
          <div className="col-span-2 flex flex-col h-full">
            {activeConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <img src={activeConv.avatarUrl} alt={activeConv.title} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activeConv.title}</h4>
                      <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Authenticated Channel Scope
                      </p>
                    </div>
                  </div>
                  <ACEBadge variant="primary" size="sm">{activeConv.type}</ACEBadge>
                </div>

                {/* Messages List */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.senderId === 'usr_student_dileep' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-slate-500">{msg.senderName}</span>
                        {msg.senderRoleBadge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-mono">{msg.senderRoleBadge}</span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <div
                        className={`max-w-md p-3 rounded-2xl text-xs space-y-2 ${
                          msg.senderId === 'usr_student_dileep'
                            ? 'bg-indigo-600 text-white rounded-br-none shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                        }`}
                      >
                        {msg.replyToSnippet && (
                          <div className="p-2 rounded bg-black/10 border-l-2 border-white/50 text-[10px] italic">
                            Replying to: {msg.replyToSnippet}
                          </div>
                        )}

                        <p className="leading-relaxed">{msg.content}</p>

                        {msg.attachments.length > 0 && (
                          <div className="pt-2 space-y-1">
                            {msg.attachments.map(att => (
                              <div key={att.id} className="p-2 rounded-xl bg-black/20 flex items-center gap-2 text-[11px]">
                                <Paperclip className="w-3.5 h-3.5" />
                                <span className="truncate">{att.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Emoji Reactions */}
                      <div className="flex gap-1 mt-1">
                        {['👍', '🎉', '🚀', '❤️'].map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(msg.id, emoji)}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:scale-110 transition"
                          >
                            {emoji}
                          </button>
                        ))}
                        {msg.reactions.map((r, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold">
                            {r.emoji}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder="Type message with team or mentor..."
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs font-bold">
                Select a conversation to start messaging.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
