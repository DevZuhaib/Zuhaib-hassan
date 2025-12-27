
import React from 'react';
import { User, AppView } from '../types';

interface NavbarProps {
  user: User | null;
  setView: (view: AppView) => void;
  currentView: AppView;
  cartCount: number;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setView, currentView, cartCount, onAuthClick, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('store')}
      >
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">A</div>
        <span className="text-xl font-bold font-display tracking-tighter hidden sm:inline">АЙЕША 𝗛𝗔𝗦𝗦𝗔𝗡 ™</span>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={() => setView('store')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'store' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
        >
          Home
        </button>

        <button 
          onClick={() => setView('live')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 ${currentView === 'live' ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
        >
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          LIVE
        </button>

        <button 
          onClick={() => setView('services')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'services' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
        >
          SERVICES
        </button>

        <button 
          onClick={() => setView('other')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'other' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
        >
          OTHER
        </button>

        <button 
          onClick={() => setView('contact')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'contact' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
        >
          Contact Now
        </button>
        
        <div className="flex items-center gap-2 md:gap-4 border-l border-white/10 pl-4 md:pl-8">
          <button 
            onClick={() => setView('cart')}
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#0f172a]">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('profile')}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button 
                onClick={onLogout}
                className="text-[9px] font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-colors hidden sm:block"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="px-5 py-2 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-lg"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
