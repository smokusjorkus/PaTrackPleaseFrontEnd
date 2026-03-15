import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./DashboardPageStyle.css";
import "animate.css";

// Receive props from AppRoutes
export default function DashboardPage({ isOpen, setIsOpen }) {
  const [name, setName] = useState("");

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:8080/api/users/email?email=${encodeURIComponent(user.email)}`,
      );

      if (!res.ok) {
        console.log("Failed to fetch user");
        return;
      }

      const data = await res.json();
      setName(data.username);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="dashboard-page">
      {/* Pass functionality to Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} name={name} />

      <main className="dashboard-main">
        <div className="animate__animated animate__fadeInUp dashboard-content">
          <h1 style={{ fontSize: "3rem" }}>Welcome, {name || "User"}</h1>
        </div>
      </main>
    </div>
  );
}
