// src/data/ShopProducts.ts
export type ShopItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: string;              // manual badge still works
  createdAt?: string | number; // used for "Newest" sort and auto-badge
};

export const SHOP_PRODUCTS: ShopItem[] = [
  {
    id: "amethyst-bracelet",
    title: "Amethyst Balance Bracelet",
    price: 19.99,
    image: "/images/products/test.png",
    badge: "Bestseller",
    createdAt: "2024-06-12",
  },
  {
    id: "rose-quartz-necklace",
    title: "Rose Quartz Calm Necklace",
    price: 24.5,
    image: "/images/products/test1.png",
    createdAt: "2024-11-18",
  },
  {
    id: "citrine-ring",
    title: "Citrine Energy Ring",
    price: 14,
    image: "/images/products/test2.png",
    createdAt: "2025-10-31",
  },
  {
    id: "aventurine-pendant",
    title: "Aventurine Luck Pendant",
    price: 28,
    image: "/images/products/test3.png",
    // no manual badge — auto "New" will kick in if within 30 days
    createdAt: "2025-10-25",
  },
  {
    id: "tigers-eye-beads",
    title: "Tiger’s Eye Strength Beads",
    price: 24.99,
    image: "/images/products/test4.png",
    createdAt: "2024-08-03",
  },
];
