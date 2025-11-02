
import Cards from "./Cards";
import type { Item } from "./Cards";
import "../styles/FeaturedCollection.css";
import { useEffect, useRef } from "react";

interface FeaturedCollectionProps {
  title?: string;
  items?: Item[];
}

export default function FeaturedCollection({
  title = "Featured Collection",
  items,
}: FeaturedCollectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // 🌿 Fade-in on scroll using IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const defaultItems: Item[] = [
    {
      id: "1",
      title: "Amethyst Balance Bracelet",
      price: 19.99,
      image: "/public/test.png",
    },
    {
      id: "2",
      title: "Rose Quartz Calm Necklace",
      price: 24.5,
      image: "/public/test1.png",
    },
    {
      id: "3",
      title: "Citrine Energy Ring",
      price: 14.0,
      image: "/public/test2.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id={title.toLowerCase().replace(/\s+/g, "-")}
      className="featured fade-section"
    >
      <div className="featured-inner">
        <h2 className="featured-title">{title}</h2>
        <p className="featured-sub">
          Discover our handpicked crystal jewellery — ethically made to inspire
          balance, healing, and inner peace.
        </p>

        <Cards items={items || defaultItems} />
      </div>
    </section>
  );
}
