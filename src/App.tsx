import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Plus, History, LayoutGrid, Archive, Trash2, Settings, 
  UserCircle, UserCog, Share, MoreVertical, Mail, GraduationCap, 
  Dumbbell, PenLine, Paperclip, Mic, ArrowUp, Zap, ShieldCheck, 
  SlidersHorizontal, Database, Shield, UserSearch, X, Copy, 
  RefreshCw, ThumbsUp, ThumbsDown, Menu, ChevronRight
} from 'lucide-react';

// --- Data Models ---

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string | React.ReactNode;
  timestamp: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
};

const MOCK_CHATS: Record<string, ChatSession> = {
  'chat_1': {
    id: 'chat_1',
    title: 'Strategic Branding 2024',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Can you help me define the visual language for a new digital sanctuary application? It needs to feel premium, calm, and atmospheric.',
        timestamp: 'JUST NOW'
      },
      {
        id: 'm2',
        role: 'ai',
        content: (
          <div className="space-y-4">
            <p>To achieve an <strong className="text-primary">Atmospheric Intellectualism</strong> aesthetic for your digital sanctuary, I suggest moving away from rigid UI patterns and embracing the following core principles:</p>
            <ul className="space-y-3 list-none">
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span><strong>Tonal Depth:</strong> Replace traditional borders with subtle changes in surface luminance. Use #131313 for the base and #1C1B1B for raised elements.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span><strong>Editorial Typography:</strong> Use high-contrast sizing between user prompts and AI responses. Generous line-height is essential for a "reading" experience.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span><strong>Ghost Interactions:</strong> Use glassmorphism and 20px+ backdrop blurs for floating menus to maintain a sense of layered space.</span>
              </li>
            </ul>
            <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10 mt-4">
              <pre className="text-sm font-mono text-on-surface-variant whitespace-pre-wrap">
{`// Suggestion: Implementation of a "No-Line" Rule
border: none;
box-shadow: none;
background: linear-gradient(135deg, surface_low, surface);`}
              </pre>
            </div>
          </div>
        ),
        timestamp: 'JUST NOW'
      },
      {
        id: 'm3',
        role: 'user',
        content: "That's a great start. How should I approach the color palette? I want something that feels organic but technological.",
        timestamp: '2 MINUTES AGO'
      }
    ]
  },
  'chat_2': {
    id: 'chat_2',
    title: 'Creative Process',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Can you help me design a mobile-responsive interface for an AI assistant that prioritizes editorial-style typography and minimal UI noise?',
        timestamp: '10:42 AM'
      },
      {
        id: 'm2',
        role: 'ai',
        content: (
          <div className="space-y-4">
            <p>Absolutely. To achieve an <strong>editorial-style interface</strong>, we should focus on the following pillars:</p>
            <ul className="space-y-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Atmospheric Depth:</strong> Use luminance shifts instead of 1px borders to define boundaries.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Typographic Anchor:</strong> Implement Inter with specific tracking and line-heights to differentiate AI responses.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Intentional Asymmetry:</strong> Avoid identical "bubbles." Let the user's text float while the AI's content sits in a structured container.</span>
              </li>
            </ul>
          </div>
        ),
        timestamp: '10:42 AM'
      },
      {
        id: 'm3',
        role: 'user',
        content: "That sounds perfect. Let's start with the color palette. I'm thinking deep charcoals and a vibrant mint accent.",
        timestamp: '10:44 AM'
      }
    ]
  }
};

// --- Components ---

const Sidebar = ({ 
  isOpen, 
  setIsOpen, 
  currentView, 
  setCurrentView,
  setIsSettingsOpen,
  chats
}: { 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
  currentView: string;
  setCurrentView: (v: string) => void;
  setIsSettingsOpen: (v: boolean) => void;
  chats: Record<string, ChatSession>;
}) => {
  const [activeNav, setActiveNav] = useState('Workspace');

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-[#1C1B1B] flex flex-col z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static shadow-[1px_0_0_0_rgba(255,255,255,0.05)]
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-on-primary-container" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter text-primary">The Sanctuary</h1>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">Pro Model Active</p>
            </div>
          </div>
          
          <button 
            onClick={() => { setCurrentView('new'); setIsOpen(false); }}
            className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-semibold flex items-center justify-center gap-2 mb-8 transition-transform active:scale-95 duration-300"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>

          <nav className="space-y-1">
            <div className="px-2 pb-2 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Navigation</div>
            
            <button 
              onClick={() => { setCurrentView('new'); setIsOpen(false); setActiveNav('Workspace'); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-300 ease-in-out
                ${activeNav === 'Workspace' ? 'bg-[#2A2A2A] text-primary font-semibold' : 'text-[#BCCAC2] hover:bg-[#2A2A2A]/50'}
              `}
            >
              <LayoutGrid className="w-5 h-5" />
              Workspace
            </button>
            <button onClick={() => setActiveNav('History')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-300 ease-in-out ${activeNav === 'History' ? 'bg-[#2A2A2A] text-primary font-semibold' : 'text-[#BCCAC2] hover:bg-[#2A2A2A]/50'}`}>
              <History className="w-5 h-5" />
              Chat History
            </button>
            <button onClick={() => setActiveNav('Archive')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-300 ease-in-out ${activeNav === 'Archive' ? 'bg-[#2A2A2A] text-primary font-semibold' : 'text-[#BCCAC2] hover:bg-[#2A2A2A]/50'}`}>
              <Archive className="w-5 h-5" />
              Archive
            </button>
            <button onClick={() => setActiveNav('Trash')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-300 ease-in-out ${activeNav === 'Trash' ? 'bg-[#2A2A2A] text-primary font-semibold' : 'text-[#BCCAC2] hover:bg-[#2A2A2A]/50'}`}>
              <Trash2 className="w-5 h-5" />
              Trash
            </button>
          </nav>

          <div className="mt-8 space-y-1">
            <div className="px-2 pb-2 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Recent Chats</div>
            {Object.values(chats).map(chat => (
              <button 
                key={chat.id}
                onClick={() => { setCurrentView(chat.id); setIsOpen(false); }}
                className={`group w-full flex items-center justify-between px-4 py-2 rounded-xl transition-colors
                  ${currentView === chat.id ? 'bg-[#2A2A2A]/50 text-on-surface' : 'text-[#BCCAC2] hover:bg-[#2A2A2A]/50'}
                `}
              >
                <span className="truncate text-sm">{chat.title}</span>
                <div className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${currentView === chat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-white/5 space-y-1">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#BCCAC2] hover:bg-[#2A2A2A]/50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-high mt-2">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
              alt="User Profile" 
              className="w-8 h-8 rounded-full object-cover border border-white/10"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-on-surface truncate">Julian Rossi</p>
              <p className="text-[10px] text-on-surface-variant truncate">Premium Member</p>
            </div>
            <MoreVertical className="w-4 h-4 text-on-surface-variant shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
};

const TopNav = ({ 
  toggleSidebar, 
  currentView,
  chats
}: { 
  toggleSidebar: () => void;
  currentView: string;
  chats: Record<string, ChatSession>;
}) => {
  const chatTitle = chats[currentView]?.title;

  return (
    <header className="sticky top-0 z-30 bg-[#131313]/80 backdrop-blur-xl h-16 flex items-center justify-between px-4 md:px-8 transition-all">
      <div className="flex items-center gap-4 md:gap-6">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {chatTitle ? (
          <div className="hidden md:flex items-center gap-2">
            <span className="text-on-surface-variant/40 text-xs font-medium">Workspace</span>
            <ChevronRight className="w-3 h-3 text-on-surface-variant/40" />
            <span className="text-on-surface font-medium text-sm">{chatTitle}</span>
            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
            <div className="flex gap-4">
              <button className="text-primary font-medium text-sm hover:text-white transition-colors">Models</button>
              <button className="text-[#BCCAC2] font-medium text-sm hover:text-white transition-colors">Plugins</button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex gap-6 text-sm">
            <button className="text-primary font-medium hover:text-white transition-colors">Models</button>
            <button className="text-[#BCCAC2] hover:text-white transition-colors">Plugins</button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="hidden md:block px-4 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-bold hover:bg-primary/5 transition-colors uppercase tracking-wider">
          Upgrade
        </button>
        <button className="p-2 text-on-surface-variant hover:text-white transition-colors">
          <Share className="w-5 h-5" />
        </button>
        <button className="p-2 text-on-surface-variant hover:text-white transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
          alt="User Avatar" 
          className="w-8 h-8 rounded-full border border-white/10 md:hidden ml-2"
        />
      </div>
    </header>
  );
};

const NewChatView = ({ onSuggestionClick }: { onSuggestionClick: (text: string) => void }) => {
  const suggestions = [
    { icon: Mail, title: 'Help me write a professional email', desc: 'Draft a response to a delicate project update request.' },
    { icon: GraduationCap, title: 'Explain quantum computing', desc: 'Simplified concepts for a non-technical audience.' },
    { icon: Dumbbell, title: 'Design a workout plan', desc: 'A 4-week strength routine for home-based training.' },
    { icon: PenLine, title: 'Write a short story', desc: 'A sci-fi noir set on a lunar colony in the year 2140.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-12 md:py-24 animate-fade-in">
      <div className="mb-12 text-center">
        <div className="inline-block p-4 rounded-3xl bg-surface-container-low mb-6 border border-white/5 shadow-2xl">
          <Sparkles className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(97,219,180,0.3)]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4">
          How can I help you today?
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg max-w-lg mx-auto leading-relaxed opacity-80">
          Your creative space for intelligent dialogue, technical mastery, and visionary exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-32">
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => onSuggestionClick(s.desc)} className="group relative flex flex-col items-start p-6 rounded-2xl bg-surface-container-low border border-transparent hover:border-primary/20 hover:bg-surface-container-high transition-all duration-300 text-left">
            <div className="p-2 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-on-surface mb-1">{s.title}</h3>
            <p className="text-sm text-on-surface-variant">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatView = ({ chat }: { chat: ChatSession }) => {
  if (!chat) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 pt-8 pb-40 space-y-12">
      {chat.messages.map((msg, idx) => (
        <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
          {msg.role === 'user' ? (
            <>
              <div className="max-w-[85%] text-on-surface text-lg font-medium leading-relaxed text-right">
                {msg.content}
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-[10px] font-medium uppercase tracking-tighter opacity-50">
                {msg.timestamp} · You
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="bg-surface-container-low p-6 rounded-xl rounded-tl-none text-on-surface leading-relaxed text-base">
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Copy response">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Regenerate">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="h-3 w-[1px] bg-white/10 mx-1"></div>
                    <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Helpful">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Not helpful">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Fake typing indicator for visual effect if it's the end of a chat */}
      {chat.messages.length % 2 !== 0 && (
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center text-primary animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex space-x-1.5 pt-3">
            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const InputArea = ({ currentView, onSendMessage }: { currentView: string, onSendMessage: (msg: string) => void }) => {
  const isNew = currentView === 'new';
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 md:p-8 bg-gradient-to-t from-background via-background/95 to-transparent z-20 pointer-events-none">
      <div className="max-w-3xl mx-auto w-full pointer-events-auto">
        
        {/* Quick Actions (only on mobile chat view for demonstration, or hidden) */}
        {!isNew && (
          <div className="md:hidden flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
            {['Explain code', 'Summarize text', 'Generate image'].map(action => (
              <button key={action} className="whitespace-nowrap px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-[0.75rem] font-medium hover:bg-surface-bright transition-colors border border-outline-variant/10">
                {action}
              </button>
            ))}
          </div>
        )}

        <div className="relative group">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
          
          <div className={`
            relative flex items-end p-2 
            ${isNew ? 'bg-surface-container-highest rounded-3xl border border-white/5 focus-within:border-primary/30 shadow-2xl' : 'bg-surface-container-highest rounded-full shadow-2xl ring-1 ring-outline-variant/10 focus-within:ring-primary/30'}
            transition-all duration-300
          `}>
            <button className="p-3 text-on-surface-variant hover:text-primary transition-colors shrink-0">
              {isNew ? <Paperclip className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`
                flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 resize-none hide-scrollbar
                ${isNew ? 'py-3 max-h-48' : 'py-3.5 text-sm'}
              `}
              placeholder={isNew ? "Ask anything..." : "Message The Sanctuary..."}
              rows={1}
            />
            
            <div className="flex items-center gap-1 md:gap-2 p-1 shrink-0">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hidden sm:block">
                <Mic className="w-5 h-5" />
              </button>
              <button onClick={handleSubmit} className={`
                flex items-center justify-center transition-all duration-300 active:scale-95
                ${isNew ? 'p-3 bg-primary text-on-primary rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-container' : 'w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg'}
              `}>
                <ArrowUp className="w-5 h-5 font-bold" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-6 opacity-40">
          {isNew ? (
            <>
              <span className="text-[10px] flex items-center gap-1"><Zap className="w-3 h-3" /> Sanctuary Ultra 4.0</span>
              <span className="text-[10px] flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Encrypted & Private</span>
            </>
          ) : (
            <p className="text-center text-[10px] md:text-[0.65rem] tracking-wide font-medium">
              The Sanctuary can make mistakes. Verify important information.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const SettingsModal = ({ onClose, onClearHistory }: { onClose: () => void, onClearHistory: () => void }) => {
  const [activeTab, setActiveTab] = useState('General');
  const [theme, setTheme] = useState('Dark');
  const [creativity, setCreativity] = useState(70);
  const [webSearch, setWebSearch] = useState(true);
  const [visualContext, setVisualContext] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-surface/60 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-low w-full max-w-5xl h-[80vh] min-h-[600px] flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/5">
        
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-surface-container-lowest flex flex-col p-6 space-y-2 shrink-0 border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex justify-between items-center mb-6 md:mb-8 px-2">
            <h3 className="text-xl font-bold tracking-tight">Settings</h3>
            <button onClick={onClose} className="md:hidden p-2 text-on-surface-variant hover:text-on-surface">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <button onClick={() => setActiveTab('General')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${activeTab === 'General' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
            <SlidersHorizontal className="w-5 h-5" />
            General
          </button>
          <button onClick={() => setActiveTab('Data Controls')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${activeTab === 'Data Controls' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
            <Database className="w-5 h-5" />
            Data Controls
          </button>
          <button onClick={() => setActiveTab('Security')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${activeTab === 'Security' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
            <Shield className="w-5 h-5" />
            Security
          </button>
          <button onClick={() => setActiveTab('Personalization')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${activeTab === 'Personalization' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
            <UserSearch className="w-5 h-5" />
            Personalization
          </button>
          
          <div className="mt-auto hidden md:block p-4 rounded-xl bg-surface-container-high/30 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-primary">Pro Status</span>
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">Your account has active access to Sanctuary L-Series models.</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-surface-container-low relative overflow-hidden">
          <button onClick={onClose} className="hidden md:block absolute top-6 right-6 p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant z-10">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex-1 p-6 md:p-12 overflow-y-auto">
            <section className="max-w-2xl">
              <header className="mb-10">
                <h2 className="text-2xl font-bold tracking-tight mb-2">General</h2>
                <p className="text-on-surface-variant text-sm">Manage your core interface experience and model behaviors.</p>
              </header>

              <div className="space-y-10">
                {/* Theme Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="space-y-1">
                    <h4 className="font-medium">Interface Theme</h4>
                    <p className="text-xs text-on-surface-variant">Switch between dark sanctuary and high-contrast modes.</p>
                  </div>
                  <div className="flex bg-surface-container-lowest p-1 rounded-full border border-white/5 shrink-0">
                    <button onClick={() => setTheme('Dark')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${theme === 'Dark' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Dark</button>
                    <button onClick={() => setTheme('Light')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${theme === 'Light' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Light</button>
                  </div>
                </div>

                {/* Model Creativity */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <h4 className="font-medium">Model Creativity</h4>
                      <p className="text-xs text-on-surface-variant">Adjust the balance between factual and imaginative responses.</p>
                    </div>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{(creativity / 100).toFixed(1)} ({creativity < 40 ? 'Precise' : creativity > 70 ? 'Creative' : 'Balanced'})</span>
                  </div>
                  <div className="relative h-1.5 w-full bg-surface-container-highest rounded-full">
                    <input type="range" min="0" max="100" value={creativity} onChange={(e) => setCreativity(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: `${creativity}%` }}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-surface shadow-lg rounded-full pointer-events-none" style={{ left: `calc(${creativity}% - 8px)` }}></div>
                  </div>
                </div>

                {/* Advanced Features */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Advanced Features</h4>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Real-time Web Search</p>
                      <p className="text-xs text-on-surface-variant">Allow the assistant to browse current events.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" className="sr-only peer" checked={webSearch} onChange={(e) => setWebSearch(e.target.checked)} />
                      <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Visual Context Analysis</p>
                      <p className="text-xs text-on-surface-variant">Identify and interpret uploaded images and documents.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" className="sr-only peer" checked={visualContext} onChange={(e) => setVisualContext(e.target.checked)} />
                      <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="p-6 rounded-xl bg-error-container/5 border border-error/10 mt-12">
                  <h4 className="text-sm font-bold text-error mb-2">Workspace Isolation</h4>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">This will permanently clear the current workspace memory. This action cannot be reversed within the sanctuary.</p>
                  <button onClick={() => { onClearHistory(); onClose(); }} className="px-6 py-2 rounded-lg border border-error/20 text-error text-xs font-bold hover:bg-error/10 transition-colors">
                    Clear Current History
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 md:p-8 border-t border-white/5 flex justify-end gap-4 bg-surface-container-low/50 backdrop-blur-sm shrink-0">
            <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Discard</button>
            <button onClick={onClose} className="px-8 py-2.5 bg-primary text-on-primary rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('new'); // 'new' | 'chat_1' | 'chat_2'
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chats, setChats] = useState<Record<string, ChatSession>>(MOCK_CHATS);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    let chatId = currentView;
    if (chatId === 'new') {
      chatId = `chat_${Date.now()}`;
      setChats(prev => ({
        ...prev,
        [chatId]: {
          id: chatId,
          title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
          messages: []
        }
      }));
      setCurrentView(chatId);
    }

    const newMessage: Message = {
      id: `m_${Date.now()}`,
      role: 'user',
      content,
      timestamp: 'JUST NOW'
    };

    setChats(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        messages: [...(prev[chatId]?.messages || []), newMessage]
      }
    }));

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `m_${Date.now() + 1}`,
        role: 'ai',
        content: "I am a simulated AI response. I can help you with your creative process, coding, and more. How else can I assist you today?",
        timestamp: 'JUST NOW'
      };
      setChats(prev => ({
        ...prev,
        [chatId]: {
          ...prev[chatId],
          messages: [...(prev[chatId]?.messages || []), aiMessage]
        }
      }));
    }, 1500);
  };

  const handleClearHistory = () => {
    if (currentView !== 'new') {
      setChats(prev => {
        const newChats = { ...prev };
        delete newChats[currentView];
        return newChats;
      });
      setCurrentView('new');
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex overflow-hidden selection:bg-primary/30">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        currentView={currentView}
        setCurrentView={setCurrentView}
        setIsSettingsOpen={setIsSettingsOpen}
        chats={chats}
      />
      
      <div className="flex-1 flex flex-col relative min-w-0 transition-all duration-300 md:ml-64">
        <TopNav 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          currentView={currentView}
          chats={chats}
        />
        
        <main className="flex-1 overflow-y-auto relative z-0">
          {currentView === 'new' ? <NewChatView onSuggestionClick={handleSendMessage} /> : <ChatView chat={chats[currentView]} />}
        </main>
        
        <InputArea currentView={currentView} onSendMessage={handleSendMessage} />
      </div>

      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} onClearHistory={handleClearHistory} />}
    </div>
  );
}
