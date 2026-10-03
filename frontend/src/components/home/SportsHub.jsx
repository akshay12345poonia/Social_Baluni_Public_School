import { useState } from 'react';
import {
  FaBaseballBall, FaFutbol, FaVolleyballBall, FaShieldAlt, FaBullseye,
  FaHandRock, FaRunning, FaBasketballBall, FaTableTennis, FaOm, FaUsers,
  FaMedal, FaCheckCircle,
} from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const NAME_ICONS = {
  Cricket: FaBaseballBall, Football: FaFutbol, Volleyball: FaVolleyballBall,
  Fencing: FaShieldAlt, Shooting: FaBullseye, Boxing: FaHandRock,
  Athletics: FaRunning, Basketball: FaBasketballBall, Badminton: FaTableTennis,
  Yoga: FaOm, Kabaddi: FaUsers,
};

const FALLBACK = [
  { _id: '1', name: 'Cricket', icon: 'FaBaseballBall', description: 'Professional cricket coaching with turf wickets and age-group squads.', facilities: ['Turf pitch', 'Bowling machines'] },
  { _id: '2', name: 'Fencing', icon: 'FaShieldAlt', description: 'One of the few school fencing programs in Uttarakhand — National Games medalists.', facilities: ['Piste & full gear', 'National-level coach'] },
  { _id: '3', name: 'Shooting', icon: 'FaBullseye', description: '10m indoor range producing state champions year after year.', facilities: ['10m indoor range', 'Electronic targets'] },
  { _id: '4', name: 'Boxing', icon: 'FaHandRock', description: 'Ring training with certified coaches and structured strength programs.', facilities: ['Full-size ring', 'Strength room'] },
  { _id: '5', name: 'Athletics', icon: 'FaRunning', description: 'Track & field with specialised sprint, jump and throw coaching.', facilities: ['200m track', 'Jump pits'] },
  { _id: '6', name: 'Football', icon: 'FaFutbol', description: 'Full-size ground with structured inter-house leagues.', facilities: ['Full-size ground'] },
  { _id: '7', name: 'Volleyball', icon: 'FaVolleyballBall', description: 'State-level squads for boys and girls.', facilities: ['2 courts'] },
  { _id: '8', name: 'Basketball', icon: 'FaBasketballBall', description: 'Floodlit courts and inter-school circuit participation.', facilities: ['2 floodlit courts'] },
];

export default function SportsHub({ sports }) {
  const list = sports?.length ? sports : FALLBACK;
  const [active, setActive] = useState(0);
  const sport = list[active] || {};
  const Icon = NAME_ICONS[sport.name] || NAME_ICONS[sport.icon] || FaMedal;

  return (
    <section className="bg-brand-cream py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="Sports @ SBPS"
          title="Where Champions Are Built"
          subtitle="Cricket to fencing, shooting to boxing — 16+ disciplines with professional coaching, teams and a culture that produced National Games athletes."
        />

        {/* Sport tabs */}
        <div className="no-scrollbar mb-10 flex gap-3 overflow-x-auto pb-2">
          {list.map((s, i) => {
            const TIcon = NAME_ICONS[s.name] || NAME_ICONS[s.icon] || FaMedal;
            return (
              <button
                key={s._id || s.name}
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  i === active ? 'bg-brand-maroon text-white shadow-card' : 'bg-white text-gray-600 hover:text-brand-maroon'
                }`}
              >
                <TIcon /> {s.name}
              </button>
            );
          })}
        </div>

        {/* Active sport detail */}
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-card lg:grid-cols-2">
          <div className="relative min-h-[280px]">
            <img
              src={sport.coverImage || `https://picsum.photos/seed/sport-${sport.name}/800/600`}
              alt={sport.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold text-brand-ink shadow-lg">
                <Icon className="text-2xl" />
              </span>
              <h3 className="font-display text-2xl font-bold text-white">{sport.name}</h3>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <p className="leading-relaxed text-gray-600">{sport.description || 'Dedicated coaching, structured teams and year-round competition calendars.'}</p>
            <div className="mt-6">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-maroon"><FaCheckCircle /> Facilities & Program</h4>
              <ul className="flex flex-wrap gap-2">
                {(sport.facilities?.length ? sport.facilities : ['Dedicated coach', 'Age-group teams', 'Inter-house leagues']).map((f) => (
                  <li key={f} className="rounded-full bg-brand-cream px-3.5 py-1.5 text-xs font-medium text-brand-green">{f}</li>
                ))}
              </ul>
            </div>
            {sport.achievements?.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-maroon"><FaMedal className="text-brand-gold" /> Recent Achievements</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {sport.achievements.slice(0, 3).map((a) => (
                    <li key={a.title}>{a.studentName} — {a.title} ({a.year})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}