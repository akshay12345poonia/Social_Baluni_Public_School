import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

export default function NewsAndEvents({ news = [], events = [] }) {
  const month = (d) => new Date(d).toLocaleString('en', { month: 'short' }).toUpperCase();
  const day = (d) => new Date(d).getDate();

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Campus Life" title="News & Upcoming Events" />

        <div className="grid gap-10 lg:grid-cols-3">
          {/* News */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold">Latest News</h3>
              <Link to="/news" className="flex items-center gap-2 text-sm font-semibold text-brand-maroon hover:gap-3 transition-all">
                View All <FaArrowRight />
              </Link>
            </div>
            <div className="space-y-4">
              {(news.length ? news : []).map((n) => (
                <Link key={n._id} to={`/news/${n.slug || n._id}`} className="flex gap-5 rounded-2xl border border-gray-100 bg-brand-cream p-5 transition hover:border-brand-gold hover:shadow-card">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-maroon text-white">
                    <span className="text-xl font-bold">{day(n.publishedAt || n.createdAt)}</span>
                    <span className="text-[10px] uppercase">{month(n.publishedAt || n.createdAt)}</span>
                  </div>
                  <div>
                    <span className="mb-1 inline-block rounded-full bg-brand-gold/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark">{n.category}</span>
                    <h4 className="font-semibold leading-snug">{n.title}</h4>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{n.summary}</p>
                  </div>
                </Link>
              ))}
              {!news.length && (
                <div className="rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center text-gray-400">
                  Latest updates will appear here as the school publishes them — managed live from the CMS.
                </div>
              )}
            </div>
          </div>

          {/* Events */}
          <div>
            <h3 className="mb-6 font-display text-2xl font-bold">Upcoming Events</h3>
            <div className="space-y-4">
              {events.map((e) => (
                <div key={e._id} className="flex gap-5 rounded-2xl bg-gradient-to-br from-brand-maroon to-brand-maroon-dark p-5 text-white transition hover:-translate-y-1 hover:shadow-card">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-white/15">
                    <span className="text-xl font-bold">{day(e.startDate)}</span>
                    <span className="text-[10px] uppercase">{month(e.startDate)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold leading-snug">{e.title}</h4>
                    <p className="mt-1 flex items-center gap-2 text-xs text-gray-200"><FaMapMarkerAlt /> {e.location}</p>
                    <p className="mt-2 flex items-center gap-2 text-xs text-brand-gold"><FaCalendarAlt /> Save the date</p>
                  </div>
                </div>
              ))}
              {!events.length && <p className="text-sm text-gray-400">No upcoming events published yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}