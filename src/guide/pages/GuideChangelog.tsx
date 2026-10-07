import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import changelog from '../data/changelog.json';

interface Chapter {
    n: number;
    title: string;
    part: string;
    checked: string;
}

interface Correction {
    date: string;
    chapter: number;
    text: string;
}

const chapters = changelog.chapters as Chapter[];
const corrections = changelog.corrections as Correction[];
const parts = Array.from(new Set(chapters.map((c) => c.part)));

const GuideChangelog: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>The Whole Algarve · Corrections and updates | Algarve Newsletter</title>
                <meta
                    name="description"
                    content="Corrections and updates to The Whole Algarve, Edition 2027: what changed since the edition was published, and when each chapter was last checked."
                />
                <link rel="canonical" href="https://algarvenewsletter.pt/guide/changelog" />
            </Helmet>
            <Navbar theme="dark" />

            <main className="pt-32 pb-24 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-3">
                        The Whole Algarve · {changelog.edition}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
                        Corrections and updates
                    </h1>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                        <p className="lead text-xl text-slate-500 mb-8">
                            This is the page named at the foot of every chapter of the guide. When something in the
                            guide turns out to be wrong, or changes after we checked it, the correction is listed
                            here.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">Corrections</h3>
                        {corrections.length === 0 ? (
                            <p className="mb-6">None so far. This is the first edition.</p>
                        ) : (
                            <ul className="mb-6">
                                {corrections.map((c, i) => (
                                    <li key={i}>
                                        <strong>
                                            {c.date} · Chapter {c.chapter}.
                                        </strong>{' '}
                                        {c.text}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">Found a mistake?</h3>
                        <p className="mb-6">
                            Tell us on the <Link to="/guide/report" className="text-cyan-600 font-bold">report page</Link>,
                            or write to{' '}
                            <a href="mailto:hello@algarvenewsletter.pt" className="text-cyan-600 font-bold">
                                hello@algarvenewsletter.pt
                            </a>
                            . Say which chapter and section, and where you read the right answer if you can.
                        </p>

                        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">When each chapter was last checked</h3>
                        {parts.map((part) => (
                            <div key={part} className="mb-6">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">{part}</p>
                                <table className="w-full text-base">
                                    <tbody>
                                        {chapters
                                            .filter((c) => c.part === part)
                                            .map((c) => (
                                                <tr key={c.n} className="border-b border-slate-100">
                                                    <td className="py-2 pr-3 w-10 text-slate-400">{c.n}</td>
                                                    <td className="py-2 pr-3 text-slate-800">{c.title}</td>
                                                    <td className="py-2 text-right whitespace-nowrap">{c.checked}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default GuideChangelog;
