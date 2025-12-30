
import React from 'react';
import { TRIPSTAR_FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="concept" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest mb-3">The Concept</h2>
          <p className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Curation is our superpower.</p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            We live here, we breathe the salt air, and we know exactly where the magic happens. We skip the generic to give you the authentic.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TRIPSTAR_FEATURES.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-[32px] bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-slate-100">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
