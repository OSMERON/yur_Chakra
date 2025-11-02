// src/components/ShopCards.tsx
import { useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/Cards.css";
import type { ShopItem } from "../data/ShopProducts";
import { useCart } from "../context/CartContext";

export type ShopCardsProps = {
  items: ShopItem[];
  currency?: string; // default "£"
  onAddToCart?: (item: ShopItem) => void;
};

const NEW_WINDOW_DAYS = 30;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

function isNew(createdAt?: string | number): boolean {
  if (!createdAt) return false;
  const t =
    typeof createdAt === "number" ? createdAt : Date.parse(createdAt || "");
  if (Number.isNaN(t)) return false;
  return Date.now() - t <= NEW_WINDOW_DAYS * MS_IN_DAY;
}

export default function ShopCards({ items, currency = "£", onAddToCart }: ShopCardsProps) {
  const { add } = useCart(); // get add function from cart context

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, item: ShopItem) => {
      const btn = e.currentTarget;

      // add to cart first
      if (onAddToCart) onAddToCart(item);
      add(item, 1); 
      // small animation (restores your previous behavior)
      btn.classList.remove("clicked");
      void btn.offsetWidth;
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 500);
    },
    [add, onAddToCart]
  );


  return (
    <div className="cards">
      {items.map((item) => {
        const imgSrc =
          item.image && item.image.length > 0 ? item.image : "/vite.svg";
        const showAutoNew = !item.badge && isNew(item.createdAt);

        return (
          <article
            key={item.id}
            className="card fade-card visible"
            aria-label={item.title}
          >
            <div className="card__media">
              <img
                src={imgSrc}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (!img.src.endsWith("/vite.svg")) {
                    if (import.meta.env.DEV) {
                      console.warn("Image not found, falling back:", img.src);
                    }
                    img.src = "/vite.svg";
                  }
                }}
              />
              {(item.badge || showAutoNew) && (
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    background: "var(--accent)",
                    color: "#fff",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 8px",
                  }}
                >
                  {item.badge ?? "New"}
                </span>
              )}
            </div>

            <div className="card__body">
              <h3 className="card__title">{item.title}</h3>
              <div className="card__price">
                {currency}
                {item.price.toFixed(2)}
              </div>

              {/* Add to cart with animation */}
              <button
                className="cart-button"
                onClick={(e) => handleClick(e, item)}
              >
                <span className="add-to-cart">Add to cart</span>
                <span className="added">Added</span>
                <svg className="icon-cart" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C8.09 16.37 8 16.69 8 17a2 2 0 0 0 2 2h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.79-1.11l3.58-6.49A1 1 0 0 0 22 5H7z" />
                </svg>
                <svg className="icon-box" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 7l-9-4-9 4 9 4 9-4zm-9 6l-9-4v8l9 4 9-4v-8l-9 4z" />
                </svg>
              </button>

              {/* View Product navigates to the Product page */}
              <Link
                to={`/product/${encodeURIComponent(String(item.id))}?title=${encodeURIComponent(item.title)}`}
                className="card__btn1"
                aria-label={`View ${item.title}`}
              >
                View Product
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
