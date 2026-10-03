import Counter from '../ui/Counter';

const FALLBACK = { students: 3000, staff: 400, institutions: 3, selections: 150 };

export default function StatsBar({ stats }) {
  const s = stats || FALLBACK;
  const items = [
    { value: s.students, suffix: '+', label: 'Students' },
    { value: s.staff, suffix: '+', label: 'Faculty & Staff' },
    { value: s.institutions, suffix: '', label: 'Institutions on Campus' },
    { value: s.selections, suffix: '+', label: 'NDA / IIT / NEET Selections' },
  ];

  return (
    <section className="bg-gradient-to-r from-brand-maroon-dark via-brand-maroon to-brand-maroon-dark">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <p className="font-display text-4xl font-extrabold text-brand-gold md:text-5xl">
              <Counter value={it.value} suffix={it.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gray-200">{it.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}