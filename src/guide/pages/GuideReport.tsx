import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import changelog from '../data/changelog.json';

const EMAIL = 'hello@algarvenewsletter.pt';
const chapters = changelog.chapters as { n: number; title: string }[];
const field =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600';
const label = 'block text-sm font-bold text-slate-700 mb-2';

const GuideReport: React.FC = () => {
    const [chapter, setChapter] = useState('');
    const [where, setWhere] = useState('');
    const [wrong, setWrong] = useState('');
    const [source, setSource] = useState('');

    // The site has no server of its own: the form writes the email, and the reader sends it.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `The Whole Algarve · ${changelog.edition} · correction${chapter ? ` · ${chapter}` : ''}`;
        const body = [
            `Chapter: ${chapter}`,
            `Section or heading: ${where}`,
            '',
            'What is wrong:',
            wrong,
            '',
            'Where the right answer is:',
            source,
        ].join('\n');
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>The Whole Algarve · Report a mistake | Algarve Newsletter</title>
                <meta
                    name="description"
                    content="Found something wrong in The Whole Algarve? Tell us which chapter and what should change."
                />
                <link rel="canonical" href="https://algarvenewsletter.pt/guide/report" />
            </Helmet>
            <Navbar theme="dark" />

            <main className="pt-32 pb-24 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-3">
                        The Whole Algarve · {changelog.edition}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
                        Report a mistake
                    </h1>
                    <p className="text-xl text-slate-500 mb-8">
                        A price that changed, a place that closed, something we got wrong: tell us and we will check
                        it. Corrections are listed on the{' '}
                        <Link to="/guide/changelog" className="text-cyan-600 font-bold">
                            corrections page
                        </Link>
                        .
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="chapter" className={label}>Chapter</label>
                            <select
                                id="chapter"
                                className={field}
                                value={chapter}
                                onChange={(e) => setChapter(e.target.value)}
                                required
                            >
                                <option value="">Choose a chapter</option>
                                {chapters.map((c) => (
                                    <option key={c.n} value={`${c.n} ${c.title}`}>
                                        {c.n} · {c.title}
                                    </option>
                                ))}
                                <option value="Other">Somewhere else in the guide</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="where" className={label}>Section or heading</label>
                            <input
                                id="where"
                                type="text"
                                className={field}
                                value={where}
                                onChange={(e) => setWhere(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="wrong" className={label}>What is wrong</label>
                            <textarea
                                id="wrong"
                                rows={5}
                                className={field}
                                value={wrong}
                                onChange={(e) => setWrong(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="source" className={label}>Where the right answer is (a link, if you have one)</label>
                            <input
                                id="source"
                                type="text"
                                className={field}
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto rounded-full bg-[#006D77] px-8 py-4 text-lg font-black text-white hover:bg-[#004E55] transition-colors"
                        >
                            Write the email
                        </button>
                        <p className="text-sm text-slate-500">
                            The button opens your email app with the message written, and you send it. Nothing is
                            stored on this page. If no email app opens, write to{' '}
                            <a href={`mailto:${EMAIL}`} className="text-cyan-600 font-bold">{EMAIL}</a>.
                        </p>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default GuideReport;
