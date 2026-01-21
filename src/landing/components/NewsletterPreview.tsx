
import React from 'react';
import { HIGHLIGHTS } from '../../shared/constants/constants';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';

const NewsletterPreview: React.FC = () => {
  return (
    <section id="preview" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest mb-3">Inside the Issues</h2>
            <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">What to expect this week</p>
          </div>
          <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-2 group">
            Browse Archive
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              <div className="relative mb-6 rounded-[28px] overflow-hidden shadow-lg">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-xs font-black shadow-sm flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    {event.date}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 whitespace-nowrap">
                  Free Entry
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm font-bold mb-4 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
              <p className="text-slate-600 leading-relaxed line-clamp-2 font-medium">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Teasers */}
        <div className="mt-20 grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-[40px] p-10 lg:p-14 text-white overflow-hidden relative">
            <div className="relative z-10">
              <span className="bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold mb-6 inline-block">COMING THIS QUINTA</span>
              <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight tracking-tight">The "Hidden Gem" of the week is a cliffside restaurant you've definitely missed.</h3>
              <p className="text-slate-400 text-lg mb-8 font-medium max-w-md">We'll give you the exact coordinates and the best dish to order. No more guessing.</p>
              <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-emerald-400 hover:text-white transition-all">Get the details</button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-[#FFF8E7] rounded-[40px] p-10 lg:p-14 border border-amber-100 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Useful Algarve Tools 🛠️</h3>
            <ul className="space-y-4">
              {['Weather & Sea State Forecasts', 'Algarve Cultural Agenda Calendar', 'Real-time Beach Webcams', 'Local Market Schedules'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-sm lg:text-base">
                  <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-500 flex-shrink-0">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPreview;
