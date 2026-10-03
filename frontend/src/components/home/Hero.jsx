import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_SLIDES = [
  { image: 'https://picsum.photos/seed/sbps-hero1/1600/900', title: 'Where Discipline Meets Ambition', subtitle: 'CBSE schooling integrated with IIT / NEET / NDA preparation — Nursery to Class XII.' },
  { image: 'https://picsum.photos/seed/sbps-hero2/1600/900', title: 'A Sports Ecosystem That Builds Champions', subtitle: '16 disciplines, professional coaching, state & national representation.' },
  { image: 'https://picsum.photos/seed/sbps-hero3/1600/900', title: 'Three Institutions. One Campus. Every Career Path.', subtitle: 'Main school • Doon Baluni Defence Academy • Baluni Classes.' },
];

export default function Hero({ banners = [] }) {
  const slides = banners.length ? banners : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-[86vh] min-h-[540px] overflow-hidden">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-maroon/50 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
        <div key={index} className="fade-up max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-brand-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-ink">
            Admissions Open 2025–26
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">
            {slides[index].title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-gray-200">{slides[index].subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/admissions" className="rounded-full bg-brand-gold px-8 py-3.5 font-semibold text-brand-ink shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-gold-dark">
              Apply for Admission
            </Link>
            <Link to="/about" className="rounded-full border-2 border-white/60 px-8 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-brand-maroon">
              Explore the Campus
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 flex gap-2 md:left-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-brand-gold' : 'w-2.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}