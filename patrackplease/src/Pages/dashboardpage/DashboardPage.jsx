import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import "./DashboardPageStyle.css";
import { CircleCheck, CircleDashed, Radiation, ListTodo } from "lucide-react";
import "animate.css";
import { toast } from "react-hot-toast";
import KPI from "../../components/dashboardkpi/KPI";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";

export default function DashboardPage({ isOpen, setIsOpen }) {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:8080/api/users/email?email=${encodeURIComponent(user.email)}`,
      );

      if (res.ok) {
        const data = await res.json();
        setName(data.username);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const getTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:8080/api/tasks?email=${encodeURIComponent(user.email)}`,
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Tasks:", data);
        setTasks(data);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
      toast.error("(┳Д┳), Something went wrong!");
    }
  };

  useEffect(() => {
    getUser();
    getTasks();
  }, []);

  const normalize = (s) => s?.toLowerCase().replace(/[\s_]/g, "");

  const completedTasks = tasks.filter(
    (t) => normalize(t.status) === "done",
  ).length;
  const overdueTasks = tasks.filter(
    (t) => normalize(t.status) === "overdue",
  ).length;
  const pendingTasks = tasks.filter(
    (t) =>
      normalize(t.status) === "inprogress" ||
      normalize(t.status) === "upcoming",
  ).length;
  const totalTasks = tasks.length;

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} name={name} />

      <main className={`dashboard-main ${isOpen ? "open" : "closed"}`}>
        <div className="animate__animated animate__fadeIn dashboard-content">
          <header className="dashboard-header">
            <h1>Hello, {name || "User"}!</h1>
            <p>Ready to get started?</p>
          </header>
          <div className="Kpi-row">
            <KPI
              KPIName="Completed Tasks"
              backgroundColor="#FFEC1F"
              KPIValue={completedTasks}
            >
              <CircleCheck size="30" />
            </KPI>
            <KPI
              KPIName="Pending Tasks"
              backgroundColor="#FF785A"
              KPIValue={pendingTasks}
            >
              <CircleDashed size="30" />
            </KPI>
            <KPI
              KPIName="Overdue"
              KPIValue={overdueTasks}
              backgroundColor="#FFD25A"
            >
              <Radiation size="30" />
            </KPI>
            <KPI
              KPIName="Total Tasks"
              KPIValue={totalTasks}
              backgroundColor="#FFAB5C"
            >
              <ListTodo size="30" />
            </KPI>
          </div>

          <div className="tasks-pending-container">
            <div className="task-pending-header">
              <h2>Pending Tasks</h2>
              <Link
                to="/YourTasks"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Button value="View All" color="#FFF05A" fontsize="0.9rem" />
              </Link>
            </div>
            <ul className="pending-task-list">
              {tasks
                .filter(
                  (t) =>
                    normalize(t.status) === "inprogress" ||
                    normalize(t.status) === "upcoming",
                )
                .map((task) => (
                  <li key={task.id} className="pending-task-item">
                    <div className="pending-task-name">{task.taskName}</div>
                    <div className="pending-task-meta">
                      <span className="pending-task-status">{task.status}</span>
                      <span className="pending-task-due">
                        📅 {task.dueDate}
                      </span>
                    </div>
                  </li>
                ))}
              {tasks.filter(
                (t) =>
                  normalize(t.status) === "inprogress" ||
                  normalize(t.status) === "upcoming",
              ).length === 0 && (
                <p className="no-pending">🎉 No pending tasks!</p>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
