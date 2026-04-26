import { BadgeCheck, Users, Building, TreePine, Map, User } from 'lucide-react';

export default function Elections() {
  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header section */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Users className="w-4 h-4 text-slate-500" />
            ELECTORAL ARCHITECTURE
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Understanding the <br className="hidden md:block"/> Elections of India</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">India operates on a federal structure. Power is distributed between the Central Government and State Governments, with local bodies forming the third tier. Citizens elect representatives across all three levels.</p>
      </div>

      {/* Main Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lok Sabha (Centerpiece) */}
        <div className="lg:col-span-8 glass-card glass-card-hover p-8 md:p-10 border-t-4 border-t-blue-600 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-900 transition-transform duration-700 group-hover:scale-110">
                <Building className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Central Government</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Lok Sabha</h2>
                <h3 className="text-xl md:text-2xl font-medium text-blue-600 mb-8">House of the People</h3>
                
                <p className="text-base md:text-lg text-slate-600 mb-12 max-w-2xl leading-relaxed">
                    The general elections held every five years to elect Members of Parliament (MPs). The alliance with the majority in the Lok Sabha forms the Government of India, led by the Prime Minister.
                </p>

                <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-slate-50 px-6 py-5 rounded-xl border border-slate-100 relative overflow-hidden">
                        <span className="text-3xl font-extrabold text-slate-900 block mb-1">543</span>
                        <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Constituencies</span>
                    </div>
                    <div className="bg-slate-50 px-6 py-5 rounded-xl border border-slate-100 relative overflow-hidden">
                        <span className="text-3xl font-extrabold text-slate-900 block mb-1">5</span>
                        <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Years Term</span>
                    </div>
                    <div className="bg-slate-50 px-6 py-5 rounded-xl border border-slate-100 relative overflow-hidden">
                        <span className="text-3xl font-extrabold text-slate-900 block mb-1">Direct</span>
                        <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Election Type</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Rajya Sabha (Side) */}
        <div className="lg:col-span-4 glass-card glass-card-hover p-8 md:p-10 border-t-4 border-t-indigo-500 flex flex-col group">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Council of States</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Rajya Sabha</h2>
            <p className="text-base text-slate-600 mb-10 leading-relaxed">Indirectly elected body representing states at the Center.</p>
            
            <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group-hover:border-indigo-200 transition-colors">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                    <span className="text-sm font-bold text-slate-700 ml-2">Members</span>
                    <span className="font-extrabold text-indigo-600 text-2xl">245</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group-hover:border-indigo-200 transition-colors">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                    <span className="text-sm font-bold text-slate-700 ml-2">Term</span>
                    <span className="font-extrabold text-indigo-600 text-2xl">6 Yrs</span>
                </div>
                <p className="text-xs text-slate-500 mt-6 italic bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">
                    * 1/3rd of members retire every 2 years. Elected by State Legislative Assembly members.
                </p>
            </div>
        </div>

        {/* State Assembly */}
        <div className="lg:col-span-6 glass-card glass-card-hover p-8 md:p-10 border-l-4 border-l-emerald-500 translate-y-0 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Map className="w-8 h-8" />
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">State Government</span>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Vidhan Sabha</h2>
                    <p className="text-base text-slate-600 mb-5 leading-relaxed">State legislative assembly elections. Citizens elect Members of Legislative Assembly (MLAs). Forms the State Government led by the Chief Minister.</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-xs font-bold text-slate-700 rounded-md">
                        <BadgeCheck className="w-4 h-4 text-emerald-500" /> Direct Voting
                    </span>
                </div>
            </div>
        </div>

        {/* Local Bodies */}
        <div className="lg:col-span-6 glass-card glass-card-hover p-8 md:p-10 border-l-4 border-l-amber-500 translate-y-0 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <TreePine className="w-8 h-8" />
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Local Government</span>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Panchayat & Municipal</h2>
                    <p className="text-base text-slate-600 mb-5 leading-relaxed">Elections for local self-government. Village panchayats in rural areas and municipal corporations in urban areas. Grassroots democracy.</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-xs font-bold text-slate-700 rounded-md">
                        <BadgeCheck className="w-4 h-4 text-amber-500" /> Micro Level
                    </span>
                </div>
            </div>
        </div>

        {/* The President */}
        <div className="lg:col-span-12 glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-200 shadow-inner">
            <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 text-slate-700 flex items-center justify-center shadow-sm shrink-0">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Presidential Elections</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">The Head of State</p>
                </div>
            </div>
            <p className="text-base text-slate-600 max-w-2xl md:text-right leading-relaxed bg-white/50 p-4 rounded-xl border border-white/60">
                Elected by an Electoral College consisting of elected members of both houses of Parliament and State Legislative Assemblies. Uses the system of proportional representation with single transferable vote.
            </p>
        </div>

      </div>
    </div>
  );
}
