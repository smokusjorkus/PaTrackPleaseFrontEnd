import React from "react";
import "./LandingPageHeroStyle.css";
import "animate.css";
import { Link } from "react-router-dom";
import Balatro from "./../../components/balatro/Balatro";

export default function LandingPageHero() {
  return (
    <section className="hero-first">
      <div className="hero-background-glow"></div>

      <div className="balatro-wrapper">
        <Balatro
          spinRotation={-2}
          spinSpeed={7}
          color1="#fff05a"
          color2="#ff6e5a"
          color3="#ffd25a"
          contrast={3.5}
          lighting={0.4}
          spinAmount={0.25}
          pixelFilter={745}
        />
      </div>

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
