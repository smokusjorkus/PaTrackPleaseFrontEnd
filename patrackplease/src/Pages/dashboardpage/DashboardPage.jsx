import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./DashboardPageStyle.css";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
      <Sidebar value={name} isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <h1>Welcome, {name || "User"}</h1>
        </div>
      </main>
    </div>
  );
}
