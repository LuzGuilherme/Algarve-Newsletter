import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../shared/components/Footer';
import { subscribeToNewsletter } from '../../shared/services/mailerLite';
import { trackEvent, trackLead } from '../../shared/services/analytics';
import changelog from '../data/changelog.json';
import { COPY, GUIDE, PAGES, Lang } from '../sales/content';

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
.gs .btn:disabled { opacity:.6; }
.gs .btn .sep { opacity:.35; }
.gs .ghost { display:inline-flex; align-items:center; gap:.5rem; font-weight:700; border-bottom:2px solid currentColor; padding-bottom:2px; }
.gs .field { flex:1 1 220px; min-width:0; border-radius:999px; padding:1rem 1.25rem; font-size:1rem; color:var(--ink); background:#fff;
  border:1px solid var(--line); outline:none; }
.gs .field:focus { border-color:var(--teal); box-shadow:0 0 0 3px rgba(0,109,119,.2); }
.gs .book { position:relative; width:min(340px,72vw); transform:perspective(1600px) rotateY(-16deg) rotateX(3deg) rotateZ(1deg);
  transform-style:preserve-3d; filter:drop-shadow(38px 44px 46px rgba(0,0,0,.55)); }
.gs .book img { display:block; width:100%; border-radius:3px 7px 7px 3px; }
.gs .book::before { content:""; position:absolute; inset:0 auto 0 0; width:5%; z-index:2; border-radius:3px 0 0 3px;
  background:linear-gradient(90deg, rgba(0,0,0,.38), rgba(255,255,255,.18) 45%, rgba(0,0,0,.12) 70%, rgba(0,0,0,0)); }
.gs .book::after { content:""; position:absolute; top:1.2%; bottom:1.2%; right:-9px; width:10px; z-index:-1; border-radius:0 3px 3px 0;
  background:repeating-linear-gradient(90deg,#fff 0 1px,#d9d4c7 1px 2px); }
.gs .rule { border-top:2px solid var(--ink); }
.gs .card { background:#fff; border:1px solid var(--line); border-radius:20px; }
.gs .strip { display:flex; gap:28px; overflow-x:auto; scroll-snap-type:x mandatory; padding:8px 24px 36px; scrollbar-width:thin; }
.gs .strip a { flex:0 0 auto; width:min(300px,70vw); scroll-snap-align:center; }
.gs .strip img { width:100%; background:#fff; border-radius:4px; box-shadow:0 1px 2px rgba(14,31,34,.12), 0 24px 44px -18px rgba(14,31,34,.4);
  transition:transform .2s; }
.gs .strip a:hover img { transform:translateY(-4px); }
.gs details summary { list-style:none; cursor:pointer; }
.gs details summary::-webkit-details-marker { display:none; }
.gs details .plus { transition:transform .2s; }
.gs details[open] .plus { transform:rotate(45deg); }
.gs .sticky { position:fixed; left:0; right:0; bottom:0; z-index:60; background:rgba(10,46,51,.96); backdrop-filter:blur(8px); color:#fff;
  transform:translateY(110%); transition:transform .25s; padding:10px 16px calc(10px + env(safe-area-inset-bottom)); }
.gs .sticky.on { transform:none; }
@media (min-width:1024px) { .gs .sticky { display:none; } }
`;

interface CtaProps {
    lang: Lang;
    position: string;
    dark?: boolean;
    align?: 'left' | 'center';
}

/** Buy button, or the "tell me when it's out" form while there is no checkout link. */
const Cta: React.FC<CtaProps> = ({ lang, position, dark, align = 'left' }) => {
    const t = COPY[lang];
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
    const micro = dark ? 'text-white/65' : 'text-[color:var(--ink2)]';
    const justify = align === 'center' ? 'justify-center text-center mx-auto' : '';

    if (GUIDE.checkoutUrl) {
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
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('sending');
        try {
            await subscribeToNewsletter(email, `guide_waitlist_${lang}`);
            trackLead(`guide_waitlist_${lang}_${position}`);
            setStatus('done');
            setEmail('');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'done') {
        return <p className={`font-bold text-lg ${dark ? 'text-[color:var(--sun)]' : 'text-[color:var(--teal)]'} ${justify}`}>{t.waitDone}</p>;
    }
    return (
        <div className={`max-w-xl ${justify}`}>
            <form onSubmit={submit} className="flex flex-wrap gap-3">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.waitPlaceholder}
                    aria-label={t.waitPlaceholder}
                    className="field"
                />
                <button type="submit" className="btn" disabled={status === 'sending'}>
                    {t.waitCta}
                </button>
            </form>
            {status === 'error' && <p className="mt-3 text-sm font-bold text-red-400">{t.waitError}</p>}
            <p className={`mt-4 text-sm leading-relaxed ${micro}`}>{t.waitMicro}</p>
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
    if (status === 'done') return <p className="mt-5 font-bold text-[color:var(--teal)]">{t.waitDone}</p>;
    return (
        <form onSubmit={submit} className="mt-5 flex flex-wrap gap-2">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.ptPlaceholder}
                aria-label={t.ptPlaceholder}
                className="field !py-3"
            />
            <button type="submit" disabled={status === 'sending'} className="rounded-full bg-[color:var(--ink)] text-white font-bold px-5 py-3">
                {t.ptCta}
            </button>
            {status === 'error' && <p className="w-full text-sm font-bold text-red-600">{t.waitError}</p>}
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
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Instrument+Serif:ital@1&display=swap"
                />
            </Helmet>
            <style>{css}</style>

            {/* Hero */}
            <header className="hero">
                <div className="wrap flex items-center justify-between py-6 text-sm">
                    <Link to="/" className="font-extrabold tracking-tight">
                        Algarve Newsletter
                    </Link>
                    <Link to={t.otherPath} className="text-white/70 hover:text-white font-semibold">
                        {t.otherLabel}
                    </Link>
                </div>
                <div className="wrap grid lg:grid-cols-[1.15fr_.85fr] gap-14 lg:gap-8 items-center pt-10 pb-24 lg:pt-16 lg:pb-32">
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
                    </div>
                    <div className="flex justify-center lg:justify-end lg:pr-10">
                        <div className="book">
                            <img src="/guide/cover.jpg" alt="The Whole Algarve, Edition 2027" width={900} height={1275} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Figures */}
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

            {/* Why */}
            <section className="wrap py-24 lg:py-32">
                <p className="kicker text-[color:var(--teal)]">{t.whyKicker}</p>
                <h2 className="display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl">{t.whyTitle}</h2>
                <div className="grid md:grid-cols-2 gap-x-14 gap-y-12 mt-16">
                    {t.why.map((w, i) => (
                        <div key={w.t} className="rule pt-5">
                            <p className="serif text-3xl text-[color:var(--teal)]">{String(i + 1).padStart(2, '0')}</p>
                            <h3 className="display font-extrabold text-2xl mt-2">{w.t}</h3>
                            <p className="mt-3 text-lg leading-relaxed text-[color:var(--ink2)]">{w.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Verdicts */}
            <section className="bg-white border-y border-[color:var(--line)]">
                <div className="wrap py-20 lg:py-24 grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start">
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
                </div>
            </section>

            {/* Who it is for */}
            <section className="wrap py-24 lg:py-32">
                <p className="kicker text-[color:var(--teal)]">{t.forKicker}</p>
                <h2 className="display font-extrabold text-4xl md:text-6xl mt-4">{t.forTitle}</h2>
                <div className="grid md:grid-cols-3 gap-6 mt-14">
                    {t.audiences.map((a) => (
                        <div key={a.t} className="card p-8 flex flex-col">
                            <h3 className="display font-extrabold text-2xl">{a.t}</h3>
                            <p className="mt-4 leading-relaxed text-[color:var(--ink2)] flex-1">{a.d}</p>
                            <p className="kicker mt-6 text-[color:var(--teal)]">{a.where}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Look inside */}
            <section className="bg-[#EFE8D8] py-24 lg:py-28">
                <div className="wrap">
                    <p className="kicker text-[color:var(--teal)]">{t.lookKicker}</p>
                    <h2 className="display font-extrabold text-4xl md:text-6xl mt-4">{t.lookTitle}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)] max-w-2xl">{t.lookLead}</p>
                </div>
                <div className="strip mt-12 max-w-[1400px] mx-auto">
                    {PAGES.map((p) => (
                        <a key={p.src} href={p.src} target="_blank" rel="noopener">
                            <img src={p.src} alt={p[lang]} loading="lazy" width={760} height={1077} />
                            <span className="block mt-4 text-sm font-semibold text-[color:var(--ink2)]">{p[lang]}</span>
                        </a>
                    ))}
                </div>
                <div className="wrap text-center mt-4">
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
            </section>

            {/* Contents */}
            <section className="wrap py-24 lg:py-32">
                <p className="kicker text-[color:var(--teal)]">{t.insideKicker}</p>
                <h2 className="display font-extrabold text-4xl md:text-6xl mt-4">{t.insideTitle}</h2>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink2)] max-w-2xl">{t.insideLead}</p>
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
            </section>

            {/* Author */}
            <section className="bg-[color:var(--deep)] text-white">
                <div className="wrap py-24 lg:py-28 max-w-4xl">
                    <p className="kicker text-[color:var(--sun)]">{t.authorKicker}</p>
                    <h2 className="display font-extrabold text-4xl md:text-5xl mt-4">{t.authorTitle}</h2>
                    <p className="serif text-2xl md:text-[2rem] leading-snug mt-10 text-white/90">{t.author[0]}</p>
                    <p className="mt-8 text-lg leading-relaxed text-white/75">{t.author[1]}</p>
                    <p className="mt-5 text-lg leading-relaxed text-white/75">{t.author[2]}</p>
                </div>
            </section>

            {/* Price */}
            <section id="buy" className="wrap py-24 lg:py-32">
                <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-stretch">
                    <div className="card p-8 md:p-12 shadow-[0_40px_80px_-40px_rgba(14,31,34,.35)]">
                        <p className="kicker text-[color:var(--teal)]">{t.priceKicker}</p>
                        <h2 className="display font-extrabold text-4xl md:text-5xl mt-3">{t.priceTitle}</h2>
                        <div className="flex flex-wrap items-end gap-x-4 gap-y-3 mt-8">
                            <p className="display font-extrabold text-6xl md:text-7xl leading-none whitespace-nowrap">{price}</p>
                            <p className="pb-2 leading-tight">
                                <span className="kicker block text-[color:var(--teal)]">{t.priceNote}</span>
                                <span className="serif text-xl text-[color:var(--ink2)]">{t.perPage}</span>
                            </p>
                        </div>
                        <ul className="mt-9 space-y-3">
                            {t.includes.map((x) => (
                                <li key={x} className="flex gap-3 text-lg leading-snug">
                                    <span className="text-[color:var(--teal)] font-extrabold" aria-hidden>
                                        ✓
                                    </span>
                                    {x}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10">
                            <Cta lang={lang} position="price" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="card p-8 flex-1">
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
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
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

            {/* Final call */}
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
                        <span className="text-sm text-white/65">
                            {price} · {t.priceNote.toLowerCase()}
                        </span>
                    </p>
                    <a
                        href={GUIDE.checkoutUrl || '#buy'}
                        className="btn !py-3 !px-5 !text-base"
                        onClick={() => trackEvent('guide_buy_click', 'guide', `${lang}_sticky`)}
                    >
                        {GUIDE.checkoutUrl ? t.buyShort : t.waitCta}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GuideSales;
