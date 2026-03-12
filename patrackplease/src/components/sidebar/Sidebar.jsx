import React from "react";
import {
  User,
  Search,
  CirclePlus,
  LayoutDashboard,
  SquareCheck,
  Menu,
} from "lucide-react";
import "./SidebarStyle.css";

export default function Sidebar({ value }) {
  return (
    <div className="Sidebar-container">
      <div className="sidebar-profile-container">
        <div className="account">
          <User size={30} />
          <p>{value}</p>
        </div>
        <Menu />
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
      </nav>
    </div>
  );
}
