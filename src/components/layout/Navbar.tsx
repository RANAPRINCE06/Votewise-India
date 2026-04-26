import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Landmark, Menu, X, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin } = useAuth();

  const navLinks = [
    { name: 'Process', path: '/process' },
    { name: 'Elections', path: '/elections' },
    { name: 'Guide', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'AI Assistant', path: '/ai-assistant' }
  ];

  const dashboardPath = isAdmin ? '/admin' : '/dashboard';

  return (
    <nav className="fixed top-0 w-full z-50 glass-card neon-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Landmark className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-headline">VoteWise India</span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/guide');
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "font-medium text-sm transition-colors",
                  isActive 
                    ? "text-blue-600 font-semibold" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          
          {isAuthenticated ? (
            <Link to={dashboardPath} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user?.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold border-2 border-transparent">
                  {user?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                </div>
              )}
              <span className="text-sm font-medium text-slate-700 hidden md:block">{user?.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="hidden sm:inline-flex interactive-btn btn-primary text-sm py-2 px-6">
              Sign in/up
            </Link>
          )}

          <button 
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/guide');
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                   isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {link.name}
              </Link>
            )
          })}
          
          <div className="pt-4 mt-2 border-t border-slate-100">
            {isAuthenticated ? (
              <Link
                to={dashboardPath}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-50"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user?.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-lg">
                    {user?.name?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">Go to Dashboard</p>
                </div>
              </Link>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2 text-base font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign in/up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
