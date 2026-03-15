import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/routes/ProtectedRoutes";
import LandingPage from "../Pages/landingpage/LandingPage";
import Login from "../Pages/loginpage/LoginPage";
import DashboardPage from "../Pages/dashboardpage/DashboardPage";
import ProfilePage from "../Pages/profilepage/ProfilePage";

export default function AppRoutes({ isOpen, setIsOpen }) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {/* Pass props to the Dashboard Page */}
            <DashboardPage isOpen={isOpen} setIsOpen={setIsOpen} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            {/* Pass props to the Profile Page */}
            <ProfilePage isOpen={isOpen} setIsOpen={setIsOpen} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
