import React, { useEffect, useState } from "react";
import AddNewTaskForm from "../../components/addnewtask/AddNewTaskForm";
import {
  User,
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

export default function Sidebar({ isOpen, setIsOpen }) {
  const nav = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const formatProfileUrl = (profileImageUrl) => {
    let profileUrl = profileImageUrl || "";

    if (profileUrl.startsWith("/uploads/")) {
      profileUrl = `${API_BASE_URL}${profileUrl}`;
    }

    if (profileUrl.startsWith("http://localhost:8080")) {
      profileUrl = profileUrl.replace("http://localhost:8080", API_BASE_URL);
    }

    return profileUrl;
  };

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !user.email) return;

      const res = await fetch(
        `${API_BASE_URL}/api/users/email?email=${encodeURIComponent(user.email)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        console.log("Failed to fetch user");
        return;
      }

      const data = await res.json();

      setUserName(data.username);
      setImage(formatProfileUrl(data.profileImageUrl));
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();

    const refreshSidebar = () => {
      getUser();
    };

    window.addEventListener("profileUpdated", refreshSidebar);

    return () => {
      window.removeEventListener("profileUpdated", refreshSidebar);
    };
  }, []);

  const handlelogout = () => {
    localStorage.clear();
    toast.success("Successfully logged out.");
    nav("/login");
  };

  return (
    <div className={`Sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div>
        <div className="sidebar-profile-container">
          <div className="account">
            {image ? (
              <img src={image} alt="Profile" className="profile-img-sidebar" />
            ) : (
              <User size={30} />
            )}

            {isOpen && (
              <p className="animate__animated animate__fadeIn">
                {userName || "User"}
              </p>
            )}
          </div>

          <Menu
            onClick={() => setIsOpen(!isOpen)}
            style={{ cursor: "pointer" }}
            className="menu-icon"
          />
        </div>

        <nav className="navigation-links">
          <div className="sidebar-btn" onClick={() => setShowForm(true)}>
            <CirclePlus />
            {isOpen && <p>Add New Task</p>}
          </div>

          {showForm && <AddNewTaskForm onClose={() => setShowForm(false)} />}

          <Link
            to="/dashboard"
            style={{ textDecoration: "none" }}
            className={`sidebar-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <div className="sidebar-btn">
              <LayoutDashboard />
              {isOpen && <p>Dashboard</p>}
            </div>
          </Link>

          <Link
            to="/YourTasks"
            style={{ textDecoration: "none" }}
            className={`sidebar-link ${
              location.pathname === "/YourTasks" ? "active" : ""
            }`}
          >
            <div className="sidebar-btn">
              <SquareCheck />
              {isOpen && <p>Your Tasks</p>}
            </div>
          </Link>

          <Link
            to="/profile"
            style={{ textDecoration: "none" }}
            className={`sidebar-link ${
              location.pathname === "/profile" ? "active" : ""
            }`}
          >
            <div className="sidebar-btn">
              <CircleUserRound />
              {isOpen && <p>Profile</p>}
            </div>
          </Link>

          <div className="sidebar-btn logout-btn" onClick={handlelogout}>
            <LogOut />
            {isOpen && <p>Log out</p>}
          </div>
        </nav>
      </div>
    </div>
  );
}
