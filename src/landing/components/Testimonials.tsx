import React from 'react';
import { TESTIMONIALS } from '../../shared/constants/constants';
import { Star, Quote } from 'lucide-react';
import CurvedSeparator from '../../shared/components/CurvedSeparator';

const Testimonials: React.FC = () => {
  return (
    <>
      <CurvedSeparator color="#004E55" flip className="-mb-1 relative z-10" />
      <section className="bg-[#004E55] py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white/90 text-sm font-bold tracking-wide">TRUSTED COMMUNITY</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
              Loved by Locals<br /><span className="text-emerald-300">& Expats</span> 💫
            </h2>
            <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join thousands of subscribers who have rediscovered the Algarve through our weekly curation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className={`
                  group relative p-6 md:p-8 rounded-[32px] md:rounded-[40px] flex flex-col h-full 
                  backdrop-blur-md border border-white/10 transition-all duration-500
                  ${idx === 1 ? 'bg-white/10 translate-y-0 md:-translate-y-4 shadow-2xl shadow-emerald-900/20' : 'bg-white/5 hover:bg-white/10 hover:-translate-y-2'}
                `}
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-white/10 group-hover:text-white/20 transition-colors">
                  <Quote size={32} className="md:w-[40px] md:h-[40px]" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(t.rating) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 flex-grow font-medium relative z-10">
                  "{t.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  <div className="relative">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/20 group-hover:border-emerald-400/50 transition-colors" />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-[#004E55]">
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base md:text-lg tracking-tight group-hover:text-emerald-300 transition-colors">{t.name}</h4>
                    <p className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/10 pt-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">1k+</div>
              <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest font-bold">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">4.9/5</div>
              <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest font-bold">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">100+</div>
              <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest font-bold">Hidden Gems</div>
            </div>
          </div>

        </div>
      </section>
      <CurvedSeparator color="#004E55" className="-mt-1 relative z-10" />
    </>
  );
};

export default Testimonials;
