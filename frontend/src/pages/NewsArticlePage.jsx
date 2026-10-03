import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import api from '../api/axios';

export default function NewsArticlePage() {
  const { slug } = useParams();
  const [result, setResult] = useState({ slug: null, article: null, status: 'loading' });
  const status = result.slug === slug ? result.status : 'loading';
  const article = result.slug === slug ? result.article : null;

  useEffect(() => {
    let active = true;
    api.get(`/news/${encodeURIComponent(slug)}`)
      .then((response) => {
        if (!active) return;
        setResult({ slug, article: response.data.data, status: 'success' });
      })
      .catch(() => {
        if (active) setResult({ slug, article: null, status: 'error' });
      });
    return () => { active = false; };
  }, [slug]);

  if (status === 'loading') return <p className="mx-auto max-w-4xl px-6 py-24 text-center text-gray-600">Loading article…</p>;
  if (status === 'error' || !article) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="font-display text-3xl font-bold">Article unavailable</h1><p className="mt-3 text-gray-600">This article may have been removed or is temporarily unavailable.</p><Link to="/news" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-maroon"><FaArrowLeft /> Back to news</Link></div>;
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon hover:underline"><FaArrowLeft /> All news</Link>
      {article.coverImage && <img src={article.coverImage} alt="" className="mt-8 max-h-[480px] w-full rounded-3xl object-cover" />}
      <div className="mt-8">
        <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-bold uppercase text-brand-gold-dark">{article.category}</span>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">{article.title}</h1>
        <p className="mt-4 flex items-center gap-2 text-sm text-gray-500"><FaCalendarAlt />{new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        {article.summary && <p className="mt-8 text-lg font-medium leading-relaxed text-gray-700">{article.summary}</p>}
        {article.content && <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">{article.content}</div>}
      </div>
    </article>
  );
}
