import Link from "next/link";
import type { Lot } from "@/lib/types";

/**
 * Product card — Section 10.2: "image + name + short spec line + price,
 * identical structure across every brand so the shop always feels coherent."
 */
export function ProductCard({ lot, farmName }: { lot: Lot; farmName: string }) {
  return (
    <Link
      href={`/agriculture/shop/${lot.id}`}
      className="group block border border-line bg-paper transition-colors hover:border-ink"
    >
      <div className="aspect-[4/3] w-full bg-cream" aria-hidden />
      <div className="p-4">
        <p className="font-serif text-lg text-ink">
          {farmName} — {lot.lotNumber}
        </p>
        <p className="mt-1 text-sm text-ink/70">
          {lot.process}
          {lot.cuppingScore ? ` · Score ${lot.cuppingScore}` : ""}
        </p>
        {lot.retailPriceUsd && (
          <p className="mt-2 font-sans text-sm font-medium text-ink">
            ${lot.retailPriceUsd.toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
}
