// app/admin/shipments/page.tsx
export default function AdminShipmentsPage() {
  const shipments = [
    { id: "SHP-701", destination: "Port of Hamburg, Germany", carrier: "Maersk Line", container: "MSKU9823410", status: "In Transit (Sea)", eta: "2026-10-12" },
    { id: "SHP-702", destination: "Yokohama, Japan", carrier: "Ocean Network Express", container: "ONEU3012948", status: "Customs Clearance (Djibouti)", eta: "2026-10-04" },
    { id: "SHP-703", destination: "Addis Ababa Distribution Hub", carrier: "Local Fleet", container: "ETH-32091", status: "Delivered", eta: "2026-09-20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">Global &amp; Local Shipments</h1>
          <p className="text-xs text-ink/60">Track container freight from origin processing to international port destinations.</p>
        </div>
        <button className="rounded-full bg-roastedGold px-4 py-2 text-sm font-medium text-ink hover:opacity-90">+ Create Shipment</button>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">Shipment Code</th>
            <th className="p-3 font-normal">Destination</th>
            <th className="p-3 font-normal">Carrier</th>
            <th className="p-3 font-normal">Container/Ref ID</th>
            <th className="p-3 font-normal">ETA</th>
            <th className="p-3 font-normal">Status</th>
            <th className="p-3 font-normal text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shp) => (
            <tr key={shp.id} className="border-b border-line hover:bg-white/50">
              <td className="p-3 font-mono text-xs">{shp.id}</td>
              <td className="p-3 font-medium">{shp.destination}</td>
              <td className="p-3">{shp.carrier}</td>
              <td className="p-3 font-mono text-xs text-ink/70">{shp.container}</td>
              <td className="p-3 font-mono">{shp.eta}</td>
              <td className="p-3">
                <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs text-slate-800">
                  {shp.status}
                </span>
              </td>
              <td className="p-3 text-right text-roastedGold hover:underline cursor-pointer">Track / Manage →</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}