import React, { useState } from "react";
import "./LoginPageStyle.css";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import Balatro from "./../../components/balatro/Balatro";
import ErrorMessage from "../../components/errormessage/ErrorMessage";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const nav = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
    }

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed!");
        return;
      }

      alert("Login Successful");
      nav("/dashboard");
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  return (
    <section className="login-page">
      {/* Background Wrapper */}
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

      {/* Login Card */}
      <div className="login-card animate__animated animate__fadeInUp">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to PaTrackPlease</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={formData.email}
            onChange={handleInput}
            required
          />

          <input
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="login-input"
            value={formData.password}
            onChange={handleInput}
            required
          />

          <div>
            <input
              type="checkbox"
              id="togglePassword"
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
            />
            <label htmlFor="togglePassword">Show Password</label>
          </div>
          {error && <ErrorMessage value={error} />}

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
