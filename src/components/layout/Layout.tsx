import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAiAssistant = location.pathname === '/ai-assistant';

  return (
    <div className="bg-[#f8fafc] text-slate-900 font-sans min-h-screen selection:bg-blue-100 flex flex-col">
      {!isAiAssistant && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`flex-1 w-full mx-auto ${!isAiAssistant ? 'pt-24 pb-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8' : ''}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!isAiAssistant && <Footer />}
    </div>
  );
}
