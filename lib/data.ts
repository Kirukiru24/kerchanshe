import type { Farm, Lot } from "./types";
import farmsSeed from "@/content/farms.json";
import lotsSeed from "@/content/lots.json";

/**
 * Every function here reads from static JSON seed data today.
 * When the headless CMS (Section 15: Sanity/Contentful) and commerce engine
 * are wired up in Phase 3+, swap the body of these functions for API calls —
 * nothing that imports from this file should need to change.
 */

export async function getFarms(): Promise<Farm[]> {
  return farmsSeed as Farm[];
}

export async function getFarm(slug: string): Promise<Farm | undefined> {
  return (farmsSeed as Farm[]).find((f) => f.slug === slug);
}

export async function getLots(): Promise<Lot[]> {
  return lotsSeed as Lot[];
}

export async function getLotsByFarm(farmSlug: string): Promise<Lot[]> {
  return (lotsSeed as Lot[]).filter((l) => l.farmSlug === farmSlug);
}

export async function getLot(id: string): Promise<Lot | undefined> {
  return (lotsSeed as Lot[]).find((l) => l.id === id);
}

export async function getFeaturedLots(count = 4): Promise<Lot[]> {
  return (lotsSeed as Lot[]).slice(0, count);
}
