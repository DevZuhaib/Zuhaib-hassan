
import React, { useState } from 'react';

interface AuthModalProps {
  onLogin: (email: string, pass: string) => boolean;
  onSignup: (name: string, email: string, pass: string, phone: string) => boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onSignup, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signin') {
      if (!email || !password) {
        setError('Verification parameters required');
        return;
      }
      onLogin(email, password);
    } else {
      if (!name || !email || !password || !phone) {
        setError('Complete registry dossier required');
        return;
      }
      if (password.length < 8) {
        setError('Minimum 8 character encryption key required');
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        setError('Invalid PK transmission channel (Phone)');
        return;
      }
      onSignup(name, email, password, phone);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-10">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="glass w-full max-w-md rounded-[3rem] p-10 border border-white/10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500 overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] -z-10"></div>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[1.5rem] flex items-center justify-center font-black text-2xl mx-auto mb-6 shadow-2xl shadow-blue-500/20 rotate-3 group">A</div>
          <h2 className="text-4xl font-black font-display text-white uppercase tracking-tighter mb-2">
            {mode === 'signin' ? 'Verify Portal' : 'Establish Link'}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.4em]">Secure Gateway Active</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-10">
           {error && (
             <div className="bg-red-500/5 border border-red-500/20 text-red-500 p-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-center">
               Error: {error}
             </div>
           )}
           
           {mode === 'signup' && (
             <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-5">
                <div>
                  <label className="block text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mb-2 ml-1">Identity Tag</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Legal Name" 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-800 text-xs font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mb-2 ml-1">PK Frequency (Phone)</label>
                  <div className="flex gap-2">
                    <span className="flex items-center justify-center px-5 bg-white/5 border border-white/5 rounded-2xl text-gray-700 text-xs font-black">+92</span>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="3xx xxxxxxx" 
                      className="flex-grow bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-800 text-xs font-medium" 
                    />
                  </div>
                </div>
             </div>
           )}

           <div>
              <label className="block text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mb-2 ml-1">Registry Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@registry.com" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-800 text-xs font-medium" 
              />
           </div>

           <div>
              <label className="block text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mb-2 ml-1">Encryption Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-800 text-xs font-medium" 
              />
           </div>

           <button 
             type="submit"
             className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 shadow-2xl shadow-white/5 mt-6"
           >
             {mode === 'signin' ? 'Initiate Link' : 'Commit Registry'}
           </button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
            className="text-gray-700 hover:text-blue-500 text-[8px] font-black uppercase tracking-[0.4em] transition-colors"
          >
            {mode === 'signin' ? "Not in registry? Authenticate" : "Existing Identity? Access Link"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
