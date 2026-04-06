import React from "react";
import {} from "lucide-react";

export default function KPI({ KPIName, KPIValue, backgroundColor, children }) {
  const defaultBackground = backgroundColor || "#FFF05A";
  const cardStyle = {
    padding: "30px",
    backgroundColor: defaultBackground,
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "250px",
    height: "214px",
    alignItems: "center",
    gap: "30px",
    justifyContent: "center",
  };

  const cardContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const KpiIcon = {
    marginBottom: "30px",
  };

  return (
    <div style={cardStyle}>
      <div style={KpiIcon}>{children}</div>
      <div style={cardContentStyle}>
        <h1>{KPIValue}</h1>
        <p>{KPIName}</p>
      </div>
    </div>
  );
}
