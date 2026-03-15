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
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./SidebarStyle.css";
import toast from "react-hot-toast";

export default function Sidebar({ isOpen, setIsOpen, name }) {
  const nav = useNavigate();
  const location = useLocation();

  const handlelogout = () => {
    localStorage.clear();
    toast.success("Successfully logged out.");
    nav("/login");
  };

  return (
    <div className={`Sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-profile-container">
        <div className="account">
          <User size={30} />
          {/* Logic: Label only shows if sidebar is open */}
          {isOpen && (
            <p className="animate__animated animate__fadeIn">
              {name || "User"}
            </p>
          )}
        </div>
        <Menu
          onClick={() => setIsOpen(!isOpen)} // The toggle functionality
          style={{ cursor: "pointer" }}
          className="menu-icon"
        />
      </div>

      <nav className="navigation-links">
        {/* Keeping all your original buttons and labels */}
        <div className="sidebar-btn">
          <CirclePlus />
          {isOpen && <p>Add new Task</p>}
        </div>

        <Link
          to="/dashboard"
          style={{ textDecoration: "none" }}
          className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          <div className="sidebar-btn">
            <LayoutDashboard color="#000000" />
            {isOpen && <p>Dashboard</p>}
          </div>
        </Link>

        <div className="sidebar-btn">
          <SquareCheck />
          {isOpen && <p>Your Tasks</p>}
        </div>

        <div className="sidebar-btn">
          <Search />
          {isOpen && <p>Search Tasks</p>}
        </div>

        <Link
          to="/profile"
          style={{ textDecoration: "none" }}
          className={`sidebar-link ${location.pathname === "/profile" ? "active" : ""}`}
        >
          <div className="sidebar-btn">
            <CircleUserRound color="#000000" />
            {isOpen && <p>Profile</p>}
          </div>
        </Link>

        <div className="sidebar-btn logout-btn" onClick={handlelogout}>
          <LogOut />
          {isOpen && <p>Log out</p>}
        </div>
      </nav>
    </div>
  );
}
