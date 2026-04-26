import { useEffect, useState } from 'react';
import { BadgeCheck, Lock, Activity, Landmark, FileText, CheckCircle, Vote } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  phase: string;
  state?: string;
  createdAt: number;
}

export default function Timeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'timeline'), orderBy('createdAt', 'asc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<TimelineEvent, 'id'>)
      }));
      setEvents(data);
      setLoading(false);
    }, (err) => {
      console.error("Failed to listen to timeline", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getPhaseStyles = (phase: string) => {
    if (phase.includes('Registration')) return { color: 'blue', border: 'border-t-blue-500', bg: 'bg-blue-500', text: 'text-blue-600' };
    if (phase.includes('Campaign')) return { color: 'indigo', border: 'border-t-indigo-500', bg: 'bg-indigo-500', text: 'text-indigo-600' };
    if (phase.includes('Polling')) return { color: 'emerald', border: 'border-t-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-600' };
    return { color: 'amber', border: 'border-t-amber-500', bg: 'bg-amber-500', text: 'text-amber-600' };
  };

  const getPhaseIcon = (phase: string, className: string) => {
    if (phase.includes('Registration')) return <FileText className={className} />;
    if (phase.includes('Campaign')) return <Activity className={className} />;
    if (phase.includes('Polling')) return <Lock className={className} />;
    return <Landmark className={className} />;
  };

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <section className="pt-8 pb-16 text-center border-b border-slate-200">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <BadgeCheck className="w-4 h-4 text-blue-600" />
            ELECTORAL LIFECYCLE
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 max-w-4xl mx-auto leading-tight mb-6 tracking-tight">
          The Anatomy of a <span className="text-blue-600">Democratic Decision</span>.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          From the initial notification to the final count, understand the meticulously structured journey of an Indian election. A testament to massive logistical scale.
        </p>
      </section>

      <section className="py-20">
        <div className="relative">
            {/* Thread Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-indigo-200 to-emerald-200 md:-translate-x-1/2 rounded-full"></div>

            <div className="space-y-16 md:space-y-24">
                
                {error ? (
                    <div className="text-center bg-red-50 p-12 rounded-3xl border border-red-200 relative z-10 max-w-2xl mx-auto">
                        <Activity className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-red-900 mb-2">System Error</h3>
                        <p className="text-red-700">{error}</p>
                    </div>
                ) : events.length > 0 ? events.map((event, index) => {
                  const styles = getPhaseStyles(event.phase);
                  const isLeft = index % 2 === 0;

                  return (
                    <div key={event.id} className="relative flex flex-col md:flex-row items-center w-full group">
                        {isLeft ? (
                           <>
                             <div className={`w-full md:w-1/2 flex justify-start md:justify-end md:pr-16 pl-24 md:pl-0 z-10 transition-transform duration-500 hover:-translate-y-2`}>
                                <div className={`glass-card w-full max-w-lg p-8 md:p-10 border-t-4 ${styles.border} bg-white`}>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-between">
                                        {event.phase}
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">{event.date}</span>
                                    </h3>
                                    <h4 className={`text-lg font-bold ${styles.text} mb-4`}>{event.title}</h4>
                                    
                                    {event.state && (
                                       <span className={`inline-block mb-3 px-2 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded`}>{event.state}</span>
                                    )}

                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                            <div className={`absolute left-8 md:left-1/2 top-10 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full ${styles.bg} border-4 border-white flex items-center justify-center shadow-lg z-20 md:ml-0 -ml-5 transition-transform duration-300 group-hover:scale-110 text-white`}>
                                {getPhaseIcon(event.phase, "w-5 h-5 md:w-8 md:h-8")}
                            </div>
                            <div className="w-full md:w-1/2 flex justify-start py-8 md:py-0 md:pl-16 z-10 hidden md:flex transition-transform duration-500 hover:-translate-y-2 opacity-0">
                                {/* Empty space for alternating layout */}
                            </div>
                           </>
                        ) : (
                           <>
                             <div className="w-full md:w-1/2 flex justify-start py-8 md:py-0 md:pl-16 z-10 hidden md:flex transition-transform duration-500 hover:-translate-y-2 opacity-0">
                                {/* Empty space for alternating layout */}
                             </div>
                             <div className={`absolute left-8 md:left-1/2 top-10 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full ${styles.bg} border-4 border-white flex items-center justify-center shadow-lg z-20 md:ml-0 -ml-5 transition-transform duration-300 group-hover:scale-110 text-white`}>
                                {getPhaseIcon(event.phase, "w-5 h-5 md:w-8 md:h-8")}
                            </div>
                            <div className={`w-full md:w-1/2 flex justify-start pl-24 md:pl-16 z-10 transition-transform duration-500 hover:-translate-y-2`}>
                                <div className={`glass-card w-full max-w-lg p-8 md:p-10 border-t-4 ${styles.border} bg-white`}>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-between">
                                        {event.phase}
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">{event.date}</span>
                                    </h3>
                                    <h4 className={`text-lg font-bold ${styles.text} mb-4`}>{event.title}</h4>
                                    
                                    {event.state && (
                                       <span className={`inline-block mb-3 px-2 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded`}>{event.state}</span>
                                    )}

                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                           </>
                        )}
                    </div>
                  );
                }) : !loading ? (
                    <div className="text-center bg-white p-12 rounded-3xl border border-slate-200 relative z-10">
                        <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No active timelines</h3>
                        <p className="text-slate-500">Admins have not added any timeline events yet.</p>
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-3xl border border-slate-200 relative z-10">
                        <p className="text-slate-500">Loading timeline data...</p>
                    </div>
                )}

                {/* Closing Stage */}
                {events.length > 0 && (
                  <div className="relative flex flex-col items-center pt-16">
                      <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center transform rotate-45 mb-10 shadow-2xl z-20">
                          <Landmark className="w-10 h-10 text-white -rotate-45" />
                      </div>
                      <div className="text-center max-w-2xl bg-slate-50 p-10 rounded-3xl border border-slate-200 z-10">
                          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Timeline Continues</h2>
                          <p className="text-lg text-slate-600 leading-relaxed">Stay tuned for more updates on upcoming phases.</p>
                      </div>
                  </div>
                )}
            </div>
        </div>
      </section>
    </div>
  );
}
