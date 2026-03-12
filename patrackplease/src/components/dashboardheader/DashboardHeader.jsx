import React from "react";
import "./DashboardHeaderStyle.css";
import Button from "../button/Button";

export default function DashboardHeader({ name }) {
  return (
    <div className="Dashboard-header">
      <div className="header-content">
        <h2>Welcome back, {name}</h2>
      </div>
      <Button />
    </div>
  );
}
