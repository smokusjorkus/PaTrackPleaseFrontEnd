import React from "react";
import "./LandingPageHeroStyle.css";
import "animate.css";
import { Link } from "react-router-dom";
import GradientBackground from "../gradientBg/GradientBackground";

export default function LandingPageHero() {
  return (
    <section className="hero-first">
      <div className="hero-balatro-wrapper">
        <GradientBackground
          color1="#fff05a"
          color2="#ff6e5a"
          color3="#ffd25a"
          timeSpeed={1.15}
          warpStrength={1.2}
          warpFrequency={5}
          warpSpeed={1.5}
          warpAmplitude={60.0}
          contrast={1.2}
          saturation={1.1}
          grainAmount={0.05}
          zoom={0.9}
        />
      </div>

      <div className="hero-background-glow"></div>

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
