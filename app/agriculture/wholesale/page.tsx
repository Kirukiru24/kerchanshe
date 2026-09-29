import { getFarms, getLots } from "@/lib/data";

export default async function WholesalePortalPage() {
  const [farms, lots] = await Promise.all([getFarms(), getLots()]);

  return (
    <section className="px-6 py-12">
      <h1 className="font-serif text-3xl text-ink">Wholesale &amp; Export Portal</h1>
      <p className="mt-1 text-ink/70">
        Browse lots across all Six estates · request samples · build a container
      </p>

      {/* Lot catalogue — Section 13.7 / 14.2 */}
      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">Lot / Farm</th>
            <th className="p-3 font-normal">Region</th>
            <th className="p-3 font-normal">Process</th>
            <th className="p-3 font-normal">Score</th>
            <th className="p-3 font-normal">Volume Avail.</th>
            <th className="p-3 font-normal">Price/kg (FOB)</th>
            <th className="p-3 font-normal" />
          </tr>
        </thead>
        <tbody>
          {lots.map((lot) => {
            const farm = farms.find((f) => f.slug === lot.farmSlug);
            return (
              <tr key={lot.id} className="border-b border-line">
                <td className="p-3">
                  {farm?.name} — {lot.lotNumber}
                </td>
                <td className="p-3">{farm?.region}</td>
                <td className="p-3">{lot.process}</td>
                <td className="p-3">{lot.cuppingScore ?? "—"}</td>
                <td className="p-3">
                  {lot.availableVolumeMT ? `${lot.availableVolumeMT} MT` : `${lot.availableVolumeKg} kg`}
                </td>
                <td className="p-3">
                  {lot.fobPriceUsdPerKg ? `$${lot.fobPriceUsdPerKg.toFixed(2)}` : "—"}
                </td>
                <td className="p-3">
                  <button className="rounded-full bg-line px-3 py-1 text-xs">Sample</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Container / RFQ builder — Section 13.7 */}
      <div className="mt-10 bg-cream p-6">
        <h2 className="font-serif text-xl text-ink">Container / RFQ Builder</h2>
        <p className="mt-1 text-sm text-ink/70">
          Mix lots from multiple farms into a single request for quote
        </p>
        <div className="mt-4 space-y-2">
          {[1, 2, 3].map((n) => (
            <input
              key={n}
              placeholder={`Lot ${n} — Qty (MT)`}
              className="w-full max-w-md border border-line bg-paper px-3 py-2 text-sm"
            />
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button className="rounded-full bg-ink px-5 py-2 text-sm text-cream">Submit RFQ</button>
          <button className="rounded-full border border-ink px-5 py-2 text-sm">Add Another Lot</button>
        </div>
      </div>

      {/* Document center — Section 13.7 */}
      <div className="mt-10">
        <h2 className="font-serif text-xl text-ink">Document Center</h2>
        <ul className="mt-2 flex flex-wrap gap-6 text-sm underline">
          <li>Certificate of Origin</li>
          <li>Organic Certification</li>
          <li>Phytosanitary Cert.</li>
          <li>Shipping Docs</li>
        </ul>
      </div>
    </section>
  );
}
