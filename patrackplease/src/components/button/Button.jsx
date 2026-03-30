import React, { useState } from "react";

export default function Button({
  value,
  color,
  onClick,
  fontsize,
  children,
  className,
  fontWeight,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultColor = color || "#FFF05A";

  const buttonStyle = {
    padding: "15px",
    fontFamily: "Outfit",
    backgroundColor: isHovered ? "#e6d851" : defaultColor,
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    border: "none",
    borderRadius: "8px",
    fontSize: fontsize ? fontsize : "1.2rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px", // nice spacing if icon + text
    fontWeight: fontWeight ? fontWeight : "500",
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children ? children : value}
    </button>
  );
}
