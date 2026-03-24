import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/routes/ProtectedRoutes";
import LandingPage from "../Pages/landingpage/LandingPage";
import Login from "../Pages/loginpage/LoginPage";
import DashboardPage from "../Pages/dashboardpage/DashboardPage";
import ProfilePage from "../Pages/profilepage/ProfilePage";
import Register from "../Pages/registerpage/RegisterPage";
import TasksPage from "../Pages/taskspage/TasksPage";

export default function AppRoutes({ isOpen, setIsOpen }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage isOpen={isOpen} setIsOpen={setIsOpen} />}
      />
      <Route
        path="/login"
        element={<Login isOpen={isOpen} setIsOpen={setIsOpen} />}
      />
      <Route
        path="/Register"
        element={<Register isOpen={isOpen} setIsOpen={setIsOpen} />}
      />

      <Route
        path="/YourTasks"
        element={
          <ProtectedRoute>
            <TasksPage isOpen={isOpen} setIsOpen={setIsOpen} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage isOpen={isOpen} setIsOpen={setIsOpen} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage isOpen={isOpen} setIsOpen={setIsOpen} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
