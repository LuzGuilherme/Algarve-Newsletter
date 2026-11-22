import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../shared/components/Footer';
import { trackEvent } from '../../shared/services/analytics';
import tripsData from '../data/trips.json';
import { COPY, Filter, Lang, PAGES, TRIPS, bundleFor, cardSrc, checkoutFor, coverFor, pageSrc } from '../sales/content';

const BASE_URL = 'https://algarvenewsletter.pt';

interface Trip {
    n: number;
    title: string;
    where: string;
    len_n: number;
    len_w: string;
    car: 'car' | 'nocar' | 'part';
    car_w: string;
    best: string;
    sunday: string;
    rain: string;
    kids: string;
    winter: string;
    page: number;
    part: 'days' | 'weekends' | 'week' | 'themed';
}

const PARTS: Trip['part'][] = ['days', 'weekends', 'week', 'themed'];

// The colours and type of the book itself ("Caderno de viagem"): warm paper, terracotta, olive.
const css = `
.ts { --paper:#F6EFE2; --paper2:#EFE5D2; --card:#FBF7EF; --ink:#2B2622; --ink2:#4A3F36; --muted:#7A6E62; --accent:#B4532A;
  --accent2:#9A4421; --olive:#5E7F78; --line:#D9CBB3; --pale:#E4B48C;
  font-family:'Work Sans',sans-serif; color:var(--ink); background:var(--paper); }
.ts .display { font-family:'Fraunces',Georgia,serif; font-weight:600; letter-spacing:-.015em; line-height:1.02; }
.ts .display i, .ts .it { font-style:italic; color:var(--accent); }
.ts .serif { font-family:'Fraunces',Georgia,serif; font-style:italic; }
.ts .kicker { font-size:.72rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--olive); }
.ts .wrap { max-width:1140px; margin-left:auto; margin-right:auto; padding-left:20px; padding-right:20px; }
.ts .hero { background:radial-gradient(800px 520px at 80% 40%, #EADBC0 0%, rgba(234,219,192,0) 70%), var(--paper); }
.ts .btn { display:inline-flex; align-items:center; justify-content:center; gap:.6rem; background:var(--accent); color:#fff;
  font-weight:700; border-radius:999px; padding:1rem 1.75rem; font-size:1.05rem; transition:transform .15s, box-shadow .15s, background .15s;
  box-shadow:0 12px 28px -12px rgba(180,83,42,.7); white-space:nowrap; }
.ts .btn:hover { transform:translateY(-1px); background:var(--accent2); box-shadow:0 16px 34px -12px rgba(180,83,42,.8); }
.ts .btn .sep { opacity:.45; }
.ts .btn.light { background:#fff; color:var(--accent); box-shadow:none; }
.ts .btn.light:hover { background:var(--paper); }
.ts .ghost { display:inline-flex; align-items:center; gap:.5rem; font-weight:700; color:var(--accent); border-bottom:2px solid currentColor; padding-bottom:2px; }
.ts .book { position:relative; width:min(360px,74vw); transform:perspective(1600px) rotateY(-14deg) rotateX(3deg) rotateZ(1.5deg);
  filter:drop-shadow(32px 40px 40px rgba(43,38,34,.35)); animation:ts-float 7s ease-in-out infinite; }
@keyframes ts-float { 50% { transform:perspective(1600px) rotateY(-9deg) rotateX(2deg) rotateZ(.5deg) translateY(-10px); } }
.ts .book img { display:block; width:100%; border-radius:2px 6px 6px 2px; }
.ts .book::before { content:""; position:absolute; inset:0 auto 0 0; width:5%; z-index:2; border-radius:2px 0 0 2px;
  background:linear-gradient(90deg, rgba(0,0,0,.22), rgba(255,255,255,.2) 45%, rgba(0,0,0,.08) 70%, rgba(0,0,0,0)); }
.ts .book::after { content:""; position:absolute; top:1.2%; bottom:1.2%; right:-8px; width:9px; z-index:-1; border-radius:0 3px 3px 0;
  background:repeating-linear-gradient(90deg,#fff 0 1px,#ddd3c2 1px 2px); }
.ts .stamp { position:absolute; top:-18px; left:-26px; z-index:3; width:118px; height:118px; border-radius:50%; display:flex; align-items:center;
  justify-content:center; text-align:center; background:var(--paper); color:var(--accent); border:2px solid var(--accent);
  box-shadow:0 0 0 5px var(--paper), 0 0 0 7px var(--accent); transform:rotate(-12deg); font-family:'Fraunces',serif; font-weight:600; line-height:1.05; }
.ts .card { background:var(--card); border:1px solid var(--line); border-radius:18px; }
.ts .rule { border-top:2px solid var(--ink); }
.ts .dash { border-top:1.5px dashed var(--line); }
.ts .tag { display:inline-flex; align-items:center; gap:.35rem; border:1px solid var(--line); border-radius:999px; padding:.15rem .6rem;
  font-size:.75rem; font-weight:600; color:var(--ink2); background:#fff; }
.ts .chip { border:1.5px solid var(--line); border-radius:999px; padding:.5rem 1rem; font-weight:600; font-size:.9rem; color:var(--ink2);
  background:var(--card); transition:all .15s; }
.ts .chip:hover { border-color:var(--accent); color:var(--accent); }
.ts .chip.on { background:var(--ink); border-color:var(--ink); color:#fff; }
.ts .tcard { transition:transform .2s, box-shadow .2s, opacity .25s; }
.ts .tcard:hover { transform:translateY(-3px) rotate(-.4deg); box-shadow:0 22px 40px -24px rgba(43,38,34,.45); }
.ts .tcard img { aspect-ratio:420/595; width:100%; object-fit:cover; border-radius:8px; border:1px solid var(--line); background:#fff; }
.ts .rise { opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .7s ease; }
.ts .rise.in { opacity:1; transform:none; }
.ts details summary { list-style:none; cursor:pointer; }
.ts details summary::-webkit-details-marker { display:none; }
.ts details .plus { transition:transform .2s; color:var(--accent); }
.ts details[open] .plus { transform:rotate(45deg); }
.ts .dark { background:var(--ink); color:#fff; }
.ts .sticky { position:fixed; left:0; right:0; bottom:0; z-index:60; background:rgba(43,38,34,.96); backdrop-filter:blur(8px); color:#fff;
  transform:translateY(110%); transition:transform .25s; padding:10px 16px calc(10px + env(safe-area-inset-bottom)); }
.ts .sticky.on { transform:none; }
@media (min-width:1024px) { .ts .sticky { display:none; } }

/* The book you can leaf through */
.ts .fb { width:min(880px,100%); margin:0 auto; aspect-ratio:840/595; perspective:2600px; }
.ts .fb-in { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .9s cubic-bezier(.3,.1,.2,1); }
.ts .fb-in::after { content:""; position:absolute; left:6%; right:6%; bottom:-5%; height:9%; z-index:-1; border-radius:50%;
  background:radial-gradient(closest-side, rgba(43,38,34,.32), rgba(43,38,34,0)); filter:blur(6px); }
.ts .leaf { position:absolute; top:0; left:50%; width:50%; height:100%; transform-origin:left center; transform-style:preserve-3d;
  transition:transform .9s cubic-bezier(.3,.1,.2,1), z-index 0s .45s; cursor:pointer; }
.ts .face { position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; background:#fff; overflow:hidden;
  box-shadow:0 0 0 1px rgba(43,38,34,.08); }
.ts .face img { width:100%; height:100%; object-fit:cover; display:block; }
.ts .face.front { border-radius:0 5px 5px 0; }
.ts .face.back { transform:rotateY(180deg); border-radius:5px 0 0 5px; }
.ts .face.front::after, .ts .face.back::after { content:""; position:absolute; top:0; bottom:0; width:14%; pointer-events:none; }
.ts .face.front::after { left:0; background:linear-gradient(90deg, rgba(43,38,34,.18), rgba(43,38,34,0)); }
.ts .face.back::after { right:0; background:linear-gradient(270deg, rgba(43,38,34,.18), rgba(43,38,34,0)); }
.ts .face.end { background:var(--accent); color:#fff; display:flex; flex-direction:column; justify-content:center; padding:9%; text-align:left; }
.ts .fb-nav { width:46px; height:46px; flex:0 0 auto; border-radius:999px; background:var(--ink); color:#fff; font-size:1.2rem; font-weight:700; }
.ts .fb-nav:disabled { opacity:.25; }
@media (prefers-reduced-motion: reduce) {
  .ts .leaf, .ts .fb-in, .ts .rise, .ts .tcard { transition:none; }
  .ts .book { animation:none; }
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

const buyClick = (lang: Lang, position: string, product: 'trips' | 'bundle' = 'trips') => {
    trackEvent(product === 'bundle' ? 'trips_bundle_click' : 'trips_buy_click', 'trips', `${lang}_${position}`);
    (window as any).fbq?.('track', 'InitiateCheckout', {
        content_name: product === 'bundle' ? 'whole-algarve-and-trips-2027' : lang === 'pt' ? 'roteiros-prontos-2027' : 'ready-to-go-trips-2027',
    });
};

/** The buy button: the Gumroad product of the page's language. */
const Cta: React.FC<{ lang: Lang; position: string; align?: 'left' | 'center'; light?: boolean }> = ({ lang, position, align = 'left', light }) => {
    const t = COPY[lang];
    return (
        <div className={align === 'center' ? 'text-center' : ''}>
            <a href={checkoutFor(lang)} className={`btn ${light ? 'light' : ''}`} onClick={() => buyClick(lang, position)}>
                {t.buy} <span className="sep">|</span> {lang === 'pt' ? TRIPS.pricePt : TRIPS.price}
            </a>
            <p className={`mt-4 text-sm ${light ? 'text-white/70' : 'text-[color:var(--muted)]'}`}>{t.buyMicro}</p>
        </div>
    );
};

/** The cover and eight pages as a book: click a page (or the arrows) to turn it. */
const Flipbook: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = COPY[lang];
    const faces = [{ src: coverFor(lang), cap: t.flipCover }, ...PAGES.map((p) => ({ src: pageSrc(p.name, lang), cap: p[lang] }))];
    const leaves = Math.ceil((faces.length + 1) / 2);
    const [turned, setTurned] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const touched = useRef(false);

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
        if (next !== turned) trackEvent('trips_flip', 'trips', `${lang}_${next}`);
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
                                        <p className="display text-[clamp(1rem,2.6vw,1.9rem)]">{t.flipEndTitle}</p>
                                        <p className="mt-[6%] text-[clamp(.7rem,1.4vw,1rem)] text-white/85">{t.flipEndText}</p>
                                        <a
                                            href="#buy"
                                            onClick={(e) => e.stopPropagation()}
                                            className="mt-[8%] self-start font-bold border-b-2 border-white text-white text-[clamp(.7rem,1.4vw,1rem)]"
                                        >
                                            {t.buy} ↓
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
            <p className="mt-3 text-center text-xs uppercase tracking-[.18em] font-bold text-[color:var(--olive)]">{t.flipHint}</p>
        </div>
    );
};

const matches = (trip: Trip, f: Filter) => {
    switch (f) {
        case 'nocar':
            return trip.car === 'nocar' || trip.car === 'part';
        case 'sunday':
            return trip.sunday === 'y';
        case 'winter':
            return trip.winter === 'y';
        case 'rain':
            return trip.rain === 'y';
        case 'kids':
            return trip.kids === 'y';
        default:
            return true;
    }
};

/** The 21 trips, grouped as in the book, with filters taken from the book's own "Choose your trip" grid. */
const TripPicker: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = COPY[lang];
    const trips = (tripsData as unknown as Record<Lang, Trip[]>)[lang];
    const [filter, setFilter] = useState<Filter>('all');
    const shown = useMemo(() => trips.filter((x) => matches(x, filter)), [trips, filter]);

    return (
        <div>
            <div className="flex flex-wrap gap-2 mt-10" role="group">
                {t.filters.map((f) => (
                    <button
                        key={f.key}
                        className={`chip ${filter === f.key ? 'on' : ''}`}
                        aria-pressed={filter === f.key}
                        onClick={() => {
                            setFilter(f.key);
                            trackEvent('trips_filter', 'trips', `${lang}_${f.key}`);
                        }}
                    >
                        {f.label}
                        {f.key !== 'all' && <span className="opacity-60 ml-1.5">{trips.filter((x) => matches(x, f.key)).length}</span>}
                    </button>
                ))}
            </div>
            {shown.length === 0 && <p className="mt-10 text-lg text-[color:var(--ink2)]">{t.noMatch}</p>}
            {PARTS.map((part) => {
                const list = shown.filter((x) => x.part === part);
                if (!list.length) return null;
                return (
                    <div key={part} className="mt-12">
                        <p className="kicker">{t.parts[part]}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-9 mt-5">
                            {list.map((x) => (
                                <div key={x.n} className="tcard">
                                    <img src={cardSrc(x.n, lang)} alt={`${t.tripWord} ${x.n}: ${x.title}`} loading="lazy" width={360} height={510} />
                                    <p className="mt-3 text-xs font-bold text-[color:var(--accent)]">
                                        {t.tripWord} {x.n}
                                    </p>
                                    <h3 className="display text-lg mt-0.5 leading-tight">{x.title}</h3>
                                    <p className="text-xs text-[color:var(--muted)] mt-1 leading-snug">{x.where}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                                        <span className="tag">
                                            {x.len_n} {x.len_w}
                                        </span>
                                        <span className="tag">{x.car_w}</span>
                                    </div>
                                    <p className="text-xs text-[color:var(--ink2)] mt-2">
                                        <b>{t.bestDays}:</b> {x.best}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const TripsSales: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = COPY[lang];
    const price = lang === 'pt' ? TRIPS.pricePt : TRIPS.price;
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

    return (
        <div className="ts min-h-screen">
            <Helmet>
                <html lang={t.htmlLang} />
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDescription} />
                <link rel="canonical" href={`${BASE_URL}${t.path}`} />
                <link rel="alternate" hrefLang="en" href={`${BASE_URL}/trips`} />
                <link rel="alternate" hrefLang="pt" href={`${BASE_URL}/pt/roteiros`} />
                <meta property="og:title" content={t.metaTitle} />
                <meta property="og:description" content={t.metaDescription} />
                <meta property="og:image" content={`${BASE_URL}${coverFor(lang)}`} />
                <meta property="og:url" content={`${BASE_URL}${t.path}`} />
                <link rel="preload" as="image" href={coverFor(lang)} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,600&family=Work+Sans:wght@400;600;700&display=swap"
                />
            </Helmet>
            <style>{css}</style>

            {/* 1 · Promise, product, button */}
            <header className="hero">
                <div className="wrap flex items-center justify-between py-6 text-sm">
                    <Link to="/" className="font-bold tracking-tight">
                        Algarve Newsletter
                    </Link>
                    <Link to={t.otherPath} className="text-[color:var(--muted)] hover:text-[color:var(--ink)] font-semibold">
                        {t.otherLabel}
                    </Link>
                </div>
                <div className="wrap grid lg:grid-cols-[1.15fr_.85fr] gap-14 lg:gap-8 items-center pt-8 pb-24 lg:pt-12 lg:pb-28">
                    <div>
                        <p className="kicker">{t.kicker}</p>
                        <h1 className="display text-[clamp(3rem,8vw,6.2rem)] mt-5">
                            {t.titleA}
                            <br />
                            <i>{t.titleB}</i> {t.titleC}
                        </h1>
                        <p className="serif text-[clamp(1.5rem,3.2vw,2.3rem)] leading-[1.15] mt-5 text-[color:var(--olive)]">{t.subtitle}</p>
                        <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink2)] max-w-xl">{t.lead}</p>
                        <div className="mt-9">
                            <Cta lang={lang} position="hero" />
                        </div>
                        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                            <a href="#look" className="ghost" onClick={() => trackEvent('trips_look_click', 'trips', `${lang}_hero`)}>
                                {t.look} <span aria-hidden>↓</span>
                            </a>
                            <span className="text-sm text-[color:var(--muted)]">{t.languageNote}</span>
                        </p>
                        <p className="mt-10 pt-6 dash text-sm text-[color:var(--muted)] max-w-xl">{t.proof}</p>
                    </div>
                    <div className="flex justify-center lg:justify-end lg:pr-10">
                        <div className="relative">
                            <div className="book">
                                <img src={coverFor(lang)} alt={t.title} width={900} height={1275} />
                            </div>
                            <div className="stamp" aria-hidden>
                                <span>
                                    <span className="block text-3xl">21</span>
                                    <span className="block text-[.7rem] tracking-[.15em] uppercase font-[700] font-sans mt-1">
                                        {t.stamp}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2 · Scale */}
            <section className="dark">
                <div className="wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 py-10">
                    {t.stats.map((s) => (
                        <div key={s.l}>
                            <p className="display text-4xl text-[color:var(--pale)]">{s.n}</p>
                            <p className="kicker mt-2 !text-white/60">{s.l}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3 · The problem, with the book's own examples */}
            <section className="wrap py-24 lg:py-28">
                <Rise className="max-w-3xl">
                    <p className="kicker">{t.painKicker}</p>
                    <h2 className="display text-4xl md:text-6xl mt-4">{t.painTitle}</h2>
                    <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink2)]">{t.painLead}</p>
                </Rise>
                <div className="grid md:grid-cols-2 gap-6 mt-14">
                    {t.pains.map((p, i) => (
                        <Rise key={p.t} className="card p-7 md:p-8">
                            <p className="serif text-3xl text-[color:var(--accent)]">{String(i + 1).padStart(2, '0')}</p>
                            <h3 className="display text-2xl mt-2">{p.t}</h3>
                            <p className="mt-3 text-lg leading-relaxed text-[color:var(--ink2)]">{p.d}</p>
                            <p className="mt-5 pt-4 dash kicker !text-[color:var(--accent)]">{p.trip}</p>
                        </Rise>
                    ))}
                </div>
                <Rise>
                    <p className="serif text-2xl md:text-3xl mt-14 max-w-3xl text-[color:var(--olive)]">{t.painEnd}</p>
                </Rise>
            </section>

            {/* 4 · How a trip works */}
            <section className="bg-[color:var(--card)] border-y border-[color:var(--line)]">
                <div className="wrap py-24 lg:py-28">
                    <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
                        <Rise>
                            <p className="kicker">{t.howKicker}</p>
                            <h2 className="display text-4xl md:text-6xl mt-4">{t.howTitle}</h2>
                            <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)]">{t.howLead}</p>
                            <ol className="mt-10 rule">
                                {t.how.map((h) => (
                                    <li key={h.p} className="flex gap-5 py-4 border-b border-[color:var(--line)]">
                                        <span className="w-20 shrink-0 serif text-xl whitespace-nowrap text-[color:var(--accent)]">{h.p}</span>
                                        <span>
                                            <b className="font-bold">{h.t}.</b> <span className="text-[color:var(--ink2)]">{h.d}</span>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </Rise>
                        <Rise className="flex justify-center">
                            <div className="relative w-full max-w-[520px] aspect-[1/1.05]">
                                <img
                                    src={pageSrc('trip-cover', lang)}
                                    alt={PAGES[0][lang]}
                                    loading="lazy"
                                    className="absolute left-0 top-[6%] w-[60%] rounded-md shadow-2xl -rotate-3 border border-[color:var(--line)]"
                                />
                                <img
                                    src={pageSrc('trip-day', lang)}
                                    alt={PAGES[1][lang]}
                                    loading="lazy"
                                    className="absolute right-0 top-0 w-[60%] rounded-md shadow-2xl rotate-2 border border-[color:var(--line)]"
                                />
                            </div>
                        </Rise>
                    </div>
                    <Rise className="mt-20">
                        <h3 className="display text-3xl md:text-4xl">{t.extrasTitle}</h3>
                    </Rise>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mt-8">
                        {t.extras.map((x) => (
                            <Rise key={x.t} className="rule pt-5">
                                <h4 className="display text-xl">{x.t}</h4>
                                <p className="mt-2 leading-relaxed text-[color:var(--ink2)]">{x.d}</p>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5 · Choose your trip */}
            <section className="wrap py-24 lg:py-28">
                <Rise className="max-w-3xl">
                    <p className="kicker">{t.chooseKicker}</p>
                    <h2 className="display text-4xl md:text-6xl mt-4">{t.chooseTitle}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)]">{t.chooseLead}</p>
                </Rise>
                <TripPicker lang={lang} />
                <div className="mt-16">
                    <Cta lang={lang} position="picker" />
                </div>
            </section>

            {/* 6 · Leaf through it, then the buy button */}
            <section id="look" className="bg-[color:var(--paper2)] py-24 lg:py-28 overflow-hidden scroll-mt-4">
                <div className="wrap">
                    <Rise className="text-center">
                        <p className="kicker">{t.lookKicker}</p>
                        <h2 className="display text-4xl md:text-6xl mt-4">{t.lookTitle}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)] max-w-2xl mx-auto">{t.lookLead}</p>
                    </Rise>
                    <div className="mt-14">
                        <Flipbook lang={lang} />
                    </div>
                    <div className="card mt-16 max-w-4xl mx-auto p-7 md:p-10 grid md:grid-cols-[180px_1fr] gap-8 items-center">
                        <img src={coverFor(lang)} alt={t.title} loading="lazy" className="w-36 md:w-full mx-auto rounded-md border border-[color:var(--line)] -rotate-2 shadow-xl" />
                        <div>
                            <p className="kicker">{t.ctaKicker}</p>
                            <h3 className="display text-3xl md:text-4xl mt-3">{t.ctaTitle}</h3>
                            <p className="mt-4 leading-relaxed text-[color:var(--ink2)]">{t.ctaText}</p>
                            <div className="mt-6">
                                <Cta lang={lang} position="look" />
                            </div>
                            <a href={bundleFor(lang)} className="ghost mt-1 text-sm" onClick={() => buyClick(lang, 'look', 'bundle')}>
                                {t.ctaBundle} →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7 · What "checked" means */}
            <section className="dark">
                <div className="wrap py-24 lg:py-28">
                    <Rise className="max-w-3xl">
                        <p className="kicker !text-[color:var(--pale)]">{t.trustKicker}</p>
                        <h2 className="display text-4xl md:text-6xl mt-4">{t.trustTitle}</h2>
                    </Rise>
                    <div className="grid md:grid-cols-2 gap-x-14 gap-y-12 mt-14">
                        {t.trust.map((w, i) => (
                            <Rise key={w.t} className="border-t-2 border-white/80 pt-5">
                                <p className="serif text-3xl text-[color:var(--pale)]">{String(i + 1).padStart(2, '0')}</p>
                                <h3 className="display text-2xl mt-2">{w.t}</h3>
                                <p className="mt-3 text-lg leading-relaxed text-white/75">{w.d}</p>
                            </Rise>
                        ))}
                    </div>
                    <Rise>
                        <p className="serif text-2xl mt-16 text-white/70">{t.trustQuote}</p>
                    </Rise>
                </div>
            </section>

            {/* 8 · This one or the big one */}
            <section className="wrap py-24 lg:py-28">
                <Rise className="max-w-3xl">
                    <p className="kicker">{t.vsKicker}</p>
                    <h2 className="display text-4xl md:text-6xl mt-4">{t.vsTitle}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)]">{t.vsLead}</p>
                </Rise>
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {[
                        { c: t.vsTrips, img: coverFor(lang), href: '#buy', mine: true },
                        { c: t.vsGuide, img: lang === 'pt' ? '/guide/cover-pt.jpg' : '/guide/cover.jpg', href: lang === 'pt' ? '/pt/guia' : '/guide', mine: false },
                    ].map(({ c, img, href, mine }) => (
                        <Rise key={c.t} className={`card p-7 md:p-8 flex gap-6 ${mine ? 'ring-2 ring-[color:var(--accent)]' : ''}`}>
                            <img src={img} alt={c.t} loading="lazy" className="w-24 md:w-28 self-start rounded border border-[color:var(--line)] shadow-lg" />
                            <div>
                                <p className="kicker !text-[color:var(--accent)]">{c.s}</p>
                                <h3 className="display text-2xl mt-2">{c.t}</h3>
                                <ul className="mt-4 space-y-2 text-[color:var(--ink2)]">
                                    {c.d.map((d) => (
                                        <li key={d} className="flex gap-2">
                                            <span className="text-[color:var(--accent)]" aria-hidden>
                                                ·
                                            </span>
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                                {!mine && (
                                    <Link to={href} className="ghost mt-5 text-sm">
                                        {c.t} →
                                    </Link>
                                )}
                            </div>
                        </Rise>
                    ))}
                </div>
            </section>

            {/* 9 · The offer, the bundle and the bonus */}
            <section id="buy" className="bg-[color:var(--card)] border-y border-[color:var(--line)]">
                <div className="wrap py-24 lg:py-28 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-stretch">
                    <Rise className="card !bg-white p-8 md:p-12 shadow-[0_40px_80px_-40px_rgba(43,38,34,.35)]">
                        <p className="kicker">{t.getKicker}</p>
                        <h2 className="display text-4xl md:text-5xl mt-3">{t.priceTitle}</h2>
                        <p className="serif text-xl mt-1 text-[color:var(--olive)]">{t.priceKicker}</p>
                        <ul className="mt-8 space-y-3">
                            {t.includes.map((x) => (
                                <li key={x} className="flex gap-3 text-lg leading-snug">
                                    <span className="text-[color:var(--accent)] font-bold" aria-hidden>
                                        ✓
                                    </span>
                                    {x}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-end gap-x-4 gap-y-3 mt-10 pt-8 dash">
                            <p className="display text-6xl md:text-7xl leading-none whitespace-nowrap">{price}</p>
                            <p className="pb-2 leading-tight">
                                <span className="kicker block !text-[color:var(--accent)]">{t.priceNote}</span>
                                <span className="serif text-xl text-[color:var(--ink2)]">{t.perBuy}</span>
                            </p>
                        </div>
                        <div className="mt-8">
                            <Cta lang={lang} position="price" />
                        </div>
                    </Rise>
                    <div className="flex flex-col gap-6">
                        <Rise className="rounded-[18px] p-8 bg-[color:var(--accent)] text-white">
                            <p className="kicker !text-white/75">{t.bundleKicker}</p>
                            <div className="flex items-center gap-3 mt-4">
                                <img src={lang === 'pt' ? '/guide/cover-pt.jpg' : '/guide/cover.jpg'} alt="" className="w-14 rounded shadow-lg -rotate-3" loading="lazy" />
                                <span className="serif text-2xl" aria-hidden>
                                    +
                                </span>
                                <img src={coverFor(lang)} alt="" className="w-14 rounded shadow-lg rotate-2" loading="lazy" />
                            </div>
                            <h3 className="display text-3xl mt-5">{t.bundleTitle}</h3>
                            <p className="mt-3 leading-relaxed text-white/85">{t.bundleText}</p>
                            <p className="mt-5 flex items-baseline gap-3">
                                <span className="display text-4xl">{lang === 'pt' ? TRIPS.bundlePricePt : TRIPS.bundlePrice}</span>
                                <span className="text-white/70 line-through">{lang === 'pt' ? TRIPS.bundleApartPt : TRIPS.bundleApart}</span>
                                <span className="text-sm text-white/70">{t.bundleApartLabel}</span>
                            </p>
                            <a href={bundleFor(lang)} className="btn light mt-6" onClick={() => buyClick(lang, 'bundle', 'bundle')}>
                                {t.bundleCta} →
                            </a>
                        </Rise>
                        <Rise className="card p-8 flex-1">
                            <p className="kicker">{t.bonusKicker}</p>
                            <h3 className="display text-2xl mt-3">{t.bonusTitle}</h3>
                            <p className="mt-3 leading-relaxed text-[color:var(--ink2)]">{t.bonusText}</p>
                            <p className="mt-4 text-xs leading-relaxed text-[color:var(--muted)]">{t.bonusFine}</p>
                        </Rise>
                    </div>
                </div>
            </section>

            {/* 10 · Objections */}
            <section className="wrap py-24 max-w-3xl">
                <h2 className="display text-4xl md:text-5xl">{t.faqTitle}</h2>
                <div className="mt-10 rule">
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
            </section>

            {/* 11 · Last call */}
            <section className="bg-[color:var(--accent)] text-white">
                <div className="wrap py-24 lg:py-28 text-center">
                    <h2 className="display text-4xl md:text-6xl max-w-3xl mx-auto">{t.finalTitle}</h2>
                    <p className="serif text-2xl md:text-3xl mt-5 text-white/85">{t.finalLead}</p>
                    <div className="mt-10 flex justify-center">
                        <Cta lang={lang} position="final" align="center" light />
                    </div>
                    <p className="mt-16 text-xs text-white/55 max-w-2xl mx-auto">{t.credits}</p>
                </div>
            </section>

            <Footer />

            <div className={`sticky ${sticky ? 'on' : ''}`}>
                <div className="flex items-center justify-between gap-4">
                    <p className="leading-tight">
                        <span className="block font-bold">{t.title}</span>
                        <span className="text-sm text-white/65">{t.stickyNote}</span>
                    </p>
                    <a href={checkoutFor(lang)} className="btn !py-3 !px-5 !text-base" onClick={() => buyClick(lang, 'sticky')}>
                        {t.buyShort} · {price}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TripsSales;
