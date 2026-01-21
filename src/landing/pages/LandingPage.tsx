
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../shared/components/Navbar';
import Hero from '../components/Hero';
import Footer from '../../shared/components/Footer';
import { TRIPSTAR_FEATURES, SNEAK_PEEK_CARDS, TOP_PARTNERS, CATEGORIES, HOW_IT_WORKS, HIGHLIGHTS } from '../../shared/constants/constants';
import Testimonials from '../components/Testimonials';
import CurvedSeparator from '../../shared/components/CurvedSeparator';
import NewsletterSignup from '../../newsletter/components/NewsletterSignup';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <link rel="canonical" href="https://algarvenewsletter.pt" />
            </Helmet>
            <Navbar />
            <Hero />

            {/* Stories Collage Section */}
            <section className="pt-32 md:pt-64 pb-16 md:pb-24 px-4 text-center max-w-7xl mx-auto">
                <div className="flex justify-center mb-6">
                    <img src="/icons/waves-icon.png" className="w-20 h-20 md:w-24 md:h-24 object-contain mix-blend-multiply -rotate-6" alt="Secrets" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    The Algarve is full of secrets<br />waiting for you to live them
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">
                    Forget generic travel guides. We are your weekly reminder that the true magic of the Algarve happens in hidden taverns, trail-less beaches, and village festivals.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-16 md:mb-20">
                    <img src="/collage-1.jpg" className="collage-img w-5/6 md:w-64 h-64 md:h-80 object-cover rotate-[-3deg] md:rotate-[-5deg]" />
                    <img src="/collage-2.jpg" className="collage-img w-5/6 md:w-72 h-80 md:h-96 object-cover z-10 scale-100 md:scale-110 -mt-8 md:mt-0" />
                    <img src="/collage-3.jpg" className="collage-img w-5/6 md:w-64 h-64 md:h-80 object-cover rotate-[3deg] md:rotate-[5deg] -mt-8 md:mt-0" />
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center max-w-5xl mx-auto">
                    {TRIPSTAR_FEATURES.map((feature, i) => (
                        <div key={i} className="flex flex-col items-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                            <div className="mb-6 w-20 h-20 rounded-[28px] bg-slate-50 flex items-center justify-center text-3xl shrink-0 border border-slate-100 shadow-sm transition-transform group-hover:scale-110 group-hover:bg-cyan-50">
                                {feature.icon}
                            </div>
                            <h3 className="font-black text-xl mb-3 text-slate-900">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What to Expect Section */}
            <CurvedSeparator color="#004E55" flip className="-mb-1 relative z-10" />
            <section className="bg-[#004E55] py-16 md:py-24 px-4 overflow-hidden relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="text-white max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">What's Inside Every<br />Thursday 📬</h2>
                            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">No spam. Just three essential finds to make your weekend unforgettable.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-4">
                        {SNEAK_PEEK_CARDS.map((card) => (
                            <div key={card.id} className="bg-white rounded-[32px] overflow-hidden p-3 group cursor-default transition-transform hover:-translate-y-2 shadow-2xl">
                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                    <img src={card.img} className="w-full h-48 md:h-56 object-cover group-hover:scale-[1.02] transition-transform duration-500" />

                                </div>
                                <div className="px-4 pb-6">
                                    <h4 className="font-black text-slate-900 text-xl mb-2">{card.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <CurvedSeparator color="#004E55" className="-mt-1 relative z-10" />

            {/* How It Works Flow */}
            <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
                    <div className="flex-1 w-full">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight text-center lg:text-left">We Plan Your<br />Ideal Weekend</h2>
                        <p className="text-slate-500 text-lg mb-12 leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0">Stop wasting time searching through tourist traps. We filter the noise and deliver only authentic local picks.</p>

                        <div className="space-y-8 md:space-y-12">
                            {HOW_IT_WORKS.map((item, i) => (
                                <div key={i} className="flex gap-6 md:gap-8 group items-start md:items-center">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] bg-slate-50 flex items-center justify-center text-2xl md:text-3xl shrink-0 border border-slate-100 shadow-sm group-hover:scale-110 transition-transform group-hover:bg-cyan-50">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-lg md:text-xl mb-1 md:mb-2">{item.title}</h4>
                                        <p className="text-slate-500 leading-relaxed max-w-xs text-sm md:text-base">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="relative">
                            <img src="/team-collage.png" className="rounded-[40px] md:rounded-[60px] w-full object-cover aspect-[4/5] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]" />
                            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-4 md:p-6 rounded-3xl hidden md:block shadow-2xl animate-bounce-slow" style={{ animationDelay: '1s' }}>
                                <span className="text-4xl md:text-6xl">☁️</span>
                            </div>
                            <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 hidden md:block animate-bounce-slow">
                                <span className="text-6xl md:text-8xl">✈️</span>
                            </div>
                            <div className="absolute top-1/2 -right-10 md:-right-16 hidden md:block animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                                <span className="text-4xl md:text-6xl">🪂</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Explore Category Circles */}
            <section className="py-20 md:py-32 px-4 text-center max-w-7xl mx-auto overflow-hidden">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Explore the Algarve,<br />Your Own Way</h2>
                <p className="text-slate-500 text-lg mb-12 md:mb-20">Pick your niche. From the rugged mountains to the turquoise sea.</p>

                <div className="flex flex-wrap justify-center gap-8 md:gap-24">
                    {CATEGORIES.map((cat, i) => (
                        <div key={i} className="flex flex-col items-center group cursor-pointer w-32 md:w-auto">
                            <div className="w-28 h-40 md:w-36 md:h-48 rounded-[40px] md:rounded-[60px] overflow-hidden mb-4 md:mb-6 border-4 md:border-8 border-slate-50 shadow-xl md:shadow-2xl group-hover:border-cyan-200 transition-all group-hover:-translate-y-2">
                                <img src={cat.img} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
                            </div>
                            <span className="font-black text-slate-900 text-sm md:text-xl uppercase tracking-widest group-hover:text-cyan-600 transition-colors">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            {/* Testimonials */}
            <Testimonials />

            {/* Newsletter Signup */}
            <NewsletterSignup />

            {/* Skewed Bottom Collage */}
            <section className="py-24 bg-slate-50 overflow-hidden relative">
                <div className="flex justify-center gap-4 md:gap-8 px-4 w-full md:w-auto overflow-x-auto pb-12 pt-12 md:overflow-visible">
                    {[...CATEGORIES, ...HIGHLIGHTS].slice(0, 5).map((item: any, i) => (
                        <div
                            key={i}
                            className={`
                relative shrink-0 w-64 h-64 md:w-80 md:h-72 p-3 bg-white shadow-xl rounded-2xl transform transition-transform duration-500 hover:scale-105 hover:z-20
                ${i % 2 === 0 ? 'rotate-3 md:rotate-6' : '-rotate-2 md:-rotate-3'}
                ${i === 2 ? 'rotate-0 md:-rotate-1 z-10' : ''}
              `}
                        >
                            <img
                                src={item.img || item.imageUrl}
                                className="w-full h-full object-cover rounded-xl"
                                alt="Algarve impression"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
