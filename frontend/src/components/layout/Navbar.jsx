import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaInstagram,
  FaBars, FaTimes, FaChevronDown, FaGraduationCap,
} from 'react-icons/fa';
import { SITE } from '../../data/site';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/academics' },
  {
    label: 'Programs', to: '/programs',
    children: [
      { label: 'IIT-JEE Integrated', to: '/programs/iit-jee-integrated' },
      { label: 'NEET Integrated', to: '/programs/neet-integrated' },
      { label: 'NDA & Defence', to: '/programs/nda-defence' },
      { label: 'NTSE & KVPY', to: '/programs/ntse-kvpy' },
    ],
  },
  { label: 'Sports', to: '/sports' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-brand-maroon-dark text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><FaPhoneAlt className="text-brand-gold" /> {SITE.phones[0]}</span>
            <span className="flex items-center gap-2"><FaEnvelope className="text-brand-gold" /> {SITE.emails[0]}</span>
            <span className="text-white/60">{SITE.affiliation}</span>
          </div>
          <div className="flex items-center gap-4">
            {[
              ['facebook', FaFacebookF],
              ['twitter', FaTwitter],
              ['youtube', FaYoutube],
              ['instagram', FaInstagram],
            ].filter(([name]) => SITE.social[name] && SITE.social[name] !== '#').map(([name, Icon]) => (
              <a key={name} href={SITE.social[name]} target="_blank" rel="noreferrer" aria-label={name} className="transition hover:text-brand-gold">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`transition-all ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 shadow'} `}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-maroon to-brand-maroon-dark text-xl text-white shadow-card">
              <FaGraduationCap />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold text-brand-maroon md:text-xl">{SITE.name}</p>
              <p className="text-[11px] text-gray-500">Nursery to Class XII • Dehradun, Uttarakhand</p>
            </div>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive ? 'text-brand-maroon' : 'text-gray-700 hover:text-brand-maroon'
                    }`
                  }
                >
                  {item.label}
                  {item.children && <FaChevronDown className="text-[10px]" />}
                </NavLink>
                {item.children && (
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="w-56 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5">
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-maroon">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li className="ml-2">
              <Link to="/admissions" className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-ink shadow transition hover:bg-brand-gold-dark hover:shadow-lg">
                Apply Now
              </Link>
            </li>
          </ul>

          <button onClick={() => setOpen(!open)} className="text-2xl text-brand-maroon lg:hidden" aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-navigation" className="border-t bg-white px-6 py-4 lg:hidden">
            {NAV.map((item) => (
              <div key={item.label}>
                <Link to={item.to} onClick={() => setOpen(false)} className="block py-2.5 font-medium text-gray-800">
                  {item.label}
                </Link>
                {item.children?.map((c) => (
                  <Link key={c.to} to={c.to} onClick={() => setOpen(false)} className="block py-1.5 pl-4 text-sm text-gray-500">
                    — {c.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link to="/admissions" onClick={() => setOpen(false)} className="mt-3 block rounded-full bg-brand-gold px-5 py-3 text-center font-semibold">
              Apply Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}