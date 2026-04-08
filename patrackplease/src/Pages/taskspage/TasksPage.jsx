import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-hot-toast";
import "animate.css";
import "./TasksPageStyle.css";
import TaskTab from "../../components/task/TaskTab";
import Button from "../../components/button/Button";
import AddNewTaskForm from "../../components/addnewtask/AddNewTaskForm";
import Icantgettoyou from "../../assets/Icantgettoyou.wav";
import Select from "react-select";

export default function TasksPage({ isOpen, setIsOpen }) {
  const [tasks, setTasks] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const triggeredAlarms = useRef(new Set());
  const [selectedTaskOption, setSelectedTaskOption] = useState(null);

  const handleAlarmTrigger = (alarmData) => {
    if (!alarmData) return;

    try {
      const alarmSound = new Audio(Icantgettoyou);
      alarmSound.play().catch(() => {
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

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      setTasks(data);
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

      if (!res.ok) {
        throw new Error("Failed to fetch alarms");
      }

      const data = await res.json();
      setAlarms(data);
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

      if (!res.ok) {
        return [];
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching task alarms:", error);
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

  const taskOptions = tasks.map((task) => ({
    value: task.id,
    label: task.taskName || "Untitled Task",
    description: task.taskDescription || "",
  }));

  const filteredTasks = selectedTaskOption
    ? tasks.filter((task) => task.id === selectedTaskOption.value)
    : tasks;

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const month = task.dueDate ? getDateParts(task.dueDate).month : "No Date";

    if (!groups[month]) groups[month] = [];
    groups[month].push(task);

    return groups;
  }, {});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUserTasks(), fetchUserAlarms()]);
      setLoading(false);
    };

    loadData();
  }, []);

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
            <p>{filteredTasks.length} tasks assigned to you</p>
          </div>
          <Button value="Add New Task" onClick={() => setShowForm(true)} />
        </div>

        <div className="tasks-searchbar animate__animated animate__fadeIn">
          <Select
            options={taskOptions}
            value={selectedTaskOption}
            onChange={setSelectedTaskOption}
            isClearable
            placeholder="Search or select a task..."
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 99999,
                fontFamily: "Outfit",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 99999,
                fontFamily: "Outfit",
              }),
            }}
            filterOption={(option, inputValue) => {
              const search = inputValue.toLowerCase();
              return (
                option.label.toLowerCase().includes(search) ||
                option.data.description.toLowerCase().includes(search)
              );
            }}
          />
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
          ) : Object.keys(groupedTasks).length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            Object.entries(groupedTasks).map(([month, monthTasks]) => (
              <div key={month}>
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
                  {month}
                </h3>

                <TaskTab
                  tasks={monthTasks}
                  alarms={alarms}
                  refreshTasks={fetchUserTasks}
                  refreshAllAlarms={fetchUserAlarms}
                  refreshTaskAlarms={fetchTaskAlarms}
                  onAlarmTrigger={handleAlarmTrigger}
                />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
