import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Settings, Users, Database, LayoutDashboard, ShieldAlert, Plus, Loader2 } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Timeline Form State
  const [tlTitle, setTlTitle] = useState('');
  const [tlDesc, setTlDesc] = useState('');
  const [tlDate, setTlDate] = useState('');
  const [tlPhase, setTlPhase] = useState('Registration');
  const [tlState, setTlState] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const handleCreateTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      const eventData: any = {
        title: tlTitle,
        description: tlDesc,
        date: tlDate,
        phase: tlPhase,
        createdAt: serverTimestamp()
      };
      
      if (tlState) {
        eventData.state = tlState;
      }
      
      await addDoc(collection(db, 'timeline'), eventData);
      
      setMessage('Timeline event created successfully!');
      setTlTitle(''); setTlDesc(''); setTlDate(''); setTlState('');
    } catch (err: any) {
      setMessage(err.message || 'Failed to create timeline event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 mix-blend-overlay"></div>
        <div className="relative z-10 flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <ShieldAlert className="w-6 h-6 text-indigo-300" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">VoteWise Admin Portal</h1>
        </div>
        <p className="text-slate-300 max-w-2xl text-lg relative z-10">
          Manage platform content, AI configurations, and monitor civic engagement metrics across India.
        </p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Dashboard</button>
        <button onClick={() => setActiveTab('timeline')} className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'timeline' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Manage Timeline</button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 bg-white hover:border-indigo-200 transition-colors cursor-pointer group">
            <Users className="w-8 h-8 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">User Management</h3>
            <p className="text-slate-600 text-sm">View registered citizens, analytics, and activity.</p>
          </div>
          
          <div className="glass-card p-6 bg-white hover:border-emerald-200 transition-colors cursor-pointer group" onClick={() => setActiveTab('timeline')}>
            <Database className="w-8 h-8 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Content Modules</h3>
            <p className="text-slate-600 text-sm">Update timelines, FAQs, and state-wise election data.</p>
          </div>
          
          <div className="glass-card p-6 bg-white hover:border-blue-200 transition-colors cursor-pointer group">
            <LayoutDashboard className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Quizzes & Certs</h3>
            <p className="text-slate-600 text-sm">Manage educational assessments and scores.</p>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="glass-card p-8 bg-white max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-indigo-600" /> Add Timeline Event
          </h2>
          
          {message && (
            <div className={`mb-6 p-4 rounded-xl border text-sm font-medium ${message.includes('success') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleCreateTimeline} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
              <input required value={tlTitle} onChange={e => setTlTitle(e.target.value)} type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Voter Registration Starts" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
              <input required value={tlDate} onChange={e => setTlDate(e.target.value)} type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 15th April 2024" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Phase</label>
              <select value={tlPhase} onChange={e => setTlPhase(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="Registration">Registration</option>
                <option value="Campaigning">Campaigning</option>
                <option value="Polling Day">Polling Day</option>
                <option value="Results">Results</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">State (Optional)</label>
              <input value={tlState} onChange={e => setTlState(e.target.value)} type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Maharashtra" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
              <textarea required value={tlDesc} onChange={e => setTlDesc(e.target.value)} rows={3} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Details about this timeline event..."></textarea>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Event'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
