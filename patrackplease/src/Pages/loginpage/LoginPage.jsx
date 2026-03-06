import React from "react";
import "./LoginPageStyle.css";
import "animate.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import BlobCursor from "./BlobCursor";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {};

  const handleInput = (e) => {};

  return (
    <section className="login-page">
      <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />
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

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/Register">
            <span>Create one</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
