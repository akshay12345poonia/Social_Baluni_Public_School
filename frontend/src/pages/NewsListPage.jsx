import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import api from '../api/axios';

export default function NewsListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [reload, setReload] = useState(0);
  const requestKey = `${page}:${query}`;
  const [response, setResponse] = useState({ key: '', status: 'loading', result: { data: [], pages: 1 } });
  const status = response.key === requestKey ? response.status : 'loading';
  const result = response.key === requestKey ? response.result : { data: [], pages: 1 };

  useEffect(() => {
    let active = true;
    api.get('/news', { params: { page, limit: 9, search: query || undefined } })
      .then((response) => {
        if (!active) return;
        setResponse({ key: requestKey, status: 'success', result: response.data });
      })
      .catch(() => {
        if (active) setResponse({ key: requestKey, status: 'error', result: { data: [], pages: 1 } });
      });
    return () => { active = false; };
  }, [page, query, reload, requestKey]);

  const submitSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setQuery(search.trim());
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="text-sm font-semibold uppercase tracking-widest text-brand-maroon">From our campus</p><h1 className="mt-2 font-display text-4xl font-bold">News & Announcements</h1></div>
        <form onSubmit={submitSearch} className="flex w-full gap-2 md:max-w-sm">
          <label className="sr-only" htmlFor="news-search">Search news</label>
          <input id="news-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search news…" className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-maroon" />
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand-maroon px-4 py-3 text-sm font-semibold text-white" aria-label="Search news"><FaSearch /><span className="hidden sm:inline">Search</span></button>
        </form>
      </div>
      {status === 'loading' && <p className="py-12 text-center text-gray-500" role="status">Loading news…</p>}
      {status === 'error' && <div className="rounded-2xl bg-red-50 p-8 text-center text-red-800" role="alert">News could not be loaded. Please check your connection and try again.<br /><button type="button" onClick={() => setReload((current) => current + 1)} className="mt-4 font-semibold underline">Try again</button></div>}
      {status === 'success' && !result.data.length && <p className="rounded-2xl bg-white p-10 text-center text-gray-600">{query ? `No news found for “${query}”.` : 'There are no news articles available yet.'}</p>}
      {status === 'success' && !!result.data.length && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.data.map((n) => (
          <Link to={`/news/${n.slug || n._id}`} key={n._id} className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1">
            {n.coverImage && <img src={n.coverImage} alt={n.title} className="h-44 w-full object-cover" loading="lazy" />}
            <div className="p-6">
              <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-[10px] font-bold uppercase text-brand-gold-dark">{n.category}</span>
              <h2 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-brand-maroon">{n.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{n.summary}</p>
              <p className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <FaCalendarAlt /> {new Date(n.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </Link>
        ))}
      </div>}
      {status === 'success' && result.pages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: result.pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : undefined} className={`h-10 w-10 rounded-full font-semibold ${page === i + 1 ? 'bg-brand-maroon text-white' : 'bg-white'}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}