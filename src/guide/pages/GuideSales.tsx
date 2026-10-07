import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../shared/components/Footer';
import { subscribeToNewsletter } from '../../shared/services/mailerLite';
import { trackEvent, trackLead } from '../../shared/services/analytics';
import changelog from '../data/changelog.json';
import { COPY, EXCERPTS, GUIDE, PAGES, Lang } from '../sales/content';

const BASE_URL = 'https://algarvenewsletter.pt';
const chapters = changelog.chapters as { n: number; title: string; part: string }[];

const css = `
.gs { --ink:#0E1F22; --ink2:#2C4346; --teal:#006D77; --deep:#0A2E33; --sun:#FFD23F; --paper:#F7F3EA; --line:#E4DCCB;
  font-family:'Plus Jakarta Sans',sans-serif; color:var(--ink); background:var(--paper); }
.gs .display { font-family:'Bricolage Grotesque','Plus Jakarta Sans',sans-serif; letter-spacing:-.02em; line-height:1.02; }
.gs .serif { font-family:'Instrument Serif',Georgia,serif; font-style:italic; letter-spacing:0; }
.gs .kicker { font-size:.72rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; }
.gs .wrap { max-width:1120px; margin-left:auto; margin-right:auto; padding-left:24px; padding-right:24px; }
.gs .hero { background:radial-gradient(900px 520px at 78% 38%, #0F4A52 0%, rgba(15,74,82,0) 70%), var(--deep); color:#fff; }
.gs .btn { display:inline-flex; align-items:center; justify-content:center; gap:.6rem; background:var(--sun); color:var(--ink);
  font-weight:800; border-radius:999px; padding:1rem 1.75rem; font-size:1.05rem; transition:transform .15s, box-shadow .15s;
  box-shadow:0 10px 30px -10px rgba(255,210,63,.55); white-space:nowrap; }
.gs .btn:hover { transform:translateY(-1px); box-shadow:0 16px 36px -10px rgba(255,210,63,.7); }
.gs .btn .sep { opacity:.35; }
.gs .ghost { display:inline-flex; align-items:center; gap:.5rem; font-weight:700; border-bottom:2px solid currentColor; padding-bottom:2px; }
.gs .field { flex:1 1 180px; min-width:0; border-radius:999px; padding:.75rem 1.25rem; font-size:1rem; color:var(--ink); background:#fff;
  border:1px solid var(--line); outline:none; }
.gs .field:focus { border-color:var(--teal); box-shadow:0 0 0 3px rgba(0,109,119,.2); }
.gs .book { position:relative; width:min(340px,72vw); transform:perspective(1600px) rotateY(-16deg) rotateX(3deg) rotateZ(1deg);
  transform-style:preserve-3d; filter:drop-shadow(38px 44px 46px rgba(0,0,0,.55)); animation:gs-float 7s ease-in-out infinite; }
@keyframes gs-float { 50% { transform:perspective(1600px) rotateY(-11deg) rotateX(2deg) rotateZ(.5deg) translateY(-10px); } }
.gs .book img { display:block; width:100%; border-radius:3px 7px 7px 3px; }
.gs .book::before { content:""; position:absolute; inset:0 auto 0 0; width:5%; z-index:2; border-radius:3px 0 0 3px;
  background:linear-gradient(90deg, rgba(0,0,0,.38), rgba(255,255,255,.18) 45%, rgba(0,0,0,.12) 70%, rgba(0,0,0,0)); }
.gs .book::after { content:""; position:absolute; top:1.2%; bottom:1.2%; right:-9px; width:10px; z-index:-1; border-radius:0 3px 3px 0;
  background:repeating-linear-gradient(90deg,#fff 0 1px,#d9d4c7 1px 2px); }
.gs .rule { border-top:2px solid var(--ink); }
.gs .card { background:#fff; border:1px solid var(--line); border-radius:20px; }
.gs .rise { opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .7s ease; }
.gs .rise.in { opacity:1; transform:none; }
.gs details summary { list-style:none; cursor:pointer; }
.gs details summary::-webkit-details-marker { display:none; }
.gs details .plus { transition:transform .2s; }
.gs details[open] .plus { transform:rotate(45deg); }
.gs .sticky { position:fixed; left:0; right:0; bottom:0; z-index:60; background:rgba(10,46,51,.96); backdrop-filter:blur(8px); color:#fff;
  transform:translateY(110%); transition:transform .25s; padding:10px 16px calc(10px + env(safe-area-inset-bottom)); }
.gs .sticky.on { transform:none; }
@media (min-width:1024px) { .gs .sticky { display:none; } }

/* The book you can leaf through */
.gs .fb { width:min(880px,100%); margin:0 auto; aspect-ratio:296/210; perspective:2600px; }
.gs .fb-in { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .9s cubic-bezier(.3,.1,.2,1); }
.gs .fb-in::after { content:""; position:absolute; left:6%; right:6%; bottom:-5%; height:9%; z-index:-1; border-radius:50%;
  background:radial-gradient(closest-side, rgba(14,31,34,.38), rgba(14,31,34,0)); filter:blur(6px); }
.gs .leaf { position:absolute; top:0; left:50%; width:50%; height:100%; transform-origin:left center; transform-style:preserve-3d;
  transition:transform .9s cubic-bezier(.3,.1,.2,1), z-index 0s .45s; cursor:pointer; }
.gs .face { position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; background:#fff; overflow:hidden;
  box-shadow:0 0 0 1px rgba(14,31,34,.08); }
.gs .face img { width:100%; height:100%; object-fit:cover; display:block; }
.gs .face.front { border-radius:0 5px 5px 0; }
.gs .face.back { transform:rotateY(180deg); border-radius:5px 0 0 5px; }
.gs .face.front::after, .gs .face.back::after { content:""; position:absolute; top:0; bottom:0; width:14%; pointer-events:none; }
.gs .face.front::after { left:0; background:linear-gradient(90deg, rgba(14,31,34,.22), rgba(14,31,34,0)); }
.gs .face.back::after { right:0; background:linear-gradient(270deg, rgba(14,31,34,.22), rgba(14,31,34,0)); }
.gs .face.end { background:var(--teal); color:#fff; display:flex; flex-direction:column; justify-content:center; padding:9%; text-align:left; }
.gs .fb-nav { width:46px; height:46px; flex:0 0 auto; border-radius:999px; background:var(--ink); color:#fff; font-size:1.2rem; font-weight:700; }
.gs .fb-nav:disabled { opacity:.25; }
@media (prefers-reduced-motion: reduce) {
  .gs .leaf, .gs .fb-in, .gs .rise { transition:none; }
  .gs .book { animation:none; }
}
`;

/** Fades a block up the first time it scrolls into view. */
const Rise: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        if (!ref.current || typeof IntersectionObserver === 'undefined') {
            setSeen(true);
            return;
        }
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    return (
        <div ref={ref} className={`rise ${seen ? 'in' : ''} ${className}`}>
            {children}
        </div>
    );
};

interface CtaProps {
    lang: Lang;
    position: string;
    dark?: boolean;
    align?: 'left' | 'center';
}

/** The buy button. GUIDE.checkoutUrl must be set before this page is published. */
const Cta: React.FC<CtaProps> = ({ lang, position, dark, align = 'left' }) => {
    const t = COPY[lang];
    const micro = dark ? 'text-white/65' : 'text-[color:var(--ink2)]';
    return (
        <div className={align === 'center' ? 'text-center' : ''}>
            <a
                href={GUIDE.checkoutUrl}
                className="btn"
                onClick={() => {
                    trackEvent('guide_buy_click', 'guide', `${lang}_${position}`);
                    (window as any).fbq?.('track', 'InitiateCheckout', { content_name: 'the-whole-algarve-2027' });
                }}
            >
                {t.buy} <span className="sep">|</span> {lang === 'pt' ? GUIDE.pricePt : GUIDE.price}
            </a>
            <p className={`mt-4 text-sm ${micro}`}>{t.buyMicro}</p>
        </div>
    );
};

/** The cover and eight pages as a book: click a page (or the arrows) to turn it. */
const Flipbook: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = COPY[lang];
    const faces = [{ src: '/guide/cover.jpg', cap: t.flipCover }, ...PAGES.map((p) => ({ src: p.src, cap: p[lang] }))];
    const leaves = Math.ceil((faces.length + 1) / 2);
    const [turned, setTurned] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const touched = useRef(false);

    // Open the cover by itself the first time the book is on screen.
    useEffect(() => {
        if (!ref.current || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    io.disconnect();
                    setTimeout(() => !touched.current && setTurned(1), 600);
                }
            },
            { threshold: 0.6 }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    const go = (n: number) => {
        touched.current = true;
        const next = Math.max(0, Math.min(leaves, n));
        if (next !== turned) trackEvent('guide_flip', 'guide', `${lang}_${next}`);
        setTurned(next);
    };
    const shift = turned === 0 ? '-25%' : turned === leaves ? '25%' : '0';
    const left = turned > 0 ? faces[2 * turned - 1]?.cap : '';
    const right = turned < leaves ? faces[2 * turned]?.cap : '';

    return (
        <div>
            <div className="fb" ref={ref}>
                <div className="fb-in" style={{ transform: `translateX(${shift})` }}>
                    {Array.from({ length: leaves }).map((_, i) => {
                        const front = faces[2 * i];
                        const back = faces[2 * i + 1];
                        const flipped = i < turned;
                        return (
                            <div
                                key={i}
                                className="leaf"
                                role="button"
                                tabIndex={0}
                                aria-label={flipped ? t.flipPrev : t.flipNext}
                                style={{ zIndex: flipped ? i + 1 : leaves - i, transform: `rotateY(${flipped ? -180 : 0}deg)` }}
                                onClick={() => go(flipped ? i : i + 1)}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && go(flipped ? i : i + 1)}
                            >
                                <div className="face front">
                                    <img src={front.src} alt={front.cap} loading="lazy" />
                                </div>
                                {back ? (
                                    <div className="face back">
                                        <img src={back.src} alt={back.cap} loading="lazy" />
                                    </div>
                                ) : (
                                    <div className="face back end">
                                        <p className="display font-extrabold text-[clamp(1rem,2.6vw,1.9rem)]">{t.flipEndTitle}</p>
                                        <p className="mt-[6%] text-[clamp(.7rem,1.4vw,1rem)] text-white/80">{t.flipEndText}</p>
                                        <a
                                            href={GUIDE.samplePdf}
                                            target="_blank"
                                            rel="noopener"
                                            onClick={(e) => e.stopPropagation()}
                                            className="mt-[8%] self-start font-bold border-b-2 border-[color:var(--sun)] text-[color:var(--sun)] text-[clamp(.7rem,1.4vw,1rem)]"
                                        >
                                            {t.sample} ↓
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-5">
                <button className="fb-nav" onClick={() => go(turned - 1)} disabled={turned === 0} aria-label={t.flipPrev}>
                    ←
                </button>
                <p className="text-sm font-semibold text-[color:var(--ink2)] text-center min-w-[11rem] sm:min-w-[26rem]">
                    {[left, right].filter(Boolean).join('  ·  ')}
                </p>
                <button className="fb-nav" onClick={() => go(turned + 1)} disabled={turned === leaves} aria-label={t.flipNext}>
                    →
                </button>
            </div>
            <p className="mt-3 text-center text-xs uppercase tracking-[.18em] font-bold text-[color:var(--teal)]">{t.flipHint}</p>
        </div>
    );
};

const PtEditionForm: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = COPY[lang];
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('sending');
        try {
            await subscribeToNewsletter(email, 'guide_pt_edition');
            trackLead(`guide_pt_edition_${lang}`);
            setStatus('done');
        } catch {
            setStatus('error');
        }
    };
    if (status === 'done') return <p className="mt-5 font-bold text-[color:var(--teal)]">{t.ptDone}</p>;
    return (
        <form onSubmit={submit} className="mt-5 flex flex-wrap gap-2">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.ptPlaceholder}
                aria-label={t.ptPlaceholder}
                className="field"
            />
            <button type="submit" disabled={status === 'sending'} className="rounded-full bg-[color:var(--ink)] text-white font-bold px-5 py-3">
                {t.ptCta}
            </button>
            {status === 'error' && <p className="w-full text-sm font-bold text-red-600">{t.ptError}</p>}
        </form>
    );
};

const GuideSales: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = COPY[lang];
    const price = lang === 'pt' ? GUIDE.pricePt : GUIDE.price;
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
            setSticky(window.scrollY > 720 && !nearEnd);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const sampleClick = (position: string) => trackEvent('guide_sample_download', 'guide', `${lang}_${position}`);

    return (
        <div className="gs min-h-screen">
            <Helmet>
                <html lang={t.htmlLang} />
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDescription} />
                <link rel="canonical" href={`${BASE_URL}${t.path}`} />
                <link rel="alternate" hrefLang="en" href={`${BASE_URL}/guide`} />
                <link rel="alternate" hrefLang="pt" href={`${BASE_URL}/pt/guia`} />
                <meta property="og:title" content={t.metaTitle} />
                <meta property="og:description" content={t.metaDescription} />
                <meta property="og:image" content={`${BASE_URL}/guide/cover.jpg`} />
                <meta property="og:url" content={`${BASE_URL}${t.path}`} />
                <link rel="preload" as="image" href="/guide/cover.jpg" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Instrument+Serif:ital@1&display=swap"
                />
            </Helmet>
            <style>{css}</style>

            {/* 1 · Promise, product, button */}
            <header className="hero">
                <div className="wrap flex items-center justify-between py-6 text-sm">
                    <Link to="/" className="font-extrabold tracking-tight">
                        Algarve Newsletter
                    </Link>
                    <Link to={t.otherPath} className="text-white/70 hover:text-white font-semibold">
                        {t.otherLabel}
                    </Link>
                </div>
                <div className="wrap grid lg:grid-cols-[1.15fr_.85fr] gap-14 lg:gap-8 items-center pt-10 pb-24 lg:pt-14 lg:pb-28">
                    <div>
                        <p className="kicker text-[color:var(--sun)]">{t.kicker}</p>
                        <h1 className="display font-extrabold text-[clamp(3.2rem,8.2vw,6.4rem)] mt-5">The Whole Algarve</h1>
                        <p className="serif text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.1] mt-4 text-white/90">{t.subtitle}</p>
                        <p className="mt-7 text-lg leading-relaxed text-white/75 max-w-xl">{t.lead}</p>
                        <div className="mt-9">
                            <Cta lang={lang} position="hero" dark />
                        </div>
                        <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/85">
                            <a href={GUIDE.samplePdf} target="_blank" rel="noopener" className="ghost" onClick={() => sampleClick('hero')}>
                                {t.sample} <span aria-hidden>↓</span>
                            </a>
                            <span className="text-sm text-white/50">{t.languageNote}</span>
                        </p>
                        <p className="mt-10 pt-6 border-t border-white/15 text-sm text-white/60 max-w-xl">{t.proof}</p>
                    </div>
                    <div className="flex justify-center lg:justify-end lg:pr-10">
                        <div className="book">
                            <img src="/guide/cover.jpg" alt="The Whole Algarve, Edition 2027" width={900} height={1275} />
                        </div>
                    </div>
                </div>
            </header>

            {/* 2 · Scale */}
            <section className="bg-[color:var(--ink)] text-white">
                <div className="wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 py-10">
                    {t.stats.map((s) => (
                        <div key={s.l}>
                            <p className="display font-extrabold text-4xl text-[color:var(--sun)]">{s.n}</p>
                            <p className="kicker mt-2 text-white/60">{s.l}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3 · Who is talking */}
            <section className="wrap py-24 lg:py-28">
                <Rise className="max-w-4xl">
                    <p className="kicker text-[color:var(--teal)]">{t.authorKicker}</p>
                    <p className="serif text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.18] mt-6">{t.author[0]}</p>
                    <p className="mt-8 text-lg leading-relaxed text-[color:var(--ink2)] max-w-3xl">{t.author[1]}</p>
                    <p className="mt-4 text-lg leading-relaxed text-[color:var(--ink2)] max-w-3xl">{t.author[2]}</p>
                </Rise>
            </section>

            {/* 4 · Why this one */}
            <section className="bg-white border-y border-[color:var(--line)]">
                <div className="wrap py-24 lg:py-28">
                    <Rise>
                        <p className="kicker text-[color:var(--teal)]">{t.whyKicker}</p>
                        <h2 className="display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl">{t.whyTitle}</h2>
                    </Rise>
                    <div className="grid md:grid-cols-2 gap-x-14 gap-y-12 mt-16">
                        {t.why.map((w, i) => (
                            <Rise key={w.t} className="rule pt-5">
                                <p className="serif text-3xl text-[color:var(--teal)]">{String(i + 1).padStart(2, '0')}</p>
                                <h3 className="display font-extrabold text-2xl mt-2">{w.t}</h3>
                                <p className="mt-3 text-lg leading-relaxed text-[color:var(--ink2)]">{w.d}</p>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5 · Show, don't tell: real entries and the verdict scale */}
            <section className="wrap py-24 lg:py-32">
                <Rise>
                    <p className="kicker text-[color:var(--teal)]">{t.exKicker}</p>
                    <h2 className="display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl">{t.exTitle}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)] max-w-2xl">{t.exLead}</p>
                </Rise>
                <div className="grid md:grid-cols-3 gap-6 mt-14">
                    {EXCERPTS.map((x, i) => (
                        <Rise key={x.verdict} className="card p-8 flex flex-col">
                            <p>
                                <span
                                    className={`inline-block rounded-md px-3 py-1 font-extrabold text-sm ${
                                        i === 2 ? 'bg-[color:var(--ink)] text-white' : 'bg-[color:var(--sun)]'
                                    }`}
                                >
                                    {x.mark} {x.verdict}
                                </span>
                            </p>
                            <h3 className={`mt-5 ${x.name ? 'display font-extrabold text-2xl' : 'kicker text-[color:var(--ink2)] leading-relaxed'}`}>
                                {x.name || t.exUnnamed}
                            </h3>
                            <p className="mt-3 text-lg leading-relaxed text-[color:var(--ink2)]" lang="en">
                                {x.text}
                            </p>
                        </Rise>
                    ))}
                </div>
                <Rise className="mt-20 grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start">
                    <div>
                        <h2 className="display font-extrabold text-4xl md:text-5xl">{t.verdictTitle}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)]">{t.verdictLead}</p>
                    </div>
                    <div>
                        {t.verdicts.map((v, i) => (
                            <div key={v.t} className="flex items-baseline gap-5 py-5 border-b border-[color:var(--line)] first:pt-0">
                                <span
                                    className={`shrink-0 w-24 text-center rounded-md px-2 py-1 font-extrabold text-sm ${
                                        i === 3 ? 'bg-[color:var(--ink)] text-white' : 'bg-[color:var(--sun)]'
                                    }`}
                                >
                                    {v.m}
                                </span>
                                <p className="text-lg leading-snug">
                                    <strong className="font-extrabold">{v.t}.</strong>{' '}
                                    <span className="text-[color:var(--ink2)]">{v.d}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </Rise>
            </section>

            {/* 6 · Leaf through it */}
            <section className="bg-[#EFE8D8] py-24 lg:py-28 overflow-hidden">
                <div className="wrap">
                    <Rise className="text-center">
                        <p className="kicker text-[color:var(--teal)]">{t.lookKicker}</p>
                        <h2 className="display font-extrabold text-4xl md:text-6xl mt-4">{t.lookTitle}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)] max-w-2xl mx-auto">{t.lookLead}</p>
                    </Rise>
                    <div className="mt-14">
                        <Flipbook lang={lang} />
                    </div>
                    <div className="text-center mt-12">
                        <a
                            href={GUIDE.samplePdf}
                            target="_blank"
                            rel="noopener"
                            onClick={() => sampleClick('gallery')}
                            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] text-white font-bold px-7 py-4"
                        >
                            {t.sample} <span aria-hidden>↓</span>
                        </a>
                        <p className="mt-4 text-sm text-[color:var(--ink2)]">{t.sampleMicro}</p>
                    </div>
                </div>
            </section>

            {/* 7 · Who it is for */}
            <section className="wrap py-24 lg:py-32">
                <Rise>
                    <p className="kicker text-[color:var(--teal)]">{t.forKicker}</p>
                    <h2 className="display font-extrabold text-4xl md:text-6xl mt-4">{t.forTitle}</h2>
                </Rise>
                <div className="grid md:grid-cols-3 gap-6 mt-14">
                    {t.audiences.map((a) => (
                        <Rise key={a.t} className="card p-8 flex flex-col">
                            <h3 className="display font-extrabold text-2xl">{a.t}</h3>
                            <p className="mt-4 leading-relaxed text-[color:var(--ink2)] flex-1">{a.d}</p>
                            <p className="kicker mt-6 text-[color:var(--teal)]">{a.where}</p>
                        </Rise>
                    ))}
                </div>
            </section>

            {/* 8 · Contents */}
            <section className="bg-white border-y border-[color:var(--line)]">
                <div className="wrap py-24 lg:py-28">
                    <Rise>
                        <p className="kicker text-[color:var(--teal)]">{t.insideKicker}</p>
                        <h2 className="display font-extrabold text-4xl md:text-6xl mt-4">{t.insideTitle}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)] max-w-2xl">{t.insideLead}</p>
                    </Rise>
                    <div className="mt-12 border-t-2 border-[color:var(--ink)]">
                        {t.parts.map((p) => {
                            const list = chapters.filter((c) => c.part === p.key);
                            return (
                                <details key={p.key} className="border-b border-[color:var(--line)]" open={p.key === 'Part III'}>
                                    <summary className="flex items-start gap-5 py-6">
                                        <span className="flex-1">
                                            <span className="display font-extrabold text-2xl block">{p.name}</span>
                                            <span className="block mt-1 text-[color:var(--ink2)]">{p.d}</span>
                                        </span>
                                        <span className="kicker text-[color:var(--teal)] mt-2 whitespace-nowrap">
                                            {list.length > 1 ? `${list.length} ${t.chaptersLabel}` : ''}
                                        </span>
                                        <span className="plus text-2xl leading-none mt-1" aria-hidden>
                                            +
                                        </span>
                                    </summary>
                                    <ol className="grid sm:grid-cols-2 gap-x-10 pb-7">
                                        {list.map((c) => (
                                            <li key={c.n} className="flex gap-4 py-1.5 text-[color:var(--ink2)]">
                                                <span className="w-7 font-bold text-[color:var(--teal)] tabular-nums">{c.n}</span>
                                                {c.title}
                                            </li>
                                        ))}
                                    </ol>
                                </details>
                            );
                        })}
                    </div>
                    {t.chaptersNote && <p className="mt-4 text-sm text-[color:var(--ink2)]">{t.chaptersNote}</p>}
                </div>
            </section>

            {/* 9 · The offer */}
            <section id="buy" className="wrap py-24 lg:py-32">
                <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-stretch">
                    <Rise className="card p-8 md:p-12 shadow-[0_40px_80px_-40px_rgba(14,31,34,.35)]">
                        <p className="kicker text-[color:var(--teal)]">{t.getKicker}</p>
                        <h2 className="display font-extrabold text-4xl md:text-5xl mt-3">{t.priceTitle}</h2>
                        <p className="serif text-xl mt-1 text-[color:var(--ink2)]">{t.priceKicker}</p>
                        <ul className="mt-8 space-y-3">
                            {t.includes.map((x) => (
                                <li key={x} className="flex gap-3 text-lg leading-snug">
                                    <span className="text-[color:var(--teal)] font-extrabold" aria-hidden>
                                        ✓
                                    </span>
                                    {x}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-end gap-x-4 gap-y-3 mt-10 pt-8 border-t border-[color:var(--line)]">
                            <p className="display font-extrabold text-6xl md:text-7xl leading-none whitespace-nowrap">{price}</p>
                            <p className="pb-2 leading-tight">
                                <span className="kicker block text-[color:var(--teal)]">{t.priceNote}</span>
                                <span className="serif text-xl text-[color:var(--ink2)]">{t.perPage}</span>
                            </p>
                        </div>
                        <div className="mt-8">
                            <Cta lang={lang} position="price" />
                        </div>
                    </Rise>
                    <div className="flex flex-col gap-6">
                        <Rise className="rounded-[20px] p-8 bg-[#12312F] text-white">
                            <p className="kicker text-[color:var(--sun)]">{t.bonusKicker}</p>
                            <h3 className="display font-extrabold text-3xl mt-4">{t.bonusTitle}</h3>
                            <p className="mt-4 leading-relaxed text-white/80">{t.bonusText}</p>
                            <p className="mt-5 text-xs leading-relaxed text-white/55">{t.bonusFine}</p>
                        </Rise>
                        <Rise className="card p-8 flex-1">
                            <p className="kicker text-[color:var(--teal)]">{t.editionsTitle}</p>
                            <div className="mt-5 flex items-baseline justify-between gap-4 pb-5 border-b border-[color:var(--line)]">
                                <h3 className="display font-extrabold text-2xl">{t.enEdition.t}</h3>
                                <span className="text-sm font-bold text-[color:var(--teal)]">{t.enEdition.s}</span>
                            </div>
                            <div className="mt-5 flex items-baseline justify-between gap-4">
                                <h3 className="display font-extrabold text-2xl">{t.ptEdition.t}</h3>
                                <span className="text-sm font-bold text-[color:var(--ink2)]">{t.ptEdition.s}</span>
                            </div>
                            <p className="mt-3 leading-relaxed text-[color:var(--ink2)]">{t.ptEdition.d}</p>
                            {!GUIDE.ptEditionAvailable && <PtEditionForm lang={lang} />}
                        </Rise>
                    </div>
                </div>
            </section>

            {/* 10 · Objections */}
            <section className="bg-white border-t border-[color:var(--line)]">
                <div className="wrap py-24 max-w-3xl">
                    <h2 className="display font-extrabold text-4xl md:text-5xl">{t.faqTitle}</h2>
                    <div className="mt-10 border-t-2 border-[color:var(--ink)]">
                        {t.faq.map((f) => (
                            <details key={f.q} className="border-b border-[color:var(--line)]">
                                <summary className="flex items-start gap-5 py-5">
                                    <span className="flex-1 font-bold text-lg">{f.q}</span>
                                    <span className="plus text-2xl leading-none" aria-hidden>
                                        +
                                    </span>
                                </summary>
                                <p className="pb-6 text-lg leading-relaxed text-[color:var(--ink2)]">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11 · Last call */}
            <section className="hero">
                <div className="wrap py-24 lg:py-32 text-center">
                    <h2 className="display font-extrabold text-4xl md:text-6xl max-w-3xl mx-auto">{t.finalTitle}</h2>
                    <p className="serif text-2xl md:text-3xl mt-5 text-white/80">{t.finalLead}</p>
                    <div className="mt-10 flex justify-center">
                        <Cta lang={lang} position="final" dark align="center" />
                    </div>
                    <p className="mt-16 text-xs text-white/40 max-w-2xl mx-auto">{t.credits}</p>
                </div>
            </section>

            <Footer />

            <div className={`sticky ${sticky ? 'on' : ''}`}>
                <div className="flex items-center justify-between gap-4">
                    <p className="leading-tight">
                        <span className="block font-extrabold">The Whole Algarve</span>
                        <span className="text-sm text-white/65">{t.stickyNote}</span>
                    </p>
                    <a
                        href={GUIDE.checkoutUrl}
                        className="btn !py-3 !px-5 !text-base"
                        onClick={() => trackEvent('guide_buy_click', 'guide', `${lang}_sticky`)}
                    >
                        {t.buyShort} · {price}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GuideSales;
