import React, { useState, useEffect } from "react";
import "./NavBarStyle.css";

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
      <h1>PaTrackPlease</h1>

      <ul className="navbar-links">
        <li>About Us</li>
        <li>Login</li>
        <li>Register</li>
      </ul>
    </nav>
  );
}
