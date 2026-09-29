// app/admin/rfqs/page.tsx
import { getRFQsAdmin, updateRFQStatus } from "@/app/actions/admin";

export default async function AdminRFQsPage() {
  const rfqs = await getRFQsAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">B2B Requests for Quotations</h1>
        <p className="text-xs text-ink/60">Connected directly to database RFQ records.</p>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-ink text-left text-cream">
            <th className="p-3 font-normal">RFQ Number</th>
            <th className="p-3 font-normal">Buyer</th>
            <th className="p-3 font-normal">Requested Lot</th>
            <th className="p-3 font-normal">Volume</th>
            <th className="p-3 font-normal">Status</th>
            <th className="p-3 font-normal text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rfqs.map((rfq) => (
            <tr key={rfq.id} className="border-b border-line hover:bg-white/50">
              <td className="p-3 font-mono text-xs">{rfq.rfqNumber}</td>
              <td className="p-3 font-medium">{rfq.buyer}</td>
              <td className="p-3">{rfq.requestedLot}</td>
              <td className="p-3 font-mono">{rfq.quantity}</td>
              <td className="p-3">
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-900">
                  {rfq.status}
                </span>
              </td>
              <td className="p-3 text-right">
                <form action={async () => {
                  "use server";
                  await updateRFQStatus(rfq.id, "QUOTE_SENT");
                }}>
                  <button type="submit" className="text-xs bg-roastedGold text-ink px-3 py-1 rounded">
                    Mark Quote Sent
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}