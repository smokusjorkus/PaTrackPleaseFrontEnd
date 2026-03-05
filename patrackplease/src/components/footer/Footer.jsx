import React from "react";
import "./FooterStyle.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>PaTrackPlease</h2>
          <p>
            Stay organized, focused, and productive with tools designed to help
            you manage your tasks effortlessly.
          </p>
        </div>

        <div className="footer-links">
          <h3>Product</h3>
          <a href="#">Features</a>
          <a href="#">How it Works</a>
          <a href="#">Pricing</a>
        </div>

        <div className="footer-links">
          <h3>Company</h3>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Support</a>
        </div>

        <div className="footer-links">
          <h3>Social</h3>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Github</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PaTrackPlease. All rights reserved.</p>
      </div>
    </footer>
  );
}
