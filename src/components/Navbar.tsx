// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconHamburger, IconCart } from "./Icon";
import logo from "../assets/Logo.jpeg";
import "../styles/Navbar.css";
import { useCart } from "../context/CartContext";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Chakra Meanings", to: "/meanings" }, // ← removed stray comma
  { label: "About", to: "/about" },
  { label: "Contact", to: "/about#contact" },
];

export default function Navbar() {
  const { count } = useCart(); // live cart count
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Shadow + solid background after scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) document.body.classList.add("scrolled");
      else document.body.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when switching to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="nav-wrap">
      <nav className="nav">
        {/* Brand */}
        <Link to="/" className="brand" aria-label="Yur Chakra home">
          <img className="brand-logo" src={logo} alt="Yur Chakra" />
          <span className="brand-name">Yur Chakra</span>
        </Link>

        {/* Desktop menu */}
        <ul className="menu desktop-only" role="menubar">
          {LINKS.map((link) => (
            <li key={link.label} role="none">
              <Link to={link.to} className="menu-link" role="menuitem">
                {link.label}
              </Link>
            </li>
          ))}
          <li role="none">
            <Link to="/cart" className="icon-link" aria-label="Basket" title="Basket">
              <IconCart />
              {count > 0 && <span className="badge" aria-live="polite">{count}</span>}
            </Link>
          </li>
        </ul>

        {/* Mobile actions (Cart + Hamburger) */}
        <div className="mobile-actions mobile-only">
          <Link to="/cart" className="icon-link" aria-label="Basket" title="Basket">
            <IconCart />
            {count > 0 && <span className="badge" aria-live="polite">{count}</span>}
          </Link>
          <button
            className="icon-btn"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
          >
            <IconHamburger />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown (opens only via hamburger) */}
      <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} role="menu">
        {LINKS.map((l) => (
          <Link key={l.label} role="menuitem" to={l.to} className="mobile-link">
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
