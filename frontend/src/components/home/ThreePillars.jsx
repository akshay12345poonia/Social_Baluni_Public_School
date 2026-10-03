import { Link } from 'react-router-dom';
import { FaSchool, FaShieldAlt, FaAtom } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const PILLARS = [
  {
    icon: FaSchool, color: 'bg-brand-maroon',
    title: 'Main School (Nursery–XII)',
    desc: 'CBSE-affiliated day & boarding schooling with the Integrated Learning Concept — academically, morally and physically sound development.',
    points: ['Day Boarding & Hostel', 'House System', 'Smart Classrooms & Labs'],
    image: 'https://picsum.photos/seed/pillar-school/640/420',
  },
  {
    icon: FaShieldAlt, color: 'bg-brand-green',
    title: 'Doon Baluni Defence Academy',
    desc: 'Dedicated preparation for NDA, CDS, NA, SSB, AFCAT, RIMC, Sainik School & RMS with ex-defence mentors and a military-style routine.',
    points: ['SSB Grooming', 'Physical Training', 'Written Exam Coaching'],
    image: 'https://picsum.photos/seed/pillar-nda/640/420',
  },
  {
    icon: FaAtom, color: 'bg-brand-gold',
    title: 'IIT / NEET Competitive Wing',
    desc: 'Baluni Classes inside campus: JEE Main & Advanced, NEET, NTSE and KVPY preparation integrated with school hours — no juggling, no travel.',
    points: ['Integrated Timetable', 'Daily Practice Sheets', 'Rank-focused Mentoring'],
    image: 'https://picsum.photos/seed/pillar-iit/640/420',
  },
];

export default function ThreePillars() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
      <SectionHeading
        kicker="Baluni Group of Education"
        title="Three Institutions. One Campus. Every Career Path."
        subtitle="Schooling, defence preparation and competitive-excellence under one ecosystem — so ambition never has to wait for after-school hours."
      />
      <div className="grid gap-8 md:grid-cols-3">
        {PILLARS.map((p) => (
          <Link key={p.title} to="/programs" className="group overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-2">
            <div className="relative h-52 overflow-hidden">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className={`absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg ${p.color}`}>
                <p.icon className="text-xl" />
              </div>
            </div>
            <div className="p-6 pt-10">
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{p.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.points.map((pt) => (
                  <li key={pt} className="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-maroon">{pt}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}