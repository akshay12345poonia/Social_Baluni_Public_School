import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';

const IMAGES = [
  { src: 'https://picsum.photos/seed/g1/600/400', caption: 'Investiture Ceremony' },
  { src: 'https://picsum.photos/seed/g2/600/400', caption: 'Annual Sports Meet' },
  { src: 'https://picsum.photos/seed/g3/600/400', caption: 'Science Exhibition' },
  { src: 'https://picsum.photos/seed/g4/600/400', caption: 'Fencing Championship' },
  { src: 'https://picsum.photos/seed/g5/600/400', caption: 'Independence Day' },
  { src: 'https://picsum.photos/seed/g6/600/400', caption: 'Campus Life' },
];

export default function GalleryPreview() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Moments" title="Life at SBPS" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {IMAGES.map((img) => (
            <div key={img.src} className="group relative h-56 overflow-hidden rounded-2xl md:h-64">
              <img src={img.src} alt={img.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <p className="font-semibold text-white">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="rounded-full bg-brand-maroon px-8 py-3 font-semibold text-white transition hover:bg-brand-maroon-dark">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}