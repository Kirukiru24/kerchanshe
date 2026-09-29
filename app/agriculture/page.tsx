import Link from "next/link";
import { getFarms, getFeaturedLots } from "@/lib/data";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { TraceabilityTag } from "@/components/TraceabilityTag";

export default async function AgricultureHubPage() {
  const farms = await getFarms();
  const featuredLots = await getFeaturedLots();

  return (
    <>
      {/* Hero — Section 13.1 */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
            One Group. Six Origins.
            <br />
            One Story of Ethiopian Coffee.
          </h1>
          <p className="mt-4 max-w-prose text-ink/80">
            From rare Gesha micro-lots to estate-grown export lots — grown, milled and
            shipped by Kerchanshe Group.
          </p>
          <div className="mt-8 flex gap-4">
            <Button href="#estates" variant="primary">
              Explore the Farms
            </Button>
            <Button href="/agriculture/wholesale" variant="secondary">
              Wholesale Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Our Estates grid — Section 13.1 */}
      <section id="estates" className="px-6 py-16">
        <h2 className="font-serif text-2xl text-ink">Our Estates</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {farms.map((farm) => (
            <Link key={farm.slug} href={`/agriculture/${farm.slug}`} className="group">
              <div className="aspect-square w-full bg-cream" aria-hidden />
              <p className="mt-2 font-serif text-sm text-ink group-hover:text-roastedGold">
                {farm.name}
              </p>
              <p className="text-xs text-ink/60">Visit Farm →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Traceability strip — Section 13.1 */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="aspect-video w-full bg-line" aria-hidden />
          <div>
            <h2 className="font-serif text-2xl text-ink">Traceable, farm to cup</h2>
            <p className="mt-3 text-ink/80">
              Every lot carries its altitude, varietal, process, and cupping score —
              verifiable from farm to export via QR/blockchain lookup (see Technology &amp;
              Traceability).
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TraceabilityTag label="Altitude" />
              <TraceabilityTag label="Varietal" tone="dark" />
              <TraceabilityTag label="Process" tone="outline" />
              <TraceabilityTag label="Cupping Score" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lots — Section 13.1 */}
      <section className="px-6 py-16">
        <h2 className="font-serif text-2xl text-ink">Featured Lots</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredLots.map((lot) => {
            const farm = farms.find((f) => f.slug === lot.farmSlug);
            return <ProductCard key={lot.id} lot={lot} farmName={farm?.name ?? ""} />;
          })}
        </div>
      </section>
    </>
  );
}
