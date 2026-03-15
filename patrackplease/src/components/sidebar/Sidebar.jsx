import React, { useEffect } from "react";
import {
  User,
  Search,
  CirclePlus,
  LayoutDashboard,
  SquareCheck,
  Menu,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./SidebarStyle.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Sidebar({ isOpen, setIsOpen }) {
  const nav = useNavigate();
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

  const handlelogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("username");

    toast.success("Successfully logged out.");
    nav("/login");
  };

  return (
    <div className={`Sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-profile-container">
        <div className="account">
          <User size={30} />
          <p>{name}</p>
        </div>
        <Menu
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <nav className="navigation-links">
        <div className="sidebar-btn">
          <CirclePlus />
          <p>Add new Task</p>
        </div>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <div className="sidebar-btn">
            <LayoutDashboard color="#000000" />
            <p>Dashboard</p>
          </div>
        </Link>
        <div className="sidebar-btn">
          <SquareCheck />
          <p>Your Tasks</p>
        </div>
        <div className="sidebar-btn">
          <Search />
          <p>Search Tasks</p>
        </div>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div className="sidebar-btn">
            <CircleUserRound color="#000000" />
            <p>Profile</p>
          </div>
        </Link>
        <div className="sidebar-btn" onClick={handlelogout}>
          <LogOut />
          <p>Log out</p>
        </div>
      </nav>
    </div>
  );
}
