import React from "react";
import "./RegisterPageStyle.css";
import "animate.css";

export default function RegisterPage() {
  return (
    <section className="register-page">
      <div className="register-card animate__animated animate__fadeInUp">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">
          Join PaTrackPlease and start organizing your tasks
        </p>

        <form className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            className="register-input"
          />

          <input type="email" placeholder="Email" className="register-input" />

          <input
            type="password"
            placeholder="Password"
            className="register-input"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="register-input"
          />

          <button className="register-button">Create Account</button>
        </form>

        <p className="register-footer">
          Already have an account? <span>Login</span>
        </p>
      </div>
    </section>
  );
}
