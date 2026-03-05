import React from "react";
import "./LoginPageStyle.css";
import "animate.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <section className="login-page">
      <div className="login-card animate__animated animate__fadeInUp">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to PaTrackPlease</p>

        <form className="login-form">
          <input type="email" placeholder="Email" className="login-input" />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />

          <button className="login-button">Sign In</button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/Register"><span>Create one</span></Link>
        </p>
      </div>
    </section>
  );
}
