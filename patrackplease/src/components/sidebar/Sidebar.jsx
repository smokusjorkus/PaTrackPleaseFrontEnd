import React from "react";
import {
  User,
  Search,
  CirclePlus,
  LayoutDashboard,
  SquareCheck,
  Menu,
  CircleUserRound,
} from "lucide-react";
import "./SidebarStyle.css";

export default function Sidebar({ value, isOpen, setIsOpen }) {
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
      </nav>
    </div>
  );
}
