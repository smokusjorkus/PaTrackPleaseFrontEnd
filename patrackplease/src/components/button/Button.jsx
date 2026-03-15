import React, { useState } from "react";

// 1. Add 'onClick' to the props here
export default function Button({ value, color, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultColor = color || "#FFF05A";

  const buttonStyle = {
    padding: "15px",
    fontFamily: "Outfit",
    backgroundColor: isHovered ? "#e6d851" : defaultColor,
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <button
      style={buttonStyle}
      // 2. Attach the onClick prop to the actual button element
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value}
    </button>
  );
}
