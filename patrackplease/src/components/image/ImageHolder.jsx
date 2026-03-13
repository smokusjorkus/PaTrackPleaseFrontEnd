import React from "react";

export default function ImageHolder({
  src,
  alt,
  width = "150px",
  height = "150px",
}) {
  // Define a default image if src is missing
  const defaultImage = "https://i.pravatar.cc/150?u=fallback";

  return (
    <div
      className="image-container"
      style={{ width, height, overflow: "hidden" }}
    >
      <img
        src={src || defaultImage}
        alt={alt || "User image"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensures image fills the area without stretching // Makes it circular for profile pics
        }}
      />
    </div>
  );
}
