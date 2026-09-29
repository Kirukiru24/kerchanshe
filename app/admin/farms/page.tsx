// app/admin/farms/page.tsx
import { getFarmsAdmin, createFarm } from "@/app/actions/admin";

export default async function AdminFarmsPage() {
  const farms = await getFarmsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">Farms &amp; Brands</h1>
          <p className="text-xs text-ink/60">Live estate records and sector paths.</p>
        </div>
      </div>

      <form action={createFarm} className="flex gap-3 bg-white/60 p-4 border border-line rounded">
        <input name="name" required placeholder="Brand / Farm Name" className="border border-line px-3 py-1.5 text-sm rounded flex-1" />
        <input name="sectorPath" required placeholder="Sector (e.g. Coffee / Guji Zone)" className="border border-line px-3 py-1.5 text-sm rounded flex-1" />
        <button type="submit" className="rounded-full bg-roastedGold px-4 py-1.5 text-sm font-medium text-ink hover:opacity-90">
          + Save Brand
        </button>
      </form>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">Brand</th>
            <th className="p-3 font-normal">Sector Path</th>
            <th className="p-3 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {farms.map((farm) => (
            <tr key={farm.id} className="border-b border-line hover:bg-white/50">
              <td className="p-3 font-medium">{farm.name}</td>
              <td className="p-3">{farm.sectorPath}</td>
              <td className="p-3">
                <span className="rounded-full bg-deepGreen px-3 py-1 text-xs text-cream">
                  {farm.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}