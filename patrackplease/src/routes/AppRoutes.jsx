import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/routes/ProtectedRoutes";

// Pages
import LandingPage from "../Pages/landingpage/LandingPage";
import Login from "../Pages/loginpage/LoginPage";
import Register from "../Pages/registerpage/RegisterPage";
import DashboardPage from "../Pages/dashboardpage/DashboardPage";
import ProfilePage from "../Pages/profilepage/ProfilePage";

// Protected route

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
