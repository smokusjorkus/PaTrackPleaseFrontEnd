import React, { useState } from "react";

export default function Button({ value, color }) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultColor = color || "#FFF05A";

  const buttonStyle = {
    padding: "15px",
    fontFamily: "Outfit",
    // Change background and scale based on hover state
    backgroundColor: isHovered ? "#e6d851" : defaultColor,
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "all 0.2s ease", // Smooths the "attitude" change
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value}
    </button>
  );
}
