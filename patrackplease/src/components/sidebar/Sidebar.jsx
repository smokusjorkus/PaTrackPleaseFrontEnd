import React from "react";
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
import { useNavigate } from "react-router-dom";
import "./SidebarStyle.css";

export default function Sidebar({ value, isOpen, setIsOpen }) {
  const nav = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("username");

    alert("Successfully logged out.");
    nav("/login");
  };

  return (
    <div className={`Sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-profile-container">
        <div className="account">
          <User size={30} />
          <p>{value}</p>
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
        <div className="sidebar-btn">
          <LayoutDashboard />
          <p>Dashboard</p>
        </div>
        <div className="sidebar-btn">
          <SquareCheck />
          <p>Your Tasks</p>
        </div>
        <div className="sidebar-btn">
          <Search />
          <p>Search Tasks</p>
        </div>
        <div className="sidebar-btn">
          <CircleUserRound />
          <p>Profile</p>
        </div>
        <div className="sidebar-btn" onClick={handlelogout}>
          <LogOut />
          <p>Log out</p>
        </div>
      </nav>
    </div>
  );
}
