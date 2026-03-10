import React from "react";

export default function ErrorMessage({ value }) {
  return (
    <div>
      <p className="ErrorMessage">{value}</p>
    </div>
  );
}
