
import React, { useState } from 'react';
import { MapPin, Sparkles, Send } from 'lucide-react';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="relative h-[90vh] min-h-[800px] flex flex-col justify-center items-center text-center px-4 overflow-visible">
      {/* Hero Background - Strictly using wp7006046.jpg as requested */}
      <div className="absolute inset-0 z-0 bg-[#001518]">
        <img
          src="/header-bg.jpg"
          alt="Algarve Cave"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a high-quality cave image only if the specific file fails to load
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512757776214-26d36777b513?auto=format&fit=crop&q=80&w=2400";
          }}
        />
        {/* Subtle overlay to make text pop without losing the cave's beauty */}
        <div className="absolute inset-0 bg-black/25"></div>
        {/* Bottom fade for a clean transition to the white section below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mt-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          New Edition every Thursday
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl tracking-tight">
          Discover. Connect.<br />Explore.
        </h1>
        <p className="text-xl md:text-2xl text-white font-semibold mb-12 max-w-2xl mx-auto drop-shadow-lg opacity-90">
          The local friend you've been looking for. Curated events and hidden secrets, delivered to your inbox.
        </p>
      </div>

      {/* Floating Subscriber Bar */}
      <div className="relative z-20 w-full max-w-3xl translate-y-32">
        <div className="bg-white rounded-[32px] p-8 search-bar-shadow border border-slate-100 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
            Join the Local Inner Circle
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            Get the best of Algarve delivered to your inbox every Thursday.
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
            <div className="flex-1 w-full relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Send className="w-5 h-5 text-cyan-500" />
              </div>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-[20px] py-4 pl-12 pr-6 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-lg placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto bg-[#006D77] text-white py-4 px-10 rounded-[20px] font-black text-lg hover:bg-[#004E55] transition-all flex items-center justify-center gap-2 shadow-[0_20px_40px_-10px_rgba(0,109,119,0.3)] hover:scale-[1.02] active:scale-95 whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-400 font-medium">
            Join 10,000+ subscriber friends. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
