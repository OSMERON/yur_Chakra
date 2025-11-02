// src/Pages/About.tsx
import "./About.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
  const location = useLocation();

  // If we arrive with #contact (or via /contact), scroll to the contact section
  useEffect(() => {
    const wantsContact =
      location.hash === "#contact" || location.pathname === "/contact";
    if (wantsContact) {
      requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [location]);

  // Swap with your real image if needed
  const founderImg = import.meta.env.BASE_URL + "images/about/founder.jpg";

  return (
    <section className="about">
      <div className="about-inner">
        {/* Header */}
        <header className="about-header">
          <h1 className="about-title">About Yur Chakra</h1>
          <p className="about-sub">
            Handcrafted crystal jewellery for modern spiritual living—rooted in
            ethics, intention, and everyday wearability.
          </p>
        </header>

        {/* Story */}
        <div className="about-grid">
          <div className="about-media">
            <img
              src={founderImg}
              alt="Founder portrait"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.endsWith("/vite.svg")) img.src = "/vite.svg";
              }}
            />
          </div>

          <article className="about-content">
            <h2 className="about-h2">Our Story</h2>
            <p>
              Yur Chakra began during the Covid years as a way to support people
              with their mental health and guide them on their spiritual journey.
              What started as a small, heartfelt project has grown into a modern
              crystal jewellery brand—designed to feel grounded, wearable, and
              deeply personal.
            </p>
            <p>
              Every piece is handmade using ethically sourced crystals and
              materials by skilled artisans in India and parts of Asia. We keep
              things sustainable, unique, and meaningful—so your jewellery can be
              a companion for balance, healing, and positive energy.
            </p>
            <ul className="about-bullets">
              <li>Ethically sourced & artisan-made</li>
              <li>Designed for balance, healing & positive energy</li>
              <li>Thoughtful, sustainable packaging</li>
            </ul>

            <div className="about-cta-row">
              <Link to="/shop" className="about-btn about-btn-solid">
                Shop Collection
              </Link>
              <Link to="/meanings" className="about-btn about-btn-outline">
                Discover Meanings
              </Link>
            </div>
          </article>
        </div>

        {/* Contact (icons only — no visible personal data) */}
        <section id="contact" className="contact-block" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p className="contact-sub">
            I’d love to hear from you — questions about crystals, custom jewellery,
            chakra guidance, collaborations, or wholesale. Let’s connect and make
            something meaningful together. ✨
          </p>

          <div className="contact-icons">
            <a
              href="mailto:armina@kateandco.com"
              target="_blank"
              rel="noreferrer"
              className="contact-icon-link"
              aria-label="Email Yur Chakra"
              title="Email"
            >
              <img
                src={import.meta.env.BASE_URL + "images/socials/email.png"}
                alt=""
                className="contact-icon-img"
              />
              <span className="sr-only">Email</span>
            </a>

            <a
              href="https://wa.me/447983888898"
              target="_blank"
              rel="noreferrer"
              className="contact-icon-link"
              aria-label="WhatsApp Yur Chakra"
              title="WhatsApp"
            >
              <img
                src={import.meta.env.BASE_URL + "images/socials/Whatsapp.png"}
                alt=""
                className="contact-icon-img"
              />
              <span className="sr-only">WhatsApp</span>
            </a>

            <a
              href="https://instagram.com/yur_chakra"
              target="_blank"
              rel="noreferrer"
              className="contact-icon-link"
              aria-label="Instagram Yur Chakra"
              title="Instagram"
            >
              <img
                src={import.meta.env.BASE_URL + "images/socials/instagram.png"}
                alt=""
                className="contact-icon-img"
              />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
