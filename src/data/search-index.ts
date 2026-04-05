import type { SearchIndexEntry } from "~/lib/search";
import { allCrops } from "./crops";
import { characters } from "./characters";
import { guides } from "./guides";
import { allFestivals } from "./festivals";
import { allEvents } from "./events";
import { seeds, shops, npcGifts, rings, locations, outfits } from "./lists";
import { recipes } from "./recipes";

const characterEntries: SearchIndexEntry[] = characters.map((c) => ({
  id: c.id,
  category: "characters",
  name: { id: c.name, en: c.name },
  keywords: {
    id: [c.name, c.birthday, c.residence, c.category, ...c.lovedGifts.slice(0, 5)].join(", "),
    en: [c.name, c.birthday, c.residence, c.category, ...c.lovedGifts.slice(0, 5)].join(", "),
  },
}));

const cropEntries: SearchIndexEntry[] = allCrops.map((c) => ({
  id: c.id,
  category: "crops",
  name: { id: c.name, en: c.name },
  keywords: {
    id: [c.name, c.season, c.source, c.description.id].join(", "),
    en: [c.name, c.season, c.source, c.description.en].join(", "),
  },
}));

const guideEntries: SearchIndexEntry[] = guides.map((g) => ({
  id: g.id,
  category: "guides",
  name: { id: g.title.id, en: g.title.en },
  keywords: {
    id: [g.title.id, g.category, ...g.sections.map((s) => s.heading.id)].join(", "),
    en: [g.title.en, g.category, ...g.sections.map((s) => s.heading.en)].join(", "),
  },
}));

const festivalEntries: SearchIndexEntry[] = allFestivals.map((f) => ({
  id: f.id,
  category: "festivals",
  name: { id: f.name, en: f.name },
  keywords: {
    id: [f.name, f.season, f.location, f.description.id].join(", "),
    en: [f.name, f.season, f.location, f.description.en].join(", "),
  },
}));

const recipeEntries: SearchIndexEntry[] = recipes.map((r) => ({
  id: `recipe-${r.id}`,
  category: "recipes" as const,
  name: { id: r.name, en: r.name },
  keywords: {
    id: [r.name, ...r.ingredients, r.howToObtain].join(", "),
    en: [r.name, ...r.ingredients, r.howToObtain].join(", "),
  },
}));

const eventEntries: SearchIndexEntry[] = allEvents.map((e) => ({
  id: e.id,
  category: "events" as const,
  name: { id: e.name, en: e.name },
  keywords: {
    id: [e.name, e.type, e.requirements.location, e.description.id].join(", "),
    en: [e.name, e.type, e.requirements.location, e.description.en].join(", "),
  },
}));

const listEntries: SearchIndexEntry[] = [
  ...seeds.map((s) => ({
    id: `seed-${s.id}`,
    category: "lists" as const,
    name: { id: s.name, en: s.name },
    keywords: {
      id: [s.name, s.season, s.buyShop].join(", "),
      en: [s.name, s.season, s.buyShop].join(", "),
    },
  })),
  ...shops.map((s) => ({
    id: `shop-${s.id}`,
    category: "lists" as const,
    name: { id: s.name, en: s.name },
    keywords: {
      id: [s.name, ...s.owner, s.hours].join(", "),
      en: [s.name, ...s.owner, s.hours].join(", "),
    },
  })),
  ...npcGifts.map((n) => ({
    id: `npc-gifts-${n.npcId}`,
    category: "lists" as const,
    name: { id: n.npcName, en: n.npcName },
    keywords: {
      id: [n.npcName, n.birthday, ...n.favoriteGifts.slice(0, 5)].join(", "),
      en: [n.npcName, n.birthday, ...n.favoriteGifts.slice(0, 5)].join(", "),
    },
  })),
  ...rings.map((r) => ({
    id: `ring-${r.id}`,
    category: "lists" as const,
    name: { id: r.name.id, en: r.name.en },
    keywords: {
      id: [r.name.id, r.howToObtain.id].join(", "),
      en: [r.name.en, r.howToObtain.en].join(", "),
    },
  })),
  ...locations.map((l) => ({
    id: `location-${l.id}`,
    category: "lists" as const,
    name: { id: l.name, en: l.name },
    keywords: {
      id: [l.name, l.description.id, l.hours ?? ""].join(", "),
      en: [l.name, l.description.en, l.hours ?? ""].join(", "),
    },
  })),
  ...outfits.map((o) => ({
    id: `outfit-${o.id}`,
    category: "lists" as const,
    name: { id: o.name, en: o.name },
    keywords: {
      id: [o.name, o.type, o.unlockCondition.id].join(", "),
      en: [o.name, o.type, o.unlockCondition.en].join(", "),
    },
  })),
];

export const searchIndex: SearchIndexEntry[] = [
  ...characterEntries,
  ...cropEntries,
  ...guideEntries,
  ...festivalEntries,
  ...recipeEntries,
  ...eventEntries,
  ...listEntries,
];
