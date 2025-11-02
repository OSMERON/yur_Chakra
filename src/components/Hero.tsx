// src/components/Hero.tsx
import { IconChevronRight } from './Icon';
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          Handcrafted Crystal Jewelry for
          <br className="br-md" />
          Your Spiritual Journey
        </h1>

        <p className="hero-sub">
          Ethically sourced crystals designed to promote balance, healing, and positive energy.
        </p>

        <div className="hero-ctas">
          <Link className="btn btn-solid" to="/shop"> Shop Collection <IconChevronRight className="ml-8" /> </Link>
           <Link className="btn btn-outline" to="/meanings"> Discover Meanings </Link>
        </div>
      </div>
    </section>
  );
}
