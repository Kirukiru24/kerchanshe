const STATS = [
  { value: "1,000,000+", label: "Coffee growers empowered" },
  { value: "3,000,000+", label: "Trees planted" },
  { value: "63", label: "Washing stations" },
  { value: "25,000+", label: "Jobs created" },
];

const CERTIFICATIONS = ["Organic", "Fairtrade", "Rainforest Alliance", "Specialty Coffee Association"];

const CSR_PROGRAMS = ["Education", "Clean Water", "Farmer Training", "Women's Empowerment", "Reforestation"];

export default function SustainabilityPage() {
  return (
    <>
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-4xl text-ink">Growing Coffee, Growing Communities</h1>
          <p className="mt-3 text-ink/80">1M+ growers empowered · 3M+ trees planted · 25,000+ jobs created</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-3xl text-deepGreen">{s.value}</p>
            <p className="mt-1 text-sm text-ink/70">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="bg-cream px-6 py-12">
        <h2 className="font-serif text-2xl text-ink">Certifications</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CERTIFICATIONS.map((c) => (
            <div key={c} className="border border-line bg-paper p-4 text-center text-sm">
              {c}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12">
        <h2 className="font-serif text-2xl text-ink">Community &amp; CSR (Buna Qela)</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {CSR_PROGRAMS.map((p) => (
            <div key={p} className="aspect-square bg-cream text-center text-sm">
              <p className="p-2">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
