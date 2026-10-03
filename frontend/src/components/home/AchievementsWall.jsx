import { Link } from 'react-router-dom';
import { FaTrophy, FaMedal, FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const TYPE_STYLE = {
  iit: 'bg-blue-100 text-blue-700', neet: 'bg-green-100 text-green-700',
  nda: 'bg-brand-maroon/10 text-brand-maroon', sports: 'bg-brand-gold/20 text-brand-gold-dark',
  board: 'bg-purple-100 text-purple-700', olympiad: 'bg-orange-100 text-orange-700',
};

const FALLBACK = [
  { _id: 1, studentName: 'NDA Cadet 2024', title: 'NDA 150 — Selected', type: 'nda', year: 2024 },
  { _id: 2, studentName: 'Riya Panwar', title: 'JEE Advanced — AIR under 1000', type: 'iit', year: 2024 },
  { _id: 3, studentName: 'Kartika Dobhal', title: 'Gold — State Shooting Championship', type: 'sports', year: 2024 },
  { _id: 4, studentName: 'Fencing Team', title: 'Bronze — 38th National Games', type: 'sports', year: 2024 },
  { _id: 5, studentName: 'Mohit Rawat', title: 'NEET Qualifier — Govt. MBBS Seat', type: 'neet', year: 2023 },
  { _id: 6, studentName: 'Ananya Semwal', title: 'NTSE State Scholar', type: 'olympiad', year: 2023 },
];

export default function AchievementsWall({ achievements }) {
  const list = achievements?.length ? achievements : FALLBACK;

  return (
    <section className="bg-brand-ink py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            dark align="left"
            kicker="Wall of Fame"
            title="Our Students. Our Pride. Every Single Year."
            subtitle="NDA selections, JEE ranks, NEET qualifiers, national medals — updated live from the CMS, each achievement is a shareable story."
          />
          <Link to="/achievements" className="mb-12 flex shrink-0 items-center gap-2 rounded-full border border-brand-gold px-6 py-3 text-sm font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-ink">
            Full Wall of Fame <FaArrowRight />
          </Link>
        </div>

        <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-4">
          {list.map((a) => (
            <div key={a._id} className="w-64 shrink-0 snap-start rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1.5 hover:bg-white/10">
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${TYPE_STYLE[a.type] || 'bg-gray-100 text-gray-600'}`}>
                  {a.type}
                </span>
                <FaMedal className="text-xl text-brand-gold" />
              </div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-maroon to-brand-maroon-dark font-display text-lg font-bold text-white">
                {a.studentName?.charAt(0) || '★'}
              </div>
              <h4 className="font-semibold text-white">{a.title}</h4>
              <p className="mt-1 text-sm text-gray-400">{a.studentName}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-brand-gold"><FaTrophy /> {a.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}