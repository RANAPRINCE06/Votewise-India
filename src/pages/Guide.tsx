import { BadgeCheck, PlayCircle, ShieldCheck, Cpu, MousePointerClick, Receipt, CloudOff, Shuffle } from 'lucide-react';

export default function Guide() {
  return (
    <div className="pt-8 pb-20 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-widest uppercase">
                <BadgeCheck className="w-4 h-4" />
                EMPOWERING DEMOCRACY
            </div>
            <h1 className="text-display-lg text-slate-900 leading-tight">Master the Art of the Modern Ballot.</h1>
            <p className="text-body-lg text-slate-600 max-w-xl">Understand how India's Electronic Voting Machines (EVMs) and VVPAT systems ensure every single vote is recorded and verified with 100% integrity.</p>
            
            <div className="flex flex-wrap gap-4 pt-4">
                <button className="interactive-btn btn-primary shadow-lg shadow-blue-500/30 gap-2">
                    Interactive Demo
                    <PlayCircle className="w-5 h-5" />
                </button>
                <button className="interactive-btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm gap-2">
                    Security Protocol
                    <ShieldCheck className="w-5 h-5" />
                </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50 -z-10"></div>
                <img 
                    alt="Professional photograph of an authentic Indian Electronic Voting Machine" 
                    className="w-full h-[400px] object-contain rounded-2xl mix-blend-multiply" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0OL53WfCzb5WAgB1HVopIsB1QBAJv2iKzice-XTBK_595y9aa-XUNEuWolUqaNU0DTT4kRVIUq1zMDudD_igDb-uG78AeUoN2f-ewe7GKGxzdMpykbcD-uvDI_4svJbu-GYP2y_-cukc9zSYvcSMqHDbm4KG-9xN_ihZKTqJOFazPzgV-hQ4idwB4Sg84uOSFT2m2roDKLclofVmCRdIkHI8AV-sVtDGeP4ARnySkQgc4Hpu6dVhSsLwIph5v77vCw55epsHUPkg"
                />
            </div>
            <div className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                    <p className="font-bold text-slate-900 flex items-center gap-2">Certified Security <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span></p>
                    <p className="text-sm text-slate-500">ECI Compliant M3 Grade</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: The Hardware */}
      <section className="mb-24 mt-32">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Electoral Hardware Anatomy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card glass-card-hover p-8 flex flex-col gap-6 group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Cpu className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Control Unit (CU)</h3>
                    <p className="text-slate-600 text-base leading-relaxed">The 'brain' of the machine, managed by the Presiding Officer to enable each vote.</p>
                </div>
                <ul className="space-y-3 mt-auto pt-6 border-t border-slate-100">
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Offline Architecture
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Tamper Detection
                    </li>
                </ul>
            </div>

            <div className="glass-card glass-card-hover p-8 flex flex-col gap-6 group relative translate-y-0 md:-translate-y-4 shadow-lg border-blue-200">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <MousePointerClick className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Balloting Unit (BU)</h3>
                    <p className="text-slate-600 text-base leading-relaxed">Where citizens cast their vote. Features Braille labels and clear candidate symbols.</p>
                </div>
                <ul className="space-y-3 mt-auto pt-6 border-t border-slate-100">
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 16 Candidate Capacity
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Physical Braille Support
                    </li>
                </ul>
            </div>

            <div className="glass-card glass-card-hover p-8 flex flex-col gap-6 group">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Receipt className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">VVPAT Printer</h3>
                    <p className="text-slate-600 text-base leading-relaxed">Voter Verifiable Paper Audit Trail. Prints a visual slip for 7 seconds to confirm your choice.</p>
                </div>
                <ul className="space-y-3 mt-auto pt-6 border-t border-slate-100">
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Visual Verification
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Paper Audit Record
                    </li>
                </ul>
            </div>
        </div>
      </section>

      {/* Interactive Walkthrough */}
      <section className="bg-slate-900 rounded-[2.5rem] py-24 px-8 md:px-16 text-white w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 text-white max-w-2xl mx-auto">How to Vote: Step-by-Step</h2>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg">Follow these simple steps inside the polling booth to ensure your democratic voice is heard correctly.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[ 
                    { num: '1', title: 'Identification', desc: 'Officer verifies your EPIC ID and marks your finger with indelible ink.' },
                    { num: '2', title: 'Activation', desc: "The Presiding Officer presses the 'Ballot' button on the Control Unit." },
                    { num: '3', title: 'The Vote', desc: "Press the blue button next to your candidate's name or symbol on the Unit.", highlight: true },
                    { num: '4', title: 'Verification', desc: 'Observe the VVPAT window. A slip will appear for 7 seconds showing your choice.' }
                ].map((step, i) => (
                    <div key={i} className="relative text-center z-10 group">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold transition-transform duration-300 group-hover:scale-110 ${step.highlight ? 'bg-white text-blue-600 shadow-[0_0_30px_rgba(255,255,255,0.3)] border-4 border-blue-500' : 'bg-slate-800 text-white border border-slate-700'}`}>
                            {step.num}
                        </div>
                        <h4 className="font-bold text-xl mb-3 text-white">{step.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                        {i < 3 && <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-gradient-to-r from-slate-700 to-transparent -z-10"></div>}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-24 mt-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                    <div className="glass-card glass-card-hover p-6">
                        <CloudOff className="w-8 h-8 text-slate-700 mb-4" />
                        <h5 className="font-bold text-slate-900 text-lg">No Network</h5>
                        <p className="text-sm text-slate-500 mt-2">EVMs are standalone and never connected to the internet.</p>
                    </div>
                    <div className="glass-card glass-card-hover p-6">
                        <Cpu className="w-8 h-8 text-slate-700 mb-4" />
                        <h5 className="font-bold text-slate-900 text-lg">OTP ROM</h5>
                        <p className="text-sm text-slate-500 mt-2">The code is hard-coded at manufacturing and cannot be altered.</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="glass-card glass-card-hover p-6">
                        <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
                        <h5 className="font-bold text-slate-900 text-lg">Sealing Protocol</h5>
                        <p className="text-sm text-slate-500 mt-2">Multiple physical seals signed by party agents ensure no tampering.</p>
                    </div>
                    <div className="glass-card glass-card-hover p-6">
                        <Shuffle className="w-8 h-8 text-slate-700 mb-4" />
                        <h5 className="font-bold text-slate-900 text-lg">Randomization</h5>
                        <p className="text-sm text-slate-500 mt-2">Machines are randomized twice before being sent to polling booths.</p>
                    </div>
                </div>
            </div>
            
            <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Unshakeable Security Architecture</h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">The Election Commission of India utilizes a rigorous administrative and technical framework that makes the system robust against both cyber and physical threats.</p>
                <div className="space-y-8">
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h6 className="font-bold text-slate-900 text-xl">Administrative Safeguards</h6>
                            <p className="text-base text-slate-600 mt-2 leading-relaxed">Agents from all political parties are present during machine testing, sealing, and counting.</p>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                            <Cpu className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h6 className="font-bold text-slate-900 text-xl">Technical Integrity</h6>
                            <p className="text-base text-slate-600 mt-2 leading-relaxed">Dynamic coding and checksums ensure that only authorized Balloting Units can talk to Control Units.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
