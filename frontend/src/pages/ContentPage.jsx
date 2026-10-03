import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaRedoAlt, FaTrophy } from 'react-icons/fa';
import api from '../api/axios';
import { SITE } from '../data/site';
import EnquirySection from '../components/home/EnquirySection';

const PAGE_COPY = {
  about: {
    kicker: 'Our school',
    title: 'A place to learn, grow and find your direction.',
    description: 'Social Baluni Public School brings academic learning, character, sport and career preparation together on one campus in Dehradun.',
  },
  academics: {
    kicker: 'Academics',
    title: 'Strong foundations. Confident futures.',
    description: 'A supportive school journey from early years through senior secondary, built around curiosity, steady progress and individual guidance.',
  },
  programs: {
    kicker: 'Integrated programmes',
    title: 'One school day. More possibilities.',
    description: 'Explore the additional pathways that help students pursue competitive examinations alongside their school education.',
  },
  sports: {
    kicker: 'Sports at SBPS',
    title: 'Find your game. Build your strength.',
    description: 'Explore school sports programmes, coaching and facilities. Select a sport to learn more about its training pathway.',
  },
  achievements: {
    kicker: 'Wall of fame',
    title: 'Every milestone is worth celebrating.',
    description: 'A collection of student achievements across academics, competitive examinations, defence and sport.',
  },
  gallery: {
    kicker: 'Life at SBPS',
    title: 'Moments that make a school.',
    description: 'Explore the events, learning experiences and campus moments shared by our school community.',
  },
  contact: {
    kicker: 'Get in touch',
    title: 'We would be happy to hear from you.',
    description: 'Speak with the school team about admissions, campus visits, programmes or any other questions.',
  },
};

const PAGE_ENDPOINTS = {
  about: '/faculty?limit=6&sort=order',
  academics: '/faculty?limit=12&sort=order',
  programs: '/programs?limit=50&sort=order',
  sports: '/sports?limit=50&sort=order',
  achievements: '/achievements?limit=50&sort=-year',
  gallery: '/gallery?limit=50&sort=-date',
};

const facts = [
  { title: 'Whole-child learning', text: 'Academic, personal and physical development are valued together.' },
  { title: 'A connected campus', text: 'School learning and additional preparation are brought closer together.' },
  { title: 'Room to participate', text: 'Students are encouraged to explore sport, arts and leadership.' },
];

function PageHero({ copy }) {
  return (
    <header className="bg-gradient-to-br from-brand-ink via-[#38202c] to-brand-maroon py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">{copy.kicker}</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">{copy.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{copy.description}</p>
      </div>
    </header>
  );
}

function DataState({ status, onRetry }) {
  if (status === 'loading') return <p className="py-12 text-center text-gray-500" role="status">Loading school information…</p>;
  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-800">We could not load this information right now.</p>
        <button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-maroon shadow-sm"><FaRedoAlt /> Try again</button>
      </div>
    );
  }
  return null;
}

function ProgramCards({ programs }) {
  if (!programs.length) return <p className="rounded-2xl bg-white p-8 text-center text-gray-600">Programme details will be published here soon. Please contact admissions for current options.</p>;
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{programs.map((program) => (
    <Link key={program._id} to={`/programs/${program.slug || program._id}`} className="group rounded-2xl bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">Integrated programme</span>
      <h2 className="mt-3 font-display text-xl font-bold">{program.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{program.tagline || program.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon">Explore programme <FaArrowRight className="transition group-hover:translate-x-1" /></span>
    </Link>
  ))}</div>;
}

function SportCards({ sports }) {
  if (!sports.length) return <p className="rounded-2xl bg-white p-8 text-center text-gray-600">Sports information will be published here soon.</p>;
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{sports.map((sport) => (
    <article key={sport._id} className="overflow-hidden rounded-2xl bg-white shadow-card">
      {sport.coverImage ? <img src={sport.coverImage} alt={sport.name} className="h-48 w-full object-cover" loading="lazy" /> : <div className="flex h-32 items-center justify-center bg-gradient-to-br from-brand-maroon to-brand-ink text-4xl font-display font-bold text-brand-gold">{sport.name?.slice(0, 1)}</div>}
      <div className="p-6"><h2 className="font-display text-xl font-bold">{sport.name}</h2><p className="mt-2 text-sm leading-relaxed text-gray-600">{sport.description}</p>
        {!!sport.facilities?.length && <ul className="mt-4 space-y-2">{sport.facilities.map((facility) => <li key={facility} className="flex items-start gap-2 text-sm text-gray-600"><FaCheck className="mt-1 shrink-0 text-brand-green" />{facility}</li>)}</ul>}
      </div>
    </article>
  ))}</div>;
}

function AchievementCards({ achievements }) {
  if (!achievements.length) return <p className="rounded-2xl bg-white p-8 text-center text-gray-600">Student achievements will be featured here soon.</p>;
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{achievements.map((item) => (
    <article key={item._id} className="rounded-2xl bg-white p-6 shadow-card">
      <div className="flex items-center justify-between"><span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-bold uppercase text-brand-gold-dark">{item.type || 'Achievement'}</span><FaTrophy className="text-xl text-brand-gold" /></div>
      <h2 className="mt-5 font-display text-xl font-bold">{item.title}</h2>
      <p className="mt-2 text-sm text-gray-600">{item.studentName}</p>
      {(item.detail || item.event) && <p className="mt-3 text-sm text-gray-500">{item.detail || item.event}</p>}
      <p className="mt-4 text-xs font-semibold text-brand-maroon">{item.year}</p>
    </article>
  ))}</div>;
}

function GalleryCards({ albums }) {
  const images = albums.flatMap((album) => {
    const albumImages = (album.images || []).map((image) => ({ ...image, albumTitle: album.title }));
    if (album.coverImage) albumImages.unshift({ url: album.coverImage, caption: album.title, albumTitle: album.title });
    return albumImages;
  });
  if (!images.length) return <p className="rounded-2xl bg-white p-8 text-center text-gray-600">Gallery photographs will be published here soon.</p>;
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map((image, index) => (
    <figure key={`${image.url}-${index}`} className="group overflow-hidden rounded-2xl bg-white shadow-card">
      <img src={image.url} alt={image.caption || image.albumTitle} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      <figcaption className="p-4"><p className="font-semibold">{image.caption || image.albumTitle}</p><p className="mt-1 text-xs text-gray-500">{image.albumTitle}</p></figcaption>
    </figure>
  ))}</div>;
}

function StaffCards({ staff }) {
  if (!staff.length) return <p className="text-sm text-gray-500">Staff profiles will be added soon.</p>;
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{staff.map((person) => (
    <article key={person._id} className="rounded-2xl bg-white p-6 shadow-card">
      {person.photo ? <img src={person.photo} alt={person.name} className="mb-4 h-40 w-full rounded-xl object-cover" loading="lazy" /> : <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-brand-cream font-display text-3xl font-bold text-brand-maroon">{person.name?.slice(0, 1)}</div>}
      <h3 className="font-display text-lg font-bold">{person.name}</h3>
      {person.designation && <p className="mt-1 text-sm font-medium text-brand-maroon">{person.designation}</p>}
      {person.qualification && <p className="mt-2 text-sm text-gray-600">{person.qualification}</p>}
      {person.message && <p className="mt-3 text-sm leading-relaxed text-gray-600">{person.message}</p>}
    </article>
  ))}</div>;
}

export default function ContentPage({ type }) {
  const { slug } = useParams();
  const [reload, setReload] = useState(0);
  const [loaded, setLoaded] = useState({ endpoint: null, status: 'loading', records: [], program: null });
  const endpoint = useMemo(() => type === 'program-detail' ? `/programs/${encodeURIComponent(slug || '')}` : PAGE_ENDPOINTS[type], [type, slug]);
  const isCurrentResponse = loaded.endpoint === endpoint;
  const status = endpoint ? (isCurrentResponse ? loaded.status : 'loading') : 'success';
  const records = isCurrentResponse ? loaded.records : [];
  const program = isCurrentResponse ? loaded.program : null;

  useEffect(() => {
    let active = true;
    if (!endpoint) return undefined;
    api.get(endpoint).then((response) => {
      if (!active) return;
      setLoaded({
        endpoint,
        status: 'success',
        records: type === 'program-detail' ? [] : response.data.data || [],
        program: type === 'program-detail' ? response.data.data : null,
      });
    }).catch(() => {
      if (active) setLoaded({ endpoint, status: 'error', records: [], program: null });
    });
    return () => { active = false; };
  }, [endpoint, type, reload]);

  const retry = () => setReload((current) => current + 1);

  if (type === 'not-found') {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center"><p className="text-sm font-bold uppercase tracking-widest text-brand-maroon">404</p><h1 className="mt-3 font-display text-4xl font-bold">This page could not be found.</h1><p className="mt-4 text-gray-600">The page may have moved or the address may be incorrect.</p><Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-maroon px-6 py-3 font-semibold text-white">Back to home <FaArrowRight /></Link></div>;
  }

  if (type === 'contact') {
    return <><PageHero copy={PAGE_COPY.contact} /><section className="bg-brand-cream py-12"><div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3"><div className="rounded-2xl bg-white p-6 shadow-card"><FaMapMarkerAlt className="text-xl text-brand-maroon" /><h2 className="mt-3 font-semibold">Visit us</h2><p className="mt-2 text-sm leading-relaxed text-gray-600">{SITE.address}</p></div><div className="rounded-2xl bg-white p-6 shadow-card"><FaPhoneAlt className="text-xl text-brand-maroon" /><h2 className="mt-3 font-semibold">Call admissions</h2>{SITE.phones.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="mt-2 block text-sm text-gray-600 hover:text-brand-maroon">{phone}</a>)}</div><div className="rounded-2xl bg-white p-6 shadow-card"><FaEnvelope className="text-xl text-brand-maroon" /><h2 className="mt-3 font-semibold">Email us</h2>{SITE.emails.map((email) => <a key={email} href={`mailto:${email}`} className="mt-2 block break-all text-sm text-gray-600 hover:text-brand-maroon">{email}</a>)}</div></div></section><EnquirySection /></>;
  }

  if (type === 'program-detail') {
    if (status === 'loading') return <section className="mx-auto max-w-7xl px-6 py-16"><DataState status={status} /></section>;
    if (status === 'error' || !program) return <section className="mx-auto max-w-7xl px-6 py-16"><DataState status={status === 'error' ? status : 'error'} onRetry={retry} /><Link to="/programs" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-maroon"><FaArrowRight className="rotate-180" /> All programmes</Link></section>;
    return <><PageHero copy={{ kicker: 'Integrated programme', title: program.name, description: program.description || program.tagline || 'Learn about this integrated programme at Social Baluni Public School.' }} /><section className="bg-brand-cream py-14"><div className="mx-auto max-w-5xl px-6"><div className="rounded-3xl bg-white p-7 shadow-card md:p-10">{program.tagline && <p className="text-lg font-semibold text-brand-maroon">{program.tagline}</p>}{!!program.highlights?.length && <><h2 className="mt-8 font-display text-2xl font-bold">Programme highlights</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{program.highlights.map((highlight) => <li key={highlight} className="flex gap-3 rounded-xl bg-brand-cream p-4 text-sm"><FaCheck className="mt-0.5 shrink-0 text-brand-green" />{highlight}</li>)}</ul></>}<Link to="/admissions" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-maroon px-6 py-3 font-semibold text-white">Ask about admissions <FaArrowRight /></Link></div></div></section></>;
  }

  const copy = PAGE_COPY[type] || PAGE_COPY.about;
  return (
    <>
      <PageHero copy={copy} />
      <section className="bg-brand-cream py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {(type === 'about' || type === 'academics') && (
            <>
              <div className="grid gap-5 md:grid-cols-3">{facts.map((fact) => <article key={fact.title} className="rounded-2xl bg-white p-6 shadow-card"><h2 className="font-display text-lg font-bold">{fact.title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-600">{fact.text}</p></article>)}</div>
              <section className="mt-14"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-widest text-brand-maroon">Our people</p><h2 className="mt-2 font-display text-3xl font-bold">{type === 'about' ? 'Meet the school team' : 'Academic team'}</h2></div><DataState status={status} onRetry={retry} />{status === 'success' && <StaffCards staff={records} />}</section>
            </>
          )}
          {type === 'programs' && <><DataState status={status} onRetry={retry} />{status === 'success' && <ProgramCards programs={records} />}</>}
          {type === 'sports' && <><DataState status={status} onRetry={retry} />{status === 'success' && <SportCards sports={records} />}</>}
          {type === 'achievements' && <><DataState status={status} onRetry={retry} />{status === 'success' && <AchievementCards achievements={records} />}</>}
          {type === 'gallery' && <><DataState status={status} onRetry={retry} />{status === 'success' && <GalleryCards albums={records} />}</>}
          {type === 'academics' && <section className="mt-12 rounded-3xl bg-brand-ink p-8 text-white md:p-10"><p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Learning journey</p><h2 className="mt-3 font-display text-3xl font-bold">From early learning to senior school</h2><p className="mt-4 max-w-3xl leading-relaxed text-white/75">Students progress from foundational learning through middle and secondary school to senior secondary classes. For current subject combinations, curriculum details and class availability, please speak with the school office.</p><Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-3 font-semibold text-brand-ink">Ask about academics <FaArrowRight /></Link></section>}
        </div>
      </section>
    </>
  );
}
