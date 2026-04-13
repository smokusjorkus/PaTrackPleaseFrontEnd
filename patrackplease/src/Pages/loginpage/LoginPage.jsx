import React, { useState } from "react";
import "./LoginPageStyle.css";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import Balatro from "./../../components/balatro/Balatro";
import ErrorMessage from "../../components/errormessage/ErrorMessage";
import toast from "react-hot-toast";

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
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    // We wrap the fetch in a promise so toast can track it
    const loginPromise = fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed!");
      }
      return data; // ← just return, don't save here
    });

    toast.promise(loginPromise, {
      loading: "Authenticating...",
      success: (data) => {
        // ← save HERE before navigating
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);

        nav("/dashboard");
        return `Welcome back, ${data.username || "User"}!`;
      },
      error: (err) => {
        setError(err.message);
        return err.message;
      },
    });
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

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
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
