import React, { useState, useEffect, useRef } from "react";
import "./TaskTabStyle.css";
import "animate.css";
import Button from "../button/Button";
import { toast } from "react-hot-toast";
import { Bell, Calendar } from "lucide-react";
import SetAlarmTab from "../setalarmtab/SetAlarmTab";
import Icantgettoyou from "../../assets/Icantgettoyou.wav";

export default function TaskTab({
  tasks,
  refreshTasks,
  alarms,
  refreshAllAlarms,
  refreshTaskAlarms,
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskAlarms, setSelectedTaskAlarms] = useState([]);

  // Refs for logic management
  const triggeredAlarms = useRef(new Set());
  const activeAudio = useRef(null);

  // 1. Function to stop the alarm sound safely
  const stopAlarm = () => {
    if (activeAudio.current) {
      activeAudio.current.pause();
      activeAudio.current.currentTime = 0;
      activeAudio.current = null;
      toast.dismiss(); // Clears the custom "Dismiss" toast
    }
  };

  // 2. Audio Unlocker (Required by Browser Policy)
  useEffect(() => {
    const unlock = () => {
      const silent = new Audio(Icantgettoyou);
      silent.volume = 0;
      silent.play().catch(() => {});
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock);
    return () => window.removeEventListener("click", unlock);
  }, []);

  // 3. The Refined Alarm Scheduler
  useEffect(() => {
    if (!alarms || alarms.length === 0) return;

    const interval = setInterval(() => {
      const now = new Date();

      alarms.forEach((alarm) => {
        if (!alarm.alarmStart) return;
        if (triggeredAlarms.current.has(alarm.id)) return;

        // Parse to Local Time
        const alarmTime = new Date(alarm.alarmStart.replace("Z", ""));
        const diffMs = now - alarmTime;

        /**
         * SAFETY TRIGGER CONDITION:
         * 1. diffMs >= 0: The time has arrived or passed.
         * 2. diffMs < 60000: It happened within the last 60 seconds.
         * (This prevents 30+ old alarms from firing at once on refresh!)
         */
        if (diffMs >= 0 && diffMs < 60000) {
          console.log(`🚀 TRIGGERING: ${alarm.alarmName}`);
          triggeredAlarms.current.add(alarm.id);

          // Only start a new audio instance if one isn't already playing
          if (!activeAudio.current) {
            const alarmSound = new Audio(Icantgettoyou);
            alarmSound.loop = true;
            activeAudio.current = alarmSound;
            alarmSound.play().catch((err) => {
              console.warn("Audio blocked. Click the page!", err);
            });
          }

          // Custom Toast with Dismiss Button
          toast.custom(
            (t) => (
              <div
                className={`animate__animated ${t.visible ? "animate__fadeInDown" : "animate__fadeOutUp"} custom-alarm-toast`}
              >
                <div className="toast-content-wrapper">
                  <Bell size={24} className="ringing-bell" />
                  <div className="toast-text">
                    <p className="toast-name">
                      {alarm.alarmName || "Task Reminder"}
                    </p>
                    <p className="toast-sub">Time to get to work!</p>
                  </div>
                </div>
                <button
                  className="stop-alarm-btn"
                  onClick={() => {
                    stopAlarm();
                    toast.dismiss(t.id);
                  }}
                >
                  DISMISS
                </button>
              </div>
            ),
            { duration: Infinity },
          );
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      stopAlarm();
    };
  }, [alarms]);

  // --- CRUD Handlers ---
  const handleMarkAsDone = async (id) => {
    const confirmDone = window.confirm("Are you done with this task?");
    if (!confirmDone) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${id}/status?status=DONE`,
        { method: "PUT" },
      );
      if (res.ok) {
        toast.success("Task marked as done ✅");
        await refreshTasks();
      }
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await refreshTasks();
        await refreshAllAlarms();
        toast.success("Task deleted.");
      }
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  const handleOpenAlarmModal = async (task) => {
    if (!task?.id) return;
    const taskAlarmData = await refreshTaskAlarms(task.id);
    setSelectedTask(task);
    setSelectedTaskAlarms(taskAlarmData || []);
  };

  const getStatusClass = (status) => {
    if (!status) return "upcoming";
    return status.toLowerCase().trim().replace(/\s+/g, "");
  };

  return (
    <div className="task-tab-container animate__animated animate__fadeInUp">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => {
          const taskAlarms = alarms.filter((alarm) => alarm.taskId === task.id);
          return (
            <div
              key={task.id}
              className={`task-container ${getStatusClass(task.status)}`}
            >
              <div className="task-header-row">
                <div className="task-info-side">
                  <div className="task-title">
                    <h4>{task.taskName}</h4>
                  </div>
                  <div className="task-description">
                    <p>{task.taskDescription}</p>
                  </div>
                  <div className="task-meta">
                    <span className="task-duedate">
                      <Calendar size={14} /> {task.dueDate}
                    </span>
                    <span className="task-status-pill">{task.status}</span>
                  </div>
                </div>
                <div className="task-actions-side">
                  <Button
                    color="#f0f3ed"
                    onClick={() => handleOpenAlarmModal(task)}
                    fontsize="0.9rem"
                  >
                    <Bell size={16} /> Alarm
                  </Button>
                  <Button value="Edit" fontsize="0.9rem" />
                  <Button
                    value="Delete"
                    color="#ff785a"
                    onClick={() => handleDelete(task.id)}
                    fontsize="0.9rem"
                  />
                  {task.status !== "DONE" && (
                    <Button
                      value="Done"
                      color="#1fff2a"
                      onClick={() => handleMarkAsDone(task.id)}
                      fontsize="0.9rem"
                    />
                  )}
                </div>
              </div>
              {taskAlarms.length > 0 && (
                <div className="task-alarms-footer">
                  <p className="alarm-label">Active Alarms:</p>
                  <div className="alarm-pills-container">
                    {taskAlarms.map((alarm) => (
                      <div key={alarm.id} className="alarm-pill">
                        <Bell size={12} color="#ffd25a" />
                        <span>{alarm.alarmName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="no-tasks-container">
          <p className="no-tasks">No tasks assigned for today.</p>
        </div>
      )}

      {selectedTask && (
        <SetAlarmTab
          task={selectedTask}
          alarms={selectedTaskAlarms}
          onClose={() => {
            setSelectedTask(null);
            setSelectedTaskAlarms([]);
          }}
          refreshTasks={refreshTasks}
          refreshAllAlarms={refreshAllAlarms}
        />
      )}
    </div>
  );
}
