import React from "react";
import "./FeaturesHeroStyle.css";

export default function FeaturesHero() {
  const features = [
    {
      icon: "🗂️",
      title: "Task Organization",
      desc: "Create, group, and prioritize tasks so you always know what to do next.",
    },
    {
      icon: "⏰",
      title: "Smart Reminders",
      desc: "Never miss a deadline with gentle reminders and clear due dates.",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      desc: "See what you’ve completed and stay motivated with simple progress views.",
    },
    {
      icon: "🔍",
      title: "Quick Search",
      desc: "Find tasks instantly using keywords, filters, and sorting options.",
    },
    {
      icon: "🤝",
      title: "Easy Sharing",
      desc: "Share lists and plans with friends or teammates without the clutter.",
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      desc: "Your data stays safe with consistent saving and predictable behavior.",
    },
  ];

  return (
    <section className="features-section" id="features">
      {/* subtle flare */}
      <div className="features-glow features-glow-1" />
      <div className="features-glow features-glow-2" />

      <div className="features-wrap">
        <div className="features-header">
          <span className="features-badge">Features</span>
          <h2 className="features-heading">Tools that keep you productive</h2>
          <p className="features-text">
            A clean set of features made to help you stay organized, focused,
            and consistent — without feeling overwhelmed.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div className="features-card" key={f.title}>
              <div className="features-icon">{f.icon}</div>
              <h3 className="features-card-title">{f.title}</h3>
              <p className="features-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
}
