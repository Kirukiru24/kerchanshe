import { notFound } from "next/navigation";
import Link from "next/link";
import { getFarm, getFarms, getLotsByFarm } from "@/lib/data";
import { Button } from "@/components/Button";
import { TraceabilityTag } from "@/components/TraceabilityTag";

export async function generateStaticParams() {
  const farms = await getFarms();
  return farms.map((f) => ({ farm: f.slug }));
}

export default async function FarmHomePage({ params }: { params: { farm: string } }) {
  const farm = await getFarm(params.farm);
  if (!farm) notFound();

  const lots = await getLotsByFarm(farm.slug);

  return (
    <>
      {/* Full-bleed hero — Section 13.2, per-farm accent swapped in via accentColorToken */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-2xl border-l-4 pl-6" style={{ borderColor: "currentColor" }}>
          <h1 className="font-serif text-4xl text-ink">{farm.positioning.split(".")[0]}.</h1>
          <p className="mt-3 text-ink/80">{farm.positioning}</p>
          <div className="mt-6 flex gap-4">
            <Button href="#lots" variant="primary">
              Shop This Origin
            </Button>
            <Link href={`/agriculture/${farm.slug}/process`} className="self-center text-sm underline">
              Read the Farm Story →
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {farm.altitudeMasl && (
              <TraceabilityTag label={`${farm.altitudeMasl[0]}–${farm.altitudeMasl[1]} masl`} />
            )}
            <TraceabilityTag label={farm.varietal} tone="dark" />
            <TraceabilityTag label={farm.processMethods.join(" & ")} tone="outline" />
          </div>
        </div>
      </section>

      {/* Farmer & Land block — Section 13.2 */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="aspect-[4/3] w-full bg-cream" aria-hidden />
          <div>
            <h2 className="font-serif text-2xl text-ink">The Farmer &amp; The Land</h2>
            <p className="mt-3 text-ink/80">
              Farm story write-up (150–250 words) goes here — see Appendix A content brief
              for {farm.name}.
            </p>
            <Link
              href={`/agriculture/${farm.slug}/process`}
              className="mt-3 inline-block text-sm underline"
            >
              Meet the growers →
            </Link>
          </div>
        </div>
      </section>

      {/* Origin / traceability strip — Section 13.2 */}
      <section className="bg-cream px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="aspect-video w-full bg-line" aria-hidden />
          <dl className="grid grid-cols-2 gap-4 self-center text-sm">
            <div>
              <dt className="text-ink/60">Region</dt>
              <dd className="font-medium">{farm.region}</dd>
            </div>
            <div>
              <dt className="text-ink/60">Altitude</dt>
              <dd className="font-medium">
                {farm.altitudeMasl ? `${farm.altitudeMasl[0]}–${farm.altitudeMasl[1]}m` : "n/a"}
              </dd>
            </div>
            <div>
              <dt className="text-ink/60">Process</dt>
              <dd className="font-medium">{farm.processMethods.join(" / ")}</dd>
            </div>
            <div>
              <dt className="text-ink/60">Varietal</dt>
              <dd className="font-medium">{farm.varietal}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Available lots — Section 13.2 */}
      <section id="lots" className="px-6 py-16">
        <h2 className="font-serif text-2xl text-ink">Available Lots</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lots.length === 0 && (
            <p className="text-sm text-ink/60">
              No active lots loaded for this farm in the seed data yet — see Appendix D.
            </p>
          )}
          {lots.map((lot) => (
            <div key={lot.id} className="border border-line p-4">
              <div className="aspect-[4/3] w-full bg-cream" aria-hidden />
              <p className="mt-3 font-serif">{lot.lotNumber}</p>
              <Link
                href={`/agriculture/shop/${lot.id}`}
                className="mt-2 inline-block rounded-full bg-ink px-4 py-2 text-xs text-cream"
              >
                View Lot
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
