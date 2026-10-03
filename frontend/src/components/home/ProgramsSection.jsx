import { Link } from 'react-router-dom';
import { FaAtom, FaStethoscope, FaShieldAlt, FaAward, FaTrophy } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const ICONS = { FaAtom, FaStethoscope, FaShieldAlt, FaAward, FaTrophy };

const FALLBACK = [
  { _id: 1, name: 'IIT-JEE Integrated', tagline: 'JEE Main & Advanced with school', icon: 'FaAtom', stats: { selections: 42 } },
  { _id: 2, name: 'NEET Integrated', tagline: 'Medical dreams, in-house', icon: 'FaStethoscope', stats: { selections: 35 } },
  { _id: 3, name: 'NDA & Defence', tagline: 'NDA, CDS, SSB, RIMC & more', icon: 'FaShieldAlt', stats: { selections: 50 } },
  { _id: 4, name: 'NTSE & KVPY', tagline: 'Scholarship & research excellence', icon: 'FaAward', stats: { selections: 23 } },
];

export default function ProgramsSection({ programs }) {
  const list = programs?.length ? programs : FALLBACK;

  return (
    <section className="bg-gradient-to-br from-brand-ink via-[#221326] to-brand-maroon-dark py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          dark
          kicker="Not Ordinary Text Sections — Career Launchpads"
          title="Integrated Career Programmes"
          subtitle="Preparation for IIT, NEET, NDA and national scholarships woven directly into the school day — the reason families across Uttarakhand choose SBPS."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => {
            const Icon = ICONS[p.icon] || FaTrophy;
            return (
              <Link key={p._id} to={`/programs/${p.slug || ''}`} className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:-translate-y-2 hover:border-brand-gold/60 hover:bg-white/10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold transition group-hover:scale-110">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-300">{p.tagline}</p>
                {p.stats?.selections > 0 && (
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-bold text-brand-gold">
                    <FaTrophy /> {p.stats.selections}+ selections
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}