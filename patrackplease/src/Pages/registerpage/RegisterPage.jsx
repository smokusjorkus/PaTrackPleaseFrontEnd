import React, { useState } from "react";
import "./RegisterPageStyle.css";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import Balatro from "./../../components/balatro/Balatro";
import ErrorMessage from "../../components/errormessage/ErrorMessage";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nav = useNavigate();
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const hasCapital = /[A-Z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.userName ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error(
        `Please fill your ${
          !formData.userName
            ? "User Name"
            : !formData.firstName
              ? "First Name"
              : !formData.lastName
                ? "Last Name"
                : !formData.email
                  ? "Email"
                  : !formData.password
                    ? "Password"
                    : "Confirm Password"
        }.`,
      );
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (!hasCapital || !hasNumber || !hasSpecialChar) {
      toast.error(
        "Password must contain at least one capital letter, one number, and one special character.",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Oops! Passwords aren't the same.");
      return;
    }

    const payload = {
      username: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed!");
        return;
      }

      toast.success("Registration successful! Please login.");
      nav("/login");
      return;
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="register-page">
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

      <div className="register-card animate__animated animate__fadeInUp">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">
          Join PaTrackPlease and start organizing your tasks
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            className="register-input"
            value={formData.userName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="register-input"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="register-input"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="register-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type={isVisible ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
            value={formData.confirmPassword}
            onChange={handleChange}
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

          <button className="register-button" type="submit">
            Create Account
          </button>

          {error && <ErrorMessage value={error} />}
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/Login">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
