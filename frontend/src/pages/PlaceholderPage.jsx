export default function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-brand-maroon">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-gray-600">
        This page follows the exact same pattern as the landing page: data fetched from the
        corresponding REST endpoint (<code className="rounded bg-brand-cream px-1.5 py-0.5 text-sm">/api/...</code>)
        and rendered with reusable Tailwind components — powered by the CMS.
      </p>
    </div>
  );
}