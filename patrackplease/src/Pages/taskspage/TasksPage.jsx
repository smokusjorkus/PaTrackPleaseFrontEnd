import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-hot-toast";
import "animate.css";
import "./TasksPageStyle.css";
import TaskTab from "../../components/task/TaskTab";
import Button from "../../components/button/Button";
import AddNewTaskForm from "../../components/addnewtask/AddNewTaskForm";
import Icantgettoyou from "../../assets/Icantgettoyou.wav";

export default function TasksPage({ isOpen, setIsOpen }) {
  const [tasks, setTasks] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const triggeredAlarms = useRef(new Set());

  const handleAlarmTrigger = (alarmData) => {
    if (!alarmData) return;
    try {
      const alarmSound = new Audio(Icantgettoyou);
      alarmSound.play().catch((err) => {
        console.warn(
          "Audio playback blocked: User must interact with the page first.",
        );
      });
      toast(alarmData.alarmName || "Task Reminder", {
        icon: "⏰",
        duration: 5000,
        style: { background: "#ffd25a", fontWeight: "bold" },
      });
    } catch (error) {
      console.error("Error in handleAlarmTrigger:", error);
    }
  };

  const fetchUserTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) return;
      const res = await fetch(
        `http://localhost:8080/api/tasks?email=${encodeURIComponent(user.email)}`,
      );
      if (res.ok) setTasks(await res.json());
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchUserAlarms = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) return;
      const res = await fetch(
        `http://localhost:8080/api/alarms?email=${encodeURIComponent(user.email)}`,
      );
      if (res.ok) setAlarms(await res.json());
    } catch (error) {
      console.error("Error fetching alarms:", error);
    }
  };

  const fetchTaskAlarms = async (taskId) => {
    try {
      if (!taskId) return [];
      const res = await fetch(
        `http://localhost:8080/api/alarms/task/${taskId}`,
      );
      if (res.ok) return await res.json();
      return [];
    } catch (error) {
      return [];
    }
  };

  const getDateParts = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "long" }),
      year: date.getFullYear(),
    };
  };

  const firstTaskMonth = tasks[0]?.dueDate
    ? getDateParts(tasks[0].dueDate).month
    : "";

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUserTasks(), fetchUserAlarms()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Unlock audio on first click
  useEffect(() => {
    const unlock = () => {
      const silent = new Audio(Icantgettoyou);
      silent.volume = 0;
      silent.play().catch(() => {});
      setAudioUnlocked(true);
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock);
    return () => window.removeEventListener("click", unlock);
  }, []);

  // Alarm checker
  useEffect(() => {
    if (alarms.length === 0) return;

    const interval = setInterval(() => {
      const now = new Date();
      alarms.forEach((alarm) => {
        if (!alarm.alarmStart || !alarm.active) return;
        if (triggeredAlarms.current.has(alarm.id)) return;

        const alarmTime = new Date(alarm.alarmStart);
        const diffMs = alarmTime - now;

        if (diffMs >= 0 && diffMs <= 30000) {
          triggeredAlarms.current.add(alarm.id);
          handleAlarmTrigger(alarm);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <div className="yourtasks-page">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className={`tasks-main ${isOpen ? "open" : "closed"}`}>
        {!audioUnlocked && (
          <div
            style={{
              background: "#ffd25a",
              padding: "8px 16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            🔔 Click anywhere to enable alarm sounds
          </div>
        )}

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
          {!loading && firstTaskMonth && (
            <h3
              className="Date-On-Sets"
              style={{
                marginBottom: "20px",
                borderBottom: "2px solid #191919",
                fontSize: "2rem",
                padding: "10px 10px",
                textAlign: "left",
              }}
            >
              {firstTaskMonth}
            </h3>
          )}
          {loading ? (
            <p>Loading your dashboard...</p>
          ) : (
            <TaskTab
              tasks={tasks}
              alarms={alarms}
              refreshTasks={fetchUserTasks}
              refreshAllAlarms={fetchUserAlarms}
              refreshTaskAlarms={fetchTaskAlarms}
              onAlarmTrigger={handleAlarmTrigger}
            />
          )}
        </div>
      </main>
    </div>
  );
}
