import React from "react";
import "./LandingPageHeroStyle.css";
import "animate.css";
import { Link } from "react-router-dom";

export default function LandingPageHero() {
  return (
    <section className="hero-first">
      <div className="hero-content animate__animated animate__fadeInUp">
        <h1 className="hero-title">PaTrack Please</h1>

        <p className="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">
          Your <span className="BOLD">Only</span> To-do App
        </p>

        <div className="hero-buttons animate__animated animate__fadeInUp animate__delay-2s">
          <Link to="/Login" className="primary-btn">
            Login
          </Link>
          <Link to="/Register" className="secondary-btn">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
