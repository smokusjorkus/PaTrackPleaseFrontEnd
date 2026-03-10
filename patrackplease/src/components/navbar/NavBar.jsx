import React, { useState, useEffect } from "react";
import "./NavBarStyle.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [color, setColor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    window.addEventListener("resize", toggleMenu);

    return () => {
      window.removeEventListener("scroll", changeColor);
      window.removeEventListener("resize", toggleMenu);
    };
  }, []);

  return (
    <nav className={color ? "navbar-container scrolled" : "navbar-container"}>
      <Link to="/" className="Nav-barLogo">
        <h1>PaTrackPlease</h1>
      </Link>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <a href="/#aboutus">
          <li>About Us</li>
        </a>
        <a href="/#features">
          <li>Features</li>
        </a>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
