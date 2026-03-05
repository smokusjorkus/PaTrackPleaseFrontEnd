import React, { useState } from "react";
import "./RegisterPageStyle.css";
import "animate.css";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    formData.userName === "" ||
    formData.firstName === "" ||
    formData.lastName === "" ||
    formData.email === "" ||
    formData.password === "" ||
    formData.confirmPassword === ""
  ) {
    alert("Please fill in all fields");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log(formData); // later send to Spring Boot
};

  return (
    <section className="register-page">
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
          />

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="register-input"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="register-input"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button className="register-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/Login"><span>Login</span></Link>
        </p>
      </div>
    </section>
  );
}