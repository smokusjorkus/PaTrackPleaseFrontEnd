import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import "./DashboardPageStyle.css";
import "animate.css";

export default function DashboardPage({ isOpen, setIsOpen }) {
  const [name, setName] = useState("");

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:8080/api/users/email?email=${encodeURIComponent(user.email)}`,
      );

      if (res.ok) {
        const data = await res.json();
        setName(data.username);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} name={name} />

      <main className={`dashboard-main ${isOpen ? "open" : "closed"}`}>
        <div className="animate__animated animate__fadeIn dashboard-content">
          <header className="dashboard-header">
            <h1>Hello, {name || "User"}!</h1>
            <p>Ready to get started?</p>
          </header>
        </div>
      </main>
    </div>
  );
}
