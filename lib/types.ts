/**
 * Core entities — Section 27.1 of the proposal.
 * These types are the shared contract between the CMS, the commerce engine,
 * the B2B/RFQ module, and the admin dashboard (Section 27.2 relationships).
 */

export type ProcessMethod = "Washed" | "Natural" | "Honey" | "Wet mill + dry mill";

export interface Certification {
  name: string; // e.g. "Organic", "Fairtrade", "Rainforest Alliance"
  issuedBy?: string;
  renewalDate?: string; // ISO date — surfaced in Admin > Farms & Brands (Section 17)
}

/** Farm / Brand — Section 27.1 */
export interface Farm {
  slug: string; // used in the URL, e.g. kerchanshegroup.com/agriculture/gibe-gesha-farm
  name: string;
  sectorPath: string; // e.g. "Sectors > Agriculture" (Section 6)
  region: string;
  altitudeMasl: [number, number] | null; // null for a processing facility (Gibe Agro)
  accentColorToken: string; // key into tailwind.config `colors.farm`
  heroMediaAlt: string; // placeholder alt text until real photography lands (Section 18)
  positioning: string; // one-line brand positioning (Section 7)
  primaryPersona: string;
  processMethods: ProcessMethod[];
  varietal: string;
  certifications: Certification[];
}

/** Lot / Product — Section 27.1, field set mirrors Appendix D's per-farm data sheet */
export interface Lot {
  id: string; // e.g. "gibe-gesha-lot-14"
  farmSlug: string;
  lotNumber: string; // e.g. "Lot 14"
  process: ProcessMethod;
  harvestDate?: string;
  moisturePct?: number;
  screenSize?: string; // e.g. "15-18"
  cuppingScore?: number; // SCA protocol, 80+ = specialty grade
  availableVolumeKg?: number; // retail
  availableVolumeMT?: number; // export
  retailPriceUsd?: number; // per 250g bag
  fobPriceUsdPerKg?: number;
  tastingNotes: string[];
  gallery: string[]; // image paths/URLs
}

/** Order (B2C) — Section 27.1 */
export interface OrderLineItem {
  lotId: string;
  quantity: number;
}
export interface Order {
  id: string;
  customerEmail: string;
  lineItems: OrderLineItem[]; // can span multiple farms
  fulfilmentStatus: "pending" | "packed" | "shipped" | "delivered";
  paymentMethod: "card" | "mobile_money" | "bank_transfer";
  isSubscription: boolean;
}

/** RFQ (B2B) — Section 27.1 */
export type Incoterm = "FOB" | "CIF" | "CFR" | "EXW";
export interface RfqLineItem {
  lotId: string;
  quantityMT: number;
}
export interface Rfq {
  id: string;
  buyerAccountId: string;
  lineItems: RfqLineItem[]; // can span multiple farms — the container/RFQ builder (13.7)
  targetIncoterm: Incoterm;
  quoteStatus: "submitted" | "quoted" | "accepted" | "declined";
}

/** Shipment — Section 27.1 */
export type ShipmentMilestone =
  | "booked"
  | "loaded"
  | "in_transit"
  | "customs_clearance"
  | "delivered";
export interface Shipment {
  id: string; // e.g. "KCH-EXP-2201"
  linkedOrderOrRfqId: string;
  containerId?: string;
  incoterm: Incoterm;
  milestoneStatus: ShipmentMilestone;
  documents: string[]; // Document Center references
  destination: string;
}

/** Traceability Record — Section 27.1, powers the QR / blockchain lookup (Section 9.2) */
export interface TraceabilityRecord {
  lotId: string;
  chainOfCustody: Array<{
    node: "Farm" | "Wet Mill" | "Dry Mill" | "Warehouse" | "Export/Customs" | "Shipping Line" | "Roaster";
    timestamp?: string;
  }>;
  qrCodeUrl: string;
}

/** Journal Post — Section 27.1 */
export interface JournalPost {
  slug: string;
  farmSlug?: string; // optional — some posts are Group-level
  category: "Harvest Update" | "Farmer Story" | "Sustainability";
  author: string;
  body: string;
  heroImageAlt: string;
  publishDate: string;
}

/** Buyer Account (B2B) — Section 27.1 */
export interface BuyerAccount {
  id: string;
  company: string;
  contact: string;
  negotiatedPricingTier?: string;
  savedTemplates?: Rfq[];
}
