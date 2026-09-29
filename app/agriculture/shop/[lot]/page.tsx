import { notFound } from "next/navigation";
import { getFarm, getLot, getLots } from "@/lib/data";
import { TraceabilityTag } from "@/components/TraceabilityTag";

export async function generateStaticParams() {
  const lots = await getLots();
  return lots.map((l) => ({ lot: l.id }));
}

export default async function ProductDetailPage({ params }: { params: { lot: string } }) {
  const lot = await getLot(params.lot);
  if (!lot) notFound();
  const farm = await getFarm(lot.farmSlug);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-square w-full bg-cream" aria-hidden />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-cream" aria-hidden />
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl text-ink">
            {farm?.name} — {lot.lotNumber}, {lot.process}
          </h1>
          {lot.retailPriceUsd && (
            <p className="mt-2 text-lg font-medium">${lot.retailPriceUsd.toFixed(2)} / 250g</p>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-4 bg-cream p-4 text-sm">
            <div>
              <dt className="text-ink/60">Region</dt>
              <dd className="font-medium">{farm?.region}</dd>
            </div>
            <div>
              <dt className="text-ink/60">Altitude</dt>
              <dd className="font-medium">
                {farm?.altitudeMasl ? `${farm.altitudeMasl[0]}–${farm.altitudeMasl[1]}m` : "n/a"}
              </dd>
            </div>
            <div>
              <dt className="text-ink/60">Varietal</dt>
              <dd className="font-medium">{farm?.varietal}</dd>
            </div>
            <div>
              <dt className="text-ink/60">Process</dt>
              <dd className="font-medium">{lot.process}</dd>
            </div>
            <div>
              <dt className="text-ink/60">Harvest</dt>
              <dd className="font-medium">{lot.harvestDate ?? "TBD"}</dd>
            </div>
            <div>
              <dt className="text-ink/60">Cupping Score</dt>
              <dd className="font-medium">{lot.cuppingScore ?? "—"}</dd>
            </div>
          </dl>

          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-roastedGold px-6 py-3 text-sm font-medium text-ink">
              Add to Cart — ${lot.retailPriceUsd?.toFixed(2) ?? "—"}
            </button>
            <button className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream">
              Subscribe &amp; Save 10%
            </button>
          </div>

          <div className="mt-8">
            <p className="font-medium text-ink">Tasting Notes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {lot.tastingNotes.map((note) => (
                <TraceabilityTag key={note} label={note} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
