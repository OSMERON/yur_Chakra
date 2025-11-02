// src/Pages/Cart.tsx
import { Link } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { SHOP_PRODUCTS, type ShopItem } from "../data/ShopProducts";
import {
  findStonesInTitle,
  chakrasForStone,
  stonesForChakra,
  normalize,
} from "../utils/chakraRecs";

const GBP = (v: number) => `£${v.toFixed(2)}`;

function pickProductByStone(stone: string, excludeIds: Set<string>): ShopItem | undefined {
  const byTitle = SHOP_PRODUCTS.find(
    p => !excludeIds.has(String(p.id)) && normalize(p.title).includes(normalize(stone))
  );
  if (byTitle) return byTitle;
  const byTag = SHOP_PRODUCTS.find(p =>
    !excludeIds.has(String(p.id)) &&
    Array.isArray(p.tags) &&
    p.tags.some((t: string) => normalize(t).includes(normalize(stone)))
  );
  return byTag;
}

export default function Cart() {
  const { lines, subtotal, remove, increment, decrement, setQty, clear, add } = useCart();
  const isEmpty = lines.length === 0;

  const exclude = new Set(lines.map(l => String(l.id)));
  const wantedStones = new Set<string>();

  for (const line of lines) {
    const tags: string[] = Array.isArray(line.item?.tags) ? line.item.tags : [];
    const stonesFromTitle = findStonesInTitle(line.title);

    const chakras = new Set<string>();
    for (const tag of tags) {
      const t = normalize(tag);
      if (/(root|sacral|solar plexus|solar-plexus|heart|throat|third eye|third-eye|crown)/.test(t)) {
        const key =
          t.includes("solar") ? "solar-plexus" :
          t.includes("third") ? "third-eye" : t.replace(/\s+/g, "-");
        chakras.add(key);
      }
    }
    for (const stone of stonesFromTitle) {
      for (const ch of chakrasForStone(stone)) chakras.add(ch);
    }
    for (const ch of chakras) for (const s of stonesForChakra(ch)) wantedStones.add(s);
  }

  for (const line of lines) {
    for (const s of findStonesInTitle(line.title)) wantedStones.delete(s);
  }

  const recommendations: { product: ShopItem; chakra?: string }[] = [];
  for (const stone of wantedStones) {
    const p = pickProductByStone(stone, exclude);
    if (p && !recommendations.find(r => r.product.id === p.id)) {
      const ch = chakrasForStone(stone)[0];
      recommendations.push({ product: p, chakra: ch });
    }
    if (recommendations.length >= 6) break;
  }

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <div className="cart-inner">
        <header className="cart-header">
          <h1 id="cart-title" className="cart-title">Your Cart</h1>
          <p className="cart-sub">
            Handcrafted crystal jewellery — ethically made to inspire balance and inner peace.
          </p>
        </header>

        {isEmpty ? (
          <div className="cart-empty" role="status" aria-live="polite">
            <div className="cart-empty-emoji" aria-hidden>🧺</div>
            <h2 className="cart-empty-title">Your basket is empty</h2>
            <p className="cart-empty-sub">Browse the latest pieces and add what resonates with you.</p>
            <Link to="/shop" className="cart-cta">Browse the Shop</Link>
          </div>
        ) : (
          <>
            <div className="cart-grid">
              <div className="cart-items">
                {lines.map((line) => (
                  <article key={line.id} className="cart-line">
                    <img src={line.image} alt={line.title} className="cart-line-thumb" />
                    <div className="cart-line-main">
                      <h3 className="cart-line-title">{line.title}</h3>
                      <div className="cart-line-price">{GBP(line.price)}</div>
                      <div className="cart-line-qty">
                        <button className="qty-btn" onClick={() => decrement(line.id)} aria-label="Decrease quantity">−</button>
                        <input
                          className="qty-input"
                          inputMode="numeric"
                          value={line.qty}
                          onChange={(e) =>
                            setQty(line.id, parseInt(e.target.value.replace(/\D/g, "") || "1", 10))
                          }
                          aria-label="Quantity"
                        />
                        <button className="qty-btn" onClick={() => increment(line.id)} aria-label="Increase quantity">+</button>
                      </div>
                    </div>
                    <div className="cart-line-side">
                      <div className="cart-line-total">{GBP(line.price * line.qty)}</div>
                      <button className="remove-btn" onClick={() => remove(line.id)} aria-label={`Remove ${line.title}`}>Remove</button>
                    </div>
                  </article>
                ))}
                <div className="cart-actions-row">
                  <Link to="/shop" className="link-soft">← Continue shopping</Link>
                  <button className="link-soft" onClick={clear}>Clear cart</button>
                </div>
              </div>

              <aside className="cart-summary" aria-label="Order summary">
                <div className="summary-card">
                  <div className="summary-row"><span>Subtotal</span><strong>{GBP(subtotal)}</strong></div>
                  <div className="summary-row"><span>Shipping</span><span>Calculated at checkout</span></div>
                  <hr />
                  <div className="summary-row total"><span>Total</span><strong>{GBP(subtotal)}</strong></div>
                  <button className="summary-checkout" disabled={subtotal === 0}>Continue to Checkout</button>
                  <p className="summary-note">
                    UK shipping £3.99 — Free over £40. Dispatched in 2–3 working days via Royal Mail Tracked.
                  </p>
                </div>
              </aside>
            </div>

            {recommendations.length > 0 && (
              <section className="chakra-recs" aria-labelledby="chakra-recs-title">
                <h2 id="chakra-recs-title" className="chakra-recs-title">Complete the set</h2>
                <p className="chakra-recs-sub">
                  Based on the chakras in your cart, you might also like these complementary stones:
                </p>

                <div className="chakra-recs-grid">
                  {recommendations.map(({ product: p, chakra }) => (
                    <article key={p.id} className="rec-card">
                      <Link to={`/shop?product=${encodeURIComponent(String(p.id))}`} className="rec-media">
                        <img
                          src={p.image || "/vite.svg"}
                          alt={p.title}
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            if (!img.src.endsWith("/vite.svg")) img.src = "/vite.svg";
                          }}
                        />
                      </Link>
                      <div className="rec-body">
                        <h3 className="rec-title">{p.title}</h3>
                        <div className="rec-price">{GBP(p.price)}</div>
                        <div className="rec-actions">
                          <button className="btn-accent" onClick={() => add(p, 1)}>Add to cart</button>
                          <Link
                            to={`/meanings?chakra=${encodeURIComponent(chakra || "all")}`}
                            className="btn-outline"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </section>
  );
}
