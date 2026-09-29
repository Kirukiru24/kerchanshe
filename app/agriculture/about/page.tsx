const LEADERSHIP_PLACEHOLDER_COUNT = 5;

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-4xl text-ink">Ethiopia&rsquo;s Premier Coffee Exporter</h1>
          <p className="mt-3 text-ink/80">A diversified conglomerate rooted in coffee since day one.</p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="aspect-[4/3] w-full bg-cream" aria-hidden />
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl text-ink">Our History</h2>
              <p className="mt-2 text-sm text-ink/70">
                Section 2 (Kerchanshe Group Today) — Ethiopia&rsquo;s largest coffee exporter, over
                $100M in annual coffee turnover, 63 washing stations.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-ink">Our Mission</h2>
              <p className="mt-2 text-sm text-ink/70">Content to be supplied by Group Leadership.</p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-ink">Our Vision</h2>
              <p className="mt-2 text-sm text-ink/70">Content to be supplied by Group Leadership.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <h2 className="font-serif text-2xl text-ink">Leadership Team</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-5">
          {Array.from({ length: LEADERSHIP_PLACEHOLDER_COUNT }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-cream" aria-hidden />
              <p className="mt-2 text-sm font-medium">Name Surname</p>
              <p className="text-xs text-ink/60">Title / Role</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
