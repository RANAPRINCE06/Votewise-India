import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { LogOut, BookOpen, Activity, Award, CheckCircle, MapPin, Bot, MessageSquare, Users } from 'lucide-react';
import { collection, query, where, onSnapshot, getCountFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [pinCode, setPinCode] = useState('');
  const [chatCount, setChatCount] = useState(0);
  const [timelineCount, setTimelineCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Listen to user's chat count
    const chatQuery = query(collection(db, 'chatHistory'), where('userId', '==', user?.id));
    const unsubscribeChats = onSnapshot(chatQuery, (snapshot) => {
      setChatCount(snapshot.size);
    });

    // Listen to total timeline events
    const timelineQuery = query(collection(db, 'timeline'));
    const unsubscribeTimeline = onSnapshot(timelineQuery, (snapshot) => {
      setTimelineCount(snapshot.size);
    });

    return () => {
      unsubscribeChats();
      unsubscribeTimeline();
    };
  }, [isAuthenticated, navigate, user?.id]);

  if (!user) return null;

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Welcome, {user.name}</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">System Live</span>
            </div>
          </div>
          <p className="text-slate-600 mt-2">Manage your voter profile and track your civic learning.</p>
        </div>
        <button 
          onClick={() => { logout(); navigate('/login'); }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium shadow-sm w-fit"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
        {/* Profile Card */}
        <div className="md:col-span-4 space-y-8">
          <div className="glass-card p-6 bg-white border border-slate-200">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500 mb-6">{user.email}</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Account Type</span>
                <span className="text-sm font-bold text-blue-600 capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Voter Status</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Verified</span>
              </div>
            </div>
            
            <Link to="/ai-assistant" className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
              <Bot className="w-5 h-5" /> Chat with SecurAI
            </Link>

            {isAdmin && (
              <Link to="/admin" className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 neon-border">
                <ShieldAlert className="w-5 h-5" /> Enter Admin Control
              </Link>
            )}
          </div>
        </div>

        {/* Analytics & Content */}
        <div className="md:col-span-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-card p-5 bg-white border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">AI Queries</p>
                <p className="text-2xl font-bold text-slate-900">{chatCount}</p>
              </div>
            </div>
            <div className="glass-card p-5 bg-white border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Updates</p>
                <p className="text-2xl font-bold text-slate-900">{timelineCount}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 bg-white border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Learning Path</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Eligibility & Registration</h4>
                  <p className="text-sm text-slate-600 mt-1">Foundational knowledge about voter ID application.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border-2 border-blue-200">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-800">EVM & VVPAT Mastery</h4>
                  <p className="text-sm text-blue-600/80 mt-1">In progress (40% complete)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Polling Booth Locator */}
      <div className="glass-card p-8 bg-white border border-slate-200 mt-8 mb-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Polling Booth Locator</h3>
                <p className="text-sm text-slate-500">Find your designated polling station near you.</p>
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="text" 
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Enter PIN Code" 
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 outline-none focus:border-blue-500 w-full md:w-48"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 whitespace-nowrap">
                Search
              </button>
            </div>
         </div>
         
         <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
            {pinCode.length >= 6 ? (
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                loading="lazy" 
                allowFullScreen 
                src={`https://www.google.com/maps/embed/v1/place?q=${pinCode}+polling+station,India&key=mock-key-replace-in-env`}
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <MapPin className="w-12 h-12 mb-3 opacity-20" />
                <p>Enter a 6-digit PIN code to locate nearby booths.</p>
              </div>
            )}
            
            {/* Disclaimer for demo */}
            {pinCode.length >= 6 && (
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200 text-sm text-slate-700 shadow-lg">
                <p className="font-bold text-blue-600 mb-1">Google Maps Integration Ready</p>
                <p>In production, this uses real Maps API queries with verified ECI polling booth coordinates. Requires valid GOOGLE_MAPS_API_KEY environment variable.</p>
              </div>
            )}
         </div>
      </div>
      
    </div>
  );
}
