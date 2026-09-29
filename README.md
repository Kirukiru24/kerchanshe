# Kerchanshe Group — Agriculture Platform (Scaffold)

Starting scaffold for the platform described in *Kerchanshe Group — Digital Platform
Rebranding and Enhancements Proposal (Website & eCommerce)*, Sep 2026. It implements the
recommended stack (Section 15: Next.js + Tailwind, headless CMS/commerce as later swap-ins),
the site map (Section 11), and the design tokens (Section 10) as running code, so Phase 2
(UX & Visual Design) has a structure to design into rather than a blank repo.

## Getting started

```bash
npm install
npm run dev
```

Visit `/agriculture` for the hub homepage.

## How this maps to the proposal

| Folder / file | Proposal section |
|---|---|
| `app/agriculture/page.tsx` | 13.1 — Agriculture/Group Hub Homepage |
| `app/agriculture/[farm]/page.tsx` | 13.2/13.3 — Farm Homepage (shared template, per-farm accent) |
| `app/agriculture/[farm]/process/page.tsx` | 13.9 — "From Cherry to Container" |
| `app/agriculture/shop/page.tsx` | 13.4 — Shop / Product Listing (all farms) |
| `app/agriculture/shop/[lot]/page.tsx` | 13.5 — Product Detail Page |
| `app/agriculture/wholesale/page.tsx` | 13.7 — B2B Wholesale / Export Portal |
| `app/agriculture/wholesale/shipments/page.tsx` | 13.8 — Export & Logistics Tracking |
| `app/agriculture/sustainability/page.tsx` | 13.10 / Section 17 — Sustainability & Certifications |
| `app/agriculture/about/page.tsx` | 13.11 — About / Leadership |
| `app/agriculture/journal/page.tsx` | 13.12 — Journal / Blog |
| `app/admin/farms/page.tsx` | 13.14 — Group Admin CMS Dashboard |
| `lib/types.ts` | 27.1 — Core Entities (Farm, Lot, Order, RFQ, Shipment, Traceability Record, Journal Post, Buyer Account) |
| `content/farms.json`, `content/lots.json` | Appendix D — per-farm data sheet, seeded as static JSON until the CMS is wired up |
| `tailwind.config.ts` | 10 — Design System (shared palette, per-farm accents, serif/sans type roles) |
| `components/*` | 10.2 — Core Components (buttons, traceability tag, product card, process-step badge) |

Not yet scaffolded (build these once Phase 1 discovery locks the details, per Section 26 Next Steps):
- Cart & checkout flow (13.6) and payment gateway integration (Section 15, 23)
- Technology & Traceability page with live QR/blockchain lookup (Section 9, 13's tech page)
- RFQ submission wired to a real backend / buyer accounts (currently static markup)
- Multi-language (English/Amharic) per Section 31
- Auth & role-scoped access for farm leads on `/admin` (Section 21 RACI)

## Architecture principle (Section 15)

One shared core — design system, commerce engine, CMS, traceability ledger — with thin
per-farm "skins." `lib/data.ts` is the seam: it currently reads `content/*.json`, and is
the only place that needs to change when the headless CMS and commerce engine (Section 15)
are connected. Nothing under `app/` or `components/` should need to change.

## Open questions to resolve before Phase 1 sign-off

The proposal is internally inconsistent on the number of farms in one place:
- Section 1 (Executive Summary) and the cover page name **seven** assets, including both
  "Gellana Gesha"/"Gellana Gisham" and "Gellana Farm" as if they were distinct.
- Section 7 (Brand-by-Brand Concept) and Section 10 (per-farm accent swatches) detail
  **six** brands: Bale Mountain Coffee, Gibe Gesha Farm, Gibe Agro Processing, Debka Farm,
  Gellana Farm, and Adami Tullu.

This scaffold follows Section 7/10 and seeds **six** farms (`content/farms.json`). Confirm
with Kerchanshe Marketing whether a seventh brand exists before Phase 1 discovery — the
Appendix G sign-off sheet is the right place to record the answer. Everything here (routes,
data model, filters) extends to a seventh farm with a one-line addition to `farms.json` and
one accent color in `tailwind.config.ts`.

## Delivery phases (Section 22)

This scaffold covers ground that spans Phases 1–4 (design system, IA, hub + flagship farms,
remaining farms) at a structural level. Phases 5–7 (B2B portal depth, technology/traceability,
QA/payments/launch) are represented as wireframe-fidelity pages only.
