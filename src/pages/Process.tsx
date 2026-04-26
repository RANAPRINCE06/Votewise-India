import { BadgeCheck, Calendar, Flag, Home, CheckCircle, FileText, QrCode, Edit3, Image as ImageIcon, MapPin, ArrowRight, Bot, Phone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Process() {
  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <header className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
            <BadgeCheck className="w-4 h-4 text-blue-600" />
            OFFICIAL CITIZEN PORTAL
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">First-Time Voter Guide</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Empowering the youth of India to participate in the world's largest democratic exercise with clarity and confidence.</p>
      </header>

      {/* Quick Progress Tracker */}
      <div className="glass-card p-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center text-blue-600 font-bold text-lg">
                    25%
                </div>
                <div>
                    <p className="text-xl font-bold text-slate-900">Your Readiness</p>
                    <p className="text-slate-500 text-sm">Step 1 of 4 Completed</p>
                </div>
            </div>
            <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
                <div className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium flex items-center gap-2 shadow-sm">
                    <CheckCircle className="w-4 h-4" /> Eligibility
                </div>
                <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer text-sm font-medium">Documents</div>
                <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer text-sm font-medium">Application</div>
                <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer text-sm font-medium">Booth Locator</div>
            </div>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Section 1: Who can vote */}
        <section className="md:col-span-7 glass-card glass-card-hover overflow-hidden group">
            <div className="relative h-48 w-full border-b border-slate-100">
                <img 
                    alt="diverse group of young Indian students smiling" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzpZE-y9QhumyOtf5jSx_oDJB0_WMnlFtDXCY58qHSvC1uceMa-_NIk6H7g1S7UWXk1-KGvS19lPMeVJHL7RAW_nTYt3yo5-YYZP_xJ0zK2gCiiNFkTzPoZvBaapoLwVajXgxDcUHKvtignsrZdcgYa9QXGLI9qBEnzF9ZjNWpZ90WuYBv4X01Qt4cLwlibo3D_fFCvDTID6mojt01uImQXuTQraK3QVRZ5Ep_7btfRoTFH-ne5uGD5RpVc9vqDaA8t2AJhnZYPwo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                    <h2 className="text-2xl font-bold text-white">1. Are you Eligible?</h2>
                </div>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-blue-50 border border-blue-100">
                    <Calendar className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-blue-900">Age Requirement</p>
                        <p className="text-blue-800/80 text-sm mt-1 leading-relaxed">You must be 18 years of age or older as of the qualifying date (January 1st of the current year).</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden group-hover:border-slate-200 transition-colors">
                        <Flag className="w-5 h-5 text-indigo-600 mb-3" />
                        <p className="font-bold text-slate-900 mb-1">Citizenship</p>
                        <p className="text-sm text-slate-600">Must be a citizen of India residing within the territory.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden group-hover:border-slate-200 transition-colors">
                        <Home className="w-5 h-5 text-emerald-600 mb-3" />
                        <p className="font-bold text-slate-900 mb-1">Ordinary Resident</p>
                        <p className="text-sm text-slate-600">Must be an ordinary resident in the constituency where registration is sought.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: Required Documents */}
        <section className="md:col-span-5 glass-card glass-card-hover p-6 flex flex-col justify-between transition-colors hover:border-slate-300">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-slate-700" />
                    <h2 className="text-2xl font-bold text-slate-900">2. Required Documents</h2>
                </div>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">Keep digital scans (JPG/PDF, max 2MB) ready before starting your application.</p>
                <div className="space-y-2">
                    {['Recent Passport Size Photo', 'Age Proof (Aadhaar/Birth Cert)', 'Address Proof (Utility Bill/Rent)'].map((doc, idx) => (
                        <label key={idx} className="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                            <input className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-4" type="checkbox" />
                            <span className="text-slate-700 font-medium text-sm">{doc}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-emerald-800 text-xs font-bold font-serif">i</span>
                    </div>
                    <p className="text-emerald-800 text-sm font-medium">Aadhaar card is highly recommended for faster processing and verification.</p>
                </div>
            </div>
        </section>

        {/* Section 3: How to apply */}
        <section className="md:col-span-12 lg:col-span-8 glass-card glass-card-hover p-8 group">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">3. How to Apply (Form 6)</h2>
                    <div className="space-y-6">
                        {[
                            { num: '1',  desc: <>Visit the <span className="font-semibold text-slate-900">NVSP Portal</span> or download the <span className="font-semibold text-slate-900">Voter Helpline App</span>.</> },
                            { num: '2',  desc: <>Select <span className="text-blue-600 font-semibold">"New Voter Registration (Form 6)"</span> from the dashboard.</> },
                            { num: '3',  desc: 'Upload your documents and fill in your constituency details accurately.' },
                            { num: '4',  desc: <>Submit and note down your <span className="font-semibold text-slate-900">Reference ID</span> for tracking status.</> }
                        ].map((step, i) => (
                          <div key={i} className="flex gap-5 items-start">
                              <div className="shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">{step.num}</div>
                              <p className="text-slate-600 pt-1 text-base">{step.desc}</p>
                          </div>
                        ))}
                    </div>
                    <button className="mt-10 interactive-btn btn-primary shadow-lg shadow-blue-500/20 w-full sm:w-auto h-12 text-sm">
                        Launch NVSP Portal <ArrowRight className="w-4 h-4 ml-2 -rotate-45" />
                    </button>
                </div>
                <div className="md:w-64 shrink-0 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 group-hover:border-slate-200 transition-colors">
                    <QrCode className="w-16 h-16 text-slate-800 mb-6" />
                    <p className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-widest">Mobile Registration</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Scan to download the Voter Helpline App on your smartphone.</p>
                </div>
            </div>
        </section>

        {/* Section 4: Correct Voter Details */}
        <section className="md:col-span-12 lg:col-span-4 glass-card glass-card-hover p-6 relative overflow-hidden bg-gradient-to-br from-white to-slate-50">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Correcting Details?</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">Already registered but have errors in your name, photo, or address? Use <span className="font-bold text-blue-600">Form 8</span>.</p>
            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <Edit3 className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Name Correction</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <ImageIcon className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">New Photo Upload</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Address Change</span>
                </div>
            </div>
            <a href="#" className="inline-flex items-center text-blue-600 font-bold text-sm hover:underline cursor-pointer">
                Learn about Form 8 <ArrowRight className="w-4 h-4 ml-1" />
            </a>
        </section>

        {/* Section 5: Polling booth locator */}
        <section className="md:col-span-12 glass-card glass-card-hover overflow-hidden transition-all group">
            <div className="flex flex-col md:flex-row h-full">
                <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-center bg-white">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Find Your Booth</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">Locate your designated polling station using your EPIC number or address details.</p>
                    <div className="relative mb-6">
                        <input className="w-full bg-white border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-blue-600 px-0 py-3 text-lg font-bold placeholder:text-slate-400 placeholder:font-normal outline-none transition-colors" placeholder="Enter EPIC Number..." type="text" />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer p-2 transition-colors">
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-sm text-slate-500">Don't have your EPIC number? <a href="#" className="text-blue-600 underline font-medium cursor-pointer hover:text-blue-700">Search by details</a></p>
                </div>
                <div className="md:w-1/2 h-64 md:h-[400px] relative border-t md:border-t-0 md:border-l border-slate-100">
                    <img 
                        alt="voters map" 
                        className="w-full h-full object-cover grayscale opacity-60 mix-blend-multiply bg-slate-50" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoe-0mR3gmD1hZmMWs19FTbNGvuKdgP_spEq9FmWQ_EhIGYX87Wx38ielGCOirIdTvP0ey45vES6n9qZk13pl_l6Ll0kWnoXlRFGVxk4IO-uy7zuBL7ETo0QbQKp9O959H7D03XhKZB_baoFVLkMVnRtUz94L0VbWOMq_GM8qZON7U6zUpbDJ8qkUuP5s1CVGoH_YiF5sxyve4rjW4eJ1gVCKPlxCrxZPkUojcsAh2mrZh9Q3NmovuVoYvkj6W-lDMQjzzNGhkTso"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-white cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-inner">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-900 text-base leading-tight mb-1">Interactive Map</p>
                                <p className="text-xs text-slate-500">Click to open directions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>

      {/* Support Section */}
      <section className="mt-20 text-center bg-slate-900 p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 opacity-50 mix-blend-overlay"></div>
        <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 text-white">Still have questions?</h3>
            <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">Our AI assistant is available 24/7 to help you with the registration process and answer any queries regarding voter rights.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <Link to="/ai-assistant" className="interactive-btn bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/30 gap-2 h-12">
                    <Bot className="w-5 h-5" /> Ask AI Assistant
                </Link>
                <button className="interactive-btn border border-slate-700 bg-slate-800 text-white hover:bg-slate-700 gap-2 h-12">
                    <Phone className="w-5 h-5" /> Toll Free: 1950
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}
