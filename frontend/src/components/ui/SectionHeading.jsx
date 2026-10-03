export default function SectionHeading({ kicker, title, subtitle, align = 'center', dark = false }) {
  return (
    <div className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {kicker && (
        <p className={`mb-2 text-sm font-semibold uppercase tracking-widest ${dark ? 'text-brand-gold' : 'text-brand-maroon'}`}>
          {kicker}
        </p>
      )}
      <h2 className={`font-display text-3xl font-bold md:text-4xl ${dark ? 'text-white' : 'text-brand-ink'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
    </div>
  );
}