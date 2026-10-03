import { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const FALLBACK = [
  { _id: 1, name: 'Parent of Mohit Dobhal', role: 'Parent', className: 'Class VII', message: 'Child has shown remarkable improvement — the structured environment and sports exposure made all the difference.' },
  { _id: 2, name: 'Col. R. S. Negi (Retd.)', role: 'Parent of NDA cadet', className: 'Class XII', message: 'The discipline and physical culture here is exactly what defence aspirants need before the NDA.' },
  { _id: 3, name: 'Ishita Negi', role: 'Alumna', className: 'Batch 2022', message: 'The integrated JEE program saved me a year of juggling school and coaching. Faculty genuinely care.' },
];

export default function Testimonials({ testimonials }) {
  const list = testimonials?.length ? testimonials : FALLBACK;
  const [i, setI] = useState(0);
  const t = list[i] || {};

  return (
    <section className="bg-brand-cream py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeading kicker="Voices" title="What Parents & Alumni Say" />
        <div className="relative rounded-3xl bg-white p-10 shadow-card md:p-12">
          <FaQuoteLeft className="mx-auto mb-6 text-4xl text-brand-gold" />
          <p key={t._id} className="fade-up min-h-[90px] text-lg leading-relaxed text-gray-700">"{t.message}"</p>
          <div className="mt-6">
            <p className="font-display text-lg font-bold text-brand-maroon">{t.name}</p>
            <p className="text-sm text-gray-500">{t.role}{t.className ? ` • ${t.className}` : ''}</p>
            <div className="mt-2 flex justify-center gap-1 text-brand-gold">
              {Array.from({ length: t.rating || 5 }).map((_, s) => <FaStar key={s} />)}
            </div>
          </div>

          <button onClick={() => setI((i - 1 + list.length) % list.length)} aria-label="Previous" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition hover:bg-brand-maroon hover:text-white">
            <FaChevronLeft />
          </button>
          <button onClick={() => setI((i + 1) % list.length)} aria-label="Next" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition hover:bg-brand-maroon hover:text-white">
            <FaChevronRight />
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {list.map((_, d) => (
            <button key={d} onClick={() => setI(d)} aria-label={`Testimonial ${d + 1}`} className={`h-2.5 rounded-full transition-all ${d === i ? 'w-8 bg-brand-maroon' : 'w-2.5 bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}