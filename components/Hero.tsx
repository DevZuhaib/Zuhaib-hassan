
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="text-center">
        <div className="inline-block px-4 py-1.5 rounded-full glass border border-white/10 mb-6 transform hover:scale-105 transition-transform cursor-default">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Exclusive 3D Collection</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-display tracking-tightest mb-8 text-white leading-[1.1]">
          ELEVATE YOUR <br />
          <span className="text-gradient">LIFESTYLE.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light mb-12">
          Experience the future of digital shopping with our curated 3D-inspired marketplace. Premium items, seamless payments, and absolute quality.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-white/5">
            Explore Store
          </button>
          <button className="px-10 py-4 glass border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all transform hover:-translate-y-1">
            New Arrivals
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
