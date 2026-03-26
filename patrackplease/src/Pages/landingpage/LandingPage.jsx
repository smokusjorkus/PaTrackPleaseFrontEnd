import React from "react";
import "./LandingPageStyle.css";
import NavBar from "../../components/navbar/navbar";
import LandingPageHero from "../../components/landingpagehero/LandingPageHero";
import AboutUs from "../../components/aboutus/AboutUs";
import FeaturesHero from "../../components/features/FeaturesHero";
import Footer from "../../components/footer/Footer";
import Balatro from "../../components/balatro/Balatro";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* GLOBAL BALATRO BACKGROUND */}
      <div className="balatro-global">
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

      {/* CONTENT */}
      <div className="landing-content">
        <NavBar />
        <LandingPageHero />

        <section id="aboutus">
          <AboutUs />
        </section>

        <section id="features">
          <FeaturesHero />
        </section>

        <Footer />
      </div>
    </div>
  );
}
