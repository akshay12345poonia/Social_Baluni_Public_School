import { Link } from 'react-router-dom';
import { FaBullhorn } from 'react-icons/fa';

export default function NoticeTicker({ notices = [] }) {
  const items = notices.length ? notices : [{ _id: 1, title: 'Fee Schedule 2025-26 now available' }, { _id: 2, title: 'NCERT books list released' }, { _id: 3, title: 'Hostel circular for new admissions' }];
  const loop = [...items, ...items];

  return (
    <div className="flex items-center bg-brand-maroon text-white">
      <div className="flex shrink-0 items-center gap-2 bg-brand-gold px-5 py-3 font-semibold text-brand-ink">
        <FaBullhorn className="animate-pulse" /> <span className="hidden sm:inline">Latest</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max">
          {loop.map((n, i) => (
            <Link key={`${n._id}-${i}`} to="/news" className="mx-8 flex items-center gap-3 py-3 text-sm hover:text-brand-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              {n.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}