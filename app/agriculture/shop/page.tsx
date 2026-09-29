import { getFarms, getLots } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export default async function ShopPage() {
  const [farms, lots] = await Promise.all([getFarms(), getLots()]);

  return (
    <section className="px-6 py-12">
      <h1 className="font-serif text-3xl text-ink">Shop All Origins</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
        {/* Filter panel — Section 13.4. Static markup for now; wire to query params
            or client state once the commerce engine (Section 15) is connected. */}
        <aside className="space-y-6 text-sm">
          <div>
            <p className="font-medium text-ink">Farm</p>
            <ul className="mt-2 space-y-1 text-ink/70">
              {farms.map((f) => (
                <li key={f.slug}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> {f.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-ink">Process</p>
            <ul className="mt-2 space-y-1 text-ink/70">
              {["Washed", "Natural", "Honey"].map((p) => (
                <li key={p}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> {p}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lots.map((lot) => {
            const farm = farms.find((f) => f.slug === lot.farmSlug);
            return <ProductCard key={lot.id} lot={lot} farmName={farm?.name ?? ""} />;
          })}
        </div>
      </div>
    </section>
  );
}
