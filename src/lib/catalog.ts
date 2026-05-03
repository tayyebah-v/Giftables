export type EventSlug =
  | "birthday"
  | "wedding"
  | "baby"
  | "achievement"
  | "farewell"
  | "housewarming"
  | "get-well"
  | "religious";

export type DeliveryTier = "intra" | "inter" | "intl";

export type GiftItem = {
  sku: string;
  name: string;
  description: string;
  priceCents: number;
  categories: string[];
  tags: string[];
  popularityScore: number;
  recommendedForEventSlugs: EventSlug[];
  budgetTier: "low" | "mid" | "high";
  imageUrl: string;
};

export type EventDef = {
  slug: EventSlug;
  label: string;
  shortLabel: string;
  description: string;
  theme: { primary: string; accent: string; surface: string };
};

export type PackagingDef = {
  slug: string;
  name: string;
  description: string;
  basePriceCents: number;
  imageUrl: string;
};

export type AddOnDef = {
  slug: string;
  name: string;
  description: string;
  kind: "packaging_extra" | "global_extra";
  priceCents: number;
  compatiblePackagingSlugs?: string[];
};

export type BundleDef = {
  slug: string;
  title: string;
  eventSlug: EventSlug;
  packagingTypeSlug: string;
  defaultAddOnSlugs: string[];
  giftItemSkus: string[];
  discountCents: number;
};

export const EVENTS: EventDef[] = [
  {
    slug: "birthday",
    label: "Birthday",
    shortLabel: "Birthday",
    description: "Celebrate another radiant trip around the sun.",
    theme: { primary: "#fce7f3", accent: "#f9a8d4", surface: "#fff7fb" },
  },
  {
    slug: "wedding",
    label: "Wedding · Engagement · Anniversary",
    shortLabel: "Love & vows",
    description: "Timeless gestures for milestones of the heart.",
    theme: { primary: "#ede9fe", accent: "#c4b5fd", surface: "#faf5ff" },
  },
  {
    slug: "baby",
    label: "Baby arrival",
    shortLabel: "New arrival",
    description: "Soft welcomes for the tiniest chapter.",
    theme: { primary: "#e0f2fe", accent: "#7dd3fc", surface: "#f0f9ff" },
  },
  {
    slug: "achievement",
    label: "Academic & professional wins",
    shortLabel: "Achievement",
    description: "Honor the hustle with something unforgettable.",
    theme: { primary: "#fef3c7", accent: "#fcd34d", surface: "#fffbeb" },
  },
  {
    slug: "farewell",
    label: "Farewell",
    shortLabel: "Farewell",
    description: "Warm goodbyes that linger.",
    theme: { primary: "#f1f5f9", accent: "#94a3b8", surface: "#f8fafc" },
  },
  {
    slug: "housewarming",
    label: "Housewarming",
    shortLabel: "Housewarming",
    description: "Make their new space feel like home.",
    theme: { primary: "#dcfce7", accent: "#86efac", surface: "#f0fdf4" },
  },
  {
    slug: "get-well",
    label: "Get well soon",
    shortLabel: "Get well",
    description: "Gentle comfort, wrapped with care.",
    theme: { primary: "#ffedd5", accent: "#fdba74", surface: "#fff7ed" },
  },
  {
    slug: "religious",
    label: "Religious & cultural moments",
    shortLabel: "Faith & festivity",
    description: "Eid, Christmas, and sacred celebrations.",
    theme: { primary: "#e0e7ff", accent: "#a5b4fc", surface: "#eef2ff" },
  },
];

export const PACKAGING: PackagingDef[] = [
  {
    slug: "wrapping-sheet",
    name: "Wrapping sheet",
    description: "Crisp folds, boutique finish, photo-ready.",
    basePriceCents: 799,
    imageUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80",
  },
  {
    slug: "gift-bag",
    name: "Gift bag",
    description: "Effortless elegance — our most-loved default.",
    basePriceCents: 1299,
    imageUrl:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
  },
  {
    slug: "basket",
    name: "Basket",
    description: "Layered depth for premium unboxing drama.",
    basePriceCents: 2499,
    imageUrl:
      "https://images.unsplash.com/photo-1607344645866-009c9281f3c9?w=600&q=80",
  },
];

export const ADD_ONS: AddOnDef[] = [
  {
    slug: "flowers",
    name: "Fresh florals",
    description: "Petite stems tucked beside your gifts.",
    kind: "packaging_extra",
    priceCents: 1599,
  },
  {
    slug: "net-wrapping",
    name: "Net wrapping",
    description: "Soft shimmer layer.",
    kind: "packaging_extra",
    priceCents: 499,
    compatiblePackagingSlugs: ["wrapping-sheet", "gift-bag"],
  },
  {
    slug: "brown-paper",
    name: "Brown craft paper",
    description: "Earthy, artisanal contrast.",
    kind: "packaging_extra",
    priceCents: 399,
  },
  {
    slug: "confetti",
    name: "Confetti burst",
    description: "A little joy on lift-off.",
    kind: "packaging_extra",
    priceCents: 299,
  },
  {
    slug: "handwritten-note",
    name: "Handwritten note",
    description: "Ink on luxe stationery — your words, our pen.",
    kind: "global_extra",
    priceCents: 899,
  },
  {
    slug: "greeting-card",
    name: "Greeting card",
    description: "Letterpress-inspired card with envelope.",
    kind: "global_extra",
    priceCents: 599,
  },
  {
    slug: "bouquet",
    name: "Flower bouquet",
    description: "Statement bouquet alongside the package.",
    kind: "global_extra",
    priceCents: 4499,
  },
];

export const DELIVERY_PRICES: Record<DeliveryTier, number> = {
  intra: 599,
  inter: 1299,
  intl: 3999,
};

export const GIFTS: GiftItem[] = [
  {
    sku: "CHOC-001",
    name: "Artisan chocolate flight",
    description: "Small-batch bars, velvet mouthfeel.",
    priceCents: 2499,
    categories: ["gourmet", "sweet"],
    tags: ["popular", "trending"],
    popularityScore: 92,
    recommendedForEventSlugs: ["birthday", "achievement", "farewell"],
    budgetTier: "mid",
    imageUrl:
      "https://images.unsplash.com/photo-1549007994-cb92cae61054?w=600&q=80",
  },
  {
    sku: "CNDL-002",
    name: "Linen candle duo",
    description: "Blush glass, slow burn, spa-quiet notes.",
    priceCents: 3299,
    categories: ["home", "wellness"],
    tags: ["popular"],
    popularityScore: 88,
    recommendedForEventSlugs: ["housewarming", "get-well", "wedding"],
    budgetTier: "mid",
    imageUrl:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b258?w=600&q=80",
  },
  {
    sku: "TEA-003",
    name: "Ceremonial tea set",
    description: "Whole-leaf blends in a keepsake tin.",
    priceCents: 1899,
    categories: ["gourmet", "wellness"],
    tags: ["trending"],
    popularityScore: 76,
    recommendedForEventSlugs: ["achievement", "religious", "farewell"],
    budgetTier: "low",
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c5306e14a931?w=600&q=80",
  },
  {
    sku: "BABY-004",
    name: "Organic baby bundle",
    description: "Cloud-soft essentials, neutral palette.",
    priceCents: 4299,
    categories: ["baby", "wellness"],
    tags: ["popular"],
    popularityScore: 90,
    recommendedForEventSlugs: ["baby"],
    budgetTier: "high",
    imageUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
  },
  {
    sku: "BOOK-005",
    name: "Illustrated keepsake book",
    description: "A story they will reopen for years.",
    priceCents: 2799,
    categories: ["culture", "home"],
    tags: [],
    popularityScore: 70,
    recommendedForEventSlugs: ["birthday", "achievement", "baby"],
    budgetTier: "mid",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
  },
  {
    sku: "SPA-006",
    name: "Silk recovery spa kit",
    description: "Masks, oils, and quiet luxury.",
    priceCents: 3699,
    categories: ["wellness"],
    tags: ["popular", "trending"],
    popularityScore: 84,
    recommendedForEventSlugs: ["get-well", "wedding", "farewell"],
    budgetTier: "high",
    imageUrl:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
  },
  {
    sku: "COOK-007",
    name: "Chef's olive oil pair",
    description: "Single-origin drizzle, tasting notes card.",
    priceCents: 2199,
    categories: ["gourmet", "home"],
    tags: [],
    popularityScore: 72,
    recommendedForEventSlugs: ["housewarming", "religious", "achievement"],
    budgetTier: "mid",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
  },
  {
    sku: "MINI-008",
    name: "Mini macaron box",
    description: "Pastel bites, Parisian flair.",
    priceCents: 1599,
    categories: ["sweet"],
    tags: ["trending"],
    popularityScore: 80,
    recommendedForEventSlugs: ["birthday", "wedding", "farewell"],
    budgetTier: "low",
    imageUrl:
      "https://images.unsplash.com/photo-1558326567-98ae00a90d0c?w=600&q=80",
  },
];

export const BUNDLES: BundleDef[] = [
  {
    slug: "birthday-classic",
    title: "Birthday Classic",
    eventSlug: "birthday",
    packagingTypeSlug: "gift-bag",
    defaultAddOnSlugs: ["confetti", "handwritten-note"],
    giftItemSkus: ["CHOC-001", "MINI-008"],
    discountCents: 400,
  },
  {
    slug: "wedding-soft",
    title: "Soft Vows Set",
    eventSlug: "wedding",
    packagingTypeSlug: "basket",
    defaultAddOnSlugs: ["flowers", "greeting-card"],
    giftItemSkus: ["CNDL-002", "SPA-006"],
    discountCents: 600,
  },
  {
    slug: "housewarming-herb",
    title: "Housewarming Herb",
    eventSlug: "housewarming",
    packagingTypeSlug: "wrapping-sheet",
    defaultAddOnSlugs: ["brown-paper"],
    giftItemSkus: ["COOK-007", "CNDL-002"],
    discountCents: 350,
  },
];

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug);
}

export function catalogMaps() {
  const packagingBySlug = Object.fromEntries(
    PACKAGING.map((p) => [p.slug, { priceCents: p.basePriceCents }]),
  );
  const addOnBySlug = Object.fromEntries(
    ADD_ONS.map((a) => [a.slug, { priceCents: a.priceCents, kind: a.kind }]),
  );
  const giftBySku = Object.fromEntries(
    GIFTS.map((g) => [g.sku, { priceCents: g.priceCents }]),
  );
  const deliveryByTier = { ...DELIVERY_PRICES };
  return { packagingBySlug, addOnBySlug, giftBySku, deliveryByTier };
}
