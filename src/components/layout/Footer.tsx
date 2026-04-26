import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-700 bg-[#000080] text-white font-body-md text-sm">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xl font-bold text-white mb-2 block font-display-lg">VoteWise India</span>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed">
            Empowering the world's largest democracy with transparent, accessible, and AI-driven electoral information.
            A Digital India Sovereignty Initiative.
          </p>
          <div className="flex gap-4 pt-2">
            <span className="px-3 py-1 rounded bg-white/10 text-xs font-bold border border-white/20">MEITY VERIFIED</span>
            <span className="px-3 py-1 rounded bg-white/10 text-xs font-bold border border-white/20">SECURE CONNECT</span>
          </div>
        </div>
        
        <div className="flex flex-col md:items-end gap-6 w-full">
          <div className="grid grid-cols-2 gap-8 text-left md:text-right w-full md:w-auto">
            <div className="space-y-3">
              <div className="text-white font-bold uppercase text-xs tracking-widest mb-2 opacity-60">Legal</div>
              <Link to="#" className="block text-slate-300 hover:text-white hover:translate-x-1 transition-transform duration-200">Privacy Policy</Link>
              <Link to="#" className="block text-slate-300 hover:text-white hover:translate-x-1 transition-transform duration-200">Terms of Service</Link>
            </div>
            <div className="space-y-3">
              <div className="text-white font-bold uppercase text-xs tracking-widest mb-2 opacity-60">Resources</div>
              <Link to="#" className="block text-slate-300 hover:text-white hover:translate-x-1 transition-transform duration-200">ECI Portal</Link>
              <Link to="#" className="block text-slate-300 hover:text-white hover:translate-x-1 transition-transform duration-200">Digital India</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
         <p>© 2026 VoteWise India. A Digital India Sovereignty Initiative.</p>
         <p>Support: digital-help@votewise.gov.in</p>
      </div>
    </footer>
  );
}
