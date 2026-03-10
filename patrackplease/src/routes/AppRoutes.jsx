import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "../Pages/landingpage/LandingPage";
import Login from "../Pages/loginpage/LoginPage";
import Register from "../Pages/registerpage/RegisterPage";
import DashboardPage from "../Pages/dashboardpage/DashboardPage";

// Protected route

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      /> */}
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
