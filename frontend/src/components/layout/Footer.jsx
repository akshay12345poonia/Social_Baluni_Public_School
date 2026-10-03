import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter,
  FaYoutube, FaInstagram, FaGraduationCap, FaChevronRight,
} from 'react-icons/fa';
import { SITE } from '../../data/site';

const CURRENT_YEAR = new Date().getFullYear();

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Sports', to: '/sports' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' },
];
const programs = [
  { label: 'IIT-JEE Integrated', to: '/programs/iit-jee-integrated' },
  { label: 'NEET Integrated', to: '/programs/neet-integrated' },
  { label: 'NDA & Defence', to: '/programs/nda-defence' },
  { label: 'Doon Baluni Defence Academy', to: '/programs/nda-defence' },
  { label: 'Baluni Classes', to: '/programs' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-maroon text-xl text-white"><FaGraduationCap /></div>
            <p className="font-display text-lg font-bold text-white">{SITE.shortName} — Dehradun</p>
          </div>
          <p className="text-sm leading-relaxed">
            Nurturing creators and ambassadors of goodwill — CBSE schooling integrated with IIT/NEET/NDA
            preparation and a national-level sports ecosystem.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              [FaFacebookF, SITE.social.facebook, 'Facebook'],
              [FaTwitter, SITE.social.twitter, 'X'],
              [FaYoutube, SITE.social.youtube, 'YouTube'],
              [FaInstagram, SITE.social.instagram, 'Instagram'],
            ].filter(([, url]) => url && url !== '#').map(([Icon, url, label]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand-gold hover:text-brand-ink" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="flex items-center gap-2 transition hover:text-brand-gold">
                  <FaChevronRight className="text-[10px] text-brand-gold" /> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg font-semibold text-white">Our Programs</h4>
          <ul className="space-y-2 text-sm">
            {programs.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="flex items-center gap-2 transition hover:text-brand-gold">
                  <FaChevronRight className="text-[10px] text-brand-gold" /> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg font-semibold text-white">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><FaMapMarkerAlt className="mt-1 shrink-0 text-brand-gold" /> {SITE.address}</li>
            {SITE.phones.map((p) => (
              <li key={p} className="flex gap-3"><FaPhoneAlt className="mt-1 shrink-0 text-brand-gold" /> {p}</li>
            ))}
            {SITE.emails.map((e) => (
              <li key={e} className="flex gap-3"><FaEnvelope className="mt-1 shrink-0 text-brand-gold" /> {e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-gray-400 md:flex-row">
          <p>© {CURRENT_YEAR} {SITE.name}. All Rights Reserved.</p>
          <p> 💗 Akshay Poonia ❤️ Designed & Developed for the digital future of education.</p>
        </div>
      </div>
    </footer>
  );
}