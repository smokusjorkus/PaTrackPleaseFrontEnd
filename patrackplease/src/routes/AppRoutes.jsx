import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "../Pages/landingpage/LandingPage";
import Login from "../Pages/loginpage/LoginPage";
import Register from "../Pages/registerpage/RegisterPage";

// Protected route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
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
