import React from "react";
import "./LandingPageStyle.css";
import NavBar from "../../components/navbar/navbar";
import LandingPageHero from "../../components/landingpagehero/LandingPageHero";
import AboutUs from "../../components/aboutus/AboutUs";
import FeaturesHero from "../../components/features/FeaturesHero";
import Footer from "../../components/footer/Footer";

export default function LandingPage() {
  return (
    <div>
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
  );
}
