// src/utils/chakraRecs.ts
// Minimal opinionated sets. Tune freely.
export const CHAKRA_SETS: Record<string, string[]> = {
  "root": ["Black Tourmaline", "Hematite", "Red Jasper"],
  "sacral": ["Carnelian", "Orange Calcite", "Sunstone"],
  "solar-plexus": ["Citrine", "Tiger's Eye", "Pyrite"],
  "heart": ["Rose Quartz", "Green Aventurine", "Malachite"],
  "throat": ["Sodalite", "Aquamarine", "Blue Lace Agate"],
  "third-eye": ["Sodalite", "Amethyst", "Labradorite"], // ← your example set
  "crown": ["Amethyst", "Clear Quartz", "Selenite"],
};

const STONE_TO_CHAKRAS: Record<string, string[]> = Object.entries(CHAKRA_SETS)
  .reduce((acc, [chakra, stones]) => {
    for (const s of stones) {
      const key = s.toLowerCase();
      acc[key] ??= [];
      if (!acc[key].includes(chakra)) acc[key].push(chakra);
    }
    return acc;
  }, {} as Record<string, string[]>);

export function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

export function findStonesInTitle(title: string): string[] {
  const t = normalize(title);
  const stones = Object.keys(STONE_TO_CHAKRAS);
  return stones.filter(st => t.includes(normalize(st)));
}

export function chakrasForStone(stone: string): string[] {
  return STONE_TO_CHAKRAS[stone.toLowerCase()] ?? [];
}

export function stonesForChakra(chakra: string): string[] {
  return CHAKRA_SETS[chakra] ?? [];
}
