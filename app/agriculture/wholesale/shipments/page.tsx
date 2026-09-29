import type { Shipment } from "@/lib/types";

// Seed shipments — Section 13.8 wireframe. Swap for a Shipment-entity query (Section 27)
// once the ERP integration (Section 9.3) is connected.
const SHIPMENTS: Shipment[] = [
  {
    id: "KCH-EXP-2201",
    linkedOrderOrRfqId: "rfq-1001",
    incoterm: "FOB",
    milestoneStatus: "in_transit",
    documents: [],
    destination: "Djibouti Port",
  },
  {
    id: "KCH-EXP-2198",
    linkedOrderOrRfqId: "rfq-1002",
    incoterm: "CIF",
    milestoneStatus: "customs_clearance",
    documents: [],
    destination: "Rotterdam",
  },
  {
    id: "KCH-EXP-2195",
    linkedOrderOrRfqId: "rfq-1003",
    incoterm: "CFR",
    milestoneStatus: "delivered",
    documents: [],
    destination: "Jebel Ali",
  },
];

const STATUS_LABEL: Record<Shipment["milestoneStatus"], string> = {
  booked: "Booked",
  loaded: "Loaded",
  in_transit: "In Transit",
  customs_clearance: "Customs Clearance",
  delivered: "Delivered",
};

export default function ShipmentTrackingPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="font-serif text-3xl text-ink">Export &amp; Shipment Tracking</h1>
      <p className="mt-1 text-ink/70">Live status for every container from mill to port to destination</p>

      <div className="mt-8 space-y-4">
        {SHIPMENTS.map((s) => (
          <div key={s.id} className="bg-cream p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{s.id}</p>
                <p className="text-sm text-ink/60">Destination: {s.destination}</p>
              </div>
              <span className="rounded-full bg-ink px-3 py-1 text-xs text-cream">
                {STATUS_LABEL[s.milestoneStatus]}
              </span>
            </div>
            <div className="mt-3 h-1 w-full bg-line">
              <div className="h-1 bg-deepGreen" style={{ width: "60%" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-xl text-ink">Documents &amp; Incoterms</h2>
        <ul className="mt-2 flex flex-wrap gap-6 text-sm underline">
          <li>Bill of Lading</li>
          <li>Certificate of Origin</li>
          <li>Phytosanitary Certificate</li>
          <li>Commercial Invoice</li>
          <li>Packing List</li>
          <li>ICO Certificate</li>
        </ul>
        <div className="mt-4 flex gap-2">
          {(["FOB", "CIF", "CFR", "EXW"] as const).map((term) => (
            <span key={term} className="rounded-full bg-ink px-3 py-1 text-xs text-cream">
              {term}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
