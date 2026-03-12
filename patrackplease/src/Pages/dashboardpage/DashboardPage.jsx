import React, { useState, useEffect } from "react";
import Sidebar from "./../../components/sidebar/Sidebar";
import "./DashboardPageStyle.css";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = false;

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(JSON.parse(localStorage.getItem("user")));
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
    <div className="page-container">
      <Sidebar value={name} />
      <h1>Welcome</h1>
    </div>
  );
}
