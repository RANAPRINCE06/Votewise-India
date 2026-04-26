import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User as UserIcon, ShieldCheck, Info, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import ReactMarkdown from 'react-markdown';
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export default function AiAssistant() {
  const { isAuthenticated, firebaseUser } = useAuth();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!firebaseUser) return;

    // Load chat history
    const q = query(
      collection(db, 'chatHistory'),
      where('userId', '==', firebaseUser.uid),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(doc => ({
        id: doc.id,
        role: 'user' as const, // We'll reconstruct pairs or just show them
        text: doc.data().message,
        response: doc.data().response
      }));

      // Flatten history into role messages
      const flattened: Message[] = [];
      history.forEach(h => {
        flattened.push({ id: h.id + '_u', role: 'user', text: h.text });
        if (h.response) {
            flattened.push({ id: h.id + '_a', role: 'ai', text: h.response });
        }
      });
      setMessages(flattened);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, navigate, firebaseUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !firebaseUser) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to get response');
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: data.response }]);
      
      // Save chat history to Firestore explicitly
      await addDoc(collection(db, 'chatHistory'), {
         userId: firebaseUser.uid,
         message: userMessage,
         response: data.response,
         createdAt: serverTimestamp()
      });
    } catch (error: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 font-sans">
      {/* Header */}
      <header className="flex-shrink-0 h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md z-10 shadow-sm relative">
        <div className="flex items-center gap-4">
            <Link to="/" className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-slate-900 leading-tight text-lg tracking-tight">VoteWise AI Guide</h1>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold flex items-center gap-1 opacity-90 mt-0.5">
                        <ShieldCheck className="w-3 h-3" /> SECURE ASSISTANT
                    </p>
                </div>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 shadow-inner">
            <Info className="w-4 h-4" /> Official Info Only
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 relative">
        <div className="absolute inset-0 bg-slate-100 opacity-50 mix-blend-multiply border-red-500" style={{ backgroundSize: '24px 24px', backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)' }}></div>
        <div className="relative z-10 space-y-6">
            
            {messages.length === 0 && (
              <div className="flex justify-center my-8 md:my-12">
                  <div className="text-center space-y-8 max-w-md">
                      <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 mx-auto flex items-center justify-center text-blue-600 shadow-inner">
                          <Bot className="w-10 h-10" />
                      </div>
                      <div>
                          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">How can I help you today?</h2>
                          <p className="text-base text-slate-600 leading-relaxed">I can assist you in finding your polling booth, explaining the Form 6 process, or translating electoral rules.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          "Where is my polling booth?",
                          "How do I apply for Voter ID?",
                          "What is Form 6?",
                          "Election dates in Maharashtra"
                        ].map(q => (
                          <button 
                            key={q}
                            onClick={() => { setInput(q); }}
                            className="p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-50 transition-all text-left shadow-sm"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                  </div>
              </div>
            )}

            <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md mt-1 border ${
                      msg.role === 'user' ? 'bg-slate-200 border-slate-300' : 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-400'
                    }`}>
                      {msg.role === 'user' ? <UserIcon className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5 text-white" />}
                    </div>
                    
                    <div className={`${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white p-5 rounded-2xl rounded-tr-sm shadow-md border border-slate-800' 
                        : 'glass-card bg-white p-6 rounded-2xl rounded-tl-sm shadow-md border border-slate-200'
                    }`}>
                      {msg.role === 'user' ? (
                        <p className="text-base leading-relaxed">{msg.text}</p>
                      ) : (
                        <div className="markdown-body prose prose-slate max-w-none text-slate-800 text-sm md:text-base leading-relaxed">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex gap-4 self-start max-w-[90%] md:max-w-[80%]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-400 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                      <Bot className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div className="glass-card bg-white p-6 rounded-2xl rounded-tl-sm shadow-md border border-slate-200 flex items-center gap-2 text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-shrink-0 p-4 sm:p-6 border-t border-slate-200 bg-white z-20 w-full relative">
        <div className="max-w-4xl mx-auto">
            <div className="relative flex items-center group">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={loading || !isAuthenticated}
                    placeholder="Message the AI Assistant..." 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all rounded-2xl py-4 pl-6 pr-16 outline-none text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal shadow-inner disabled:opacity-60"
                />
                <button onClick={handleSend} disabled={loading || !isAuthenticated} className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-md group-focus-within:bg-blue-600 group-focus-within:hover:bg-blue-700 disabled:opacity-60">
                    <Send className="w-5 h-5 -ml-0.5" />
                </button>
            </div>
            <div className="text-center mt-3">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">AI can make mistakes. Verify critical dates on the official ECI portal.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
