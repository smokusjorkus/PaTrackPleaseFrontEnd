import React, { useState, useEffect } from "react";
import "./NavBarStyle.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);

    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <nav className={color ? "navbar-container scrolled" : "navbar-container"}>
      <a href="/" className="Nav-barLogo">
        <h1>PaTrackPlease</h1>
      </a>

      <ul className="navbar-links">
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
      </ul>
    </nav>
  );
}
