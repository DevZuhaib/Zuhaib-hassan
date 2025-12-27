
import React, { useState } from 'react';

const ContactView: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black font-display text-white mb-4">CONTACT NOW</h2>
        <p className="text-gray-400 max-w-xl mx-auto">We're here to help you 24/7. Reach out via our direct messaging system or get instant help on WhatsApp.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* WhatsApp Help Center */}
        <div className="glass rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.4 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">WhatsApp Help Center</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">Connect with our support team instantly on WhatsApp for order queries, technical support, or payment approvals.</p>
          </div>
          <a 
            href="https://wa.me/923255540480" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-center transition-all shadow-xl shadow-green-600/20 flex items-center justify-center gap-2"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Messaging Form */}
        <div className="glass rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
          {sent ? (
            <div className="bg-blue-500/20 border border-blue-500/50 text-blue-400 p-6 rounded-2xl text-center">
              <p className="font-bold">Message Sent Successfully!</p>
              <p className="text-sm mt-1 text-gray-400">Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
              <textarea 
                placeholder="How can we help you?" 
                rows={4}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all resize-none"
              ></textarea>
              <button 
                type="submit"
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all transform active:scale-95"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactView;
