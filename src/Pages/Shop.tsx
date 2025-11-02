// src/Pages/Shop.tsx
import "./Shop.css";
import ShopCards from "../components/ShopCards";
import { SHOP_PRODUCTS, type ShopItem } from "../data/ShopProducts";
import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

function ts(p: ShopItem): number {
  if (typeof p.createdAt === "number") return p.createdAt;
  if (typeof p.createdAt === "string") {
    const n = Date.parse(p.createdAt);
    return Number.isNaN(n) ? 0 : n;
  }
  return 0;
}

// Crystal aliases to catch common spellings/phrases in titles or tags.
const CRYSTAL_ALIASES: Record<string, string[]> = {
  "amethyst": ["amethyst"],
  "rose-quartz": ["rose quartz", "pink quartz", "rose-quartz"],
  "citrine": ["citrine"],
  "tigers-eye": ["tiger’s eye", "tigers eye", "tiger eye", "tiger-eye"],
  "clear-quartz": ["clear quartz", "rock crystal", "clear-quartz"],
  "selenite": ["selenite"],
  "labradorite": ["labradorite"],
  "sodalite": ["sodalite"],
  "lapis-lazuli": ["lapis lazuli", "lapis", "lapis-lazuli"],
  "carnelian": ["carnelian"],
  "orange-calcite": ["orange calcite", "orange-calcite"],
  "sunstone": ["sunstone"],
  "green-aventurine": ["green aventurine", "aventurine", "green-aventurine"],
  "malachite": ["malachite"],
  "aquamarine": ["aquamarine"],
  "blue-lace-agate": ["blue lace agate", "blue-lace-agate"],
  "yellow-jasper": ["yellow jasper", "yellow-jasper"],
  "red-jasper": ["red jasper", "red-jasper"],
  "hematite": ["hematite"],
  "black-tourmaline": ["black tourmaline", "black-tourmaline"],
  "lepidolite": ["lepidolite"],
};

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesCrystal(item: ShopItem, slug: string) {
  const aliases = CRYSTAL_ALIASES[slug];
  if (!aliases) return false;
  const hay = norm(
    [item.title, (item as any).description, ((item as any).material || ""), ...(((item as any).tags || []) as string[])].filter(Boolean).join(" ")
  );
  return aliases.some((a) => hay.includes(norm(a)));
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const activeCrystal = searchParams.get("crystal") || "";
  const [sortBy, setSortBy] =
    useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  // 1) Start from products, optionally filter by crystal slug from URL
  const base = useMemo(() => {
    if (!activeCrystal) return SHOP_PRODUCTS;
    return SHOP_PRODUCTS.filter((p) => matchesCrystal(p, activeCrystal));
  }, [activeCrystal]);

  // 2) Apply sorting
  const sorted = useMemo(() => {
    const arr = [...base];
    switch (sortBy) {
      case "price-asc":
        return arr.sort((a, b) => a.price - b.price);
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "newest":
        return arr.sort((a, b) => ts(b) - ts(a)); // newest first
      default:
        return arr; // featured preserves your original order
    }
  }, [base, sortBy]);

  const total = sorted.length;

  return (
    <section className="shop">
      <div className="shop-inner">
        <header className="shop-header">
          <div className="shop-titles">
            <h1 className="shop-title">Shop</h1>
            <p className="shop-sub">
              Handcrafted crystal jewellery — ethically made to inspire balance,
              healing, and inner peace.
            </p>

            {/* Active filter chip */}
            {activeCrystal && (
              <p style={{ marginTop: 8 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "rgba(59, 127, 107, 0.12)",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}
                >
                  Filter: {activeCrystal.replace(/-/g, " ")}
                  <Link
                    to="/shop"
                    style={{
                      fontWeight: 700,
                      marginLeft: 6,
                      color: "var(--accent)",
                      textDecoration: "underline",
                    }}
                  >
                    clear
                  </Link>
                </span>{" "}
                <span style={{ color: "#666", marginLeft: 8 }}>
                  {total} {total === 1 ? "item" : "items"}
                </span>
              </p>
            )}
          </div>

          <div className="shop-controls">
            <label className="control">
              <span>Sort</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "featured"
                      | "price-asc"
                      | "price-desc"
                      | "newest"
                  )
                }
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
        </header>

        <div className="shop-cards">
          <ShopCards items={sorted} />
        </div>

        {/* Empty-state if filter yields no matches */}
        {activeCrystal && total === 0 && (
          <p style={{ marginTop: 16, color: "#666" }}>
            No items matched “{activeCrystal.replace(/-/g, " ")}”.
            <br />
            <Link to="/shop" style={{ color: "var(--accent)", fontWeight: 600 }}>
              View all products
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
