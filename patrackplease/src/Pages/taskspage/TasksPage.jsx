import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "animate.css";
import "./TasksPageStyle.css";
import TaskTab from "../../components/task/TaskTab";
import Button from "../../components/button/Button";
import AddNewTaskForm from "../../components/addnewtask/AddNewTaskForm";

export default function TasksPage({ isOpen, setIsOpen }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) return;

      const res = await fetch(
        `http://localhost:8080/api/tasks?email=${user.email}`,
      );

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="yourtasks-page">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className={`tasks-main ${isOpen ? "open" : "closed"}`}>
        <div className="tasks-headerbar animate__animated animate__fadeIn">
          <div className="headerbar-left">
            <h1 style={{ fontSize: "3rem" }}>Your Tasks</h1>
            <p>{tasks.length} tasks assigned to you</p>
          </div>
          <Button value="Add New Task" onClick={() => setShowForm(true)} />
        </div>

        {showForm && (
          <AddNewTaskForm
            onClose={() => setShowForm(false)}
            refreshTasks={fetchUserTasks}
          />
        )}

        <div className="tasks-content">
          {loading ? (
            <p>Loading your dashboard...</p>
          ) : (
            // Pass the array and the refresh function down
            <TaskTab tasks={tasks} refreshTasks={fetchUserTasks} />
          )}
        </div>
      </main>
    </div>
  );
}
